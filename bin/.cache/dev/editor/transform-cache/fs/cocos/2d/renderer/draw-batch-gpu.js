"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawBatch2DGPU = void 0;

var _globalExports = require("../../core/global-exports.js");

var _index = require("../components/index.js");

var _index2 = require("../../core/math/index.js");

var _nodeEnum = require("../../core/scene-graph/node-enum.js");

var _sprite = require("../components/sprite.js");

var _drawBatch = require("./draw-batch.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @hidden
 */
const EPSILON = 1 / 4096; // ulp(2049)

/** both numbers need to be in the range of [0, 1] */

function pack2(a, b) {
  return Math.min(a, 1 - EPSILON) + Math.floor(b * 2048.0);
}

class DrawBatch2DGPU extends _drawBatch.DrawBatch2D {
  set vec4PerUI(val) {
    this._vec4PerUI = val;
    this.capacityDirty = true;
  }

  get vec4PerUI() {
    return this._vec4PerUI;
  }

  constructor() {
    super();
    this._vec4PerUI = 5;
    this._numPerUBO = 0;
    this.capacityDirty = true;
    this._device = void 0;
    this._dcIndex = -1;
    this._device = _globalExports.legacyCC.director.root.device;
  }

  fillBuffers(renderComp, UBOManager, material, batcher) {
    renderComp.node.updateWorldTransform(); // @ts-expect-error using private members

    const {
      _pos: t,
      _rot: r,
      _scale: s
    } = renderComp.node;
    DrawBatch2DGPU._tempRect = renderComp.node._uiProps.uiTransformComp;

    DrawBatch2DGPU._tempRect.checkAndUpdateRect(r, s);

    _index2.Vec3.add(DrawBatch2DGPU._tempPosition, t, DrawBatch2DGPU._tempRect._anchorCache);

    let mode = 0;
    let fillType = 0;
    let frame;
    let to;

    if (renderComp instanceof _index.Sprite || renderComp instanceof _index.Label) {
      frame = renderComp.spriteFrame;
      to = frame.tillingOffset;
    }

    if (renderComp instanceof _index.Sprite) {
      mode = renderComp.type;

      if (mode !== _sprite.SpriteType.SIMPLE) {
        if (mode === _sprite.SpriteType.SLICED) {
          renderComp._calculateSlicedData(DrawBatch2DGPU._slicedCache);

          this._packageSlicedData(DrawBatch2DGPU._slicedCache, frame.slicedData, frame.rotated);
        } else if (mode === _sprite.SpriteType.TILED) {
          renderComp.calculateTiledData(DrawBatch2DGPU._tiledCache);
        } else if (mode === _sprite.SpriteType.FILLED) {
          let start = renderComp.fillStart;
          const range = renderComp.fillRange;
          let end;

          if (renderComp.fillType === 2) {
            // RADIAL
            DrawBatch2DGPU._tiledCache.x = start > 0.5 ? start * 2 - 2 : start * 2;
            DrawBatch2DGPU._tiledCache.y = range * 2;
            DrawBatch2DGPU._tiledCache.z = renderComp.fillCenter.x;
            DrawBatch2DGPU._tiledCache.w = 1 - renderComp.fillCenter.y;
          } else {
            end = Math.min(1, start + range);

            if (range < 0) {
              end = start;
              start = Math.max(0, renderComp.fillStart + range);
            }

            DrawBatch2DGPU._tiledCache.x = start;
            DrawBatch2DGPU._tiledCache.y = end;
          }

          fillType = renderComp.fillType / 10 + 0.01;
        }
      } else if (!renderComp.trim) {
        to = renderComp.tillingOffsetWithTrim;
      }
    }

    const c = renderComp.color;

    DrawBatch2DGPU._tempcolor.set(c.r, c.g, c.b, renderComp.node._uiProps.opacity * 255);

    if (this.capacityDirty) {
      this._numPerUBO = Math.floor((this._device.capabilities.maxVertexUniformVectors - material.passes[0].shaderInfo.builtins.statistics.CC_EFFECT_USED_VERTEX_UNIFORM_VECTORS) / this._vec4PerUI);
      this.capacityDirty = false;
    }

    const localBuffer = UBOManager.upload(DrawBatch2DGPU._tempPosition, r, DrawBatch2DGPU._tempRect._rectWithScale, to, DrawBatch2DGPU._tempcolor, mode, this._numPerUBO, this._vec4PerUI, DrawBatch2DGPU._tiledCache, fillType);
    return localBuffer;
  }

  fillDrawCall(localBuffer) {
    let dc = this._drawCalls[this._dcIndex];

    if (dc && (dc.bufferHash !== localBuffer.hash || dc.bufferUboIndex !== localBuffer.prevUBOIndex)) {
      // merge check
      this._dcIndex++;
      dc = this._drawCalls[this._dcIndex];
    }

    if (!dc) {
      dc = DrawBatch2DGPU.drawcallPool.alloc(); // make sure to assign initial values to all members here

      dc.bufferHash = localBuffer.hash;
      dc.bufferUboIndex = localBuffer.prevUBOIndex;
      dc.bufferView = localBuffer.getBufferView(); // hack

      dc.setDynamicOffsets(localBuffer.prevUBOIndex * localBuffer.uniformBufferStride);
      dc.drawInfo.firstIndex = localBuffer.prevInstanceID * 6;
      dc.drawInfo.indexCount = 0;
      this._dcIndex = this._drawCalls.length;

      this._pushDrawCall(dc);
    }

    dc.drawInfo.indexCount += 6;
  } // for updateBuffer


  updateBuffer(renderComp, bufferInfo, localBuffer) {
    if (renderComp.node.hasChangedFlags || renderComp.node._uiProps.uiTransformComp._rectDirty) {
      const node = renderComp.node;
      node.updateWorldTransform();
      DrawBatch2DGPU._tempRect = node._uiProps.uiTransformComp; // @ts-expect-error using private members

      const {
        _pos: t,
        _rot: r,
        _scale: s
      } = renderComp.node;

      DrawBatch2DGPU._tempRect.checkAndUpdateRect(r, s);

      _index2.Vec3.add(DrawBatch2DGPU._tempPosition, t, DrawBatch2DGPU._tempRect._anchorCache);

      if (node.hasChangedFlags & _nodeEnum.TransformBit.RS || DrawBatch2DGPU._tempRect._rectDirty) {
        localBuffer.updateDataTRSByDirty(bufferInfo.instanceID, bufferInfo.UBOIndex, DrawBatch2DGPU._tempPosition, r, DrawBatch2DGPU._tempRect._rectWithScale);
      } else {
        localBuffer.updateDataTRSByDirty(bufferInfo.instanceID, bufferInfo.UBOIndex, DrawBatch2DGPU._tempPosition);
      }
    }

    let mode = 0;
    let fillType = 0;
    let frame;
    let to;

    if (renderComp instanceof _index.Sprite || renderComp instanceof _index.Label) {
      frame = renderComp.spriteFrame;
      to = frame.tillingOffset;
    }

    if (renderComp instanceof _index.Sprite) {
      mode = renderComp.type;

      if (mode !== _sprite.SpriteType.SIMPLE) {
        if (mode === _sprite.SpriteType.SLICED) {
          renderComp._calculateSlicedData(DrawBatch2DGPU._slicedCache);

          this._packageSlicedData(DrawBatch2DGPU._slicedCache, frame.slicedData, frame.rotated);
        } else if (mode === _sprite.SpriteType.TILED) {
          renderComp.calculateTiledData(DrawBatch2DGPU._tiledCache);
        } else if (mode === _sprite.SpriteType.FILLED) {
          let start = renderComp.fillStart;
          const range = renderComp.fillRange;
          let end;

          if (renderComp.fillType === 2) {
            // RADIAL
            DrawBatch2DGPU._tiledCache.x = start > 0.5 ? start * 2 - 2 : start * 2;
            DrawBatch2DGPU._tiledCache.y = range * 2;
            DrawBatch2DGPU._tiledCache.z = renderComp.fillCenter.x;
            DrawBatch2DGPU._tiledCache.w = 1 - renderComp.fillCenter.y;
          } else {
            end = Math.min(1, start + range);

            if (range < 0) {
              end = start;
              start = Math.max(0, renderComp.fillStart + range);
            }

            DrawBatch2DGPU._tiledCache.x = start;
            DrawBatch2DGPU._tiledCache.y = end;
          }

          fillType = renderComp.fillType / 10 + 0.01;
        }
      }
    }

    const c = renderComp.color;

    DrawBatch2DGPU._tempcolor.set(c.r, c.g, c.b, renderComp.node._uiProps.opacity * 255);

    localBuffer.updateDataByDirty(bufferInfo.instanceID, bufferInfo.UBOIndex, DrawBatch2DGPU._tempcolor, mode, to, DrawBatch2DGPU._tiledCache, fillType);
  } // Need Dirty


  _packageSlicedData(spriteData, frameData, rotated) {
    // LTRB
    if (rotated) {
      // https://user-images.githubusercontent.com/9102404/138222856-32175cf9-7aaf-4b7e-b7f4-e7b957db59aa.png
      DrawBatch2DGPU._tiledCache.x = pack2(1 - spriteData[3], 1 - frameData[3]);
      DrawBatch2DGPU._tiledCache.y = pack2(spriteData[0], frameData[0]);
      DrawBatch2DGPU._tiledCache.z = pack2(1 - spriteData[1], 1 - frameData[1]);
      DrawBatch2DGPU._tiledCache.w = pack2(spriteData[2], frameData[2]);
    } else {
      DrawBatch2DGPU._tiledCache.x = pack2(spriteData[0], frameData[0]);
      DrawBatch2DGPU._tiledCache.y = pack2(spriteData[1], frameData[1]);
      DrawBatch2DGPU._tiledCache.z = pack2(spriteData[2], frameData[2]);
      DrawBatch2DGPU._tiledCache.w = pack2(spriteData[3], frameData[3]);
    }
  }

}

exports.DrawBatch2DGPU = DrawBatch2DGPU;
DrawBatch2DGPU._tempRect = null;
DrawBatch2DGPU._tempPosition = new _index2.Vec3();
DrawBatch2DGPU._tempAnchor = new _index2.Vec2();
DrawBatch2DGPU._tempcolor = new _index2.Color();
DrawBatch2DGPU._tiledCache = new _index2.Vec4(1, 1, 1, 1);
DrawBatch2DGPU._slicedCache = [];
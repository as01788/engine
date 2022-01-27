System.register("q-bundled:///fs/cocos/2d/renderer/draw-batch-gpu.js", ["../../core/global-exports.js", "../components/index.js", "../../core/math/index.js", "../../core/scene-graph/node-enum.js", "../components/sprite.js", "./draw-batch.js"], function (_export, _context) {
  "use strict";

  var legacyCC, Label, Sprite, Vec3, Vec2, Vec4, Color, TransformBit, SpriteType, DrawBatch2D, EPSILON, DrawBatch2DGPU;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  // ulp(2049)

  /** both numbers need to be in the range of [0, 1] */
  function pack2(a, b) {
    return Math.min(a, 1 - EPSILON) + Math.floor(b * 2048.0);
  }

  return {
    setters: [function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_componentsIndexJs) {
      Label = _componentsIndexJs.Label;
      Sprite = _componentsIndexJs.Sprite;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec4 = _coreMathIndexJs.Vec4;
      Color = _coreMathIndexJs.Color;
    }, function (_coreSceneGraphNodeEnumJs) {
      TransformBit = _coreSceneGraphNodeEnumJs.TransformBit;
    }, function (_componentsSpriteJs) {
      SpriteType = _componentsSpriteJs.SpriteType;
    }, function (_drawBatchJs) {
      DrawBatch2D = _drawBatchJs.DrawBatch2D;
    }],
    execute: function () {
      EPSILON = 1 / 4096;

      _export("DrawBatch2DGPU", DrawBatch2DGPU = /*#__PURE__*/function (_DrawBatch2D) {
        _inheritsLoose(DrawBatch2DGPU, _DrawBatch2D);

        function DrawBatch2DGPU() {
          var _this;

          _this = _DrawBatch2D.call(this) || this;
          _this._vec4PerUI = 5;
          _this._numPerUBO = 0;
          _this.capacityDirty = true;
          _this._device = void 0;
          _this._dcIndex = -1;
          _this._device = legacyCC.director.root.device;
          return _this;
        }

        var _proto = DrawBatch2DGPU.prototype;

        _proto.fillBuffers = function fillBuffers(renderComp, UBOManager, material, batcher) {
          renderComp.node.updateWorldTransform(); // @ts-expect-error using private members

          var _renderComp$node = renderComp.node,
              t = _renderComp$node._pos,
              r = _renderComp$node._rot,
              s = _renderComp$node._scale;
          DrawBatch2DGPU._tempRect = renderComp.node._uiProps.uiTransformComp;

          DrawBatch2DGPU._tempRect.checkAndUpdateRect(r, s);

          Vec3.add(DrawBatch2DGPU._tempPosition, t, DrawBatch2DGPU._tempRect._anchorCache);
          var mode = 0;
          var fillType = 0;
          var frame;
          var to;

          if (renderComp instanceof Sprite || renderComp instanceof Label) {
            frame = renderComp.spriteFrame;
            to = frame.tillingOffset;
          }

          if (renderComp instanceof Sprite) {
            mode = renderComp.type;

            if (mode !== SpriteType.SIMPLE) {
              if (mode === SpriteType.SLICED) {
                renderComp._calculateSlicedData(DrawBatch2DGPU._slicedCache);

                this._packageSlicedData(DrawBatch2DGPU._slicedCache, frame.slicedData, frame.rotated);
              } else if (mode === SpriteType.TILED) {
                renderComp.calculateTiledData(DrawBatch2DGPU._tiledCache);
              } else if (mode === SpriteType.FILLED) {
                var start = renderComp.fillStart;
                var range = renderComp.fillRange;
                var end;

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

          var c = renderComp.color;

          DrawBatch2DGPU._tempcolor.set(c.r, c.g, c.b, renderComp.node._uiProps.opacity * 255);

          if (this.capacityDirty) {
            this._numPerUBO = Math.floor((this._device.capabilities.maxVertexUniformVectors - material.passes[0].shaderInfo.builtins.statistics.CC_EFFECT_USED_VERTEX_UNIFORM_VECTORS) / this._vec4PerUI);
            this.capacityDirty = false;
          }

          var localBuffer = UBOManager.upload(DrawBatch2DGPU._tempPosition, r, DrawBatch2DGPU._tempRect._rectWithScale, to, DrawBatch2DGPU._tempcolor, mode, this._numPerUBO, this._vec4PerUI, DrawBatch2DGPU._tiledCache, fillType);
          return localBuffer;
        };

        _proto.fillDrawCall = function fillDrawCall(localBuffer) {
          var dc = this._drawCalls[this._dcIndex];

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
        ;

        _proto.updateBuffer = function updateBuffer(renderComp, bufferInfo, localBuffer) {
          if (renderComp.node.hasChangedFlags || renderComp.node._uiProps.uiTransformComp._rectDirty) {
            var node = renderComp.node;
            node.updateWorldTransform();
            DrawBatch2DGPU._tempRect = node._uiProps.uiTransformComp; // @ts-expect-error using private members

            var _renderComp$node2 = renderComp.node,
                t = _renderComp$node2._pos,
                r = _renderComp$node2._rot,
                s = _renderComp$node2._scale;

            DrawBatch2DGPU._tempRect.checkAndUpdateRect(r, s);

            Vec3.add(DrawBatch2DGPU._tempPosition, t, DrawBatch2DGPU._tempRect._anchorCache);

            if (node.hasChangedFlags & TransformBit.RS || DrawBatch2DGPU._tempRect._rectDirty) {
              localBuffer.updateDataTRSByDirty(bufferInfo.instanceID, bufferInfo.UBOIndex, DrawBatch2DGPU._tempPosition, r, DrawBatch2DGPU._tempRect._rectWithScale);
            } else {
              localBuffer.updateDataTRSByDirty(bufferInfo.instanceID, bufferInfo.UBOIndex, DrawBatch2DGPU._tempPosition);
            }
          }

          var mode = 0;
          var fillType = 0;
          var frame;
          var to;

          if (renderComp instanceof Sprite || renderComp instanceof Label) {
            frame = renderComp.spriteFrame;
            to = frame.tillingOffset;
          }

          if (renderComp instanceof Sprite) {
            mode = renderComp.type;

            if (mode !== SpriteType.SIMPLE) {
              if (mode === SpriteType.SLICED) {
                renderComp._calculateSlicedData(DrawBatch2DGPU._slicedCache);

                this._packageSlicedData(DrawBatch2DGPU._slicedCache, frame.slicedData, frame.rotated);
              } else if (mode === SpriteType.TILED) {
                renderComp.calculateTiledData(DrawBatch2DGPU._tiledCache);
              } else if (mode === SpriteType.FILLED) {
                var start = renderComp.fillStart;
                var range = renderComp.fillRange;
                var end;

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

          var c = renderComp.color;

          DrawBatch2DGPU._tempcolor.set(c.r, c.g, c.b, renderComp.node._uiProps.opacity * 255);

          localBuffer.updateDataByDirty(bufferInfo.instanceID, bufferInfo.UBOIndex, DrawBatch2DGPU._tempcolor, mode, to, DrawBatch2DGPU._tiledCache, fillType);
        } // Need Dirty
        ;

        _proto._packageSlicedData = function _packageSlicedData(spriteData, frameData, rotated) {
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
        };

        _createClass(DrawBatch2DGPU, [{
          key: "vec4PerUI",
          get: function get() {
            return this._vec4PerUI;
          },
          set: function set(val) {
            this._vec4PerUI = val;
            this.capacityDirty = true;
          }
        }]);

        return DrawBatch2DGPU;
      }(DrawBatch2D));

      DrawBatch2DGPU._tempRect = null;
      DrawBatch2DGPU._tempPosition = new Vec3();
      DrawBatch2DGPU._tempAnchor = new Vec2();
      DrawBatch2DGPU._tempcolor = new Color();
      DrawBatch2DGPU._tiledCache = new Vec4(1, 1, 1, 1);
      DrawBatch2DGPU._slicedCache = [];
    }
  };
});
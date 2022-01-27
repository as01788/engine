"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletTerrainShape = void 0;

var _bulletShape = require("./bullet-shape.js");

var _index = require("../../../core/index.js");

var _bulletUtils = require("../bullet-utils.js");

var _bulletCache = require("../bullet-cache.js");

var _instantiated = require("../instantiated.js");

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
class BulletTerrainShape extends _bulletShape.BulletShape {
  constructor(...args) {
    super(...args);
    this._bufPtr = 0;
    this._tileSize = 0;
    this._localOffset = new _index.Vec3();
  }

  get collider() {
    return this._collider;
  }

  setTerrain(v) {
    if (!this._isInitialized) return;

    if (this._impl && _bulletCache.BulletCache.isNotEmptyShape(this._impl)) {
      // TODO: change the terrain asset after initialization
      (0, _index.warn)('[Physics][Bullet]: change the terrain asset after initialization is not support.');
    } else {
      const terrain = v;

      if (terrain) {
        this._tileSize = terrain.tileSize;
        const sizeI = terrain.getVertexCountI();
        const sizeJ = terrain.getVertexCountJ();
        this._bufPtr = _instantiated.bt._malloc(4 * sizeI * sizeJ);
        let offset = 0;
        let min = Number.MAX_SAFE_INTEGER;
        let max = Number.MIN_SAFE_INTEGER;

        for (let j = 0; j < sizeJ; j++) {
          for (let i = 0; i < sizeI; i++) {
            const v = terrain.getHeight(i, j);

            _instantiated.bt._write_f32(this._bufPtr + offset, v);

            if (min > v) min = v;
            if (v > max) max = v;
            offset += 4;
          }
        }

        max += 0.01;
        min -= 0.01;

        this._localOffset.set((sizeI - 1) / 2 * this._tileSize, (max + min) / 2, (sizeJ - 1) / 2 * this._tileSize);

        this._impl = _instantiated.bt.TerrainShape_new(sizeI, sizeJ, this._bufPtr, 1, min, max);
        const bt_v3 = _bulletCache.BulletCache.instance.BT_V3_0;

        _instantiated.bt.Vec3_set(bt_v3, this._tileSize, 1, this._tileSize);

        _instantiated.bt.CollisionShape_setLocalScaling(this._impl, bt_v3);

        this.setCompound(this._compound);
        this.updateByReAdd();
        this.setWrapper();
      } else {
        this._impl = _instantiated.bt.EmptyShape_static();
      }
    }
  }

  onComponentSet() {
    this.setTerrain(this.collider.terrain);
  }

  onDestroy() {
    if (this._bufPtr) _instantiated.bt._free(this._bufPtr);
    super.onDestroy();
  }

  setCenter(v) {
    _index.Vec3.copy(_bulletCache.CC_V3_0, v);

    _bulletCache.CC_V3_0.add(this._localOffset); // CC_V3_0.multiply(this._collider.node.worldScale);


    (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.Transform_getOrigin(this.transform), _bulletCache.CC_V3_0);
    this.updateCompoundTransform();
  }

}

exports.BulletTerrainShape = BulletTerrainShape;
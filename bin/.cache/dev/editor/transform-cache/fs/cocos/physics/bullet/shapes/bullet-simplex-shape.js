"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletSimplexShape = void 0;

var _bulletShape = require("./bullet-shape.js");

var _bulletUtils = require("../bullet-utils.js");

var _instantiated = require("../instantiated.js");

var _bulletCache = require("../bullet-cache.js");

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
class BulletSimplexShape extends _bulletShape.BulletShape {
  setShapeType(v) {// TODO:
  }

  setVertices(v) {// TODO:
  }

  get collider() {
    return this._collider;
  }

  onComponentSet() {
    this._impl = _instantiated.bt.SimplexShape_new();
    const length = this.collider.shapeType;
    const vertices = this.collider.vertices;
    const bt_v3 = _bulletCache.BulletCache.instance.BT_V3_0;

    for (let i = 0; i < length; i++) {
      _instantiated.bt.SimplexShape_addVertex(this._impl, (0, _bulletUtils.cocos2BulletVec3)(bt_v3, vertices[i]));
    }

    _instantiated.bt.CollisionShape_setLocalScaling(this._impl, (0, _bulletUtils.cocos2BulletVec3)(bt_v3, this._collider.node.worldScale));
  }

  onLoad() {
    super.onLoad();
    this.collider.updateVertices();
  }

  updateScale() {
    super.updateScale();
    const bt_v3 = _bulletCache.BulletCache.instance.BT_V3_0;

    _instantiated.bt.CollisionShape_setLocalScaling(this._impl, (0, _bulletUtils.cocos2BulletVec3)(bt_v3, this._collider.node.worldScale));
  }

}

exports.BulletSimplexShape = BulletSimplexShape;
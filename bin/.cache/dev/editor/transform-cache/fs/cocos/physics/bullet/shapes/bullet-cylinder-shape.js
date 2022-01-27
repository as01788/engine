"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCylinderShape = void 0;

var _bulletShape = require("./bullet-shape.js");

var _index = require("../../../core/index.js");

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
class BulletCylinderShape extends _bulletShape.BulletShape {
  setHeight(v) {
    this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
  }

  setDirection(v) {
    this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
  }

  setRadius(v) {
    this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
  }

  get collider() {
    return this._collider;
  }

  onComponentSet() {
    const bt_v3 = _bulletCache.BulletCache.instance.BT_V3_0;

    _instantiated.bt.Vec3_set(bt_v3, 0.5, 1, 0.5);

    this._impl = _instantiated.bt.CylinderShape_new(bt_v3);
    this.setRadius(this.collider.radius);
  }

  updateScale() {
    super.updateScale();
    this.setRadius(this.collider.radius);
  }

  updateProperties(radius, height, direction, scale) {
    const ws = scale;
    const upAxis = direction;
    let wr;
    let wh;

    if (upAxis === 1) {
      wh = height * Math.abs(ws.y);
      wr = radius * Math.abs((0, _index.absMax)(ws.x, ws.z));
    } else if (upAxis === 0) {
      wh = height * Math.abs(ws.x);
      wr = radius * Math.abs((0, _index.absMax)(ws.y, ws.z));
    } else {
      wh = height * Math.abs(ws.z);
      wr = radius * Math.abs((0, _index.absMax)(ws.x, ws.y));
    }

    _instantiated.bt.CylinderShape_updateProp(this._impl, wr, wh / 2, upAxis);

    this.updateCompoundTransform();
  }

}

exports.BulletCylinderShape = BulletCylinderShape;
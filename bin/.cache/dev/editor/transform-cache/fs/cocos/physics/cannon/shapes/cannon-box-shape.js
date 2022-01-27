"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonBoxShape = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _index = require("../../../core/math/index.js");

var _cannonUtil = require("../cannon-util.js");

var _cannonShape = require("./cannon-shape.js");

var _physicsFramework = require("../../../../exports/physics-framework.js");

var _util = require("../../utils/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
class CannonBoxShape extends _cannonShape.CannonShape {
  get collider() {
    return this._collider;
  }

  get impl() {
    return this._shape;
  }

  constructor() {
    super();
    this.halfExtent = void 0;
    this.halfExtent = new _cannon.default.Vec3(0.5, 0.5, 0.5);
    this._shape = new _cannon.default.Box(this.halfExtent.clone());
  }

  updateSize() {
    _index.Vec3.multiplyScalar(this.halfExtent, this.collider.size, 0.5);

    const ws = (0, _util.absolute)(_util.VEC3_0.set(this.collider.node.worldScale));
    const x = this.halfExtent.x * ws.x;
    const y = this.halfExtent.y * ws.y;
    const z = this.halfExtent.z * ws.z;
    const minVolumeSize = _physicsFramework.PhysicsSystem.instance.minVolumeSize;
    this.impl.halfExtents.x = (0, _index.clamp)(x, minVolumeSize, Number.MAX_VALUE);
    this.impl.halfExtents.y = (0, _index.clamp)(y, minVolumeSize, Number.MAX_VALUE);
    this.impl.halfExtents.z = (0, _index.clamp)(z, minVolumeSize, Number.MAX_VALUE);
    this.impl.updateConvexPolyhedronRepresentation();

    if (this._index !== -1) {
      (0, _cannonUtil.commitShapeUpdates)(this._body);
    }
  }

  onLoad() {
    super.onLoad();
    this.updateSize();
  }

  setScale(scale) {
    super.setScale(scale);
    this.updateSize();
  }

}

exports.CannonBoxShape = CannonBoxShape;
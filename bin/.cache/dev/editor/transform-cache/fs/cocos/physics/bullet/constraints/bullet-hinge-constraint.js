"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletHingeConstraint = void 0;

var _bulletConstraint = require("./bullet-constraint.js");

var _index = require("../../../core/index.js");

var _bulletCache = require("../bullet-cache.js");

var _instantiated = require("../instantiated.js");

var _bulletUtils = require("../bullet-utils.js");

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

/* eslint-disable new-cap */
class BulletHingeConstraint extends _bulletConstraint.BulletConstraint {
  setPivotA(v) {
    this.updateFrames();
  }

  setPivotB(v) {
    this.updateFrames();
  }

  setAxis(v) {
    this.updateFrames();
  }

  get constraint() {
    return this._com;
  }

  onComponentSet() {
    const cb = this.constraint.connectedBody;
    const bodyA = this._rigidBody.body.impl;
    const bodyB = cb ? cb.body.impl : _instantiated.bt.TypedConstraint_getFixedBody();
    const trans0 = _bulletCache.BulletCache.instance.BT_TRANSFORM_0;
    const trans1 = _bulletCache.BulletCache.instance.BT_TRANSFORM_1;
    this._impl = _instantiated.bt.HingeConstraint_new(bodyA, bodyB, trans0, trans1);
    this.updateFrames();
  }

  updateFrames() {
    const cs = this.constraint;
    const node = cs.node;
    const v3_0 = _bulletCache.CC_V3_0;
    const rot_0 = _bulletCache.CC_QUAT_0;
    const trans0 = _bulletCache.BulletCache.instance.BT_TRANSFORM_0;

    _index.Vec3.multiply(v3_0, node.worldScale, cs.pivotA);

    (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.Transform_getOrigin(trans0), v3_0);
    const quat = _bulletCache.BulletCache.instance.BT_QUAT_0;

    _index.Quat.rotationTo(rot_0, _index.Vec3.UNIT_Z, cs.axis);

    (0, _bulletUtils.cocos2BulletQuat)(quat, rot_0);

    _instantiated.bt.Transform_setRotation(trans0, quat);

    const trans1 = _bulletCache.BulletCache.instance.BT_TRANSFORM_1;
    const cb = this.constraint.connectedBody;

    if (cb) {
      _index.Vec3.multiply(v3_0, cb.node.worldScale, cs.pivotB);
    } else {
      _index.Vec3.multiply(v3_0, node.worldScale, cs.pivotA);

      _index.Vec3.add(v3_0, v3_0, node.worldPosition);

      _index.Vec3.add(v3_0, v3_0, cs.pivotB);

      _index.Quat.multiply(rot_0, rot_0, node.worldRotation);
    }

    (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.Transform_getOrigin(trans1), v3_0);
    (0, _bulletUtils.cocos2BulletQuat)(quat, rot_0);

    _instantiated.bt.Transform_setRotation(trans1, quat);

    _instantiated.bt.HingeConstraint_setFrames(this._impl, trans0, trans1);
  }

  updateScale0() {
    this.updateFrames();
  }

  updateScale1() {
    this.updateFrames();
  }

}

exports.BulletHingeConstraint = BulletHingeConstraint;
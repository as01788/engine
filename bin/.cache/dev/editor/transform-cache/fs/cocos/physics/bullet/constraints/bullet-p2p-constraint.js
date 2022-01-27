"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletP2PConstraint = void 0;

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
class BulletP2PConstraint extends _bulletConstraint.BulletConstraint {
  setPivotA(v) {
    const cs = this.constraint;
    const pivotA = _bulletCache.BulletCache.instance.BT_V3_0;

    _index.Vec3.multiply(_bulletCache.CC_V3_0, cs.node.worldScale, cs.pivotA);

    (0, _bulletUtils.cocos2BulletVec3)(pivotA, _bulletCache.CC_V3_0);

    _instantiated.bt.P2PConstraint_setPivotA(this._impl, pivotA);

    if (!cs.connectedBody) this.setPivotB(cs.pivotB);
  }

  setPivotB(v) {
    const cs = this.constraint;
    const node = this._rigidBody.node;
    const pivotB = _bulletCache.BulletCache.instance.BT_V3_0;
    const cb = cs.connectedBody;

    if (cb) {
      _index.Vec3.multiply(_bulletCache.CC_V3_0, cb.node.worldScale, cs.pivotB);

      (0, _bulletUtils.cocos2BulletVec3)(pivotB, _bulletCache.CC_V3_0);
    } else {
      _index.Vec3.multiply(_bulletCache.CC_V3_0, node.worldScale, cs.pivotA);

      _index.Vec3.add(_bulletCache.CC_V3_0, _bulletCache.CC_V3_0, node.worldPosition);

      _index.Vec3.add(_bulletCache.CC_V3_0, _bulletCache.CC_V3_0, cs.pivotB);

      (0, _bulletUtils.cocos2BulletVec3)(pivotB, _bulletCache.CC_V3_0);
    }

    _instantiated.bt.P2PConstraint_setPivotB(this._impl, pivotB);
  }

  get constraint() {
    return this._com;
  }

  onComponentSet() {
    const cb = this.constraint.connectedBody;
    const bodyA = this._rigidBody.body.impl;
    const bodyB = cb ? cb.body.impl : _instantiated.bt.TypedConstraint_getFixedBody();
    const pivotA = _bulletCache.BulletCache.instance.BT_V3_0;
    const pivotB = _bulletCache.BulletCache.instance.BT_V3_1;
    this._impl = _instantiated.bt.P2PConstraint_new(bodyA, bodyB, pivotA, pivotB);
    this.setPivotA(this.constraint.pivotA);
    this.setPivotB(this.constraint.pivotB);
  }

  updateScale0() {
    this.setPivotA(this.constraint.pivotA);
  }

  updateScale1() {
    this.setPivotB(this.constraint.pivotB);
  }

}

exports.BulletP2PConstraint = BulletP2PConstraint;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletContactData = void 0;

var _index = require("../../core/index.js");

var _bulletCache = require("./bullet-cache.js");

var _instantiated = require("./instantiated.js");

var _bulletUtils = require("./bullet-utils.js");

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
class BulletContactData {
  get isBodyA() {
    const sb = this.event.selfCollider.shape.sharedBody.body;
    return sb === _instantiated.bt.PersistentManifold_getBody0(this.impl);
  }

  constructor(event) {
    this.impl = 0;
    this.event = event;
  }

  getLocalPointOnA(out) {
    if (this.impl) (0, _bulletUtils.bullet2CocosVec3)(out, _instantiated.bt.ManifoldPoint_get_m_localPointA(this.impl));
  }

  getLocalPointOnB(out) {
    if (this.impl) (0, _bulletUtils.bullet2CocosVec3)(out, _instantiated.bt.ManifoldPoint_get_m_localPointB(this.impl));
  }

  getWorldPointOnA(out) {
    if (this.impl) (0, _bulletUtils.bullet2CocosVec3)(out, _instantiated.bt.ManifoldPoint_get_m_positionWorldOnA(this.impl));
  }

  getWorldPointOnB(out) {
    if (this.impl) (0, _bulletUtils.bullet2CocosVec3)(out, _instantiated.bt.ManifoldPoint_get_m_positionWorldOnB(this.impl));
  }

  getLocalNormalOnA(out) {
    if (this.impl) {
      const bt_rot = _bulletCache.BulletCache.instance.BT_QUAT_0;

      const body = _instantiated.bt.PersistentManifold_getBody0(this.impl);

      const trans = _instantiated.bt.CollisionObject_getWorldTransform(body);

      _instantiated.bt.Transform_getRotation(trans, bt_rot);

      const inv_rot = _bulletCache.CC_QUAT_0;
      (0, _bulletUtils.bullet2CocosQuat)(inv_rot, bt_rot);

      _index.Quat.conjugate(inv_rot, inv_rot);

      (0, _bulletUtils.bullet2CocosVec3)(out, _instantiated.bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
      if (!this.isBodyA) _index.Vec3.negate(out, out);

      _index.Vec3.transformQuat(out, out, inv_rot);
    }
  }

  getLocalNormalOnB(out) {
    if (this.impl) {
      const bt_rot = _bulletCache.BulletCache.instance.BT_QUAT_0;

      const body = _instantiated.bt.PersistentManifold_getBody1(this.impl);

      const trans = _instantiated.bt.CollisionObject_getWorldTransform(body);

      _instantiated.bt.Transform_getRotation(trans, bt_rot);

      const inv_rot = _bulletCache.CC_QUAT_0;
      (0, _bulletUtils.bullet2CocosQuat)(inv_rot, bt_rot);

      _index.Quat.conjugate(inv_rot, inv_rot);

      (0, _bulletUtils.bullet2CocosVec3)(out, _instantiated.bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));

      _index.Vec3.transformQuat(out, out, inv_rot);
    }
  }

  getWorldNormalOnA(out) {
    if (this.impl) {
      (0, _bulletUtils.bullet2CocosVec3)(out, _instantiated.bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
      if (!this.isBodyA) _index.Vec3.negate(out, out);
    }
  }

  getWorldNormalOnB(out) {
    if (this.impl) (0, _bulletUtils.bullet2CocosVec3)(out, _instantiated.bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
  }

}

exports.BulletContactData = BulletContactData;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletShape = void 0;

var _index = require("../../../core/math/index.js");

var _physicsFramework = require("../../../../exports/physics-framework.js");

var _bulletEnum = require("../bullet-enum.js");

var _bulletUtils = require("../bullet-utils.js");

var _bulletCache = require("../bullet-cache.js");

var _instantiated = require("../instantiated.js");

var _index2 = require("../../framework/index.js");

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
const v3_0 = _bulletCache.CC_V3_0;
const ccMaterialBooks = {};

class BulletShape {
  constructor() {
    this.id = BulletShape.idCounter++;
    this._isEnabled = false;
    this._isTrigger = false;
    this._isInitialized = false;
    this._impl = 0;
    this._compound = 0;
    this.quat = _instantiated.bt.Quat_new(0, 0, 0, 1);
    this.transform = _instantiated.bt.Transform_new();
  }

  updateEventListener() {
    this._sharedBody.wrappedWorld.updateNeedEmitEvents(this.collider.needCollisionEvent || this.collider.needTriggerEvent);
  }

  setMaterial(v) {
    if (!this._isTrigger && this._isEnabled && v) {
      if (this._compound) {
        if (!ccMaterialBooks[v._uuid]) ccMaterialBooks[v._uuid] = _instantiated.bt.ccMaterial_new();
        const mat = ccMaterialBooks[v._uuid];

        _instantiated.bt.ccMaterial_set(mat, v.restitution, v.friction, v.rollingFriction, v.spinningFriction);

        _instantiated.bt.CollisionShape_setMaterial(this._impl, mat);
      } else {
        _instantiated.bt.CollisionObject_setMaterial(this._sharedBody.body, v.restitution, v.friction, v.rollingFriction, v.spinningFriction);
      }
    }
  }

  setCenter(v) {
    _index.Vec3.copy(v3_0, v);

    v3_0.multiply(this._collider.node.worldScale);
    (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.Transform_getOrigin(this.transform), v3_0);
    this.updateCompoundTransform();
  }

  setAsTrigger(v) {
    if (this._isTrigger === v) return;

    if (this._isEnabled) {
      this._sharedBody.removeShape(this, !v);

      this._sharedBody.addShape(this, v);
    }

    this._isTrigger = v;
  }

  get attachedRigidBody() {
    if (this._sharedBody.wrappedBody) return this._sharedBody.wrappedBody.rigidBody;
    return null;
  }

  get impl() {
    return this._impl;
  }

  get collider() {
    return this._collider;
  }

  get sharedBody() {
    return this._sharedBody;
  }

  getAABB(v) {
    const bt_transform = _bulletCache.BulletCache.instance.BT_TRANSFORM_0;

    _instantiated.bt.Transform_setIdentity(bt_transform);

    _instantiated.bt.Transform_setRotation(bt_transform, (0, _bulletUtils.cocos2BulletQuat)(_bulletCache.BulletCache.instance.BT_QUAT_0, this._collider.node.worldRotation));

    const MIN = _bulletCache.BulletCache.instance.BT_V3_0;
    const MAX = _bulletCache.BulletCache.instance.BT_V3_1;

    _instantiated.bt.CollisionShape_getAabb(this._impl, bt_transform, MIN, MAX);

    v.halfExtents.x = (_instantiated.bt.Vec3_x(MAX) - _instantiated.bt.Vec3_x(MIN)) / 2;
    v.halfExtents.y = (_instantiated.bt.Vec3_y(MAX) - _instantiated.bt.Vec3_y(MIN)) / 2;
    v.halfExtents.z = (_instantiated.bt.Vec3_z(MAX) - _instantiated.bt.Vec3_z(MIN)) / 2;

    _index.Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
  }

  getBoundingSphere(v) {
    v.radius = _instantiated.bt.CollisionShape_getLocalBoundingSphere(this._impl);

    _index.Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
  }

  initialize(com) {
    this._collider = com;
    this._isInitialized = true;
    this._sharedBody = _physicsFramework.PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
    this._sharedBody.reference = true;
    this.onComponentSet();
    this.setWrapper();
  }

  setWrapper() {
    if (_bulletCache.BulletCache.isNotEmptyShape(this._impl)) {
      _instantiated.bt.CollisionShape_setUserPointer(this._impl, this._impl);

      _bulletCache.BulletCache.setWrapper(this._impl, BulletShape.TYPE, this);
    }
  } // virtual


  onLoad() {
    this.setCenter(this._collider.center);
    this.setAsTrigger(this._collider.isTrigger);
  }

  onEnable() {
    this._isEnabled = true;

    this._sharedBody.addShape(this, this._isTrigger);

    this.setMaterial(this.collider.sharedMaterial);
  }

  onDisable() {
    this._isEnabled = false;

    this._sharedBody.removeShape(this, this._isTrigger);
  }

  onDestroy() {
    this._sharedBody.reference = false;
    this._collider = null;

    _instantiated.bt.Quat_del(this.quat);

    _instantiated.bt.Transform_del(this.transform);

    if (this._compound) _instantiated.bt.CollisionShape_del(this._compound);

    if (_bulletCache.BulletCache.isNotEmptyShape(this._impl)) {
      _instantiated.bt.CollisionShape_del(this._impl);

      _bulletCache.BulletCache.delWrapper(this._impl, BulletShape.TYPE);
    }
  }

  updateByReAdd() {
    if (this._isEnabled) {
      this._sharedBody.removeShape(this, this._isTrigger);

      this._sharedBody.addShape(this, this._isTrigger);
    }
  }

  getGroup() {
    return this._sharedBody.collisionFilterGroup;
  }

  setGroup(v) {
    this._sharedBody.collisionFilterGroup = v;
  }

  addGroup(v) {
    this._sharedBody.collisionFilterGroup |= v;
  }

  removeGroup(v) {
    this._sharedBody.collisionFilterGroup &= ~v;
  }

  getMask() {
    return this._sharedBody.collisionFilterMask;
  }

  setMask(v) {
    this._sharedBody.collisionFilterMask = v;
  }

  addMask(v) {
    this._sharedBody.collisionFilterMask |= v;
  }

  removeMask(v) {
    this._sharedBody.collisionFilterMask &= ~v;
  }

  setCompound(compound) {
    if (this._compound) _instantiated.bt.CompoundShape_removeChildShape(this._compound, this._impl);
    if (compound) _instantiated.bt.CompoundShape_addChildShape(compound, this.transform, this._impl);
    this._compound = compound;
  }

  updateScale() {
    this.setCenter(this._collider.center);
  }

  updateCompoundTransform() {
    if (this._compound) {
      _instantiated.bt.CompoundShape_updateChildTransform(this._compound, this._impl, this.transform, true);
    } else if (this._isEnabled && !this._isTrigger) {
      if (this._sharedBody && !this._sharedBody.bodyStruct.useCompound) {
        this._sharedBody.dirty |= _bulletEnum.EBtSharedBodyDirty.BODY_RE_ADD;
      }
    }
  }

  needCompound() {
    if (this._collider.type === _index2.EColliderType.TERRAIN) {
      return true;
    }

    if (this._collider.center.equals(_index.Vec3.ZERO)) {
      return false;
    }

    return true;
  }

}

exports.BulletShape = BulletShape;
BulletShape.TYPE = 'shape';
BulletShape.idCounter = 0;
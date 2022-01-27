"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletRigidBody = void 0;

var _index = require("../../core/index.js");

var _bulletUtils = require("./bullet-utils.js");

var _physicsFramework = require("../../../exports/physics-framework.js");

var _bulletEnum = require("./bullet-enum.js");

var _bulletCache = require("./bullet-cache.js");

var _instantiated = require("./instantiated.js");

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
const v3_1 = _bulletCache.CC_V3_1;

class BulletRigidBody {
  get isAwake() {
    const state = _instantiated.bt.CollisionObject_getActivationState(this.impl);

    return state === _bulletEnum.btCollisionObjectStates.ACTIVE_TAG || state === _bulletEnum.btCollisionObjectStates.DISABLE_DEACTIVATION;
  }

  get isSleepy() {
    const state = _instantiated.bt.CollisionObject_getActivationState(this.impl);

    return state === _bulletEnum.btCollisionObjectStates.WANTS_DEACTIVATION;
  }

  get isSleeping() {
    const state = _instantiated.bt.CollisionObject_getActivationState(this.impl);

    return state === _bulletEnum.btCollisionObjectStates.ISLAND_SLEEPING;
  }

  setMass(value) {
    if (!this._rigidBody.isDynamic) return;

    _instantiated.bt.RigidBody_setMass(this.impl, value);

    this._wakeUpIfSleep();

    this._sharedBody.dirty |= _bulletEnum.EBtSharedBodyDirty.BODY_RE_ADD;
  }

  setType(v) {
    this._sharedBody.setType(v);
  }

  setLinearDamping(value) {
    _instantiated.bt.RigidBody_setDamping(this.impl, this._rigidBody.linearDamping, this._rigidBody.angularDamping);
  }

  setAngularDamping(value) {
    _instantiated.bt.RigidBody_setDamping(this.impl, this._rigidBody.linearDamping, this._rigidBody.angularDamping);
  }

  useGravity(value) {
    if (!this._rigidBody.isDynamic) return;

    let m_rigidBodyFlag = _instantiated.bt.RigidBody_getFlags(this.impl);

    if (value) {
      m_rigidBodyFlag &= ~_bulletEnum.btRigidBodyFlags.BT_DISABLE_WORLD_GRAVITY;
    } else {
      _instantiated.bt.RigidBody_setGravity(this.impl, (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, _index.Vec3.ZERO));

      m_rigidBodyFlag |= _bulletEnum.btRigidBodyFlags.BT_DISABLE_WORLD_GRAVITY;
    }

    _instantiated.bt.RigidBody_setFlags(this.impl, m_rigidBodyFlag);

    this._wakeUpIfSleep();

    this._sharedBody.dirty |= _bulletEnum.EBtSharedBodyDirty.BODY_RE_ADD;
  }

  useCCD(value) {
    _instantiated.bt.CollisionObject_setCcdMotionThreshold(this.impl, value ? 0.01 : 0);

    _instantiated.bt.CollisionObject_setCcdSweptSphereRadius(this.impl, value ? 0.1 : 0);

    this._isUsingCCD = value;
  }

  isUsingCCD() {
    return this._isUsingCCD;
  }

  setLinearFactor(v) {
    _instantiated.bt.RigidBody_setLinearFactor(this.impl, (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, v));

    this._wakeUpIfSleep();
  }

  setAngularFactor(v) {
    _instantiated.bt.RigidBody_setAngularFactor(this.impl, (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, v));

    this._wakeUpIfSleep();
  }

  setAllowSleep(v) {
    if (!this._rigidBody.isDynamic) return;

    if (v) {
      _instantiated.bt.CollisionObject_forceActivationState(this.impl, _bulletEnum.btCollisionObjectStates.ACTIVE_TAG);
    } else {
      _instantiated.bt.CollisionObject_forceActivationState(this.impl, _bulletEnum.btCollisionObjectStates.DISABLE_DEACTIVATION);
    }

    this._wakeUpIfSleep();
  }

  get impl() {
    return this._sharedBody.body;
  }

  get rigidBody() {
    return this._rigidBody;
  }

  get sharedBody() {
    return this._sharedBody;
  }

  get isEnabled() {
    return this._isEnabled;
  }

  constructor() {
    this.id = void 0;
    this._isEnabled = false;
    this._isUsingCCD = false;
    this.id = BulletRigidBody.idCounter++;
  }

  clearState() {
    _instantiated.bt.RigidBody_clearState(this.impl);
  }

  clearVelocity() {
    this.setLinearVelocity(_index.Vec3.ZERO);
    this.setAngularVelocity(_index.Vec3.ZERO);
  }

  clearForces() {
    _instantiated.bt.RigidBody_clearForces(this.impl);
  }
  /** LIFECYCLE */


  initialize(com) {
    this._rigidBody = com;
    this._sharedBody = _physicsFramework.PhysicsSystem.instance.physicsWorld.getSharedBody(this._rigidBody.node, this);
    this._sharedBody.reference = true;
  }

  onEnable() {
    this._isEnabled = true;
    this.setMass(this._rigidBody.mass);
    this.setAllowSleep(this._rigidBody.allowSleep);
    this.setLinearDamping(this._rigidBody.linearDamping);
    this.setAngularDamping(this._rigidBody.angularDamping);
    this.setLinearFactor(this._rigidBody.linearFactor);
    this.setAngularFactor(this._rigidBody.angularFactor);
    this.useGravity(this._rigidBody.useGravity);
    this._sharedBody.bodyEnabled = true;
  }

  onDisable() {
    this._isEnabled = false;
    this._sharedBody.bodyEnabled = false;
  }

  onDestroy() {
    this._sharedBody.reference = false;
    this._rigidBody = null;
    this._sharedBody = null;
  }
  /** INTERFACE */


  wakeUp(force = true) {
    _instantiated.bt.CollisionObject_activate(this.impl, force);
  }

  sleep() {
    return _instantiated.bt.RigidBody_wantsSleeping(this.impl);
  }

  setSleepThreshold(v) {
    this._wakeUpIfSleep();

    _instantiated.bt.RigidBody_setSleepingThresholds(this.impl, v, v);
  }

  getSleepThreshold() {
    return _instantiated.bt.RigidBody_getLinearSleepingThreshold(this.impl);
  }

  getLinearVelocity(out) {
    return (0, _bulletUtils.bullet2CocosVec3)(out, _instantiated.bt.RigidBody_getLinearVelocity(this.impl));
  }

  setLinearVelocity(value) {
    this._wakeUpIfSleep();

    (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.RigidBody_getLinearVelocity(this.impl), value);
  }

  getAngularVelocity(out) {
    return (0, _bulletUtils.bullet2CocosVec3)(out, _instantiated.bt.RigidBody_getAngularVelocity(this.impl));
  }

  setAngularVelocity(value) {
    this._wakeUpIfSleep();

    (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.RigidBody_getAngularVelocity(this.impl), value);
  }

  applyLocalForce(force, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    const quat = this._sharedBody.node.worldRotation;

    const v = _index.Vec3.transformQuat(v3_0, force, quat);

    const rp = rel_pos ? _index.Vec3.transformQuat(v3_1, rel_pos, quat) : _index.Vec3.ZERO;

    _instantiated.bt.RigidBody_applyForce(this.impl, (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, v), (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_1, rp));
  }

  applyLocalTorque(torque) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    _index.Vec3.transformQuat(v3_0, torque, this._sharedBody.node.worldRotation);

    _instantiated.bt.RigidBody_applyTorque(this.impl, (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, v3_0));
  }

  applyLocalImpulse(impulse, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    const quat = this._sharedBody.node.worldRotation;

    const v = _index.Vec3.transformQuat(v3_0, impulse, quat);

    const rp = rel_pos ? _index.Vec3.transformQuat(v3_1, rel_pos, quat) : _index.Vec3.ZERO;

    _instantiated.bt.RigidBody_applyImpulse(this.impl, (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, v), (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_1, rp));
  }

  applyForce(force, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    const rp = rel_pos || _index.Vec3.ZERO;

    _instantiated.bt.RigidBody_applyForce(this.impl, (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, force), (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_1, rp));
  }

  applyTorque(torque) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    _instantiated.bt.RigidBody_applyTorque(this.impl, (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, torque));
  }

  applyImpulse(impulse, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    const rp = rel_pos || _index.Vec3.ZERO;

    _instantiated.bt.RigidBody_applyImpulse(this.impl, (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, impulse), (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_1, rp));
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

  _wakeUpIfSleep() {
    if (!this.isAwake) {
      _instantiated.bt.CollisionObject_activate(this.impl, true);
    }
  }

}

exports.BulletRigidBody = BulletRigidBody;
BulletRigidBody.idCounter = 0;
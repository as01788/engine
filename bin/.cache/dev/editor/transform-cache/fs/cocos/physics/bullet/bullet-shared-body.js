"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletSharedBody = void 0;

var _nodeEnum = require("../../core/scene-graph/node-enum.js");

var _bulletUtils = require("./bullet-utils.js");

var _bulletEnum = require("./bullet-enum.js");

var _bulletCache = require("./bullet-cache.js");

var _index = require("../framework/index.js");

var _physicsEnum = require("../framework/physics-enum.js");

var _array = require("../../core/utils/array.js");

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
const quat_0 = _bulletCache.CC_QUAT_0;
let IDCounter = 0;
/**
 * shared object, node : shared = 1 : 1
 * body for static \ dynamic \ kinematic (collider)
 * ghost for trigger
 */

class BulletSharedBody {
  static getSharedBody(node, wrappedWorld, wrappedBody) {
    const key = node.uuid;
    let newSB;

    if (BulletSharedBody.sharedBodesMap.has(key)) {
      newSB = BulletSharedBody.sharedBodesMap.get(key);
    } else {
      newSB = new BulletSharedBody(node, wrappedWorld);
      const g = _physicsEnum.PhysicsGroup.DEFAULT;
      const m = _index.PhysicsSystem.instance.collisionMatrix[g];
      newSB._collisionFilterGroup = g;
      newSB._collisionFilterMask = m;
      BulletSharedBody.sharedBodesMap.set(node.uuid, newSB);
    }

    if (wrappedBody) {
      newSB._wrappedBody = wrappedBody;
      const g = wrappedBody.rigidBody.group;
      const m = _index.PhysicsSystem.instance.collisionMatrix[g];
      newSB._collisionFilterGroup = g;
      newSB._collisionFilterMask = m;
    }

    return newSB;
  }

  get wrappedBody() {
    return this._wrappedBody;
  }

  get bodyCompoundShape() {
    return this.bodyStruct.compound;
  }

  get ghostCompoundShape() {
    return this.ghostStruct.compound;
  }

  get body() {
    return this.bodyStruct.body;
  }

  get ghost() {
    return this.ghostStruct.ghost;
  }

  get collisionFilterGroup() {
    return this._collisionFilterGroup;
  }

  set collisionFilterGroup(v) {
    if (v !== this._collisionFilterGroup) {
      this._collisionFilterGroup = v;
      this.dirty |= _bulletEnum.EBtSharedBodyDirty.BODY_RE_ADD;
      this.dirty |= _bulletEnum.EBtSharedBodyDirty.GHOST_RE_ADD;
    }
  }

  get collisionFilterMask() {
    return this._collisionFilterMask;
  }

  set collisionFilterMask(v) {
    if (v !== this._collisionFilterMask) {
      this._collisionFilterMask = v;
      this.dirty |= _bulletEnum.EBtSharedBodyDirty.BODY_RE_ADD;
      this.dirty |= _bulletEnum.EBtSharedBodyDirty.GHOST_RE_ADD;
    }
  }

  get bodyStruct() {
    this._instantiateBodyStruct();

    return this._bodyStruct;
  }

  get ghostStruct() {
    this._instantiateGhostStruct();

    return this._ghostStruct;
  }

  /**
   * add or remove from world \
   * add, if enable \
   * remove, if disable & shapes.length == 0 & wrappedBody disable
   */
  set bodyEnabled(v) {
    if (v) {
      if (this.bodyIndex < 0) {
        // add to world only if it is a dynamic body or having shapes.
        if (this.bodyStruct.wrappedShapes.length === 0) {
          if (!this.wrappedBody) return;
          if (!this.wrappedBody.rigidBody.isDynamic) return;
        }

        this.bodyIndex = this.wrappedWorld.bodies.length;
        this.wrappedWorld.addSharedBody(this);
        this.syncInitialBody();
      }
    } else if (this.bodyIndex >= 0) {
      const isRemoveBody = this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody == null || this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody != null && !this.wrappedBody.isEnabled || this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody != null && !this.wrappedBody.rigidBody.enabledInHierarchy;

      if (isRemoveBody) {
        _instantiated.bt.RigidBody_clearState(this.body); // clear velocity etc.


        this.bodyIndex = -1;
        this.wrappedWorld.removeSharedBody(this);
      }
    }
  }

  set ghostEnabled(v) {
    if (v) {
      if (this.ghostIndex < 0 && this.ghostStruct.wrappedShapes.length > 0) {
        this.ghostIndex = 1;
        this.wrappedWorld.addGhostObject(this);
        this.syncInitialGhost();
      }
    } else if (this.ghostIndex >= 0) {
      /** remove trigger */
      const isRemoveGhost = this.ghostStruct.wrappedShapes.length === 0 && this.ghost;

      if (isRemoveGhost) {
        this.ghostIndex = -1;
        this.wrappedWorld.removeGhostObject(this);
      }
    }
  }

  set reference(v) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    v ? this.ref++ : this.ref--;

    if (this.ref === 0) {
      this.destroy();
    }
  }

  constructor(node, wrappedWorld) {
    this.id = void 0;
    this.node = void 0;
    this.wrappedWorld = void 0;
    this.wrappedJoints0 = [];
    this.wrappedJoints1 = [];
    this.dirty = 0;
    this._collisionFilterGroup = _index.PhysicsSystem.PhysicsGroup.DEFAULT;
    this._collisionFilterMask = -1;
    this.ref = 0;
    this.bodyIndex = -1;
    this.ghostIndex = -1;
    this._wrappedBody = null;
    this.id = BulletSharedBody.idCounter++;
    this.wrappedWorld = wrappedWorld;
    this.node = node;
  }

  _instantiateBodyStruct() {
    if (this._bodyStruct) return;
    let mass = 0;

    if (this._wrappedBody && this._wrappedBody.rigidBody.enabled && this._wrappedBody.rigidBody.isDynamic) {
      mass = this._wrappedBody.rigidBody.mass;
    }

    const trans = _bulletCache.BulletCache.instance.BT_TRANSFORM_0;
    const quat = _bulletCache.BulletCache.instance.BT_QUAT_0;
    (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.Transform_getOrigin(trans), this.node.worldPosition);
    (0, _bulletUtils.cocos2BulletQuat)(quat, this.node.worldRotation);

    _instantiated.bt.Transform_setRotation(trans, quat);

    const motionState = _instantiated.bt.ccMotionState_new(this.id, trans);

    const body = _instantiated.bt.RigidBody_new(mass, motionState);

    const sleepTd = _index.PhysicsSystem.instance.sleepThreshold;

    _instantiated.bt.RigidBody_setSleepingThresholds(body, sleepTd, sleepTd);

    this._bodyStruct = {
      id: IDCounter++,
      body,
      motionState,
      compound: _instantiated.bt.ccCompoundShape_new(),
      wrappedShapes: [],
      useCompound: false
    };

    _bulletCache.BulletCache.setWrapper(this.id, _instantiated.bt.BODY_CACHE_NAME, this);

    if (this._ghostStruct) _instantiated.bt.CollisionObject_setIgnoreCollisionCheck(this.ghost, this.body, true);
    if (this._wrappedBody) this.setBodyType(this._wrappedBody.rigidBody.type);
  }

  _instantiateGhostStruct() {
    if (this._ghostStruct) return;

    const ghost = _instantiated.bt.CollisionObject_new();

    const ghostShape = _instantiated.bt.ccCompoundShape_new();

    _instantiated.bt.CollisionObject_setCollisionShape(ghost, ghostShape);

    _instantiated.bt.CollisionObject_setCollisionFlags(ghost, _bulletEnum.btCollisionFlags.CF_STATIC_OBJECT | _bulletEnum.btCollisionFlags.CF_NO_CONTACT_RESPONSE);

    this._ghostStruct = {
      id: IDCounter++,
      ghost,
      compound: ghostShape,
      wrappedShapes: []
    };
    if (this._bodyStruct) _instantiated.bt.CollisionObject_setIgnoreCollisionCheck(this.body, this.ghost, true);
    if (this._wrappedBody) this.setGhostType(this._wrappedBody.rigidBody.type);
  }

  setType(v) {
    this.setBodyType(v);
    this.setGhostType(v);
  }

  setBodyType(v) {
    if (this._bodyStruct && this._wrappedBody) {
      const body = this._bodyStruct.body;
      const wrap = this._wrappedBody;
      const com = wrap.rigidBody;

      let m_bcf = _instantiated.bt.CollisionObject_getCollisionFlags(body);

      const localInertia = _bulletCache.BulletCache.instance.BT_V3_0;

      switch (v) {
        case _physicsEnum.ERigidBodyType.DYNAMIC:
          m_bcf &= ~_bulletEnum.btCollisionFlags.CF_KINEMATIC_OBJECT;
          m_bcf &= ~_bulletEnum.btCollisionFlags.CF_STATIC_OBJECT;

          _instantiated.bt.CollisionObject_setCollisionFlags(body, m_bcf);

          wrap.setMass(com.mass);
          wrap.useGravity(com.useGravity);
          wrap.setAllowSleep(com.allowSleep);
          break;

        case _physicsEnum.ERigidBodyType.KINEMATIC:
          _instantiated.bt.Vec3_set(localInertia, 0, 0, 0);

          _instantiated.bt.RigidBody_setMassProps(body, 0, localInertia);

          m_bcf |= _bulletEnum.btCollisionFlags.CF_KINEMATIC_OBJECT;
          m_bcf &= ~_bulletEnum.btCollisionFlags.CF_STATIC_OBJECT;

          _instantiated.bt.CollisionObject_setCollisionFlags(body, m_bcf);

          _instantiated.bt.CollisionObject_forceActivationState(body, _bulletEnum.btCollisionObjectStates.DISABLE_DEACTIVATION);

          break;

        case _physicsEnum.ERigidBodyType.STATIC:
        default:
          _instantiated.bt.Vec3_set(localInertia, 0, 0, 0);

          _instantiated.bt.RigidBody_setMassProps(body, 0, localInertia);

          m_bcf |= _bulletEnum.btCollisionFlags.CF_STATIC_OBJECT;
          m_bcf &= ~_bulletEnum.btCollisionFlags.CF_KINEMATIC_OBJECT;

          _instantiated.bt.CollisionObject_setCollisionFlags(body, m_bcf);

          _instantiated.bt.CollisionObject_forceActivationState(body, _bulletEnum.btCollisionObjectStates.ISLAND_SLEEPING);

          break;
      }

      this.dirty |= _bulletEnum.EBtSharedBodyDirty.BODY_RE_ADD;
    }
  }

  setGhostType(v) {
    if (this._ghostStruct) {
      const ghost = this._ghostStruct.ghost;

      let m_gcf = _instantiated.bt.CollisionObject_getCollisionFlags(ghost);

      switch (v) {
        case _physicsEnum.ERigidBodyType.DYNAMIC:
        case _physicsEnum.ERigidBodyType.KINEMATIC:
          m_gcf &= ~_bulletEnum.btCollisionFlags.CF_STATIC_OBJECT;
          m_gcf |= _bulletEnum.btCollisionFlags.CF_KINEMATIC_OBJECT;

          _instantiated.bt.CollisionObject_setCollisionFlags(ghost, m_gcf);

          _instantiated.bt.CollisionObject_forceActivationState(ghost, _bulletEnum.btCollisionObjectStates.DISABLE_DEACTIVATION);

          break;

        case _physicsEnum.ERigidBodyType.STATIC:
        default:
          m_gcf &= ~_bulletEnum.btCollisionFlags.CF_KINEMATIC_OBJECT;
          m_gcf |= _bulletEnum.btCollisionFlags.CF_STATIC_OBJECT;

          _instantiated.bt.CollisionObject_setCollisionFlags(ghost, m_gcf);

          _instantiated.bt.CollisionObject_forceActivationState(ghost, _bulletEnum.btCollisionObjectStates.ISLAND_SLEEPING);

          break;
      }

      this.dirty |= _bulletEnum.EBtSharedBodyDirty.GHOST_RE_ADD;
    }
  }

  addShape(v, isTrigger) {
    function switchShape(that, shape) {
      _instantiated.bt.CollisionObject_setCollisionShape(that.body, shape);

      that.dirty |= _bulletEnum.EBtSharedBodyDirty.BODY_RE_ADD;

      if (that._wrappedBody && that._wrappedBody.isEnabled) {
        that._wrappedBody.setMass(that._wrappedBody.rigidBody.mass);
      }
    }

    if (isTrigger) {
      const index = this.ghostStruct.wrappedShapes.indexOf(v);

      if (index < 0) {
        this.ghostStruct.wrappedShapes.push(v);
        v.setCompound(this.ghostCompoundShape);
        this.ghostEnabled = true;
      }
    } else {
      const index = this.bodyStruct.wrappedShapes.indexOf(v);

      if (index < 0) {
        this.bodyStruct.wrappedShapes.push(v);

        if (this.bodyStruct.useCompound) {
          v.setCompound(this.bodyCompoundShape);
        } else {
          const l = this.bodyStruct.wrappedShapes.length;

          if (l === 1 && !v.needCompound()) {
            switchShape(this, v.impl);
          } else {
            this.bodyStruct.useCompound = true;

            for (let i = 0; i < l; i++) {
              const childShape = this.bodyStruct.wrappedShapes[i];
              childShape.setCompound(this.bodyCompoundShape);
            }

            switchShape(this, this.bodyStruct.compound);
          }
        }

        this.bodyEnabled = true;
      }
    }
  }

  removeShape(v, isTrigger) {
    if (isTrigger) {
      const index = this.ghostStruct.wrappedShapes.indexOf(v);

      if (index >= 0) {
        (0, _array.fastRemoveAt)(this.ghostStruct.wrappedShapes, index);
        v.setCompound(0);
        this.ghostEnabled = false;
      }
    } else {
      const index = this.bodyStruct.wrappedShapes.indexOf(v);

      if (index >= 0) {
        if (this.bodyStruct.useCompound) {
          v.setCompound(0);
        } else {
          _instantiated.bt.CollisionObject_setCollisionShape(this.body, _instantiated.bt.EmptyShape_static());
        }

        _instantiated.bt.CollisionObject_activate(this.body, true);

        this.dirty |= _bulletEnum.EBtSharedBodyDirty.BODY_RE_ADD;
        (0, _array.fastRemoveAt)(this.bodyStruct.wrappedShapes, index);
        this.bodyEnabled = false;
      }
    }
  }

  addJoint(v, type) {
    if (type) {
      const i = this.wrappedJoints1.indexOf(v);
      if (i < 0) this.wrappedJoints1.push(v);
    } else {
      const i = this.wrappedJoints0.indexOf(v);
      if (i < 0) this.wrappedJoints0.push(v);
    }
  }

  removeJoint(v, type) {
    if (type) {
      const i = this.wrappedJoints1.indexOf(v);
      if (i >= 0) (0, _array.fastRemoveAt)(this.wrappedJoints1, i);
    } else {
      const i = this.wrappedJoints0.indexOf(v);
      if (i >= 0) (0, _array.fastRemoveAt)(this.wrappedJoints0, i);
    }
  }

  updateDirty() {
    if (this.dirty) {
      if (this.bodyIndex >= 0 && this.dirty & _bulletEnum.EBtSharedBodyDirty.BODY_RE_ADD) this.updateBodyByReAdd();
      if (this.ghostIndex >= 0 && this.dirty & _bulletEnum.EBtSharedBodyDirty.GHOST_RE_ADD) this.updateGhostByReAdd();
      this.dirty = 0;
    }
  }

  syncSceneToPhysics() {
    if (this.node.hasChangedFlags) {
      const bt_quat = _bulletCache.BulletCache.instance.BT_QUAT_0;

      const bt_transform = _instantiated.bt.CollisionObject_getWorldTransform(this.body);

      (0, _bulletUtils.cocos2BulletQuat)(bt_quat, this.node.worldRotation);
      (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.Transform_getOrigin(bt_transform), this.node.worldPosition);

      _instantiated.bt.Transform_setRotation(bt_transform, bt_quat);

      if (this.node.hasChangedFlags & _nodeEnum.TransformBit.SCALE) {
        this.syncBodyScale();
      }

      if (_instantiated.bt.CollisionObject_isKinematicObject(this.body)) {
        // Kinematic objects must be updated using motion state
        const ms = _instantiated.bt.RigidBody_getMotionState(this.body);

        if (ms) _instantiated.bt.MotionState_setWorldTransform(ms, bt_transform);
      } else if (this.isBodySleeping()) _instantiated.bt.CollisionObject_activate(this.body);
    }
  }

  syncPhysicsToScene() {
    if (_instantiated.bt.CollisionObject_isStaticOrKinematicObject(this.body)) return;
    this.syncPhysicsToGraphics();
  }

  syncPhysicsToGraphics() {
    if (this.isBodySleeping()) return;
    const bt_quat = _bulletCache.BulletCache.instance.BT_QUAT_0;
    const bt_transform = _bulletCache.BulletCache.instance.BT_TRANSFORM_0;

    _instantiated.bt.MotionState_getWorldTransform(_instantiated.bt.RigidBody_getMotionState(this.body), bt_transform);

    _instantiated.bt.Transform_getRotation(bt_transform, bt_quat);

    this.node.worldRotation = (0, _bulletUtils.bullet2CocosQuat)(quat_0, bt_quat);
    this.node.worldPosition = (0, _bulletUtils.bullet2CocosVec3)(v3_0, _instantiated.bt.Transform_getOrigin(bt_transform)); // sync node to ghost

    if (this._ghostStruct) {
      const bt_transform1 = _instantiated.bt.CollisionObject_getWorldTransform(this.ghost);

      (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.Transform_getOrigin(bt_transform1), this.node.worldPosition);
      (0, _bulletUtils.cocos2BulletQuat)(bt_quat, this.node.worldRotation);

      _instantiated.bt.Transform_setRotation(bt_transform1, bt_quat);
    }
  }

  syncSceneToGhost() {
    if (this.node.hasChangedFlags) {
      const bt_quat = _bulletCache.BulletCache.instance.BT_QUAT_0;

      const bt_transform = _instantiated.bt.CollisionObject_getWorldTransform(this.ghost);

      (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.Transform_getOrigin(bt_transform), this.node.worldPosition);
      (0, _bulletUtils.cocos2BulletQuat)(bt_quat, this.node.worldRotation);

      _instantiated.bt.Transform_setRotation(bt_transform, bt_quat);

      if (this.node.hasChangedFlags & _nodeEnum.TransformBit.SCALE) this.syncGhostScale();

      _instantiated.bt.CollisionObject_activate(this.ghost);
    }
  }

  syncInitialBody() {
    const bt_quat = _bulletCache.BulletCache.instance.BT_QUAT_0;

    const bt_transform = _instantiated.bt.CollisionObject_getWorldTransform(this.body);

    (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.Transform_getOrigin(bt_transform), this.node.worldPosition);
    (0, _bulletUtils.cocos2BulletQuat)(bt_quat, this.node.worldRotation);

    _instantiated.bt.Transform_setRotation(bt_transform, bt_quat);

    this.syncBodyScale();

    _instantiated.bt.CollisionObject_activate(this.body);
  }

  syncInitialGhost() {
    const bt_quat = _bulletCache.BulletCache.instance.BT_QUAT_0;

    const bt_transform = _instantiated.bt.CollisionObject_getWorldTransform(this.ghost);

    (0, _bulletUtils.cocos2BulletVec3)(_instantiated.bt.Transform_getOrigin(bt_transform), this.node.worldPosition);
    (0, _bulletUtils.cocos2BulletQuat)(bt_quat, this.node.worldRotation);

    _instantiated.bt.Transform_setRotation(bt_transform, bt_quat);

    this.syncGhostScale();

    _instantiated.bt.CollisionObject_activate(this.body);
  }

  syncBodyScale() {
    for (let i = 0; i < this.bodyStruct.wrappedShapes.length; i++) {
      this.bodyStruct.wrappedShapes[i].updateScale();
    }

    for (let i = 0; i < this.wrappedJoints0.length; i++) {
      this.wrappedJoints0[i].updateScale0();
    }

    for (let i = 0; i < this.wrappedJoints1.length; i++) {
      this.wrappedJoints1[i].updateScale1();
    }
  }

  syncGhostScale() {
    for (let i = 0; i < this.ghostStruct.wrappedShapes.length; i++) {
      this.ghostStruct.wrappedShapes[i].updateScale();
    }
  }
  /**
   * see: https://pybullet.org/Bullet/phpBB3/viewtopic.php?f=9&t=5312&p=19094&hilit=how+to+change+group+mask#p19097
   */


  updateBodyByReAdd() {
    if (this.bodyIndex >= 0) {
      this.wrappedWorld.removeSharedBody(this);
      this.bodyIndex = this.wrappedWorld.bodies.length;
      this.wrappedWorld.addSharedBody(this);
    }
  }

  updateGhostByReAdd() {
    if (this.ghostIndex >= 0) {
      this.wrappedWorld.removeGhostObject(this);
      this.ghostIndex = this.wrappedWorld.ghosts.length;
      this.wrappedWorld.addGhostObject(this);
    }
  }

  destroy() {
    BulletSharedBody.sharedBodesMap.delete(this.node.uuid);
    this.node = null;
    this.wrappedWorld = null;

    if (this._bodyStruct) {
      const bodyStruct = this._bodyStruct;

      _bulletCache.BulletCache.delWrapper(bodyStruct.body, _instantiated.bt.BODY_CACHE_NAME);

      _instantiated.bt.MotionState_del(bodyStruct.motionState);

      _instantiated.bt.CollisionShape_del(bodyStruct.compound);

      _instantiated.bt.CollisionObject_del(bodyStruct.body);

      this._bodyStruct = null;
    }

    if (this._ghostStruct) {
      const ghostStruct = this._ghostStruct;

      _instantiated.bt.CollisionShape_del(ghostStruct.compound);

      _instantiated.bt.CollisionObject_del(ghostStruct.ghost);

      this._ghostStruct = null;
    }
  }

  isBodySleeping() {
    return _instantiated.bt.CollisionObject_getActivationState(this.body) === _bulletEnum.btCollisionObjectStates.ISLAND_SLEEPING;
  }

}

exports.BulletSharedBody = BulletSharedBody;
BulletSharedBody.idCounter = 0;
BulletSharedBody.sharedBodesMap = new Map();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletWorld = void 0;

var _bulletSharedBody = require("./bullet-shared-body.js");

var _bulletShape = require("./shapes/bullet-shape.js");

var _arrayCollisionMatrix = require("../utils/array-collision-matrix.js");

var _tupleDictionary = require("../utils/tuple-dictionary.js");

var _bulletCache = require("./bullet-cache.js");

var _bulletUtils = require("./bullet-utils.js");

var _index = require("../../core/index.js");

var _bulletContactData = require("./bullet-contact-data.js");

var _array = require("../../core/utils/array.js");

var _instantiated = require("./instantiated.js");

/* eslint-disable new-cap */

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
const contactsPool = [];
const v3_0 = _bulletCache.CC_V3_0;
const v3_1 = _bulletCache.CC_V3_1;

class BulletWorld {
  setDefaultMaterial(v) {}

  setAllowSleep(v) {
    _instantiated.bt.ccDiscreteDynamicsWorld_setAllowSleep(this._world, v);
  }

  setGravity(gravity) {
    _instantiated.bt.DynamicsWorld_setGravity(this._world, (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, gravity));
  }

  updateNeedEmitEvents(v) {
    if (!this.ghosts) return; // return if destroyed

    if (v) {
      this._needEmitEvents = true;
    } else {
      this._needEmitEvents = false;

      for (let i = 0; i < this.ghosts.length; i++) {
        const ghost = this.ghosts[i];
        const shapes = ghost.ghostStruct.wrappedShapes;

        for (let j = 0; j < shapes.length; j++) {
          const collider = shapes[j].collider;

          if (collider.needCollisionEvent || collider.needTriggerEvent) {
            this._needEmitEvents = true;
            return;
          }
        }
      }

      for (let i = 0; i < this.bodies.length; i++) {
        const body = this.bodies[i];
        const shapes = body.bodyStruct.wrappedShapes;

        for (let j = 0; j < shapes.length; j++) {
          const collider = shapes[j].collider;

          if (collider.needCollisionEvent || collider.needTriggerEvent) {
            this._needEmitEvents = true;
            return;
          }
        }
      }
    }
  }

  get impl() {
    return this._world;
  }

  constructor() {
    this._world = void 0;
    this._broadphase = void 0;
    this._solver = void 0;
    this._dispatcher = void 0;
    this._needEmitEvents = false;
    this._needSyncAfterEvents = false;
    this.bodies = [];
    this.ghosts = [];
    this.constraints = [];
    this.triggerArrayMat = new _arrayCollisionMatrix.ArrayCollisionMatrix();
    this.collisionArrayMat = new _arrayCollisionMatrix.ArrayCollisionMatrix();
    this.contactsDic = new _tupleDictionary.TupleDictionary();
    this.oldContactsDic = new _tupleDictionary.TupleDictionary();
    this._broadphase = _instantiated.bt.DbvtBroadphase_new();
    this._dispatcher = _instantiated.bt.CollisionDispatcher_new();
    this._solver = _instantiated.bt.SequentialImpulseConstraintSolver_new();
    this._world = _instantiated.bt.ccDiscreteDynamicsWorld_new(this._dispatcher, this._broadphase, this._solver);
  }

  destroy() {
    if (this.constraints.length || this.bodies.length) (0, _index.error)('You should destroy all physics component first.');

    _instantiated.bt.CollisionWorld_del(this._world);

    _instantiated.bt.DbvtBroadphase_del(this._broadphase);

    _instantiated.bt.CollisionDispatcher_del(this._dispatcher);

    _instantiated.bt.SequentialImpulseConstraintSolver_del(this._solver);

    this.bodies = null;
    this.ghosts = null;
    this.constraints = null;
    this.triggerArrayMat = null;
    this.collisionArrayMat = null;
    this.contactsDic = null;
    this.oldContactsDic = null;
    contactsPool.length = 0;
  }

  step(deltaTime, timeSinceLastCalled, maxSubStep = 0) {
    if (!this.bodies.length && !this.ghosts.length) return;
    if (timeSinceLastCalled === undefined) timeSinceLastCalled = deltaTime;

    _instantiated.bt.DynamicsWorld_stepSimulation(this._world, timeSinceLastCalled, maxSubStep, deltaTime);
  }

  syncSceneToPhysics() {
    // Use reverse traversal order, because update dirty will mess up the ghosts or bodyies array.
    for (let i = this.ghosts.length - 1; i >= 0; i--) {
      const ghost = this.ghosts[i]; // Use temporary object, same reason as above

      ghost.updateDirty();
      ghost.syncSceneToGhost();
    }

    for (let i = this.bodies.length - 1; i >= 0; i--) {
      const body = this.bodies[i];
      body.updateDirty();
      body.syncSceneToPhysics();
    }
  }

  syncAfterEvents() {
    if (!this._needSyncAfterEvents) return;
    this.syncSceneToPhysics();
  }

  raycast(worldRay, options, pool, results) {
    worldRay.computeHit(v3_0, options.maxDistance);
    const to = (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, v3_0);
    const from = (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_1, worldRay.o);

    const allHitsCB = _instantiated.bt.ccAllRayCallback_static();

    _instantiated.bt.ccAllRayCallback_reset(allHitsCB, from, to, options.mask, options.queryTrigger);

    _instantiated.bt.CollisionWorld_rayTest(this._world, from, to, allHitsCB);

    if (_instantiated.bt.RayCallback_hasHit(allHitsCB)) {
      const posArray = _instantiated.bt.ccAllRayCallback_getHitPointWorld(allHitsCB);

      const normalArray = _instantiated.bt.ccAllRayCallback_getHitNormalWorld(allHitsCB);

      const ptrArray = _instantiated.bt.ccAllRayCallback_getCollisionShapePtrs(allHitsCB);

      for (let i = 0, n = _instantiated.bt.int_array_size(ptrArray); i < n; i++) {
        (0, _bulletUtils.bullet2CocosVec3)(v3_0, _instantiated.bt.Vec3_array_at(posArray, i));
        (0, _bulletUtils.bullet2CocosVec3)(v3_1, _instantiated.bt.Vec3_array_at(normalArray, i));

        const shape = _bulletCache.BulletCache.getWrapper(_instantiated.bt.int_array_at(ptrArray, i), _bulletShape.BulletShape.TYPE);

        const r = pool.add();
        results.push(r);

        r._assign(v3_0, _index.Vec3.distance(worldRay.o, v3_0), shape.collider, v3_1);
      }

      return true;
    }

    return false;
  }

  raycastClosest(worldRay, options, result) {
    worldRay.computeHit(v3_0, options.maxDistance);
    const to = (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_0, v3_0);
    const from = (0, _bulletUtils.cocos2BulletVec3)(_bulletCache.BulletCache.instance.BT_V3_1, worldRay.o);

    const closeHitCB = _instantiated.bt.ccClosestRayCallback_static();

    _instantiated.bt.ccClosestRayCallback_reset(closeHitCB, from, to, options.mask, options.queryTrigger);

    _instantiated.bt.CollisionWorld_rayTest(this._world, from, to, closeHitCB);

    if (_instantiated.bt.RayCallback_hasHit(closeHitCB)) {
      (0, _bulletUtils.bullet2CocosVec3)(v3_0, _instantiated.bt.ccClosestRayCallback_getHitPointWorld(closeHitCB));
      (0, _bulletUtils.bullet2CocosVec3)(v3_1, _instantiated.bt.ccClosestRayCallback_getHitNormalWorld(closeHitCB));

      const shape = _bulletCache.BulletCache.getWrapper(_instantiated.bt.ccClosestRayCallback_getCollisionShapePtr(closeHitCB), _bulletShape.BulletShape.TYPE);

      result._assign(v3_0, _index.Vec3.distance(worldRay.o, v3_0), shape.collider, v3_1);

      return true;
    }

    return false;
  }

  getSharedBody(node, wrappedBody) {
    return _bulletSharedBody.BulletSharedBody.getSharedBody(node, this, wrappedBody);
  }

  addSharedBody(sharedBody) {
    const i = this.bodies.indexOf(sharedBody);

    if (i < 0) {
      this.bodies.push(sharedBody);

      _instantiated.bt.DynamicsWorld_addRigidBody(this._world, sharedBody.body, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
    }
  }

  removeSharedBody(sharedBody) {
    const i = this.bodies.indexOf(sharedBody);

    if (i >= 0) {
      (0, _array.fastRemoveAt)(this.bodies, i);

      _instantiated.bt.DynamicsWorld_removeRigidBody(this._world, sharedBody.body);
    }
  }

  addGhostObject(sharedBody) {
    const i = this.ghosts.indexOf(sharedBody);

    if (i < 0) {
      this.ghosts.push(sharedBody);

      _instantiated.bt.CollisionWorld_addCollisionObject(this._world, sharedBody.ghost, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
    }
  }

  removeGhostObject(sharedBody) {
    const i = this.ghosts.indexOf(sharedBody);

    if (i >= 0) {
      (0, _array.fastRemoveAt)(this.ghosts, i);

      _instantiated.bt.CollisionWorld_removeCollisionObject(this._world, sharedBody.ghost);
    }
  }

  addConstraint(constraint) {
    const i = this.constraints.indexOf(constraint);

    if (i < 0) {
      this.constraints.push(constraint);

      _instantiated.bt.DynamicsWorld_addConstraint(this.impl, constraint.impl, !constraint.constraint.enableCollision);

      constraint.index = i;
    }
  }

  removeConstraint(constraint) {
    const i = this.constraints.indexOf(constraint);

    if (i >= 0) {
      this.constraints.splice(i, 1);

      _instantiated.bt.DynamicsWorld_removeConstraint(this.impl, constraint.impl);

      constraint.index = -1;
    }
  }

  emitEvents() {
    this._needSyncAfterEvents = false;
    if (!this._needEmitEvents) return;
    this.gatherConatactData(); // is enter or stay

    let dicL = this.contactsDic.getLength();

    while (dicL--) {
      contactsPool.push.apply(contactsPool, _bulletCache.CollisionEventObject.contacts);
      _bulletCache.CollisionEventObject.contacts.length = 0;
      const key = this.contactsDic.getKeyByIndex(dicL);
      const data = this.contactsDic.getDataByKey(key);
      const shape0 = data.shape0;
      const shape1 = data.shape1;
      this.oldContactsDic.set(shape0.id, shape1.id, data);
      const collider0 = shape0.collider;
      const collider1 = shape1.collider;

      if (collider0 && collider1) {
        const isTrigger = collider0.isTrigger || collider1.isTrigger;

        if (isTrigger) {
          if (this.triggerArrayMat.get(shape0.id, shape1.id)) {
            _bulletCache.TriggerEventObject.type = 'onTriggerStay';
          } else {
            _bulletCache.TriggerEventObject.type = 'onTriggerEnter';
            this.triggerArrayMat.set(shape0.id, shape1.id, true);
          }

          _bulletCache.TriggerEventObject.impl = data.impl;
          _bulletCache.TriggerEventObject.selfCollider = collider0;
          _bulletCache.TriggerEventObject.otherCollider = collider1;
          collider0.emit(_bulletCache.TriggerEventObject.type, _bulletCache.TriggerEventObject);
          _bulletCache.TriggerEventObject.selfCollider = collider1;
          _bulletCache.TriggerEventObject.otherCollider = collider0;
          collider1.emit(_bulletCache.TriggerEventObject.type, _bulletCache.TriggerEventObject);
          this._needSyncAfterEvents = true;
        } else {
          const body0 = collider0.attachedRigidBody;
          const body1 = collider1.attachedRigidBody;

          if (body0 && body1) {
            if (body0.isSleeping && body1.isSleeping) continue;
          } else if (!body0 && body1) {
            if (body1.isSleeping) continue;
          } else if (!body1 && body0) {
            if (body0.isSleeping) continue;
          }

          if (this.collisionArrayMat.get(shape0.id, shape1.id)) {
            _bulletCache.CollisionEventObject.type = 'onCollisionStay';
          } else {
            _bulletCache.CollisionEventObject.type = 'onCollisionEnter';
            this.collisionArrayMat.set(shape0.id, shape1.id, true);
          }

          for (let i = 0; i < data.contacts.length; i++) {
            const cq = data.contacts[i];

            if (contactsPool.length > 0) {
              const c = contactsPool.pop();
              c.impl = cq;

              _bulletCache.CollisionEventObject.contacts.push(c);
            } else {
              const c = new _bulletContactData.BulletContactData(_bulletCache.CollisionEventObject);
              c.impl = cq;

              _bulletCache.CollisionEventObject.contacts.push(c);
            }
          }

          _bulletCache.CollisionEventObject.impl = data.impl;
          _bulletCache.CollisionEventObject.selfCollider = collider0;
          _bulletCache.CollisionEventObject.otherCollider = collider1;
          collider0.emit(_bulletCache.CollisionEventObject.type, _bulletCache.CollisionEventObject);
          _bulletCache.CollisionEventObject.selfCollider = collider1;
          _bulletCache.CollisionEventObject.otherCollider = collider0;
          collider1.emit(_bulletCache.CollisionEventObject.type, _bulletCache.CollisionEventObject);
          this._needSyncAfterEvents = true;
        }

        if (this.oldContactsDic.get(shape0.id, shape1.id) == null) {
          this.oldContactsDic.set(shape0.id, shape1.id, data);
        }
      }
    } // is exit


    let oldDicL = this.oldContactsDic.getLength();

    while (oldDicL--) {
      const key = this.oldContactsDic.getKeyByIndex(oldDicL);
      const data = this.oldContactsDic.getDataByKey(key);
      const shape0 = data.shape0;
      const shape1 = data.shape1;
      const collider0 = shape0.collider;
      const collider1 = shape1.collider;

      if (collider0 && collider1) {
        const isTrigger = collider0.isTrigger || collider1.isTrigger;

        if (this.contactsDic.getDataByKey(key) == null) {
          if (isTrigger) {
            if (this.triggerArrayMat.get(shape0.id, shape1.id)) {
              _bulletCache.TriggerEventObject.type = 'onTriggerExit';
              _bulletCache.TriggerEventObject.selfCollider = collider0;
              _bulletCache.TriggerEventObject.otherCollider = collider1;
              collider0.emit(_bulletCache.TriggerEventObject.type, _bulletCache.TriggerEventObject);
              _bulletCache.TriggerEventObject.selfCollider = collider1;
              _bulletCache.TriggerEventObject.otherCollider = collider0;
              collider1.emit(_bulletCache.TriggerEventObject.type, _bulletCache.TriggerEventObject);
              this.triggerArrayMat.set(shape0.id, shape1.id, false);
              this.oldContactsDic.set(shape0.id, shape1.id, null);
              this._needSyncAfterEvents = true;
            }
          } else if (this.collisionArrayMat.get(shape0.id, shape1.id)) {
            contactsPool.push.apply(contactsPool, _bulletCache.CollisionEventObject.contacts);
            _bulletCache.CollisionEventObject.contacts.length = 0;
            _bulletCache.CollisionEventObject.type = 'onCollisionExit';
            _bulletCache.CollisionEventObject.selfCollider = collider0;
            _bulletCache.CollisionEventObject.otherCollider = collider1;
            collider0.emit(_bulletCache.CollisionEventObject.type, _bulletCache.CollisionEventObject);
            _bulletCache.CollisionEventObject.selfCollider = collider1;
            _bulletCache.CollisionEventObject.otherCollider = collider0;
            collider1.emit(_bulletCache.CollisionEventObject.type, _bulletCache.CollisionEventObject);
            this.collisionArrayMat.set(shape0.id, shape1.id, false);
            this.oldContactsDic.set(shape0.id, shape1.id, null);
            this._needSyncAfterEvents = true;
          }
        }
      }
    }

    this.contactsDic.reset();
  }

  gatherConatactData() {
    const numManifolds = _instantiated.bt.Dispatcher_getNumManifolds(this._dispatcher);

    for (let i = 0; i < numManifolds; i++) {
      const manifold = _instantiated.bt.Dispatcher_getManifoldByIndexInternal(this._dispatcher, i);

      const numContacts = _instantiated.bt.PersistentManifold_getNumContacts(manifold);

      for (let j = 0; j < numContacts; j++) {
        const manifoldPoint = _instantiated.bt.PersistentManifold_getContactPoint(manifold, j);

        const s0 = _instantiated.bt.ManifoldPoint_getShape0(manifoldPoint);

        const s1 = _instantiated.bt.ManifoldPoint_getShape1(manifoldPoint);

        const shape0 = _bulletCache.BulletCache.getWrapper(s0, _bulletShape.BulletShape.TYPE);

        const shape1 = _bulletCache.BulletCache.getWrapper(s1, _bulletShape.BulletShape.TYPE);

        if (shape0.collider.needTriggerEvent || shape1.collider.needTriggerEvent || shape0.collider.needCollisionEvent || shape1.collider.needCollisionEvent) {
          // current contact
          let item = this.contactsDic.get(shape0.id, shape1.id);

          if (!item) {
            item = this.contactsDic.set(shape0.id, shape1.id, {
              shape0,
              shape1,
              contacts: [],
              impl: manifold
            });
          }

          item.contacts.push(manifoldPoint);
        }
      }
    }
  }

}

exports.BulletWorld = BulletWorld;
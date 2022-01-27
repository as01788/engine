System.register("q-bundled:///fs/cocos/physics/bullet/bullet-world.js", ["./bullet-shared-body.js", "./shapes/bullet-shape.js", "../utils/array-collision-matrix.js", "../utils/tuple-dictionary.js", "./bullet-cache.js", "./bullet-utils.js", "../../core/index.js", "./bullet-contact-data.js", "../../core/utils/array.js", "./instantiated.js"], function (_export, _context) {
  "use strict";

  var BulletSharedBody, BulletShape, ArrayCollisionMatrix, TupleDictionary, TriggerEventObject, CollisionEventObject, CC_V3_0, CC_V3_1, BulletCache, bullet2CocosVec3, cocos2BulletVec3, error, Vec3, BulletContactData, fastRemoveAt, bt, contactsPool, v3_0, v3_1, BulletWorld;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_bulletSharedBodyJs) {
      BulletSharedBody = _bulletSharedBodyJs.BulletSharedBody;
    }, function (_shapesBulletShapeJs) {
      BulletShape = _shapesBulletShapeJs.BulletShape;
    }, function (_utilsArrayCollisionMatrixJs) {
      ArrayCollisionMatrix = _utilsArrayCollisionMatrixJs.ArrayCollisionMatrix;
    }, function (_utilsTupleDictionaryJs) {
      TupleDictionary = _utilsTupleDictionaryJs.TupleDictionary;
    }, function (_bulletCacheJs) {
      TriggerEventObject = _bulletCacheJs.TriggerEventObject;
      CollisionEventObject = _bulletCacheJs.CollisionEventObject;
      CC_V3_0 = _bulletCacheJs.CC_V3_0;
      CC_V3_1 = _bulletCacheJs.CC_V3_1;
      BulletCache = _bulletCacheJs.BulletCache;
    }, function (_bulletUtilsJs) {
      bullet2CocosVec3 = _bulletUtilsJs.bullet2CocosVec3;
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }, function (_coreIndexJs) {
      error = _coreIndexJs.error;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_bulletContactDataJs) {
      BulletContactData = _bulletContactDataJs.BulletContactData;
    }, function (_coreUtilsArrayJs) {
      fastRemoveAt = _coreUtilsArrayJs.fastRemoveAt;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      contactsPool = [];
      v3_0 = CC_V3_0;
      v3_1 = CC_V3_1;

      _export("BulletWorld", BulletWorld = /*#__PURE__*/function () {
        var _proto = BulletWorld.prototype;

        _proto.setDefaultMaterial = function setDefaultMaterial(v) {};

        _proto.setAllowSleep = function setAllowSleep(v) {
          bt.ccDiscreteDynamicsWorld_setAllowSleep(this._world, v);
        };

        _proto.setGravity = function setGravity(gravity) {
          bt.DynamicsWorld_setGravity(this._world, cocos2BulletVec3(BulletCache.instance.BT_V3_0, gravity));
        };

        _proto.updateNeedEmitEvents = function updateNeedEmitEvents(v) {
          if (!this.ghosts) return; // return if destroyed

          if (v) {
            this._needEmitEvents = true;
          } else {
            this._needEmitEvents = false;

            for (var i = 0; i < this.ghosts.length; i++) {
              var ghost = this.ghosts[i];
              var shapes = ghost.ghostStruct.wrappedShapes;

              for (var j = 0; j < shapes.length; j++) {
                var collider = shapes[j].collider;

                if (collider.needCollisionEvent || collider.needTriggerEvent) {
                  this._needEmitEvents = true;
                  return;
                }
              }
            }

            for (var _i = 0; _i < this.bodies.length; _i++) {
              var body = this.bodies[_i];
              var _shapes = body.bodyStruct.wrappedShapes;

              for (var _j = 0; _j < _shapes.length; _j++) {
                var _collider = _shapes[_j].collider;

                if (_collider.needCollisionEvent || _collider.needTriggerEvent) {
                  this._needEmitEvents = true;
                  return;
                }
              }
            }
          }
        };

        function BulletWorld() {
          this._world = void 0;
          this._broadphase = void 0;
          this._solver = void 0;
          this._dispatcher = void 0;
          this._needEmitEvents = false;
          this._needSyncAfterEvents = false;
          this.bodies = [];
          this.ghosts = [];
          this.constraints = [];
          this.triggerArrayMat = new ArrayCollisionMatrix();
          this.collisionArrayMat = new ArrayCollisionMatrix();
          this.contactsDic = new TupleDictionary();
          this.oldContactsDic = new TupleDictionary();
          this._broadphase = bt.DbvtBroadphase_new();
          this._dispatcher = bt.CollisionDispatcher_new();
          this._solver = bt.SequentialImpulseConstraintSolver_new();
          this._world = bt.ccDiscreteDynamicsWorld_new(this._dispatcher, this._broadphase, this._solver);
        }

        _proto.destroy = function destroy() {
          if (this.constraints.length || this.bodies.length) error('You should destroy all physics component first.');
          bt.CollisionWorld_del(this._world);
          bt.DbvtBroadphase_del(this._broadphase);
          bt.CollisionDispatcher_del(this._dispatcher);
          bt.SequentialImpulseConstraintSolver_del(this._solver);
          this.bodies = null;
          this.ghosts = null;
          this.constraints = null;
          this.triggerArrayMat = null;
          this.collisionArrayMat = null;
          this.contactsDic = null;
          this.oldContactsDic = null;
          contactsPool.length = 0;
        };

        _proto.step = function step(deltaTime, timeSinceLastCalled, maxSubStep) {
          if (maxSubStep === void 0) {
            maxSubStep = 0;
          }

          if (!this.bodies.length && !this.ghosts.length) return;
          if (timeSinceLastCalled === undefined) timeSinceLastCalled = deltaTime;
          bt.DynamicsWorld_stepSimulation(this._world, timeSinceLastCalled, maxSubStep, deltaTime);
        };

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          // Use reverse traversal order, because update dirty will mess up the ghosts or bodyies array.
          for (var i = this.ghosts.length - 1; i >= 0; i--) {
            var ghost = this.ghosts[i]; // Use temporary object, same reason as above

            ghost.updateDirty();
            ghost.syncSceneToGhost();
          }

          for (var _i2 = this.bodies.length - 1; _i2 >= 0; _i2--) {
            var body = this.bodies[_i2];
            body.updateDirty();
            body.syncSceneToPhysics();
          }
        };

        _proto.syncAfterEvents = function syncAfterEvents() {
          if (!this._needSyncAfterEvents) return;
          this.syncSceneToPhysics();
        };

        _proto.raycast = function raycast(worldRay, options, pool, results) {
          worldRay.computeHit(v3_0, options.maxDistance);
          var to = cocos2BulletVec3(BulletCache.instance.BT_V3_0, v3_0);
          var from = cocos2BulletVec3(BulletCache.instance.BT_V3_1, worldRay.o);
          var allHitsCB = bt.ccAllRayCallback_static();
          bt.ccAllRayCallback_reset(allHitsCB, from, to, options.mask, options.queryTrigger);
          bt.CollisionWorld_rayTest(this._world, from, to, allHitsCB);

          if (bt.RayCallback_hasHit(allHitsCB)) {
            var posArray = bt.ccAllRayCallback_getHitPointWorld(allHitsCB);
            var normalArray = bt.ccAllRayCallback_getHitNormalWorld(allHitsCB);
            var ptrArray = bt.ccAllRayCallback_getCollisionShapePtrs(allHitsCB);

            for (var i = 0, n = bt.int_array_size(ptrArray); i < n; i++) {
              bullet2CocosVec3(v3_0, bt.Vec3_array_at(posArray, i));
              bullet2CocosVec3(v3_1, bt.Vec3_array_at(normalArray, i));
              var shape = BulletCache.getWrapper(bt.int_array_at(ptrArray, i), BulletShape.TYPE);
              var r = pool.add();
              results.push(r);

              r._assign(v3_0, Vec3.distance(worldRay.o, v3_0), shape.collider, v3_1);
            }

            return true;
          }

          return false;
        };

        _proto.raycastClosest = function raycastClosest(worldRay, options, result) {
          worldRay.computeHit(v3_0, options.maxDistance);
          var to = cocos2BulletVec3(BulletCache.instance.BT_V3_0, v3_0);
          var from = cocos2BulletVec3(BulletCache.instance.BT_V3_1, worldRay.o);
          var closeHitCB = bt.ccClosestRayCallback_static();
          bt.ccClosestRayCallback_reset(closeHitCB, from, to, options.mask, options.queryTrigger);
          bt.CollisionWorld_rayTest(this._world, from, to, closeHitCB);

          if (bt.RayCallback_hasHit(closeHitCB)) {
            bullet2CocosVec3(v3_0, bt.ccClosestRayCallback_getHitPointWorld(closeHitCB));
            bullet2CocosVec3(v3_1, bt.ccClosestRayCallback_getHitNormalWorld(closeHitCB));
            var shape = BulletCache.getWrapper(bt.ccClosestRayCallback_getCollisionShapePtr(closeHitCB), BulletShape.TYPE);

            result._assign(v3_0, Vec3.distance(worldRay.o, v3_0), shape.collider, v3_1);

            return true;
          }

          return false;
        };

        _proto.getSharedBody = function getSharedBody(node, wrappedBody) {
          return BulletSharedBody.getSharedBody(node, this, wrappedBody);
        };

        _proto.addSharedBody = function addSharedBody(sharedBody) {
          var i = this.bodies.indexOf(sharedBody);

          if (i < 0) {
            this.bodies.push(sharedBody);
            bt.DynamicsWorld_addRigidBody(this._world, sharedBody.body, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
          }
        };

        _proto.removeSharedBody = function removeSharedBody(sharedBody) {
          var i = this.bodies.indexOf(sharedBody);

          if (i >= 0) {
            fastRemoveAt(this.bodies, i);
            bt.DynamicsWorld_removeRigidBody(this._world, sharedBody.body);
          }
        };

        _proto.addGhostObject = function addGhostObject(sharedBody) {
          var i = this.ghosts.indexOf(sharedBody);

          if (i < 0) {
            this.ghosts.push(sharedBody);
            bt.CollisionWorld_addCollisionObject(this._world, sharedBody.ghost, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
          }
        };

        _proto.removeGhostObject = function removeGhostObject(sharedBody) {
          var i = this.ghosts.indexOf(sharedBody);

          if (i >= 0) {
            fastRemoveAt(this.ghosts, i);
            bt.CollisionWorld_removeCollisionObject(this._world, sharedBody.ghost);
          }
        };

        _proto.addConstraint = function addConstraint(constraint) {
          var i = this.constraints.indexOf(constraint);

          if (i < 0) {
            this.constraints.push(constraint);
            bt.DynamicsWorld_addConstraint(this.impl, constraint.impl, !constraint.constraint.enableCollision);
            constraint.index = i;
          }
        };

        _proto.removeConstraint = function removeConstraint(constraint) {
          var i = this.constraints.indexOf(constraint);

          if (i >= 0) {
            this.constraints.splice(i, 1);
            bt.DynamicsWorld_removeConstraint(this.impl, constraint.impl);
            constraint.index = -1;
          }
        };

        _proto.emitEvents = function emitEvents() {
          this._needSyncAfterEvents = false;
          if (!this._needEmitEvents) return;
          this.gatherConatactData(); // is enter or stay

          var dicL = this.contactsDic.getLength();

          while (dicL--) {
            contactsPool.push.apply(contactsPool, CollisionEventObject.contacts);
            CollisionEventObject.contacts.length = 0;
            var key = this.contactsDic.getKeyByIndex(dicL);
            var data = this.contactsDic.getDataByKey(key);
            var shape0 = data.shape0;
            var shape1 = data.shape1;
            this.oldContactsDic.set(shape0.id, shape1.id, data);
            var collider0 = shape0.collider;
            var collider1 = shape1.collider;

            if (collider0 && collider1) {
              var isTrigger = collider0.isTrigger || collider1.isTrigger;

              if (isTrigger) {
                if (this.triggerArrayMat.get(shape0.id, shape1.id)) {
                  TriggerEventObject.type = 'onTriggerStay';
                } else {
                  TriggerEventObject.type = 'onTriggerEnter';
                  this.triggerArrayMat.set(shape0.id, shape1.id, true);
                }

                TriggerEventObject.impl = data.impl;
                TriggerEventObject.selfCollider = collider0;
                TriggerEventObject.otherCollider = collider1;
                collider0.emit(TriggerEventObject.type, TriggerEventObject);
                TriggerEventObject.selfCollider = collider1;
                TriggerEventObject.otherCollider = collider0;
                collider1.emit(TriggerEventObject.type, TriggerEventObject);
                this._needSyncAfterEvents = true;
              } else {
                var body0 = collider0.attachedRigidBody;
                var body1 = collider1.attachedRigidBody;

                if (body0 && body1) {
                  if (body0.isSleeping && body1.isSleeping) continue;
                } else if (!body0 && body1) {
                  if (body1.isSleeping) continue;
                } else if (!body1 && body0) {
                  if (body0.isSleeping) continue;
                }

                if (this.collisionArrayMat.get(shape0.id, shape1.id)) {
                  CollisionEventObject.type = 'onCollisionStay';
                } else {
                  CollisionEventObject.type = 'onCollisionEnter';
                  this.collisionArrayMat.set(shape0.id, shape1.id, true);
                }

                for (var i = 0; i < data.contacts.length; i++) {
                  var cq = data.contacts[i];

                  if (contactsPool.length > 0) {
                    var c = contactsPool.pop();
                    c.impl = cq;
                    CollisionEventObject.contacts.push(c);
                  } else {
                    var _c = new BulletContactData(CollisionEventObject);

                    _c.impl = cq;
                    CollisionEventObject.contacts.push(_c);
                  }
                }

                CollisionEventObject.impl = data.impl;
                CollisionEventObject.selfCollider = collider0;
                CollisionEventObject.otherCollider = collider1;
                collider0.emit(CollisionEventObject.type, CollisionEventObject);
                CollisionEventObject.selfCollider = collider1;
                CollisionEventObject.otherCollider = collider0;
                collider1.emit(CollisionEventObject.type, CollisionEventObject);
                this._needSyncAfterEvents = true;
              }

              if (this.oldContactsDic.get(shape0.id, shape1.id) == null) {
                this.oldContactsDic.set(shape0.id, shape1.id, data);
              }
            }
          } // is exit


          var oldDicL = this.oldContactsDic.getLength();

          while (oldDicL--) {
            var _key = this.oldContactsDic.getKeyByIndex(oldDicL);

            var _data = this.oldContactsDic.getDataByKey(_key);

            var _shape = _data.shape0;
            var _shape2 = _data.shape1;
            var _collider2 = _shape.collider;
            var _collider3 = _shape2.collider;

            if (_collider2 && _collider3) {
              var _isTrigger = _collider2.isTrigger || _collider3.isTrigger;

              if (this.contactsDic.getDataByKey(_key) == null) {
                if (_isTrigger) {
                  if (this.triggerArrayMat.get(_shape.id, _shape2.id)) {
                    TriggerEventObject.type = 'onTriggerExit';
                    TriggerEventObject.selfCollider = _collider2;
                    TriggerEventObject.otherCollider = _collider3;

                    _collider2.emit(TriggerEventObject.type, TriggerEventObject);

                    TriggerEventObject.selfCollider = _collider3;
                    TriggerEventObject.otherCollider = _collider2;

                    _collider3.emit(TriggerEventObject.type, TriggerEventObject);

                    this.triggerArrayMat.set(_shape.id, _shape2.id, false);
                    this.oldContactsDic.set(_shape.id, _shape2.id, null);
                    this._needSyncAfterEvents = true;
                  }
                } else if (this.collisionArrayMat.get(_shape.id, _shape2.id)) {
                  contactsPool.push.apply(contactsPool, CollisionEventObject.contacts);
                  CollisionEventObject.contacts.length = 0;
                  CollisionEventObject.type = 'onCollisionExit';
                  CollisionEventObject.selfCollider = _collider2;
                  CollisionEventObject.otherCollider = _collider3;

                  _collider2.emit(CollisionEventObject.type, CollisionEventObject);

                  CollisionEventObject.selfCollider = _collider3;
                  CollisionEventObject.otherCollider = _collider2;

                  _collider3.emit(CollisionEventObject.type, CollisionEventObject);

                  this.collisionArrayMat.set(_shape.id, _shape2.id, false);
                  this.oldContactsDic.set(_shape.id, _shape2.id, null);
                  this._needSyncAfterEvents = true;
                }
              }
            }
          }

          this.contactsDic.reset();
        };

        _proto.gatherConatactData = function gatherConatactData() {
          var numManifolds = bt.Dispatcher_getNumManifolds(this._dispatcher);

          for (var i = 0; i < numManifolds; i++) {
            var manifold = bt.Dispatcher_getManifoldByIndexInternal(this._dispatcher, i);
            var numContacts = bt.PersistentManifold_getNumContacts(manifold);

            for (var j = 0; j < numContacts; j++) {
              var manifoldPoint = bt.PersistentManifold_getContactPoint(manifold, j);
              var s0 = bt.ManifoldPoint_getShape0(manifoldPoint);
              var s1 = bt.ManifoldPoint_getShape1(manifoldPoint);
              var shape0 = BulletCache.getWrapper(s0, BulletShape.TYPE);
              var shape1 = BulletCache.getWrapper(s1, BulletShape.TYPE);

              if (shape0.collider.needTriggerEvent || shape1.collider.needTriggerEvent || shape0.collider.needCollisionEvent || shape1.collider.needCollisionEvent) {
                // current contact
                var item = this.contactsDic.get(shape0.id, shape1.id);

                if (!item) {
                  item = this.contactsDic.set(shape0.id, shape1.id, {
                    shape0: shape0,
                    shape1: shape1,
                    contacts: [],
                    impl: manifold
                  });
                }

                item.contacts.push(manifoldPoint);
              }
            }
          }
        };

        _createClass(BulletWorld, [{
          key: "impl",
          get: function get() {
            return this._world;
          }
        }]);

        return BulletWorld;
      }());
    }
  };
});
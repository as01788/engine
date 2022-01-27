System.register("q-bundled:///fs/cocos/physics/bullet/bullet-rigid-body.js", ["../../core/index.js", "./bullet-utils.js", "../../../exports/physics-framework.js", "./bullet-enum.js", "./bullet-cache.js", "./instantiated.js"], function (_export, _context) {
  "use strict";

  var Vec3, cocos2BulletVec3, bullet2CocosVec3, PhysicsSystem, btRigidBodyFlags, btCollisionObjectStates, EBtSharedBodyDirty, BulletCache, CC_V3_0, CC_V3_1, bt, v3_0, v3_1, BulletRigidBody;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
    }, function (_bulletUtilsJs) {
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
      bullet2CocosVec3 = _bulletUtilsJs.bullet2CocosVec3;
    }, function (_exportsPhysicsFrameworkJs) {
      PhysicsSystem = _exportsPhysicsFrameworkJs.PhysicsSystem;
    }, function (_bulletEnumJs) {
      btRigidBodyFlags = _bulletEnumJs.btRigidBodyFlags;
      btCollisionObjectStates = _bulletEnumJs.btCollisionObjectStates;
      EBtSharedBodyDirty = _bulletEnumJs.EBtSharedBodyDirty;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
      CC_V3_0 = _bulletCacheJs.CC_V3_0;
      CC_V3_1 = _bulletCacheJs.CC_V3_1;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      v3_0 = CC_V3_0;
      v3_1 = CC_V3_1;

      _export("BulletRigidBody", BulletRigidBody = /*#__PURE__*/function () {
        var _proto = BulletRigidBody.prototype;

        _proto.setMass = function setMass(value) {
          if (!this._rigidBody.isDynamic) return;
          bt.RigidBody_setMass(this.impl, value);

          this._wakeUpIfSleep();

          this._sharedBody.dirty |= EBtSharedBodyDirty.BODY_RE_ADD;
        };

        _proto.setType = function setType(v) {
          this._sharedBody.setType(v);
        };

        _proto.setLinearDamping = function setLinearDamping(value) {
          bt.RigidBody_setDamping(this.impl, this._rigidBody.linearDamping, this._rigidBody.angularDamping);
        };

        _proto.setAngularDamping = function setAngularDamping(value) {
          bt.RigidBody_setDamping(this.impl, this._rigidBody.linearDamping, this._rigidBody.angularDamping);
        };

        _proto.useGravity = function useGravity(value) {
          if (!this._rigidBody.isDynamic) return;
          var m_rigidBodyFlag = bt.RigidBody_getFlags(this.impl);

          if (value) {
            m_rigidBodyFlag &= ~btRigidBodyFlags.BT_DISABLE_WORLD_GRAVITY;
          } else {
            bt.RigidBody_setGravity(this.impl, cocos2BulletVec3(BulletCache.instance.BT_V3_0, Vec3.ZERO));
            m_rigidBodyFlag |= btRigidBodyFlags.BT_DISABLE_WORLD_GRAVITY;
          }

          bt.RigidBody_setFlags(this.impl, m_rigidBodyFlag);

          this._wakeUpIfSleep();

          this._sharedBody.dirty |= EBtSharedBodyDirty.BODY_RE_ADD;
        };

        _proto.useCCD = function useCCD(value) {
          bt.CollisionObject_setCcdMotionThreshold(this.impl, value ? 0.01 : 0);
          bt.CollisionObject_setCcdSweptSphereRadius(this.impl, value ? 0.1 : 0);
          this._isUsingCCD = value;
        };

        _proto.isUsingCCD = function isUsingCCD() {
          return this._isUsingCCD;
        };

        _proto.setLinearFactor = function setLinearFactor(v) {
          bt.RigidBody_setLinearFactor(this.impl, cocos2BulletVec3(BulletCache.instance.BT_V3_0, v));

          this._wakeUpIfSleep();
        };

        _proto.setAngularFactor = function setAngularFactor(v) {
          bt.RigidBody_setAngularFactor(this.impl, cocos2BulletVec3(BulletCache.instance.BT_V3_0, v));

          this._wakeUpIfSleep();
        };

        _proto.setAllowSleep = function setAllowSleep(v) {
          if (!this._rigidBody.isDynamic) return;

          if (v) {
            bt.CollisionObject_forceActivationState(this.impl, btCollisionObjectStates.ACTIVE_TAG);
          } else {
            bt.CollisionObject_forceActivationState(this.impl, btCollisionObjectStates.DISABLE_DEACTIVATION);
          }

          this._wakeUpIfSleep();
        };

        function BulletRigidBody() {
          this.id = void 0;
          this._isEnabled = false;
          this._isUsingCCD = false;
          this.id = BulletRigidBody.idCounter++;
        }

        _proto.clearState = function clearState() {
          bt.RigidBody_clearState(this.impl);
        };

        _proto.clearVelocity = function clearVelocity() {
          this.setLinearVelocity(Vec3.ZERO);
          this.setAngularVelocity(Vec3.ZERO);
        };

        _proto.clearForces = function clearForces() {
          bt.RigidBody_clearForces(this.impl);
        }
        /** LIFECYCLE */
        ;

        _proto.initialize = function initialize(com) {
          this._rigidBody = com;
          this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(this._rigidBody.node, this);
          this._sharedBody.reference = true;
        };

        _proto.onEnable = function onEnable() {
          this._isEnabled = true;
          this.setMass(this._rigidBody.mass);
          this.setAllowSleep(this._rigidBody.allowSleep);
          this.setLinearDamping(this._rigidBody.linearDamping);
          this.setAngularDamping(this._rigidBody.angularDamping);
          this.setLinearFactor(this._rigidBody.linearFactor);
          this.setAngularFactor(this._rigidBody.angularFactor);
          this.useGravity(this._rigidBody.useGravity);
          this._sharedBody.bodyEnabled = true;
        };

        _proto.onDisable = function onDisable() {
          this._isEnabled = false;
          this._sharedBody.bodyEnabled = false;
        };

        _proto.onDestroy = function onDestroy() {
          this._sharedBody.reference = false;
          this._rigidBody = null;
          this._sharedBody = null;
        }
        /** INTERFACE */
        ;

        _proto.wakeUp = function wakeUp(force) {
          if (force === void 0) {
            force = true;
          }

          bt.CollisionObject_activate(this.impl, force);
        };

        _proto.sleep = function sleep() {
          return bt.RigidBody_wantsSleeping(this.impl);
        };

        _proto.setSleepThreshold = function setSleepThreshold(v) {
          this._wakeUpIfSleep();

          bt.RigidBody_setSleepingThresholds(this.impl, v, v);
        };

        _proto.getSleepThreshold = function getSleepThreshold() {
          return bt.RigidBody_getLinearSleepingThreshold(this.impl);
        };

        _proto.getLinearVelocity = function getLinearVelocity(out) {
          return bullet2CocosVec3(out, bt.RigidBody_getLinearVelocity(this.impl));
        };

        _proto.setLinearVelocity = function setLinearVelocity(value) {
          this._wakeUpIfSleep();

          cocos2BulletVec3(bt.RigidBody_getLinearVelocity(this.impl), value);
        };

        _proto.getAngularVelocity = function getAngularVelocity(out) {
          return bullet2CocosVec3(out, bt.RigidBody_getAngularVelocity(this.impl));
        };

        _proto.setAngularVelocity = function setAngularVelocity(value) {
          this._wakeUpIfSleep();

          cocos2BulletVec3(bt.RigidBody_getAngularVelocity(this.impl), value);
        };

        _proto.applyLocalForce = function applyLocalForce(force, rel_pos) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          var quat = this._sharedBody.node.worldRotation;
          var v = Vec3.transformQuat(v3_0, force, quat);
          var rp = rel_pos ? Vec3.transformQuat(v3_1, rel_pos, quat) : Vec3.ZERO;
          bt.RigidBody_applyForce(this.impl, cocos2BulletVec3(BulletCache.instance.BT_V3_0, v), cocos2BulletVec3(BulletCache.instance.BT_V3_1, rp));
        };

        _proto.applyLocalTorque = function applyLocalTorque(torque) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          Vec3.transformQuat(v3_0, torque, this._sharedBody.node.worldRotation);
          bt.RigidBody_applyTorque(this.impl, cocos2BulletVec3(BulletCache.instance.BT_V3_0, v3_0));
        };

        _proto.applyLocalImpulse = function applyLocalImpulse(impulse, rel_pos) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          var quat = this._sharedBody.node.worldRotation;
          var v = Vec3.transformQuat(v3_0, impulse, quat);
          var rp = rel_pos ? Vec3.transformQuat(v3_1, rel_pos, quat) : Vec3.ZERO;
          bt.RigidBody_applyImpulse(this.impl, cocos2BulletVec3(BulletCache.instance.BT_V3_0, v), cocos2BulletVec3(BulletCache.instance.BT_V3_1, rp));
        };

        _proto.applyForce = function applyForce(force, rel_pos) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          var rp = rel_pos || Vec3.ZERO;
          bt.RigidBody_applyForce(this.impl, cocos2BulletVec3(BulletCache.instance.BT_V3_0, force), cocos2BulletVec3(BulletCache.instance.BT_V3_1, rp));
        };

        _proto.applyTorque = function applyTorque(torque) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          bt.RigidBody_applyTorque(this.impl, cocos2BulletVec3(BulletCache.instance.BT_V3_0, torque));
        };

        _proto.applyImpulse = function applyImpulse(impulse, rel_pos) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          var rp = rel_pos || Vec3.ZERO;
          bt.RigidBody_applyImpulse(this.impl, cocos2BulletVec3(BulletCache.instance.BT_V3_0, impulse), cocos2BulletVec3(BulletCache.instance.BT_V3_1, rp));
        };

        _proto.getGroup = function getGroup() {
          return this._sharedBody.collisionFilterGroup;
        };

        _proto.setGroup = function setGroup(v) {
          this._sharedBody.collisionFilterGroup = v;
        };

        _proto.addGroup = function addGroup(v) {
          this._sharedBody.collisionFilterGroup |= v;
        };

        _proto.removeGroup = function removeGroup(v) {
          this._sharedBody.collisionFilterGroup &= ~v;
        };

        _proto.getMask = function getMask() {
          return this._sharedBody.collisionFilterMask;
        };

        _proto.setMask = function setMask(v) {
          this._sharedBody.collisionFilterMask = v;
        };

        _proto.addMask = function addMask(v) {
          this._sharedBody.collisionFilterMask |= v;
        };

        _proto.removeMask = function removeMask(v) {
          this._sharedBody.collisionFilterMask &= ~v;
        };

        _proto._wakeUpIfSleep = function _wakeUpIfSleep() {
          if (!this.isAwake) {
            bt.CollisionObject_activate(this.impl, true);
          }
        };

        _createClass(BulletRigidBody, [{
          key: "isAwake",
          get: function get() {
            var state = bt.CollisionObject_getActivationState(this.impl);
            return state === btCollisionObjectStates.ACTIVE_TAG || state === btCollisionObjectStates.DISABLE_DEACTIVATION;
          }
        }, {
          key: "isSleepy",
          get: function get() {
            var state = bt.CollisionObject_getActivationState(this.impl);
            return state === btCollisionObjectStates.WANTS_DEACTIVATION;
          }
        }, {
          key: "isSleeping",
          get: function get() {
            var state = bt.CollisionObject_getActivationState(this.impl);
            return state === btCollisionObjectStates.ISLAND_SLEEPING;
          }
        }, {
          key: "impl",
          get: function get() {
            return this._sharedBody.body;
          }
        }, {
          key: "rigidBody",
          get: function get() {
            return this._rigidBody;
          }
        }, {
          key: "sharedBody",
          get: function get() {
            return this._sharedBody;
          }
        }, {
          key: "isEnabled",
          get: function get() {
            return this._isEnabled;
          }
        }]);

        return BulletRigidBody;
      }());

      BulletRigidBody.idCounter = 0;
    }
  };
});
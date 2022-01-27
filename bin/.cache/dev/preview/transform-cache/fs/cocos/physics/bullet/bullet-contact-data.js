System.register("q-bundled:///fs/cocos/physics/bullet/bullet-contact-data.js", ["../../core/index.js", "./bullet-cache.js", "./instantiated.js", "./bullet-utils.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, CC_QUAT_0, BulletCache, bt, bullet2CocosQuat, bullet2CocosVec3, BulletContactData;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
    }, function (_bulletCacheJs) {
      CC_QUAT_0 = _bulletCacheJs.CC_QUAT_0;
      BulletCache = _bulletCacheJs.BulletCache;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }, function (_bulletUtilsJs) {
      bullet2CocosQuat = _bulletUtilsJs.bullet2CocosQuat;
      bullet2CocosVec3 = _bulletUtilsJs.bullet2CocosVec3;
    }],
    execute: function () {
      _export("BulletContactData", BulletContactData = /*#__PURE__*/function () {
        function BulletContactData(event) {
          this.impl = 0;
          this.event = event;
        }

        var _proto = BulletContactData.prototype;

        _proto.getLocalPointOnA = function getLocalPointOnA(out) {
          if (this.impl) bullet2CocosVec3(out, bt.ManifoldPoint_get_m_localPointA(this.impl));
        };

        _proto.getLocalPointOnB = function getLocalPointOnB(out) {
          if (this.impl) bullet2CocosVec3(out, bt.ManifoldPoint_get_m_localPointB(this.impl));
        };

        _proto.getWorldPointOnA = function getWorldPointOnA(out) {
          if (this.impl) bullet2CocosVec3(out, bt.ManifoldPoint_get_m_positionWorldOnA(this.impl));
        };

        _proto.getWorldPointOnB = function getWorldPointOnB(out) {
          if (this.impl) bullet2CocosVec3(out, bt.ManifoldPoint_get_m_positionWorldOnB(this.impl));
        };

        _proto.getLocalNormalOnA = function getLocalNormalOnA(out) {
          if (this.impl) {
            var bt_rot = BulletCache.instance.BT_QUAT_0;
            var body = bt.PersistentManifold_getBody0(this.impl);
            var trans = bt.CollisionObject_getWorldTransform(body);
            bt.Transform_getRotation(trans, bt_rot);
            var inv_rot = CC_QUAT_0;
            bullet2CocosQuat(inv_rot, bt_rot);
            Quat.conjugate(inv_rot, inv_rot);
            bullet2CocosVec3(out, bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
            if (!this.isBodyA) Vec3.negate(out, out);
            Vec3.transformQuat(out, out, inv_rot);
          }
        };

        _proto.getLocalNormalOnB = function getLocalNormalOnB(out) {
          if (this.impl) {
            var bt_rot = BulletCache.instance.BT_QUAT_0;
            var body = bt.PersistentManifold_getBody1(this.impl);
            var trans = bt.CollisionObject_getWorldTransform(body);
            bt.Transform_getRotation(trans, bt_rot);
            var inv_rot = CC_QUAT_0;
            bullet2CocosQuat(inv_rot, bt_rot);
            Quat.conjugate(inv_rot, inv_rot);
            bullet2CocosVec3(out, bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
            Vec3.transformQuat(out, out, inv_rot);
          }
        };

        _proto.getWorldNormalOnA = function getWorldNormalOnA(out) {
          if (this.impl) {
            bullet2CocosVec3(out, bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
            if (!this.isBodyA) Vec3.negate(out, out);
          }
        };

        _proto.getWorldNormalOnB = function getWorldNormalOnB(out) {
          if (this.impl) bullet2CocosVec3(out, bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
        };

        _createClass(BulletContactData, [{
          key: "isBodyA",
          get: function get() {
            var sb = this.event.selfCollider.shape.sharedBody.body;
            return sb === bt.PersistentManifold_getBody0(this.impl);
          }
        }]);

        return BulletContactData;
      }());
    }
  };
});
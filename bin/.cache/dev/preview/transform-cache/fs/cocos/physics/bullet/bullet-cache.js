System.register("q-bundled:///fs/cocos/physics/bullet/bullet-cache.js", ["../../core/index.js", "./instantiated.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, bt, TriggerEventObject, CollisionEventObject, BulletCache, CC_V3_0, CC_V3_1, CC_QUAT_0;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      _export("TriggerEventObject", TriggerEventObject = {
        type: 'onTriggerEnter',
        selfCollider: null,
        otherCollider: null,
        impl: null
      });

      _export("CollisionEventObject", CollisionEventObject = {
        type: 'onCollisionEnter',
        selfCollider: null,
        otherCollider: null,
        contacts: [],
        impl: null
      });

      _export("BulletCache", BulletCache = /*#__PURE__*/function () {
        function BulletCache() {
          this.BT_TRANSFORM_0 = bt.Transform_new();
          this.BT_TRANSFORM_1 = bt.Transform_new();
          this.BT_V3_0 = bt.Vec3_new(0, 0, 0);
          this.BT_V3_1 = bt.Vec3_new(0, 0, 0);
          this.BT_V3_2 = bt.Vec3_new(0, 0, 0);
          this.BT_QUAT_0 = bt.Quat_new(0, 0, 0, 1);
        }

        BulletCache.setWrapper = function setWrapper(impl, type, wrap) {
          if (!this.ROOT[type]) this.ROOT[type] = {};
          this.ROOT[type][impl] = wrap;
        };

        BulletCache.delWrapper = function delWrapper(impl, type) {
          delete this.ROOT[type][impl];
        };

        BulletCache.getWrapper = function getWrapper(ptr, type) {
          return this.ROOT[type][ptr];
        };

        BulletCache.isNotEmptyShape = function isNotEmptyShape(ptr) {
          return ptr !== bt.EmptyShape_static();
        };

        _createClass(BulletCache, null, [{
          key: "instance",
          get: function get() {
            if (BulletCache._instance == null) BulletCache._instance = new BulletCache();
            return BulletCache._instance;
          }
        }]);

        return BulletCache;
      }());

      BulletCache._instance = void 0;
      BulletCache.ROOT = {};

      _export("CC_V3_0", CC_V3_0 = new Vec3());

      _export("CC_V3_1", CC_V3_1 = new Vec3());

      _export("CC_QUAT_0", CC_QUAT_0 = new Quat());

      bt.CACHE = BulletCache;
    }
  };
});
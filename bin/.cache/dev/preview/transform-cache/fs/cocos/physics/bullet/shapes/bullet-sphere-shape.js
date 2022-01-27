System.register("q-bundled:///fs/cocos/physics/bullet/shapes/bullet-sphere-shape.js", ["./bullet-shape.js", "../../../../exports/physics-framework.js", "../bullet-utils.js", "../bullet-cache.js", "../instantiated.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var BulletShape, PhysicsSystem, cocos2BulletVec3, BulletCache, CC_V3_0, bt, absMaxComponent, BulletSphereShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletShapeJs) {
      BulletShape = _bulletShapeJs.BulletShape;
    }, function (_exportsPhysicsFrameworkJs) {
      PhysicsSystem = _exportsPhysicsFrameworkJs.PhysicsSystem;
    }, function (_bulletUtilsJs) {
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
      CC_V3_0 = _bulletCacheJs.CC_V3_0;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }, function (_coreIndexJs) {
      absMaxComponent = _coreIndexJs.absMaxComponent;
    }],
    execute: function () {
      _export("BulletSphereShape", BulletSphereShape = /*#__PURE__*/function (_BulletShape) {
        _inheritsLoose(BulletSphereShape, _BulletShape);

        function BulletSphereShape() {
          return _BulletShape.apply(this, arguments) || this;
        }

        var _proto = BulletSphereShape.prototype;

        _proto.updateRadius = function updateRadius() {
          bt.SphereShape_setUnscaledRadius(this.impl, this.getMinUnscaledRadius());
          this.updateCompoundTransform();
        };

        _proto.onComponentSet = function onComponentSet() {
          this._impl = bt.SphereShape_new(this.getMinUnscaledRadius());
          this.updateScale();
        };

        _proto.updateScale = function updateScale() {
          _BulletShape.prototype.updateScale.call(this);

          var scale = this.getMinScale();
          CC_V3_0.set(scale, scale, scale);
          var bt_v3 = BulletCache.instance.BT_V3_0;
          bt.CollisionShape_setLocalScaling(this._impl, cocos2BulletVec3(bt_v3, CC_V3_0));
          this.updateCompoundTransform();
        };

        _proto.getMinUnscaledRadius = function getMinUnscaledRadius() {
          var radius = this.collider.radius;
          var ws = Math.abs(absMaxComponent(this._collider.node.worldScale));
          var minVolumeSize = PhysicsSystem.instance.minVolumeSize;
          return ws * radius < minVolumeSize ? minVolumeSize / ws : radius;
        };

        _proto.getMinScale = function getMinScale() {
          var radius = this.collider.radius;
          var ws = Math.abs(absMaxComponent(this._collider.node.worldScale));
          var minVolumeSize = PhysicsSystem.instance.minVolumeSize;
          return ws * radius < minVolumeSize ? minVolumeSize / radius : ws;
        };

        _createClass(BulletSphereShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BulletSphereShape;
      }(BulletShape));
    }
  };
});
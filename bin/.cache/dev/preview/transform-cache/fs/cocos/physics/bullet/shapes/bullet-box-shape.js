System.register("q-bundled:///fs/cocos/physics/bullet/shapes/bullet-box-shape.js", ["./bullet-shape.js", "../../../../exports/physics-framework.js", "../../utils/util.js", "../bullet-utils.js", "../bullet-cache.js", "../instantiated.js"], function (_export, _context) {
  "use strict";

  var BulletShape, PhysicsSystem, absolute, VEC3_0, cocos2BulletVec3, BulletCache, bt, BulletBoxShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletShapeJs) {
      BulletShape = _bulletShapeJs.BulletShape;
    }, function (_exportsPhysicsFrameworkJs) {
      PhysicsSystem = _exportsPhysicsFrameworkJs.PhysicsSystem;
    }, function (_utilsUtilJs) {
      absolute = _utilsUtilJs.absolute;
      VEC3_0 = _utilsUtilJs.VEC3_0;
    }, function (_bulletUtilsJs) {
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      _export("BulletBoxShape", BulletBoxShape = /*#__PURE__*/function (_BulletShape) {
        _inheritsLoose(BulletBoxShape, _BulletShape);

        function BulletBoxShape() {
          return _BulletShape.apply(this, arguments) || this;
        }

        var _proto = BulletBoxShape.prototype;

        _proto.updateSize = function updateSize() {
          var hf = BulletCache.instance.BT_V3_0;
          cocos2BulletVec3(hf, this.getMinUnscaledHalfExtents(VEC3_0));
          bt.BoxShape_setUnscaledHalfExtents(this.impl, hf);
          this.updateCompoundTransform();
        };

        _proto.onComponentSet = function onComponentSet() {
          var hf = BulletCache.instance.BT_V3_0;
          cocos2BulletVec3(hf, this.getMinUnscaledHalfExtents(VEC3_0));
          this._impl = bt.BoxShape_new(hf);
          this.updateScale();
        };

        _proto.updateScale = function updateScale() {
          _BulletShape.prototype.updateScale.call(this);

          var bt_v3 = BulletCache.instance.BT_V3_0;
          bt.CollisionShape_setLocalScaling(this._impl, cocos2BulletVec3(bt_v3, this.getMinScale(VEC3_0)));
          this.updateCompoundTransform();
        };

        _proto.getMinUnscaledHalfExtents = function getMinUnscaledHalfExtents(out) {
          var size = this.collider.size;
          var ws = absolute(VEC3_0.set(this._collider.node.worldScale));
          var minVolumeSize = PhysicsSystem.instance.minVolumeSize;
          var halfSizeX = size.x / 2;
          var halfSizeY = size.y / 2;
          var halfSizeZ = size.z / 2;
          var halfX = halfSizeX * ws.x < minVolumeSize ? minVolumeSize / ws.x : halfSizeX;
          var halfY = halfSizeY * ws.y < minVolumeSize ? minVolumeSize / ws.y : halfSizeY;
          var halfZ = halfSizeZ * ws.z < minVolumeSize ? minVolumeSize / ws.z : halfSizeZ;
          out.set(halfX, halfY, halfZ);
          return out;
        };

        _proto.getMinScale = function getMinScale(out) {
          var size = this.collider.size;
          var ws = absolute(VEC3_0.set(this._collider.node.worldScale));
          var minVolumeSize = PhysicsSystem.instance.minVolumeSize;
          var halfSizeX = size.x / 2;
          var halfSizeY = size.y / 2;
          var halfSizeZ = size.z / 2;
          var scaleX = halfSizeX * ws.x < minVolumeSize ? minVolumeSize / halfSizeX : ws.x;
          var scaleY = halfSizeY * ws.y < minVolumeSize ? minVolumeSize / halfSizeY : ws.y;
          var scaleZ = halfSizeZ * ws.z < minVolumeSize ? minVolumeSize / halfSizeZ : ws.z;
          out.set(scaleX, scaleY, scaleZ);
          return out;
        };

        _createClass(BulletBoxShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BulletBoxShape;
      }(BulletShape));
    }
  };
});
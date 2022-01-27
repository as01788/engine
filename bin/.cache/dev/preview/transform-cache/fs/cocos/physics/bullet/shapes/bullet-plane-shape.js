System.register("q-bundled:///fs/cocos/physics/bullet/shapes/bullet-plane-shape.js", ["./bullet-shape.js", "../bullet-utils.js", "../bullet-cache.js", "../instantiated.js"], function (_export, _context) {
  "use strict";

  var BulletShape, cocos2BulletVec3, BulletCache, bt, BulletPlaneShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletShapeJs) {
      BulletShape = _bulletShapeJs.BulletShape;
    }, function (_bulletUtilsJs) {
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      _export("BulletPlaneShape", BulletPlaneShape = /*#__PURE__*/function (_BulletShape) {
        _inheritsLoose(BulletPlaneShape, _BulletShape);

        function BulletPlaneShape() {
          return _BulletShape.apply(this, arguments) || this;
        }

        var _proto = BulletPlaneShape.prototype;

        _proto.setNormal = function setNormal(v) {
          cocos2BulletVec3(bt.StaticPlaneShape_getPlaneNormal(this.impl), v);
          this.updateCompoundTransform();
        };

        _proto.setConstant = function setConstant(v) {
          bt.StaticPlaneShape_setPlaneConstant(this.impl, v);
          this.updateCompoundTransform();
        };

        _proto.updateScale = function updateScale() {
          _BulletShape.prototype.updateScale.call(this);

          var bt_v3 = BulletCache.instance.BT_V3_0;
          cocos2BulletVec3(bt_v3, this._collider.node.worldScale);
          bt.CollisionShape_setLocalScaling(this._impl, bt_v3);
          this.updateCompoundTransform();
        };

        _proto.onComponentSet = function onComponentSet() {
          var normal = BulletCache.instance.BT_V3_0;
          cocos2BulletVec3(normal, this.collider.normal);
          this._impl = bt.StaticPlaneShape_new(normal, this.collider.constant);
          this.updateScale();
        };

        _createClass(BulletPlaneShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BulletPlaneShape;
      }(BulletShape));
    }
  };
});
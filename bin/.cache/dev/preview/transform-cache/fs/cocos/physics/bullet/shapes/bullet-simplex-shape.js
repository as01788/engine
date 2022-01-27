System.register("q-bundled:///fs/cocos/physics/bullet/shapes/bullet-simplex-shape.js", ["./bullet-shape.js", "../bullet-utils.js", "../instantiated.js", "../bullet-cache.js"], function (_export, _context) {
  "use strict";

  var BulletShape, cocos2BulletVec3, bt, BulletCache, BulletSimplexShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletShapeJs) {
      BulletShape = _bulletShapeJs.BulletShape;
    }, function (_bulletUtilsJs) {
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
    }],
    execute: function () {
      _export("BulletSimplexShape", BulletSimplexShape = /*#__PURE__*/function (_BulletShape) {
        _inheritsLoose(BulletSimplexShape, _BulletShape);

        function BulletSimplexShape() {
          return _BulletShape.apply(this, arguments) || this;
        }

        var _proto = BulletSimplexShape.prototype;

        _proto.setShapeType = function setShapeType(v) {// TODO:
        };

        _proto.setVertices = function setVertices(v) {// TODO:
        };

        _proto.onComponentSet = function onComponentSet() {
          this._impl = bt.SimplexShape_new();
          var length = this.collider.shapeType;
          var vertices = this.collider.vertices;
          var bt_v3 = BulletCache.instance.BT_V3_0;

          for (var i = 0; i < length; i++) {
            bt.SimplexShape_addVertex(this._impl, cocos2BulletVec3(bt_v3, vertices[i]));
          }

          bt.CollisionShape_setLocalScaling(this._impl, cocos2BulletVec3(bt_v3, this._collider.node.worldScale));
        };

        _proto.onLoad = function onLoad() {
          _BulletShape.prototype.onLoad.call(this);

          this.collider.updateVertices();
        };

        _proto.updateScale = function updateScale() {
          _BulletShape.prototype.updateScale.call(this);

          var bt_v3 = BulletCache.instance.BT_V3_0;
          bt.CollisionShape_setLocalScaling(this._impl, cocos2BulletVec3(bt_v3, this._collider.node.worldScale));
        };

        _createClass(BulletSimplexShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BulletSimplexShape;
      }(BulletShape));
    }
  };
});
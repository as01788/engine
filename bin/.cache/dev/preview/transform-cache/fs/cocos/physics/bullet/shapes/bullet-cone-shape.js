System.register("q-bundled:///fs/cocos/physics/bullet/shapes/bullet-cone-shape.js", ["./bullet-shape.js", "../../../core/index.js", "../instantiated.js", "../bullet-cache.js"], function (_export, _context) {
  "use strict";

  var BulletShape, absMax, bt, BulletCache, BulletConeShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletShapeJs) {
      BulletShape = _bulletShapeJs.BulletShape;
    }, function (_coreIndexJs) {
      absMax = _coreIndexJs.absMax;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
    }],
    execute: function () {
      _export("BulletConeShape", BulletConeShape = /*#__PURE__*/function (_BulletShape) {
        _inheritsLoose(BulletConeShape, _BulletShape);

        function BulletConeShape() {
          return _BulletShape.apply(this, arguments) || this;
        }

        var _proto = BulletConeShape.prototype;

        _proto.setHeight = function setHeight(v) {
          this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.setDirection = function setDirection(v) {
          this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.setRadius = function setRadius(v) {
          this.updateProperties(this.collider.radius, this.collider.height, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.onComponentSet = function onComponentSet() {
          this._impl = bt.ConeShape_new(0.5, 1);
          this.setRadius(this.collider.radius);
        };

        _proto.updateScale = function updateScale() {
          _BulletShape.prototype.updateScale.call(this);

          this.setRadius(this.collider.radius);
        };

        _proto.updateProperties = function updateProperties(radius, height, direction, scale) {
          var ws = scale;
          var upAxis = direction;
          var wr;
          var wh;

          if (upAxis === 1) {
            wh = height * Math.abs(ws.y);
            wr = radius * Math.abs(absMax(ws.x, ws.z));
          } else if (upAxis === 0) {
            wh = height * Math.abs(ws.x);
            wr = radius * Math.abs(absMax(ws.y, ws.z));
          } else {
            wh = height * Math.abs(ws.z);
            wr = radius * Math.abs(absMax(ws.x, ws.y));
          }

          bt.ConeShape_setRadius(this._impl, wr);
          bt.ConeShape_setHeight(this._impl, wh);
          bt.ConeShape_setConeUpIndex(this._impl, upAxis);
          var bt_v3 = BulletCache.instance.BT_V3_0;
          bt.Vec3_set(bt_v3, 1, 1, 1);
          bt.CollisionShape_setLocalScaling(this._impl, bt_v3);
          this.updateCompoundTransform();
        };

        _createClass(BulletConeShape, [{
          key: "impl",
          get: function get() {
            return this._impl;
          }
        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BulletConeShape;
      }(BulletShape));
    }
  };
});
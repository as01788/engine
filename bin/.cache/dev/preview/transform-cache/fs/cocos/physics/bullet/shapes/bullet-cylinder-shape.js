System.register("q-bundled:///fs/cocos/physics/bullet/shapes/bullet-cylinder-shape.js", ["./bullet-shape.js", "../../../core/index.js", "../bullet-cache.js", "../instantiated.js"], function (_export, _context) {
  "use strict";

  var BulletShape, absMax, BulletCache, bt, BulletCylinderShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletShapeJs) {
      BulletShape = _bulletShapeJs.BulletShape;
    }, function (_coreIndexJs) {
      absMax = _coreIndexJs.absMax;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      _export("BulletCylinderShape", BulletCylinderShape = /*#__PURE__*/function (_BulletShape) {
        _inheritsLoose(BulletCylinderShape, _BulletShape);

        function BulletCylinderShape() {
          return _BulletShape.apply(this, arguments) || this;
        }

        var _proto = BulletCylinderShape.prototype;

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
          var bt_v3 = BulletCache.instance.BT_V3_0;
          bt.Vec3_set(bt_v3, 0.5, 1, 0.5);
          this._impl = bt.CylinderShape_new(bt_v3);
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

          bt.CylinderShape_updateProp(this._impl, wr, wh / 2, upAxis);
          this.updateCompoundTransform();
        };

        _createClass(BulletCylinderShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BulletCylinderShape;
      }(BulletShape));
    }
  };
});
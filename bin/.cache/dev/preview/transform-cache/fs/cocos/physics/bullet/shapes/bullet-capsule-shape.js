System.register("q-bundled:///fs/cocos/physics/bullet/shapes/bullet-capsule-shape.js", ["../../../core/index.js", "./bullet-shape.js", "../instantiated.js"], function (_export, _context) {
  "use strict";

  var absMax, BulletShape, bt, BulletCapsuleShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      absMax = _coreIndexJs.absMax;
    }, function (_bulletShapeJs) {
      BulletShape = _bulletShapeJs.BulletShape;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      _export("BulletCapsuleShape", BulletCapsuleShape = /*#__PURE__*/function (_BulletShape) {
        _inheritsLoose(BulletCapsuleShape, _BulletShape);

        function BulletCapsuleShape() {
          return _BulletShape.apply(this, arguments) || this;
        }

        var _proto = BulletCapsuleShape.prototype;

        _proto.setCylinderHeight = function setCylinderHeight(v) {
          this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.setDirection = function setDirection(v) {
          this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.setRadius = function setRadius(v) {
          this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
        };

        _proto.onComponentSet = function onComponentSet() {
          this._impl = bt.CapsuleShape_new(0.5, 1);
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
          var halfH;

          if (upAxis === 1) {
            wr = radius * Math.abs(absMax(ws.x, ws.z));
            halfH = height / 2 * Math.abs(ws.y);
          } else if (upAxis === 0) {
            wr = radius * Math.abs(absMax(ws.y, ws.z));
            halfH = height / 2 * Math.abs(ws.x);
          } else {
            wr = radius * Math.abs(absMax(ws.x, ws.y));
            halfH = height / 2 * Math.abs(ws.z);
          }

          bt.CapsuleShape_updateProp(this._impl, wr, halfH, upAxis);
          this.updateCompoundTransform();
        };

        _createClass(BulletCapsuleShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BulletCapsuleShape;
      }(BulletShape));
    }
  };
});
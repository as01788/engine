System.register("q-bundled:///fs/cocos/physics/cannon/shapes/cannon-sphere-shape.js", ["@cocos/cannon", "../../../core/math/index.js", "../cannon-util.js", "./cannon-shape.js", "../../../../exports/physics-framework.js"], function (_export, _context) {
  "use strict";

  var CANNON, absMaxComponent, clamp, commitShapeUpdates, CannonShape, PhysicsSystem, CannonSphereShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_coreMathIndexJs) {
      absMaxComponent = _coreMathIndexJs.absMaxComponent;
      clamp = _coreMathIndexJs.clamp;
    }, function (_cannonUtilJs) {
      commitShapeUpdates = _cannonUtilJs.commitShapeUpdates;
    }, function (_cannonShapeJs) {
      CannonShape = _cannonShapeJs.CannonShape;
    }, function (_exportsPhysicsFrameworkJs) {
      PhysicsSystem = _exportsPhysicsFrameworkJs.PhysicsSystem;
    }],
    execute: function () {
      _export("CannonSphereShape", CannonSphereShape = /*#__PURE__*/function (_CannonShape) {
        _inheritsLoose(CannonSphereShape, _CannonShape);

        var _proto = CannonSphereShape.prototype;

        _proto.updateRadius = function updateRadius() {
          var max = Math.abs(absMaxComponent(this.collider.node.worldScale));
          this.impl.radius = clamp(this.collider.radius * Math.abs(max), PhysicsSystem.instance.minVolumeSize, Number.MAX_VALUE);
          this.impl.updateBoundingSphereRadius();

          if (this._index !== -1) {
            commitShapeUpdates(this._body);
          }
        };

        function CannonSphereShape(radius) {
          var _this;

          if (radius === void 0) {
            radius = 0.5;
          }

          _this = _CannonShape.call(this) || this;
          _this._shape = new CANNON.Sphere(radius);
          return _this;
        }

        _proto.onLoad = function onLoad() {
          _CannonShape.prototype.onLoad.call(this);

          this.updateRadius();
        };

        _proto.setScale = function setScale(scale) {
          _CannonShape.prototype.setScale.call(this, scale);

          this.updateRadius();
        };

        _createClass(CannonSphereShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }, {
          key: "impl",
          get: function get() {
            return this._shape;
          }
        }]);

        return CannonSphereShape;
      }(CannonShape));
    }
  };
});
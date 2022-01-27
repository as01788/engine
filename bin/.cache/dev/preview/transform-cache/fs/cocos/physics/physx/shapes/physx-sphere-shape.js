System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-sphere-shape.js", ["../../../core/index.js", "../physx-adapter.js", "../physx-instance.js", "./physx-shape.js"], function (_export, _context) {
  "use strict";

  var absMaxComponent, PX, PhysXInstance, EPhysXShapeType, PhysXShape, PhysXSphereShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      absMaxComponent = _coreIndexJs.absMaxComponent;
    }, function (_physxAdapterJs) {
      PX = _physxAdapterJs.PX;
    }, function (_physxInstanceJs) {
      PhysXInstance = _physxInstanceJs.PhysXInstance;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }],
    execute: function () {
      _export("PhysXSphereShape", PhysXSphereShape = /*#__PURE__*/function (_PhysXShape) {
        _inheritsLoose(PhysXSphereShape, _PhysXShape);

        function PhysXSphereShape() {
          var _this;

          _this = _PhysXShape.call(this, EPhysXShapeType.SPHERE) || this;

          if (!PhysXSphereShape.SPHERE_GEOMETRY) {
            PhysXSphereShape.SPHERE_GEOMETRY = new PX.SphereGeometry(0.5);
          }

          return _this;
        }

        var _proto = PhysXSphereShape.prototype;

        _proto.updateRadius = function updateRadius() {
          this.updateScale();
        };

        _proto.onComponentSet = function onComponentSet() {
          this.updateGeometry();
          var pxmat = this.getSharedMaterial(this.collider.sharedMaterial);
          this._impl = PhysXInstance.physics.createShape(PhysXSphereShape.SPHERE_GEOMETRY, pxmat, true, this._flags);
        };

        _proto.updateScale = function updateScale() {
          this.updateGeometry();

          this._impl.setGeometry(PhysXSphereShape.SPHERE_GEOMETRY);

          this.setCenter(this._collider.center);
        };

        _proto.updateGeometry = function updateGeometry() {
          var co = this.collider;
          var maxSp = Math.abs(absMaxComponent(this.collider.node.worldScale));
          PhysXSphereShape.SPHERE_GEOMETRY.setRadius(Math.max(0.0001, co.radius * maxSp));
        };

        _createClass(PhysXSphereShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return PhysXSphereShape;
      }(PhysXShape));

      PhysXSphereShape.SPHERE_GEOMETRY = void 0;
    }
  };
});
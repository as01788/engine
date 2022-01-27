System.register("q-bundled:///fs/cocos/physics/physx/joints/physx-fixed-joint.js", ["../physx-adapter.js", "./physx-joint.js"], function (_export, _context) {
  "use strict";

  var PX, _trans, PhysXJoint, PhysXFixedJoint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_physxAdapterJs) {
      PX = _physxAdapterJs.PX;
      _trans = _physxAdapterJs._trans;
    }, function (_physxJointJs) {
      PhysXJoint = _physxJointJs.PhysXJoint;
    }],
    execute: function () {
      _export("PhysXFixedJoint", PhysXFixedJoint = /*#__PURE__*/function (_PhysXJoint) {
        _inheritsLoose(PhysXFixedJoint, _PhysXJoint);

        function PhysXFixedJoint() {
          return _PhysXJoint.apply(this, arguments) || this;
        }

        var _proto = PhysXFixedJoint.prototype;

        _proto.setPivotA = function setPivotA(v) {};

        _proto.setPivotB = function setPivotB(v) {};

        _proto.onComponentSet = function onComponentSet() {
          if (this._rigidBody) {
            this._impl = PX.PxFixedJointCreate(PhysXInstance.physics, null, _trans, null, _trans);
            this.setPivotA(this.constraint.pivotA);
            this.setPivotB(this.constraint.pivotB);
          }
        };

        _createClass(PhysXFixedJoint, [{
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }]);

        return PhysXFixedJoint;
      }(PhysXJoint));
    }
  };
});
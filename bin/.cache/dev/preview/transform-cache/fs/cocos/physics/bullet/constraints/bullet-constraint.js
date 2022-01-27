System.register("q-bundled:///fs/cocos/physics/bullet/constraints/bullet-constraint.js", ["../instantiated.js"], function (_export, _context) {
  "use strict";

  var bt, BulletConstraint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      _export("BulletConstraint", BulletConstraint = /*#__PURE__*/function () {
        function BulletConstraint() {
          this.dirty = 0;
          this.index = -1;
          this._impl = 0;
          this._collided = false;
        }

        var _proto = BulletConstraint.prototype;

        _proto.setConnectedBody = function setConnectedBody(v) {// TODO: support dynamic change connected body
        };

        _proto.setEnableCollision = function setEnableCollision(v) {
          if (this._collided !== v) {
            this._collided = v;
            this.updateByReAdd();
          }
        };

        _proto.updateByReAdd = function updateByReAdd() {
          if (this._rigidBody && this.index >= 0) {
            var sb = this._rigidBody.body.sharedBody;
            sb.wrappedWorld.removeConstraint(this);
            sb.wrappedWorld.addConstraint(this);
          }
        };

        _proto.initialize = function initialize(v) {
          this._com = v;
          this._rigidBody = v.attachedBody;
          this._collided = v.enableCollision;
          this.onComponentSet();
        } // virtual
        ;

        _proto.onEnable = function onEnable() {
          var sb = this._rigidBody.body.sharedBody;
          sb.wrappedWorld.addConstraint(this);
          sb.addJoint(this, 0);
          var connect = this.constraint.connectedBody;

          if (connect) {
            var sb2 = connect.body.sharedBody;
            sb2.addJoint(this, 1);
          }
        };

        _proto.onDisable = function onDisable() {
          var sb = this._rigidBody.body.sharedBody;
          sb.wrappedWorld.removeConstraint(this);
          sb.removeJoint(this, 0);
          var connect = this.constraint.connectedBody;

          if (connect) {
            var sb2 = connect.body.sharedBody;
            sb2.removeJoint(this, 1);
          }
        };

        _proto.onDestroy = function onDestroy() {
          bt.TypedConstraint_del(this._impl);
          this._com = null;
          this._rigidBody = null;
        };

        _createClass(BulletConstraint, [{
          key: "impl",
          get: function get() {
            return this._impl;
          }
        }, {
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }]);

        return BulletConstraint;
      }());
    }
  };
});
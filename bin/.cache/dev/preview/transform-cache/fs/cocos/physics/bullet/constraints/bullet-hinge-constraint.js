System.register("q-bundled:///fs/cocos/physics/bullet/constraints/bullet-hinge-constraint.js", ["./bullet-constraint.js", "../../../core/index.js", "../bullet-cache.js", "../instantiated.js", "../bullet-utils.js"], function (_export, _context) {
  "use strict";

  var BulletConstraint, Quat, Vec3, BulletCache, CC_QUAT_0, CC_V3_0, bt, cocos2BulletQuat, cocos2BulletVec3, BulletHingeConstraint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletConstraintJs) {
      BulletConstraint = _bulletConstraintJs.BulletConstraint;
    }, function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
      CC_QUAT_0 = _bulletCacheJs.CC_QUAT_0;
      CC_V3_0 = _bulletCacheJs.CC_V3_0;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }, function (_bulletUtilsJs) {
      cocos2BulletQuat = _bulletUtilsJs.cocos2BulletQuat;
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }],
    execute: function () {
      _export("BulletHingeConstraint", BulletHingeConstraint = /*#__PURE__*/function (_BulletConstraint) {
        _inheritsLoose(BulletHingeConstraint, _BulletConstraint);

        function BulletHingeConstraint() {
          return _BulletConstraint.apply(this, arguments) || this;
        }

        var _proto = BulletHingeConstraint.prototype;

        _proto.setPivotA = function setPivotA(v) {
          this.updateFrames();
        };

        _proto.setPivotB = function setPivotB(v) {
          this.updateFrames();
        };

        _proto.setAxis = function setAxis(v) {
          this.updateFrames();
        };

        _proto.onComponentSet = function onComponentSet() {
          var cb = this.constraint.connectedBody;
          var bodyA = this._rigidBody.body.impl;
          var bodyB = cb ? cb.body.impl : bt.TypedConstraint_getFixedBody();
          var trans0 = BulletCache.instance.BT_TRANSFORM_0;
          var trans1 = BulletCache.instance.BT_TRANSFORM_1;
          this._impl = bt.HingeConstraint_new(bodyA, bodyB, trans0, trans1);
          this.updateFrames();
        };

        _proto.updateFrames = function updateFrames() {
          var cs = this.constraint;
          var node = cs.node;
          var v3_0 = CC_V3_0;
          var rot_0 = CC_QUAT_0;
          var trans0 = BulletCache.instance.BT_TRANSFORM_0;
          Vec3.multiply(v3_0, node.worldScale, cs.pivotA);
          cocos2BulletVec3(bt.Transform_getOrigin(trans0), v3_0);
          var quat = BulletCache.instance.BT_QUAT_0;
          Quat.rotationTo(rot_0, Vec3.UNIT_Z, cs.axis);
          cocos2BulletQuat(quat, rot_0);
          bt.Transform_setRotation(trans0, quat);
          var trans1 = BulletCache.instance.BT_TRANSFORM_1;
          var cb = this.constraint.connectedBody;

          if (cb) {
            Vec3.multiply(v3_0, cb.node.worldScale, cs.pivotB);
          } else {
            Vec3.multiply(v3_0, node.worldScale, cs.pivotA);
            Vec3.add(v3_0, v3_0, node.worldPosition);
            Vec3.add(v3_0, v3_0, cs.pivotB);
            Quat.multiply(rot_0, rot_0, node.worldRotation);
          }

          cocos2BulletVec3(bt.Transform_getOrigin(trans1), v3_0);
          cocos2BulletQuat(quat, rot_0);
          bt.Transform_setRotation(trans1, quat);
          bt.HingeConstraint_setFrames(this._impl, trans0, trans1);
        };

        _proto.updateScale0 = function updateScale0() {
          this.updateFrames();
        };

        _proto.updateScale1 = function updateScale1() {
          this.updateFrames();
        };

        _createClass(BulletHingeConstraint, [{
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }]);

        return BulletHingeConstraint;
      }(BulletConstraint));
    }
  };
});
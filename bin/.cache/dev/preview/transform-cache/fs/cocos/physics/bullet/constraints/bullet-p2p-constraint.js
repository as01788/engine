System.register("q-bundled:///fs/cocos/physics/bullet/constraints/bullet-p2p-constraint.js", ["./bullet-constraint.js", "../../../core/index.js", "../bullet-cache.js", "../instantiated.js", "../bullet-utils.js"], function (_export, _context) {
  "use strict";

  var BulletConstraint, Vec3, BulletCache, CC_V3_0, bt, cocos2BulletVec3, BulletP2PConstraint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletConstraintJs) {
      BulletConstraint = _bulletConstraintJs.BulletConstraint;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
      CC_V3_0 = _bulletCacheJs.CC_V3_0;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }, function (_bulletUtilsJs) {
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }],
    execute: function () {
      _export("BulletP2PConstraint", BulletP2PConstraint = /*#__PURE__*/function (_BulletConstraint) {
        _inheritsLoose(BulletP2PConstraint, _BulletConstraint);

        function BulletP2PConstraint() {
          return _BulletConstraint.apply(this, arguments) || this;
        }

        var _proto = BulletP2PConstraint.prototype;

        _proto.setPivotA = function setPivotA(v) {
          var cs = this.constraint;
          var pivotA = BulletCache.instance.BT_V3_0;
          Vec3.multiply(CC_V3_0, cs.node.worldScale, cs.pivotA);
          cocos2BulletVec3(pivotA, CC_V3_0);
          bt.P2PConstraint_setPivotA(this._impl, pivotA);
          if (!cs.connectedBody) this.setPivotB(cs.pivotB);
        };

        _proto.setPivotB = function setPivotB(v) {
          var cs = this.constraint;
          var node = this._rigidBody.node;
          var pivotB = BulletCache.instance.BT_V3_0;
          var cb = cs.connectedBody;

          if (cb) {
            Vec3.multiply(CC_V3_0, cb.node.worldScale, cs.pivotB);
            cocos2BulletVec3(pivotB, CC_V3_0);
          } else {
            Vec3.multiply(CC_V3_0, node.worldScale, cs.pivotA);
            Vec3.add(CC_V3_0, CC_V3_0, node.worldPosition);
            Vec3.add(CC_V3_0, CC_V3_0, cs.pivotB);
            cocos2BulletVec3(pivotB, CC_V3_0);
          }

          bt.P2PConstraint_setPivotB(this._impl, pivotB);
        };

        _proto.onComponentSet = function onComponentSet() {
          var cb = this.constraint.connectedBody;
          var bodyA = this._rigidBody.body.impl;
          var bodyB = cb ? cb.body.impl : bt.TypedConstraint_getFixedBody();
          var pivotA = BulletCache.instance.BT_V3_0;
          var pivotB = BulletCache.instance.BT_V3_1;
          this._impl = bt.P2PConstraint_new(bodyA, bodyB, pivotA, pivotB);
          this.setPivotA(this.constraint.pivotA);
          this.setPivotB(this.constraint.pivotB);
        };

        _proto.updateScale0 = function updateScale0() {
          this.setPivotA(this.constraint.pivotA);
        };

        _proto.updateScale1 = function updateScale1() {
          this.setPivotB(this.constraint.pivotB);
        };

        _createClass(BulletP2PConstraint, [{
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }]);

        return BulletP2PConstraint;
      }(BulletConstraint));
    }
  };
});
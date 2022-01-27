System.register("q-bundled:///fs/cocos/core/curves/object-curve.js", ["../data/decorators/index.js", "../math/index.js", "./keyframe-curve.js"], function (_export, _context) {
  "use strict";

  var ccclass, clamp, KeyframeCurve, _dec, _class, ObjectCurve;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_mathIndexJs) {
      clamp = _mathIndexJs.clamp;
    }, function (_keyframeCurveJs) {
      KeyframeCurve = _keyframeCurveJs.KeyframeCurve;
    }],
    execute: function () {
      _export("ObjectCurve", ObjectCurve = (_dec = ccclass('cc.ObjectCurve'), _dec(_class = /*#__PURE__*/function (_KeyframeCurve) {
        _inheritsLoose(ObjectCurve, _KeyframeCurve);

        function ObjectCurve() {
          return _KeyframeCurve.apply(this, arguments) || this;
        }

        var _proto = ObjectCurve.prototype;

        _proto.evaluate = function evaluate(time) {
          var iSearch = this.searchKeyframe(time);

          if (iSearch >= 0) {
            return this._values[iSearch];
          }

          var iPrev = clamp(~iSearch - 1, 0, this._values.length - 1);
          return this._values[iPrev];
        };

        return ObjectCurve;
      }(KeyframeCurve)) || _class));
    }
  };
});
System.register("q-bundled:///fs/cocos/core/animation/tracks/quat-track.js", ["../../data/decorators/index.js", "../../curves/index.js", "../define.js", "./track.js", "../../math/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, QuatCurve, CLASS_NAME_PREFIX_ANIM, createEvalSymbol, SingleChannelTrack, Quat, _dec, _class, QuatTrack, QuatTrackEval;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_curvesIndexJs) {
      QuatCurve = _curvesIndexJs.QuatCurve;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
      createEvalSymbol = _defineJs.createEvalSymbol;
    }, function (_trackJs) {
      SingleChannelTrack = _trackJs.SingleChannelTrack;
    }, function (_mathIndexJs) {
      Quat = _mathIndexJs.Quat;
    }],
    execute: function () {
      _export("QuatTrack", QuatTrack = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "QuatTrack"), _dec(_class = /*#__PURE__*/function (_SingleChannelTrack) {
        _inheritsLoose(QuatTrack, _SingleChannelTrack);

        function QuatTrack() {
          return _SingleChannelTrack.apply(this, arguments) || this;
        }

        var _proto = QuatTrack.prototype;

        _proto.createCurve = function createCurve() {
          return new QuatCurve();
        };

        _proto[createEvalSymbol] = function () {
          return new QuatTrackEval(this.channels()[0].curve);
        };

        return QuatTrack;
      }(SingleChannelTrack)) || _class));

      _export("QuatTrackEval", QuatTrackEval = /*#__PURE__*/function () {
        function QuatTrackEval(_curve) {
          this._result = new Quat();
          this._curve = _curve;
        }

        var _proto2 = QuatTrackEval.prototype;

        _proto2.evaluate = function evaluate(time) {
          this._curve.evaluate(time, this._result);

          return this._result;
        };

        return QuatTrackEval;
      }());
    }
  };
});
System.register("q-bundled:///fs/cocos/core/animation/tracks/object-track.js", ["../../data/decorators/index.js", "../../curves/index.js", "../define.js", "./track.js"], function (_export, _context) {
  "use strict";

  var ccclass, ObjectCurve, CLASS_NAME_PREFIX_ANIM, SingleChannelTrack, _dec, _class, ObjectTrack;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_curvesIndexJs) {
      ObjectCurve = _curvesIndexJs.ObjectCurve;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_trackJs) {
      SingleChannelTrack = _trackJs.SingleChannelTrack;
    }],
    execute: function () {
      _export("ObjectTrack", ObjectTrack = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "ObjectTrack"), _dec(_class = /*#__PURE__*/function (_SingleChannelTrack) {
        _inheritsLoose(ObjectTrack, _SingleChannelTrack);

        function ObjectTrack() {
          return _SingleChannelTrack.apply(this, arguments) || this;
        }

        var _proto = ObjectTrack.prototype;

        _proto.createCurve = function createCurve() {
          return new ObjectCurve();
        };

        return ObjectTrack;
      }(SingleChannelTrack)) || _class));
    }
  };
});
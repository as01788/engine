"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuatTrackEval = exports.QuatTrack = void 0;

var _index = require("../../data/decorators/index.js");

var _index2 = require("../../curves/index.js");

var _define = require("../define.js");

var _track = require("./track.js");

var _index3 = require("../../math/index.js");

var _dec, _class;

let QuatTrack = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}QuatTrack`), _dec(_class = class QuatTrack extends _track.SingleChannelTrack {
  createCurve() {
    return new _index2.QuatCurve();
  }

  [_define.createEvalSymbol]() {
    return new QuatTrackEval(this.channels()[0].curve);
  }

}) || _class);
exports.QuatTrack = QuatTrack;

class QuatTrackEval {
  constructor(_curve) {
    this._result = new _index3.Quat();
    this._curve = _curve;
  }

  evaluate(time) {
    this._curve.evaluate(time, this._result);

    return this._result;
  }

}

exports.QuatTrackEval = QuatTrackEval;
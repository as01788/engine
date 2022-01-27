"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectCurve = void 0;

var _index = require("../data/decorators/index.js");

var _index2 = require("../math/index.js");

var _keyframeCurve = require("./keyframe-curve.js");

var _dec, _class;

let ObjectCurve = (_dec = (0, _index.ccclass)('cc.ObjectCurve'), _dec(_class = class ObjectCurve extends _keyframeCurve.KeyframeCurve {
  evaluate(time) {
    const iSearch = this.searchKeyframe(time);

    if (iSearch >= 0) {
      return this._values[iSearch];
    }

    const iPrev = (0, _index2.clamp)(~iSearch - 1, 0, this._values.length - 1);
    return this._values[iPrev];
  }

}) || _class);
exports.ObjectCurve = ObjectCurve;
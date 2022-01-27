"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectTrack = void 0;

var _index = require("../../data/decorators/index.js");

var _index2 = require("../../curves/index.js");

var _define = require("../define.js");

var _track = require("./track.js");

var _dec, _class;

let ObjectTrack = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}ObjectTrack`), _dec(_class = class ObjectTrack extends _track.SingleChannelTrack {
  createCurve() {
    return new _index2.ObjectCurve();
  }

}) || _class);
exports.ObjectTrack = ObjectTrack;
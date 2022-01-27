"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorTrackEval = exports.ColorTrack = void 0;

var _index = require("../../data/decorators/index.js");

var _index2 = require("../../curves/index.js");

var _index3 = require("../../math/index.js");

var _define = require("../define.js");

var _track = require("./track.js");

var _utils = require("./utils.js");

var _dec, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const CHANNEL_NAMES = ['Red', 'Green', 'Blue', 'Alpha'];
let ColorTrack = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}ColorTrack`), _dec(_class = (_class2 = (_temp = class ColorTrack extends _track.Track {
  constructor() {
    super();

    _initializerDefineProperty(this, "_channels", _descriptor, this);

    this._channels = new Array(4);

    for (let i = 0; i < this._channels.length; ++i) {
      const channel = new _track.Channel(new _index2.RealCurve());
      channel.name = CHANNEL_NAMES[i];
      this._channels[i] = channel;
    }
  }

  channels() {
    return this._channels;
  }

  [_define.createEvalSymbol]() {
    return new ColorTrackEval((0, _utils.maskIfEmpty)(this._channels[0].curve), (0, _utils.maskIfEmpty)(this._channels[1].curve), (0, _utils.maskIfEmpty)(this._channels[2].curve), (0, _utils.maskIfEmpty)(this._channels[3].curve));
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_channels", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.ColorTrack = ColorTrack;

class ColorTrackEval {
  constructor(_x, _y, _z, _w) {
    this._result = new _index3.Color();
    this._x = _x;
    this._y = _y;
    this._z = _z;
    this._w = _w;
  }

  evaluate(time, runtimeBinding) {
    if ((!this._x || !this._y || !this._z || !this._w) && runtimeBinding.getValue) {
      _index3.Color.copy(this._result, runtimeBinding.getValue());
    }

    if (this._x) {
      this._result.r = this._x.evaluate(time);
    }

    if (this._y) {
      this._result.g = this._y.evaluate(time);
    }

    if (this._z) {
      this._result.b = this._z.evaluate(time);
    }

    if (this._w) {
      this._result.a = this._w.evaluate(time);
    }

    return this._result;
  }

}

exports.ColorTrackEval = ColorTrackEval;
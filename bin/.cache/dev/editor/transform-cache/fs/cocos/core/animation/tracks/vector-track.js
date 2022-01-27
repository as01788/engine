"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec4TrackEval = exports.Vec3TrackEval = exports.Vec2TrackEval = exports.VectorTrack = void 0;

var _index = require("../../data/decorators/index.js");

var _index2 = require("../../curves/index.js");

var _index3 = require("../../math/index.js");

var _define = require("../define.js");

var _track = require("./track.js");

var _utils = require("./utils.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const CHANNEL_NAMES = ['X', 'Y', 'Z', 'W'];
let VectorTrack = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}VectorTrack`), _dec(_class = (_class2 = (_temp = class VectorTrack extends _track.Track {
  constructor() {
    super();

    _initializerDefineProperty(this, "_channels", _descriptor, this);

    _initializerDefineProperty(this, "_nComponents", _descriptor2, this);

    this._channels = new Array(4);

    for (let i = 0; i < this._channels.length; ++i) {
      const channel = new _track.Channel(new _index2.RealCurve());
      channel.name = CHANNEL_NAMES[i];
      this._channels[i] = channel;
    }
  }

  get componentsCount() {
    return this._nComponents;
  }

  set componentsCount(value) {
    this._nComponents = value;
  }

  channels() {
    return this._channels;
  }

  [_define.createEvalSymbol]() {
    switch (this._nComponents) {
      default:
      case 2:
        return new Vec2TrackEval((0, _utils.maskIfEmpty)(this._channels[0].curve), (0, _utils.maskIfEmpty)(this._channels[1].curve));

      case 3:
        return new Vec3TrackEval((0, _utils.maskIfEmpty)(this._channels[0].curve), (0, _utils.maskIfEmpty)(this._channels[1].curve), (0, _utils.maskIfEmpty)(this._channels[2].curve));

      case 4:
        return new Vec4TrackEval((0, _utils.maskIfEmpty)(this._channels[0].curve), (0, _utils.maskIfEmpty)(this._channels[1].curve), (0, _utils.maskIfEmpty)(this._channels[2].curve), (0, _utils.maskIfEmpty)(this._channels[3].curve));
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_channels", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_nComponents", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 4;
  }
})), _class2)) || _class);
exports.VectorTrack = VectorTrack;

class Vec2TrackEval {
  constructor(_x, _y) {
    this._result = new _index3.Vec2();
    this._x = _x;
    this._y = _y;
  }

  evaluate(time, runtimeBinding) {
    if ((!this._x || !this._y) && runtimeBinding.getValue) {
      _index3.Vec2.copy(this._result, runtimeBinding.getValue());
    }

    if (this._x) {
      this._result.x = this._x.evaluate(time);
    }

    if (this._y) {
      this._result.y = this._y.evaluate(time);
    }

    return this._result;
  }

}

exports.Vec2TrackEval = Vec2TrackEval;

class Vec3TrackEval {
  constructor(_x, _y, _z) {
    this._result = new _index3.Vec3();
    this._x = _x;
    this._y = _y;
    this._z = _z;
  }

  evaluate(time, runtimeBinding) {
    if ((!this._x || !this._y || !this._z) && runtimeBinding.getValue) {
      _index3.Vec3.copy(this._result, runtimeBinding.getValue());
    }

    if (this._x) {
      this._result.x = this._x.evaluate(time);
    }

    if (this._y) {
      this._result.y = this._y.evaluate(time);
    }

    if (this._z) {
      this._result.z = this._z.evaluate(time);
    }

    return this._result;
  }

}

exports.Vec3TrackEval = Vec3TrackEval;

class Vec4TrackEval {
  constructor(_x, _y, _z, _w) {
    this._result = new _index3.Vec4();
    this._x = _x;
    this._y = _y;
    this._z = _z;
    this._w = _w;
  }

  evaluate(time, runtimeBinding) {
    if ((!this._x || !this._y || !this._z || !this._w) && runtimeBinding.getValue) {
      _index3.Vec4.copy(this._result, runtimeBinding.getValue());
    }

    if (this._x) {
      this._result.x = this._x.evaluate(time);
    }

    if (this._y) {
      this._result.y = this._y.evaluate(time);
    }

    if (this._z) {
      this._result.z = this._z.evaluate(time);
    }

    if (this._w) {
      this._result.w = this._w.evaluate(time);
    }

    return this._result;
  }

}

exports.Vec4TrackEval = Vec4TrackEval;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySharedQuatCurves = exports.KeySharedRealCurves = void 0;

var _binarySearch = require("../algorithm/binary-search.js");

var _index = require("../data/decorators/index.js");

var _asserts = require("../data/utils/asserts.js");

var _index2 = require("../math/index.js");

var _curve = require("./curve.js");

var _quatCurve = require("./quat-curve.js");

var _realCurveParam = require("./real-curve-param.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _dec2, _class4, _class5, _descriptor4, _temp2, _dec3, _class7, _class8, _descriptor5, _temp3;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const DEFAULT_EPSILON = 1e-5;
const DefaultFloatArray = Float32Array;

/**
 * Considering most of model animations are baked and most of its curves share same times,
 * we do not have to do time searching for many times.
 */
let KeysSharedCurves = (_dec = (0, _index.ccclass)('cc.KeySharedCurves'), _dec(_class = (_class2 = (_temp = class KeysSharedCurves {
  /**
   * Only for internal(serialization) usage.
   */
  constructor(times) {
    _initializerDefineProperty(this, "_times", _descriptor, this);

    _initializerDefineProperty(this, "_optimized", _descriptor2, this);

    _initializerDefineProperty(this, "_keyframesCount", _descriptor3, this);

    if (!times) {
      this._times = new DefaultFloatArray();
      return;
    }

    const nKeyframes = times.length;
    this._keyframesCount = nKeyframes;
    this._times = DefaultFloatArray.from(times);

    if (nKeyframes > 1) {
      const EPSILON = 1e-6;
      let lastDiff = 0.0;
      let mayBeOptimized = false;

      for (let iFrame = 1; iFrame < nKeyframes; iFrame++) {
        const curDiff = times[iFrame] - times[iFrame - 1];

        if (iFrame === 1) {
          lastDiff = curDiff;
        } else if (Math.abs(curDiff - lastDiff) > EPSILON) {
          mayBeOptimized = false;
          break;
        }
      }

      if (mayBeOptimized) {
        this._optimized = true;
        this._times = new DefaultFloatArray([this._times[0], this._times[1]]);
      }
    }
  }

  get keyframesCount() {
    return this._keyframesCount;
  }

  matchTimes(times, EPSILON = DEFAULT_EPSILON) {
    if (this._optimized) {
      const firstTime = this._times[0];
      const diff = this._times[1] - firstTime;
      return times.every((t, iKeyframe) => (0, _index2.approx)(t, firstTime + diff * iKeyframe, EPSILON));
    } else {
      return times.every((t, iKeyframe) => (0, _index2.approx)(t, this._times[iKeyframe], EPSILON));
    }
  }

  getFirstTime() {
    return this._times[0];
  }

  getLastTime() {
    if (!this._optimized) {
      return this._times[this._times.length - 1];
    } else {
      const diff = this._times[1] - this._times[0];
      return this._times[0] + diff * this._keyframesCount;
    }
  }

  calculateLocation(time, out) {
    const {
      _times: times,
      _optimized: optimized,
      keyframesCount: nKeyframes
    } = this;

    if (optimized) {
      const firstTime = times[0];
      const diff = times[1] - firstTime;
      const div = (time - firstTime) / diff;
      const previous = Math.floor(div);
      out.previous = previous;
      out.ratio = div - previous;
    } else {
      const index = (0, _binarySearch.binarySearchEpsilon)(times, time);

      if (index >= 0) {
        // Exactly matched
        out.previous = index;
        out.ratio = 0.0;
      } else {
        const iNext = ~index;
        (0, _asserts.assertIsTrue)(iNext >= 1 && iNext < nKeyframes);
        const iPrev = iNext - 1;
        const prevTime = times[iPrev];
        out.ratio = (time - prevTime) / (times[iNext] - prevTime);
        out.previous = iPrev;
      }
    }

    return out;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_times", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_optimized", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_keyframesCount", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
const globalLocation = {
  previous: 0,
  ratio: 0
};
let KeySharedRealCurves = (_dec2 = (0, _index.ccclass)('cc.KeySharedRealCurves'), _dec2(_class4 = (_class5 = (_temp2 = class KeySharedRealCurves extends KeysSharedCurves {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_curves", _descriptor4, this);
  }

  static allowedForCurve(curve) {
    return curve.postExtrapolation === _curve.ExtrapolationMode.CLAMP && curve.preExtrapolation === _curve.ExtrapolationMode.CLAMP && Array.from(curve.values()).every(value => value.interpolationMode === _realCurveParam.RealInterpolationMode.LINEAR);
  }

  get curveCount() {
    return this._curves.length;
  }

  matchCurve(curve, EPSILON = DEFAULT_EPSILON) {
    if (curve.keyFramesCount !== this.keyframesCount) {
      return false;
    }

    const times = Array.from(curve.times());
    return super.matchTimes(times, EPSILON);
  }

  addCurve(curve) {
    (0, _asserts.assertIsTrue)(curve.keyFramesCount === this.keyframesCount);

    this._curves.push({
      values: DefaultFloatArray.from(Array.from(curve.values()).map(({
        value
      }) => value))
    });
  }

  evaluate(time, values) {
    const {
      _curves: curves,
      keyframesCount: nKeyframes
    } = this;
    const nCurves = curves.length;
    (0, _asserts.assertIsTrue)(values.length === nCurves);

    if (nKeyframes === 0) {
      return;
    }

    const firstTime = super.getFirstTime();

    if (time <= firstTime) {
      for (let iCurve = 0; iCurve < nCurves; ++iCurve) {
        values[iCurve] = this._curves[iCurve].values[0];
      }

      return;
    }

    const lastTime = super.getLastTime();

    if (time >= lastTime) {
      const iLastFrame = nKeyframes - 1;

      for (let iCurve = 0; iCurve < nCurves; ++iCurve) {
        values[iCurve] = this._curves[iCurve].values[iLastFrame];
      }

      return;
    }

    const {
      previous,
      ratio
    } = super.calculateLocation(time, globalLocation);

    if (ratio !== 0.0) {
      for (let iCurve = 0; iCurve < nCurves; ++iCurve) {
        const {
          values: curveValues
        } = this._curves[iCurve];
        values[iCurve] = (0, _index2.lerp)(curveValues[previous], curveValues[previous + 1], ratio);
      }
    } else {
      for (let iCurve = 0; iCurve < nCurves; ++iCurve) {
        const {
          values: curveValues
        } = this._curves[iCurve];
        values[iCurve] = curveValues[previous];
      }
    }
  }

}, _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "_curves", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class5)) || _class4);
exports.KeySharedRealCurves = KeySharedRealCurves;
const cacheQuat1 = new _index2.Quat();
const cacheQuat2 = new _index2.Quat();
let KeySharedQuatCurves = (_dec3 = (0, _index.ccclass)('cc.KeySharedQuatCurves'), _dec3(_class7 = (_class8 = (_temp3 = class KeySharedQuatCurves extends KeysSharedCurves {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_curves", _descriptor5, this);
  }

  static allowedForCurve(curve) {
    return curve.postExtrapolation === _curve.ExtrapolationMode.CLAMP && curve.preExtrapolation === _curve.ExtrapolationMode.CLAMP && Array.from(curve.values()).every(value => value.interpolationMode === _quatCurve.QuatInterpolationMode.SLERP);
  }

  get curveCount() {
    return this._curves.length;
  }

  matchCurve(curve, EPSILON = 1e-5) {
    if (curve.keyFramesCount !== this.keyframesCount) {
      return false;
    }

    const times = Array.from(curve.times());
    return super.matchTimes(times, EPSILON);
  }

  addCurve(curve) {
    (0, _asserts.assertIsTrue)(curve.keyFramesCount === this.keyframesCount);
    const values = new DefaultFloatArray(curve.keyFramesCount * 4);
    const nKeyframes = curve.keyFramesCount;

    for (let iKeyframe = 0; iKeyframe < nKeyframes; ++iKeyframe) {
      _index2.Quat.toArray(values, curve.getKeyframeValue(iKeyframe).value, 4 * iKeyframe);
    }

    this._curves.push({
      values
    });
  }

  evaluate(time, values) {
    const {
      _curves: curves,
      keyframesCount: nKeyframes
    } = this;
    const nCurves = curves.length;
    (0, _asserts.assertIsTrue)(values.length === nCurves);

    if (nKeyframes === 0) {
      return;
    }

    const firstTime = super.getFirstTime();

    if (time <= firstTime) {
      for (let iCurve = 0; iCurve < nCurves; ++iCurve) {
        _index2.Quat.fromArray(values[iCurve], this._curves[iCurve].values, 0);
      }

      return;
    }

    const lastTime = super.getLastTime();

    if (time >= lastTime) {
      const iLastFrame = nKeyframes - 1;

      for (let iCurve = 0; iCurve < nCurves; ++iCurve) {
        _index2.Quat.fromArray(values[iCurve], this._curves[iCurve].values, iLastFrame * 4);
      }

      return;
    }

    const {
      previous,
      ratio
    } = super.calculateLocation(time, globalLocation);

    if (ratio !== 0.0) {
      for (let iCurve = 0; iCurve < nCurves; ++iCurve) {
        const {
          values: curveValues
        } = this._curves[iCurve];

        const q1 = _index2.Quat.fromArray(cacheQuat1, curveValues, previous * 4);

        const q2 = _index2.Quat.fromArray(cacheQuat2, curveValues, (previous + 1) * 4);

        _index2.Quat.slerp(values[iCurve], q1, q2, ratio);
      }
    } else {
      for (let iCurve = 0; iCurve < nCurves; ++iCurve) {
        _index2.Quat.fromArray(values[iCurve], this._curves[iCurve].values, previous * 4);
      }
    }
  }

}, _temp3), (_descriptor5 = _applyDecoratedDescriptor(_class8.prototype, "_curves", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class8)) || _class7);
exports.KeySharedQuatCurves = KeySharedQuatCurves;
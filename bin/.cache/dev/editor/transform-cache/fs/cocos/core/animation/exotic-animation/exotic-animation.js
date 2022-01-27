"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExoticAnimation = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _binarySearch = require("../../algorithm/binary-search.js");

var _index = require("../../data/decorators/index.js");

var _asserts = require("../../data/utils/asserts.js");

var _index2 = require("../../math/index.js");

var _define = require("../define.js");

var _track = require("../tracks/track.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp2, _dec3, _class7, _class8, _descriptor6, _descriptor7, _temp3, _dec4, _class10, _dec5, _class11, _dec6, _class12, _class13, _descriptor8, _descriptor9, _temp4, _dec7, _class15, _class16, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const SPLIT_METHOD_ENABLED = _internal253Aconstants.TEST || _internal253Aconstants.EDITOR;

function throwIfSplitMethodIsNotValid() {
  // TODO: better handling
  throw new Error(`split() only valid in Editor.`);
}
/**
 * Animation that:
 * - does not exposed by users;
 * - does not compatible with regular animation;
 * - non-editable;
 * - currently only generated imported from model file.
 */


let ExoticAnimation = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}ExoticAnimation`), _dec(_class = (_class2 = (_temp = class ExoticAnimation {
  constructor() {
    _initializerDefineProperty(this, "_nodeAnimations", _descriptor, this);
  }

  createEvaluator(binder) {
    return new ExoticTrsAnimationEvaluator(this._nodeAnimations, binder);
  }

  addNodeAnimation(path) {
    const nodeAnimation = new ExoticNodeAnimation(path);

    this._nodeAnimations.push(nodeAnimation);

    return nodeAnimation;
  }

  collectAnimatedJoints() {
    return Array.from(new Set(this._nodeAnimations.map(({
      path
    }) => path)));
  }

  split(from, to) {
    if (!SPLIT_METHOD_ENABLED) {
      return throwIfSplitMethodIsNotValid();
    }

    const splitInfoCache = new SplitInfo();
    const newAnimation = new ExoticAnimation();
    newAnimation._nodeAnimations = this._nodeAnimations.map(nodeAnimation => nodeAnimation.split(from, to, splitInfoCache));
    return newAnimation;
  }
  /**
   * @internal
   */


  toHashString() {
    return this._nodeAnimations.map(nodeAnimation => nodeAnimation.toHashString()).join('\n');
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_nodeAnimations", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.ExoticAnimation = ExoticAnimation;
let ExoticNodeAnimation = (_dec2 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}ExoticNodeAnimation`), _dec2(_class4 = (_class5 = (_temp2 = class ExoticNodeAnimation {
  constructor(path) {
    _initializerDefineProperty(this, "_path", _descriptor2, this);

    _initializerDefineProperty(this, "_position", _descriptor3, this);

    _initializerDefineProperty(this, "_rotation", _descriptor4, this);

    _initializerDefineProperty(this, "_scale", _descriptor5, this);

    this._path = path;
  }

  createPosition(times, values) {
    this._position = new ExoticTrack(times, new ExoticVec3TrackValues(values));
  }

  createRotation(times, values) {
    this._rotation = new ExoticTrack(times, new ExoticQuatTrackValues(values));
  }

  createScale(times, values) {
    this._scale = new ExoticTrack(times, new ExoticVec3TrackValues(values));
  }

  createEvaluator(binder) {
    return new ExoticNodeAnimationEvaluator(this._path, this._position, this._rotation, this._scale, binder);
  }

  split(from, to, splitInfoCache) {
    if (!SPLIT_METHOD_ENABLED) {
      return throwIfSplitMethodIsNotValid();
    }

    const newAnimation = new ExoticNodeAnimation(this._path);
    const {
      _position: position,
      _rotation: rotation,
      _scale: scale
    } = this;

    if (position) {
      newAnimation._position = splitVec3Track(position, from, to, splitInfoCache);
    }

    if (rotation) {
      newAnimation._rotation = splitQuatTrack(rotation, from, to, splitInfoCache);
    }

    if (scale) {
      newAnimation._scale = splitVec3Track(scale, from, to, splitInfoCache);
    }

    return newAnimation;
  }

  get path() {
    return this._path;
  }
  /**
   * @internal
   */


  toHashString() {
    var _this$_position$toHas, _this$_position, _this$_scale$toHashSt, _this$_scale, _this$_rotation$toHas, _this$_rotation;

    return `${this._path}\n${(_this$_position$toHas = (_this$_position = this._position) === null || _this$_position === void 0 ? void 0 : _this$_position.toHashString()) !== null && _this$_position$toHas !== void 0 ? _this$_position$toHas : ''}${(_this$_scale$toHashSt = (_this$_scale = this._scale) === null || _this$_scale === void 0 ? void 0 : _this$_scale.toHashString()) !== null && _this$_scale$toHashSt !== void 0 ? _this$_scale$toHashSt : ''}${(_this$_rotation$toHas = (_this$_rotation = this._rotation) === null || _this$_rotation === void 0 ? void 0 : _this$_rotation.toHashString()) !== null && _this$_rotation$toHas !== void 0 ? _this$_rotation$toHas : ''}`;
  }

}, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "_path", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "_position", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "_rotation", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "_scale", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class5)) || _class4);

function floatToHashString(value) {
  // Note: referenced to `Skeleton.prototype.hash`
  return value.toPrecision(2);
}

function floatArrayToHashString(values) {
  // @ts-expect-error Complex typing
  return values.map(floatToHashString).join(' ');
}

let ExoticVectorLikeTrackValues = (_dec3 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}ExoticVectorLikeTrackValues`), _dec3(_class7 = (_class8 = (_temp3 = class ExoticVectorLikeTrackValues {
  constructor(values) {
    _initializerDefineProperty(this, "_values", _descriptor6, this);

    _initializerDefineProperty(this, "_isQuantized", _descriptor7, this);

    this._values = values;
    this._isQuantized = false;
  }

  get precision() {
    return this._isQuantized ? this._values.originalPrecision : getFloatArrayPrecision(this._values);
  }

  quantize(type) {
    (0, _asserts.assertIsTrue)(!this._isQuantized);
    this._values = quantize(this._values, type);
    this._isQuantized = true;
  }
  /**
   * @internal
   */


  toHashString() {
    const {
      _isQuantized: isQuantized,
      _values: values
    } = this;
    return `${isQuantized} ${isQuantized ? values.toHashString() : floatArrayToHashString(values)}`;
  }

}, _temp3), (_descriptor6 = _applyDecoratedDescriptor(_class8.prototype, "_values", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class8.prototype, "_isQuantized", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class8)) || _class7);
let ExoticVec3TrackValues = (_dec4 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}ExoticVec3TrackValues`), _dec4(_class10 = class ExoticVec3TrackValues extends ExoticVectorLikeTrackValues {
  static imitate(values, model) {
    const trackValues = new ExoticVec3TrackValues(values);

    if (model._isQuantized) {
      trackValues.quantize(model._values.quantizationType);
    }

    return trackValues;
  }

  get(index, resultValue) {
    const {
      _values: values,
      _isQuantized: isQuantized
    } = this;

    if (isQuantized) {
      loadVec3FromQuantized(values, index, resultValue);
    } else {
      _index2.Vec3.fromArray(resultValue, values, index * 3);
    }
  }

  lerp(prevIndex, nextIndex, ratio, prevValue, nextValue, resultValue) {
    const {
      _values: values,
      _isQuantized: isQuantized
    } = this;

    if (isQuantized) {
      loadVec3FromQuantized(values, prevIndex, prevValue);
      loadVec3FromQuantized(values, nextIndex, nextValue);
    } else {
      _index2.Vec3.fromArray(prevValue, values, prevIndex * 3);

      _index2.Vec3.fromArray(nextValue, values, nextIndex * 3);
    }

    _index2.Vec3.lerp(resultValue, prevValue, nextValue, ratio);
  }

}) || _class10);
let ExoticQuatTrackValues = (_dec5 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}ExoticQuatTrackValues`), _dec5(_class11 = class ExoticQuatTrackValues extends ExoticVectorLikeTrackValues {
  static imitate(values, model) {
    const trackValues = new ExoticQuatTrackValues(values);

    if (model._isQuantized) {
      trackValues.quantize(model._values.quantizationType);
    }

    return trackValues;
  }

  get(index, resultValue) {
    const {
      _values: values,
      _isQuantized: isQuantized
    } = this;

    if (isQuantized) {
      loadQuatFromQuantized(values, index, resultValue);
    } else {
      _index2.Quat.fromArray(resultValue, values, index * 4);
    }
  }

  lerp(prevIndex, nextIndex, ratio, prevValue, nextValue, resultValue) {
    const {
      _values: values,
      _isQuantized: isQuantized
    } = this;

    if (isQuantized) {
      loadQuatFromQuantized(values, prevIndex, prevValue);
      loadQuatFromQuantized(values, nextIndex, nextValue);
    } else {
      _index2.Quat.fromArray(prevValue, values, prevIndex * 4);

      _index2.Quat.fromArray(nextValue, values, nextIndex * 4);
    }

    _index2.Quat.slerp(resultValue, prevValue, nextValue, ratio);
  }

}) || _class11);
let ExoticTrack = (_dec6 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}ExoticTrack`), _dec6(_class12 = (_class13 = (_temp4 = class ExoticTrack {
  constructor(times, values) {
    _initializerDefineProperty(this, "times", _descriptor8, this);

    _initializerDefineProperty(this, "values", _descriptor9, this);

    this.times = times;
    this.values = values;
  }

  /**
   * @internal
   */
  toHashString() {
    const {
      times,
      values
    } = this;
    return `times: ${floatArrayToHashString(times)}; values: ${values.toHashString()}`;
  }

}, _temp4), (_descriptor8 = _applyDecoratedDescriptor(_class13.prototype, "times", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class13.prototype, "values", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class13)) || _class12);

function splitVec3Track(track, from, to, splitInfoCache) {
  const {
    times,
    values
  } = split(track.times, track.values, from, to, 3, _index2.Vec3, splitInfoCache);
  const vec3Values = ExoticVec3TrackValues.imitate(values, track.values);
  return new ExoticTrack(times, vec3Values);
}

function splitQuatTrack(track, from, to, splitInfoCache) {
  const {
    times,
    values
  } = split(track.times, track.values, from, to, 4, _index2.Quat, splitInfoCache);
  const quatValues = ExoticQuatTrackValues.imitate(values, track.values);
  return new ExoticTrack(times, quatValues);
}

function split(times, values, from, to, components, ValueConstructor, splitInfoCache) {
  const TimeArrayConstructor = getFloatArrayConstructorWithPrecision(getFloatArrayPrecision(times));
  const ValueArrayConstructor = getFloatArrayConstructorWithPrecision(values.precision);
  const splitInfo = splitInfoCache;
  splitInfo.calculate(times, from, to);
  const {
    preLerpIndex,
    preLerpRatio,
    directKeyframesBegin,
    directKeyframesEnd,
    postLerpIndex,
    postLerpRatio
  } = splitInfo;
  const nNewKeyframes = splitInfo.keyframesCount;

  if (nNewKeyframes === 0) {
    return {
      times: new TimeArrayConstructor(0),
      values: new ValueArrayConstructor(0)
    };
  }

  const prevValue = new ValueConstructor();
  const nextValue = new ValueConstructor();
  const resultValue = new ValueConstructor();
  const newTimes = new TimeArrayConstructor(nNewKeyframes);
  const newValues = new ValueArrayConstructor(components * nNewKeyframes);

  const doLerp = (index, ratio, outputIndex) => {
    (0, _asserts.assertIsTrue)(index < times.length - 1);
    const iPrevious = index;
    const iNext = index + 1;
    values.lerp(iPrevious, iNext, ratio, prevValue, nextValue, resultValue);
    newTimes[outputIndex] = splitInfo.transformTime((0, _index2.lerp)(times[iPrevious], times[iNext], ratio));
    ValueConstructor.toArray(newValues, resultValue, components * outputIndex);
  };

  let iKeyframe = 0;

  if (preLerpIndex >= 0) {
    doLerp(preLerpIndex, preLerpRatio, iKeyframe);
    ++iKeyframe;
  }

  for (let index = directKeyframesBegin; index < directKeyframesEnd; ++index, ++iKeyframe) {
    values.get(index, resultValue);
    newTimes[iKeyframe] = splitInfo.transformTime(times[index]);
    ValueConstructor.toArray(newValues, resultValue, components * iKeyframe);
  }

  if (postLerpIndex >= 0) {
    doLerp(postLerpIndex, postLerpRatio, iKeyframe);
    ++iKeyframe;
  }

  (0, _asserts.assertIsTrue)(iKeyframe === nNewKeyframes);
  return {
    times: newTimes,
    values: newValues
  };
}

class SplitInfo {
  constructor() {
    this._reset();
  }

  get keyframesCount() {
    const {
      preLerpIndex,
      directKeyframesBegin,
      directKeyframesEnd,
      postLerpIndex
    } = this;
    return 0 + (preLerpIndex < 0 ? 0 : 1) + (directKeyframesEnd - directKeyframesBegin) + (postLerpIndex < 0 ? 0 : 1);
  }

  transformTime(input) {
    return input - this._timeOffset;
  }

  calculate(times, from, to) {
    this._reset();

    const nKeyframes = times.length;

    if (!nKeyframes) {
      return;
    }

    const firstTime = times[0];
    const lastTime = times[nKeyframes - 1];
    const fromClamped = (0, _index2.clamp)(from, firstTime, lastTime);
    const toClamped = (0, _index2.clamp)(to, firstTime, lastTime);
    this._timeOffset = fromClamped;
    const {
      fromIndex,
      fromRatio,
      toIndex,
      toRatio
    } = searchRange(times, fromClamped, toClamped);
    (0, _asserts.assertIsTrue)(toIndex >= fromIndex);
    const fromJust = !fromRatio;
    const toJust = !toRatio; // Handles that from and to are same

    if (fromIndex === toIndex && fromRatio === toRatio) {
      if (!fromJust) {
        this.preLerpIndex = fromIndex;
        this.preLerpRatio = fromRatio;
      } else {
        this.directKeyframesBegin = fromIndex;
        this.directKeyframesEnd = fromIndex + 1;
      }

      return;
    }

    if (!fromJust) {
      this.preLerpIndex = fromIndex;
      this.preLerpRatio = fromRatio;
    }

    this.directKeyframesBegin = fromJust ? fromIndex : fromIndex + 1;
    this.directKeyframesEnd = toIndex + 1;

    if (!toJust) {
      this.postLerpIndex = toIndex;
      this.postLerpRatio = toRatio;
    }
  }

  _reset() {
    this.preLerpIndex = -1;
    this.preLerpRatio = 0.0;
    this.directKeyframesBegin = 0;
    this.directKeyframesEnd = 0;
    this.postLerpIndex = -1;
    this.postLerpRatio = 0.0;
    this._timeOffset = 0.0;
  }

}

function searchRange(values, from, to) {
  const nValues = values.length;
  (0, _asserts.assertIsTrue)(nValues !== 0);
  (0, _asserts.assertIsTrue)(to >= from && from >= values[0] && to <= values[nValues - 1]);
  const {
    index: fromIndex,
    ratio: fromRatio
  } = binarySearchRatio(values, from);
  const {
    index: toIndex,
    ratio: toRatio
  } = binarySearchRatio(values, to);
  return {
    fromIndex,
    fromRatio,
    toIndex,
    toRatio
  };
}

function binarySearchRatio(values, value) {
  const nValues = values.length;
  (0, _asserts.assertIsTrue)(values.length !== 0);
  let resultIndex = 0;
  let resultRatio = 0.0;
  const index0 = (0, _binarySearch.binarySearchEpsilon)(values, value);

  if (index0 >= 0) {
    resultIndex = index0;
  } else {
    const iNext = ~index0;
    (0, _asserts.assertIsTrue)(iNext !== 0 && iNext !== nValues && nValues > 1);
    const iPrev = iNext - 1;
    resultIndex = iPrev;
    const next = values[iNext];
    const prev = values[iPrev];
    resultRatio = (value - prev) / (next - prev);
  }

  return {
    index: resultIndex,
    ratio: resultRatio
  };
}

class ExoticTrsAnimationEvaluator {
  constructor(nodeAnimations, binder) {
    this._nodeEvaluations = void 0;
    this._nodeEvaluations = nodeAnimations.map(nodeAnimation => nodeAnimation.createEvaluator(binder));
  }

  evaluate(time) {
    this._nodeEvaluations.forEach(nodeEvaluator => {
      nodeEvaluator.evaluate(time);
    });
  }

}

class ExoticNodeAnimationEvaluator {
  constructor(path, position, rotation, scale, binder) {
    this._position = null;
    this._rotation = null;
    this._scale = null;

    if (position) {
      this._position = createExoticTrackEvaluationRecord(position.times, position.values, _index2.Vec3, path, 'position', binder);
    }

    if (rotation) {
      this._rotation = createExoticTrackEvaluationRecord(rotation.times, rotation.values, _index2.Quat, path, 'rotation', binder);
    }

    if (scale) {
      this._scale = createExoticTrackEvaluationRecord(scale.times, scale.values, _index2.Vec3, path, 'scale', binder);
    }
  }

  evaluate(time) {
    if (this._position) {
      const value = this._position.evaluator.evaluate(time);

      this._position.runtimeBinding.setValue(value);
    }

    if (this._rotation) {
      const value = this._rotation.evaluator.evaluate(time);

      this._rotation.runtimeBinding.setValue(value);
    }

    if (this._scale) {
      const value = this._scale.evaluator.evaluate(time);

      this._scale.runtimeBinding.setValue(value);
    }
  }

}

class ExoticTrackEvaluator {
  constructor(times, values, ValueConstructor) {
    this._times = void 0;
    this._inputSampleResultCache = {
      just: false,
      index: -1,
      nextIndex: -1,
      ratio: 0.0
    };
    this._values = void 0;
    this._prevValue = void 0;
    this._nextValue = void 0;
    this._resultValue = void 0;
    this._times = times;
    this._values = values;
    this._prevValue = new ValueConstructor();
    this._nextValue = new ValueConstructor();
    this._resultValue = new ValueConstructor();
  }

  evaluate(time) {
    const {
      _times: times,
      _values: values,
      _resultValue: resultValue
    } = this;
    const nFrames = times.length;

    if (nFrames === 0) {
      return resultValue;
    }

    const inputSampleResult = sampleInput(times, time, this._inputSampleResultCache);

    if (inputSampleResult.just) {
      values.get(inputSampleResult.index, resultValue);
    } else {
      values.lerp(inputSampleResult.index, inputSampleResult.nextIndex, inputSampleResult.ratio, this._prevValue, this._nextValue, resultValue);
    }

    return resultValue;
  }

}

function sampleInput(values, time, result) {
  const nFrames = values.length;
  (0, _asserts.assertIsTrue)(nFrames !== 0);
  const firstTime = values[0];
  const lastTime = values[nFrames - 1];

  if (time < firstTime) {
    result.just = true;
    result.index = 0;
  } else if (time > lastTime) {
    result.just = true;
    result.index = nFrames - 1;
  } else {
    const index = (0, _binarySearch.binarySearchEpsilon)(values, time);

    if (index >= 0) {
      result.just = true;
      result.index = index;
    } else {
      const nextIndex = ~index;
      (0, _asserts.assertIsTrue)(nextIndex !== 0 && nextIndex !== nFrames && nFrames > 1);
      const prevIndex = nextIndex - 1;
      const prevTime = values[prevIndex];
      const nextTime = values[nextIndex];
      const ratio = (time - values[prevIndex]) / (nextTime - prevTime);
      result.just = false;
      result.index = prevIndex;
      result.nextIndex = nextIndex;
      result.ratio = ratio;
    }
  }

  return result;
}

const QUANTIZATION_TYPE_TO_ARRAY_VIEW_CONSTRUCTOR_MAP = {
  uint8: Uint8Array,
  uint16: Uint16Array
};
var FloatPrecision;

(function (FloatPrecision) {
  FloatPrecision[FloatPrecision["FLOAT_32"] = 0] = "FLOAT_32";
  FloatPrecision[FloatPrecision["FLOAT_64"] = 1] = "FLOAT_64";
})(FloatPrecision || (FloatPrecision = {}));

function getFloatArrayPrecision(array) {
  switch (array.BYTES_PER_ELEMENT) {
    default:
      (0, _asserts.assertIsTrue)(false);
    // fallthrough

    case 4:
      return FloatPrecision.FLOAT_32;

    case 8:
      return FloatPrecision.FLOAT_64;
  }
}

function getFloatArrayConstructorWithPrecision(precision) {
  switch (precision) {
    default:
      (0, _asserts.assertIsTrue)(false);
    // fallthrough

    case FloatPrecision.FLOAT_32:
      return Float32Array;

    case FloatPrecision.FLOAT_64:
      return Float64Array;
  }
}

let QuantizedFloatArray = (_dec7 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}QuantizedFloatArray`), _dec7(_class15 = (_class16 = (_temp5 = class QuantizedFloatArray {
  get quantizationType() {
    switch (this.values.BYTES_PER_ELEMENT) {
      default: // fallthrough

      case 1:
        return 'uint8';

      case 2:
        return 'uint16';
    }
  }

  constructor(originalPrecision, values, extent, min = 0.0) {
    _initializerDefineProperty(this, "originalPrecision", _descriptor10, this);

    _initializerDefineProperty(this, "min", _descriptor11, this);

    _initializerDefineProperty(this, "extent", _descriptor12, this);

    _initializerDefineProperty(this, "values", _descriptor13, this);

    this.originalPrecision = originalPrecision;
    this.values = values;
    this.extent = extent;
    this.min = min;
  }
  /**
   * @internal
   */


  toHashString() {
    const {
      originalPrecision,
      min,
      extent,
      values
    } = this;
    return `${originalPrecision} ${floatToHashString(min)} ${floatToHashString(extent)} ${values.join(' ')}`;
  }

}, _temp5), (_descriptor10 = _applyDecoratedDescriptor(_class16.prototype, "originalPrecision", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class16.prototype, "min", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class16.prototype, "extent", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class16.prototype, "values", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class16)) || _class15);

function quantize(values, type) {
  const TypedArrayViewConstructor = QUANTIZATION_TYPE_TO_ARRAY_VIEW_CONSTRUCTOR_MAP[type];
  const MAX = 1 << TypedArrayViewConstructor.BYTES_PER_ELEMENT;
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  values.forEach(value => {
    min = Math.min(value, min);
    max = Math.max(value, max);
  });
  const extent = max - min; // Should consider `extent === 0.0`.

  const normalized = TypedArrayViewConstructor.from(values, value => (value - min) / extent * MAX);
  return new QuantizedFloatArray(getFloatArrayPrecision(values), normalized, extent, min);
}

function indexQuantized(quantized, index) {
  const quantizedValue = quantized.values[index];
  const MAX_VALUE = 1 << quantized.values.BYTES_PER_ELEMENT;
  return quantizedValue / MAX_VALUE * quantized.extent + quantized.min;
}

function createExoticTrackEvaluationRecord(times, values, ValueConstructor, path, property, binder) {
  const trackBinding = new _track.TrackBinding();
  trackBinding.path = new _track.TrackPath().toHierarchy(path).toProperty(property);
  const runtimeBinding = binder(trackBinding);

  if (!runtimeBinding) {
    return null;
  }

  const evaluator = new ExoticTrackEvaluator(times, values, ValueConstructor);
  return {
    runtimeBinding,
    evaluator
  };
}

function loadVec3FromQuantized(values, index, out) {
  _index2.Vec3.set(out, indexQuantized(values, 3 * index + 0), indexQuantized(values, 3 * index + 1), indexQuantized(values, 3 * index + 2));
}

function loadQuatFromQuantized(values, index, out) {
  _index2.Quat.set(out, indexQuantized(values, 4 * index + 0), indexQuantized(values, 4 * index + 1), indexQuantized(values, 4 * index + 2), indexQuantized(values, 4 * index + 3));
}
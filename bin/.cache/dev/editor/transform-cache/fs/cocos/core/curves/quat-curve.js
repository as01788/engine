"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuatCurve = exports.QuatInterpolationMode = void 0;

var _asserts = require("../data/utils/asserts.js");

var _index2 = require("../math/index.js");

var _keyframeCurve = require("./keyframe-curve.js");

var _curve = require("./curve.js");

var _binarySearch = require("../algorithm/binary-search.js");

var _index3 = require("../data/decorators/index.js");

var _index4 = require("../data/index.js");

var _easingMethod = require("./easing-method.js");

var _bezier = require("../animation/bezier.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _dec2, _class4, _class5, _descriptor4, _descriptor5, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * The method used for interpolation between values of a keyframe and its next keyframe.
 */
let QuatInterpolationMode;
exports.QuatInterpolationMode = QuatInterpolationMode;

(function (QuatInterpolationMode) {
  QuatInterpolationMode[QuatInterpolationMode["SLERP"] = 0] = "SLERP";
  QuatInterpolationMode[QuatInterpolationMode["CONSTANT"] = 1] = "CONSTANT";
})(QuatInterpolationMode || (exports.QuatInterpolationMode = QuatInterpolationMode = {}));

/**
 * View to a quaternion frame value.
 * Note, the view may be invalidated due to keyframe change/add/remove.
 */
let QuatKeyframeValue = (_dec = (0, _index3.ccclass)('cc.QuatKeyframeValue'), _dec(_class = (0, _index3.uniquelyReferenced)(_class = (_class2 = (_temp = class QuatKeyframeValue {
  /**
   * Interpolation method used for this keyframe.
   */

  /**
    * Value of the keyframe.
    */

  /**
   * @deprecated Reserved for backward compatibility. Will be removed in future.
   */
  constructor({
    value,
    interpolationMode,
    easingMethod
  } = {}) {
    _initializerDefineProperty(this, "interpolationMode", _descriptor, this);

    _initializerDefineProperty(this, "value", _descriptor2, this);

    _initializerDefineProperty(this, "easingMethod", _descriptor3, this);

    // TODO: shall we normalize it?
    this.value = value ? _index2.Quat.clone(value) : this.value;
    this.interpolationMode = interpolationMode !== null && interpolationMode !== void 0 ? interpolationMode : this.interpolationMode;
    this.easingMethod = easingMethod !== null && easingMethod !== void 0 ? easingMethod : this.easingMethod;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "interpolationMode", [_index3.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return QuatInterpolationMode.SLERP;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_index3.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Quat.clone(_index2.Quat.IDENTITY);
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "easingMethod", [_index3.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _curve.EasingMethod.LINEAR;
  }
})), _class2)) || _class) || _class);

function createQuatKeyframeValue(params) {
  return new QuatKeyframeValue(params);
}
/**
 * Quaternion curve.
 */


let QuatCurve = (_dec2 = (0, _index3.ccclass)('cc.QuatCurve'), _dec2(_class4 = (_class5 = (_temp2 = class QuatCurve extends _keyframeCurve.KeyframeCurve {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "preExtrapolation", _descriptor4, this);

    _initializerDefineProperty(this, "postExtrapolation", _descriptor5, this);
  }

  /**
   * Evaluates this curve at specified time.
   * @param time Input time.
   * @returns Result value.
   */
  evaluate(time, quat) {
    var _quat;

    (_quat = quat) !== null && _quat !== void 0 ? _quat : quat = new _index2.Quat();
    const {
      _times: times,
      _values: values,
      postExtrapolation,
      preExtrapolation
    } = this;
    const nFrames = times.length;

    if (nFrames === 0) {
      return quat;
    }

    const firstTime = times[0];
    const lastTime = times[nFrames - 1];

    if (time < firstTime) {
      // Underflow
      const preValue = values[0];

      switch (preExtrapolation) {
        case _curve.ExtrapolationMode.LOOP:
          time = firstTime + (0, _index2.repeat)(time - firstTime, lastTime - firstTime);
          break;

        case _curve.ExtrapolationMode.PING_PONG:
          time = firstTime + (0, _index2.pingPong)(time - firstTime, lastTime - firstTime);
          break;

        case _curve.ExtrapolationMode.CLAMP:
        default:
          return _index2.Quat.copy(quat, preValue.value);
      }
    } else if (time > lastTime) {
      // Overflow
      const preValue = values[nFrames - 1];

      switch (postExtrapolation) {
        case _curve.ExtrapolationMode.LOOP:
          time = firstTime + (0, _index2.repeat)(time - firstTime, lastTime - firstTime);
          break;

        case _curve.ExtrapolationMode.PING_PONG:
          time = firstTime + (0, _index2.pingPong)(time - firstTime, lastTime - firstTime);
          break;

        case _curve.ExtrapolationMode.CLAMP:
        default:
          return _index2.Quat.copy(quat, preValue.value);
      }
    }

    const index = (0, _binarySearch.binarySearchEpsilon)(times, time);

    if (index >= 0) {
      return _index2.Quat.copy(quat, values[index].value);
    }

    const iNext = ~index;
    (0, _asserts.assertIsTrue)(iNext !== 0 && iNext !== nFrames && nFrames > 1);
    const iPre = iNext - 1;
    const preTime = times[iPre];
    const preValue = values[iPre];
    const nextTime = times[iNext];
    const nextValue = values[iNext];
    (0, _asserts.assertIsTrue)(nextTime > time && time > preTime);
    const dt = nextTime - preTime;
    const ratio = (time - preTime) / dt;

    switch (preValue.interpolationMode) {
      default:
      case QuatInterpolationMode.CONSTANT:
        return _index2.Quat.copy(quat, preValue.value);

      case QuatInterpolationMode.SLERP:
        {
          const {
            easingMethod
          } = preValue;
          const transformedRatio = easingMethod === _curve.EasingMethod.LINEAR ? ratio : Array.isArray(easingMethod) ? (0, _bezier.bezierByTime)(easingMethod, ratio) : (0, _easingMethod.getEasingFn)(easingMethod)(ratio);
          return _index2.Quat.slerp(quat, preValue.value, nextValue.value, transformedRatio);
        }
    }
  }
  /**
   * Adds a keyframe into this curve.
   * @param time Time of the keyframe.
   * @param value Value of the keyframe.
   * @returns The index to the new keyframe.
   */


  addKeyFrame(time, value) {
    const keyframeValue = new QuatKeyframeValue(value);
    return super.addKeyFrame(time, keyframeValue);
  }
  /**
   * Assigns all keyframes.
   * @param keyframes An iterable to keyframes. The keyframes should be sorted by their time.
   */


  assignSorted(times, values) {
    if (values !== undefined) {
      (0, _asserts.assertIsTrue)(Array.isArray(times));
      this.setKeyframes(times.slice(), values.map(value => createQuatKeyframeValue(value)));
    } else {
      const keyframes = Array.from(times);
      this.setKeyframes(keyframes.map(([time]) => time), keyframes.map(([, value]) => createQuatKeyframeValue(value)));
    }
  }

  [_index4.serializeTag](output, context) {
    if (!context.toCCON) {
      output.writeThis();
      return;
    }

    const {
      _times: times,
      _values: keyframeValues
    } = this;
    let interpolationModeRepeated = true;
    keyframeValues.forEach((keyframeValue, _index, [firstKeyframeValue]) => {
      // Values are unlikely to be unified.
      if (interpolationModeRepeated && keyframeValue.interpolationMode !== firstKeyframeValue.interpolationMode) {
        interpolationModeRepeated = false;
      }
    });
    const nKeyframes = times.length;
    const nFrames = nKeyframes;
    const interpolationModesSize = INTERPOLATION_MODE_BYTES * (interpolationModeRepeated ? 1 : nFrames);
    const easingMethodsSize = keyframeValues.reduce((result, {
      easingMethod
    }) => result += Array.isArray(easingMethod) ? EASING_METHOD_BYTES + EASING_METHOD_BEZIER_COMPONENT_BYTES * 4 : EASING_METHOD_BYTES, 0);
    let dataSize = 0;
    dataSize += FLAGS_BYTES + FRAME_COUNT_BYTES + TIME_BYTES * nFrames + VALUE_BYTES * 4 * nFrames + easingMethodsSize + interpolationModesSize + 0;
    const dataView = new DataView(new ArrayBuffer(dataSize));
    let P = 0; // Flags

    let flags = 0;

    if (interpolationModeRepeated) {
      flags |= KeyframeValueFlagMask.INTERPOLATION_MODE;
    }

    dataView.setUint32(P, flags, true);
    P += FLAGS_BYTES; // Frame count

    dataView.setUint32(P, nFrames, true);
    P += FRAME_COUNT_BYTES; // Times

    times.forEach((time, index) => dataView.setFloat32(P + TIME_BYTES * index, time, true));
    P += TIME_BYTES * nFrames; // Values

    keyframeValues.forEach(({
      value: {
        x,
        y,
        z,
        w
      }
    }, index) => {
      const pQuat = P + VALUE_BYTES * 4 * index;
      dataView.setFloat32(pQuat + VALUE_BYTES * 0, x, true);
      dataView.setFloat32(pQuat + VALUE_BYTES * 1, y, true);
      dataView.setFloat32(pQuat + VALUE_BYTES * 2, z, true);
      dataView.setFloat32(pQuat + VALUE_BYTES * 3, w, true);
    });
    P += VALUE_BYTES * 4 * nFrames; // Easing methods

    keyframeValues.forEach(({
      easingMethod
    }, index) => {
      if (!Array.isArray(easingMethod)) {
        dataView.setUint8(P, easingMethod);
        ++P;
      } else {
        dataView.setUint8(P, EASING_METHOD_BEZIER_TAG);
        ++P;
        dataView.setFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 0, easingMethod[0], true);
        dataView.setFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 1, easingMethod[1], true);
        dataView.setFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 2, easingMethod[2], true);
        dataView.setFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 3, easingMethod[3], true);
        P += EASING_METHOD_BEZIER_COMPONENT_BYTES * 4;
      }
    }); // Frame values

    const INTERPOLATION_MODES_START = P;
    P += interpolationModesSize;
    let pInterpolationMode = INTERPOLATION_MODES_START;
    keyframeValues.forEach(({
      interpolationMode
    }) => {
      dataView.setUint8(pInterpolationMode, interpolationMode);

      if (!interpolationModeRepeated) {
        pInterpolationMode += INTERPOLATION_MODE_BYTES;
      }
    });
    const bytes = new Uint8Array(dataView.buffer);
    output.writeProperty('bytes', bytes);
  }

  [_index4.deserializeTag](input, context) {
    if (!context.fromCCON) {
      input.readThis();
      return;
    }

    const bytes = input.readProperty('bytes');
    const dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let P = 0; // Flags

    const flags = dataView.getUint32(P, true);
    P += FLAGS_BYTES;
    const interpolationModeRepeated = flags & KeyframeValueFlagMask.INTERPOLATION_MODE; // Frame count

    const nFrames = dataView.getUint32(P, true);
    P += FRAME_COUNT_BYTES; // Times

    const times = Array.from({
      length: nFrames
    }, (_, index) => dataView.getFloat32(P + TIME_BYTES * index, true));
    P += TIME_BYTES * nFrames; // Frame values

    const P_VALUES = P;
    P += VALUE_BYTES * 4 * nFrames;
    const keyframeValues = Array.from({
      length: nFrames
    }, (_, index) => {
      const pQuat = P_VALUES + VALUE_BYTES * 4 * index;
      const x = dataView.getFloat32(pQuat + VALUE_BYTES * 0, true);
      const y = dataView.getFloat32(pQuat + VALUE_BYTES * 1, true);
      const z = dataView.getFloat32(pQuat + VALUE_BYTES * 2, true);
      const w = dataView.getFloat32(pQuat + VALUE_BYTES * 3, true);
      const easingMethod = dataView.getUint8(P);
      ++P;
      const keyframeValue = createQuatKeyframeValue({
        value: {
          x,
          y,
          z,
          w
        }
      });

      if (easingMethod !== EASING_METHOD_BEZIER_TAG) {
        keyframeValue.easingMethod = easingMethod;
      } else {
        keyframeValue.easingMethod = [dataView.getFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 0, true), dataView.getFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 1, true), dataView.getFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 2, true), dataView.getFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 3, true)];
        P += EASING_METHOD_BEZIER_COMPONENT_BYTES * 4;
      }

      return keyframeValue;
    });

    if (interpolationModeRepeated) {
      const interpolationMode = dataView.getUint8(P);
      ++P;

      for (let iKeyframe = 0; iKeyframe < nFrames; ++iKeyframe) {
        keyframeValues[iKeyframe].interpolationMode = interpolationMode;
      }
    } else {
      for (let iKeyframe = 0; iKeyframe < nFrames; ++iKeyframe) {
        const interpolationMode = dataView.getUint8(P + iKeyframe);
        keyframeValues[iKeyframe].interpolationMode = interpolationMode;
      }

      P += nFrames;
    }

    this._times = times;
    this._values = keyframeValues;
  }

}, _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "preExtrapolation", [_index3.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _curve.ExtrapolationMode.CLAMP;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "postExtrapolation", [_index3.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _curve.ExtrapolationMode.CLAMP;
  }
})), _class5)) || _class4);
exports.QuatCurve = QuatCurve;
var KeyframeValueFlagMask;

(function (KeyframeValueFlagMask) {
  KeyframeValueFlagMask[KeyframeValueFlagMask["INTERPOLATION_MODE"] = 1] = "INTERPOLATION_MODE";
})(KeyframeValueFlagMask || (KeyframeValueFlagMask = {}));

const FLAGS_BYTES = 1;
const FRAME_COUNT_BYTES = 4;
const TIME_BYTES = 4;
const VALUE_BYTES = 4;
const INTERPOLATION_MODE_BYTES = 1;
const EASING_METHOD_BYTES = 1;
const EASING_METHOD_BEZIER_TAG = 255;
const EASING_METHOD_BEZIER_COMPONENT_BYTES = 4;
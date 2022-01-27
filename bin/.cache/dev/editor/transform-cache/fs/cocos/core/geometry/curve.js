"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evalOptCurve = evalOptCurve;
exports.constructLegacyCurveAndConvert = constructLegacyCurveAndConvert;
exports.AnimationCurve = exports.OptimizedKey = exports.Keyframe = void 0;

var _class4 = require("../data/class.js");

var _utils = require("../math/utils.js");

var _types = require("../animation/types.js");

var _index = require("../curves/index.js");

var _index2 = require("../data/decorators/index.js");

var _dec, _class, _class2, _descriptor, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const LOOK_FORWARD = 3;
/**
 * @en
 * A key frame in the curve.
 * @zh
 * 曲线中的一个关键帧。
 */

class Keyframe {
  constructor() {
    this.time = 0;
    this.value = 0;
    this.inTangent = 0;
    this.outTangent = 0;
  }

}

exports.Keyframe = Keyframe;

_class4.CCClass.fastDefine('cc.Keyframe', Keyframe, {
  time: 0,
  value: 0,
  inTangent: 0,
  outTangent: 0
});

class OptimizedKey {
  constructor() {
    this.index = void 0;
    this.time = void 0;
    this.endTime = void 0;
    this.coefficient = void 0;
    this.index = -1;
    this.time = 0;
    this.endTime = 0;
    this.coefficient = new Float32Array(4);
  }

  evaluate(T) {
    const t = T - this.time;
    return evalOptCurve(t, this.coefficient);
  }

}

exports.OptimizedKey = OptimizedKey;

function evalOptCurve(t, coefs) {
  return t * (t * (t * coefs[0] + coefs[1]) + coefs[2]) + coefs[3];
}
/**
 * @en
 * Describe a curve in which three times Hermite interpolation is used for each adjacent key frame.
 * @zh
 * 描述一条曲线，其中每个相邻关键帧采用三次hermite插值计算。
 */


let AnimationCurve = (_dec = (0, _index2.ccclass)('cc.AnimationCurve'), _dec(_class = (_class2 = (_temp = _class3 = class AnimationCurve {
  /**
   * For internal usage only.
   * @internal
   */
  get _internalCurve() {
    return this._curve;
  }
  /**
   * @en
   * The key frame of the curve.
   * @zh
   * 曲线的关键帧。
   */


  get keyFrames() {
    return Array.from(this._curve.keyframes()).map(([time, value]) => {
      const legacyKeyframe = new Keyframe();
      legacyKeyframe.time = time;
      legacyKeyframe.value = value.value;
      legacyKeyframe.inTangent = value.leftTangent;
      legacyKeyframe.outTangent = value.rightTangent;
      return legacyKeyframe;
    });
  }

  set keyFrames(value) {
    this._curve.assignSorted(value.map(legacyCurve => [legacyCurve.time, {
      interpolationMode: _index.RealInterpolationMode.CUBIC,
      value: legacyCurve.value,
      leftTangent: legacyCurve.inTangent,
      rightTangent: legacyCurve.outTangent
    }]));
  }
  /**
   * @en
   * Loop mode [[WrapMode]] when the sampling time exceeds the left end.
   * @zh
   * 当采样时间超出左端时采用的循环模式[[WrapMode]]。
   */


  get preWrapMode() {
    return toLegacyWrapMode(this._curve.preExtrapolation);
  }

  set preWrapMode(value) {
    this._curve.preExtrapolation = fromLegacyWrapMode(value);
  }
  /**
   * @en
   * Cycle mode [[WrapMode]] when the sampling time exceeds the right end.
   * @zh
   * 当采样时间超出右端时采用的循环模式[[WrapMode]]。
   */


  get postWrapMode() {
    return toLegacyWrapMode(this._curve.postExtrapolation);
  }

  set postWrapMode(value) {
    this._curve.postExtrapolation = fromLegacyWrapMode(value);
  }

  /**
   * 构造函数。
   * @param keyFrames 关键帧。
   */
  constructor(keyFrames = null) {
    _initializerDefineProperty(this, "_curve", _descriptor, this);

    this.cachedKey = void 0;

    if (keyFrames instanceof _index.RealCurve) {
      this._curve = keyFrames;
    } else {
      const curve = new _index.RealCurve();
      this._curve = curve;
      curve.preExtrapolation = _index.ExtrapolationMode.LOOP;
      curve.postExtrapolation = _index.ExtrapolationMode.CLAMP;

      if (!keyFrames) {
        curve.assignSorted([[0.0, {
          interpolationMode: _index.RealInterpolationMode.CUBIC,
          value: 1.0
        }], [1.0, {
          interpolationMode: _index.RealInterpolationMode.CUBIC,
          value: 1.0
        }]]);
      } else {
        curve.assignSorted(keyFrames.map(legacyKeyframe => [legacyKeyframe.time, {
          interpolationMode: _index.RealInterpolationMode.CUBIC,
          value: legacyKeyframe.value,
          leftTangent: legacyKeyframe.inTangent,
          rightTangent: legacyKeyframe.outTangent
        }]));
      }
    }

    this.cachedKey = new OptimizedKey();
  }
  /**
   * @en
   * Add a keyframe.
   * @zh
   * 添加一个关键帧。
   * @param keyFrame 关键帧。
   */


  addKey(keyFrame) {
    if (!keyFrame) {
      this._curve.clear();
    } else {
      this._curve.addKeyFrame(keyFrame.time, {
        interpolationMode: _index.RealInterpolationMode.CUBIC,
        value: keyFrame.value,
        leftTangent: keyFrame.inTangent,
        rightTangent: keyFrame.outTangent
      });
    }
  }
  /**
   * @ignore
   * @param time
   */


  evaluate_slow(time) {
    return this._curve.evaluate(time);
  }
  /**
   * @en
   * Calculate the curve interpolation at a given point in time.
   * @zh
   * 计算给定时间点的曲线插值。
   * @param time 时间。
   */


  evaluate(time) {
    const {
      cachedKey,
      _curve: curve
    } = this;
    const nKeyframes = curve.keyFramesCount;
    const lastKeyframeIndex = nKeyframes - 1;
    let wrappedTime = time;
    const extrapolationMode = time < 0 ? curve.preExtrapolation : curve.postExtrapolation;
    const startTime = curve.getKeyframeTime(0);
    const endTime = curve.getKeyframeTime(lastKeyframeIndex);

    switch (extrapolationMode) {
      case _index.ExtrapolationMode.LOOP:
        wrappedTime = (0, _utils.repeat)(time - startTime, endTime - startTime) + startTime;
        break;

      case _index.ExtrapolationMode.PING_PONG:
        wrappedTime = (0, _utils.pingPong)(time - startTime, endTime - startTime) + startTime;
        break;

      case _index.ExtrapolationMode.CLAMP:
      default:
        wrappedTime = (0, _utils.clamp)(time, startTime, endTime);
        break;
    }

    if (wrappedTime >= cachedKey.time && wrappedTime < cachedKey.endTime) {
      return cachedKey.evaluate(wrappedTime);
    }

    const leftIndex = this.findIndex(cachedKey, wrappedTime);
    const rightIndex = Math.min(leftIndex + 1, lastKeyframeIndex);
    this.calcOptimizedKey(cachedKey, leftIndex, rightIndex);
    return cachedKey.evaluate(wrappedTime);
  }
  /**
   * @ignore
   * @param optKey
   * @param leftIndex
   * @param rightIndex
   */


  calcOptimizedKey(optKey, leftIndex, rightIndex) {
    const lhsTime = this._curve.getKeyframeTime(leftIndex);

    const rhsTime = this._curve.getKeyframeTime(rightIndex);

    const {
      value: lhsValue,
      leftTangent: lhsOutTangent
    } = this._curve.getKeyframeValue(leftIndex);

    const {
      value: rhsValue,
      rightTangent: rhsInTangent
    } = this._curve.getKeyframeValue(rightIndex);

    optKey.index = leftIndex;
    optKey.time = lhsTime;
    optKey.endTime = rhsTime;
    const dx = rhsTime - lhsTime;
    const dy = rhsValue - lhsValue;
    const length = 1 / (dx * dx);
    const d1 = lhsOutTangent * dx;
    const d2 = rhsInTangent * dx;
    optKey.coefficient[0] = (d1 + d2 - dy - dy) * length / dx;
    optKey.coefficient[1] = (dy + dy + dy - d1 - d1 - d2) * length;
    optKey.coefficient[2] = lhsOutTangent;
    optKey.coefficient[3] = lhsValue;
  }
  /**
   * @ignore
   * @param optKey
   * @param t
   */


  findIndex(optKey, t) {
    const {
      _curve: curve
    } = this;
    const nKeyframes = curve.keyFramesCount;
    const cachedIndex = optKey.index;

    if (cachedIndex !== -1) {
      const cachedTime = curve.getKeyframeTime(cachedIndex);

      if (t > cachedTime) {
        for (let i = 0; i < LOOK_FORWARD; i++) {
          const currIndex = cachedIndex + i;

          if (currIndex + 1 < nKeyframes && curve.getKeyframeTime(currIndex + 1) > t) {
            return currIndex;
          }
        }
      } else {
        for (let i = 0; i < LOOK_FORWARD; i++) {
          const currIndex = cachedIndex - i;

          if (currIndex >= 0 && curve.getKeyframeTime(currIndex - 1) <= t) {
            return currIndex - 1;
          }
        }
      }
    }

    let left = 0;
    let right = nKeyframes;
    let mid;

    while (right - left > 1) {
      mid = Math.floor((left + right) / 2);

      if (curve.getKeyframeTime(mid) >= t) {
        right = mid;
      } else {
        left = mid;
      }
    }

    return left;
  }

}, _class3.defaultKF = [{
  time: 0,
  value: 1,
  inTangent: 0,
  outTangent: 0
}, {
  time: 1,
  value: 1,
  inTangent: 0,
  outTangent: 0
}], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_curve", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.AnimationCurve = AnimationCurve;

function fromLegacyWrapMode(legacyWrapMode) {
  switch (legacyWrapMode) {
    default:
    case _types.WrapModeMask.Default:
    case _types.WrapModeMask.Normal:
    case _types.WrapModeMask.Clamp:
      return _index.ExtrapolationMode.CLAMP;

    case _types.WrapModeMask.PingPong:
      return _index.ExtrapolationMode.PING_PONG;

    case _types.WrapModeMask.Loop:
      return _index.ExtrapolationMode.LOOP;
  }
}

function toLegacyWrapMode(extrapolationMode) {
  switch (extrapolationMode) {
    default:
    case _index.ExtrapolationMode.LINEAR:
    case _index.ExtrapolationMode.CLAMP:
      return _types.WrapModeMask.Clamp;

    case _index.ExtrapolationMode.PING_PONG:
      return _types.WrapModeMask.PingPong;

    case _index.ExtrapolationMode.LOOP:
      return _types.WrapModeMask.Loop;
  }
}
/**
 * Same as but more effective than `new LegacyCurve()._internalCurve`.
 */


function constructLegacyCurveAndConvert() {
  const curve = new _index.RealCurve();
  curve.assignSorted([[0.0, {
    interpolationMode: _index.RealInterpolationMode.CUBIC,
    value: 1.0
  }], [1.0, {
    interpolationMode: _index.RealInterpolationMode.CUBIC,
    value: 1.0
  }]]);
  return curve;
}
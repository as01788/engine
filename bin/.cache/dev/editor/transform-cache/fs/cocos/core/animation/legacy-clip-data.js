"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeBezierToTangents = timeBezierToTangents;
exports.AnimationClipLegacyData = void 0;

var _targetPath = require("./target-path.js");

var _animationCurve = require("./animation-curve.js");

var _index = require("../curves/index.js");

var _asserts = require("../data/utils/asserts.js");

var _track = require("./tracks/track.js");

var _untypedTrack = require("./tracks/untyped-track.js");

var _index2 = require("../platform/index.js");

var _realTrack = require("./tracks/real-track.js");

var _index3 = require("../math/index.js");

var _cubicSplineValue = require("./cubic-spline-value.js");

var _colorTrack = require("./tracks/color-track.js");

var _vectorTrack = require("./tracks/vector-track.js");

var _quatTrack = require("./tracks/quat-track.js");

var _objectTrack = require("./tracks/object-track.js");

var _sizeTrack = require("./tracks/size-track.js");

var _curve = require("../curves/curve.js");

// interface ConvertMap<TValue, TTrack> {
//     valueConstructor: Constructor<TValue>;
//     trackConstructor: Constructor<TTrack>;
//     properties: [keyof TValue, number][];
// }
// const VECTOR_LIKE_CURVE_CONVERT_TABLE = [
//     {
//         valueConstructor: Size,
//         trackConstructor: SizeTrack,
//         properties: [['width', 0], ['height', 1]],
//     } as ConvertMap<Size, SizeTrack>,
//     {
//         valueConstructor: Color,
//         trackConstructor: ColorTrack,
//         properties: [['r', 0], ['g', 1], ['b', 2], ['a', 3]],
//     } as ConvertMap<Color, ColorTrack>,
// ];
class AnimationClipLegacyData {
  constructor(duration) {
    this._keys = [];
    this._curves = [];
    this._commonTargets = [];
    this._ratioSamplers = [];
    this._runtimeCurves = void 0;
    this._data = null;
    this._duration = void 0;
    this._duration = duration;
  }

  get keys() {
    return this._keys;
  }

  set keys(value) {
    this._keys = value;
  }

  get curves() {
    return this._curves;
  }

  set curves(value) {
    this._curves = value;
    delete this._runtimeCurves;
  }

  get commonTargets() {
    return this._commonTargets;
  }

  set commonTargets(value) {
    this._commonTargets = value;
  }
  /**
   * 此动画的数据。
   */


  get data() {
    return this._data;
  }

  getPropertyCurves() {
    if (!this._runtimeCurves) {
      this._createPropertyCurves();
    }

    return this._runtimeCurves;
  }

  toTracks() {
    const newTracks = [];
    const {
      keys: legacyKeys,
      curves: legacyCurves,
      commonTargets: legacyCommonTargets
    } = this;

    const convertTrackPath = (track, modifiers, valueAdapter) => {
      const trackPath = new _track.TrackPath();

      for (const modifier of modifiers) {
        if (typeof modifier === 'string') {
          trackPath.toProperty(modifier);
        } else if (typeof modifier === 'number') {
          trackPath.toElement(modifier);
        } else if (modifier instanceof _targetPath.HierarchyPath) {
          trackPath.toHierarchy(modifier.path);
        } else if (modifier instanceof _targetPath.ComponentPath) {
          trackPath.toComponent(modifier.component);
        } else {
          trackPath.toCustomized(modifier);
        }
      }

      track.path = trackPath;
      track.proxy = valueAdapter;
    };

    const untypedTracks = legacyCommonTargets.map(legacyCommonTarget => {
      const track = new _untypedTrack.UntypedTrack();
      convertTrackPath(track, legacyCommonTarget.modifiers, legacyCommonTarget.valueAdapter);
      newTracks.push(track);
      return track;
    });

    for (const legacyCurve of legacyCurves) {
      var _legacyCurveData$inte;

      const legacyCurveData = legacyCurve.data;
      const legacyValues = legacyCurveData.values;

      if (legacyValues.length === 0) {
        // Legacy clip did not record type info.
        continue;
      }

      const legacyKeysIndex = legacyCurveData.keys; // Rule: negative index means single frame.

      const times = legacyKeysIndex < 0 ? [0.0] : legacyKeys[legacyCurveData.keys];
      const firstValue = legacyValues[0]; // Rule: default to true.

      const interpolate = (_legacyCurveData$inte = legacyCurveData.interpolate) !== null && _legacyCurveData$inte !== void 0 ? _legacyCurveData$inte : true; // Rule: _arrayLength only used for morph target, internally.

      (0, _asserts.assertIsTrue)(typeof legacyCurveData._arrayLength !== 'number' || typeof firstValue === 'number');
      const legacyEasingMethodConverter = new LegacyEasingMethodConverter(legacyCurveData, times.length);

      const installPathAndSetter = track => {
        convertTrackPath(track, legacyCurve.modifiers, legacyCurve.valueAdapter);
      };

      let legacyCommonTargetCurve;

      if (typeof legacyCurve.commonTarget === 'number') {
        // Rule: common targets should only target Vectors/`Size`/`Color`.
        if (!legacyValues.every(value => typeof value === 'number')) {
          (0, _index2.warnID)(3932);
          continue;
        } // Rule: Each curve that has common target should be numeric curve and targets string property.


        if (legacyCurve.valueAdapter || legacyCurve.modifiers.length !== 1 || typeof legacyCurve.modifiers[0] !== 'string') {
          (0, _index2.warnID)(3933);
          continue;
        }

        const propertyName = legacyCurve.modifiers[0];
        const untypedTrack = untypedTracks[legacyCurve.commonTarget];
        const {
          curve
        } = untypedTrack.addChannel(propertyName);
        legacyCommonTargetCurve = curve;
      }

      const convertCurve = () => {
        if (typeof firstValue === 'number') {
          if (!legacyValues.every(value => typeof value === 'number')) {
            (0, _index2.warnID)(3934);
            return;
          }

          let realCurve;

          if (legacyCommonTargetCurve) {
            realCurve = legacyCommonTargetCurve;
          } else {
            const track = new _realTrack.RealTrack();
            installPathAndSetter(track);
            newTracks.push(track);
            realCurve = track.channel.curve;
          }

          const interpolationMethod = interpolate ? _index.RealInterpolationMode.LINEAR : _index.RealInterpolationMode.CONSTANT;
          realCurve.assignSorted(times, legacyValues.map(value => ({
            value,
            interpolationMode: interpolationMethod
          })));
          legacyEasingMethodConverter.convert(realCurve);
          return;
        } else if (typeof firstValue === 'object') {
          switch (true) {
            default:
              break;

            case everyInstanceOf(legacyValues, _index3.Vec2):
            case everyInstanceOf(legacyValues, _index3.Vec3):
            case everyInstanceOf(legacyValues, _index3.Vec4):
              {
                const components = firstValue instanceof _index3.Vec2 ? 2 : firstValue instanceof _index3.Vec3 ? 3 : 4;
                const track = new _vectorTrack.VectorTrack();
                installPathAndSetter(track);
                track.componentsCount = components;
                const [{
                  curve: x
                }, {
                  curve: y
                }, {
                  curve: z
                }, {
                  curve: w
                }] = track.channels();
                const interpolationMode = interpolate ? _index.RealInterpolationMode.LINEAR : _index.RealInterpolationMode.CONSTANT;

                const valueToFrame = value => ({
                  value,
                  interpolationMode
                });

                switch (components) {
                  case 4:
                    w.assignSorted(times, legacyValues.map(value => valueToFrame(value.w)));
                    legacyEasingMethodConverter.convert(w);
                  // falls through

                  case 3:
                    z.assignSorted(times, legacyValues.map(value => valueToFrame(value.z)));
                    legacyEasingMethodConverter.convert(z);
                  // falls through

                  default:
                    x.assignSorted(times, legacyValues.map(value => valueToFrame(value.x)));
                    legacyEasingMethodConverter.convert(x);
                    y.assignSorted(times, legacyValues.map(value => valueToFrame(value.y)));
                    legacyEasingMethodConverter.convert(y);
                    break;
                }

                newTracks.push(track);
                return;
              }

            case everyInstanceOf(legacyValues, _index3.Quat):
              {
                const track = new _quatTrack.QuatTrack();
                installPathAndSetter(track);
                const interpolationMode = interpolate ? _index.QuatInterpolationMode.SLERP : _index.QuatInterpolationMode.CONSTANT;
                track.channel.curve.assignSorted(times, legacyValues.map(value => ({
                  value: _index3.Quat.clone(value),
                  interpolationMode
                })));
                legacyEasingMethodConverter.convertQuatCurve(track.channel.curve);
                newTracks.push(track);
                return;
              }

            case everyInstanceOf(legacyValues, _index3.Color):
              {
                const track = new _colorTrack.ColorTrack();
                installPathAndSetter(track);
                const [{
                  curve: r
                }, {
                  curve: g
                }, {
                  curve: b
                }, {
                  curve: a
                }] = track.channels();
                const interpolationMode = interpolate ? _index.RealInterpolationMode.LINEAR : _index.RealInterpolationMode.CONSTANT;

                const valueToFrame = value => ({
                  value,
                  interpolationMode
                });

                r.assignSorted(times, legacyValues.map(value => valueToFrame(value.r)));
                legacyEasingMethodConverter.convert(r);
                g.assignSorted(times, legacyValues.map(value => valueToFrame(value.g)));
                legacyEasingMethodConverter.convert(g);
                b.assignSorted(times, legacyValues.map(value => valueToFrame(value.b)));
                legacyEasingMethodConverter.convert(b);
                a.assignSorted(times, legacyValues.map(value => valueToFrame(value.a)));
                legacyEasingMethodConverter.convert(a);
                newTracks.push(track);
                return;
              }

            case everyInstanceOf(legacyValues, _index3.Size):
              {
                const track = new _sizeTrack.SizeTrack();
                installPathAndSetter(track);
                const [{
                  curve: width
                }, {
                  curve: height
                }] = track.channels();
                const interpolationMode = interpolate ? _index.RealInterpolationMode.LINEAR : _index.RealInterpolationMode.CONSTANT;

                const valueToFrame = value => ({
                  value,
                  interpolationMode
                });

                width.assignSorted(times, legacyValues.map(value => valueToFrame(value.width)));
                legacyEasingMethodConverter.convert(width);
                height.assignSorted(times, legacyValues.map(value => valueToFrame(value.height)));
                legacyEasingMethodConverter.convert(height);
                newTracks.push(track);
                return;
              }

            case everyInstanceOf(legacyValues, _cubicSplineValue.CubicSplineNumberValue):
              {
                (0, _asserts.assertIsTrue)(legacyEasingMethodConverter.nil);
                const track = new _realTrack.RealTrack();
                installPathAndSetter(track);
                const interpolationMode = interpolate ? _index.RealInterpolationMode.CUBIC : _index.RealInterpolationMode.CONSTANT;
                track.channel.curve.assignSorted(times, legacyValues.map(value => ({
                  value: value.dataPoint,
                  leftTangent: value.inTangent,
                  rightTangent: value.outTangent,
                  interpolationMode
                })));
                newTracks.push(track);
                return;
              }

            case everyInstanceOf(legacyValues, _cubicSplineValue.CubicSplineVec2Value):
            case everyInstanceOf(legacyValues, _cubicSplineValue.CubicSplineVec3Value):
            case everyInstanceOf(legacyValues, _cubicSplineValue.CubicSplineVec4Value):
              {
                (0, _asserts.assertIsTrue)(legacyEasingMethodConverter.nil);
                const components = firstValue instanceof _cubicSplineValue.CubicSplineVec2Value ? 2 : firstValue instanceof _cubicSplineValue.CubicSplineVec3Value ? 3 : 4;
                const track = new _vectorTrack.VectorTrack();
                installPathAndSetter(track);
                track.componentsCount = components;
                const [x, y, z, w] = track.channels();
                const interpolationMode = interpolate ? _index.RealInterpolationMode.LINEAR : _index.RealInterpolationMode.CONSTANT;

                const valueToFrame = (value, inTangent, outTangent) => ({
                  value,
                  leftTangent: inTangent,
                  rightTangent: outTangent,
                  interpolationMode
                });

                switch (components) {
                  case 4:
                    w.curve.assignSorted(times, legacyValues.map(value => valueToFrame(value.dataPoint.w, value.inTangent.w, value.outTangent.w)));
                  // falls through

                  case 3:
                    z.curve.assignSorted(times, legacyValues.map(value => valueToFrame(value.dataPoint.z, value.inTangent.z, value.outTangent.z)));
                  // falls through

                  default:
                    x.curve.assignSorted(times, legacyValues.map(value => valueToFrame(value.dataPoint.y, value.inTangent.y, value.outTangent.y)));
                    y.curve.assignSorted(times, legacyValues.map(value => valueToFrame(value.dataPoint.x, value.inTangent.x, value.outTangent.x)));
                    break;
                }

                newTracks.push(track);
                return;
              }

            case legacyValues.every(value => value instanceof _cubicSplineValue.CubicSplineQuatValue):
              {
                (0, _index2.warnID)(3935);
                break;
              }
          } // End switch

        }

        const objectTrack = new _objectTrack.ObjectTrack();
        installPathAndSetter(objectTrack);
        objectTrack.channel.curve.assignSorted(times, legacyValues);
        newTracks.push(objectTrack);
      };

      convertCurve();
    }

    return newTracks;
  }

  _createPropertyCurves() {
    this._ratioSamplers = this._keys.map(keys => new _animationCurve.RatioSampler(keys.map(key => key / this._duration)));
    this._runtimeCurves = this._curves.map(targetCurve => ({
      curve: new _animationCurve.AnimCurve(targetCurve.data, this._duration),
      modifiers: targetCurve.modifiers,
      valueAdapter: targetCurve.valueAdapter,
      sampler: this._ratioSamplers[targetCurve.data.keys],
      commonTarget: targetCurve.commonTarget
    }));
  }

}

exports.AnimationClipLegacyData = AnimationClipLegacyData;

function everyInstanceOf(array, constructor) {
  return array.every(element => element instanceof constructor);
} // #region Legacy data structures prior to 1.2


// #endregion
class LegacyEasingMethodConverter {
  constructor(legacyCurveData, keyframesCount) {
    this._easingMethods = void 0;
    const {
      easingMethods
    } = legacyCurveData;

    if (Array.isArray(easingMethods)) {
      // Different
      if (easingMethods.length === 0 && keyframesCount !== 0) {
        // This shall not happen as specified in doc on legacy easing methods
        // but it does in history project(see cocos-creator/3d-tasks/issues/#8468).
        // This may be a promise breaking BUG between engine & Editor.
        // Let's capture this case.
        this._easingMethods = new Array(keyframesCount).fill(null);
      } else {
        this._easingMethods = easingMethods;
      }
    } else if (easingMethods === undefined) {
      // Same
      this._easingMethods = new Array(keyframesCount).fill(legacyCurveData.easingMethod);
    } else {
      // Compressed as record
      this._easingMethods = Array.from({
        length: keyframesCount
      }, (_, index) => {
        var _easingMethods$index;

        return (_easingMethods$index = easingMethods[index]) !== null && _easingMethods$index !== void 0 ? _easingMethods$index : null;
      });
    }
  }

  get nil() {
    return !this._easingMethods || this._easingMethods.every(easingMethod => easingMethod === null || easingMethod === undefined);
  }

  convert(curve) {
    const {
      _easingMethods: easingMethods
    } = this;

    if (!easingMethods) {
      return;
    }

    const nKeyframes = curve.keyFramesCount;

    if (curve.keyFramesCount < 2) {
      return;
    }

    if (Array.isArray(easingMethods)) {
      (0, _asserts.assertIsTrue)(nKeyframes === easingMethods.length);
    }

    const iLastKeyframe = nKeyframes - 1;

    for (let iKeyframe = 0; iKeyframe < iLastKeyframe; ++iKeyframe) {
      const easingMethod = easingMethods[iKeyframe];

      if (!easingMethod) {
        continue;
      }

      if (Array.isArray(easingMethod)) {
        // Time bezier points
        timeBezierToTangents(easingMethod, curve.getKeyframeTime(iKeyframe), curve.getKeyframeValue(iKeyframe), curve.getKeyframeTime(iKeyframe + 1), curve.getKeyframeValue(iKeyframe + 1));
      } else {
        applyLegacyEasingMethodName(easingMethod, curve, iKeyframe);
      }
    }
  }

  convertQuatCurve(curve) {
    const {
      _easingMethods: easingMethods
    } = this;

    if (!easingMethods) {
      return;
    }

    const nKeyframes = curve.keyFramesCount;

    if (curve.keyFramesCount < 2) {
      return;
    }

    if (Array.isArray(easingMethods)) {
      (0, _asserts.assertIsTrue)(nKeyframes === easingMethods.length);
    }

    const iLastKeyframe = nKeyframes - 1;

    for (let iKeyframe = 0; iKeyframe < iLastKeyframe; ++iKeyframe) {
      const easingMethod = easingMethods[iKeyframe];

      if (!easingMethod) {
        continue;
      }

      if (Array.isArray(easingMethod)) {
        curve.getKeyframeValue(iKeyframe).easingMethod = easingMethod.slice();
      } else {
        applyLegacyEasingMethodNameIntoQuatCurve(easingMethod, curve, iKeyframe);
      }
    }
  }

}
/**
 * @returns Inserted keyframes count.
 */


function applyLegacyEasingMethodName(easingMethodName, curve, keyframeIndex) {
  (0, _asserts.assertIsTrue)(keyframeIndex !== curve.keyFramesCount - 1);
  (0, _asserts.assertIsTrue)(easingMethodName in easingMethodNameMap);
  const keyframeValue = curve.getKeyframeValue(keyframeIndex);
  const easingMethod = easingMethodNameMap[easingMethodName];

  if (easingMethod === _curve.EasingMethod.CONSTANT) {
    keyframeValue.interpolationMode = _index.RealInterpolationMode.CONSTANT;
  } else {
    keyframeValue.interpolationMode = _index.RealInterpolationMode.LINEAR;
    keyframeValue.easingMethod = easingMethod;
  }
}

function applyLegacyEasingMethodNameIntoQuatCurve(easingMethodName, curve, keyframeIndex) {
  (0, _asserts.assertIsTrue)(keyframeIndex !== curve.keyFramesCount - 1);
  (0, _asserts.assertIsTrue)(easingMethodName in easingMethodNameMap);
  const keyframeValue = curve.getKeyframeValue(keyframeIndex);
  const easingMethod = easingMethodNameMap[easingMethodName];
  keyframeValue.easingMethod = easingMethod;
}

const easingMethodNameMap = {
  constant: _curve.EasingMethod.CONSTANT,
  linear: _curve.EasingMethod.LINEAR,
  quadIn: _curve.EasingMethod.QUAD_IN,
  quadOut: _curve.EasingMethod.QUAD_OUT,
  quadInOut: _curve.EasingMethod.QUAD_IN_OUT,
  quadOutIn: _curve.EasingMethod.QUAD_OUT_IN,
  cubicIn: _curve.EasingMethod.CUBIC_IN,
  cubicOut: _curve.EasingMethod.CUBIC_OUT,
  cubicInOut: _curve.EasingMethod.CUBIC_IN_OUT,
  cubicOutIn: _curve.EasingMethod.CUBIC_OUT_IN,
  quartIn: _curve.EasingMethod.QUART_IN,
  quartOut: _curve.EasingMethod.QUART_OUT,
  quartInOut: _curve.EasingMethod.QUART_IN_OUT,
  quartOutIn: _curve.EasingMethod.QUART_OUT_IN,
  quintIn: _curve.EasingMethod.QUINT_IN,
  quintOut: _curve.EasingMethod.QUINT_OUT,
  quintInOut: _curve.EasingMethod.QUINT_IN_OUT,
  quintOutIn: _curve.EasingMethod.QUINT_OUT_IN,
  sineIn: _curve.EasingMethod.SINE_IN,
  sineOut: _curve.EasingMethod.SINE_OUT,
  sineInOut: _curve.EasingMethod.SINE_IN_OUT,
  sineOutIn: _curve.EasingMethod.SINE_OUT_IN,
  expoIn: _curve.EasingMethod.EXPO_IN,
  expoOut: _curve.EasingMethod.EXPO_OUT,
  expoInOut: _curve.EasingMethod.EXPO_IN_OUT,
  expoOutIn: _curve.EasingMethod.EXPO_OUT_IN,
  circIn: _curve.EasingMethod.CIRC_IN,
  circOut: _curve.EasingMethod.CIRC_OUT,
  circInOut: _curve.EasingMethod.CIRC_IN_OUT,
  circOutIn: _curve.EasingMethod.CIRC_OUT_IN,
  elasticIn: _curve.EasingMethod.ELASTIC_IN,
  elasticOut: _curve.EasingMethod.ELASTIC_OUT,
  elasticInOut: _curve.EasingMethod.ELASTIC_IN_OUT,
  elasticOutIn: _curve.EasingMethod.ELASTIC_OUT_IN,
  backIn: _curve.EasingMethod.BACK_IN,
  backOut: _curve.EasingMethod.BACK_OUT,
  backInOut: _curve.EasingMethod.BACK_IN_OUT,
  backOutIn: _curve.EasingMethod.BACK_OUT_IN,
  bounceIn: _curve.EasingMethod.BOUNCE_IN,
  bounceOut: _curve.EasingMethod.BOUNCE_OUT,
  bounceInOut: _curve.EasingMethod.BOUNCE_IN_OUT,
  bounceOutIn: _curve.EasingMethod.BOUNCE_OUT_IN,
  smooth: _curve.EasingMethod.SMOOTH,
  fade: _curve.EasingMethod.FADE
};
/**
 * Legacy curve uses time based bezier curve interpolation.
 * That's, interpolate time 'x'(time ratio between two frames, eg.[0, 1])
 * and then use the interpolated time to sample curve.
 * Now we need to compute the the end tangent of previous frame and the start tangent of the next frame.
 * @param timeBezierPoints Bezier points used for legacy time interpolation.
 * @param previousTime Time of the previous keyframe.
 * @param previousValue Value of the previous keyframe.
 * @param nextTime Time of the next keyframe.
 * @param nextValue Value of the next keyframe.
 */

function timeBezierToTangents(timeBezierPoints, previousTime, previousKeyframe, nextTime, nextKeyframe) {
  const [p1X, p1Y, p2X, p2Y] = timeBezierPoints;
  const {
    value: previousValue
  } = previousKeyframe;
  const {
    value: nextValue
  } = nextKeyframe;
  const dValue = nextValue - previousValue;
  const dTime = nextTime - previousTime;
  const fx = 3 * dTime;
  const fy = 3 * dValue;
  const t1x = p1X * fx;
  const t1y = p1Y * fy;
  const t2x = (1.0 - p2X) * fx;
  const t2y = (1.0 - p2Y) * fy;
  const ONE_THIRD = 1.0 / 3.0;
  const previousTangent = t1y / t1x;
  const previousTangentWeight = Math.sqrt(t1x * t1x + t1y * t1y) * ONE_THIRD;
  const nextTangent = t2y / t2x;
  const nextTangentWeight = Math.sqrt(t2x * t2x + t2y * t2y) * ONE_THIRD;
  previousKeyframe.interpolationMode = _index.RealInterpolationMode.CUBIC;
  previousKeyframe.tangentWeightMode = ensureRightTangentWeightMode(previousKeyframe.tangentWeightMode);
  previousKeyframe.rightTangent = previousTangent;
  previousKeyframe.rightTangentWeight = previousTangentWeight;
  nextKeyframe.tangentWeightMode = ensureLeftTangentWeightMode(nextKeyframe.tangentWeightMode);
  nextKeyframe.leftTangent = nextTangent;
  nextKeyframe.leftTangentWeight = nextTangentWeight;
}

function ensureLeftTangentWeightMode(tangentWeightMode) {
  if (tangentWeightMode === _index.TangentWeightMode.NONE) {
    return _index.TangentWeightMode.LEFT;
  } else if (tangentWeightMode === _index.TangentWeightMode.RIGHT) {
    return _index.TangentWeightMode.BOTH;
  } else {
    return tangentWeightMode;
  }
}

function ensureRightTangentWeightMode(tangentWeightMode) {
  if (tangentWeightMode === _index.TangentWeightMode.NONE) {
    return _index.TangentWeightMode.RIGHT;
  } else if (tangentWeightMode === _index.TangentWeightMode.LEFT) {
    return _index.TangentWeightMode.BOTH;
  } else {
    return tangentWeightMode;
  }
} // #region TODO: convert power easing method
// type Powers = [number, number, number, number];
// const POWERS_QUAD_IN: Powers = [0.0, 0.0, 1.0, 0.0]; // k * k
// const POWERS_QUAD_OUT: Powers = [0.0, 2.0, -1.0, 0.0]; // k * (2 - k)
// const POWERS_CUBIC_IN: Powers = [0.0, 0.0, 0.0, 1.0]; // k * k * k
// const POWERS_CUBIC_OUT: Powers = [0.0, 0.0, 0.0, 1.0]; // --k * k * k + 1
// const BACK_S = 1.70158;
// const POWERS_BACK_IN: Powers = [1.0, 0.0, -BACK_S, BACK_S + 1.0]; // k * k * ((s + 1) * k - s)
// const POWERS_BACK_OUT: Powers = [1.0, 0.0, BACK_S, BACK_S + 1.0]; // k * k * ((s + 1) * k - s)
// const POWERS_SMOOTH: Powers = [0.0, 0.0, 3.0, -2.0]; // k * k * (3 - 2 * k)
// function convertPowerMethod (curve: RealCurve, keyframeIndex: number, powers: Powers) {
//     assertIsTrue(keyframeIndex !== curve.keyFramesCount - 1);
//     const nextKeyframeIndex = keyframeIndex + 1;
//     powerToTangents(
//         powers,
//         curve.getKeyframeTime(keyframeIndex),
//         curve.getKeyframeValue(keyframeIndex),
//         curve.getKeyframeTime(nextKeyframeIndex),
//         curve.getKeyframeValue(nextKeyframeIndex),
//     );
//     return 0;
// };
// function convertInOutPowersMethod (curve: RealCurve, keyframeIndex: number, inPowers: Powers, outPowers: Powers) {
//     assertIsTrue(keyframeIndex !== curve.keyFramesCount - 1);
//     const nextKeyframeIndex = keyframeIndex + 1;
//     const previousTime = curve.getKeyframeTime(keyframeIndex);
//     const nextTime = curve.getKeyframeTime(nextKeyframeIndex);
//     const previousKeyframeValue = curve.getKeyframeValue(keyframeIndex);
//     const nextKeyframeValue = curve.getKeyframeValue(nextKeyframeIndex);
//     const middleTime = previousTime + (nextTime - previousTime);
//     const middleValue = previousKeyframeValue.value + (nextKeyframeValue.value - previousKeyframeValue.value);
//     const middleKeyframeValue = curve.getKeyframeValue(curve.addKeyFrame(middleTime, middleValue));
//     powerToTangents(
//         inPowers,
//         previousTime,
//         previousKeyframeValue,
//         middleTime,
//         middleKeyframeValue,
//     );
//     powerToTangents(
//         outPowers,
//         middleTime,
//         middleKeyframeValue,
//         nextTime,
//         nextKeyframeValue,
//     );
//     return 1;
// };
// function powerToTangents (
//     [a, b, c, d]: [number, number, number, number],
//     previousTime: number,
//     previousKeyframe: RealKeyframeValue,
//     nextTime: number,
//     nextKeyframe: RealKeyframeValue,
// ) {
//     const bernstein = powerToBernstein([a, b, c, d]);
//     const { value: previousValue } = previousKeyframe;
//     const { value: nextValue } = nextKeyframe;
//     timeBezierToTangents(
//         [???????],
//         previousTime,
//         previousValue,
//         nextTime,
//         nextValue,
//     );
// }
// function powerToBernstein ([p0, p1, p2, p3]: [number, number, number, number]) {
//     // https://stackoverflow.com/questions/33859199/convert-polynomial-curve-to-bezier-curve-control-points
//     // https://blog.demofox.org/2016/12/08/evaluating-polynomials-with-the-gpu-texture-sampler/
//     const m00 = p0;
//     const m01 = p1 / 3.0;
//     const m02 = p2 / 3.0;
//     const m03 = p3;
//     const m10 = m00 + m01;
//     const m11 = m01 + m02;
//     const m12 = m02 + m03;
//     const m20 = m10 + m11;
//     const m21 = m11 + m12;
//     const m30 = m20 + m21;
//     const bernstein = new Float64Array(4);
//     bernstein[0] = m00;
//     bernstein[1] = m10;
//     bernstein[2] = m20;
//     bernstein[3] = m30;
//     return bernstein;
// }
// #endregion
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TangentWeightMode = exports.ExtrapolationMode = exports.RealInterpolationMode = void 0;

/**
 * @en
 * The method used for interpolation method between value of a keyframe and its next keyframe.
 * @zh
 * 在某关键帧（前一帧）和其下一帧之间插值时使用的插值方式。
 */
let RealInterpolationMode;
/**
 * @en
 * Specifies how to extrapolate the value
 * if input time is underflow(less than the the first frame time) or
 * overflow(greater than the last frame time) when evaluating an curve.
 * @zh
 * 在求值曲线时，指定当输入时间下溢（小于第一帧的时间）或上溢（大于最后一帧的时间）时应该如何推断结果值。
 */

exports.RealInterpolationMode = RealInterpolationMode;

(function (RealInterpolationMode) {
  RealInterpolationMode[RealInterpolationMode["LINEAR"] = 0] = "LINEAR";
  RealInterpolationMode[RealInterpolationMode["CONSTANT"] = 1] = "CONSTANT";
  RealInterpolationMode[RealInterpolationMode["CUBIC"] = 2] = "CUBIC";
})(RealInterpolationMode || (exports.RealInterpolationMode = RealInterpolationMode = {}));

let ExtrapolationMode;
/**
 * @en
 * Specifies both side tangent weight mode of a keyframe value.
 * @zh
 * 指定关键帧两侧的切线权重模式。
 */

exports.ExtrapolationMode = ExtrapolationMode;

(function (ExtrapolationMode) {
  ExtrapolationMode[ExtrapolationMode["LINEAR"] = 0] = "LINEAR";
  ExtrapolationMode[ExtrapolationMode["CLAMP"] = 1] = "CLAMP";
  ExtrapolationMode[ExtrapolationMode["LOOP"] = 2] = "LOOP";
  ExtrapolationMode[ExtrapolationMode["PING_PONG"] = 3] = "PING_PONG";
})(ExtrapolationMode || (exports.ExtrapolationMode = ExtrapolationMode = {}));

let TangentWeightMode;
exports.TangentWeightMode = TangentWeightMode;

(function (TangentWeightMode) {
  TangentWeightMode[TangentWeightMode["NONE"] = 0] = "NONE";
  TangentWeightMode[TangentWeightMode["LEFT"] = 1] = "LEFT";
  TangentWeightMode[TangentWeightMode["RIGHT"] = 2] = "RIGHT";
  TangentWeightMode[TangentWeightMode["BOTH"] = 3] = "BOTH";
})(TangentWeightMode || (exports.TangentWeightMode = TangentWeightMode = {}));
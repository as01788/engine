"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEasingFn = getEasingFn;
exports.EasingMethod = void 0;

var easing = _interopRequireWildcard(require("../animation/easing.js"));

var _asserts = require("../data/utils/asserts.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let EasingMethod;
exports.EasingMethod = EasingMethod;

(function (EasingMethod) {
  EasingMethod[EasingMethod["LINEAR"] = 0] = "LINEAR";
  EasingMethod[EasingMethod["CONSTANT"] = 1] = "CONSTANT";
  EasingMethod[EasingMethod["QUAD_IN"] = 2] = "QUAD_IN";
  EasingMethod[EasingMethod["QUAD_OUT"] = 3] = "QUAD_OUT";
  EasingMethod[EasingMethod["QUAD_IN_OUT"] = 4] = "QUAD_IN_OUT";
  EasingMethod[EasingMethod["QUAD_OUT_IN"] = 5] = "QUAD_OUT_IN";
  EasingMethod[EasingMethod["CUBIC_IN"] = 6] = "CUBIC_IN";
  EasingMethod[EasingMethod["CUBIC_OUT"] = 7] = "CUBIC_OUT";
  EasingMethod[EasingMethod["CUBIC_IN_OUT"] = 8] = "CUBIC_IN_OUT";
  EasingMethod[EasingMethod["CUBIC_OUT_IN"] = 9] = "CUBIC_OUT_IN";
  EasingMethod[EasingMethod["QUART_IN"] = 10] = "QUART_IN";
  EasingMethod[EasingMethod["QUART_OUT"] = 11] = "QUART_OUT";
  EasingMethod[EasingMethod["QUART_IN_OUT"] = 12] = "QUART_IN_OUT";
  EasingMethod[EasingMethod["QUART_OUT_IN"] = 13] = "QUART_OUT_IN";
  EasingMethod[EasingMethod["QUINT_IN"] = 14] = "QUINT_IN";
  EasingMethod[EasingMethod["QUINT_OUT"] = 15] = "QUINT_OUT";
  EasingMethod[EasingMethod["QUINT_IN_OUT"] = 16] = "QUINT_IN_OUT";
  EasingMethod[EasingMethod["QUINT_OUT_IN"] = 17] = "QUINT_OUT_IN";
  EasingMethod[EasingMethod["SINE_IN"] = 18] = "SINE_IN";
  EasingMethod[EasingMethod["SINE_OUT"] = 19] = "SINE_OUT";
  EasingMethod[EasingMethod["SINE_IN_OUT"] = 20] = "SINE_IN_OUT";
  EasingMethod[EasingMethod["SINE_OUT_IN"] = 21] = "SINE_OUT_IN";
  EasingMethod[EasingMethod["EXPO_IN"] = 22] = "EXPO_IN";
  EasingMethod[EasingMethod["EXPO_OUT"] = 23] = "EXPO_OUT";
  EasingMethod[EasingMethod["EXPO_IN_OUT"] = 24] = "EXPO_IN_OUT";
  EasingMethod[EasingMethod["EXPO_OUT_IN"] = 25] = "EXPO_OUT_IN";
  EasingMethod[EasingMethod["CIRC_IN"] = 26] = "CIRC_IN";
  EasingMethod[EasingMethod["CIRC_OUT"] = 27] = "CIRC_OUT";
  EasingMethod[EasingMethod["CIRC_IN_OUT"] = 28] = "CIRC_IN_OUT";
  EasingMethod[EasingMethod["CIRC_OUT_IN"] = 29] = "CIRC_OUT_IN";
  EasingMethod[EasingMethod["ELASTIC_IN"] = 30] = "ELASTIC_IN";
  EasingMethod[EasingMethod["ELASTIC_OUT"] = 31] = "ELASTIC_OUT";
  EasingMethod[EasingMethod["ELASTIC_IN_OUT"] = 32] = "ELASTIC_IN_OUT";
  EasingMethod[EasingMethod["ELASTIC_OUT_IN"] = 33] = "ELASTIC_OUT_IN";
  EasingMethod[EasingMethod["BACK_IN"] = 34] = "BACK_IN";
  EasingMethod[EasingMethod["BACK_OUT"] = 35] = "BACK_OUT";
  EasingMethod[EasingMethod["BACK_IN_OUT"] = 36] = "BACK_IN_OUT";
  EasingMethod[EasingMethod["BACK_OUT_IN"] = 37] = "BACK_OUT_IN";
  EasingMethod[EasingMethod["BOUNCE_IN"] = 38] = "BOUNCE_IN";
  EasingMethod[EasingMethod["BOUNCE_OUT"] = 39] = "BOUNCE_OUT";
  EasingMethod[EasingMethod["BOUNCE_IN_OUT"] = 40] = "BOUNCE_IN_OUT";
  EasingMethod[EasingMethod["BOUNCE_OUT_IN"] = 41] = "BOUNCE_OUT_IN";
  EasingMethod[EasingMethod["SMOOTH"] = 42] = "SMOOTH";
  EasingMethod[EasingMethod["FADE"] = 43] = "FADE";
})(EasingMethod || (exports.EasingMethod = EasingMethod = {}));

const easingMethodFnMap = {
  [EasingMethod.CONSTANT]: easing.constant,
  [EasingMethod.LINEAR]: easing.linear,
  [EasingMethod.QUAD_IN]: easing.quadIn,
  [EasingMethod.QUAD_OUT]: easing.quadOut,
  [EasingMethod.QUAD_IN_OUT]: easing.quadInOut,
  [EasingMethod.QUAD_OUT_IN]: easing.quadOutIn,
  [EasingMethod.CUBIC_IN]: easing.cubicIn,
  [EasingMethod.CUBIC_OUT]: easing.cubicOut,
  [EasingMethod.CUBIC_IN_OUT]: easing.cubicInOut,
  [EasingMethod.CUBIC_OUT_IN]: easing.cubicOutIn,
  [EasingMethod.QUART_IN]: easing.quartIn,
  [EasingMethod.QUART_OUT]: easing.quartOut,
  [EasingMethod.QUART_IN_OUT]: easing.quartInOut,
  [EasingMethod.QUART_OUT_IN]: easing.quartOutIn,
  [EasingMethod.QUINT_IN]: easing.quintIn,
  [EasingMethod.QUINT_OUT]: easing.quintOut,
  [EasingMethod.QUINT_IN_OUT]: easing.quintInOut,
  [EasingMethod.QUINT_OUT_IN]: easing.quintOutIn,
  [EasingMethod.SINE_IN]: easing.sineIn,
  [EasingMethod.SINE_OUT]: easing.sineOut,
  [EasingMethod.SINE_IN_OUT]: easing.sineInOut,
  [EasingMethod.SINE_OUT_IN]: easing.sineOutIn,
  [EasingMethod.EXPO_IN]: easing.expoIn,
  [EasingMethod.EXPO_OUT]: easing.expoOut,
  [EasingMethod.EXPO_IN_OUT]: easing.expoInOut,
  [EasingMethod.EXPO_OUT_IN]: easing.expoOutIn,
  [EasingMethod.CIRC_IN]: easing.circIn,
  [EasingMethod.CIRC_OUT]: easing.circOut,
  [EasingMethod.CIRC_IN_OUT]: easing.circInOut,
  [EasingMethod.CIRC_OUT_IN]: easing.circOutIn,
  [EasingMethod.ELASTIC_IN]: easing.elasticIn,
  [EasingMethod.ELASTIC_OUT]: easing.elasticOut,
  [EasingMethod.ELASTIC_IN_OUT]: easing.elasticInOut,
  [EasingMethod.ELASTIC_OUT_IN]: easing.elasticOutIn,
  [EasingMethod.BACK_IN]: easing.backIn,
  [EasingMethod.BACK_OUT]: easing.backOut,
  [EasingMethod.BACK_IN_OUT]: easing.backInOut,
  [EasingMethod.BACK_OUT_IN]: easing.backOutIn,
  [EasingMethod.BOUNCE_IN]: easing.bounceIn,
  [EasingMethod.BOUNCE_OUT]: easing.bounceOut,
  [EasingMethod.BOUNCE_IN_OUT]: easing.bounceInOut,
  [EasingMethod.BOUNCE_OUT_IN]: easing.bounceOutIn,
  [EasingMethod.SMOOTH]: easing.smooth,
  [EasingMethod.FADE]: easing.fade
};

function getEasingFn(easingMethod) {
  (0, _asserts.assertIsTrue)(easingMethod in easingMethodFnMap);
  return easingMethodFnMap[easingMethod];
}
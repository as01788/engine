"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Orientation = void 0;
const _PORTRAIT = 1;

const _PORTRAIT_UPSIDE_DOWN = _PORTRAIT << 1;

const _LEFT = _PORTRAIT << 2;

const _RIGHT = _PORTRAIT << 3;

const _LANDSCAPE = _LEFT | _RIGHT;

const _AUTO = _PORTRAIT | _LANDSCAPE;

let Orientation;
exports.Orientation = Orientation;

(function (Orientation) {
  Orientation[Orientation["PORTRAIT"] = _PORTRAIT] = "PORTRAIT";
  Orientation[Orientation["PORTRAIT_UPSIDE_DOWN"] = _PORTRAIT_UPSIDE_DOWN] = "PORTRAIT_UPSIDE_DOWN";
  Orientation[Orientation["LANDSCAPE_LEFT"] = _LEFT] = "LANDSCAPE_LEFT";
  Orientation[Orientation["LANDSCAPE_RIGHT"] = _RIGHT] = "LANDSCAPE_RIGHT";
  Orientation[Orientation["LANDSCAPE"] = _LANDSCAPE] = "LANDSCAPE";
  Orientation[Orientation["AUTO"] = _AUTO] = "AUTO";
})(Orientation || (exports.Orientation = Orientation = {}));
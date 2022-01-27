"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maskIfEmpty = maskIfEmpty;

function maskIfEmpty(curve) {
  return curve.keyFramesCount === 0 ? undefined : curve;
}
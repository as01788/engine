"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ccdIK = ccdIK;

var _quat = require("../../math/quat.js");

var _vec = require("../../math/vec3.js");

const THETA_ERROR = 0.001;
const DUMP_BIAS = 1.0;
var IterationResult;
/**
 * The Cyclic Coordinate Descent algorithm.
 * @param links The links(limbs).
 * @param target Target position.
 * @param maxIterations Max iterations.
 * @param forward True if use forward iteration(base to leaf), otherwise use backward iteration(leaf to base).
 */

(function (IterationResult) {
  IterationResult[IterationResult["UNFINISHED"] = 0] = "UNFINISHED";
  IterationResult[IterationResult["DONE"] = 1] = "DONE";
  IterationResult[IterationResult["INTERRUPTED"] = 2] = "INTERRUPTED";
})(IterationResult || (IterationResult = {}));

function ccdIK(links, target, epsilon, maxIterations, forward) {
  const nLinks = links.length;

  if (nLinks < 2) {
    return;
  }

  const u = new _vec.Vec3(); // Vector from end factor to current link

  const v = new _vec.Vec3(); // Vector from target to current link

  const axis = new _vec.Vec3(); // Intermediate var

  const correctiveRot = new _quat.Quat();
  const currentPos = new _vec.Vec3();
  const currentRot = new _quat.Quat();
  const endFactorPos = new _vec.Vec3();
  const iEndFactor = links.length - 1;
  const endFactor = links[iEndFactor];

  if (forward) {
    for (let iteration = 0; iteration < maxIterations; ++iteration) {
      // Won't run in infinite loop since we have `nLinks >= 2`
      for (let iLink = 0; iLink < iEndFactor; ++iLink) {
        const result = correct(iLink);

        if (result === IterationResult.INTERRUPTED) {
          break;
        } else if (result === IterationResult.DONE) {
          return;
        }
      }
    }
  } else {
    for (let iteration = 0; iteration < maxIterations; ++iteration) {
      // Won't run in infinite loop since we have `nLinks >= 2`
      for (let iLink = iEndFactor - 1; iLink >= 0; --iLink) {
        const result = correct(iLink);

        if (result === IterationResult.INTERRUPTED) {
          break;
        } else if (result === IterationResult.DONE) {
          return;
        }
      }
    }
  }

  function correct(linkIndex) {
    const current = links[linkIndex];
    current.getWorldPosition(currentPos);
    endFactor.getWorldPosition(endFactorPos);

    _vec.Vec3.subtract(u, endFactorPos, currentPos);

    _vec.Vec3.normalize(u, u);

    _vec.Vec3.subtract(v, target, currentPos);

    _vec.Vec3.normalize(v, v); // TODO: what if axis is zero?


    _vec.Vec3.cross(axis, u, v);

    _vec.Vec3.normalize(axis, axis);

    const cosTheta = _vec.Vec3.dot(u, v);

    const theta = Math.acos(cosTheta) * DUMP_BIAS; // Refresh hierarchy

    _quat.Quat.fromAxisAngle(correctiveRot, axis, theta);

    current.getWorldRotation(currentRot);

    _quat.Quat.multiply(currentRot, correctiveRot, currentRot);

    current.setWorldRotation(currentRot);
    endFactor.getWorldPosition(endFactorPos); // Try

    const distance = _vec.Vec3.distance(endFactorPos, target);

    if (distance < epsilon) {
      return IterationResult.DONE;
    } // If the link’s corrective rotations exceeds the tolerance-redo other links.


    if (theta > THETA_ERROR) {
      return IterationResult.INTERRUPTED;
    }

    return IterationResult.UNFINISHED;
  }
}
System.register("q-bundled:///fs/cocos/core/animation/kinematics/ccd.js", ["../../math/quat.js", "../../math/vec3.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, THETA_ERROR, DUMP_BIAS, IterationResult;

  /**
   * The Cyclic Coordinate Descent algorithm.
   * @param links The links(limbs).
   * @param target Target position.
   * @param maxIterations Max iterations.
   * @param forward True if use forward iteration(base to leaf), otherwise use backward iteration(leaf to base).
   */
  function ccdIK(links, target, epsilon, maxIterations, forward) {
    var nLinks = links.length;

    if (nLinks < 2) {
      return;
    }

    var u = new Vec3(); // Vector from end factor to current link

    var v = new Vec3(); // Vector from target to current link

    var axis = new Vec3(); // Intermediate var

    var correctiveRot = new Quat();
    var currentPos = new Vec3();
    var currentRot = new Quat();
    var endFactorPos = new Vec3();
    var iEndFactor = links.length - 1;
    var endFactor = links[iEndFactor];

    if (forward) {
      for (var iteration = 0; iteration < maxIterations; ++iteration) {
        // Won't run in infinite loop since we have `nLinks >= 2`
        for (var iLink = 0; iLink < iEndFactor; ++iLink) {
          var result = correct(iLink);

          if (result === IterationResult.INTERRUPTED) {
            break;
          } else if (result === IterationResult.DONE) {
            return;
          }
        }
      }
    } else {
      for (var _iteration = 0; _iteration < maxIterations; ++_iteration) {
        // Won't run in infinite loop since we have `nLinks >= 2`
        for (var _iLink = iEndFactor - 1; _iLink >= 0; --_iLink) {
          var _result = correct(_iLink);

          if (_result === IterationResult.INTERRUPTED) {
            break;
          } else if (_result === IterationResult.DONE) {
            return;
          }
        }
      }
    }

    function correct(linkIndex) {
      var current = links[linkIndex];
      current.getWorldPosition(currentPos);
      endFactor.getWorldPosition(endFactorPos);
      Vec3.subtract(u, endFactorPos, currentPos);
      Vec3.normalize(u, u);
      Vec3.subtract(v, target, currentPos);
      Vec3.normalize(v, v); // TODO: what if axis is zero?

      Vec3.cross(axis, u, v);
      Vec3.normalize(axis, axis);
      var cosTheta = Vec3.dot(u, v);
      var theta = Math.acos(cosTheta) * DUMP_BIAS; // Refresh hierarchy

      Quat.fromAxisAngle(correctiveRot, axis, theta);
      current.getWorldRotation(currentRot);
      Quat.multiply(currentRot, correctiveRot, currentRot);
      current.setWorldRotation(currentRot);
      endFactor.getWorldPosition(endFactorPos); // Try

      var distance = Vec3.distance(endFactorPos, target);

      if (distance < epsilon) {
        return IterationResult.DONE;
      } // If the link’s corrective rotations exceeds the tolerance-redo other links.


      if (theta > THETA_ERROR) {
        return IterationResult.INTERRUPTED;
      }

      return IterationResult.UNFINISHED;
    }
  }

  _export("ccdIK", ccdIK);

  return {
    setters: [function (_mathQuatJs) {
      Quat = _mathQuatJs.Quat;
    }, function (_mathVec3Js) {
      Vec3 = _mathVec3Js.Vec3;
    }],
    execute: function () {
      THETA_ERROR = 0.001;
      DUMP_BIAS = 1.0;

      (function (IterationResult) {
        IterationResult[IterationResult["UNFINISHED"] = 0] = "UNFINISHED";
        IterationResult[IterationResult["DONE"] = 1] = "DONE";
        IterationResult[IterationResult["INTERRUPTED"] = 2] = "INTERRUPTED";
      })(IterationResult || (IterationResult = {}));
    }
  };
});
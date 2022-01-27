System.register("q-bundled:///fs/cocos/core/animation/marionette/blend-2d.js", ["../../data/utils/asserts.js", "../../math/index.js"], function (_export, _context) {
  "use strict";

  var assertIsTrue, Vec2, Vec3, blendSimpleDirectional, SimpleDirectionalIssueSameDirection, getGradientBandCartesianCoords, getGradientBandPolarCoords;

  /**
   * Validates the samples if they satisfied the requirements of simple directional algorithm.
   * @param samples Samples to validate.
   * @returns Issues the samples containing.
   */
  function validateSimpleDirectionalSamples(samples) {
    var nSamples = samples.length;
    var issues = [];
    var sameDirectionValidationFlag = new Array(samples.length).fill(false);
    samples.forEach(function (sample, iSample) {
      if (sameDirectionValidationFlag[iSample]) {
        return;
      }

      var sameDirectionSamples;

      for (var iCheckSample = 0; iCheckSample < nSamples; ++iCheckSample) {
        var checkSample = samples[iCheckSample];

        if (Vec2.equals(sample, checkSample, 1e-5)) {
          var _sameDirectionSamples;

          ((_sameDirectionSamples = sameDirectionSamples) !== null && _sameDirectionSamples !== void 0 ? _sameDirectionSamples : sameDirectionSamples = []).push(iCheckSample);
          sameDirectionValidationFlag[iCheckSample] = true;
        }
      }

      if (sameDirectionSamples) {
        sameDirectionSamples.unshift(iSample);
        issues.push(new SimpleDirectionalIssueSameDirection(sameDirectionSamples));
      }
    });
    return issues;
  }

  /**
   * Cartesian Gradient Band Interpolation.
   * @param weights
   * @param thresholds
   * @param value
   */
  function sampleFreeformCartesian(weights, thresholds, value) {
    sampleFreeform(weights, thresholds, value, getGradientBandCartesianCoords);
  }
  /**
   * Polar Gradient Band Interpolation.
   * @param weights
   * @param thresholds
   * @param value
   */


  function sampleFreeformDirectional(weights, thresholds, value) {
    sampleFreeform(weights, thresholds, value, getGradientBandPolarCoords);
  }

  function sampleFreeform(weights, samples, value, getGradientBandCoords) {
    weights.fill(0.0);
    var pIpInput = new Vec2(0, 0);
    var pIJ = new Vec2(0, 0);
    var sumInfluence = 0.0;
    var nSamples = samples.length;

    for (var iSample = 0; iSample < nSamples; ++iSample) {
      var influence = Number.MAX_VALUE;
      var outsideHull = false;

      for (var jSample = 0; jSample < nSamples; ++jSample) {
        if (iSample === jSample) {
          continue;
        }

        getGradientBandCoords(samples[iSample], samples[jSample], value, pIpInput, pIJ);
        var t = 1 - Vec2.dot(pIpInput, pIJ) / Vec2.lengthSqr(pIJ);

        if (t < 0) {
          outsideHull = true;
          break;
        }

        influence = Math.min(influence, t);
      }

      if (!outsideHull) {
        weights[iSample] = influence;
        sumInfluence += influence;
      }
    }

    if (sumInfluence > 0) {
      weights.forEach(function (influence, index) {
        return weights[index] = influence / sumInfluence;
      });
    }
  }

  /**
   * Solves the barycentric coordinates of `p` within triangle (0, `a`, `b`).
   * @param a Triangle vertex.
   * @param b Triangle vertex.
   * @param p Input vector.
   * @param resolutions The barycentric coordinates of `a` and `b`.
   * @returns
   */
  function solveBarycentric(a, b, p, resolutions) {
    // Let P = p - 0, A = a - 0, B = b - 0,
    // wA = (P x B) / (A x B)
    // wB = (P x A) / (B x A)
    var det = Vec2.cross(a, b);

    if (!det) {
      resolutions.wA = 0.0;
      resolutions.wB = 0.0;
    } else {
      resolutions.wA = Vec2.cross(p, b) / det;
      resolutions.wB = Vec2.cross(p, a) / -det;
    }

    return resolutions;
  }

  _export({
    validateSimpleDirectionalSamples: validateSimpleDirectionalSamples,
    sampleFreeformCartesian: sampleFreeformCartesian,
    sampleFreeformDirectional: sampleFreeformDirectional
  });

  return {
    setters: [function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }, function (_mathIndexJs) {
      Vec2 = _mathIndexJs.Vec2;
      Vec3 = _mathIndexJs.Vec3;
    }],
    execute: function () {
      /**
       * Blends given samples using simple directional algorithm.
       * @param weights Result weights of each sample.
       * @param samples Every samples' parameter.
       * @param input Input parameter.
       */
      _export("blendSimpleDirectional", blendSimpleDirectional = function () {
        var CACHE_NORMALIZED_SAMPLE = new Vec2();
        var CACHE_BARYCENTRIC_SOLUTIONS = {
          wA: 0,
          wB: 0
        };
        return function blendSimpleDirectional(weights, samples, input) {
          assertIsTrue(weights.length === samples.length);

          if (samples.length === 0) {
            return;
          }

          if (samples.length === 1) {
            weights[0] = 1.0;
            return;
          }

          if (Vec2.strictEquals(input, Vec2.ZERO)) {
            var _iCenter = samples.findIndex(function (sample) {
              return Vec2.strictEquals(sample, Vec2.ZERO);
            });

            if (_iCenter >= 0) {
              weights[_iCenter] = 1.0;
            } else {
              weights.fill(1.0 / samples.length);
            }

            return;
          } // Finds out the sector the input point locates


          var iSectorStart = -1;
          var iSectorEnd = -1;
          var iCenter = -1;
          var lhsCosAngle = Number.NEGATIVE_INFINITY;
          var rhsCosAngle = Number.NEGATIVE_INFINITY;
          var inputX = input.x,
              inputY = input.y;

          for (var iSample = 0; iSample < samples.length; ++iSample) {
            var sample = samples[iSample];

            if (Vec2.equals(sample, Vec2.ZERO)) {
              iCenter = iSample;
              continue;
            }

            var sampleNormalized = Vec2.normalize(CACHE_NORMALIZED_SAMPLE, sample);
            var cosAngle = Vec2.dot(sampleNormalized, input);
            var sign = sampleNormalized.x * inputY - sampleNormalized.y * inputX;

            if (sign > 0) {
              if (cosAngle >= rhsCosAngle) {
                rhsCosAngle = cosAngle;
                iSectorStart = iSample;
              }
            } else if (cosAngle >= lhsCosAngle) {
              lhsCosAngle = cosAngle;
              iSectorEnd = iSample;
            }
          }

          var centerWeight = 0.0;

          if (iSectorStart < 0 || iSectorEnd < 0) {
            // Input fall at vertex.
            centerWeight = 1.0;
          } else {
            var _solveBarycentric = solveBarycentric(samples[iSectorStart], samples[iSectorEnd], input, CACHE_BARYCENTRIC_SOLUTIONS),
                wA = _solveBarycentric.wA,
                wB = _solveBarycentric.wB;

            var w1 = 0.0;
            var w2 = 0.0;
            var sum = wA + wB;

            if (sum > 1) {
              // Input fall at line C-A or C-B but not beyond C
              w1 = wA / sum;
              w2 = wB / sum;
            } else if (sum < 0) {
              // Input fall at line C-A or C-B but beyond A or B
              w1 = 0.0;
              w2 = 0.0;
              centerWeight = 1.0;
            } else {
              // Inside triangle
              w1 = wA;
              w2 = wB;
              centerWeight = 1.0 - sum;
            }

            weights[iSectorStart] = w1;
            weights[iSectorEnd] = w2;
          } // Center influence part


          if (centerWeight > 0.0) {
            if (iCenter >= 0) {
              weights[iCenter] = centerWeight;
            } else {
              var average = centerWeight / weights.length;

              for (var i = 0; i < weights.length; ++i) {
                weights[i] += average;
              }
            }
          }
        };
      }());

      /**
       * Simple directional issue representing some samples have same(or very similar) direction.
       */
      _export("SimpleDirectionalIssueSameDirection", SimpleDirectionalIssueSameDirection = function SimpleDirectionalIssueSameDirection(samples) {
        this.samples = samples;
      });

      getGradientBandCartesianCoords = function getGradientBandCartesianCoords(pI, pJ, input, pIpInput, pIpJ) {
        Vec2.subtract(pIpInput, input, pI);
        Vec2.subtract(pIpJ, pJ, pI);
      };

      getGradientBandPolarCoords = function () {
        var axis = new Vec3(0, 0, 0); // buffer for axis

        var tmpV3 = new Vec3(0, 0, 0); // buffer for temp vec3

        var pQueriedProjected = new Vec3(0, 0, 0); // buffer for pQueriedProjected

        var pi3 = new Vec3(0, 0, 0); // buffer for pi3

        var pj3 = new Vec3(0, 0, 0); // buffer for pj3

        var pQueried3 = new Vec3(0, 0, 0); // buffer for pQueried3

        return function (pI, pJ, input, pIpInput, pIpJ) {
          var aIJ = 0.0;
          var aIQ = 0.0;
          var angleMultiplier = 2.0;
          Vec3.set(pQueriedProjected, input.x, input.y, 0.0);

          if (Vec2.equals(pI, Vec2.ZERO)) {
            aIJ = Vec2.angle(input, pJ);
            aIQ = 0.0;
            angleMultiplier = 1.0;
          } else if (Vec2.equals(pJ, Vec2.ZERO)) {
            aIJ = Vec2.angle(input, pI);
            aIQ = aIJ;
            angleMultiplier = 1.0;
          } else {
            aIJ = Vec2.angle(pI, pJ);

            if (aIJ <= 0.0) {
              aIQ = 0.0;
            } else if (Vec2.equals(input, Vec2.ZERO)) {
              aIQ = aIJ;
            } else {
              Vec3.set(pi3, pI.x, pI.y, 0);
              Vec3.set(pj3, pJ.x, pJ.y, 0);
              Vec3.set(pQueried3, input.x, input.y, 0);
              Vec3.cross(axis, pi3, pj3);
              Vec3.projectOnPlane(pQueriedProjected, pQueried3, axis);
              aIQ = Vec3.angle(pi3, pQueriedProjected);

              if (aIJ < Math.PI * 0.99) {
                if (Vec3.dot(Vec3.cross(tmpV3, pi3, pQueriedProjected), axis) < 0) {
                  aIQ = -aIQ;
                }
              }
            }
          }

          var lenPI = Vec2.len(pI);
          var lenPJ = Vec2.len(pJ);
          var deno = (lenPJ + lenPI) / 2;
          Vec2.set(pIpJ, (lenPJ - lenPI) / deno, aIJ * angleMultiplier);
          Vec2.set(pIpInput, (Vec3.len(pQueriedProjected) - lenPI) / deno, aIQ * angleMultiplier);
        };
      }();
    }
  };
});
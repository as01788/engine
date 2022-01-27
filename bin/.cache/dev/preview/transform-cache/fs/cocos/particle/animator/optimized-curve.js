System.register("q-bundled:///fs/cocos/particle/animator/optimized-curve.js", ["../../core/math/index.js", "../../core/geometry/curve.js"], function (_export, _context) {
  "use strict";

  var repeat, evalOptCurve, OptimizedKey, CURVE_MODE_CONSTANT, CURVE_MODE_RANDOM_CONSTANT, CURVE_MODE_CURVE, CURVE_MODE_RANDOM_CURVE, UNIFORM_CURVE_KEY_NUM, OptimizedCurve;

  // calculate the coefficience of the first order integral of the curve
  function integrateKeyframe(coef) {
    coef[0] = coef[0] / 4;
    coef[1] = coef[1] / 3;
    coef[2] = coef[2] / 2;
    coef[3] = coef[3];
    return coef;
  } // calculate the coefficience of the second order integral of the curve


  function integrateKeyframeTwice(coef) {
    coef[0] = coef[0] / 20;
    coef[1] = coef[1] / 12;
    coef[2] = coef[2] / 6;
    coef[3] = coef[3] / 2;
    return coef;
  }

  return {
    setters: [function (_coreMathIndexJs) {
      repeat = _coreMathIndexJs.repeat;
    }, function (_coreGeometryCurveJs) {
      evalOptCurve = _coreGeometryCurveJs.evalOptCurve;
      OptimizedKey = _coreGeometryCurveJs.OptimizedKey;
    }],
    execute: function () {
      /*
       Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
       worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
       not use Cocos Creator software for developing other software or tools that's
       used for developing games. You are not granted to publish, distribute,
       sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
       */

      /**
       * @packageDocumentation
       * @hidden
       */
      CURVE_MODE_CONSTANT = 0;
      CURVE_MODE_RANDOM_CONSTANT = 1;
      CURVE_MODE_CURVE = 2;
      CURVE_MODE_RANDOM_CURVE = 3;
      UNIFORM_CURVE_KEY_NUM = 8;

      _export("OptimizedCurve", OptimizedCurve = /*#__PURE__*/function () {
        function OptimizedCurve(constructUniform) {
          if (constructUniform === void 0) {
            constructUniform = false;
          }

          this.optimizedKeys = void 0;
          this.integral = void 0;
          this.constructUniform = void 0;
          this.coefUniform = void 0;
          this.timeUniform = void 0;
          this.integralUniform = void 0;
          this.optimizedKeys = new Array(); // the i-th optimezed key stores coefficients of [i,i+1] segment in the original curve,so if the time of last key of the original key is 1,the last key won't be kept in the opt curve.

          this.integral = new Array(); // the integral of the curve between 0 and corresponding key,the i-th integral corresponds to the i+1-th key in optimizedKeys (because the integral of the first key is always zero,the first key won't be stored)

          this.constructUniform = constructUniform;
          this.coefUniform = null;
          this.timeUniform = null;
          this.integralUniform = null;
        }

        var _proto = OptimizedCurve.prototype;

        _proto.buildCurve = function buildCurve(animationCurve, multiplier) {
          if (multiplier === void 0) {
            multiplier = 1;
          }

          var keyNum = animationCurve.keyFrames.length - 1;
          var i = 0;

          if (this.optimizedKeys.length < keyNum) {
            var keyToAdd = keyNum - this.optimizedKeys.length;

            for (i = 0; i < keyToAdd; i++) {
              var optKey = new OptimizedKey();
              this.optimizedKeys.push(optKey);
            }
          } else {
            this.optimizedKeys.splice(keyNum);
          }

          if (animationCurve.keyFrames.length === 1) {
            this.optimizedKeys[0].coefficient[3] = animationCurve.keyFrames[0].value * multiplier;
            this.optimizedKeys[0].time = 0;
            this.optimizedKeys[0].endTime = 1;
          } else {
            var keyOffset = 0;

            if (animationCurve.keyFrames[0].time !== 0) {
              this.optimizedKeys.unshift(new OptimizedKey());
              this.optimizedKeys[0].time = 0;
              this.optimizedKeys[0].endTime = animationCurve.keyFrames[0].time;
              this.optimizedKeys[0].coefficient[3] = animationCurve.keyFrames[0].value;
              keyOffset = 1;
            }

            for (i = 0; i < keyNum; i++) {
              animationCurve.calcOptimizedKey(this.optimizedKeys[i + keyOffset], i, Math.min(i + 1, keyNum));
              this.optimizedKeys[i + keyOffset].index += keyOffset;
            }

            if (animationCurve.keyFrames[animationCurve.keyFrames.length - 1].time !== 1) {
              this.optimizedKeys.push(new OptimizedKey());
              this.optimizedKeys[this.optimizedKeys.length - 1].time = animationCurve.keyFrames[animationCurve.keyFrames.length - 1].time;
              this.optimizedKeys[this.optimizedKeys.length - 1].endTime = 1;
              this.optimizedKeys[this.optimizedKeys.length - 1].coefficient[3] = animationCurve.keyFrames[animationCurve.keyFrames.length - 1].value;
            }
          }

          for (i = 0; i < this.optimizedKeys.length; i++) {
            this.optimizedKeys[i].coefficient[0] *= multiplier;
            this.optimizedKeys[i].coefficient[1] *= multiplier;
            this.optimizedKeys[i].coefficient[2] *= multiplier;
            this.optimizedKeys[i].coefficient[3] *= multiplier;
          }

          if (this.constructUniform) {
            this.coefUniform = new Float32Array(UNIFORM_CURVE_KEY_NUM * 4);
            this.timeUniform = new Float32Array(UNIFORM_CURVE_KEY_NUM);
            this.updateKeyUniform();
          }
        };

        _proto.evaluate = function evaluate(time) {
          time = repeat(time, 1);

          for (var i = 1; i < this.optimizedKeys.length; i++) {
            if (time < this.optimizedKeys[i].time) {
              return this.optimizedKeys[i - 1].evaluate(time);
            }
          }

          return this.optimizedKeys[this.optimizedKeys.length - 1].evaluate(time);
        } // calculate first order integral coefficients of all keys
        ;

        _proto.integrateOnce = function integrateOnce() {
          var i = 0;

          if (this.integral.length + 1 < this.optimizedKeys.length) {
            for (i = 0; i < this.optimizedKeys.length - this.integral.length - 1; i++) {
              this.integral.push(0);
            }
          } else {
            this.integral.splice(this.optimizedKeys.length - 1);
          }

          for (i = 0; i < this.integral.length; i++) {
            integrateKeyframe(this.optimizedKeys[i].coefficient);
            var deltaT = this.optimizedKeys[i + 1].time - this.optimizedKeys[i].time;
            var prevIntegral = i === 0 ? 0 : this.integral[i - 1];
            this.integral[i] = prevIntegral + deltaT * evalOptCurve(deltaT, this.optimizedKeys[i].coefficient);
          }

          integrateKeyframe(this.optimizedKeys[this.optimizedKeys.length - 1].coefficient);

          if (this.constructUniform) {
            this.updateKeyUniform();
            this.updateIntegralUniform();
          }
        } // get the integral of the curve using calculated coefficients
        ;

        _proto.evaluateIntegral = function evaluateIntegral(t, ts) {
          if (ts === void 0) {
            ts = 1;
          }

          t = repeat(t, 1);

          for (var i = 1; i < this.optimizedKeys.length; i++) {
            if (t < this.optimizedKeys[i].time) {
              var prevInt = i === 1 ? 0 : this.integral[i - 2];

              var _dt = t - this.optimizedKeys[i - 1].time;

              return ts * (prevInt + _dt * evalOptCurve(_dt, this.optimizedKeys[i - 1].coefficient));
            }
          }

          var dt = t - this.optimizedKeys[this.optimizedKeys.length - 1].time;
          return ts * (this.integral[this.integral.length - 1] + dt * evalOptCurve(dt, this.optimizedKeys[this.optimizedKeys.length - 1].coefficient));
        } // calculate second order integral coefficients of all keys
        ;

        _proto.integrateTwice = function integrateTwice() {
          var i = 0;

          if (this.integral.length + 1 < this.optimizedKeys.length) {
            for (i = 0; i < this.optimizedKeys.length - this.integral.length - 1; i++) {
              this.integral.push(0);
            }
          } else {
            this.integral.splice(this.optimizedKeys.length - 1);
          }

          for (i = 0; i < this.integral.length; i++) {
            integrateKeyframeTwice(this.optimizedKeys[i].coefficient);
            var deltaT = this.optimizedKeys[i + 1].time - this.optimizedKeys[i].time;
            var prevIntegral = i === 0 ? 0 : this.integral[i - 1];
            this.integral[i] = prevIntegral + deltaT * deltaT * evalOptCurve(deltaT, this.optimizedKeys[i].coefficient);
          }

          integrateKeyframeTwice(this.optimizedKeys[this.optimizedKeys.length - 1].coefficient);

          if (this.constructUniform) {
            this.updateKeyUniform();
            this.updateIntegralUniform();
          }
        } // get the second order integral of the curve using calculated coefficients
        ;

        _proto.evaluateIntegralTwice = function evaluateIntegralTwice(t, ts) {
          if (ts === void 0) {
            ts = 1;
          }

          t = repeat(t, 1);

          for (var i = 1; i < this.optimizedKeys.length; i++) {
            if (t < this.optimizedKeys[i].time) {
              var prevInt = i === 1 ? 0 : this.integral[i - 2];

              var _dt2 = t - this.optimizedKeys[i - 1].time;

              return ts * ts * (prevInt + _dt2 * _dt2 * evalOptCurve(_dt2, this.optimizedKeys[i - 1].coefficient));
            }
          }

          var dt = t - this.optimizedKeys[this.optimizedKeys.length - 1].time;
          return ts * ts * (this.integral[this.integral.length - 1] + dt * dt * evalOptCurve(dt, this.optimizedKeys[this.optimizedKeys.length - 1].coefficient));
        };

        _proto.updateKeyUniform = function updateKeyUniform() {
          if (this.coefUniform != null && this.timeUniform != null) {
            for (var i = 0; i < this.optimizedKeys.length; i++) {
              this.coefUniform[i * 4] = this.optimizedKeys[i].coefficient[0];
              this.coefUniform[i * 4 + 1] = this.optimizedKeys[i].coefficient[1];
              this.coefUniform[i * 4 + 2] = this.optimizedKeys[i].coefficient[2];
              this.coefUniform[i * 4 + 3] = this.optimizedKeys[i].coefficient[3];
              this.timeUniform[i] = this.optimizedKeys[i].endTime;
            }
          }
        };

        _proto.updateIntegralUniform = function updateIntegralUniform() {
          this.integralUniform = new Float32Array(UNIFORM_CURVE_KEY_NUM - 1);

          for (var i = 0; i < this.integral.length; i++) {
            this.integralUniform[i] = this.integral[i];
          }
        };

        return OptimizedCurve;
      }());
    }
  };
});
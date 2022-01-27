System.register("q-bundled:///fs/cocos/core/animation/motion-path-helper.js", ["../algorithm/binary-search.js", "../platform/debug.js", "../math/index.js", "./animation-curve.js", "./bezier.js"], function (_export, _context) {
  "use strict";

  var binarySearch, errorID, Vec2, Vec3, AnimCurve, computeRatioByType, bezier, Curve, Bezier;

  function checkMotionPath(motionPath) {
    if (!Array.isArray(motionPath)) {
      return false;
    }

    for (var i = 0, l = motionPath.length; i < l; i++) {
      var controls = motionPath[i];

      if (!Array.isArray(controls) || controls.length !== 6) {
        return false;
      }
    }

    return true;
  }

  function sampleMotionPaths(motionPaths, data, duration, fps) {
    var createControlPoints = function createControlPoints(array) {
      if (array instanceof Vec2) {
        return {
          "in": array,
          pos: array,
          out: array
        };
      } else if (Array.isArray(array) && array.length === 6) {
        return {
          "in": new Vec2(array[2], array[3]),
          pos: new Vec2(array[0], array[1]),
          out: new Vec2(array[4], array[5])
        };
      }

      return {
        "in": Vec2.ZERO,
        pos: Vec2.ZERO,
        out: Vec2.ZERO
      };
    }; // @ts-expect-error


    var values = data.values = data.values.map(function (value) {
      if (Array.isArray(value)) {
        value = value.length === 2 ? new Vec2(value[0], value[1]) : new Vec3(value[0], value[1], value[2]);
      }

      return value;
    });

    if (motionPaths.length === 0 || values.length === 0) {
      return;
    }

    var motionPathValid = false;

    for (var i = 0; i < motionPaths.length; i++) {
      var motionPath = motionPaths[i];

      if (motionPath && !checkMotionPath(motionPath)) {
        errorID(3904, '', 'position', i);
        motionPath = undefined;
      }

      if (motionPath && motionPath.length > 0) {
        motionPathValid = true;
        break;
      }
    }

    if (!motionPathValid) {
      return;
    }

    if (values.length === 1) {
      return;
    }

    var types = data.types; // @ts-expect-error

    var ratios = data.ratioSampler ? data.ratioSampler.ratios : []; // @ts-expect-error

    var newValues = data.values = [];
    var newTypes = data.types = []; // @ts-expect-error

    var newRatios = data.ratios = [];

    function addNewDatas(value, type, ratio) {
      newValues.push(value);
      newTypes.push(type);
      newRatios.push(ratio);
    } // ensure every ratio section's length is the same


    var startRatioOffset = 0;
    var EPSILON = 1e-6;
    var newType = AnimCurve.Linear; // do not need to compute last path

    for (var _i2 = 0, l = motionPaths.length; _i2 < l - 1; _i2++) {
      var _motionPath = motionPaths[_i2];
      var ratio = ratios[_i2];
      var nextRatio = ratios[_i2 + 1];
      var betweenRatio = nextRatio - ratio;
      var value = values[_i2];
      var nextValue = values[_i2 + 1];
      var type = types && types[_i2];
      var results = [];
      var progress = startRatioOffset / betweenRatio;
      var speed = 1 / (betweenRatio * duration * fps);
      var finalProgress = void 0;

      if (_motionPath && _motionPath.length > 0) {
        var _points = [];

        _points.push(createControlPoints(value));

        for (var j = 0, l2 = _motionPath.length; j < l2; j++) {
          var controlPoints = createControlPoints(_motionPath[j]);

          _points.push(controlPoints);
        }

        _points.push(createControlPoints(nextValue)); // create Curve to compute beziers


        var curve = new Curve(_points);
        curve.computeBeziers(); // sample beziers

        var progresses = curve.progresses;

        while (1 - progress > EPSILON) {
          finalProgress = progress;
          finalProgress = computeRatioByType(finalProgress, type);
          var pos = new Vec2();

          if (finalProgress < 0) {
            var _bezier3 = curve.beziers[0];

            var length = (0 - finalProgress) * _bezier3.getLength();

            var normal = new Vec2(_bezier3.start);
            normal.subtract(_bezier3.endCtrlPoint);
            normal.normalize();
            normal.multiplyScalar(length);
            pos.set(_bezier3.start);
            pos.add(normal);
          } else if (finalProgress > 1) {
            var _bezier4 = curve.beziers[curve.beziers.length - 1];

            var _length = (finalProgress - 1) * _bezier4.getLength();

            var _normal = new Vec2(_bezier4.end);

            _normal.subtract(_bezier4.startCtrlPoint);

            _normal.normalize();

            _normal.multiplyScalar(_length);

            pos.set(_bezier4.end);
            pos.add(_normal);
          } else {
            var bezierIndex = binarySearch(progresses, finalProgress);

            if (bezierIndex < 0) {
              bezierIndex = ~bezierIndex;
            }

            finalProgress -= bezierIndex > 0 ? progresses[bezierIndex - 1] : 0;
            finalProgress = finalProgress / curve.ratios[bezierIndex];
            pos = curve.beziers[bezierIndex].getPointAt(finalProgress);
          }

          results.push(pos);
          progress += speed;
        }
      } else {
        while (1 - progress > EPSILON) {
          finalProgress = progress;
          finalProgress = computeRatioByType(finalProgress, type);
          results.push(value.lerp(nextValue, finalProgress));
          progress += speed;
        }
      }

      newType = type === 'constant' ? type : AnimCurve.Linear;

      for (var _j = 0, _l = results.length; _j < _l; _j++) {
        var newRatio = ratio + startRatioOffset + speed * _j * betweenRatio;
        addNewDatas(results[_j], newType, newRatio);
      }

      if (Math.abs(progress - 1) > EPSILON) {
        // progress > 1
        startRatioOffset = (progress - 1) * betweenRatio;
      } else {
        startRatioOffset = 0;
      }
    }

    if (ratios[ratios.length - 1] !== newRatios[newRatios.length - 1]) {
      addNewDatas(values[values.length - 1], newType, ratios[ratios.length - 1]);
    }
  }

  _export("sampleMotionPaths", sampleMotionPaths);

  return {
    setters: [function (_algorithmBinarySearchJs) {
      binarySearch = _algorithmBinarySearchJs.binarySearchEpsilon;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }, function (_mathIndexJs) {
      Vec2 = _mathIndexJs.Vec2;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_animationCurveJs) {
      AnimCurve = _animationCurveJs.AnimCurve;
      computeRatioByType = _animationCurveJs.computeRatioByType;
    }, function (_bezierJs) {
      bezier = _bezierJs.bezier;
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
      _export("Curve", Curve = /*#__PURE__*/function () {
        function Curve(points) {
          if (points === void 0) {
            points = [];
          }

          this.beziers = [];
          this.ratios = [];
          this.progresses = [];
          this.length = 0;
          this.points = points;
          this.computeBeziers();
        }

        var _proto = Curve.prototype;

        _proto.computeBeziers = function computeBeziers() {
          this.beziers.length = 0;
          this.ratios.length = 0;
          this.progresses.length = 0;
          this.length = 0;

          for (var i = 1; i < this.points.length; i++) {
            var startPoint = this.points[i - 1];
            var endPoint = this.points[i];

            var _bezier = new Bezier();

            _bezier.start = startPoint.pos;
            _bezier.startCtrlPoint = startPoint.out;
            _bezier.end = endPoint.pos;
            _bezier.endCtrlPoint = endPoint["in"];
            this.beziers.push(_bezier);
            this.length += _bezier.getLength();
          }

          var current = 0;

          for (var _i = 0; _i < this.beziers.length; _i++) {
            var _bezier2 = this.beziers[_i];
            this.ratios[_i] = _bezier2.getLength() / this.length;
            this.progresses[_i] = current = current + this.ratios[_i];
          }

          return this.beziers;
        };

        return Curve;
      }());

      _export("Bezier", Bezier = /*#__PURE__*/function () {
        function Bezier() {
          this.start = new Vec2();
          this.end = new Vec2();
          this.startCtrlPoint = new Vec2();
          this.endCtrlPoint = new Vec2();
          this.__arcLengthDivisions = void 0;
          this.cacheArcLengths = void 0;
        }

        var _proto2 = Bezier.prototype;

        /**
         * Get point at relative position in curve according to arc length
         * @param u [0 .. 1]
         */
        _proto2.getPointAt = function getPointAt(u) {
          var t = this.getUtoTmapping(u);
          return this.getPoint(t);
        }
        /**
         * Get point at time t.
         * @param t [0 .. 1]
         */
        ;

        _proto2.getPoint = function getPoint(t) {
          var x = bezier(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t);
          var y = bezier(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);
          return new Vec2(x, y);
        }
        /**
         * Get total curve arc length.
         */
        ;

        _proto2.getLength = function getLength() {
          var lengths = this.getLengths();
          return lengths[lengths.length - 1];
        }
        /**
         * Get list of cumulative segment lengths.
         */
        ;

        _proto2.getLengths = function getLengths(divisions) {
          if (!divisions) {
            divisions = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200;
          }

          if (this.cacheArcLengths && this.cacheArcLengths.length === divisions + 1) {
            // console.log( "cached", this.cacheArcLengths );
            return this.cacheArcLengths;
          }

          var cache = [];
          var current;
          var last = this.getPoint(0);
          var vector = new Vec2();
          var p;
          var sum = 0;
          cache.push(0);

          for (p = 1; p <= divisions; p++) {
            current = this.getPoint(p / divisions);
            vector.x = last.x - current.x;
            vector.y = last.y - current.y;
            sum += vector.length();
            cache.push(sum);
            last = current;
          }

          this.cacheArcLengths = cache;
          return cache; // { sums: cache, sum:sum }; Sum is in the last element.
        };

        _proto2.getUtoTmapping = function getUtoTmapping(u, distance) {
          var arcLengths = this.getLengths();
          var i = 0;
          var il = arcLengths.length;
          var targetArcLength; // The targeted u distance value to get

          if (distance) {
            targetArcLength = distance;
          } else {
            targetArcLength = u * arcLengths[il - 1];
          } // var time = Date.now();
          // binary search for the index with largest value smaller than target u distance


          var low = 0;
          var high = il - 1;
          var comparison;

          while (low <= high) {
            // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats
            i = Math.floor(low + (high - low) / 2);
            comparison = arcLengths[i] - targetArcLength;

            if (comparison < 0) {
              low = i + 1;
              continue;
            } else if (comparison > 0) {
              high = i - 1;
              continue;
            } else {
              high = i;
              break; // DONE
            }
          }

          i = high; // console.log('b' , i, low, high, Date.now()- time);

          if (arcLengths[i] === targetArcLength) {
            return i / (il - 1);
          } // we could get finer grain at lengths, or use simple interpolatation between two points


          var lengthBefore = arcLengths[i];
          var lengthAfter = arcLengths[i + 1];
          var segmentLength = lengthAfter - lengthBefore; // determine where we are between the 'before' and 'after' points

          var segmentFraction = (targetArcLength - lengthBefore) / segmentLength; // add that fractional amount to t

          var t = (i + segmentFraction) / (il - 1);
          return t;
        };

        return Bezier;
      }());
    }
  };
});
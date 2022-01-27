"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sampleMotionPaths = sampleMotionPaths;
exports.Bezier = exports.Curve = void 0;

var _binarySearch = require("../algorithm/binary-search.js");

var _debug = require("../platform/debug.js");

var _index = require("../math/index.js");

var _animationCurve = require("./animation-curve.js");

var _bezier = require("./bezier.js");

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
class Curve {
  constructor(points = []) {
    this.beziers = [];
    this.ratios = [];
    this.progresses = [];
    this.length = 0;
    this.points = points;
    this.computeBeziers();
  }

  computeBeziers() {
    this.beziers.length = 0;
    this.ratios.length = 0;
    this.progresses.length = 0;
    this.length = 0;

    for (let i = 1; i < this.points.length; i++) {
      const startPoint = this.points[i - 1];
      const endPoint = this.points[i];
      const bezier = new Bezier();
      bezier.start = startPoint.pos;
      bezier.startCtrlPoint = startPoint.out;
      bezier.end = endPoint.pos;
      bezier.endCtrlPoint = endPoint.in;
      this.beziers.push(bezier);
      this.length += bezier.getLength();
    }

    let current = 0;

    for (let i = 0; i < this.beziers.length; i++) {
      const bezier = this.beziers[i];
      this.ratios[i] = bezier.getLength() / this.length;
      this.progresses[i] = current = current + this.ratios[i];
    }

    return this.beziers;
  }

}

exports.Curve = Curve;

class Bezier {
  constructor() {
    this.start = new _index.Vec2();
    this.end = new _index.Vec2();
    this.startCtrlPoint = new _index.Vec2();
    this.endCtrlPoint = new _index.Vec2();
    this.__arcLengthDivisions = void 0;
    this.cacheArcLengths = void 0;
  }

  /**
   * Get point at relative position in curve according to arc length
   * @param u [0 .. 1]
   */
  getPointAt(u) {
    const t = this.getUtoTmapping(u);
    return this.getPoint(t);
  }
  /**
   * Get point at time t.
   * @param t [0 .. 1]
   */


  getPoint(t) {
    const x = (0, _bezier.bezier)(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t);
    const y = (0, _bezier.bezier)(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);
    return new _index.Vec2(x, y);
  }
  /**
   * Get total curve arc length.
   */


  getLength() {
    const lengths = this.getLengths();
    return lengths[lengths.length - 1];
  }
  /**
   * Get list of cumulative segment lengths.
   */


  getLengths(divisions) {
    if (!divisions) {
      divisions = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200;
    }

    if (this.cacheArcLengths && this.cacheArcLengths.length === divisions + 1) {
      // console.log( "cached", this.cacheArcLengths );
      return this.cacheArcLengths;
    }

    const cache = [];
    let current;
    let last = this.getPoint(0);
    const vector = new _index.Vec2();
    let p;
    let sum = 0;
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
  }

  getUtoTmapping(u, distance) {
    const arcLengths = this.getLengths();
    let i = 0;
    const il = arcLengths.length;
    let targetArcLength; // The targeted u distance value to get

    if (distance) {
      targetArcLength = distance;
    } else {
      targetArcLength = u * arcLengths[il - 1];
    } // var time = Date.now();
    // binary search for the index with largest value smaller than target u distance


    let low = 0;
    let high = il - 1;
    let comparison;

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


    const lengthBefore = arcLengths[i];
    const lengthAfter = arcLengths[i + 1];
    const segmentLength = lengthAfter - lengthBefore; // determine where we are between the 'before' and 'after' points

    const segmentFraction = (targetArcLength - lengthBefore) / segmentLength; // add that fractional amount to t

    const t = (i + segmentFraction) / (il - 1);
    return t;
  }

}

exports.Bezier = Bezier;

function checkMotionPath(motionPath) {
  if (!Array.isArray(motionPath)) {
    return false;
  }

  for (let i = 0, l = motionPath.length; i < l; i++) {
    const controls = motionPath[i];

    if (!Array.isArray(controls) || controls.length !== 6) {
      return false;
    }
  }

  return true;
}

function sampleMotionPaths(motionPaths, data, duration, fps) {
  const createControlPoints = array => {
    if (array instanceof _index.Vec2) {
      return {
        in: array,
        pos: array,
        out: array
      };
    } else if (Array.isArray(array) && array.length === 6) {
      return {
        in: new _index.Vec2(array[2], array[3]),
        pos: new _index.Vec2(array[0], array[1]),
        out: new _index.Vec2(array[4], array[5])
      };
    }

    return {
      in: _index.Vec2.ZERO,
      pos: _index.Vec2.ZERO,
      out: _index.Vec2.ZERO
    };
  }; // @ts-expect-error


  const values = data.values = data.values.map(value => {
    if (Array.isArray(value)) {
      value = value.length === 2 ? new _index.Vec2(value[0], value[1]) : new _index.Vec3(value[0], value[1], value[2]);
    }

    return value;
  });

  if (motionPaths.length === 0 || values.length === 0) {
    return;
  }

  let motionPathValid = false;

  for (let i = 0; i < motionPaths.length; i++) {
    let motionPath = motionPaths[i];

    if (motionPath && !checkMotionPath(motionPath)) {
      (0, _debug.errorID)(3904, '', 'position', i);
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

  const types = data.types; // @ts-expect-error

  const ratios = data.ratioSampler ? data.ratioSampler.ratios : []; // @ts-expect-error

  const newValues = data.values = [];
  const newTypes = data.types = []; // @ts-expect-error

  const newRatios = data.ratios = [];

  function addNewDatas(value, type, ratio) {
    newValues.push(value);
    newTypes.push(type);
    newRatios.push(ratio);
  } // ensure every ratio section's length is the same


  let startRatioOffset = 0;
  const EPSILON = 1e-6;
  let newType = _animationCurve.AnimCurve.Linear; // do not need to compute last path

  for (let i = 0, l = motionPaths.length; i < l - 1; i++) {
    const motionPath = motionPaths[i];
    const ratio = ratios[i];
    const nextRatio = ratios[i + 1];
    const betweenRatio = nextRatio - ratio;
    const value = values[i];
    const nextValue = values[i + 1];
    const type = types && types[i];
    const results = [];
    let progress = startRatioOffset / betweenRatio;
    const speed = 1 / (betweenRatio * duration * fps);
    let finalProgress;

    if (motionPath && motionPath.length > 0) {
      const points = [];
      points.push(createControlPoints(value));

      for (let j = 0, l2 = motionPath.length; j < l2; j++) {
        const controlPoints = createControlPoints(motionPath[j]);
        points.push(controlPoints);
      }

      points.push(createControlPoints(nextValue)); // create Curve to compute beziers

      const curve = new Curve(points);
      curve.computeBeziers(); // sample beziers

      const progresses = curve.progresses;

      while (1 - progress > EPSILON) {
        finalProgress = progress;
        finalProgress = (0, _animationCurve.computeRatioByType)(finalProgress, type);
        let pos = new _index.Vec2();

        if (finalProgress < 0) {
          const bezier = curve.beziers[0];
          const length = (0 - finalProgress) * bezier.getLength();
          const normal = new _index.Vec2(bezier.start);
          normal.subtract(bezier.endCtrlPoint);
          normal.normalize();
          normal.multiplyScalar(length);
          pos.set(bezier.start);
          pos.add(normal);
        } else if (finalProgress > 1) {
          const bezier = curve.beziers[curve.beziers.length - 1];
          const length = (finalProgress - 1) * bezier.getLength();
          const normal = new _index.Vec2(bezier.end);
          normal.subtract(bezier.startCtrlPoint);
          normal.normalize();
          normal.multiplyScalar(length);
          pos.set(bezier.end);
          pos.add(normal);
        } else {
          let bezierIndex = (0, _binarySearch.binarySearchEpsilon)(progresses, finalProgress);

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
        finalProgress = (0, _animationCurve.computeRatioByType)(finalProgress, type);
        results.push(value.lerp(nextValue, finalProgress));
        progress += speed;
      }
    }

    newType = type === 'constant' ? type : _animationCurve.AnimCurve.Linear;

    for (let j = 0, l2 = results.length; j < l2; j++) {
      const newRatio = ratio + startRatioOffset + speed * j * betweenRatio;
      addNewDatas(results[j], newType, newRatio);
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
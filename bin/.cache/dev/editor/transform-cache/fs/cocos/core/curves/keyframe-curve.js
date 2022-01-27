"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyframeCurve = void 0;

var _binarySearch = require("../algorithm/binary-search.js");

var _index = require("../data/decorators/index.js");

var _asserts = require("../data/utils/asserts.js");

var _index2 = require("../math/index.js");

let _Symbol$iterator;

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * Curve.
 */
let KeyframeCurve = (_dec = (0, _index.ccclass)('cc.KeyframeCurve'), _dec(_class = (_class2 = (_temp = (_Symbol$iterator = Symbol.iterator, class KeyframeCurve {
  constructor() {
    _initializerDefineProperty(this, "_times", _descriptor, this);

    _initializerDefineProperty(this, "_values", _descriptor2, this);
  }

  /**
   * Gets the count of keyframes.
   */
  get keyFramesCount() {
    return this._times.length;
  }
  /**
   * Gets the minimal time.
   */


  get rangeMin() {
    return this._times[0];
  }
  /**
   * Gets the maximum time.
   */


  get rangeMax() {
    return this._times[this._values.length - 1];
  }
  /**
   * Returns an iterator to keyframe pairs.
   */


  [_Symbol$iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index >= this._times.length) {
          return {
            done: true,
            value: undefined
          };
        } else {
          const value = [this._times[index], this._values[index]];
          ++index;
          return {
            done: false,
            value
          };
        }
      }
    };
  }
  /**
   * Returns an iterator to keyframe pairs.
   */


  keyframes() {
    return this;
  }

  times() {
    return this._times;
  }

  values() {
    return this._values;
  }
  /**
   * Gets the time of specified keyframe.
   * @param index Index to the keyframe.
   * @returns The keyframe 's time.
   */


  getKeyframeTime(index) {
    return this._times[index];
  }
  /**
   * Gets the value of specified keyframe.
   * @param index Index to the keyframe.
   * @returns The keyframe 's value.
   */


  getKeyframeValue(index) {
    return this._values[index];
  }
  /**
   * Adds a keyframe into this curve.
   * @param time Time of the keyframe.
   * @param value Value of the keyframe.
   * @returns The index to the new keyframe.
   */


  addKeyFrame(time, keyframeValue) {
    return this._insertNewKeyframe(time, keyframeValue);
  }
  /**
   * Removes a keyframe from this curve.
   * @param index Index to the keyframe.
   */


  removeKeyframe(index) {
    this._times.splice(index, 1);

    this._values.splice(index, 1);
  }
  /**
   * Searches for the keyframe at specified time.
   * @param time Time to search.
   * @returns Index to the keyframe or negative number if not found.
   */


  indexOfKeyframe(time) {
    return (0, _binarySearch.binarySearchEpsilon)(this._times, time);
  }
  /**
   * Updates the time of a keyframe.
   * @param index Index to the keyframe.
   * @param time New time.
   */


  updateTime(index, time) {
    const value = this._values[index];
    this.removeKeyframe(index);

    this._insertNewKeyframe(time, value);
  }
  /**
   * Assigns all keyframes.
   * @param keyframes An iterable to keyframes. The keyframes should be sorted by their time.
   */


  assignSorted(times, values) {
    if (values !== undefined) {
      (0, _asserts.assertIsTrue)(Array.isArray(times));
      this.setKeyframes(times.slice(), values.slice());
    } else {
      const keyframes = Array.from(times);
      this.setKeyframes(keyframes.map(([time]) => time), keyframes.map(([, value]) => value));
    }
  }
  /**
   * Removes all key frames.
   */


  clear() {
    this._times.length = 0;
    this._values.length = 0;
  }

  searchKeyframe(time) {
    return (0, _binarySearch.binarySearchEpsilon)(this._times, time);
  }

  setKeyframes(times, values) {
    (0, _asserts.assertIsTrue)(times.length === values.length);
    (0, _asserts.assertIsTrue)(isSorted(times));
    this._times = times;
    this._values = values;
  }

  _insertNewKeyframe(time, value) {
    const times = this._times;
    const values = this._values;
    const nFrames = times.length;
    const index = (0, _binarySearch.binarySearchEpsilon)(times, time);

    if (index >= 0) {
      return index;
    }

    const iNext = ~index;

    if (iNext === 0) {
      times.unshift(time);
      values.unshift(value);
    } else if (iNext === nFrames) {
      times.push(time);
      values.push(value);
    } else {
      (0, _asserts.assertIsTrue)(nFrames > 1);
      times.splice(iNext - 1, 0, time);
      values.splice(iNext - 1, 0, value);
    }

    return iNext;
  } // Times are always sorted and 1-1 correspond to values.


}), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_times", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_values", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.KeyframeCurve = KeyframeCurve;

function isSorted(values) {
  return values.every((value, index, array) => index === 0 || value > array[index - 1] || (0, _index2.approx)(value, array[index - 1], 1e-6));
}
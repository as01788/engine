System.register("q-bundled:///fs/cocos/core/curves/keyframe-curve.js", ["../algorithm/binary-search.js", "../data/decorators/index.js", "../data/utils/asserts.js", "../math/index.js"], function (_export, _context) {
  "use strict";

  var binarySearchEpsilon, ccclass, serializable, assertIsTrue, approx, _Symbol$iterator, _dec, _class, _class2, _descriptor, _descriptor2, _temp, KeyframeCurve;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function isSorted(values) {
    return values.every(function (value, index, array) {
      return index === 0 || value > array[index - 1] || approx(value, array[index - 1], 1e-6);
    });
  }

  return {
    setters: [function (_algorithmBinarySearchJs) {
      binarySearchEpsilon = _algorithmBinarySearchJs.binarySearchEpsilon;
    }, function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }, function (_mathIndexJs) {
      approx = _mathIndexJs.approx;
    }],
    execute: function () {
      /**
       * Curve.
       */
      _export("KeyframeCurve", KeyframeCurve = (_dec = ccclass('cc.KeyframeCurve'), _dec(_class = (_class2 = (_temp = (_Symbol$iterator = Symbol.iterator, /*#__PURE__*/function () {
        function KeyframeCurve() {
          _initializerDefineProperty(this, "_times", _descriptor, this);

          _initializerDefineProperty(this, "_values", _descriptor2, this);
        }

        var _proto = KeyframeCurve.prototype;

        /**
         * Returns an iterator to keyframe pairs.
         */
        _proto[_Symbol$iterator] = function () {
          var _this = this;

          var index = 0;
          return {
            next: function next() {
              if (index >= _this._times.length) {
                return {
                  done: true,
                  value: undefined
                };
              } else {
                var value = [_this._times[index], _this._values[index]];
                ++index;
                return {
                  done: false,
                  value: value
                };
              }
            }
          };
        }
        /**
         * Returns an iterator to keyframe pairs.
         */
        ;

        _proto.keyframes = function keyframes() {
          return this;
        };

        _proto.times = function times() {
          return this._times;
        };

        _proto.values = function values() {
          return this._values;
        }
        /**
         * Gets the time of specified keyframe.
         * @param index Index to the keyframe.
         * @returns The keyframe 's time.
         */
        ;

        _proto.getKeyframeTime = function getKeyframeTime(index) {
          return this._times[index];
        }
        /**
         * Gets the value of specified keyframe.
         * @param index Index to the keyframe.
         * @returns The keyframe 's value.
         */
        ;

        _proto.getKeyframeValue = function getKeyframeValue(index) {
          return this._values[index];
        }
        /**
         * Adds a keyframe into this curve.
         * @param time Time of the keyframe.
         * @param value Value of the keyframe.
         * @returns The index to the new keyframe.
         */
        ;

        _proto.addKeyFrame = function addKeyFrame(time, keyframeValue) {
          return this._insertNewKeyframe(time, keyframeValue);
        }
        /**
         * Removes a keyframe from this curve.
         * @param index Index to the keyframe.
         */
        ;

        _proto.removeKeyframe = function removeKeyframe(index) {
          this._times.splice(index, 1);

          this._values.splice(index, 1);
        }
        /**
         * Searches for the keyframe at specified time.
         * @param time Time to search.
         * @returns Index to the keyframe or negative number if not found.
         */
        ;

        _proto.indexOfKeyframe = function indexOfKeyframe(time) {
          return binarySearchEpsilon(this._times, time);
        }
        /**
         * Updates the time of a keyframe.
         * @param index Index to the keyframe.
         * @param time New time.
         */
        ;

        _proto.updateTime = function updateTime(index, time) {
          var value = this._values[index];
          this.removeKeyframe(index);

          this._insertNewKeyframe(time, value);
        }
        /**
         * Assigns all keyframes.
         * @param keyframes An iterable to keyframes. The keyframes should be sorted by their time.
         */
        ;

        _proto.assignSorted = function assignSorted(times, values) {
          if (values !== undefined) {
            assertIsTrue(Array.isArray(times));
            this.setKeyframes(times.slice(), values.slice());
          } else {
            var _keyframes = Array.from(times);

            this.setKeyframes(_keyframes.map(function (_ref) {
              var time = _ref[0];
              return time;
            }), _keyframes.map(function (_ref2) {
              var value = _ref2[1];
              return value;
            }));
          }
        }
        /**
         * Removes all key frames.
         */
        ;

        _proto.clear = function clear() {
          this._times.length = 0;
          this._values.length = 0;
        };

        _proto.searchKeyframe = function searchKeyframe(time) {
          return binarySearchEpsilon(this._times, time);
        };

        _proto.setKeyframes = function setKeyframes(times, values) {
          assertIsTrue(times.length === values.length);
          assertIsTrue(isSorted(times));
          this._times = times;
          this._values = values;
        };

        _proto._insertNewKeyframe = function _insertNewKeyframe(time, value) {
          var times = this._times;
          var values = this._values;
          var nFrames = times.length;
          var index = binarySearchEpsilon(times, time);

          if (index >= 0) {
            return index;
          }

          var iNext = ~index;

          if (iNext === 0) {
            times.unshift(time);
            values.unshift(value);
          } else if (iNext === nFrames) {
            times.push(time);
            values.push(value);
          } else {
            assertIsTrue(nFrames > 1);
            times.splice(iNext - 1, 0, time);
            values.splice(iNext - 1, 0, value);
          }

          return iNext;
        } // Times are always sorted and 1-1 correspond to values.
        ;

        _createClass(KeyframeCurve, [{
          key: "keyFramesCount",
          get:
          /**
           * Gets the count of keyframes.
           */
          function get() {
            return this._times.length;
          }
          /**
           * Gets the minimal time.
           */

        }, {
          key: "rangeMin",
          get: function get() {
            return this._times[0];
          }
          /**
           * Gets the maximum time.
           */

        }, {
          key: "rangeMax",
          get: function get() {
            return this._times[this._values.length - 1];
          }
        }]);

        return KeyframeCurve;
      }()), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_times", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_values", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
    }
  };
});
System.register("q-bundled:///fs/cocos/core/curves/quat-curve.js", ["../data/utils/asserts.js", "../math/index.js", "./keyframe-curve.js", "./curve.js", "../algorithm/binary-search.js", "../data/decorators/index.js", "../data/index.js", "./easing-method.js", "../animation/bezier.js"], function (_export, _context) {
  "use strict";

  var assertIsTrue, pingPong, Quat, repeat, KeyframeCurve, EasingMethod, ExtrapolationMode, binarySearchEpsilon, ccclass, serializable, uniquelyReferenced, deserializeTag, serializeTag, getEasingFn, bezierByTime, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _dec2, _class4, _class5, _descriptor4, _descriptor5, _temp3, QuatInterpolationMode, QuatKeyframeValue, QuatCurve, KeyframeValueFlagMask, FLAGS_BYTES, FRAME_COUNT_BYTES, TIME_BYTES, VALUE_BYTES, INTERPOLATION_MODE_BYTES, EASING_METHOD_BYTES, EASING_METHOD_BEZIER_TAG, EASING_METHOD_BEZIER_COMPONENT_BYTES;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function createQuatKeyframeValue(params) {
    return new QuatKeyframeValue(params);
  }
  /**
   * Quaternion curve.
   */


  _export("QuatInterpolationMode", void 0);

  return {
    setters: [function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }, function (_mathIndexJs) {
      pingPong = _mathIndexJs.pingPong;
      Quat = _mathIndexJs.Quat;
      repeat = _mathIndexJs.repeat;
    }, function (_keyframeCurveJs) {
      KeyframeCurve = _keyframeCurveJs.KeyframeCurve;
    }, function (_curveJs) {
      EasingMethod = _curveJs.EasingMethod;
      ExtrapolationMode = _curveJs.ExtrapolationMode;
    }, function (_algorithmBinarySearchJs) {
      binarySearchEpsilon = _algorithmBinarySearchJs.binarySearchEpsilon;
    }, function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
      uniquelyReferenced = _dataDecoratorsIndexJs.uniquelyReferenced;
    }, function (_dataIndexJs) {
      deserializeTag = _dataIndexJs.deserializeTag;
      serializeTag = _dataIndexJs.serializeTag;
    }, function (_easingMethodJs) {
      getEasingFn = _easingMethodJs.getEasingFn;
    }, function (_animationBezierJs) {
      bezierByTime = _animationBezierJs.bezierByTime;
    }],
    execute: function () {
      (function (QuatInterpolationMode) {
        QuatInterpolationMode[QuatInterpolationMode["SLERP"] = 0] = "SLERP";
        QuatInterpolationMode[QuatInterpolationMode["CONSTANT"] = 1] = "CONSTANT";
      })(QuatInterpolationMode || _export("QuatInterpolationMode", QuatInterpolationMode = {}));

      /**
       * View to a quaternion frame value.
       * Note, the view may be invalidated due to keyframe change/add/remove.
       */
      QuatKeyframeValue = (_dec = ccclass('cc.QuatKeyframeValue'), _dec(_class = uniquelyReferenced(_class = (_class2 = (_temp =
      /**
       * Interpolation method used for this keyframe.
       */

      /**
        * Value of the keyframe.
        */

      /**
       * @deprecated Reserved for backward compatibility. Will be removed in future.
       */
      function QuatKeyframeValue(_temp2) {
        var _ref = _temp2 === void 0 ? {} : _temp2,
            value = _ref.value,
            interpolationMode = _ref.interpolationMode,
            easingMethod = _ref.easingMethod;

        _initializerDefineProperty(this, "interpolationMode", _descriptor, this);

        _initializerDefineProperty(this, "value", _descriptor2, this);

        _initializerDefineProperty(this, "easingMethod", _descriptor3, this);

        // TODO: shall we normalize it?
        this.value = value ? Quat.clone(value) : this.value;
        this.interpolationMode = interpolationMode !== null && interpolationMode !== void 0 ? interpolationMode : this.interpolationMode;
        this.easingMethod = easingMethod !== null && easingMethod !== void 0 ? easingMethod : this.easingMethod;
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "interpolationMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return QuatInterpolationMode.SLERP;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Quat.clone(Quat.IDENTITY);
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "easingMethod", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EasingMethod.LINEAR;
        }
      })), _class2)) || _class) || _class);

      _export("QuatCurve", QuatCurve = (_dec2 = ccclass('cc.QuatCurve'), _dec2(_class4 = (_class5 = (_temp3 = /*#__PURE__*/function (_KeyframeCurve) {
        _inheritsLoose(QuatCurve, _KeyframeCurve);

        function QuatCurve() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _KeyframeCurve.call.apply(_KeyframeCurve, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "preExtrapolation", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "postExtrapolation", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = QuatCurve.prototype;

        /**
         * Evaluates this curve at specified time.
         * @param time Input time.
         * @returns Result value.
         */
        _proto.evaluate = function evaluate(time, quat) {
          var _quat;

          (_quat = quat) !== null && _quat !== void 0 ? _quat : quat = new Quat();
          var times = this._times,
              values = this._values,
              postExtrapolation = this.postExtrapolation,
              preExtrapolation = this.preExtrapolation;
          var nFrames = times.length;

          if (nFrames === 0) {
            return quat;
          }

          var firstTime = times[0];
          var lastTime = times[nFrames - 1];

          if (time < firstTime) {
            // Underflow
            var _preValue = values[0];

            switch (preExtrapolation) {
              case ExtrapolationMode.LOOP:
                time = firstTime + repeat(time - firstTime, lastTime - firstTime);
                break;

              case ExtrapolationMode.PING_PONG:
                time = firstTime + pingPong(time - firstTime, lastTime - firstTime);
                break;

              case ExtrapolationMode.CLAMP:
              default:
                return Quat.copy(quat, _preValue.value);
            }
          } else if (time > lastTime) {
            // Overflow
            var _preValue2 = values[nFrames - 1];

            switch (postExtrapolation) {
              case ExtrapolationMode.LOOP:
                time = firstTime + repeat(time - firstTime, lastTime - firstTime);
                break;

              case ExtrapolationMode.PING_PONG:
                time = firstTime + pingPong(time - firstTime, lastTime - firstTime);
                break;

              case ExtrapolationMode.CLAMP:
              default:
                return Quat.copy(quat, _preValue2.value);
            }
          }

          var index = binarySearchEpsilon(times, time);

          if (index >= 0) {
            return Quat.copy(quat, values[index].value);
          }

          var iNext = ~index;
          assertIsTrue(iNext !== 0 && iNext !== nFrames && nFrames > 1);
          var iPre = iNext - 1;
          var preTime = times[iPre];
          var preValue = values[iPre];
          var nextTime = times[iNext];
          var nextValue = values[iNext];
          assertIsTrue(nextTime > time && time > preTime);
          var dt = nextTime - preTime;
          var ratio = (time - preTime) / dt;

          switch (preValue.interpolationMode) {
            default:
            case QuatInterpolationMode.CONSTANT:
              return Quat.copy(quat, preValue.value);

            case QuatInterpolationMode.SLERP:
              {
                var easingMethod = preValue.easingMethod;
                var transformedRatio = easingMethod === EasingMethod.LINEAR ? ratio : Array.isArray(easingMethod) ? bezierByTime(easingMethod, ratio) : getEasingFn(easingMethod)(ratio);
                return Quat.slerp(quat, preValue.value, nextValue.value, transformedRatio);
              }
          }
        }
        /**
         * Adds a keyframe into this curve.
         * @param time Time of the keyframe.
         * @param value Value of the keyframe.
         * @returns The index to the new keyframe.
         */
        ;

        _proto.addKeyFrame = function addKeyFrame(time, value) {
          var keyframeValue = new QuatKeyframeValue(value);
          return _KeyframeCurve.prototype.addKeyFrame.call(this, time, keyframeValue);
        }
        /**
         * Assigns all keyframes.
         * @param keyframes An iterable to keyframes. The keyframes should be sorted by their time.
         */
        ;

        _proto.assignSorted = function assignSorted(times, values) {
          if (values !== undefined) {
            assertIsTrue(Array.isArray(times));
            this.setKeyframes(times.slice(), values.map(function (value) {
              return createQuatKeyframeValue(value);
            }));
          } else {
            var _keyframes = Array.from(times);

            this.setKeyframes(_keyframes.map(function (_ref2) {
              var time = _ref2[0];
              return time;
            }), _keyframes.map(function (_ref3) {
              var value = _ref3[1];
              return createQuatKeyframeValue(value);
            }));
          }
        };

        _proto[serializeTag] = function (output, context) {
          if (!context.toCCON) {
            output.writeThis();
            return;
          }

          var times = this._times,
              keyframeValues = this._values;
          var interpolationModeRepeated = true;
          keyframeValues.forEach(function (keyframeValue, _index, _ref4) {
            var firstKeyframeValue = _ref4[0];

            // Values are unlikely to be unified.
            if (interpolationModeRepeated && keyframeValue.interpolationMode !== firstKeyframeValue.interpolationMode) {
              interpolationModeRepeated = false;
            }
          });
          var nKeyframes = times.length;
          var nFrames = nKeyframes;
          var interpolationModesSize = INTERPOLATION_MODE_BYTES * (interpolationModeRepeated ? 1 : nFrames);
          var easingMethodsSize = keyframeValues.reduce(function (result, _ref5) {
            var easingMethod = _ref5.easingMethod;
            return result += Array.isArray(easingMethod) ? EASING_METHOD_BYTES + EASING_METHOD_BEZIER_COMPONENT_BYTES * 4 : EASING_METHOD_BYTES;
          }, 0);
          var dataSize = 0;
          dataSize += FLAGS_BYTES + FRAME_COUNT_BYTES + TIME_BYTES * nFrames + VALUE_BYTES * 4 * nFrames + easingMethodsSize + interpolationModesSize + 0;
          var dataView = new DataView(new ArrayBuffer(dataSize));
          var P = 0; // Flags

          var flags = 0;

          if (interpolationModeRepeated) {
            flags |= KeyframeValueFlagMask.INTERPOLATION_MODE;
          }

          dataView.setUint32(P, flags, true);
          P += FLAGS_BYTES; // Frame count

          dataView.setUint32(P, nFrames, true);
          P += FRAME_COUNT_BYTES; // Times

          times.forEach(function (time, index) {
            return dataView.setFloat32(P + TIME_BYTES * index, time, true);
          });
          P += TIME_BYTES * nFrames; // Values

          keyframeValues.forEach(function (_ref6, index) {
            var _ref6$value = _ref6.value,
                x = _ref6$value.x,
                y = _ref6$value.y,
                z = _ref6$value.z,
                w = _ref6$value.w;
            var pQuat = P + VALUE_BYTES * 4 * index;
            dataView.setFloat32(pQuat + VALUE_BYTES * 0, x, true);
            dataView.setFloat32(pQuat + VALUE_BYTES * 1, y, true);
            dataView.setFloat32(pQuat + VALUE_BYTES * 2, z, true);
            dataView.setFloat32(pQuat + VALUE_BYTES * 3, w, true);
          });
          P += VALUE_BYTES * 4 * nFrames; // Easing methods

          keyframeValues.forEach(function (_ref7, index) {
            var easingMethod = _ref7.easingMethod;

            if (!Array.isArray(easingMethod)) {
              dataView.setUint8(P, easingMethod);
              ++P;
            } else {
              dataView.setUint8(P, EASING_METHOD_BEZIER_TAG);
              ++P;
              dataView.setFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 0, easingMethod[0], true);
              dataView.setFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 1, easingMethod[1], true);
              dataView.setFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 2, easingMethod[2], true);
              dataView.setFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 3, easingMethod[3], true);
              P += EASING_METHOD_BEZIER_COMPONENT_BYTES * 4;
            }
          }); // Frame values

          var INTERPOLATION_MODES_START = P;
          P += interpolationModesSize;
          var pInterpolationMode = INTERPOLATION_MODES_START;
          keyframeValues.forEach(function (_ref8) {
            var interpolationMode = _ref8.interpolationMode;
            dataView.setUint8(pInterpolationMode, interpolationMode);

            if (!interpolationModeRepeated) {
              pInterpolationMode += INTERPOLATION_MODE_BYTES;
            }
          });
          var bytes = new Uint8Array(dataView.buffer);
          output.writeProperty('bytes', bytes);
        };

        _proto[deserializeTag] = function (input, context) {
          if (!context.fromCCON) {
            input.readThis();
            return;
          }

          var bytes = input.readProperty('bytes');
          var dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
          var P = 0; // Flags

          var flags = dataView.getUint32(P, true);
          P += FLAGS_BYTES;
          var interpolationModeRepeated = flags & KeyframeValueFlagMask.INTERPOLATION_MODE; // Frame count

          var nFrames = dataView.getUint32(P, true);
          P += FRAME_COUNT_BYTES; // Times

          var times = Array.from({
            length: nFrames
          }, function (_, index) {
            return dataView.getFloat32(P + TIME_BYTES * index, true);
          });
          P += TIME_BYTES * nFrames; // Frame values

          var P_VALUES = P;
          P += VALUE_BYTES * 4 * nFrames;
          var keyframeValues = Array.from({
            length: nFrames
          }, function (_, index) {
            var pQuat = P_VALUES + VALUE_BYTES * 4 * index;
            var x = dataView.getFloat32(pQuat + VALUE_BYTES * 0, true);
            var y = dataView.getFloat32(pQuat + VALUE_BYTES * 1, true);
            var z = dataView.getFloat32(pQuat + VALUE_BYTES * 2, true);
            var w = dataView.getFloat32(pQuat + VALUE_BYTES * 3, true);
            var easingMethod = dataView.getUint8(P);
            ++P;
            var keyframeValue = createQuatKeyframeValue({
              value: {
                x: x,
                y: y,
                z: z,
                w: w
              }
            });

            if (easingMethod !== EASING_METHOD_BEZIER_TAG) {
              keyframeValue.easingMethod = easingMethod;
            } else {
              keyframeValue.easingMethod = [dataView.getFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 0, true), dataView.getFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 1, true), dataView.getFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 2, true), dataView.getFloat32(P + EASING_METHOD_BEZIER_COMPONENT_BYTES * 3, true)];
              P += EASING_METHOD_BEZIER_COMPONENT_BYTES * 4;
            }

            return keyframeValue;
          });

          if (interpolationModeRepeated) {
            var interpolationMode = dataView.getUint8(P);
            ++P;

            for (var iKeyframe = 0; iKeyframe < nFrames; ++iKeyframe) {
              keyframeValues[iKeyframe].interpolationMode = interpolationMode;
            }
          } else {
            for (var _iKeyframe = 0; _iKeyframe < nFrames; ++_iKeyframe) {
              var _interpolationMode = dataView.getUint8(P + _iKeyframe);

              keyframeValues[_iKeyframe].interpolationMode = _interpolationMode;
            }

            P += nFrames;
          }

          this._times = times;
          this._values = keyframeValues;
        };

        return QuatCurve;
      }(KeyframeCurve), _temp3), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "preExtrapolation", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ExtrapolationMode.CLAMP;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "postExtrapolation", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ExtrapolationMode.CLAMP;
        }
      })), _class5)) || _class4));

      (function (KeyframeValueFlagMask) {
        KeyframeValueFlagMask[KeyframeValueFlagMask["INTERPOLATION_MODE"] = 1] = "INTERPOLATION_MODE";
      })(KeyframeValueFlagMask || (KeyframeValueFlagMask = {}));

      FLAGS_BYTES = 1;
      FRAME_COUNT_BYTES = 4;
      TIME_BYTES = 4;
      VALUE_BYTES = 4;
      INTERPOLATION_MODE_BYTES = 1;
      EASING_METHOD_BYTES = 1;
      EASING_METHOD_BEZIER_TAG = 255;
      EASING_METHOD_BEZIER_COMPONENT_BYTES = 4;
    }
  };
});
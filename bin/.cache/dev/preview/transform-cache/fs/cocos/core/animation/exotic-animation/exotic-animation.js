System.register("q-bundled:///fs/cocos/core/animation/exotic-animation/exotic-animation.js", ["../../../../../virtual/internal%253Aconstants.js", "../../algorithm/binary-search.js", "../../data/decorators/index.js", "../../data/utils/asserts.js", "../../math/index.js", "../define.js", "../tracks/track.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, binarySearchEpsilon, ccclass, serializable, assertIsTrue, clamp, lerp, Quat, Vec3, CLASS_NAME_PREFIX_ANIM, TrackBinding, TrackPath, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp2, _dec3, _class7, _class8, _descriptor6, _descriptor7, _temp3, _dec4, _class10, _dec5, _class11, _dec6, _class12, _class13, _descriptor8, _descriptor9, _temp4, _dec7, _class15, _class16, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp5, SPLIT_METHOD_ENABLED, ExoticAnimation, ExoticNodeAnimation, ExoticVectorLikeTrackValues, ExoticVec3TrackValues, ExoticQuatTrackValues, ExoticTrack, SplitInfo, ExoticTrsAnimationEvaluator, ExoticNodeAnimationEvaluator, ExoticTrackEvaluator, QUANTIZATION_TYPE_TO_ARRAY_VIEW_CONSTRUCTOR_MAP, FloatPrecision, QuantizedFloatArray;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function throwIfSplitMethodIsNotValid() {
    // TODO: better handling
    throw new Error("split() only valid in Editor.");
  }
  /**
   * Animation that:
   * - does not exposed by users;
   * - does not compatible with regular animation;
   * - non-editable;
   * - currently only generated imported from model file.
   */


  function floatToHashString(value) {
    // Note: referenced to `Skeleton.prototype.hash`
    return value.toPrecision(2);
  }

  function floatArrayToHashString(values) {
    // @ts-expect-error Complex typing
    return values.map(floatToHashString).join(' ');
  }

  function splitVec3Track(track, from, to, splitInfoCache) {
    var _split = split(track.times, track.values, from, to, 3, Vec3, splitInfoCache),
        times = _split.times,
        values = _split.values;

    var vec3Values = ExoticVec3TrackValues.imitate(values, track.values);
    return new ExoticTrack(times, vec3Values);
  }

  function splitQuatTrack(track, from, to, splitInfoCache) {
    var _split2 = split(track.times, track.values, from, to, 4, Quat, splitInfoCache),
        times = _split2.times,
        values = _split2.values;

    var quatValues = ExoticQuatTrackValues.imitate(values, track.values);
    return new ExoticTrack(times, quatValues);
  }

  function split(times, values, from, to, components, ValueConstructor, splitInfoCache) {
    var TimeArrayConstructor = getFloatArrayConstructorWithPrecision(getFloatArrayPrecision(times));
    var ValueArrayConstructor = getFloatArrayConstructorWithPrecision(values.precision);
    var splitInfo = splitInfoCache;
    splitInfo.calculate(times, from, to);
    var preLerpIndex = splitInfo.preLerpIndex,
        preLerpRatio = splitInfo.preLerpRatio,
        directKeyframesBegin = splitInfo.directKeyframesBegin,
        directKeyframesEnd = splitInfo.directKeyframesEnd,
        postLerpIndex = splitInfo.postLerpIndex,
        postLerpRatio = splitInfo.postLerpRatio;
    var nNewKeyframes = splitInfo.keyframesCount;

    if (nNewKeyframes === 0) {
      return {
        times: new TimeArrayConstructor(0),
        values: new ValueArrayConstructor(0)
      };
    }

    var prevValue = new ValueConstructor();
    var nextValue = new ValueConstructor();
    var resultValue = new ValueConstructor();
    var newTimes = new TimeArrayConstructor(nNewKeyframes);
    var newValues = new ValueArrayConstructor(components * nNewKeyframes);

    var doLerp = function doLerp(index, ratio, outputIndex) {
      assertIsTrue(index < times.length - 1);
      var iPrevious = index;
      var iNext = index + 1;
      values.lerp(iPrevious, iNext, ratio, prevValue, nextValue, resultValue);
      newTimes[outputIndex] = splitInfo.transformTime(lerp(times[iPrevious], times[iNext], ratio));
      ValueConstructor.toArray(newValues, resultValue, components * outputIndex);
    };

    var iKeyframe = 0;

    if (preLerpIndex >= 0) {
      doLerp(preLerpIndex, preLerpRatio, iKeyframe);
      ++iKeyframe;
    }

    for (var _index = directKeyframesBegin; _index < directKeyframesEnd; ++_index, ++iKeyframe) {
      values.get(_index, resultValue);
      newTimes[iKeyframe] = splitInfo.transformTime(times[_index]);
      ValueConstructor.toArray(newValues, resultValue, components * iKeyframe);
    }

    if (postLerpIndex >= 0) {
      doLerp(postLerpIndex, postLerpRatio, iKeyframe);
      ++iKeyframe;
    }

    assertIsTrue(iKeyframe === nNewKeyframes);
    return {
      times: newTimes,
      values: newValues
    };
  }

  function searchRange(values, from, to) {
    var nValues = values.length;
    assertIsTrue(nValues !== 0);
    assertIsTrue(to >= from && from >= values[0] && to <= values[nValues - 1]);

    var _binarySearchRatio = binarySearchRatio(values, from),
        fromIndex = _binarySearchRatio.index,
        fromRatio = _binarySearchRatio.ratio;

    var _binarySearchRatio2 = binarySearchRatio(values, to),
        toIndex = _binarySearchRatio2.index,
        toRatio = _binarySearchRatio2.ratio;

    return {
      fromIndex: fromIndex,
      fromRatio: fromRatio,
      toIndex: toIndex,
      toRatio: toRatio
    };
  }

  function binarySearchRatio(values, value) {
    var nValues = values.length;
    assertIsTrue(values.length !== 0);
    var resultIndex = 0;
    var resultRatio = 0.0;
    var index0 = binarySearchEpsilon(values, value);

    if (index0 >= 0) {
      resultIndex = index0;
    } else {
      var iNext = ~index0;
      assertIsTrue(iNext !== 0 && iNext !== nValues && nValues > 1);
      var iPrev = iNext - 1;
      resultIndex = iPrev;
      var next = values[iNext];
      var prev = values[iPrev];
      resultRatio = (value - prev) / (next - prev);
    }

    return {
      index: resultIndex,
      ratio: resultRatio
    };
  }

  function sampleInput(values, time, result) {
    var nFrames = values.length;
    assertIsTrue(nFrames !== 0);
    var firstTime = values[0];
    var lastTime = values[nFrames - 1];

    if (time < firstTime) {
      result.just = true;
      result.index = 0;
    } else if (time > lastTime) {
      result.just = true;
      result.index = nFrames - 1;
    } else {
      var _index2 = binarySearchEpsilon(values, time);

      if (_index2 >= 0) {
        result.just = true;
        result.index = _index2;
      } else {
        var _nextIndex = ~_index2;

        assertIsTrue(_nextIndex !== 0 && _nextIndex !== nFrames && nFrames > 1);

        var _prevIndex = _nextIndex - 1;

        var prevTime = values[_prevIndex];
        var nextTime = values[_nextIndex];

        var _ratio = (time - values[_prevIndex]) / (nextTime - prevTime);

        result.just = false;
        result.index = _prevIndex;
        result.nextIndex = _nextIndex;
        result.ratio = _ratio;
      }
    }

    return result;
  }

  function getFloatArrayPrecision(array) {
    switch (array.BYTES_PER_ELEMENT) {
      default:
        assertIsTrue(false);
      // fallthrough

      case 4:
        return FloatPrecision.FLOAT_32;

      case 8:
        return FloatPrecision.FLOAT_64;
    }
  }

  function getFloatArrayConstructorWithPrecision(precision) {
    switch (precision) {
      default:
        assertIsTrue(false);
      // fallthrough

      case FloatPrecision.FLOAT_32:
        return Float32Array;

      case FloatPrecision.FLOAT_64:
        return Float64Array;
    }
  }

  function _quantize(values, type) {
    var TypedArrayViewConstructor = QUANTIZATION_TYPE_TO_ARRAY_VIEW_CONSTRUCTOR_MAP[type];
    var MAX = 1 << TypedArrayViewConstructor.BYTES_PER_ELEMENT;
    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;
    values.forEach(function (value) {
      min = Math.min(value, min);
      max = Math.max(value, max);
    });
    var extent = max - min; // Should consider `extent === 0.0`.

    var normalized = TypedArrayViewConstructor.from(values, function (value) {
      return (value - min) / extent * MAX;
    });
    return new QuantizedFloatArray(getFloatArrayPrecision(values), normalized, extent, min);
  }

  function indexQuantized(quantized, index) {
    var quantizedValue = quantized.values[index];
    var MAX_VALUE = 1 << quantized.values.BYTES_PER_ELEMENT;
    return quantizedValue / MAX_VALUE * quantized.extent + quantized.min;
  }

  function createExoticTrackEvaluationRecord(times, values, ValueConstructor, path, property, binder) {
    var trackBinding = new TrackBinding();
    trackBinding.path = new TrackPath().toHierarchy(path).toProperty(property);
    var runtimeBinding = binder(trackBinding);

    if (!runtimeBinding) {
      return null;
    }

    var evaluator = new ExoticTrackEvaluator(times, values, ValueConstructor);
    return {
      runtimeBinding: runtimeBinding,
      evaluator: evaluator
    };
  }

  function loadVec3FromQuantized(values, index, out) {
    Vec3.set(out, indexQuantized(values, 3 * index + 0), indexQuantized(values, 3 * index + 1), indexQuantized(values, 3 * index + 2));
  }

  function loadQuatFromQuantized(values, index, out) {
    Quat.set(out, indexQuantized(values, 4 * index + 0), indexQuantized(values, 4 * index + 1), indexQuantized(values, 4 * index + 2), indexQuantized(values, 4 * index + 3));
  }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_algorithmBinarySearchJs) {
      binarySearchEpsilon = _algorithmBinarySearchJs.binarySearchEpsilon;
    }, function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }, function (_mathIndexJs) {
      clamp = _mathIndexJs.clamp;
      lerp = _mathIndexJs.lerp;
      Quat = _mathIndexJs.Quat;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_tracksTrackJs) {
      TrackBinding = _tracksTrackJs.TrackBinding;
      TrackPath = _tracksTrackJs.TrackPath;
    }],
    execute: function () {
      SPLIT_METHOD_ENABLED = TEST || EDITOR;

      _export("ExoticAnimation", ExoticAnimation = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticAnimation"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function ExoticAnimation() {
          _initializerDefineProperty(this, "_nodeAnimations", _descriptor, this);
        }

        var _proto = ExoticAnimation.prototype;

        _proto.createEvaluator = function createEvaluator(binder) {
          return new ExoticTrsAnimationEvaluator(this._nodeAnimations, binder);
        };

        _proto.addNodeAnimation = function addNodeAnimation(path) {
          var nodeAnimation = new ExoticNodeAnimation(path);

          this._nodeAnimations.push(nodeAnimation);

          return nodeAnimation;
        };

        _proto.collectAnimatedJoints = function collectAnimatedJoints() {
          return Array.from(new Set(this._nodeAnimations.map(function (_ref) {
            var path = _ref.path;
            return path;
          })));
        };

        _proto.split = function split(from, to) {
          if (!SPLIT_METHOD_ENABLED) {
            return throwIfSplitMethodIsNotValid();
          }

          var splitInfoCache = new SplitInfo();
          var newAnimation = new ExoticAnimation();
          newAnimation._nodeAnimations = this._nodeAnimations.map(function (nodeAnimation) {
            return nodeAnimation.split(from, to, splitInfoCache);
          });
          return newAnimation;
        }
        /**
         * @internal
         */
        ;

        _proto.toHashString = function toHashString() {
          return this._nodeAnimations.map(function (nodeAnimation) {
            return nodeAnimation.toHashString();
          }).join('\n');
        };

        return ExoticAnimation;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_nodeAnimations", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      ExoticNodeAnimation = (_dec2 = ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticNodeAnimation"), _dec2(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function () {
        function ExoticNodeAnimation(path) {
          _initializerDefineProperty(this, "_path", _descriptor2, this);

          _initializerDefineProperty(this, "_position", _descriptor3, this);

          _initializerDefineProperty(this, "_rotation", _descriptor4, this);

          _initializerDefineProperty(this, "_scale", _descriptor5, this);

          this._path = path;
        }

        var _proto2 = ExoticNodeAnimation.prototype;

        _proto2.createPosition = function createPosition(times, values) {
          this._position = new ExoticTrack(times, new ExoticVec3TrackValues(values));
        };

        _proto2.createRotation = function createRotation(times, values) {
          this._rotation = new ExoticTrack(times, new ExoticQuatTrackValues(values));
        };

        _proto2.createScale = function createScale(times, values) {
          this._scale = new ExoticTrack(times, new ExoticVec3TrackValues(values));
        };

        _proto2.createEvaluator = function createEvaluator(binder) {
          return new ExoticNodeAnimationEvaluator(this._path, this._position, this._rotation, this._scale, binder);
        };

        _proto2.split = function split(from, to, splitInfoCache) {
          if (!SPLIT_METHOD_ENABLED) {
            return throwIfSplitMethodIsNotValid();
          }

          var newAnimation = new ExoticNodeAnimation(this._path);
          var position = this._position,
              rotation = this._rotation,
              scale = this._scale;

          if (position) {
            newAnimation._position = splitVec3Track(position, from, to, splitInfoCache);
          }

          if (rotation) {
            newAnimation._rotation = splitQuatTrack(rotation, from, to, splitInfoCache);
          }

          if (scale) {
            newAnimation._scale = splitVec3Track(scale, from, to, splitInfoCache);
          }

          return newAnimation;
        };

        /**
         * @internal
         */
        _proto2.toHashString = function toHashString() {
          var _this$_position$toHas, _this$_position, _this$_scale$toHashSt, _this$_scale, _this$_rotation$toHas, _this$_rotation;

          return this._path + "\n" + ((_this$_position$toHas = (_this$_position = this._position) === null || _this$_position === void 0 ? void 0 : _this$_position.toHashString()) !== null && _this$_position$toHas !== void 0 ? _this$_position$toHas : '') + ((_this$_scale$toHashSt = (_this$_scale = this._scale) === null || _this$_scale === void 0 ? void 0 : _this$_scale.toHashString()) !== null && _this$_scale$toHashSt !== void 0 ? _this$_scale$toHashSt : '') + ((_this$_rotation$toHas = (_this$_rotation = this._rotation) === null || _this$_rotation === void 0 ? void 0 : _this$_rotation.toHashString()) !== null && _this$_rotation$toHas !== void 0 ? _this$_rotation$toHas : '');
        };

        _createClass(ExoticNodeAnimation, [{
          key: "path",
          get: function get() {
            return this._path;
          }
        }]);

        return ExoticNodeAnimation;
      }(), _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "_path", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "_position", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "_rotation", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "_scale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class5)) || _class4);
      ExoticVectorLikeTrackValues = (_dec3 = ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticVectorLikeTrackValues"), _dec3(_class7 = (_class8 = (_temp3 = /*#__PURE__*/function () {
        function ExoticVectorLikeTrackValues(values) {
          _initializerDefineProperty(this, "_values", _descriptor6, this);

          _initializerDefineProperty(this, "_isQuantized", _descriptor7, this);

          this._values = values;
          this._isQuantized = false;
        }

        var _proto3 = ExoticVectorLikeTrackValues.prototype;

        _proto3.quantize = function quantize(type) {
          assertIsTrue(!this._isQuantized);
          this._values = _quantize(this._values, type);
          this._isQuantized = true;
        }
        /**
         * @internal
         */
        ;

        _proto3.toHashString = function toHashString() {
          var isQuantized = this._isQuantized,
              values = this._values;
          return isQuantized + " " + (isQuantized ? values.toHashString() : floatArrayToHashString(values));
        };

        _createClass(ExoticVectorLikeTrackValues, [{
          key: "precision",
          get: function get() {
            return this._isQuantized ? this._values.originalPrecision : getFloatArrayPrecision(this._values);
          }
        }]);

        return ExoticVectorLikeTrackValues;
      }(), _temp3), (_descriptor6 = _applyDecoratedDescriptor(_class8.prototype, "_values", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class8.prototype, "_isQuantized", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class8)) || _class7);
      ExoticVec3TrackValues = (_dec4 = ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticVec3TrackValues"), _dec4(_class10 = /*#__PURE__*/function (_ExoticVectorLikeTrac) {
        _inheritsLoose(ExoticVec3TrackValues, _ExoticVectorLikeTrac);

        function ExoticVec3TrackValues() {
          return _ExoticVectorLikeTrac.apply(this, arguments) || this;
        }

        ExoticVec3TrackValues.imitate = function imitate(values, model) {
          var trackValues = new ExoticVec3TrackValues(values);

          if (model._isQuantized) {
            trackValues.quantize(model._values.quantizationType);
          }

          return trackValues;
        };

        var _proto4 = ExoticVec3TrackValues.prototype;

        _proto4.get = function get(index, resultValue) {
          var values = this._values,
              isQuantized = this._isQuantized;

          if (isQuantized) {
            loadVec3FromQuantized(values, index, resultValue);
          } else {
            Vec3.fromArray(resultValue, values, index * 3);
          }
        };

        _proto4.lerp = function lerp(prevIndex, nextIndex, ratio, prevValue, nextValue, resultValue) {
          var values = this._values,
              isQuantized = this._isQuantized;

          if (isQuantized) {
            loadVec3FromQuantized(values, prevIndex, prevValue);
            loadVec3FromQuantized(values, nextIndex, nextValue);
          } else {
            Vec3.fromArray(prevValue, values, prevIndex * 3);
            Vec3.fromArray(nextValue, values, nextIndex * 3);
          }

          Vec3.lerp(resultValue, prevValue, nextValue, ratio);
        };

        return ExoticVec3TrackValues;
      }(ExoticVectorLikeTrackValues)) || _class10);
      ExoticQuatTrackValues = (_dec5 = ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticQuatTrackValues"), _dec5(_class11 = /*#__PURE__*/function (_ExoticVectorLikeTrac2) {
        _inheritsLoose(ExoticQuatTrackValues, _ExoticVectorLikeTrac2);

        function ExoticQuatTrackValues() {
          return _ExoticVectorLikeTrac2.apply(this, arguments) || this;
        }

        ExoticQuatTrackValues.imitate = function imitate(values, model) {
          var trackValues = new ExoticQuatTrackValues(values);

          if (model._isQuantized) {
            trackValues.quantize(model._values.quantizationType);
          }

          return trackValues;
        };

        var _proto5 = ExoticQuatTrackValues.prototype;

        _proto5.get = function get(index, resultValue) {
          var values = this._values,
              isQuantized = this._isQuantized;

          if (isQuantized) {
            loadQuatFromQuantized(values, index, resultValue);
          } else {
            Quat.fromArray(resultValue, values, index * 4);
          }
        };

        _proto5.lerp = function lerp(prevIndex, nextIndex, ratio, prevValue, nextValue, resultValue) {
          var values = this._values,
              isQuantized = this._isQuantized;

          if (isQuantized) {
            loadQuatFromQuantized(values, prevIndex, prevValue);
            loadQuatFromQuantized(values, nextIndex, nextValue);
          } else {
            Quat.fromArray(prevValue, values, prevIndex * 4);
            Quat.fromArray(nextValue, values, nextIndex * 4);
          }

          Quat.slerp(resultValue, prevValue, nextValue, ratio);
        };

        return ExoticQuatTrackValues;
      }(ExoticVectorLikeTrackValues)) || _class11);
      ExoticTrack = (_dec6 = ccclass(CLASS_NAME_PREFIX_ANIM + "ExoticTrack"), _dec6(_class12 = (_class13 = (_temp4 = /*#__PURE__*/function () {
        function ExoticTrack(times, values) {
          _initializerDefineProperty(this, "times", _descriptor8, this);

          _initializerDefineProperty(this, "values", _descriptor9, this);

          this.times = times;
          this.values = values;
        }

        var _proto6 = ExoticTrack.prototype;

        /**
         * @internal
         */
        _proto6.toHashString = function toHashString() {
          var times = this.times,
              values = this.values;
          return "times: " + floatArrayToHashString(times) + "; values: " + values.toHashString();
        };

        return ExoticTrack;
      }(), _temp4), (_descriptor8 = _applyDecoratedDescriptor(_class13.prototype, "times", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class13.prototype, "values", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class13)) || _class12);

      SplitInfo = /*#__PURE__*/function () {
        function SplitInfo() {
          this._reset();
        }

        var _proto7 = SplitInfo.prototype;

        _proto7.transformTime = function transformTime(input) {
          return input - this._timeOffset;
        };

        _proto7.calculate = function calculate(times, from, to) {
          this._reset();

          var nKeyframes = times.length;

          if (!nKeyframes) {
            return;
          }

          var firstTime = times[0];
          var lastTime = times[nKeyframes - 1];
          var fromClamped = clamp(from, firstTime, lastTime);
          var toClamped = clamp(to, firstTime, lastTime);
          this._timeOffset = fromClamped;

          var _searchRange = searchRange(times, fromClamped, toClamped),
              fromIndex = _searchRange.fromIndex,
              fromRatio = _searchRange.fromRatio,
              toIndex = _searchRange.toIndex,
              toRatio = _searchRange.toRatio;

          assertIsTrue(toIndex >= fromIndex);
          var fromJust = !fromRatio;
          var toJust = !toRatio; // Handles that from and to are same

          if (fromIndex === toIndex && fromRatio === toRatio) {
            if (!fromJust) {
              this.preLerpIndex = fromIndex;
              this.preLerpRatio = fromRatio;
            } else {
              this.directKeyframesBegin = fromIndex;
              this.directKeyframesEnd = fromIndex + 1;
            }

            return;
          }

          if (!fromJust) {
            this.preLerpIndex = fromIndex;
            this.preLerpRatio = fromRatio;
          }

          this.directKeyframesBegin = fromJust ? fromIndex : fromIndex + 1;
          this.directKeyframesEnd = toIndex + 1;

          if (!toJust) {
            this.postLerpIndex = toIndex;
            this.postLerpRatio = toRatio;
          }
        };

        _proto7._reset = function _reset() {
          this.preLerpIndex = -1;
          this.preLerpRatio = 0.0;
          this.directKeyframesBegin = 0;
          this.directKeyframesEnd = 0;
          this.postLerpIndex = -1;
          this.postLerpRatio = 0.0;
          this._timeOffset = 0.0;
        };

        _createClass(SplitInfo, [{
          key: "keyframesCount",
          get: function get() {
            var preLerpIndex = this.preLerpIndex,
                directKeyframesBegin = this.directKeyframesBegin,
                directKeyframesEnd = this.directKeyframesEnd,
                postLerpIndex = this.postLerpIndex;
            return 0 + (preLerpIndex < 0 ? 0 : 1) + (directKeyframesEnd - directKeyframesBegin) + (postLerpIndex < 0 ? 0 : 1);
          }
        }]);

        return SplitInfo;
      }();

      ExoticTrsAnimationEvaluator = /*#__PURE__*/function () {
        function ExoticTrsAnimationEvaluator(nodeAnimations, binder) {
          this._nodeEvaluations = void 0;
          this._nodeEvaluations = nodeAnimations.map(function (nodeAnimation) {
            return nodeAnimation.createEvaluator(binder);
          });
        }

        var _proto8 = ExoticTrsAnimationEvaluator.prototype;

        _proto8.evaluate = function evaluate(time) {
          this._nodeEvaluations.forEach(function (nodeEvaluator) {
            nodeEvaluator.evaluate(time);
          });
        };

        return ExoticTrsAnimationEvaluator;
      }();

      ExoticNodeAnimationEvaluator = /*#__PURE__*/function () {
        function ExoticNodeAnimationEvaluator(path, position, rotation, scale, binder) {
          this._position = null;
          this._rotation = null;
          this._scale = null;

          if (position) {
            this._position = createExoticTrackEvaluationRecord(position.times, position.values, Vec3, path, 'position', binder);
          }

          if (rotation) {
            this._rotation = createExoticTrackEvaluationRecord(rotation.times, rotation.values, Quat, path, 'rotation', binder);
          }

          if (scale) {
            this._scale = createExoticTrackEvaluationRecord(scale.times, scale.values, Vec3, path, 'scale', binder);
          }
        }

        var _proto9 = ExoticNodeAnimationEvaluator.prototype;

        _proto9.evaluate = function evaluate(time) {
          if (this._position) {
            var _value = this._position.evaluator.evaluate(time);

            this._position.runtimeBinding.setValue(_value);
          }

          if (this._rotation) {
            var _value2 = this._rotation.evaluator.evaluate(time);

            this._rotation.runtimeBinding.setValue(_value2);
          }

          if (this._scale) {
            var _value3 = this._scale.evaluator.evaluate(time);

            this._scale.runtimeBinding.setValue(_value3);
          }
        };

        return ExoticNodeAnimationEvaluator;
      }();

      ExoticTrackEvaluator = /*#__PURE__*/function () {
        function ExoticTrackEvaluator(times, values, ValueConstructor) {
          this._times = void 0;
          this._inputSampleResultCache = {
            just: false,
            index: -1,
            nextIndex: -1,
            ratio: 0.0
          };
          this._values = void 0;
          this._prevValue = void 0;
          this._nextValue = void 0;
          this._resultValue = void 0;
          this._times = times;
          this._values = values;
          this._prevValue = new ValueConstructor();
          this._nextValue = new ValueConstructor();
          this._resultValue = new ValueConstructor();
        }

        var _proto10 = ExoticTrackEvaluator.prototype;

        _proto10.evaluate = function evaluate(time) {
          var times = this._times,
              values = this._values,
              resultValue = this._resultValue;
          var nFrames = times.length;

          if (nFrames === 0) {
            return resultValue;
          }

          var inputSampleResult = sampleInput(times, time, this._inputSampleResultCache);

          if (inputSampleResult.just) {
            values.get(inputSampleResult.index, resultValue);
          } else {
            values.lerp(inputSampleResult.index, inputSampleResult.nextIndex, inputSampleResult.ratio, this._prevValue, this._nextValue, resultValue);
          }

          return resultValue;
        };

        return ExoticTrackEvaluator;
      }();

      QUANTIZATION_TYPE_TO_ARRAY_VIEW_CONSTRUCTOR_MAP = {
        uint8: Uint8Array,
        uint16: Uint16Array
      };

      (function (FloatPrecision) {
        FloatPrecision[FloatPrecision["FLOAT_32"] = 0] = "FLOAT_32";
        FloatPrecision[FloatPrecision["FLOAT_64"] = 1] = "FLOAT_64";
      })(FloatPrecision || (FloatPrecision = {}));

      QuantizedFloatArray = (_dec7 = ccclass(CLASS_NAME_PREFIX_ANIM + "QuantizedFloatArray"), _dec7(_class15 = (_class16 = (_temp5 = /*#__PURE__*/function () {
        function QuantizedFloatArray(originalPrecision, values, extent, min) {
          if (min === void 0) {
            min = 0.0;
          }

          _initializerDefineProperty(this, "originalPrecision", _descriptor10, this);

          _initializerDefineProperty(this, "min", _descriptor11, this);

          _initializerDefineProperty(this, "extent", _descriptor12, this);

          _initializerDefineProperty(this, "values", _descriptor13, this);

          this.originalPrecision = originalPrecision;
          this.values = values;
          this.extent = extent;
          this.min = min;
        }
        /**
         * @internal
         */


        var _proto11 = QuantizedFloatArray.prototype;

        _proto11.toHashString = function toHashString() {
          var originalPrecision = this.originalPrecision,
              min = this.min,
              extent = this.extent,
              values = this.values;
          return originalPrecision + " " + floatToHashString(min) + " " + floatToHashString(extent) + " " + values.join(' ');
        };

        _createClass(QuantizedFloatArray, [{
          key: "quantizationType",
          get: function get() {
            switch (this.values.BYTES_PER_ELEMENT) {
              default: // fallthrough

              case 1:
                return 'uint8';

              case 2:
                return 'uint16';
            }
          }
        }]);

        return QuantizedFloatArray;
      }(), _temp5), (_descriptor10 = _applyDecoratedDescriptor(_class16.prototype, "originalPrecision", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class16.prototype, "min", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class16.prototype, "extent", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class16.prototype, "values", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class16)) || _class15);
    }
  };
});
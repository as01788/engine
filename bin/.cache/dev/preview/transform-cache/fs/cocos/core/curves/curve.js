System.register("q-bundled:///fs/cocos/core/curves/curve.js", ["../data/utils/asserts.js", "../math/index.js", "./keyframe-curve.js", "../data/decorators/index.js", "./real-curve-param.js", "../algorithm/binary-search.js", "./solve-cubic.js", "../data/editor-extendable.js", "../data/index.js", "./easing-method.js", "../data/serialization-metadata.js"], function (_export, _context) {
  "use strict";

  var assertIsTrue, approx, lerp, pingPong, repeat, KeyframeCurve, ccclass, serializable, RealInterpolationMode, ExtrapolationMode, TangentWeightMode, binarySearchEpsilon, solveCubic, EditorExtendable, CCClass, deserializeTag, editorExtrasTag, serializeTag, EasingMethod, getEasingFn, getOrCreateSerializationMetadata, _dec, _class, _class2, _descriptor, _descriptor2, _temp, RealKeyframeValue, RealCurve, FLAGS_EASING_METHOD_BITS_START, FLAG_EASING_METHOD_MASK, KeyframeValueFlagMask, OVERFLOW_BYTES, FRAME_COUNT_BYTES, TIME_BYTES, KEY_FRAME_VALUE_FLAGS_BYTES, VALUE_BYTES, INTERPOLATION_MODE_BYTES, TANGENT_WEIGHT_MODE_BYTES, LEFT_TANGENT_BYTES, LEFT_TANGENT_WEIGHT_BYTES, RIGHT_TANGENT_BYTES, RIGHT_TANGENT_WEIGHT_BYTES, _createRealKeyframeVa, DEFAULT_INTERPOLATION_MODE, DEFAULT_TANGENT_WEIGHT_MODE, DEFAULT_LEFT_TANGENT, DEFAULT_LEFT_TANGENT_WEIGHT, DEFAULT_RIGHT_TANGENT, DEFAULT_RIGHT_TANGENT_WEIGHT, REAL_KEY_FRAME_VALUE_MAX_SIZE;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function createRealKeyframeValue(params) {
    var realKeyframeValue = new RealKeyframeValue();

    if (typeof params === 'number') {
      realKeyframeValue.value = params;
    } else {
      var interpolationMode = params.interpolationMode,
          tangentWeightMode = params.tangentWeightMode,
          value = params.value,
          rightTangent = params.rightTangent,
          rightTangentWeight = params.rightTangentWeight,
          leftTangent = params.leftTangent,
          leftTangentWeight = params.leftTangentWeight,
          easingMethod = params.easingMethod,
          editorExtras = params[editorExtrasTag];
      realKeyframeValue.value = value !== null && value !== void 0 ? value : realKeyframeValue.value;
      realKeyframeValue.rightTangent = rightTangent !== null && rightTangent !== void 0 ? rightTangent : realKeyframeValue.rightTangent;
      realKeyframeValue.rightTangentWeight = rightTangentWeight !== null && rightTangentWeight !== void 0 ? rightTangentWeight : realKeyframeValue.rightTangentWeight;
      realKeyframeValue.leftTangent = leftTangent !== null && leftTangent !== void 0 ? leftTangent : realKeyframeValue.leftTangent;
      realKeyframeValue.leftTangentWeight = leftTangentWeight !== null && leftTangentWeight !== void 0 ? leftTangentWeight : realKeyframeValue.leftTangentWeight;
      realKeyframeValue.interpolationMode = interpolationMode !== null && interpolationMode !== void 0 ? interpolationMode : realKeyframeValue.interpolationMode;
      realKeyframeValue.tangentWeightMode = tangentWeightMode !== null && tangentWeightMode !== void 0 ? tangentWeightMode : realKeyframeValue.tangentWeightMode;
      realKeyframeValue.easingMethod = easingMethod !== null && easingMethod !== void 0 ? easingMethod : realKeyframeValue.easingMethod;

      if (editorExtras) {
        realKeyframeValue[editorExtrasTag] = editorExtras;
      }
    }

    return realKeyframeValue;
  }
  /**
   * @en
   * Real curve.
   *
   * The real curve is a kind of keyframe curve.
   * When evaluating a real curve:
   * - If the input is just the time of a keyframe,
   *   keyframe value's numeric value is used as result.
   * - Otherwise, if the input is less than the time of the first keyframe or
   *   is greater than the time of the last keyframe time, it performs so-called extrapolation.
   * - Otherwise, the input falls between two keyframes and then it interpolates between the two keyframes.
   *
   * Every keyframe may specify an interpolation mode
   * to indicates how to perform the interpolation
   * from current keyframe to next keyframe.
   * Interpolation modes of keyframes may differ from each other.
   *
   * Real curve allows three interpolation modes: constant, linear and cubic.
   * The constant and linear mode is easy.
   * In case of cubic interpolation,
   * the interpolation algorithm is effectively equivalent to cubic bezier(or cubic hermite) interpolation.
   *
   * Related quantities related to cubic interpolation are:
   * - Keyframe times and numeric values.
   * - The tangent and tangent weight of the previous keyframe and next keyframe.
   *
   * While performing the cubic bezier interpolation,
   * The first control point is calculated from right tangent and right tangent weight of previous keyframe,
   * the second control point is calculated from left tangent and left tangent weight of next keyframe.
   *
   * In equivalent bezier representation,
   * the tangent is the line slope between sample point and control point
   * and the tangent weight is the distance between sample point and control point.
   * The tangent weight on either side can be marked as "not specified" through tangent weight mode.
   * If either side weight is not specified,
   * the tangent weight is treated at `sqrt(d_t^2 + (d_t * tangent)^2) * (1 / 3)`
   * where `d_t` is the difference between two keyframes 's time and `tangent` is the tangent of that side.
   *
   * Note, in some cases, tangent/tangent weight/tangent weight mode may be "meaningless".
   * The meaningless means that value can may not be stored(or serialized).
   * @zh
   * 实数曲线。
   *
   * 实数曲线是关键帧曲线的一种。
   * 在求值实数曲线时：
   * - 若输入正好就是关键帧上的时间，关键帧上的数值就作为结果。
   * - 否则，如果输入小于第一个关键帧上的时间或大于最后一个关键帧上的时间，它会进行所谓的外推。
   * - 否则，输入落于两帧之间，将通过插值两帧得到结果。
   *
   * 每个关键帧都可以指定插值模式，
   * 以表示从当前帧数值变化到下一帧数值所采用的插值算法，
   * 每个关键帧的插值模式都可以是各不相同的。
   *
   * 实数曲线允许三种插值模式：常量、线性和三次方的（也称立方）。
   * 常量和线性模式都比较简单。
   * 在三次插值的情况下，插值算法实质上等价于三次贝塞尔（或三次埃尔米特）插值。
   *
   * 三次插值的相关量有：
   * - 关键帧上的时间和数值；
   * - 前一关键帧和后一关键帧上的切线和切线权重。
   *
   * 当两帧之间进行三次贝塞尔曲线插值时，
   * 会取前一帧的右切线、右切线权重来计算出第一个控制点，
   * 会取后一帧的左切线、左切线权重来计算出第二个控制点。
   *
   * 在等效的贝塞尔表示中，
   * 切线就是样本点和控制点之间的切线斜率，而切线权重就是样本点和控制点之间的距离。
   * 任意一端的切线权重都可以通过切线权重模式来标记为“未指定的”。
   * 若任意一端的切线权重是未指定的，
   * 此端上的切线权重将被视为 `sqrt(d_t^2 + (d_t * tangent)^2) * (1 / 3)`，其中，
   * `d_t` 是两帧时间的差，`tangent` 是此端上的切线。
   *
   * 注意，切线/切线权重/切线权重模式在某些情况下可能是“无意义的”。
   * 无意义意味着这些值可能不会被存储或序列化。
   */


  function saveRealKeyFrameValue(dataView, keyframeValue, offset) {
    var flags = 0;
    var currentOffset = offset;
    var pFlags = currentOffset; // Place holder for flags

    currentOffset += KEY_FRAME_VALUE_FLAGS_BYTES;
    var value = keyframeValue.value,
        interpolationMode = keyframeValue.interpolationMode,
        tangentWeightMode = keyframeValue.tangentWeightMode,
        rightTangent = keyframeValue.rightTangent,
        rightTangentWeight = keyframeValue.rightTangentWeight,
        leftTangent = keyframeValue.leftTangent,
        leftTangentWeight = keyframeValue.leftTangentWeight,
        easingMethod = keyframeValue.easingMethod;
    dataView.setFloat32(currentOffset, value, true);
    currentOffset += VALUE_BYTES;

    if (interpolationMode !== DEFAULT_INTERPOLATION_MODE) {
      flags |= KeyframeValueFlagMask.INTERPOLATION_MODE;
      dataView.setUint8(currentOffset, interpolationMode);
      currentOffset += INTERPOLATION_MODE_BYTES;
    }

    if (tangentWeightMode !== DEFAULT_TANGENT_WEIGHT_MODE) {
      flags |= KeyframeValueFlagMask.TANGENT_WEIGHT_MODE;
      dataView.setUint8(currentOffset, tangentWeightMode);
      currentOffset += TANGENT_WEIGHT_MODE_BYTES;
    }

    if (leftTangent !== DEFAULT_LEFT_TANGENT) {
      flags |= KeyframeValueFlagMask.LEFT_TANGENT;
      dataView.setFloat32(currentOffset, leftTangent, true);
      currentOffset += LEFT_TANGENT_BYTES;
    }

    if (leftTangentWeight !== DEFAULT_LEFT_TANGENT_WEIGHT) {
      flags |= KeyframeValueFlagMask.LEFT_TANGENT_WEIGHT;
      dataView.setFloat32(currentOffset, leftTangentWeight, true);
      currentOffset += LEFT_TANGENT_WEIGHT_BYTES;
    }

    if (rightTangent !== DEFAULT_RIGHT_TANGENT) {
      flags |= KeyframeValueFlagMask.RIGHT_TANGENT;
      dataView.setFloat32(currentOffset, rightTangent, true);
      currentOffset += RIGHT_TANGENT_BYTES;
    }

    if (rightTangentWeight !== DEFAULT_RIGHT_TANGENT_WEIGHT) {
      flags |= KeyframeValueFlagMask.RIGHT_TANGENT_WEIGHT;
      dataView.setFloat32(currentOffset, rightTangentWeight, true);
      currentOffset += RIGHT_TANGENT_WEIGHT_BYTES;
    }

    flags |= easingMethod << FLAGS_EASING_METHOD_BITS_START;
    dataView.setUint32(pFlags, flags, true);
    return currentOffset;
  }

  function loadRealKeyFrameValue(dataView, keyframeValue, offset) {
    var currentOffset = offset;
    var flags = dataView.getUint32(currentOffset, true);
    currentOffset += KEY_FRAME_VALUE_FLAGS_BYTES;
    keyframeValue.value = dataView.getFloat32(currentOffset, true);
    currentOffset += VALUE_BYTES;

    if (flags & KeyframeValueFlagMask.INTERPOLATION_MODE) {
      keyframeValue.interpolationMode = dataView.getUint8(currentOffset);
      currentOffset += INTERPOLATION_MODE_BYTES;
    }

    if (flags & KeyframeValueFlagMask.TANGENT_WEIGHT_MODE) {
      keyframeValue.tangentWeightMode = dataView.getUint8(currentOffset);
      currentOffset += TANGENT_WEIGHT_MODE_BYTES;
    }

    if (flags & KeyframeValueFlagMask.LEFT_TANGENT) {
      keyframeValue.leftTangent = dataView.getFloat32(currentOffset, true);
      currentOffset += LEFT_TANGENT_BYTES;
    }

    if (flags & KeyframeValueFlagMask.LEFT_TANGENT_WEIGHT) {
      keyframeValue.leftTangentWeight = dataView.getFloat32(currentOffset, true);
      currentOffset += LEFT_TANGENT_WEIGHT_BYTES;
    }

    if (flags & KeyframeValueFlagMask.RIGHT_TANGENT) {
      keyframeValue.rightTangent = dataView.getFloat32(currentOffset, true);
      currentOffset += RIGHT_TANGENT_BYTES;
    }

    if (flags & KeyframeValueFlagMask.RIGHT_TANGENT_WEIGHT) {
      keyframeValue.rightTangentWeight = dataView.getFloat32(currentOffset, true);
      currentOffset += RIGHT_TANGENT_WEIGHT_BYTES;
    }

    var easingMethod = (flags & FLAG_EASING_METHOD_MASK) >> FLAGS_EASING_METHOD_BITS_START;
    keyframeValue.easingMethod = easingMethod;
    return currentOffset;
  }

  function wrapRepeat(time, prevTime, nextTime) {
    return prevTime + repeat(time - prevTime, nextTime - prevTime);
  }

  function wrapPingPong(time, prevTime, nextTime) {
    return prevTime + pingPong(time - prevTime, nextTime - prevTime);
  }

  function linearTrend(prevTime, prevValue, nextTime, nextValue, time) {
    var slope = (nextValue - prevValue) / (nextTime - prevTime);
    return prevValue + (time - prevTime) * slope;
  }

  function evalBetweenTwoKeyFrames(prevTime, prevValue, nextTime, nextValue, ratio) {
    var dt = nextTime - prevTime;

    switch (prevValue.interpolationMode) {
      default:
      case RealInterpolationMode.CONSTANT:
        return prevValue.value;

      case RealInterpolationMode.LINEAR:
        {
          var transformedRatio = prevValue.easingMethod === EasingMethod.LINEAR ? ratio : getEasingFn(prevValue.easingMethod)(ratio);
          return lerp(prevValue.value, nextValue.value, transformedRatio);
        }

      case RealInterpolationMode.CUBIC:
        {
          var ONE_THIRD = 1.0 / 3.0;
          var prevTangent = prevValue.rightTangent,
              prevTangentWeightSpecified = prevValue.rightTangentWeight;
          var prevTangentWeightEnabled = isRightTangentWeightEnabled(prevValue.tangentWeightMode);
          var nextTangent = nextValue.leftTangent,
              nextTangentWeightSpecified = nextValue.leftTangentWeight;
          var nextTangentWeightEnabled = isLeftTangentWeightEnabled(nextValue.tangentWeightMode);

          if (!prevTangentWeightEnabled && !nextTangentWeightEnabled) {
            // Optimize for the case when both x components of tangents are 1.
            // See below.
            var p1 = prevValue.value + ONE_THIRD * prevTangent * dt;
            var p2 = nextValue.value - ONE_THIRD * nextTangent * dt;
            return bezierInterpolate(prevValue.value, p1, p2, nextValue.value, ratio);
          } else {
            var prevTangentWeight = 0.0;

            if (prevTangentWeightEnabled) {
              prevTangentWeight = prevTangentWeightSpecified;
            } else {
              var x = dt;

              var _y = dt * prevTangent;

              prevTangentWeight = Math.sqrt(x * x + _y * _y) * ONE_THIRD;
            }

            var angle0 = Math.atan(prevTangent);
            var tx0 = Math.cos(angle0) * prevTangentWeight + prevTime;
            var ty0 = Math.sin(angle0) * prevTangentWeight + prevValue.value;
            var nextTangentWeight = 0.0;

            if (nextTangentWeightEnabled) {
              nextTangentWeight = nextTangentWeightSpecified;
            } else {
              var _x = dt;

              var _y2 = dt * nextTangent;

              nextTangentWeight = Math.sqrt(_x * _x + _y2 * _y2) * ONE_THIRD;
            }

            var angle1 = Math.atan(nextTangent);
            var tx1 = -Math.cos(angle1) * nextTangentWeight + nextTime;
            var ty1 = -Math.sin(angle1) * nextTangentWeight + nextValue.value;
            var dx = dt; // Hermite to Bezier

            var u0x = (tx0 - prevTime) / dx;
            var u1x = (tx1 - prevTime) / dx;
            var u0y = ty0;
            var u1y = ty1; // Converts from Bernstein Basis to Power Basis.
            // Formula: [1, 0, 0, 0; -3, 3, 0, 0; 3, -6, 3, 0; -1, 3, -3, 1] * [p_0; p_1; p_2; p_3]
            // --------------------------------------
            // | Basis | Coeff
            // | t^3   | 3 * p_1 - p_0 - 3 * p_2 + p_3
            // | t^2   | 3 * p_0 - 6 * p_1 + 3 * p_2
            // | t^1   | 3 * p_1 - 3 * p_0
            // | t^0   | p_0
            // --------------------------------------
            // where: p_0 = 0, p_1 = u0x, p_2 = u1x, p_3 = 1
            // Especially, when both tangents are 1, we will have u0x = 1/3 and u1x = 2/3
            // and then: ratio = t, eg. the ratios are
            // 1-1 corresponding to param t. That's why we can do optimization like above.

            var coeff0 = 0.0; // 0

            var coeff1 = 3.0 * u0x; // 1

            var coeff2 = 3.0 * u1x - 6.0 * u0x; // -1

            var coeff3 = 3.0 * (u0x - u1x) + 1.0; // 1
            // Solves the param t from equation X(t) = ratio.

            var solutions = [0.0, 0.0, 0.0];
            var nSolutions = solveCubic(coeff0 - ratio, coeff1, coeff2, coeff3, solutions);
            var param = getParamFromCubicSolution(solutions, nSolutions, ratio); // Solves Y.

            var y = bezierInterpolate(prevValue.value, u0y, u1y, nextValue.value, param);
            return y;
          }
        }
    }
  }

  function isLeftTangentWeightEnabled(tangentWeightMode) {
    return (tangentWeightMode & TangentWeightMode.LEFT) !== 0;
  }

  function isRightTangentWeightEnabled(tangentWeightMode) {
    return (tangentWeightMode & TangentWeightMode.RIGHT) !== 0;
  }

  function bezierInterpolate(p0, p1, p2, p3, t) {
    var u = 1 - t;
    var coeff0 = u * u * u;
    var coeff1 = 3 * u * u * t;
    var coeff2 = 3 * u * t * t;
    var coeff3 = t * t * t;
    return coeff0 * p0 + coeff1 * p1 + coeff2 * p2 + coeff3 * p3;
  }

  function getParamFromCubicSolution(solutions, solutionsCount, x) {
    var param = x;

    if (solutionsCount === 1) {
      param = solutions[0];
    } else {
      param = -Infinity;

      for (var iSolution = 0; iSolution < solutionsCount; ++iSolution) {
        var solution = solutions[iSolution];

        if (solution >= 0.0 && solution <= 1.0) {
          if (solution > param) {
            param = solution;
          }
        }
      }

      if (param === -Infinity) {
        param = 0.0;
      }
    }

    return param;
  }

  return {
    setters: [function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }, function (_mathIndexJs) {
      approx = _mathIndexJs.approx;
      lerp = _mathIndexJs.lerp;
      pingPong = _mathIndexJs.pingPong;
      repeat = _mathIndexJs.repeat;
    }, function (_keyframeCurveJs) {
      KeyframeCurve = _keyframeCurveJs.KeyframeCurve;
    }, function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_realCurveParamJs) {
      RealInterpolationMode = _realCurveParamJs.RealInterpolationMode;
      ExtrapolationMode = _realCurveParamJs.ExtrapolationMode;
      TangentWeightMode = _realCurveParamJs.TangentWeightMode;
    }, function (_algorithmBinarySearchJs) {
      binarySearchEpsilon = _algorithmBinarySearchJs.binarySearchEpsilon;
    }, function (_solveCubicJs) {
      solveCubic = _solveCubicJs.solveCubic;
    }, function (_dataEditorExtendableJs) {
      EditorExtendable = _dataEditorExtendableJs.EditorExtendable;
    }, function (_dataIndexJs) {
      CCClass = _dataIndexJs.CCClass;
      deserializeTag = _dataIndexJs.deserializeTag;
      editorExtrasTag = _dataIndexJs.editorExtrasTag;
      serializeTag = _dataIndexJs.serializeTag;
    }, function (_easingMethodJs) {
      EasingMethod = _easingMethodJs.EasingMethod;
      getEasingFn = _easingMethodJs.getEasingFn;
    }, function (_dataSerializationMetadataJs) {
      getOrCreateSerializationMetadata = _dataSerializationMetadataJs.getOrCreateSerializationMetadata;
    }],
    execute: function () {
      _export("RealInterpolationMode", RealInterpolationMode);

      _export("ExtrapolationMode", ExtrapolationMode);

      _export("TangentWeightMode", TangentWeightMode);

      _export("EasingMethod", EasingMethod);
      /**
       * @en View to a real frame value.
       * Note, the view may be invalidated due to keyframe change/add/remove.
       * @zh 实数帧值的视图。
       * 注意，该视图可能因关键帧的添加、改变、移除而失效。
       */


      RealKeyframeValue = /*#__PURE__*/function (_EditorExtendable) {
        _inheritsLoose(RealKeyframeValue, _EditorExtendable);

        function RealKeyframeValue() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EditorExtendable.call.apply(_EditorExtendable, [this].concat(args)) || this;
          _this.interpolationMode = RealInterpolationMode.LINEAR;
          _this.tangentWeightMode = TangentWeightMode.NONE;
          _this.value = 0.0;
          _this.rightTangent = 0.0;
          _this.rightTangentWeight = 0.0;
          _this.leftTangent = 0.0;
          _this.leftTangentWeight = 0.0;
          _this.easingMethod = EasingMethod.LINEAR;
          return _this;
        }

        return RealKeyframeValue;
      }(EditorExtendable);

      CCClass.fastDefine('cc.RealKeyframeValue', RealKeyframeValue, {
        interpolationMode: RealInterpolationMode.LINEAR,
        tangentWeightMode: TangentWeightMode.NONE,
        value: 0.0,
        rightTangent: 0.0,
        rightTangentWeight: 0.0,
        leftTangent: 0.0,
        leftTangentWeight: 0.0,
        easingMethod: EasingMethod.LINEAR
      });
      CCClass.Attr.setClassAttr(RealKeyframeValue, editorExtrasTag, 'editorOnly', true);
      getOrCreateSerializationMetadata(RealKeyframeValue).uniquelyReferenced = true;

      _export("RealCurve", RealCurve = (_dec = ccclass('cc.RealCurve'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_KeyframeCurve) {
        _inheritsLoose(RealCurve, _KeyframeCurve);

        function RealCurve() {
          var _this2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2 = _KeyframeCurve.call.apply(_KeyframeCurve, [this].concat(args)) || this;

          _initializerDefineProperty(_this2, "preExtrapolation", _descriptor, _assertThisInitialized(_this2));

          _initializerDefineProperty(_this2, "postExtrapolation", _descriptor2, _assertThisInitialized(_this2));

          return _this2;
        }

        var _proto = RealCurve.prototype;

        /**
         * @en
         * Evaluates this curve at specified time.
         * @zh
         * 求值此曲线在指定时间上的值。
         * @param time Input time.
         * @returns Result value.
         */
        _proto.evaluate = function evaluate(time) {
          var times = this._times,
              values = this._values;
          var nFrames = times.length;

          if (nFrames === 0) {
            return 0.0;
          }

          var firstTime = times[0];
          var lastTime = times[nFrames - 1];

          if (time < firstTime) {
            // Underflow
            var preExtrapolation = this.preExtrapolation;
            var _preValue = values[0];

            if (preExtrapolation === ExtrapolationMode.CLAMP || nFrames < 2) {
              return _preValue.value;
            }

            switch (preExtrapolation) {
              case ExtrapolationMode.LINEAR:
                return linearTrend(firstTime, values[0].value, times[1], values[1].value, time);

              case ExtrapolationMode.LOOP:
                time = wrapRepeat(time, firstTime, lastTime);
                break;

              case ExtrapolationMode.PING_PONG:
                time = wrapPingPong(time, firstTime, lastTime);
                break;

              default:
                return _preValue.value;
            }
          } else if (time > lastTime) {
            // Overflow
            var postExtrapolation = this.postExtrapolation;
            var preFrame = values[nFrames - 1];

            if (postExtrapolation === ExtrapolationMode.CLAMP || nFrames < 2) {
              return preFrame.value;
            }

            switch (postExtrapolation) {
              case ExtrapolationMode.LINEAR:
                return linearTrend(lastTime, preFrame.value, times[nFrames - 2], values[nFrames - 2].value, time);

              case ExtrapolationMode.LOOP:
                time = wrapRepeat(time, firstTime, lastTime);
                break;

              case ExtrapolationMode.PING_PONG:
                time = wrapPingPong(time, firstTime, lastTime);
                break;

              default:
                return preFrame.value;
            }
          }

          var index = binarySearchEpsilon(times, time);

          if (index >= 0) {
            return values[index].value;
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
          return evalBetweenTwoKeyFrames(preTime, preValue, nextTime, nextValue, ratio);
        }
        /**
         * Adds a keyframe into this curve.
         * @param time Time of the keyframe.
         * @param value Value of the keyframe.
         * @returns The index to the new keyframe.
         */
        ;

        _proto.addKeyFrame = function addKeyFrame(time, value) {
          return _KeyframeCurve.prototype.addKeyFrame.call(this, time, createRealKeyframeValue(value));
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
              return createRealKeyframeValue(value);
            }));
          } else {
            var _keyframes = Array.from(times);

            this.setKeyframes(_keyframes.map(function (_ref) {
              var time = _ref[0];
              return time;
            }), _keyframes.map(function (_ref2) {
              var value = _ref2[1];
              return createRealKeyframeValue(value);
            }));
          }
        }
        /**
         * Returns if this curve is constant.
         * @param tolerance The tolerance.
         * @returns Whether it is constant.
         */
        ;

        _proto.isConstant = function isConstant(tolerance) {
          if (this._values.length <= 1) {
            return true;
          }

          var firstVal = this._values[0].value;
          return this._values.every(function (frame) {
            return approx(frame.value, firstVal, tolerance);
          });
        };

        _proto[serializeTag] = function (output, context) {
          if (!context.toCCON) {
            output.writeThis();
            return;
          }

          var times = this._times,
              keyframeValues = this._values;
          var nKeyframes = times.length;
          var dataSize = 0 + OVERFLOW_BYTES + OVERFLOW_BYTES + FRAME_COUNT_BYTES + TIME_BYTES * nKeyframes + REAL_KEY_FRAME_VALUE_MAX_SIZE * nKeyframes;
          var dataView = new DataView(new ArrayBuffer(dataSize));
          var currentOffset = 0; // Overflow operations

          dataView.setUint8(currentOffset, this.preExtrapolation);
          currentOffset += OVERFLOW_BYTES;
          dataView.setUint8(currentOffset, this.postExtrapolation);
          currentOffset += OVERFLOW_BYTES; // Frame count

          dataView.setUint32(currentOffset, nKeyframes, true);
          currentOffset += FRAME_COUNT_BYTES; // Times

          times.forEach(function (time, index) {
            return dataView.setFloat32(currentOffset + TIME_BYTES * index, time, true);
          });
          currentOffset += TIME_BYTES * nKeyframes; // Frame values

          for (var _iterator = _createForOfIteratorHelperLoose(keyframeValues), _step; !(_step = _iterator()).done;) {
            var keyframeValue = _step.value;
            currentOffset = saveRealKeyFrameValue(dataView, keyframeValue, currentOffset);
          }

          var bytes = new Uint8Array(dataView.buffer, 0, currentOffset);
          output.writeProperty('bytes', bytes);
          var keyframeValueEditorExtras = keyframeValues.map(function (keyframeValue) {
            return keyframeValue[editorExtrasTag];
          });

          if (keyframeValueEditorExtras.some(function (extras) {
            return extras !== undefined;
          })) {
            output.writeProperty("keyframeValueEditorExtras", keyframeValueEditorExtras);
          }
        };

        _proto[deserializeTag] = function (input, context) {
          if (!context.fromCCON) {
            input.readThis();
            return;
          }

          var bytes = input.readProperty('bytes');
          var dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
          var currentOffset = 0; // Overflow operations

          this.preExtrapolation = dataView.getUint8(currentOffset);
          currentOffset += OVERFLOW_BYTES;
          this.postExtrapolation = dataView.getUint8(currentOffset);
          currentOffset += OVERFLOW_BYTES; // Frame count

          var nKeyframes = dataView.getUint32(currentOffset, true);
          currentOffset += FRAME_COUNT_BYTES; // Times

          var times = Array.from({
            length: nKeyframes
          }, function (_, index) {
            return dataView.getFloat32(currentOffset + TIME_BYTES * index, true);
          });
          currentOffset += TIME_BYTES * nKeyframes; // Frame values

          var keyframeValues = new Array(nKeyframes);

          for (var iKeyFrame = 0; iKeyFrame < nKeyframes; ++iKeyFrame) {
            var keyframeValue = createRealKeyframeValue({});
            currentOffset = loadRealKeyFrameValue(dataView, keyframeValue, currentOffset);
            keyframeValues[iKeyFrame] = keyframeValue;
          }

          assertIsTrue(currentOffset === bytes.byteLength);
          var keyframeValueEditorExtras = input.readProperty("keyframeValueEditorExtras");

          if (keyframeValueEditorExtras) {
            assertIsTrue(keyframeValueEditorExtras.length === nKeyframes);
            keyframeValueEditorExtras.forEach(function (extras, index) {
              return keyframeValues[index][editorExtrasTag] = extras;
            });
          }

          this._times = times;
          this._values = keyframeValues;
        };

        return RealCurve;
      }(KeyframeCurve), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "preExtrapolation", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ExtrapolationMode.CLAMP;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "postExtrapolation", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ExtrapolationMode.CLAMP;
        }
      })), _class2)) || _class));

      FLAGS_EASING_METHOD_BITS_START = 8;
      FLAG_EASING_METHOD_MASK = 0xFF << FLAGS_EASING_METHOD_BITS_START; // 8-16 bits

      (function (KeyframeValueFlagMask) {
        KeyframeValueFlagMask[KeyframeValueFlagMask["VALUE"] = 1] = "VALUE";
        KeyframeValueFlagMask[KeyframeValueFlagMask["INTERPOLATION_MODE"] = 2] = "INTERPOLATION_MODE";
        KeyframeValueFlagMask[KeyframeValueFlagMask["TANGENT_WEIGHT_MODE"] = 4] = "TANGENT_WEIGHT_MODE";
        KeyframeValueFlagMask[KeyframeValueFlagMask["LEFT_TANGENT"] = 8] = "LEFT_TANGENT";
        KeyframeValueFlagMask[KeyframeValueFlagMask["LEFT_TANGENT_WEIGHT"] = 16] = "LEFT_TANGENT_WEIGHT";
        KeyframeValueFlagMask[KeyframeValueFlagMask["RIGHT_TANGENT"] = 32] = "RIGHT_TANGENT";
        KeyframeValueFlagMask[KeyframeValueFlagMask["RIGHT_TANGENT_WEIGHT"] = 64] = "RIGHT_TANGENT_WEIGHT";
      })(KeyframeValueFlagMask || (KeyframeValueFlagMask = {}));

      OVERFLOW_BYTES = 1;
      FRAME_COUNT_BYTES = 4;
      TIME_BYTES = 4;
      KEY_FRAME_VALUE_FLAGS_BYTES = 4;
      VALUE_BYTES = 4;
      INTERPOLATION_MODE_BYTES = 1;
      TANGENT_WEIGHT_MODE_BYTES = 1;
      LEFT_TANGENT_BYTES = 4;
      LEFT_TANGENT_WEIGHT_BYTES = 4;
      RIGHT_TANGENT_BYTES = 4;
      RIGHT_TANGENT_WEIGHT_BYTES = 4;
      _createRealKeyframeVa = createRealKeyframeValue({});
      DEFAULT_INTERPOLATION_MODE = _createRealKeyframeVa.interpolationMode;
      DEFAULT_TANGENT_WEIGHT_MODE = _createRealKeyframeVa.tangentWeightMode;
      DEFAULT_LEFT_TANGENT = _createRealKeyframeVa.leftTangent;
      DEFAULT_LEFT_TANGENT_WEIGHT = _createRealKeyframeVa.leftTangentWeight;
      DEFAULT_RIGHT_TANGENT = _createRealKeyframeVa.rightTangent;
      DEFAULT_RIGHT_TANGENT_WEIGHT = _createRealKeyframeVa.rightTangentWeight;
      REAL_KEY_FRAME_VALUE_MAX_SIZE = KEY_FRAME_VALUE_FLAGS_BYTES + VALUE_BYTES + INTERPOLATION_MODE_BYTES + TANGENT_WEIGHT_MODE_BYTES + LEFT_TANGENT_BYTES + LEFT_TANGENT_WEIGHT_BYTES + RIGHT_TANGENT_BYTES + RIGHT_TANGENT_WEIGHT_BYTES + 0;
    }
  };
});
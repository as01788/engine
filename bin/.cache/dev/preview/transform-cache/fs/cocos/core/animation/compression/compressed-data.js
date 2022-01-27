System.register("q-bundled:///fs/cocos/core/animation/compression/compressed-data.js", ["../../curves/keys-shared-curves.js", "../../data/decorators/index.js", "../../math/index.js", "../define.js", "../tracks/track.js"], function (_export, _context) {
  "use strict";

  var KeySharedQuatCurves, KeySharedRealCurves, ccclass, serializable, Quat, Vec2, Vec3, Vec4, CLASS_NAME_PREFIX_ANIM, trackBindingTag, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, CompressedData, CompressedDataEvaluator, CompressedDataTrackType;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_curvesKeysSharedCurvesJs) {
      KeySharedQuatCurves = _curvesKeysSharedCurvesJs.KeySharedQuatCurves;
      KeySharedRealCurves = _curvesKeysSharedCurvesJs.KeySharedRealCurves;
    }, function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_mathIndexJs) {
      Quat = _mathIndexJs.Quat;
      Vec2 = _mathIndexJs.Vec2;
      Vec3 = _mathIndexJs.Vec3;
      Vec4 = _mathIndexJs.Vec4;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_tracksTrackJs) {
      trackBindingTag = _tracksTrackJs.trackBindingTag;
    }],
    execute: function () {
      _export("CompressedData", CompressedData = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "CompressedData"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function CompressedData() {
          _initializerDefineProperty(this, "_curves", _descriptor, this);

          _initializerDefineProperty(this, "_tracks", _descriptor2, this);

          _initializerDefineProperty(this, "_quatCurves", _descriptor3, this);

          _initializerDefineProperty(this, "_quatTracks", _descriptor4, this);
        }

        var _proto = CompressedData.prototype;

        _proto.compressRealTrack = function compressRealTrack(track) {
          var curve = track.channel.curve;
          var mayBeCompressed = KeySharedRealCurves.allowedForCurve(curve);

          if (!mayBeCompressed) {
            return false;
          }

          this._tracks.push({
            type: CompressedDataTrackType.FLOAT,
            binding: track[trackBindingTag],
            components: [this._addRealCurve(curve)]
          });

          return true;
        };

        _proto.compressVectorTrack = function compressVectorTrack(vectorTrack) {
          var nComponents = vectorTrack.componentsCount;
          var channels = vectorTrack.channels();
          var mayBeCompressed = channels.every(function (_ref) {
            var curve = _ref.curve;
            return KeySharedRealCurves.allowedForCurve(curve);
          });

          if (!mayBeCompressed) {
            return false;
          }

          var components = new Array(nComponents);

          for (var i = 0; i < nComponents; ++i) {
            var channel = channels[i];
            components[i] = this._addRealCurve(channel.curve);
          }

          this._tracks.push({
            type: nComponents === 2 ? CompressedDataTrackType.VEC2 : nComponents === 3 ? CompressedDataTrackType.VEC3 : CompressedDataTrackType.VEC4,
            binding: vectorTrack[trackBindingTag],
            components: components
          });

          return true;
        };

        _proto.compressQuatTrack = function compressQuatTrack(track) {
          var curve = track.channel.curve;
          var mayBeCompressed = KeySharedQuatCurves.allowedForCurve(curve);

          if (!mayBeCompressed) {
            return false;
          }

          this._quatTracks.push({
            binding: track[trackBindingTag],
            pointer: this._addQuatCurve(curve)
          });

          return true;
        };

        _proto.createEval = function createEval(binder) {
          var compressedDataEvalStatus = {
            keySharedCurvesEvalStatuses: [],
            trackEvalStatuses: [],
            keysSharedQuatCurvesEvalStatues: [],
            quatTrackEvalStatuses: []
          };
          var keySharedCurvesEvalStatuses = compressedDataEvalStatus.keySharedCurvesEvalStatuses,
              trackEvalStatuses = compressedDataEvalStatus.trackEvalStatuses,
              keysSharedQuatCurvesEvalStatues = compressedDataEvalStatus.keysSharedQuatCurvesEvalStatues,
              quatTrackEvalStatuses = compressedDataEvalStatus.quatTrackEvalStatuses;

          for (var _iterator = _createForOfIteratorHelperLoose(this._curves), _step; !(_step = _iterator()).done;) {
            var curves = _step.value;
            keySharedCurvesEvalStatuses.push({
              curves: curves,
              result: new Array(curves.curveCount).fill(0.0)
            });
          }

          for (var _iterator2 = _createForOfIteratorHelperLoose(this._tracks), _step2; !(_step2 = _iterator2()).done;) {
            var track = _step2.value;
            var trackTarget = binder(track.binding);

            if (!trackTarget) {
              continue;
            }

            var immediate = void 0;

            switch (track.type) {
              default:
              case CompressedDataTrackType.FLOAT:
                break;

              case CompressedDataTrackType.VEC2:
                immediate = new Vec2();
                break;

              case CompressedDataTrackType.VEC3:
                immediate = new Vec3();
                break;

              case CompressedDataTrackType.VEC4:
                immediate = new Vec4();
                break;
            }

            trackEvalStatuses.push({
              type: track.type,
              target: trackTarget,
              curves: track.components,
              immediate: immediate
            });
          }

          for (var _iterator3 = _createForOfIteratorHelperLoose(this._quatCurves), _step3; !(_step3 = _iterator3()).done;) {
            var _curves = _step3.value;
            keysSharedQuatCurvesEvalStatues.push({
              curves: _curves,
              result: Array.from({
                length: _curves.curveCount
              }, function () {
                return new Quat();
              })
            });
          }

          for (var _iterator4 = _createForOfIteratorHelperLoose(this._quatTracks), _step4; !(_step4 = _iterator4()).done;) {
            var _track = _step4.value;

            var _trackTarget = binder(_track.binding);

            if (!_trackTarget) {
              continue;
            }

            quatTrackEvalStatuses.push({
              target: _trackTarget,
              curve: _track.pointer
            });
          }

          return new CompressedDataEvaluator(compressedDataEvalStatus);
        };

        _proto.collectAnimatedJoints = function collectAnimatedJoints() {
          var joints = [];

          for (var _iterator5 = _createForOfIteratorHelperLoose(this._tracks), _step5; !(_step5 = _iterator5()).done;) {
            var track = _step5.value;
            var trsPath = track.binding.parseTrsPath();

            if (trsPath) {
              joints.push(trsPath.node);
            }
          }

          return joints;
        };

        _proto._addRealCurve = function _addRealCurve(curve) {
          var times = Array.from(curve.times());

          var iKeySharedCurves = this._curves.findIndex(function (shared) {
            return shared.matchCurve(curve);
          });

          if (iKeySharedCurves < 0) {
            iKeySharedCurves = this._curves.length;
            var keySharedCurves = new KeySharedRealCurves(times);

            this._curves.push(keySharedCurves);
          }

          var iCurve = this._curves[iKeySharedCurves].curveCount;

          this._curves[iKeySharedCurves].addCurve(curve);

          return {
            shared: iKeySharedCurves,
            component: iCurve
          };
        };

        _proto._addQuatCurve = function _addQuatCurve(curve) {
          var times = Array.from(curve.times());

          var iKeySharedCurves = this._quatCurves.findIndex(function (shared) {
            return shared.matchCurve(curve);
          });

          if (iKeySharedCurves < 0) {
            iKeySharedCurves = this._quatCurves.length;
            var keySharedCurves = new KeySharedQuatCurves(times);

            this._quatCurves.push(keySharedCurves);
          }

          var iCurve = this._quatCurves[iKeySharedCurves].curveCount;

          this._quatCurves[iKeySharedCurves].addCurve(curve);

          return {
            shared: iKeySharedCurves,
            curve: iCurve
          };
        };

        _proto.validate = function validate() {
          return this._tracks.length > 0;
        };

        return CompressedData;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_curves", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_tracks", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_quatCurves", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_quatTracks", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      _export("CompressedDataEvaluator", CompressedDataEvaluator = /*#__PURE__*/function () {
        function CompressedDataEvaluator(compressedDataEvalStatus) {
          this._compressedDataEvalStatus = void 0;
          this._compressedDataEvalStatus = compressedDataEvalStatus;
        }

        var _proto2 = CompressedDataEvaluator.prototype;

        _proto2.evaluate = function evaluate(time) {
          var _this$_compressedData = this._compressedDataEvalStatus,
              keySharedCurvesEvalStatuses = _this$_compressedData.keySharedCurvesEvalStatuses,
              compressedTrackEvalStatuses = _this$_compressedData.trackEvalStatuses,
              keysSharedQuatCurvesEvalStatues = _this$_compressedData.keysSharedQuatCurvesEvalStatues,
              quatTrackEvalStatuses = _this$_compressedData.quatTrackEvalStatuses;

          var getPreEvaluated = function getPreEvaluated(pointer) {
            return keySharedCurvesEvalStatuses[pointer.shared].result[pointer.component];
          };

          for (var _iterator6 = _createForOfIteratorHelperLoose(keySharedCurvesEvalStatuses), _step6; !(_step6 = _iterator6()).done;) {
            var _step6$value = _step6.value,
                curves = _step6$value.curves,
                result = _step6$value.result;
            curves.evaluate(time, result);
          }

          for (var _iterator7 = _createForOfIteratorHelperLoose(compressedTrackEvalStatuses), _step7; !(_step7 = _iterator7()).done;) {
            var _step7$value = _step7.value,
                type = _step7$value.type,
                target = _step7$value.target,
                immediate = _step7$value.immediate,
                _curves2 = _step7$value.curves;
            var value = immediate;

            switch (type) {
              default:
                break;

              case CompressedDataTrackType.FLOAT:
                value = getPreEvaluated(_curves2[0]);
                break;

              case CompressedDataTrackType.VEC2:
                Vec2.set(value, getPreEvaluated(_curves2[0]), getPreEvaluated(_curves2[1]));
                break;

              case CompressedDataTrackType.VEC3:
                Vec3.set(value, getPreEvaluated(_curves2[0]), getPreEvaluated(_curves2[1]), getPreEvaluated(_curves2[2]));
                break;

              case CompressedDataTrackType.VEC4:
                Vec4.set(value, getPreEvaluated(_curves2[0]), getPreEvaluated(_curves2[1]), getPreEvaluated(_curves2[2]), getPreEvaluated(_curves2[4]));
                break;
            }

            target.setValue(value);
          }

          for (var _iterator8 = _createForOfIteratorHelperLoose(keysSharedQuatCurvesEvalStatues), _step8; !(_step8 = _iterator8()).done;) {
            var _step8$value = _step8.value,
                _curves3 = _step8$value.curves,
                _result = _step8$value.result;

            _curves3.evaluate(time, _result);
          }

          for (var _iterator9 = _createForOfIteratorHelperLoose(quatTrackEvalStatuses), _step9; !(_step9 = _iterator9()).done;) {
            var _step9$value = _step9.value,
                _target = _step9$value.target,
                curve = _step9$value.curve;

            _target.setValue(keysSharedQuatCurvesEvalStatues[curve.shared].result[curve.curve]);
          }
        };

        return CompressedDataEvaluator;
      }());

      (function (CompressedDataTrackType) {
        CompressedDataTrackType[CompressedDataTrackType["FLOAT"] = 0] = "FLOAT";
        CompressedDataTrackType[CompressedDataTrackType["VEC2"] = 1] = "VEC2";
        CompressedDataTrackType[CompressedDataTrackType["VEC3"] = 2] = "VEC3";
        CompressedDataTrackType[CompressedDataTrackType["VEC4"] = 3] = "VEC4";
      })(CompressedDataTrackType || (CompressedDataTrackType = {}));
    }
  };
});
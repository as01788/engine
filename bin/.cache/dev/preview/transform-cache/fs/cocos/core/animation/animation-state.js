System.register("q-bundled:///fs/cocos/core/animation/animation-state.js", ["../../../../virtual/internal%253Aconstants.js", "./playable.js", "./types.js", "../global-exports.js", "../value-types/enum.js", "../data/utils/asserts.js", "../platform/debug.js", "./pose-output.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Playable, WrapMode, WrapModeMask, WrappedInfo, legacyCC, ccenum, assertIsTrue, debug, PoseOutput, EventType, AnimationState;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  _export("EventType", void 0);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_playableJs) {
      Playable = _playableJs.Playable;
    }, function (_typesJs) {
      WrapMode = _typesJs.WrapMode;
      WrapModeMask = _typesJs.WrapModeMask;
      WrappedInfo = _typesJs.WrappedInfo;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_valueTypesEnumJs) {
      ccenum = _valueTypesEnumJs.ccenum;
    }, function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }, function (_platformDebugJs) {
      debug = _platformDebugJs.debug;
    }, function (_poseOutputJs) {
      PoseOutput = _poseOutputJs.PoseOutput;
    }],
    execute: function () {
      (function (EventType) {
        EventType["PLAY"] = "play";
        EventType["STOP"] = "stop";
        EventType["PAUSE"] = "pause";
        EventType["RESUME"] = "resume";
        EventType["LASTFRAME"] = "lastframe";
        EventType["FINISHED"] = "finished";
      })(EventType || _export("EventType", EventType = {}));

      ccenum(EventType);
      /**
       * @en
       * The AnimationState gives full control over animation playback process.
       * In most cases the Animation Component is sufficient and easier to use. Use the AnimationState if you need full control.
       * @zh
       * AnimationState 完全控制动画播放过程。<br/>
       * 大多数情况下 动画组件 是足够和易于使用的。如果您需要更多的动画控制接口，请使用 AnimationState。
       *
       */

      _export("AnimationState", AnimationState = /*#__PURE__*/function (_Playable) {
        _inheritsLoose(AnimationState, _Playable);

        function AnimationState(clip, name) {
          var _this;

          if (name === void 0) {
            name = '';
          }

          _this = _Playable.call(this) || this;
          _this.duration = 1.0;
          _this.speed = 1.0;
          _this.time = 0.0;
          _this.frameRate = 0;
          _this._targetNode = null;
          _this._curveLoaded = false;
          _this._clip = void 0;
          _this._useSimpleProcess = false;
          _this._target = null;
          _this._wrapMode = WrapMode.Normal;
          _this._repeatCount = 1;
          _this._delay = 0.0;
          _this._delayTime = 0.0;
          _this._currentFramePlayed = false;
          _this._name = void 0;
          _this._lastIterations = NaN;
          _this._lastWrapInfo = null;
          _this._wrappedInfo = new WrappedInfo();
          _this._allowLastFrame = false;
          _this._blendStateWriterHost = {
            weight: 0.0
          };
          _this._playbackDuration = 0.0;
          _this._invDuration = 1.0;
          _this._poseOutput = null;
          _this._weight = 0.0;
          _this._clipEval = void 0;
          _this._clipEventEval = void 0;
          _this._doNotCreateEval = false;
          _this._clip = clip;
          _this._name = name || clip && clip.name;
          _this._playbackRange = {
            min: 0.0,
            max: clip.duration
          };
          _this._playbackDuration = clip.duration;

          if (!clip.duration) {
            debug("Clip " + clip.name + " has zero duration.");
          }

          return _this;
        }
        /**
         * This method is used for internal purpose only.
         */


        var _proto = AnimationState.prototype;

        _proto.initialize = function initialize(root, blendStateBuffer, mask) {
          if (this._curveLoaded) {
            return;
          }

          this._curveLoaded = true;

          if (this._poseOutput) {
            this._poseOutput.destroy();

            this._poseOutput = null;
          }

          if (this._clipEval) {
            // TODO: destroy?
            this._clipEval = undefined;
          }

          this._targetNode = root;
          var clip = this._clip;
          this.duration = clip.duration;
          this._invDuration = 1.0 / this.duration;
          this.speed = clip.speed;
          this.wrapMode = clip.wrapMode;
          this.frameRate = clip.sample;
          this._playbackRange.min = 0.0;
          this._playbackRange.max = clip.duration;
          this._playbackDuration = clip.duration;

          if ((this.wrapMode & WrapModeMask.Loop) === WrapModeMask.Loop) {
            this.repeatCount = Infinity;
          } else {
            this.repeatCount = 1;
          }

          if (!this._doNotCreateEval) {
            var _ref, _legacyCC$director$ge, _this$_poseOutput;

            var pose = (_ref = blendStateBuffer !== null && blendStateBuffer !== void 0 ? blendStateBuffer : (_legacyCC$director$ge = legacyCC.director.getAnimationManager()) === null || _legacyCC$director$ge === void 0 ? void 0 : _legacyCC$director$ge.blendState) !== null && _ref !== void 0 ? _ref : null;

            if (pose) {
              this._poseOutput = new PoseOutput(pose);
            }

            this._clipEval = clip.createEvaluator({
              target: root,
              pose: (_this$_poseOutput = this._poseOutput) !== null && _this$_poseOutput !== void 0 ? _this$_poseOutput : undefined
            });
          }

          if (!(EDITOR && !legacyCC.GAME_VIEW)) {
            this._clipEventEval = clip.createEventEvaluator(this._targetNode);
          }
        };

        _proto.destroy = function destroy() {
          if (!this.isMotionless) {
            legacyCC.director.getAnimationManager().removeAnimation(this);
          }

          if (this._poseOutput) {
            this._poseOutput.destroy();

            this._poseOutput = null;
          } // TODO: destroy?


          this._clipEval = undefined;
        }
        /**
         * @deprecated Since V1.1.1, animation states were no longer defined as event targets.
         * To process animation events, use `Animation` instead.
         */
        ;

        _proto.emit = function emit() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          legacyCC.director.getAnimationManager().pushDelayEvent(this._emit, this, args);
        }
        /**
         * @deprecated Since V1.1.1, animation states were no longer defined as event targets.
         * To process animation events, use `Animation` instead.
         */
        // eslint-disable-next-line @typescript-eslint/ban-types
        ;

        _proto.on = function on(type, callback, target) {
          if (this._target && this._target.isValid) {
            return this._target.on(type, callback, target);
          } else {
            return null;
          }
        }
        /**
         * @deprecated Since V1.1.1, animation states were no longer defined as event targets.
         * To process animation events, use `Animation` instead.
         */
        // eslint-disable-next-line @typescript-eslint/ban-types
        ;

        _proto.once = function once(type, callback, target) {
          if (this._target && this._target.isValid) {
            return this._target.once(type, callback, target);
          } else {
            return null;
          }
        }
        /**
         * @deprecated Since V1.1.1, animation states were no longer defined as event targets.
         * To process animation events, use `Animation` instead.
         */
        // eslint-disable-next-line @typescript-eslint/ban-types
        ;

        _proto.off = function off(type, callback, target) {
          if (this._target && this._target.isValid) {
            this._target.off(type, callback, target);
          }
        }
        /**
         * @zh
         * 是否允许触发 `LastFrame` 事件。
         * 该方法仅用作内部用途。
         * @en
         * Whether `LastFrame` should be triggered.
         * @param allowed True if the last frame events may be triggered.
         * This method is only used for internal purpose only.
         */
        ;

        _proto.allowLastFrameEvent = function allowLastFrameEvent(allowed) {
          this._allowLastFrame = allowed;
        }
        /**
         * This method is used for internal purpose only.
         */
        ;

        _proto._setEventTarget = function _setEventTarget(target) {
          this._target = target;
        };

        _proto.setTime = function setTime(time) {
          this._currentFramePlayed = false;
          this.time = time || 0.0;

          if (!EDITOR || legacyCC.GAME_VIEW) {
            var _this$_clipEventEval;

            var info = this.getWrappedInfo(time, this._wrappedInfo);
            (_this$_clipEventEval = this._clipEventEval) === null || _this$_clipEventEval === void 0 ? void 0 : _this$_clipEventEval.ignore(info.ratio, info.direction);
          }
        };

        _proto.update = function update(delta) {
          // calculate delay time
          if (this._delayTime > 0.0) {
            this._delayTime -= delta;

            if (this._delayTime > 0.0) {
              // still waiting
              return;
            }
          } // make first frame perfect
          // var playPerfectFirstFrame = (this.time === 0);


          if (this._currentFramePlayed) {
            this.time += delta * this.speed;
          } else {
            this._currentFramePlayed = true;
          }

          this._process();
        };

        _proto.sample = function sample() {
          var info = this.getWrappedInfo(this.time, this._wrappedInfo);

          this._sampleCurves(info.time);

          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._sampleEvents(info);
          }

          return info;
        };

        _proto.onPlay = function onPlay() {
          this.setTime(this._getPlaybackStart());
          this._delayTime = this._delay;

          this._onReplayOrResume();

          this.emit(EventType.PLAY, this);
        };

        _proto.onStop = function onStop() {
          if (!this.isPaused) {
            this._onPauseOrStop();
          }

          this.emit(EventType.STOP, this);
        };

        _proto.onResume = function onResume() {
          this._onReplayOrResume();

          this.emit(EventType.RESUME, this);
        };

        _proto.onPause = function onPause() {
          this._onPauseOrStop();

          this.emit(EventType.PAUSE, this);
        };

        _proto._sampleCurves = function _sampleCurves(time) {
          var poseOutput = this._poseOutput,
              clipEval = this._clipEval;

          if (poseOutput) {
            poseOutput.weight = this.weight;
          }

          if (clipEval) {
            clipEval.evaluate(time);
          }
        };

        _proto._process = function _process() {
          if (this._useSimpleProcess) {
            this.simpleProcess();
          } else {
            this.process();
          }
        };

        _proto.process = function process() {
          // sample
          var info = this.sample();

          if (this._allowLastFrame) {
            var lastInfo;

            if (!this._lastWrapInfo) {
              lastInfo = this._lastWrapInfo = new WrappedInfo(info);
            } else {
              lastInfo = this._lastWrapInfo;
            }

            if (this.repeatCount > 1 && (info.iterations | 0) > (lastInfo.iterations | 0)) {
              this.emit(EventType.LASTFRAME, this);
            }

            lastInfo.set(info);
          }

          if (info.stopped) {
            this.stop();
            this.emit(EventType.FINISHED, this);
          }
        };

        _proto.simpleProcess = function simpleProcess() {
          var playbackStart = this._playbackRange.min;
          var playbackDuration = this._playbackDuration;
          var time = this.time % playbackDuration;

          if (time < 0.0) {
            time += playbackDuration;
          }

          var realTime = playbackStart + time;
          var ratio = realTime * this._invDuration;

          this._sampleCurves(playbackStart + time);

          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._sampleEvents(this.getWrappedInfo(this.time, this._wrappedInfo));
          }

          if (this._allowLastFrame) {
            if (Number.isNaN(this._lastIterations)) {
              this._lastIterations = ratio;
            }

            if (this.time > 0 && this._lastIterations > ratio || this.time < 0 && this._lastIterations < ratio) {
              this.emit(EventType.LASTFRAME, this);
            }

            this._lastIterations = ratio;
          }
        };

        _proto._needReverse = function _needReverse(currentIterations) {
          var wrapMode = this.wrapMode;
          var needReverse = false;

          if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
            var isEnd = currentIterations - (currentIterations | 0) === 0;

            if (isEnd && currentIterations > 0) {
              currentIterations -= 1;
            }

            var isOddIteration = currentIterations & 1;

            if (isOddIteration) {
              needReverse = !needReverse;
            }
          }

          if ((wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse) {
            needReverse = !needReverse;
          }

          return needReverse;
        };

        _proto.getWrappedInfo = function getWrappedInfo(time, info) {
          info = info || new WrappedInfo();

          var playbackStart = this._getPlaybackStart();

          var playbackEnd = this._getPlaybackEnd();

          var playbackDuration = playbackEnd - playbackStart;
          var stopped = false;
          var repeatCount = this.repeatCount;
          time -= playbackStart;
          var currentIterations = time > 0 ? time / playbackDuration : -(time / playbackDuration);

          if (currentIterations >= repeatCount) {
            currentIterations = repeatCount;
            stopped = true;
            var tempRatio = repeatCount - (repeatCount | 0);

            if (tempRatio === 0) {
              tempRatio = 1; // 如果播放过，动画不复位
            }

            time = tempRatio * playbackDuration * (time > 0 ? 1 : -1);
          }

          if (time > playbackDuration) {
            var tempTime = time % playbackDuration;
            time = tempTime === 0 ? playbackDuration : tempTime;
          } else if (time < 0) {
            time %= playbackDuration;

            if (time !== 0) {
              time += playbackDuration;
            }
          }

          var needReverse = false;
          var shouldWrap = this._wrapMode & WrapModeMask.ShouldWrap;

          if (shouldWrap) {
            needReverse = this._needReverse(currentIterations);
          }

          var direction = needReverse ? -1 : 1;

          if (this.speed < 0) {
            direction *= -1;
          } // calculate wrapped time


          if (shouldWrap && needReverse) {
            time = playbackDuration - time;
          }

          info.time = playbackStart + time;
          info.ratio = info.time / this.duration;
          info.direction = direction;
          info.stopped = stopped;
          info.iterations = currentIterations;
          return info;
        };

        _proto._getPlaybackStart = function _getPlaybackStart() {
          return this._playbackRange.min;
        };

        _proto._getPlaybackEnd = function _getPlaybackEnd() {
          return this._playbackRange.max;
        };

        _proto._sampleEvents = function _sampleEvents(wrapInfo) {
          var _this$_clipEventEval2;

          (_this$_clipEventEval2 = this._clipEventEval) === null || _this$_clipEventEval2 === void 0 ? void 0 : _this$_clipEventEval2.sample(wrapInfo.ratio, wrapInfo.direction, wrapInfo.iterations);
        };

        _proto._emit = function _emit(type, state) {
          if (this._target && this._target.isValid) {
            this._target.emit(type, type, state);
          }
        };

        _proto._onReplayOrResume = function _onReplayOrResume() {
          legacyCC.director.getAnimationManager().addAnimation(this);
        };

        _proto._onPauseOrStop = function _onPauseOrStop() {
          legacyCC.director.getAnimationManager().removeAnimation(this);
        };

        _createClass(AnimationState, [{
          key: "clip",
          get:
          /**
           * @en The clip that is being played by this animation state.
           * @zh 此动画状态正在播放的剪辑。
           */
          function get() {
            return this._clip;
          }
          /**
           * @en The name of the playing animation.
           * @zh 动画的名字。
           */

        }, {
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "length",
          get: function get() {
            return this.duration;
          }
          /**
           * @en
           * Wrapping mode of the playing animation.
           * Notice : dynamic change wrapMode will reset time and repeatCount property
           * @zh
           * 动画循环方式。
           * 需要注意的是，动态修改 wrapMode 时，会重置 time 以及 repeatCount。
           * @default: WrapMode.Normal
           */

        }, {
          key: "wrapMode",
          get: function get() {
            return this._wrapMode;
          },
          set: function set(value) {
            var _this$_clipEventEval3;

            this._wrapMode = value; // dynamic change wrapMode will need reset time to 0

            this.time = 0;

            if (value & WrapModeMask.Loop) {
              this.repeatCount = Infinity;
            } else {
              this.repeatCount = 1;
            }

            (_this$_clipEventEval3 = this._clipEventEval) === null || _this$_clipEventEval3 === void 0 ? void 0 : _this$_clipEventEval3.setWrapMode(value);
          }
          /**
           * @en The animation's iteration count property.
           *
           * A real number greater than or equal to zero (including positive infinity) representing the number of times
           * to repeat the animation node.
           *
           * Values less than zero and NaN values are treated as the value 1.0 for the purpose of timing model
           * calculations.
           *
           * @zh 迭代次数，指动画播放多少次后结束, normalize time。 如 2.5（2次半）。
           *
           * @default 1
           */

        }, {
          key: "repeatCount",
          get: function get() {
            return this._repeatCount;
          },
          set: function set(value) {
            this._repeatCount = value;
            var shouldWrap = this._wrapMode & WrapModeMask.ShouldWrap;
            var reverse = (this.wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse;

            if (value === Infinity && !shouldWrap && !reverse) {
              this._useSimpleProcess = true;
            } else {
              this._useSimpleProcess = false;
            }
          }
          /**
           * @en The start delay which represents the number of seconds from an animation's start time to the start of
           * the active interval.
           * @zh 延迟多少秒播放。
           * @default 0
           */

        }, {
          key: "delay",
          get: function get() {
            return this._delay;
          },
          set: function set(value) {
            this._delayTime = this._delay = value;
          } // http://www.w3.org/TR/web-animations/#idl-def-AnimationTiming

          /**
           * @en The iteration duration of this animation in seconds. (length)
           * @zh 单次动画的持续时间，秒。（动画长度）
           * @readOnly
           */

        }, {
          key: "playbackRange",
          get:
          /**
           * @en
           * Gets or sets the playback range.
           * The `min` and `max` field of the range are measured in seconds.
           * While setting, the range object should be a valid range.
           * The actual playback range would be the inclusion of this field and [0, duration].
           * @zh
           * 获取或设置播放范围。
           * 范围的 `min`、`max` 字段都是以秒为单位的。
           * 设置时，应当指定一个有效的范围；实际的播放范围是该字段和 [0, 周期] 之间的交集。
           * 设置播放范围时将重置累计播放时间。
           */
          function get() {
            return this._playbackRange;
          },
          set: function set(value) {
            assertIsTrue(value.max > value.min);
            this._playbackRange.min = Math.max(value.min, 0);
            this._playbackRange.max = Math.min(value.max, this.duration);
            this._playbackDuration = this._playbackRange.max - this._playbackRange.min;
            this.setTime(0.0);
          }
          /**
           * @en The animation's playback speed. 1 is normal playback speed.
           * @zh 播放速率。
           * @default: 1.0
           */

        }, {
          key: "current",
          get:
          /**
           * @en Gets the time progress, in seconds.
           * @zh 获取动画的时间进度，单位为秒。
           */
          function get() {
            return this.getWrappedInfo(this.time).time;
          }
          /**
           * @en Gets the playback ratio.
           * @zh 获取动画播放的比例时间。
           */

        }, {
          key: "ratio",
          get: function get() {
            return this.current / this.duration;
          }
          /**
           * The weight.
           */

        }, {
          key: "weight",
          get: function get() {
            return this._weight;
          },
          set: function set(value) {
            this._weight = value;

            if (this._poseOutput) {
              this._poseOutput.weight = value;
            }
          }
        }, {
          key: "curveLoaded",
          get: function get() {
            return this._curveLoaded;
          }
        }]);

        return AnimationState;
      }(Playable));

      legacyCC.AnimationState = AnimationState;
    }
  };
});
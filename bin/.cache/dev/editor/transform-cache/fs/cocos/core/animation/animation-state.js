"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationState = exports.EventType = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _playable = require("./playable.js");

var _types = require("./types.js");

var _globalExports = require("../global-exports.js");

var _enum = require("../value-types/enum.js");

var _asserts = require("../data/utils/asserts.js");

var _debug = require("../platform/debug.js");

var _poseOutput = require("./pose-output.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
 * @module animation
 */

/**
 * @en The event type supported by Animation
 * @zh Animation 支持的事件类型。
 */
let EventType;
exports.EventType = EventType;

(function (EventType) {
  EventType["PLAY"] = "play";
  EventType["STOP"] = "stop";
  EventType["PAUSE"] = "pause";
  EventType["RESUME"] = "resume";
  EventType["LASTFRAME"] = "lastframe";
  EventType["FINISHED"] = "finished";
})(EventType || (exports.EventType = EventType = {}));

(0, _enum.ccenum)(EventType);
/**
 * @en
 * The AnimationState gives full control over animation playback process.
 * In most cases the Animation Component is sufficient and easier to use. Use the AnimationState if you need full control.
 * @zh
 * AnimationState 完全控制动画播放过程。<br/>
 * 大多数情况下 动画组件 是足够和易于使用的。如果您需要更多的动画控制接口，请使用 AnimationState。
 *
 */

class AnimationState extends _playable.Playable {
  /**
   * @en The clip that is being played by this animation state.
   * @zh 此动画状态正在播放的剪辑。
   */
  get clip() {
    return this._clip;
  }
  /**
   * @en The name of the playing animation.
   * @zh 动画的名字。
   */


  get name() {
    return this._name;
  }

  get length() {
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


  get wrapMode() {
    return this._wrapMode;
  }

  set wrapMode(value) {
    var _this$_clipEventEval;

    this._wrapMode = value; // dynamic change wrapMode will need reset time to 0

    this.time = 0;

    if (value & _types.WrapModeMask.Loop) {
      this.repeatCount = Infinity;
    } else {
      this.repeatCount = 1;
    }

    (_this$_clipEventEval = this._clipEventEval) === null || _this$_clipEventEval === void 0 ? void 0 : _this$_clipEventEval.setWrapMode(value);
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


  get repeatCount() {
    return this._repeatCount;
  }

  set repeatCount(value) {
    this._repeatCount = value;
    const shouldWrap = this._wrapMode & _types.WrapModeMask.ShouldWrap;
    const reverse = (this.wrapMode & _types.WrapModeMask.Reverse) === _types.WrapModeMask.Reverse;

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


  get delay() {
    return this._delay;
  }

  set delay(value) {
    this._delayTime = this._delay = value;
  } // http://www.w3.org/TR/web-animations/#idl-def-AnimationTiming

  /**
   * @en The iteration duration of this animation in seconds. (length)
   * @zh 单次动画的持续时间，秒。（动画长度）
   * @readOnly
   */


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
  get playbackRange() {
    return this._playbackRange;
  }

  set playbackRange(value) {
    (0, _asserts.assertIsTrue)(value.max > value.min);
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


  /**
   * @en Gets the time progress, in seconds.
   * @zh 获取动画的时间进度，单位为秒。
   */
  get current() {
    return this.getWrappedInfo(this.time).time;
  }
  /**
   * @en Gets the playback ratio.
   * @zh 获取动画播放的比例时间。
   */


  get ratio() {
    return this.current / this.duration;
  }
  /**
   * The weight.
   */


  get weight() {
    return this._weight;
  }

  set weight(value) {
    this._weight = value;

    if (this._poseOutput) {
      this._poseOutput.weight = value;
    }
  }

  constructor(clip, name = '') {
    super();
    this.duration = 1.0;
    this.speed = 1.0;
    this.time = 0.0;
    this.frameRate = 0;
    this._targetNode = null;
    this._curveLoaded = false;
    this._clip = void 0;
    this._useSimpleProcess = false;
    this._target = null;
    this._wrapMode = _types.WrapMode.Normal;
    this._repeatCount = 1;
    this._delay = 0.0;
    this._delayTime = 0.0;
    this._currentFramePlayed = false;
    this._name = void 0;
    this._lastIterations = NaN;
    this._lastWrapInfo = null;
    this._wrappedInfo = new _types.WrappedInfo();
    this._allowLastFrame = false;
    this._blendStateWriterHost = {
      weight: 0.0
    };
    this._playbackDuration = 0.0;
    this._invDuration = 1.0;
    this._poseOutput = null;
    this._weight = 0.0;
    this._clipEval = void 0;
    this._clipEventEval = void 0;
    this._doNotCreateEval = false;
    this._clip = clip;
    this._name = name || clip && clip.name;
    this._playbackRange = {
      min: 0.0,
      max: clip.duration
    };
    this._playbackDuration = clip.duration;

    if (!clip.duration) {
      (0, _debug.debug)(`Clip ${clip.name} has zero duration.`);
    }
  }
  /**
   * This method is used for internal purpose only.
   */


  get curveLoaded() {
    return this._curveLoaded;
  }

  initialize(root, blendStateBuffer, mask) {
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
    const clip = this._clip;
    this.duration = clip.duration;
    this._invDuration = 1.0 / this.duration;
    this.speed = clip.speed;
    this.wrapMode = clip.wrapMode;
    this.frameRate = clip.sample;
    this._playbackRange.min = 0.0;
    this._playbackRange.max = clip.duration;
    this._playbackDuration = clip.duration;

    if ((this.wrapMode & _types.WrapModeMask.Loop) === _types.WrapModeMask.Loop) {
      this.repeatCount = Infinity;
    } else {
      this.repeatCount = 1;
    }

    if (!this._doNotCreateEval) {
      var _ref, _legacyCC$director$ge, _this$_poseOutput;

      const pose = (_ref = blendStateBuffer !== null && blendStateBuffer !== void 0 ? blendStateBuffer : (_legacyCC$director$ge = _globalExports.legacyCC.director.getAnimationManager()) === null || _legacyCC$director$ge === void 0 ? void 0 : _legacyCC$director$ge.blendState) !== null && _ref !== void 0 ? _ref : null;

      if (pose) {
        this._poseOutput = new _poseOutput.PoseOutput(pose);
      }

      this._clipEval = clip.createEvaluator({
        target: root,
        pose: (_this$_poseOutput = this._poseOutput) !== null && _this$_poseOutput !== void 0 ? _this$_poseOutput : undefined
      });
    }

    if (!(_internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW)) {
      this._clipEventEval = clip.createEventEvaluator(this._targetNode);
    }
  }

  destroy() {
    if (!this.isMotionless) {
      _globalExports.legacyCC.director.getAnimationManager().removeAnimation(this);
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


  emit(...args) {
    _globalExports.legacyCC.director.getAnimationManager().pushDelayEvent(this._emit, this, args);
  }
  /**
   * @deprecated Since V1.1.1, animation states were no longer defined as event targets.
   * To process animation events, use `Animation` instead.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types


  on(type, callback, target) {
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


  once(type, callback, target) {
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


  off(type, callback, target) {
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


  allowLastFrameEvent(allowed) {
    this._allowLastFrame = allowed;
  }
  /**
   * This method is used for internal purpose only.
   */


  _setEventTarget(target) {
    this._target = target;
  }

  setTime(time) {
    this._currentFramePlayed = false;
    this.time = time || 0.0;

    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
      var _this$_clipEventEval2;

      const info = this.getWrappedInfo(time, this._wrappedInfo);
      (_this$_clipEventEval2 = this._clipEventEval) === null || _this$_clipEventEval2 === void 0 ? void 0 : _this$_clipEventEval2.ignore(info.ratio, info.direction);
    }
  }

  update(delta) {
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
  }

  sample() {
    const info = this.getWrappedInfo(this.time, this._wrappedInfo);

    this._sampleCurves(info.time);

    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
      this._sampleEvents(info);
    }

    return info;
  }

  onPlay() {
    this.setTime(this._getPlaybackStart());
    this._delayTime = this._delay;

    this._onReplayOrResume();

    this.emit(EventType.PLAY, this);
  }

  onStop() {
    if (!this.isPaused) {
      this._onPauseOrStop();
    }

    this.emit(EventType.STOP, this);
  }

  onResume() {
    this._onReplayOrResume();

    this.emit(EventType.RESUME, this);
  }

  onPause() {
    this._onPauseOrStop();

    this.emit(EventType.PAUSE, this);
  }

  _sampleCurves(time) {
    const {
      _poseOutput: poseOutput,
      _clipEval: clipEval
    } = this;

    if (poseOutput) {
      poseOutput.weight = this.weight;
    }

    if (clipEval) {
      clipEval.evaluate(time);
    }
  }

  _process() {
    if (this._useSimpleProcess) {
      this.simpleProcess();
    } else {
      this.process();
    }
  }

  process() {
    // sample
    const info = this.sample();

    if (this._allowLastFrame) {
      let lastInfo;

      if (!this._lastWrapInfo) {
        lastInfo = this._lastWrapInfo = new _types.WrappedInfo(info);
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
  }

  simpleProcess() {
    const playbackStart = this._playbackRange.min;
    const playbackDuration = this._playbackDuration;
    let time = this.time % playbackDuration;

    if (time < 0.0) {
      time += playbackDuration;
    }

    const realTime = playbackStart + time;
    const ratio = realTime * this._invDuration;

    this._sampleCurves(playbackStart + time);

    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
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
  }

  _needReverse(currentIterations) {
    const wrapMode = this.wrapMode;
    let needReverse = false;

    if ((wrapMode & _types.WrapModeMask.PingPong) === _types.WrapModeMask.PingPong) {
      const isEnd = currentIterations - (currentIterations | 0) === 0;

      if (isEnd && currentIterations > 0) {
        currentIterations -= 1;
      }

      const isOddIteration = currentIterations & 1;

      if (isOddIteration) {
        needReverse = !needReverse;
      }
    }

    if ((wrapMode & _types.WrapModeMask.Reverse) === _types.WrapModeMask.Reverse) {
      needReverse = !needReverse;
    }

    return needReverse;
  }

  getWrappedInfo(time, info) {
    info = info || new _types.WrappedInfo();

    const playbackStart = this._getPlaybackStart();

    const playbackEnd = this._getPlaybackEnd();

    const playbackDuration = playbackEnd - playbackStart;
    let stopped = false;
    const repeatCount = this.repeatCount;
    time -= playbackStart;
    let currentIterations = time > 0 ? time / playbackDuration : -(time / playbackDuration);

    if (currentIterations >= repeatCount) {
      currentIterations = repeatCount;
      stopped = true;
      let tempRatio = repeatCount - (repeatCount | 0);

      if (tempRatio === 0) {
        tempRatio = 1; // 如果播放过，动画不复位
      }

      time = tempRatio * playbackDuration * (time > 0 ? 1 : -1);
    }

    if (time > playbackDuration) {
      const tempTime = time % playbackDuration;
      time = tempTime === 0 ? playbackDuration : tempTime;
    } else if (time < 0) {
      time %= playbackDuration;

      if (time !== 0) {
        time += playbackDuration;
      }
    }

    let needReverse = false;
    const shouldWrap = this._wrapMode & _types.WrapModeMask.ShouldWrap;

    if (shouldWrap) {
      needReverse = this._needReverse(currentIterations);
    }

    let direction = needReverse ? -1 : 1;

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
  }

  _getPlaybackStart() {
    return this._playbackRange.min;
  }

  _getPlaybackEnd() {
    return this._playbackRange.max;
  }

  _sampleEvents(wrapInfo) {
    var _this$_clipEventEval3;

    (_this$_clipEventEval3 = this._clipEventEval) === null || _this$_clipEventEval3 === void 0 ? void 0 : _this$_clipEventEval3.sample(wrapInfo.ratio, wrapInfo.direction, wrapInfo.iterations);
  }

  _emit(type, state) {
    if (this._target && this._target.isValid) {
      this._target.emit(type, type, state);
    }
  }

  _onReplayOrResume() {
    _globalExports.legacyCC.director.getAnimationManager().addAnimation(this);
  }

  _onPauseOrStop() {
    _globalExports.legacyCC.director.getAnimationManager().removeAnimation(this);
  }

}

exports.AnimationState = AnimationState;
_globalExports.legacyCC.AnimationState = AnimationState;
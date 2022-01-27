"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioPlayerMinigame = exports.OneShotAudioMinigame = void 0;

var _minigame = require("pal/minigame");

var _systemInfo = require("pal/system-info");

var _index = require("../../../cocos/core/event/index.js");

var _type = require("../type.js");

var _index2 = require("../../../cocos/core/index.js");

var _operationQueue = require("../operation-queue.js");

var _audioTimer = _interopRequireDefault(require("../audio-timer.js"));

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

class OneShotAudioMinigame {
  get onPlay() {
    return this._onPlayCb;
  }

  set onPlay(cb) {
    this._onPlayCb = cb;
  }

  get onEnd() {
    return this._onEndCb;
  }

  set onEnd(cb) {
    this._onEndCb = cb;
  }

  constructor(nativeAudio, volume) {
    this._innerAudioContext = void 0;
    this._onPlayCb = void 0;
    this._onEndCb = void 0;
    this._innerAudioContext = nativeAudio;
    nativeAudio.volume = volume;
    nativeAudio.onPlay(() => {
      var _this$_onPlayCb;

      (_this$_onPlayCb = this._onPlayCb) === null || _this$_onPlayCb === void 0 ? void 0 : _this$_onPlayCb.call(this);
    });
    nativeAudio.onEnded(() => {
      var _this$_onEndCb;

      (_this$_onEndCb = this._onEndCb) === null || _this$_onEndCb === void 0 ? void 0 : _this$_onEndCb.call(this);
      nativeAudio.destroy();
    });
  }

  play() {
    this._innerAudioContext.play();
  }

  stop() {
    this._innerAudioContext.stop();
  }

}

exports.OneShotAudioMinigame = OneShotAudioMinigame;
let AudioPlayerMinigame = (_class = (_temp = class AudioPlayerMinigame {
  // NOTE: the implemented interface properties need to be public access
  constructor(innerAudioContext) {
    this._innerAudioContext = void 0;
    this._state = _type.AudioState.INIT;
    this._onPlay = void 0;
    this._onPause = void 0;
    this._onStop = void 0;
    this._onSeeked = void 0;
    this._onEnded = void 0;
    this._audioTimer = void 0;
    this._readyToHandleOnShow = false;
    this._eventTarget = new _index.EventTarget();
    this._operationQueue = [];
    this._innerAudioContext = innerAudioContext;
    this._audioTimer = new _audioTimer.default(innerAudioContext);
    this._eventTarget = new _index.EventTarget(); // event

    _systemInfo.systemInfo.on('hide', this._onHide, this);

    _systemInfo.systemInfo.on('show', this._onShow, this);

    const eventTarget = this._eventTarget;

    this._onPlay = () => {
      this._state = _type.AudioState.PLAYING;
      eventTarget.emit(_type.AudioEvent.PLAYED);
    };

    innerAudioContext.onPlay(this._onPlay);

    this._onPause = () => {
      this._state = _type.AudioState.PAUSED;
      eventTarget.emit(_type.AudioEvent.PAUSED);
    };

    innerAudioContext.onPause(this._onPause);

    this._onStop = () => {
      this._state = _type.AudioState.STOPPED;
      eventTarget.emit(_type.AudioEvent.STOPPED);
    };

    innerAudioContext.onStop(this._onStop);

    this._onSeeked = () => {
      eventTarget.emit(_type.AudioEvent.SEEKED);
    };

    innerAudioContext.onSeeked(this._onSeeked);

    this._onEnded = () => {
      this._audioTimer.stop();

      this._state = _type.AudioState.INIT;
      eventTarget.emit(_type.AudioEvent.ENDED);
    };

    innerAudioContext.onEnded(this._onEnded);
  }

  destroy() {
    this._audioTimer.destroy();

    _systemInfo.systemInfo.off('hide', this._onHide, this);

    _systemInfo.systemInfo.off('show', this._onShow, this);

    if (this._innerAudioContext) {
      ['Play', 'Pause', 'Stop', 'Seeked', 'Ended'].forEach(event => {
        this._offEvent(event);
      });

      this._innerAudioContext.destroy(); // @ts-expect-error Type 'null' is not assignable to type 'InnerAudioContext'


      this._innerAudioContext = null;
    }
  }

  _onHide() {
    if (this._state === _type.AudioState.PLAYING) {
      this.pause().then(() => {
        this._state = _type.AudioState.INTERRUPTED;
        this._readyToHandleOnShow = true;

        this._eventTarget.emit(_type.AudioEvent.INTERRUPTION_BEGIN);
      }).catch(e => {});
    }
  }

  _onShow() {
    // We don't know whether onShow or resolve callback in pause promise is called at first.
    if (!this._readyToHandleOnShow) {
      this._eventTarget.once(_type.AudioEvent.INTERRUPTION_BEGIN, this._onShow, this);

      return;
    }

    if (this._state === _type.AudioState.INTERRUPTED) {
      this.play().then(() => {
        this._eventTarget.emit(_type.AudioEvent.INTERRUPTION_END);
      }).catch(e => {});
    }

    this._readyToHandleOnShow = false;
  }

  _offEvent(eventName) {
    if (this[`_on${eventName}`]) {
      this._innerAudioContext[`off${eventName}`](this[`_on${eventName}`]);

      this[`_on${eventName}`] = null;
    }
  }

  get src() {
    return this._innerAudioContext ? this._innerAudioContext.src : '';
  }

  get type() {
    return _type.AudioType.MINIGAME_AUDIO;
  }

  static load(url) {
    return new Promise(resolve => {
      AudioPlayerMinigame.loadNative(url).then(innerAudioContext => {
        resolve(new AudioPlayerMinigame(innerAudioContext));
      }).catch(e => {});
    });
  }

  static loadNative(url) {
    return new Promise((resolve, reject) => {
      const innerAudioContext = _minigame.minigame.createInnerAudioContext();

      const timer = setTimeout(() => {
        clearEvent();
        resolve(innerAudioContext);
      }, 8000);

      function clearEvent() {
        innerAudioContext.offCanplay(success);
        innerAudioContext.offError(fail);
      }

      function success() {
        clearEvent();
        clearTimeout(timer);
        resolve(innerAudioContext);
      }

      function fail(err) {
        clearEvent();
        clearTimeout(timer);
        console.error('failed to load innerAudioContext');
        reject(new Error(err));
      }

      innerAudioContext.onCanplay(success);
      innerAudioContext.onError(fail);
      innerAudioContext.src = url;
    });
  }

  static loadOneShotAudio(url, volume) {
    return new Promise((resolve, reject) => {
      AudioPlayerMinigame.loadNative(url).then(innerAudioContext => {
        // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
        resolve(new OneShotAudioMinigame(innerAudioContext, volume));
      }).catch(reject);
    });
  }

  get state() {
    return this._state;
  }

  get loop() {
    return this._innerAudioContext.loop;
  }

  set loop(val) {
    this._innerAudioContext.loop = val;
  }

  get volume() {
    return this._innerAudioContext.volume;
  }

  set volume(val) {
    val = (0, _index2.clamp01)(val);
    this._innerAudioContext.volume = val;
  }

  get duration() {
    return this._innerAudioContext.duration;
  }

  get currentTime() {
    // return this._innerAudioContext.currentTime;
    // currentTime doesn't work well
    // on Baidu: currentTime returns without numbers on decimal places
    // on WeChat iOS: we can't reset currentTime to 0 when stop audio
    return this._audioTimer ? this._audioTimer.currentTime : 0;
  }

  seek(time) {
    return new Promise(resolve => {
      time = (0, _index2.clamp)(time, 0, this.duration);

      this._eventTarget.once(_type.AudioEvent.SEEKED, resolve);

      this._innerAudioContext.seek(time);

      this._audioTimer.seek(time);
    });
  }

  play() {
    return new Promise(resolve => {
      this._eventTarget.once(_type.AudioEvent.PLAYED, resolve);

      this._innerAudioContext.play(); // NOTE: we can't initiate audio duration on constructor.
      // On WeChat platform, duration is 0 at the time audio is loaded.
      // On Native or Runtime platform, duration is 0 before playing.


      this._audioTimer.start();
    });
  }

  pause() {
    return new Promise(resolve => {
      this._eventTarget.once(_type.AudioEvent.PAUSED, resolve);

      this._innerAudioContext.pause();

      this._audioTimer.pause();
    });
  }

  stop() {
    return new Promise(resolve => {
      this._eventTarget.once(_type.AudioEvent.STOPPED, resolve);

      this._innerAudioContext.stop();

      this._audioTimer.stop();
    });
  }

  onInterruptionBegin(cb) {
    this._eventTarget.on(_type.AudioEvent.INTERRUPTION_BEGIN, cb);
  }

  offInterruptionBegin(cb) {
    this._eventTarget.off(_type.AudioEvent.INTERRUPTION_BEGIN, cb);
  }

  onInterruptionEnd(cb) {
    this._eventTarget.on(_type.AudioEvent.INTERRUPTION_END, cb);
  }

  offInterruptionEnd(cb) {
    this._eventTarget.off(_type.AudioEvent.INTERRUPTION_END, cb);
  }

  onEnded(cb) {
    this._eventTarget.on(_type.AudioEvent.ENDED, cb);
  }

  offEnded(cb) {
    this._eventTarget.off(_type.AudioEvent.ENDED, cb);
  }

}, _temp), (_applyDecoratedDescriptor(_class.prototype, "seek", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "seek"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "play", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pause", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "pause"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stop", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "stop"), _class.prototype)), _class);
exports.AudioPlayerMinigame = AudioPlayerMinigame;
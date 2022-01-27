"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioPlayer = exports.OneShotAudio = void 0;

var _systemInfo = require("pal/system-info");

var _type = require("../type.js");

var _index = require("../../../cocos/core/event/index.js");

var _globalExports = require("../../../cocos/core/global-exports.js");

var _index2 = require("../../../cocos/core/index.js");

var _operationQueue = require("../operation-queue.js");

var _index3 = require("../../system-info/enum-type/index.js");

var _class, _class2, _temp;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const urlCount = {};
const audioEngine = jsb.AudioEngine;
const INVALID_AUDIO_ID = -1;

class OneShotAudio {
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

  constructor(url, volume) {
    this._id = INVALID_AUDIO_ID;
    this._url = void 0;
    this._volume = void 0;
    this._onPlayCb = void 0;
    this._onEndCb = void 0;
    this._url = url;
    this._volume = volume;
  }

  play() {
    var _this$onPlay;

    this._id = jsb.AudioEngine.play2d(this._url, false, this._volume);
    jsb.AudioEngine.setFinishCallback(this._id, () => {
      var _this$onEnd;

      (_this$onEnd = this.onEnd) === null || _this$onEnd === void 0 ? void 0 : _this$onEnd.call(this);
    });
    (_this$onPlay = this.onPlay) === null || _this$onPlay === void 0 ? void 0 : _this$onPlay.call(this);
  }

  stop() {
    if (this._id === INVALID_AUDIO_ID) {
      return;
    }

    jsb.AudioEngine.stop(this._id);
  }

}

exports.OneShotAudio = OneShotAudio;
let AudioPlayer = (_class = (_temp = _class2 = class AudioPlayer {
  // NOTE: the implemented interface properties need to be public access
  // NOTE: we need to cache the state in case the audio id is invalid.
  constructor(url) {
    this._url = void 0;
    this._id = INVALID_AUDIO_ID;
    this._state = _type.AudioState.INIT;
    this._eventTarget = new _index.EventTarget();
    this._operationQueue = [];
    this._cachedState = {
      duration: 1,
      // wrong value before playing
      loop: false,
      currentTime: 0,
      volume: 1
    };
    this._url = url; // event

    _systemInfo.systemInfo.on('hide', this._onHide, this);

    _systemInfo.systemInfo.on('show', this._onShow, this);
  }

  destroy() {
    _systemInfo.systemInfo.on('hide', this._onHide, this);

    _systemInfo.systemInfo.on('show', this._onShow, this);

    if (--urlCount[this._url] <= 0) {
      audioEngine.uncache(this._url);
    }
  }

  _onHide() {
    if (this._state === _type.AudioState.PLAYING) {
      this.pause().then(() => {
        this._state = _type.AudioState.INTERRUPTED;

        this._eventTarget.emit(_type.AudioEvent.INTERRUPTION_BEGIN);
      }).catch(e => {});
    }
  }

  _onShow() {
    if (this._state === _type.AudioState.INTERRUPTED) {
      this.play().then(() => {
        this._eventTarget.emit(_type.AudioEvent.INTERRUPTION_END);
      }).catch(e => {});
    }
  }

  static load(url) {
    return new Promise((resolve, reject) => {
      AudioPlayer.loadNative(url).then(url => {
        resolve(new AudioPlayer(url));
      }).catch(err => reject(err));
    });
  }

  static loadNative(url) {
    return new Promise((resolve, reject) => {
      if (_systemInfo.systemInfo.platform === _index3.Platform.WIN32) {
        // NOTE: audioEngine.preload() not works well on Win32 platform.
        // Especially when there is not audio output device.
        resolve(url);
      } else {
        audioEngine.preload(url, isSuccess => {
          if (isSuccess) {
            resolve(url);
          } else {
            reject(new Error('load audio failed'));
          }
        });
      }
    });
  }

  static loadOneShotAudio(url, volume) {
    return new Promise((resolve, reject) => {
      AudioPlayer.loadNative(url).then(url => {
        // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
        resolve(new OneShotAudio(url, volume));
      }).catch(reject);
    });
  }

  get _isValid() {
    return this._id !== INVALID_AUDIO_ID;
  }

  get src() {
    return this._url;
  }

  get type() {
    return _type.AudioType.NATIVE_AUDIO;
  }

  get state() {
    return this._state;
  }

  get loop() {
    if (!this._isValid) {
      return this._cachedState.loop;
    }

    return audioEngine.isLoop(this._id);
  }

  set loop(val) {
    if (this._isValid) {
      audioEngine.setLoop(this._id, val);
    }

    this._cachedState.loop = val;
  }

  get volume() {
    if (!this._isValid) {
      return this._cachedState.volume;
    }

    return audioEngine.getVolume(this._id);
  }

  set volume(val) {
    val = (0, _index2.clamp01)(val);

    if (this._isValid) {
      audioEngine.setVolume(this._id, val);
    }

    this._cachedState.volume = val;
  }

  get duration() {
    if (!this._isValid) {
      return this._cachedState.duration;
    }

    return audioEngine.getDuration(this._id);
  }

  get currentTime() {
    if (!this._isValid) {
      return this._cachedState.currentTime;
    }

    return audioEngine.getCurrentTime(this._id);
  }

  seek(time) {
    return new Promise(resolve => {
      // Duration is invalid before player
      // time = clamp(time, 0, this.duration);
      if (this._isValid) {
        audioEngine.setCurrentTime(this._id, time);
      }

      this._cachedState.currentTime = time;
      return resolve();
    });
  }

  play() {
    return new Promise(resolve => {
      if (this._isValid) {
        if (this._state === _type.AudioState.PAUSED || this._state === _type.AudioState.INTERRUPTED) {
          audioEngine.resume(this._id);
        } else if (this._state === _type.AudioState.PLAYING) {
          audioEngine.pause(this._id);
          audioEngine.setCurrentTime(this._id, 0);
          audioEngine.resume(this._id);
        }
      } else {
        this._id = audioEngine.play2d(this._url, this._cachedState.loop, this._cachedState.volume);

        if (this._isValid) {
          if (this._cachedState.currentTime !== 0) {
            audioEngine.setCurrentTime(this._id, this._cachedState.currentTime);
            this._cachedState.currentTime = 0;
          }

          audioEngine.setFinishCallback(this._id, () => {
            this._cachedState.currentTime = 0;
            this._id = INVALID_AUDIO_ID;
            this._state = _type.AudioState.INIT;

            this._eventTarget.emit(_type.AudioEvent.ENDED);
          });
        }
      }

      this._state = _type.AudioState.PLAYING;
      resolve();
    });
  }

  pause() {
    return new Promise(resolve => {
      if (this._isValid) {
        audioEngine.pause(this._id);
      }

      this._state = _type.AudioState.PAUSED;
      resolve();
    });
  }

  stop() {
    return new Promise(resolve => {
      if (this._isValid) {
        audioEngine.stop(this._id);
      }

      this._state = _type.AudioState.STOPPED;
      this._id = INVALID_AUDIO_ID;
      this._cachedState.currentTime = 0;
      resolve();
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

}, _class2.maxAudioChannel = audioEngine.getMaxAudioInstance(), _temp), (_applyDecoratedDescriptor(_class.prototype, "seek", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "seek"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "play", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pause", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "pause"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stop", [_operationQueue.enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "stop"), _class.prototype)), _class); // REMOVE_ME

exports.AudioPlayer = AudioPlayer;
_globalExports.legacyCC.AudioPlayer = AudioPlayer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioPlayerWeb = exports.OneShotAudioWeb = void 0;

var _minigame = require("pal/minigame");

var _systemInfo = require("pal/system-info");

var _index = require("../../../cocos/core/index.js");

var _index2 = require("../../../cocos/core/event/index.js");

var _audioBufferManager = require("../audio-buffer-manager.js");

var _audioTimer = _interopRequireDefault(require("../audio-timer.js"));

var _operationQueue = require("../operation-queue.js");

var _type = require("../type.js");

var _minigame$tt, _minigame$tt$getAudio, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const audioContext = (_minigame$tt = _minigame.minigame.tt) === null || _minigame$tt === void 0 ? void 0 : (_minigame$tt$getAudio = _minigame$tt.getAudioContext) === null || _minigame$tt$getAudio === void 0 ? void 0 : _minigame$tt$getAudio.call(_minigame$tt);

class OneShotAudioWeb {
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

  constructor(audioBuffer, volume, url) {
    this._bufferSourceNode = void 0;
    this._onPlayCb = void 0;
    this._url = void 0;
    this._onEndCb = void 0;
    this._bufferSourceNode = audioContext.createBufferSource();
    this._bufferSourceNode.buffer = audioBuffer;
    this._bufferSourceNode.loop = false;
    this._url = url;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;

    this._bufferSourceNode.connect(gainNode);

    gainNode.connect(audioContext.destination);
  }

  play() {
    var _this$onPlay;

    this._bufferSourceNode.start();

    (_this$onPlay = this.onPlay) === null || _this$onPlay === void 0 ? void 0 : _this$onPlay.call(this);

    this._bufferSourceNode.onended = () => {
      var _this$_onEndCb;

      _audioBufferManager.audioBufferManager.tryReleasingCache(this._url);

      (_this$_onEndCb = this._onEndCb) === null || _this$_onEndCb === void 0 ? void 0 : _this$_onEndCb.call(this);
    };
  }

  stop() {
    this._bufferSourceNode.onended = null; // stop will call ended callback

    _audioBufferManager.audioBufferManager.tryReleasingCache(this._url);

    this._bufferSourceNode.stop();
  }

}

exports.OneShotAudioWeb = OneShotAudioWeb;
let AudioPlayerWeb = (_class = (_temp = class AudioPlayerWeb {
  // NOTE: the implemented interface properties need to be public access
  constructor(audioBuffer, url) {
    this._src = void 0;
    this._audioBuffer = void 0;
    this._sourceNode = void 0;
    this._gainNode = void 0;
    this._volume = 1;
    this._loop = false;
    this._state = _type.AudioState.INIT;
    this._audioTimer = void 0;
    this._readyToHandleOnShow = false;
    this._eventTarget = new _index2.EventTarget();
    this._operationQueue = [];
    this._audioBuffer = audioBuffer;
    this._audioTimer = new _audioTimer.default(audioBuffer);
    this._gainNode = audioContext.createGain();

    this._gainNode.connect(audioContext.destination);

    this._src = url; // event

    _systemInfo.systemInfo.on('hide', this._onHide, this);

    _systemInfo.systemInfo.on('show', this._onShow, this);
  }

  destroy() {
    this._audioTimer.destroy();

    if (this._audioBuffer) {
      // @ts-expect-error need to release AudioBuffer instance
      this._audioBuffer = null;
    }

    _audioBufferManager.audioBufferManager.tryReleasingCache(this._src);

    _systemInfo.systemInfo.off('hide', this._onHide, this);

    _systemInfo.systemInfo.off('show', this._onShow, this);
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

  static load(url) {
    return new Promise(resolve => {
      AudioPlayerWeb.loadNative(url).then(audioBuffer => {
        resolve(new AudioPlayerWeb(audioBuffer, url));
      }).catch(e => {});
    });
  }

  static loadNative(url) {
    return new Promise((resolve, reject) => {
      // NOTE: maybe url is a temp path, which is not reliable.
      // need to cache the decoded audio buffer.
      const cachedAudioBuffer = _audioBufferManager.audioBufferManager.getCache(url);

      if (cachedAudioBuffer) {
        _audioBufferManager.audioBufferManager.retainCache(url);

        resolve(cachedAudioBuffer);
        return;
      } // TODO: use pal/fs


      fsUtils.readArrayBuffer(url, (err, arrayBuffer) => {
        if (err) {
          reject(err);
          return;
        }

        audioContext.decodeAudioData(arrayBuffer).then(decodedAudioBuffer => {
          _audioBufferManager.audioBufferManager.addCache(url, decodedAudioBuffer);

          resolve(decodedAudioBuffer);
        }).catch(e => {});
      });
    });
  }

  static loadOneShotAudio(url, volume) {
    return new Promise((resolve, reject) => {
      AudioPlayerWeb.loadNative(url).then(audioBuffer => {
        // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
        const oneShotAudio = new OneShotAudioWeb(audioBuffer, volume, url);
        resolve(oneShotAudio);
      }).catch(reject);
    });
  }

  get src() {
    return this._src;
  }

  get type() {
    return _type.AudioType.WEB_AUDIO;
  }

  get state() {
    return this._state;
  }

  get loop() {
    return this._loop;
  }

  set loop(val) {
    this._loop = val;

    if (this._sourceNode) {
      this._sourceNode.loop = val;
    }
  }

  get volume() {
    return this._volume;
  }

  set volume(val) {
    val = (0, _index.clamp01)(val);
    this._volume = val;
    this._gainNode.gain.value = val;
  }

  get duration() {
    return this._audioBuffer.duration;
  }

  get currentTime() {
    return this._audioTimer.currentTime;
  }

  seek(time) {
    return new Promise(resolve => {
      this._audioTimer.seek(time);

      if (this._state === _type.AudioState.PLAYING) {
        // one AudioBufferSourceNode can't start twice
        // need to create a new one to start from the offset
        this._doPlay().then(resolve).catch(e => {});
      } else {
        resolve();
      }
    });
  }

  play() {
    return this._doPlay();
  } // The decorated play() method can't be call in seek()
  // so we define this method to ensure that the audio seeking works.


  _doPlay() {
    return new Promise(resolve => {
      // one AudioBufferSourceNode can't start twice
      this._stopSourceNode();

      this._sourceNode = audioContext.createBufferSource();
      this._sourceNode.buffer = this._audioBuffer;
      this._sourceNode.loop = this._loop;

      this._sourceNode.connect(this._gainNode);

      this._sourceNode.start(0, this._audioTimer.currentTime);

      this._state = _type.AudioState.PLAYING;

      this._audioTimer.start();

      this._sourceNode.onended = () => {
        this._audioTimer.stop();

        this._eventTarget.emit(_type.AudioEvent.ENDED);

        this._state = _type.AudioState.INIT;
      };

      resolve();
    });
  }

  _stopSourceNode() {
    try {
      if (this._sourceNode) {
        this._sourceNode.onended = null; // stop will call ended callback

        this._sourceNode.stop();
      }
    } catch (e) {// sourceNode can't be stopped twice, especially on Safari.
    }
  }

  pause() {
    if (this._state !== _type.AudioState.PLAYING || !this._sourceNode) {
      return Promise.resolve();
    }

    this._audioTimer.pause();

    this._state = _type.AudioState.PAUSED;

    this._stopSourceNode();

    return Promise.resolve();
  }

  stop() {
    if (!this._sourceNode) {
      return Promise.resolve();
    }

    this._audioTimer.stop();

    this._state = _type.AudioState.STOPPED;

    this._stopSourceNode();

    return Promise.resolve();
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
exports.AudioPlayerWeb = AudioPlayerWeb;
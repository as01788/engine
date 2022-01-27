"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioPlayerWeb = exports.OneShotAudioWeb = exports.AudioContextAgent = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _systemInfo = require("pal/system-info");

var _type = require("../type.js");

var _index = require("../../../cocos/core/event/index.js");

var _index2 = require("../../../cocos/core/index.js");

var _operationQueue = require("../operation-queue.js");

var _audioTimer = _interopRequireDefault(require("../audio-timer.js"));

var _audioBufferManager = require("../audio-buffer-manager.js");

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

// NOTE: fix CI
const AudioContextClass = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

class AudioContextAgent {
  constructor() {
    this._context = void 0;
    this._context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
  }

  get currentTime() {
    return this._context.currentTime;
  }

  decodeAudioData(audioData) {
    return new Promise(resolve => {
      const promise = this._context.decodeAudioData(audioData, audioBuffer => {
        resolve(audioBuffer);
      }, err => {
        // TODO: need to reject the error.
        console.error('failed to load Web Audio', err);
      });

      promise === null || promise === void 0 ? void 0 : promise.catch(e => {}); // Safari doesn't support the promise based decodeAudioData
    });
  }

  runContext() {
    return new Promise(resolve => {
      const context = this._context;

      if (!context.resume) {
        resolve();
        return;
      }

      if (context.state === 'running') {
        resolve();
        return;
      } // Force running audio context if state is not 'running', may be 'suspended' or 'interrupted'.


      const canvas = document.getElementById('GameCanvas');

      const onGesture = () => {
        context.resume().then(resolve).catch(e => {});
      };

      canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('touchend', onGesture, {
        once: true,
        capture: true
      });
      canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mouseup', onGesture, {
        once: true,
        capture: true
      });
    });
  }

  createBufferSource(audioBuffer, loop) {
    const sourceBufferNode = this._context.createBufferSource();

    if (audioBuffer !== undefined) {
      sourceBufferNode.buffer = audioBuffer;
    }

    if (loop !== undefined) {
      sourceBufferNode.loop = loop;
    }

    return sourceBufferNode;
  }

  createGain(volume = 1) {
    const gainNode = this._context.createGain();

    this.setGainValue(gainNode, volume);
    return gainNode;
  }

  setGainValue(gain, volume) {
    if (gain.gain.setTargetAtTime) {
      try {
        gain.gain.setTargetAtTime(volume, this._context.currentTime, 0);
      } catch (e) {
        // Some unknown browsers may crash if timeConstant is 0
        gain.gain.setTargetAtTime(volume, this._context.currentTime, 0.01);
      }
    } else {
      gain.gain.value = volume;
    }
  }

  connectContext(audioNode) {
    if (!this._context) {
      return;
    }

    audioNode.connect(this._context.destination);
  }

}

exports.AudioContextAgent = AudioContextAgent;
AudioContextAgent.support = !!AudioContextClass;
let audioContextAgent;

if (AudioContextAgent.support) {
  audioContextAgent = new AudioContextAgent();
}

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
    this._duration = void 0;
    this._bufferSourceNode = void 0;
    this._onPlayCb = void 0;
    this._currentTimer = 0;
    this._url = void 0;
    this._onEndCb = void 0;
    this._duration = audioBuffer.duration;
    this._url = url;
    this._bufferSourceNode = audioContextAgent.createBufferSource(audioBuffer, false);
    const gainNode = audioContextAgent.createGain(volume);

    this._bufferSourceNode.connect(gainNode);

    audioContextAgent.connectContext(gainNode);
  }

  play() {
    if (_internal253Aconstants.EDITOR) {
      return;
    }

    this._bufferSourceNode.start(); // audioContextAgent does exist


    audioContextAgent.runContext().then(() => {
      var _this$onPlay;

      (_this$onPlay = this.onPlay) === null || _this$onPlay === void 0 ? void 0 : _this$onPlay.call(this);
      this._currentTimer = window.setTimeout(() => {
        var _this$onEnd;

        _audioBufferManager.audioBufferManager.tryReleasingCache(this._url);

        (_this$onEnd = this.onEnd) === null || _this$onEnd === void 0 ? void 0 : _this$onEnd.call(this);
      }, this._duration * 1000);
    }).catch(e => {});
  }

  stop() {
    clearTimeout(this._currentTimer);

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
    this._currentTimer = 0;
    this._volume = 1;
    this._loop = false;
    this._state = _type.AudioState.INIT;
    this._audioTimer = void 0;
    this._eventTarget = new _index.EventTarget();
    this._operationQueue = [];
    this._audioBuffer = audioBuffer;
    this._audioTimer = new _audioTimer.default(audioBuffer);
    this._gainNode = audioContextAgent.createGain();
    audioContextAgent.connectContext(this._gainNode);
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

  static load(url) {
    return new Promise(resolve => {
      AudioPlayerWeb.loadNative(url).then(audioBuffer => {
        resolve(new AudioPlayerWeb(audioBuffer, url));
      }).catch(e => {});
    });
  }

  static loadNative(url) {
    return new Promise((resolve, reject) => {
      const cachedAudioBuffer = _audioBufferManager.audioBufferManager.getCache(url);

      if (cachedAudioBuffer) {
        _audioBufferManager.audioBufferManager.retainCache(url);

        resolve(cachedAudioBuffer);
        return;
      }

      const xhr = new XMLHttpRequest();
      const errInfo = `load audio failed: ${url}, status: `;
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 0) {
          audioContextAgent.decodeAudioData(xhr.response).then(decodedAudioBuffer => {
            _audioBufferManager.audioBufferManager.addCache(url, decodedAudioBuffer);

            resolve(decodedAudioBuffer);
          }).catch(e => {});
        } else {
          reject(new Error(`${errInfo}${xhr.status}(no response)`));
        }
      };

      xhr.onerror = () => {
        reject(new Error(`${errInfo}${xhr.status}(error)`));
      };

      xhr.ontimeout = () => {
        reject(new Error(`${errInfo}${xhr.status}(time out)`));
      };

      xhr.onabort = () => {
        reject(new Error(`${errInfo}${xhr.status}(abort)`));
      };

      xhr.send(null);
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
    val = (0, _index2.clamp01)(val);
    this._volume = val;
    audioContextAgent.setGainValue(this._gainNode, val);
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
    if (_internal253Aconstants.EDITOR) {
      return Promise.resolve();
    }

    return this._doPlay();
  } // The decorated play() method can't be call in seek()
  // so we define this method to ensure that the audio seeking works.


  _doPlay() {
    return new Promise(resolve => {
      // one AudioBufferSourceNode can't start twice
      this._stopSourceNode();

      this._sourceNode = audioContextAgent.createBufferSource(this._audioBuffer, this.loop);

      this._sourceNode.connect(this._gainNode);

      this._sourceNode.start(0, this._audioTimer.currentTime);

      audioContextAgent.runContext().then(() => {
        this._state = _type.AudioState.PLAYING;

        this._audioTimer.start();
        /* still not supported by all platforms *
        this._sourceNode.onended = this._onEnded;
        /* doing it manually for now */


        const checkEnded = () => {
          if (this.loop) {
            this._currentTimer = window.setTimeout(checkEnded, this._audioBuffer.duration * 1000);
          } else {
            // do ended
            this._audioTimer.stop();

            this._eventTarget.emit(_type.AudioEvent.ENDED);

            this._state = _type.AudioState.INIT;
          }
        };

        window.clearTimeout(this._currentTimer);
        this._currentTimer = window.setTimeout(checkEnded, (this._audioBuffer.duration - this._audioTimer.currentTime) * 1000);
        resolve();
      }).catch(e => {});
    });
  }

  _stopSourceNode() {
    try {
      var _this$_sourceNode;

      (_this$_sourceNode = this._sourceNode) === null || _this$_sourceNode === void 0 ? void 0 : _this$_sourceNode.stop();
    } catch (e) {// sourceNode can't be stopped twice, especially on Safari.
    }
  }

  pause() {
    if (this._state !== _type.AudioState.PLAYING || !this._sourceNode) {
      return Promise.resolve();
    }

    this._audioTimer.pause();

    this._state = _type.AudioState.PAUSED;
    window.clearTimeout(this._currentTimer);

    this._stopSourceNode();

    return Promise.resolve();
  }

  stop() {
    if (!this._sourceNode) {
      return Promise.resolve();
    }

    this._audioTimer.stop();

    this._state = _type.AudioState.STOPPED;
    window.clearTimeout(this._currentTimer);

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
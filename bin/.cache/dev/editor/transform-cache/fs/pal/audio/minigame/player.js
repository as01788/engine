"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioPlayer = exports.OneShotAudio = void 0;

var _minigame = require("pal/minigame");

var _globalExports = require("../../../cocos/core/global-exports.js");

var _playerMinigame = require("./player-minigame.js");

var _playerWeb = require("./player-web.js");

class OneShotAudio {
  get onPlay() {
    return this._audio.onPlay;
  }

  set onPlay(v) {
    this._audio.onPlay = v;
  }

  get onEnd() {
    return this._audio.onEnd;
  }

  set onEnd(v) {
    this._audio.onEnd = v;
  }

  constructor(audio) {
    this._audio = void 0;
    this._audio = audio;
  }

  play() {
    this._audio.play();
  }

  stop() {
    this._audio.stop();
  }

}

exports.OneShotAudio = OneShotAudio;

class AudioPlayer {
  constructor(player) {
    this._player = void 0;
    this._player = player;
  }

  static load(url, opts) {
    return new Promise(resolve => {
      if (typeof _minigame.minigame.tt === 'object' && typeof _minigame.minigame.tt.getAudioContext !== 'undefined') {
        _playerWeb.AudioPlayerWeb.load(url).then(webPlayer => {
          resolve(new AudioPlayer(webPlayer));
        }).catch(e => {});
      } else {
        _playerMinigame.AudioPlayerMinigame.load(url).then(minigamePlayer => {
          resolve(new AudioPlayer(minigamePlayer));
        }).catch(e => {});
      }
    });
  }

  destroy() {
    this._player.destroy();
  }

  static loadNative(url, opts) {
    if (typeof _minigame.minigame.tt === 'object' && typeof _minigame.minigame.tt.getAudioContext !== 'undefined') {
      return _playerWeb.AudioPlayerWeb.loadNative(url);
    }

    return _playerMinigame.AudioPlayerMinigame.loadNative(url);
  }

  static loadOneShotAudio(url, volume, opts) {
    return new Promise((resolve, reject) => {
      if (typeof _minigame.minigame.tt === 'object' && typeof _minigame.minigame.tt.getAudioContext !== 'undefined') {
        _playerWeb.AudioPlayerWeb.loadOneShotAudio(url, volume).then(oneShotAudioWeb => {
          // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
          resolve(new OneShotAudio(oneShotAudioWeb));
        }).catch(reject);
      } else {
        _playerMinigame.AudioPlayerMinigame.loadOneShotAudio(url, volume).then(oneShotAudioMinigame => {
          // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
          resolve(new OneShotAudio(oneShotAudioMinigame));
        }).catch(reject);
      }
    });
  }

  get src() {
    return this._player.src;
  }

  get type() {
    return this._player.type;
  }

  get state() {
    return this._player.state;
  }

  get loop() {
    return this._player.loop;
  }

  set loop(val) {
    this._player.loop = val;
  }

  get volume() {
    return this._player.volume;
  }

  set volume(val) {
    this._player.volume = val;
  }

  get duration() {
    return this._player.duration;
  }

  get currentTime() {
    return this._player.currentTime;
  }

  seek(time) {
    return this._player.seek(time);
  }

  play() {
    return this._player.play();
  }

  pause() {
    return this._player.pause();
  }

  stop() {
    return this._player.stop();
  }

  onInterruptionBegin(cb) {
    this._player.onInterruptionBegin(cb);
  }

  offInterruptionBegin(cb) {
    this._player.offInterruptionBegin(cb);
  }

  onInterruptionEnd(cb) {
    this._player.onInterruptionEnd(cb);
  }

  offInterruptionEnd(cb) {
    this._player.offInterruptionEnd(cb);
  }

  onEnded(cb) {
    this._player.onEnded(cb);
  }

  offEnded(cb) {
    this._player.offEnded(cb);
  }

} // REMOVE_ME


exports.AudioPlayer = AudioPlayer;
AudioPlayer.maxAudioChannel = 10;
_globalExports.legacyCC.AudioPlayer = AudioPlayer;
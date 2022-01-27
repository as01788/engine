"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../cocos/core/math/utils.js");

class AudioTimer {
  constructor(nativeAudio) {
    this._nativeAudio = void 0;
    this._startTime = 0;
    this._startOffset = 0;
    this._isPaused = true;
    this._nativeAudio = nativeAudio;
  }

  destroy() {
    // @ts-expect-error Type 'undefined' is not assignable to type 'IDuration'
    this._nativeAudio = undefined;
  }

  get duration() {
    return this._nativeAudio.duration;
  }
  /**
   * Get the current time of audio timer.
   */


  get currentTime() {
    if (this._isPaused) {
      return this._startOffset;
    } else {
      return this._calculateCurrentTime();
    }
  }

  _now() {
    return performance.now() / 1000;
  }

  _calculateCurrentTime() {
    const timePassed = this._now() - this._startTime;

    const currentTime = this._startOffset + timePassed;

    if (currentTime >= this.duration) {
      // timer loop
      this._startTime = this._now();
      this._startOffset = 0;
    }

    return currentTime % this.duration;
  }
  /**
   * Start the audio timer.
   * Call this method when audio is played.
   */


  start() {
    this._isPaused = false;
    this._startTime = this._now();
  }
  /**
   * Pause the audio timer.
   * Call this method when audio is paused or interrupted.
   */


  pause() {
    if (this._isPaused) {
      return;
    }

    this._isPaused = true;
    this._startOffset = this._calculateCurrentTime();
  }
  /**
   * Stop the audio timer.
   * Call this method when audio playing ended or audio is stopped.
   */


  stop() {
    this._isPaused = true;
    this._startOffset = 0;
  }
  /**
   * Seek the audio timer.
   * Call this method when audio is seeked.
   */


  seek(time) {
    this._startTime = this._now();
    this._startOffset = (0, _utils.clamp)(time, 0, this.duration);
  }

}

exports.default = AudioTimer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.audioBufferManager = void 0;

/**
 * This is a manager to manage the cache of audio buffer for web audio.
 */
class AudioBufferManager {
  constructor() {
    this._audioBufferDataMap = {};
  }

  addCache(url, audioBuffer) {
    const audioBufferData = this._audioBufferDataMap[url];

    if (audioBufferData) {
      console.warn(`Audio buffer ${url} has been cached`);
      return;
    }

    this._audioBufferDataMap[url] = {
      usedCount: 1,
      audioBuffer
    };
  }

  retainCache(url) {
    const audioBufferData = this._audioBufferDataMap[url];

    if (!audioBufferData) {
      console.warn(`Audio buffer cache ${url} has not been added.`);
      return;
    }

    audioBufferData.usedCount++;
  }

  getCache(url) {
    const audioBufferData = this._audioBufferDataMap[url];
    return audioBufferData === null || audioBufferData === void 0 ? void 0 : audioBufferData.audioBuffer;
  }

  tryReleasingCache(url) {
    const audioBufferData = this._audioBufferDataMap[url];

    if (!audioBufferData) {
      console.warn(`Audio buffer cache ${url} has not been added.`);
      return;
    }

    if (--audioBufferData.usedCount <= 0) {
      delete this._audioBufferDataMap[url];
    }
  }

}

const audioBufferManager = new AudioBufferManager();
exports.audioBufferManager = audioBufferManager;
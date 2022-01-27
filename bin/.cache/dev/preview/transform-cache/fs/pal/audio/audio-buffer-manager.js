System.register("q-bundled:///fs/pal/audio/audio-buffer-manager.js", [], function (_export, _context) {
  "use strict";

  var AudioBufferManager, audioBufferManager;
  return {
    setters: [],
    execute: function () {
      /**
       * This is a manager to manage the cache of audio buffer for web audio.
       */
      AudioBufferManager = /*#__PURE__*/function () {
        function AudioBufferManager() {
          this._audioBufferDataMap = {};
        }

        var _proto = AudioBufferManager.prototype;

        _proto.addCache = function addCache(url, audioBuffer) {
          var audioBufferData = this._audioBufferDataMap[url];

          if (audioBufferData) {
            console.warn("Audio buffer " + url + " has been cached");
            return;
          }

          this._audioBufferDataMap[url] = {
            usedCount: 1,
            audioBuffer: audioBuffer
          };
        };

        _proto.retainCache = function retainCache(url) {
          var audioBufferData = this._audioBufferDataMap[url];

          if (!audioBufferData) {
            console.warn("Audio buffer cache " + url + " has not been added.");
            return;
          }

          audioBufferData.usedCount++;
        };

        _proto.getCache = function getCache(url) {
          var audioBufferData = this._audioBufferDataMap[url];
          return audioBufferData === null || audioBufferData === void 0 ? void 0 : audioBufferData.audioBuffer;
        };

        _proto.tryReleasingCache = function tryReleasingCache(url) {
          var audioBufferData = this._audioBufferDataMap[url];

          if (!audioBufferData) {
            console.warn("Audio buffer cache " + url + " has not been added.");
            return;
          }

          if (--audioBufferData.usedCount <= 0) {
            delete this._audioBufferDataMap[url];
          }
        };

        return AudioBufferManager;
      }();

      _export("audioBufferManager", audioBufferManager = new AudioBufferManager());
    }
  };
});
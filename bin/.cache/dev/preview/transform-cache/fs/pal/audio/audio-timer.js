System.register("q-bundled:///fs/pal/audio/audio-timer.js", ["../../cocos/core/math/utils.js"], function (_export, _context) {
  "use strict";

  var clamp, AudioTimer;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_cocosCoreMathUtilsJs) {
      clamp = _cocosCoreMathUtilsJs.clamp;
    }],
    execute: function () {
      _export("default", AudioTimer = /*#__PURE__*/function () {
        function AudioTimer(nativeAudio) {
          this._nativeAudio = void 0;
          this._startTime = 0;
          this._startOffset = 0;
          this._isPaused = true;
          this._nativeAudio = nativeAudio;
        }

        var _proto = AudioTimer.prototype;

        _proto.destroy = function destroy() {
          // @ts-expect-error Type 'undefined' is not assignable to type 'IDuration'
          this._nativeAudio = undefined;
        };

        _proto._now = function _now() {
          return performance.now() / 1000;
        };

        _proto._calculateCurrentTime = function _calculateCurrentTime() {
          var timePassed = this._now() - this._startTime;

          var currentTime = this._startOffset + timePassed;

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
        ;

        _proto.start = function start() {
          this._isPaused = false;
          this._startTime = this._now();
        }
        /**
         * Pause the audio timer.
         * Call this method when audio is paused or interrupted.
         */
        ;

        _proto.pause = function pause() {
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
        ;

        _proto.stop = function stop() {
          this._isPaused = true;
          this._startOffset = 0;
        }
        /**
         * Seek the audio timer.
         * Call this method when audio is seeked.
         */
        ;

        _proto.seek = function seek(time) {
          this._startTime = this._now();
          this._startOffset = clamp(time, 0, this.duration);
        };

        _createClass(AudioTimer, [{
          key: "duration",
          get: function get() {
            return this._nativeAudio.duration;
          }
          /**
           * Get the current time of audio timer.
           */

        }, {
          key: "currentTime",
          get: function get() {
            if (this._isPaused) {
              return this._startOffset;
            } else {
              return this._calculateCurrentTime();
            }
          }
        }]);

        return AudioTimer;
      }());
    }
  };
});
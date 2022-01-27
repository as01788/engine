System.register("q-bundled:///fs/pal/audio/minigame/player-minigame.js", ["pal/minigame", "pal/system-info", "../../../cocos/core/event/index.js", "../type.js", "../../../cocos/core/index.js", "../operation-queue.js", "../audio-timer.js"], function (_export, _context) {
  "use strict";

  var minigame, systemInfo, EventTarget, AudioEvent, AudioState, AudioType, clamp, clamp01, enqueueOperation, AudioTimer, _class, _temp, OneShotAudioMinigame, AudioPlayerMinigame;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_typeJs) {
      AudioEvent = _typeJs.AudioEvent;
      AudioState = _typeJs.AudioState;
      AudioType = _typeJs.AudioType;
    }, function (_cocosCoreIndexJs) {
      clamp = _cocosCoreIndexJs.clamp;
      clamp01 = _cocosCoreIndexJs.clamp01;
    }, function (_operationQueueJs) {
      enqueueOperation = _operationQueueJs.enqueueOperation;
    }, function (_audioTimerJs) {
      AudioTimer = _audioTimerJs.default;
    }],
    execute: function () {
      _export("OneShotAudioMinigame", OneShotAudioMinigame = /*#__PURE__*/function () {
        function OneShotAudioMinigame(nativeAudio, volume) {
          var _this = this;

          this._innerAudioContext = void 0;
          this._onPlayCb = void 0;
          this._onEndCb = void 0;
          this._innerAudioContext = nativeAudio;
          nativeAudio.volume = volume;
          nativeAudio.onPlay(function () {
            var _this$_onPlayCb;

            (_this$_onPlayCb = _this._onPlayCb) === null || _this$_onPlayCb === void 0 ? void 0 : _this$_onPlayCb.call(_this);
          });
          nativeAudio.onEnded(function () {
            var _this$_onEndCb;

            (_this$_onEndCb = _this._onEndCb) === null || _this$_onEndCb === void 0 ? void 0 : _this$_onEndCb.call(_this);
            nativeAudio.destroy();
          });
        }

        var _proto = OneShotAudioMinigame.prototype;

        _proto.play = function play() {
          this._innerAudioContext.play();
        };

        _proto.stop = function stop() {
          this._innerAudioContext.stop();
        };

        _createClass(OneShotAudioMinigame, [{
          key: "onPlay",
          get: function get() {
            return this._onPlayCb;
          },
          set: function set(cb) {
            this._onPlayCb = cb;
          }
        }, {
          key: "onEnd",
          get: function get() {
            return this._onEndCb;
          },
          set: function set(cb) {
            this._onEndCb = cb;
          }
        }]);

        return OneShotAudioMinigame;
      }());

      _export("AudioPlayerMinigame", AudioPlayerMinigame = (_class = (_temp = /*#__PURE__*/function () {
        // NOTE: the implemented interface properties need to be public access
        function AudioPlayerMinigame(innerAudioContext) {
          var _this2 = this;

          this._innerAudioContext = void 0;
          this._state = AudioState.INIT;
          this._onPlay = void 0;
          this._onPause = void 0;
          this._onStop = void 0;
          this._onSeeked = void 0;
          this._onEnded = void 0;
          this._audioTimer = void 0;
          this._readyToHandleOnShow = false;
          this._eventTarget = new EventTarget();
          this._operationQueue = [];
          this._innerAudioContext = innerAudioContext;
          this._audioTimer = new AudioTimer(innerAudioContext);
          this._eventTarget = new EventTarget(); // event

          systemInfo.on('hide', this._onHide, this);
          systemInfo.on('show', this._onShow, this);
          var eventTarget = this._eventTarget;

          this._onPlay = function () {
            _this2._state = AudioState.PLAYING;
            eventTarget.emit(AudioEvent.PLAYED);
          };

          innerAudioContext.onPlay(this._onPlay);

          this._onPause = function () {
            _this2._state = AudioState.PAUSED;
            eventTarget.emit(AudioEvent.PAUSED);
          };

          innerAudioContext.onPause(this._onPause);

          this._onStop = function () {
            _this2._state = AudioState.STOPPED;
            eventTarget.emit(AudioEvent.STOPPED);
          };

          innerAudioContext.onStop(this._onStop);

          this._onSeeked = function () {
            eventTarget.emit(AudioEvent.SEEKED);
          };

          innerAudioContext.onSeeked(this._onSeeked);

          this._onEnded = function () {
            _this2._audioTimer.stop();

            _this2._state = AudioState.INIT;
            eventTarget.emit(AudioEvent.ENDED);
          };

          innerAudioContext.onEnded(this._onEnded);
        }

        var _proto2 = AudioPlayerMinigame.prototype;

        _proto2.destroy = function destroy() {
          var _this3 = this;

          this._audioTimer.destroy();

          systemInfo.off('hide', this._onHide, this);
          systemInfo.off('show', this._onShow, this);

          if (this._innerAudioContext) {
            ['Play', 'Pause', 'Stop', 'Seeked', 'Ended'].forEach(function (event) {
              _this3._offEvent(event);
            });

            this._innerAudioContext.destroy(); // @ts-expect-error Type 'null' is not assignable to type 'InnerAudioContext'


            this._innerAudioContext = null;
          }
        };

        _proto2._onHide = function _onHide() {
          var _this4 = this;

          if (this._state === AudioState.PLAYING) {
            this.pause().then(function () {
              _this4._state = AudioState.INTERRUPTED;
              _this4._readyToHandleOnShow = true;

              _this4._eventTarget.emit(AudioEvent.INTERRUPTION_BEGIN);
            })["catch"](function (e) {});
          }
        };

        _proto2._onShow = function _onShow() {
          var _this5 = this;

          // We don't know whether onShow or resolve callback in pause promise is called at first.
          if (!this._readyToHandleOnShow) {
            this._eventTarget.once(AudioEvent.INTERRUPTION_BEGIN, this._onShow, this);

            return;
          }

          if (this._state === AudioState.INTERRUPTED) {
            this.play().then(function () {
              _this5._eventTarget.emit(AudioEvent.INTERRUPTION_END);
            })["catch"](function (e) {});
          }

          this._readyToHandleOnShow = false;
        };

        _proto2._offEvent = function _offEvent(eventName) {
          if (this["_on" + eventName]) {
            this._innerAudioContext["off" + eventName](this["_on" + eventName]);

            this["_on" + eventName] = null;
          }
        };

        AudioPlayerMinigame.load = function load(url) {
          return new Promise(function (resolve) {
            AudioPlayerMinigame.loadNative(url).then(function (innerAudioContext) {
              resolve(new AudioPlayerMinigame(innerAudioContext));
            })["catch"](function (e) {});
          });
        };

        AudioPlayerMinigame.loadNative = function loadNative(url) {
          return new Promise(function (resolve, reject) {
            var innerAudioContext = minigame.createInnerAudioContext();
            var timer = setTimeout(function () {
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
        };

        AudioPlayerMinigame.loadOneShotAudio = function loadOneShotAudio(url, volume) {
          return new Promise(function (resolve, reject) {
            AudioPlayerMinigame.loadNative(url).then(function (innerAudioContext) {
              // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
              resolve(new OneShotAudioMinigame(innerAudioContext, volume));
            })["catch"](reject);
          });
        };

        _proto2.seek = function seek(time) {
          var _this6 = this;

          return new Promise(function (resolve) {
            time = clamp(time, 0, _this6.duration);

            _this6._eventTarget.once(AudioEvent.SEEKED, resolve);

            _this6._innerAudioContext.seek(time);

            _this6._audioTimer.seek(time);
          });
        };

        _proto2.play = function play() {
          var _this7 = this;

          return new Promise(function (resolve) {
            _this7._eventTarget.once(AudioEvent.PLAYED, resolve);

            _this7._innerAudioContext.play(); // NOTE: we can't initiate audio duration on constructor.
            // On WeChat platform, duration is 0 at the time audio is loaded.
            // On Native or Runtime platform, duration is 0 before playing.


            _this7._audioTimer.start();
          });
        };

        _proto2.pause = function pause() {
          var _this8 = this;

          return new Promise(function (resolve) {
            _this8._eventTarget.once(AudioEvent.PAUSED, resolve);

            _this8._innerAudioContext.pause();

            _this8._audioTimer.pause();
          });
        };

        _proto2.stop = function stop() {
          var _this9 = this;

          return new Promise(function (resolve) {
            _this9._eventTarget.once(AudioEvent.STOPPED, resolve);

            _this9._innerAudioContext.stop();

            _this9._audioTimer.stop();
          });
        };

        _proto2.onInterruptionBegin = function onInterruptionBegin(cb) {
          this._eventTarget.on(AudioEvent.INTERRUPTION_BEGIN, cb);
        };

        _proto2.offInterruptionBegin = function offInterruptionBegin(cb) {
          this._eventTarget.off(AudioEvent.INTERRUPTION_BEGIN, cb);
        };

        _proto2.onInterruptionEnd = function onInterruptionEnd(cb) {
          this._eventTarget.on(AudioEvent.INTERRUPTION_END, cb);
        };

        _proto2.offInterruptionEnd = function offInterruptionEnd(cb) {
          this._eventTarget.off(AudioEvent.INTERRUPTION_END, cb);
        };

        _proto2.onEnded = function onEnded(cb) {
          this._eventTarget.on(AudioEvent.ENDED, cb);
        };

        _proto2.offEnded = function offEnded(cb) {
          this._eventTarget.off(AudioEvent.ENDED, cb);
        };

        _createClass(AudioPlayerMinigame, [{
          key: "src",
          get: function get() {
            return this._innerAudioContext ? this._innerAudioContext.src : '';
          }
        }, {
          key: "type",
          get: function get() {
            return AudioType.MINIGAME_AUDIO;
          }
        }, {
          key: "state",
          get: function get() {
            return this._state;
          }
        }, {
          key: "loop",
          get: function get() {
            return this._innerAudioContext.loop;
          },
          set: function set(val) {
            this._innerAudioContext.loop = val;
          }
        }, {
          key: "volume",
          get: function get() {
            return this._innerAudioContext.volume;
          },
          set: function set(val) {
            val = clamp01(val);
            this._innerAudioContext.volume = val;
          }
        }, {
          key: "duration",
          get: function get() {
            return this._innerAudioContext.duration;
          }
        }, {
          key: "currentTime",
          get: function get() {
            // return this._innerAudioContext.currentTime;
            // currentTime doesn't work well
            // on Baidu: currentTime returns without numbers on decimal places
            // on WeChat iOS: we can't reset currentTime to 0 when stop audio
            return this._audioTimer ? this._audioTimer.currentTime : 0;
          }
        }]);

        return AudioPlayerMinigame;
      }(), _temp), (_applyDecoratedDescriptor(_class.prototype, "seek", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "seek"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "play", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pause", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "pause"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stop", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "stop"), _class.prototype)), _class));
    }
  };
});
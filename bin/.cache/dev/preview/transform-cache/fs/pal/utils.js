System.register("q-bundled:///fs/pal/utils.js", [], function (_export, _context) {
  "use strict";

  /**
   * This method clones methods in minigame enviroment, sucb as `wx`, `swan` etc. to a module called minigame.
   * @param targetObject Usually it's specified as the minigame module.
   * @param originObj Original minigame environment such as `wx`, `swan` etc.
   */
  function cloneObject(targetObject, originObj) {
    Object.keys(originObj).forEach(function (key) {
      if (typeof originObj[key] === 'function') {
        targetObject[key] = originObj[key].bind(originObj);
        return;
      }

      targetObject[key] = originObj[key];
    });
  }

  /**
   * This method is to create a polyfill on minigame platform when the innerAudioContext callback doesn't work.
   * @param minigameEnv Specify the minigame enviroment such as `wx`, `swan` etc.
   * @param polyfillConfig Specify the field, if it's true, the polyfill callback will be applied.
   * @param isAsynchronous Specify whether the callback is called asynchronous.
   * @returns A polyfilled createInnerAudioContext method.
   */
  function createInnerAudioContextPolyfill(minigameEnv, polyfillConfig, isAsynchronous) {
    if (isAsynchronous === void 0) {
      isAsynchronous = false;
    }

    return function () {
      var audioContext = minigameEnv.createInnerAudioContext(); // add polyfill if onPlay method doesn't work this platform

      if (polyfillConfig.onPlay) {
        var originalPlay = audioContext.play;
        var _onPlayCB = null;
        Object.defineProperty(audioContext, 'onPlay', {
          configurable: true,
          value: function value(cb) {
            _onPlayCB = cb;
          }
        });
        Object.defineProperty(audioContext, 'play', {
          configurable: true,
          value: function value() {
            originalPlay.call(audioContext);

            if (_onPlayCB) {
              if (isAsynchronous) {
                setTimeout(_onPlayCB, 0);
              } else {
                _onPlayCB();
              }
            }
          }
        });
      } // add polyfill if onPause method doesn't work this platform


      if (polyfillConfig.onPause) {
        var originalPause = audioContext.pause;
        var _onPauseCB = null;
        Object.defineProperty(audioContext, 'onPause', {
          configurable: true,
          value: function value(cb) {
            _onPauseCB = cb;
          }
        });
        Object.defineProperty(audioContext, 'pause', {
          configurable: true,
          value: function value() {
            originalPause.call(audioContext);

            if (_onPauseCB) {
              if (isAsynchronous) {
                setTimeout(_onPauseCB, 0);
              } else {
                _onPauseCB();
              }
            }
          }
        });
      } // add polyfill if onStop method doesn't work on this platform


      if (polyfillConfig.onStop) {
        var originalStop = audioContext.stop;
        var _onStopCB = null;
        Object.defineProperty(audioContext, 'onStop', {
          configurable: true,
          value: function value(cb) {
            _onStopCB = cb;
          }
        });
        Object.defineProperty(audioContext, 'stop', {
          configurable: true,
          value: function value() {
            originalStop.call(audioContext);

            if (_onStopCB) {
              if (isAsynchronous) {
                setTimeout(_onStopCB, 0);
              } else {
                _onStopCB();
              }
            }
          }
        });
      } // add polyfill if onSeeked method doesn't work on this platform


      if (polyfillConfig.onSeek) {
        var originalSeek = audioContext.seek;
        var _onSeekCB = null;
        Object.defineProperty(audioContext, 'onSeeked', {
          configurable: true,
          value: function value(cb) {
            _onSeekCB = cb;
          }
        });
        Object.defineProperty(audioContext, 'seek', {
          configurable: true,
          value: function value(time) {
            originalSeek.call(audioContext, time);

            if (_onSeekCB) {
              if (isAsynchronous) {
                setTimeout(_onSeekCB, 0);
              } else {
                _onSeekCB();
              }
            }
          }
        });
      }

      return audioContext;
    };
  }
  /**
   * Compare two version, version should in pattern like 3.0.0.
   * If versionA > versionB, return number larger than 0.
   * If versionA = versionB, return number euqal to 0.
   * If versionA < versionB, return number smaller than 0.
   * @param versionA
   * @param versionB
   */


  function versionCompare(versionA, versionB) {
    var versionRegExp = /\d+\.\d+\.\d+/;

    if (!(versionRegExp.test(versionA) && versionRegExp.test(versionB))) {
      console.warn('wrong format of version when compare version');
      return 0;
    }

    var versionNumbersA = versionA.split('.').map(function (num) {
      return Number.parseInt(num);
    });
    var versionNumbersB = versionB.split('.').map(function (num) {
      return Number.parseInt(num);
    });

    for (var i = 0; i < 3; ++i) {
      var numberA = versionNumbersA[i];
      var numberB = versionNumbersB[i];

      if (numberA !== numberB) {
        return numberA - numberB;
      }
    }

    return 0;
  }

  _export({
    cloneObject: cloneObject,
    createInnerAudioContextPolyfill: createInnerAudioContextPolyfill,
    versionCompare: versionCompare
  });

  return {
    setters: [],
    execute: function () {}
  };
});
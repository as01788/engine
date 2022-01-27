"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneObject = cloneObject;
exports.createInnerAudioContextPolyfill = createInnerAudioContextPolyfill;
exports.versionCompare = versionCompare;

/**
 * This method clones methods in minigame enviroment, sucb as `wx`, `swan` etc. to a module called minigame.
 * @param targetObject Usually it's specified as the minigame module.
 * @param originObj Original minigame environment such as `wx`, `swan` etc.
 */
function cloneObject(targetObject, originObj) {
  Object.keys(originObj).forEach(key => {
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
function createInnerAudioContextPolyfill(minigameEnv, polyfillConfig, isAsynchronous = false) {
  return () => {
    const audioContext = minigameEnv.createInnerAudioContext(); // add polyfill if onPlay method doesn't work this platform

    if (polyfillConfig.onPlay) {
      const originalPlay = audioContext.play;
      let _onPlayCB = null;
      Object.defineProperty(audioContext, 'onPlay', {
        configurable: true,

        value(cb) {
          _onPlayCB = cb;
        }

      });
      Object.defineProperty(audioContext, 'play', {
        configurable: true,

        value() {
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
      const originalPause = audioContext.pause;
      let _onPauseCB = null;
      Object.defineProperty(audioContext, 'onPause', {
        configurable: true,

        value(cb) {
          _onPauseCB = cb;
        }

      });
      Object.defineProperty(audioContext, 'pause', {
        configurable: true,

        value() {
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
      const originalStop = audioContext.stop;
      let _onStopCB = null;
      Object.defineProperty(audioContext, 'onStop', {
        configurable: true,

        value(cb) {
          _onStopCB = cb;
        }

      });
      Object.defineProperty(audioContext, 'stop', {
        configurable: true,

        value() {
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
      const originalSeek = audioContext.seek;
      let _onSeekCB = null;
      Object.defineProperty(audioContext, 'onSeeked', {
        configurable: true,

        value(cb) {
          _onSeekCB = cb;
        }

      });
      Object.defineProperty(audioContext, 'seek', {
        configurable: true,

        value(time) {
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
  const versionRegExp = /\d+\.\d+\.\d+/;

  if (!(versionRegExp.test(versionA) && versionRegExp.test(versionB))) {
    console.warn('wrong format of version when compare version');
    return 0;
  }

  const versionNumbersA = versionA.split('.').map(num => Number.parseInt(num));
  const versionNumbersB = versionB.split('.').map(num => Number.parseInt(num));

  for (let i = 0; i < 3; ++i) {
    const numberA = versionNumbersA[i];
    const numberB = versionNumbersB[i];

    if (numberA !== numberB) {
      return numberA - numberB;
    }
  }

  return 0;
}
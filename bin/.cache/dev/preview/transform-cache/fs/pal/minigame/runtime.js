System.register("q-bundled:///fs/pal/minigame/runtime.js", ["../../../virtual/internal%253Aconstants.js", "../screen-adapter/enum-type/index.js", "../utils.js"], function (_export, _context) {
  "use strict";

  var COCOSPLAY, LINKSURE, VIVO, Orientation, cloneObject, createInnerAudioContextPolyfill, minigame, systemInfo, landscapeOrientation, cachedSystemInfo, _customAccelerometerCb, _innerAccelerometerCb, _needHandleAccelerometerCb;

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      COCOSPLAY = _virtualInternal253AconstantsJs.COCOSPLAY;
      LINKSURE = _virtualInternal253AconstantsJs.LINKSURE;
      VIVO = _virtualInternal253AconstantsJs.VIVO;
    }, function (_screenAdapterEnumTypeIndexJs) {
      Orientation = _screenAdapterEnumTypeIndexJs.Orientation;
    }, function (_utilsJs) {
      cloneObject = _utilsJs.cloneObject;
      createInnerAudioContextPolyfill = _utilsJs.createInnerAudioContextPolyfill;
    }],
    execute: function () {
      // @ts-expect-error can't init minigame when it's declared
      _export("minigame", minigame = {});

      cloneObject(minigame, ral); // #region SystemInfo

      systemInfo = minigame.getSystemInfoSync();
      minigame.isDevTool = systemInfo.platform === 'devtools'; // NOTE: size and orientation info is wrong at the init phase, need to define as a getter

      Object.defineProperty(minigame, 'isLandscape', {
        get: function get() {
          if (VIVO) {
            return systemInfo.screenWidth > systemInfo.screenHeight;
          } else {
            var locSysInfo = minigame.getSystemInfoSync();
            return locSysInfo.screenWidth > locSysInfo.screenHeight;
          }
        }
      }); // init landscapeOrientation as LANDSCAPE_RIGHT

      landscapeOrientation = Orientation.LANDSCAPE_RIGHT; // NOTE: onDeviceOrientationChange is not supported on this platform
      // ral.onDeviceOrientationChange((res) => {
      //     if (res.value === 'landscape') {
      //         landscapeOrientation = Orientation.LANDSCAPE_RIGHT;
      //     } else if (res.value === 'landscapeReverse') {
      //         landscapeOrientation = Orientation.LANDSCAPE_LEFT;
      //     }
      // });

      Object.defineProperty(minigame, 'orientation', {
        get: function get() {
          return minigame.isLandscape ? landscapeOrientation : Orientation.PORTRAIT;
        }
      });

      if (VIVO) {
        // TODO: need to be handled in ral lib.
        minigame.getSystemInfoSync = function () {
          var sys = ral.getSystemInfoSync(); // on VIVO, windowWidth should be windowHeight when it is landscape

          sys.windowWidth = sys.screenWidth;
          sys.windowHeight = sys.screenHeight;
          return sys;
        };
      } else if (LINKSURE) {
        // TODO: update system info when view resized, currently the resize callback is not supported.
        cachedSystemInfo = ral.getSystemInfoSync();

        minigame.getSystemInfoSync = function () {
          return cachedSystemInfo;
        };
      } // #endregion SystemInfo
      // #region Accelerometer


      _needHandleAccelerometerCb = false;

      minigame.onAccelerometerChange = function (cb) {
        if (!_innerAccelerometerCb) {
          _innerAccelerometerCb = function _innerAccelerometerCb(res) {
            var _customAccelerometerC;

            if (!_needHandleAccelerometerCb) {
              return;
            }

            var x = res.x;
            var y = res.y;

            if (minigame.isLandscape) {
              var orientationFactor = landscapeOrientation === Orientation.LANDSCAPE_RIGHT ? 1 : -1;
              var tmp = x;
              x = -y * orientationFactor;
              y = tmp * orientationFactor;
            }

            var resClone = {
              x: x,
              y: y,
              z: res.z
            };
            (_customAccelerometerC = _customAccelerometerCb) === null || _customAccelerometerC === void 0 ? void 0 : _customAccelerometerC(resClone);
          };

          ral.onAccelerometerChange(_innerAccelerometerCb);
        }

        _needHandleAccelerometerCb = true;
        _customAccelerometerCb = cb;
      };

      minigame.offAccelerometerChange = function (cb) {
        _needHandleAccelerometerCb = false;
        _customAccelerometerCb = undefined;
      }; // #endregion Accelerometer
      // NOTE: Audio playing crash on COCOSPLAY, need to play audio asynchronously.


      if (COCOSPLAY) {
        minigame.createInnerAudioContext = createInnerAudioContextPolyfill(ral, {
          onPlay: true,
          // polyfill for vivo
          onPause: true,
          onStop: true,
          onSeek: true
        }, true);
      } else {
        minigame.createInnerAudioContext = createInnerAudioContextPolyfill(ral, {
          onPlay: true,
          // polyfill for vivo
          onPause: true,
          onStop: true,
          onSeek: true
        });
      } // #region SafeArea


      minigame.getSafeArea = function () {
        var locSystemInfo = ral.getSystemInfoSync();

        if (locSystemInfo.safeArea) {
          return locSystemInfo.safeArea;
        } else {
          console.warn('getSafeArea is not supported on this platform');

          var _systemInfo = minigame.getSystemInfoSync();

          return {
            top: 0,
            left: 0,
            bottom: _systemInfo.screenHeight,
            right: _systemInfo.screenWidth,
            width: _systemInfo.screenWidth,
            height: _systemInfo.screenHeight
          };
        }
      }; // #endregion SafeArea

    }
  };
});
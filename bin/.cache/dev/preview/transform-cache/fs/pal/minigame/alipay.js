System.register("q-bundled:///fs/pal/minigame/alipay.js", ["../screen-adapter/enum-type/index.js", "../utils.js"], function (_export, _context) {
  "use strict";

  var Orientation, cloneObject, minigame, systemInfo, landscapeOrientation, _accelerometerCb;

  return {
    setters: [function (_screenAdapterEnumTypeIndexJs) {
      Orientation = _screenAdapterEnumTypeIndexJs.Orientation;
    }, function (_utilsJs) {
      cloneObject = _utilsJs.cloneObject;
    }],
    execute: function () {
      // @ts-expect-error can't init minigame when it's declared
      _export("minigame", minigame = {});

      cloneObject(minigame, my); // #region SystemInfo

      systemInfo = minigame.getSystemInfoSync();
      minigame.isDevTool = window.navigator && /AlipayIDE/.test(window.navigator.userAgent);
      minigame.isLandscape = systemInfo.screenWidth > systemInfo.screenHeight; // init landscapeOrientation as LANDSCAPE_RIGHT

      landscapeOrientation = Orientation.LANDSCAPE_RIGHT; // NOTE: onDeviceOrientationChange is not supported on this platform
      // my.onDeviceOrientationChange((res) => {
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
      }); // #endregion SystemInfo
      // #region TouchEvent
      // my.onTouchStart register touch event listner on body
      // need to register on canvas

      minigame.onTouchStart = function (cb) {
        window.canvas.addEventListener('touchstart', function (res) {
          cb && cb(res);
        });
      };

      minigame.onTouchMove = function (cb) {
        window.canvas.addEventListener('touchmove', function (res) {
          cb && cb(res);
        });
      };

      minigame.onTouchEnd = function (cb) {
        window.canvas.addEventListener('touchend', function (res) {
          cb && cb(res);
        });
      };

      minigame.onTouchCancel = function (cb) {
        window.canvas.addEventListener('touchcancel', function (res) {
          cb && cb(res);
        });
      }; // #endregion TouchEvent


      minigame.createInnerAudioContext = function () {
        var audio = my.createInnerAudioContext(); // @ts-expect-error InnerAudioContext has onCanPlay

        audio.onCanplay = audio.onCanPlay.bind(audio); // @ts-expect-error InnerAudioContext has offCanPlay

        audio.offCanplay = audio.offCanPlay.bind(audio); // @ts-expect-error InnerAudioContext has onCanPlay

        delete audio.onCanPlay; // @ts-expect-error InnerAudioContext has offCanPlay

        delete audio.offCanPlay;
        return audio;
      }; // #region Font


      minigame.loadFont = function (url) {
        // my.loadFont crash when url is not in user data path
        return 'Arial';
      }; // #endregion Font
      // #region Accelerometer


      minigame.onAccelerometerChange = function (cb) {
        minigame.offAccelerometerChange(); // onAccelerometerChange would start accelerometer
        // so we won't call this method here

        _accelerometerCb = function _accelerometerCb(res) {
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
          cb(resClone);
        };
      };

      minigame.offAccelerometerChange = function (cb) {
        if (_accelerometerCb) {
          my.offAccelerometerChange(_accelerometerCb);
          _accelerometerCb = undefined;
        }
      };

      minigame.startAccelerometer = function (res) {
        if (_accelerometerCb) {
          my.onAccelerometerChange(_accelerometerCb);
        } else {
          // my.startAccelerometer() is not implemented.
          console.error('minigame.onAccelerometerChange() should be invoked before minigame.startAccelerometer() on alipay platform');
        }
      };

      minigame.stopAccelerometer = function (res) {
        // my.stopAccelerometer() is not implemented.
        minigame.offAccelerometerChange();
      }; // #endregion Accelerometer
      // #region SafeArea


      minigame.getSafeArea = function () {
        console.warn('getSafeArea is not supported on this platform');
        var systemInfo = minigame.getSystemInfoSync();
        return {
          top: 0,
          left: 0,
          bottom: systemInfo.screenHeight,
          right: systemInfo.screenWidth,
          width: systemInfo.screenWidth,
          height: systemInfo.screenHeight
        };
      }; // #endregion SafeArea

    }
  };
});
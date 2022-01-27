System.register("q-bundled:///fs/pal/minigame/baidu.js", ["../screen-adapter/enum-type/index.js", "../utils.js"], function (_export, _context) {
  "use strict";

  var Orientation, cloneObject, createInnerAudioContextPolyfill, minigame, systemInfo, landscapeOrientation, _customAccelerometerCb, _innerAccelerometerCb;

  return {
    setters: [function (_screenAdapterEnumTypeIndexJs) {
      Orientation = _screenAdapterEnumTypeIndexJs.Orientation;
    }, function (_utilsJs) {
      cloneObject = _utilsJs.cloneObject;
      createInnerAudioContextPolyfill = _utilsJs.createInnerAudioContextPolyfill;
    }],
    execute: function () {
      // @ts-expect-error can't init minigame when it's declared
      _export("minigame", minigame = {});

      cloneObject(minigame, swan); // #region SystemInfo

      systemInfo = minigame.getSystemInfoSync();
      minigame.isDevTool = systemInfo.platform === 'devtools';
      minigame.isLandscape = systemInfo.screenWidth > systemInfo.screenHeight; // init landscapeOrientation as LANDSCAPE_RIGHT

      landscapeOrientation = Orientation.LANDSCAPE_RIGHT;
      swan.onDeviceOrientationChange(function (res) {
        if (res.value === 'landscape') {
          landscapeOrientation = Orientation.LANDSCAPE_RIGHT;
        } else if (res.value === 'landscapeReverse') {
          landscapeOrientation = Orientation.LANDSCAPE_LEFT;
        }
      });
      Object.defineProperty(minigame, 'orientation', {
        get: function get() {
          return minigame.isLandscape ? landscapeOrientation : Orientation.PORTRAIT;
        }
      }); // #endregion SystemInfo
      // #region Accelerometer

      minigame.onAccelerometerChange = function (cb) {
        // swan.offAccelerometerChange() is not supported.
        // so we can only register AccelerometerChange callback, but can't unregister.
        if (!_innerAccelerometerCb) {
          _innerAccelerometerCb = function _innerAccelerometerCb(res) {
            var _customAccelerometerC;

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

          swan.onAccelerometerChange(_innerAccelerometerCb); // onAccelerometerChange would start accelerometer, need to stop it mannually

          swan.stopAccelerometer({});
        }

        _customAccelerometerCb = cb;
      };

      minigame.offAccelerometerChange = function (cb) {
        // swan.offAccelerometerChange() is not supported.
        _customAccelerometerCb = undefined;
      }; // #endregion Accelerometer


      minigame.createInnerAudioContext = createInnerAudioContextPolyfill(swan, {
        onPlay: true,
        onPause: true,
        onStop: true,
        onSeek: false
      }); // #region SafeArea

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
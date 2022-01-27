System.register("q-bundled:///fs/pal/minigame/bytedance.js", ["../screen-adapter/enum-type/index.js", "../utils.js"], function (_export, _context) {
  "use strict";

  var Orientation, cloneObject, createInnerAudioContextPolyfill, _tt$getAudioContext, minigame, systemInfo, landscapeOrientation, _accelerometerCb;

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

      cloneObject(minigame, tt); // #region platform related

      minigame.tt = {};
      minigame.tt.getAudioContext = (_tt$getAudioContext = tt.getAudioContext) === null || _tt$getAudioContext === void 0 ? void 0 : _tt$getAudioContext.bind(tt); // #endregion platform related
      // #region SystemInfo

      systemInfo = minigame.getSystemInfoSync();
      minigame.isDevTool = systemInfo.platform === 'devtools';
      minigame.isLandscape = systemInfo.screenWidth > systemInfo.screenHeight; // init landscapeOrientation as LANDSCAPE_RIGHT

      landscapeOrientation = Orientation.LANDSCAPE_RIGHT;
      tt.onDeviceOrientationChange(function (res) {
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
          tt.offAccelerometerChange(_accelerometerCb);
          _accelerometerCb = undefined;
        }
      };

      minigame.startAccelerometer = function (res) {
        if (_accelerometerCb) {
          tt.onAccelerometerChange(_accelerometerCb);
        }

        tt.startAccelerometer(res);
      }; // #endregion Accelerometer


      minigame.createInnerAudioContext = createInnerAudioContextPolyfill(tt, {
        onPlay: true,
        onPause: true,
        onStop: true,
        onSeek: true
      }); // #region SafeArea
      // FIX_ME: wrong safe area when orientation is landscape left

      minigame.getSafeArea = function () {
        var locSystemInfo = tt.getSystemInfoSync();
        var _locSystemInfo$safeAr = locSystemInfo.safeArea,
            top = _locSystemInfo$safeAr.top,
            left = _locSystemInfo$safeAr.left,
            right = _locSystemInfo$safeAr.right;
        var _locSystemInfo$safeAr2 = locSystemInfo.safeArea,
            bottom = _locSystemInfo$safeAr2.bottom,
            width = _locSystemInfo$safeAr2.width,
            height = _locSystemInfo$safeAr2.height; // HACK: on iOS device, the orientation should mannually rotate

        if (locSystemInfo.platform === 'ios' && !minigame.isDevTool && minigame.isLandscape) {
          var tmpTop = top;
          var tmpLeft = left;
          var tmpBottom = bottom;
          var tmpRight = right;
          var tmpWidth = width;
          var tmpHeight = height;
          top = tmpLeft;
          left = tmpTop;
          right = tmpRight - tmpTop;
        }

        return {
          top: top,
          left: left,
          bottom: bottom,
          right: right,
          width: width,
          height: height
        };
      }; // #endregion SafeArea

    }
  };
});
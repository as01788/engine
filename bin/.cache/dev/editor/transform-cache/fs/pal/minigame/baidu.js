"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minigame = void 0;

var _index = require("../screen-adapter/enum-type/index.js");

var _utils = require("../utils.js");

// @ts-expect-error can't init minigame when it's declared
const minigame = {};
exports.minigame = minigame;
(0, _utils.cloneObject)(minigame, swan); // #region SystemInfo

const systemInfo = minigame.getSystemInfoSync();
minigame.isDevTool = systemInfo.platform === 'devtools';
minigame.isLandscape = systemInfo.screenWidth > systemInfo.screenHeight; // init landscapeOrientation as LANDSCAPE_RIGHT

let landscapeOrientation = _index.Orientation.LANDSCAPE_RIGHT;
swan.onDeviceOrientationChange(res => {
  if (res.value === 'landscape') {
    landscapeOrientation = _index.Orientation.LANDSCAPE_RIGHT;
  } else if (res.value === 'landscapeReverse') {
    landscapeOrientation = _index.Orientation.LANDSCAPE_LEFT;
  }
});
Object.defineProperty(minigame, 'orientation', {
  get() {
    return minigame.isLandscape ? landscapeOrientation : _index.Orientation.PORTRAIT;
  }

}); // #endregion SystemInfo
// #region Accelerometer

let _customAccelerometerCb;

let _innerAccelerometerCb;

minigame.onAccelerometerChange = function (cb) {
  // swan.offAccelerometerChange() is not supported.
  // so we can only register AccelerometerChange callback, but can't unregister.
  if (!_innerAccelerometerCb) {
    _innerAccelerometerCb = res => {
      var _customAccelerometerC;

      let x = res.x;
      let y = res.y;

      if (minigame.isLandscape) {
        const orientationFactor = landscapeOrientation === _index.Orientation.LANDSCAPE_RIGHT ? 1 : -1;
        const tmp = x;
        x = -y * orientationFactor;
        y = tmp * orientationFactor;
      }

      const resClone = {
        x,
        y,
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


minigame.createInnerAudioContext = (0, _utils.createInnerAudioContextPolyfill)(swan, {
  onPlay: true,
  onPause: true,
  onStop: true,
  onSeek: false
}); // #region SafeArea

minigame.getSafeArea = function () {
  console.warn('getSafeArea is not supported on this platform');
  const systemInfo = minigame.getSystemInfoSync();
  return {
    top: 0,
    left: 0,
    bottom: systemInfo.screenHeight,
    right: systemInfo.screenWidth,
    width: systemInfo.screenWidth,
    height: systemInfo.screenHeight
  };
}; // #endregion SafeArea
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minigame = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index = require("../screen-adapter/enum-type/index.js");

var _utils = require("../utils.js");

// @ts-expect-error can't init minigame when it's declared
const minigame = {};
exports.minigame = minigame;
(0, _utils.cloneObject)(minigame, ral); // #region SystemInfo

const systemInfo = minigame.getSystemInfoSync();
minigame.isDevTool = systemInfo.platform === 'devtools'; // NOTE: size and orientation info is wrong at the init phase, need to define as a getter

Object.defineProperty(minigame, 'isLandscape', {
  get() {
    if (_internal253Aconstants.VIVO) {
      return systemInfo.screenWidth > systemInfo.screenHeight;
    } else {
      const locSysInfo = minigame.getSystemInfoSync();
      return locSysInfo.screenWidth > locSysInfo.screenHeight;
    }
  }

}); // init landscapeOrientation as LANDSCAPE_RIGHT

const landscapeOrientation = _index.Orientation.LANDSCAPE_RIGHT; // NOTE: onDeviceOrientationChange is not supported on this platform
// ral.onDeviceOrientationChange((res) => {
//     if (res.value === 'landscape') {
//         landscapeOrientation = Orientation.LANDSCAPE_RIGHT;
//     } else if (res.value === 'landscapeReverse') {
//         landscapeOrientation = Orientation.LANDSCAPE_LEFT;
//     }
// });

Object.defineProperty(minigame, 'orientation', {
  get() {
    return minigame.isLandscape ? landscapeOrientation : _index.Orientation.PORTRAIT;
  }

});

if (_internal253Aconstants.VIVO) {
  // TODO: need to be handled in ral lib.
  minigame.getSystemInfoSync = function () {
    const sys = ral.getSystemInfoSync(); // on VIVO, windowWidth should be windowHeight when it is landscape

    sys.windowWidth = sys.screenWidth;
    sys.windowHeight = sys.screenHeight;
    return sys;
  };
} else if (_internal253Aconstants.LINKSURE) {
  // TODO: update system info when view resized, currently the resize callback is not supported.
  const cachedSystemInfo = ral.getSystemInfoSync();

  minigame.getSystemInfoSync = function () {
    return cachedSystemInfo;
  };
} // #endregion SystemInfo
// #region Accelerometer


let _customAccelerometerCb;

let _innerAccelerometerCb;

let _needHandleAccelerometerCb = false;

minigame.onAccelerometerChange = function (cb) {
  if (!_innerAccelerometerCb) {
    _innerAccelerometerCb = res => {
      var _customAccelerometerC;

      if (!_needHandleAccelerometerCb) {
        return;
      }

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


if (_internal253Aconstants.COCOSPLAY) {
  minigame.createInnerAudioContext = (0, _utils.createInnerAudioContextPolyfill)(ral, {
    onPlay: true,
    // polyfill for vivo
    onPause: true,
    onStop: true,
    onSeek: true
  }, true);
} else {
  minigame.createInnerAudioContext = (0, _utils.createInnerAudioContextPolyfill)(ral, {
    onPlay: true,
    // polyfill for vivo
    onPause: true,
    onStop: true,
    onSeek: true
  });
} // #region SafeArea


minigame.getSafeArea = function () {
  const locSystemInfo = ral.getSystemInfoSync();

  if (locSystemInfo.safeArea) {
    return locSystemInfo.safeArea;
  } else {
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
  }
}; // #endregion SafeArea
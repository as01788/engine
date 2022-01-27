"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minigame = void 0;

var _index = require("../screen-adapter/enum-type/index.js");

var _utils = require("../utils.js");

var _wx$onKeyDown, _wx$onKeyUp, _wx$onMouseDown, _wx$onMouseMove, _wx$onMouseUp, _wx$onWheel;

// @ts-expect-error can't init minigame when it's declared
const minigame = {};
exports.minigame = minigame;
(0, _utils.cloneObject)(minigame, wx); // #region platform related

minigame.wx = {};
minigame.wx.onKeyDown = (_wx$onKeyDown = wx.onKeyDown) === null || _wx$onKeyDown === void 0 ? void 0 : _wx$onKeyDown.bind(wx);
minigame.wx.onKeyUp = (_wx$onKeyUp = wx.onKeyUp) === null || _wx$onKeyUp === void 0 ? void 0 : _wx$onKeyUp.bind(wx);
minigame.wx.onMouseDown = (_wx$onMouseDown = wx.onMouseDown) === null || _wx$onMouseDown === void 0 ? void 0 : _wx$onMouseDown.bind(wx);
minigame.wx.onMouseMove = (_wx$onMouseMove = wx.onMouseMove) === null || _wx$onMouseMove === void 0 ? void 0 : _wx$onMouseMove.bind(wx);
minigame.wx.onMouseUp = (_wx$onMouseUp = wx.onMouseUp) === null || _wx$onMouseUp === void 0 ? void 0 : _wx$onMouseUp.bind(wx);
minigame.wx.onWheel = (_wx$onWheel = wx.onWheel) === null || _wx$onWheel === void 0 ? void 0 : _wx$onWheel.bind(wx); // #endregion platform related
// #region SystemInfo

let _cachedSystemInfo = wx.getSystemInfoSync(); // @ts-expect-error TODO: move into minigame.d.ts


minigame.testAndUpdateSystemInfoCache = function (testAmount, testInterval) {
  let successfullyTestTimes = 0;
  let intervalTimer = null;

  function testCachedSystemInfo() {
    const currentSystemInfo = wx.getSystemInfoSync();

    if (_cachedSystemInfo.screenWidth === currentSystemInfo.screenWidth && _cachedSystemInfo.screenHeight === currentSystemInfo.screenHeight) {
      if (++successfullyTestTimes >= testAmount && intervalTimer !== null) {
        clearInterval(intervalTimer);
        intervalTimer = null;
      }
    } else {
      successfullyTestTimes = 0;
    }

    _cachedSystemInfo = currentSystemInfo;
  }

  intervalTimer = setInterval(testCachedSystemInfo, testInterval);
}; // @ts-expect-error TODO: update when view resize


minigame.testAndUpdateSystemInfoCache(10, 500);

minigame.getSystemInfoSync = function () {
  return _cachedSystemInfo;
};

const systemInfo = minigame.getSystemInfoSync();
minigame.isDevTool = systemInfo.platform === 'devtools'; // NOTE: size and orientation info is wrong at the init phase, especially on iOS device

Object.defineProperty(minigame, 'isLandscape', {
  get() {
    const locSystemInfo = wx.getSystemInfoSync();

    if (typeof locSystemInfo.deviceOrientation === 'string') {
      return locSystemInfo.deviceOrientation.startsWith('landscape');
    } else {
      return locSystemInfo.screenWidth > locSystemInfo.screenHeight;
    }
  }

}); // init landscapeOrientation as LANDSCAPE_RIGHT

let landscapeOrientation = _index.Orientation.LANDSCAPE_RIGHT;

if (systemInfo.platform.toLocaleLowerCase() !== 'android') {
  // onDeviceOrientationChange doesn't work well on Android.
  // see this issue: https://developers.weixin.qq.com/community/minigame/doc/000482138dc460e56cfaa5cb15bc00
  wx.onDeviceOrientationChange(res => {
    if (res.value === 'landscape') {
      landscapeOrientation = _index.Orientation.LANDSCAPE_RIGHT;
    } else if (res.value === 'landscapeReverse') {
      landscapeOrientation = _index.Orientation.LANDSCAPE_LEFT;
    }
  });
}

Object.defineProperty(minigame, 'orientation', {
  get() {
    return minigame.isLandscape ? landscapeOrientation : _index.Orientation.PORTRAIT;
  }

}); // #endregion SystemInfo
// #region Accelerometer

let _accelerometerCb;

minigame.onAccelerometerChange = function (cb) {
  minigame.offAccelerometerChange(); // onAccelerometerChange would start accelerometer
  // so we won't call this method here

  _accelerometerCb = res => {
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
    cb(resClone);
  };
};

minigame.offAccelerometerChange = function (cb) {
  if (_accelerometerCb) {
    wx.offAccelerometerChange(_accelerometerCb);
    _accelerometerCb = undefined;
  }
};

minigame.startAccelerometer = function (res) {
  if (_accelerometerCb) {
    wx.onAccelerometerChange(_accelerometerCb);
  }

  wx.startAccelerometer(res);
}; // #endregion Accelerometer


minigame.createInnerAudioContext = (0, _utils.createInnerAudioContextPolyfill)(wx, {
  onPlay: true,
  onPause: true,
  onStop: true,
  onSeek: false
}, true); // #region SafeArea
// FIX_ME: wrong safe area when orientation is landscape left

minigame.getSafeArea = function () {
  const locSystemInfo = wx.getSystemInfoSync();
  return locSystemInfo.safeArea;
}; // #endregion SafeArea
// HACK: adapt GL.useProgram: use program not supported to unbind program on pc end


if (systemInfo.platform === 'windows' && (0, _utils.versionCompare)(systemInfo.SDKVersion, '2.16.0') < 0) {
  // @ts-expect-error canvas defined in global
  const locCanvas = canvas;

  if (locCanvas) {
    const webglRC = locCanvas.getContext('webgl');
    const originalUseProgram = webglRC.useProgram.bind(webglRC);

    webglRC.useProgram = function (program) {
      if (program) {
        originalUseProgram(program);
      }
    };
  }
}
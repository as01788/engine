"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minigame = void 0;

var _index = require("../screen-adapter/enum-type/index.js");

var _utils = require("../utils.js");

var _tt$getAudioContext;

// @ts-expect-error can't init minigame when it's declared
const minigame = {};
exports.minigame = minigame;
(0, _utils.cloneObject)(minigame, tt); // #region platform related

minigame.tt = {};
minigame.tt.getAudioContext = (_tt$getAudioContext = tt.getAudioContext) === null || _tt$getAudioContext === void 0 ? void 0 : _tt$getAudioContext.bind(tt); // #endregion platform related
// #region SystemInfo

const systemInfo = minigame.getSystemInfoSync();
minigame.isDevTool = systemInfo.platform === 'devtools';
minigame.isLandscape = systemInfo.screenWidth > systemInfo.screenHeight; // init landscapeOrientation as LANDSCAPE_RIGHT

let landscapeOrientation = _index.Orientation.LANDSCAPE_RIGHT;
tt.onDeviceOrientationChange(res => {
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


minigame.createInnerAudioContext = (0, _utils.createInnerAudioContextPolyfill)(tt, {
  onPlay: true,
  onPause: true,
  onStop: true,
  onSeek: true
}); // #region SafeArea
// FIX_ME: wrong safe area when orientation is landscape left

minigame.getSafeArea = function () {
  const locSystemInfo = tt.getSystemInfoSync();
  let {
    top,
    left,
    right
  } = locSystemInfo.safeArea;
  const {
    bottom,
    width,
    height
  } = locSystemInfo.safeArea; // HACK: on iOS device, the orientation should mannually rotate

  if (locSystemInfo.platform === 'ios' && !minigame.isDevTool && minigame.isLandscape) {
    const tmpTop = top;
    const tmpLeft = left;
    const tmpBottom = bottom;
    const tmpRight = right;
    const tmpWidth = width;
    const tmpHeight = height;
    top = tmpLeft;
    left = tmpTop;
    right = tmpRight - tmpTop;
  }

  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  };
}; // #endregion SafeArea
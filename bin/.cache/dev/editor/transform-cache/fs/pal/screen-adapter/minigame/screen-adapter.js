"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.screenAdapter = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _minigame = require("pal/minigame");

var _systemInfo = require("pal/system-info");

var _debug = require("../../../cocos/core/platform/debug.js");

var _eventTarget = require("../../../cocos/core/event/event-target.js");

var _index = require("../../../cocos/core/math/index.js");

var _index2 = require("../../system-info/enum-type/index.js");

var _index3 = require("../enum-type/index.js");

// HACK: In some platform like CocosPlay or Alipay iOS end
// the windowSize need to rotate when init screenAdapter if it's landscape
let rotateLandscape = false;

try {
  if (_internal253Aconstants.ALIPAY) {
    if (_systemInfo.systemInfo.os === _index2.OS.IOS && !_minigame.minigame.isDevTool) {
      // @ts-expect-error TODO: use pal/fs
      const fs = my.getFileSystemManager();
      const screenOrientation = JSON.parse(fs.readFileSync({
        filePath: 'game.json',
        encoding: 'utf8'
      }).data).screenOrientation;
      rotateLandscape = screenOrientation === 'landscape';
    }
  } else if (_internal253Aconstants.COCOSPLAY) {
    // @ts-expect-error TODO: use pal/fs
    const fs = ral.getFileSystemManager();
    const deviceOrientation = JSON.parse(fs.readFileSync('game.config.json', 'utf8')).deviceOrientation;
    rotateLandscape = deviceOrientation === 'landscape';
  }
} catch (e) {
  console.error(e);
}

class ScreenAdapter extends _eventTarget.EventTarget {
  get supportFullScreen() {
    return false;
  }

  get isFullScreen() {
    return false;
  }

  get devicePixelRatio() {
    const sysInfo = _minigame.minigame.getSystemInfoSync();

    return sysInfo.pixelRatio;
  }

  get windowSize() {
    const sysInfo = _minigame.minigame.getSystemInfoSync(); // NOTE: screen size info on these platforms is in physical pixel.
    // No need to multiply with DPR.


    const dpr = _internal253Aconstants.ALIPAY && _systemInfo.systemInfo.os === _index2.OS.ANDROID || _internal253Aconstants.VIVO ? 1 : this.devicePixelRatio;
    let screenWidth = sysInfo.screenWidth;
    let screenHeight = sysInfo.screenHeight;

    if ((_internal253Aconstants.COCOSPLAY || _internal253Aconstants.ALIPAY) && rotateLandscape && screenWidth < screenHeight) {
      const temp = screenWidth;
      screenWidth = screenHeight;
      screenHeight = temp;
    }

    return new _index.Size(screenWidth * dpr, screenHeight * dpr);
  }

  set windowSize(size) {
    (0, _debug.warnID)(1221);
  }

  get resolution() {
    const windowSize = this.windowSize;
    const resolutionScale = this.resolutionScale;
    return new _index.Size(windowSize.width * resolutionScale, windowSize.height * resolutionScale);
  }

  get resolutionScale() {
    return this._resolutionScale;
  }

  set resolutionScale(value) {
    var _this$_cbToUpdateFram;

    if (value === this._resolutionScale) {
      return;
    }

    this._resolutionScale = value;
    (_this$_cbToUpdateFram = this._cbToUpdateFrameBuffer) === null || _this$_cbToUpdateFram === void 0 ? void 0 : _this$_cbToUpdateFram.call(this);
  }

  get orientation() {
    return _minigame.minigame.orientation;
  }

  set orientation(value) {
    console.warn('Setting orientation is not supported yet.');
  }

  get safeAreaEdge() {
    const minigameSafeArea = _minigame.minigame.getSafeArea();

    const windowSize = this.windowSize; // NOTE: safe area info on vivo platform is in physical pixel.
    // No need to multiply with DPR.

    const dpr = _internal253Aconstants.VIVO ? 1 : this.devicePixelRatio;
    let topEdge = minigameSafeArea.top * dpr;
    let bottomEdge = windowSize.height - minigameSafeArea.bottom * dpr;
    let leftEdge = minigameSafeArea.left * dpr;
    let rightEdge = windowSize.width - minigameSafeArea.right * dpr;
    const orientation = this.orientation; // Make it symmetrical.

    if (orientation === _index3.Orientation.PORTRAIT) {
      if (topEdge < bottomEdge) {
        topEdge = bottomEdge;
      } else {
        bottomEdge = topEdge;
      }
    } else if (leftEdge < rightEdge) {
      leftEdge = rightEdge;
    } else {
      rightEdge = leftEdge;
    }

    return {
      top: topEdge,
      bottom: bottomEdge,
      left: leftEdge,
      right: rightEdge
    };
  }

  get isProportionalToFrame() {
    return this._isProportionalToFrame;
  }

  set isProportionalToFrame(v) {}

  constructor() {
    super(); // TODO: onResize or onOrientationChange is not supported well

    this.isFrameRotated = false;
    this.handleResizeEvent = true;
    this._cbToUpdateFrameBuffer = void 0;
    this._resolutionScale = 1;
    this._isProportionalToFrame = false;
  }

  init(options, cbToRebuildFrameBuffer) {
    this._cbToUpdateFrameBuffer = cbToRebuildFrameBuffer;

    this._cbToUpdateFrameBuffer();
  }

  requestFullScreen() {
    return Promise.reject(new Error('request fullscreen is not supported on this platform.'));
  }

  exitFullScreen() {
    return Promise.reject(new Error('exit fullscreen is not supported on this platform.'));
  }

}

const screenAdapter = new ScreenAdapter();
exports.screenAdapter = screenAdapter;
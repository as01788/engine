"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.screenAdapter = void 0;

var _eventTarget = require("../../../cocos/core/event/event-target.js");

var _index = require("../../../cocos/core/math/index.js");

var _index2 = require("../enum-type/index.js");

// these value is defined in the native layer
const orientationMap = {
  0: _index2.Orientation.PORTRAIT,
  '-90': _index2.Orientation.LANDSCAPE_LEFT,
  90: _index2.Orientation.LANDSCAPE_RIGHT,
  180: _index2.Orientation.PORTRAIT_UPSIDE_DOWN
};

class ScreenAdapter extends _eventTarget.EventTarget {
  get supportFullScreen() {
    return false;
  }

  get isFullScreen() {
    return false;
  }

  get devicePixelRatio() {
    return jsb.device.getDevicePixelRatio() || 1;
  }

  get windowSize() {
    const dpr = this.devicePixelRatio; // NOTE: fix precision issue on Metal render end.

    const roundWidth = Math.round(window.innerWidth);
    const roundHeight = Math.round(window.innerHeight);
    return new _index.Size(roundWidth * dpr, roundHeight * dpr);
  }

  set windowSize(size) {
    console.warn('Setting window size is not supported yet.');
  }

  get resolution() {
    const windowSize = this.windowSize;
    const resolutionScale = this.resolutionScale;
    return new _index.Size(windowSize.width * resolutionScale, windowSize.height * resolutionScale);
  }

  get resolutionScale() {
    return this._resolutionScale;
  }

  set resolutionScale(v) {
    var _this$_cbToUpdateFram;

    if (v === this._resolutionScale) {
      return;
    }

    this._resolutionScale = v;
    (_this$_cbToUpdateFram = this._cbToUpdateFrameBuffer) === null || _this$_cbToUpdateFram === void 0 ? void 0 : _this$_cbToUpdateFram.call(this);
  }

  get orientation() {
    return orientationMap[jsb.device.getDeviceOrientation()];
  }

  set orientation(value) {
    console.warn('Setting orientation is not supported yet.');
  }

  get safeAreaEdge() {
    const nativeSafeArea = jsb.device.getSafeAreaEdge();
    const dpr = this.devicePixelRatio;
    let topEdge = nativeSafeArea.x * dpr;
    let bottomEdge = nativeSafeArea.z * dpr;
    let leftEdge = nativeSafeArea.y * dpr;
    let rightEdge = nativeSafeArea.w * dpr;
    const orientation = this.orientation; // Make it symmetrical.

    if (orientation === _index2.Orientation.PORTRAIT) {
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
    super();
    this.isFrameRotated = false;
    this.handleResizeEvent = true;
    this._cbToUpdateFrameBuffer = void 0;
    this._resolutionScale = 1;
    this._isProportionalToFrame = false;

    this._registerEvent();
  }

  init(options, cbToRebuildFrameBuffer) {
    this._cbToUpdateFrameBuffer = cbToRebuildFrameBuffer;

    this._cbToUpdateFrameBuffer();
  }

  requestFullScreen() {
    return Promise.reject(new Error('request fullscreen has not been supported yet on this platform.'));
  }

  exitFullScreen() {
    return Promise.reject(new Error('exit fullscreen has not been supported yet on this platform.'));
  }

  _registerEvent() {
    jsb.onResize = size => {
      if (size.width === 0 || size.height === 0) return;
      size.width /= this.devicePixelRatio;
      size.height /= this.devicePixelRatio; // TODO: remove this function calling

      window.resize(size.width, size.height);
      this.emit('window-resize');
    };

    jsb.onOrientationChanged = event => {
      this.emit('orientation-change');
    };
  }

}

const screenAdapter = new ScreenAdapter();
exports.screenAdapter = screenAdapter;
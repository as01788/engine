"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccelerometerInputSource = void 0;

var _systemInfo = require("pal/system-info");

var _screenAdapter = require("pal/screen-adapter");

var _eventTarget = require("../../../cocos/core/event/event-target.js");

var _index = require("../../system-info/enum-type/index.js");

var _index2 = require("../../../cocos/input/types/index.js");

var _eventEnum = require("../../../cocos/input/types/event-enum.js");

class AccelerometerInputSource {
  constructor() {
    this._intervalInMileSeconds = 200;
    this._accelTimer = 0;
    this._eventTarget = new _eventTarget.EventTarget();
    this._deviceEventName = void 0;
    this._globalEventClass = void 0;
    this._didAccelerateFunc = void 0;
    // init event name
    this._globalEventClass = window.DeviceMotionEvent || window.DeviceOrientationEvent; // TODO fix DeviceMotionEvent bug on QQ Browser version 4.1 and below.

    if (_systemInfo.systemInfo.browserType === _index.BrowserType.MOBILE_QQ) {
      this._globalEventClass = window.DeviceOrientationEvent;
    }

    this._deviceEventName = this._globalEventClass === window.DeviceMotionEvent ? 'devicemotion' : 'deviceorientation';
    this._didAccelerateFunc = this._didAccelerate.bind(this);
  }

  _registerEvent() {
    this._accelTimer = performance.now();
    window.addEventListener(this._deviceEventName, this._didAccelerateFunc, false);
  }

  _unregisterEvent() {
    this._accelTimer = 0;
    window.removeEventListener(this._deviceEventName, this._didAccelerateFunc, false);
  }

  _didAccelerate(event) {
    const now = performance.now();

    if (now - this._accelTimer < this._intervalInMileSeconds) {
      return;
    }

    this._accelTimer = now;
    let x = 0;
    let y = 0;
    let z = 0;

    if (this._globalEventClass === window.DeviceMotionEvent) {
      const deviceMotionEvent = event;
      const eventAcceleration = deviceMotionEvent.accelerationIncludingGravity;
      x = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.x) || 0) * 0.1;
      y = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.y) || 0) * 0.1;
      z = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.z) || 0) * 0.1;
    } else {
      const deviceOrientationEvent = event;
      x = (deviceOrientationEvent.gamma || 0) / 90 * 0.981;
      y = -((deviceOrientationEvent.beta || 0) / 90) * 0.981;
      z = (deviceOrientationEvent.alpha || 0) / 90 * 0.981;
    }

    if (_screenAdapter.screenAdapter.isFrameRotated) {
      const tmp = x;
      x = -y;
      y = tmp;
    } // TODO: window.orientation is deprecated: https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation
    // try to use experimental screen.orientation: https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation


    const PORTRAIT = 0;
    const LANDSCAPE_LEFT = -90;
    const PORTRAIT_UPSIDE_DOWN = 180;
    const LANDSCAPE_RIGHT = 90;
    const tmpX = x;

    if (window.orientation === LANDSCAPE_RIGHT) {
      x = -y;
      y = tmpX;
    } else if (window.orientation === LANDSCAPE_LEFT) {
      x = y;
      y = -tmpX;
    } else if (window.orientation === PORTRAIT_UPSIDE_DOWN) {
      x = -x;
      y = -y;
    } // fix android acc values are opposite


    if (_systemInfo.systemInfo.os === _index.OS.ANDROID && _systemInfo.systemInfo.browserType !== _index.BrowserType.MOBILE_QQ) {
      x = -x;
      y = -y;
    }

    const timestamp = performance.now();
    const acceleration = new _index2.Acceleration(x, y, z, timestamp);
    const eventAcceleration = new _index2.EventAcceleration(acceleration);

    this._eventTarget.emit(_eventEnum.InputEventType.DEVICEMOTION, eventAcceleration);
  }

  start() {
    // for iOS 13+, safari
    if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response === 'granted') {
          this._registerEvent();
        }
      }).catch(e => {});
    } else {
      this._registerEvent();
    }
  }

  stop() {
    this._unregisterEvent();
  }

  setInterval(intervalInMileSeconds) {
    this._intervalInMileSeconds = intervalInMileSeconds;
  }

  on(eventType, callback, target) {
    this._eventTarget.on(eventType, callback, target);
  }

}

exports.AccelerometerInputSource = AccelerometerInputSource;
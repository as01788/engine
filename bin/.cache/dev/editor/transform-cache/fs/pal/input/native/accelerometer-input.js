"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccelerometerInputSource = void 0;

var _systemInfo = require("pal/system-info");

var _screenAdapter = require("pal/screen-adapter");

var _index = require("../../../cocos/core/event/index.js");

var _index2 = require("../../system-info/enum-type/index.js");

var _index3 = require("../../screen-adapter/enum-type/index.js");

var _index4 = require("../../../cocos/input/types/index.js");

var _eventEnum = require("../../../cocos/input/types/event-enum.js");

class AccelerometerInputSource {
  constructor() {
    this._intervalInSeconds = 0.2;
    this._intervalId = void 0;
    this._isEnabled = false;
    this._eventTarget = new _index.EventTarget();
    this._didAccelerateFunc = void 0;
    this._didAccelerateFunc = this._didAccelerate.bind(this);
  }

  _didAccelerate() {
    const deviceMotionValue = jsb.device.getDeviceMotionValue();
    let x = deviceMotionValue[3] * 0.1;
    let y = deviceMotionValue[4] * 0.1;
    const z = deviceMotionValue[5] * 0.1;
    const orientation = _screenAdapter.screenAdapter.orientation;
    const tmpX = x;

    if (orientation === _index3.Orientation.LANDSCAPE_RIGHT) {
      x = -y;
      y = tmpX;
    } else if (orientation === _index3.Orientation.LANDSCAPE_LEFT) {
      x = y;
      y = -tmpX;
    } else if (orientation === _index3.Orientation.PORTRAIT_UPSIDE_DOWN) {
      x = -x;
      y = -y;
    } // fix android acc values are opposite


    if (_systemInfo.systemInfo.os === _index2.OS.ANDROID || _systemInfo.systemInfo.os === _index2.OS.OHOS) {
      x = -x;
      y = -y;
    }

    const timestamp = performance.now();
    const acceleration = new _index4.Acceleration(x, y, z, timestamp);
    const eventAcceleration = new _index4.EventAcceleration(acceleration);

    this._eventTarget.emit(_eventEnum.InputEventType.DEVICEMOTION, eventAcceleration);
  }

  start() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }

    this._intervalId = setInterval(this._didAccelerateFunc, this._intervalInSeconds * 1000);
    jsb.device.setAccelerometerInterval(this._intervalInSeconds);
    jsb.device.setAccelerometerEnabled(true);
    this._isEnabled = true;
  }

  stop() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = undefined;
    }

    jsb.device.setAccelerometerEnabled(false);
    this._isEnabled = false;
  }

  setInterval(intervalInMileseconds) {
    this._intervalInSeconds = intervalInMileseconds / 1000;
    jsb.device.setAccelerometerInterval(this._intervalInSeconds);

    if (this._isEnabled) {
      // restart accelerometer
      jsb.device.setAccelerometerEnabled(false);
      jsb.device.setAccelerometerEnabled(true);
    }
  }

  on(eventType, callback, target) {
    this._eventTarget.on(eventType, callback, target);
  }

}

exports.AccelerometerInputSource = AccelerometerInputSource;
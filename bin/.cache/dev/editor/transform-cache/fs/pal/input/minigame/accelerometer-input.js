"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccelerometerInputSource = void 0;

var _minigame = require("pal/minigame");

var _index = require("../../../cocos/input/types/index.js");

var _index2 = require("../../../cocos/core/event/index.js");

var _eventEnum = require("../../../cocos/input/types/event-enum.js");

class AccelerometerInputSource {
  constructor() {
    this._isStarted = false;
    this._accelMode = 'normal';
    this._eventTarget = new _index2.EventTarget();
    this._didAccelerateFunc = void 0;
    this._didAccelerateFunc = this._didAccelerate.bind(this);
  }

  _registerEvent() {
    _minigame.minigame.onAccelerometerChange(this._didAccelerateFunc);
  }

  _unregisterEvent() {
    _minigame.minigame.offAccelerometerChange(this._didAccelerateFunc);
  }

  _didAccelerate(event) {
    const timestamp = performance.now();
    const acceleration = new _index.Acceleration(event.x, event.y, event.z, timestamp);
    const eventAcceleration = new _index.EventAcceleration(acceleration);

    this._eventTarget.emit(_eventEnum.InputEventType.DEVICEMOTION, eventAcceleration);
  }

  start() {
    this._registerEvent();

    _minigame.minigame.startAccelerometer({
      interval: this._accelMode,
      success: () => {
        this._isStarted = true;
      }
    });
  }

  stop() {
    _minigame.minigame.stopAccelerometer({
      success: () => {
        this._isStarted = false;
      },

      fail() {
        console.error('failed to stop accelerometer');
      }

    });

    this._unregisterEvent();
  }

  setInterval(intervalInMileseconds) {
    // reference: https://developers.weixin.qq.com/minigame/dev/api/device/accelerometer/wx.startAccelerometer.html
    if (intervalInMileseconds >= 200) {
      this._accelMode = 'normal';
    } else if (intervalInMileseconds >= 60) {
      this._accelMode = 'ui';
    } else {
      this._accelMode = 'game';
    }

    if (this._isStarted) {
      // restart accelerometer
      this.stop();
      this.start();
    }
  }

  on(eventType, callback, target) {
    this._eventTarget.on(eventType, callback, target);
  }

}

exports.AccelerometerInputSource = AccelerometerInputSource;
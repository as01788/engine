System.register("q-bundled:///fs/pal/input/web/accelerometer-input.js", ["pal/system-info", "pal/screen-adapter", "../../../cocos/core/event/event-target.js", "../../system-info/enum-type/index.js", "../../../cocos/input/types/index.js", "../../../cocos/input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var systemInfo, screenAdapter, EventTarget, BrowserType, OS, EventAcceleration, Acceleration, InputEventType, AccelerometerInputSource;
  return {
    setters: [function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_systemInfoEnumTypeIndexJs) {
      BrowserType = _systemInfoEnumTypeIndexJs.BrowserType;
      OS = _systemInfoEnumTypeIndexJs.OS;
    }, function (_cocosInputTypesIndexJs) {
      EventAcceleration = _cocosInputTypesIndexJs.EventAcceleration;
      Acceleration = _cocosInputTypesIndexJs.Acceleration;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }],
    execute: function () {
      _export("AccelerometerInputSource", AccelerometerInputSource = /*#__PURE__*/function () {
        function AccelerometerInputSource() {
          this._intervalInMileSeconds = 200;
          this._accelTimer = 0;
          this._eventTarget = new EventTarget();
          this._deviceEventName = void 0;
          this._globalEventClass = void 0;
          this._didAccelerateFunc = void 0;
          // init event name
          this._globalEventClass = window.DeviceMotionEvent || window.DeviceOrientationEvent; // TODO fix DeviceMotionEvent bug on QQ Browser version 4.1 and below.

          if (systemInfo.browserType === BrowserType.MOBILE_QQ) {
            this._globalEventClass = window.DeviceOrientationEvent;
          }

          this._deviceEventName = this._globalEventClass === window.DeviceMotionEvent ? 'devicemotion' : 'deviceorientation';
          this._didAccelerateFunc = this._didAccelerate.bind(this);
        }

        var _proto = AccelerometerInputSource.prototype;

        _proto._registerEvent = function _registerEvent() {
          this._accelTimer = performance.now();
          window.addEventListener(this._deviceEventName, this._didAccelerateFunc, false);
        };

        _proto._unregisterEvent = function _unregisterEvent() {
          this._accelTimer = 0;
          window.removeEventListener(this._deviceEventName, this._didAccelerateFunc, false);
        };

        _proto._didAccelerate = function _didAccelerate(event) {
          var now = performance.now();

          if (now - this._accelTimer < this._intervalInMileSeconds) {
            return;
          }

          this._accelTimer = now;
          var x = 0;
          var y = 0;
          var z = 0;

          if (this._globalEventClass === window.DeviceMotionEvent) {
            var deviceMotionEvent = event;
            var _eventAcceleration = deviceMotionEvent.accelerationIncludingGravity;
            x = ((_eventAcceleration === null || _eventAcceleration === void 0 ? void 0 : _eventAcceleration.x) || 0) * 0.1;
            y = ((_eventAcceleration === null || _eventAcceleration === void 0 ? void 0 : _eventAcceleration.y) || 0) * 0.1;
            z = ((_eventAcceleration === null || _eventAcceleration === void 0 ? void 0 : _eventAcceleration.z) || 0) * 0.1;
          } else {
            var deviceOrientationEvent = event;
            x = (deviceOrientationEvent.gamma || 0) / 90 * 0.981;
            y = -((deviceOrientationEvent.beta || 0) / 90) * 0.981;
            z = (deviceOrientationEvent.alpha || 0) / 90 * 0.981;
          }

          if (screenAdapter.isFrameRotated) {
            var tmp = x;
            x = -y;
            y = tmp;
          } // TODO: window.orientation is deprecated: https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation
          // try to use experimental screen.orientation: https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation


          var PORTRAIT = 0;
          var LANDSCAPE_LEFT = -90;
          var PORTRAIT_UPSIDE_DOWN = 180;
          var LANDSCAPE_RIGHT = 90;
          var tmpX = x;

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


          if (systemInfo.os === OS.ANDROID && systemInfo.browserType !== BrowserType.MOBILE_QQ) {
            x = -x;
            y = -y;
          }

          var timestamp = performance.now();
          var acceleration = new Acceleration(x, y, z, timestamp);
          var eventAcceleration = new EventAcceleration(acceleration);

          this._eventTarget.emit(InputEventType.DEVICEMOTION, eventAcceleration);
        };

        _proto.start = function start() {
          var _this = this;

          // for iOS 13+, safari
          if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission().then(function (response) {
              if (response === 'granted') {
                _this._registerEvent();
              }
            })["catch"](function (e) {});
          } else {
            this._registerEvent();
          }
        };

        _proto.stop = function stop() {
          this._unregisterEvent();
        };

        _proto.setInterval = function setInterval(intervalInMileSeconds) {
          this._intervalInMileSeconds = intervalInMileSeconds;
        };

        _proto.on = function on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        return AccelerometerInputSource;
      }());
    }
  };
});
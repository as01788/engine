System.register("q-bundled:///fs/pal/input/native/touch-input.js", ["pal/screen-adapter", "../../../cocos/core/math/index.js", "../../../cocos/core/event/index.js", "../../../cocos/input/types/index.js", "../touch-manager.js", "../../../cocos/core/platform/macro.js", "../../../cocos/input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var screenAdapter, Vec2, EventTarget, EventTouch, touchManager, macro, InputEventType, TouchInputSource;
  return {
    setters: [function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_cocosCoreMathIndexJs) {
      Vec2 = _cocosCoreMathIndexJs.Vec2;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_cocosInputTypesIndexJs) {
      EventTouch = _cocosInputTypesIndexJs.EventTouch;
    }, function (_touchManagerJs) {
      touchManager = _touchManagerJs.touchManager;
    }, function (_cocosCorePlatformMacroJs) {
      macro = _cocosCorePlatformMacroJs.macro;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }],
    execute: function () {
      _export("TouchInputSource", TouchInputSource = /*#__PURE__*/function () {
        function TouchInputSource() {
          this._eventTarget = new EventTarget();

          this._registerEvent();
        }

        var _proto = TouchInputSource.prototype;

        _proto._registerEvent = function _registerEvent() {
          jsb.onTouchStart = this._createCallback(InputEventType.TOUCH_START);
          jsb.onTouchMove = this._createCallback(InputEventType.TOUCH_MOVE);
          jsb.onTouchEnd = this._createCallback(InputEventType.TOUCH_END);
          jsb.onTouchCancel = this._createCallback(InputEventType.TOUCH_CANCEL);
        };

        _proto._createCallback = function _createCallback(eventType) {
          var _this = this;

          return function (changedTouches) {
            var handleTouches = [];
            var length = changedTouches.length;
            var windowSize = screenAdapter.windowSize;

            for (var i = 0; i < length; ++i) {
              var changedTouch = changedTouches[i];
              var touchID = changedTouch.identifier;

              if (touchID === null) {
                continue;
              }

              var location = _this._getLocation(changedTouch, windowSize);

              var touch = touchManager.getTouch(touchID, location.x, location.y);

              if (!touch) {
                continue;
              }

              if (eventType === InputEventType.TOUCH_END || eventType === InputEventType.TOUCH_CANCEL) {
                touchManager.releaseTouch(touchID);
              }

              handleTouches.push(touch);

              if (!macro.ENABLE_MULTI_TOUCH) {
                break;
              }
            }

            if (handleTouches.length > 0) {
              var eventTouch = new EventTouch(handleTouches, false, eventType, macro.ENABLE_MULTI_TOUCH ? touchManager.getAllTouches() : handleTouches);

              _this._eventTarget.emit(eventType, eventTouch);
            }
          };
        };

        _proto._getLocation = function _getLocation(touch, windowSize) {
          var dpr = screenAdapter.devicePixelRatio;
          var x = touch.clientX * dpr;
          var y = windowSize.height - touch.clientY * dpr;
          return new Vec2(x, y);
        };

        _proto.on = function on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        return TouchInputSource;
      }());
    }
  };
});
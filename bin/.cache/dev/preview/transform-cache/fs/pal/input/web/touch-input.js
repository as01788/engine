System.register("q-bundled:///fs/pal/input/web/touch-input.js", ["../../../../virtual/internal%253Aconstants.js", "pal/system-info", "pal/screen-adapter", "../../../cocos/core/math/index.js", "../../../cocos/core/event/index.js", "../../../cocos/input/types/index.js", "../touch-manager.js", "../../../cocos/core/platform/macro.js", "../../../cocos/input/types/event-enum.js", "../../system-info/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var TEST, systemInfo, screenAdapter, Rect, Vec2, EventTarget, EventTouch, touchManager, macro, InputEventType, Feature, TouchInputSource;
  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_cocosCoreMathIndexJs) {
      Rect = _cocosCoreMathIndexJs.Rect;
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
    }, function (_systemInfoEnumTypeIndexJs) {
      Feature = _systemInfoEnumTypeIndexJs.Feature;
    }],
    execute: function () {
      _export("TouchInputSource", TouchInputSource = /*#__PURE__*/function () {
        function TouchInputSource() {
          this._canvas = void 0;
          this._eventTarget = new EventTarget();

          if (systemInfo.hasFeature(Feature.INPUT_TOUCH)) {
            this._canvas = document.getElementById('GameCanvas');

            if (!this._canvas && !TEST) {
              console.warn('failed to access canvas');
            }

            this._registerEvent();
          }
        }

        var _proto = TouchInputSource.prototype;

        _proto._registerEvent = function _registerEvent() {
          var _this$_canvas, _this$_canvas2, _this$_canvas3, _this$_canvas4;

          // IDEA: need to register on window ?
          (_this$_canvas = this._canvas) === null || _this$_canvas === void 0 ? void 0 : _this$_canvas.addEventListener('touchstart', this._createCallback(InputEventType.TOUCH_START));
          (_this$_canvas2 = this._canvas) === null || _this$_canvas2 === void 0 ? void 0 : _this$_canvas2.addEventListener('touchmove', this._createCallback(InputEventType.TOUCH_MOVE));
          (_this$_canvas3 = this._canvas) === null || _this$_canvas3 === void 0 ? void 0 : _this$_canvas3.addEventListener('touchend', this._createCallback(InputEventType.TOUCH_END));
          (_this$_canvas4 = this._canvas) === null || _this$_canvas4 === void 0 ? void 0 : _this$_canvas4.addEventListener('touchcancel', this._createCallback(InputEventType.TOUCH_CANCEL));
        };

        _proto._createCallback = function _createCallback(eventType) {
          var _this = this;

          return function (event) {
            var canvasRect = _this._getCanvasRect();

            var handleTouches = [];
            var length = event.changedTouches.length;

            for (var i = 0; i < length; ++i) {
              var changedTouch = event.changedTouches[i];
              var touchID = changedTouch.identifier;

              if (touchID === null) {
                continue;
              }

              var location = _this._getLocation(changedTouch, canvasRect);

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

            event.stopPropagation();

            if (event.target === _this._canvas) {
              event.preventDefault();
            }

            if (eventType === InputEventType.TOUCH_START) {
              var _this$_canvas5;

              (_this$_canvas5 = _this._canvas) === null || _this$_canvas5 === void 0 ? void 0 : _this$_canvas5.focus();
            }

            if (handleTouches.length > 0) {
              var eventTouch = new EventTouch(handleTouches, false, eventType, macro.ENABLE_MULTI_TOUCH ? touchManager.getAllTouches() : handleTouches);

              _this._eventTarget.emit(eventType, eventTouch);
            }
          };
        };

        _proto._getCanvasRect = function _getCanvasRect() {
          var canvas = this._canvas;
          var box = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();

          if (box) {
            return new Rect(box.x, box.y, box.width, box.height);
          }

          return new Rect(0, 0, 0, 0);
        };

        _proto._getLocation = function _getLocation(touch, canvasRect) {
          var x = touch.clientX - canvasRect.x;
          var y = canvasRect.y + canvasRect.height - touch.clientY;

          if (screenAdapter.isFrameRotated) {
            var tmp = x;
            x = canvasRect.height - y;
            y = tmp;
          }

          var dpr = screenAdapter.devicePixelRatio;
          x *= dpr;
          y *= dpr;
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
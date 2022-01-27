System.register("q-bundled:///fs/pal/input/native/mouse-input.js", ["pal/screen-adapter", "../../../cocos/input/types/index.js", "../../../cocos/core/event/index.js", "../../../cocos/core/math/index.js", "../../../cocos/input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var screenAdapter, EventMouse, EventTarget, Vec2, InputEventType, MouseInputSource;
  return {
    setters: [function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_cocosInputTypesIndexJs) {
      EventMouse = _cocosInputTypesIndexJs.EventMouse;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_cocosCoreMathIndexJs) {
      Vec2 = _cocosCoreMathIndexJs.Vec2;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }],
    execute: function () {
      _export("MouseInputSource", MouseInputSource = /*#__PURE__*/function () {
        function MouseInputSource() {
          this._eventTarget = new EventTarget();
          this._preMousePos = new Vec2();
          this._isPressed = false;

          this._registerEvent();
        }

        var _proto = MouseInputSource.prototype;

        _proto._getLocation = function _getLocation(event) {
          var windowSize = screenAdapter.windowSize;
          var dpr = screenAdapter.devicePixelRatio;
          var x = event.x * dpr;
          var y = windowSize.height - event.y * dpr;
          return new Vec2(x, y);
        };

        _proto._registerEvent = function _registerEvent() {
          jsb.onMouseDown = this._createCallback(InputEventType.MOUSE_DOWN);
          jsb.onMouseMove = this._createCallback(InputEventType.MOUSE_MOVE);
          jsb.onMouseUp = this._createCallback(InputEventType.MOUSE_UP);
          jsb.onMouseWheel = this._handleMouseWheel.bind(this);
        };

        _proto._createCallback = function _createCallback(eventType) {
          var _this = this;

          return function (mouseEvent) {
            var location = _this._getLocation(mouseEvent);

            var button = mouseEvent.button;

            switch (eventType) {
              case InputEventType.MOUSE_DOWN:
                _this._isPressed = true;
                break;

              case InputEventType.MOUSE_UP:
                _this._isPressed = false;
                break;

              case InputEventType.MOUSE_MOVE:
                if (!_this._isPressed) {
                  button = EventMouse.BUTTON_MISSING;
                }

                break;

              default:
                break;
            }

            var eventMouse = new EventMouse(eventType, false, _this._preMousePos);
            eventMouse.setLocation(location.x, location.y);
            eventMouse.setButton(button);
            eventMouse.movementX = location.x - _this._preMousePos.x;
            eventMouse.movementY = _this._preMousePos.y - location.y; // update previous mouse position.

            _this._preMousePos.set(location.x, location.y);

            _this._eventTarget.emit(eventType, eventMouse);
          };
        };

        _proto._handleMouseWheel = function _handleMouseWheel(mouseEvent) {
          var eventType = InputEventType.MOUSE_WHEEL;

          var location = this._getLocation(mouseEvent);

          var button = mouseEvent.button;
          var eventMouse = new EventMouse(eventType, false, this._preMousePos);
          eventMouse.setLocation(location.x, location.y);
          eventMouse.setButton(button);
          eventMouse.movementX = location.x - this._preMousePos.x;
          eventMouse.movementY = this._preMousePos.y - location.y;
          var matchStandardFactor = 120;
          eventMouse.setScrollData(mouseEvent.wheelDeltaX * matchStandardFactor, mouseEvent.wheelDeltaY * matchStandardFactor); // update previous mouse position.

          this._preMousePos.set(location.x, location.y);

          this._eventTarget.emit(eventType, eventMouse);
        };

        _proto.on = function on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        return MouseInputSource;
      }());
    }
  };
});
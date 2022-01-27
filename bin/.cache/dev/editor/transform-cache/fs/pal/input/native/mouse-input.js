"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MouseInputSource = void 0;

var _screenAdapter = require("pal/screen-adapter");

var _index = require("../../../cocos/input/types/index.js");

var _index2 = require("../../../cocos/core/event/index.js");

var _index3 = require("../../../cocos/core/math/index.js");

var _eventEnum = require("../../../cocos/input/types/event-enum.js");

class MouseInputSource {
  constructor() {
    this._eventTarget = new _index2.EventTarget();
    this._preMousePos = new _index3.Vec2();
    this._isPressed = false;

    this._registerEvent();
  }

  _getLocation(event) {
    const windowSize = _screenAdapter.screenAdapter.windowSize;
    const dpr = _screenAdapter.screenAdapter.devicePixelRatio;
    const x = event.x * dpr;
    const y = windowSize.height - event.y * dpr;
    return new _index3.Vec2(x, y);
  }

  _registerEvent() {
    jsb.onMouseDown = this._createCallback(_eventEnum.InputEventType.MOUSE_DOWN);
    jsb.onMouseMove = this._createCallback(_eventEnum.InputEventType.MOUSE_MOVE);
    jsb.onMouseUp = this._createCallback(_eventEnum.InputEventType.MOUSE_UP);
    jsb.onMouseWheel = this._handleMouseWheel.bind(this);
  }

  _createCallback(eventType) {
    return mouseEvent => {
      const location = this._getLocation(mouseEvent);

      let button = mouseEvent.button;

      switch (eventType) {
        case _eventEnum.InputEventType.MOUSE_DOWN:
          this._isPressed = true;
          break;

        case _eventEnum.InputEventType.MOUSE_UP:
          this._isPressed = false;
          break;

        case _eventEnum.InputEventType.MOUSE_MOVE:
          if (!this._isPressed) {
            button = _index.EventMouse.BUTTON_MISSING;
          }

          break;

        default:
          break;
      }

      const eventMouse = new _index.EventMouse(eventType, false, this._preMousePos);
      eventMouse.setLocation(location.x, location.y);
      eventMouse.setButton(button);
      eventMouse.movementX = location.x - this._preMousePos.x;
      eventMouse.movementY = this._preMousePos.y - location.y; // update previous mouse position.

      this._preMousePos.set(location.x, location.y);

      this._eventTarget.emit(eventType, eventMouse);
    };
  }

  _handleMouseWheel(mouseEvent) {
    const eventType = _eventEnum.InputEventType.MOUSE_WHEEL;

    const location = this._getLocation(mouseEvent);

    const button = mouseEvent.button;
    const eventMouse = new _index.EventMouse(eventType, false, this._preMousePos);
    eventMouse.setLocation(location.x, location.y);
    eventMouse.setButton(button);
    eventMouse.movementX = location.x - this._preMousePos.x;
    eventMouse.movementY = this._preMousePos.y - location.y;
    const matchStandardFactor = 120;
    eventMouse.setScrollData(mouseEvent.wheelDeltaX * matchStandardFactor, mouseEvent.wheelDeltaY * matchStandardFactor); // update previous mouse position.

    this._preMousePos.set(location.x, location.y);

    this._eventTarget.emit(eventType, eventMouse);
  }

  on(eventType, callback, target) {
    this._eventTarget.on(eventType, callback, target);
  }

}

exports.MouseInputSource = MouseInputSource;
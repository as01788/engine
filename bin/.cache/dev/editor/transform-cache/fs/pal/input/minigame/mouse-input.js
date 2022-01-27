"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MouseInputSource = void 0;

var _minigame = require("pal/minigame");

var _screenAdapter = require("pal/screen-adapter");

var _systemInfo = require("pal/system-info");

var _index = require("../../../cocos/core/math/index.js");

var _index2 = require("../../../cocos/core/event/index.js");

var _index3 = require("../../../cocos/input/types/index.js");

var _eventEnum = require("../../../cocos/input/types/event-enum.js");

var _index4 = require("../../system-info/enum-type/index.js");

class MouseInputSource {
  constructor() {
    this._eventTarget = new _index2.EventTarget();
    this._isPressed = false;
    this._preMousePos = new _index.Vec2();

    if (_systemInfo.systemInfo.hasFeature(_index4.Feature.EVENT_MOUSE)) {
      this._registerEvent();
    }
  }

  _getLocation(event) {
    const windowSize = _screenAdapter.screenAdapter.windowSize;
    const dpr = _screenAdapter.screenAdapter.devicePixelRatio;
    const x = event.x * dpr;
    const y = windowSize.height - event.y * dpr;
    return new _index.Vec2(x, y);
  }

  _registerEvent() {
    var _minigame$wx, _minigame$wx$onMouseD, _minigame$wx2, _minigame$wx2$onMouse, _minigame$wx3, _minigame$wx3$onMouse, _minigame$wx4, _minigame$wx4$onWheel;

    (_minigame$wx = _minigame.minigame.wx) === null || _minigame$wx === void 0 ? void 0 : (_minigame$wx$onMouseD = _minigame$wx.onMouseDown) === null || _minigame$wx$onMouseD === void 0 ? void 0 : _minigame$wx$onMouseD.call(_minigame$wx, this._createCallback(_eventEnum.InputEventType.MOUSE_DOWN));
    (_minigame$wx2 = _minigame.minigame.wx) === null || _minigame$wx2 === void 0 ? void 0 : (_minigame$wx2$onMouse = _minigame$wx2.onMouseMove) === null || _minigame$wx2$onMouse === void 0 ? void 0 : _minigame$wx2$onMouse.call(_minigame$wx2, this._createCallback(_eventEnum.InputEventType.MOUSE_MOVE));
    (_minigame$wx3 = _minigame.minigame.wx) === null || _minigame$wx3 === void 0 ? void 0 : (_minigame$wx3$onMouse = _minigame$wx3.onMouseUp) === null || _minigame$wx3$onMouse === void 0 ? void 0 : _minigame$wx3$onMouse.call(_minigame$wx3, this._createCallback(_eventEnum.InputEventType.MOUSE_UP));
    (_minigame$wx4 = _minigame.minigame.wx) === null || _minigame$wx4 === void 0 ? void 0 : (_minigame$wx4$onWheel = _minigame$wx4.onWheel) === null || _minigame$wx4$onWheel === void 0 ? void 0 : _minigame$wx4$onWheel.call(_minigame$wx4, this._handleMouseWheel.bind(this));
  }

  _createCallback(eventType) {
    return event => {
      const location = this._getLocation(event);

      let button = event.button;

      switch (eventType) {
        case _eventEnum.InputEventType.MOUSE_DOWN:
          this._isPressed = true;
          break;

        case _eventEnum.InputEventType.MOUSE_UP:
          this._isPressed = false;
          break;

        case _eventEnum.InputEventType.MOUSE_MOVE:
          if (!this._isPressed) {
            button = _index3.EventMouse.BUTTON_MISSING;
          }

          break;

        default:
          break;
      }

      const eventMouse = new _index3.EventMouse(eventType, false, this._preMousePos);
      eventMouse.setLocation(location.x, location.y);
      eventMouse.setButton(button);
      eventMouse.movementX = location.x - this._preMousePos.x;
      eventMouse.movementY = this._preMousePos.y - location.y; // update previous mouse position.

      this._preMousePos.set(location.x, location.y);

      this._eventTarget.emit(eventType, eventMouse);
    };
  }

  _handleMouseWheel(event) {
    const eventType = _eventEnum.InputEventType.MOUSE_WHEEL;

    const location = this._getLocation(event);

    const button = event.button;
    const eventMouse = new _index3.EventMouse(eventType, false, this._preMousePos);
    eventMouse.setLocation(location.x, location.y);
    eventMouse.setButton(button);
    eventMouse.movementX = location.x - this._preMousePos.x;
    eventMouse.movementY = this._preMousePos.y - location.y;
    eventMouse.setScrollData(event.deltaX, event.deltaY); // update previous mouse position.

    this._preMousePos.set(location.x, location.y);

    this._eventTarget.emit(_eventEnum.InputEventType.MOUSE_WHEEL, eventMouse);
  }

  on(eventType, callback, target) {
    this._eventTarget.on(eventType, callback, target);
  }

}

exports.MouseInputSource = MouseInputSource;
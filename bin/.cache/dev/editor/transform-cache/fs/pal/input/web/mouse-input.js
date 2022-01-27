"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MouseInputSource = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _systemInfo = require("pal/system-info");

var _screenAdapter = require("pal/screen-adapter");

var _index = require("../../../cocos/input/types/index.js");

var _index2 = require("../../../cocos/core/event/index.js");

var _index3 = require("../../../cocos/core/math/index.js");

var _eventEnum = require("../../../cocos/input/types/event-enum.js");

var _index4 = require("../../system-info/enum-type/index.js");

class MouseInputSource {
  constructor() {
    this._canvas = void 0;
    this._eventTarget = new _index2.EventTarget();
    this._pointLocked = false;
    this._isPressed = false;
    this._preMousePos = new _index3.Vec2();

    if (_systemInfo.systemInfo.hasFeature(_index4.Feature.EVENT_MOUSE)) {
      this._canvas = document.getElementById('GameCanvas');

      if (!this._canvas && !_internal253Aconstants.TEST) {
        console.warn('failed to access canvas');
      }

      this._registerEvent();
    }
  }

  _getCanvasRect() {
    const canvas = this._canvas;
    const box = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();

    if (box) {
      return new _index3.Rect(box.x, box.y, box.width, box.height);
    }

    return new _index3.Rect(0, 0, 0, 0);
  }

  _getLocation(mouseEvent) {
    const canvasRect = this._getCanvasRect();

    const dpr = _screenAdapter.screenAdapter.devicePixelRatio;
    let x = this._pointLocked ? this._preMousePos.x / dpr + mouseEvent.movementX : mouseEvent.clientX - canvasRect.x;
    let y = this._pointLocked ? this._preMousePos.y / dpr - mouseEvent.movementY : canvasRect.y + canvasRect.height - mouseEvent.clientY;
    x *= dpr;
    y *= dpr;
    return new _index3.Vec2(x, y);
  }

  _registerEvent() {
    var _this$_canvas, _this$_canvas2, _this$_canvas3, _this$_canvas4;

    // register mouse down event
    window.addEventListener('mousedown', () => {
      this._isPressed = true;
    });
    (_this$_canvas = this._canvas) === null || _this$_canvas === void 0 ? void 0 : _this$_canvas.addEventListener('mousedown', this._createCallback(_eventEnum.InputEventType.MOUSE_DOWN)); // register mouse move event

    (_this$_canvas2 = this._canvas) === null || _this$_canvas2 === void 0 ? void 0 : _this$_canvas2.addEventListener('mousemove', this._createCallback(_eventEnum.InputEventType.MOUSE_MOVE)); // register mouse up event

    const handleMouseUp = this._createCallback(_eventEnum.InputEventType.MOUSE_UP);

    window.addEventListener('mouseup', handleMouseUp);
    (_this$_canvas3 = this._canvas) === null || _this$_canvas3 === void 0 ? void 0 : _this$_canvas3.addEventListener('mouseup', handleMouseUp); // register wheel event

    (_this$_canvas4 = this._canvas) === null || _this$_canvas4 === void 0 ? void 0 : _this$_canvas4.addEventListener('wheel', this._handleMouseWheel.bind(this));

    this._registerPointerLockEvent();
  } // To be removed in the future.


  _registerPointerLockEvent() {
    const lockChangeAlert = () => {
      const canvas = this._canvas; // @ts-expect-error undefined mozPointerLockElement

      if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
        this._pointLocked = true;
      } else {
        this._pointLocked = false;
      }
    };

    if ('onpointerlockchange' in document) {
      document.addEventListener('pointerlockchange', lockChangeAlert, false);
    } else if ('onmozpointerlockchange' in document) {
      document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    }
  }

  _createCallback(eventType) {
    return mouseEvent => {
      var _this$_canvas5;

      const location = this._getLocation(mouseEvent);

      let button = mouseEvent.button;

      switch (eventType) {
        case _eventEnum.InputEventType.MOUSE_DOWN:
          (_this$_canvas5 = this._canvas) === null || _this$_canvas5 === void 0 ? void 0 : _this$_canvas5.focus();
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
      eventMouse.movementX = mouseEvent.movementX;
      eventMouse.movementY = mouseEvent.movementY; // update previous mouse position.

      this._preMousePos.set(location.x, location.y);

      mouseEvent.stopPropagation();

      if (mouseEvent.target === this._canvas) {
        mouseEvent.preventDefault();
      }

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
    eventMouse.movementX = mouseEvent.movementX;
    eventMouse.movementY = mouseEvent.movementY;
    const wheelSensitivityFactor = 5;
    eventMouse.setScrollData(mouseEvent.deltaX * wheelSensitivityFactor, -mouseEvent.deltaY * wheelSensitivityFactor); // update previous mouse position.

    this._preMousePos.set(location.x, location.y);

    mouseEvent.stopPropagation();

    if (mouseEvent.target === this._canvas) {
      mouseEvent.preventDefault();
    }

    this._eventTarget.emit(eventType, eventMouse);
  }

  on(eventType, callback, target) {
    this._eventTarget.on(eventType, callback, target);
  }

}

exports.MouseInputSource = MouseInputSource;
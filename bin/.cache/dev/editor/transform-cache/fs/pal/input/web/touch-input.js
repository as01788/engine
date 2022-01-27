"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchInputSource = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _systemInfo = require("pal/system-info");

var _screenAdapter = require("pal/screen-adapter");

var _index = require("../../../cocos/core/math/index.js");

var _index2 = require("../../../cocos/core/event/index.js");

var _index3 = require("../../../cocos/input/types/index.js");

var _touchManager = require("../touch-manager.js");

var _macro = require("../../../cocos/core/platform/macro.js");

var _eventEnum = require("../../../cocos/input/types/event-enum.js");

var _index4 = require("../../system-info/enum-type/index.js");

class TouchInputSource {
  constructor() {
    this._canvas = void 0;
    this._eventTarget = new _index2.EventTarget();

    if (_systemInfo.systemInfo.hasFeature(_index4.Feature.INPUT_TOUCH)) {
      this._canvas = document.getElementById('GameCanvas');

      if (!this._canvas && !_internal253Aconstants.TEST) {
        console.warn('failed to access canvas');
      }

      this._registerEvent();
    }
  }

  _registerEvent() {
    var _this$_canvas, _this$_canvas2, _this$_canvas3, _this$_canvas4;

    // IDEA: need to register on window ?
    (_this$_canvas = this._canvas) === null || _this$_canvas === void 0 ? void 0 : _this$_canvas.addEventListener('touchstart', this._createCallback(_eventEnum.InputEventType.TOUCH_START));
    (_this$_canvas2 = this._canvas) === null || _this$_canvas2 === void 0 ? void 0 : _this$_canvas2.addEventListener('touchmove', this._createCallback(_eventEnum.InputEventType.TOUCH_MOVE));
    (_this$_canvas3 = this._canvas) === null || _this$_canvas3 === void 0 ? void 0 : _this$_canvas3.addEventListener('touchend', this._createCallback(_eventEnum.InputEventType.TOUCH_END));
    (_this$_canvas4 = this._canvas) === null || _this$_canvas4 === void 0 ? void 0 : _this$_canvas4.addEventListener('touchcancel', this._createCallback(_eventEnum.InputEventType.TOUCH_CANCEL));
  }

  _createCallback(eventType) {
    return event => {
      const canvasRect = this._getCanvasRect();

      const handleTouches = [];
      const length = event.changedTouches.length;

      for (let i = 0; i < length; ++i) {
        const changedTouch = event.changedTouches[i];
        const touchID = changedTouch.identifier;

        if (touchID === null) {
          continue;
        }

        const location = this._getLocation(changedTouch, canvasRect);

        const touch = _touchManager.touchManager.getTouch(touchID, location.x, location.y);

        if (!touch) {
          continue;
        }

        if (eventType === _eventEnum.InputEventType.TOUCH_END || eventType === _eventEnum.InputEventType.TOUCH_CANCEL) {
          _touchManager.touchManager.releaseTouch(touchID);
        }

        handleTouches.push(touch);

        if (!_macro.macro.ENABLE_MULTI_TOUCH) {
          break;
        }
      }

      event.stopPropagation();

      if (event.target === this._canvas) {
        event.preventDefault();
      }

      if (eventType === _eventEnum.InputEventType.TOUCH_START) {
        var _this$_canvas5;

        (_this$_canvas5 = this._canvas) === null || _this$_canvas5 === void 0 ? void 0 : _this$_canvas5.focus();
      }

      if (handleTouches.length > 0) {
        const eventTouch = new _index3.EventTouch(handleTouches, false, eventType, _macro.macro.ENABLE_MULTI_TOUCH ? _touchManager.touchManager.getAllTouches() : handleTouches);

        this._eventTarget.emit(eventType, eventTouch);
      }
    };
  }

  _getCanvasRect() {
    const canvas = this._canvas;
    const box = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();

    if (box) {
      return new _index.Rect(box.x, box.y, box.width, box.height);
    }

    return new _index.Rect(0, 0, 0, 0);
  }

  _getLocation(touch, canvasRect) {
    let x = touch.clientX - canvasRect.x;
    let y = canvasRect.y + canvasRect.height - touch.clientY;

    if (_screenAdapter.screenAdapter.isFrameRotated) {
      const tmp = x;
      x = canvasRect.height - y;
      y = tmp;
    }

    const dpr = _screenAdapter.screenAdapter.devicePixelRatio;
    x *= dpr;
    y *= dpr;
    return new _index.Vec2(x, y);
  }

  on(eventType, callback, target) {
    this._eventTarget.on(eventType, callback, target);
  }

}

exports.TouchInputSource = TouchInputSource;
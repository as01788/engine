"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchInputSource = void 0;

var _minigame = require("pal/minigame");

var _screenAdapter = require("pal/screen-adapter");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../../cocos/core/math/index.js");

var _index2 = require("../../../cocos/core/event/index.js");

var _index3 = require("../../../cocos/input/types/index.js");

var _touchManager = require("../touch-manager.js");

var _macro = require("../../../cocos/core/platform/macro.js");

var _eventEnum = require("../../../cocos/input/types/event-enum.js");

class TouchInputSource {
  constructor() {
    this._eventTarget = new _index2.EventTarget();

    this._registerEvent();
  }

  _registerEvent() {
    _minigame.minigame.onTouchStart(this._createCallback(_eventEnum.InputEventType.TOUCH_START));

    _minigame.minigame.onTouchMove(this._createCallback(_eventEnum.InputEventType.TOUCH_MOVE));

    _minigame.minigame.onTouchEnd(this._createCallback(_eventEnum.InputEventType.TOUCH_END));

    _minigame.minigame.onTouchCancel(this._createCallback(_eventEnum.InputEventType.TOUCH_CANCEL));
  }

  _createCallback(eventType) {
    return event => {
      const handleTouches = [];
      const windowSize = _screenAdapter.screenAdapter.windowSize;
      const length = event.changedTouches.length;

      for (let i = 0; i < length; ++i) {
        const changedTouch = event.changedTouches[i];
        const touchID = changedTouch.identifier;

        if (touchID === null) {
          continue;
        }

        const location = this._getLocation(changedTouch, windowSize);

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

      if (handleTouches.length > 0) {
        const eventTouch = new _index3.EventTouch(handleTouches, false, eventType, _macro.macro.ENABLE_MULTI_TOUCH ? _touchManager.touchManager.getAllTouches() : handleTouches);

        this._eventTarget.emit(eventType, eventTouch);
      }
    };
  }

  _getLocation(touch, windowSize) {
    // NOTE: touch position on vivo platform is in physical pixel.
    // No need to multiply with DPR.
    const dpr = _internal253Aconstants.VIVO ? 1 : _screenAdapter.screenAdapter.devicePixelRatio;
    const x = touch.clientX * dpr;
    const y = windowSize.height - touch.clientY * dpr;
    return new _index.Vec2(x, y);
  }

  on(eventType, callback, target) {
    this._eventTarget.on(eventType, callback, target);
  }

}

exports.TouchInputSource = TouchInputSource;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardInputSource = void 0;

var _index = require("../../../cocos/input/types/index.js");

var _index2 = require("../../../cocos/core/event/index.js");

var _eventEnum = require("../../../cocos/input/types/event-enum.js");

const nativeKeyCode2KeyCode = {
  12: _index.KeyCode.NUM_LOCK,
  10048: _index.KeyCode.NUM_0,
  10049: _index.KeyCode.NUM_1,
  10050: _index.KeyCode.NUM_2,
  10051: _index.KeyCode.NUM_3,
  10052: _index.KeyCode.NUM_4,
  10053: _index.KeyCode.NUM_5,
  10054: _index.KeyCode.NUM_6,
  10055: _index.KeyCode.NUM_7,
  10056: _index.KeyCode.NUM_8,
  10057: _index.KeyCode.NUM_9,
  20013: _index.KeyCode.NUM_ENTER,
  20016: _index.KeyCode.SHIFT_RIGHT,
  20017: _index.KeyCode.CTRL_RIGHT,
  20018: _index.KeyCode.ALT_RIGHT
};

function getKeyCode(keyCode) {
  return nativeKeyCode2KeyCode[keyCode] || keyCode;
}

class KeyboardInputSource {
  // On native platform, KeyboardEvent.repeat is always false, so we need a map to manage the key state.
  constructor() {
    this._eventTarget = new _index2.EventTarget();
    this._keyStateMap = {};

    this._registerEvent();
  }

  _registerEvent() {
    jsb.onKeyDown = event => {
      const keyCode = getKeyCode(event.keyCode);

      if (!this._keyStateMap[keyCode]) {
        const eventKeyDown = this._getInputEvent(event, _eventEnum.InputEventType.KEY_DOWN);

        this._eventTarget.emit(_eventEnum.InputEventType.KEY_DOWN, eventKeyDown);
      } else {
        const eventKeyPressing = this._getInputEvent(event, _eventEnum.InputEventType.KEY_PRESSING);

        this._eventTarget.emit(_eventEnum.InputEventType.KEY_PRESSING, eventKeyPressing);
      }

      this._keyStateMap[keyCode] = true;
    };

    jsb.onKeyUp = event => {
      const keyCode = getKeyCode(event.keyCode);

      const eventKeyUp = this._getInputEvent(event, _eventEnum.InputEventType.KEY_UP);

      this._keyStateMap[keyCode] = false;

      this._eventTarget.emit(_eventEnum.InputEventType.KEY_UP, eventKeyUp);
    };
  }

  _getInputEvent(event, eventType) {
    const keyCode = getKeyCode(event.keyCode);
    const eventKeyboard = new _index.EventKeyboard(keyCode, eventType);
    return eventKeyboard;
  }

  on(eventType, callback, target) {
    this._eventTarget.on(eventType, callback, target);
  }

}

exports.KeyboardInputSource = KeyboardInputSource;
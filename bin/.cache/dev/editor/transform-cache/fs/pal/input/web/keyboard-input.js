"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardInputSource = void 0;

var _index = require("../../../cocos/input/types/index.js");

var _index2 = require("../../../cocos/core/event/index.js");

var _eventEnum = require("../../../cocos/input/types/event-enum.js");

const code2KeyCode = {
  Backspace: _index.KeyCode.BACKSPACE,
  Tab: _index.KeyCode.TAB,
  Enter: _index.KeyCode.ENTER,
  ShiftLeft: _index.KeyCode.SHIFT_LEFT,
  ControlLeft: _index.KeyCode.CTRL_LEFT,
  AltLeft: _index.KeyCode.ALT_LEFT,
  ShiftRight: _index.KeyCode.SHIFT_RIGHT,
  ControlRight: _index.KeyCode.CTRL_RIGHT,
  AltRight: _index.KeyCode.ALT_RIGHT,
  Pause: _index.KeyCode.PAUSE,
  CapsLock: _index.KeyCode.CAPS_LOCK,
  Escape: _index.KeyCode.ESCAPE,
  Space: _index.KeyCode.SPACE,
  PageUp: _index.KeyCode.PAGE_UP,
  PageDown: _index.KeyCode.PAGE_DOWN,
  End: _index.KeyCode.END,
  Home: _index.KeyCode.HOME,
  ArrowLeft: _index.KeyCode.ARROW_LEFT,
  ArrowUp: _index.KeyCode.ARROW_UP,
  ArrowRight: _index.KeyCode.ARROW_RIGHT,
  ArrowDown: _index.KeyCode.ARROW_DOWN,
  Insert: _index.KeyCode.INSERT,
  Delete: _index.KeyCode.DELETE,
  Digit0: _index.KeyCode.DIGIT_0,
  Digit1: _index.KeyCode.DIGIT_1,
  Digit2: _index.KeyCode.DIGIT_2,
  Digit3: _index.KeyCode.DIGIT_3,
  Digit4: _index.KeyCode.DIGIT_4,
  Digit5: _index.KeyCode.DIGIT_5,
  Digit6: _index.KeyCode.DIGIT_6,
  Digit7: _index.KeyCode.DIGIT_7,
  Digit8: _index.KeyCode.DIGIT_8,
  Digit9: _index.KeyCode.DIGIT_9,
  KeyA: _index.KeyCode.KEY_A,
  KeyB: _index.KeyCode.KEY_B,
  KeyC: _index.KeyCode.KEY_C,
  KeyD: _index.KeyCode.KEY_D,
  KeyE: _index.KeyCode.KEY_E,
  KeyF: _index.KeyCode.KEY_F,
  KeyG: _index.KeyCode.KEY_G,
  KeyH: _index.KeyCode.KEY_H,
  KeyI: _index.KeyCode.KEY_I,
  KeyJ: _index.KeyCode.KEY_J,
  KeyK: _index.KeyCode.KEY_K,
  KeyL: _index.KeyCode.KEY_L,
  KeyM: _index.KeyCode.KEY_M,
  KeyN: _index.KeyCode.KEY_N,
  KeyO: _index.KeyCode.KEY_O,
  KeyP: _index.KeyCode.KEY_P,
  KeyQ: _index.KeyCode.KEY_Q,
  KeyR: _index.KeyCode.KEY_R,
  KeyS: _index.KeyCode.KEY_S,
  KeyT: _index.KeyCode.KEY_T,
  KeyU: _index.KeyCode.KEY_U,
  KeyV: _index.KeyCode.KEY_V,
  KeyW: _index.KeyCode.KEY_W,
  KeyX: _index.KeyCode.KEY_X,
  KeyY: _index.KeyCode.KEY_Y,
  KeyZ: _index.KeyCode.KEY_Z,
  Numpad0: _index.KeyCode.NUM_0,
  Numpad1: _index.KeyCode.NUM_1,
  Numpad2: _index.KeyCode.NUM_2,
  Numpad3: _index.KeyCode.NUM_3,
  Numpad4: _index.KeyCode.NUM_4,
  Numpad5: _index.KeyCode.NUM_5,
  Numpad6: _index.KeyCode.NUM_6,
  Numpad7: _index.KeyCode.NUM_7,
  Numpad8: _index.KeyCode.NUM_8,
  Numpad9: _index.KeyCode.NUM_9,
  NumpadMultiply: _index.KeyCode.NUM_MULTIPLY,
  NumpadAdd: _index.KeyCode.NUM_PLUS,
  NumpadSubtract: _index.KeyCode.NUM_SUBTRACT,
  NumpadDecimal: _index.KeyCode.NUM_DECIMAL,
  NumpadDivide: _index.KeyCode.NUM_DIVIDE,
  NumpadEnter: _index.KeyCode.NUM_ENTER,
  F1: _index.KeyCode.F1,
  F2: _index.KeyCode.F2,
  F3: _index.KeyCode.F3,
  F4: _index.KeyCode.F4,
  F5: _index.KeyCode.F5,
  F6: _index.KeyCode.F6,
  F7: _index.KeyCode.F7,
  F8: _index.KeyCode.F8,
  F9: _index.KeyCode.F9,
  F10: _index.KeyCode.F10,
  F11: _index.KeyCode.F11,
  F12: _index.KeyCode.F12,
  NumLock: _index.KeyCode.NUM_LOCK,
  ScrollLock: _index.KeyCode.SCROLL_LOCK,
  Semicolon: _index.KeyCode.SEMICOLON,
  Equal: _index.KeyCode.EQUAL,
  Comma: _index.KeyCode.COMMA,
  Minus: _index.KeyCode.DASH,
  Period: _index.KeyCode.PERIOD,
  Slash: _index.KeyCode.SLASH,
  Backquote: _index.KeyCode.BACK_QUOTE,
  BracketLeft: _index.KeyCode.BRACKET_LEFT,
  Backslash: _index.KeyCode.BACKSLASH,
  BracketRight: _index.KeyCode.BRACKET_RIGHT,
  Quote: _index.KeyCode.QUOTE
};

function getKeyCode(code) {
  return code2KeyCode[code] || _index.KeyCode.NONE;
}

class KeyboardInputSource {
  constructor() {
    this._eventTarget = new _index2.EventTarget();

    this._registerEvent();
  }

  _registerEvent() {
    const canvas = document.getElementById('GameCanvas');
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('keydown', event => {
      event.stopPropagation();
      event.preventDefault();

      if (!event.repeat) {
        const keyDownInputEvent = this._getInputEvent(event, _eventEnum.InputEventType.KEY_DOWN);

        this._eventTarget.emit(_eventEnum.InputEventType.KEY_DOWN, keyDownInputEvent);
      } else {
        const keyPressingInputEvent = this._getInputEvent(event, _eventEnum.InputEventType.KEY_PRESSING);

        this._eventTarget.emit(_eventEnum.InputEventType.KEY_PRESSING, keyPressingInputEvent);
      }
    });
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('keyup', event => {
      const inputEvent = this._getInputEvent(event, _eventEnum.InputEventType.KEY_UP);

      event.stopPropagation();
      event.preventDefault();

      this._eventTarget.emit(_eventEnum.InputEventType.KEY_UP, inputEvent);
    });
  }

  _getInputEvent(event, eventType) {
    const keyCode = getKeyCode(event.code);
    const eventKeyboard = new _index.EventKeyboard(keyCode, eventType);
    return eventKeyboard;
  }

  on(eventType, callback, target) {
    this._eventTarget.on(eventType, callback, target);
  }

}

exports.KeyboardInputSource = KeyboardInputSource;
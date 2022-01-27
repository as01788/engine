System.register("q-bundled:///fs/pal/input/minigame/keyboard-input.js", ["pal/minigame", "pal/system-info", "../../../cocos/input/types/index.js", "../../../cocos/core/event/index.js", "../../../cocos/input/types/event-enum.js", "../../system-info/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var minigame, systemInfo, KeyCode, EventKeyboard, EventTarget, InputEventType, Feature, code2KeyCode, KeyboardInputSource;

  function getKeyCode(code) {
    return code2KeyCode[code] || KeyCode.NONE;
  }

  return {
    setters: [function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_cocosInputTypesIndexJs) {
      KeyCode = _cocosInputTypesIndexJs.KeyCode;
      EventKeyboard = _cocosInputTypesIndexJs.EventKeyboard;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }, function (_systemInfoEnumTypeIndexJs) {
      Feature = _systemInfoEnumTypeIndexJs.Feature;
    }],
    execute: function () {
      code2KeyCode = {
        Backspace: KeyCode.BACKSPACE,
        Tab: KeyCode.TAB,
        Enter: KeyCode.ENTER,
        ShiftLeft: KeyCode.SHIFT_LEFT,
        ControlLeft: KeyCode.CTRL_LEFT,
        AltLeft: KeyCode.ALT_LEFT,
        ShiftRight: KeyCode.SHIFT_RIGHT,
        ControlRight: KeyCode.CTRL_RIGHT,
        AltRight: KeyCode.ALT_RIGHT,
        Pause: KeyCode.PAUSE,
        CapsLock: KeyCode.CAPS_LOCK,
        Escape: KeyCode.ESCAPE,
        Space: KeyCode.SPACE,
        PageUp: KeyCode.PAGE_UP,
        PageDown: KeyCode.PAGE_DOWN,
        End: KeyCode.END,
        Home: KeyCode.HOME,
        ArrowLeft: KeyCode.ARROW_LEFT,
        ArrowUp: KeyCode.ARROW_UP,
        ArrowRight: KeyCode.ARROW_RIGHT,
        ArrowDown: KeyCode.ARROW_DOWN,
        Insert: KeyCode.INSERT,
        Delete: KeyCode.DELETE,
        Digit0: KeyCode.DIGIT_0,
        Digit1: KeyCode.DIGIT_1,
        Digit2: KeyCode.DIGIT_2,
        Digit3: KeyCode.DIGIT_3,
        Digit4: KeyCode.DIGIT_4,
        Digit5: KeyCode.DIGIT_5,
        Digit6: KeyCode.DIGIT_6,
        Digit7: KeyCode.DIGIT_7,
        Digit8: KeyCode.DIGIT_8,
        Digit9: KeyCode.DIGIT_9,
        KeyA: KeyCode.KEY_A,
        KeyB: KeyCode.KEY_B,
        KeyC: KeyCode.KEY_C,
        KeyD: KeyCode.KEY_D,
        KeyE: KeyCode.KEY_E,
        KeyF: KeyCode.KEY_F,
        KeyG: KeyCode.KEY_G,
        KeyH: KeyCode.KEY_H,
        KeyI: KeyCode.KEY_I,
        KeyJ: KeyCode.KEY_J,
        KeyK: KeyCode.KEY_K,
        KeyL: KeyCode.KEY_L,
        KeyM: KeyCode.KEY_M,
        KeyN: KeyCode.KEY_N,
        KeyO: KeyCode.KEY_O,
        KeyP: KeyCode.KEY_P,
        KeyQ: KeyCode.KEY_Q,
        KeyR: KeyCode.KEY_R,
        KeyS: KeyCode.KEY_S,
        KeyT: KeyCode.KEY_T,
        KeyU: KeyCode.KEY_U,
        KeyV: KeyCode.KEY_V,
        KeyW: KeyCode.KEY_W,
        KeyX: KeyCode.KEY_X,
        KeyY: KeyCode.KEY_Y,
        KeyZ: KeyCode.KEY_Z,
        Numpad0: KeyCode.NUM_0,
        Numpad1: KeyCode.NUM_1,
        Numpad2: KeyCode.NUM_2,
        Numpad3: KeyCode.NUM_3,
        Numpad4: KeyCode.NUM_4,
        Numpad5: KeyCode.NUM_5,
        Numpad6: KeyCode.NUM_6,
        Numpad7: KeyCode.NUM_7,
        Numpad8: KeyCode.NUM_8,
        Numpad9: KeyCode.NUM_9,
        NumpadMultiply: KeyCode.NUM_MULTIPLY,
        NumpadAdd: KeyCode.NUM_PLUS,
        NumpadSubtract: KeyCode.NUM_SUBTRACT,
        NumpadDecimal: KeyCode.NUM_DECIMAL,
        NumpadDivide: KeyCode.NUM_DIVIDE,
        NumpadEnter: KeyCode.NUM_ENTER,
        F1: KeyCode.F1,
        F2: KeyCode.F2,
        F3: KeyCode.F3,
        F4: KeyCode.F4,
        F5: KeyCode.F5,
        F6: KeyCode.F6,
        F7: KeyCode.F7,
        F8: KeyCode.F8,
        F9: KeyCode.F9,
        F10: KeyCode.F10,
        F11: KeyCode.F11,
        F12: KeyCode.F12,
        NumLock: KeyCode.NUM_LOCK,
        ScrollLock: KeyCode.SCROLL_LOCK,
        Semicolon: KeyCode.SEMICOLON,
        Equal: KeyCode.EQUAL,
        Comma: KeyCode.COMMA,
        Minus: KeyCode.DASH,
        Period: KeyCode.PERIOD,
        Slash: KeyCode.SLASH,
        Backquote: KeyCode.BACK_QUOTE,
        BracketLeft: KeyCode.BRACKET_LEFT,
        Backslash: KeyCode.BACKSLASH,
        BracketRight: KeyCode.BRACKET_RIGHT,
        Quote: KeyCode.QUOTE
      };

      _export("KeyboardInputSource", KeyboardInputSource = /*#__PURE__*/function () {
        // KeyboardEvent.repeat is not supported on Wechat PC platform.
        function KeyboardInputSource() {
          this._eventTarget = new EventTarget();
          this._keyStateMap = {};

          if (systemInfo.hasFeature(Feature.EVENT_KEYBOARD)) {
            this._registerEvent();
          }
        }

        var _proto = KeyboardInputSource.prototype;

        _proto._registerEvent = function _registerEvent() {
          var _minigame$wx,
              _minigame$wx$onKeyDow,
              _this = this,
              _minigame$wx2,
              _minigame$wx2$onKeyUp;

          (_minigame$wx = minigame.wx) === null || _minigame$wx === void 0 ? void 0 : (_minigame$wx$onKeyDow = _minigame$wx.onKeyDown) === null || _minigame$wx$onKeyDow === void 0 ? void 0 : _minigame$wx$onKeyDow.call(_minigame$wx, function (res) {
            var keyCode = getKeyCode(res.code);

            if (!_this._keyStateMap[keyCode]) {
              var eventKeyDown = _this._getInputEvent(res, InputEventType.KEY_DOWN);

              _this._eventTarget.emit(InputEventType.KEY_DOWN, eventKeyDown);
            } else {
              var eventKeyPressing = _this._getInputEvent(res, InputEventType.KEY_PRESSING);

              _this._eventTarget.emit(InputEventType.KEY_PRESSING, eventKeyPressing);
            }

            _this._keyStateMap[keyCode] = true;
          });
          (_minigame$wx2 = minigame.wx) === null || _minigame$wx2 === void 0 ? void 0 : (_minigame$wx2$onKeyUp = _minigame$wx2.onKeyUp) === null || _minigame$wx2$onKeyUp === void 0 ? void 0 : _minigame$wx2$onKeyUp.call(_minigame$wx2, function (res) {
            var keyCode = getKeyCode(res.code);

            var eventKeyUp = _this._getInputEvent(res, InputEventType.KEY_UP);

            _this._keyStateMap[keyCode] = false;

            _this._eventTarget.emit(InputEventType.KEY_UP, eventKeyUp);
          });
        };

        _proto._getInputEvent = function _getInputEvent(event, eventType) {
          var keyCode = getKeyCode(event.code);
          var eventKeyboard = new EventKeyboard(keyCode, eventType);
          return eventKeyboard;
        };

        _proto.on = function on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        return KeyboardInputSource;
      }());
    }
  };
});
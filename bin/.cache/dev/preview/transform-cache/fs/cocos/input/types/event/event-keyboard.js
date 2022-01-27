System.register("q-bundled:///fs/cocos/input/types/event/event-keyboard.js", ["./event.js", "../event-enum.js"], function (_export, _context) {
  "use strict";

  var Event, SystemEventType, EventKeyboard;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_eventJs) {
      Event = _eventJs.Event;
    }, function (_eventEnumJs) {
      SystemEventType = _eventEnumJs.SystemEventType;
    }],
    execute: function () {
      /**
       * @en
       * The keyboard event.
       * @zh
       * 键盘事件。
       */
      _export("EventKeyboard", EventKeyboard = /*#__PURE__*/function (_Event) {
        _inheritsLoose(EventKeyboard, _Event);

        function EventKeyboard(keyCode, eventType, bubbles) {
          var _this;

          if (typeof eventType === 'boolean') {
            var _isPressed = eventType;
            eventType = _isPressed ? SystemEventType.KEY_DOWN : SystemEventType.KEY_UP;
          }

          _this = _Event.call(this, eventType, bubbles) || this;
          _this.keyCode = void 0;
          _this.rawEvent = void 0;
          _this._isPressed = void 0;
          _this._isPressed = eventType !== SystemEventType.KEY_UP;

          if (typeof keyCode === 'number') {
            _this.keyCode = keyCode;
          } else {
            _this.keyCode = keyCode.keyCode;
            _this.rawEvent = keyCode;
          }

          return _this;
        }

        _createClass(EventKeyboard, [{
          key: "isPressed",
          get:
          /**
           * @en The KeyCode enum value of current keyboard event.
           * @zh 当前键盘事件的 KeyCode 枚举值
           */

          /**
           * @en Raw DOM KeyboardEvent.
           * @zh 原始 DOM KeyboardEvent 事件对象
           *
           * @deprecated since v3.3, can't access rawEvent anymore
           */

          /**
           * @en Indicates whether the current key is being pressed
           * @zh 表示当前按键是否正在被按下
           */
          function get() {
            return this._isPressed;
          }
          /**
           * @param keyCode - The key code of the current key or the DOM KeyboardEvent
           * @param isPressed - Indicates whether the current key is being pressed, this is the DEPRECATED parameter.
           * @param bubbles - Indicates whether the event bubbles up through the hierarchy or not.
           */

        }]);

        return EventKeyboard;
      }(Event)); // @ts-expect-error TODO


      Event.EventKeyboard = EventKeyboard;
    }
  };
});
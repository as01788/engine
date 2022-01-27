System.register("q-bundled:///fs/cocos/input/types/event/event-acceleration.js", ["./event.js", "../event-enum.js"], function (_export, _context) {
  "use strict";

  var Event, SystemEventType, EventAcceleration;

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
       * The acceleration event.
       * @zh
       * 加速计事件。
       */
      _export("EventAcceleration", EventAcceleration = /*#__PURE__*/function (_Event) {
        _inheritsLoose(EventAcceleration, _Event);

        /**
         * @en The acceleration object
         * @zh 加速度对象
         */

        /**
         * @param acc - The acceleration
         * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
         */
        function EventAcceleration(acc, bubbles) {
          var _this;

          _this = _Event.call(this, SystemEventType.DEVICEMOTION, bubbles) || this;
          _this.acc = void 0;
          _this.acc = acc;
          return _this;
        }

        return EventAcceleration;
      }(Event)); // @ts-expect-error TODO


      Event.EventAcceleration = EventAcceleration;
    }
  };
});
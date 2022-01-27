System.register("q-bundled:///fs/cocos/input/system-event.js", ["../core/event/index.js", "./types/index.js", "./input.js", "../core/global-exports.js", "./types/event-enum.js"], function (_export, _context) {
  "use strict";

  var EventTarget, SystemEventType, input, legacyCC, InputEventType, _pointerEvent2SystemE, pointerEvent2SystemEvent, inputEvents, SystemEvent, systemEvent;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreEventIndexJs) {
      EventTarget = _coreEventIndexJs.EventTarget;
    }, function (_typesIndexJs) {
      SystemEventType = _typesIndexJs.SystemEventType;
    }, function (_inputJs) {
      input = _inputJs.input;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_typesEventEnumJs) {
      InputEventType = _typesEventEnumJs.InputEventType;
    }],
    execute: function () {
      _export("pointerEvent2SystemEvent", pointerEvent2SystemEvent = (_pointerEvent2SystemE = {}, _pointerEvent2SystemE[InputEventType.TOUCH_START] = "system-event-" + InputEventType.TOUCH_START, _pointerEvent2SystemE[InputEventType.TOUCH_MOVE] = "system-event-" + InputEventType.TOUCH_MOVE, _pointerEvent2SystemE[InputEventType.TOUCH_END] = "system-event-" + InputEventType.TOUCH_END, _pointerEvent2SystemE[InputEventType.TOUCH_CANCEL] = "system-event-" + InputEventType.TOUCH_CANCEL, _pointerEvent2SystemE[InputEventType.MOUSE_DOWN] = "system-event-" + InputEventType.MOUSE_DOWN, _pointerEvent2SystemE[InputEventType.MOUSE_MOVE] = "system-event-" + InputEventType.MOUSE_MOVE, _pointerEvent2SystemE[InputEventType.MOUSE_UP] = "system-event-" + InputEventType.MOUSE_UP, _pointerEvent2SystemE));

      inputEvents = Object.values(InputEventType);

      /**
       * @en
       * The System event, it currently supports keyboard events and accelerometer events.<br/>
       * You can get the `SystemEvent` instance with `systemEvent`.<br/>
       * @zh
       * 系统事件，它目前支持按键事件和重力感应事件。<br/>
       * 你可以通过 `systemEvent` 获取到 `SystemEvent` 的实例。<br/>
       *
       * @deprecated since v3.4.0, please use Input class instead.
       *
       * @example
       * ```
       * import { systemEvent, SystemEvent } from 'cc';
       * systemEvent.on(SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
       * systemEvent.off(SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
       * ```
       */
      _export("SystemEvent", SystemEvent = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(SystemEvent, _EventTarget);

        function SystemEvent() {
          return _EventTarget.apply(this, arguments) || this;
        }

        var _proto = SystemEvent.prototype;

        /**
         * @en
         * Sets whether to enable the accelerometer event listener or not.
         *
         * @zh
         * 是否启用加速度计事件。
         */
        _proto.setAccelerometerEnabled = function setAccelerometerEnabled(isEnabled) {
          input.setAccelerometerEnabled(isEnabled);
        }
        /**
         * @en
         * Sets the accelerometer interval value.
         *
         * @zh
         * 设置加速度计间隔值。
         */
        ;

        _proto.setAccelerometerInterval = function setAccelerometerInterval(interval) {
          input.setAccelerometerInterval(interval);
        }
        /**
         * @en
         * Register an callback of a specific system event type.
         * @zh
         * 注册特定事件类型回调。
         *
         * @param type - The event type
         * @param callback - The event listener's callback
         * @param target - The event listener's target and callee
         * @param once - Register the event listener once
         */
        // @ts-expect-error Property 'on' in type 'SystemEvent' is not assignable to the same property in base type
        ;

        _proto.on = function on(type, callback, target, once) {
          var registerMethod = once ? input.once : input.on; // @ts-expect-error wrong type mapping

          if (inputEvents.includes(type)) {
            // @ts-expect-error wrong type mapping
            var mappedPointerType = pointerEvent2SystemEvent[type];

            if (mappedPointerType) {
              // @ts-expect-error wrong type mapping
              registerMethod.call(input, mappedPointerType, callback, target);
            } else if (type === SystemEventType.KEY_DOWN) {
              // @ts-expect-error wrong mapped type
              registerMethod.call(input, InputEventType.KEY_DOWN, callback, target); // @ts-expect-error wrong mapped type

              registerMethod.call(input, InputEventType.KEY_PRESSING, callback, target, once);
            } else {
              // @ts-expect-error wrong type mapping
              registerMethod.call(input, type, callback, target);
            }
          } else {
            _EventTarget.prototype.on.call(this, type, callback, target, once);
          }

          return callback;
        }
        /**
         * @en
         * Removes the listeners previously registered with the same type, callback, target and or useCapture,
         * if only type is passed as parameter, all listeners registered with that type will be removed.
         * @zh
         * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
         *
         * @param type - A string representing the event type being removed.
         * @param callback - The callback to remove.
         * @param target - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
         */
        ;

        _proto.off = function off(type, callback, target) {
          // @ts-expect-error wrong type mapping
          if (inputEvents.includes(type)) {
            // @ts-expect-error wrong type mapping
            var mappedPointerType = pointerEvent2SystemEvent[type];

            if (mappedPointerType) {
              input.off(mappedPointerType, callback, target);
            } else if (type === SystemEventType.KEY_DOWN) {
              // @ts-expect-error wrong mapped type
              input.off(InputEventType.KEY_DOWN, callback, target); // @ts-expect-error wrong mapped type

              input.off(InputEventType.KEY_PRESSING, callback, target); // eslint-disable-next-line brace-style
            } else {
              // @ts-expect-error wrong type mapping
              input.off(type, callback, target);
            }
          } else {
            _EventTarget.prototype.off.call(this, type, callback, target);
          }
        };

        return SystemEvent;
      }(EventTarget));

      SystemEvent.EventType = SystemEventType;
      legacyCC.SystemEvent = SystemEvent;
      /**
       * @module cc
       */

      /**
       * @en The singleton of the SystemEvent, there should only be one instance to be used globally
       * @zh 系统事件单例，方便全局使用。
       *
       * @deprecated since v3.4.0, please use input instead.
       */

      _export("systemEvent", systemEvent = new SystemEvent());

      legacyCC.systemEvent = systemEvent;
    }
  };
});
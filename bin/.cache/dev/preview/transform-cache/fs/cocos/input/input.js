System.register("q-bundled:///fs/cocos/input/input.js", ["../../../virtual/internal%253Aconstants.js", "pal/input", "../../pal/input/touch-manager.js", "../core/platform/sys.js", "../core/event/event-target.js", "./types/index.js", "./types/event-enum.js"], function (_export, _context) {
  "use strict";

  var EDITOR, NATIVE, TouchInputSource, MouseInputSource, KeyboardInputSource, AccelerometerInputSource, touchManager, sys, EventTarget, EventTouch, InputEventType, _pointerEventTypeMap, pointerEventTypeMap, Input, input;

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      NATIVE = _virtualInternal253AconstantsJs.NATIVE;
    }, function (_palInput) {
      TouchInputSource = _palInput.TouchInputSource;
      MouseInputSource = _palInput.MouseInputSource;
      KeyboardInputSource = _palInput.KeyboardInputSource;
      AccelerometerInputSource = _palInput.AccelerometerInputSource;
    }, function (_palInputTouchManagerJs) {
      touchManager = _palInputTouchManagerJs.touchManager;
    }, function (_corePlatformSysJs) {
      sys = _corePlatformSysJs.sys;
    }, function (_coreEventEventTargetJs) {
      EventTarget = _coreEventEventTargetJs.EventTarget;
    }, function (_typesIndexJs) {
      EventTouch = _typesIndexJs.EventTouch;
    }, function (_typesEventEnumJs) {
      InputEventType = _typesEventEnumJs.InputEventType;
    }],
    execute: function () {
      pointerEventTypeMap = (_pointerEventTypeMap = {}, _pointerEventTypeMap[InputEventType.MOUSE_DOWN] = InputEventType.TOUCH_START, _pointerEventTypeMap[InputEventType.MOUSE_MOVE] = InputEventType.TOUCH_MOVE, _pointerEventTypeMap[InputEventType.MOUSE_UP] = InputEventType.TOUCH_END, _pointerEventTypeMap);

      /**
       * @en
       * This Input class manages all events of input. include: touch, mouse, accelerometer and keyboard.
       * You can get the `Input` instance with `input`.
       *
       * @zh
       * 该输入类管理所有的输入事件，包括：触摸、鼠标、加速计 和 键盘。
       * 你可以通过 `input` 获取到 `Input` 的实例。
       *
       * @example
       * ```
       * input.on(Input.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
       * input.off(Input.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
       * ```
       */
      _export("Input", Input = /*#__PURE__*/function () {
        /**
         * @en The input event type
         * @zh 输入事件类型
         */

        /**
         * @en Dispatch input event immediately.
         * The input events are collocted to be dispatched in each main loop by default.
         * If you need to recieve the input event immediately, please set this to true.
         * NOTE: if set this to true, the input events are dispatched between each tick, the input event can't be optimized by engine.
         *
         * @zh 立即派发输入事件。
         * 输入事件默认会被收集到每一帧主循环里派发，如果你需要立即接收到输入事件，请把该属性设为 true。
         * 注意：如果设置为 true，则输入事件可能会在帧间触发，这样的输入事件是没办法被引擎优化的。
         */
        function Input() {
          this._dispatchImmediately = !NATIVE;
          this._eventTarget = new EventTarget();
          this._touchInput = new TouchInputSource();
          this._mouseInput = new MouseInputSource();
          this._keyboardInput = new KeyboardInputSource();
          this._accelerometerInput = new AccelerometerInputSource();
          this._eventTouchList = [];
          this._eventMouseList = [];
          this._eventKeyboardList = [];
          this._eventAccelerationList = [];
          this._needSimulateTouchMoveEvent = false;

          this._registerEvent();
        }

        var _proto = Input.prototype;

        _proto._simulateEventTouch = function _simulateEventTouch(eventMouse) {
          var eventType = pointerEventTypeMap[eventMouse.type];
          var touchID = 0;
          var touch = touchManager.getTouch(touchID, eventMouse.getLocationX(), eventMouse.getLocationY());

          if (!touch) {
            return;
          }

          var changedTouches = [touch];
          var eventTouch = new EventTouch(changedTouches, false, eventType, changedTouches);

          if (eventType === InputEventType.TOUCH_END) {
            touchManager.releaseTouch(touchID);
          }

          this._dispatchOrPushEventTouch(eventTouch, this._eventTouchList);
        };

        _proto._registerEvent = function _registerEvent() {
          var _this = this;

          if (sys.hasFeature(sys.Feature.INPUT_TOUCH)) {
            var eventTouchList = this._eventTouchList;

            this._touchInput.on(InputEventType.TOUCH_START, function (event) {
              _this._dispatchOrPushEventTouch(event, eventTouchList);
            });

            this._touchInput.on(InputEventType.TOUCH_MOVE, function (event) {
              _this._dispatchOrPushEventTouch(event, eventTouchList);
            });

            this._touchInput.on(InputEventType.TOUCH_END, function (event) {
              _this._dispatchOrPushEventTouch(event, eventTouchList);
            });

            this._touchInput.on(InputEventType.TOUCH_CANCEL, function (event) {
              _this._dispatchOrPushEventTouch(event, eventTouchList);
            });
          }

          if (sys.hasFeature(sys.Feature.EVENT_MOUSE)) {
            var eventMouseList = this._eventMouseList;

            this._mouseInput.on(InputEventType.MOUSE_DOWN, function (event) {
              _this._needSimulateTouchMoveEvent = true;

              _this._simulateEventTouch(event);

              _this._dispatchOrPushEvent(event, eventMouseList);
            });

            this._mouseInput.on(InputEventType.MOUSE_MOVE, function (event) {
              if (_this._needSimulateTouchMoveEvent) {
                _this._simulateEventTouch(event);
              }

              _this._dispatchOrPushEvent(event, eventMouseList);
            });

            this._mouseInput.on(InputEventType.MOUSE_UP, function (event) {
              _this._needSimulateTouchMoveEvent = false;

              _this._simulateEventTouch(event);

              _this._dispatchOrPushEvent(event, eventMouseList);
            });

            this._mouseInput.on(InputEventType.MOUSE_WHEEL, function (event) {
              _this._dispatchOrPushEvent(event, eventMouseList);
            });
          }

          if (sys.hasFeature(sys.Feature.EVENT_KEYBOARD)) {
            var eventKeyboardList = this._eventKeyboardList;

            this._keyboardInput.on(InputEventType.KEY_DOWN, function (event) {
              _this._dispatchOrPushEvent(event, eventKeyboardList);
            });

            this._keyboardInput.on(InputEventType.KEY_PRESSING, function (event) {
              _this._dispatchOrPushEvent(event, eventKeyboardList);
            });

            this._keyboardInput.on(InputEventType.KEY_UP, function (event) {
              _this._dispatchOrPushEvent(event, eventKeyboardList);
            });
          }

          if (sys.hasFeature(sys.Feature.EVENT_ACCELEROMETER)) {
            var eventAccelerationList = this._eventAccelerationList;

            this._accelerometerInput.on(InputEventType.DEVICEMOTION, function (event) {
              _this._dispatchOrPushEvent(event, eventAccelerationList);
            });
          }
        };

        _proto._clearEvents = function _clearEvents() {
          this._eventMouseList.length = 0;
          this._eventTouchList.length = 0;
          this._eventKeyboardList.length = 0;
          this._eventAccelerationList.length = 0;
        };

        _proto._dispatchOrPushEvent = function _dispatchOrPushEvent(event, eventList) {
          if (this._dispatchImmediately) {
            this._eventTarget.emit(event.type, event);
          } else {
            eventList.push(event);
          }
        };

        _proto._dispatchOrPushEventTouch = function _dispatchOrPushEventTouch(eventTouch, touchEventList) {
          if (this._dispatchImmediately) {
            var touches = eventTouch.getTouches();
            var touchesLength = touches.length;

            for (var i = 0; i < touchesLength; ++i) {
              eventTouch.touch = touches[i];
              eventTouch.propagationStopped = eventTouch.propagationImmediateStopped = false;

              this._eventTarget.emit(eventTouch.type, eventTouch);
            }
          } else {
            touchEventList.push(eventTouch);
          }
        };

        _proto._frameDispatchEvents = function _frameDispatchEvents() {
          var eventMouseList = this._eventMouseList; // TODO: culling event queue

          for (var i = 0, length = eventMouseList.length; i < length; ++i) {
            var eventMouse = eventMouseList[i];

            this._eventTarget.emit(eventMouse.type, eventMouse);
          }

          var eventTouchList = this._eventTouchList; // TODO: culling event queue

          for (var _i = 0, _length = eventTouchList.length; _i < _length; ++_i) {
            var eventTouch = eventTouchList[_i];
            var touches = eventTouch.getTouches();
            var touchesLength = touches.length;

            for (var j = 0; j < touchesLength; ++j) {
              eventTouch.touch = touches[j];
              eventTouch.propagationStopped = eventTouch.propagationImmediateStopped = false;

              this._eventTarget.emit(eventTouch.type, eventTouch);
            }
          }

          var eventKeyboardList = this._eventKeyboardList; // TODO: culling event queue

          for (var _i2 = 0, _length2 = eventKeyboardList.length; _i2 < _length2; ++_i2) {
            var eventKeyboard = eventKeyboardList[_i2];

            this._eventTarget.emit(eventKeyboard.type, eventKeyboard);
          }

          var eventAccelerationList = this._eventAccelerationList; // TODO: culling event queue

          for (var _i3 = 0, _length3 = eventAccelerationList.length; _i3 < _length3; ++_i3) {
            var eventAcceleration = eventAccelerationList[_i3];

            this._eventTarget.emit(eventAcceleration.type, eventAcceleration);
          }

          this._clearEvents();
        }
        /**
         * @en
         * Register a callback of a specific input event type.
         * @zh
         * 注册特定的输入事件回调。
         *
         * @param eventType - The event type
         * @param callback - The event listener's callback
         * @param target - The event listener's target and callee
         */
        ;

        _proto.on = function on(eventType, callback, target) {
          if (EDITOR) {
            return callback;
          }

          this._eventTarget.on(eventType, callback, target);

          return callback;
        }
        /**
         * @en
         * Register a callback of a specific input event type once.
         * @zh
         * 注册单次的输入事件回调。
         *
         * @param eventType - The event type
         * @param callback - The event listener's callback
         * @param target - The event listener's target and callee
         */
        ;

        _proto.once = function once(eventType, callback, target) {
          if (EDITOR) {
            return callback;
          }

          this._eventTarget.once(eventType, callback, target);

          return callback;
        }
        /**
         * @en
         * Unregister a callback of a specific input event type.
         * @zh
         * 取消注册特定的输入事件回调。
         *
         * @param eventType - The event type
         * @param callback - The event listener's callback
         * @param target - The event listener's target and callee
         */
        ;

        _proto.off = function off(eventType, callback, target) {
          if (EDITOR) {
            return;
          }

          this._eventTarget.off(eventType, callback, target);
        }
        /**
         * @en
         * Sets whether to enable the accelerometer event listener or not.
         *
         * @zh
         * 是否启用加速度计事件。
         */
        ;

        _proto.setAccelerometerEnabled = function setAccelerometerEnabled(isEnable) {
          if (EDITOR) {
            return;
          }

          if (isEnable) {
            this._accelerometerInput.start();
          } else {
            this._accelerometerInput.stop();
          }
        }
        /**
         * @en
         * Sets the accelerometer interval value.
         *
         * @zh
         * 设置加速度计间隔值。
         */
        ;

        _proto.setAccelerometerInterval = function setAccelerometerInterval(intervalInMileSeconds) {
          if (EDITOR) {
            return;
          }

          this._accelerometerInput.setInterval(intervalInMileSeconds);
        };

        return Input;
      }());
      /**
       * @en
       * The singleton of the Input class, this singleton manages all events of input. include: touch, mouse, accelerometer and keyboard.
       *
       * @zh
       * 输入类单例，该单例管理所有的输入事件，包括：触摸、鼠标、加速计 和 键盘。
       *
       * @example
       * ```
       * input.on(Input.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
       * input.off(Input.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
       * ```
       */


      Input.EventType = InputEventType;

      _export("input", input = new Input());
    }
  };
});
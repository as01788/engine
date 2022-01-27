"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input = exports.Input = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _input = require("pal/input");

var _touchManager = require("../../pal/input/touch-manager.js");

var _sys = require("../core/platform/sys.js");

var _eventTarget = require("../core/event/event-target.js");

var _index = require("./types/index.js");

var _eventEnum = require("./types/event-enum.js");

/*
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @packageDocumentation
 * @hidden
 */
const pointerEventTypeMap = {
  [_eventEnum.InputEventType.MOUSE_DOWN]: _eventEnum.InputEventType.TOUCH_START,
  [_eventEnum.InputEventType.MOUSE_MOVE]: _eventEnum.InputEventType.TOUCH_MOVE,
  [_eventEnum.InputEventType.MOUSE_UP]: _eventEnum.InputEventType.TOUCH_END
};

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
class Input {
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
  constructor() {
    this._dispatchImmediately = !_internal253Aconstants.NATIVE;
    this._eventTarget = new _eventTarget.EventTarget();
    this._touchInput = new _input.TouchInputSource();
    this._mouseInput = new _input.MouseInputSource();
    this._keyboardInput = new _input.KeyboardInputSource();
    this._accelerometerInput = new _input.AccelerometerInputSource();
    this._eventTouchList = [];
    this._eventMouseList = [];
    this._eventKeyboardList = [];
    this._eventAccelerationList = [];
    this._needSimulateTouchMoveEvent = false;

    this._registerEvent();
  }

  _simulateEventTouch(eventMouse) {
    const eventType = pointerEventTypeMap[eventMouse.type];
    const touchID = 0;

    const touch = _touchManager.touchManager.getTouch(touchID, eventMouse.getLocationX(), eventMouse.getLocationY());

    if (!touch) {
      return;
    }

    const changedTouches = [touch];
    const eventTouch = new _index.EventTouch(changedTouches, false, eventType, changedTouches);

    if (eventType === _eventEnum.InputEventType.TOUCH_END) {
      _touchManager.touchManager.releaseTouch(touchID);
    }

    this._dispatchOrPushEventTouch(eventTouch, this._eventTouchList);
  }

  _registerEvent() {
    if (_sys.sys.hasFeature(_sys.sys.Feature.INPUT_TOUCH)) {
      const eventTouchList = this._eventTouchList;

      this._touchInput.on(_eventEnum.InputEventType.TOUCH_START, event => {
        this._dispatchOrPushEventTouch(event, eventTouchList);
      });

      this._touchInput.on(_eventEnum.InputEventType.TOUCH_MOVE, event => {
        this._dispatchOrPushEventTouch(event, eventTouchList);
      });

      this._touchInput.on(_eventEnum.InputEventType.TOUCH_END, event => {
        this._dispatchOrPushEventTouch(event, eventTouchList);
      });

      this._touchInput.on(_eventEnum.InputEventType.TOUCH_CANCEL, event => {
        this._dispatchOrPushEventTouch(event, eventTouchList);
      });
    }

    if (_sys.sys.hasFeature(_sys.sys.Feature.EVENT_MOUSE)) {
      const eventMouseList = this._eventMouseList;

      this._mouseInput.on(_eventEnum.InputEventType.MOUSE_DOWN, event => {
        this._needSimulateTouchMoveEvent = true;

        this._simulateEventTouch(event);

        this._dispatchOrPushEvent(event, eventMouseList);
      });

      this._mouseInput.on(_eventEnum.InputEventType.MOUSE_MOVE, event => {
        if (this._needSimulateTouchMoveEvent) {
          this._simulateEventTouch(event);
        }

        this._dispatchOrPushEvent(event, eventMouseList);
      });

      this._mouseInput.on(_eventEnum.InputEventType.MOUSE_UP, event => {
        this._needSimulateTouchMoveEvent = false;

        this._simulateEventTouch(event);

        this._dispatchOrPushEvent(event, eventMouseList);
      });

      this._mouseInput.on(_eventEnum.InputEventType.MOUSE_WHEEL, event => {
        this._dispatchOrPushEvent(event, eventMouseList);
      });
    }

    if (_sys.sys.hasFeature(_sys.sys.Feature.EVENT_KEYBOARD)) {
      const eventKeyboardList = this._eventKeyboardList;

      this._keyboardInput.on(_eventEnum.InputEventType.KEY_DOWN, event => {
        this._dispatchOrPushEvent(event, eventKeyboardList);
      });

      this._keyboardInput.on(_eventEnum.InputEventType.KEY_PRESSING, event => {
        this._dispatchOrPushEvent(event, eventKeyboardList);
      });

      this._keyboardInput.on(_eventEnum.InputEventType.KEY_UP, event => {
        this._dispatchOrPushEvent(event, eventKeyboardList);
      });
    }

    if (_sys.sys.hasFeature(_sys.sys.Feature.EVENT_ACCELEROMETER)) {
      const eventAccelerationList = this._eventAccelerationList;

      this._accelerometerInput.on(_eventEnum.InputEventType.DEVICEMOTION, event => {
        this._dispatchOrPushEvent(event, eventAccelerationList);
      });
    }
  }

  _clearEvents() {
    this._eventMouseList.length = 0;
    this._eventTouchList.length = 0;
    this._eventKeyboardList.length = 0;
    this._eventAccelerationList.length = 0;
  }

  _dispatchOrPushEvent(event, eventList) {
    if (this._dispatchImmediately) {
      this._eventTarget.emit(event.type, event);
    } else {
      eventList.push(event);
    }
  }

  _dispatchOrPushEventTouch(eventTouch, touchEventList) {
    if (this._dispatchImmediately) {
      const touches = eventTouch.getTouches();
      const touchesLength = touches.length;

      for (let i = 0; i < touchesLength; ++i) {
        eventTouch.touch = touches[i];
        eventTouch.propagationStopped = eventTouch.propagationImmediateStopped = false;

        this._eventTarget.emit(eventTouch.type, eventTouch);
      }
    } else {
      touchEventList.push(eventTouch);
    }
  }

  _frameDispatchEvents() {
    const eventMouseList = this._eventMouseList; // TODO: culling event queue

    for (let i = 0, length = eventMouseList.length; i < length; ++i) {
      const eventMouse = eventMouseList[i];

      this._eventTarget.emit(eventMouse.type, eventMouse);
    }

    const eventTouchList = this._eventTouchList; // TODO: culling event queue

    for (let i = 0, length = eventTouchList.length; i < length; ++i) {
      const eventTouch = eventTouchList[i];
      const touches = eventTouch.getTouches();
      const touchesLength = touches.length;

      for (let j = 0; j < touchesLength; ++j) {
        eventTouch.touch = touches[j];
        eventTouch.propagationStopped = eventTouch.propagationImmediateStopped = false;

        this._eventTarget.emit(eventTouch.type, eventTouch);
      }
    }

    const eventKeyboardList = this._eventKeyboardList; // TODO: culling event queue

    for (let i = 0, length = eventKeyboardList.length; i < length; ++i) {
      const eventKeyboard = eventKeyboardList[i];

      this._eventTarget.emit(eventKeyboard.type, eventKeyboard);
    }

    const eventAccelerationList = this._eventAccelerationList; // TODO: culling event queue

    for (let i = 0, length = eventAccelerationList.length; i < length; ++i) {
      const eventAcceleration = eventAccelerationList[i];

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


  on(eventType, callback, target) {
    if (_internal253Aconstants.EDITOR) {
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


  once(eventType, callback, target) {
    if (_internal253Aconstants.EDITOR) {
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


  off(eventType, callback, target) {
    if (_internal253Aconstants.EDITOR) {
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


  setAccelerometerEnabled(isEnable) {
    if (_internal253Aconstants.EDITOR) {
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


  setAccelerometerInterval(intervalInMileSeconds) {
    if (_internal253Aconstants.EDITOR) {
      return;
    }

    this._accelerometerInput.setInterval(intervalInMileSeconds);
  }

}
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


exports.Input = Input;
Input.EventType = _eventEnum.InputEventType;
const input = new Input();
exports.input = input;
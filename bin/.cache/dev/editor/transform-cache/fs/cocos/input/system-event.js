"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemEvent = exports.SystemEvent = exports.pointerEvent2SystemEvent = void 0;

var _index = require("../core/event/index.js");

var _index2 = require("./types/index.js");

var _input = require("./input.js");

var _globalExports = require("../core/global-exports.js");

var _eventEnum = require("./types/event-enum.js");

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

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
 * @module event
 */
const pointerEvent2SystemEvent = {
  [_eventEnum.InputEventType.TOUCH_START]: `system-event-${_eventEnum.InputEventType.TOUCH_START}`,
  [_eventEnum.InputEventType.TOUCH_MOVE]: `system-event-${_eventEnum.InputEventType.TOUCH_MOVE}`,
  [_eventEnum.InputEventType.TOUCH_END]: `system-event-${_eventEnum.InputEventType.TOUCH_END}`,
  [_eventEnum.InputEventType.TOUCH_CANCEL]: `system-event-${_eventEnum.InputEventType.TOUCH_CANCEL}`,
  [_eventEnum.InputEventType.MOUSE_DOWN]: `system-event-${_eventEnum.InputEventType.MOUSE_DOWN}`,
  [_eventEnum.InputEventType.MOUSE_MOVE]: `system-event-${_eventEnum.InputEventType.MOUSE_MOVE}`,
  [_eventEnum.InputEventType.MOUSE_UP]: `system-event-${_eventEnum.InputEventType.MOUSE_UP}`
};
exports.pointerEvent2SystemEvent = pointerEvent2SystemEvent;
const inputEvents = Object.values(_eventEnum.InputEventType);

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
class SystemEvent extends _index.EventTarget {
  /**
   * @en
   * Sets whether to enable the accelerometer event listener or not.
   *
   * @zh
   * 是否启用加速度计事件。
   */
  setAccelerometerEnabled(isEnabled) {
    _input.input.setAccelerometerEnabled(isEnabled);
  }
  /**
   * @en
   * Sets the accelerometer interval value.
   *
   * @zh
   * 设置加速度计间隔值。
   */


  setAccelerometerInterval(interval) {
    _input.input.setAccelerometerInterval(interval);
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


  on(type, callback, target, once) {
    const registerMethod = once ? _input.input.once : _input.input.on; // @ts-expect-error wrong type mapping

    if (inputEvents.includes(type)) {
      // @ts-expect-error wrong type mapping
      const mappedPointerType = pointerEvent2SystemEvent[type];

      if (mappedPointerType) {
        // @ts-expect-error wrong type mapping
        registerMethod.call(_input.input, mappedPointerType, callback, target);
      } else if (type === _index2.SystemEventType.KEY_DOWN) {
        // @ts-expect-error wrong mapped type
        registerMethod.call(_input.input, _eventEnum.InputEventType.KEY_DOWN, callback, target); // @ts-expect-error wrong mapped type

        registerMethod.call(_input.input, _eventEnum.InputEventType.KEY_PRESSING, callback, target, once);
      } else {
        // @ts-expect-error wrong type mapping
        registerMethod.call(_input.input, type, callback, target);
      }
    } else {
      super.on(type, callback, target, once);
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


  off(type, callback, target) {
    // @ts-expect-error wrong type mapping
    if (inputEvents.includes(type)) {
      // @ts-expect-error wrong type mapping
      const mappedPointerType = pointerEvent2SystemEvent[type];

      if (mappedPointerType) {
        _input.input.off(mappedPointerType, callback, target);
      } else if (type === _index2.SystemEventType.KEY_DOWN) {
        // @ts-expect-error wrong mapped type
        _input.input.off(_eventEnum.InputEventType.KEY_DOWN, callback, target); // @ts-expect-error wrong mapped type


        _input.input.off(_eventEnum.InputEventType.KEY_PRESSING, callback, target); // eslint-disable-next-line brace-style

      } else {
        // @ts-expect-error wrong type mapping
        _input.input.off(type, callback, target);
      }
    } else {
      super.off(type, callback, target);
    }
  }

}

exports.SystemEvent = SystemEvent;
SystemEvent.EventType = _index2.SystemEventType;
_globalExports.legacyCC.SystemEvent = SystemEvent;
/**
 * @module cc
 */

/**
 * @en The singleton of the SystemEvent, there should only be one instance to be used globally
 * @zh 系统事件单例，方便全局使用。
 *
 * @deprecated since v3.4.0, please use input instead.
 */

const systemEvent = new SystemEvent();
exports.systemEvent = systemEvent;
_globalExports.legacyCC.systemEvent = systemEvent;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventKeyboard = void 0;

var _event = require("./event.js");

var _eventEnum = require("../event-enum.js");

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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

/**
 * @en
 * The keyboard event.
 * @zh
 * 键盘事件。
 */
class EventKeyboard extends _event.Event {
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
  get isPressed() {
    return this._isPressed;
  }
  /**
   * @param keyCode - The key code of the current key or the DOM KeyboardEvent
   * @param isPressed - Indicates whether the current key is being pressed, this is the DEPRECATED parameter.
   * @param bubbles - Indicates whether the event bubbles up through the hierarchy or not.
   */


  constructor(keyCode, eventType, bubbles) {
    if (typeof eventType === 'boolean') {
      const isPressed = eventType;
      eventType = isPressed ? _eventEnum.SystemEventType.KEY_DOWN : _eventEnum.SystemEventType.KEY_UP;
    }

    super(eventType, bubbles);
    this.keyCode = void 0;
    this.rawEvent = void 0;
    this._isPressed = void 0;
    this._isPressed = eventType !== _eventEnum.SystemEventType.KEY_UP;

    if (typeof keyCode === 'number') {
      this.keyCode = keyCode;
    } else {
      this.keyCode = keyCode.keyCode;
      this.rawEvent = keyCode;
    }
  }

} // @ts-expect-error TODO


exports.EventKeyboard = EventKeyboard;
_event.Event.EventKeyboard = EventKeyboard;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventAcceleration = void 0;

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
 * @en
 * The acceleration event.
 * @zh
 * 加速计事件。
 */
class EventAcceleration extends _event.Event {
  /**
   * @en The acceleration object
   * @zh 加速度对象
   */

  /**
   * @param acc - The acceleration
   * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
   */
  constructor(acc, bubbles) {
    super(_eventEnum.SystemEventType.DEVICEMOTION, bubbles);
    this.acc = void 0;
    this.acc = acc;
  }

} // @ts-expect-error TODO


exports.EventAcceleration = EventAcceleration;
_event.Event.EventAcceleration = EventAcceleration;
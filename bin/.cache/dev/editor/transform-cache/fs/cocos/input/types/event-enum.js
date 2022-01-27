"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputEventType = exports.SystemEventType = void 0;

var _globalExports = require("../../core/global-exports.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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

/**
 * @en The event type supported by SystemEvent and Node events
 * @zh SystemEvent 支持的事件类型以及节点事件类型
 *
 * @deprecated since v3.3, please use SystemEvent.EventType instead
 */
let SystemEventType;
/**
 * @en The input event type
 * @zh 输入事件类型
 */

exports.SystemEventType = SystemEventType;

(function (SystemEventType) {
  SystemEventType["TOUCH_START"] = "touch-start";
  SystemEventType["TOUCH_MOVE"] = "touch-move";
  SystemEventType["TOUCH_END"] = "touch-end";
  SystemEventType["TOUCH_CANCEL"] = "touch-cancel";
  SystemEventType["MOUSE_DOWN"] = "mouse-down";
  SystemEventType["MOUSE_MOVE"] = "mouse-move";
  SystemEventType["MOUSE_UP"] = "mouse-up";
  SystemEventType["MOUSE_WHEEL"] = "mouse-wheel";
  SystemEventType["MOUSE_ENTER"] = "mouse-enter";
  SystemEventType["MOUSE_LEAVE"] = "mouse-leave";
  SystemEventType["KEY_DOWN"] = "keydown";
  SystemEventType["KEY_UP"] = "keyup";
  SystemEventType["DEVICEMOTION"] = "devicemotion";
  SystemEventType["TRANSFORM_CHANGED"] = "transform-changed";
  SystemEventType["SCENE_CHANGED_FOR_PERSISTS"] = "scene-changed-for-persists";
  SystemEventType["SIZE_CHANGED"] = "size-changed";
  SystemEventType["ANCHOR_CHANGED"] = "anchor-changed";
  SystemEventType["COLOR_CHANGED"] = "color-changed";
  SystemEventType["CHILD_ADDED"] = "child-added";
  SystemEventType["CHILD_REMOVED"] = "child-removed";
  SystemEventType["PARENT_CHANGED"] = "parent-changed";
  SystemEventType["NODE_DESTROYED"] = "node-destroyed";
  SystemEventType["LAYER_CHANGED"] = "layer-changed";
  SystemEventType["SIBLING_ORDER_CHANGED"] = "sibling-order-changed";
})(SystemEventType || (exports.SystemEventType = SystemEventType = {}));

let InputEventType;
exports.InputEventType = InputEventType;

(function (InputEventType) {
  InputEventType["TOUCH_START"] = "touch-start";
  InputEventType["TOUCH_MOVE"] = "touch-move";
  InputEventType["TOUCH_END"] = "touch-end";
  InputEventType["TOUCH_CANCEL"] = "touch-cancel";
  InputEventType["MOUSE_DOWN"] = "mouse-down";
  InputEventType["MOUSE_MOVE"] = "mouse-move";
  InputEventType["MOUSE_UP"] = "mouse-up";
  InputEventType["MOUSE_WHEEL"] = "mouse-wheel";
  InputEventType["KEY_DOWN"] = "keydown";
  InputEventType["KEY_PRESSING"] = "key-pressing";
  InputEventType["KEY_UP"] = "keyup";
  InputEventType["DEVICEMOTION"] = "devicemotion";
})(InputEventType || (exports.InputEventType = InputEventType = {}));

_globalExports.legacyCC.SystemEventType = SystemEventType;
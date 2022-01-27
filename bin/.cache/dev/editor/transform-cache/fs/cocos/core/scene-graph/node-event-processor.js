"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeEventProcessor = exports.DispatcherEventType = void 0;

var _callbacksInvoker = require("../event/callbacks-invoker.js");

var _vec = require("../math/vec2.js");

var _node = require("./node.js");

var _globalExports = require("../global-exports.js");

var _nodeEvent = require("./node-event.js");

var _eventEnum = require("../../input/types/event-enum.js");

/*
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
 * @hidden
 */
const _cachedArray = new Array(16);

let _currentHovered = null;
let pos = new _vec.Vec2();
const _touchEvents = [_nodeEvent.NodeEventType.TOUCH_START, _nodeEvent.NodeEventType.TOUCH_MOVE, _nodeEvent.NodeEventType.TOUCH_END, _nodeEvent.NodeEventType.TOUCH_CANCEL];
const _mouseEvents = [_nodeEvent.NodeEventType.MOUSE_DOWN, _nodeEvent.NodeEventType.MOUSE_ENTER, _nodeEvent.NodeEventType.MOUSE_MOVE, _nodeEvent.NodeEventType.MOUSE_LEAVE, _nodeEvent.NodeEventType.MOUSE_UP, _nodeEvent.NodeEventType.MOUSE_WHEEL];
let DispatcherEventType;
/**
 * @zh
 * 节点事件类。
 */

exports.DispatcherEventType = DispatcherEventType;

(function (DispatcherEventType) {
  DispatcherEventType[DispatcherEventType["ADD_POINTER_EVENT_PROCESSOR"] = 0] = "ADD_POINTER_EVENT_PROCESSOR";
  DispatcherEventType[DispatcherEventType["REMOVE_POINTER_EVENT_PROCESSOR"] = 1] = "REMOVE_POINTER_EVENT_PROCESSOR";
})(DispatcherEventType || (exports.DispatcherEventType = DispatcherEventType = {}));

class NodeEventProcessor {
  get isEnabled() {
    return this._isEnabled;
  }

  setEnabled(value, recursive = false) {
    this._isEnabled = value;
    const node = this.node;
    const children = node.children;

    if (value) {
      this._attachMask();
    }

    if (recursive && children.length > 0) {
      for (let i = 0; i < children.length; ++i) {
        const child = children[i]; // @ts-expect-error child._eventProcessor is a protected property.

        child._eventProcessor.setEnabled(value, true);
      }
    }
  }

  /**
   * The owner of node event processor.
   */
  get node() {
    return this._node;
  }
  /**
   * Target in bubbling phase.
   */


  constructor(node) {
    this._isEnabled = false;
    this.claimedTouchIdList = [];
    this.maskList = null;
    this.cachedCameraPriority = 0;
    this.previousMouseIn = false;
    this.bubblingTarget = null;
    this.capturingTarget = null;
    this.shouldHandleEventMouse = false;
    this.shouldHandleEventTouch = false;
    this._node = void 0;
    this._node = node;
  }

  _searchComponentsInParent(ctor) {
    const node = this.node;

    if (ctor) {
      let index = 0;
      let list = [];

      for (let curr = node; curr && _node.Node.isNode(curr); curr = curr.parent, ++index) {
        const comp = curr.getComponent(ctor);

        if (comp) {
          const next = {
            index,
            comp
          };

          if (list) {
            list.push(next);
          } else {
            list = [next];
          }
        }
      }

      return list.length > 0 ? list : null;
    }

    return null;
  }

  _attachMask() {
    this.maskList = this._searchComponentsInParent(NodeEventProcessor._maskComp);
  }

  reattach() {
    let currentMaskList;
    this.node.walk(node => {
      if (!currentMaskList) {
        currentMaskList = this._searchComponentsInParent(NodeEventProcessor._maskComp);
      }

      node.eventProcessor.maskList = currentMaskList;
    });
  }

  destroy() {
    if (_currentHovered === this._node) {
      _currentHovered = null;
    }

    if (this.capturingTarget) this.capturingTarget.clear();
    if (this.bubblingTarget) this.bubblingTarget.clear();
    NodeEventProcessor.callbacksInvoker.emit(DispatcherEventType.REMOVE_POINTER_EVENT_PROCESSOR, this);
  }

  _isTouchEvent(type) {
    const index = _touchEvents.indexOf(type);

    return index !== -1;
  }

  _isMouseEvent(type) {
    const index = _mouseEvents.indexOf(type);

    return index !== -1;
  }

  _hasTouchListeners() {
    for (let i = 0; i < _touchEvents.length; ++i) {
      const eventType = _touchEvents[i];

      if (this.hasEventListener(eventType)) {
        return true;
      }
    }

    return false;
  }

  _hasMouseListeners() {
    for (let i = 0; i < _mouseEvents.length; ++i) {
      const eventType = _mouseEvents[i];

      if (this.hasEventListener(eventType)) {
        return true;
      }
    }

    return false;
  }

  _hasPointerListeners() {
    const has = this._hasTouchListeners();

    if (has) {
      return true;
    }

    return this._hasMouseListeners();
  }

  _tryEmittingAddEvent(typeToAdd) {
    const isTouchEvent = this._isTouchEvent(typeToAdd);

    const isMouseEvent = this._isMouseEvent(typeToAdd);

    if (isTouchEvent) {
      this.shouldHandleEventTouch = true;
    } else if (isMouseEvent) {
      this.shouldHandleEventMouse = true;
    }

    if ((isTouchEvent || isMouseEvent) && !this._hasPointerListeners()) {
      NodeEventProcessor.callbacksInvoker.emit(DispatcherEventType.ADD_POINTER_EVENT_PROCESSOR, this);
    }
  }
  /**
   * Fix when reigster 'once' event callback, `this.off` method isn't be invoked after event is emitted.
   * We need to inject some nodeEventProcessor's logic into the `callbacksInvoker.off` method.
   * @returns {CallbacksInvoker<SystemEventTypeUnion>} decorated callbacks invoker
   */


  _newCallbacksInvoker() {
    const callbacksInvoker = new _callbacksInvoker.CallbacksInvoker(); // @ts-expect-error Property '_registerOffCallback' is private

    callbacksInvoker._registerOffCallback(() => {
      if (this.shouldHandleEventTouch && !this._hasTouchListeners()) {
        this.shouldHandleEventTouch = false;
      }

      if (this.shouldHandleEventMouse && !this._hasMouseListeners()) {
        this.shouldHandleEventMouse = false;
      }

      if (!this._hasPointerListeners()) {
        NodeEventProcessor.callbacksInvoker.emit(DispatcherEventType.REMOVE_POINTER_EVENT_PROCESSOR, this);
      }
    });

    return callbacksInvoker;
  }

  on(type, callback, target, useCapture) {
    this._tryEmittingAddEvent(type);

    useCapture = !!useCapture;
    let invoker;

    if (useCapture) {
      var _this$capturingTarget;

      invoker = (_this$capturingTarget = this.capturingTarget) !== null && _this$capturingTarget !== void 0 ? _this$capturingTarget : this.capturingTarget = this._newCallbacksInvoker();
    } else {
      var _this$bubblingTarget;

      invoker = (_this$bubblingTarget = this.bubblingTarget) !== null && _this$bubblingTarget !== void 0 ? _this$bubblingTarget : this.bubblingTarget = this._newCallbacksInvoker();
    }

    invoker.on(type, callback, target);
    return callback;
  }

  once(type, callback, target, useCapture) {
    this._tryEmittingAddEvent(type);

    useCapture = !!useCapture;
    let invoker;

    if (useCapture) {
      var _this$capturingTarget2;

      invoker = (_this$capturingTarget2 = this.capturingTarget) !== null && _this$capturingTarget2 !== void 0 ? _this$capturingTarget2 : this.capturingTarget = this._newCallbacksInvoker();
    } else {
      var _this$bubblingTarget2;

      invoker = (_this$bubblingTarget2 = this.bubblingTarget) !== null && _this$bubblingTarget2 !== void 0 ? _this$bubblingTarget2 : this.bubblingTarget = this._newCallbacksInvoker();
    }

    invoker.on(type, callback, target, true);
    return callback;
  }

  off(type, callback, target, useCapture) {
    var _invoker;

    useCapture = !!useCapture;
    let invoker;

    if (useCapture) {
      invoker = this.capturingTarget;
    } else {
      invoker = this.bubblingTarget;
    }

    (_invoker = invoker) === null || _invoker === void 0 ? void 0 : _invoker.off(type, callback, target);
  }

  targetOff(target) {
    var _this$capturingTarget3, _this$bubblingTarget3;

    (_this$capturingTarget3 = this.capturingTarget) === null || _this$capturingTarget3 === void 0 ? void 0 : _this$capturingTarget3.removeAll(target);
    (_this$bubblingTarget3 = this.bubblingTarget) === null || _this$bubblingTarget3 === void 0 ? void 0 : _this$bubblingTarget3.removeAll(target); // emit event

    if (this.shouldHandleEventTouch && !this._hasTouchListeners()) {
      this.shouldHandleEventTouch = false;
    }

    if (this.shouldHandleEventMouse && !this._hasMouseListeners()) {
      this.shouldHandleEventMouse = false;
    }

    if (!this._hasPointerListeners()) {
      NodeEventProcessor.callbacksInvoker.emit(DispatcherEventType.REMOVE_POINTER_EVENT_PROCESSOR, this);
    }
  }

  emit(type, arg0, arg1, arg2, arg3, arg4) {
    var _this$bubblingTarget4;

    (_this$bubblingTarget4 = this.bubblingTarget) === null || _this$bubblingTarget4 === void 0 ? void 0 : _this$bubblingTarget4.emit(type, arg0, arg1, arg2, arg3, arg4);
  }

  dispatchEvent(event) {
    const owner = this.node;
    let target;
    let i = 0;
    event.target = owner; // Event.CAPTURING_PHASE

    _cachedArray.length = 0;
    this.getCapturingTargets(event.type, _cachedArray); // capturing

    event.eventPhase = 1;

    for (i = _cachedArray.length - 1; i >= 0; --i) {
      target = _cachedArray[i];

      if (target.eventProcessor.capturingTarget) {
        event.currentTarget = target; // fire event

        target.eventProcessor.capturingTarget.emit(event.type, event, _cachedArray); // check if propagation stopped

        if (event.propagationStopped) {
          _cachedArray.length = 0;
          return;
        }
      }
    }

    _cachedArray.length = 0; // Event.AT_TARGET
    // checks if destroyed in capturing callbacks

    event.eventPhase = 2;
    event.currentTarget = owner;

    if (this.capturingTarget) {
      this.capturingTarget.emit(event.type, event);
    }

    if (!event.propagationImmediateStopped && this.bubblingTarget) {
      this.bubblingTarget.emit(event.type, event);
    }

    if (!event.propagationStopped && event.bubbles) {
      // Event.BUBBLING_PHASE
      this.getBubblingTargets(event.type, _cachedArray); // propagate

      event.eventPhase = 3;

      for (i = 0; i < _cachedArray.length; ++i) {
        target = _cachedArray[i];

        if (target.eventProcessor.bubblingTarget) {
          event.currentTarget = target; // fire event

          target.eventProcessor.bubblingTarget.emit(event.type, event); // check if propagation stopped

          if (event.propagationStopped) {
            _cachedArray.length = 0;
            return;
          }
        }
      }
    }

    _cachedArray.length = 0;
  }

  hasEventListener(type, callback, target) {
    let has = false;

    if (this.bubblingTarget) {
      has = this.bubblingTarget.hasEventListener(type, callback, target);
    }

    if (!has && this.capturingTarget) {
      has = this.capturingTarget.hasEventListener(type, callback, target);
    }

    return has;
  }
  /**
   * @zh
   * 获得所提供的事件类型在目标捕获阶段监听的所有目标。
   * 捕获阶段包括从根节点到目标节点的过程。
   * 结果保存在数组参数中，并且必须从子节点排序到父节点。
   *
   * @param type - 一个监听事件类型的字符串。
   * @param array - 接收目标的数组。
   */


  getCapturingTargets(type, targets) {
    let parent = this._node.parent;

    while (parent) {
      var _parent$eventProcesso;

      if ((_parent$eventProcesso = parent.eventProcessor.capturingTarget) === null || _parent$eventProcesso === void 0 ? void 0 : _parent$eventProcesso.hasEventListener(type)) {
        targets.push(parent);
      }

      parent = parent.parent;
    }
  }
  /**
   * @zh
   * 获得所提供的事件类型在目标冒泡阶段监听的所有目标。
   * 冒泡阶段目标节点到根节点的过程。
   * 结果保存在数组参数中，并且必须从子节点排序到父节点。
   *
   * @param type - 一个监听事件类型的字符串。
   * @param array - 接收目标的数组。
   */


  getBubblingTargets(type, targets) {
    let parent = this._node.parent;

    while (parent) {
      var _parent$eventProcesso2;

      if ((_parent$eventProcesso2 = parent.eventProcessor.bubblingTarget) === null || _parent$eventProcesso2 === void 0 ? void 0 : _parent$eventProcesso2.hasEventListener(type)) {
        targets.push(parent);
      }

      parent = parent.parent;
    }
  } // #region handle mouse event


  _handleEventMouse(eventMouse) {
    switch (eventMouse.type) {
      case _eventEnum.InputEventType.MOUSE_DOWN:
        return this._handleMouseDown(eventMouse);

      case _eventEnum.InputEventType.MOUSE_MOVE:
        return this._handleMouseMove(eventMouse);

      case _eventEnum.InputEventType.MOUSE_UP:
        return this._handleMouseUp(eventMouse);

      case _eventEnum.InputEventType.MOUSE_WHEEL:
        return this._handleMouseWheel(eventMouse);

      default:
        return false;
    }
  }

  _handleMouseDown(event) {
    const node = this._node;

    if (!node || !node._uiProps.uiTransformComp) {
      return false;
    }

    pos = event.getUILocation();

    if (node._uiProps.uiTransformComp.isHit(pos)) {
      event.type = _nodeEvent.NodeEventType.MOUSE_DOWN;
      event.bubbles = true;
      node.dispatchEvent(event);
      event.propagationStopped = true;
      return true;
    }

    return false;
  }

  _handleMouseMove(event) {
    const node = this._node;

    if (!node || !node._uiProps.uiTransformComp) {
      return false;
    }

    pos = event.getUILocation();

    const hit = node._uiProps.uiTransformComp.isHit(pos);

    if (hit) {
      if (!this.previousMouseIn) {
        // Fix issue when hover node switched, previous hovered node won't get MOUSE_LEAVE notification
        if (_currentHovered && _currentHovered !== node) {
          event.type = _nodeEvent.NodeEventType.MOUSE_LEAVE;

          _currentHovered.dispatchEvent(event);

          _currentHovered.eventProcessor.previousMouseIn = false;
        }

        _currentHovered = node;
        event.type = _nodeEvent.NodeEventType.MOUSE_ENTER;
        node.dispatchEvent(event);
        this.previousMouseIn = true;
      }

      event.type = _nodeEvent.NodeEventType.MOUSE_MOVE;
      event.bubbles = true;
      node.dispatchEvent(event);
      event.propagationStopped = true;
      return true;
    } else if (this.previousMouseIn) {
      event.type = _nodeEvent.NodeEventType.MOUSE_LEAVE;
      node.dispatchEvent(event);
      this.previousMouseIn = false;
      _currentHovered = null;
    }

    return false;
  }

  _handleMouseUp(event) {
    const node = this._node;

    if (!node || !node._uiProps.uiTransformComp) {
      return false;
    }

    pos = event.getUILocation();

    if (node._uiProps.uiTransformComp.isHit(pos)) {
      event.type = _nodeEvent.NodeEventType.MOUSE_UP;
      event.bubbles = true;
      node.dispatchEvent(event);
      event.propagationStopped = true;
      return true;
    }

    return false;
  }

  _handleMouseWheel(event) {
    const node = this._node;

    if (!node || !node._uiProps.uiTransformComp) {
      return false;
    }

    pos = event.getUILocation();

    if (node._uiProps.uiTransformComp.isHit(pos)) {
      event.type = _nodeEvent.NodeEventType.MOUSE_WHEEL;
      event.bubbles = true;
      node.dispatchEvent(event); // event.propagationStopped = true;

      event.propagationStopped = true;
      return true;
    }

    return false;
  } // #endregion handle mouse event
  // #region handle touch event


  _handleEventTouch(eventTouch) {
    switch (eventTouch.type) {
      case _eventEnum.InputEventType.TOUCH_START:
        return this._handleTouchStart(eventTouch);

      case _eventEnum.InputEventType.TOUCH_MOVE:
        return this._handleTouchMove(eventTouch);

      case _eventEnum.InputEventType.TOUCH_END:
        return this._handleTouchEnd(eventTouch);

      case _eventEnum.InputEventType.TOUCH_CANCEL:
        return this._handleTouchCancel(eventTouch);

      default:
        return false;
    }
  }

  _handleTouchStart(event) {
    const node = this.node;

    if (!node || !node._uiProps.uiTransformComp) {
      return false;
    }

    event.getUILocation(pos);

    if (node._uiProps.uiTransformComp.isHit(pos)) {
      event.type = _nodeEvent.NodeEventType.TOUCH_START;
      event.bubbles = true;
      node.dispatchEvent(event);
      return true;
    }

    return false;
  }

  _handleTouchMove(event) {
    const node = this.node;

    if (!node || !node._uiProps.uiTransformComp) {
      return false;
    }

    event.type = _nodeEvent.NodeEventType.TOUCH_MOVE;
    event.bubbles = true;
    node.dispatchEvent(event);
    return true;
  }

  _handleTouchEnd(event) {
    const node = this.node;

    if (!node || !node._uiProps.uiTransformComp) {
      return;
    }

    event.getUILocation(pos);

    if (node._uiProps.uiTransformComp.isHit(pos)) {
      event.type = _nodeEvent.NodeEventType.TOUCH_END;
    } else {
      event.type = _nodeEvent.NodeEventType.TOUCH_CANCEL;
    }

    event.bubbles = true;
    node.dispatchEvent(event);
  }

  _handleTouchCancel(event) {
    const node = this.node;

    if (!node || !node._uiProps.uiTransformComp) {
      return;
    }

    event.type = _nodeEvent.NodeEventType.TOUCH_CANCEL;
    event.bubbles = true;
    node.dispatchEvent(event);
  } // #endregion handle touch event


}

exports.NodeEventProcessor = NodeEventProcessor;
NodeEventProcessor._maskComp = null;
NodeEventProcessor.callbacksInvoker = new _callbacksInvoker.CallbacksInvoker();
_globalExports.legacyCC.NodeEventProcessor = NodeEventProcessor;
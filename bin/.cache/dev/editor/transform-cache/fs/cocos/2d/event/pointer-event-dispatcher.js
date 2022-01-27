"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointerEventDispatcher = void 0;

var _index = require("../../input/index.js");

var _nodeEventProcessor = require("../../core/scene-graph/node-event-processor.js");

var _js = require("../../core/utils/js.js");

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
class PointerEventDispatcher {
  constructor() {
    this._isListDirty = false;
    this._inDispatchCount = 0;
    this._pointerEventProcessorList = [];
    this._processorListToAdd = [];
    this._processorListToRemove = [];

    _index.input.on(_index.Input.EventType.MOUSE_DOWN, this.dispatchEventMouse, this);

    _index.input.on(_index.Input.EventType.MOUSE_MOVE, this.dispatchEventMouse, this);

    _index.input.on(_index.Input.EventType.MOUSE_UP, this.dispatchEventMouse, this);

    _index.input.on(_index.Input.EventType.MOUSE_WHEEL, this.dispatchEventMouse, this);

    _index.input.on(_index.Input.EventType.TOUCH_START, this.dispatchEventTouch, this);

    _index.input.on(_index.Input.EventType.TOUCH_MOVE, this.dispatchEventTouch, this);

    _index.input.on(_index.Input.EventType.TOUCH_END, this.dispatchEventTouch, this);

    _index.input.on(_index.Input.EventType.TOUCH_CANCEL, this.dispatchEventTouch, this);

    _nodeEventProcessor.NodeEventProcessor.callbacksInvoker.on(_nodeEventProcessor.DispatcherEventType.ADD_POINTER_EVENT_PROCESSOR, this.addPointerEventProcessor, this);

    _nodeEventProcessor.NodeEventProcessor.callbacksInvoker.on(_nodeEventProcessor.DispatcherEventType.REMOVE_POINTER_EVENT_PROCESSOR, this.removePointerEventProcessor, this);
  }

  addPointerEventProcessor(pointerEventProcessor) {
    if (this._inDispatchCount === 0) {
      this._pointerEventProcessorList.push(pointerEventProcessor);

      this._isListDirty = true;
    } else {
      this._processorListToAdd.push(pointerEventProcessor);
    }
  }

  removePointerEventProcessor(pointerEventProcessor) {
    if (this._inDispatchCount === 0) {
      _js.js.array.remove(this._pointerEventProcessorList, pointerEventProcessor);

      this._isListDirty = true;
    } else {
      this._processorListToRemove.push(pointerEventProcessor);
    }
  }

  dispatchEventMouse(eventMouse) {
    this._inDispatchCount++;

    this._sortPointerEventProcessorList();

    const pointerEventProcessorList = this._pointerEventProcessorList;
    const length = pointerEventProcessorList.length;
    let shouldDispatchToSystemEvent = true;

    for (let i = 0; i < length; ++i) {
      const pointerEventProcessor = pointerEventProcessorList[i];

      if (pointerEventProcessor.isEnabled && pointerEventProcessor.shouldHandleEventMouse // @ts-expect-error access private method
      && pointerEventProcessor._handleEventMouse(eventMouse)) {
        shouldDispatchToSystemEvent = false;

        if (!eventMouse.preventSwallow) {
          break;
        }
      }
    }

    const type = _index.pointerEvent2SystemEvent[eventMouse.type];

    if (shouldDispatchToSystemEvent && type) {
      // @ts-expect-error _eventTarget is a private property
      _index.input._eventTarget.emit(type, eventMouse);
    }

    if (--this._inDispatchCount <= 0) {
      this._updatePointerEventProcessorList();
    }
  }

  dispatchEventTouch(eventTouch) {
    this._inDispatchCount++;

    this._sortPointerEventProcessorList();

    const pointerEventProcessorList = this._pointerEventProcessorList;
    const length = pointerEventProcessorList.length;
    const touch = eventTouch.touch;
    let shouldDispatchToSystemEvent = true;

    for (let i = 0; i < length; ++i) {
      const pointerEventProcessor = pointerEventProcessorList[i];

      if (pointerEventProcessor.isEnabled && pointerEventProcessor.shouldHandleEventTouch) {
        if (eventTouch.type === _eventEnum.InputEventType.TOUCH_START) {
          // @ts-expect-error access private method
          if (pointerEventProcessor._handleEventTouch(eventTouch)) {
            pointerEventProcessor.claimedTouchIdList.push(touch.getID());
            shouldDispatchToSystemEvent = false;

            if (!eventTouch.preventSwallow) {
              break;
            }
          }
        } else if (pointerEventProcessor.claimedTouchIdList.length > 0) {
          const index = pointerEventProcessor.claimedTouchIdList.indexOf(touch.getID());

          if (index !== -1) {
            // @ts-expect-error access private method
            pointerEventProcessor._handleEventTouch(eventTouch);

            if (eventTouch.type === _eventEnum.InputEventType.TOUCH_END || eventTouch.type === _eventEnum.InputEventType.TOUCH_CANCEL) {
              _js.js.array.removeAt(pointerEventProcessor.claimedTouchIdList, index);
            }

            shouldDispatchToSystemEvent = false;

            if (!eventTouch.preventSwallow) {
              break;
            }
          }
        }
      }
    }

    const type = _index.pointerEvent2SystemEvent[eventTouch.type];

    if (shouldDispatchToSystemEvent && type) {
      // @ts-expect-error _eventTarget is a private property
      _index.input._eventTarget.emit(type, eventTouch.touch, eventTouch);
    }

    if (--this._inDispatchCount <= 0) {
      this._updatePointerEventProcessorList();
    }
  }

  _updatePointerEventProcessorList() {
    const listToAdd = this._processorListToAdd;
    const addLength = listToAdd.length;

    for (let i = 0; i < addLength; ++i) {
      this.addPointerEventProcessor(listToAdd[i]);
    }

    listToAdd.length = 0;
    const listToRemove = this._processorListToRemove;
    const removeLength = listToRemove.length;

    for (let i = 0; i < removeLength; ++i) {
      this.removePointerEventProcessor(listToRemove[i]);
    }

    listToRemove.length = 0;
  }

  _sortPointerEventProcessorList() {
    if (!this._isListDirty) {
      return;
    }

    const pointerEventProcessorList = this._pointerEventProcessorList;
    const length = pointerEventProcessorList.length;

    for (let i = 0; i < length; ++i) {
      const pointerEventProcessor = pointerEventProcessorList[i];
      const node = pointerEventProcessor.node;
      const trans = node._uiProps.uiTransformComp;
      pointerEventProcessor.cachedCameraPriority = trans.cameraPriority;
    }

    pointerEventProcessorList.sort(this._sortByPriority);
    this._isListDirty = false;
  }

  _sortByPriority(p1, p2) {
    const node1 = p1.node;
    const node2 = p2.node;

    if (!p2 || !node2 || !node2.activeInHierarchy || !node2._uiProps.uiTransformComp) {
      return -1;
    } else if (!p1 || !node1 || !node1.activeInHierarchy || !node1._uiProps.uiTransformComp) {
      return 1;
    }

    if (p1.cachedCameraPriority !== p2.cachedCameraPriority) {
      return p2.cachedCameraPriority - p1.cachedCameraPriority;
    }

    let n1 = node1;
    let n2 = node2;
    let ex = false; // @ts-expect-error _id is a protected property

    while (((_n1$parent = n1.parent) === null || _n1$parent === void 0 ? void 0 : _n1$parent._id) !== ((_n2$parent = n2.parent) === null || _n2$parent === void 0 ? void 0 : _n2$parent._id)) {
      var _n1$parent, _n2$parent, _n, _n$parent, _n2, _n2$parent2;

      n1 = ((_n = n1) === null || _n === void 0 ? void 0 : (_n$parent = _n.parent) === null || _n$parent === void 0 ? void 0 : _n$parent.parent) === null ? (ex = true) && node2 : n1 && n1.parent;
      n2 = ((_n2 = n2) === null || _n2 === void 0 ? void 0 : (_n2$parent2 = _n2.parent) === null || _n2$parent2 === void 0 ? void 0 : _n2$parent2.parent) === null ? (ex = true) && node1 : n2 && n2.parent;
    } // @ts-expect-error protected property _id


    if (n1._id === n2._id) {
      // @ts-expect-error protected property _id
      if (n1._id === node2._id) {
        return -1;
      } // @ts-expect-error protected property _id


      if (n1._id === node1._id) {
        return 1;
      }
    }

    const priority1 = n1 ? n1.getSiblingIndex() : 0;
    const priority2 = n2 ? n2.getSiblingIndex() : 0;
    return ex ? priority1 - priority2 : priority2 - priority1;
  }

}

const pointerEventDispatcher = new PointerEventDispatcher();
exports.pointerEventDispatcher = pointerEventDispatcher;
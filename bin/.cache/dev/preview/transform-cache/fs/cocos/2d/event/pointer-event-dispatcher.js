System.register("q-bundled:///fs/cocos/2d/event/pointer-event-dispatcher.js", ["../../input/index.js", "../../core/scene-graph/node-event-processor.js", "../../core/utils/js.js", "../../input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var Input, input, pointerEvent2SystemEvent, DispatcherEventType, NodeEventProcessor, js, InputEventType, PointerEventDispatcher, pointerEventDispatcher;
  return {
    setters: [function (_inputIndexJs) {
      Input = _inputIndexJs.Input;
      input = _inputIndexJs.input;
      pointerEvent2SystemEvent = _inputIndexJs.pointerEvent2SystemEvent;
    }, function (_coreSceneGraphNodeEventProcessorJs) {
      DispatcherEventType = _coreSceneGraphNodeEventProcessorJs.DispatcherEventType;
      NodeEventProcessor = _coreSceneGraphNodeEventProcessorJs.NodeEventProcessor;
    }, function (_coreUtilsJsJs) {
      js = _coreUtilsJsJs.js;
    }, function (_inputTypesEventEnumJs) {
      InputEventType = _inputTypesEventEnumJs.InputEventType;
    }],
    execute: function () {
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
      PointerEventDispatcher = /*#__PURE__*/function () {
        function PointerEventDispatcher() {
          this._isListDirty = false;
          this._inDispatchCount = 0;
          this._pointerEventProcessorList = [];
          this._processorListToAdd = [];
          this._processorListToRemove = [];
          input.on(Input.EventType.MOUSE_DOWN, this.dispatchEventMouse, this);
          input.on(Input.EventType.MOUSE_MOVE, this.dispatchEventMouse, this);
          input.on(Input.EventType.MOUSE_UP, this.dispatchEventMouse, this);
          input.on(Input.EventType.MOUSE_WHEEL, this.dispatchEventMouse, this);
          input.on(Input.EventType.TOUCH_START, this.dispatchEventTouch, this);
          input.on(Input.EventType.TOUCH_MOVE, this.dispatchEventTouch, this);
          input.on(Input.EventType.TOUCH_END, this.dispatchEventTouch, this);
          input.on(Input.EventType.TOUCH_CANCEL, this.dispatchEventTouch, this);
          NodeEventProcessor.callbacksInvoker.on(DispatcherEventType.ADD_POINTER_EVENT_PROCESSOR, this.addPointerEventProcessor, this);
          NodeEventProcessor.callbacksInvoker.on(DispatcherEventType.REMOVE_POINTER_EVENT_PROCESSOR, this.removePointerEventProcessor, this);
        }

        var _proto = PointerEventDispatcher.prototype;

        _proto.addPointerEventProcessor = function addPointerEventProcessor(pointerEventProcessor) {
          if (this._inDispatchCount === 0) {
            this._pointerEventProcessorList.push(pointerEventProcessor);

            this._isListDirty = true;
          } else {
            this._processorListToAdd.push(pointerEventProcessor);
          }
        };

        _proto.removePointerEventProcessor = function removePointerEventProcessor(pointerEventProcessor) {
          if (this._inDispatchCount === 0) {
            js.array.remove(this._pointerEventProcessorList, pointerEventProcessor);
            this._isListDirty = true;
          } else {
            this._processorListToRemove.push(pointerEventProcessor);
          }
        };

        _proto.dispatchEventMouse = function dispatchEventMouse(eventMouse) {
          this._inDispatchCount++;

          this._sortPointerEventProcessorList();

          var pointerEventProcessorList = this._pointerEventProcessorList;
          var length = pointerEventProcessorList.length;
          var shouldDispatchToSystemEvent = true;

          for (var i = 0; i < length; ++i) {
            var pointerEventProcessor = pointerEventProcessorList[i];

            if (pointerEventProcessor.isEnabled && pointerEventProcessor.shouldHandleEventMouse // @ts-expect-error access private method
            && pointerEventProcessor._handleEventMouse(eventMouse)) {
              shouldDispatchToSystemEvent = false;

              if (!eventMouse.preventSwallow) {
                break;
              }
            }
          }

          var type = pointerEvent2SystemEvent[eventMouse.type];

          if (shouldDispatchToSystemEvent && type) {
            // @ts-expect-error _eventTarget is a private property
            input._eventTarget.emit(type, eventMouse);
          }

          if (--this._inDispatchCount <= 0) {
            this._updatePointerEventProcessorList();
          }
        };

        _proto.dispatchEventTouch = function dispatchEventTouch(eventTouch) {
          this._inDispatchCount++;

          this._sortPointerEventProcessorList();

          var pointerEventProcessorList = this._pointerEventProcessorList;
          var length = pointerEventProcessorList.length;
          var touch = eventTouch.touch;
          var shouldDispatchToSystemEvent = true;

          for (var i = 0; i < length; ++i) {
            var pointerEventProcessor = pointerEventProcessorList[i];

            if (pointerEventProcessor.isEnabled && pointerEventProcessor.shouldHandleEventTouch) {
              if (eventTouch.type === InputEventType.TOUCH_START) {
                // @ts-expect-error access private method
                if (pointerEventProcessor._handleEventTouch(eventTouch)) {
                  pointerEventProcessor.claimedTouchIdList.push(touch.getID());
                  shouldDispatchToSystemEvent = false;

                  if (!eventTouch.preventSwallow) {
                    break;
                  }
                }
              } else if (pointerEventProcessor.claimedTouchIdList.length > 0) {
                var index = pointerEventProcessor.claimedTouchIdList.indexOf(touch.getID());

                if (index !== -1) {
                  // @ts-expect-error access private method
                  pointerEventProcessor._handleEventTouch(eventTouch);

                  if (eventTouch.type === InputEventType.TOUCH_END || eventTouch.type === InputEventType.TOUCH_CANCEL) {
                    js.array.removeAt(pointerEventProcessor.claimedTouchIdList, index);
                  }

                  shouldDispatchToSystemEvent = false;

                  if (!eventTouch.preventSwallow) {
                    break;
                  }
                }
              }
            }
          }

          var type = pointerEvent2SystemEvent[eventTouch.type];

          if (shouldDispatchToSystemEvent && type) {
            // @ts-expect-error _eventTarget is a private property
            input._eventTarget.emit(type, eventTouch.touch, eventTouch);
          }

          if (--this._inDispatchCount <= 0) {
            this._updatePointerEventProcessorList();
          }
        };

        _proto._updatePointerEventProcessorList = function _updatePointerEventProcessorList() {
          var listToAdd = this._processorListToAdd;
          var addLength = listToAdd.length;

          for (var i = 0; i < addLength; ++i) {
            this.addPointerEventProcessor(listToAdd[i]);
          }

          listToAdd.length = 0;
          var listToRemove = this._processorListToRemove;
          var removeLength = listToRemove.length;

          for (var _i = 0; _i < removeLength; ++_i) {
            this.removePointerEventProcessor(listToRemove[_i]);
          }

          listToRemove.length = 0;
        };

        _proto._sortPointerEventProcessorList = function _sortPointerEventProcessorList() {
          if (!this._isListDirty) {
            return;
          }

          var pointerEventProcessorList = this._pointerEventProcessorList;
          var length = pointerEventProcessorList.length;

          for (var i = 0; i < length; ++i) {
            var pointerEventProcessor = pointerEventProcessorList[i];
            var node = pointerEventProcessor.node;
            var trans = node._uiProps.uiTransformComp;
            pointerEventProcessor.cachedCameraPriority = trans.cameraPriority;
          }

          pointerEventProcessorList.sort(this._sortByPriority);
          this._isListDirty = false;
        };

        _proto._sortByPriority = function _sortByPriority(p1, p2) {
          var node1 = p1.node;
          var node2 = p2.node;

          if (!p2 || !node2 || !node2.activeInHierarchy || !node2._uiProps.uiTransformComp) {
            return -1;
          } else if (!p1 || !node1 || !node1.activeInHierarchy || !node1._uiProps.uiTransformComp) {
            return 1;
          }

          if (p1.cachedCameraPriority !== p2.cachedCameraPriority) {
            return p2.cachedCameraPriority - p1.cachedCameraPriority;
          }

          var n1 = node1;
          var n2 = node2;
          var ex = false; // @ts-expect-error _id is a protected property

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

          var priority1 = n1 ? n1.getSiblingIndex() : 0;
          var priority2 = n2 ? n2.getSiblingIndex() : 0;
          return ex ? priority1 - priority2 : priority2 - priority1;
        };

        return PointerEventDispatcher;
      }();

      _export("pointerEventDispatcher", pointerEventDispatcher = new PointerEventDispatcher());
    }
  };
});
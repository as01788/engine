System.register("q-bundled:///fs/cocos/core/scene-graph/node-event-processor.js", ["../event/callbacks-invoker.js", "../math/vec2.js", "./node.js", "../global-exports.js", "./node-event.js", "../../input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var CallbacksInvoker, Vec2, Node, legacyCC, NodeEventType, InputEventType, _cachedArray, _currentHovered, pos, _touchEvents, _mouseEvents, DispatcherEventType, NodeEventProcessor;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  _export("DispatcherEventType", void 0);

  return {
    setters: [function (_eventCallbacksInvokerJs) {
      CallbacksInvoker = _eventCallbacksInvokerJs.CallbacksInvoker;
    }, function (_mathVec2Js) {
      Vec2 = _mathVec2Js.Vec2;
    }, function (_nodeJs) {
      Node = _nodeJs.Node;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_nodeEventJs) {
      NodeEventType = _nodeEventJs.NodeEventType;
    }, function (_inputTypesEventEnumJs) {
      InputEventType = _inputTypesEventEnumJs.InputEventType;
    }],
    execute: function () {
      _cachedArray = new Array(16);
      _currentHovered = null;
      pos = new Vec2();
      _touchEvents = [NodeEventType.TOUCH_START, NodeEventType.TOUCH_MOVE, NodeEventType.TOUCH_END, NodeEventType.TOUCH_CANCEL];
      _mouseEvents = [NodeEventType.MOUSE_DOWN, NodeEventType.MOUSE_ENTER, NodeEventType.MOUSE_MOVE, NodeEventType.MOUSE_LEAVE, NodeEventType.MOUSE_UP, NodeEventType.MOUSE_WHEEL];

      (function (DispatcherEventType) {
        DispatcherEventType[DispatcherEventType["ADD_POINTER_EVENT_PROCESSOR"] = 0] = "ADD_POINTER_EVENT_PROCESSOR";
        DispatcherEventType[DispatcherEventType["REMOVE_POINTER_EVENT_PROCESSOR"] = 1] = "REMOVE_POINTER_EVENT_PROCESSOR";
      })(DispatcherEventType || _export("DispatcherEventType", DispatcherEventType = {}));

      /**
       * @zh
       * 节点事件类。
       */
      _export("NodeEventProcessor", NodeEventProcessor = /*#__PURE__*/function () {
        var _proto = NodeEventProcessor.prototype;

        _proto.setEnabled = function setEnabled(value, recursive) {
          if (recursive === void 0) {
            recursive = false;
          }

          this._isEnabled = value;
          var node = this.node;
          var children = node.children;

          if (value) {
            this._attachMask();
          }

          if (recursive && children.length > 0) {
            for (var i = 0; i < children.length; ++i) {
              var child = children[i]; // @ts-expect-error child._eventProcessor is a protected property.

              child._eventProcessor.setEnabled(value, true);
            }
          }
        };

        function NodeEventProcessor(node) {
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

        _proto._searchComponentsInParent = function _searchComponentsInParent(ctor) {
          var node = this.node;

          if (ctor) {
            var index = 0;
            var list = [];

            for (var curr = node; curr && Node.isNode(curr); curr = curr.parent, ++index) {
              var comp = curr.getComponent(ctor);

              if (comp) {
                var next = {
                  index: index,
                  comp: comp
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
        };

        _proto._attachMask = function _attachMask() {
          this.maskList = this._searchComponentsInParent(NodeEventProcessor._maskComp);
        };

        _proto.reattach = function reattach() {
          var _this = this;

          var currentMaskList;
          this.node.walk(function (node) {
            if (!currentMaskList) {
              currentMaskList = _this._searchComponentsInParent(NodeEventProcessor._maskComp);
            }

            node.eventProcessor.maskList = currentMaskList;
          });
        };

        _proto.destroy = function destroy() {
          if (_currentHovered === this._node) {
            _currentHovered = null;
          }

          if (this.capturingTarget) this.capturingTarget.clear();
          if (this.bubblingTarget) this.bubblingTarget.clear();
          NodeEventProcessor.callbacksInvoker.emit(DispatcherEventType.REMOVE_POINTER_EVENT_PROCESSOR, this);
        };

        _proto._isTouchEvent = function _isTouchEvent(type) {
          var index = _touchEvents.indexOf(type);

          return index !== -1;
        };

        _proto._isMouseEvent = function _isMouseEvent(type) {
          var index = _mouseEvents.indexOf(type);

          return index !== -1;
        };

        _proto._hasTouchListeners = function _hasTouchListeners() {
          for (var i = 0; i < _touchEvents.length; ++i) {
            var eventType = _touchEvents[i];

            if (this.hasEventListener(eventType)) {
              return true;
            }
          }

          return false;
        };

        _proto._hasMouseListeners = function _hasMouseListeners() {
          for (var i = 0; i < _mouseEvents.length; ++i) {
            var eventType = _mouseEvents[i];

            if (this.hasEventListener(eventType)) {
              return true;
            }
          }

          return false;
        };

        _proto._hasPointerListeners = function _hasPointerListeners() {
          var has = this._hasTouchListeners();

          if (has) {
            return true;
          }

          return this._hasMouseListeners();
        };

        _proto._tryEmittingAddEvent = function _tryEmittingAddEvent(typeToAdd) {
          var isTouchEvent = this._isTouchEvent(typeToAdd);

          var isMouseEvent = this._isMouseEvent(typeToAdd);

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
        ;

        _proto._newCallbacksInvoker = function _newCallbacksInvoker() {
          var _this2 = this;

          var callbacksInvoker = new CallbacksInvoker(); // @ts-expect-error Property '_registerOffCallback' is private

          callbacksInvoker._registerOffCallback(function () {
            if (_this2.shouldHandleEventTouch && !_this2._hasTouchListeners()) {
              _this2.shouldHandleEventTouch = false;
            }

            if (_this2.shouldHandleEventMouse && !_this2._hasMouseListeners()) {
              _this2.shouldHandleEventMouse = false;
            }

            if (!_this2._hasPointerListeners()) {
              NodeEventProcessor.callbacksInvoker.emit(DispatcherEventType.REMOVE_POINTER_EVENT_PROCESSOR, _this2);
            }
          });

          return callbacksInvoker;
        };

        _proto.on = function on(type, callback, target, useCapture) {
          this._tryEmittingAddEvent(type);

          useCapture = !!useCapture;
          var invoker;

          if (useCapture) {
            var _this$capturingTarget;

            invoker = (_this$capturingTarget = this.capturingTarget) !== null && _this$capturingTarget !== void 0 ? _this$capturingTarget : this.capturingTarget = this._newCallbacksInvoker();
          } else {
            var _this$bubblingTarget;

            invoker = (_this$bubblingTarget = this.bubblingTarget) !== null && _this$bubblingTarget !== void 0 ? _this$bubblingTarget : this.bubblingTarget = this._newCallbacksInvoker();
          }

          invoker.on(type, callback, target);
          return callback;
        };

        _proto.once = function once(type, callback, target, useCapture) {
          this._tryEmittingAddEvent(type);

          useCapture = !!useCapture;
          var invoker;

          if (useCapture) {
            var _this$capturingTarget2;

            invoker = (_this$capturingTarget2 = this.capturingTarget) !== null && _this$capturingTarget2 !== void 0 ? _this$capturingTarget2 : this.capturingTarget = this._newCallbacksInvoker();
          } else {
            var _this$bubblingTarget2;

            invoker = (_this$bubblingTarget2 = this.bubblingTarget) !== null && _this$bubblingTarget2 !== void 0 ? _this$bubblingTarget2 : this.bubblingTarget = this._newCallbacksInvoker();
          }

          invoker.on(type, callback, target, true);
          return callback;
        };

        _proto.off = function off(type, callback, target, useCapture) {
          var _invoker;

          useCapture = !!useCapture;
          var invoker;

          if (useCapture) {
            invoker = this.capturingTarget;
          } else {
            invoker = this.bubblingTarget;
          }

          (_invoker = invoker) === null || _invoker === void 0 ? void 0 : _invoker.off(type, callback, target);
        };

        _proto.targetOff = function targetOff(target) {
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
        };

        _proto.emit = function emit(type, arg0, arg1, arg2, arg3, arg4) {
          var _this$bubblingTarget4;

          (_this$bubblingTarget4 = this.bubblingTarget) === null || _this$bubblingTarget4 === void 0 ? void 0 : _this$bubblingTarget4.emit(type, arg0, arg1, arg2, arg3, arg4);
        };

        _proto.dispatchEvent = function dispatchEvent(event) {
          var owner = this.node;
          var target;
          var i = 0;
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
        };

        _proto.hasEventListener = function hasEventListener(type, callback, target) {
          var has = false;

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
        ;

        _proto.getCapturingTargets = function getCapturingTargets(type, targets) {
          var parent = this._node.parent;

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
        ;

        _proto.getBubblingTargets = function getBubblingTargets(type, targets) {
          var parent = this._node.parent;

          while (parent) {
            var _parent$eventProcesso2;

            if ((_parent$eventProcesso2 = parent.eventProcessor.bubblingTarget) === null || _parent$eventProcesso2 === void 0 ? void 0 : _parent$eventProcesso2.hasEventListener(type)) {
              targets.push(parent);
            }

            parent = parent.parent;
          }
        } // #region handle mouse event
        ;

        _proto._handleEventMouse = function _handleEventMouse(eventMouse) {
          switch (eventMouse.type) {
            case InputEventType.MOUSE_DOWN:
              return this._handleMouseDown(eventMouse);

            case InputEventType.MOUSE_MOVE:
              return this._handleMouseMove(eventMouse);

            case InputEventType.MOUSE_UP:
              return this._handleMouseUp(eventMouse);

            case InputEventType.MOUSE_WHEEL:
              return this._handleMouseWheel(eventMouse);

            default:
              return false;
          }
        };

        _proto._handleMouseDown = function _handleMouseDown(event) {
          var node = this._node;

          if (!node || !node._uiProps.uiTransformComp) {
            return false;
          }

          pos = event.getUILocation();

          if (node._uiProps.uiTransformComp.isHit(pos)) {
            event.type = NodeEventType.MOUSE_DOWN;
            event.bubbles = true;
            node.dispatchEvent(event);
            event.propagationStopped = true;
            return true;
          }

          return false;
        };

        _proto._handleMouseMove = function _handleMouseMove(event) {
          var node = this._node;

          if (!node || !node._uiProps.uiTransformComp) {
            return false;
          }

          pos = event.getUILocation();

          var hit = node._uiProps.uiTransformComp.isHit(pos);

          if (hit) {
            if (!this.previousMouseIn) {
              // Fix issue when hover node switched, previous hovered node won't get MOUSE_LEAVE notification
              if (_currentHovered && _currentHovered !== node) {
                event.type = NodeEventType.MOUSE_LEAVE;

                _currentHovered.dispatchEvent(event);

                _currentHovered.eventProcessor.previousMouseIn = false;
              }

              _currentHovered = node;
              event.type = NodeEventType.MOUSE_ENTER;
              node.dispatchEvent(event);
              this.previousMouseIn = true;
            }

            event.type = NodeEventType.MOUSE_MOVE;
            event.bubbles = true;
            node.dispatchEvent(event);
            event.propagationStopped = true;
            return true;
          } else if (this.previousMouseIn) {
            event.type = NodeEventType.MOUSE_LEAVE;
            node.dispatchEvent(event);
            this.previousMouseIn = false;
            _currentHovered = null;
          }

          return false;
        };

        _proto._handleMouseUp = function _handleMouseUp(event) {
          var node = this._node;

          if (!node || !node._uiProps.uiTransformComp) {
            return false;
          }

          pos = event.getUILocation();

          if (node._uiProps.uiTransformComp.isHit(pos)) {
            event.type = NodeEventType.MOUSE_UP;
            event.bubbles = true;
            node.dispatchEvent(event);
            event.propagationStopped = true;
            return true;
          }

          return false;
        };

        _proto._handleMouseWheel = function _handleMouseWheel(event) {
          var node = this._node;

          if (!node || !node._uiProps.uiTransformComp) {
            return false;
          }

          pos = event.getUILocation();

          if (node._uiProps.uiTransformComp.isHit(pos)) {
            event.type = NodeEventType.MOUSE_WHEEL;
            event.bubbles = true;
            node.dispatchEvent(event); // event.propagationStopped = true;

            event.propagationStopped = true;
            return true;
          }

          return false;
        } // #endregion handle mouse event
        // #region handle touch event
        ;

        _proto._handleEventTouch = function _handleEventTouch(eventTouch) {
          switch (eventTouch.type) {
            case InputEventType.TOUCH_START:
              return this._handleTouchStart(eventTouch);

            case InputEventType.TOUCH_MOVE:
              return this._handleTouchMove(eventTouch);

            case InputEventType.TOUCH_END:
              return this._handleTouchEnd(eventTouch);

            case InputEventType.TOUCH_CANCEL:
              return this._handleTouchCancel(eventTouch);

            default:
              return false;
          }
        };

        _proto._handleTouchStart = function _handleTouchStart(event) {
          var node = this.node;

          if (!node || !node._uiProps.uiTransformComp) {
            return false;
          }

          event.getUILocation(pos);

          if (node._uiProps.uiTransformComp.isHit(pos)) {
            event.type = NodeEventType.TOUCH_START;
            event.bubbles = true;
            node.dispatchEvent(event);
            return true;
          }

          return false;
        };

        _proto._handleTouchMove = function _handleTouchMove(event) {
          var node = this.node;

          if (!node || !node._uiProps.uiTransformComp) {
            return false;
          }

          event.type = NodeEventType.TOUCH_MOVE;
          event.bubbles = true;
          node.dispatchEvent(event);
          return true;
        };

        _proto._handleTouchEnd = function _handleTouchEnd(event) {
          var node = this.node;

          if (!node || !node._uiProps.uiTransformComp) {
            return;
          }

          event.getUILocation(pos);

          if (node._uiProps.uiTransformComp.isHit(pos)) {
            event.type = NodeEventType.TOUCH_END;
          } else {
            event.type = NodeEventType.TOUCH_CANCEL;
          }

          event.bubbles = true;
          node.dispatchEvent(event);
        };

        _proto._handleTouchCancel = function _handleTouchCancel(event) {
          var node = this.node;

          if (!node || !node._uiProps.uiTransformComp) {
            return;
          }

          event.type = NodeEventType.TOUCH_CANCEL;
          event.bubbles = true;
          node.dispatchEvent(event);
        } // #endregion handle touch event
        ;

        _createClass(NodeEventProcessor, [{
          key: "isEnabled",
          get: function get() {
            return this._isEnabled;
          }
        }, {
          key: "node",
          get:
          /**
           * The owner of node event processor.
           */
          function get() {
            return this._node;
          }
          /**
           * Target in bubbling phase.
           */

        }]);

        return NodeEventProcessor;
      }());

      NodeEventProcessor._maskComp = null;
      NodeEventProcessor.callbacksInvoker = new CallbacksInvoker();
      legacyCC.NodeEventProcessor = NodeEventProcessor;
    }
  };
});
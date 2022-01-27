System.register("q-bundled:///fs/cocos/core/animation/marionette/graph-eval.js", ["../../../../../virtual/internal%253Aconstants.js", "./animation-graph.js", "../../data/utils/asserts.js", "./create-eval.js", "./parametric.js", "./condition.js", "./motion-state.js", "../../platform/debug.js", "../../../3d/skeletal-animation/skeletal-animation-blending.js", "./graph-debug.js", "./state-machine-component.js"], function (_export, _context) {
  "use strict";

  var DEBUG, isAnimationTransition, SubStateMachine, assertIsTrue, assertIsNonNullable, createEval, bindOr, VariableType, TriggerCondition, MotionState, warnID, BlendStateBuffer, clearWeightsStats, getWeightsStats, graphDebug, graphDebugGroup, graphDebugGroupEnd, GRAPH_DEBUG_ENABLED, StateMachineComponent, _Object$freeze, AnimationGraphEval, LayerEval, emptyClipStatusesIterator, emptyClipStatusesIterable, TransitionMatchCache, transitionMatchCache, transitionMatchCacheRegular, transitionMatchCacheAny, NodeKind, StateEval, InstantiatedComponents, MotionStateEval, SpecialStateEval, VarInstance;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function createStateStatusCache() {
    return {
      progress: 0.0
    };
  }

  function calcProgressUpdate(currentProgress, duration, deltaTime) {
    if (duration === 0.0) {
      // TODO?
      return 0.0;
    }

    var progress = currentProgress + deltaTime / duration;
    return progress;
  }

  function normalizeProgress(progress) {
    return progress - Math.trunc(progress);
  }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
    }, function (_animationGraphJs) {
      isAnimationTransition = _animationGraphJs.isAnimationTransition;
      SubStateMachine = _animationGraphJs.SubStateMachine;
    }, function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
      assertIsNonNullable = _dataUtilsAssertsJs.assertIsNonNullable;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_parametricJs) {
      bindOr = _parametricJs.bindOr;
      VariableType = _parametricJs.VariableType;
    }, function (_conditionJs) {
      TriggerCondition = _conditionJs.TriggerCondition;
    }, function (_motionStateJs) {
      MotionState = _motionStateJs.MotionState;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }, function (_dSkeletalAnimationSkeletalAnimationBlendingJs) {
      BlendStateBuffer = _dSkeletalAnimationSkeletalAnimationBlendingJs.BlendStateBuffer;
    }, function (_graphDebugJs) {
      clearWeightsStats = _graphDebugJs.clearWeightsStats;
      getWeightsStats = _graphDebugJs.getWeightsStats;
      graphDebug = _graphDebugJs.graphDebug;
      graphDebugGroup = _graphDebugJs.graphDebugGroup;
      graphDebugGroupEnd = _graphDebugJs.graphDebugGroupEnd;
      GRAPH_DEBUG_ENABLED = _graphDebugJs.GRAPH_DEBUG_ENABLED;
    }, function (_stateMachineComponentJs) {
      StateMachineComponent = _stateMachineComponentJs.StateMachineComponent;
    }],
    execute: function () {
      _export("AnimationGraphEval", AnimationGraphEval = /*#__PURE__*/function () {
        function AnimationGraphEval(graph, root, controller) {
          var _this = this;

          this._blendBuffer = new BlendStateBuffer();
          this._currentTransitionCache = {
            duration: 0.0,
            time: 0.0
          };
          this._varInstances = {};

          for (var _iterator = _createForOfIteratorHelperLoose(graph.variables), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
                _name = _step$value[0],
                _step$value$ = _step$value[1],
                type = _step$value$.type,
                _value = _step$value$.value;
            this._varInstances[_name] = new VarInstance(type, _value);
          }

          var context = {
            controller: controller,
            blendBuffer: this._blendBuffer,
            node: root,
            getVar: function getVar(id) {
              return _this._varInstances[id];
            },
            triggerResetFn: function triggerResetFn(name) {
              _this.setValue(name, false);
            }
          };
          this._layerEvaluations = Array.from(graph.layers).map(function (layer) {
            var _layer$mask;

            var layerEval = new LayerEval(layer, _extends({}, context, {
              mask: (_layer$mask = layer.mask) !== null && _layer$mask !== void 0 ? _layer$mask : undefined
            }));
            return layerEval;
          });
        }

        var _proto = AnimationGraphEval.prototype;

        _proto.update = function update(deltaTime) {
          graphDebugGroup("New frame started.");

          if (GRAPH_DEBUG_ENABLED) {
            clearWeightsStats();
          }

          for (var _iterator2 = _createForOfIteratorHelperLoose(this._layerEvaluations), _step2; !(_step2 = _iterator2()).done;) {
            var layerEval = _step2.value;
            layerEval.update(deltaTime);
          }

          if (GRAPH_DEBUG_ENABLED) {
            graphDebug("Weights: " + getWeightsStats());
          }

          this._blendBuffer.apply();

          graphDebugGroupEnd();
        };

        _proto.getVariables = function getVariables() {
          return Object.entries(this._varInstances);
        };

        _proto.getCurrentStateStatus = function getCurrentStateStatus(layer) {
          return this._layerEvaluations[layer].getCurrentStateStatus();
        };

        _proto.getCurrentClipStatuses = function getCurrentClipStatuses(layer) {
          return this._layerEvaluations[layer].getCurrentClipStatuses();
        };

        _proto.getCurrentTransition = function getCurrentTransition(layer) {
          var layers = this._layerEvaluations,
              currentTransition = this._currentTransitionCache;
          var isInTransition = layers[layer].getCurrentTransition(currentTransition);
          return isInTransition ? currentTransition : null;
        };

        _proto.getNextStateStatus = function getNextStateStatus(layer) {
          return this._layerEvaluations[layer].getNextStateStatus();
        };

        _proto.getNextClipStatuses = function getNextClipStatuses(layer) {
          assertIsNonNullable(this.getCurrentTransition(layer), '!!this.getCurrentTransition(layer)');
          return this._layerEvaluations[layer].getNextClipStatuses();
        };

        _proto.getValue = function getValue(name) {
          var varInstance = this._varInstances[name];

          if (!varInstance) {
            return undefined;
          } else {
            return varInstance.value;
          }
        };

        _proto.setValue = function setValue(name, value) {
          var varInstance = this._varInstances[name];

          if (!varInstance) {
            return;
          }

          varInstance.value = value;
        };

        return AnimationGraphEval;
      }());

      LayerEval = /*#__PURE__*/function () {
        function LayerEval(layer, context) {
          this._weight = void 0;
          this._nodes = [];
          this._topLevelEntry = void 0;
          this._topLevelExit = void 0;
          this._currentNode = void 0;
          this._currentTransitionToNode = null;
          this._currentTransitionPath = [];
          this._transitionProgress = 0;
          this._fromWeight = 0.0;
          this._toWeight = 0.0;
          this._fromUpdated = false;
          this._toUpdated = false;
          this.name = layer.name;
          this._controller = context.controller;
          this._weight = layer.weight;

          var _this$_addStateMachin = this._addStateMachine(layer.stateMachine, null, _extends({}, context), layer.name),
              entry = _this$_addStateMachin.entry,
              exit = _this$_addStateMachin.exit;

          this._topLevelEntry = entry;
          this._topLevelExit = exit;
          this._currentNode = entry;
          this._resetTrigger = context.triggerResetFn;
        }
        /**
         * Indicates if this layer's top level graph reached its exit.
         */


        var _proto2 = LayerEval.prototype;

        _proto2.update = function update(deltaTime) {
          if (!this.exited) {
            this._fromWeight = 1.0;
            this._toWeight = 0.0;

            this._eval(deltaTime);

            this._sample();
          }
        };

        _proto2.getCurrentStateStatus = function getCurrentStateStatus() {
          var currentNode = this._currentNode;

          if (currentNode.kind === NodeKind.animation) {
            return currentNode.getFromPortStatus();
          } else {
            return null;
          }
        };

        _proto2.getCurrentClipStatuses = function getCurrentClipStatuses() {
          var currentNode = this._currentNode;

          if (currentNode.kind === NodeKind.animation) {
            return currentNode.getClipStatuses(this._fromWeight);
          } else {
            return emptyClipStatusesIterable;
          }
        };

        _proto2.getCurrentTransition = function getCurrentTransition(transitionStatus) {
          var currentTransitionPath = this._currentTransitionPath;

          if (currentTransitionPath.length !== 0) {
            var lastNode = currentTransitionPath[currentTransitionPath.length - 1];

            if (lastNode.to.kind !== NodeKind.animation) {
              return false;
            }

            var _currentTransitionPat = currentTransitionPath[0],
                duration = _currentTransitionPat.duration,
                normalizedDuration = _currentTransitionPat.normalizedDuration;
            var durationInSeconds = transitionStatus.duration = normalizedDuration ? duration * (this._currentNode.kind === NodeKind.animation ? this._currentNode.duration : 0.0) : duration;
            transitionStatus.time = this._transitionProgress * durationInSeconds;
            return true;
          } else {
            return false;
          }
        };

        _proto2.getNextStateStatus = function getNextStateStatus() {
          assertIsTrue(this._currentTransitionToNode, 'There is no transition currently in layer.');
          return this._currentTransitionToNode.getToPortStatus();
        };

        _proto2.getNextClipStatuses = function getNextClipStatuses() {
          var _to$getClipStatuses;

          var currentTransitionPath = this._currentTransitionPath;
          var nCurrentTransitionPath = currentTransitionPath.length;
          assertIsTrue(nCurrentTransitionPath > 0, 'There is no transition currently in layer.');
          var to = currentTransitionPath[nCurrentTransitionPath - 1].to;
          assertIsTrue(to.kind === NodeKind.animation);
          return (_to$getClipStatuses = to.getClipStatuses(this._toWeight)) !== null && _to$getClipStatuses !== void 0 ? _to$getClipStatuses : emptyClipStatusesIterable;
        };

        _proto2._addStateMachine = function _addStateMachine(graph, parentStateMachineInfo, context, __DEBUG_ID__) {
          var _this2 = this;

          var nodes = Array.from(graph.states());
          var entryEval;
          var anyNode;
          var exitEval;
          var nodeEvaluations = nodes.map(function (node) {
            if (node instanceof MotionState) {
              return new MotionStateEval(node, context);
            } else if (node === graph.entryState) {
              return entryEval = new SpecialStateEval(node, NodeKind.entry, node.name);
            } else if (node === graph.exitState) {
              return exitEval = new SpecialStateEval(node, NodeKind.exit, node.name);
            } else if (node === graph.anyState) {
              return anyNode = new SpecialStateEval(node, NodeKind.any, node.name);
            } else {
              assertIsTrue(node instanceof SubStateMachine);
              return null;
            }
          });
          assertIsNonNullable(entryEval, 'Entry node is missing');
          assertIsNonNullable(exitEval, 'Exit node is missing');
          assertIsNonNullable(anyNode, 'Any node is missing');
          var stateMachineInfo = {
            components: null,
            parent: parentStateMachineInfo,
            entry: entryEval,
            exit: exitEval,
            any: anyNode
          };

          for (var iNode = 0; iNode < nodes.length; ++iNode) {
            var nodeEval = nodeEvaluations[iNode];

            if (nodeEval) {
              nodeEval.stateMachine = stateMachineInfo;
            }
          }

          var subStateMachineInfos = nodes.map(function (node) {
            if (node instanceof SubStateMachine) {
              var subStateMachineInfo = _this2._addStateMachine(node.stateMachine, stateMachineInfo, context, __DEBUG_ID__ + "/" + node.name);

              subStateMachineInfo.components = new InstantiatedComponents(node);
              return subStateMachineInfo;
            } else {
              return null;
            }
          });

          if (DEBUG) {
            for (var _iterator3 = _createForOfIteratorHelperLoose(nodeEvaluations), _step3; !(_step3 = _iterator3()).done;) {
              var _nodeEval = _step3.value;

              if (_nodeEval) {
                _nodeEval.__DEBUG_ID__ = _nodeEval.name + "(from " + __DEBUG_ID__ + ")";
              }
            }
          }

          for (var _iNode = 0; _iNode < nodes.length; ++_iNode) {
            var node = nodes[_iNode];
            var outgoingTemplates = graph.getOutgoings(node);
            var outgoingTransitions = [];
            var fromNode = void 0;

            if (node instanceof SubStateMachine) {
              var subStateMachineInfo = subStateMachineInfos[_iNode];
              assertIsNonNullable(subStateMachineInfo);
              fromNode = subStateMachineInfo.exit;
            } else {
              var _nodeEval2 = nodeEvaluations[_iNode];
              assertIsNonNullable(_nodeEval2);
              fromNode = _nodeEval2;
            }

            var _loop = function _loop() {
              var outgoing = _step4.value;
              var outgoingNode = outgoing.to;
              var iOutgoingNode = nodes.findIndex(function (nodeTemplate) {
                return nodeTemplate === outgoing.to;
              });

              if (iOutgoingNode < 0) {
                assertIsTrue(false, 'Bad animation data');
              }

              var toNode = void 0;

              if (outgoingNode instanceof SubStateMachine) {
                var _subStateMachineInfo = subStateMachineInfos[iOutgoingNode];
                assertIsNonNullable(_subStateMachineInfo);
                toNode = _subStateMachineInfo.entry;
              } else {
                var _nodeEval3 = nodeEvaluations[iOutgoingNode];
                assertIsNonNullable(_nodeEval3);
                toNode = _nodeEval3;
              }

              var transitionEval = {
                to: toNode,
                conditions: outgoing.conditions.map(function (condition) {
                  return condition[createEval](context);
                }),
                duration: isAnimationTransition(outgoing) ? outgoing.duration : 0.0,
                normalizedDuration: isAnimationTransition(outgoing) ? outgoing.relativeDuration : false,
                exitConditionEnabled: isAnimationTransition(outgoing) ? outgoing.exitConditionEnabled : false,
                exitCondition: isAnimationTransition(outgoing) ? outgoing.exitCondition : 0.0,
                triggers: undefined
              };
              transitionEval.conditions.forEach(function (conditionEval, iCondition) {
                var condition = outgoing.conditions[iCondition];

                if (condition instanceof TriggerCondition && condition.trigger) {
                  var _transitionEval$trigg;

                  // TODO: validates the existence of trigger?
                  ((_transitionEval$trigg = transitionEval.triggers) !== null && _transitionEval$trigg !== void 0 ? _transitionEval$trigg : transitionEval.triggers = []).push(condition.trigger);
                }
              });
              outgoingTransitions.push(transitionEval);
            };

            for (var _iterator4 = _createForOfIteratorHelperLoose(outgoingTemplates), _step4; !(_step4 = _iterator4()).done;) {
              _loop();
            }

            fromNode.outgoingTransitions = outgoingTransitions;
          }

          return stateMachineInfo;
        }
        /**
         * Updates this layer, return when the time piece exhausted or the graph reached exit state.
         * @param deltaTime The time piece to update.
         * @returns Remain time piece.
         */
        ;

        _proto2._eval = function _eval(deltaTime) {
          assertIsTrue(!this.exited);
          graphDebugGroup("[Layer " + this.name + "]: UpdateStart " + deltaTime + "s");

          var haltOnNonMotionState = this._continueDanglingTransition();

          if (haltOnNonMotionState) {
            return 0.0;
          }

          var MAX_ITERATIONS = 100;
          var passConsumed = 0.0;
          var remainTimePiece = deltaTime;

          for (var continueNextIterationForce = true, // Force next iteration even remain time piece is zero
          iterations = 0; continueNextIterationForce || remainTimePiece > 0.0;) {
            continueNextIterationForce = false;

            if (iterations !== 0) {
              graphDebug("Pass end. Consumed " + passConsumed + "s, remain: " + remainTimePiece + "s");
            }

            if (iterations === MAX_ITERATIONS) {
              warnID(14000, MAX_ITERATIONS);
              break;
            }

            graphDebug("Pass " + iterations + " started.");

            if (GRAPH_DEBUG_ENABLED) {
              passConsumed = 0.0;
            }

            ++iterations; // Update current transition if we're in transition.
            // If currently no transition, we simple fallthrough.

            if (this._currentTransitionPath.length > 0) {
              var currentUpdatingConsume = this._updateCurrentTransition(remainTimePiece);

              if (GRAPH_DEBUG_ENABLED) {
                passConsumed = currentUpdatingConsume;
              }

              remainTimePiece -= currentUpdatingConsume;

              if (this._currentNode.kind === NodeKind.exit) {
                break;
              }

              if (this._currentTransitionPath.length === 0) {
                // If the update invocation finished the transition,
                // We force restart the iteration
                continueNextIterationForce = true;
              }

              continue;
            }

            var currentNode = this._currentNode;

            var transitionMatch = this._matchCurrentNodeTransition(remainTimePiece);

            if (transitionMatch) {
              var transition = transitionMatch.transition,
                  updateRequires = transitionMatch.requires;
              graphDebug("[SubStateMachine " + this.name + "]: CurrentNodeUpdate: " + currentNode.name);

              if (GRAPH_DEBUG_ENABLED) {
                passConsumed = updateRequires;
              }

              remainTimePiece -= updateRequires;

              if (currentNode.kind === NodeKind.animation) {
                currentNode.updateFromPort(updateRequires);
                this._fromUpdated = true;
              }

              var ranIntoNonMotionState = this._switchTo(transition);

              if (ranIntoNonMotionState) {
                break;
              }

              continueNextIterationForce = true;
            } else {
              // If no transition matched, we update current node.
              graphDebug("[SubStateMachine " + this.name + "]: CurrentNodeUpdate: " + currentNode.name);

              if (currentNode.kind === NodeKind.animation) {
                currentNode.updateFromPort(remainTimePiece);
                this._fromUpdated = true; // Animation play eat all times.

                remainTimePiece = 0.0;
              }

              if (GRAPH_DEBUG_ENABLED) {
                passConsumed = remainTimePiece;
              }

              continue;
            }
          }

          graphDebug("[SubStateMachine " + this.name + "]: UpdateEnd");
          graphDebugGroupEnd();

          if (this._fromUpdated && this._currentNode.kind === NodeKind.animation) {
            this._fromUpdated = false;

            this._currentNode.triggerFromPortUpdate(this._controller);
          }

          if (this._currentTransitionToNode && this._toUpdated && this._currentNode.kind === NodeKind.animation) {
            this._toUpdated = false;

            this._currentTransitionToNode.triggerToPortUpdate(this._controller);
          }

          return remainTimePiece;
        };

        _proto2._sample = function _sample() {
          var currentNode = this._currentNode,
              currentTransitionToNode = this._currentTransitionToNode,
              fromWeight = this._fromWeight;

          if (currentNode.kind === NodeKind.animation) {
            currentNode.sampleFromPort(fromWeight);
          }

          if (currentTransitionToNode) {
            if (currentTransitionToNode.kind === NodeKind.animation) {
              currentTransitionToNode.sampleToPort(this._toWeight);
            }
          }
        }
        /**
         * Searches for a transition which should be performed
         * if current node update for no more than `deltaTime`.
         * @param deltaTime
         * @returns
         */
        ;

        _proto2._matchCurrentNodeTransition = function _matchCurrentNodeTransition(deltaTime) {
          var currentNode = this._currentNode;
          var minDeltaTimeRequired = Infinity;
          var transitionRequiringMinDeltaTime = null;

          var match0 = this._matchTransition(currentNode, currentNode, deltaTime, transitionMatchCacheRegular);

          if (match0) {
            minDeltaTimeRequired = match0.requires;
            transitionRequiringMinDeltaTime = match0.transition;
          }

          if (currentNode.kind === NodeKind.animation) {
            for (var ancestor = currentNode.stateMachine; ancestor !== null; ancestor = ancestor.parent) {
              var anyMatch = this._matchTransition(ancestor.any, currentNode, deltaTime, transitionMatchCacheAny);

              if (anyMatch && anyMatch.requires < minDeltaTimeRequired) {
                minDeltaTimeRequired = anyMatch.requires;
                transitionRequiringMinDeltaTime = anyMatch.transition;
              }
            }
          }

          var result = transitionMatchCache;

          if (transitionRequiringMinDeltaTime) {
            return result.set(transitionRequiringMinDeltaTime, minDeltaTimeRequired);
          }

          return null;
        }
        /**
         * Searches for a transition which should be performed
         * if specified node update for no more than `deltaTime`.
         * @param node
         * @param realNode
         * @param deltaTime
         * @returns
         */
        ;

        _proto2._matchTransition = function _matchTransition(node, realNode, deltaTime, result) {
          assertIsTrue(node === realNode || node.kind === NodeKind.any);
          var outgoingTransitions = node.outgoingTransitions;
          var nTransitions = outgoingTransitions.length;
          var minDeltaTimeRequired = Infinity;
          var transitionRequiringMinDeltaTime = null;

          for (var iTransition = 0; iTransition < nTransitions; ++iTransition) {
            var transition = outgoingTransitions[iTransition];
            var conditions = transition.conditions;
            var nConditions = conditions.length; // Handle empty condition case.

            if (nConditions === 0) {
              if (node.kind === NodeKind.entry || node.kind === NodeKind.exit) {
                // These kinds of transition is definitely chosen.
                return result.set(transition, 0.0);
              }

              if (!transition.exitConditionEnabled) {
                // Invalid transition, ignored.
                continue;
              }
            }

            var deltaTimeRequired = 0.0;

            if (realNode.kind === NodeKind.animation && transition.exitConditionEnabled) {
              var exitTime = realNode.duration * transition.exitCondition;
              deltaTimeRequired = Math.max(exitTime - realNode.fromPortTime, 0.0);

              if (deltaTimeRequired > deltaTime) {
                continue;
              }
            }

            var satisfied = true;

            for (var iCondition = 0; iCondition < nConditions; ++iCondition) {
              var condition = conditions[iCondition];

              if (!condition.eval()) {
                satisfied = false;
                break;
              }
            }

            if (!satisfied) {
              continue;
            }

            if (deltaTimeRequired === 0.0) {
              // Exit condition is disabled or the exit condition is just 0.0.
              return result.set(transition, 0.0);
            }

            if (deltaTimeRequired < minDeltaTimeRequired) {
              minDeltaTimeRequired = deltaTimeRequired;
              transitionRequiringMinDeltaTime = transition;
            }
          }

          if (transitionRequiringMinDeltaTime) {
            return result.set(transitionRequiringMinDeltaTime, minDeltaTimeRequired);
          }

          return null;
        }
        /**
         * Try switch current node using specified transition.
         * @param transition The transition.
         * @returns If the transition finally ran into entry/exit state.
         */
        ;

        _proto2._switchTo = function _switchTo(transition) {
          var currentNode = this._currentNode;
          graphDebugGroup("[SubStateMachine " + this.name + "]: STARTED " + currentNode.name + " -> " + transition.to.name + ".");
          var currentTransitionPath = this._currentTransitionPath;

          this._consumeTransition(transition);

          currentTransitionPath.push(transition);

          var motionNode = this._matchTransitionPathUntilMotion();

          if (motionNode) {
            // Apply transitions
            this._doTransitionToMotion(motionNode);

            return false;
          } else {
            return true;
          }
        }
        /**
         * Called every frame(not every iteration).
         * Returns if we ran into an entry/exit node and still no satisfied transition matched this frame.
         */
        ;

        _proto2._continueDanglingTransition = function _continueDanglingTransition() {
          var currentTransitionPath = this._currentTransitionPath;
          var lenCurrentTransitionPath = currentTransitionPath.length;

          if (lenCurrentTransitionPath === 0) {
            return false;
          }

          var lastTransition = currentTransitionPath[lenCurrentTransitionPath - 1];
          var tailNode = lastTransition.to;

          if (tailNode.kind !== NodeKind.animation) {
            var motionNode = this._matchTransitionPathUntilMotion();

            if (motionNode) {
              // Apply transitions
              this._doTransitionToMotion(motionNode);

              return false;
            } else {
              return true;
            }
          }

          return false;
        };

        _proto2._matchTransitionPathUntilMotion = function _matchTransitionPathUntilMotion() {
          var currentTransitionPath = this._currentTransitionPath;
          var lenCurrentTransitionPath = currentTransitionPath.length;
          assertIsTrue(lenCurrentTransitionPath !== 0);
          var lastTransition = currentTransitionPath[lenCurrentTransitionPath - 1];
          var tailNode = lastTransition.to;

          for (; tailNode.kind !== NodeKind.animation;) {
            var transitionMatch = this._matchTransition(tailNode, tailNode, 0.0, transitionMatchCache);

            if (!transitionMatch) {
              break;
            }

            var transition = transitionMatch.transition;

            this._consumeTransition(transition);

            currentTransitionPath.push(transition);
            tailNode = transition.to;
          }

          return tailNode.kind === NodeKind.animation ? tailNode : null;
        };

        _proto2._consumeTransition = function _consumeTransition(transition) {
          var to = transition.to;

          if (to.kind === NodeKind.entry) {
            // We're entering a state machine
            this._callEnterMethods(to);
          }
        };

        _proto2._resetTriggersAlongThePath = function _resetTriggersAlongThePath() {
          var currentTransitionPath = this._currentTransitionPath;
          var nTransitions = currentTransitionPath.length;

          for (var iTransition = 0; iTransition < nTransitions; ++iTransition) {
            var transition = currentTransitionPath[iTransition];

            this._resetTriggersOnTransition(transition);
          }
        };

        _proto2._doTransitionToMotion = function _doTransitionToMotion(targetNode) {
          // Reset triggers
          this._resetTriggersAlongThePath();

          this._transitionProgress = 0.0;
          this._currentTransitionToNode = targetNode;
          this._toUpdated = false;
          targetNode.resetToPort();

          this._callEnterMethods(targetNode);
        }
        /**
         * Update current transition.
         * Asserts: `!!this._currentTransition`.
         * @param deltaTime Time piece.
         * @returns
         */
        ;

        _proto2._updateCurrentTransition = function _updateCurrentTransition(deltaTime) {
          var _toNode$name;

          var currentTransitionPath = this._currentTransitionPath,
              currentTransitionToNode = this._currentTransitionToNode;
          assertIsNonNullable(currentTransitionPath.length > 0);
          assertIsNonNullable(currentTransitionToNode);
          var currentTransition = currentTransitionPath[0];
          var transitionDuration = currentTransition.duration,
              normalizedDuration = currentTransition.normalizedDuration;
          var fromNode = this._currentNode;
          var toNode = currentTransitionToNode;
          var contrib = 0.0;
          var ratio = 0.0;

          if (transitionDuration <= 0) {
            contrib = 0.0;
            ratio = 1.0;
          } else {
            assertIsTrue(fromNode.kind === NodeKind.animation);
            var transitionProgress = this._transitionProgress;
            var durationSeconds = normalizedDuration ? transitionDuration * fromNode.duration : transitionDuration;
            var progressSeconds = transitionProgress * durationSeconds;
            var remain = durationSeconds - progressSeconds;
            assertIsTrue(remain >= 0.0);
            contrib = Math.min(remain, deltaTime);
            ratio = this._transitionProgress = (progressSeconds + contrib) / durationSeconds;
            assertIsTrue(ratio >= 0.0 && ratio <= 1.0);
          }

          var toNodeName = (_toNode$name = toNode === null || toNode === void 0 ? void 0 : toNode.name) !== null && _toNode$name !== void 0 ? _toNode$name : '<Empty>';
          var weight = this._weight;
          graphDebugGroup("[SubStateMachine " + this.name + "]: TransitionUpdate: " + fromNode.name + " -> " + toNodeName + ("with ratio " + ratio + " in base weight " + this._weight + "."));
          this._fromWeight = weight * (1.0 - ratio);
          this._toWeight = weight * ratio;
          var shouldUpdatePorts = contrib !== 0;
          var hasFinished = ratio === 1.0;

          if (fromNode.kind === NodeKind.animation && shouldUpdatePorts) {
            graphDebugGroup("Update " + fromNode.name);
            fromNode.updateFromPort(contrib);
            this._fromUpdated = true;
            graphDebugGroupEnd();
          }

          if (toNode && shouldUpdatePorts) {
            graphDebugGroup("Update " + toNode.name);
            toNode.updateToPort(contrib);
            this._toUpdated = true;
            graphDebugGroupEnd();
          }

          graphDebugGroupEnd();

          if (hasFinished) {
            // Transition done.
            graphDebug("[SubStateMachine " + this.name + "]: Transition finished:  " + fromNode.name + " -> " + toNodeName + ".");

            this._callExitMethods(fromNode); // Exiting overrides the updating
            // Processed below.
            // this._fromUpdated = false;


            var transitions = this._currentTransitionPath;
            var nTransition = transitions.length;

            for (var iTransition = 0; iTransition < nTransition; ++iTransition) {
              var to = transitions[iTransition].to;

              if (to.kind === NodeKind.exit) {
                this._callExitMethods(to);
              }
            }

            this._fromUpdated = this._toUpdated;
            this._toUpdated = false;
            toNode.finishTransition();
            this._currentNode = toNode;
            this._currentTransitionToNode = null;
            this._currentTransitionPath.length = 0;
            this._fromWeight = 1.0;
            this._toWeight = 0.0;
          }

          return contrib;
        };

        _proto2._resetTriggersOnTransition = function _resetTriggersOnTransition(transition) {
          var triggers = transition.triggers;

          if (triggers) {
            var nTriggers = triggers.length;

            for (var iTrigger = 0; iTrigger < nTriggers; ++iTrigger) {
              var trigger = triggers[iTrigger];

              this._resetTrigger(trigger);
            }
          }
        };

        _proto2._resetTrigger = function _resetTrigger(name) {
          var triggerResetFn = this._triggerReset;
          triggerResetFn(name);
        };

        _proto2._callEnterMethods = function _callEnterMethods(node) {
          var _node$stateMachine$co;

          var controller = this._controller;

          switch (node.kind) {
            default:
              break;

            case NodeKind.animation:
              {
                node.components.callMotionStateEnterMethods(controller, node.getToPortStatus());
                break;
              }

            case NodeKind.entry:
              (_node$stateMachine$co = node.stateMachine.components) === null || _node$stateMachine$co === void 0 ? void 0 : _node$stateMachine$co.callStateMachineEnterMethods(controller);
              break;
          }
        };

        _proto2._callExitMethods = function _callExitMethods(node) {
          var _node$stateMachine$co2;

          var controller = this._controller;

          switch (node.kind) {
            default:
              break;

            case NodeKind.animation:
              {
                node.components.callMotionStateExitMethods(controller, node.getFromPortStatus());
                break;
              }

            case NodeKind.exit:
              (_node$stateMachine$co2 = node.stateMachine.components) === null || _node$stateMachine$co2 === void 0 ? void 0 : _node$stateMachine$co2.callStateMachineExitMethods(controller);
              break;
          }
        };

        _createClass(LayerEval, [{
          key: "exited",
          get: function get() {
            return this._currentNode === this._topLevelExit;
          }
        }]);

        return LayerEval;
      }();

      emptyClipStatusesIterator = Object.freeze({
        next: function next() {
          return {
            done: true,
            value: undefined
          };
        }
      });
      emptyClipStatusesIterable = Object.freeze((_Object$freeze = {}, _Object$freeze[Symbol.iterator] = function () {
        return emptyClipStatusesIterator;
      }, _Object$freeze));

      TransitionMatchCache = /*#__PURE__*/function () {
        function TransitionMatchCache() {
          this.transition = null;
          this.requires = 0.0;
        }

        var _proto3 = TransitionMatchCache.prototype;

        _proto3.set = function set(transition, requires) {
          this.transition = transition;
          this.requires = requires;
          return this;
        };

        return TransitionMatchCache;
      }();

      transitionMatchCache = new TransitionMatchCache();
      transitionMatchCacheRegular = new TransitionMatchCache();
      transitionMatchCacheAny = new TransitionMatchCache();

      (function (NodeKind) {
        NodeKind[NodeKind["entry"] = 0] = "entry";
        NodeKind[NodeKind["exit"] = 1] = "exit";
        NodeKind[NodeKind["any"] = 2] = "any";
        NodeKind[NodeKind["animation"] = 3] = "animation";
      })(NodeKind || (NodeKind = {}));

      _export("StateEval", StateEval = function StateEval(node) {
        this.name = void 0;
        this.outgoingTransitions = [];
        this.name = node.name;
      });

      InstantiatedComponents = /*#__PURE__*/function () {
        function InstantiatedComponents(node) {
          this._components = node.instantiateComponents();
        }

        var _proto4 = InstantiatedComponents.prototype;

        _proto4.callMotionStateEnterMethods = function callMotionStateEnterMethods(controller, status) {
          this._callMotionStateCallbackIfNonDefault('onMotionStateEnter', controller, status);
        };

        _proto4.callMotionStateUpdateMethods = function callMotionStateUpdateMethods(controller, status) {
          this._callMotionStateCallbackIfNonDefault('onMotionStateUpdate', controller, status);
        };

        _proto4.callMotionStateExitMethods = function callMotionStateExitMethods(controller, status) {
          this._callMotionStateCallbackIfNonDefault('onMotionStateExit', controller, status);
        };

        _proto4.callStateMachineEnterMethods = function callStateMachineEnterMethods(controller) {
          this._callStateMachineCallbackIfNonDefault('onStateMachineEnter', controller);
        };

        _proto4.callStateMachineExitMethods = function callStateMachineExitMethods(controller) {
          this._callStateMachineCallbackIfNonDefault('onStateMachineExit', controller);
        };

        _proto4._callMotionStateCallbackIfNonDefault = function _callMotionStateCallbackIfNonDefault(methodName, controller, status) {
          var components = this._components;
          var nComponents = components.length;

          for (var iComponent = 0; iComponent < nComponents; ++iComponent) {
            var component = components[iComponent];

            if (component[methodName] !== StateMachineComponent.prototype[methodName]) {
              component[methodName](controller, status);
            }
          }
        };

        _proto4._callStateMachineCallbackIfNonDefault = function _callStateMachineCallbackIfNonDefault(methodName, controller) {
          var components = this._components;
          var nComponents = components.length;

          for (var iComponent = 0; iComponent < nComponents; ++iComponent) {
            var component = components[iComponent];

            if (component[methodName] !== StateMachineComponent.prototype[methodName]) {
              component[methodName](controller);
            }
          }
        };

        return InstantiatedComponents;
      }();

      _export("MotionStateEval", MotionStateEval = /*#__PURE__*/function (_StateEval) {
        _inheritsLoose(MotionStateEval, _StateEval);

        function MotionStateEval(node, context) {
          var _node$motion$createEv, _node$motion;

          var _this3;

          _this3 = _StateEval.call(this, node) || this;
          _this3.kind = NodeKind.animation;
          _this3._source = null;
          _this3._speed = 1.0;
          _this3._fromPort = {
            progress: 0.0,
            statusCache: createStateStatusCache()
          };
          _this3._toPort = {
            progress: 0.0,
            statusCache: createStateStatusCache()
          };
          var speed = bindOr(context, node.speed, VariableType.FLOAT, _this3._setSpeed, _assertThisInitialized(_this3));
          _this3._speed = speed;

          var sourceEvalContext = _extends({}, context);

          var sourceEval = (_node$motion$createEv = (_node$motion = node.motion) === null || _node$motion === void 0 ? void 0 : _node$motion[createEval](sourceEvalContext)) !== null && _node$motion$createEv !== void 0 ? _node$motion$createEv : null;

          if (sourceEval) {
            Object.defineProperty(sourceEval, '__DEBUG_ID__', {
              value: _this3.name
            });
          }

          _this3._source = sourceEval;
          _this3.components = new InstantiatedComponents(node);
          return _this3;
        }

        var _proto5 = MotionStateEval.prototype;

        _proto5.updateFromPort = function updateFromPort(deltaTime) {
          this._fromPort.progress = calcProgressUpdate(this._fromPort.progress, this.duration, deltaTime * this._speed);
        };

        _proto5.updateToPort = function updateToPort(deltaTime) {
          this._toPort.progress = calcProgressUpdate(this._toPort.progress, this.duration, deltaTime * this._speed);
        };

        _proto5.triggerFromPortUpdate = function triggerFromPortUpdate(controller) {
          this.components.callMotionStateUpdateMethods(controller, this.getFromPortStatus());
        };

        _proto5.triggerToPortUpdate = function triggerToPortUpdate(controller) {
          this.components.callMotionStateUpdateMethods(controller, this.getToPortStatus());
        };

        _proto5.getFromPortStatus = function getFromPortStatus() {
          var stateStatus = this._fromPort.statusCache;

          if (DEBUG) {
            stateStatus.__DEBUG_ID__ = this.name;
          }

          stateStatus.progress = normalizeProgress(this._fromPort.progress);
          return stateStatus;
        };

        _proto5.getToPortStatus = function getToPortStatus() {
          var stateStatus = this._toPort.statusCache;

          if (DEBUG) {
            stateStatus.__DEBUG_ID__ = this.name;
          }

          stateStatus.progress = normalizeProgress(this._toPort.progress);
          return stateStatus;
        };

        _proto5.resetToPort = function resetToPort() {
          this._toPort.progress = 0.0;
        };

        _proto5.finishTransition = function finishTransition() {
          this._fromPort.progress = this._toPort.progress;
        };

        _proto5.sampleFromPort = function sampleFromPort(weight) {
          var _this$_source;

          (_this$_source = this._source) === null || _this$_source === void 0 ? void 0 : _this$_source.sample(this._fromPort.progress, weight);
        };

        _proto5.sampleToPort = function sampleToPort(weight) {
          var _this$_source2;

          (_this$_source2 = this._source) === null || _this$_source2 === void 0 ? void 0 : _this$_source2.sample(this._toPort.progress, weight);
        };

        _proto5.getClipStatuses = function getClipStatuses(baseWeight) {
          var source = this._source;

          if (!source) {
            return emptyClipStatusesIterable;
          } else {
            var _ref;

            return _ref = {}, _ref[Symbol.iterator] = function () {
              return source.getClipStatuses(baseWeight);
            }, _ref;
          }
        };

        _proto5._setSpeed = function _setSpeed(value) {
          this._speed = value;
        };

        _createClass(MotionStateEval, [{
          key: "duration",
          get: function get() {
            var _this$_source$duratio, _this$_source3;

            return (_this$_source$duratio = (_this$_source3 = this._source) === null || _this$_source3 === void 0 ? void 0 : _this$_source3.duration) !== null && _this$_source$duratio !== void 0 ? _this$_source$duratio : 0.0;
          }
        }, {
          key: "fromPortTime",
          get: function get() {
            return this._fromPort.progress * this.duration;
          }
        }]);

        return MotionStateEval;
      }(StateEval));

      _export("SpecialStateEval", SpecialStateEval = /*#__PURE__*/function (_StateEval2) {
        _inheritsLoose(SpecialStateEval, _StateEval2);

        function SpecialStateEval(node, kind, name) {
          var _this4;

          _this4 = _StateEval2.call(this, node) || this;
          _this4.kind = void 0;
          _this4.kind = kind;
          return _this4;
        }

        return SpecialStateEval;
      }(StateEval));

      VarInstance = /*#__PURE__*/function () {
        function VarInstance(type, value) {
          this.type = void 0;
          this._value = void 0;
          this._refs = [];
          this.type = type;
          this._value = value;
        }

        var _proto6 = VarInstance.prototype;

        _proto6.bind = function bind(fn, thisArg) {
          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          this._refs.push({
            fn: fn,
            thisArg: thisArg,
            args: args
          });

          return this._value;
        };

        _createClass(VarInstance, [{
          key: "value",
          get: function get() {
            return this._value;
          },
          set: function set(value) {
            this._value = value;

            for (var _iterator5 = _createForOfIteratorHelperLoose(this._refs), _step5; !(_step5 = _iterator5()).done;) {
              var _step5$value = _step5.value,
                  fn = _step5$value.fn,
                  thisArg = _step5$value.thisArg,
                  args = _step5$value.args;
              fn.call.apply(fn, [thisArg, value].concat(args));
            }
          }
        }]);

        return VarInstance;
      }();
    }
  };
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialStateEval = exports.MotionStateEval = exports.StateEval = exports.AnimationGraphEval = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _animationGraph = require("./animation-graph.js");

var _asserts = require("../../data/utils/asserts.js");

var _createEval = require("./create-eval.js");

var _parametric = require("./parametric.js");

var _condition = require("./condition.js");

var _motionState = require("./motion-state.js");

var _debug = require("../../platform/debug.js");

var _skeletalAnimationBlending = require("../../../3d/skeletal-animation/skeletal-animation-blending.js");

var _graphDebug = require("./graph-debug.js");

var _stateMachineComponent = require("./state-machine-component.js");

class AnimationGraphEval {
  constructor(graph, root, controller) {
    this._blendBuffer = new _skeletalAnimationBlending.BlendStateBuffer();
    this._currentTransitionCache = {
      duration: 0.0,
      time: 0.0
    };
    this._varInstances = {};

    for (const [name, {
      type,
      value
    }] of graph.variables) {
      this._varInstances[name] = new VarInstance(type, value);
    }

    const context = {
      controller,
      blendBuffer: this._blendBuffer,
      node: root,
      getVar: id => this._varInstances[id],
      triggerResetFn: name => {
        this.setValue(name, false);
      }
    };
    this._layerEvaluations = Array.from(graph.layers).map(layer => {
      var _layer$mask;

      const layerEval = new LayerEval(layer, { ...context,
        mask: (_layer$mask = layer.mask) !== null && _layer$mask !== void 0 ? _layer$mask : undefined
      });
      return layerEval;
    });
  }

  update(deltaTime) {
    (0, _graphDebug.graphDebugGroup)(`New frame started.`);

    if (_graphDebug.GRAPH_DEBUG_ENABLED) {
      (0, _graphDebug.clearWeightsStats)();
    }

    for (const layerEval of this._layerEvaluations) {
      layerEval.update(deltaTime);
    }

    if (_graphDebug.GRAPH_DEBUG_ENABLED) {
      (0, _graphDebug.graphDebug)(`Weights: ${(0, _graphDebug.getWeightsStats)()}`);
    }

    this._blendBuffer.apply();

    (0, _graphDebug.graphDebugGroupEnd)();
  }

  getVariables() {
    return Object.entries(this._varInstances);
  }

  getCurrentStateStatus(layer) {
    return this._layerEvaluations[layer].getCurrentStateStatus();
  }

  getCurrentClipStatuses(layer) {
    return this._layerEvaluations[layer].getCurrentClipStatuses();
  }

  getCurrentTransition(layer) {
    const {
      _layerEvaluations: layers,
      _currentTransitionCache: currentTransition
    } = this;
    const isInTransition = layers[layer].getCurrentTransition(currentTransition);
    return isInTransition ? currentTransition : null;
  }

  getNextStateStatus(layer) {
    return this._layerEvaluations[layer].getNextStateStatus();
  }

  getNextClipStatuses(layer) {
    (0, _asserts.assertIsNonNullable)(this.getCurrentTransition(layer), '!!this.getCurrentTransition(layer)');
    return this._layerEvaluations[layer].getNextClipStatuses();
  }

  getValue(name) {
    const varInstance = this._varInstances[name];

    if (!varInstance) {
      return undefined;
    } else {
      return varInstance.value;
    }
  }

  setValue(name, value) {
    const varInstance = this._varInstances[name];

    if (!varInstance) {
      return;
    }

    varInstance.value = value;
  }

}

exports.AnimationGraphEval = AnimationGraphEval;

class LayerEval {
  constructor(layer, context) {
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

    const {
      entry,
      exit
    } = this._addStateMachine(layer.stateMachine, null, { ...context
    }, layer.name);

    this._topLevelEntry = entry;
    this._topLevelExit = exit;
    this._currentNode = entry;
    this._resetTrigger = context.triggerResetFn;
  }
  /**
   * Indicates if this layer's top level graph reached its exit.
   */


  get exited() {
    return this._currentNode === this._topLevelExit;
  }

  update(deltaTime) {
    if (!this.exited) {
      this._fromWeight = 1.0;
      this._toWeight = 0.0;

      this._eval(deltaTime);

      this._sample();
    }
  }

  getCurrentStateStatus() {
    const {
      _currentNode: currentNode
    } = this;

    if (currentNode.kind === NodeKind.animation) {
      return currentNode.getFromPortStatus();
    } else {
      return null;
    }
  }

  getCurrentClipStatuses() {
    const {
      _currentNode: currentNode
    } = this;

    if (currentNode.kind === NodeKind.animation) {
      return currentNode.getClipStatuses(this._fromWeight);
    } else {
      return emptyClipStatusesIterable;
    }
  }

  getCurrentTransition(transitionStatus) {
    const {
      _currentTransitionPath: currentTransitionPath
    } = this;

    if (currentTransitionPath.length !== 0) {
      const lastNode = currentTransitionPath[currentTransitionPath.length - 1];

      if (lastNode.to.kind !== NodeKind.animation) {
        return false;
      }

      const {
        duration,
        normalizedDuration
      } = currentTransitionPath[0];
      const durationInSeconds = transitionStatus.duration = normalizedDuration ? duration * (this._currentNode.kind === NodeKind.animation ? this._currentNode.duration : 0.0) : duration;
      transitionStatus.time = this._transitionProgress * durationInSeconds;
      return true;
    } else {
      return false;
    }
  }

  getNextStateStatus() {
    (0, _asserts.assertIsTrue)(this._currentTransitionToNode, 'There is no transition currently in layer.');
    return this._currentTransitionToNode.getToPortStatus();
  }

  getNextClipStatuses() {
    var _to$getClipStatuses;

    const {
      _currentTransitionPath: currentTransitionPath
    } = this;
    const nCurrentTransitionPath = currentTransitionPath.length;
    (0, _asserts.assertIsTrue)(nCurrentTransitionPath > 0, 'There is no transition currently in layer.');
    const to = currentTransitionPath[nCurrentTransitionPath - 1].to;
    (0, _asserts.assertIsTrue)(to.kind === NodeKind.animation);
    return (_to$getClipStatuses = to.getClipStatuses(this._toWeight)) !== null && _to$getClipStatuses !== void 0 ? _to$getClipStatuses : emptyClipStatusesIterable;
  }

  _addStateMachine(graph, parentStateMachineInfo, context, __DEBUG_ID__) {
    const nodes = Array.from(graph.states());
    let entryEval;
    let anyNode;
    let exitEval;
    const nodeEvaluations = nodes.map(node => {
      if (node instanceof _motionState.MotionState) {
        return new MotionStateEval(node, context);
      } else if (node === graph.entryState) {
        return entryEval = new SpecialStateEval(node, NodeKind.entry, node.name);
      } else if (node === graph.exitState) {
        return exitEval = new SpecialStateEval(node, NodeKind.exit, node.name);
      } else if (node === graph.anyState) {
        return anyNode = new SpecialStateEval(node, NodeKind.any, node.name);
      } else {
        (0, _asserts.assertIsTrue)(node instanceof _animationGraph.SubStateMachine);
        return null;
      }
    });
    (0, _asserts.assertIsNonNullable)(entryEval, 'Entry node is missing');
    (0, _asserts.assertIsNonNullable)(exitEval, 'Exit node is missing');
    (0, _asserts.assertIsNonNullable)(anyNode, 'Any node is missing');
    const stateMachineInfo = {
      components: null,
      parent: parentStateMachineInfo,
      entry: entryEval,
      exit: exitEval,
      any: anyNode
    };

    for (let iNode = 0; iNode < nodes.length; ++iNode) {
      const nodeEval = nodeEvaluations[iNode];

      if (nodeEval) {
        nodeEval.stateMachine = stateMachineInfo;
      }
    }

    const subStateMachineInfos = nodes.map(node => {
      if (node instanceof _animationGraph.SubStateMachine) {
        const subStateMachineInfo = this._addStateMachine(node.stateMachine, stateMachineInfo, context, `${__DEBUG_ID__}/${node.name}`);

        subStateMachineInfo.components = new InstantiatedComponents(node);
        return subStateMachineInfo;
      } else {
        return null;
      }
    });

    if (_internal253Aconstants.DEBUG) {
      for (const nodeEval of nodeEvaluations) {
        if (nodeEval) {
          nodeEval.__DEBUG_ID__ = `${nodeEval.name}(from ${__DEBUG_ID__})`;
        }
      }
    }

    for (let iNode = 0; iNode < nodes.length; ++iNode) {
      const node = nodes[iNode];
      const outgoingTemplates = graph.getOutgoings(node);
      const outgoingTransitions = [];
      let fromNode;

      if (node instanceof _animationGraph.SubStateMachine) {
        const subStateMachineInfo = subStateMachineInfos[iNode];
        (0, _asserts.assertIsNonNullable)(subStateMachineInfo);
        fromNode = subStateMachineInfo.exit;
      } else {
        const nodeEval = nodeEvaluations[iNode];
        (0, _asserts.assertIsNonNullable)(nodeEval);
        fromNode = nodeEval;
      }

      for (const outgoing of outgoingTemplates) {
        const outgoingNode = outgoing.to;
        const iOutgoingNode = nodes.findIndex(nodeTemplate => nodeTemplate === outgoing.to);

        if (iOutgoingNode < 0) {
          (0, _asserts.assertIsTrue)(false, 'Bad animation data');
        }

        let toNode;

        if (outgoingNode instanceof _animationGraph.SubStateMachine) {
          const subStateMachineInfo = subStateMachineInfos[iOutgoingNode];
          (0, _asserts.assertIsNonNullable)(subStateMachineInfo);
          toNode = subStateMachineInfo.entry;
        } else {
          const nodeEval = nodeEvaluations[iOutgoingNode];
          (0, _asserts.assertIsNonNullable)(nodeEval);
          toNode = nodeEval;
        }

        const transitionEval = {
          to: toNode,
          conditions: outgoing.conditions.map(condition => condition[_createEval.createEval](context)),
          duration: (0, _animationGraph.isAnimationTransition)(outgoing) ? outgoing.duration : 0.0,
          normalizedDuration: (0, _animationGraph.isAnimationTransition)(outgoing) ? outgoing.relativeDuration : false,
          exitConditionEnabled: (0, _animationGraph.isAnimationTransition)(outgoing) ? outgoing.exitConditionEnabled : false,
          exitCondition: (0, _animationGraph.isAnimationTransition)(outgoing) ? outgoing.exitCondition : 0.0,
          triggers: undefined
        };
        transitionEval.conditions.forEach((conditionEval, iCondition) => {
          const condition = outgoing.conditions[iCondition];

          if (condition instanceof _condition.TriggerCondition && condition.trigger) {
            var _transitionEval$trigg;

            // TODO: validates the existence of trigger?
            ((_transitionEval$trigg = transitionEval.triggers) !== null && _transitionEval$trigg !== void 0 ? _transitionEval$trigg : transitionEval.triggers = []).push(condition.trigger);
          }
        });
        outgoingTransitions.push(transitionEval);
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


  _eval(deltaTime) {
    (0, _asserts.assertIsTrue)(!this.exited);
    (0, _graphDebug.graphDebugGroup)(`[Layer ${this.name}]: UpdateStart ${deltaTime}s`);

    const haltOnNonMotionState = this._continueDanglingTransition();

    if (haltOnNonMotionState) {
      return 0.0;
    }

    const MAX_ITERATIONS = 100;
    let passConsumed = 0.0;
    let remainTimePiece = deltaTime;

    for (let continueNextIterationForce = true, // Force next iteration even remain time piece is zero
    iterations = 0; continueNextIterationForce || remainTimePiece > 0.0;) {
      continueNextIterationForce = false;

      if (iterations !== 0) {
        (0, _graphDebug.graphDebug)(`Pass end. Consumed ${passConsumed}s, remain: ${remainTimePiece}s`);
      }

      if (iterations === MAX_ITERATIONS) {
        (0, _debug.warnID)(14000, MAX_ITERATIONS);
        break;
      }

      (0, _graphDebug.graphDebug)(`Pass ${iterations} started.`);

      if (_graphDebug.GRAPH_DEBUG_ENABLED) {
        passConsumed = 0.0;
      }

      ++iterations; // Update current transition if we're in transition.
      // If currently no transition, we simple fallthrough.

      if (this._currentTransitionPath.length > 0) {
        const currentUpdatingConsume = this._updateCurrentTransition(remainTimePiece);

        if (_graphDebug.GRAPH_DEBUG_ENABLED) {
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

      const {
        _currentNode: currentNode
      } = this;

      const transitionMatch = this._matchCurrentNodeTransition(remainTimePiece);

      if (transitionMatch) {
        const {
          transition,
          requires: updateRequires
        } = transitionMatch;
        (0, _graphDebug.graphDebug)(`[SubStateMachine ${this.name}]: CurrentNodeUpdate: ${currentNode.name}`);

        if (_graphDebug.GRAPH_DEBUG_ENABLED) {
          passConsumed = updateRequires;
        }

        remainTimePiece -= updateRequires;

        if (currentNode.kind === NodeKind.animation) {
          currentNode.updateFromPort(updateRequires);
          this._fromUpdated = true;
        }

        const ranIntoNonMotionState = this._switchTo(transition);

        if (ranIntoNonMotionState) {
          break;
        }

        continueNextIterationForce = true;
      } else {
        // If no transition matched, we update current node.
        (0, _graphDebug.graphDebug)(`[SubStateMachine ${this.name}]: CurrentNodeUpdate: ${currentNode.name}`);

        if (currentNode.kind === NodeKind.animation) {
          currentNode.updateFromPort(remainTimePiece);
          this._fromUpdated = true; // Animation play eat all times.

          remainTimePiece = 0.0;
        }

        if (_graphDebug.GRAPH_DEBUG_ENABLED) {
          passConsumed = remainTimePiece;
        }

        continue;
      }
    }

    (0, _graphDebug.graphDebug)(`[SubStateMachine ${this.name}]: UpdateEnd`);
    (0, _graphDebug.graphDebugGroupEnd)();

    if (this._fromUpdated && this._currentNode.kind === NodeKind.animation) {
      this._fromUpdated = false;

      this._currentNode.triggerFromPortUpdate(this._controller);
    }

    if (this._currentTransitionToNode && this._toUpdated && this._currentNode.kind === NodeKind.animation) {
      this._toUpdated = false;

      this._currentTransitionToNode.triggerToPortUpdate(this._controller);
    }

    return remainTimePiece;
  }

  _sample() {
    const {
      _currentNode: currentNode,
      _currentTransitionToNode: currentTransitionToNode,
      _fromWeight: fromWeight
    } = this;

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


  _matchCurrentNodeTransition(deltaTime) {
    const currentNode = this._currentNode;
    let minDeltaTimeRequired = Infinity;
    let transitionRequiringMinDeltaTime = null;

    const match0 = this._matchTransition(currentNode, currentNode, deltaTime, transitionMatchCacheRegular);

    if (match0) {
      ({
        requires: minDeltaTimeRequired,
        transition: transitionRequiringMinDeltaTime
      } = match0);
    }

    if (currentNode.kind === NodeKind.animation) {
      for (let ancestor = currentNode.stateMachine; ancestor !== null; ancestor = ancestor.parent) {
        const anyMatch = this._matchTransition(ancestor.any, currentNode, deltaTime, transitionMatchCacheAny);

        if (anyMatch && anyMatch.requires < minDeltaTimeRequired) {
          ({
            requires: minDeltaTimeRequired,
            transition: transitionRequiringMinDeltaTime
          } = anyMatch);
        }
      }
    }

    const result = transitionMatchCache;

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


  _matchTransition(node, realNode, deltaTime, result) {
    (0, _asserts.assertIsTrue)(node === realNode || node.kind === NodeKind.any);
    const {
      outgoingTransitions
    } = node;
    const nTransitions = outgoingTransitions.length;
    let minDeltaTimeRequired = Infinity;
    let transitionRequiringMinDeltaTime = null;

    for (let iTransition = 0; iTransition < nTransitions; ++iTransition) {
      const transition = outgoingTransitions[iTransition];
      const {
        conditions
      } = transition;
      const nConditions = conditions.length; // Handle empty condition case.

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

      let deltaTimeRequired = 0.0;

      if (realNode.kind === NodeKind.animation && transition.exitConditionEnabled) {
        const exitTime = realNode.duration * transition.exitCondition;
        deltaTimeRequired = Math.max(exitTime - realNode.fromPortTime, 0.0);

        if (deltaTimeRequired > deltaTime) {
          continue;
        }
      }

      let satisfied = true;

      for (let iCondition = 0; iCondition < nConditions; ++iCondition) {
        const condition = conditions[iCondition];

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


  _switchTo(transition) {
    const {
      _currentNode: currentNode
    } = this;
    (0, _graphDebug.graphDebugGroup)(`[SubStateMachine ${this.name}]: STARTED ${currentNode.name} -> ${transition.to.name}.`);
    const {
      _currentTransitionPath: currentTransitionPath
    } = this;

    this._consumeTransition(transition);

    currentTransitionPath.push(transition);

    const motionNode = this._matchTransitionPathUntilMotion();

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


  _continueDanglingTransition() {
    const {
      _currentTransitionPath: currentTransitionPath
    } = this;
    const lenCurrentTransitionPath = currentTransitionPath.length;

    if (lenCurrentTransitionPath === 0) {
      return false;
    }

    const lastTransition = currentTransitionPath[lenCurrentTransitionPath - 1];
    const tailNode = lastTransition.to;

    if (tailNode.kind !== NodeKind.animation) {
      const motionNode = this._matchTransitionPathUntilMotion();

      if (motionNode) {
        // Apply transitions
        this._doTransitionToMotion(motionNode);

        return false;
      } else {
        return true;
      }
    }

    return false;
  }

  _matchTransitionPathUntilMotion() {
    const {
      _currentTransitionPath: currentTransitionPath
    } = this;
    const lenCurrentTransitionPath = currentTransitionPath.length;
    (0, _asserts.assertIsTrue)(lenCurrentTransitionPath !== 0);
    const lastTransition = currentTransitionPath[lenCurrentTransitionPath - 1];
    let tailNode = lastTransition.to;

    for (; tailNode.kind !== NodeKind.animation;) {
      const transitionMatch = this._matchTransition(tailNode, tailNode, 0.0, transitionMatchCache);

      if (!transitionMatch) {
        break;
      }

      const transition = transitionMatch.transition;

      this._consumeTransition(transition);

      currentTransitionPath.push(transition);
      tailNode = transition.to;
    }

    return tailNode.kind === NodeKind.animation ? tailNode : null;
  }

  _consumeTransition(transition) {
    const {
      to
    } = transition;

    if (to.kind === NodeKind.entry) {
      // We're entering a state machine
      this._callEnterMethods(to);
    }
  }

  _resetTriggersAlongThePath() {
    const {
      _currentTransitionPath: currentTransitionPath
    } = this;
    const nTransitions = currentTransitionPath.length;

    for (let iTransition = 0; iTransition < nTransitions; ++iTransition) {
      const transition = currentTransitionPath[iTransition];

      this._resetTriggersOnTransition(transition);
    }
  }

  _doTransitionToMotion(targetNode) {
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


  _updateCurrentTransition(deltaTime) {
    var _toNode$name;

    const {
      _currentTransitionPath: currentTransitionPath,
      _currentTransitionToNode: currentTransitionToNode
    } = this;
    (0, _asserts.assertIsNonNullable)(currentTransitionPath.length > 0);
    (0, _asserts.assertIsNonNullable)(currentTransitionToNode);
    const currentTransition = currentTransitionPath[0];
    const {
      duration: transitionDuration,
      normalizedDuration
    } = currentTransition;
    const fromNode = this._currentNode;
    const toNode = currentTransitionToNode;
    let contrib = 0.0;
    let ratio = 0.0;

    if (transitionDuration <= 0) {
      contrib = 0.0;
      ratio = 1.0;
    } else {
      (0, _asserts.assertIsTrue)(fromNode.kind === NodeKind.animation);
      const {
        _transitionProgress: transitionProgress
      } = this;
      const durationSeconds = normalizedDuration ? transitionDuration * fromNode.duration : transitionDuration;
      const progressSeconds = transitionProgress * durationSeconds;
      const remain = durationSeconds - progressSeconds;
      (0, _asserts.assertIsTrue)(remain >= 0.0);
      contrib = Math.min(remain, deltaTime);
      ratio = this._transitionProgress = (progressSeconds + contrib) / durationSeconds;
      (0, _asserts.assertIsTrue)(ratio >= 0.0 && ratio <= 1.0);
    }

    const toNodeName = (_toNode$name = toNode === null || toNode === void 0 ? void 0 : toNode.name) !== null && _toNode$name !== void 0 ? _toNode$name : '<Empty>';
    const weight = this._weight;
    (0, _graphDebug.graphDebugGroup)(`[SubStateMachine ${this.name}]: TransitionUpdate: ${fromNode.name} -> ${toNodeName}` + `with ratio ${ratio} in base weight ${this._weight}.`);
    this._fromWeight = weight * (1.0 - ratio);
    this._toWeight = weight * ratio;
    const shouldUpdatePorts = contrib !== 0;
    const hasFinished = ratio === 1.0;

    if (fromNode.kind === NodeKind.animation && shouldUpdatePorts) {
      (0, _graphDebug.graphDebugGroup)(`Update ${fromNode.name}`);
      fromNode.updateFromPort(contrib);
      this._fromUpdated = true;
      (0, _graphDebug.graphDebugGroupEnd)();
    }

    if (toNode && shouldUpdatePorts) {
      (0, _graphDebug.graphDebugGroup)(`Update ${toNode.name}`);
      toNode.updateToPort(contrib);
      this._toUpdated = true;
      (0, _graphDebug.graphDebugGroupEnd)();
    }

    (0, _graphDebug.graphDebugGroupEnd)();

    if (hasFinished) {
      // Transition done.
      (0, _graphDebug.graphDebug)(`[SubStateMachine ${this.name}]: Transition finished:  ${fromNode.name} -> ${toNodeName}.`);

      this._callExitMethods(fromNode); // Exiting overrides the updating
      // Processed below.
      // this._fromUpdated = false;


      const {
        _currentTransitionPath: transitions
      } = this;
      const nTransition = transitions.length;

      for (let iTransition = 0; iTransition < nTransition; ++iTransition) {
        const {
          to
        } = transitions[iTransition];

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
  }

  _resetTriggersOnTransition(transition) {
    const {
      triggers
    } = transition;

    if (triggers) {
      const nTriggers = triggers.length;

      for (let iTrigger = 0; iTrigger < nTriggers; ++iTrigger) {
        const trigger = triggers[iTrigger];

        this._resetTrigger(trigger);
      }
    }
  }

  _resetTrigger(name) {
    const {
      _triggerReset: triggerResetFn
    } = this;
    triggerResetFn(name);
  }

  _callEnterMethods(node) {
    var _node$stateMachine$co;

    const {
      _controller: controller
    } = this;

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
  }

  _callExitMethods(node) {
    var _node$stateMachine$co2;

    const {
      _controller: controller
    } = this;

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
  }

}

function createStateStatusCache() {
  return {
    progress: 0.0
  };
}

const emptyClipStatusesIterator = Object.freeze({
  next() {
    return {
      done: true,
      value: undefined
    };
  }

});
const emptyClipStatusesIterable = Object.freeze({
  [Symbol.iterator]() {
    return emptyClipStatusesIterator;
  }

});

class TransitionMatchCache {
  constructor() {
    this.transition = null;
    this.requires = 0.0;
  }

  set(transition, requires) {
    this.transition = transition;
    this.requires = requires;
    return this;
  }

}

const transitionMatchCache = new TransitionMatchCache();
const transitionMatchCacheRegular = new TransitionMatchCache();
const transitionMatchCacheAny = new TransitionMatchCache();
var NodeKind;

(function (NodeKind) {
  NodeKind[NodeKind["entry"] = 0] = "entry";
  NodeKind[NodeKind["exit"] = 1] = "exit";
  NodeKind[NodeKind["any"] = 2] = "any";
  NodeKind[NodeKind["animation"] = 3] = "animation";
})(NodeKind || (NodeKind = {}));

class StateEval {
  constructor(node) {
    this.name = void 0;
    this.outgoingTransitions = [];
    this.name = node.name;
  }

}

exports.StateEval = StateEval;

class InstantiatedComponents {
  constructor(node) {
    this._components = node.instantiateComponents();
  }

  callMotionStateEnterMethods(controller, status) {
    this._callMotionStateCallbackIfNonDefault('onMotionStateEnter', controller, status);
  }

  callMotionStateUpdateMethods(controller, status) {
    this._callMotionStateCallbackIfNonDefault('onMotionStateUpdate', controller, status);
  }

  callMotionStateExitMethods(controller, status) {
    this._callMotionStateCallbackIfNonDefault('onMotionStateExit', controller, status);
  }

  callStateMachineEnterMethods(controller) {
    this._callStateMachineCallbackIfNonDefault('onStateMachineEnter', controller);
  }

  callStateMachineExitMethods(controller) {
    this._callStateMachineCallbackIfNonDefault('onStateMachineExit', controller);
  }

  _callMotionStateCallbackIfNonDefault(methodName, controller, status) {
    const {
      _components: components
    } = this;
    const nComponents = components.length;

    for (let iComponent = 0; iComponent < nComponents; ++iComponent) {
      const component = components[iComponent];

      if (component[methodName] !== _stateMachineComponent.StateMachineComponent.prototype[methodName]) {
        component[methodName](controller, status);
      }
    }
  }

  _callStateMachineCallbackIfNonDefault(methodName, controller) {
    const {
      _components: components
    } = this;
    const nComponents = components.length;

    for (let iComponent = 0; iComponent < nComponents; ++iComponent) {
      const component = components[iComponent];

      if (component[methodName] !== _stateMachineComponent.StateMachineComponent.prototype[methodName]) {
        component[methodName](controller);
      }
    }
  }

}

class MotionStateEval extends StateEval {
  constructor(node, context) {
    var _node$motion$createEv, _node$motion;

    super(node);
    this.kind = NodeKind.animation;
    this._source = null;
    this._speed = 1.0;
    this._fromPort = {
      progress: 0.0,
      statusCache: createStateStatusCache()
    };
    this._toPort = {
      progress: 0.0,
      statusCache: createStateStatusCache()
    };
    const speed = (0, _parametric.bindOr)(context, node.speed, _parametric.VariableType.FLOAT, this._setSpeed, this);
    this._speed = speed;
    const sourceEvalContext = { ...context
    };
    const sourceEval = (_node$motion$createEv = (_node$motion = node.motion) === null || _node$motion === void 0 ? void 0 : _node$motion[_createEval.createEval](sourceEvalContext)) !== null && _node$motion$createEv !== void 0 ? _node$motion$createEv : null;

    if (sourceEval) {
      Object.defineProperty(sourceEval, '__DEBUG_ID__', {
        value: this.name
      });
    }

    this._source = sourceEval;
    this.components = new InstantiatedComponents(node);
  }

  get duration() {
    var _this$_source$duratio, _this$_source;

    return (_this$_source$duratio = (_this$_source = this._source) === null || _this$_source === void 0 ? void 0 : _this$_source.duration) !== null && _this$_source$duratio !== void 0 ? _this$_source$duratio : 0.0;
  }

  get fromPortTime() {
    return this._fromPort.progress * this.duration;
  }

  updateFromPort(deltaTime) {
    this._fromPort.progress = calcProgressUpdate(this._fromPort.progress, this.duration, deltaTime * this._speed);
  }

  updateToPort(deltaTime) {
    this._toPort.progress = calcProgressUpdate(this._toPort.progress, this.duration, deltaTime * this._speed);
  }

  triggerFromPortUpdate(controller) {
    this.components.callMotionStateUpdateMethods(controller, this.getFromPortStatus());
  }

  triggerToPortUpdate(controller) {
    this.components.callMotionStateUpdateMethods(controller, this.getToPortStatus());
  }

  getFromPortStatus() {
    const {
      statusCache: stateStatus
    } = this._fromPort;

    if (_internal253Aconstants.DEBUG) {
      stateStatus.__DEBUG_ID__ = this.name;
    }

    stateStatus.progress = normalizeProgress(this._fromPort.progress);
    return stateStatus;
  }

  getToPortStatus() {
    const {
      statusCache: stateStatus
    } = this._toPort;

    if (_internal253Aconstants.DEBUG) {
      stateStatus.__DEBUG_ID__ = this.name;
    }

    stateStatus.progress = normalizeProgress(this._toPort.progress);
    return stateStatus;
  }

  resetToPort() {
    this._toPort.progress = 0.0;
  }

  finishTransition() {
    this._fromPort.progress = this._toPort.progress;
  }

  sampleFromPort(weight) {
    var _this$_source2;

    (_this$_source2 = this._source) === null || _this$_source2 === void 0 ? void 0 : _this$_source2.sample(this._fromPort.progress, weight);
  }

  sampleToPort(weight) {
    var _this$_source3;

    (_this$_source3 = this._source) === null || _this$_source3 === void 0 ? void 0 : _this$_source3.sample(this._toPort.progress, weight);
  }

  getClipStatuses(baseWeight) {
    const {
      _source: source
    } = this;

    if (!source) {
      return emptyClipStatusesIterable;
    } else {
      return {
        [Symbol.iterator]: () => source.getClipStatuses(baseWeight)
      };
    }
  }

  _setSpeed(value) {
    this._speed = value;
  }

}

exports.MotionStateEval = MotionStateEval;

function calcProgressUpdate(currentProgress, duration, deltaTime) {
  if (duration === 0.0) {
    // TODO?
    return 0.0;
  }

  const progress = currentProgress + deltaTime / duration;
  return progress;
}

function normalizeProgress(progress) {
  return progress - Math.trunc(progress);
}

class SpecialStateEval extends StateEval {
  constructor(node, kind, name) {
    super(node);
    this.kind = void 0;
    this.kind = kind;
  }

}

exports.SpecialStateEval = SpecialStateEval;

class VarInstance {
  constructor(type, value) {
    this.type = void 0;
    this._value = void 0;
    this._refs = [];
    this.type = type;
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;

    for (const {
      fn,
      thisArg,
      args
    } of this._refs) {
      fn.call(thisArg, value, ...args);
    }
  }

  bind(fn, thisArg, ...args) {
    this._refs.push({
      fn: fn,
      thisArg,
      args
    });

    return this._value;
  }

}
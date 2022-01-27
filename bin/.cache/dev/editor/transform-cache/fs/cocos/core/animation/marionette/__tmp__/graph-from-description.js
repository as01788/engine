"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGraphFromDescription = createGraphFromDescription;

var _vec = require("../../../math/vec2.js");

var _animationGraph = require("../animation-graph.js");

var _condition = require("../condition.js");

var _clipMotion = require("../clip-motion.js");

var _animationBlend1d = require("../animation-blend-1d.js");

var _animationBlend2d = require("../animation-blend-2d.js");

var _parametric = require("../parametric.js");

function createGraphFromDescription(graphDescription) {
  const graph = new _animationGraph.AnimationGraph();

  if (graphDescription.vars) {
    for (const varDesc of graphDescription.vars) {
      graph.addVariable(varDesc.name, getVariableTypeFromValue(varDesc.value), varDesc.value);
    }
  }

  for (const layerDesc of graphDescription.layers) {
    const layer = graph.addLayer();
    createSubgraph(layer.stateMachine, layerDesc.graph);
  }

  return graph;
}

function createSubgraph(subgraph, subgraphDesc) {
  var _subgraphDesc$nodes$m, _subgraphDesc$nodes;

  const nodes = (_subgraphDesc$nodes$m = (_subgraphDesc$nodes = subgraphDesc.nodes) === null || _subgraphDesc$nodes === void 0 ? void 0 : _subgraphDesc$nodes.map(nodeDesc => {
    let node;

    if (nodeDesc.type === 'animation') {
      const animationState = subgraph.addMotion();

      if (nodeDesc.motion) {
        animationState.motion = createMotion(nodeDesc.motion);
      }

      node = animationState;
    } else {
      const subSubgraph = subgraph.addSubStateMachine();
      createSubgraph(subgraph, nodeDesc);
      node = subSubgraph;
    }

    if (nodeDesc.name) {
      node.name = nodeDesc.name;
    }

    return node;
  })) !== null && _subgraphDesc$nodes$m !== void 0 ? _subgraphDesc$nodes$m : [];

  if (subgraphDesc.entryTransitions) {
    for (const transitionDesc of subgraphDesc.entryTransitions) {
      createTransition(subgraph, subgraph.entryState, nodes[transitionDesc.to], transitionDesc);
    }
  }

  if (subgraphDesc.exitTransitions) {
    for (const transitionDesc of subgraphDesc.exitTransitions) {
      createAnimationTransition(subgraph, nodes[transitionDesc.from], subgraph.exitState, transitionDesc);
    }
  }

  if (subgraphDesc.anyTransitions) {
    for (const transitionDesc of subgraphDesc.anyTransitions) {
      createTransition(subgraph, subgraph.entryState, nodes[transitionDesc.to], transitionDesc);
    }
  }

  if (subgraphDesc.transitions) {
    for (const transitionDesc of subgraphDesc.transitions) {
      createAnimationTransition(subgraph, nodes[transitionDesc.from], nodes[transitionDesc.to], transitionDesc);
    }
  }
}

function createTransition(graph, from, to, transitionDesc) {
  var _transitionDesc$condi;

  let condition;
  const conditions = (_transitionDesc$condi = transitionDesc.conditions) === null || _transitionDesc$condi === void 0 ? void 0 : _transitionDesc$condi.map(conditionDesc => {
    switch (conditionDesc.type) {
      default:
        throw new Error(`Unknown condition type.`);

      case 'unary':
        {
          const condition = new _condition.UnaryCondition();
          condition.operator = _condition.UnaryCondition.Operator[conditionDesc.type];
          createParametric(conditionDesc.operand, condition.operand);
          return condition;
        }

      case 'binary':
        {
          const condition = new _condition.BinaryCondition();
          condition.operator = _condition.BinaryCondition.Operator[conditionDesc.type];
          createParametric(conditionDesc.lhs, condition.lhs);
          createParametric(conditionDesc.rhs, condition.rhs);
          return condition;
        }

      case 'trigger':
        {
          const condition = new _condition.TriggerCondition();
          return condition;
        }
    }
  });
  const transition = graph.connect(from, to, conditions);
  return transition;
}

function createAnimationTransition(graph, from, to, descriptor) {
  const transition = createTransition(graph, from, to, descriptor);
  const {
    duration,
    exitCondition
  } = descriptor;
  transition.duration = duration !== null && duration !== void 0 ? duration : 0.0;
  transition.exitConditionEnabled = false;

  if (typeof exitCondition !== 'undefined') {
    transition.exitConditionEnabled = true;
    transition.exitCondition = exitCondition;
  }

  return transition;
}

function createMotion(motionDesc) {
  if (motionDesc.type === 'clip') {
    const motion = new _clipMotion.ClipMotion();
    return motion;
  } else if (motionDesc.blender.type === '1d') {
    const motion = new _animationBlend1d.AnimationBlend1D();
    const thresholds = motionDesc.blender.thresholds;
    motion.items = motionDesc.children.map((childMotionDesc, iMotion) => {
      const item = new _animationBlend1d.AnimationBlend1D.Item();
      item.motion = createMotion(childMotionDesc);
      item.threshold = thresholds[iMotion];
      return item;
    });
    createParametric(motionDesc.blender.value, motion.param);
    return motion;
  } else {
    const algorithm = _animationBlend2d.AnimationBlend2D.Algorithm[motionDesc.blender.algorithm];
    const motion = new _animationBlend2d.AnimationBlend2D();
    motion.algorithm = algorithm;
    const thresholds = motionDesc.blender.thresholds;
    motion.items = motionDesc.children.map((childMotionDesc, iMotion) => {
      const item = new _animationBlend2d.AnimationBlend2D.Item();
      item.motion = createMotion(childMotionDesc);
      item.threshold = new _vec.Vec2(thresholds[iMotion].x, thresholds[iMotion].y);
      return item;
    });
    createParametric(motionDesc.blender.values[0], motion.paramX);
    createParametric(motionDesc.blender.values[1], motion.paramY);
    return motion;
  }
}

function createParametric(paramDesc, bindable) {
  if (typeof paramDesc === 'object') {
    bindable.variable = paramDesc.name;
    bindable.value = paramDesc.value;
  } else {
    bindable.value = paramDesc;
  }
}

function getVariableTypeFromValue(value) {
  switch (true) {
    case typeof value === 'boolean':
      return _parametric.VariableType.BOOLEAN;

    case typeof value === 'number':
      return _parametric.VariableType.FLOAT;

    default:
      throw new Error(`Unknown variable type.`);
  }
}
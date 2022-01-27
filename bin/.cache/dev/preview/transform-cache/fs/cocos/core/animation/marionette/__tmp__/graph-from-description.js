System.register("q-bundled:///fs/cocos/core/animation/marionette/__tmp__/graph-from-description.js", ["../../../math/vec2.js", "../animation-graph.js", "../condition.js", "../clip-motion.js", "../animation-blend-1d.js", "../animation-blend-2d.js", "../parametric.js"], function (_export, _context) {
  "use strict";

  var Vec2, AnimationGraph, BinaryCondition, TriggerCondition, UnaryCondition, ClipMotion, AnimationBlend1D, AnimationBlend2D, VariableType;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function createGraphFromDescription(graphDescription) {
    var graph = new AnimationGraph();

    if (graphDescription.vars) {
      for (var _iterator = _createForOfIteratorHelperLoose(graphDescription.vars), _step; !(_step = _iterator()).done;) {
        var varDesc = _step.value;
        graph.addVariable(varDesc.name, getVariableTypeFromValue(varDesc.value), varDesc.value);
      }
    }

    for (var _iterator2 = _createForOfIteratorHelperLoose(graphDescription.layers), _step2; !(_step2 = _iterator2()).done;) {
      var layerDesc = _step2.value;
      var layer = graph.addLayer();
      createSubgraph(layer.stateMachine, layerDesc.graph);
    }

    return graph;
  }

  function createSubgraph(subgraph, subgraphDesc) {
    var _subgraphDesc$nodes$m, _subgraphDesc$nodes;

    var nodes = (_subgraphDesc$nodes$m = (_subgraphDesc$nodes = subgraphDesc.nodes) === null || _subgraphDesc$nodes === void 0 ? void 0 : _subgraphDesc$nodes.map(function (nodeDesc) {
      var node;

      if (nodeDesc.type === 'animation') {
        var animationState = subgraph.addMotion();

        if (nodeDesc.motion) {
          animationState.motion = createMotion(nodeDesc.motion);
        }

        node = animationState;
      } else {
        var subSubgraph = subgraph.addSubStateMachine();
        createSubgraph(subgraph, nodeDesc);
        node = subSubgraph;
      }

      if (nodeDesc.name) {
        node.name = nodeDesc.name;
      }

      return node;
    })) !== null && _subgraphDesc$nodes$m !== void 0 ? _subgraphDesc$nodes$m : [];

    if (subgraphDesc.entryTransitions) {
      for (var _iterator3 = _createForOfIteratorHelperLoose(subgraphDesc.entryTransitions), _step3; !(_step3 = _iterator3()).done;) {
        var transitionDesc = _step3.value;
        createTransition(subgraph, subgraph.entryState, nodes[transitionDesc.to], transitionDesc);
      }
    }

    if (subgraphDesc.exitTransitions) {
      for (var _iterator4 = _createForOfIteratorHelperLoose(subgraphDesc.exitTransitions), _step4; !(_step4 = _iterator4()).done;) {
        var _transitionDesc = _step4.value;
        createAnimationTransition(subgraph, nodes[_transitionDesc.from], subgraph.exitState, _transitionDesc);
      }
    }

    if (subgraphDesc.anyTransitions) {
      for (var _iterator5 = _createForOfIteratorHelperLoose(subgraphDesc.anyTransitions), _step5; !(_step5 = _iterator5()).done;) {
        var _transitionDesc2 = _step5.value;
        createTransition(subgraph, subgraph.entryState, nodes[_transitionDesc2.to], _transitionDesc2);
      }
    }

    if (subgraphDesc.transitions) {
      for (var _iterator6 = _createForOfIteratorHelperLoose(subgraphDesc.transitions), _step6; !(_step6 = _iterator6()).done;) {
        var _transitionDesc3 = _step6.value;
        createAnimationTransition(subgraph, nodes[_transitionDesc3.from], nodes[_transitionDesc3.to], _transitionDesc3);
      }
    }
  }

  function createTransition(graph, from, to, transitionDesc) {
    var _transitionDesc$condi;

    var condition;
    var conditions = (_transitionDesc$condi = transitionDesc.conditions) === null || _transitionDesc$condi === void 0 ? void 0 : _transitionDesc$condi.map(function (conditionDesc) {
      switch (conditionDesc.type) {
        default:
          throw new Error("Unknown condition type.");

        case 'unary':
          {
            var _condition = new UnaryCondition();

            _condition.operator = UnaryCondition.Operator[conditionDesc.type];
            createParametric(conditionDesc.operand, _condition.operand);
            return _condition;
          }

        case 'binary':
          {
            var _condition2 = new BinaryCondition();

            _condition2.operator = BinaryCondition.Operator[conditionDesc.type];
            createParametric(conditionDesc.lhs, _condition2.lhs);
            createParametric(conditionDesc.rhs, _condition2.rhs);
            return _condition2;
          }

        case 'trigger':
          {
            var _condition3 = new TriggerCondition();

            return _condition3;
          }
      }
    });
    var transition = graph.connect(from, to, conditions);
    return transition;
  }

  function createAnimationTransition(graph, from, to, descriptor) {
    var transition = createTransition(graph, from, to, descriptor);
    var duration = descriptor.duration,
        exitCondition = descriptor.exitCondition;
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
      var motion = new ClipMotion();
      return motion;
    } else if (motionDesc.blender.type === '1d') {
      var _motion = new AnimationBlend1D();

      var thresholds = motionDesc.blender.thresholds;
      _motion.items = motionDesc.children.map(function (childMotionDesc, iMotion) {
        var item = new AnimationBlend1D.Item();
        item.motion = createMotion(childMotionDesc);
        item.threshold = thresholds[iMotion];
        return item;
      });
      createParametric(motionDesc.blender.value, _motion.param);
      return _motion;
    } else {
      var algorithm = AnimationBlend2D.Algorithm[motionDesc.blender.algorithm];

      var _motion2 = new AnimationBlend2D();

      _motion2.algorithm = algorithm;
      var _thresholds = motionDesc.blender.thresholds;
      _motion2.items = motionDesc.children.map(function (childMotionDesc, iMotion) {
        var item = new AnimationBlend2D.Item();
        item.motion = createMotion(childMotionDesc);
        item.threshold = new Vec2(_thresholds[iMotion].x, _thresholds[iMotion].y);
        return item;
      });
      createParametric(motionDesc.blender.values[0], _motion2.paramX);
      createParametric(motionDesc.blender.values[1], _motion2.paramY);
      return _motion2;
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
        return VariableType.BOOLEAN;

      case typeof value === 'number':
        return VariableType.FLOAT;

      default:
        throw new Error("Unknown variable type.");
    }
  }

  _export("createGraphFromDescription", createGraphFromDescription);

  return {
    setters: [function (_mathVec2Js) {
      Vec2 = _mathVec2Js.Vec2;
    }, function (_animationGraphJs) {
      AnimationGraph = _animationGraphJs.AnimationGraph;
    }, function (_conditionJs) {
      BinaryCondition = _conditionJs.BinaryCondition;
      TriggerCondition = _conditionJs.TriggerCondition;
      UnaryCondition = _conditionJs.UnaryCondition;
    }, function (_clipMotionJs) {
      ClipMotion = _clipMotionJs.ClipMotion;
    }, function (_animationBlend1dJs) {
      AnimationBlend1D = _animationBlend1dJs.AnimationBlend1D;
    }, function (_animationBlend2dJs) {
      AnimationBlend2D = _animationBlend2dJs.AnimationBlend2D;
    }, function (_parametricJs) {
      VariableType = _parametricJs.VariableType;
    }],
    execute: function () {}
  };
});
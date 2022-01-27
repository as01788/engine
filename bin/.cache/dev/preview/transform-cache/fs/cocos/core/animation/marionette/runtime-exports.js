System.register("q-bundled:///fs/cocos/core/animation/marionette/runtime-exports.js", ["./animation-graph.js", "./clip-motion.js", "./animation-blend-1d.js", "./animation-blend-2d.js", "./animation-blend-direct.js", "./animation-controller.js", "./parametric.js", "./state-machine-component.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_animationGraphJs) {}, function (_clipMotionJs) {}, function (_animationBlend1dJs) {}, function (_animationBlend2dJs) {}, function (_animationBlendDirectJs) {}, function (_animationControllerJs) {
      _export("AnimationController", _animationControllerJs.AnimationController);
    }, function (_parametricJs) {
      _export("VariableType", _parametricJs.VariableType);
    }, function (_stateMachineComponentJs) {
      _export("StateMachineComponent", _stateMachineComponentJs.StateMachineComponent);
    }],
    execute: function () {}
  };
});
System.register("q-bundled:///fs/cocos/core/animation/marionette/asset-creation.js", ["./errors.js", "./animation-graph.js", "./condition.js", "./motion-state.js", "./clip-motion.js", "./animation-blend-direct.js", "./animation-blend-1d.js", "./animation-blend-2d.js", "./parametric.js", "./__tmp__/get-demo-graphs.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_errorsJs) {
      _export({
        InvalidTransitionError: _errorsJs.InvalidTransitionError,
        VariableNotDefinedError: _errorsJs.VariableNotDefinedError
      });
    }, function (_animationGraphJs) {
      _export({
        AnimationGraph: _animationGraphJs.AnimationGraph,
        LayerBlending: _animationGraphJs.LayerBlending,
        isAnimationTransition: _animationGraphJs.isAnimationTransition,
        StateMachine: _animationGraphJs.StateMachine,
        SubStateMachine: _animationGraphJs.SubStateMachine
      });
    }, function (_conditionJs) {
      _export({
        BinaryCondition: _conditionJs.BinaryCondition,
        UnaryCondition: _conditionJs.UnaryCondition,
        TriggerCondition: _conditionJs.TriggerCondition
      });
    }, function (_motionStateJs) {
      _export("MotionState", _motionStateJs.MotionState);
    }, function (_clipMotionJs) {
      _export("ClipMotion", _clipMotionJs.ClipMotion);
    }, function (_animationBlendDirectJs) {
      _export("AnimationBlendDirect", _animationBlendDirectJs.AnimationBlendDirect);
    }, function (_animationBlend1dJs) {
      _export("AnimationBlend1D", _animationBlend1dJs.AnimationBlend1D);
    }, function (_animationBlend2dJs) {
      _export("AnimationBlend2D", _animationBlend2dJs.AnimationBlend2D);
    }, function (_parametricJs) {
      _export({
        VariableType: _parametricJs.VariableType,
        BindableNumber: _parametricJs.BindableNumber,
        BindableBoolean: _parametricJs.BindableBoolean
      });
    }, function (_tmp__GetDemoGraphsJs) {
      _export("__getDemoGraphs", _tmp__GetDemoGraphsJs.__getDemoGraphs);
    }],
    execute: function () {}
  };
});
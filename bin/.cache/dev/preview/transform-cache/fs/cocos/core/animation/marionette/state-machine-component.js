System.register("q-bundled:///fs/cocos/core/animation/marionette/state-machine-component.js", ["../../data/decorators/index.js", "../define.js"], function (_export, _context) {
  "use strict";

  var ccclass, CLASS_NAME_PREFIX_ANIM, _dec, _class, StateMachineComponent;

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }],
    execute: function () {
      _export("StateMachineComponent", StateMachineComponent = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "StateMachineComponent"), _dec(_class = /*#__PURE__*/function () {
        function StateMachineComponent() {}

        var _proto = StateMachineComponent.prototype;

        /**
         * Called when a motion state right after it entered.
         * @param controller The animation controller it within.
         * @param motionStateStatus The status of the motion.
         */
        _proto.onMotionStateEnter = function onMotionStateEnter(controller, motionStateStatus) {// Can be overrode
        }
        /**
         * Called when a motion state is going to be exited.
         * @param controller The animation controller it within.
         * @param motionStateStatus The status of the motion.
         */
        ;

        _proto.onMotionStateExit = function onMotionStateExit(controller, motionStateStatus) {// Can be overrode
        }
        /**
         * Called when a motion state updated except for the first and last frame.
         * @param controller The animation controller it within.
         * @param motionStateStatus The status of the motion.
         */
        ;

        _proto.onMotionStateUpdate = function onMotionStateUpdate(controller, motionStateStatus) {// Can be overrode
        }
        /**
         * Called when a state machine right after it entered.
         * @param controller The animation controller it within.
         */
        ;

        _proto.onStateMachineEnter = function onStateMachineEnter(controller) {// Can be overrode
        }
        /**
         * Called when a state machine right after it entered.
         * @param controller The animation controller it within.
         */
        ;

        _proto.onStateMachineExit = function onStateMachineExit(controller) {// Can be overrode
        };

        return StateMachineComponent;
      }()) || _class));
    }
  };
});
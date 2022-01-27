"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateMachineComponent = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _dec, _class;

let StateMachineComponent = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}StateMachineComponent`), _dec(_class = class StateMachineComponent {
  /**
   * Called when a motion state right after it entered.
   * @param controller The animation controller it within.
   * @param motionStateStatus The status of the motion.
   */
  onMotionStateEnter(controller, motionStateStatus) {// Can be overrode
  }
  /**
   * Called when a motion state is going to be exited.
   * @param controller The animation controller it within.
   * @param motionStateStatus The status of the motion.
   */


  onMotionStateExit(controller, motionStateStatus) {// Can be overrode
  }
  /**
   * Called when a motion state updated except for the first and last frame.
   * @param controller The animation controller it within.
   * @param motionStateStatus The status of the motion.
   */


  onMotionStateUpdate(controller, motionStateStatus) {// Can be overrode
  }
  /**
   * Called when a state machine right after it entered.
   * @param controller The animation controller it within.
   */


  onStateMachineEnter(controller) {// Can be overrode
  }
  /**
   * Called when a state machine right after it entered.
   * @param controller The animation controller it within.
   */


  onStateMachineExit(controller) {// Can be overrode
  }

}) || _class);
exports.StateMachineComponent = StateMachineComponent;
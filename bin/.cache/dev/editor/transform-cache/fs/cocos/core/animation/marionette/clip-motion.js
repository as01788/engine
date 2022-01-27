"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClipMotion = void 0;

var _classDecorator = require("../../data/class-decorator.js");

var _editorExtendable = require("../../data/editor-extendable.js");

var _animationClip = require("../animation-clip.js");

var _animationState = require("../animation-state.js");

var _createEval = require("./create-eval.js");

var _graphDebug = require("./graph-debug.js");

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let ClipMotion = (_dec = (0, _classDecorator.ccclass)('cc.animation.ClipMotion'), _dec2 = (0, _classDecorator.type)(_animationClip.AnimationClip), _dec(_class = (_class2 = (_temp = class ClipMotion extends _editorExtendable.EditorExtendable {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "clip", _descriptor, this);
  }

  [_createEval.createEval](context) {
    return !this.clip ? null : new ClipMotionEval(context, this.clip);
  }

  clone() {
    const that = new ClipMotion();
    that.clip = this.clip;
    return that;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "clip", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.ClipMotion = ClipMotion;

class ClipMotionEval {
  constructor(context, clip) {
    this.duration = clip.duration;
    this._state = new _animationState.AnimationState(clip);

    this._state.initialize(context.node, context.blendBuffer);
  }

  getClipStatuses(baseWeight) {
    let got = false;
    return {
      next: () => {
        if (got) {
          return {
            done: true,
            value: undefined
          };
        } else {
          got = true;
          return {
            done: false,
            value: {
              __DEBUG_ID__: this.__DEBUG__ID__,
              clip: this._state.clip,
              weight: baseWeight
            }
          };
        }
      }
    };
  }

  get progress() {
    return this._state.time / this.duration;
  }

  sample(progress, weight) {
    if (weight === 0.0) {
      return;
    }

    (0, _graphDebug.pushWeight)(this._state.name, weight);
    const time = this._state.duration * progress;
    this._state.time = time;
    this._state.weight = weight;

    this._state.sample();

    this._state.weight = 0.0;
  }

}
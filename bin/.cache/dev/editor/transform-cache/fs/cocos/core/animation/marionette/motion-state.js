"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotionState = void 0;

var _index = require("../../data/decorators/index.js");

var _state = require("./state.js");

var _parametric = require("./parametric.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let MotionState = (_dec = (0, _index.ccclass)('cc.animation.Motion'), _dec(_class = (_class2 = (_temp = class MotionState extends _state.InteractiveState {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "motion", _descriptor, this);

    _initializerDefineProperty(this, "speed", _descriptor2, this);
  }

  clone() {
    var _this$motion$clone, _this$motion;

    const that = new MotionState();
    that.motion = (_this$motion$clone = (_this$motion = this.motion) === null || _this$motion === void 0 ? void 0 : _this$motion.clone()) !== null && _this$motion$clone !== void 0 ? _this$motion$clone : null;
    that.speed = this.speed.clone();
    return that;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "motion", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _parametric.BindableNumber(1.0);
  }
})), _class2)) || _class);
exports.MotionState = MotionState;
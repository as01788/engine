"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationBlend1D = void 0;

var _index = require("../../data/decorators/index.js");

var _classDecorator = require("../../data/class-decorator.js");

var _createEval = require("./create-eval.js");

var _parametric = require("./parametric.js");

var _animationBlend = require("./animation-blend.js");

var _blend1d = require("./blend-1d.js");

var _define = require("../define.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _descriptor3, _class6, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let AnimationBlend1DItem = (_dec = (0, _classDecorator.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}AnimationBlend1DItem`), _dec(_class = (_class2 = (_temp = class AnimationBlend1DItem extends _animationBlend.AnimationBlendItem {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "threshold", _descriptor, this);
  }

  clone() {
    const that = new AnimationBlend1DItem();

    this._assign(that);

    return that;
  }

  _assign(that) {
    super._assign(that);

    that.threshold = this.threshold;
    return that;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "threshold", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.0;
  }
})), _class2)) || _class);
let AnimationBlend1D = (_dec2 = (0, _classDecorator.ccclass)('cc.animation.AnimationBlend1D'), _dec2(_class4 = (_class5 = (_temp2 = _class6 = class AnimationBlend1D extends _animationBlend.AnimationBlend {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_items", _descriptor2, this);

    _initializerDefineProperty(this, "param", _descriptor3, this);
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = Array.from(value).sort(({
      threshold: lhs
    }, {
      threshold: rhs
    }) => lhs - rhs);
  }

  clone() {
    const that = new AnimationBlend1D();
    that._items = this._items.map(item => item.clone());
    that.param = this.param.clone();
    return that;
  }

  [_createEval.createEval](context) {
    const evaluation = new AnimationBlend1DEval(context, this._items, this._items.map(({
      threshold
    }) => threshold), 0.0);
    const initialValue = (0, _parametric.bindOr)(context, this.param, _parametric.VariableType.FLOAT, evaluation.setInput, evaluation, 0);
    evaluation.setInput(initialValue, 0);
    return evaluation;
  }

}, _class6.Item = AnimationBlend1DItem, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "_items", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "param", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _parametric.BindableNumber();
  }
})), _class5)) || _class4);
exports.AnimationBlend1D = AnimationBlend1D;

class AnimationBlend1DEval extends _animationBlend.AnimationBlendEval {
  constructor(context, items, thresholds, input) {
    super(context, items, [input]);
    this._thresholds = thresholds;
    this.doEval();
  }

  eval(weights, [value]) {
    (0, _blend1d.blend1D)(weights, this._thresholds, value);
  }

}
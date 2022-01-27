"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationBlend2D = void 0;

var _index = require("../../math/index.js");

var _classDecorator = require("../../data/class-decorator.js");

var _enum = require("../../value-types/enum.js");

var _createEval = require("./create-eval.js");

var _animationBlend = require("./animation-blend.js");

var _index2 = require("../../data/decorators/index.js");

var _parametric = require("./parametric.js");

var _blend2d = require("./blend-2d.js");

var _define = require("../define.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class6, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Algorithm;

(function (Algorithm) {
  Algorithm[Algorithm["SIMPLE_DIRECTIONAL"] = 0] = "SIMPLE_DIRECTIONAL";
  Algorithm[Algorithm["FREEFORM_CARTESIAN"] = 1] = "FREEFORM_CARTESIAN";
  Algorithm[Algorithm["FREEFORM_DIRECTIONAL"] = 2] = "FREEFORM_DIRECTIONAL";
})(Algorithm || (Algorithm = {}));

(0, _enum.ccenum)(Algorithm);
let AnimationBlend2DItem = (_dec = (0, _classDecorator.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}AnimationBlend2DItem`), _dec(_class = (_class2 = (_temp = class AnimationBlend2DItem extends _animationBlend.AnimationBlendItem {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "threshold", _descriptor, this);
  }

  clone() {
    const that = new AnimationBlend2DItem();

    this._assign(that);

    return that;
  }

  _assign(that) {
    super._assign(that);

    _index.Vec2.copy(that.threshold, this.threshold);

    return that;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "threshold", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index.Vec2();
  }
})), _class2)) || _class);
let AnimationBlend2D = (_dec2 = (0, _classDecorator.ccclass)('cc.animation.AnimationBlend2D'), _dec2(_class4 = (_class5 = (_temp2 = _class6 = class AnimationBlend2D extends _animationBlend.AnimationBlend {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "algorithm", _descriptor2, this);

    _initializerDefineProperty(this, "_items", _descriptor3, this);

    _initializerDefineProperty(this, "paramX", _descriptor4, this);

    _initializerDefineProperty(this, "paramY", _descriptor5, this);
  }

  get items() {
    return this._items;
  }

  set items(items) {
    this._items = Array.from(items);
  }

  clone() {
    const that = new AnimationBlend2D();
    that._items = this._items.map(item => {
      var _item$clone;

      return (_item$clone = item === null || item === void 0 ? void 0 : item.clone()) !== null && _item$clone !== void 0 ? _item$clone : null;
    });
    that.paramX = this.paramX.clone();
    that.paramY = this.paramY.clone();
    return that;
  }

  [_createEval.createEval](context) {
    const evaluation = new AnimationBlend2DEval(context, this._items, this._items.map(({
      threshold
    }) => threshold), this.algorithm, [0.0, 0.0]);
    const initialValueX = (0, _parametric.bindOr)(context, this.paramX, _parametric.VariableType.FLOAT, evaluation.setInput, evaluation, 0);
    const initialValueY = (0, _parametric.bindOr)(context, this.paramY, _parametric.VariableType.FLOAT, evaluation.setInput, evaluation, 1);
    evaluation.setInput(initialValueX, 0);
    evaluation.setInput(initialValueY, 1);
    return evaluation;
  }

}, _class6.Algorithm = Algorithm, _class6.Item = AnimationBlend2DItem, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "algorithm", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Algorithm.SIMPLE_DIRECTIONAL;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "_items", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "paramX", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _parametric.BindableNumber();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "paramY", [_index2.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _parametric.BindableNumber();
  }
})), _class5)) || _class4);
exports.AnimationBlend2D = AnimationBlend2D;

class AnimationBlend2DEval extends _animationBlend.AnimationBlendEval {
  constructor(context, items, thresholds, algorithm, inputs) {
    super(context, items, inputs);
    this._thresholds = void 0;
    this._algorithm = void 0;
    this._value = new _index.Vec2();
    this._thresholds = thresholds;
    this._algorithm = algorithm;
    this.doEval();
  }

  eval(weights, [x, y]) {
    _index.Vec2.set(this._value, x, y);

    weights.fill(0);

    switch (this._algorithm) {
      case Algorithm.SIMPLE_DIRECTIONAL:
        (0, _blend2d.blendSimpleDirectional)(weights, this._thresholds, this._value);
        break;

      case Algorithm.FREEFORM_CARTESIAN:
        (0, _blend2d.sampleFreeformCartesian)(weights, this._thresholds, this._value);
        break;

      case Algorithm.FREEFORM_DIRECTIONAL:
        (0, _blend2d.sampleFreeformDirectional)(weights, this._thresholds, this._value);
        break;

      default:
        break;
    }
  }

}
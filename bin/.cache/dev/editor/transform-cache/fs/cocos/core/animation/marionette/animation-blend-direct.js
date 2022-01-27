"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationBlendDirect = void 0;

var _index = require("../../data/decorators/index.js");

var _classDecorator = require("../../data/class-decorator.js");

var _createEval = require("./create-eval.js");

var _animationBlend = require("./animation-blend.js");

var _define = require("../define.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _class6, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let AnimationBlendDirectItem = (_dec = (0, _classDecorator.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}AnimationBlendDirectItem`), _dec(_class = (_class2 = (_temp = class AnimationBlendDirectItem extends _animationBlend.AnimationBlendItem {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "weight", _descriptor, this);
  }

  clone() {
    const that = new AnimationBlendDirectItem();

    this._assign(that);

    return that;
  }

  _assign(that) {
    super._assign(that);

    that.weight = this.weight;
    return that;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "weight", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.0;
  }
})), _class2)) || _class);
let AnimationBlendDirect = (_dec2 = (0, _classDecorator.ccclass)('cc.animation.AnimationBlendDirect'), _dec2(_class4 = (_class5 = (_temp2 = _class6 = class AnimationBlendDirect extends _animationBlend.AnimationBlend {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_items", _descriptor2, this);
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = Array.from(value);
  }

  clone() {
    const that = new AnimationBlendDirect();
    that._items = this._items.map(item => {
      var _item$clone;

      return (_item$clone = item === null || item === void 0 ? void 0 : item.clone()) !== null && _item$clone !== void 0 ? _item$clone : null;
    });
    return that;
  }

  [_createEval.createEval](context) {
    const myEval = new AnimationBlendDirectEval(context, this._items, this._items.map(({
      weight
    }) => weight));
    return myEval;
  }

}, _class6.Item = AnimationBlendDirectItem, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "_items", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class5)) || _class4);
exports.AnimationBlendDirect = AnimationBlendDirect;

class AnimationBlendDirectEval extends _animationBlend.AnimationBlendEval {
  constructor(...args) {
    super(...args);
    this.doEval();
  }

  eval(weights, inputs) {
    const nChildren = weights.length;

    for (let iChild = 0; iChild < nChildren; ++iChild) {
      weights[iChild] = inputs[iChild];
    }
  }

}
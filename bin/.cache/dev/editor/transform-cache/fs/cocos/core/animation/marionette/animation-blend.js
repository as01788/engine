"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBlendParam = validateBlendParam;
exports.AnimationBlendEval = exports.AnimationBlend = exports.AnimationBlendItem = void 0;

var _classDecorator = require("../../data/class-decorator.js");

var _createEval = require("./create-eval.js");

var _errors = require("./errors.js");

var _index = require("../../data/decorators/index.js");

var _editorExtendable = require("../../data/editor-extendable.js");

var _define = require("../define.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let AnimationBlendItem = (_dec = (0, _classDecorator.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}AnimationBlendItem`), _dec(_class = (_class2 = (_temp = class AnimationBlendItem {
  constructor() {
    _initializerDefineProperty(this, "motion", _descriptor, this);
  }

  clone() {
    const that = new AnimationBlendItem();

    this._assign(that);

    return that;
  }

  _assign(that) {
    var _this$motion$clone, _this$motion;

    that.motion = (_this$motion$clone = (_this$motion = this.motion) === null || _this$motion === void 0 ? void 0 : _this$motion.clone()) !== null && _this$motion$clone !== void 0 ? _this$motion$clone : null;
    return that;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "motion", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.AnimationBlendItem = AnimationBlendItem;
let AnimationBlend = (_dec2 = (0, _classDecorator.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}AnimationBlend`), _dec2(_class4 = (_class5 = (_temp2 = class AnimationBlend extends _editorExtendable.EditorExtendable {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "name", _descriptor2, this);
  }

}, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "name", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class5)) || _class4);
exports.AnimationBlend = AnimationBlend;

class AnimationBlendEval {
  constructor(context, children, inputs) {
    this._childEvaluators = children.map(child => {
      var _child$motion$createE, _child$motion;

      return (_child$motion$createE = (_child$motion = child.motion) === null || _child$motion === void 0 ? void 0 : _child$motion[_createEval.createEval](context)) !== null && _child$motion$createE !== void 0 ? _child$motion$createE : null;
    });
    this._weights = new Array(this._childEvaluators.length).fill(0);
    this._inputs = [...inputs];
  }

  get duration() {
    let uniformDuration = 0.0;

    for (let iChild = 0; iChild < this._childEvaluators.length; ++iChild) {
      var _this$_childEvaluator, _this$_childEvaluator2;

      uniformDuration += ((_this$_childEvaluator = (_this$_childEvaluator2 = this._childEvaluators[iChild]) === null || _this$_childEvaluator2 === void 0 ? void 0 : _this$_childEvaluator2.duration) !== null && _this$_childEvaluator !== void 0 ? _this$_childEvaluator : 0.0) * this._weights[iChild];
    }

    return uniformDuration;
  }

  getClipStatuses(baseWeight) {
    const {
      _childEvaluators: children,
      _weights: weights
    } = this;
    const nChildren = children.length;
    let iChild = 0;
    let currentChildIterator;
    return {
      next() {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (currentChildIterator) {
            const result = currentChildIterator.next();

            if (!result.done) {
              return result;
            }
          }

          if (iChild >= nChildren) {
            return {
              done: true,
              value: undefined
            };
          } else {
            const child = children[iChild];
            currentChildIterator = child === null || child === void 0 ? void 0 : child.getClipStatuses(baseWeight * weights[iChild]);
            ++iChild;
          }
        }
      }

    };
  }

  sample(progress, weight) {
    for (let iChild = 0; iChild < this._childEvaluators.length; ++iChild) {
      var _this$_childEvaluator3;

      (_this$_childEvaluator3 = this._childEvaluators[iChild]) === null || _this$_childEvaluator3 === void 0 ? void 0 : _this$_childEvaluator3.sample(progress, weight * this._weights[iChild]);
    }
  }

  setInput(value, index) {
    this._inputs[index] = value;
    this.doEval();
  }

  doEval() {
    this.eval(this._weights, this._inputs);
  }

  eval(_weights, _inputs) {}

}

exports.AnimationBlendEval = AnimationBlendEval;

function validateBlendParam(val, name) {
  if (typeof val !== 'number') {
    // TODO var name?
    throw new _errors.VariableTypeMismatchedError(name, 'number');
  }
}
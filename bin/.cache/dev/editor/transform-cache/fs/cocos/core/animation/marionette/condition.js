"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateConditionParamNumber = validateConditionParamNumber;
exports.validateConditionParamInteger = validateConditionParamInteger;
exports.validateConditionParamBoolean = validateConditionParamBoolean;
exports.validateConditionParamTrigger = validateConditionParamTrigger;
exports.TriggerCondition = exports.UnaryCondition = exports.BinaryCondition = void 0;

var _parametric = require("./parametric.js");

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _createEval = require("./create-eval.js");

var _errors = require("./errors.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, _dec2, _class4, _class5, _descriptor4, _descriptor5, _class6, _temp2, _dec3, _class7, _class8, _descriptor6, _temp3;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var BinaryOperator;

(function (BinaryOperator) {
  BinaryOperator[BinaryOperator["EQUAL_TO"] = 0] = "EQUAL_TO";
  BinaryOperator[BinaryOperator["NOT_EQUAL_TO"] = 1] = "NOT_EQUAL_TO";
  BinaryOperator[BinaryOperator["LESS_THAN"] = 2] = "LESS_THAN";
  BinaryOperator[BinaryOperator["LESS_THAN_OR_EQUAL_TO"] = 3] = "LESS_THAN_OR_EQUAL_TO";
  BinaryOperator[BinaryOperator["GREATER_THAN"] = 4] = "GREATER_THAN";
  BinaryOperator[BinaryOperator["GREATER_THAN_OR_EQUAL_TO"] = 5] = "GREATER_THAN_OR_EQUAL_TO";
})(BinaryOperator || (BinaryOperator = {}));

let BinaryCondition = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}BinaryCondition`), _dec(_class = (_class2 = (_temp = _class3 = class BinaryCondition {
  constructor() {
    _initializerDefineProperty(this, "operator", _descriptor, this);

    _initializerDefineProperty(this, "lhs", _descriptor2, this);

    _initializerDefineProperty(this, "rhs", _descriptor3, this);
  }

  clone() {
    const that = new BinaryCondition();
    that.operator = this.operator;
    that.lhs = this.lhs.clone();
    that.rhs = this.rhs.clone();
    return that;
  }

  [_createEval.createEval](context) {
    const {
      operator,
      lhs,
      rhs
    } = this;
    const evaluation = new BinaryConditionEval(operator, 0.0, 0.0);
    const lhsValue = (0, _parametric.bindNumericOr)(context, lhs, _parametric.VariableType.FLOAT, evaluation.setLhs, evaluation);
    const rhsValue = (0, _parametric.bindNumericOr)(context, rhs, _parametric.VariableType.FLOAT, evaluation.setRhs, evaluation);
    evaluation.reset(lhsValue, rhsValue);
    return evaluation;
  }

}, _class3.Operator = BinaryOperator, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "operator", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return BinaryOperator.EQUAL_TO;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lhs", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _parametric.BindableNumber();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rhs", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _parametric.BindableNumber();
  }
})), _class2)) || _class);
exports.BinaryCondition = BinaryCondition;

class BinaryConditionEval {
  constructor(operator, lhs, rhs) {
    this._operator = operator;
    this._lhs = lhs;
    this._rhs = rhs;

    this._eval();
  }

  reset(lhs, rhs) {
    this._lhs = lhs;
    this._rhs = rhs;

    this._eval();
  }

  setLhs(value) {
    this._lhs = value;

    this._eval();
  }

  setRhs(value) {
    this._rhs = value;

    this._eval();
  }
  /**
   * Evaluates this condition.
   */


  eval() {
    return this._result;
  }

  _eval() {
    const {
      _lhs: lhs,
      _rhs: rhs
    } = this;

    switch (this._operator) {
      default:
      case BinaryOperator.EQUAL_TO:
        this._result = lhs === rhs;
        break;

      case BinaryOperator.NOT_EQUAL_TO:
        this._result = lhs !== rhs;
        break;

      case BinaryOperator.LESS_THAN:
        this._result = lhs < rhs;
        break;

      case BinaryOperator.LESS_THAN_OR_EQUAL_TO:
        this._result = lhs <= rhs;
        break;

      case BinaryOperator.GREATER_THAN:
        this._result = lhs > rhs;
        break;

      case BinaryOperator.GREATER_THAN_OR_EQUAL_TO:
        this._result = lhs >= rhs;
        break;
    }
  }

}

var UnaryOperator;

(function (UnaryOperator) {
  UnaryOperator[UnaryOperator["TRUTHY"] = 0] = "TRUTHY";
  UnaryOperator[UnaryOperator["FALSY"] = 1] = "FALSY";
})(UnaryOperator || (UnaryOperator = {}));

let UnaryCondition = (_dec2 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}UnaryCondition`), _dec2(_class4 = (_class5 = (_temp2 = _class6 = class UnaryCondition {
  constructor() {
    _initializerDefineProperty(this, "operator", _descriptor4, this);

    _initializerDefineProperty(this, "operand", _descriptor5, this);
  }

  clone() {
    const that = new UnaryCondition();
    that.operator = this.operator;
    that.operand = this.operand.clone();
    return that;
  }

  [_createEval.createEval](context) {
    const {
      operator,
      operand
    } = this;
    const evaluation = new UnaryConditionEval(operator, false);
    const value = (0, _parametric.bindOr)(context, operand, _parametric.VariableType.BOOLEAN, evaluation.setOperand, evaluation);
    evaluation.reset(value);
    return evaluation;
  }

}, _class6.Operator = UnaryOperator, _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "operator", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return UnaryOperator.TRUTHY;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "operand", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _parametric.BindableBoolean();
  }
})), _class5)) || _class4);
exports.UnaryCondition = UnaryCondition;

class UnaryConditionEval {
  constructor(operator, operand) {
    this._operator = operator;
    this._operand = operand;

    this._eval();
  }

  reset(value) {
    this.setOperand(value);
  }

  setOperand(value) {
    this._operand = value;

    this._eval();
  }
  /**
   * Evaluates this condition.
   */


  eval() {
    return this._result;
  }

  _eval() {
    const {
      _operand: operand
    } = this;

    switch (this._operator) {
      default:
      case UnaryOperator.TRUTHY:
        this._result = !!operand;
        break;

      case UnaryOperator.FALSY:
        this._result = !operand;
        break;
    }
  }

}

let TriggerCondition = (_dec3 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}TriggerCondition`), _dec3(_class7 = (_class8 = (_temp3 = class TriggerCondition {
  constructor() {
    _initializerDefineProperty(this, "trigger", _descriptor6, this);
  }

  clone() {
    const that = new TriggerCondition();
    that.trigger = this.trigger;
    return that;
  }

  [_createEval.createEval](context) {
    const evaluation = new TriggerConditionEval(false);
    const triggerInstance = context.getVar(this.trigger);

    if ((0, _parametric.validateVariableExistence)(triggerInstance, this.trigger)) {
      (0, _parametric.validateVariableType)(triggerInstance.type, _parametric.VariableType.TRIGGER, this.trigger);
      evaluation.setTrigger(triggerInstance.bind(evaluation.setTrigger, evaluation));
    }

    return evaluation;
  }

}, _temp3), (_descriptor6 = _applyDecoratedDescriptor(_class8.prototype, "trigger", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class8)) || _class7);
exports.TriggerCondition = TriggerCondition;

class TriggerConditionEval {
  constructor(triggered) {
    this._triggered = false;
    this._triggered = triggered;
  }

  setTrigger(trigger) {
    this._triggered = trigger;
  }

  eval() {
    return this._triggered;
  }

}

function validateConditionParamNumber(val, name) {
  if (typeof val !== 'number') {
    throw new _errors.VariableTypeMismatchedError(name, 'float');
  }
}

function validateConditionParamInteger(val, name) {
  if (!Number.isInteger(val)) {
    throw new _errors.VariableTypeMismatchedError(name, 'integer');
  }
}

function validateConditionParamBoolean(val, name) {
  if (typeof val !== 'boolean') {
    throw new _errors.VariableTypeMismatchedError(name, 'boolean');
  }
}

function validateConditionParamTrigger(val, name) {
  if (typeof val !== 'object') {
    throw new _errors.VariableTypeMismatchedError(name, 'trigger');
  }
}
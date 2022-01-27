"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindOr = bindOr;
exports.bindNumericOr = bindNumericOr;
exports.validateVariableExistence = validateVariableExistence;
exports.validateVariableType = validateVariableType;
exports.validateVariableTypeNumeric = validateVariableTypeNumeric;
exports.BindableBoolean = exports.BindableNumber = exports.VariableType = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _errors = require("./errors.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp, _dec2, _class4, _class5, _descriptor3, _descriptor4, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let VariableType;
exports.VariableType = VariableType;

(function (VariableType) {
  VariableType[VariableType["FLOAT"] = 0] = "FLOAT";
  VariableType[VariableType["BOOLEAN"] = 1] = "BOOLEAN";
  VariableType[VariableType["TRIGGER"] = 2] = "TRIGGER";
  VariableType[VariableType["INTEGER"] = 3] = "INTEGER";
})(VariableType || (exports.VariableType = VariableType = {}));

let BindableNumber = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}BindableNumber`), _dec(_class = (_class2 = (_temp = class BindableNumber {
  constructor(value = 0.0) {
    _initializerDefineProperty(this, "variable", _descriptor, this);

    _initializerDefineProperty(this, "value", _descriptor2, this);

    this.value = value;
  }

  clone() {
    const that = new BindableNumber();
    that.value = this.value;
    that.variable = this.variable;
    return that;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "variable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.0;
  }
})), _class2)) || _class);
exports.BindableNumber = BindableNumber;
let BindableBoolean = (_dec2 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}BindableBoolean`), _dec2(_class4 = (_class5 = (_temp2 = class BindableBoolean {
  constructor(value = false) {
    _initializerDefineProperty(this, "variable", _descriptor3, this);

    _initializerDefineProperty(this, "value", _descriptor4, this);

    this.value = value;
  }

  clone() {
    const that = new BindableBoolean();
    that.value = this.value;
    that.variable = this.variable;
    return that;
  }

}, _temp2), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "variable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "value", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
})), _class5)) || _class4);
exports.BindableBoolean = BindableBoolean;

function bindOr(context, bindable, type, callback, thisArg, ...args) {
  const {
    variable,
    value
  } = bindable;

  if (!variable) {
    return value;
  }

  const varInstance = context.getVar(variable);

  if (!validateVariableExistence(varInstance, variable)) {
    return value;
  }

  if (varInstance.type !== type) {
    throw new _errors.VariableTypeMismatchedError(variable, 'number');
  }

  const initialValue = varInstance.bind(callback, thisArg, ...args);
  return initialValue;
}

function bindNumericOr(context, bindable, type, callback, thisArg, ...args) {
  const {
    variable,
    value
  } = bindable;

  if (!variable) {
    return value;
  }

  const varInstance = context.getVar(variable);

  if (!validateVariableExistence(varInstance, variable)) {
    return value;
  }

  if (type !== VariableType.FLOAT && type !== VariableType.INTEGER) {
    throw new _errors.VariableTypeMismatchedError(variable, 'number or integer');
  }

  const initialValue = varInstance.bind(callback, thisArg, ...args);
  return initialValue;
}

function validateVariableExistence(varInstance, name) {
  if (!varInstance) {
    // TODO, warn only?
    throw new _errors.VariableNotDefinedError(name);
  } else {
    return true;
  }
}

function validateVariableType(type, expected, name) {
  if (type !== expected) {
    throw new _errors.VariableTypeMismatchedError(name, 'number');
  }
}

function validateVariableTypeNumeric(type, name) {
  if (type !== VariableType.FLOAT && type !== VariableType.INTEGER) {
    throw new _errors.VariableTypeMismatchedError(name, 'number or integer');
  }
}
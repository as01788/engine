System.register("q-bundled:///fs/cocos/core/animation/marionette/parametric.js", ["../../data/decorators/index.js", "../define.js", "./errors.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, CLASS_NAME_PREFIX_ANIM, VariableNotDefinedError, VariableTypeMismatchedError, _dec, _class, _class2, _descriptor, _descriptor2, _temp, _dec2, _class4, _class5, _descriptor3, _descriptor4, _temp2, VariableType, BindableNumber, BindableBoolean;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function bindOr(context, bindable, type, callback, thisArg) {
    var variable = bindable.variable,
        value = bindable.value;

    if (!variable) {
      return value;
    }

    var varInstance = context.getVar(variable);

    if (!validateVariableExistence(varInstance, variable)) {
      return value;
    }

    if (varInstance.type !== type) {
      throw new VariableTypeMismatchedError(variable, 'number');
    }

    for (var _len = arguments.length, args = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      args[_key - 5] = arguments[_key];
    }

    var initialValue = varInstance.bind.apply(varInstance, [callback, thisArg].concat(args));
    return initialValue;
  }

  function bindNumericOr(context, bindable, type, callback, thisArg) {
    var variable = bindable.variable,
        value = bindable.value;

    if (!variable) {
      return value;
    }

    var varInstance = context.getVar(variable);

    if (!validateVariableExistence(varInstance, variable)) {
      return value;
    }

    if (type !== VariableType.FLOAT && type !== VariableType.INTEGER) {
      throw new VariableTypeMismatchedError(variable, 'number or integer');
    }

    for (var _len2 = arguments.length, args = new Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      args[_key2 - 5] = arguments[_key2];
    }

    var initialValue = varInstance.bind.apply(varInstance, [callback, thisArg].concat(args));
    return initialValue;
  }

  function validateVariableExistence(varInstance, name) {
    if (!varInstance) {
      // TODO, warn only?
      throw new VariableNotDefinedError(name);
    } else {
      return true;
    }
  }

  function validateVariableType(type, expected, name) {
    if (type !== expected) {
      throw new VariableTypeMismatchedError(name, 'number');
    }
  }

  function validateVariableTypeNumeric(type, name) {
    if (type !== VariableType.FLOAT && type !== VariableType.INTEGER) {
      throw new VariableTypeMismatchedError(name, 'number or integer');
    }
  }

  _export({
    bindOr: bindOr,
    bindNumericOr: bindNumericOr,
    validateVariableExistence: validateVariableExistence,
    validateVariableType: validateVariableType,
    validateVariableTypeNumeric: validateVariableTypeNumeric,
    VariableType: void 0
  });

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_errorsJs) {
      VariableNotDefinedError = _errorsJs.VariableNotDefinedError;
      VariableTypeMismatchedError = _errorsJs.VariableTypeMismatchedError;
    }],
    execute: function () {
      (function (VariableType) {
        VariableType[VariableType["FLOAT"] = 0] = "FLOAT";
        VariableType[VariableType["BOOLEAN"] = 1] = "BOOLEAN";
        VariableType[VariableType["TRIGGER"] = 2] = "TRIGGER";
        VariableType[VariableType["INTEGER"] = 3] = "INTEGER";
      })(VariableType || _export("VariableType", VariableType = {}));

      _export("BindableNumber", BindableNumber = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "BindableNumber"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function BindableNumber(value) {
          if (value === void 0) {
            value = 0.0;
          }

          _initializerDefineProperty(this, "variable", _descriptor, this);

          _initializerDefineProperty(this, "value", _descriptor2, this);

          this.value = value;
        }

        var _proto = BindableNumber.prototype;

        _proto.clone = function clone() {
          var that = new BindableNumber();
          that.value = this.value;
          that.variable = this.variable;
          return that;
        };

        return BindableNumber;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "variable", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      })), _class2)) || _class));

      _export("BindableBoolean", BindableBoolean = (_dec2 = ccclass(CLASS_NAME_PREFIX_ANIM + "BindableBoolean"), _dec2(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function () {
        function BindableBoolean(value) {
          if (value === void 0) {
            value = false;
          }

          _initializerDefineProperty(this, "variable", _descriptor3, this);

          _initializerDefineProperty(this, "value", _descriptor4, this);

          this.value = value;
        }

        var _proto2 = BindableBoolean.prototype;

        _proto2.clone = function clone() {
          var that = new BindableBoolean();
          that.value = this.value;
          that.variable = this.variable;
          return that;
        };

        return BindableBoolean;
      }(), _temp2), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "variable", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "value", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class5)) || _class4));
    }
  };
});
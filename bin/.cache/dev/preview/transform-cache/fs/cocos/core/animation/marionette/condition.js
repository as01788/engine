System.register("q-bundled:///fs/cocos/core/animation/marionette/condition.js", ["./parametric.js", "../../data/decorators/index.js", "../define.js", "./create-eval.js", "./errors.js"], function (_export, _context) {
  "use strict";

  var VariableType, BindableBoolean, BindableNumber, bindOr, validateVariableExistence, validateVariableType, bindNumericOr, ccclass, serializable, CLASS_NAME_PREFIX_ANIM, createEval, VariableTypeMismatchedError, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, _dec2, _class4, _class5, _descriptor4, _descriptor5, _class6, _temp2, _dec3, _class7, _class8, _descriptor6, _temp3, BinaryOperator, BinaryCondition, BinaryConditionEval, UnaryOperator, UnaryCondition, UnaryConditionEval, TriggerCondition, TriggerConditionEval;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function validateConditionParamNumber(val, name) {
    if (typeof val !== 'number') {
      throw new VariableTypeMismatchedError(name, 'float');
    }
  }

  function validateConditionParamInteger(val, name) {
    if (!Number.isInteger(val)) {
      throw new VariableTypeMismatchedError(name, 'integer');
    }
  }

  function validateConditionParamBoolean(val, name) {
    if (typeof val !== 'boolean') {
      throw new VariableTypeMismatchedError(name, 'boolean');
    }
  }

  function validateConditionParamTrigger(val, name) {
    if (typeof val !== 'object') {
      throw new VariableTypeMismatchedError(name, 'trigger');
    }
  }

  _export({
    validateConditionParamNumber: validateConditionParamNumber,
    validateConditionParamInteger: validateConditionParamInteger,
    validateConditionParamBoolean: validateConditionParamBoolean,
    validateConditionParamTrigger: validateConditionParamTrigger
  });

  return {
    setters: [function (_parametricJs) {
      VariableType = _parametricJs.VariableType;
      BindableBoolean = _parametricJs.BindableBoolean;
      BindableNumber = _parametricJs.BindableNumber;
      bindOr = _parametricJs.bindOr;
      validateVariableExistence = _parametricJs.validateVariableExistence;
      validateVariableType = _parametricJs.validateVariableType;
      bindNumericOr = _parametricJs.bindNumericOr;
    }, function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_errorsJs) {
      VariableTypeMismatchedError = _errorsJs.VariableTypeMismatchedError;
    }],
    execute: function () {
      (function (BinaryOperator) {
        BinaryOperator[BinaryOperator["EQUAL_TO"] = 0] = "EQUAL_TO";
        BinaryOperator[BinaryOperator["NOT_EQUAL_TO"] = 1] = "NOT_EQUAL_TO";
        BinaryOperator[BinaryOperator["LESS_THAN"] = 2] = "LESS_THAN";
        BinaryOperator[BinaryOperator["LESS_THAN_OR_EQUAL_TO"] = 3] = "LESS_THAN_OR_EQUAL_TO";
        BinaryOperator[BinaryOperator["GREATER_THAN"] = 4] = "GREATER_THAN";
        BinaryOperator[BinaryOperator["GREATER_THAN_OR_EQUAL_TO"] = 5] = "GREATER_THAN_OR_EQUAL_TO";
      })(BinaryOperator || (BinaryOperator = {}));

      _export("BinaryCondition", BinaryCondition = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "BinaryCondition"), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
        function BinaryCondition() {
          _initializerDefineProperty(this, "operator", _descriptor, this);

          _initializerDefineProperty(this, "lhs", _descriptor2, this);

          _initializerDefineProperty(this, "rhs", _descriptor3, this);
        }

        var _proto = BinaryCondition.prototype;

        _proto.clone = function clone() {
          var that = new BinaryCondition();
          that.operator = this.operator;
          that.lhs = this.lhs.clone();
          that.rhs = this.rhs.clone();
          return that;
        };

        _proto[createEval] = function (context) {
          var operator = this.operator,
              lhs = this.lhs,
              rhs = this.rhs;
          var evaluation = new BinaryConditionEval(operator, 0.0, 0.0);
          var lhsValue = bindNumericOr(context, lhs, VariableType.FLOAT, evaluation.setLhs, evaluation);
          var rhsValue = bindNumericOr(context, rhs, VariableType.FLOAT, evaluation.setRhs, evaluation);
          evaluation.reset(lhsValue, rhsValue);
          return evaluation;
        };

        return BinaryCondition;
      }(), _class3.Operator = BinaryOperator, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "operator", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return BinaryOperator.EQUAL_TO;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lhs", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new BindableNumber();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rhs", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new BindableNumber();
        }
      })), _class2)) || _class));

      BinaryConditionEval = /*#__PURE__*/function () {
        function BinaryConditionEval(operator, lhs, rhs) {
          this._operator = operator;
          this._lhs = lhs;
          this._rhs = rhs;

          this._eval();
        }

        var _proto2 = BinaryConditionEval.prototype;

        _proto2.reset = function reset(lhs, rhs) {
          this._lhs = lhs;
          this._rhs = rhs;

          this._eval();
        };

        _proto2.setLhs = function setLhs(value) {
          this._lhs = value;

          this._eval();
        };

        _proto2.setRhs = function setRhs(value) {
          this._rhs = value;

          this._eval();
        }
        /**
         * Evaluates this condition.
         */
        ;

        _proto2.eval = function _eval() {
          return this._result;
        };

        _proto2._eval = function _eval() {
          var lhs = this._lhs,
              rhs = this._rhs;

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
        };

        return BinaryConditionEval;
      }();

      (function (UnaryOperator) {
        UnaryOperator[UnaryOperator["TRUTHY"] = 0] = "TRUTHY";
        UnaryOperator[UnaryOperator["FALSY"] = 1] = "FALSY";
      })(UnaryOperator || (UnaryOperator = {}));

      _export("UnaryCondition", UnaryCondition = (_dec2 = ccclass(CLASS_NAME_PREFIX_ANIM + "UnaryCondition"), _dec2(_class4 = (_class5 = (_temp2 = _class6 = /*#__PURE__*/function () {
        function UnaryCondition() {
          _initializerDefineProperty(this, "operator", _descriptor4, this);

          _initializerDefineProperty(this, "operand", _descriptor5, this);
        }

        var _proto3 = UnaryCondition.prototype;

        _proto3.clone = function clone() {
          var that = new UnaryCondition();
          that.operator = this.operator;
          that.operand = this.operand.clone();
          return that;
        };

        _proto3[createEval] = function (context) {
          var operator = this.operator,
              operand = this.operand;
          var evaluation = new UnaryConditionEval(operator, false);
          var value = bindOr(context, operand, VariableType.BOOLEAN, evaluation.setOperand, evaluation);
          evaluation.reset(value);
          return evaluation;
        };

        return UnaryCondition;
      }(), _class6.Operator = UnaryOperator, _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "operator", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return UnaryOperator.TRUTHY;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "operand", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new BindableBoolean();
        }
      })), _class5)) || _class4));

      UnaryConditionEval = /*#__PURE__*/function () {
        function UnaryConditionEval(operator, operand) {
          this._operator = operator;
          this._operand = operand;

          this._eval();
        }

        var _proto4 = UnaryConditionEval.prototype;

        _proto4.reset = function reset(value) {
          this.setOperand(value);
        };

        _proto4.setOperand = function setOperand(value) {
          this._operand = value;

          this._eval();
        }
        /**
         * Evaluates this condition.
         */
        ;

        _proto4.eval = function _eval() {
          return this._result;
        };

        _proto4._eval = function _eval() {
          var operand = this._operand;

          switch (this._operator) {
            default:
            case UnaryOperator.TRUTHY:
              this._result = !!operand;
              break;

            case UnaryOperator.FALSY:
              this._result = !operand;
              break;
          }
        };

        return UnaryConditionEval;
      }();

      _export("TriggerCondition", TriggerCondition = (_dec3 = ccclass(CLASS_NAME_PREFIX_ANIM + "TriggerCondition"), _dec3(_class7 = (_class8 = (_temp3 = /*#__PURE__*/function () {
        function TriggerCondition() {
          _initializerDefineProperty(this, "trigger", _descriptor6, this);
        }

        var _proto5 = TriggerCondition.prototype;

        _proto5.clone = function clone() {
          var that = new TriggerCondition();
          that.trigger = this.trigger;
          return that;
        };

        _proto5[createEval] = function (context) {
          var evaluation = new TriggerConditionEval(false);
          var triggerInstance = context.getVar(this.trigger);

          if (validateVariableExistence(triggerInstance, this.trigger)) {
            validateVariableType(triggerInstance.type, VariableType.TRIGGER, this.trigger);
            evaluation.setTrigger(triggerInstance.bind(evaluation.setTrigger, evaluation));
          }

          return evaluation;
        };

        return TriggerCondition;
      }(), _temp3), (_descriptor6 = _applyDecoratedDescriptor(_class8.prototype, "trigger", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class8)) || _class7));

      TriggerConditionEval = /*#__PURE__*/function () {
        function TriggerConditionEval(triggered) {
          this._triggered = false;
          this._triggered = triggered;
        }

        var _proto6 = TriggerConditionEval.prototype;

        _proto6.setTrigger = function setTrigger(trigger) {
          this._triggered = trigger;
        };

        _proto6.eval = function _eval() {
          return this._triggered;
        };

        return TriggerConditionEval;
      }();
    }
  };
});
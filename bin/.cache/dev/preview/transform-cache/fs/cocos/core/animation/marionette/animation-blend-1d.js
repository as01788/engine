System.register("q-bundled:///fs/cocos/core/animation/marionette/animation-blend-1d.js", ["../../data/decorators/index.js", "../../data/class-decorator.js", "./create-eval.js", "./parametric.js", "./animation-blend.js", "./blend-1d.js", "../define.js"], function (_export, _context) {
  "use strict";

  var serializable, ccclass, createEval, BindableNumber, bindOr, VariableType, AnimationBlend, AnimationBlendEval, AnimationBlendItem, blend1D, CLASS_NAME_PREFIX_ANIM, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _descriptor3, _class6, _temp2, AnimationBlend1DItem, AnimationBlend1D, AnimationBlend1DEval;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_dataClassDecoratorJs) {
      ccclass = _dataClassDecoratorJs.ccclass;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_parametricJs) {
      BindableNumber = _parametricJs.BindableNumber;
      bindOr = _parametricJs.bindOr;
      VariableType = _parametricJs.VariableType;
    }, function (_animationBlendJs) {
      AnimationBlend = _animationBlendJs.AnimationBlend;
      AnimationBlendEval = _animationBlendJs.AnimationBlendEval;
      AnimationBlendItem = _animationBlendJs.AnimationBlendItem;
    }, function (_blend1dJs) {
      blend1D = _blend1dJs.blend1D;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }],
    execute: function () {
      AnimationBlend1DItem = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "AnimationBlend1DItem"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_AnimationBlendItem) {
        _inheritsLoose(AnimationBlend1DItem, _AnimationBlendItem);

        function AnimationBlend1DItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AnimationBlendItem.call.apply(_AnimationBlendItem, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "threshold", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = AnimationBlend1DItem.prototype;

        _proto.clone = function clone() {
          var that = new AnimationBlend1DItem();

          this._assign(that);

          return that;
        };

        _proto._assign = function _assign(that) {
          _AnimationBlendItem.prototype._assign.call(this, that);

          that.threshold = this.threshold;
          return that;
        };

        return AnimationBlend1DItem;
      }(AnimationBlendItem), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "threshold", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      })), _class2)) || _class);

      _export("AnimationBlend1D", AnimationBlend1D = (_dec2 = ccclass('cc.animation.AnimationBlend1D'), _dec2(_class4 = (_class5 = (_temp2 = _class6 = /*#__PURE__*/function (_AnimationBlend) {
        _inheritsLoose(AnimationBlend1D, _AnimationBlend);

        function AnimationBlend1D() {
          var _this2;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this2 = _AnimationBlend.call.apply(_AnimationBlend, [this].concat(args)) || this;

          _initializerDefineProperty(_this2, "_items", _descriptor2, _assertThisInitialized(_this2));

          _initializerDefineProperty(_this2, "param", _descriptor3, _assertThisInitialized(_this2));

          return _this2;
        }

        var _proto2 = AnimationBlend1D.prototype;

        _proto2.clone = function clone() {
          var that = new AnimationBlend1D();
          that._items = this._items.map(function (item) {
            return item.clone();
          });
          that.param = this.param.clone();
          return that;
        };

        _proto2[createEval] = function (context) {
          var evaluation = new AnimationBlend1DEval(context, this._items, this._items.map(function (_ref) {
            var threshold = _ref.threshold;
            return threshold;
          }), 0.0);
          var initialValue = bindOr(context, this.param, VariableType.FLOAT, evaluation.setInput, evaluation, 0);
          evaluation.setInput(initialValue, 0);
          return evaluation;
        };

        _createClass(AnimationBlend1D, [{
          key: "items",
          get: function get() {
            return this._items;
          },
          set: function set(value) {
            this._items = Array.from(value).sort(function (_ref2, _ref3) {
              var lhs = _ref2.threshold;
              var rhs = _ref3.threshold;
              return lhs - rhs;
            });
          }
        }]);

        return AnimationBlend1D;
      }(AnimationBlend), _class6.Item = AnimationBlend1DItem, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "_items", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "param", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new BindableNumber();
        }
      })), _class5)) || _class4));

      AnimationBlend1DEval = /*#__PURE__*/function (_AnimationBlendEval) {
        _inheritsLoose(AnimationBlend1DEval, _AnimationBlendEval);

        function AnimationBlend1DEval(context, items, thresholds, input) {
          var _this3;

          _this3 = _AnimationBlendEval.call(this, context, items, [input]) || this;
          _this3._thresholds = thresholds;

          _this3.doEval();

          return _this3;
        }

        var _proto3 = AnimationBlend1DEval.prototype;

        _proto3.eval = function _eval(weights, _ref4) {
          var value = _ref4[0];
          blend1D(weights, this._thresholds, value);
        };

        return AnimationBlend1DEval;
      }(AnimationBlendEval);
    }
  };
});
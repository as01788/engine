System.register("q-bundled:///fs/cocos/core/animation/marionette/animation-blend-2d.js", ["../../math/index.js", "../../data/class-decorator.js", "../../value-types/enum.js", "./create-eval.js", "./animation-blend.js", "../../data/decorators/index.js", "./parametric.js", "./blend-2d.js", "../define.js"], function (_export, _context) {
  "use strict";

  var Vec2, ccclass, ccenum, createEval, AnimationBlend, AnimationBlendEval, AnimationBlendItem, serializable, BindableNumber, bindOr, VariableType, sampleFreeformCartesian, sampleFreeformDirectional, blendSimpleDirectional, CLASS_NAME_PREFIX_ANIM, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class6, _temp2, Algorithm, AnimationBlend2DItem, AnimationBlend2D, AnimationBlend2DEval;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_mathIndexJs) {
      Vec2 = _mathIndexJs.Vec2;
    }, function (_dataClassDecoratorJs) {
      ccclass = _dataClassDecoratorJs.ccclass;
    }, function (_valueTypesEnumJs) {
      ccenum = _valueTypesEnumJs.ccenum;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_animationBlendJs) {
      AnimationBlend = _animationBlendJs.AnimationBlend;
      AnimationBlendEval = _animationBlendJs.AnimationBlendEval;
      AnimationBlendItem = _animationBlendJs.AnimationBlendItem;
    }, function (_dataDecoratorsIndexJs) {
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_parametricJs) {
      BindableNumber = _parametricJs.BindableNumber;
      bindOr = _parametricJs.bindOr;
      VariableType = _parametricJs.VariableType;
    }, function (_blend2dJs) {
      sampleFreeformCartesian = _blend2dJs.sampleFreeformCartesian;
      sampleFreeformDirectional = _blend2dJs.sampleFreeformDirectional;
      blendSimpleDirectional = _blend2dJs.blendSimpleDirectional;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }],
    execute: function () {
      (function (Algorithm) {
        Algorithm[Algorithm["SIMPLE_DIRECTIONAL"] = 0] = "SIMPLE_DIRECTIONAL";
        Algorithm[Algorithm["FREEFORM_CARTESIAN"] = 1] = "FREEFORM_CARTESIAN";
        Algorithm[Algorithm["FREEFORM_DIRECTIONAL"] = 2] = "FREEFORM_DIRECTIONAL";
      })(Algorithm || (Algorithm = {}));

      ccenum(Algorithm);
      AnimationBlend2DItem = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "AnimationBlend2DItem"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_AnimationBlendItem) {
        _inheritsLoose(AnimationBlend2DItem, _AnimationBlendItem);

        function AnimationBlend2DItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AnimationBlendItem.call.apply(_AnimationBlendItem, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "threshold", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = AnimationBlend2DItem.prototype;

        _proto.clone = function clone() {
          var that = new AnimationBlend2DItem();

          this._assign(that);

          return that;
        };

        _proto._assign = function _assign(that) {
          _AnimationBlendItem.prototype._assign.call(this, that);

          Vec2.copy(that.threshold, this.threshold);
          return that;
        };

        return AnimationBlend2DItem;
      }(AnimationBlendItem), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "threshold", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2();
        }
      })), _class2)) || _class);

      _export("AnimationBlend2D", AnimationBlend2D = (_dec2 = ccclass('cc.animation.AnimationBlend2D'), _dec2(_class4 = (_class5 = (_temp2 = _class6 = /*#__PURE__*/function (_AnimationBlend) {
        _inheritsLoose(AnimationBlend2D, _AnimationBlend);

        function AnimationBlend2D() {
          var _this2;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this2 = _AnimationBlend.call.apply(_AnimationBlend, [this].concat(args)) || this;

          _initializerDefineProperty(_this2, "algorithm", _descriptor2, _assertThisInitialized(_this2));

          _initializerDefineProperty(_this2, "_items", _descriptor3, _assertThisInitialized(_this2));

          _initializerDefineProperty(_this2, "paramX", _descriptor4, _assertThisInitialized(_this2));

          _initializerDefineProperty(_this2, "paramY", _descriptor5, _assertThisInitialized(_this2));

          return _this2;
        }

        var _proto2 = AnimationBlend2D.prototype;

        _proto2.clone = function clone() {
          var that = new AnimationBlend2D();
          that._items = this._items.map(function (item) {
            var _item$clone;

            return (_item$clone = item === null || item === void 0 ? void 0 : item.clone()) !== null && _item$clone !== void 0 ? _item$clone : null;
          });
          that.paramX = this.paramX.clone();
          that.paramY = this.paramY.clone();
          return that;
        };

        _proto2[createEval] = function (context) {
          var evaluation = new AnimationBlend2DEval(context, this._items, this._items.map(function (_ref) {
            var threshold = _ref.threshold;
            return threshold;
          }), this.algorithm, [0.0, 0.0]);
          var initialValueX = bindOr(context, this.paramX, VariableType.FLOAT, evaluation.setInput, evaluation, 0);
          var initialValueY = bindOr(context, this.paramY, VariableType.FLOAT, evaluation.setInput, evaluation, 1);
          evaluation.setInput(initialValueX, 0);
          evaluation.setInput(initialValueY, 1);
          return evaluation;
        };

        _createClass(AnimationBlend2D, [{
          key: "items",
          get: function get() {
            return this._items;
          },
          set: function set(items) {
            this._items = Array.from(items);
          }
        }]);

        return AnimationBlend2D;
      }(AnimationBlend), _class6.Algorithm = Algorithm, _class6.Item = AnimationBlend2DItem, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "algorithm", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Algorithm.SIMPLE_DIRECTIONAL;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "_items", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "paramX", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new BindableNumber();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "paramY", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new BindableNumber();
        }
      })), _class5)) || _class4));

      AnimationBlend2DEval = /*#__PURE__*/function (_AnimationBlendEval) {
        _inheritsLoose(AnimationBlend2DEval, _AnimationBlendEval);

        function AnimationBlend2DEval(context, items, thresholds, algorithm, inputs) {
          var _this3;

          _this3 = _AnimationBlendEval.call(this, context, items, inputs) || this;
          _this3._thresholds = void 0;
          _this3._algorithm = void 0;
          _this3._value = new Vec2();
          _this3._thresholds = thresholds;
          _this3._algorithm = algorithm;

          _this3.doEval();

          return _this3;
        }

        var _proto3 = AnimationBlend2DEval.prototype;

        _proto3.eval = function _eval(weights, _ref2) {
          var x = _ref2[0],
              y = _ref2[1];
          Vec2.set(this._value, x, y);
          weights.fill(0);

          switch (this._algorithm) {
            case Algorithm.SIMPLE_DIRECTIONAL:
              blendSimpleDirectional(weights, this._thresholds, this._value);
              break;

            case Algorithm.FREEFORM_CARTESIAN:
              sampleFreeformCartesian(weights, this._thresholds, this._value);
              break;

            case Algorithm.FREEFORM_DIRECTIONAL:
              sampleFreeformDirectional(weights, this._thresholds, this._value);
              break;

            default:
              break;
          }
        };

        return AnimationBlend2DEval;
      }(AnimationBlendEval);
    }
  };
});
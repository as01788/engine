System.register("q-bundled:///fs/cocos/core/animation/marionette/animation-blend-direct.js", ["../../data/decorators/index.js", "../../data/class-decorator.js", "./create-eval.js", "./animation-blend.js", "../define.js"], function (_export, _context) {
  "use strict";

  var serializable, ccclass, createEval, AnimationBlend, AnimationBlendEval, AnimationBlendItem, CLASS_NAME_PREFIX_ANIM, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _class6, _temp2, AnimationBlendDirectItem, AnimationBlendDirect, AnimationBlendDirectEval;

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
    }, function (_animationBlendJs) {
      AnimationBlend = _animationBlendJs.AnimationBlend;
      AnimationBlendEval = _animationBlendJs.AnimationBlendEval;
      AnimationBlendItem = _animationBlendJs.AnimationBlendItem;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }],
    execute: function () {
      AnimationBlendDirectItem = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "AnimationBlendDirectItem"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_AnimationBlendItem) {
        _inheritsLoose(AnimationBlendDirectItem, _AnimationBlendItem);

        function AnimationBlendDirectItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AnimationBlendItem.call.apply(_AnimationBlendItem, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "weight", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = AnimationBlendDirectItem.prototype;

        _proto.clone = function clone() {
          var that = new AnimationBlendDirectItem();

          this._assign(that);

          return that;
        };

        _proto._assign = function _assign(that) {
          _AnimationBlendItem.prototype._assign.call(this, that);

          that.weight = this.weight;
          return that;
        };

        return AnimationBlendDirectItem;
      }(AnimationBlendItem), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "weight", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      })), _class2)) || _class);

      _export("AnimationBlendDirect", AnimationBlendDirect = (_dec2 = ccclass('cc.animation.AnimationBlendDirect'), _dec2(_class4 = (_class5 = (_temp2 = _class6 = /*#__PURE__*/function (_AnimationBlend) {
        _inheritsLoose(AnimationBlendDirect, _AnimationBlend);

        function AnimationBlendDirect() {
          var _this2;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this2 = _AnimationBlend.call.apply(_AnimationBlend, [this].concat(args)) || this;

          _initializerDefineProperty(_this2, "_items", _descriptor2, _assertThisInitialized(_this2));

          return _this2;
        }

        var _proto2 = AnimationBlendDirect.prototype;

        _proto2.clone = function clone() {
          var that = new AnimationBlendDirect();
          that._items = this._items.map(function (item) {
            var _item$clone;

            return (_item$clone = item === null || item === void 0 ? void 0 : item.clone()) !== null && _item$clone !== void 0 ? _item$clone : null;
          });
          return that;
        };

        _proto2[createEval] = function (context) {
          var myEval = new AnimationBlendDirectEval(context, this._items, this._items.map(function (_ref) {
            var weight = _ref.weight;
            return weight;
          }));
          return myEval;
        };

        _createClass(AnimationBlendDirect, [{
          key: "items",
          get: function get() {
            return this._items;
          },
          set: function set(value) {
            this._items = Array.from(value);
          }
        }]);

        return AnimationBlendDirect;
      }(AnimationBlend), _class6.Item = AnimationBlendDirectItem, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "_items", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class5)) || _class4));

      AnimationBlendDirectEval = /*#__PURE__*/function (_AnimationBlendEval) {
        _inheritsLoose(AnimationBlendDirectEval, _AnimationBlendEval);

        function AnimationBlendDirectEval() {
          var _this3;

          for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          _this3 = _AnimationBlendEval.call.apply(_AnimationBlendEval, [this].concat(args)) || this;

          _this3.doEval();

          return _this3;
        }

        var _proto3 = AnimationBlendDirectEval.prototype;

        _proto3.eval = function _eval(weights, inputs) {
          var nChildren = weights.length;

          for (var iChild = 0; iChild < nChildren; ++iChild) {
            weights[iChild] = inputs[iChild];
          }
        };

        return AnimationBlendDirectEval;
      }(AnimationBlendEval);
    }
  };
});
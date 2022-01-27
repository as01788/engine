System.register("q-bundled:///fs/cocos/core/animation/marionette/animation-blend.js", ["../../data/class-decorator.js", "./create-eval.js", "./errors.js", "../../data/decorators/index.js", "../../data/editor-extendable.js", "../define.js"], function (_export, _context2) {
  "use strict";

  var ccclass, createEval, VariableTypeMismatchedError, serializable, EditorExtendable, CLASS_NAME_PREFIX_ANIM, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _temp2, AnimationBlendItem, AnimationBlend, AnimationBlendEval;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function validateBlendParam(val, name) {
    if (typeof val !== 'number') {
      // TODO var name?
      throw new VariableTypeMismatchedError(name, 'number');
    }
  }

  _export("validateBlendParam", validateBlendParam);

  return {
    setters: [function (_dataClassDecoratorJs) {
      ccclass = _dataClassDecoratorJs.ccclass;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_errorsJs) {
      VariableTypeMismatchedError = _errorsJs.VariableTypeMismatchedError;
    }, function (_dataDecoratorsIndexJs) {
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_dataEditorExtendableJs) {
      EditorExtendable = _dataEditorExtendableJs.EditorExtendable;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }],
    execute: function () {
      _export("AnimationBlendItem", AnimationBlendItem = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "AnimationBlendItem"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function AnimationBlendItem() {
          _initializerDefineProperty(this, "motion", _descriptor, this);
        }

        var _proto = AnimationBlendItem.prototype;

        _proto.clone = function clone() {
          var that = new AnimationBlendItem();

          this._assign(that);

          return that;
        };

        _proto._assign = function _assign(that) {
          var _this$motion$clone, _this$motion;

          that.motion = (_this$motion$clone = (_this$motion = this.motion) === null || _this$motion === void 0 ? void 0 : _this$motion.clone()) !== null && _this$motion$clone !== void 0 ? _this$motion$clone : null;
          return that;
        };

        return AnimationBlendItem;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "motion", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _export("AnimationBlend", AnimationBlend = (_dec2 = ccclass(CLASS_NAME_PREFIX_ANIM + "AnimationBlend"), _dec2(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function (_EditorExtendable) {
        _inheritsLoose(AnimationBlend, _EditorExtendable);

        function AnimationBlend() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EditorExtendable.call.apply(_EditorExtendable, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "name", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        return AnimationBlend;
      }(EditorExtendable), _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "name", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class5)) || _class4));

      _export("AnimationBlendEval", AnimationBlendEval = /*#__PURE__*/function () {
        function AnimationBlendEval(context, children, inputs) {
          this._childEvaluators = children.map(function (child) {
            var _child$motion$createE, _child$motion;

            return (_child$motion$createE = (_child$motion = child.motion) === null || _child$motion === void 0 ? void 0 : _child$motion[createEval](context)) !== null && _child$motion$createE !== void 0 ? _child$motion$createE : null;
          });
          this._weights = new Array(this._childEvaluators.length).fill(0);
          this._inputs = [].concat(inputs);
        }

        var _proto2 = AnimationBlendEval.prototype;

        _proto2.getClipStatuses = function getClipStatuses(baseWeight) {
          var children = this._childEvaluators,
              weights = this._weights;
          var nChildren = children.length;
          var iChild = 0;
          var currentChildIterator;
          return {
            next: function next() {
              // eslint-disable-next-line no-constant-condition
              while (true) {
                if (currentChildIterator) {
                  var result = currentChildIterator.next();

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
                  var child = children[iChild];
                  currentChildIterator = child === null || child === void 0 ? void 0 : child.getClipStatuses(baseWeight * weights[iChild]);
                  ++iChild;
                }
              }
            }
          };
        };

        _proto2.sample = function sample(progress, weight) {
          for (var iChild = 0; iChild < this._childEvaluators.length; ++iChild) {
            var _this$_childEvaluator;

            (_this$_childEvaluator = this._childEvaluators[iChild]) === null || _this$_childEvaluator === void 0 ? void 0 : _this$_childEvaluator.sample(progress, weight * this._weights[iChild]);
          }
        };

        _proto2.setInput = function setInput(value, index) {
          this._inputs[index] = value;
          this.doEval();
        };

        _proto2.doEval = function doEval() {
          this.eval(this._weights, this._inputs);
        };

        _proto2.eval = function _eval(_weights, _inputs) {};

        _createClass(AnimationBlendEval, [{
          key: "duration",
          get: function get() {
            var uniformDuration = 0.0;

            for (var iChild = 0; iChild < this._childEvaluators.length; ++iChild) {
              var _this$_childEvaluator2, _this$_childEvaluator3;

              uniformDuration += ((_this$_childEvaluator2 = (_this$_childEvaluator3 = this._childEvaluators[iChild]) === null || _this$_childEvaluator3 === void 0 ? void 0 : _this$_childEvaluator3.duration) !== null && _this$_childEvaluator2 !== void 0 ? _this$_childEvaluator2 : 0.0) * this._weights[iChild];
            }

            return uniformDuration;
          }
        }]);

        return AnimationBlendEval;
      }());
    }
  };
});
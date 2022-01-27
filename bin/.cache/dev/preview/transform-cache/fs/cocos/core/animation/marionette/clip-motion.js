System.register("q-bundled:///fs/cocos/core/animation/marionette/clip-motion.js", ["../../data/class-decorator.js", "../../data/editor-extendable.js", "../animation-clip.js", "../animation-state.js", "./create-eval.js", "./graph-debug.js"], function (_export, _context) {
  "use strict";

  var ccclass, type, EditorExtendable, AnimationClip, AnimationState, createEval, pushWeight, _dec, _dec2, _class, _class2, _descriptor, _temp, ClipMotion, ClipMotionEval;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataClassDecoratorJs) {
      ccclass = _dataClassDecoratorJs.ccclass;
      type = _dataClassDecoratorJs.type;
    }, function (_dataEditorExtendableJs) {
      EditorExtendable = _dataEditorExtendableJs.EditorExtendable;
    }, function (_animationClipJs) {
      AnimationClip = _animationClipJs.AnimationClip;
    }, function (_animationStateJs) {
      AnimationState = _animationStateJs.AnimationState;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_graphDebugJs) {
      pushWeight = _graphDebugJs.pushWeight;
    }],
    execute: function () {
      _export("ClipMotion", ClipMotion = (_dec = ccclass('cc.animation.ClipMotion'), _dec2 = type(AnimationClip), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_EditorExtendable) {
        _inheritsLoose(ClipMotion, _EditorExtendable);

        function ClipMotion() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EditorExtendable.call.apply(_EditorExtendable, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "clip", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ClipMotion.prototype;

        _proto[createEval] = function (context) {
          return !this.clip ? null : new ClipMotionEval(context, this.clip);
        };

        _proto.clone = function clone() {
          var that = new ClipMotion();
          that.clip = this.clip;
          return that;
        };

        return ClipMotion;
      }(EditorExtendable), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "clip", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      ClipMotionEval = /*#__PURE__*/function () {
        function ClipMotionEval(context, clip) {
          this.duration = clip.duration;
          this._state = new AnimationState(clip);

          this._state.initialize(context.node, context.blendBuffer);
        }

        var _proto2 = ClipMotionEval.prototype;

        _proto2.getClipStatuses = function getClipStatuses(baseWeight) {
          var _this2 = this;

          var got = false;
          return {
            next: function next() {
              if (got) {
                return {
                  done: true,
                  value: undefined
                };
              } else {
                got = true;
                return {
                  done: false,
                  value: {
                    __DEBUG_ID__: _this2.__DEBUG__ID__,
                    clip: _this2._state.clip,
                    weight: baseWeight
                  }
                };
              }
            }
          };
        };

        _proto2.sample = function sample(progress, weight) {
          if (weight === 0.0) {
            return;
          }

          pushWeight(this._state.name, weight);
          var time = this._state.duration * progress;
          this._state.time = time;
          this._state.weight = weight;

          this._state.sample();

          this._state.weight = 0.0;
        };

        _createClass(ClipMotionEval, [{
          key: "progress",
          get: function get() {
            return this._state.time / this.duration;
          }
        }]);

        return ClipMotionEval;
      }();
    }
  };
});
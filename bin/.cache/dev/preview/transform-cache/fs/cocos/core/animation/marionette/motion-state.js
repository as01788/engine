System.register("q-bundled:///fs/cocos/core/animation/marionette/motion-state.js", ["../../data/decorators/index.js", "./state.js", "./parametric.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, InteractiveState, BindableNumber, _dec, _class, _class2, _descriptor, _descriptor2, _temp, MotionState;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_stateJs) {
      InteractiveState = _stateJs.InteractiveState;
    }, function (_parametricJs) {
      BindableNumber = _parametricJs.BindableNumber;
    }],
    execute: function () {
      _export("MotionState", MotionState = (_dec = ccclass('cc.animation.Motion'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_InteractiveState) {
        _inheritsLoose(MotionState, _InteractiveState);

        function MotionState() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _InteractiveState.call.apply(_InteractiveState, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "motion", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "speed", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MotionState.prototype;

        _proto.clone = function clone() {
          var _this$motion$clone, _this$motion;

          var that = new MotionState();
          that.motion = (_this$motion$clone = (_this$motion = this.motion) === null || _this$motion === void 0 ? void 0 : _this$motion.clone()) !== null && _this$motion$clone !== void 0 ? _this$motion$clone : null;
          that.speed = this.speed.clone();
          return that;
        };

        return MotionState;
      }(InteractiveState), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "motion", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new BindableNumber(1.0);
        }
      })), _class2)) || _class));
    }
  };
});
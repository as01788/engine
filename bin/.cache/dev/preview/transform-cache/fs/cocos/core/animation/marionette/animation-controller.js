System.register("q-bundled:///fs/cocos/core/animation/marionette/animation-controller.js", ["../../components/index.js", "./animation-graph.js", "../../data/class-decorator.js", "./graph-eval.js", "../../data/utils/asserts.js"], function (_export, _context) {
  "use strict";

  var Component, AnimationGraph, property, ccclass, menu, AnimationGraphEval, assertIsNonNullable, _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp, AnimationController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_componentsIndexJs) {
      Component = _componentsIndexJs.Component;
    }, function (_animationGraphJs) {
      AnimationGraph = _animationGraphJs.AnimationGraph;
    }, function (_dataClassDecoratorJs) {
      property = _dataClassDecoratorJs.property;
      ccclass = _dataClassDecoratorJs.ccclass;
      menu = _dataClassDecoratorJs.menu;
    }, function (_graphEvalJs) {
      AnimationGraphEval = _graphEvalJs.AnimationGraphEval;
    }, function (_dataUtilsAssertsJs) {
      assertIsNonNullable = _dataUtilsAssertsJs.assertIsNonNullable;
    }],
    execute: function () {
      _export("AnimationController", AnimationController = (_dec = ccclass('cc.animation.AnimationController'), _dec2 = menu('Animation/Animation Controller'), _dec3 = property(AnimationGraph), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AnimationController, _Component);

        function AnimationController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "graph", _descriptor, _assertThisInitialized(_this));

          _this._graphEval = null;
          return _this;
        }

        var _proto = AnimationController.prototype;

        _proto.start = function start() {
          if (this.graph) {
            this._graphEval = new AnimationGraphEval(this.graph, this.node, this);
          }
        };

        _proto.update = function update(deltaTime) {
          var _this$_graphEval;

          (_this$_graphEval = this._graphEval) === null || _this$_graphEval === void 0 ? void 0 : _this$_graphEval.update(deltaTime);
        };

        _proto.getVariables = function getVariables() {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getVariables();
        };

        _proto.setValue = function setValue(name, value) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          graphEval.setValue(name, value);
        };

        _proto.getValue = function getValue(name) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getValue(name);
        };

        _proto.getCurrentStateStatus = function getCurrentStateStatus(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getCurrentStateStatus(layer);
        };

        _proto.getCurrentClipStatuses = function getCurrentClipStatuses(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getCurrentClipStatuses(layer);
        };

        _proto.getCurrentTransition = function getCurrentTransition(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getCurrentTransition(layer);
        };

        _proto.getNextStateStatus = function getNextStateStatus(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getNextStateStatus(layer);
        };

        _proto.getNextClipStatuses = function getNextClipStatuses(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getNextClipStatuses(layer);
        };

        return AnimationController;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "graph", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
    }
  };
});
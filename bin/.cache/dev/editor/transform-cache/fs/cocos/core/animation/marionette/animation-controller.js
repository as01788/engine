"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationController = void 0;

var _index = require("../../components/index.js");

var _animationGraph = require("./animation-graph.js");

var _classDecorator = require("../../data/class-decorator.js");

var _graphEval = require("./graph-eval.js");

var _asserts = require("../../data/utils/asserts.js");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let AnimationController = (_dec = (0, _classDecorator.ccclass)('cc.animation.AnimationController'), _dec2 = (0, _classDecorator.menu)('Animation/Animation Controller'), _dec3 = (0, _classDecorator.property)(_animationGraph.AnimationGraph), _dec(_class = _dec2(_class = (_class2 = (_temp = class AnimationController extends _index.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "graph", _descriptor, this);

    this._graphEval = null;
  }

  start() {
    if (this.graph) {
      this._graphEval = new _graphEval.AnimationGraphEval(this.graph, this.node, this);
    }
  }

  update(deltaTime) {
    var _this$_graphEval;

    (_this$_graphEval = this._graphEval) === null || _this$_graphEval === void 0 ? void 0 : _this$_graphEval.update(deltaTime);
  }

  getVariables() {
    const {
      _graphEval: graphEval
    } = this;
    (0, _asserts.assertIsNonNullable)(graphEval);
    return graphEval.getVariables();
  }

  setValue(name, value) {
    const {
      _graphEval: graphEval
    } = this;
    (0, _asserts.assertIsNonNullable)(graphEval);
    graphEval.setValue(name, value);
  }

  getValue(name) {
    const {
      _graphEval: graphEval
    } = this;
    (0, _asserts.assertIsNonNullable)(graphEval);
    return graphEval.getValue(name);
  }

  getCurrentStateStatus(layer) {
    const {
      _graphEval: graphEval
    } = this;
    (0, _asserts.assertIsNonNullable)(graphEval);
    return graphEval.getCurrentStateStatus(layer);
  }

  getCurrentClipStatuses(layer) {
    const {
      _graphEval: graphEval
    } = this;
    (0, _asserts.assertIsNonNullable)(graphEval);
    return graphEval.getCurrentClipStatuses(layer);
  }

  getCurrentTransition(layer) {
    const {
      _graphEval: graphEval
    } = this;
    (0, _asserts.assertIsNonNullable)(graphEval);
    return graphEval.getCurrentTransition(layer);
  }

  getNextStateStatus(layer) {
    const {
      _graphEval: graphEval
    } = this;
    (0, _asserts.assertIsNonNullable)(graphEval);
    return graphEval.getNextStateStatus(layer);
  }

  getNextClipStatuses(layer) {
    const {
      _graphEval: graphEval
    } = this;
    (0, _asserts.assertIsNonNullable)(graphEval);
    return graphEval.getNextClipStatuses(layer);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "graph", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class);
exports.AnimationController = AnimationController;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractiveState = exports.State = exports.incomingsSymbol = exports.outgoingsSymbol = void 0;

var _index = require("../../data/decorators/index.js");

var _ownership = require("./ownership.js");

var _editorExtendable = require("../../data/editor-extendable.js");

var _define = require("../define.js");

var _array = require("../../utils/array.js");

var _instantiate = require("../../data/instantiate.js");

var _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const outgoingsSymbol = Symbol('[[Outgoing transitions]]');
exports.outgoingsSymbol = outgoingsSymbol;
const incomingsSymbol = Symbol('[[Incoming transitions]]');
exports.incomingsSymbol = incomingsSymbol;
let State = (_dec = (0, _index.ccclass)('cc.animation.State'), _dec(_class = (_class2 = (_temp = class State extends _editorExtendable.EditorExtendable {
  /**
   * @internal
   */
  constructor() {
    super();

    _initializerDefineProperty(this, "name", _descriptor, this);

    this[outgoingsSymbol] = [];
    this[incomingsSymbol] = [];
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "name", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class2)) || _class);
exports.State = State;
let InteractiveState = (_dec2 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}InteractiveState`), _dec2(_class4 = (_class5 = (_temp2 = class InteractiveState extends State {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_components", _descriptor2, this);
  }

  get components() {
    return this._components;
  }

  addComponent(constructor) {
    const component = new constructor();

    this._components.push(component);

    return component;
  }

  removeComponent(component) {
    (0, _array.remove)(this._components, component);
  }

  instantiateComponents() {
    const instantiatedComponents = this._components.map(component => {
      // @ts-expect-error Typing
      const instantiated = (0, _instantiate.instantiate)(component, true);
      return instantiated;
    });

    return instantiatedComponents;
  }

}, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "_components", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class5)) || _class4);
exports.InteractiveState = InteractiveState;
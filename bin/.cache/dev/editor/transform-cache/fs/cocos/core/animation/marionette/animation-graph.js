"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnimationTransition = isAnimationTransition;
Object.defineProperty(exports, "State", {
  enumerable: true,
  get: function () {
    return _state.State;
  }
});
exports.AnimationGraph = exports.Variable = exports.LayerBlending = exports.Layer = exports.SubStateMachine = exports.StateMachine = void 0;

var _index = require("../../data/decorators/index.js");

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _array = require("../../utils/array.js");

var _asserts = require("../../data/utils/asserts.js");

var _index2 = require("../../assets/index.js");

var _ownership = require("./ownership.js");

var _errors = require("./errors.js");

var _createEval = require("./create-eval.js");

var _motionState = require("./motion-state.js");

var _state = require("./state.js");

var _editorExtendable = require("../../data/editor-extendable.js");

var _js = require("../../utils/js.js");

var _move = require("../../algorithm/move.js");

var _deserializeSymbols = require("../../data/deserialize-symbols.js");

var _define = require("../define.js");

var _parametric = require("./parametric.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _dec2, _class4, _class5, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp2, _dec3, _class7, _class8, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp3, _dec4, _class10, _class11, _descriptor13, _temp4, _dec5, _class13, _class14, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _temp5, _dec6, _class16, _class17, _descriptor19, _descriptor20, _temp6, _dec7, _class19, _class20, _descriptor21, _descriptor22, _temp7;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Transition = (_dec = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}Transition`), _dec(_class = (_class2 = (_temp = class Transition extends _editorExtendable.EditorExtendable {
  /**
   * The transition source.
   */

  /**
   * The transition target.
   */

  /**
   * The transition condition.
   */

  /**
   * @internal
   */
  constructor(from, to, conditions) {
    super();

    _initializerDefineProperty(this, "from", _descriptor, this);

    _initializerDefineProperty(this, "to", _descriptor2, this);

    _initializerDefineProperty(this, "conditions", _descriptor3, this);

    this[_ownership.ownerSymbol] = void 0;
    this.from = from;
    this.to = to;

    if (conditions) {
      this.conditions = conditions;
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "from", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "to", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "conditions", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
let AnimationTransition = (_dec2 = (0, _index.ccclass)(`${_define.CLASS_NAME_PREFIX_ANIM}AnimationTransition`), _dec2(_class4 = (_class5 = (_temp2 = class AnimationTransition extends Transition {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "duration", _descriptor4, this);

    _initializerDefineProperty(this, "relativeDuration", _descriptor5, this);

    _initializerDefineProperty(this, "exitConditionEnabled", _descriptor6, this);

    _initializerDefineProperty(this, "_exitCondition", _descriptor7, this);
  }

  get exitCondition() {
    return this._exitCondition;
  }

  set exitCondition(value) {
    (0, _asserts.assertIsTrue)(value >= 0.0);
    this._exitCondition = value;
  }

}, _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "duration", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.3;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "relativeDuration", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "exitConditionEnabled", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_exitCondition", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.0;
  }
})), _class5)) || _class4);

function isAnimationTransition(transition) {
  return transition instanceof AnimationTransition;
}

let StateMachine = (_dec3 = (0, _index.ccclass)('cc.animation.StateMachine'), _dec3(_class7 = (_class8 = (_temp3 = class StateMachine extends _editorExtendable.EditorExtendable {
  /**
   * // TODO: HACK
   * @internal
   */
  __callOnAfterDeserializeRecursive() {
    this[_deserializeSymbols.onAfterDeserializedTag]();

    const nStates = this._states.length;

    for (let iState = 0; iState < nStates; ++iState) {
      const state = this._states[iState];

      if (state instanceof SubStateMachine) {
        state.stateMachine.__callOnAfterDeserializeRecursive();
      }
    }
  }
  /**
   * @internal
   */


  constructor() {
    super();

    _initializerDefineProperty(this, "_states", _descriptor8, this);

    _initializerDefineProperty(this, "_transitions", _descriptor9, this);

    _initializerDefineProperty(this, "_entryState", _descriptor10, this);

    _initializerDefineProperty(this, "_exitState", _descriptor11, this);

    _initializerDefineProperty(this, "_anyState", _descriptor12, this);

    this._entryState = this._addState(new _state.State());
    this._entryState.name = 'Entry';
    this._exitState = this._addState(new _state.State());
    this._exitState.name = 'Exit';
    this._anyState = this._addState(new _state.State());
    this._anyState.name = 'Any';
  }

  [_deserializeSymbols.onAfterDeserializedTag]() {
    this._states.forEach(state => (0, _ownership.own)(state, this));

    this._transitions.forEach(transition => {
      transition.from[_state.outgoingsSymbol].push(transition);

      transition.to[_state.incomingsSymbol].push(transition);
    });
  }

  [_createEval.createEval](context) {
    throw new Error('Method not implemented.');
  }
  /**
   * The entry state.
   */


  get entryState() {
    return this._entryState;
  }
  /**
   * The exit state.
   */


  get exitState() {
    return this._exitState;
  }
  /**
   * The any state.
   */


  get anyState() {
    return this._anyState;
  }
  /**
   * Gets an iterator to all states within this graph.
   * @returns The iterator.
   */


  states() {
    return this._states;
  }
  /**
   * Gets an iterator to all transitions within this graph.
   * @returns The iterator.
   */


  transitions() {
    return this._transitions;
  }
  /**
   * Gets the transitions between specified states.
   * @param from Transition source.
   * @param to Transition target.
   * @returns Iterator to the transitions
   */


  getTransitionsBetween(from, to) {
    (0, _ownership.assertsOwnedBy)(from, this);
    (0, _ownership.assertsOwnedBy)(to, this);
    return from[_state.outgoingsSymbol].filter(transition => transition.to === to);
  }
  /**
   * Gets all outgoing transitions of specified state.
   * @param to The state.
   * @returns Result transitions.
   */


  getOutgoings(from) {
    (0, _ownership.assertsOwnedBy)(from, this);
    return from[_state.outgoingsSymbol];
  }
  /**
   * Gets all incoming transitions of specified state.
   * @param to The state.
   * @returns Result transitions.
   */


  getIncomings(to) {
    (0, _ownership.assertsOwnedBy)(to, this);
    return to[_state.incomingsSymbol];
  }
  /**
   * Adds a motion state into this state machine.
   * @returns The newly created motion.
   */


  addMotion() {
    return this._addState(new _motionState.MotionState());
  }
  /**
   * Adds a sub state machine into this state machine.
   * @returns The newly created state machine.
   */


  addSubStateMachine() {
    return this._addState(new SubStateMachine());
  }
  /**
   * Removes specified state from this state machine.
   * @param state The state to remove.
   */


  remove(state) {
    (0, _ownership.assertsOwnedBy)(state, this);

    if (state === this.entryState || state === this.exitState || state === this.anyState) {
      return;
    }

    this.eraseTransitionsIncludes(state);
    (0, _array.remove)(this._states, state);
    (0, _ownership.markAsDangling)(state);
  }
  /**
   * Connect two states.
   * @param from Source state.
   * @param to Target state.
   * @param condition The transition condition.
   */


  connect(from, to, conditions) {
    (0, _ownership.assertsOwnedBy)(from, this);
    (0, _ownership.assertsOwnedBy)(to, this);

    if (to === this.entryState) {
      throw new _errors.InvalidTransitionError('to-entry');
    }

    if (to === this.anyState) {
      throw new _errors.InvalidTransitionError('to-any');
    }

    if (from === this.exitState) {
      throw new _errors.InvalidTransitionError('from-exit');
    }

    const transition = from instanceof _motionState.MotionState || from === this._anyState ? new AnimationTransition(from, to, conditions) : new Transition(from, to, conditions);
    (0, _ownership.own)(transition, this);

    this._transitions.push(transition);

    from[_state.outgoingsSymbol].push(transition);

    to[_state.incomingsSymbol].push(transition);

    return transition;
  }

  disconnect(from, to) {
    (0, _ownership.assertsOwnedBy)(from, this);
    (0, _ownership.assertsOwnedBy)(to, this);
    const oTransitions = from[_state.outgoingsSymbol];
    const iTransitions = to[_state.incomingsSymbol];
    const transitions = this._transitions;
    const oTransitionsToRemove = oTransitions.filter(oTransition => oTransition.to === to);
    const nOTransitionToRemove = oTransitionsToRemove.length;

    for (let iOTransitionToRemove = 0; iOTransitionToRemove < nOTransitionToRemove; ++iOTransitionToRemove) {
      const oTransition = oTransitionsToRemove[iOTransitionToRemove];
      (0, _array.remove)(oTransitions, oTransition);
      (0, _asserts.assertIsTrue)((0, _array.remove)(transitions, oTransition));
      (0, _asserts.assertIsNonNullable)((0, _array.removeIf)(iTransitions, transition => transition === oTransition));
      (0, _ownership.markAsDangling)(oTransition);
    }
  }

  removeTransition(removal) {
    (0, _asserts.assertIsTrue)((0, _array.remove)(this._transitions, removal));
    (0, _asserts.assertIsNonNullable)((0, _array.removeIf)(removal.from[_state.outgoingsSymbol], transition => transition === removal));
    (0, _asserts.assertIsNonNullable)((0, _array.removeIf)(removal.to[_state.incomingsSymbol], transition => transition === removal));
    (0, _ownership.markAsDangling)(removal);
  }

  eraseOutgoings(from) {
    (0, _ownership.assertsOwnedBy)(from, this);
    const oTransitions = from[_state.outgoingsSymbol];

    for (let iOTransition = 0; iOTransition < oTransitions.length; ++iOTransition) {
      const oTransition = oTransitions[iOTransition];
      const to = oTransition.to;
      (0, _asserts.assertIsTrue)((0, _array.remove)(this._transitions, oTransition));
      (0, _asserts.assertIsNonNullable)((0, _array.removeIf)(to[_state.incomingsSymbol], transition => transition === oTransition));
      (0, _ownership.markAsDangling)(oTransition);
    }

    oTransitions.length = 0;
  }

  eraseIncomings(to) {
    (0, _ownership.assertsOwnedBy)(to, this);
    const iTransitions = to[_state.incomingsSymbol];

    for (let iITransition = 0; iITransition < iTransitions.length; ++iITransition) {
      const iTransition = iTransitions[iITransition];
      const from = iTransition.from;
      (0, _asserts.assertIsTrue)((0, _array.remove)(this._transitions, iTransition));
      (0, _asserts.assertIsNonNullable)((0, _array.removeIf)(from[_state.outgoingsSymbol], transition => transition === iTransition));
      (0, _ownership.markAsDangling)(iTransition);
    }

    iTransitions.length = 0;
  }

  eraseTransitionsIncludes(state) {
    this.eraseIncomings(state);
    this.eraseOutgoings(state);
  }

  clone() {
    const that = new StateMachine();
    const stateMap = new Map();

    for (const state of this._states) {
      switch (state) {
        case this._entryState:
          stateMap.set(state, that._entryState);
          break;

        case this._exitState:
          stateMap.set(state, that._exitState);
          break;

        case this._anyState:
          stateMap.set(state, that._anyState);
          break;

        default:
          if (state instanceof _motionState.MotionState || state instanceof SubStateMachine) {
            const thatState = state.clone();

            that._addState(thatState);

            stateMap.set(state, thatState);
          } else {
            (0, _asserts.assertIsTrue)(false);
          }

          break;
      }
    }

    for (const transition of this._transitions) {
      const thatFrom = stateMap.get(transition.from);
      const thatTo = stateMap.get(transition.to);
      (0, _asserts.assertIsTrue)(thatFrom && thatTo);
      const thatTransition = that.connect(thatFrom, thatTo);
      thatTransition.conditions = transition.conditions.map(condition => condition.clone());

      if (thatTransition instanceof AnimationTransition) {
        (0, _asserts.assertIsTrue)(transition instanceof AnimationTransition);
        thatTransition.duration = transition.duration;
        thatTransition.exitConditionEnabled = transition.exitConditionEnabled;
        thatTransition.exitCondition = transition.exitCondition;
      }
    }

    return that;
  }

  _addState(state) {
    (0, _ownership.own)(state, this);

    this._states.push(state);

    return state;
  }

}, _temp3), (_descriptor8 = _applyDecoratedDescriptor(_class8.prototype, "_states", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class8.prototype, "_transitions", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class8.prototype, "_entryState", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class8.prototype, "_exitState", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class8.prototype, "_anyState", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class8)) || _class7);
exports.StateMachine = StateMachine;
let SubStateMachine = (_dec4 = (0, _index.ccclass)('cc.animation.SubStateMachine'), _dec4(_class10 = (_class11 = (_temp4 = class SubStateMachine extends _state.InteractiveState {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_stateMachine", _descriptor13, this);
  }

  get stateMachine() {
    return this._stateMachine;
  }

  clone() {
    const that = new SubStateMachine();
    that._stateMachine = this._stateMachine.clone();
    return that;
  }

}, _temp4), (_descriptor13 = _applyDecoratedDescriptor(_class11.prototype, "_stateMachine", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new StateMachine();
  }
})), _class11)) || _class10);
exports.SubStateMachine = SubStateMachine;
let Layer = (_dec5 = (0, _index.ccclass)('cc.animation.Layer'), _dec5(_class13 = (_class14 = (_temp5 = class Layer {
  /**
   * @internal
   */
  constructor() {
    this[_ownership.ownerSymbol] = void 0;

    _initializerDefineProperty(this, "_stateMachine", _descriptor14, this);

    _initializerDefineProperty(this, "name", _descriptor15, this);

    _initializerDefineProperty(this, "weight", _descriptor16, this);

    _initializerDefineProperty(this, "mask", _descriptor17, this);

    _initializerDefineProperty(this, "blending", _descriptor18, this);

    this._stateMachine = new StateMachine();
  }

  get stateMachine() {
    return this._stateMachine;
  }

}, _temp5), (_descriptor14 = _applyDecoratedDescriptor(_class14.prototype, "_stateMachine", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class14.prototype, "name", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class14.prototype, "weight", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.0;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class14.prototype, "mask", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class14.prototype, "blending", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return LayerBlending.additive;
  }
})), _class14)) || _class13);
exports.Layer = Layer;
let LayerBlending;
exports.LayerBlending = LayerBlending;

(function (LayerBlending) {
  LayerBlending[LayerBlending["override"] = 0] = "override";
  LayerBlending[LayerBlending["additive"] = 1] = "additive";
})(LayerBlending || (exports.LayerBlending = LayerBlending = {}));

let Variable = (_dec6 = (0, _index.ccclass)('cc.animation.Variable'), _dec6(_class16 = (_class17 = (_temp6 = class Variable {
  // TODO: we should not specify type here but due to de-serialization limitation
  // See: https://github.com/cocos-creator/3d-tasks/issues/7909
  // Same as `_type`
  constructor(type) {
    _initializerDefineProperty(this, "_type", _descriptor19, this);

    _initializerDefineProperty(this, "_value", _descriptor20, this);

    if (typeof type === 'undefined') {
      return;
    }

    this._type = type;

    switch (type) {
      default:
        break;

      case _parametric.VariableType.FLOAT:
        this._value = 0;
        break;

      case _parametric.VariableType.INTEGER:
        this._value = 0.0;
        break;

      case _parametric.VariableType.BOOLEAN:
      case _parametric.VariableType.TRIGGER:
        this._value = false;
        break;
    }
  }

  get type() {
    return this._type;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (_internal253Aconstants.DEBUG) {
      switch (this._type) {
        default:
          break;

        case _parametric.VariableType.FLOAT:
          (0, _asserts.assertIsTrue)(typeof value === 'number');
          break;

        case _parametric.VariableType.INTEGER:
          (0, _asserts.assertIsTrue)(Number.isInteger(value));
          break;

        case _parametric.VariableType.BOOLEAN:
          (0, _asserts.assertIsTrue)(typeof value === 'boolean');
          break;
      }
    }

    this._value = value;
  }

}, _temp6), (_descriptor19 = _applyDecoratedDescriptor(_class17.prototype, "_type", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _parametric.VariableType.FLOAT;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class17.prototype, "_value", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.0;
  }
})), _class17)) || _class16);
exports.Variable = Variable;
let AnimationGraph = (_dec7 = (0, _index.ccclass)('cc.animation.AnimationGraph'), _dec7(_class19 = (_class20 = (_temp7 = class AnimationGraph extends _index2.Asset {
  constructor() {
    super();

    _initializerDefineProperty(this, "_layers", _descriptor21, this);

    _initializerDefineProperty(this, "_variables", _descriptor22, this);
  }

  onLoaded() {
    const {
      _layers: layers
    } = this;
    const nLayers = layers.length;

    for (let iLayer = 0; iLayer < nLayers; ++iLayer) {
      const layer = layers[iLayer];

      layer.stateMachine.__callOnAfterDeserializeRecursive();
    }
  }

  get layers() {
    return this._layers;
  }

  get variables() {
    return Object.entries(this._variables);
  }
  /**
   * Adds a layer.
   * @returns The new layer.
   */


  addLayer() {
    const layer = new Layer();

    this._layers.push(layer);

    return layer;
  }
  /**
   * Removes a layer.
   * @param index Index to the layer to remove.
   */


  removeLayer(index) {
    _js.array.removeAt(this._layers, index);
  }
  /**
   * Adjusts the layer's order.
   * @param index
   * @param newIndex
   */


  moveLayer(index, newIndex) {
    (0, _move.move)(this._layers, index, newIndex);
  }

  addVariable(name, type, value) {
    const variable = new Variable(type);

    if (typeof value !== 'undefined') {
      variable.value = value;
    }

    this._variables[name] = variable;
  }

  removeVariable(name) {
    delete this._variables[name];
  }

  getVariable(name) {
    return this._variables[name];
  }

}, _temp7), (_descriptor21 = _applyDecoratedDescriptor(_class20.prototype, "_layers", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor22 = _applyDecoratedDescriptor(_class20.prototype, "_variables", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
})), _class20)) || _class19);
exports.AnimationGraph = AnimationGraph;
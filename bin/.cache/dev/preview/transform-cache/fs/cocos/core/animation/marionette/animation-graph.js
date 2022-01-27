System.register("q-bundled:///fs/cocos/core/animation/marionette/animation-graph.js", ["../../data/decorators/index.js", "../../../../../virtual/internal%253Aconstants.js", "../../utils/array.js", "../../data/utils/asserts.js", "../../assets/index.js", "./ownership.js", "./errors.js", "./create-eval.js", "./motion-state.js", "./state.js", "../../data/editor-extendable.js", "../../utils/js.js", "../../algorithm/move.js", "../../data/deserialize-symbols.js", "../define.js", "./parametric.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, DEBUG, _remove, removeIf, assertIsNonNullable, assertIsTrue, Asset, assertsOwnedBy, own, markAsDangling, ownerSymbol, InvalidTransitionError, createEval, MotionState, State, outgoingsSymbol, incomingsSymbol, InteractiveState, EditorExtendable, array, move, onAfterDeserializedTag, CLASS_NAME_PREFIX_ANIM, VariableType, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _dec2, _class4, _class5, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp2, _dec3, _class7, _class8, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp3, _dec4, _class10, _class11, _descriptor13, _temp4, _dec5, _class13, _class14, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _temp5, _dec6, _class16, _class17, _descriptor19, _descriptor20, _temp6, _dec7, _class19, _class20, _descriptor21, _descriptor22, _temp7, Transition, AnimationTransition, StateMachine, SubStateMachine, Layer, LayerBlending, Variable, AnimationGraph;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function isAnimationTransition(transition) {
    return transition instanceof AnimationTransition;
  }

  _export({
    isAnimationTransition: isAnimationTransition,
    LayerBlending: void 0
  });

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
    }, function (_utilsArrayJs) {
      _remove = _utilsArrayJs.remove;
      removeIf = _utilsArrayJs.removeIf;
    }, function (_dataUtilsAssertsJs) {
      assertIsNonNullable = _dataUtilsAssertsJs.assertIsNonNullable;
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }, function (_assetsIndexJs) {
      Asset = _assetsIndexJs.Asset;
    }, function (_ownershipJs) {
      assertsOwnedBy = _ownershipJs.assertsOwnedBy;
      own = _ownershipJs.own;
      markAsDangling = _ownershipJs.markAsDangling;
      ownerSymbol = _ownershipJs.ownerSymbol;
    }, function (_errorsJs) {
      InvalidTransitionError = _errorsJs.InvalidTransitionError;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_motionStateJs) {
      MotionState = _motionStateJs.MotionState;
    }, function (_stateJs) {
      State = _stateJs.State;
      outgoingsSymbol = _stateJs.outgoingsSymbol;
      incomingsSymbol = _stateJs.incomingsSymbol;
      InteractiveState = _stateJs.InteractiveState;
    }, function (_dataEditorExtendableJs) {
      EditorExtendable = _dataEditorExtendableJs.EditorExtendable;
    }, function (_utilsJsJs) {
      array = _utilsJsJs.array;
    }, function (_algorithmMoveJs) {
      move = _algorithmMoveJs.move;
    }, function (_dataDeserializeSymbolsJs) {
      onAfterDeserializedTag = _dataDeserializeSymbolsJs.onAfterDeserializedTag;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_parametricJs) {
      VariableType = _parametricJs.VariableType;
    }],
    execute: function () {
      _export("State", State);

      Transition = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "Transition"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_EditorExtendable) {
        _inheritsLoose(Transition, _EditorExtendable);

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
        function Transition(from, to, conditions) {
          var _this;

          _this = _EditorExtendable.call(this) || this;

          _initializerDefineProperty(_this, "from", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "to", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "conditions", _descriptor3, _assertThisInitialized(_this));

          _this[ownerSymbol] = void 0;
          _this.from = from;
          _this.to = to;

          if (conditions) {
            _this.conditions = conditions;
          }

          return _this;
        }

        return Transition;
      }(EditorExtendable), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "from", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "to", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "conditions", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class);
      AnimationTransition = (_dec2 = ccclass(CLASS_NAME_PREFIX_ANIM + "AnimationTransition"), _dec2(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function (_Transition) {
        _inheritsLoose(AnimationTransition, _Transition);

        function AnimationTransition() {
          var _this2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this2 = _Transition.call.apply(_Transition, [this].concat(args)) || this;

          _initializerDefineProperty(_this2, "duration", _descriptor4, _assertThisInitialized(_this2));

          _initializerDefineProperty(_this2, "relativeDuration", _descriptor5, _assertThisInitialized(_this2));

          _initializerDefineProperty(_this2, "exitConditionEnabled", _descriptor6, _assertThisInitialized(_this2));

          _initializerDefineProperty(_this2, "_exitCondition", _descriptor7, _assertThisInitialized(_this2));

          return _this2;
        }

        _createClass(AnimationTransition, [{
          key: "exitCondition",
          get: function get() {
            return this._exitCondition;
          },
          set: function set(value) {
            assertIsTrue(value >= 0.0);
            this._exitCondition = value;
          }
        }]);

        return AnimationTransition;
      }(Transition), _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "duration", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "relativeDuration", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "exitConditionEnabled", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_exitCondition", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      })), _class5)) || _class4);

      _export("StateMachine", StateMachine = (_dec3 = ccclass('cc.animation.StateMachine'), _dec3(_class7 = (_class8 = (_temp3 = /*#__PURE__*/function (_EditorExtendable2) {
        _inheritsLoose(StateMachine, _EditorExtendable2);

        var _proto = StateMachine.prototype;

        /**
         * // TODO: HACK
         * @internal
         */
        _proto.__callOnAfterDeserializeRecursive = function __callOnAfterDeserializeRecursive() {
          this[onAfterDeserializedTag]();
          var nStates = this._states.length;

          for (var iState = 0; iState < nStates; ++iState) {
            var state = this._states[iState];

            if (state instanceof SubStateMachine) {
              state.stateMachine.__callOnAfterDeserializeRecursive();
            }
          }
        }
        /**
         * @internal
         */
        ;

        function StateMachine() {
          var _this3;

          _this3 = _EditorExtendable2.call(this) || this;

          _initializerDefineProperty(_this3, "_states", _descriptor8, _assertThisInitialized(_this3));

          _initializerDefineProperty(_this3, "_transitions", _descriptor9, _assertThisInitialized(_this3));

          _initializerDefineProperty(_this3, "_entryState", _descriptor10, _assertThisInitialized(_this3));

          _initializerDefineProperty(_this3, "_exitState", _descriptor11, _assertThisInitialized(_this3));

          _initializerDefineProperty(_this3, "_anyState", _descriptor12, _assertThisInitialized(_this3));

          _this3._entryState = _this3._addState(new State());
          _this3._entryState.name = 'Entry';
          _this3._exitState = _this3._addState(new State());
          _this3._exitState.name = 'Exit';
          _this3._anyState = _this3._addState(new State());
          _this3._anyState.name = 'Any';
          return _this3;
        }

        _proto[onAfterDeserializedTag] = function () {
          var _this4 = this;

          this._states.forEach(function (state) {
            return own(state, _this4);
          });

          this._transitions.forEach(function (transition) {
            transition.from[outgoingsSymbol].push(transition);
            transition.to[incomingsSymbol].push(transition);
          });
        };

        _proto[createEval] = function (context) {
          throw new Error('Method not implemented.');
        }
        /**
         * The entry state.
         */
        ;

        /**
         * Gets an iterator to all states within this graph.
         * @returns The iterator.
         */
        _proto.states = function states() {
          return this._states;
        }
        /**
         * Gets an iterator to all transitions within this graph.
         * @returns The iterator.
         */
        ;

        _proto.transitions = function transitions() {
          return this._transitions;
        }
        /**
         * Gets the transitions between specified states.
         * @param from Transition source.
         * @param to Transition target.
         * @returns Iterator to the transitions
         */
        ;

        _proto.getTransitionsBetween = function getTransitionsBetween(from, to) {
          assertsOwnedBy(from, this);
          assertsOwnedBy(to, this);
          return from[outgoingsSymbol].filter(function (transition) {
            return transition.to === to;
          });
        }
        /**
         * Gets all outgoing transitions of specified state.
         * @param to The state.
         * @returns Result transitions.
         */
        ;

        _proto.getOutgoings = function getOutgoings(from) {
          assertsOwnedBy(from, this);
          return from[outgoingsSymbol];
        }
        /**
         * Gets all incoming transitions of specified state.
         * @param to The state.
         * @returns Result transitions.
         */
        ;

        _proto.getIncomings = function getIncomings(to) {
          assertsOwnedBy(to, this);
          return to[incomingsSymbol];
        }
        /**
         * Adds a motion state into this state machine.
         * @returns The newly created motion.
         */
        ;

        _proto.addMotion = function addMotion() {
          return this._addState(new MotionState());
        }
        /**
         * Adds a sub state machine into this state machine.
         * @returns The newly created state machine.
         */
        ;

        _proto.addSubStateMachine = function addSubStateMachine() {
          return this._addState(new SubStateMachine());
        }
        /**
         * Removes specified state from this state machine.
         * @param state The state to remove.
         */
        ;

        _proto.remove = function remove(state) {
          assertsOwnedBy(state, this);

          if (state === this.entryState || state === this.exitState || state === this.anyState) {
            return;
          }

          this.eraseTransitionsIncludes(state);

          _remove(this._states, state);

          markAsDangling(state);
        }
        /**
         * Connect two states.
         * @param from Source state.
         * @param to Target state.
         * @param condition The transition condition.
         */
        ;

        _proto.connect = function connect(from, to, conditions) {
          assertsOwnedBy(from, this);
          assertsOwnedBy(to, this);

          if (to === this.entryState) {
            throw new InvalidTransitionError('to-entry');
          }

          if (to === this.anyState) {
            throw new InvalidTransitionError('to-any');
          }

          if (from === this.exitState) {
            throw new InvalidTransitionError('from-exit');
          }

          var transition = from instanceof MotionState || from === this._anyState ? new AnimationTransition(from, to, conditions) : new Transition(from, to, conditions);
          own(transition, this);

          this._transitions.push(transition);

          from[outgoingsSymbol].push(transition);
          to[incomingsSymbol].push(transition);
          return transition;
        };

        _proto.disconnect = function disconnect(from, to) {
          assertsOwnedBy(from, this);
          assertsOwnedBy(to, this);
          var oTransitions = from[outgoingsSymbol];
          var iTransitions = to[incomingsSymbol];
          var transitions = this._transitions;
          var oTransitionsToRemove = oTransitions.filter(function (oTransition) {
            return oTransition.to === to;
          });
          var nOTransitionToRemove = oTransitionsToRemove.length;

          var _loop = function _loop(iOTransitionToRemove) {
            var oTransition = oTransitionsToRemove[iOTransitionToRemove];

            _remove(oTransitions, oTransition);

            assertIsTrue(_remove(transitions, oTransition));
            assertIsNonNullable(removeIf(iTransitions, function (transition) {
              return transition === oTransition;
            }));
            markAsDangling(oTransition);
          };

          for (var iOTransitionToRemove = 0; iOTransitionToRemove < nOTransitionToRemove; ++iOTransitionToRemove) {
            _loop(iOTransitionToRemove);
          }
        };

        _proto.removeTransition = function removeTransition(removal) {
          assertIsTrue(_remove(this._transitions, removal));
          assertIsNonNullable(removeIf(removal.from[outgoingsSymbol], function (transition) {
            return transition === removal;
          }));
          assertIsNonNullable(removeIf(removal.to[incomingsSymbol], function (transition) {
            return transition === removal;
          }));
          markAsDangling(removal);
        };

        _proto.eraseOutgoings = function eraseOutgoings(from) {
          var _this5 = this;

          assertsOwnedBy(from, this);
          var oTransitions = from[outgoingsSymbol];

          var _loop2 = function _loop2(iOTransition) {
            var oTransition = oTransitions[iOTransition];
            var to = oTransition.to;
            assertIsTrue(_remove(_this5._transitions, oTransition));
            assertIsNonNullable(removeIf(to[incomingsSymbol], function (transition) {
              return transition === oTransition;
            }));
            markAsDangling(oTransition);
          };

          for (var iOTransition = 0; iOTransition < oTransitions.length; ++iOTransition) {
            _loop2(iOTransition);
          }

          oTransitions.length = 0;
        };

        _proto.eraseIncomings = function eraseIncomings(to) {
          var _this6 = this;

          assertsOwnedBy(to, this);
          var iTransitions = to[incomingsSymbol];

          var _loop3 = function _loop3(iITransition) {
            var iTransition = iTransitions[iITransition];
            var from = iTransition.from;
            assertIsTrue(_remove(_this6._transitions, iTransition));
            assertIsNonNullable(removeIf(from[outgoingsSymbol], function (transition) {
              return transition === iTransition;
            }));
            markAsDangling(iTransition);
          };

          for (var iITransition = 0; iITransition < iTransitions.length; ++iITransition) {
            _loop3(iITransition);
          }

          iTransitions.length = 0;
        };

        _proto.eraseTransitionsIncludes = function eraseTransitionsIncludes(state) {
          this.eraseIncomings(state);
          this.eraseOutgoings(state);
        };

        _proto.clone = function clone() {
          var that = new StateMachine();
          var stateMap = new Map();

          for (var _iterator = _createForOfIteratorHelperLoose(this._states), _step; !(_step = _iterator()).done;) {
            var state = _step.value;

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
                if (state instanceof MotionState || state instanceof SubStateMachine) {
                  var thatState = state.clone();

                  that._addState(thatState);

                  stateMap.set(state, thatState);
                } else {
                  assertIsTrue(false);
                }

                break;
            }
          }

          for (var _iterator2 = _createForOfIteratorHelperLoose(this._transitions), _step2; !(_step2 = _iterator2()).done;) {
            var transition = _step2.value;
            var thatFrom = stateMap.get(transition.from);
            var thatTo = stateMap.get(transition.to);
            assertIsTrue(thatFrom && thatTo);
            var thatTransition = that.connect(thatFrom, thatTo);
            thatTransition.conditions = transition.conditions.map(function (condition) {
              return condition.clone();
            });

            if (thatTransition instanceof AnimationTransition) {
              assertIsTrue(transition instanceof AnimationTransition);
              thatTransition.duration = transition.duration;
              thatTransition.exitConditionEnabled = transition.exitConditionEnabled;
              thatTransition.exitCondition = transition.exitCondition;
            }
          }

          return that;
        };

        _proto._addState = function _addState(state) {
          own(state, this);

          this._states.push(state);

          return state;
        };

        _createClass(StateMachine, [{
          key: "entryState",
          get: function get() {
            return this._entryState;
          }
          /**
           * The exit state.
           */

        }, {
          key: "exitState",
          get: function get() {
            return this._exitState;
          }
          /**
           * The any state.
           */

        }, {
          key: "anyState",
          get: function get() {
            return this._anyState;
          }
        }]);

        return StateMachine;
      }(EditorExtendable), _temp3), (_descriptor8 = _applyDecoratedDescriptor(_class8.prototype, "_states", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class8.prototype, "_transitions", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class8.prototype, "_entryState", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class8.prototype, "_exitState", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class8.prototype, "_anyState", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class8)) || _class7));

      _export("SubStateMachine", SubStateMachine = (_dec4 = ccclass('cc.animation.SubStateMachine'), _dec4(_class10 = (_class11 = (_temp4 = /*#__PURE__*/function (_InteractiveState) {
        _inheritsLoose(SubStateMachine, _InteractiveState);

        function SubStateMachine() {
          var _this7;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this7 = _InteractiveState.call.apply(_InteractiveState, [this].concat(args)) || this;

          _initializerDefineProperty(_this7, "_stateMachine", _descriptor13, _assertThisInitialized(_this7));

          return _this7;
        }

        var _proto2 = SubStateMachine.prototype;

        _proto2.clone = function clone() {
          var that = new SubStateMachine();
          that._stateMachine = this._stateMachine.clone();
          return that;
        };

        _createClass(SubStateMachine, [{
          key: "stateMachine",
          get: function get() {
            return this._stateMachine;
          }
        }]);

        return SubStateMachine;
      }(InteractiveState), _temp4), (_descriptor13 = _applyDecoratedDescriptor(_class11.prototype, "_stateMachine", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new StateMachine();
        }
      })), _class11)) || _class10));

      _export("Layer", Layer = (_dec5 = ccclass('cc.animation.Layer'), _dec5(_class13 = (_class14 = (_temp5 = /*#__PURE__*/function () {
        /**
         * @internal
         */
        function Layer() {
          this[ownerSymbol] = void 0;

          _initializerDefineProperty(this, "_stateMachine", _descriptor14, this);

          _initializerDefineProperty(this, "name", _descriptor15, this);

          _initializerDefineProperty(this, "weight", _descriptor16, this);

          _initializerDefineProperty(this, "mask", _descriptor17, this);

          _initializerDefineProperty(this, "blending", _descriptor18, this);

          this._stateMachine = new StateMachine();
        }

        _createClass(Layer, [{
          key: "stateMachine",
          get: function get() {
            return this._stateMachine;
          }
        }]);

        return Layer;
      }(), _temp5), (_descriptor14 = _applyDecoratedDescriptor(_class14.prototype, "_stateMachine", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class14.prototype, "name", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class14.prototype, "weight", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class14.prototype, "mask", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class14.prototype, "blending", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return LayerBlending.additive;
        }
      })), _class14)) || _class13));

      (function (LayerBlending) {
        LayerBlending[LayerBlending["override"] = 0] = "override";
        LayerBlending[LayerBlending["additive"] = 1] = "additive";
      })(LayerBlending || _export("LayerBlending", LayerBlending = {}));

      _export("Variable", Variable = (_dec6 = ccclass('cc.animation.Variable'), _dec6(_class16 = (_class17 = (_temp6 = /*#__PURE__*/function () {
        // TODO: we should not specify type here but due to de-serialization limitation
        // See: https://github.com/cocos-creator/3d-tasks/issues/7909
        // Same as `_type`
        function Variable(type) {
          _initializerDefineProperty(this, "_type", _descriptor19, this);

          _initializerDefineProperty(this, "_value", _descriptor20, this);

          if (typeof type === 'undefined') {
            return;
          }

          this._type = type;

          switch (type) {
            default:
              break;

            case VariableType.FLOAT:
              this._value = 0;
              break;

            case VariableType.INTEGER:
              this._value = 0.0;
              break;

            case VariableType.BOOLEAN:
            case VariableType.TRIGGER:
              this._value = false;
              break;
          }
        }

        _createClass(Variable, [{
          key: "type",
          get: function get() {
            return this._type;
          }
        }, {
          key: "value",
          get: function get() {
            return this._value;
          },
          set: function set(value) {
            if (DEBUG) {
              switch (this._type) {
                default:
                  break;

                case VariableType.FLOAT:
                  assertIsTrue(typeof value === 'number');
                  break;

                case VariableType.INTEGER:
                  assertIsTrue(Number.isInteger(value));
                  break;

                case VariableType.BOOLEAN:
                  assertIsTrue(typeof value === 'boolean');
                  break;
              }
            }

            this._value = value;
          }
        }]);

        return Variable;
      }(), _temp6), (_descriptor19 = _applyDecoratedDescriptor(_class17.prototype, "_type", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return VariableType.FLOAT;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class17.prototype, "_value", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      })), _class17)) || _class16));

      _export("AnimationGraph", AnimationGraph = (_dec7 = ccclass('cc.animation.AnimationGraph'), _dec7(_class19 = (_class20 = (_temp7 = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(AnimationGraph, _Asset);

        function AnimationGraph() {
          var _this8;

          _this8 = _Asset.call(this) || this;

          _initializerDefineProperty(_this8, "_layers", _descriptor21, _assertThisInitialized(_this8));

          _initializerDefineProperty(_this8, "_variables", _descriptor22, _assertThisInitialized(_this8));

          return _this8;
        }

        var _proto3 = AnimationGraph.prototype;

        _proto3.onLoaded = function onLoaded() {
          var layers = this._layers;
          var nLayers = layers.length;

          for (var iLayer = 0; iLayer < nLayers; ++iLayer) {
            var layer = layers[iLayer];

            layer.stateMachine.__callOnAfterDeserializeRecursive();
          }
        };

        /**
         * Adds a layer.
         * @returns The new layer.
         */
        _proto3.addLayer = function addLayer() {
          var layer = new Layer();

          this._layers.push(layer);

          return layer;
        }
        /**
         * Removes a layer.
         * @param index Index to the layer to remove.
         */
        ;

        _proto3.removeLayer = function removeLayer(index) {
          array.removeAt(this._layers, index);
        }
        /**
         * Adjusts the layer's order.
         * @param index
         * @param newIndex
         */
        ;

        _proto3.moveLayer = function moveLayer(index, newIndex) {
          move(this._layers, index, newIndex);
        };

        _proto3.addVariable = function addVariable(name, type, value) {
          var variable = new Variable(type);

          if (typeof value !== 'undefined') {
            variable.value = value;
          }

          this._variables[name] = variable;
        };

        _proto3.removeVariable = function removeVariable(name) {
          delete this._variables[name];
        };

        _proto3.getVariable = function getVariable(name) {
          return this._variables[name];
        };

        _createClass(AnimationGraph, [{
          key: "layers",
          get: function get() {
            return this._layers;
          }
        }, {
          key: "variables",
          get: function get() {
            return Object.entries(this._variables);
          }
        }]);

        return AnimationGraph;
      }(Asset), _temp7), (_descriptor21 = _applyDecoratedDescriptor(_class20.prototype, "_layers", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class20.prototype, "_variables", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return {};
        }
      })), _class20)) || _class19));
    }
  };
});
System.register("q-bundled:///fs/cocos/core/animation/marionette/state.js", ["../../data/decorators/index.js", "./ownership.js", "../../data/editor-extendable.js", "../define.js", "../../utils/array.js", "../../data/instantiate.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, ownerSymbol, EditorExtendable, CLASS_NAME_PREFIX_ANIM, remove, instantiate, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _temp2, outgoingsSymbol, incomingsSymbol, State, InteractiveState;

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
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_ownershipJs) {
      ownerSymbol = _ownershipJs.ownerSymbol;
    }, function (_dataEditorExtendableJs) {
      EditorExtendable = _dataEditorExtendableJs.EditorExtendable;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_utilsArrayJs) {
      remove = _utilsArrayJs.remove;
    }, function (_dataInstantiateJs) {
      instantiate = _dataInstantiateJs.instantiate;
    }],
    execute: function () {
      _export("outgoingsSymbol", outgoingsSymbol = Symbol('[[Outgoing transitions]]'));

      _export("incomingsSymbol", incomingsSymbol = Symbol('[[Incoming transitions]]'));

      _export("State", State = (_dec = ccclass('cc.animation.State'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_EditorExtendable) {
        _inheritsLoose(State, _EditorExtendable);

        /**
         * @internal
         */
        function State() {
          var _this;

          _this = _EditorExtendable.call(this) || this;

          _initializerDefineProperty(_this, "name", _descriptor, _assertThisInitialized(_this));

          _this[outgoingsSymbol] = [];
          _this[incomingsSymbol] = [];
          return _this;
        }

        return State;
      }(EditorExtendable), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "name", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class));

      _export("InteractiveState", InteractiveState = (_dec2 = ccclass(CLASS_NAME_PREFIX_ANIM + "InteractiveState"), _dec2(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function (_State) {
        _inheritsLoose(InteractiveState, _State);

        function InteractiveState() {
          var _this2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this2 = _State.call.apply(_State, [this].concat(args)) || this;

          _initializerDefineProperty(_this2, "_components", _descriptor2, _assertThisInitialized(_this2));

          return _this2;
        }

        var _proto = InteractiveState.prototype;

        _proto.addComponent = function addComponent(constructor) {
          var component = new constructor();

          this._components.push(component);

          return component;
        };

        _proto.removeComponent = function removeComponent(component) {
          remove(this._components, component);
        };

        _proto.instantiateComponents = function instantiateComponents() {
          var instantiatedComponents = this._components.map(function (component) {
            // @ts-expect-error Typing
            var instantiated = instantiate(component, true);
            return instantiated;
          });

          return instantiatedComponents;
        };

        _createClass(InteractiveState, [{
          key: "components",
          get: function get() {
            return this._components;
          }
        }]);

        return InteractiveState;
      }(State), _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "_components", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class5)) || _class4));
    }
  };
});
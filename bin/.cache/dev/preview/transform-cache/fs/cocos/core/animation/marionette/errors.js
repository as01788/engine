System.register("q-bundled:///fs/cocos/core/animation/marionette/errors.js", [], function (_export, _context) {
  "use strict";

  var InvalidTransitionError, VariableNotDefinedError, VariableTypeMismatchedError;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

  function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  return {
    setters: [],
    execute: function () {
      _export("InvalidTransitionError", InvalidTransitionError = /*#__PURE__*/function (_Error) {
        _inheritsLoose(InvalidTransitionError, _Error);

        function InvalidTransitionError(type) {
          var _this;

          _this = _Error.call(this, type + " transition is invalid") || this;
          _this.name = 'TransitionRejectError';
          return _this;
        }

        return InvalidTransitionError;
      }( /*#__PURE__*/_wrapNativeSuper(Error)));

      _export("VariableNotDefinedError", VariableNotDefinedError = /*#__PURE__*/function (_Error2) {
        _inheritsLoose(VariableNotDefinedError, _Error2);

        function VariableNotDefinedError(name) {
          return _Error2.call(this, "Graph variable " + name + " is not defined") || this;
        }

        return VariableNotDefinedError;
      }( /*#__PURE__*/_wrapNativeSuper(Error)));

      _export("VariableTypeMismatchedError", VariableTypeMismatchedError = /*#__PURE__*/function (_Error3) {
        _inheritsLoose(VariableTypeMismatchedError, _Error3);

        function VariableTypeMismatchedError(name, expected, received) {
          return _Error3.call(this, "Expect graph variable " + name + " to have type '" + expected + "' instead of received '" + (received !== null && received !== void 0 ? received : typeof received) + "'") || this;
        }

        return VariableTypeMismatchedError;
      }( /*#__PURE__*/_wrapNativeSuper(Error)));
    }
  };
});
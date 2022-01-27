System.register("q-bundled:///fs/cocos/core/math/math-base.js", ["../../../../virtual/internal%253Aconstants.js", "../value-types/value-type.js"], function (_export, _context) {
  "use strict";

  var JSB, ValueType, MATH_FLOAT_ARRAY, MathBase;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_valueTypesValueTypeJs) {
      ValueType = _valueTypesValueTypeJs.ValueType;
    }],
    execute: function () {
      _export("MATH_FLOAT_ARRAY", MATH_FLOAT_ARRAY = JSB ? Float32Array : Float64Array);

      _export("MathBase", MathBase = /*#__PURE__*/function (_ValueType) {
        _inheritsLoose(MathBase, _ValueType);

        function MathBase() {
          return _ValueType.apply(this, arguments) || this;
        }

        MathBase.createFloatArray = function createFloatArray(size) {
          return new MATH_FLOAT_ARRAY(size);
        }
        /**
         * @en Get the internal array data.
         * @zh 获取内部 array 数据。
         */
        ;

        _createClass(MathBase, [{
          key: "array",
          get: function get() {
            return this._array;
          }
        }]);

        return MathBase;
      }(ValueType));
    }
  };
});
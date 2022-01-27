System.register("q-bundled:///fs/cocos/core/data/custom-serializable.js", ["./utils/asserts.js"], function (_export, _context) {
  "use strict";

  var assertIsNonNullable, assertIsTrue, serializeTag, deserializeTag, enableIfCCON;

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  return {
    setters: [function (_utilsAssertsJs) {
      assertIsNonNullable = _utilsAssertsJs.assertIsNonNullable;
      assertIsTrue = _utilsAssertsJs.assertIsTrue;
    }],
    execute: function () {
      /**
       * Tag to define the custom serialization method.
       * @internal
       */
      _export("serializeTag", serializeTag = Symbol('[[Serialize]]'));
      /**
       * Tag to define the custom deserialization method.
       * @internal
       */


      _export("deserializeTag", deserializeTag = Symbol('[[Deserialize]]'));

      /**
       * Enables the custom serialize/deserialize method only if the (de)serialize procedure is targeting CCON.
       * @internal
       */
      _export("enableIfCCON", enableIfCCON = function enableIfCCON(_target, propertyKey, descriptor) {
        var original = descriptor.value;
        assertIsNonNullable(original);

        if (propertyKey === serializeTag) {
          return _extends({}, descriptor, {
            value: function wrapSerialize(output, context) {
              if (!context.toCCON) {
                output.writeThis();
              } else {
                original.call(this, output, context);
              }
            }
          });
        } else {
          assertIsTrue(propertyKey === deserializeTag, '@enableIfCCON should be only applied to custom (de)serialize method');
          return _extends({}, descriptor, {
            value: function wrapDeserialize(input, context) {
              if (!context.fromCCON) {
                input.readThis();
              } else {
                original.call(this, input, context);
              }
            }
          });
        }
      });
    }
  };
});
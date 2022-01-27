"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableIfCCON = exports.deserializeTag = exports.serializeTag = void 0;

var _asserts = require("./utils/asserts.js");

/**
 * Tag to define the custom serialization method.
 * @internal
 */
const serializeTag = Symbol('[[Serialize]]');
/**
 * Tag to define the custom deserialization method.
 * @internal
 */

exports.serializeTag = serializeTag;
const deserializeTag = Symbol('[[Deserialize]]');
exports.deserializeTag = deserializeTag;

/**
 * Enables the custom serialize/deserialize method only if the (de)serialize procedure is targeting CCON.
 * @internal
 */
const enableIfCCON = (_target, propertyKey, descriptor) => {
  const original = descriptor.value;
  (0, _asserts.assertIsNonNullable)(original);

  if (propertyKey === serializeTag) {
    return { ...descriptor,
      value: function wrapSerialize(output, context) {
        if (!context.toCCON) {
          output.writeThis();
        } else {
          original.call(this, output, context);
        }
      }
    };
  } else {
    (0, _asserts.assertIsTrue)(propertyKey === deserializeTag, '@enableIfCCON should be only applied to custom (de)serialize method');
    return { ...descriptor,
      value: function wrapDeserialize(input, context) {
        if (!context.fromCCON) {
          input.readThis();
        } else {
          original.call(this, input, context);
        }
      }
    };
  }
};

exports.enableIfCCON = enableIfCCON;
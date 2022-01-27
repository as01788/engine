"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MathBase = exports.MATH_FLOAT_ARRAY = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _valueType = require("../value-types/value-type.js");

const MATH_FLOAT_ARRAY = _internal253Aconstants.JSB ? Float32Array : Float64Array;
exports.MATH_FLOAT_ARRAY = MATH_FLOAT_ARRAY;

class MathBase extends _valueType.ValueType {
  static createFloatArray(size) {
    return new MATH_FLOAT_ARRAY(size);
  }
  /**
   * @en Get the internal array data.
   * @zh 获取内部 array 数据。
   */


  get array() {
    return this._array;
  }

}

exports.MathBase = MathBase;
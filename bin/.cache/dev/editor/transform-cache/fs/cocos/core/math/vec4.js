"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.v4 = v4;
exports.Vec4 = void 0;

var _class = require("../data/class.js");

var _valueType = require("../value-types/value-type.js");

var _utils = require("./utils.js");

var _globalExports = require("../global-exports.js");

/*
 Copyright (c) 2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @packageDocumentation
 * @module core/math
 */

/**
 * @en Representation of four-dimensional vectors.
 * @zh 四维向量。
 */
class Vec4 extends _valueType.ValueType {
  /**
   * @en Obtains a clone of the given vector object
   * @zh 获得指定向量的拷贝
   */
  static clone(a) {
    return new Vec4(a.x, a.y, a.z, a.w);
  }
  /**
   * @en Copy the target vector and save the results to out vector object
   * @zh 复制目标向量
   */


  static copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    out.w = a.w;
    return out;
  }
  /**
   * @en Sets the out vector with the given x, y, z and w values
   * @zh 设置向量值
   */


  static set(out, x, y, z, w) {
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
  }
  /**
   * @en Element-wise vector addition and save the results to out vector object
   * @zh 逐元素向量加法
   */


  static add(out, a, b) {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    out.z = a.z + b.z;
    out.w = a.w + b.w;
    return out;
  }
  /**
   * @en Element-wise vector subtraction and save the results to out vector object
   * @zh 逐元素向量减法
   */


  static subtract(out, a, b) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    out.z = a.z - b.z;
    out.w = a.w - b.w;
    return out;
  }
  /**
   * @en Element-wise vector multiplication and save the results to out vector object
   * @zh 逐元素向量乘法
   */


  static multiply(out, a, b) {
    out.x = a.x * b.x;
    out.y = a.y * b.y;
    out.z = a.z * b.z;
    out.w = a.w * b.w;
    return out;
  }
  /**
   * @en Element-wise vector division and save the results to out vector object
   * @zh 逐元素向量除法
   */


  static divide(out, a, b) {
    out.x = a.x / b.x;
    out.y = a.y / b.y;
    out.z = a.z / b.z;
    out.w = a.w / b.w;
    return out;
  }
  /**
   * @en Rounds up by elements of the vector and save the results to out vector object
   * @zh 逐元素向量向上取整
   */


  static ceil(out, a) {
    out.x = Math.ceil(a.x);
    out.y = Math.ceil(a.y);
    out.z = Math.ceil(a.z);
    out.w = Math.ceil(a.w);
    return out;
  }
  /**
   * @en Element-wise rounds down of the current vector and save the results to the out vector
   * @zh 逐元素向量向下取整
   */


  static floor(out, a) {
    out.x = Math.floor(a.x);
    out.y = Math.floor(a.y);
    out.z = Math.floor(a.z);
    out.w = Math.floor(a.w);
    return out;
  }
  /**
   * @en Calculates the minimum values by elements of the vector and save the results to the out vector
   * @zh 逐元素向量最小值
   */


  static min(out, a, b) {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    out.z = Math.min(a.z, b.z);
    out.w = Math.min(a.w, b.w);
    return out;
  }
  /**
   * @en Calculates the maximum values by elements of the vector and save the results to the out vector
   * @zh 逐元素向量最大值
   */


  static max(out, a, b) {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    out.z = Math.max(a.z, b.z);
    out.w = Math.max(a.w, b.w);
    return out;
  }
  /**
   * @en Calculates element-wise round results and save to the out vector
   * @zh 逐元素向量四舍五入取整
   */


  static round(out, a) {
    out.x = Math.round(a.x);
    out.y = Math.round(a.y);
    out.z = Math.round(a.z);
    out.w = Math.round(a.w);
    return out;
  }
  /**
   * @en Vector scalar multiplication and save the results to out vector object
   * @zh 向量标量乘法
   */


  static multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    out.z = a.z * b;
    out.w = a.w * b;
    return out;
  }
  /**
   * @en Element-wise multiplication and addition with the equation: a + b * scale
   * @zh 逐元素向量乘加: A + B * scale
   */


  static scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    out.z = a.z + b.z * scale;
    out.w = a.w + b.w * scale;
    return out;
  }
  /**
   * @en Calculates the euclidean distance of two vectors
   * @zh 求两向量的欧氏距离
   */


  static distance(a, b) {
    const x = b.x - a.x;
    const y = b.y - a.y;
    const z = b.z - a.z;
    const w = b.w - a.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  /**
   * @en Calculates the squared euclidean distance of two vectors
   * @zh 求两向量的欧氏距离平方
   */


  static squaredDistance(a, b) {
    const x = b.x - a.x;
    const y = b.y - a.y;
    const z = b.z - a.z;
    const w = b.w - a.w;
    return x * x + y * y + z * z + w * w;
  }
  /**
   * @en Calculates the length of the vector
   * @zh 求向量长度
   */


  static len(a) {
    const x = a.x;
    const y = a.y;
    const z = a.z;
    const w = a.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  /**
   * @en Calculates the squared length of the vector
   * @zh 求向量长度平方
   */


  static lengthSqr(a) {
    const x = a.x;
    const y = a.y;
    const z = a.z;
    const w = a.w;
    return x * x + y * y + z * z + w * w;
  }
  /**
   * @en Sets each element to its negative value
   * @zh 逐元素向量取负
   */


  static negate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    out.z = -a.z;
    out.w = -a.w;
    return out;
  }
  /**
   * @en Sets each element to its inverse value, zero value will become Infinity
   * @zh 逐元素向量取倒数，接近 0 时返回 Infinity
   */


  static inverse(out, a) {
    out.x = 1.0 / a.x;
    out.y = 1.0 / a.y;
    out.z = 1.0 / a.z;
    out.w = 1.0 / a.w;
    return out;
  }
  /**
   * @en Sets each element to its inverse value, zero value will remain zero
   * @zh 逐元素向量取倒数，接近 0 时返回 0
   */


  static inverseSafe(out, a) {
    const x = a.x;
    const y = a.y;
    const z = a.z;
    const w = a.w;

    if (Math.abs(x) < _utils.EPSILON) {
      out.x = 0;
    } else {
      out.x = 1.0 / x;
    }

    if (Math.abs(y) < _utils.EPSILON) {
      out.y = 0;
    } else {
      out.y = 1.0 / y;
    }

    if (Math.abs(z) < _utils.EPSILON) {
      out.z = 0;
    } else {
      out.z = 1.0 / z;
    }

    if (Math.abs(w) < _utils.EPSILON) {
      out.w = 0;
    } else {
      out.w = 1.0 / w;
    }

    return out;
  }
  /**
   * @en Sets the normalized vector to the out vector
   * @zh 归一化向量
   */


  static normalize(out, a) {
    const x = a.x;
    const y = a.y;
    const z = a.z;
    const w = a.w;
    let len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = x * len;
      out.y = y * len;
      out.z = z * len;
      out.w = w * len;
    }

    return out;
  }
  /**
   * @en Calculates the dot product of the vector
   * @zh 向量点积（数量积）
   */


  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  }
  /**
   * @en Calculates the linear interpolation between two vectors with a given ratio
   * @zh 逐元素向量线性插值： A + t * (B - A)
   */


  static lerp(out, a, b, t) {
    out.x = a.x + t * (b.x - a.x);
    out.y = a.y + t * (b.y - a.y);
    out.z = a.z + t * (b.z - a.z);
    out.w = a.w + t * (b.w - a.w);
    return out;
  }
  /**
   * @en Generates a uniformly distributed random vector points from center to the surface of the unit sphere
   * @zh 生成一个在单位球体上均匀分布的随机向量
   * @param scale vector length
   */


  static random(out, scale) {
    scale = scale || 1.0;
    const phi = (0, _utils.random)() * 2.0 * Math.PI;
    const cosTheta = (0, _utils.random)() * 2 - 1;
    const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
    out.x = sinTheta * Math.cos(phi) * scale;
    out.y = sinTheta * Math.sin(phi) * scale;
    out.z = cosTheta * scale;
    out.w = 0;
    return out;
  }
  /**
   * @en Vector and fourth order matrix multiplication
   * @zh 向量与四维矩阵乘法
   */


  static transformMat4(out, a, m) {
    const x = a.x;
    const y = a.y;
    const z = a.z;
    const w = a.w;
    out.x = m.m00 * x + m.m04 * y + m.m08 * z + m.m12 * w;
    out.y = m.m01 * x + m.m05 * y + m.m09 * z + m.m13 * w;
    out.z = m.m02 * x + m.m06 * y + m.m10 * z + m.m14 * w;
    out.w = m.m03 * x + m.m07 * y + m.m11 * z + m.m15 * w;
    return out;
  }
  /**
   * @en Transform the vector with the given affine transformation
   * @zh 向量仿射变换
   */


  static transformAffine(out, v, m) {
    const x = v.x;
    const y = v.y;
    const z = v.z;
    const w = v.w;
    out.x = m.m00 * x + m.m01 * y + m.m02 * z + m.m03 * w;
    out.y = m.m04 * x + m.m05 * y + m.m06 * z + m.m07 * w;
    out.x = m.m08 * x + m.m09 * y + m.m10 * z + m.m11 * w;
    out.w = v.w;
    return out;
  }
  /**
   * @en Vector quaternion multiplication
   * @zh 向量四元数乘法
   */


  static transformQuat(out, a, q) {
    const {
      x,
      y,
      z
    } = a;
    const _x = q.x;
    const _y = q.y;
    const _z = q.z;
    const _w = q.w; // calculate quat * vec

    const ix = _w * x + _y * z - _z * y;
    const iy = _w * y + _z * x - _x * z;
    const iz = _w * z + _x * y - _y * x;
    const iw = -_x * x - _y * y - _z * z; // calculate result * inverse quat

    out.x = ix * _w + iw * -_x + iy * -_z - iz * -_y;
    out.y = iy * _w + iw * -_y + iz * -_x - ix * -_z;
    out.z = iz * _w + iw * -_z + ix * -_y - iy * -_x;
    out.w = a.w;
    return out;
  }
  /**
   * @en Converts the given vector to an array
   * @zh 向量转数组
   * @param ofs Array Start Offset
   */


  static toArray(out, v, ofs = 0) {
    out[ofs + 0] = v.x;
    out[ofs + 1] = v.y;
    out[ofs + 2] = v.z;
    out[ofs + 3] = v.w;
    return out;
  }
  /**
   * @en Converts the given array to a vector
   * @zh 数组转向量
   * @param ofs Array Start Offset
   */


  static fromArray(out, arr, ofs = 0) {
    out.x = arr[ofs + 0];
    out.y = arr[ofs + 1];
    out.z = arr[ofs + 2];
    out.w = arr[ofs + 3];
    return out;
  }
  /**
   * @en Check the equality of the two given vectors
   * @zh 向量等价判断
   */


  static strictEquals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
  }
  /**
   * @en Check whether the two given vectors are approximately equivalent
   * @zh 排除浮点数误差的向量近似等价判断
   */


  static equals(a, b, epsilon = _utils.EPSILON) {
    return Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y)) && Math.abs(a.z - b.z) <= epsilon * Math.max(1.0, Math.abs(a.z), Math.abs(b.z)) && Math.abs(a.w - b.w) <= epsilon * Math.max(1.0, Math.abs(a.w), Math.abs(b.w));
  }
  /**
   * @en x component.
   * @zh x 分量。
   */


  constructor(x, y, z, w) {
    super();

    if (x && typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      this.w = w || 0;
    }
  }
  /**
   * @en clone the current Vec4 value.
   * @zh 克隆当前向量。
   */


  clone() {
    return new Vec4(this.x, this.y, this.z, this.w);
  }
  /**
   * @en Set the current vector value with the given vector.
   * @zh 设置当前向量使其与指定向量相等。
   * @param other Specified vector
   * @returns `this`
   */


  set(x, y, z, w) {
    if (x && typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      this.w = w || 0;
    }

    return this;
  }
  /**
   * @en Check whether the vector approximately equals another one.
   * @zh 判断当前向量是否在误差范围内与指定向量相等。
   * @param other Specified vector
   * @param epsilon The error allowed. It`s should be a non-negative number.
   * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
   */


  equals(other, epsilon = _utils.EPSILON) {
    return Math.abs(this.x - other.x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x)) && Math.abs(this.y - other.y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y)) && Math.abs(this.z - other.z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(other.z)) && Math.abs(this.w - other.w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(other.w));
  }
  /**
   * @en Check whether the vector approximately equals another one.
   * @zh 判断当前向量是否在误差范围内与指定分量的向量相等。
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   * @param z The z value of specified vector
   * @param w The w value of specified vector
   * @param epsilon The error allowed. It`s should be a non-negative number.
   * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
   */


  equals4f(x, y, z, w, epsilon = _utils.EPSILON) {
    return Math.abs(this.x - x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(x)) && Math.abs(this.y - y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(y)) && Math.abs(this.z - z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(z)) && Math.abs(this.w - w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(w));
  }
  /**
   * @en Check whether the current vector strictly equals another Vec4.
   * @zh 判断当前向量是否与指定向量相等。
   * @param other specified vector
   * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
   */


  strictEquals(other) {
    return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
  }
  /**
   * @en Check whether the current vector strictly equals another Vec4.
   * @zh 判断当前向量是否与指定分量的向量相等。
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   * @param z The z value of specified vector
   * @param w The w value of specified vector
   * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
   */


  strictEquals4f(x, y, z, w) {
    return this.x === x && this.y === y && this.z === z && this.w === w;
  }
  /**
   * @en Calculate linear interpolation result between this vector and another one with given ratio.
   * @zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
   * @param to Target vector
   * @param ratio The interpolation coefficient.The range is [0,1].
   */


  lerp(to, ratio) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
    this.x = x + ratio * (to.x - x);
    this.y = y + ratio * (to.y - y);
    this.z = z + ratio * (to.z - z);
    this.w = w + ratio * (to.w - w);
    return this;
  }
  /**
   * @en Return the information of the vector in string
   * @zh 返回当前向量的字符串表示。
   * @returns The string with vector information
   */


  toString() {
    return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)})`;
  }
  /**
   * @en Clamp the vector between minInclusive and maxInclusive.
   * @zh 设置当前向量的值，使其各个分量都处于指定的范围内。
   * @param minInclusive Minimum value allowed
   * @param maxInclusive Maximum value allowed
   * @returns `this`
   */


  clampf(minInclusive, maxInclusive) {
    this.x = (0, _utils.clamp)(this.x, minInclusive.x, maxInclusive.x);
    this.y = (0, _utils.clamp)(this.y, minInclusive.y, maxInclusive.y);
    this.z = (0, _utils.clamp)(this.z, minInclusive.z, maxInclusive.z);
    this.w = (0, _utils.clamp)(this.w, minInclusive.w, maxInclusive.w);
    return this;
  }
  /**
   * @en Adds the current vector with another one and return this
   * @zh 向量加法。将当前向量与指定向量的相加
   * @param other specified vector
   */


  add(other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    this.w += other.w;
    return this;
  }
  /**
   * @en Adds the current vector with another one and return this
   * @zh 向量加法。将当前向量与指定分量的向量相加
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   * @param z The z value of specified vector
   * @param w The w value of specified vector
   */


  add4f(x, y, z, w) {
    this.x += x;
    this.y += y;
    this.z += z;
    this.w += w;
    return this;
  }
  /**
   * @en Subtracts one vector from this, and returns this.
   * @zh 向量减法。将当前向量减去指定向量
   * @param other specified vector
   */


  subtract(other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    this.w -= other.w;
    return this;
  }
  /**
   * @en Subtracts one vector from this, and returns this.
   * @zh 向量减法。将当前向量减去指定分量的向量
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   * @param z The z value of specified vector
   * @param w The w value of specified vector
   */


  subtract4f(x, y, z, w) {
    this.x -= x;
    this.y -= y;
    this.z -= z;
    this.w -= w;
    return this;
  }
  /**
   * @en Multiplies the current vector with a number, and returns this.
   * @zh 向量数乘。将当前向量数乘指定标量
   * @param scalar scalar number
   */


  multiplyScalar(scalar) {
    if (typeof scalar === 'object') {
      console.warn('should use Vec4.multiply for vector * vector operation');
    }

    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;
    return this;
  }
  /**
   * @en Multiplies the current vector with another one and return this
   * @zh 向量乘法。将当前向量乘以指定向量
   * @param other specified vector
   */


  multiply(other) {
    if (typeof other !== 'object') {
      console.warn('should use Vec4.scale for vector * scalar operation');
    }

    this.x *= other.x;
    this.y *= other.y;
    this.z *= other.z;
    this.w *= other.w;
    return this;
  }
  /**
   * @en Multiplies the current vector with another one and return this
   * @zh 向量乘法。将当前向量与指定分量的向量相乘的结果赋值给当前向量。
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   * @param z The z value of specified vector
   * @param w The w value of specified vector
   */


  multiply4f(x, y, z, w) {
    this.x *= x;
    this.y *= y;
    this.z *= z;
    this.w *= w;
    return this;
  }
  /**
   * @en Element-wisely divides this vector with another one, and return this.
   * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
   * @param other specified vector
   */


  divide(other) {
    this.x /= other.x;
    this.y /= other.y;
    this.z /= other.z;
    this.w /= other.w;
    return this;
  }
  /**
   * @en Element-wisely divides this vector with another one, and return this.
   * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   * @param z The z value of specified vector
   * @param w The w value of specified vector
   */


  divide4f(x, y, z, w) {
    this.x /= x;
    this.y /= y;
    this.z /= z;
    this.w /= w;
    return this;
  }
  /**
   * @en Sets each component of this vector with its negative value
   * @zh 将当前向量的各个分量取反
   */


  negative() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }
  /**
   * @en Calculates the dot product with another vector
   * @zh 向量点乘。
   * @param other specified vector
   * @returns 当前向量与指定向量点乘的结果。
   */


  dot(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
  }
  /**
   * @en Calculates the cross product with another vector.
   * @zh 向量叉乘。视当前向量和指定向量为三维向量（舍弃 w 分量），将当前向量左叉乘指定向量
   * @param other specified vector
   */


  cross(vector) {
    const {
      x: ax,
      y: ay,
      z: az
    } = this;
    const {
      x: bx,
      y: by,
      z: bz
    } = vector;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }
  /**
   * @en Returns the length of this vector.
   * @zh 计算向量的长度（模）。
   * @returns Length of vector
   */


  length() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  /**
   * @en Returns the squared length of this vector.
   * @zh 计算向量长度（模）的平方。
   * @returns the squared length of this vector
   */


  lengthSqr() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
    return x * x + y * y + z * z + w * w;
  }
  /**
   * @en Normalize the current vector.
   * @zh 将当前向量归一化
   */


  normalize() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
    let len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      this.x = x * len;
      this.y = y * len;
      this.z = z * len;
      this.w = w * len;
    }

    return this;
  }
  /**
   * @en Transforms the vec4 with a mat4
   * @zh 应用四维矩阵变换到当前矩阵
   * @param matrix matrix to transform with
   */


  transformMat4(matrix) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
    this.x = matrix.m00 * x + matrix.m04 * y + matrix.m08 * z + matrix.m12 * w;
    this.y = matrix.m01 * x + matrix.m05 * y + matrix.m09 * z + matrix.m13 * w;
    this.z = matrix.m02 * x + matrix.m06 * y + matrix.m10 * z + matrix.m14 * w;
    this.w = matrix.m03 * x + matrix.m07 * y + matrix.m11 * z + matrix.m15 * w;
    return this;
  }

}

exports.Vec4 = Vec4;
Vec4.ZERO = Object.freeze(new Vec4(0, 0, 0, 0));
Vec4.ONE = Object.freeze(new Vec4(1, 1, 1, 1));
Vec4.NEG_ONE = Object.freeze(new Vec4(-1, -1, -1, -1));

_class.CCClass.fastDefine('cc.Vec4', Vec4, {
  x: 0,
  y: 0,
  z: 0,
  w: 0
});

_globalExports.legacyCC.Vec4 = Vec4;

function v4(x, y, z, w) {
  return new Vec4(x, y, z, w);
}

_globalExports.legacyCC.v4 = v4;
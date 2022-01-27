System.register("q-bundled:///fs/cocos/core/math/mat3.jsb.js", ["../data/class.js", "./utils.js", "./vec3.jsb.js", "../global-exports.js", "./math-base.js"], function (_export, _context) {
  "use strict";

  var CCClass, enumerableProps, EPSILON, Vec3, legacyCC, MathBase, Mat3, v3_1, v3_2;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataClassJs) {
      CCClass = _dataClassJs.CCClass;
    }, function (_utilsJs) {
      enumerableProps = _utilsJs.enumerableProps;
      EPSILON = _utilsJs.EPSILON;
    }, function (_vec3JsbJs) {
      Vec3 = _vec3JsbJs.Vec3;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_mathBaseJs) {
      MathBase = _mathBaseJs.MathBase;
    }],
    execute: function () {
      /**
       * @en Mathematical 3x3 matrix.
       * @zh 表示三维（3x3）矩阵。
       */
      _export("Mat3", Mat3 = /*#__PURE__*/function (_MathBase) {
        _inheritsLoose(Mat3, _MathBase);

        /**
         * @en Clone a matrix and save the results to out matrix
         * @zh 获得指定矩阵的拷贝
         */
        Mat3.clone = function clone(a) {
          return new Mat3(a.m00, a.m01, a.m02, a.m03, a.m04, a.m05, a.m06, a.m07, a.m08);
        }
        /**
         * @en Copy content of a matrix into another and save the results to out matrix
         * @zh 复制目标矩阵
         */
        ;

        Mat3.copy = function copy(out, a) {
          out.m00 = a.m00;
          out.m01 = a.m01;
          out.m02 = a.m02;
          out.m03 = a.m03;
          out.m04 = a.m04;
          out.m05 = a.m05;
          out.m06 = a.m06;
          out.m07 = a.m07;
          out.m08 = a.m08;
          return out;
        }
        /**
         * @en Sets the elements of a matrix with the given values and save the results to out matrix
         * @zh 设置矩阵值
         */
        ;

        Mat3.set = function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
          out.m00 = m00;
          out.m01 = m01;
          out.m02 = m02;
          out.m03 = m10;
          out.m04 = m11;
          out.m05 = m12;
          out.m06 = m20;
          out.m07 = m21;
          out.m08 = m22;
          return out;
        }
        /**
         * @en Reset the out matrix to an identity matrix
         * @zh 将目标赋值为单位矩阵
         */
        ;

        Mat3.identity = function identity(out) {
          out.m00 = 1;
          out.m01 = 0;
          out.m02 = 0;
          out.m03 = 0;
          out.m04 = 1;
          out.m05 = 0;
          out.m06 = 0;
          out.m07 = 0;
          out.m08 = 1;
          return out;
        }
        /**
         * @en Transposes a matrix and save the results to out matrix
         * @zh 转置矩阵
         */
        ;

        Mat3.transpose = function transpose(out, a) {
          // If we are transposing ourselves we can skip a few steps but have to cache some values
          if (out === a) {
            var a01 = a.m01;
            var a02 = a.m02;
            var a12 = a.m05;
            out.m01 = a.m03;
            out.m02 = a.m06;
            out.m03 = a01;
            out.m05 = a.m07;
            out.m06 = a02;
            out.m07 = a12;
          } else {
            out.m00 = a.m00;
            out.m01 = a.m03;
            out.m02 = a.m06;
            out.m03 = a.m01;
            out.m04 = a.m04;
            out.m05 = a.m07;
            out.m06 = a.m02;
            out.m07 = a.m05;
            out.m08 = a.m08;
          }

          return out;
        }
        /**
         * @en Inverts a matrix. When matrix is not invertible the matrix will be set to zeros.
         * @zh 矩阵求逆，注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
         */
        ;

        Mat3.invert = function invert(out, a) {
          var a00 = a.m00;
          var a01 = a.m01;
          var a02 = a.m02;
          var a10 = a.m03;
          var a11 = a.m04;
          var a12 = a.m05;
          var a20 = a.m06;
          var a21 = a.m07;
          var a22 = a.m08;
          var b01 = a22 * a11 - a12 * a21;
          var b11 = -a22 * a10 + a12 * a20;
          var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

          var det = a00 * b01 + a01 * b11 + a02 * b21;

          if (det === 0) {
            out.m00 = 0;
            out.m01 = 0;
            out.m02 = 0;
            out.m03 = 0;
            out.m04 = 0;
            out.m05 = 0;
            out.m06 = 0;
            out.m07 = 0;
            out.m08 = 0;
            return out;
          }

          det = 1.0 / det;
          out.m00 = b01 * det;
          out.m01 = (-a22 * a01 + a02 * a21) * det;
          out.m02 = (a12 * a01 - a02 * a11) * det;
          out.m03 = b11 * det;
          out.m04 = (a22 * a00 - a02 * a20) * det;
          out.m05 = (-a12 * a00 + a02 * a10) * det;
          out.m06 = b21 * det;
          out.m07 = (-a21 * a00 + a01 * a20) * det;
          out.m08 = (a11 * a00 - a01 * a10) * det;
          return out;
        }
        /**
         * @en Calculates the determinant of a matrix
         * @zh 矩阵行列式
         */
        ;

        Mat3.determinant = function determinant(a) {
          var a00 = a.m00;
          var a01 = a.m01;
          var a02 = a.m02;
          var a10 = a.m03;
          var a11 = a.m04;
          var a12 = a.m05;
          var a20 = a.m06;
          var a21 = a.m07;
          var a22 = a.m08;
          return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        }
        /**
         * @en Multiply two matrices explicitly and save the results to out matrix
         * @zh 矩阵乘法
         */
        ;

        Mat3.multiply = function multiply(out, a, b) {
          var a00 = a.m00;
          var a01 = a.m01;
          var a02 = a.m02;
          var a10 = a.m03;
          var a11 = a.m04;
          var a12 = a.m05;
          var a20 = a.m06;
          var a21 = a.m07;
          var a22 = a.m08;
          var b00 = b.m00;
          var b01 = b.m01;
          var b02 = b.m02;
          var b10 = b.m03;
          var b11 = b.m04;
          var b12 = b.m05;
          var b20 = b.m06;
          var b21 = b.m07;
          var b22 = b.m08;
          out.m00 = b00 * a00 + b01 * a10 + b02 * a20;
          out.m01 = b00 * a01 + b01 * a11 + b02 * a21;
          out.m02 = b00 * a02 + b01 * a12 + b02 * a22;
          out.m03 = b10 * a00 + b11 * a10 + b12 * a20;
          out.m04 = b10 * a01 + b11 * a11 + b12 * a21;
          out.m05 = b10 * a02 + b11 * a12 + b12 * a22;
          out.m06 = b20 * a00 + b21 * a10 + b22 * a20;
          out.m07 = b20 * a01 + b21 * a11 + b22 * a21;
          out.m08 = b20 * a02 + b21 * a12 + b22 * a22;
          return out;
        }
        /**
         * @en Take the first third order of the fourth order matrix and multiply by the third order matrix
         * @zh 取四阶矩阵的前三阶，与三阶矩阵相乘
         */
        ;

        Mat3.multiplyMat4 = function multiplyMat4(out, a, b) {
          var a00 = a.m00;
          var a01 = a.m01;
          var a02 = a.m02;
          var a10 = a.m03;
          var a11 = a.m04;
          var a12 = a.m05;
          var a20 = a.m06;
          var a21 = a.m07;
          var a22 = a.m08;
          var b00 = b.m00;
          var b01 = b.m01;
          var b02 = b.m02;
          var b10 = b.m04;
          var b11 = b.m05;
          var b12 = b.m06;
          var b20 = b.m08;
          var b21 = b.m09;
          var b22 = b.m10;
          out.m00 = b00 * a00 + b01 * a10 + b02 * a20;
          out.m01 = b00 * a01 + b01 * a11 + b02 * a21;
          out.m02 = b00 * a02 + b01 * a12 + b02 * a22;
          out.m03 = b10 * a00 + b11 * a10 + b12 * a20;
          out.m04 = b10 * a01 + b11 * a11 + b12 * a21;
          out.m05 = b10 * a02 + b11 * a12 + b12 * a22;
          out.m06 = b20 * a00 + b21 * a10 + b22 * a20;
          out.m07 = b20 * a01 + b21 * a11 + b22 * a21;
          out.m08 = b20 * a02 + b21 * a12 + b22 * a22;
          return out;
        }
        /**
         * @en Multiply a matrix with a translation vector given by a translation offset.
         * @zh 在给定矩阵变换基础上加入变换
         */
        ;

        Mat3.transform = function transform(out, a, v) {
          var a00 = a.m00;
          var a01 = a.m01;
          var a02 = a.m02;
          var a10 = a.m03;
          var a11 = a.m04;
          var a12 = a.m05;
          var a20 = a.m06;
          var a21 = a.m07;
          var a22 = a.m08;
          var x = v.x;
          var y = v.y;
          out.m00 = a00;
          out.m01 = a01;
          out.m02 = a02;
          out.m03 = a10;
          out.m04 = a11;
          out.m05 = a12;
          out.m06 = x * a00 + y * a10 + a20;
          out.m07 = x * a01 + y * a11 + a21;
          out.m08 = x * a02 + y * a12 + a22;
          return out;
        }
        /**
         * @en Multiply a matrix with a scale matrix given by a scale vector and save the results to out matrix
         * @zh 在给定矩阵变换基础上加入新缩放变换
         */
        ;

        Mat3.scale = function scale(out, a, v) {
          var x = v.x;
          var y = v.y;
          out.m00 = x * a.m00;
          out.m01 = x * a.m01;
          out.m02 = x * a.m02;
          out.m03 = y * a.m03;
          out.m04 = y * a.m04;
          out.m05 = y * a.m05;
          out.m06 = a.m06;
          out.m07 = a.m07;
          out.m08 = a.m08;
          return out;
        }
        /**
         * @en Rotates the transform by the given angle and save the results into the out matrix
         * @zh 在给定矩阵变换基础上加入新旋转变换
         * @param rad radius of rotation
         */
        ;

        Mat3.rotate = function rotate(out, a, rad) {
          var a00 = a.m00;
          var a01 = a.m01;
          var a02 = a.m02;
          var a10 = a.m03;
          var a11 = a.m04;
          var a12 = a.m05;
          var a20 = a.m06;
          var a21 = a.m07;
          var a22 = a.m08;
          var s = Math.sin(rad);
          var c = Math.cos(rad);
          out.m00 = c * a00 + s * a10;
          out.m01 = c * a01 + s * a11;
          out.m02 = c * a02 + s * a12;
          out.m03 = c * a10 - s * a00;
          out.m04 = c * a11 - s * a01;
          out.m05 = c * a12 - s * a02;
          out.m06 = a20;
          out.m07 = a21;
          out.m08 = a22;
          return out;
        }
        /**
         * @en Copies the first third order matrix of a fourth order matrix to the out third order matrix
         * @zh 取四阶矩阵的前三阶
         */
        ;

        Mat3.fromMat4 = function fromMat4(out, a) {
          out.m00 = a.m00;
          out.m01 = a.m01;
          out.m02 = a.m02;
          out.m03 = a.m04;
          out.m04 = a.m05;
          out.m05 = a.m06;
          out.m06 = a.m08;
          out.m07 = a.m09;
          out.m08 = a.m10;
          return out;
        }
        /**
         * @en Sets a third order matrix with view direction and up direction. Then save the results to out matrix
         * @zh 根据视口前方向和上方向计算矩阵
         * @param view The view direction, it`s must be normalized.
         * @param up The view up direction, it`s must be normalized, default value is (0, 1, 0).
         */
        ;

        Mat3.fromViewUp = function fromViewUp(out, view, up) {
          if (Vec3.lengthSqr(view) < EPSILON * EPSILON) {
            Mat3.identity(out);
            return out;
          }

          Vec3.normalize(v3_1, Vec3.cross(v3_1, up || Vec3.UNIT_Y, view));

          if (Vec3.lengthSqr(v3_1) < EPSILON * EPSILON) {
            Mat3.identity(out);
            return out;
          }

          Vec3.cross(v3_2, view, v3_1);
          Mat3.set(out, v3_1.x, v3_1.y, v3_1.z, v3_2.x, v3_2.y, v3_2.z, view.x, view.y, view.z);
          return out;
        }
        /**
         * @en Sets the given matrix with a translation vector and save the results to out matrix
         * @zh 计算位移矩阵
         */
        ;

        Mat3.fromTranslation = function fromTranslation(out, v) {
          out.m00 = 1;
          out.m01 = 0;
          out.m02 = 0;
          out.m03 = 0;
          out.m04 = 1;
          out.m05 = 0;
          out.m06 = v.x;
          out.m07 = v.y;
          out.m08 = 1;
          return out;
        }
        /**
         * @en Sets the given matrix with a scale vector and save the results to out matrix
         * @zh 计算缩放矩阵
         */
        ;

        Mat3.fromScaling = function fromScaling(out, v) {
          out.m00 = v.x;
          out.m01 = 0;
          out.m02 = 0;
          out.m03 = 0;
          out.m04 = v.y;
          out.m05 = 0;
          out.m06 = 0;
          out.m07 = 0;
          out.m08 = 1;
          return out;
        }
        /**
         * @en Sets the given matrix with a given angle and save the results to out matrix
         * @zh 计算旋转矩阵
         */
        ;

        Mat3.fromRotation = function fromRotation(out, rad) {
          var s = Math.sin(rad);
          var c = Math.cos(rad);
          out.m00 = c;
          out.m01 = s;
          out.m02 = 0;
          out.m03 = -s;
          out.m04 = c;
          out.m05 = 0;
          out.m06 = 0;
          out.m07 = 0;
          out.m08 = 1;
          return out;
        }
        /**
         * @en Sets the given matrix with the given quaternion and save the results to out matrix
         * @zh 根据四元数旋转信息计算矩阵
         */
        ;

        Mat3.fromQuat = function fromQuat(out, q) {
          var x = q.x;
          var y = q.y;
          var z = q.z;
          var w = q.w;
          var x2 = x + x;
          var y2 = y + y;
          var z2 = z + z;
          var xx = x * x2;
          var yx = y * x2;
          var yy = y * y2;
          var zx = z * x2;
          var zy = z * y2;
          var zz = z * z2;
          var wx = w * x2;
          var wy = w * y2;
          var wz = w * z2;
          out.m00 = 1 - yy - zz;
          out.m03 = yx - wz;
          out.m06 = zx + wy;
          out.m01 = yx + wz;
          out.m04 = 1 - xx - zz;
          out.m07 = zy - wx;
          out.m02 = zx - wy;
          out.m05 = zy + wx;
          out.m08 = 1 - xx - yy;
          return out;
        }
        /**
         * @en Calculates the upper-left 3x3 matrix of a 4x4 matrix's inverse transpose
         * @zh 计算指定四维矩阵的逆转置三维矩阵
         */
        ;

        Mat3.inverseTransposeMat4 = function inverseTransposeMat4(out, a) {
          var a00 = a.m00;
          var a01 = a.m01;
          var a02 = a.m02;
          var a03 = a.m03;
          var a10 = a.m04;
          var a11 = a.m05;
          var a12 = a.m06;
          var a13 = a.m07;
          var a20 = a.m08;
          var a21 = a.m09;
          var a22 = a.m10;
          var a23 = a.m11;
          var a30 = a.m12;
          var a31 = a.m13;
          var a32 = a.m14;
          var a33 = a.m15;
          var b00 = a00 * a11 - a01 * a10;
          var b01 = a00 * a12 - a02 * a10;
          var b02 = a00 * a13 - a03 * a10;
          var b03 = a01 * a12 - a02 * a11;
          var b04 = a01 * a13 - a03 * a11;
          var b05 = a02 * a13 - a03 * a12;
          var b06 = a20 * a31 - a21 * a30;
          var b07 = a20 * a32 - a22 * a30;
          var b08 = a20 * a33 - a23 * a30;
          var b09 = a21 * a32 - a22 * a31;
          var b10 = a21 * a33 - a23 * a31;
          var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

          var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

          if (!det) {
            return null;
          }

          det = 1.0 / det;
          out.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
          out.m01 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
          out.m02 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
          out.m03 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
          out.m04 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
          out.m05 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
          out.m06 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
          out.m07 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
          out.m08 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
          return out;
        }
        /**
         * @en Transform a matrix object to a flat array
         * @zh 矩阵转数组
         * @param ofs Array Start Offset
         */
        ;

        Mat3.toArray = function toArray(out, m, ofs) {
          if (ofs === void 0) {
            ofs = 0;
          }

          out[ofs + 0] = m.m00;
          out[ofs + 1] = m.m01;
          out[ofs + 2] = m.m02;
          out[ofs + 3] = m.m03;
          out[ofs + 4] = m.m04;
          out[ofs + 5] = m.m05;
          out[ofs + 6] = m.m06;
          out[ofs + 7] = m.m07;
          out[ofs + 8] = m.m08;
          return out;
        }
        /**
         * @en Generates or sets a matrix with a flat array
         * @zh 数组转矩阵
         * @param ofs Array Start Offset
         */
        ;

        Mat3.fromArray = function fromArray(out, arr, ofs) {
          if (ofs === void 0) {
            ofs = 0;
          }

          out.m00 = arr[ofs + 0];
          out.m01 = arr[ofs + 1];
          out.m02 = arr[ofs + 2];
          out.m03 = arr[ofs + 3];
          out.m04 = arr[ofs + 4];
          out.m05 = arr[ofs + 5];
          out.m06 = arr[ofs + 6];
          out.m07 = arr[ofs + 7];
          out.m08 = arr[ofs + 8];
          return out;
        }
        /**
         * @en Adds two matrices and save the results to out matrix
         * @zh 逐元素矩阵加法
         */
        ;

        Mat3.add = function add(out, a, b) {
          out.m00 = a.m00 + b.m00;
          out.m01 = a.m01 + b.m01;
          out.m02 = a.m02 + b.m02;
          out.m03 = a.m03 + b.m03;
          out.m04 = a.m04 + b.m04;
          out.m05 = a.m05 + b.m05;
          out.m06 = a.m06 + b.m06;
          out.m07 = a.m07 + b.m07;
          out.m08 = a.m08 + b.m08;
          return out;
        }
        /**
         * @en Subtracts matrix b from matrix a and save the results to out matrix
         * @zh 逐元素矩阵减法
         */
        ;

        Mat3.subtract = function subtract(out, a, b) {
          out.m00 = a.m00 - b.m00;
          out.m01 = a.m01 - b.m01;
          out.m02 = a.m02 - b.m02;
          out.m03 = a.m03 - b.m03;
          out.m04 = a.m04 - b.m04;
          out.m05 = a.m05 - b.m05;
          out.m06 = a.m06 - b.m06;
          out.m07 = a.m07 - b.m07;
          out.m08 = a.m08 - b.m08;
          return out;
        }
        /**
         * @en Multiply each element of a matrix by a scalar number and save the results to out matrix
         * @zh 矩阵标量乘法
         */
        ;

        Mat3.multiplyScalar = function multiplyScalar(out, a, b) {
          out.m00 = a.m00 * b;
          out.m01 = a.m01 * b;
          out.m02 = a.m02 * b;
          out.m03 = a.m03 * b;
          out.m04 = a.m04 * b;
          out.m05 = a.m05 * b;
          out.m06 = a.m06 * b;
          out.m07 = a.m07 * b;
          out.m08 = a.m08 * b;
          return out;
        }
        /**
         * @en Adds two matrices after multiplying each element of the second operand by a scalar number. And save the results to out matrix.
         * @zh 逐元素矩阵标量乘加: A + B * scale
         */
        ;

        Mat3.multiplyScalarAndAdd = function multiplyScalarAndAdd(out, a, b, scale) {
          out.m00 = b.m00 * scale + a.m00;
          out.m01 = b.m01 * scale + a.m01;
          out.m02 = b.m02 * scale + a.m02;
          out.m03 = b.m03 * scale + a.m03;
          out.m04 = b.m04 * scale + a.m04;
          out.m05 = b.m05 * scale + a.m05;
          out.m06 = b.m06 * scale + a.m06;
          out.m07 = b.m07 * scale + a.m07;
          out.m08 = b.m08 * scale + a.m08;
          return out;
        }
        /**
         * @en Returns whether the specified matrices are equal.
         * @zh 矩阵等价判断
         */
        ;

        Mat3.strictEquals = function strictEquals(a, b) {
          return a.m00 === b.m00 && a.m01 === b.m01 && a.m02 === b.m02 && a.m03 === b.m03 && a.m04 === b.m04 && a.m05 === b.m05 && a.m06 === b.m06 && a.m07 === b.m07 && a.m08 === b.m08;
        }
        /**
         * @en Returns whether the specified matrices are approximately equal.
         * @zh 排除浮点数误差的矩阵近似等价判断
         */
        ;

        Mat3.equals = function equals(a, b, epsilon) {
          if (epsilon === void 0) {
            epsilon = EPSILON;
          }

          return Math.abs(a.m00 - b.m00) <= epsilon * Math.max(1.0, Math.abs(a.m00), Math.abs(b.m00)) && Math.abs(a.m01 - b.m01) <= epsilon * Math.max(1.0, Math.abs(a.m01), Math.abs(b.m01)) && Math.abs(a.m02 - b.m02) <= epsilon * Math.max(1.0, Math.abs(a.m02), Math.abs(b.m02)) && Math.abs(a.m03 - b.m03) <= epsilon * Math.max(1.0, Math.abs(a.m03), Math.abs(b.m03)) && Math.abs(a.m04 - b.m04) <= epsilon * Math.max(1.0, Math.abs(a.m04), Math.abs(b.m04)) && Math.abs(a.m05 - b.m05) <= epsilon * Math.max(1.0, Math.abs(a.m05), Math.abs(b.m05)) && Math.abs(a.m06 - b.m06) <= epsilon * Math.max(1.0, Math.abs(a.m06), Math.abs(b.m06)) && Math.abs(a.m07 - b.m07) <= epsilon * Math.max(1.0, Math.abs(a.m07), Math.abs(b.m07)) && Math.abs(a.m08 - b.m08) <= epsilon * Math.max(1.0, Math.abs(a.m08), Math.abs(b.m08));
        }
        /**
         * @en Value at column 0 row 0 of the matrix.
         * @zh 矩阵第 0 列第 0 行的元素。
         */
        ;

        function Mat3(m00, m01, m02, m03, m04, m05, m06, m07, m08) {
          var _this;

          if (m00 === void 0) {
            m00 = 1;
          }

          if (m01 === void 0) {
            m01 = 0;
          }

          if (m02 === void 0) {
            m02 = 0;
          }

          if (m03 === void 0) {
            m03 = 0;
          }

          if (m04 === void 0) {
            m04 = 1;
          }

          if (m05 === void 0) {
            m05 = 0;
          }

          if (m06 === void 0) {
            m06 = 0;
          }

          if (m07 === void 0) {
            m07 = 0;
          }

          if (m08 === void 0) {
            m08 = 1;
          }

          _this = _MathBase.call(this) || this;

          if (m00 && typeof m00 === 'object') {
            if (ArrayBuffer.isView(m00)) {
              _this._array = m00;

              _this._array.set([1, 0, 0, 0, 1, 0, 0, 0, 1]);
            } else {
              var v = m00.array;
              _this._array = MathBase.createFloatArray(9);
              _this._array[0] = v[0];
              _this._array[1] = v[1];
              _this._array[2] = v[2];
              _this._array[3] = v[3];
              _this._array[4] = v[4];
              _this._array[5] = v[5];
              _this._array[6] = v[6];
              _this._array[7] = v[7];
              _this._array[8] = v[8];
            }
          } else {
            _this._array = MathBase.createFloatArray(9);
            _this._array[0] = m00;
            _this._array[1] = m01;
            _this._array[2] = m02;
            _this._array[3] = m03;
            _this._array[4] = m04;
            _this._array[5] = m05;
            _this._array[6] = m06;
            _this._array[7] = m07;
            _this._array[8] = m08;
          }

          return _this;
        }
        /**
         * @en Clone a new matrix from the current matrix.
         * @zh 克隆当前矩阵。
         */


        var _proto = Mat3.prototype;

        _proto.clone = function clone() {
          var m = this._array;
          return new Mat3(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8]);
        }
        /**
         * @en Sets the matrix with another one's value.
         * @zh 设置当前矩阵使其与指定矩阵相等。
         * @param other Specified matrix
         * @return this
         */
        ;

        _proto.set = function set(m00, m01, m02, m03, m04, m05, m06, m07, m08) {
          if (m00 === void 0) {
            m00 = 1;
          }

          if (m01 === void 0) {
            m01 = 0;
          }

          if (m02 === void 0) {
            m02 = 0;
          }

          if (m03 === void 0) {
            m03 = 0;
          }

          if (m04 === void 0) {
            m04 = 1;
          }

          if (m05 === void 0) {
            m05 = 0;
          }

          if (m06 === void 0) {
            m06 = 0;
          }

          if (m07 === void 0) {
            m07 = 0;
          }

          if (m08 === void 0) {
            m08 = 1;
          }

          if (m00 && typeof m00 === 'object') {
            var v = m00.array;
            this._array[0] = v[0];
            this._array[1] = v[1];
            this._array[2] = v[2];
            this._array[3] = v[3];
            this._array[4] = v[4];
            this._array[5] = v[5];
            this._array[6] = v[6];
            this._array[7] = v[7];
            this._array[8] = v[8];
          } else {
            this._array[0] = m00;
            this._array[1] = m01;
            this._array[2] = m02;
            this._array[3] = m03;
            this._array[4] = m04;
            this._array[5] = m05;
            this._array[6] = m06;
            this._array[7] = m07;
            this._array[8] = m08;
          }

          return this;
        }
        /**
         * @en Returns whether the specified matrices are approximately equal.
         * @zh 判断当前矩阵是否在误差范围内与指定矩阵相等。
         * @param other Comparative matrix
         * @param epsilon The error allowed. It`s should be a non-negative number.
         * @return Returns `true' when the elements of both matrices are equal; otherwise returns `false'.
         */
        ;

        _proto.equals = function equals(other, epsilon) {
          if (epsilon === void 0) {
            epsilon = EPSILON;
          }

          var v = other.array;
          return Math.abs(this._array[0] - v[0]) <= epsilon * Math.max(1.0, Math.abs(this._array[0]), Math.abs(v[0])) && Math.abs(this._array[1] - v[1]) <= epsilon * Math.max(1.0, Math.abs(this._array[1]), Math.abs(v[1])) && Math.abs(this._array[2] - v[2]) <= epsilon * Math.max(1.0, Math.abs(this._array[2]), Math.abs(v[2])) && Math.abs(this._array[3] - v[3]) <= epsilon * Math.max(1.0, Math.abs(this._array[3]), Math.abs(v[3])) && Math.abs(this._array[4] - v[4]) <= epsilon * Math.max(1.0, Math.abs(this._array[4]), Math.abs(v[4])) && Math.abs(this._array[5] - v[5]) <= epsilon * Math.max(1.0, Math.abs(this._array[5]), Math.abs(v[5])) && Math.abs(this._array[6] - v[6]) <= epsilon * Math.max(1.0, Math.abs(this._array[6]), Math.abs(v[6])) && Math.abs(this._array[7] - v[7]) <= epsilon * Math.max(1.0, Math.abs(this._array[7]), Math.abs(v[7])) && Math.abs(this._array[8] - v[8]) <= epsilon * Math.max(1.0, Math.abs(this._array[8]), Math.abs(v[8]));
        }
        /**
         * @en Returns whether the specified matrices are equal.
         * @zh 判断当前矩阵是否与指定矩阵相等。
         * @param other Comparative matrix
         * @return Returns `true' when the elements of both matrices are equal; otherwise returns `false'.
         */
        ;

        _proto.strictEquals = function strictEquals(other) {
          var v = other.array;
          return this._array[0] === v[0] && this._array[1] === v[1] && this._array[2] === v[2] && this._array[3] === v[3] && this._array[4] === v[4] && this._array[5] === v[5] && this._array[6] === v[6] && this._array[7] === v[7] && this._array[8] === v[8];
        }
        /**
         * @en Returns a string representation of a matrix.
         * @zh 返回当前矩阵的字符串表示。
         * @return The string representation of this matrix
         */
        ;

        _proto.toString = function toString() {
          return "[\n" + this._array[0] + ", " + this._array[1] + ", " + this._array[2] + ",\n" + this._array[3] + ",\n" + this._array[4] + ", " + this._array[5] + ",\n" + this._array[6] + ", " + this._array[7] + ",\n" + this._array[8] + "\n" + "]";
        }
        /**
         * @en set the current matrix to an identity matrix.
         * @zh 将当前矩阵设为单位矩阵。
         * @return `this`
         */
        ;

        _proto.identity = function identity() {
          this._array[0] = 1;
          this._array[1] = 0;
          this._array[2] = 0;
          this._array[3] = 0;
          this._array[4] = 1;
          this._array[5] = 0;
          this._array[6] = 0;
          this._array[7] = 0;
          this._array[8] = 1;
          return this;
        }
        /**
         * @en Transposes the current matrix.
         * @zh 计算当前矩阵的转置矩阵。
         */
        ;

        _proto.transpose = function transpose() {
          var a01 = this._array[1];
          var a02 = this._array[2];
          var a12 = this._array[5];
          this._array[1] = this._array[3];
          this._array[2] = this._array[6];
          this._array[3] = a01;
          this._array[5] = this._array[7];
          this._array[6] = a02;
          this._array[7] = a12;
          return this;
        }
        /**
         * @en Inverts the current matrix. When matrix is not invertible the matrix will be set to zeros.
         * @zh 计算当前矩阵的逆矩阵。注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
         */
        ;

        _proto.invert = function invert() {
          var a00 = this._array[0];
          var a01 = this._array[1];
          var a02 = this._array[2];
          var a10 = this._array[3];
          var a11 = this._array[4];
          var a12 = this._array[5];
          var a20 = this._array[6];
          var a21 = this._array[7];
          var a22 = this._array[8];
          var b01 = a22 * a11 - a12 * a21;
          var b11 = -a22 * a10 + a12 * a20;
          var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

          var det = a00 * b01 + a01 * b11 + a02 * b21;

          if (det === 0) {
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
            return this;
          }

          det = 1.0 / det;
          this._array[0] = b01 * det;
          this._array[1] = (-a22 * a01 + a02 * a21) * det;
          this._array[2] = (a12 * a01 - a02 * a11) * det;
          this._array[3] = b11 * det;
          this._array[4] = (a22 * a00 - a02 * a20) * det;
          this._array[5] = (-a12 * a00 + a02 * a10) * det;
          this._array[6] = b21 * det;
          this._array[7] = (-a21 * a00 + a01 * a20) * det;
          this._array[8] = (a11 * a00 - a01 * a10) * det;
          return this;
        }
        /**
         * @en Calculates the determinant of the current matrix.
         * @zh 计算当前矩阵的行列式。
         * @return 当前矩阵的行列式。
         */
        ;

        _proto.determinant = function determinant() {
          var a00 = this._array[0];
          var a01 = this._array[1];
          var a02 = this._array[2];
          var a10 = this._array[3];
          var a11 = this._array[4];
          var a12 = this._array[5];
          var a20 = this._array[6];
          var a21 = this._array[7];
          var a22 = this._array[8];
          return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        }
        /**
         * @en Adds the current matrix and another matrix to the current matrix.
         * @zh 矩阵加法。将当前矩阵与指定矩阵的相加，结果返回给当前矩阵。
         * @param mat the second operand
         */
        ;

        _proto.add = function add(mat) {
          var v = mat.array;
          this._array[0] += v[0];
          this._array[1] += v[1];
          this._array[2] += v[2];
          this._array[3] += v[3];
          this._array[4] += v[4];
          this._array[5] += v[5];
          this._array[6] += v[6];
          this._array[7] += v[7];
          this._array[8] += v[8];
          return this;
        }
        /**
         * @en Subtracts another matrix from the current matrix.
         * @zh 计算矩阵减法。将当前矩阵减去指定矩阵的结果赋值给当前矩阵。
         * @param mat the second operand
         */
        ;

        _proto.subtract = function subtract(mat) {
          var v = mat.array;
          this._array[0] -= v[0];
          this._array[1] -= v[1];
          this._array[2] -= v[2];
          this._array[3] -= v[3];
          this._array[4] -= v[4];
          this._array[5] -= v[5];
          this._array[6] -= v[6];
          this._array[7] -= v[7];
          this._array[8] -= v[8];
          return this;
        }
        /**
         * @en Multiply the current matrix with another matrix.
         * @zh 矩阵乘法。将当前矩阵左乘指定矩阵的结果赋值给当前矩阵。
         * @param mat the second operand
         */
        ;

        _proto.multiply = function multiply(mat) {
          var a00 = this._array[0];
          var a01 = this._array[1];
          var a02 = this._array[2];
          var a10 = this._array[3];
          var a11 = this._array[4];
          var a12 = this._array[5];
          var a20 = this._array[6];
          var a21 = this._array[7];
          var a22 = this._array[8];
          var v = mat.array;
          var b00 = v[0];
          var b01 = v[1];
          var b02 = v[2];
          var b10 = v[3];
          var b11 = v[4];
          var b12 = v[5];
          var b20 = v[6];
          var b21 = v[7];
          var b22 = v[8];
          this._array[0] = b00 * a00 + b01 * a10 + b02 * a20;
          this._array[1] = b00 * a01 + b01 * a11 + b02 * a21;
          this._array[2] = b00 * a02 + b01 * a12 + b02 * a22;
          this._array[3] = b10 * a00 + b11 * a10 + b12 * a20;
          this._array[4] = b10 * a01 + b11 * a11 + b12 * a21;
          this._array[5] = b10 * a02 + b11 * a12 + b12 * a22;
          this._array[6] = b20 * a00 + b21 * a10 + b22 * a20;
          this._array[7] = b20 * a01 + b21 * a11 + b22 * a21;
          this._array[8] = b20 * a02 + b21 * a12 + b22 * a22;
          return this;
        }
        /**
         * @en Multiply each element of the current matrix by a scalar number.
         * @zh 矩阵数乘。将当前矩阵与指定标量的数乘结果赋值给当前矩阵。
         * @param scalar amount to scale the matrix's elements by
         */
        ;

        _proto.multiplyScalar = function multiplyScalar(scalar) {
          this._array[0] *= scalar;
          this._array[1] *= scalar;
          this._array[2] *= scalar;
          this._array[3] *= scalar;
          this._array[4] *= scalar;
          this._array[5] *= scalar;
          this._array[6] *= scalar;
          this._array[7] *= scalar;
          this._array[8] *= scalar;
          return this;
        }
        /**
         * @en Multiply the current matrix with a scale matrix given by a scale vector.
         * @zh 将当前矩阵左乘缩放矩阵的结果赋值给当前矩阵，缩放矩阵由各个轴的缩放给出。
         * @param vec vector to scale by
         */
        ;

        _proto.scale = function scale(vec) {
          var x = vec.array[0];
          var y = vec.array[1];
          this._array[0] *= x;
          this._array[1] *= x;
          this._array[2] *= x;
          this._array[3] *= y;
          this._array[4] *= y;
          this._array[5] *= y;
          return this;
        }
        /**
         * @en Rotates the current matrix by the given angle.
         * @zh 将当前矩阵左乘旋转矩阵的结果赋值给当前矩阵，旋转矩阵由旋转轴和旋转角度给出。
         * @param rad radius of rotation
         */
        ;

        _proto.rotate = function rotate(rad) {
          var a00 = this._array[0];
          var a01 = this._array[1];
          var a02 = this._array[2];
          var a10 = this._array[3];
          var a11 = this._array[4];
          var a12 = this._array[5];
          var a20 = this._array[6];
          var a21 = this._array[7];
          var a22 = this._array[8];
          var s = Math.sin(rad);
          var c = Math.cos(rad);
          this._array[0] = c * a00 + s * a10;
          this._array[1] = c * a01 + s * a11;
          this._array[2] = c * a02 + s * a12;
          this._array[3] = c * a10 - s * a00;
          this._array[4] = c * a11 - s * a01;
          this._array[5] = c * a12 - s * a02;
          this._array[6] = a20;
          this._array[7] = a21;
          this._array[8] = a22;
          return this;
        }
        /**
         * @en Resets the current matrix from the given quaternion.
         * @zh 重置当前矩阵的值，使其表示指定四元数表示的旋转变换。
         * @param q The quaternion.
         * @returns this
         */
        ;

        _proto.fromQuat = function fromQuat(q) {
          var x = q.x;
          var y = q.y;
          var z = q.z;
          var w = q.w;
          var x2 = x + x;
          var y2 = y + y;
          var z2 = z + z;
          var xx = x * x2;
          var yx = y * x2;
          var yy = y * y2;
          var zx = z * x2;
          var zy = z * y2;
          var zz = z * z2;
          var wx = w * x2;
          var wy = w * y2;
          var wz = w * z2;
          this._array[0] = 1 - yy - zz;
          this._array[3] = yx - wz;
          this._array[6] = zx + wy;
          this._array[1] = yx + wz;
          this._array[4] = 1 - xx - zz;
          this._array[7] = zy - wx;
          this._array[2] = zx - wy;
          this._array[5] = zy + wx;
          this._array[8] = 1 - xx - yy;
          return this;
        };

        _createClass(Mat3, [{
          key: "m00",
          get: function get() {
            return this._array[0];
          },
          set: function set(m) {
            this._array[0] = m;
          }
          /**
           * @en Value at column 0 row 1 of the matrix.
           * @zh 矩阵第 0 列第 1 行的元素。
           */

        }, {
          key: "m01",
          get: function get() {
            return this._array[1];
          },
          set: function set(m) {
            this._array[1] = m;
          }
          /**
           * @en Value at column 0 row 2 of the matrix.
           * @zh 矩阵第 0 列第 2 行的元素。
           */

        }, {
          key: "m02",
          get: function get() {
            return this._array[2];
          },
          set: function set(m) {
            this._array[2] = m;
          }
          /**
           * @en Value at column 1 row 0 of the matrix.
           * @zh 矩阵第 1 列第 0 行的元素。
           */

        }, {
          key: "m03",
          get: function get() {
            return this._array[3];
          },
          set: function set(m) {
            this._array[3] = m;
          }
          /**
           * @en Value at column 1 row 1 of the matrix.
           * @zh 矩阵第 1 列第 1 行的元素。
           */

        }, {
          key: "m04",
          get: function get() {
            return this._array[4];
          },
          set: function set(m) {
            this._array[4] = m;
          }
          /**
           * @en Value at column 1 row 2 of the matrix.
           * @zh 矩阵第 1 列第 2 行的元素。
           */

        }, {
          key: "m05",
          get: function get() {
            return this._array[5];
          },
          set: function set(m) {
            this._array[5] = m;
          }
          /**
           * @en Value at column 2 row 0 of the matrix.
           * @zh 矩阵第 2 列第 0 行的元素。
           */

        }, {
          key: "m06",
          get: function get() {
            return this._array[6];
          },
          set: function set(m) {
            this._array[6] = m;
          }
          /**
           * @en Value at column 2 row 1 of the matrix.
           * @zh 矩阵第 2 列第 1 行的元素。
           */

        }, {
          key: "m07",
          get: function get() {
            return this._array[7];
          },
          set: function set(m) {
            this._array[7] = m;
          }
          /**
           * @en Value at column 2 row 2 of the matrix.
           * @zh 矩阵第 2 列第 2 行的元素。
           */

        }, {
          key: "m08",
          get: function get() {
            return this._array[8];
          },
          set: function set(m) {
            this._array[8] = m;
          }
        }]);

        return Mat3;
      }(MathBase));

      Mat3.IDENTITY = Object.freeze(new Mat3());
      v3_1 = new Vec3();
      v3_2 = new Vec3();
      enumerableProps(Mat3.prototype, ['m00', 'm01', 'm02', 'm03', 'm04', 'm05', 'm06', 'm07', 'm08']);
      CCClass.fastDefine('cc.Mat3', Mat3, {
        m00: 1,
        m01: 0,
        m02: 0,
        m03: 0,
        m04: 1,
        m05: 0,
        m06: 0,
        m07: 0,
        m08: 1
      });
      legacyCC.Mat3 = Mat3;
    }
  };
});
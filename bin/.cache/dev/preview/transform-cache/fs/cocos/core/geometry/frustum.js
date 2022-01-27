System.register("q-bundled:///fs/cocos/core/geometry/frustum.js", ["../math/index.js", "./enums.js", "./plane.js"], function (_export, _context) {
  "use strict";

  var Vec3, enums, Plane, _v, _nearTemp, _farTemp, _temp_v3, Frustum;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_enumsJs) {
      enums = _enumsJs.default;
    }, function (_planeJs) {
      Plane = _planeJs.Plane;
    }],
    execute: function () {
      _v = new Array(8);
      _v[0] = new Vec3(1, 1, 1);
      _v[1] = new Vec3(-1, 1, 1);
      _v[2] = new Vec3(-1, -1, 1);
      _v[3] = new Vec3(1, -1, 1);
      _v[4] = new Vec3(1, 1, -1);
      _v[5] = new Vec3(-1, 1, -1);
      _v[6] = new Vec3(-1, -1, -1);
      _v[7] = new Vec3(1, -1, -1);
      _nearTemp = new Vec3();
      _farTemp = new Vec3();
      _temp_v3 = new Vec3();
      /**
       * @en
       * Basic Geometry: frustum.
       * @zh
       * 基础几何 截头锥体。
       */

      _export("Frustum", Frustum = /*#__PURE__*/function () {
        /**
         * @en Create a frustum from an AABB box.
         * @zh 从 AABB 包围盒中创建一个视锥体。
         * @param out 视锥体。
         * @param aabb AABB 包围盒。
         * @return {Frustum} frustum.
         */
        Frustum.createFromAABB = function createFromAABB(out, aabb) {
          var vec3_min = new Vec3();
          var vec3_max = new Vec3();
          Vec3.subtract(vec3_min, aabb.center, aabb.halfExtents);
          Vec3.add(vec3_max, aabb.center, aabb.halfExtents);
          out.vertices[0].set(vec3_min.x, vec3_max.y, vec3_min.z);
          out.vertices[1].set(vec3_max.x, vec3_max.y, vec3_min.z);
          out.vertices[2].set(vec3_max.x, vec3_min.y, vec3_min.z);
          out.vertices[3].set(vec3_min.x, vec3_min.y, vec3_min.z);
          out.vertices[4].set(vec3_min.x, vec3_max.y, vec3_max.z);
          out.vertices[5].set(vec3_max.x, vec3_max.y, vec3_max.z);
          out.vertices[6].set(vec3_max.x, vec3_min.y, vec3_max.z);
          out.vertices[7].set(vec3_min.x, vec3_min.y, vec3_max.z);

          if (out._type !== enums.SHAPE_FRUSTUM_ACCURATE) {
            return out;
          }

          out.updatePlanes();
          return out;
        }
        /**
         * @en create a new frustum.
         * @zh 创建一个新的截锥体。
         * @param out 返回新截锥体
         * @param camera 相机参数
         * @param m 变换矩阵
         * @param start 分割开始位置
         * @param end 分割末尾位置
         * @return {Frustum} 返回新截锥体.
         */
        ;

        Frustum.split = function split(out, camera, m, start, end) {
          // 0: cameraNear  1:cameraFar
          var h = Math.tan(camera.fov * 0.5);
          var w = h * camera.aspect;

          _nearTemp.set(start * w, start * h, start);

          _farTemp.set(end * w, end * h, end);

          var vertexes = out.vertices; // startHalfWidth startHalfHeight

          _temp_v3.set(_nearTemp.x, _nearTemp.y, _nearTemp.z);

          Vec3.transformMat4(vertexes[0], _temp_v3, m);

          _temp_v3.set(-_nearTemp.x, _nearTemp.y, _nearTemp.z);

          Vec3.transformMat4(vertexes[1], _temp_v3, m);

          _temp_v3.set(-_nearTemp.x, -_nearTemp.y, _nearTemp.z);

          Vec3.transformMat4(vertexes[2], _temp_v3, m);

          _temp_v3.set(_nearTemp.x, -_nearTemp.y, _nearTemp.z);

          Vec3.transformMat4(vertexes[3], _temp_v3, m); // endHalfWidth, endHalfHeight

          _temp_v3.set(_farTemp.x, _farTemp.y, _farTemp.z);

          Vec3.transformMat4(vertexes[4], _temp_v3, m);

          _temp_v3.set(-_farTemp.x, _farTemp.y, _farTemp.z);

          Vec3.transformMat4(vertexes[5], _temp_v3, m);

          _temp_v3.set(-_farTemp.x, -_farTemp.y, _farTemp.z);

          Vec3.transformMat4(vertexes[6], _temp_v3, m);

          _temp_v3.set(_farTemp.x, -_farTemp.y, _farTemp.z);

          Vec3.transformMat4(vertexes[7], _temp_v3, m);
          out.updatePlanes();
          return out;
        }
        /**
         * @en
         * create a new frustum.
         * @zh
         * 创建一个新的截锥体。
         * @return {Frustum} frustum.
         */
        ;

        Frustum.create = function create() {
          return new Frustum();
        }
        /**
         * @en
         * Clone a frustum.
         * @zh
         * 克隆一个截锥体。
         */
        ;

        Frustum.clone = function clone(f) {
          return Frustum.copy(new Frustum(), f);
        }
        /**
         * @en
         * Copy the values from one frustum to another.
         * @zh
         * 从一个截锥体拷贝到另一个截锥体。
         */
        ;

        Frustum.copy = function copy(out, f) {
          out._type = f._type;

          for (var i = 0; i < 6; ++i) {
            Plane.copy(out.planes[i], f.planes[i]);
          }

          for (var _i = 0; _i < 8; ++_i) {
            Vec3.copy(out.vertices[_i], f.vertices[_i]);
          }

          return out;
        }
        /**
         * @en
         * Gets the type of the shape.
         * @zh
         * 获取形状的类型。
         */
        ;

        function Frustum() {
          this._type = void 0;
          this.planes = void 0;
          this.vertices = void 0;
          this._type = enums.SHAPE_FRUSTUM;
          this.planes = new Array(6);

          for (var i = 0; i < 6; ++i) {
            this.planes[i] = Plane.create(0, 0, 0, 0);
          }

          this.vertices = new Array(8);

          for (var _i2 = 0; _i2 < 8; ++_i2) {
            this.vertices[_i2] = new Vec3();
          }
        }
        /**
         * @en
         * Update the frustum information according to the given transform matrix.
         * Note that the resulting planes are not normalized under normal mode.
         * @zh
         * 根据给定的变换矩阵更新截锥体信息，注意得到的平面不是在标准模式下归一化的。
         * @param {Mat4} m the view-projection matrix
         * @param {Mat4} inv the inverse view-projection matrix
         */


        var _proto = Frustum.prototype;

        _proto.update = function update(m, inv) {
          // RTR4, ch. 22.14.1, p. 983
          // extract frustum planes from view-proj matrix.
          // left plane
          Vec3.set(this.planes[0].n, m.m03 + m.m00, m.m07 + m.m04, m.m11 + m.m08);
          this.planes[0].d = -(m.m15 + m.m12); // right plane

          Vec3.set(this.planes[1].n, m.m03 - m.m00, m.m07 - m.m04, m.m11 - m.m08);
          this.planes[1].d = -(m.m15 - m.m12); // bottom plane

          Vec3.set(this.planes[2].n, m.m03 + m.m01, m.m07 + m.m05, m.m11 + m.m09);
          this.planes[2].d = -(m.m15 + m.m13); // top plane

          Vec3.set(this.planes[3].n, m.m03 - m.m01, m.m07 - m.m05, m.m11 - m.m09);
          this.planes[3].d = -(m.m15 - m.m13); // near plane

          Vec3.set(this.planes[4].n, m.m03 + m.m02, m.m07 + m.m06, m.m11 + m.m10);
          this.planes[4].d = -(m.m15 + m.m14); // far plane

          Vec3.set(this.planes[5].n, m.m03 - m.m02, m.m07 - m.m06, m.m11 - m.m10);
          this.planes[5].d = -(m.m15 - m.m14);

          if (this._type !== enums.SHAPE_FRUSTUM_ACCURATE) {
            return;
          } // normalize planes


          for (var i = 0; i < 6; i++) {
            var pl = this.planes[i];
            var invDist = 1 / pl.n.length();
            Vec3.multiplyScalar(pl.n, pl.n, invDist);
            pl.d *= invDist;
          } // update frustum vertices


          for (var _i3 = 0; _i3 < 8; _i3++) {
            Vec3.transformMat4(this.vertices[_i3], _v[_i3], inv);
          }
        }
        /**
         * @en
         * Transform this frustum.
         * @zh
         * 变换此截锥体。
         * @param mat 变换矩阵。
         */
        ;

        _proto.transform = function transform(mat) {
          if (this._type !== enums.SHAPE_FRUSTUM_ACCURATE) {
            return;
          }

          for (var i = 0; i < 8; i++) {
            Vec3.transformMat4(this.vertices[i], this.vertices[i], mat);
          }

          Plane.fromPoints(this.planes[0], this.vertices[1], this.vertices[6], this.vertices[5]);
          Plane.fromPoints(this.planes[1], this.vertices[3], this.vertices[4], this.vertices[7]);
          Plane.fromPoints(this.planes[2], this.vertices[6], this.vertices[3], this.vertices[7]);
          Plane.fromPoints(this.planes[3], this.vertices[0], this.vertices[5], this.vertices[4]);
          Plane.fromPoints(this.planes[4], this.vertices[2], this.vertices[0], this.vertices[3]);
          Plane.fromPoints(this.planes[5], this.vertices[7], this.vertices[5], this.vertices[6]);
        };

        _proto.updatePlanes = function updatePlanes() {
          // left plane
          Plane.fromPoints(this.planes[0], this.vertices[1], this.vertices[6], this.vertices[5]); // right plane

          Plane.fromPoints(this.planes[1], this.vertices[3], this.vertices[4], this.vertices[7]); // bottom plane

          Plane.fromPoints(this.planes[2], this.vertices[6], this.vertices[3], this.vertices[7]); // top plane

          Plane.fromPoints(this.planes[3], this.vertices[0], this.vertices[5], this.vertices[4]); // near plane

          Plane.fromPoints(this.planes[4], this.vertices[2], this.vertices[0], this.vertices[3]); // far plane

          Plane.fromPoints(this.planes[5], this.vertices[7], this.vertices[5], this.vertices[6]);
        };

        _createClass(Frustum, [{
          key: "accurate",
          set:
          /**
           * @en
           * Set whether to use accurate intersection testing function on this frustum.
           * @zh
           * 设置是否在此截锥体上使用精确的相交测试函数。
           */
          function set(b) {
            this._type = b ? enums.SHAPE_FRUSTUM_ACCURATE : enums.SHAPE_FRUSTUM;
          }
          /**
           * @en
           * Create a ortho frustum.
           * @zh
           * 创建一个正交视锥体。
           * @param out 正交视锥体。
           * @param width 正交视锥体的宽度。
           * @param height 正交视锥体的高度。
           * @param near 正交视锥体的近平面值。
           * @param far 正交视锥体的远平面值。
           * @param transform 正交视锥体的变换矩阵。
           * @return {Frustum} frustum.
           */

        }, {
          key: "type",
          get: function get() {
            return this._type;
          }
        }]);

        return Frustum;
      }());

      Frustum.createOrtho = function () {
        return function (out, width, height, near, far, transform) {
          var halfWidth = width / 2;
          var halfHeight = height / 2;
          Vec3.set(_temp_v3, halfWidth, halfHeight, -near);
          Vec3.transformMat4(out.vertices[0], _temp_v3, transform);
          Vec3.set(_temp_v3, -halfWidth, halfHeight, -near);
          Vec3.transformMat4(out.vertices[1], _temp_v3, transform);
          Vec3.set(_temp_v3, -halfWidth, -halfHeight, -near);
          Vec3.transformMat4(out.vertices[2], _temp_v3, transform);
          Vec3.set(_temp_v3, halfWidth, -halfHeight, -near);
          Vec3.transformMat4(out.vertices[3], _temp_v3, transform);
          Vec3.set(_temp_v3, halfWidth, halfHeight, -far);
          Vec3.transformMat4(out.vertices[4], _temp_v3, transform);
          Vec3.set(_temp_v3, -halfWidth, halfHeight, -far);
          Vec3.transformMat4(out.vertices[5], _temp_v3, transform);
          Vec3.set(_temp_v3, -halfWidth, -halfHeight, -far);
          Vec3.transformMat4(out.vertices[6], _temp_v3, transform);
          Vec3.set(_temp_v3, halfWidth, -halfHeight, -far);
          Vec3.transformMat4(out.vertices[7], _temp_v3, transform);
          Plane.fromPoints(out.planes[0], out.vertices[1], out.vertices[6], out.vertices[5]);
          Plane.fromPoints(out.planes[1], out.vertices[3], out.vertices[4], out.vertices[7]);
          Plane.fromPoints(out.planes[2], out.vertices[6], out.vertices[3], out.vertices[7]);
          Plane.fromPoints(out.planes[3], out.vertices[0], out.vertices[5], out.vertices[4]);
          Plane.fromPoints(out.planes[4], out.vertices[2], out.vertices[0], out.vertices[3]);
          Plane.fromPoints(out.planes[5], out.vertices[7], out.vertices[5], out.vertices[6]);
        };
      }();
    }
  };
});
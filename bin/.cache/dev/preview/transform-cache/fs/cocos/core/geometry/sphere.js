System.register("q-bundled:///fs/cocos/core/geometry/sphere.js", ["../math/index.js", "./enums.js"], function (_export, _context) {
  "use strict";

  var Vec3, enums, _v3_tmp, _offset, _min, _max, Sphere;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function maxComponent(v) {
    return Math.max(Math.max(v.x, v.y), v.z);
  }
  /**
   * @en
   * Basic Geometry: Sphere.
   * @zh
   * 基础几何 轴对齐球。
   */


  return {
    setters: [function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_enumsJs) {
      enums = _enumsJs.default;
    }],
    execute: function () {
      _v3_tmp = new Vec3();
      _offset = new Vec3();
      _min = new Vec3();
      _max = new Vec3();

      _export("Sphere", Sphere = /*#__PURE__*/function () {
        /**
         * @en
         * create a new sphere
         * @zh
         * 创建一个新的 sphere 实例。
         * @param cx 形状的相对于原点的 X 坐标。
         * @param cy 形状的相对于原点的 Y 坐标。
         * @param cz 形状的相对于原点的 Z 坐标。
         * @param r 球体的半径
         * @return {Sphere} 返回一个 sphere。
         */
        Sphere.create = function create(cx, cy, cz, r) {
          return new Sphere(cx, cy, cz, r);
        }
        /**
         * @en
         * clone a new sphere
         * @zh
         * 克隆一个新的 sphere 实例。
         * @param {Sphere} p 克隆的目标。
         * @return {Sphere} 克隆出的示例。
         */
        ;

        Sphere.clone = function clone(p) {
          return new Sphere(p.center.x, p.center.y, p.center.z, p.radius);
        }
        /**
         * @en
         * copy the values from one sphere to another
         * @zh
         * 将从一个 sphere 的值复制到另一个 sphere。
         * @param {Sphere} out 接受操作的 sphere。
         * @param {Sphere} a 被复制的 sphere。
         * @return {Sphere} out 接受操作的 sphere。
         */
        ;

        Sphere.copy = function copy(out, p) {
          Vec3.copy(out.center, p.center);
          out.radius = p.radius;
          return out;
        }
        /**
         * @en
         * create a new bounding sphere from two corner points
         * @zh
         * 从两个点创建一个新的 sphere。
         * @param out - 接受操作的 sphere。
         * @param minPos - sphere 的最小点。
         * @param maxPos - sphere 的最大点。
         * @returns {Sphere} out 接受操作的 sphere。
         */
        ;

        Sphere.fromPoints = function fromPoints(out, minPos, maxPos) {
          Vec3.multiplyScalar(out.center, Vec3.add(_v3_tmp, minPos, maxPos), 0.5);
          out.radius = Vec3.subtract(_v3_tmp, maxPos, minPos).length() * 0.5;
          return out;
        }
        /**
         * @en
         * Set the components of a sphere to the given values
         * @zh
         * 将球体的属性设置为给定的值。
         * @param {Sphere} out 接受操作的 sphere。
         * @param cx 形状的相对于原点的 X 坐标。
         * @param cy 形状的相对于原点的 Y 坐标。
         * @param cz 形状的相对于原点的 Z 坐标。
         * @param {number} r 半径。
         * @return {Sphere} out 接受操作的 sphere。
         * @function
         */
        ;

        Sphere.set = function set(out, cx, cy, cz, r) {
          out.center.x = cx;
          out.center.y = cy;
          out.center.z = cz;
          out.radius = r;
          return out;
        }
        /**
         * @en
         * The center of this sphere.
         * @zh
         * 本地坐标的中心点。
         */
        ;

        /**
         * @en
         * Construct a sphere.
         * @zh
         * 构造一个球。
         * @param cx 该球的世界坐标的 X 坐标。
         * @param cy 该球的世界坐标的 Y 坐标。
         * @param cz 该球的世界坐标的 Z 坐标。
         * @param {number} r 半径。
         */
        function Sphere(cx, cy, cz, r) {
          if (cx === void 0) {
            cx = 0;
          }

          if (cy === void 0) {
            cy = 0;
          }

          if (cz === void 0) {
            cz = 0;
          }

          if (r === void 0) {
            r = 1;
          }

          this._center = new Vec3(0, 0, 0);
          this._radius = 0;
          this._type = void 0;
          this._type = enums.SHAPE_SPHERE;
          this._center = new Vec3(cx, cy, cz);
          this._radius = r;
        }

        var _proto = Sphere.prototype;

        _proto.destroy = function destroy() {}
        /**
         * @en
         * Get a clone.
         * @zh
         * 获得克隆。
         */
        ;

        _proto.clone = function clone() {
          return Sphere.clone(this);
        }
        /**
         * @en
         * Copy a sphere.
         * @zh
         * 拷贝对象。
         * @param a 拷贝的目标。
         */
        ;

        _proto.copy = function copy(a) {
          return Sphere.copy(this, a);
        }
        /**
         * @en
         * Get the bounding points of this shape
         * @zh
         * 获取此形状的边界点。
         * @param {Vec3} minPos 最小点。
         * @param {Vec3} maxPos 最大点。
         */
        ;

        _proto.getBoundary = function getBoundary(minPos, maxPos) {
          Vec3.set(minPos, this.center.x - this.radius, this.center.y - this.radius, this.center.z - this.radius);
          Vec3.set(maxPos, this.center.x + this.radius, this.center.y + this.radius, this.center.z + this.radius);
        }
        /**
         * @en
         * Transform this shape
         * @zh
         * 将 out 根据这个 sphere 的数据进行变换。
         * @param m 变换的矩阵。
         * @param pos 变换的位置部分。
         * @param rot 变换的旋转部分。
         * @param scale 变换的缩放部分。
         * @param out 变换的目标。
         */
        ;

        _proto.transform = function transform(m, pos, rot, scale, out) {
          Vec3.transformMat4(out.center, this.center, m);
          out.radius = this.radius * maxComponent(scale);
        }
        /**
         * @en
         * Translate and rotate this sphere.
         * @zh
         * 将 out 根据这个 sphere 的数据进行变换。
         * @param m 变换的矩阵。
         * @param rot 变换的旋转部分。
         * @param out 变换的目标。
         */
        ;

        _proto.translateAndRotate = function translateAndRotate(m, rot, out) {
          Vec3.transformMat4(out.center, this.center, m);
        }
        /**
         * @en
         * Scaling this sphere.
         * @zh
         * 将 out 根据这个 sphere 的数据进行缩放。
         * @param scale 缩放值。
         * @param out 缩放的目标。
         */
        ;

        _proto.setScale = function setScale(scale, out) {
          out.radius = this.radius * maxComponent(scale);
        }
        /**
         * @en Sphere and point merge.
         * @zh 球跟点合并
         * @param point 点
         */
        ;

        _proto.mergePoint = function mergePoint(point) {
          // if sphere.radius Less than 0,
          // Set this point as anchor,
          // And set radius to 0.
          if (this.radius < 0.0) {
            this.center.set(point);
            this.radius = 0.0;
          }

          Vec3.subtract(_offset, point, this.center);

          var dist = _offset.length();

          if (dist > this.radius) {
            var half = (dist - this.radius) * 0.5;
            this.radius += half;
            Vec3.multiplyScalar(_offset, _offset, half / dist);
            Vec3.add(this.center, this.center, _offset);
          }
        }
        /**
         * @en Sphere and points merge.
         * @zh 球跟一系列点合并
         * @param points 一系列点
         */
        ;

        _proto.mergePoints = function mergePoints(points) {
          var length = points.length;
          if (length < 1) return; // Init Invalid Sphere

          this.radius = -1.0;

          for (var i = 0; i < length; i++) {
            this.mergePoint(points[i]);
          }
        }
        /**
         * @en Sphere and AABB merge.
         * @zh 球跟立方体合并
         * @param a 立方体
         */
        ;

        _proto.mergeAABB = function mergeAABB(a) {
          a.getBoundary(_min, _max);
          this.mergePoint(_min);
          this.mergePoint(_max);
        };

        _createClass(Sphere, [{
          key: "center",
          get: function get() {
            return this._center;
          },
          set: function set(val) {
            this._center = val;
          }
        }, {
          key: "radius",
          get:
          /**
            * @en
            * The radius of this sphere.
            * @zh
            * 半径。
            */
          function get() {
            return this._radius;
          },
          set: function set(val) {
            this._radius = val;
          }
          /**
           * @en
           * Gets the type of the shape.
           * @zh
           * 获取形状的类型。
           */

        }, {
          key: "type",
          get: function get() {
            return this._type;
          }
        }]);

        return Sphere;
      }());
    }
  };
});
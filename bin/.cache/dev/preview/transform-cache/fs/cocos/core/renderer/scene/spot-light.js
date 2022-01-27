System.register("q-bundled:///fs/cocos/core/renderer/scene/spot-light.js", ["../../../../../virtual/internal%253Aconstants.js", "../../geometry/index.js", "../../global-exports.js", "../../math/index.js", "./light.js"], function (_export, _context) {
  "use strict";

  var JSB, AABB, Frustum, legacyCC, Mat4, Quat, Vec3, Light, LightType, nt2lm, _forward, _qt, _matView, _matProj, _matViewProj, _matViewProjInv, SpotLight;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_geometryIndexJs) {
      AABB = _geometryIndexJs.AABB;
      Frustum = _geometryIndexJs.Frustum;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
      Quat = _mathIndexJs.Quat;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_lightJs) {
      Light = _lightJs.Light;
      LightType = _lightJs.LightType;
      nt2lm = _lightJs.nt2lm;
    }],
    execute: function () {
      _forward = new Vec3(0, 0, -1);
      _qt = new Quat();
      _matView = new Mat4();
      _matProj = new Mat4();
      _matViewProj = new Mat4();
      _matViewProjInv = new Mat4();

      _export("SpotLight", SpotLight = /*#__PURE__*/function (_Light) {
        _inheritsLoose(SpotLight, _Light);

        var _proto = SpotLight.prototype;

        /**
         * @en Cached uniform variables.
         * @zh 缓存下来的 uniform 变量。
         */

        /**
         * @en User-specified full-angle radians.
         * @zh 用户指定的全角弧度。
         */
        _proto._init = function _init() {
          _Light.prototype._init.call(this);

          if (JSB) {
            var nativeSpotLight = this._nativeObj;
            nativeSpotLight.setAABB(this._aabb["native"]);
            nativeSpotLight.setFrustum(this._frustum);
            nativeSpotLight.setDirection(this._dir);
            nativeSpotLight.setPosition(this._pos);
          }
        };

        _proto._destroy = function _destroy() {
          _Light.prototype._destroy.call(this);
        };

        _proto._setDirection = function _setDirection(dir) {
          this._dir.set(dir);

          if (JSB) {
            this._nativeObj.setDirection(dir);
          }
        };

        function SpotLight() {
          var _this;

          _this = _Light.call(this) || this;
          _this._dir = new Vec3(1.0, -1.0, -1.0);
          _this._range = 5.0;
          _this._spotAngle = Math.cos(Math.PI / 6);
          _this._pos = void 0;
          _this._aabb = void 0;
          _this._frustum = void 0;
          _this._angle = 0;
          _this._needUpdate = false;
          _this._size = 0.15;
          _this._luminanceHDR = 0;
          _this._luminanceLDR = 0;
          _this._aspect = 0;
          _this._aabb = AABB.create();
          _this._frustum = Frustum.create();
          _this._pos = new Vec3();
          _this._type = LightType.SPOT;
          return _this;
        }

        _proto.initialize = function initialize() {
          _Light.prototype.initialize.call(this);

          var size = 0.15;
          this.size = size;
          this.aspect = 1.0;
          this.luminance = 1700 / nt2lm(size);
          this.luminanceLDR = 1.0;
          this.range = Math.cos(Math.PI / 6);

          this._setDirection(new Vec3(1.0, -1.0, -1.0));
        };

        _proto.update = function update() {
          if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
            this._node.getWorldPosition(this._pos);

            Vec3.transformQuat(this._dir, _forward, this._node.getWorldRotation(_qt));
            Vec3.normalize(this._dir, this._dir);
            AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, this._range, this._range, this._range); // view matrix

            this._node.getWorldRT(_matView);

            Mat4.invert(_matView, _matView);
            Mat4.perspective(_matProj, this._angle, 1.0, 0.001, this._range); // view-projection

            Mat4.multiply(_matViewProj, _matProj, _matView); // Mat4.invert(_matViewProjInv, _matViewProj);

            this._frustum.update(_matViewProj, _matViewProjInv);

            this._needUpdate = false;
          }
        };

        _createClass(SpotLight, [{
          key: "position",
          get: function get() {
            return this._pos;
          }
        }, {
          key: "size",
          get: function get() {
            return this._size;
          },
          set: function set(size) {
            this._size = size;

            if (JSB) {
              this._nativeObj.setSize(size);
            }
          }
        }, {
          key: "range",
          get: function get() {
            return this._range;
          },
          set: function set(range) {
            this._range = range;

            if (JSB) {
              this._nativeObj.setRange(range);
            }

            this._needUpdate = true;
          }
        }, {
          key: "luminance",
          get: function get() {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._luminanceHDR;
            } else {
              return this._luminanceLDR;
            }
          },
          set: function set(value) {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this.luminanceHDR = value;
            } else {
              this.luminanceLDR = value;
            }
          }
        }, {
          key: "luminanceHDR",
          get: function get() {
            return this._luminanceHDR;
          },
          set: function set(value) {
            this._luminanceHDR = value;

            if (JSB) {
              this._nativeObj.setLuminanceHDR(value);
            }
          }
        }, {
          key: "luminanceLDR",
          get: function get() {
            return this._luminanceLDR;
          },
          set: function set(value) {
            this._luminanceLDR = value;

            if (JSB) {
              this._nativeObj.setLuminanceLDR(value);
            }
          }
        }, {
          key: "direction",
          get: function get() {
            return this._dir;
          } // 获取 cache 下来的 cos(angle / 2) 属性值，uniform 里需要

        }, {
          key: "spotAngle",
          get: function get() {
            return this._spotAngle;
          } // 设置用户指定的全角弧度，同时计算 cache 下来的 cos(angle / 2) 属性值，uniform 里需要。
          ,
          set: function set(val) {
            this._angle = val;
            this._spotAngle = Math.cos(val * 0.5);

            if (JSB) {
              this._nativeObj.setAngle(this._spotAngle);
            }

            this._needUpdate = true;
          }
        }, {
          key: "angle",
          get: function get() {
            return this._angle;
          }
        }, {
          key: "aspect",
          get: function get() {
            return this._aspect;
          },
          set: function set(val) {
            this._aspect = val;

            if (JSB) {
              this._nativeObj.setAspect(val);
            }

            this._needUpdate = true;
          }
        }, {
          key: "aabb",
          get: function get() {
            return this._aabb;
          }
        }, {
          key: "frustum",
          get: function get() {
            return this._frustum;
          }
        }]);

        return SpotLight;
      }(Light));
    }
  };
});
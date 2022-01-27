System.register("q-bundled:///fs/cocos/core/renderer/scene/shadows.js", ["../../../../../virtual/internal%253Aconstants.js", "../../assets/material.js", "../../geometry/index.js", "../../math/index.js", "../../global-exports.js", "../../value-types/index.js", "./native-scene.js"], function (_export, _context) {
  "use strict";

  var JSB, Material, Sphere, Color, Mat4, Vec3, Vec2, legacyCC, Enum, NativeShadow, ShadowSize, ShadowType, PCFType, SHADOW_TYPE_NONE, Shadows;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_assetsMaterialJs) {
      Material = _assetsMaterialJs.Material;
    }, function (_geometryIndexJs) {
      Sphere = _geometryIndexJs.Sphere;
    }, function (_mathIndexJs) {
      Color = _mathIndexJs.Color;
      Mat4 = _mathIndexJs.Mat4;
      Vec3 = _mathIndexJs.Vec3;
      Vec2 = _mathIndexJs.Vec2;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_valueTypesIndexJs) {
      Enum = _valueTypesIndexJs.Enum;
    }, function (_nativeSceneJs) {
      NativeShadow = _nativeSceneJs.NativeShadow;
    }],
    execute: function () {
      /**
       * @zh 阴影贴图分辨率。
       * @en The shadow map size.
       * @static
       * @enum Shadows.ShadowSize
       */
      _export("ShadowSize", ShadowSize = Enum({
        /**
         * @zh 分辨率 256 * 256。
         * @en shadow resolution 256 * 256.
         * @readonly
         */
        Low_256x256: 256,

        /**
         * @zh 分辨率 512 * 512。
         * @en shadow resolution 512 * 512.
         * @readonly
         */
        Medium_512x512: 512,

        /**
         * @zh 分辨率 1024 * 1024。
         * @en shadow resolution 1024 * 1024.
         * @readonly
         */
        High_1024x1024: 1024,

        /**
         * @zh 分辨率 2048 * 2048。
         * @en shadow resolution 2048 * 2048.
         * @readonly
         */
        Ultra_2048x2048: 2048
      }));
      /**
       * @zh 阴影类型。
       * @en The shadow type
       * @enum Shadows.ShadowType
       */


      _export("ShadowType", ShadowType = Enum({
        /**
         * @zh 平面阴影。
         * @en Planar shadow
         * @property Planar
         * @readonly
         */
        Planar: 0,

        /**
         * @zh 阴影贴图。
         * @en Shadow type
         * @property ShadowMap
         * @readonly
         */
        ShadowMap: 1
      }));
      /**
       * @zh pcf阴影等级。
       * @en The pcf type
       * @static
       * @enum Shadows.PCFType
       */


      _export("PCFType", PCFType = Enum({
        /**
         * @zh x1 次采样
         * @en x1 times
         * @readonly
         */
        HARD: 0,

        /**
         * @zh 软阴影
         * @en soft shadow
         * @readonly
         */
        SOFT: 1,

        /**
         * @zh 软阴影
         * @en soft shadow
         * @readonly
         */
        SOFT_2X: 2
      }));

      SHADOW_TYPE_NONE = ShadowType.ShadowMap + 1;

      _export("Shadows", Shadows = /*#__PURE__*/function () {
        function Shadows() {
          this.fixedSphere = new Sphere(0.0, 0.0, 0.0, 0.01);
          this.maxReceived = 4;
          this.firstSetCSM = false;
          this.shadowCameraFar = 0;
          this.matShadowView = new Mat4();
          this.matShadowProj = new Mat4();
          this.matShadowViewProj = new Mat4();
          this._normal = new Vec3(0, 1, 0);
          this._shadowColor = new Color(0, 0, 0, 76);
          this._matLight = new Mat4();
          this._material = null;
          this._instancingMaterial = null;
          this._size = new Vec2(512, 512);
          this._enabled = false;
          this._distance = 0;
          this._type = SHADOW_TYPE_NONE;
          this._near = 0.1;
          this._far = 10;
          this._invisibleOcclusionRange = 200;
          this._shadowDistance = 100;
          this._orthoSize = 1;
          this._pcf = 0;
          this._shadowMapDirty = false;
          this._bias = 0;
          this._normalBias = 0;
          this._fixedArea = false;
          this._saturation = 0.75;

          if (JSB) {
            this._nativeObj = new NativeShadow();
          }
        }

        var _proto = Shadows.prototype;

        _proto.getPlanarShader = function getPlanarShader(patches) {
          if (!this._material) {
            this._material = new Material();

            this._material.initialize({
              effectName: 'planar-shadow'
            });

            if (JSB) {
              this._nativeObj.planarPass = this._material.passes[0]["native"];
            }
          }

          return this._material.passes[0].getShaderVariant(patches);
        };

        _proto.getPlanarInstanceShader = function getPlanarInstanceShader(patches) {
          if (!this._instancingMaterial) {
            this._instancingMaterial = new Material();

            this._instancingMaterial.initialize({
              effectName: 'planar-shadow',
              defines: {
                USE_INSTANCING: true
              }
            });

            if (JSB) {
              this._nativeObj.instancePass = this._instancingMaterial.passes[0]["native"];
            }
          }

          return this._instancingMaterial.passes[0].getShaderVariant(patches);
        };

        _proto._setEnable = function _setEnable(val) {
          this._enabled = val;

          if (JSB) {
            this._nativeObj.enabled = val;
            if (!val) this._setType(SHADOW_TYPE_NONE);
          }
        };

        _proto._setType = function _setType(val) {
          this._type = this.enabled ? val : SHADOW_TYPE_NONE;

          if (JSB) {
            this._nativeObj.shadowType = this._type;
          }
        };

        _proto.initialize = function initialize(shadowsInfo) {
          this.near = shadowsInfo.near;
          this.far = shadowsInfo.far;
          this.invisibleOcclusionRange = shadowsInfo.invisibleOcclusionRange;
          this.shadowDistance = shadowsInfo.shadowDistance;
          this.orthoSize = shadowsInfo.orthoSize;
          this.size = shadowsInfo.size;
          this.pcf = shadowsInfo.pcf;
          this.normal = shadowsInfo.normal;
          this.distance = shadowsInfo.distance;
          this.shadowColor = shadowsInfo.shadowColor;
          this.bias = shadowsInfo.bias;
          this.normalBias = shadowsInfo.normalBias;
          this.maxReceived = shadowsInfo.maxReceived;
          this.fixedArea = shadowsInfo.fixedArea;

          this._setEnable(shadowsInfo.enabled);

          this._setType(shadowsInfo.type);

          this.saturation = shadowsInfo.saturation;
        };

        _proto.activate = function activate() {
          if (this.enabled) {
            if (this.type === ShadowType.ShadowMap) {
              this._updatePipeline();
            } else {
              this._updatePlanarInfo();
            }
          } else {
            var root = legacyCC.director.root;
            var pipeline = root.pipeline;
            pipeline.macros.CC_ENABLE_DIR_SHADOW = 0;
            root.onGlobalPipelineStateChanged();
          }
        };

        _proto._updatePlanarInfo = function _updatePlanarInfo() {
          if (!this._material) {
            this._material = new Material();

            this._material.initialize({
              effectName: 'planar-shadow'
            });

            if (JSB) {
              this._nativeObj.planarPass = this._material.passes[0]["native"];
            }
          }

          if (!this._instancingMaterial) {
            this._instancingMaterial = new Material();

            this._instancingMaterial.initialize({
              effectName: 'planar-shadow',
              defines: {
                USE_INSTANCING: true
              }
            });

            if (JSB) {
              this._nativeObj.instancePass = this._instancingMaterial.passes[0]["native"];
            }
          }

          var root = legacyCC.director.root;
          var pipeline = root.pipeline;
          pipeline.macros.CC_ENABLE_DIR_SHADOW = 0;
          root.onGlobalPipelineStateChanged();
        };

        _proto._updatePipeline = function _updatePipeline() {
          var root = legacyCC.director.root;
          var pipeline = root.pipeline;
          pipeline.macros.CC_ENABLE_DIR_SHADOW = 1;
          root.onGlobalPipelineStateChanged();
        };

        _proto._destroy = function _destroy() {
          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto.destroy = function destroy() {
          this._destroy();

          if (this._material) {
            this._material.destroy();
          }

          if (this._instancingMaterial) {
            this._instancingMaterial.destroy();
          }

          this.fixedSphere.destroy();
        };

        _createClass(Shadows, [{
          key: "enabled",
          get:
          /**
           * @en MAX_FAR. This is shadow camera max far.
           * @zh 阴影相机的最远视距。
           */

          /**
           * @en EXPANSION_RATIO. This is shadow boundingBox Coefficient of expansion.
           * @zh 阴影包围盒扩大系数。
           */

          /**
           * @en Whether activate planar shadow.
           * @zh 是否启用平面阴影？
           */
          function get() {
            return this._enabled;
          },
          set: function set(val) {
            this._setEnable(val);

            this.activate();
          }
          /**
           * @en The normal of the plane which receives shadow.
           * @zh 阴影接收平面的法线。
           */

        }, {
          key: "normal",
          get: function get() {
            return this._normal;
          },
          set: function set(val) {
            Vec3.copy(this._normal, val);

            if (JSB) {
              this._nativeObj.normal = this._normal;
            }
          }
          /**
           * @en The distance from coordinate origin to the receiving plane.
           * @zh 阴影接收平面与原点的距离。
           */

        }, {
          key: "distance",
          get: function get() {
            return this._distance;
          },
          set: function set(val) {
            this._distance = val;

            if (JSB) {
              this._nativeObj.distance = val;
            }
          }
          /**
           * @en Shadow color.
           * @zh 阴影颜色。
           */

        }, {
          key: "shadowColor",
          get: function get() {
            return this._shadowColor;
          },
          set: function set(color) {
            this._shadowColor = color;

            if (JSB) {
              this._nativeObj.color = color;
            }
          }
          /**
           * @en get or set shadow invisible Occlusion Range.
           * @zh 控制潜在遮挡体产生的范围。
           */

        }, {
          key: "invisibleOcclusionRange",
          get: function get() {
            return this._invisibleOcclusionRange;
          },
          set: function set(val) {
            this._invisibleOcclusionRange = val;

            if (JSB) {
              this._nativeObj.invisibleOcclusionRange = val;
            }
          }
          /**
           * @en get or set shadow distance.
           * @zh 控制阴影的可视范围。
           */

        }, {
          key: "shadowDistance",
          get: function get() {
            return this._shadowDistance;
          },
          set: function set(val) {
            this._shadowDistance = val;

            if (JSB) {
              this._nativeObj.shadowDistance = val;
            }
          }
          /**
           * @en Shadow type.
           * @zh 阴影类型。
           */

        }, {
          key: "type",
          get: function get() {
            return this._type;
          },
          set: function set(val) {
            this._setType(val);

            this.activate();
          }
          /**
           * @en get or set shadow camera near.
           * @zh 获取或者设置阴影相机近裁剪面。
           */

        }, {
          key: "near",
          get: function get() {
            return this._near;
          },
          set: function set(val) {
            this._near = val;

            if (JSB) {
              this._nativeObj.nearValue = val;
            }
          }
          /**
           * @en get or set shadow camera far.
           * @zh 获取或者设置阴影相机远裁剪面。
           */

        }, {
          key: "far",
          get: function get() {
            return this._far;
          },
          set: function set(val) {
            this._far = val;

            if (JSB) {
              this._nativeObj.farValue = val;
            }
          }
          /**
           * @en get or set shadow camera orthoSize.
           * @zh 获取或者设置阴影相机正交大小。
           */

        }, {
          key: "orthoSize",
          get: function get() {
            return this._orthoSize;
          },
          set: function set(val) {
            this._orthoSize = val;

            if (JSB) {
              this._nativeObj.orthoSize = val;
            }
          }
          /**
           * @en get or set shadow camera orthoSize.
           * @zh 获取或者设置阴影纹理大小。
           */

        }, {
          key: "size",
          get: function get() {
            return this._size;
          },
          set: function set(val) {
            this._size.set(val);

            if (JSB) {
              this._nativeObj.size = val;
            }
          }
          /**
           * @en get or set shadow pcf.
           * @zh 获取或者设置阴影pcf等级。
           */

        }, {
          key: "pcf",
          get: function get() {
            return this._pcf;
          },
          set: function set(val) {
            this._pcf = val;

            if (JSB) {
              this._nativeObj.pcfType = val;
            }
          }
          /**
           * @en shadow Map size has been modified.
           * @zh 阴影贴图大小是否被修改。
           */

        }, {
          key: "shadowMapDirty",
          get: function get() {
            return this._shadowMapDirty;
          },
          set: function set(val) {
            this._shadowMapDirty = val;

            if (JSB) {
              this._nativeObj.shadowMapDirty = val;
            }
          }
          /**
           * @en get or set shadow bias.
           * @zh 获取或者设置阴影偏移量。
           */

        }, {
          key: "bias",
          get: function get() {
            return this._bias;
          },
          set: function set(val) {
            this._bias = val;

            if (JSB) {
              this._nativeObj.bias = val;
            }
          }
          /**
           * @en get or set normal bias.
           * @zh 设置或者获取法线偏移。
           */

        }, {
          key: "normalBias",
          get: function get() {
            return this._normalBias;
          },
          set: function set(val) {
            this._normalBias = val;

            if (JSB) {
              this._nativeObj.normalBias = val;
            }
          }
          /**
           * @en get or set shadow saturation.
           * @zh 设置或者获取阴影饱和度。
           */

        }, {
          key: "saturation",
          get: function get() {
            return this._saturation;
          },
          set: function set(val) {
            this._saturation = val;

            if (JSB) {
              this._nativeObj.saturation = val;
            }
          }
          /**
           * @en get or set fixed area shadow
           * @zh 是否是固定区域阴影
           */

        }, {
          key: "fixedArea",
          get: function get() {
            return this._fixedArea;
          },
          set: function set(val) {
            this._fixedArea = val;

            if (JSB) {
              this._nativeObj.fixedArea = val;
            }
          }
        }, {
          key: "matLight",
          get: function get() {
            return this._matLight;
          }
        }, {
          key: "material",
          get: function get() {
            return this._material;
          }
        }, {
          key: "instancingMaterial",
          get: function get() {
            return this._instancingMaterial;
          }
          /**
           * @en The bounding sphere of the shadow map.
           * @zh 用于计算固定区域阴影 Shadow map 的场景包围球.
           */

        }, {
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }]);

        return Shadows;
      }());

      Shadows.MAX_FAR = 2000.0;
      Shadows.COEFFICIENT_OF_EXPANSION = 2.0 * Math.sqrt(3.0);
      legacyCC.Shadows = Shadows;
    }
  };
});
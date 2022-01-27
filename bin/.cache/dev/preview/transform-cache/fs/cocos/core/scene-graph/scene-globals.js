System.register("q-bundled:///fs/cocos/core/scene-graph/scene-globals.js", ["../data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../assets/texture-cube.js", "../data/utils/attribute.js", "../math/index.js", "../renderer/scene/ambient.js", "../renderer/scene/shadows.js", "../renderer/scene/fog.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, visible, type, displayOrder, readOnly, slide, range, rangeStep, editable, serializable, rangeMin, tooltip, formerlySerializedAs, displayName, help, EDITOR, TextureCube, CCFloat, CCBoolean, CCInteger, Color, Quat, Vec3, Vec2, Vec4, Ambient, Shadows, ShadowType, PCFType, ShadowSize, FogType, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class4, _class5, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _temp2, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _class7, _class8, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _class9, _temp3, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _class10, _class11, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _descriptor39, _descriptor40, _descriptor41, _descriptor42, _temp4, _dec115, _dec116, _dec117, _dec118, _dec119, _dec120, _dec121, _dec122, _dec123, _dec124, _class13, _class14, _descriptor43, _descriptor44, _descriptor45, _descriptor46, _temp5, _dec125, _dec126, _class16, _class17, _descriptor47, _descriptor48, _descriptor49, _descriptor50, _descriptor51, _temp6, _up, _v3, _v4, _col, _qt, normalizeHDRColor, AmbientInfo, SkyboxInfo, FogInfo, ShadowsInfo, DEFAULT_WORLD_MIN_POS, DEFAULT_WORLD_MAX_POS, DEFAULT_OCTREE_DEPTH, OctreeInfo, SceneGlobals;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      visible = _dataDecoratorsIndexJs.visible;
      type = _dataDecoratorsIndexJs.type;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      readOnly = _dataDecoratorsIndexJs.readOnly;
      slide = _dataDecoratorsIndexJs.slide;
      range = _dataDecoratorsIndexJs.range;
      rangeStep = _dataDecoratorsIndexJs.rangeStep;
      editable = _dataDecoratorsIndexJs.editable;
      serializable = _dataDecoratorsIndexJs.serializable;
      rangeMin = _dataDecoratorsIndexJs.rangeMin;
      tooltip = _dataDecoratorsIndexJs.tooltip;
      formerlySerializedAs = _dataDecoratorsIndexJs.formerlySerializedAs;
      displayName = _dataDecoratorsIndexJs.displayName;
      help = _dataDecoratorsIndexJs.help;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_assetsTextureCubeJs) {
      TextureCube = _assetsTextureCubeJs.TextureCube;
    }, function (_dataUtilsAttributeJs) {
      CCFloat = _dataUtilsAttributeJs.CCFloat;
      CCBoolean = _dataUtilsAttributeJs.CCBoolean;
      CCInteger = _dataUtilsAttributeJs.CCInteger;
    }, function (_mathIndexJs) {
      Color = _mathIndexJs.Color;
      Quat = _mathIndexJs.Quat;
      Vec3 = _mathIndexJs.Vec3;
      Vec2 = _mathIndexJs.Vec2;
      Vec4 = _mathIndexJs.Vec4;
    }, function (_rendererSceneAmbientJs) {
      Ambient = _rendererSceneAmbientJs.Ambient;
    }, function (_rendererSceneShadowsJs) {
      Shadows = _rendererSceneShadowsJs.Shadows;
      ShadowType = _rendererSceneShadowsJs.ShadowType;
      PCFType = _rendererSceneShadowsJs.PCFType;
      ShadowSize = _rendererSceneShadowsJs.ShadowSize;
    }, function (_rendererSceneFogJs) {
      FogType = _rendererSceneFogJs.FogType;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _up = new Vec3(0, 1, 0);
      _v3 = new Vec3();
      _v4 = new Vec4();
      _col = new Color();
      _qt = new Quat(); // Normalize HDR color

      normalizeHDRColor = function normalizeHDRColor(color) {
        var intensity = 1.0 / Math.max(Math.max(Math.max(color.x, color.y), color.z), 0.0001);

        if (intensity < 1.0) {
          color.x *= intensity;
          color.y *= intensity;
          color.z *= intensity;
        }
      };
      /**
       * @en Environment lighting information in the Scene
       * @zh 场景的环境光照相关信息
       */


      _export("AmbientInfo", AmbientInfo = (_dec = ccclass('cc.AmbientInfo'), _dec2 = help('i18n:cc.Ambient'), _dec3 = formerlySerializedAs('_skyColor'), _dec4 = formerlySerializedAs('_skyIllum'), _dec5 = formerlySerializedAs('_groundAlbedo'), _dec6 = visible(function () {
        var scene = legacyCC.director.getScene();
        var skybox = scene.globals.skybox;

        if (skybox.useIBL && skybox.applyDiffuseMap) {
          return false;
        } else {
          return true;
        }
      }), _dec7 = tooltip('i18n:ambient.skyLightingColor'), _dec8 = type(CCFloat), _dec9 = tooltip('i18n:ambient.skyIllum'), _dec10 = visible(function () {
        var scene = legacyCC.director.getScene();
        var skybox = scene.globals.skybox;

        if (skybox.useIBL && skybox.applyDiffuseMap) {
          return false;
        } else {
          return true;
        }
      }), _dec11 = tooltip('i18n:ambient.groundLightingColor'), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function AmbientInfo() {
          _initializerDefineProperty(this, "_skyColorHDR", _descriptor, this);

          _initializerDefineProperty(this, "_skyIllumHDR", _descriptor2, this);

          _initializerDefineProperty(this, "_groundAlbedoHDR", _descriptor3, this);

          _initializerDefineProperty(this, "_skyColorLDR", _descriptor4, this);

          _initializerDefineProperty(this, "_skyIllumLDR", _descriptor5, this);

          _initializerDefineProperty(this, "_groundAlbedoLDR", _descriptor6, this);

          this._resource = null;
        }

        var _proto = AmbientInfo.prototype;

        _proto.activate = function activate(resource) {
          this._resource = resource;

          this._resource.initialize(this);
        };

        _createClass(AmbientInfo, [{
          key: "skyColorHDR",
          get: function get() {
            return this._skyColorHDR;
          }
        }, {
          key: "groundAlbedoHDR",
          get: function get() {
            return this._groundAlbedoHDR;
          }
        }, {
          key: "skyIllumHDR",
          get: function get() {
            return this._skyIllumHDR;
          }
        }, {
          key: "skyColorLDR",
          get: function get() {
            return this._skyColorLDR;
          }
        }, {
          key: "groundAlbedoLDR",
          get: function get() {
            return this._groundAlbedoLDR;
          }
        }, {
          key: "skyIllumLDR",
          get: function get() {
            return this._skyIllumLDR;
          }
          /**
           * @en Sky lighting color configurable in editor with color picker
           * @zh 编辑器中可配置的天空光照颜色（通过颜色拾取器）
           */

        }, {
          key: "skyLightingColor",
          get: function get() {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            _v4.set(isHDR ? this._skyColorHDR : this._skyColorLDR);

            normalizeHDRColor(_v4);
            return _col.set(_v4.x * 255, _v4.y * 255, _v4.z * 255, 255);
          },
          set: function set(val) {
            _v4.set(val.x, val.y, val.z, val.w);

            if (legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
              this._skyColorHDR.set(_v4);
            } else {
              this._skyColorLDR.set(_v4);
            }

            if (this._resource) {
              this._resource.skyColor.set(_v4);
            }
          }
        }, {
          key: "skyColor",
          set: function set(val) {
            if (legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
              this._skyColorHDR.set(val);
            } else {
              this._skyColorLDR.set(val);
            }

            if (this._resource) {
              this._resource.skyColor.set(val);
            }
          }
          /**
           * @en Sky illuminance
           * @zh 天空亮度
           */

        }, {
          key: "skyIllum",
          get: function get() {
            if (legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
              return this._skyIllumHDR;
            } else {
              return this._skyIllumLDR;
            }
          }
          /**
           * @en Ground lighting color configurable in editor with color picker
           * @zh 编辑器中可配置的地面光照颜色（通过颜色拾取器）
           */
          ,
          set: function set(val) {
            if (legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
              this._skyIllumHDR = val;
            } else {
              this._skyIllumLDR = val;
            }

            if (this._resource) {
              this._resource.skyIllum = val;
            }
          }
        }, {
          key: "groundLightingColor",
          get: function get() {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            _v4.set(isHDR ? this._groundAlbedoHDR : this._groundAlbedoLDR);

            normalizeHDRColor(_v4);
            return _col.set(_v4.x * 255, _v4.y * 255, _v4.z * 255, 255);
          },
          set: function set(val) {
            _v4.set(val.x, val.y, val.z, val.w);

            if (legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
              this._groundAlbedoHDR.set(_v4);
            } else {
              this._groundAlbedoLDR.set(_v4);
            }

            if (this._resource) {
              this._resource.groundAlbedo.set(_v4);
            }
          }
        }, {
          key: "groundAlbedo",
          set: function set(val) {
            if (legacyCC.director.root.pipeline.pipelineSceneData.isHDR) {
              this._groundAlbedoHDR.set(val);
            } else {
              this._groundAlbedoLDR.set(val);
            }

            if (this._resource) {
              this._resource.groundAlbedo.set(val);
            }
          }
        }]);

        return AmbientInfo;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_skyColorHDR", [serializable, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec4(0.2, 0.5, 0.8, 1.0);
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_skyIllumHDR", [serializable, _dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Ambient.SKY_ILLUM;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_groundAlbedoHDR", [serializable, _dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec4(0.2, 0.2, 0.2, 1.0);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_skyColorLDR", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec4(0.2, 0.5, 0.8, 1.0);
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_skyIllumLDR", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Ambient.SKY_ILLUM;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_groundAlbedoLDR", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec4(0.2, 0.2, 0.2, 1.0);
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "skyLightingColor", [_dec6, editable, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "skyLightingColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "skyIllum", [editable, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "skyIllum"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "groundLightingColor", [_dec10, editable, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "groundLightingColor"), _class2.prototype)), _class2)) || _class) || _class));

      legacyCC.AmbientInfo = AmbientInfo;
      /**
       * @en Skybox related information
       * @zh 天空盒相关信息
       */

      _export("SkyboxInfo", SkyboxInfo = (_dec12 = ccclass('cc.SkyboxInfo'), _dec13 = help('i18n:cc.Skybox'), _dec14 = type(TextureCube), _dec15 = formerlySerializedAs('_envmap'), _dec16 = type(TextureCube), _dec17 = type(TextureCube), _dec18 = type(TextureCube), _dec19 = visible(function () {
        if (this.useIBL) {
          return true;
        }

        return false;
      }), _dec20 = tooltip('i18n:skybox.applyDiffuseMap'), _dec21 = tooltip('i18n:skybox.enabled'), _dec22 = tooltip('i18n:skybox.useIBL'), _dec23 = tooltip('i18n:skybox.useHDR'), _dec24 = type(TextureCube), _dec25 = tooltip('i18n:skybox.envmap'), _dec26 = visible(function () {
        if (this.useIBL) {
          return true;
        }

        return false;
      }), _dec27 = type(TextureCube), _dec12(_class4 = _dec13(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function () {
        function SkyboxInfo() {
          _initializerDefineProperty(this, "_applyDiffuseMap", _descriptor7, this);

          _initializerDefineProperty(this, "_envmapHDR", _descriptor8, this);

          _initializerDefineProperty(this, "_envmapLDR", _descriptor9, this);

          _initializerDefineProperty(this, "_diffuseMapHDR", _descriptor10, this);

          _initializerDefineProperty(this, "_diffuseMapLDR", _descriptor11, this);

          _initializerDefineProperty(this, "_enabled", _descriptor12, this);

          _initializerDefineProperty(this, "_useIBL", _descriptor13, this);

          _initializerDefineProperty(this, "_useHDR", _descriptor14, this);

          this._resource = null;
        }

        var _proto2 = SkyboxInfo.prototype;

        _proto2.activate = function activate(resource) {
          this._resource = resource;

          this._resource.initialize(this);

          this._resource.setEnvMaps(this._envmapHDR, this._envmapLDR);

          this._resource.setDiffuseMaps(this._diffuseMapHDR, this._diffuseMapLDR);

          this._resource.activate(); // update global DS first

        };

        _createClass(SkyboxInfo, [{
          key: "applyDiffuseMap",
          get: function get() {
            return this._applyDiffuseMap;
          }
          /**
           * @en Whether activate skybox in the scene
           * @zh 是否启用天空盒？
           */
          ,
          set:
          /**
           * @en Whether to use diffuse convolution map. Enabled -> Will use map specified. Disabled -> Will revert to hemispheric lighting
           * @zh 是否为IBL启用漫反射卷积图？不启用的话将使用默认的半球光照
           */
          function set(val) {
            this._applyDiffuseMap = val;

            if (this._resource) {
              this._resource.useDiffuseMap = val;
            }
          }
        }, {
          key: "enabled",
          get: function get() {
            return this._enabled;
          }
          /**
           * @en Whether use environment lighting
           * @zh 是否启用环境光照？
           */
          ,
          set: function set(val) {
            if (this._enabled === val) return;
            this._enabled = val;

            if (this._resource) {
              this._resource.enabled = this._enabled;
            }
          }
        }, {
          key: "useIBL",
          get: function get() {
            return this._useIBL;
          }
          /**
           * @en Toggle HDR (TODO: This SHOULD be moved into it's own subgroup away from skybox)
           * @zh 是否启用HDR？
           */
          ,
          set: function set(val) {
            this._useIBL = val;

            if (this._resource) {
              this._resource.useIBL = this._useIBL;
            }
          }
        }, {
          key: "useHDR",
          get: function get() {
            legacyCC.director.root.pipeline.pipelineSceneData.isHDR = this._useHDR;
            return this._useHDR;
          }
          /**
           * @en The texture cube used for the skybox
           * @zh 使用的立方体贴图
           */
          ,
          set: function set(val) {
            legacyCC.director.root.pipeline.pipelineSceneData.isHDR = val;
            this._useHDR = val; // Switch UI to and from LDR/HDR textures depends on HDR state

            if (this._resource) {
              this.envmap = this._resource.envmap;
              this.diffuseMap = this._resource.diffuseMap;

              if (this.diffuseMap == null) {
                this.applyDiffuseMap = false;
              }
            }

            if (this._resource) {
              this._resource.useHDR = this._useHDR;
            }
          }
        }, {
          key: "envmap",
          get: function get() {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._envmapHDR;
            } else {
              return this._envmapLDR;
            }
          }
          /**
           * @en The optional diffusion convolution map used in tandem with IBL
           * @zh 使用的漫反射卷积图
           */
          ,
          set: function set(val) {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this._envmapHDR = val;
            } else {
              this._envmapLDR = val;
            }

            if (!this._envmapHDR) {
              this._diffuseMapHDR = null;
              this._applyDiffuseMap = false;
              this.useIBL = false;
            }

            if (this._resource) {
              this._resource.setEnvMaps(this._envmapHDR, this._envmapLDR);

              this._resource.setDiffuseMaps(this._diffuseMapHDR, this._diffuseMapLDR);

              this._resource.useDiffuseMap = this._applyDiffuseMap;
              this._resource.envmap = val;
            }
          }
        }, {
          key: "diffuseMap",
          get: function get() {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._diffuseMapHDR;
            } else {
              return this._diffuseMapLDR;
            }
          },
          set: function set(val) {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this._diffuseMapHDR = val;
            } else {
              this._diffuseMapLDR = val;
            }

            if (this._resource) {
              this._resource.setDiffuseMaps(this._diffuseMapHDR, this._diffuseMapLDR);
            }
          }
        }]);

        return SkyboxInfo;
      }(), _temp2), (_descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_applyDiffuseMap", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "_envmapHDR", [serializable, _dec14, _dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "_envmapLDR", [serializable, _dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "_diffuseMapHDR", [serializable, _dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "_diffuseMapLDR", [serializable, _dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "_enabled", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class5.prototype, "_useIBL", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class5.prototype, "_useHDR", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class5.prototype, "applyDiffuseMap", [_dec19, editable, _dec20], Object.getOwnPropertyDescriptor(_class5.prototype, "applyDiffuseMap"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "enabled", [editable, _dec21], Object.getOwnPropertyDescriptor(_class5.prototype, "enabled"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useIBL", [editable, _dec22], Object.getOwnPropertyDescriptor(_class5.prototype, "useIBL"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useHDR", [editable, _dec23], Object.getOwnPropertyDescriptor(_class5.prototype, "useHDR"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "envmap", [editable, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class5.prototype, "envmap"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "diffuseMap", [_dec26, editable, readOnly, _dec27], Object.getOwnPropertyDescriptor(_class5.prototype, "diffuseMap"), _class5.prototype)), _class5)) || _class4) || _class4));

      legacyCC.SkyboxInfo = SkyboxInfo;
      /**
       * @zh 全局雾相关信息
       * @en Global fog info
       */

      _export("FogInfo", FogInfo = (_dec28 = ccclass('cc.FogInfo'), _dec29 = help('i18n:cc.Fog'), _dec30 = tooltip('i18n:fog.enabled'), _dec31 = tooltip('i18n:fog.accurate'), _dec32 = tooltip('i18n:fog.fogColor'), _dec33 = type(FogType), _dec34 = tooltip('i18n:fog.type'), _dec35 = visible(function () {
        return this._type !== FogType.LAYERED && this._type !== FogType.LINEAR;
      }), _dec36 = type(CCFloat), _dec37 = range([0, 1]), _dec38 = rangeStep(0.01), _dec39 = displayOrder(3), _dec40 = tooltip('i18n:fog.fogDensity'), _dec41 = visible(function () {
        return this._type !== FogType.LAYERED;
      }), _dec42 = type(CCFloat), _dec43 = rangeStep(0.01), _dec44 = displayOrder(4), _dec45 = tooltip('i18n:fog.fogStart'), _dec46 = visible(function () {
        return this._type === FogType.LINEAR;
      }), _dec47 = type(CCFloat), _dec48 = rangeStep(0.01), _dec49 = displayOrder(5), _dec50 = tooltip('i18n:fog.fogEnd'), _dec51 = visible(function () {
        return this._type !== FogType.LINEAR;
      }), _dec52 = type(CCFloat), _dec53 = rangeMin(0.01), _dec54 = rangeStep(0.01), _dec55 = displayOrder(6), _dec56 = tooltip('i18n:fog.fogAtten'), _dec57 = visible(function () {
        return this._type === FogType.LAYERED;
      }), _dec58 = type(CCFloat), _dec59 = rangeStep(0.01), _dec60 = displayOrder(7), _dec61 = tooltip('i18n:fog.fogTop'), _dec62 = visible(function () {
        return this._type === FogType.LAYERED;
      }), _dec63 = type(CCFloat), _dec64 = rangeStep(0.01), _dec65 = displayOrder(8), _dec66 = tooltip('i18n:fog.fogRange'), _dec28(_class7 = _dec29(_class7 = (_class8 = (_temp3 = _class9 = /*#__PURE__*/function () {
        function FogInfo() {
          _initializerDefineProperty(this, "_type", _descriptor15, this);

          _initializerDefineProperty(this, "_fogColor", _descriptor16, this);

          _initializerDefineProperty(this, "_enabled", _descriptor17, this);

          _initializerDefineProperty(this, "_fogDensity", _descriptor18, this);

          _initializerDefineProperty(this, "_fogStart", _descriptor19, this);

          _initializerDefineProperty(this, "_fogEnd", _descriptor20, this);

          _initializerDefineProperty(this, "_fogAtten", _descriptor21, this);

          _initializerDefineProperty(this, "_fogTop", _descriptor22, this);

          _initializerDefineProperty(this, "_fogRange", _descriptor23, this);

          _initializerDefineProperty(this, "_accurate", _descriptor24, this);

          this._resource = null;
        }

        var _proto3 = FogInfo.prototype;

        _proto3.activate = function activate(resource) {
          this._resource = resource;

          this._resource.initialize(this);

          this._resource.activate();
        };

        _createClass(FogInfo, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          }
          /**
           * @zh 是否启用精确雾效(像素雾)计算
           * @en Enable accurate fog (pixel fog)
           */
          ,
          set:
          /**
           * @zh 是否启用全局雾效
           * @en Enable global fog
           */
          function set(val) {
            if (this._enabled === val) return;
            this._enabled = val;

            if (this._resource) {
              this._resource.enabled = val;

              if (val) {
                this._resource.type = this._type;
              }
            }
          }
        }, {
          key: "accurate",
          get: function get() {
            return this._accurate;
          }
          /**
           * @zh 全局雾颜色
           * @en Global fog color
           */
          ,
          set: function set(val) {
            if (this._accurate === val) return;
            this._accurate = val;

            if (this._resource) {
              this._resource.accurate = val;

              if (val) {
                this._resource.type = this._type;
              }
            }
          }
        }, {
          key: "fogColor",
          get: function get() {
            return this._fogColor;
          }
          /**
           * @zh 全局雾类型
           * @en Global fog type
           */
          ,
          set: function set(val) {
            this._fogColor.set(val);

            if (this._resource) {
              this._resource.fogColor = this._fogColor;
            }
          }
        }, {
          key: "type",
          get: function get() {
            return this._type;
          },
          set: function set(val) {
            this._type = val;

            if (this._resource) {
              this._resource.type = val;
            }
          }
          /**
           * @zh 全局雾浓度
           * @en Global fog density
           */

        }, {
          key: "fogDensity",
          get: function get() {
            return this._fogDensity;
          },
          set: function set(val) {
            this._fogDensity = val;

            if (this._resource) {
              this._resource.fogDensity = val;
            }
          }
          /**
           * @zh 雾效起始位置
           * @en Global fog start position
           */

        }, {
          key: "fogStart",
          get: function get() {
            return this._fogStart;
          },
          set: function set(val) {
            this._fogStart = val;

            if (this._resource) {
              this._resource.fogStart = val;
            }
          }
          /**
           * @zh 雾效结束位置，只适用于线性雾
           * @en Global fog end position, only for linear fog
           */

        }, {
          key: "fogEnd",
          get: function get() {
            return this._fogEnd;
          },
          set: function set(val) {
            this._fogEnd = val;

            if (this._resource) {
              this._resource.fogEnd = val;
            }
          }
          /**
           * @zh 雾效衰减
           * @en Global fog attenuation
           */

        }, {
          key: "fogAtten",
          get: function get() {
            return this._fogAtten;
          },
          set: function set(val) {
            this._fogAtten = val;

            if (this._resource) {
              this._resource.fogAtten = val;
            }
          }
          /**
           * @zh 雾效顶部范围，只适用于层级雾
           * @en Global fog top range, only for layered fog
           */

        }, {
          key: "fogTop",
          get: function get() {
            return this._fogTop;
          },
          set: function set(val) {
            this._fogTop = val;

            if (this._resource) {
              this._resource.fogTop = val;
            }
          }
          /**
           * @zh 雾效范围，只适用于层级雾
           * @en Global fog range, only for layered fog
           */

        }, {
          key: "fogRange",
          get: function get() {
            return this._fogRange;
          },
          set: function set(val) {
            this._fogRange = val;

            if (this._resource) {
              this._resource.fogRange = val;
            }
          }
        }]);

        return FogInfo;
      }(), _class9.FogType = FogType, _temp3), (_descriptor15 = _applyDecoratedDescriptor(_class8.prototype, "_type", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return FogType.LINEAR;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class8.prototype, "_fogColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color('#C8C8C8');
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class8.prototype, "_enabled", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class8.prototype, "_fogDensity", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class8.prototype, "_fogStart", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class8.prototype, "_fogEnd", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 300;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class8.prototype, "_fogAtten", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class8.prototype, "_fogTop", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.5;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class8.prototype, "_fogRange", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.2;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class8.prototype, "_accurate", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class8.prototype, "enabled", [editable, _dec30], Object.getOwnPropertyDescriptor(_class8.prototype, "enabled"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "accurate", [editable, _dec31], Object.getOwnPropertyDescriptor(_class8.prototype, "accurate"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogColor", [editable, _dec32], Object.getOwnPropertyDescriptor(_class8.prototype, "fogColor"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "type", [editable, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class8.prototype, "type"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogDensity", [_dec35, _dec36, _dec37, _dec38, slide, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class8.prototype, "fogDensity"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogStart", [_dec41, _dec42, _dec43, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class8.prototype, "fogStart"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogEnd", [_dec46, _dec47, _dec48, _dec49, _dec50], Object.getOwnPropertyDescriptor(_class8.prototype, "fogEnd"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogAtten", [_dec51, _dec52, _dec53, _dec54, _dec55, _dec56], Object.getOwnPropertyDescriptor(_class8.prototype, "fogAtten"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogTop", [_dec57, _dec58, _dec59, _dec60, _dec61], Object.getOwnPropertyDescriptor(_class8.prototype, "fogTop"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogRange", [_dec62, _dec63, _dec64, _dec65, _dec66], Object.getOwnPropertyDescriptor(_class8.prototype, "fogRange"), _class8.prototype)), _class8)) || _class7) || _class7));
      /**
       * @en Scene level planar shadow related information
       * @zh 平面阴影相关信息
       */


      _export("ShadowsInfo", ShadowsInfo = (_dec67 = ccclass('cc.ShadowsInfo'), _dec68 = help('i18n:cc.Shadow'), _dec69 = tooltip('i18n:shadow.enabled'), _dec70 = type(ShadowType), _dec71 = visible(function () {
        return this._type === ShadowType.Planar;
      }), _dec72 = visible(function () {
        return this._type === ShadowType.Planar;
      }), _dec73 = tooltip('i18n:shadow.normal'), _dec74 = type(CCFloat), _dec75 = tooltip('i18n:shadow.distance'), _dec76 = visible(function () {
        return this._type === ShadowType.Planar;
      }), _dec77 = range([0.0, 1.0, 0.01]), _dec78 = type(CCFloat), _dec79 = tooltip('i18n:shadow.saturation'), _dec80 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec81 = type(PCFType), _dec82 = tooltip('i18n:shadow.pcf'), _dec83 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec84 = type(CCInteger), _dec85 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec86 = type(CCFloat), _dec87 = tooltip('i18n:shadow.bias'), _dec88 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec89 = type(CCFloat), _dec90 = tooltip('i18n:shadow.normalBias'), _dec91 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec92 = type(ShadowSize), _dec93 = tooltip('i18n:shadow.shadowMapSize'), _dec94 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec95 = type(CCBoolean), _dec96 = tooltip('i18n:shadow.fixedArea'), _dec97 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec98 = type(CCFloat), _dec99 = tooltip('i18n:shadow.near'), _dec100 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._fixedArea === true;
      }), _dec101 = type(CCFloat), _dec102 = tooltip('i18n:shadow.far'), _dec103 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._fixedArea === true;
      }), _dec104 = range([0.0, 2000.0, 0.1]), _dec105 = type(CCFloat), _dec106 = tooltip('i18n:shadow.invisibleOcclusionRange'), _dec107 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._fixedArea === false;
      }), _dec108 = range([0.0, 2000.0, 0.1]), _dec109 = type(CCFloat), _dec110 = tooltip('i18n:shadow.shadowDistance'), _dec111 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._fixedArea === false;
      }), _dec112 = type(CCFloat), _dec113 = tooltip('i18n:shadow.orthoSize'), _dec114 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._fixedArea === true;
      }), _dec67(_class10 = _dec68(_class10 = (_class11 = (_temp4 = /*#__PURE__*/function () {
        function ShadowsInfo() {
          _initializerDefineProperty(this, "_type", _descriptor25, this);

          _initializerDefineProperty(this, "_enabled", _descriptor26, this);

          _initializerDefineProperty(this, "_normal", _descriptor27, this);

          _initializerDefineProperty(this, "_distance", _descriptor28, this);

          _initializerDefineProperty(this, "_shadowColor", _descriptor29, this);

          _initializerDefineProperty(this, "_firstSetCSM", _descriptor30, this);

          _initializerDefineProperty(this, "_fixedArea", _descriptor31, this);

          _initializerDefineProperty(this, "_pcf", _descriptor32, this);

          _initializerDefineProperty(this, "_bias", _descriptor33, this);

          _initializerDefineProperty(this, "_normalBias", _descriptor34, this);

          _initializerDefineProperty(this, "_near", _descriptor35, this);

          _initializerDefineProperty(this, "_far", _descriptor36, this);

          _initializerDefineProperty(this, "_shadowDistance", _descriptor37, this);

          _initializerDefineProperty(this, "_invisibleOcclusionRange", _descriptor38, this);

          _initializerDefineProperty(this, "_orthoSize", _descriptor39, this);

          _initializerDefineProperty(this, "_maxReceived", _descriptor40, this);

          _initializerDefineProperty(this, "_size", _descriptor41, this);

          _initializerDefineProperty(this, "_saturation", _descriptor42, this);

          this._resource = null;
        }

        var _proto4 = ShadowsInfo.prototype;

        /**
         * @en Set plane which receives shadow with the given node's world transformation
         * @zh 根据指定节点的世界变换设置阴影接收平面的信息
         * @param node The node for setting up the plane
         */
        _proto4.setPlaneFromNode = function setPlaneFromNode(node) {
          node.getWorldRotation(_qt);
          this.normal = Vec3.transformQuat(_v3, _up, _qt);
          node.getWorldPosition(_v3);
          this.distance = Vec3.dot(this._normal, _v3);
        };

        _proto4.activate = function activate(resource) {
          var _this = this;

          this.pcf = Math.min(this._pcf, PCFType.SOFT_2X);
          this._resource = resource;

          if (EDITOR && this._firstSetCSM) {
            this._resource.firstSetCSM = this._firstSetCSM; // Only the first time render in editor will trigger the auto calculation of shadowDistance

            legacyCC.director.once(legacyCC.Director.EVENT_AFTER_DRAW, function () {
              // Sync automatic calculated shadowDistance in renderer
              _this._firstSetCSM = false;

              if (_this._resource) {
                _this.shadowDistance = Math.min(_this._resource.shadowDistance, Shadows.MAX_FAR);
              }
            });
          }

          this._resource.initialize(this);

          this._resource.activate();
        };

        _createClass(ShadowsInfo, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          },
          set:
          /**
           * @en Whether activate planar shadow
           * @zh 是否启用平面阴影？
           */
          function set(val) {
            if (this._enabled === val) return;
            this._enabled = val;

            if (this._resource) {
              this._resource.enabled = val;

              if (val) {
                this._resource.type = this._type;
              }
            }
          }
        }, {
          key: "type",
          get: function get() {
            return this._type;
          }
          /**
           * @en Shadow color
           * @zh 阴影颜色
           */
          ,
          set: function set(val) {
            this._type = val;

            if (this._resource) {
              this._resource.type = val;
            }
          }
        }, {
          key: "shadowColor",
          get: function get() {
            return this._shadowColor;
          }
          /**
           * @en The normal of the plane which receives shadow
           * @zh 阴影接收平面的法线
           */
          ,
          set: function set(val) {
            this._shadowColor.set(val);

            if (this._resource) {
              this._resource.shadowColor = val;
            }
          }
        }, {
          key: "normal",
          get: function get() {
            return this._normal;
          }
          /**
           * @en The distance from coordinate origin to the receiving plane.
           * @zh 阴影接收平面与原点的距离
           */
          ,
          set: function set(val) {
            Vec3.copy(this._normal, val);

            if (this._resource) {
              this._resource.normal = val;
            }
          }
        }, {
          key: "distance",
          get: function get() {
            return this._distance;
          }
          /**
           * @en Shadow color saturation
           * @zh 阴影颜色饱和度
           */
          ,
          set: function set(val) {
            this._distance = val;

            if (this._resource) {
              this._resource.distance = val;
            }
          }
        }, {
          key: "saturation",
          get: function get() {
            return this._saturation;
          }
          /**
           * @en The normal of the plane which receives shadow
           * @zh 阴影接收平面的法线
           */
          ,
          set: function set(val) {
            if (val > 1.0) {
              this._saturation = val / val;

              if (this._resource) {
                this._resource.saturation = val / val;
              }
            } else {
              this._saturation = val;

              if (this._resource) {
                this._resource.saturation = val;
              }
            }
          }
        }, {
          key: "pcf",
          get: function get() {
            return this._pcf;
          }
          /**
           * @en get or set shadow max received
           * @zh 获取或者设置阴影接收的最大光源数量
           */
          ,
          set: function set(val) {
            this._pcf = val;

            if (this._resource) {
              this._resource.pcf = val;
            }
          }
        }, {
          key: "maxReceived",
          get: function get() {
            return this._maxReceived;
          }
          /**
           * @en get or set shadow map sampler offset
           * @zh 获取或者设置阴影纹理偏移值
           */
          ,
          set: function set(val) {
            this._maxReceived = val;

            if (this._resource) {
              this._resource.maxReceived = val;
            }
          }
        }, {
          key: "bias",
          get: function get() {
            return this._bias;
          }
          /**
           * @en on or off Self-shadowing.
           * @zh 打开或者关闭自阴影。
           */
          ,
          set: function set(val) {
            this._bias = val;

            if (this._resource) {
              this._resource.bias = val;
            }
          }
        }, {
          key: "normalBias",
          get: function get() {
            return this._normalBias;
          }
          /**
           * @en get or set shadow map size
           * @zh 获取或者设置阴影纹理大小
           */
          ,
          set: function set(val) {
            this._normalBias = val;

            if (this._resource) {
              this._resource.normalBias = val;
            }
          }
        }, {
          key: "shadowMapSize",
          get: function get() {
            return this._size.x;
          },
          set: function set(value) {
            this._size.set(value, value);

            if (this._resource) {
              this._resource.size.set(value, value);

              this._resource.shadowMapDirty = true;
            }
          }
        }, {
          key: "size",
          get: function get() {
            return this._size;
          }
          /**
           * @en get or set fixed area shadow
           * @zh 是否是固定区域阴影
           */

        }, {
          key: "fixedArea",
          get: function get() {
            return this._fixedArea;
          }
          /**
           * @en get or set shadow camera near
           * @zh 获取或者设置阴影相机近裁剪面
           */
          ,
          set: function set(val) {
            this._fixedArea = val;

            if (this._resource) {
              this._resource.fixedArea = val;
            }
          }
        }, {
          key: "near",
          get: function get() {
            return this._near;
          }
          /**
           * @en get or set shadow camera far
           * @zh 获取或者设置阴影相机远裁剪面
           */
          ,
          set: function set(val) {
            this._near = val;

            if (this._resource) {
              this._resource.near = val;
            }
          }
        }, {
          key: "far",
          get: function get() {
            return this._far;
          }
          /**
           * @en get or set shadow camera far
           * @zh 获取或者设置潜在阴影产生的范围
           */
          ,
          set: function set(val) {
            this._far = Math.min(val, Shadows.MAX_FAR);

            if (this._resource) {
              this._resource.far = this._far;
            }
          }
        }, {
          key: "invisibleOcclusionRange",
          get: function get() {
            return this._invisibleOcclusionRange;
          }
          /**
           * @en get or set shadow camera far
           * @zh 获取或者设置潜在阴影产生的范围
           */
          ,
          set: function set(val) {
            this._invisibleOcclusionRange = Math.min(val, Shadows.MAX_FAR);

            if (this._resource) {
              this._resource.invisibleOcclusionRange = this._invisibleOcclusionRange;
            }
          }
        }, {
          key: "shadowDistance",
          get: function get() {
            return this._shadowDistance;
          }
          /**
           * @en get or set shadow camera orthoSize
           * @zh 获取或者设置阴影相机正交大小
           */
          ,
          set: function set(val) {
            this._shadowDistance = Math.min(val, Shadows.MAX_FAR);

            if (this._resource) {
              this._resource.shadowDistance = this._shadowDistance;
            }
          }
        }, {
          key: "orthoSize",
          get: function get() {
            return this._orthoSize;
          },
          set: function set(val) {
            this._orthoSize = val;

            if (this._resource) {
              this._resource.orthoSize = val;
            }
          }
        }]);

        return ShadowsInfo;
      }(), _temp4), (_descriptor25 = _applyDecoratedDescriptor(_class11.prototype, "_type", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ShadowType.Planar;
        }
      }), _descriptor26 = _applyDecoratedDescriptor(_class11.prototype, "_enabled", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor27 = _applyDecoratedDescriptor(_class11.prototype, "_normal", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 1, 0);
        }
      }), _descriptor28 = _applyDecoratedDescriptor(_class11.prototype, "_distance", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor29 = _applyDecoratedDescriptor(_class11.prototype, "_shadowColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(0, 0, 0, 76);
        }
      }), _descriptor30 = _applyDecoratedDescriptor(_class11.prototype, "_firstSetCSM", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor31 = _applyDecoratedDescriptor(_class11.prototype, "_fixedArea", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor32 = _applyDecoratedDescriptor(_class11.prototype, "_pcf", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PCFType.HARD;
        }
      }), _descriptor33 = _applyDecoratedDescriptor(_class11.prototype, "_bias", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.00001;
        }
      }), _descriptor34 = _applyDecoratedDescriptor(_class11.prototype, "_normalBias", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      }), _descriptor35 = _applyDecoratedDescriptor(_class11.prototype, "_near", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor36 = _applyDecoratedDescriptor(_class11.prototype, "_far", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10.0;
        }
      }), _descriptor37 = _applyDecoratedDescriptor(_class11.prototype, "_shadowDistance", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor38 = _applyDecoratedDescriptor(_class11.prototype, "_invisibleOcclusionRange", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor39 = _applyDecoratedDescriptor(_class11.prototype, "_orthoSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor40 = _applyDecoratedDescriptor(_class11.prototype, "_maxReceived", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      }), _descriptor41 = _applyDecoratedDescriptor(_class11.prototype, "_size", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(512, 512);
        }
      }), _descriptor42 = _applyDecoratedDescriptor(_class11.prototype, "_saturation", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.75;
        }
      }), _applyDecoratedDescriptor(_class11.prototype, "enabled", [editable, _dec69], Object.getOwnPropertyDescriptor(_class11.prototype, "enabled"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "type", [editable, _dec70], Object.getOwnPropertyDescriptor(_class11.prototype, "type"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowColor", [_dec71], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowColor"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "normal", [_dec72, _dec73], Object.getOwnPropertyDescriptor(_class11.prototype, "normal"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "distance", [_dec74, _dec75, _dec76], Object.getOwnPropertyDescriptor(_class11.prototype, "distance"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "saturation", [editable, _dec77, slide, _dec78, _dec79, _dec80], Object.getOwnPropertyDescriptor(_class11.prototype, "saturation"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "pcf", [_dec81, _dec82, _dec83], Object.getOwnPropertyDescriptor(_class11.prototype, "pcf"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "maxReceived", [_dec84, _dec85], Object.getOwnPropertyDescriptor(_class11.prototype, "maxReceived"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "bias", [_dec86, _dec87, _dec88], Object.getOwnPropertyDescriptor(_class11.prototype, "bias"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "normalBias", [_dec89, _dec90, _dec91], Object.getOwnPropertyDescriptor(_class11.prototype, "normalBias"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowMapSize", [_dec92, _dec93, _dec94], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowMapSize"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "fixedArea", [_dec95, _dec96, _dec97], Object.getOwnPropertyDescriptor(_class11.prototype, "fixedArea"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "near", [_dec98, _dec99, _dec100], Object.getOwnPropertyDescriptor(_class11.prototype, "near"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "far", [_dec101, _dec102, _dec103], Object.getOwnPropertyDescriptor(_class11.prototype, "far"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "invisibleOcclusionRange", [editable, _dec104, slide, _dec105, _dec106, _dec107], Object.getOwnPropertyDescriptor(_class11.prototype, "invisibleOcclusionRange"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowDistance", [editable, _dec108, slide, _dec109, _dec110, _dec111], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowDistance"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "orthoSize", [_dec112, _dec113, _dec114], Object.getOwnPropertyDescriptor(_class11.prototype, "orthoSize"), _class11.prototype)), _class11)) || _class10) || _class10));

      legacyCC.ShadowsInfo = ShadowsInfo;
      /**
       * @en Scene level octree related information
       * @zh 场景八叉树相关信息
       */

      _export("DEFAULT_WORLD_MIN_POS", DEFAULT_WORLD_MIN_POS = new Vec3(-1024.0, -1024.0, -1024.0));

      _export("DEFAULT_WORLD_MAX_POS", DEFAULT_WORLD_MAX_POS = new Vec3(1024.0, 1024.0, 1024.0));

      _export("DEFAULT_OCTREE_DEPTH", DEFAULT_OCTREE_DEPTH = 8);

      _export("OctreeInfo", OctreeInfo = (_dec115 = ccclass('cc.OctreeInfo'), _dec116 = help('i18n:cc.OctreeCulling'), _dec117 = tooltip('i18n:octree_culling.enabled'), _dec118 = tooltip('i18n:octree_culling.minPos'), _dec119 = displayName('World MinPos'), _dec120 = tooltip('i18n:octree_culling.maxPos'), _dec121 = displayName('World MaxPos'), _dec122 = range([4, 12, 1]), _dec123 = type(CCInteger), _dec124 = tooltip('i18n:octree_culling.depth'), _dec115(_class13 = _dec116(_class13 = (_class14 = (_temp5 = /*#__PURE__*/function () {
        function OctreeInfo() {
          _initializerDefineProperty(this, "_enabled", _descriptor43, this);

          _initializerDefineProperty(this, "_minPos", _descriptor44, this);

          _initializerDefineProperty(this, "_maxPos", _descriptor45, this);

          _initializerDefineProperty(this, "_depth", _descriptor46, this);

          this._resource = null;
        }

        var _proto5 = OctreeInfo.prototype;

        _proto5.activate = function activate(resource) {
          this._resource = resource;

          this._resource.initialize(this);
        };

        _createClass(OctreeInfo, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          },
          set:
          /**
           * @en Whether activate octree
           * @zh 是否启用八叉树加速剔除？
           */
          function set(val) {
            if (this._enabled === val) return;
            this._enabled = val;

            if (this._resource) {
              this._resource.enabled = val;
            }
          }
        }, {
          key: "minPos",
          get: function get() {
            return this._minPos;
          },
          set: function set(val) {
            this._minPos = val;

            if (this._resource) {
              this._resource.minPos = val;
            }
          }
        }, {
          key: "maxPos",
          get: function get() {
            return this._maxPos;
          },
          set: function set(val) {
            this._maxPos = val;

            if (this._resource) {
              this._resource.maxPos = val;
            }
          }
        }, {
          key: "depth",
          get: function get() {
            return this._depth;
          },
          set: function set(val) {
            this._depth = val;

            if (this._resource) {
              this._resource.depth = val;
            }
          }
        }]);

        return OctreeInfo;
      }(), _temp5), (_descriptor43 = _applyDecoratedDescriptor(_class14.prototype, "_enabled", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor44 = _applyDecoratedDescriptor(_class14.prototype, "_minPos", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(DEFAULT_WORLD_MIN_POS);
        }
      }), _descriptor45 = _applyDecoratedDescriptor(_class14.prototype, "_maxPos", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(DEFAULT_WORLD_MAX_POS);
        }
      }), _descriptor46 = _applyDecoratedDescriptor(_class14.prototype, "_depth", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return DEFAULT_OCTREE_DEPTH;
        }
      }), _applyDecoratedDescriptor(_class14.prototype, "enabled", [editable, _dec117], Object.getOwnPropertyDescriptor(_class14.prototype, "enabled"), _class14.prototype), _applyDecoratedDescriptor(_class14.prototype, "minPos", [editable, _dec118, _dec119], Object.getOwnPropertyDescriptor(_class14.prototype, "minPos"), _class14.prototype), _applyDecoratedDescriptor(_class14.prototype, "maxPos", [editable, _dec120, _dec121], Object.getOwnPropertyDescriptor(_class14.prototype, "maxPos"), _class14.prototype), _applyDecoratedDescriptor(_class14.prototype, "depth", [editable, _dec122, _dec123, _dec124], Object.getOwnPropertyDescriptor(_class14.prototype, "depth"), _class14.prototype)), _class14)) || _class13) || _class13));
      /**
       * @en All scene related global parameters, it affects all content in the corresponding scene
       * @zh 各类场景级别的渲染参数，将影响全场景的所有物体
       */


      _export("SceneGlobals", SceneGlobals = (_dec125 = ccclass('cc.SceneGlobals'), _dec126 = type(SkyboxInfo), _dec125(_class16 = (_class17 = (_temp6 = /*#__PURE__*/function () {
        function SceneGlobals() {
          _initializerDefineProperty(this, "ambient", _descriptor47, this);

          _initializerDefineProperty(this, "shadows", _descriptor48, this);

          _initializerDefineProperty(this, "_skybox", _descriptor49, this);

          _initializerDefineProperty(this, "fog", _descriptor50, this);

          _initializerDefineProperty(this, "octree", _descriptor51, this);
        }

        var _proto6 = SceneGlobals.prototype;

        _proto6.activate = function activate() {
          var sceneData = legacyCC.director.root.pipeline.pipelineSceneData;
          this.skybox.activate(sceneData.skybox);
          this.ambient.activate(sceneData.ambient);
          this.shadows.activate(sceneData.shadows);
          this.fog.activate(sceneData.fog);
          this.octree.activate(sceneData.octree);
        };

        _createClass(SceneGlobals, [{
          key: "skybox",
          get:
          /**
           * @en Skybox related information
           * @zh 天空盒相关信息
           */
          function get() {
            return this._skybox;
          },
          set: function set(value) {
            this._skybox = value;
          }
          /**
           * @en Octree related information
           * @zh 八叉树相关信息
           */

        }]);

        return SceneGlobals;
      }(), _temp6), (_descriptor47 = _applyDecoratedDescriptor(_class17.prototype, "ambient", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new AmbientInfo();
        }
      }), _descriptor48 = _applyDecoratedDescriptor(_class17.prototype, "shadows", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new ShadowsInfo();
        }
      }), _descriptor49 = _applyDecoratedDescriptor(_class17.prototype, "_skybox", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new SkyboxInfo();
        }
      }), _descriptor50 = _applyDecoratedDescriptor(_class17.prototype, "fog", [editable, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new FogInfo();
        }
      }), _applyDecoratedDescriptor(_class17.prototype, "skybox", [editable, _dec126], Object.getOwnPropertyDescriptor(_class17.prototype, "skybox"), _class17.prototype), _descriptor51 = _applyDecoratedDescriptor(_class17.prototype, "octree", [editable, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new OctreeInfo();
        }
      })), _class17)) || _class16));

      legacyCC.SceneGlobals = SceneGlobals;
    }
  };
});
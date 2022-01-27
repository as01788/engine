System.register("q-bundled:///fs/cocos/core/renderer/scene/skybox.js", ["../../../../../virtual/internal%253Aconstants.js", "../../builtin/index.js", "../../assets/material.js", "../../pipeline/define.js", "../core/material-instance.js", "../../global-exports.js", "./native-scene.js"], function (_export, _context) {
  "use strict";

  var JSB, builtinResMgr, Material, UNIFORM_ENVIRONMENT_BINDING, UNIFORM_DIFFUSEMAP_BINDING, MaterialInstance, legacyCC, NaitveSkybox, skybox_mesh, skybox_material, Skybox;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_builtinIndexJs) {
      builtinResMgr = _builtinIndexJs.builtinResMgr;
    }, function (_assetsMaterialJs) {
      Material = _assetsMaterialJs.Material;
    }, function (_pipelineDefineJs) {
      UNIFORM_ENVIRONMENT_BINDING = _pipelineDefineJs.UNIFORM_ENVIRONMENT_BINDING;
      UNIFORM_DIFFUSEMAP_BINDING = _pipelineDefineJs.UNIFORM_DIFFUSEMAP_BINDING;
    }, function (_coreMaterialInstanceJs) {
      MaterialInstance = _coreMaterialInstanceJs.MaterialInstance;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_nativeSceneJs) {
      NaitveSkybox = _nativeSceneJs.NaitveSkybox;
    }],
    execute: function () {
      skybox_mesh = null;
      skybox_material = null;

      _export("Skybox", Skybox = /*#__PURE__*/function () {
        function Skybox() {
          this._envmapLDR = null;
          this._envmapHDR = null;
          this._diffuseMapLDR = null;
          this._diffuseMapHDR = null;
          this._globalDSManager = null;
          this._model = null;
          this._default = null;
          this._enabled = false;
          this._useIBL = false;
          this._useHDR = true;
          this._useDiffuseMap = false;

          if (JSB) {
            this._nativeObj = new NaitveSkybox();
          }
        }

        var _proto = Skybox.prototype;

        _proto._setEnabled = function _setEnabled(val) {
          this._enabled = val;

          if (JSB) {
            this._nativeObj.enabled = val;
          }
        };

        _proto._setUseIBL = function _setUseIBL(val) {
          this._useIBL = val;

          if (JSB) {
            this._nativeObj.useIBL = val;
          }
        };

        _proto._setUseHDR = function _setUseHDR(val) {
          this._useHDR = val;

          if (JSB) {
            this._nativeObj.useHDR = val;
          }
        };

        _proto._setUseDiffuseMap = function _setUseDiffuseMap(val) {
          this._useDiffuseMap = val;

          if (JSB) {
            this._nativeObj.useDiffuseMap = val;
          }
        };

        _proto.initialize = function initialize(skyboxInfo) {
          this._setEnabled(skyboxInfo.enabled);

          this._setUseIBL(skyboxInfo.useIBL);

          this._setUseDiffuseMap(skyboxInfo.applyDiffuseMap);

          this._setUseHDR(skyboxInfo.useHDR);
        };

        _proto.setEnvMaps = function setEnvMaps(envmapHDR, envmapLDR) {
          this._envmapHDR = envmapHDR;
          this._envmapLDR = envmapLDR;
          var root = legacyCC.director.root;
          var isHDR = root.pipeline.pipelineSceneData.isHDR;

          if (isHDR) {
            if (envmapHDR) {
              root.pipeline.pipelineSceneData.ambient.groundAlbedo.w = envmapHDR.mipmapLevel;
            }
          } else if (envmapLDR) {
            root.pipeline.pipelineSceneData.ambient.groundAlbedo.w = envmapLDR.mipmapLevel;
          }

          this._updateGlobalBinding();

          this._updatePipeline();
        };

        _proto.setDiffuseMaps = function setDiffuseMaps(diffuseMapHDR, diffuseMapLDR) {
          this._diffuseMapHDR = diffuseMapHDR;
          this._diffuseMapLDR = diffuseMapLDR;

          this._updateGlobalBinding();

          this._updatePipeline();
        };

        _proto.activate = function activate() {
          var pipeline = legacyCC.director.root.pipeline;
          this._globalDSManager = pipeline.globalDSManager;
          this._default = builtinResMgr.get('default-cube-texture');

          if (!this._model) {
            this._model = legacyCC.director.root.createModel(legacyCC.renderer.scene.Model); // @ts-expect-error private member access

            this._model._initLocalDescriptors = function () {}; // @ts-expect-error private member access


            this._model._initWorldBoundDescriptors = function () {};

            if (JSB) {
              this._nativeObj.model = this._model["native"];
            }
          }

          var isRGBE = this._default.isRGBE;

          if (this.envmap) {
            isRGBE = this.envmap.isRGBE;
          }

          if (!skybox_material) {
            var mat = new Material();
            mat.initialize({
              effectName: 'skybox',
              defines: {
                USE_RGBE_CUBEMAP: isRGBE
              }
            });
            skybox_material = new MaterialInstance({
              parent: mat
            });
          }

          if (this.enabled) {
            if (!skybox_mesh) {
              skybox_mesh = legacyCC.utils.createMesh(legacyCC.primitives.box({
                width: 2,
                height: 2,
                length: 2
              }));
            }

            this._model.initSubModel(0, skybox_mesh.renderingSubMeshes[0], skybox_material);
          }

          if (!this.envmap) {
            this.envmap = this._default;
          }

          if (!this.diffuseMap) {
            this.diffuseMap = this._default;
          }

          this._updateGlobalBinding();

          this._updatePipeline();
        };

        _proto._updatePipeline = function _updatePipeline() {
          if (this.enabled && skybox_material) {
            skybox_material.recompileShaders({
              USE_RGBE_CUBEMAP: this.isRGBE
            });
          }

          if (this._model) {
            this._model.setSubModelMaterial(0, skybox_material);
          }

          if (JSB) {
            this._nativeObj.isRGBE = this.isRGBE;
          }

          var root = legacyCC.director.root;
          var pipeline = root.pipeline;
          var useIBLValue = this.useIBL ? this.isRGBE ? 2 : 1 : 0;
          var useDiffuseMapValue = this.useIBL && this.useDiffuseMap && this.diffuseMap ? this.isRGBE ? 2 : 1 : 0;
          var useHDRValue = this.useHDR;

          if (pipeline.macros.CC_USE_IBL === useIBLValue && pipeline.macros.CC_USE_DIFFUSEMAP === useDiffuseMapValue && pipeline.macros.CC_USE_HDR === useHDRValue) {
            return;
          }

          pipeline.macros.CC_USE_IBL = useIBLValue;
          pipeline.macros.CC_USE_DIFFUSEMAP = useDiffuseMapValue;
          pipeline.macros.CC_USE_HDR = useHDRValue;
          root.onGlobalPipelineStateChanged();
        };

        _proto._updateGlobalBinding = function _updateGlobalBinding() {
          if (this._globalDSManager) {
            var device = legacyCC.director.root.device;
            var envmap = this.envmap ? this.envmap : this._default;

            if (envmap) {
              var texture = envmap.getGFXTexture();
              var sampler = device.getSampler(envmap.getSamplerInfo());

              this._globalDSManager.bindSampler(UNIFORM_ENVIRONMENT_BINDING, sampler);

              this._globalDSManager.bindTexture(UNIFORM_ENVIRONMENT_BINDING, texture);
            }

            var diffuseMap = this.diffuseMap ? this.diffuseMap : this._default;

            if (diffuseMap) {
              var _texture = diffuseMap.getGFXTexture();

              var _sampler = device.getSampler(diffuseMap.getSamplerInfo());

              this._globalDSManager.bindSampler(UNIFORM_DIFFUSEMAP_BINDING, _sampler);

              this._globalDSManager.bindTexture(UNIFORM_DIFFUSEMAP_BINDING, _texture);
            }

            this._globalDSManager.update();
          }
        };

        _proto._destroy = function _destroy() {
          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto.destroy = function destroy() {
          this._destroy();
        };

        _createClass(Skybox, [{
          key: "model",
          get: function get() {
            return this._model;
          }
          /**
           * @en Whether activate skybox in the scene
           * @zh 是否启用天空盒？
           */

        }, {
          key: "enabled",
          get: function get() {
            return this._enabled;
          },
          set: function set(val) {
            this._setEnabled(val);

            if (val) this.activate();else this._updatePipeline();
          }
          /**
           * @en HDR
           * @zh 是否启用HDR？
           */

        }, {
          key: "useHDR",
          get: function get() {
            return this._useHDR;
          },
          set: function set(val) {
            this._setUseHDR(val);

            this.setEnvMaps(this._envmapHDR, this._envmapLDR);
          }
          /**
           * @en Whether use IBL
           * @zh 是否启用IBL？
           */

        }, {
          key: "useIBL",
          get: function get() {
            return this._useIBL;
          },
          set: function set(val) {
            this._setUseIBL(val);

            this._updatePipeline();
          }
          /**
           * @en Whether use diffuse convolution map lighting
           * @zh 是否为IBL启用漫反射卷积图？
           */

        }, {
          key: "useDiffuseMap",
          get: function get() {
            return this._useDiffuseMap;
          },
          set: function set(val) {
            this._useDiffuseMap = val;

            this._updateGlobalBinding();

            this._updatePipeline();
          }
          /**
           * @en Whether enable RGBE data support in skybox shader
           * @zh 是否需要开启 shader 内的 RGBE 数据支持？
           */

        }, {
          key: "isRGBE",
          get: function get() {
            if (this.envmap) {
              return this.envmap.isRGBE;
            } else {
              return false;
            }
          }
          /**
           * @en The texture cube used for the skybox
           * @zh 使用的立方体贴图
           */

        }, {
          key: "envmap",
          get: function get() {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._envmapHDR;
            } else {
              return this._envmapLDR;
            }
          },
          set: function set(val) {
            var root = legacyCC.director.root;
            var isHDR = root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this.setEnvMaps(val, this._envmapLDR);
            } else {
              this.setEnvMaps(this._envmapHDR, val);
            }
          }
          /**
           * @en The texture cube used diffuse convolution map
           * @zh 使用的漫反射卷积图
           */

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
              this.setDiffuseMaps(val, this._diffuseMapLDR);
            } else {
              this.setDiffuseMaps(this._diffuseMapHDR, val);
            }
          }
        }, {
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }]);

        return Skybox;
      }());

      legacyCC.Skybox = Skybox;
    }
  };
});
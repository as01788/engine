System.register("q-bundled:///fs/cocos/core/renderer/scene/submodel.js", ["../../../../../virtual/internal%253Aconstants.js", "../../pipeline/define.js", "../core/pass.js", "../../gfx/index.js", "../../global-exports.js", "../../platform/debug.js", "./native-scene.js", "../../pipeline/pass-phase.js"], function (_export, _context) {
  "use strict";

  var JSB, RenderPriority, UNIFORM_REFLECTION_TEXTURE_BINDING, UNIFORM_REFLECTION_STORAGE_BINDING, BatchingSchemes, DescriptorSetInfo, TextureType, TextureUsageBit, TextureInfo, Format, Filter, Address, SamplerInfo, legacyCC, errorID, NativeSubModel, getPhaseID, _dsInfo, MAX_PASS_COUNT, SubModel;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_pipelineDefineJs) {
      RenderPriority = _pipelineDefineJs.RenderPriority;
      UNIFORM_REFLECTION_TEXTURE_BINDING = _pipelineDefineJs.UNIFORM_REFLECTION_TEXTURE_BINDING;
      UNIFORM_REFLECTION_STORAGE_BINDING = _pipelineDefineJs.UNIFORM_REFLECTION_STORAGE_BINDING;
    }, function (_corePassJs) {
      BatchingSchemes = _corePassJs.BatchingSchemes;
    }, function (_gfxIndexJs) {
      DescriptorSetInfo = _gfxIndexJs.DescriptorSetInfo;
      TextureType = _gfxIndexJs.TextureType;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      TextureInfo = _gfxIndexJs.TextureInfo;
      Format = _gfxIndexJs.Format;
      Filter = _gfxIndexJs.Filter;
      Address = _gfxIndexJs.Address;
      SamplerInfo = _gfxIndexJs.SamplerInfo;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }, function (_nativeSceneJs) {
      NativeSubModel = _nativeSceneJs.NativeSubModel;
    }, function (_pipelinePassPhaseJs) {
      getPhaseID = _pipelinePassPhaseJs.getPhaseID;
    }],
    execute: function () {
      _dsInfo = new DescriptorSetInfo(null);
      MAX_PASS_COUNT = 8;

      _export("SubModel", SubModel = /*#__PURE__*/function () {
        function SubModel() {
          this._device = null;
          this._passes = null;
          this._shaders = null;
          this._subMesh = null;
          this._patches = null;
          this._priority = RenderPriority.DEFAULT;
          this._inputAssembler = null;
          this._descriptorSet = null;
          this._worldBoundDescriptorSet = null;
          this._planarInstanceShader = null;
          this._planarShader = null;
          this._reflectionTex = null;
          this._reflectionSampler = null;
        }

        var _proto = SubModel.prototype;

        _proto._destroyDescriptorSet = function _destroyDescriptorSet() {
          this._descriptorSet.destroy();

          if (JSB) {
            this._nativeObj.setDescriptorSet(null);
          }

          this._descriptorSet = null;
        };

        _proto._destroyWorldBoundDescriptorSet = function _destroyWorldBoundDescriptorSet() {
          this._worldBoundDescriptorSet.destroy();

          if (JSB) {
            this._nativeObj.setWorldBoundDescriptorSet(null);
          }

          this._worldBoundDescriptorSet = null;
        };

        _proto._destroyInputAssembler = function _destroyInputAssembler() {
          this._inputAssembler.destroy();

          if (JSB) {
            this._nativeObj.setInputAssembler(null);
          }

          this._inputAssembler = null;
        };

        _proto._createDescriptorSet = function _createDescriptorSet(descInfo) {
          this._descriptorSet = this._device.createDescriptorSet(descInfo);

          if (JSB) {
            this._nativeObj.setDescriptorSet(this._descriptorSet);
          }
        };

        _proto._createWorldBoundDescriptorSet = function _createWorldBoundDescriptorSet(descInfo) {
          this._worldBoundDescriptorSet = this._device.createDescriptorSet(descInfo);

          if (JSB) {
            this._nativeObj.setWorldBoundDescriptorSet(this._worldBoundDescriptorSet);
          }
        };

        _proto._setInputAssembler = function _setInputAssembler(iaInfo) {
          this._inputAssembler = this._device.createInputAssembler(iaInfo);

          if (JSB) {
            this._nativeObj.setInputAssembler(this._inputAssembler);
          }
        };

        _proto._setSubMesh = function _setSubMesh(subMesh) {
          this._subMesh = subMesh;

          if (JSB) {
            this._nativeObj.setSubMeshBuffers(subMesh.flatBuffers);
          }
        };

        _proto._init = function _init() {
          if (JSB) {
            this._nativeObj = new NativeSubModel();
          }
        };

        _proto.initialize = function initialize(subMesh, passes, patches) {
          if (patches === void 0) {
            patches = null;
          }

          var root = legacyCC.director.root;
          this._device = root.device;
          _dsInfo.layout = passes[0].localSetLayout;

          this._init();

          this._setInputAssembler(subMesh.iaInfo);

          this._createDescriptorSet(_dsInfo);

          var pipeline = legacyCC.director.root.pipeline;
          var occlusionPass = pipeline.pipelineSceneData.getOcclusionQueryPass();
          var occlusionDSInfo = new DescriptorSetInfo(null);
          occlusionDSInfo.layout = occlusionPass.localSetLayout;

          this._createWorldBoundDescriptorSet(occlusionDSInfo);

          this._setSubMesh(subMesh);

          this._patches = patches;
          this._passes = passes;

          this._flushPassInfo();

          if (passes[0].batchingScheme === BatchingSchemes.VB_MERGING) {
            this.subMesh.genFlatBuffers();

            this._setSubMesh(this.subMesh);
          }

          this.priority = RenderPriority.DEFAULT; // initialize resources for reflection material

          if (passes[0].phase === getPhaseID('reflection')) {
            var texWidth = root.mainWindow.width;
            var texHeight = root.mainWindow.height;
            var minSize = 512;

            if (texHeight < texWidth) {
              texWidth = minSize * texWidth / texHeight;
              texHeight = minSize;
            } else {
              texWidth = minSize;
              texHeight = minSize * texHeight / texWidth;
            }

            this._reflectionTex = this._device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.STORAGE | TextureUsageBit.TRANSFER_SRC | TextureUsageBit.SAMPLED, Format.RGBA8, texWidth, texHeight));
            this.descriptorSet.bindTexture(UNIFORM_REFLECTION_TEXTURE_BINDING, this._reflectionTex);
            this._reflectionSampler = this._device.getSampler(new SamplerInfo(Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP));
            this.descriptorSet.bindSampler(UNIFORM_REFLECTION_TEXTURE_BINDING, this._reflectionSampler);
            this.descriptorSet.bindTexture(UNIFORM_REFLECTION_STORAGE_BINDING, this._reflectionTex);
          }
        };

        _proto._initNativePlanarShadowShader = function _initNativePlanarShadowShader(shadowInfo) {
          this._planarShader = shadowInfo.getPlanarShader(this._patches);

          if (JSB) {
            this._nativeObj.setPlanarShader(this._planarShader);
          }
        } // This is a temporary solution
        // It should not be written in a fixed way, or modified by the user
        ;

        _proto.initPlanarShadowShader = function initPlanarShadowShader() {
          var pipeline = legacyCC.director.root.pipeline;
          var shadowInfo = pipeline.pipelineSceneData.shadows;

          this._initNativePlanarShadowShader(shadowInfo);
        };

        _proto._initNativePlanarShadowInstanceShader = function _initNativePlanarShadowInstanceShader(shadowInfo) {
          this._planarInstanceShader = shadowInfo.getPlanarInstanceShader(this._patches);

          if (JSB) {
            this._nativeObj.setPlanarInstanceShader(this._planarInstanceShader);
          }
        } // This is a temporary solution
        // It should not be written in a fixed way, or modified by the user
        ;

        _proto.initPlanarShadowInstanceShader = function initPlanarShadowInstanceShader() {
          var pipeline = legacyCC.director.root.pipeline;
          var shadowInfo = pipeline.pipelineSceneData.shadows;

          this._initNativePlanarShadowInstanceShader(shadowInfo);
        };

        _proto._destroy = function _destroy() {
          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto.destroy = function destroy() {
          this._destroyDescriptorSet();

          this._destroyWorldBoundDescriptorSet();

          this._destroyInputAssembler();

          this.priority = RenderPriority.DEFAULT;
          this._patches = null;
          this._subMesh = null;
          this._passes = null;
          this._shaders = null;
          if (this._reflectionTex) this._reflectionTex.destroy();
          this._reflectionTex = null;
          this._reflectionSampler = null;

          this._destroy();
        };

        _proto.update = function update() {
          for (var i = 0; i < this._passes.length; ++i) {
            var pass = this._passes[i];
            pass.update();
          }

          this._descriptorSet.update();

          this._worldBoundDescriptorSet.update();
        };

        _proto.onPipelineStateChanged = function onPipelineStateChanged() {
          var passes = this._passes;

          if (!passes) {
            return;
          }

          for (var i = 0; i < passes.length; i++) {
            var pass = passes[i];
            pass.beginChangeStatesSilently();
            pass.tryCompile(); // force update shaders

            pass.endChangeStatesSilently();
          }

          this._flushPassInfo();
        };

        _proto.onMacroPatchesStateChanged = function onMacroPatchesStateChanged(patches) {
          this._patches = patches;
          var passes = this._passes;

          if (!passes) {
            return;
          }

          for (var i = 0; i < passes.length; i++) {
            var pass = passes[i];
            pass.beginChangeStatesSilently();
            pass.tryCompile(); // force update shaders

            pass.endChangeStatesSilently();
          }

          this._flushPassInfo();
        };

        _proto._flushPassInfo = function _flushPassInfo() {
          var passes = this._passes;

          if (!passes) {
            return;
          }

          if (!this._shaders) {
            this._shaders = [];
          }

          this._shaders.length = passes.length;

          for (var i = 0, len = passes.length; i < len; i++) {
            this._shaders[i] = passes[i].getShaderVariant(this.patches);
          }

          if (JSB) {
            var passesNative = passes.map(function (_pass) {
              return _pass["native"];
            });

            this._nativeObj.setPasses(passesNative);

            this._nativeObj.setShaders(this._shaders);
          }
        };

        _createClass(SubModel, [{
          key: "passes",
          get: function get() {
            return this._passes;
          },
          set: function set(passes) {
            var passLengh = passes.length;

            if (passLengh > MAX_PASS_COUNT) {
              errorID(12004, MAX_PASS_COUNT);
              return;
            }

            this._passes = passes;

            this._flushPassInfo();

            if (this._passes[0].batchingScheme === BatchingSchemes.VB_MERGING) {
              this.subMesh.genFlatBuffers();

              this._setSubMesh(this.subMesh);
            } // DS layout might change too


            if (this._descriptorSet) {
              this._destroyDescriptorSet();

              _dsInfo.layout = passes[0].localSetLayout;

              this._createDescriptorSet(_dsInfo);
            }
          }
        }, {
          key: "shaders",
          get: function get() {
            return this._shaders;
          }
        }, {
          key: "subMesh",
          get: function get() {
            return this._subMesh;
          },
          set: function set(subMesh) {
            this._inputAssembler.destroy();

            this._inputAssembler.initialize(subMesh.iaInfo);

            if (this._passes[0].batchingScheme === BatchingSchemes.VB_MERGING) {
              this.subMesh.genFlatBuffers();
            }

            this._setSubMesh(subMesh);
          }
        }, {
          key: "priority",
          get: function get() {
            return this._priority;
          },
          set: function set(val) {
            this._priority = val;

            if (JSB) {
              this._nativeObj.setPriority(val);
            }
          }
        }, {
          key: "inputAssembler",
          get: function get() {
            return this._inputAssembler;
          }
        }, {
          key: "descriptorSet",
          get: function get() {
            return this._descriptorSet;
          }
        }, {
          key: "worldBoundDescriptorSet",
          get: function get() {
            return this._worldBoundDescriptorSet;
          }
        }, {
          key: "patches",
          get: function get() {
            return this._patches;
          }
        }, {
          key: "planarInstanceShader",
          get: function get() {
            return this._planarInstanceShader;
          }
        }, {
          key: "planarShader",
          get: function get() {
            return this._planarShader;
          }
        }, {
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }]);

        return SubModel;
      }());
    }
  };
});
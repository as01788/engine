System.register("q-bundled:///fs/cocos/core/pipeline/deferred/deferred-pipeline.js", ["../../data/decorators/index.js", "../../../../../virtual/internal%253Aconstants.js", "../../builtin/builtin-res-mgr.js", "../render-pipeline.js", "./main-flow.js", "../pipeline-serialization.js", "../shadow/shadow-flow.js", "../../gfx/index.js", "../define.js", "../../platform/debug.js", "./deferred-pipeline-scene-data.js", "../pipeline-event.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, type, serializable, EDITOR, builtinResMgr, RenderPipeline, PipelineRenderData, PipelineInputAssemblerData, MainFlow, RenderTextureConfig, ShadowFlow, Format, StoreOp, ColorAttachment, DepthStencilAttachment, LoadOp, RenderPassInfo, AccessType, TextureInfo, TextureType, TextureUsageBit, FramebufferInfo, UBOGlobal, UBOCamera, UBOShadow, UNIFORM_SHADOWMAP_BINDING, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, errorID, DeferredPipelineSceneData, PipelineEventType, _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp, PIPELINE_TYPE, DeferredRenderData, DeferredPipeline;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      type = _dataDecoratorsIndexJs.type;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_builtinBuiltinResMgrJs) {
      builtinResMgr = _builtinBuiltinResMgrJs.builtinResMgr;
    }, function (_renderPipelineJs) {
      RenderPipeline = _renderPipelineJs.RenderPipeline;
      PipelineRenderData = _renderPipelineJs.PipelineRenderData;
      PipelineInputAssemblerData = _renderPipelineJs.PipelineInputAssemblerData;
    }, function (_mainFlowJs) {
      MainFlow = _mainFlowJs.MainFlow;
    }, function (_pipelineSerializationJs) {
      RenderTextureConfig = _pipelineSerializationJs.RenderTextureConfig;
    }, function (_shadowShadowFlowJs) {
      ShadowFlow = _shadowShadowFlowJs.ShadowFlow;
    }, function (_gfxIndexJs) {
      Format = _gfxIndexJs.Format;
      StoreOp = _gfxIndexJs.StoreOp;
      ColorAttachment = _gfxIndexJs.ColorAttachment;
      DepthStencilAttachment = _gfxIndexJs.DepthStencilAttachment;
      LoadOp = _gfxIndexJs.LoadOp;
      RenderPassInfo = _gfxIndexJs.RenderPassInfo;
      AccessType = _gfxIndexJs.AccessType;
      TextureInfo = _gfxIndexJs.TextureInfo;
      TextureType = _gfxIndexJs.TextureType;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      FramebufferInfo = _gfxIndexJs.FramebufferInfo;
    }, function (_defineJs) {
      UBOGlobal = _defineJs.UBOGlobal;
      UBOCamera = _defineJs.UBOCamera;
      UBOShadow = _defineJs.UBOShadow;
      UNIFORM_SHADOWMAP_BINDING = _defineJs.UNIFORM_SHADOWMAP_BINDING;
      UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING = _defineJs.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }, function (_deferredPipelineSceneDataJs) {
      DeferredPipelineSceneData = _deferredPipelineSceneDataJs.DeferredPipelineSceneData;
    }, function (_pipelineEventJs) {
      PipelineEventType = _pipelineEventJs.PipelineEventType;
    }],
    execute: function () {
      PIPELINE_TYPE = 1;

      _export("DeferredRenderData", DeferredRenderData = /*#__PURE__*/function (_PipelineRenderData) {
        _inheritsLoose(DeferredRenderData, _PipelineRenderData);

        function DeferredRenderData() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PipelineRenderData.call.apply(_PipelineRenderData, [this].concat(args)) || this;
          _this.gbufferFrameBuffer = null;
          _this.gbufferRenderTargets = [];
          return _this;
        }

        return DeferredRenderData;
      }(PipelineRenderData));
      /**
       * @en The deferred render pipeline
       * @zh 延迟渲染管线。
       */


      _export("DeferredPipeline", DeferredPipeline = (_dec = ccclass('DeferredPipeline'), _dec2 = type([RenderTextureConfig]), _dec3 = displayOrder(2), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RenderPipeline) {
        _inheritsLoose(DeferredPipeline, _RenderPipeline);

        function DeferredPipeline() {
          var _this2;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this2 = _RenderPipeline.call.apply(_RenderPipeline, [this].concat(args)) || this;
          _this2._gbufferRenderPass = null;
          _this2._lightingRenderPass = null;

          _initializerDefineProperty(_this2, "renderTextures", _descriptor, _assertThisInitialized(_this2));

          return _this2;
        }

        var _proto = DeferredPipeline.prototype;

        _proto.initialize = function initialize(info) {
          _RenderPipeline.prototype.initialize.call(this, info);

          if (this._flows.length === 0) {
            var shadowFlow = new ShadowFlow();
            shadowFlow.initialize(ShadowFlow.initInfo);

            this._flows.push(shadowFlow);

            var mainFlow = new MainFlow();
            mainFlow.initialize(MainFlow.initInfo);

            this._flows.push(mainFlow);
          }

          return true;
        };

        _proto.activate = function activate(swapchain) {
          if (EDITOR) {
            console.info('Deferred render pipeline initialized. ' + 'Note that non-transparent materials with no lighting will not be rendered, such as builtin-unlit.');
          }

          this._macros = {
            CC_PIPELINE_TYPE: PIPELINE_TYPE
          };
          this._pipelineSceneData = new DeferredPipelineSceneData();

          if (!_RenderPipeline.prototype.activate.call(this, swapchain)) {
            return false;
          }

          if (!this._activeRenderer(swapchain)) {
            errorID(2402);
            return false;
          }

          return true;
        };

        _proto.destroy = function destroy() {
          this._destroyUBOs();

          this._destroyQuadInputAssembler();

          this._destroyDeferredData();

          var rpIter = this._renderPasses.values();

          var rpRes = rpIter.next();

          while (!rpRes.done) {
            rpRes.value.destroy();
            rpRes = rpIter.next();
          }

          this._commandBuffers.length = 0;
          return _RenderPipeline.prototype.destroy.call(this);
        };

        _proto.getPipelineRenderData = function getPipelineRenderData() {
          if (!this._pipelineRenderData) {
            this._generateDeferredRenderData();
          }

          return this._pipelineRenderData;
        };

        _proto._activeRenderer = function _activeRenderer(swapchain) {
          var device = this.device;

          this._commandBuffers.push(device.commandBuffer);

          var sampler = this.globalDSManager.pointSampler;

          this._descriptorSet.bindSampler(UNIFORM_SHADOWMAP_BINDING, sampler);

          this._descriptorSet.bindTexture(UNIFORM_SHADOWMAP_BINDING, builtinResMgr.get('default-texture').getGFXTexture());

          this._descriptorSet.bindSampler(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, sampler);

          this._descriptorSet.bindTexture(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, builtinResMgr.get('default-texture').getGFXTexture());

          this._descriptorSet.update();

          var inputAssemblerDataOffscreen = new PipelineInputAssemblerData();
          inputAssemblerDataOffscreen = this._createQuadInputAssembler();

          if (!inputAssemblerDataOffscreen.quadIB || !inputAssemblerDataOffscreen.quadVB || !inputAssemblerDataOffscreen.quadIA) {
            return false;
          }

          this._quadIB = inputAssemblerDataOffscreen.quadIB;
          this._quadVBOffscreen = inputAssemblerDataOffscreen.quadVB;
          this._quadIAOffscreen = inputAssemblerDataOffscreen.quadIA;

          var inputAssemblerDataOnscreen = this._createQuadInputAssembler();

          if (!inputAssemblerDataOnscreen.quadIB || !inputAssemblerDataOnscreen.quadVB || !inputAssemblerDataOnscreen.quadIA) {
            return false;
          }

          this._quadVBOnscreen = inputAssemblerDataOnscreen.quadVB;
          this._quadIAOnscreen = inputAssemblerDataOnscreen.quadIA;

          if (!this._gbufferRenderPass) {
            var colorAttachment0 = new ColorAttachment();
            colorAttachment0.format = Format.RGBA16F;
            colorAttachment0.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment0.storeOp = StoreOp.STORE;
            var colorAttachment1 = new ColorAttachment();
            colorAttachment1.format = Format.RGBA16F;
            colorAttachment1.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment1.storeOp = StoreOp.STORE;
            var colorAttachment2 = new ColorAttachment();
            colorAttachment2.format = Format.RGBA16F;
            colorAttachment2.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment2.storeOp = StoreOp.STORE;
            var colorAttachment3 = new ColorAttachment();
            colorAttachment3.format = Format.RGBA16F;
            colorAttachment3.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment3.storeOp = StoreOp.STORE;
            var depthStencilAttachment = new DepthStencilAttachment();
            depthStencilAttachment.format = Format.DEPTH_STENCIL;
            depthStencilAttachment.depthLoadOp = LoadOp.CLEAR;
            depthStencilAttachment.depthStoreOp = StoreOp.STORE;
            depthStencilAttachment.stencilLoadOp = LoadOp.CLEAR;
            depthStencilAttachment.stencilStoreOp = StoreOp.STORE;
            var renderPassInfo = new RenderPassInfo([colorAttachment0, colorAttachment1, colorAttachment2, colorAttachment3], depthStencilAttachment);
            this._gbufferRenderPass = device.createRenderPass(renderPassInfo);
          }

          if (!this._lightingRenderPass) {
            var colorAttachment = new ColorAttachment();
            colorAttachment.format = Format.RGBA8;
            colorAttachment.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment.storeOp = StoreOp.STORE;
            colorAttachment.endAccesses = [AccessType.COLOR_ATTACHMENT_WRITE];

            var _depthStencilAttachment = new DepthStencilAttachment();

            _depthStencilAttachment.format = Format.DEPTH_STENCIL;
            _depthStencilAttachment.depthLoadOp = LoadOp.LOAD;
            _depthStencilAttachment.depthStoreOp = StoreOp.DISCARD;
            _depthStencilAttachment.stencilLoadOp = LoadOp.LOAD;
            _depthStencilAttachment.stencilStoreOp = StoreOp.DISCARD;
            _depthStencilAttachment.beginAccesses = [AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
            _depthStencilAttachment.endAccesses = [AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];

            var _renderPassInfo = new RenderPassInfo([colorAttachment], _depthStencilAttachment);

            this._lightingRenderPass = device.createRenderPass(_renderPassInfo);
          }

          this._width = swapchain.width;
          this._height = swapchain.height;

          this._generateDeferredRenderData();

          return true;
        };

        _proto._destroyUBOs = function _destroyUBOs() {
          if (this._descriptorSet) {
            this._descriptorSet.getBuffer(UBOGlobal.BINDING).destroy();

            this._descriptorSet.getBuffer(UBOShadow.BINDING).destroy();

            this._descriptorSet.getBuffer(UBOCamera.BINDING).destroy();

            this._descriptorSet.getTexture(UNIFORM_SHADOWMAP_BINDING).destroy();

            this._descriptorSet.getTexture(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
          }
        };

        _proto._destroyDeferredData = function _destroyDeferredData() {
          var deferredData = this._pipelineRenderData;

          if (deferredData) {
            if (deferredData.gbufferFrameBuffer) deferredData.gbufferFrameBuffer.destroy();
            if (deferredData.outputFrameBuffer) deferredData.outputFrameBuffer.destroy();
            if (deferredData.outputDepth) deferredData.outputDepth.destroy();

            for (var i = 0; i < deferredData.gbufferRenderTargets.length; i++) {
              deferredData.gbufferRenderTargets[i].destroy();
            }

            deferredData.gbufferRenderTargets.length = 0;

            for (var _i = 0; _i < deferredData.outputRenderTargets.length; _i++) {
              deferredData.outputRenderTargets[_i].destroy();
            }

            deferredData.outputRenderTargets.length = 0;

            this._destroyBloomData();
          }

          this._pipelineRenderData = null;
        };

        _proto._ensureEnoughSize = function _ensureEnoughSize(cameras) {
          var newWidth = this._width;
          var newHeight = this._height;

          for (var i = 0; i < cameras.length; ++i) {
            var window = cameras[i].window;
            newWidth = Math.max(window.width, newWidth);
            newHeight = Math.max(window.height, newHeight);
          }

          if (newWidth !== this._width || newHeight !== this._height) {
            this._width = newWidth;
            this._height = newHeight;

            this._destroyDeferredData();

            this._generateDeferredRenderData();
          }
        };

        _proto._generateDeferredRenderData = function _generateDeferredRenderData() {
          var _this3 = this;

          var device = this.device;
          var data = this._pipelineRenderData = new DeferredRenderData();
          var sceneData = this.pipelineSceneData;

          for (var i = 0; i < 4; ++i) {
            data.gbufferRenderTargets.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA16F, // positions & normals need more precision
            this._width * sceneData.shadingScale, this._height * sceneData.shadingScale)));
          }

          data.outputDepth = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, Format.DEPTH_STENCIL, this._width * sceneData.shadingScale, this._height * sceneData.shadingScale));
          data.gbufferFrameBuffer = device.createFramebuffer(new FramebufferInfo(this._gbufferRenderPass, data.gbufferRenderTargets, data.outputDepth));
          data.outputRenderTargets.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA16F, this._width * sceneData.shadingScale, this._height * sceneData.shadingScale)));
          data.outputFrameBuffer = device.createFramebuffer(new FramebufferInfo(this._lightingRenderPass, data.outputRenderTargets, data.outputDepth)); // Listens when the attachment texture is scaled

          this.on(PipelineEventType.ATTACHMENT_SCALE_CAHNGED, function (val) {
            data.sampler = val < 1 ? _this3.globalDSManager.pointSampler : _this3.globalDSManager.linearSampler;

            _this3.applyFramebufferRatio(data.gbufferFrameBuffer);

            _this3.applyFramebufferRatio(data.outputFrameBuffer);
          });
          data.sampler = this.globalDSManager.linearSampler;
        };

        return DeferredPipeline;
      }(RenderPipeline), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "renderTextures", [_dec2, serializable, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
    }
  };
});
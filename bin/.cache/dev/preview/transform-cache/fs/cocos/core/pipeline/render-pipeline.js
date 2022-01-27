System.register("q-bundled:///fs/cocos/core/pipeline/render-pipeline.js", ["../data/decorators/index.js", "./scene-culling.js", "../assets/asset.js", "../gfx/index.js", "../global-exports.js", "../renderer/scene/camera.js", "./global-descriptor-set-manager.js", "./pipeline-ubo.js", "./render-flow.js", "./pipeline-event.js", "./pipeline-funcs.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, serializable, type, sceneCulling, validPunctualLightsCulling, Asset, AccessType, Attribute, BufferInfo, BufferUsageBit, ClearFlagBit, ColorAttachment, DepthStencilAttachment, Feature, Format, FramebufferInfo, InputAssemblerInfo, LoadOp, MemoryUsageBit, Rect, RenderPassInfo, StoreOp, SurfaceTransform, TextureInfo, TextureType, TextureUsageBit, Viewport, legacyCC, SKYBOX_FLAG, GlobalDSManager, PipelineUBO, RenderFlow, PipelineEventProcessor, PipelineEventType, decideProfilerCamera, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp, MAX_BLOOM_FILTER_PASS_NUM, tmpRect, tmpViewport, BloomRenderData, PipelineRenderData, PipelineInputAssemblerData, RenderPipeline;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      serializable = _dataDecoratorsIndexJs.serializable;
      type = _dataDecoratorsIndexJs.type;
    }, function (_sceneCullingJs) {
      sceneCulling = _sceneCullingJs.sceneCulling;
      validPunctualLightsCulling = _sceneCullingJs.validPunctualLightsCulling;
    }, function (_assetsAssetJs) {
      Asset = _assetsAssetJs.Asset;
    }, function (_gfxIndexJs) {
      AccessType = _gfxIndexJs.AccessType;
      Attribute = _gfxIndexJs.Attribute;
      BufferInfo = _gfxIndexJs.BufferInfo;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      ColorAttachment = _gfxIndexJs.ColorAttachment;
      DepthStencilAttachment = _gfxIndexJs.DepthStencilAttachment;
      Feature = _gfxIndexJs.Feature;
      Format = _gfxIndexJs.Format;
      FramebufferInfo = _gfxIndexJs.FramebufferInfo;
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      LoadOp = _gfxIndexJs.LoadOp;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      Rect = _gfxIndexJs.Rect;
      RenderPassInfo = _gfxIndexJs.RenderPassInfo;
      StoreOp = _gfxIndexJs.StoreOp;
      SurfaceTransform = _gfxIndexJs.SurfaceTransform;
      TextureInfo = _gfxIndexJs.TextureInfo;
      TextureType = _gfxIndexJs.TextureType;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      Viewport = _gfxIndexJs.Viewport;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_rendererSceneCameraJs) {
      SKYBOX_FLAG = _rendererSceneCameraJs.SKYBOX_FLAG;
    }, function (_globalDescriptorSetManagerJs) {
      GlobalDSManager = _globalDescriptorSetManagerJs.GlobalDSManager;
    }, function (_pipelineUboJs) {
      PipelineUBO = _pipelineUboJs.PipelineUBO;
    }, function (_renderFlowJs) {
      RenderFlow = _renderFlowJs.RenderFlow;
    }, function (_pipelineEventJs) {
      PipelineEventProcessor = _pipelineEventJs.PipelineEventProcessor;
      PipelineEventType = _pipelineEventJs.PipelineEventType;
    }, function (_pipelineFuncsJs) {
      decideProfilerCamera = _pipelineFuncsJs.decideProfilerCamera;
    }],
    execute: function () {
      _export("MAX_BLOOM_FILTER_PASS_NUM", MAX_BLOOM_FILTER_PASS_NUM = 6);

      tmpRect = new Rect();
      tmpViewport = new Viewport();

      _export("BloomRenderData", BloomRenderData = function BloomRenderData() {
        this.renderPass = null;
        this.sampler = null;
        this.prefiterTex = null;
        this.downsampleTexs = [];
        this.upsampleTexs = [];
        this.combineTex = null;
        this.prefilterFramebuffer = null;
        this.downsampleFramebuffers = [];
        this.upsampleFramebuffers = [];
        this.combineFramebuffer = null;
      });

      _export("PipelineRenderData", PipelineRenderData = function PipelineRenderData() {
        this.outputFrameBuffer = null;
        this.outputRenderTargets = [];
        this.outputDepth = null;
        this.sampler = null;
        this.bloom = null;
      });

      _export("PipelineInputAssemblerData", PipelineInputAssemblerData = function PipelineInputAssemblerData() {
        this.quadIB = null;
        this.quadVB = null;
        this.quadIA = null;
      });
      /**
       * @en Render pipeline describes how we handle the rendering process for all render objects in the related render scene root.
       * It contains some general pipeline configurations, necessary rendering resources and some [[RenderFlow]]s.
       * The rendering process function [[render]] is invoked by [[Root]] for all [[Camera]]s.
       * @zh 渲染管线对象决定了引擎对相关渲染场景下的所有渲染对象实施的完整渲染流程。
       * 这个类主要包含一些通用的管线配置，必要的渲染资源和一些 [[RenderFlow]]。
       * 渲染流程函数 [[render]] 会由 [[Root]] 发起调用并对所有 [[Camera]] 执行预设的渲染流程。
       */


      _export("RenderPipeline", RenderPipeline = (_dec = ccclass('cc.RenderPipeline'), _dec2 = displayOrder(0), _dec3 = displayOrder(1), _dec4 = type([RenderFlow]), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(RenderPipeline, _Asset);

        function RenderPipeline() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_tag", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_flows", _descriptor2, _assertThisInitialized(_this));

          _this._quadIB = null;
          _this._quadVBOnscreen = null;
          _this._quadVBOffscreen = null;
          _this._quadIAOnscreen = null;
          _this._quadIAOffscreen = null;
          _this._eventProcessor = new PipelineEventProcessor();
          _this._commandBuffers = [];
          _this._pipelineUBO = new PipelineUBO();
          _this._macros = {};
          _this._constantMacros = '';
          _this._profiler = null;
          _this._pipelineRenderData = null;
          _this._renderPasses = new Map();
          _this._width = 0;
          _this._height = 0;
          _this._lastUsedRenderArea = new Rect();
          _this._clusterEnabled = false;
          _this._bloomEnabled = false;
          return _this;
        }

        var _proto = RenderPipeline.prototype;

        _proto.getPipelineRenderData = function getPipelineRenderData() {
          return this._pipelineRenderData;
        }
        /**
         * @en
         * Constant macro string, static throughout the whole runtime.
         * Used to pass device-specific parameters to shader.
         * @zh 常量宏定义字符串，运行时全程不会改变，用于给 shader 传一些只和平台相关的参数。
         * @readonly
         */
        ;

        /**
         * @en The initialization process, user shouldn't use it in most case, only useful when need to generate render pipeline programmatically.
         * @zh 初始化函数，正常情况下不会用到，仅用于程序化生成渲染管线的情况。
         * @param info The render pipeline information
         */
        _proto.initialize = function initialize(info) {
          this._flows = info.flows;

          if (info.tag) {
            this._tag = info.tag;
          }

          return true;
        };

        _proto.createRenderPass = function createRenderPass(clearFlags, colorFmt, depthFmt) {
          var device = this._device;
          var colorAttachment = new ColorAttachment();
          var depthStencilAttachment = new DepthStencilAttachment();
          colorAttachment.format = colorFmt;
          depthStencilAttachment.format = depthFmt;
          depthStencilAttachment.stencilStoreOp = StoreOp.DISCARD;
          depthStencilAttachment.depthStoreOp = StoreOp.DISCARD;

          if (!(clearFlags & ClearFlagBit.COLOR)) {
            if (clearFlags & SKYBOX_FLAG) {
              colorAttachment.loadOp = LoadOp.DISCARD;
            } else {
              colorAttachment.loadOp = LoadOp.LOAD;
              colorAttachment.beginAccesses = [AccessType.COLOR_ATTACHMENT_WRITE];
            }
          }

          if ((clearFlags & ClearFlagBit.DEPTH_STENCIL) !== ClearFlagBit.DEPTH_STENCIL) {
            if (!(clearFlags & ClearFlagBit.DEPTH)) depthStencilAttachment.depthLoadOp = LoadOp.LOAD;
            if (!(clearFlags & ClearFlagBit.STENCIL)) depthStencilAttachment.stencilLoadOp = LoadOp.LOAD;
          }

          depthStencilAttachment.beginAccesses = [AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
          var renderPassInfo = new RenderPassInfo([colorAttachment], depthStencilAttachment);
          return device.createRenderPass(renderPassInfo);
        };

        _proto.getRenderPass = function getRenderPass(clearFlags, swapchain) {
          var renderPass = this._renderPasses.get(clearFlags);

          if (renderPass) {
            return renderPass;
          }

          renderPass = this.createRenderPass(clearFlags, swapchain.colorTexture.format, swapchain.depthStencilTexture.format);

          this._renderPasses.set(clearFlags, renderPass);

          return renderPass;
        };

        _proto.applyFramebufferRatio = function applyFramebufferRatio(framebuffer) {
          var sceneData = this.pipelineSceneData;
          var width = this._width * sceneData.shadingScale;
          var height = this._height * sceneData.shadingScale;
          var colorTexArr = framebuffer.colorTextures;

          for (var i = 0; i < colorTexArr.length; i++) {
            colorTexArr[i].resize(width, height);
          }

          if (framebuffer.depthStencilTexture) {
            framebuffer.depthStencilTexture.resize(width, height);
          }

          framebuffer.destroy();
          framebuffer.initialize(new FramebufferInfo(framebuffer.renderPass, colorTexArr, framebuffer.depthStencilTexture));
        }
        /**
         * @en generate renderArea by camera
         * @zh 生成renderArea
         * @param camera the camera
         * @returns
         */
        ;

        _proto.generateRenderArea = function generateRenderArea(camera, out) {
          var vp = camera.viewport;
          var w = camera.window.width;
          var h = camera.window.height;
          out.x = vp.x * w;
          out.y = vp.y * h;
          out.width = vp.width * w;
          out.height = vp.height * h;
        };

        _proto.generateViewport = function generateViewport(camera, out) {
          this.generateRenderArea(camera, tmpRect);
          if (!out) out = tmpViewport;
          var shadingScale = this.pipelineSceneData.shadingScale;
          out.left = tmpRect.x * shadingScale;
          out.top = tmpRect.y * shadingScale;
          out.width = tmpRect.width * shadingScale;
          out.height = tmpRect.height * shadingScale;
          return out;
        };

        _proto.generateScissor = function generateScissor(camera, out) {
          if (!out) out = tmpRect;
          this.generateRenderArea(camera, out);
          var shadingScale = this.pipelineSceneData.shadingScale;
          out.x *= shadingScale;
          out.y *= shadingScale;
          out.width *= shadingScale;
          out.height *= shadingScale;
          return out;
        }
        /**
         * @en Activate the render pipeline after loaded, it mainly activate the flows
         * @zh 当渲染管线资源加载完成后，启用管线，主要是启用管线内的 flow
         * TODO: remove swapchain dependency at this stage
         * after deferred pipeline can handle multiple swapchains
         */
        ;

        _proto.activate = function activate(swapchain) {
          var root = legacyCC.director.root;
          this._device = root.device;

          this._generateConstantMacros();

          this._globalDSManager = new GlobalDSManager(this);
          this._descriptorSet = this._globalDSManager.globalDescriptorSet;

          this._pipelineUBO.activate(this._device, this); // update global defines in advance here for deferred pipeline may tryCompile shaders.


          this._macros.CC_USE_HDR = this._pipelineSceneData.isHDR;

          this._generateConstantMacros();

          this._pipelineSceneData.activate(this._device, this);

          for (var i = 0; i < this._flows.length; i++) {
            this._flows[i].activate(this);
          }

          return true;
        };

        _proto._ensureEnoughSize = function _ensureEnoughSize(cameras) {}
        /**
         * @en Render function, it basically run the render process of all flows in sequence for the given view.
         * @zh 渲染函数，对指定的渲染视图按顺序执行所有渲染流程。
         * @param view Render view。
         */
        ;

        _proto.render = function render(cameras) {
          if (cameras.length === 0) {
            return;
          }

          this._commandBuffers[0].begin();

          this.emit(PipelineEventType.RENDER_FRAME_BEGIN, cameras);

          this._ensureEnoughSize(cameras);

          decideProfilerCamera(cameras);

          for (var i = 0; i < cameras.length; i++) {
            var camera = cameras[i];

            if (camera.scene) {
              this.emit(PipelineEventType.RENDER_CAMERA_BEGIN, camera);
              validPunctualLightsCulling(this, camera);
              sceneCulling(this, camera);

              this._pipelineUBO.updateGlobalUBO(camera.window);

              this._pipelineUBO.updateCameraUBO(camera);

              for (var j = 0; j < this._flows.length; j++) {
                this._flows[j].render(camera);
              }

              this.emit(PipelineEventType.RENDER_CAMERA_END, camera);
            }
          }

          this.emit(PipelineEventType.RENDER_FRAME_END, cameras);

          this._commandBuffers[0].end();

          this._device.queue.submit(this._commandBuffers);
        }
        /**
         * @zh
         * 销毁四边形输入汇集器。
         */
        ;

        _proto._destroyQuadInputAssembler = function _destroyQuadInputAssembler() {
          if (this._quadIB) {
            this._quadIB.destroy();

            this._quadIB = null;
          }

          if (this._quadVBOnscreen) {
            this._quadVBOnscreen.destroy();

            this._quadVBOnscreen = null;
          }

          if (this._quadVBOffscreen) {
            this._quadVBOffscreen.destroy();

            this._quadVBOffscreen = null;
          }

          if (this._quadIAOnscreen) {
            this._quadIAOnscreen.destroy();

            this._quadIAOnscreen = null;
          }

          if (this._quadIAOffscreen) {
            this._quadIAOffscreen.destroy();

            this._quadIAOffscreen = null;
          }
        };

        _proto._destroyBloomData = function _destroyBloomData() {
          var _bloom$renderPass;

          var bloom = this._pipelineRenderData.bloom;
          if (bloom === null) return;
          if (bloom.prefiterTex) bloom.prefiterTex.destroy();
          if (bloom.prefilterFramebuffer) bloom.prefilterFramebuffer.destroy();

          for (var i = 0; i < bloom.downsampleTexs.length; ++i) {
            bloom.downsampleTexs[i].destroy();
            bloom.downsampleFramebuffers[i].destroy();
          }

          bloom.downsampleTexs.length = 0;
          bloom.downsampleFramebuffers.length = 0;

          for (var _i = 0; _i < bloom.upsampleTexs.length; ++_i) {
            bloom.upsampleTexs[_i].destroy();

            bloom.upsampleFramebuffers[_i].destroy();
          }

          bloom.upsampleTexs.length = 0;
          bloom.upsampleFramebuffers.length = 0;
          if (bloom.combineTex) bloom.combineTex.destroy();
          if (bloom.combineFramebuffer) bloom.combineFramebuffer.destroy();
          (_bloom$renderPass = bloom.renderPass) === null || _bloom$renderPass === void 0 ? void 0 : _bloom$renderPass.destroy();
          this._pipelineRenderData.bloom = null;
        };

        _proto._genQuadVertexData = function _genQuadVertexData(surfaceTransform, renderArea) {
          var vbData = new Float32Array(4 * 4);
          var minX = renderArea.x / this._width;
          var maxX = (renderArea.x + renderArea.width) / this._width;
          var minY = renderArea.y / this._height;
          var maxY = (renderArea.y + renderArea.height) / this._height;

          if (this.device.capabilities.screenSpaceSignY > 0) {
            var temp = maxY;
            maxY = minY;
            minY = temp;
          }

          var n = 0;

          switch (surfaceTransform) {
            case SurfaceTransform.IDENTITY:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              break;

            case SurfaceTransform.ROTATE_90:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              break;

            case SurfaceTransform.ROTATE_180:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              break;

            case SurfaceTransform.ROTATE_270:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              break;

            default:
              break;
          }

          return vbData;
        }
        /**
         * @zh
         * 创建四边形输入汇集器。
         */
        ;

        _proto._createQuadInputAssembler = function _createQuadInputAssembler() {
          // create vertex buffer
          var inputAssemblerData = new PipelineInputAssemblerData();
          var vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
          var vbSize = vbStride * 4;

          var quadVB = this._device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE | MemoryUsageBit.HOST, vbSize, vbStride));

          if (!quadVB) {
            return inputAssemblerData;
          } // create index buffer


          var ibStride = Uint8Array.BYTES_PER_ELEMENT;
          var ibSize = ibStride * 6;

          var quadIB = this._device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, ibSize, ibStride));

          if (!quadIB) {
            return inputAssemblerData;
          }

          var indices = new Uint8Array(6);
          indices[0] = 0;
          indices[1] = 1;
          indices[2] = 2;
          indices[3] = 1;
          indices[4] = 3;
          indices[5] = 2;
          quadIB.update(indices); // create input assembler

          var attributes = new Array(2);
          attributes[0] = new Attribute('a_position', Format.RG32F);
          attributes[1] = new Attribute('a_texCoord', Format.RG32F);

          var quadIA = this._device.createInputAssembler(new InputAssemblerInfo(attributes, [quadVB], quadIB));

          inputAssemblerData.quadIB = quadIB;
          inputAssemblerData.quadVB = quadVB;
          inputAssemblerData.quadIA = quadIA;
          return inputAssemblerData;
        };

        _proto.updateQuadVertexData = function updateQuadVertexData(renderArea, window) {
          var cachedArea = this._lastUsedRenderArea;

          if (cachedArea.x === renderArea.x && cachedArea.y === renderArea.y && cachedArea.width === renderArea.width && cachedArea.height === renderArea.height) {
            return;
          }

          var offData = this._genQuadVertexData(SurfaceTransform.IDENTITY, renderArea);

          this._quadVBOffscreen.update(offData);

          var onData = this._genQuadVertexData(window.swapchain && window.swapchain.surfaceTransform || SurfaceTransform.IDENTITY, renderArea);

          this._quadVBOnscreen.update(onData);

          cachedArea.copy(renderArea);
        }
        /**
         * @en Internal destroy function
         * @zh 内部销毁函数。
         */
        ;

        _proto.destroy = function destroy() {
          var _this$_globalDSManage, _this$_pipelineSceneD;

          for (var i = 0; i < this._flows.length; i++) {
            this._flows[i].destroy();
          }

          this._flows.length = 0;

          if (this._descriptorSet) {
            this._descriptorSet.destroy();
          }

          (_this$_globalDSManage = this._globalDSManager) === null || _this$_globalDSManage === void 0 ? void 0 : _this$_globalDSManage.destroy();

          for (var _i2 = 0; _i2 < this._commandBuffers.length; _i2++) {
            this._commandBuffers[_i2].destroy();
          }

          this._commandBuffers.length = 0;

          this._pipelineUBO.destroy();

          (_this$_pipelineSceneD = this._pipelineSceneData) === null || _this$_pipelineSceneD === void 0 ? void 0 : _this$_pipelineSceneD.destroy();
          return _Asset.prototype.destroy.call(this);
        };

        _proto._generateConstantMacros = function _generateConstantMacros() {
          var str = '';
          str += "#define CC_DEVICE_SUPPORT_FLOAT_TEXTURE " + (this.device.hasFeature(Feature.TEXTURE_FLOAT) ? 1 : 0) + "\n";
          str += "#define CC_ENABLE_CLUSTERED_LIGHT_CULLING " + (this._clusterEnabled ? 1 : 0) + "\n";
          str += "#define CC_DEVICE_MAX_VERTEX_UNIFORM_VECTORS " + this.device.capabilities.maxVertexUniformVectors + "\n";
          str += "#define CC_DEVICE_MAX_FRAGMENT_UNIFORM_VECTORS " + this.device.capabilities.maxFragmentUniformVectors + "\n";
          str += "#define CC_DEVICE_CAN_BENEFIT_FROM_INPUT_ATTACHMENT " + (this.device.hasFeature(Feature.INPUT_ATTACHMENT_BENEFIT) ? 1 : 0) + "\n";
          this._constantMacros = str;
        };

        _proto.generateBloomRenderData = function generateBloomRenderData() {
          if (this._pipelineRenderData.bloom != null) return;
          var bloom = this._pipelineRenderData.bloom = new BloomRenderData();
          var device = this.device; // create renderPass

          var colorAttachment = new ColorAttachment();
          colorAttachment.format = Format.RGBA8;
          colorAttachment.loadOp = LoadOp.CLEAR;
          colorAttachment.storeOp = StoreOp.STORE;
          colorAttachment.endAccesses = [AccessType.COLOR_ATTACHMENT_WRITE];
          bloom.renderPass = device.createRenderPass(new RenderPassInfo([colorAttachment]));
          var curWidth = this._width;
          var curHeight = this._height; // prefilter

          bloom.prefiterTex = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA8, curWidth >> 1, curHeight >> 1));
          bloom.prefilterFramebuffer = device.createFramebuffer(new FramebufferInfo(bloom.renderPass, [bloom.prefiterTex])); // downsample & upsample

          curWidth >>= 1;
          curHeight >>= 1;

          for (var i = 0; i < MAX_BLOOM_FILTER_PASS_NUM; ++i) {
            bloom.downsampleTexs.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA8, curWidth >> 1, curHeight >> 1)));
            bloom.downsampleFramebuffers[i] = device.createFramebuffer(new FramebufferInfo(bloom.renderPass, [bloom.downsampleTexs[i]]));
            bloom.upsampleTexs.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA8, curWidth, curHeight)));
            bloom.upsampleFramebuffers[i] = device.createFramebuffer(new FramebufferInfo(bloom.renderPass, [bloom.upsampleTexs[i]]));
            curWidth >>= 1;
            curHeight >>= 1;
          } // combine


          bloom.combineTex = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, Format.RGBA8, this._width, this._height));
          bloom.combineFramebuffer = device.createFramebuffer(new FramebufferInfo(bloom.renderPass, [bloom.combineTex])); // sampler

          bloom.sampler = this.globalDSManager.linearSampler;
        }
        /**
         * @en
         * Register an callback of the pipeline event type on the RenderPipeline.
         * @zh
         * 在渲染管线中注册管线事件类型的回调。
         */
        ;

        _proto.on = function on(type, callback, target, once) {
          return this._eventProcessor.on(type, callback, target, once);
        }
        /**
         * @en
         * Register an callback of the pipeline event type on the RenderPipeline,
         * the callback will remove itself after the first time it is triggered.
         * @zh
         * 在渲染管线中注册管线事件类型的回调, 回调后会在第一时间删除自身。
         */
        ;

        _proto.once = function once(type, callback, target) {
          return this._eventProcessor.once(type, callback, target);
        }
        /**
         * @en
         * Removes the listeners previously registered with the same type, callback, target and or useCapture,
         * if only type is passed as parameter, all listeners registered with that type will be removed.
         * @zh
         * 删除之前用同类型、回调、目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
         */
        ;

        _proto.off = function off(type, callback, target) {
          this._eventProcessor.off(type, callback, target);
        }
        /**
         * @zh 派发一个指定事件，并传递需要的参数
         * @en Trigger an event directly with the event name and necessary arguments.
         * @param type - event type
         * @param args - Arguments when the event triggered
         */
        ;

        _proto.emit = function emit(type, arg0, arg1, arg2, arg3, arg4) {
          this._eventProcessor.emit(type, arg0, arg1, arg2, arg3, arg4);
        }
        /**
         * @en Removes all callbacks previously registered with the same target (passed as parameter).
         * This is not for removing all listeners in the current event target,
         * and this is not for removing all listeners the target parameter have registered.
         * It's only for removing all listeners (callback and target couple) registered on the current event target by the target parameter.
         * @zh 在当前 EventTarget 上删除指定目标（target 参数）注册的所有事件监听器。
         * 这个函数无法删除当前 EventTarget 的所有事件监听器，也无法删除 target 参数所注册的所有事件监听器。
         * 这个函数只能删除 target 参数在当前 EventTarget 上注册的所有事件监听器。
         * @param typeOrTarget - The target to be searched for all related listeners
         */
        ;

        _proto.targetOff = function targetOff(typeOrTarget) {
          this._eventProcessor.targetOff(typeOrTarget);
        }
        /**
         * @zh 移除在特定事件类型中注册的所有回调或在某个目标中注册的所有回调。
         * @en Removes all callbacks registered in a certain event type or all callbacks registered with a certain target
         * @param typeOrTarget - The event type or target with which the listeners will be removed
         */
        ;

        _proto.removeAll = function removeAll(typeOrTarget) {
          this._eventProcessor.removeAll(typeOrTarget);
        }
        /**
         * @zh 检查指定事件是否已注册回调。
         * @en Checks whether there is correspond event listener registered on the given event.
         * @param type - Event type.
         * @param callback - Callback function when event triggered.
         * @param target - Callback callee.
         */
        ;

        _proto.hasEventListener = function hasEventListener(type, callback, target) {
          return this._eventProcessor.hasEventListener(type, callback, target);
        };

        _createClass(RenderPipeline, [{
          key: "tag",
          get:
          /**
           * @en The tag of pipeline.
           * @zh 管线的标签。
           * @readonly
           */
          function get() {
            return this._tag;
          }
          /**
           * @en The flows of pipeline.
           * @zh 管线的渲染流程列表。
           * @readonly
           */

        }, {
          key: "flows",
          get: function get() {
            return this._flows;
          }
          /**
           * @en Tag
           * @zh 标签
           * @readonly
           */

        }, {
          key: "quadIAOnscreen",
          get:
          /**
           * @zh
           * 四边形输入汇集器。
           */
          function get() {
            return this._quadIAOnscreen;
          }
        }, {
          key: "quadIAOffscreen",
          get: function get() {
            return this._quadIAOffscreen;
          }
        }, {
          key: "constantMacros",
          get: function get() {
            return this._constantMacros;
          }
          /**
           * @en
           * The current global-scoped shader macros.
           * Used to control effects like IBL, fog, etc.
           * @zh 当前的全局宏定义，用于控制如 IBL、雾效等模块。
           * @readonly
           */

        }, {
          key: "macros",
          get: function get() {
            return this._macros;
          }
        }, {
          key: "device",
          get: function get() {
            return this._device;
          }
        }, {
          key: "globalDSManager",
          get: function get() {
            return this._globalDSManager;
          }
        }, {
          key: "descriptorSetLayout",
          get: function get() {
            return this._globalDSManager.descriptorSetLayout;
          }
        }, {
          key: "descriptorSet",
          get: function get() {
            return this._descriptorSet;
          }
        }, {
          key: "commandBuffers",
          get: function get() {
            return this._commandBuffers;
          }
        }, {
          key: "pipelineUBO",
          get: function get() {
            return this._pipelineUBO;
          }
        }, {
          key: "pipelineSceneData",
          get: function get() {
            return this._pipelineSceneData;
          }
        }, {
          key: "profiler",
          get: function get() {
            return this._profiler;
          },
          set: function set(value) {
            this._profiler = value;
          }
        }, {
          key: "clusterEnabled",
          get: function get() {
            return this._clusterEnabled;
          },
          set: function set(value) {
            this._clusterEnabled = value;
          }
        }, {
          key: "bloomEnabled",
          get: function get() {
            return this._bloomEnabled;
          },
          set: function set(value) {
            this._bloomEnabled = value;
          }
        }]);

        return RenderPipeline;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_tag", [_dec2, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_flows", [_dec3, _dec4, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class)); // Do not delete, for the class detection of editor


      legacyCC.RenderPipeline = RenderPipeline;
    }
  };
});
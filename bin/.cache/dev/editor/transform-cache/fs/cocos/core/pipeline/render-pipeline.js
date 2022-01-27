"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderPipeline = exports.PipelineInputAssemblerData = exports.PipelineRenderData = exports.BloomRenderData = exports.MAX_BLOOM_FILTER_PASS_NUM = void 0;

var _index = require("../data/decorators/index.js");

var _sceneCulling = require("./scene-culling.js");

var _asset = require("../assets/asset.js");

var _index2 = require("../gfx/index.js");

var _globalExports = require("../global-exports.js");

var _camera = require("../renderer/scene/camera.js");

var _globalDescriptorSetManager = require("./global-descriptor-set-manager.js");

var _pipelineUbo = require("./pipeline-ubo.js");

var _renderFlow = require("./render-flow.js");

var _pipelineEvent = require("./pipeline-event.js");

var _pipelineFuncs = require("./pipeline-funcs.js");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const MAX_BLOOM_FILTER_PASS_NUM = 6;
exports.MAX_BLOOM_FILTER_PASS_NUM = MAX_BLOOM_FILTER_PASS_NUM;
const tmpRect = new _index2.Rect();
const tmpViewport = new _index2.Viewport();

class BloomRenderData {
  constructor() {
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
  }

}

exports.BloomRenderData = BloomRenderData;

class PipelineRenderData {
  constructor() {
    this.outputFrameBuffer = null;
    this.outputRenderTargets = [];
    this.outputDepth = null;
    this.sampler = null;
    this.bloom = null;
  }

}

exports.PipelineRenderData = PipelineRenderData;

class PipelineInputAssemblerData {
  constructor() {
    this.quadIB = null;
    this.quadVB = null;
    this.quadIA = null;
  }

}
/**
 * @en Render pipeline describes how we handle the rendering process for all render objects in the related render scene root.
 * It contains some general pipeline configurations, necessary rendering resources and some [[RenderFlow]]s.
 * The rendering process function [[render]] is invoked by [[Root]] for all [[Camera]]s.
 * @zh 渲染管线对象决定了引擎对相关渲染场景下的所有渲染对象实施的完整渲染流程。
 * 这个类主要包含一些通用的管线配置，必要的渲染资源和一些 [[RenderFlow]]。
 * 渲染流程函数 [[render]] 会由 [[Root]] 发起调用并对所有 [[Camera]] 执行预设的渲染流程。
 */


exports.PipelineInputAssemblerData = PipelineInputAssemblerData;
let RenderPipeline = (_dec = (0, _index.ccclass)('cc.RenderPipeline'), _dec2 = (0, _index.displayOrder)(0), _dec3 = (0, _index.displayOrder)(1), _dec4 = (0, _index.type)([_renderFlow.RenderFlow]), _dec(_class = (_class2 = (_temp = class RenderPipeline extends _asset.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_tag", _descriptor, this);

    _initializerDefineProperty(this, "_flows", _descriptor2, this);

    this._quadIB = null;
    this._quadVBOnscreen = null;
    this._quadVBOffscreen = null;
    this._quadIAOnscreen = null;
    this._quadIAOffscreen = null;
    this._eventProcessor = new _pipelineEvent.PipelineEventProcessor();
    this._commandBuffers = [];
    this._pipelineUBO = new _pipelineUbo.PipelineUBO();
    this._macros = {};
    this._constantMacros = '';
    this._profiler = null;
    this._pipelineRenderData = null;
    this._renderPasses = new Map();
    this._width = 0;
    this._height = 0;
    this._lastUsedRenderArea = new _index2.Rect();
    this._clusterEnabled = false;
    this._bloomEnabled = false;
  }

  /**
   * @en The tag of pipeline.
   * @zh 管线的标签。
   * @readonly
   */
  get tag() {
    return this._tag;
  }
  /**
   * @en The flows of pipeline.
   * @zh 管线的渲染流程列表。
   * @readonly
   */


  get flows() {
    return this._flows;
  }
  /**
   * @en Tag
   * @zh 标签
   * @readonly
   */


  /**
   * @zh
   * 四边形输入汇集器。
   */
  get quadIAOnscreen() {
    return this._quadIAOnscreen;
  }

  get quadIAOffscreen() {
    return this._quadIAOffscreen;
  }

  getPipelineRenderData() {
    return this._pipelineRenderData;
  }
  /**
   * @en
   * Constant macro string, static throughout the whole runtime.
   * Used to pass device-specific parameters to shader.
   * @zh 常量宏定义字符串，运行时全程不会改变，用于给 shader 传一些只和平台相关的参数。
   * @readonly
   */


  get constantMacros() {
    return this._constantMacros;
  }
  /**
   * @en
   * The current global-scoped shader macros.
   * Used to control effects like IBL, fog, etc.
   * @zh 当前的全局宏定义，用于控制如 IBL、雾效等模块。
   * @readonly
   */


  get macros() {
    return this._macros;
  }

  get device() {
    return this._device;
  }

  get globalDSManager() {
    return this._globalDSManager;
  }

  get descriptorSetLayout() {
    return this._globalDSManager.descriptorSetLayout;
  }

  get descriptorSet() {
    return this._descriptorSet;
  }

  get commandBuffers() {
    return this._commandBuffers;
  }

  get pipelineUBO() {
    return this._pipelineUBO;
  }

  get pipelineSceneData() {
    return this._pipelineSceneData;
  }

  set profiler(value) {
    this._profiler = value;
  }

  get profiler() {
    return this._profiler;
  }

  set clusterEnabled(value) {
    this._clusterEnabled = value;
  }

  get clusterEnabled() {
    return this._clusterEnabled;
  }

  set bloomEnabled(value) {
    this._bloomEnabled = value;
  }

  get bloomEnabled() {
    return this._bloomEnabled;
  }

  /**
   * @en The initialization process, user shouldn't use it in most case, only useful when need to generate render pipeline programmatically.
   * @zh 初始化函数，正常情况下不会用到，仅用于程序化生成渲染管线的情况。
   * @param info The render pipeline information
   */
  initialize(info) {
    this._flows = info.flows;

    if (info.tag) {
      this._tag = info.tag;
    }

    return true;
  }

  createRenderPass(clearFlags, colorFmt, depthFmt) {
    const device = this._device;
    const colorAttachment = new _index2.ColorAttachment();
    const depthStencilAttachment = new _index2.DepthStencilAttachment();
    colorAttachment.format = colorFmt;
    depthStencilAttachment.format = depthFmt;
    depthStencilAttachment.stencilStoreOp = _index2.StoreOp.DISCARD;
    depthStencilAttachment.depthStoreOp = _index2.StoreOp.DISCARD;

    if (!(clearFlags & _index2.ClearFlagBit.COLOR)) {
      if (clearFlags & _camera.SKYBOX_FLAG) {
        colorAttachment.loadOp = _index2.LoadOp.DISCARD;
      } else {
        colorAttachment.loadOp = _index2.LoadOp.LOAD;
        colorAttachment.beginAccesses = [_index2.AccessType.COLOR_ATTACHMENT_WRITE];
      }
    }

    if ((clearFlags & _index2.ClearFlagBit.DEPTH_STENCIL) !== _index2.ClearFlagBit.DEPTH_STENCIL) {
      if (!(clearFlags & _index2.ClearFlagBit.DEPTH)) depthStencilAttachment.depthLoadOp = _index2.LoadOp.LOAD;
      if (!(clearFlags & _index2.ClearFlagBit.STENCIL)) depthStencilAttachment.stencilLoadOp = _index2.LoadOp.LOAD;
    }

    depthStencilAttachment.beginAccesses = [_index2.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
    const renderPassInfo = new _index2.RenderPassInfo([colorAttachment], depthStencilAttachment);
    return device.createRenderPass(renderPassInfo);
  }

  getRenderPass(clearFlags, swapchain) {
    let renderPass = this._renderPasses.get(clearFlags);

    if (renderPass) {
      return renderPass;
    }

    renderPass = this.createRenderPass(clearFlags, swapchain.colorTexture.format, swapchain.depthStencilTexture.format);

    this._renderPasses.set(clearFlags, renderPass);

    return renderPass;
  }

  applyFramebufferRatio(framebuffer) {
    const sceneData = this.pipelineSceneData;
    const width = this._width * sceneData.shadingScale;
    const height = this._height * sceneData.shadingScale;
    const colorTexArr = framebuffer.colorTextures;

    for (let i = 0; i < colorTexArr.length; i++) {
      colorTexArr[i].resize(width, height);
    }

    if (framebuffer.depthStencilTexture) {
      framebuffer.depthStencilTexture.resize(width, height);
    }

    framebuffer.destroy();
    framebuffer.initialize(new _index2.FramebufferInfo(framebuffer.renderPass, colorTexArr, framebuffer.depthStencilTexture));
  }
  /**
   * @en generate renderArea by camera
   * @zh 生成renderArea
   * @param camera the camera
   * @returns
   */


  generateRenderArea(camera, out) {
    const vp = camera.viewport;
    const w = camera.window.width;
    const h = camera.window.height;
    out.x = vp.x * w;
    out.y = vp.y * h;
    out.width = vp.width * w;
    out.height = vp.height * h;
  }

  generateViewport(camera, out) {
    this.generateRenderArea(camera, tmpRect);
    if (!out) out = tmpViewport;
    const shadingScale = this.pipelineSceneData.shadingScale;
    out.left = tmpRect.x * shadingScale;
    out.top = tmpRect.y * shadingScale;
    out.width = tmpRect.width * shadingScale;
    out.height = tmpRect.height * shadingScale;
    return out;
  }

  generateScissor(camera, out) {
    if (!out) out = tmpRect;
    this.generateRenderArea(camera, out);
    const shadingScale = this.pipelineSceneData.shadingScale;
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


  activate(swapchain) {
    const root = _globalExports.legacyCC.director.root;
    this._device = root.device;

    this._generateConstantMacros();

    this._globalDSManager = new _globalDescriptorSetManager.GlobalDSManager(this);
    this._descriptorSet = this._globalDSManager.globalDescriptorSet;

    this._pipelineUBO.activate(this._device, this); // update global defines in advance here for deferred pipeline may tryCompile shaders.


    this._macros.CC_USE_HDR = this._pipelineSceneData.isHDR;

    this._generateConstantMacros();

    this._pipelineSceneData.activate(this._device, this);

    for (let i = 0; i < this._flows.length; i++) {
      this._flows[i].activate(this);
    }

    return true;
  }

  _ensureEnoughSize(cameras) {}
  /**
   * @en Render function, it basically run the render process of all flows in sequence for the given view.
   * @zh 渲染函数，对指定的渲染视图按顺序执行所有渲染流程。
   * @param view Render view。
   */


  render(cameras) {
    if (cameras.length === 0) {
      return;
    }

    this._commandBuffers[0].begin();

    this.emit(_pipelineEvent.PipelineEventType.RENDER_FRAME_BEGIN, cameras);

    this._ensureEnoughSize(cameras);

    (0, _pipelineFuncs.decideProfilerCamera)(cameras);

    for (let i = 0; i < cameras.length; i++) {
      const camera = cameras[i];

      if (camera.scene) {
        this.emit(_pipelineEvent.PipelineEventType.RENDER_CAMERA_BEGIN, camera);
        (0, _sceneCulling.validPunctualLightsCulling)(this, camera);
        (0, _sceneCulling.sceneCulling)(this, camera);

        this._pipelineUBO.updateGlobalUBO(camera.window);

        this._pipelineUBO.updateCameraUBO(camera);

        for (let j = 0; j < this._flows.length; j++) {
          this._flows[j].render(camera);
        }

        this.emit(_pipelineEvent.PipelineEventType.RENDER_CAMERA_END, camera);
      }
    }

    this.emit(_pipelineEvent.PipelineEventType.RENDER_FRAME_END, cameras);

    this._commandBuffers[0].end();

    this._device.queue.submit(this._commandBuffers);
  }
  /**
   * @zh
   * 销毁四边形输入汇集器。
   */


  _destroyQuadInputAssembler() {
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
  }

  _destroyBloomData() {
    var _bloom$renderPass;

    const bloom = this._pipelineRenderData.bloom;
    if (bloom === null) return;
    if (bloom.prefiterTex) bloom.prefiterTex.destroy();
    if (bloom.prefilterFramebuffer) bloom.prefilterFramebuffer.destroy();

    for (let i = 0; i < bloom.downsampleTexs.length; ++i) {
      bloom.downsampleTexs[i].destroy();
      bloom.downsampleFramebuffers[i].destroy();
    }

    bloom.downsampleTexs.length = 0;
    bloom.downsampleFramebuffers.length = 0;

    for (let i = 0; i < bloom.upsampleTexs.length; ++i) {
      bloom.upsampleTexs[i].destroy();
      bloom.upsampleFramebuffers[i].destroy();
    }

    bloom.upsampleTexs.length = 0;
    bloom.upsampleFramebuffers.length = 0;
    if (bloom.combineTex) bloom.combineTex.destroy();
    if (bloom.combineFramebuffer) bloom.combineFramebuffer.destroy();
    (_bloom$renderPass = bloom.renderPass) === null || _bloom$renderPass === void 0 ? void 0 : _bloom$renderPass.destroy();
    this._pipelineRenderData.bloom = null;
  }

  _genQuadVertexData(surfaceTransform, renderArea) {
    const vbData = new Float32Array(4 * 4);
    const minX = renderArea.x / this._width;
    const maxX = (renderArea.x + renderArea.width) / this._width;
    let minY = renderArea.y / this._height;
    let maxY = (renderArea.y + renderArea.height) / this._height;

    if (this.device.capabilities.screenSpaceSignY > 0) {
      const temp = maxY;
      maxY = minY;
      minY = temp;
    }

    let n = 0;

    switch (surfaceTransform) {
      case _index2.SurfaceTransform.IDENTITY:
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

      case _index2.SurfaceTransform.ROTATE_90:
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

      case _index2.SurfaceTransform.ROTATE_180:
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

      case _index2.SurfaceTransform.ROTATE_270:
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


  _createQuadInputAssembler() {
    // create vertex buffer
    const inputAssemblerData = new PipelineInputAssemblerData();
    const vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
    const vbSize = vbStride * 4;

    const quadVB = this._device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.VERTEX | _index2.BufferUsageBit.TRANSFER_DST, _index2.MemoryUsageBit.DEVICE | _index2.MemoryUsageBit.HOST, vbSize, vbStride));

    if (!quadVB) {
      return inputAssemblerData;
    } // create index buffer


    const ibStride = Uint8Array.BYTES_PER_ELEMENT;
    const ibSize = ibStride * 6;

    const quadIB = this._device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.INDEX | _index2.BufferUsageBit.TRANSFER_DST, _index2.MemoryUsageBit.DEVICE, ibSize, ibStride));

    if (!quadIB) {
      return inputAssemblerData;
    }

    const indices = new Uint8Array(6);
    indices[0] = 0;
    indices[1] = 1;
    indices[2] = 2;
    indices[3] = 1;
    indices[4] = 3;
    indices[5] = 2;
    quadIB.update(indices); // create input assembler

    const attributes = new Array(2);
    attributes[0] = new _index2.Attribute('a_position', _index2.Format.RG32F);
    attributes[1] = new _index2.Attribute('a_texCoord', _index2.Format.RG32F);

    const quadIA = this._device.createInputAssembler(new _index2.InputAssemblerInfo(attributes, [quadVB], quadIB));

    inputAssemblerData.quadIB = quadIB;
    inputAssemblerData.quadVB = quadVB;
    inputAssemblerData.quadIA = quadIA;
    return inputAssemblerData;
  }

  updateQuadVertexData(renderArea, window) {
    const cachedArea = this._lastUsedRenderArea;

    if (cachedArea.x === renderArea.x && cachedArea.y === renderArea.y && cachedArea.width === renderArea.width && cachedArea.height === renderArea.height) {
      return;
    }

    const offData = this._genQuadVertexData(_index2.SurfaceTransform.IDENTITY, renderArea);

    this._quadVBOffscreen.update(offData);

    const onData = this._genQuadVertexData(window.swapchain && window.swapchain.surfaceTransform || _index2.SurfaceTransform.IDENTITY, renderArea);

    this._quadVBOnscreen.update(onData);

    cachedArea.copy(renderArea);
  }
  /**
   * @en Internal destroy function
   * @zh 内部销毁函数。
   */


  destroy() {
    var _this$_globalDSManage, _this$_pipelineSceneD;

    for (let i = 0; i < this._flows.length; i++) {
      this._flows[i].destroy();
    }

    this._flows.length = 0;

    if (this._descriptorSet) {
      this._descriptorSet.destroy();
    }

    (_this$_globalDSManage = this._globalDSManager) === null || _this$_globalDSManage === void 0 ? void 0 : _this$_globalDSManage.destroy();

    for (let i = 0; i < this._commandBuffers.length; i++) {
      this._commandBuffers[i].destroy();
    }

    this._commandBuffers.length = 0;

    this._pipelineUBO.destroy();

    (_this$_pipelineSceneD = this._pipelineSceneData) === null || _this$_pipelineSceneD === void 0 ? void 0 : _this$_pipelineSceneD.destroy();
    return super.destroy();
  }

  _generateConstantMacros() {
    let str = '';
    str += `#define CC_DEVICE_SUPPORT_FLOAT_TEXTURE ${this.device.hasFeature(_index2.Feature.TEXTURE_FLOAT) ? 1 : 0}\n`;
    str += `#define CC_ENABLE_CLUSTERED_LIGHT_CULLING ${this._clusterEnabled ? 1 : 0}\n`;
    str += `#define CC_DEVICE_MAX_VERTEX_UNIFORM_VECTORS ${this.device.capabilities.maxVertexUniformVectors}\n`;
    str += `#define CC_DEVICE_MAX_FRAGMENT_UNIFORM_VECTORS ${this.device.capabilities.maxFragmentUniformVectors}\n`;
    str += `#define CC_DEVICE_CAN_BENEFIT_FROM_INPUT_ATTACHMENT ${this.device.hasFeature(_index2.Feature.INPUT_ATTACHMENT_BENEFIT) ? 1 : 0}\n`;
    this._constantMacros = str;
  }

  generateBloomRenderData() {
    if (this._pipelineRenderData.bloom != null) return;
    const bloom = this._pipelineRenderData.bloom = new BloomRenderData();
    const device = this.device; // create renderPass

    const colorAttachment = new _index2.ColorAttachment();
    colorAttachment.format = _index2.Format.RGBA8;
    colorAttachment.loadOp = _index2.LoadOp.CLEAR;
    colorAttachment.storeOp = _index2.StoreOp.STORE;
    colorAttachment.endAccesses = [_index2.AccessType.COLOR_ATTACHMENT_WRITE];
    bloom.renderPass = device.createRenderPass(new _index2.RenderPassInfo([colorAttachment]));
    let curWidth = this._width;
    let curHeight = this._height; // prefilter

    bloom.prefiterTex = device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA8, curWidth >> 1, curHeight >> 1));
    bloom.prefilterFramebuffer = device.createFramebuffer(new _index2.FramebufferInfo(bloom.renderPass, [bloom.prefiterTex])); // downsample & upsample

    curWidth >>= 1;
    curHeight >>= 1;

    for (let i = 0; i < MAX_BLOOM_FILTER_PASS_NUM; ++i) {
      bloom.downsampleTexs.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA8, curWidth >> 1, curHeight >> 1)));
      bloom.downsampleFramebuffers[i] = device.createFramebuffer(new _index2.FramebufferInfo(bloom.renderPass, [bloom.downsampleTexs[i]]));
      bloom.upsampleTexs.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA8, curWidth, curHeight)));
      bloom.upsampleFramebuffers[i] = device.createFramebuffer(new _index2.FramebufferInfo(bloom.renderPass, [bloom.upsampleTexs[i]]));
      curWidth >>= 1;
      curHeight >>= 1;
    } // combine


    bloom.combineTex = device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA8, this._width, this._height));
    bloom.combineFramebuffer = device.createFramebuffer(new _index2.FramebufferInfo(bloom.renderPass, [bloom.combineTex])); // sampler

    bloom.sampler = this.globalDSManager.linearSampler;
  }
  /**
   * @en
   * Register an callback of the pipeline event type on the RenderPipeline.
   * @zh
   * 在渲染管线中注册管线事件类型的回调。
   */


  on(type, callback, target, once) {
    return this._eventProcessor.on(type, callback, target, once);
  }
  /**
   * @en
   * Register an callback of the pipeline event type on the RenderPipeline,
   * the callback will remove itself after the first time it is triggered.
   * @zh
   * 在渲染管线中注册管线事件类型的回调, 回调后会在第一时间删除自身。
   */


  once(type, callback, target) {
    return this._eventProcessor.once(type, callback, target);
  }
  /**
   * @en
   * Removes the listeners previously registered with the same type, callback, target and or useCapture,
   * if only type is passed as parameter, all listeners registered with that type will be removed.
   * @zh
   * 删除之前用同类型、回调、目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
   */


  off(type, callback, target) {
    this._eventProcessor.off(type, callback, target);
  }
  /**
   * @zh 派发一个指定事件，并传递需要的参数
   * @en Trigger an event directly with the event name and necessary arguments.
   * @param type - event type
   * @param args - Arguments when the event triggered
   */


  emit(type, arg0, arg1, arg2, arg3, arg4) {
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


  targetOff(typeOrTarget) {
    this._eventProcessor.targetOff(typeOrTarget);
  }
  /**
   * @zh 移除在特定事件类型中注册的所有回调或在某个目标中注册的所有回调。
   * @en Removes all callbacks registered in a certain event type or all callbacks registered with a certain target
   * @param typeOrTarget - The event type or target with which the listeners will be removed
   */


  removeAll(typeOrTarget) {
    this._eventProcessor.removeAll(typeOrTarget);
  }
  /**
   * @zh 检查指定事件是否已注册回调。
   * @en Checks whether there is correspond event listener registered on the given event.
   * @param type - Event type.
   * @param callback - Callback function when event triggered.
   * @param target - Callback callee.
   */


  hasEventListener(type, callback, target) {
    return this._eventProcessor.hasEventListener(type, callback, target);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_tag", [_dec2, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_flows", [_dec3, _dec4, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class); // Do not delete, for the class detection of editor

exports.RenderPipeline = RenderPipeline;
_globalExports.legacyCC.RenderPipeline = RenderPipeline;
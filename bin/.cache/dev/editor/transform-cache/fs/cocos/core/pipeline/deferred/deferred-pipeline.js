"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeferredPipeline = exports.DeferredRenderData = void 0;

var _index = require("../../data/decorators/index.js");

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _builtinResMgr = require("../../builtin/builtin-res-mgr.js");

var _renderPipeline = require("../render-pipeline.js");

var _mainFlow = require("./main-flow.js");

var _pipelineSerialization = require("../pipeline-serialization.js");

var _shadowFlow = require("../shadow/shadow-flow.js");

var _index2 = require("../../gfx/index.js");

var _define = require("../define.js");

var _debug = require("../../platform/debug.js");

var _deferredPipelineSceneData = require("./deferred-pipeline-scene-data.js");

var _pipelineEvent = require("../pipeline-event.js");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const PIPELINE_TYPE = 1;

class DeferredRenderData extends _renderPipeline.PipelineRenderData {
  constructor(...args) {
    super(...args);
    this.gbufferFrameBuffer = null;
    this.gbufferRenderTargets = [];
  }

}
/**
 * @en The deferred render pipeline
 * @zh 延迟渲染管线。
 */


exports.DeferredRenderData = DeferredRenderData;
let DeferredPipeline = (_dec = (0, _index.ccclass)('DeferredPipeline'), _dec2 = (0, _index.type)([_pipelineSerialization.RenderTextureConfig]), _dec3 = (0, _index.displayOrder)(2), _dec(_class = (_class2 = (_temp = class DeferredPipeline extends _renderPipeline.RenderPipeline {
  constructor(...args) {
    super(...args);
    this._gbufferRenderPass = null;
    this._lightingRenderPass = null;

    _initializerDefineProperty(this, "renderTextures", _descriptor, this);
  }

  initialize(info) {
    super.initialize(info);

    if (this._flows.length === 0) {
      const shadowFlow = new _shadowFlow.ShadowFlow();
      shadowFlow.initialize(_shadowFlow.ShadowFlow.initInfo);

      this._flows.push(shadowFlow);

      const mainFlow = new _mainFlow.MainFlow();
      mainFlow.initialize(_mainFlow.MainFlow.initInfo);

      this._flows.push(mainFlow);
    }

    return true;
  }

  activate(swapchain) {
    if (_internal253Aconstants.EDITOR) {
      console.info('Deferred render pipeline initialized. ' + 'Note that non-transparent materials with no lighting will not be rendered, such as builtin-unlit.');
    }

    this._macros = {
      CC_PIPELINE_TYPE: PIPELINE_TYPE
    };
    this._pipelineSceneData = new _deferredPipelineSceneData.DeferredPipelineSceneData();

    if (!super.activate(swapchain)) {
      return false;
    }

    if (!this._activeRenderer(swapchain)) {
      (0, _debug.errorID)(2402);
      return false;
    }

    return true;
  }

  destroy() {
    this._destroyUBOs();

    this._destroyQuadInputAssembler();

    this._destroyDeferredData();

    const rpIter = this._renderPasses.values();

    let rpRes = rpIter.next();

    while (!rpRes.done) {
      rpRes.value.destroy();
      rpRes = rpIter.next();
    }

    this._commandBuffers.length = 0;
    return super.destroy();
  }

  getPipelineRenderData() {
    if (!this._pipelineRenderData) {
      this._generateDeferredRenderData();
    }

    return this._pipelineRenderData;
  }

  _activeRenderer(swapchain) {
    const device = this.device;

    this._commandBuffers.push(device.commandBuffer);

    const sampler = this.globalDSManager.pointSampler;

    this._descriptorSet.bindSampler(_define.UNIFORM_SHADOWMAP_BINDING, sampler);

    this._descriptorSet.bindTexture(_define.UNIFORM_SHADOWMAP_BINDING, _builtinResMgr.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.bindSampler(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, sampler);

    this._descriptorSet.bindTexture(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, _builtinResMgr.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.update();

    let inputAssemblerDataOffscreen = new _renderPipeline.PipelineInputAssemblerData();
    inputAssemblerDataOffscreen = this._createQuadInputAssembler();

    if (!inputAssemblerDataOffscreen.quadIB || !inputAssemblerDataOffscreen.quadVB || !inputAssemblerDataOffscreen.quadIA) {
      return false;
    }

    this._quadIB = inputAssemblerDataOffscreen.quadIB;
    this._quadVBOffscreen = inputAssemblerDataOffscreen.quadVB;
    this._quadIAOffscreen = inputAssemblerDataOffscreen.quadIA;

    const inputAssemblerDataOnscreen = this._createQuadInputAssembler();

    if (!inputAssemblerDataOnscreen.quadIB || !inputAssemblerDataOnscreen.quadVB || !inputAssemblerDataOnscreen.quadIA) {
      return false;
    }

    this._quadVBOnscreen = inputAssemblerDataOnscreen.quadVB;
    this._quadIAOnscreen = inputAssemblerDataOnscreen.quadIA;

    if (!this._gbufferRenderPass) {
      const colorAttachment0 = new _index2.ColorAttachment();
      colorAttachment0.format = _index2.Format.RGBA16F;
      colorAttachment0.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment0.storeOp = _index2.StoreOp.STORE;
      const colorAttachment1 = new _index2.ColorAttachment();
      colorAttachment1.format = _index2.Format.RGBA16F;
      colorAttachment1.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment1.storeOp = _index2.StoreOp.STORE;
      const colorAttachment2 = new _index2.ColorAttachment();
      colorAttachment2.format = _index2.Format.RGBA16F;
      colorAttachment2.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment2.storeOp = _index2.StoreOp.STORE;
      const colorAttachment3 = new _index2.ColorAttachment();
      colorAttachment3.format = _index2.Format.RGBA16F;
      colorAttachment3.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment3.storeOp = _index2.StoreOp.STORE;
      const depthStencilAttachment = new _index2.DepthStencilAttachment();
      depthStencilAttachment.format = _index2.Format.DEPTH_STENCIL;
      depthStencilAttachment.depthLoadOp = _index2.LoadOp.CLEAR;
      depthStencilAttachment.depthStoreOp = _index2.StoreOp.STORE;
      depthStencilAttachment.stencilLoadOp = _index2.LoadOp.CLEAR;
      depthStencilAttachment.stencilStoreOp = _index2.StoreOp.STORE;
      const renderPassInfo = new _index2.RenderPassInfo([colorAttachment0, colorAttachment1, colorAttachment2, colorAttachment3], depthStencilAttachment);
      this._gbufferRenderPass = device.createRenderPass(renderPassInfo);
    }

    if (!this._lightingRenderPass) {
      const colorAttachment = new _index2.ColorAttachment();
      colorAttachment.format = _index2.Format.RGBA8;
      colorAttachment.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment.storeOp = _index2.StoreOp.STORE;
      colorAttachment.endAccesses = [_index2.AccessType.COLOR_ATTACHMENT_WRITE];
      const depthStencilAttachment = new _index2.DepthStencilAttachment();
      depthStencilAttachment.format = _index2.Format.DEPTH_STENCIL;
      depthStencilAttachment.depthLoadOp = _index2.LoadOp.LOAD;
      depthStencilAttachment.depthStoreOp = _index2.StoreOp.DISCARD;
      depthStencilAttachment.stencilLoadOp = _index2.LoadOp.LOAD;
      depthStencilAttachment.stencilStoreOp = _index2.StoreOp.DISCARD;
      depthStencilAttachment.beginAccesses = [_index2.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
      depthStencilAttachment.endAccesses = [_index2.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
      const renderPassInfo = new _index2.RenderPassInfo([colorAttachment], depthStencilAttachment);
      this._lightingRenderPass = device.createRenderPass(renderPassInfo);
    }

    this._width = swapchain.width;
    this._height = swapchain.height;

    this._generateDeferredRenderData();

    return true;
  }

  _destroyUBOs() {
    if (this._descriptorSet) {
      this._descriptorSet.getBuffer(_define.UBOGlobal.BINDING).destroy();

      this._descriptorSet.getBuffer(_define.UBOShadow.BINDING).destroy();

      this._descriptorSet.getBuffer(_define.UBOCamera.BINDING).destroy();

      this._descriptorSet.getTexture(_define.UNIFORM_SHADOWMAP_BINDING).destroy();

      this._descriptorSet.getTexture(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
    }
  }

  _destroyDeferredData() {
    const deferredData = this._pipelineRenderData;

    if (deferredData) {
      if (deferredData.gbufferFrameBuffer) deferredData.gbufferFrameBuffer.destroy();
      if (deferredData.outputFrameBuffer) deferredData.outputFrameBuffer.destroy();
      if (deferredData.outputDepth) deferredData.outputDepth.destroy();

      for (let i = 0; i < deferredData.gbufferRenderTargets.length; i++) {
        deferredData.gbufferRenderTargets[i].destroy();
      }

      deferredData.gbufferRenderTargets.length = 0;

      for (let i = 0; i < deferredData.outputRenderTargets.length; i++) {
        deferredData.outputRenderTargets[i].destroy();
      }

      deferredData.outputRenderTargets.length = 0;

      this._destroyBloomData();
    }

    this._pipelineRenderData = null;
  }

  _ensureEnoughSize(cameras) {
    let newWidth = this._width;
    let newHeight = this._height;

    for (let i = 0; i < cameras.length; ++i) {
      const window = cameras[i].window;
      newWidth = Math.max(window.width, newWidth);
      newHeight = Math.max(window.height, newHeight);
    }

    if (newWidth !== this._width || newHeight !== this._height) {
      this._width = newWidth;
      this._height = newHeight;

      this._destroyDeferredData();

      this._generateDeferredRenderData();
    }
  }

  _generateDeferredRenderData() {
    const device = this.device;
    const data = this._pipelineRenderData = new DeferredRenderData();
    const sceneData = this.pipelineSceneData;

    for (let i = 0; i < 4; ++i) {
      data.gbufferRenderTargets.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA16F, // positions & normals need more precision
      this._width * sceneData.shadingScale, this._height * sceneData.shadingScale)));
    }

    data.outputDepth = device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, _index2.Format.DEPTH_STENCIL, this._width * sceneData.shadingScale, this._height * sceneData.shadingScale));
    data.gbufferFrameBuffer = device.createFramebuffer(new _index2.FramebufferInfo(this._gbufferRenderPass, data.gbufferRenderTargets, data.outputDepth));
    data.outputRenderTargets.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA16F, this._width * sceneData.shadingScale, this._height * sceneData.shadingScale)));
    data.outputFrameBuffer = device.createFramebuffer(new _index2.FramebufferInfo(this._lightingRenderPass, data.outputRenderTargets, data.outputDepth)); // Listens when the attachment texture is scaled

    this.on(_pipelineEvent.PipelineEventType.ATTACHMENT_SCALE_CAHNGED, val => {
      data.sampler = val < 1 ? this.globalDSManager.pointSampler : this.globalDSManager.linearSampler;
      this.applyFramebufferRatio(data.gbufferFrameBuffer);
      this.applyFramebufferRatio(data.outputFrameBuffer);
    });
    data.sampler = this.globalDSManager.linearSampler;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "renderTextures", [_dec2, _index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.DeferredPipeline = DeferredPipeline;
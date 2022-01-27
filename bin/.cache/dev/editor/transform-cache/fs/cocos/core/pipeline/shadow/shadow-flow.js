"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShadowFlow = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _renderFlow = require("../render-flow.js");

var _enum = require("../enum.js");

var _shadowStage = require("./shadow-stage.js");

var _index2 = require("../../gfx/index.js");

var _pipelineSerialization = require("../pipeline-serialization.js");

var _shadows = require("../../renderer/scene/shadows.js");

var _light = require("../../renderer/scene/light.js");

var _dec, _class, _class2, _temp;

const _validLights = [];
/**
 * @en Shadow map render flow
 * @zh 阴影贴图绘制流程
 */

let ShadowFlow = (_dec = (0, _index.ccclass)('ShadowFlow'), _dec(_class = (_temp = _class2 = class ShadowFlow extends _renderFlow.RenderFlow {
  constructor(...args) {
    super(...args);
    this._shadowRenderPass = null;
  }

  initialize(info) {
    super.initialize(info);

    if (this._stages.length === 0) {
      // add shadowMap-stages
      const shadowMapStage = new _shadowStage.ShadowStage();
      shadowMapStage.initialize(_shadowStage.ShadowStage.initInfo);

      this._stages.push(shadowMapStage);
    }

    return true;
  }

  render(camera) {
    const pipeline = this._pipeline;
    const shadowInfo = pipeline.pipelineSceneData.shadows;
    const shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
    const castShadowObjects = pipeline.pipelineSceneData.castShadowObjects;
    const validPunctualLights = this._pipeline.pipelineSceneData.validPunctualLights;

    if (!shadowInfo.enabled || shadowInfo.type !== _shadows.ShadowType.ShadowMap) {
      return;
    }

    let n = 0;
    let m = 0;

    for (; n < shadowInfo.maxReceived && m < validPunctualLights.length;) {
      const light = validPunctualLights[m];

      if (light.type === _light.LightType.SPOT) {
        _validLights.push(light);

        n++;
      }

      m++;
    }

    if (castShadowObjects.length === 0) {
      this.clearShadowMap(_validLights, camera);
      return;
    }

    if (shadowInfo.shadowMapDirty) {
      this.resizeShadowMap();
    }

    const {
      mainLight
    } = camera.scene;

    if (mainLight) {
      const globalDS = pipeline.descriptorSet;

      if (!shadowFrameBufferMap.has(mainLight)) {
        this._initShadowFrameBuffer(pipeline, mainLight, camera.window.swapchain);
      }

      const shadowFrameBuffer = shadowFrameBufferMap.get(mainLight);

      for (let i = 0; i < this._stages.length; i++) {
        const shadowStage = this._stages[i];
        shadowStage.setUsage(globalDS, mainLight, shadowFrameBuffer);
        shadowStage.render(camera);
      }
    }

    for (let l = 0; l < _validLights.length; l++) {
      const light = _validLights[l];
      const globalDS = pipeline.globalDSManager.getOrCreateDescriptorSet(l);

      if (!shadowFrameBufferMap.has(light)) {
        this._initShadowFrameBuffer(pipeline, light, camera.window.swapchain);
      }

      const shadowFrameBuffer = shadowFrameBufferMap.get(light);

      for (let i = 0; i < this._stages.length; i++) {
        const shadowStage = this._stages[i];
        shadowStage.setUsage(globalDS, light, shadowFrameBuffer);
        shadowStage.render(camera);
      }
    }

    _validLights.length = 0;
  }

  destroy() {
    super.destroy();

    if (this._pipeline) {
      const shadowFrameBufferMap = this._pipeline.pipelineSceneData.shadowFrameBufferMap;
      const shadowFrameBuffers = Array.from(shadowFrameBufferMap.values());

      for (let i = 0; i < shadowFrameBuffers.length; i++) {
        const frameBuffer = shadowFrameBuffers[i];

        if (!frameBuffer) {
          continue;
        }

        const renderTargets = frameBuffer.colorTextures;

        for (let j = 0; j < renderTargets.length; j++) {
          const renderTarget = renderTargets[i];

          if (renderTarget) {
            renderTarget.destroy();
          }
        }

        renderTargets.length = 0;
        const depth = frameBuffer.depthStencilTexture;

        if (depth) {
          depth.destroy();
        }

        frameBuffer.destroy();
      }

      shadowFrameBufferMap.clear();
    }

    if (this._shadowRenderPass) {
      this._shadowRenderPass.destroy();
    }
  }

  _initShadowFrameBuffer(pipeline, light, swapchain) {
    const {
      device
    } = pipeline;
    const shadows = pipeline.pipelineSceneData.shadows;
    const shadowMapSize = shadows.size;
    const shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
    const format = (0, _define.supportsFloatTexture)(device) ? _index2.Format.R32F : _index2.Format.RGBA8;

    if (!this._shadowRenderPass) {
      const colorAttachment = new _index2.ColorAttachment();
      colorAttachment.format = format;
      colorAttachment.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment.storeOp = _index2.StoreOp.STORE;
      colorAttachment.sampleCount = 1;
      const depthStencilAttachment = new _index2.DepthStencilAttachment();
      depthStencilAttachment.format = _index2.Format.DEPTH_STENCIL;
      depthStencilAttachment.depthLoadOp = _index2.LoadOp.CLEAR;
      depthStencilAttachment.depthStoreOp = _index2.StoreOp.DISCARD;
      depthStencilAttachment.stencilLoadOp = _index2.LoadOp.CLEAR;
      depthStencilAttachment.stencilStoreOp = _index2.StoreOp.DISCARD;
      depthStencilAttachment.sampleCount = 1;
      const renderPassInfo = new _index2.RenderPassInfo([colorAttachment], depthStencilAttachment);
      this._shadowRenderPass = device.createRenderPass(renderPassInfo);
    }

    const shadowRenderTargets = [];
    shadowRenderTargets.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, format, shadowMapSize.x, shadowMapSize.y)));
    const depth = device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, _index2.Format.DEPTH_STENCIL, shadowMapSize.x, shadowMapSize.y));
    const shadowFrameBuffer = device.createFramebuffer(new _index2.FramebufferInfo(this._shadowRenderPass, shadowRenderTargets, depth)); // Cache frameBuffer

    shadowFrameBufferMap.set(light, shadowFrameBuffer);
  }

  clearShadowMap(validLights, camera) {
    const pipeline = this._pipeline;
    const scene = pipeline.pipelineSceneData;
    const {
      mainLight
    } = camera.scene;

    if (mainLight) {
      const globalDS = this._pipeline.descriptorSet;

      if (!scene.shadowFrameBufferMap.has(mainLight)) {
        this._initShadowFrameBuffer(this._pipeline, mainLight, camera.window.swapchain);
      }

      const shadowFrameBuffer = scene.shadowFrameBufferMap.get(mainLight);

      for (let i = 0; i < this._stages.length; i++) {
        const shadowStage = this._stages[i];
        shadowStage.setUsage(globalDS, mainLight, shadowFrameBuffer);
        shadowStage.render(camera);
      }
    }

    for (let l = 0; l < validLights.length; l++) {
      const light = validLights[l];
      const shadowFrameBuffer = scene.shadowFrameBufferMap.get(light);
      const globalDS = pipeline.globalDSManager.getOrCreateDescriptorSet(l);

      if (!scene.shadowFrameBufferMap.has(light)) {
        continue;
      }

      for (let i = 0; i < this._stages.length; i++) {
        const shadowStage = this._stages[i];
        shadowStage.setUsage(globalDS, light, shadowFrameBuffer);
        shadowStage.clearFramebuffer(camera);
      }
    }
  }

  resizeShadowMap() {
    const shadows = this._pipeline.pipelineSceneData.shadows;
    const shadowMapSize = shadows.size;
    const pipeline = this._pipeline;
    const device = pipeline.device;
    const shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
    const format = (0, _define.supportsFloatTexture)(device) ? _index2.Format.R32F : _index2.Format.RGBA8;
    const it = shadowFrameBufferMap.values();
    let res = it.next();

    while (!res.done) {
      const frameBuffer = res.value;

      if (!frameBuffer) {
        res = it.next();
        continue;
      }

      const renderTargets = [];
      renderTargets.push(pipeline.device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, format, shadowMapSize.x, shadowMapSize.y)));
      const depth = frameBuffer.depthStencilTexture;

      if (depth) {
        depth.resize(shadowMapSize.x, shadowMapSize.y);
      }

      const shadowRenderPass = frameBuffer.renderPass;
      frameBuffer.destroy();
      frameBuffer.initialize(new _index2.FramebufferInfo(shadowRenderPass, renderTargets, depth));
      res = it.next();
    }

    shadows.shadowMapDirty = false;
  }

}, _class2.initInfo = {
  name: _define.PIPELINE_FLOW_SHADOW,
  priority: _enum.ForwardFlowPriority.SHADOW,
  tag: _pipelineSerialization.RenderFlowTag.SCENE,
  stages: []
}, _temp)) || _class);
exports.ShadowFlow = ShadowFlow;
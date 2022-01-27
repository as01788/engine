"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BloomStage = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _material = require("../../assets/material.js");

var _index2 = require("../../gfx/index.js");

var _pipelineStateManager = require("../pipeline-state-manager.js");

var _renderStage = require("../render-stage.js");

var _enum = require("../enum.js");

var _renderPipeline = require("../render-pipeline.js");

var _deferredPipelineSceneData = require("./deferred-pipeline-scene-data.js");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const colors = [new _index2.Color(0, 0, 0, 1)];
/**
 * @en The uniform buffer object for bloom
 * @zh Bloom UBO。
 */

class UBOBloom {}
/**
 * @en The bloom post-process stage
 * @zh Bloom 后处理阶段。
 */


UBOBloom.TEXTURE_SIZE_OFFSET = 0;
UBOBloom.COUNT = UBOBloom.TEXTURE_SIZE_OFFSET + 4;
UBOBloom.SIZE = UBOBloom.COUNT * 4;
let BloomStage = (_dec = (0, _index.ccclass)('BloomStage'), _dec2 = (0, _index.type)(_material.Material), _dec3 = (0, _index.displayOrder)(3), _dec(_class = (_class2 = (_temp = _class3 = class BloomStage extends _renderStage.RenderStage {
  constructor() {
    super();
    this.threshold = 1.0;
    this.intensity = 0.8;
    this.iterations = 2;

    _initializerDefineProperty(this, "_bloomMaterial", _descriptor, this);

    this._renderArea = new _index2.Rect();
    this._bloomUBO = [];
  }

  initialize(info) {
    super.initialize(info);
    return true;
  }

  activate(pipeline, flow) {
    super.activate(pipeline, flow);

    if (this._bloomMaterial) {
      pipeline.pipelineSceneData.bloomMaterial = this._bloomMaterial;
    }
  }

  destroy() {}

  render(camera) {
    var _camera$window;

    const pipeline = this._pipeline;
    pipeline.generateBloomRenderData();

    if (!((_camera$window = camera.window) === null || _camera$window === void 0 ? void 0 : _camera$window.swapchain) && !pipeline.macros.CC_PIPELINE_TYPE) {
      return;
    }

    if (!pipeline.bloomEnabled || pipeline.pipelineSceneData.renderObjects.length === 0) return;

    if (this._bloomUBO.length === 0) {
      const passNumber = _renderPipeline.MAX_BLOOM_FILTER_PASS_NUM * 2 + 2;

      for (let i = 0; i < passNumber; ++i) {
        this._bloomUBO[i] = pipeline.device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.UNIFORM | _index2.BufferUsageBit.TRANSFER_DST, _index2.MemoryUsageBit.HOST | _index2.MemoryUsageBit.DEVICE, UBOBloom.SIZE, UBOBloom.SIZE));
      }
    }

    if (camera.clearFlag & _index2.ClearFlagBit.COLOR) {
      colors[0].x = camera.clearColor.x;
      colors[0].y = camera.clearColor.y;
      colors[0].z = camera.clearColor.z;
    }

    colors[0].w = camera.clearColor.w;

    this._prefilterPass(camera, pipeline);

    this._downsamplePass(camera, pipeline);

    this._upsamplePass(camera, pipeline);

    this._combinePass(camera, pipeline);
  }

  _prefilterPass(camera, pipeline) {
    pipeline.generateRenderArea(camera, this._renderArea);
    this._renderArea.width >>= 1;
    this._renderArea.height >>= 1;
    const cmdBuff = pipeline.commandBuffers[0];
    const sceneData = pipeline.pipelineSceneData;
    const builtinBloomProcess = sceneData.bloomMaterial;
    const pass = builtinBloomProcess.passes[_deferredPipelineSceneData.BLOOM_PREFILTERPASS_INDEX];
    const renderData = pipeline.getPipelineRenderData();
    const bloomData = renderData.bloom;
    const textureSize = new Float32Array(UBOBloom.COUNT);
    textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 2] = this.threshold;
    cmdBuff.updateBuffer(this._bloomUBO[0], textureSize);
    cmdBuff.beginRenderPass(bloomData.renderPass, bloomData.prefilterFramebuffer, this._renderArea, colors, 0, 0);
    cmdBuff.bindDescriptorSet(_define.SetIndex.GLOBAL, pipeline.descriptorSet);
    pass.descriptorSet.bindBuffer(0, this._bloomUBO[0]);
    pass.descriptorSet.bindTexture(1, renderData.outputRenderTargets[0]);
    pass.descriptorSet.bindSampler(1, bloomData.sampler);
    pass.descriptorSet.update();
    cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, pass.descriptorSet);
    const inputAssembler = camera.window.swapchain ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
    let pso = null;
    const shader = pass.getShaderVariant();

    if (pass != null && shader != null && inputAssembler != null) {
      pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(pipeline.device, pass, shader, bloomData.renderPass, inputAssembler);
    }

    if (pso != null) {
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindInputAssembler(inputAssembler);
      cmdBuff.draw(inputAssembler);
    }

    cmdBuff.endRenderPass();
  }

  _downsamplePass(camera, pipeline) {
    pipeline.generateRenderArea(camera, this._renderArea);
    this._renderArea.width >>= 1;
    this._renderArea.height >>= 1;
    const cmdBuff = pipeline.commandBuffers[0];
    const sceneData = pipeline.pipelineSceneData;
    const builtinBloomProcess = sceneData.bloomMaterial;
    const bloomData = pipeline.getPipelineRenderData().bloom;
    const textureSize = new Float32Array(UBOBloom.COUNT);

    for (let i = 0; i < this.iterations; ++i) {
      textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 0] = this._renderArea.width;
      textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 1] = this._renderArea.height;
      cmdBuff.updateBuffer(this._bloomUBO[i + 1], textureSize);
      this._renderArea.width >>= 1;
      this._renderArea.height >>= 1;
      cmdBuff.beginRenderPass(bloomData.renderPass, bloomData.downsampleFramebuffers[i], this._renderArea, colors, 0, 0);
      const pass = builtinBloomProcess.passes[_deferredPipelineSceneData.BLOOM_DOWNSAMPLEPASS_INDEX + i];
      const shader = pass.getShaderVariant();
      pass.descriptorSet.bindBuffer(0, this._bloomUBO[i + 1]);

      if (i === 0) {
        pass.descriptorSet.bindTexture(1, bloomData.prefiterTex);
      } else {
        pass.descriptorSet.bindTexture(1, bloomData.downsampleTexs[i - 1]);
      }

      pass.descriptorSet.bindSampler(1, bloomData.sampler);
      pass.descriptorSet.update();
      cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, pass.descriptorSet);
      const inputAssembler = camera.window.swapchain ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
      let pso = null;

      if (pass != null && shader != null && inputAssembler != null) {
        pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(pipeline.device, pass, shader, bloomData.renderPass, inputAssembler);
      }

      if (pso != null) {
        cmdBuff.bindPipelineState(pso);
        cmdBuff.bindInputAssembler(inputAssembler);
        cmdBuff.draw(inputAssembler);
      }

      cmdBuff.endRenderPass();
    }
  }

  _upsamplePass(camera, pipeline) {
    const bloomData = pipeline.getPipelineRenderData().bloom;
    pipeline.generateRenderArea(camera, this._renderArea);
    this._renderArea.width >>= this.iterations + 1;
    this._renderArea.height >>= this.iterations + 1;
    const cmdBuff = pipeline.commandBuffers[0];
    const sceneData = pipeline.pipelineSceneData;
    const builtinBloomProcess = sceneData.bloomMaterial;
    const textureSize = new Float32Array(UBOBloom.COUNT);

    for (let i = 0; i < this.iterations; ++i) {
      const index = i + _renderPipeline.MAX_BLOOM_FILTER_PASS_NUM + 1;
      textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 0] = this._renderArea.width;
      textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 1] = this._renderArea.height;
      cmdBuff.updateBuffer(this._bloomUBO[index], textureSize);
      this._renderArea.width <<= 1;
      this._renderArea.height <<= 1;
      cmdBuff.beginRenderPass(bloomData.renderPass, bloomData.upsampleFramebuffers[this.iterations - 1 - i], this._renderArea, colors, 0, 0);
      const pass = builtinBloomProcess.passes[_deferredPipelineSceneData.BLOOM_UPSAMPLEPASS_INDEX + i];
      const shader = pass.getShaderVariant();
      pass.descriptorSet.bindBuffer(0, this._bloomUBO[index]);

      if (i === 0) {
        pass.descriptorSet.bindTexture(1, bloomData.downsampleTexs[this.iterations - 1]);
      } else {
        pass.descriptorSet.bindTexture(1, bloomData.upsampleTexs[this.iterations - i]);
      }

      pass.descriptorSet.bindSampler(1, bloomData.sampler);
      pass.descriptorSet.update();
      cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, pass.descriptorSet);
      const inputAssembler = camera.window.swapchain ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
      let pso = null;

      if (pass != null && shader != null && inputAssembler != null) {
        pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(pipeline.device, pass, shader, bloomData.renderPass, inputAssembler);
      }

      if (pso != null) {
        cmdBuff.bindPipelineState(pso);
        cmdBuff.bindInputAssembler(inputAssembler);
        cmdBuff.draw(inputAssembler);
      }

      cmdBuff.endRenderPass();
    }
  }

  _combinePass(camera, pipeline) {
    pipeline.generateRenderArea(camera, this._renderArea);
    const cmdBuff = pipeline.commandBuffers[0];
    const sceneData = pipeline.pipelineSceneData;
    const builtinBloomProcess = sceneData.bloomMaterial;
    const deferredData = pipeline.getPipelineRenderData();
    const bloomData = deferredData.bloom;
    const uboIndex = _renderPipeline.MAX_BLOOM_FILTER_PASS_NUM * 2 + 1;
    const textureSize = new Float32Array(UBOBloom.COUNT);
    textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 3] = this.intensity;
    cmdBuff.updateBuffer(this._bloomUBO[uboIndex], textureSize);
    cmdBuff.beginRenderPass(bloomData.renderPass, bloomData.combineFramebuffer, this._renderArea, colors, 0, 0);
    cmdBuff.bindDescriptorSet(_define.SetIndex.GLOBAL, pipeline.descriptorSet);
    const pass = builtinBloomProcess.passes[_deferredPipelineSceneData.BLOOM_COMBINEPASS_INDEX];
    pass.descriptorSet.bindBuffer(0, this._bloomUBO[uboIndex]);
    pass.descriptorSet.bindTexture(1, deferredData.outputRenderTargets[0]);
    pass.descriptorSet.bindTexture(2, bloomData.upsampleTexs[0]);
    pass.descriptorSet.bindSampler(1, bloomData.sampler);
    pass.descriptorSet.bindSampler(2, bloomData.sampler);
    pass.descriptorSet.update();
    cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, pass.descriptorSet);
    const inputAssembler = camera.window.swapchain ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
    let pso = null;
    const shader = pass.getShaderVariant();

    if (pass != null && shader != null && inputAssembler != null) {
      pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(pipeline.device, pass, shader, bloomData.renderPass, inputAssembler);
    }

    if (pso != null) {
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindInputAssembler(inputAssembler);
      cmdBuff.draw(inputAssembler);
    }

    cmdBuff.endRenderPass();
  }

}, _class3.initInfo = {
  name: 'BloomStage',
  priority: _enum.CommonStagePriority.BLOOM,
  tag: 0
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_bloomMaterial", [_dec2, _index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.BloomStage = BloomStage;
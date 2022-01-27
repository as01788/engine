"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostProcessStage = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _index2 = require("../../gfx/index.js");

var _renderStage = require("../render-stage.js");

var _enum = require("../enum.js");

var _material = require("../../assets/material.js");

var _pipelineStateManager = require("../pipeline-state-manager.js");

var _pipelineSerialization = require("../pipeline-serialization.js");

var _pipelineFuncs = require("../pipeline-funcs.js");

var _uiPhase = require("../ui-phase.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const colors = [new _index2.Color(0, 0, 0, 1)];
/**
  * @en The postprocess render stage
  * @zh 后处理渲染阶段。
  */

let PostProcessStage = (_dec = (0, _index.ccclass)('PostProcessStage'), _dec2 = (0, _index.type)(_material.Material), _dec3 = (0, _index.displayOrder)(3), _dec4 = (0, _index.type)([_pipelineSerialization.RenderQueueDesc]), _dec5 = (0, _index.displayOrder)(2), _dec(_class = (_class2 = (_temp = _class3 = class PostProcessStage extends _renderStage.RenderStage {
  constructor() {
    super();

    _initializerDefineProperty(this, "_postProcessMaterial", _descriptor, this);

    _initializerDefineProperty(this, "renderQueues", _descriptor2, this);

    this._renderArea = new _index2.Rect();
    this._uiPhase = new _uiPhase.UIPhase();
  }

  initialize(info) {
    super.initialize(info);
    return true;
  }

  activate(pipeline, flow) {
    super.activate(pipeline, flow);

    if (this._postProcessMaterial) {
      pipeline.pipelineSceneData.postprocessMaterial = this._postProcessMaterial;
    }

    this._uiPhase.activate(pipeline);
  }

  destroy() {}

  render(camera) {
    const pipeline = this._pipeline;
    const device = pipeline.device;
    const sceneData = pipeline.pipelineSceneData;
    const cmdBuff = pipeline.commandBuffers[0];
    pipeline.pipelineUBO.updateCameraUBO(camera);
    const vp = camera.viewport;
    this._renderArea.x = vp.x * camera.window.width;
    this._renderArea.y = vp.y * camera.window.height;
    this._renderArea.width = vp.width * camera.window.width;
    this._renderArea.height = vp.height * camera.window.height;
    const renderData = pipeline.getPipelineRenderData();
    const framebuffer = camera.window.framebuffer;
    const swapchain = camera.window.swapchain;
    const renderPass = swapchain ? pipeline.getRenderPass(camera.clearFlag, swapchain) : framebuffer.renderPass;

    if (camera.clearFlag & _index2.ClearFlagBit.COLOR) {
      colors[0].x = camera.clearColor.x;
      colors[0].y = camera.clearColor.y;
      colors[0].z = camera.clearColor.z;
    }

    colors[0].w = camera.clearColor.w;
    cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
    cmdBuff.bindDescriptorSet(_define.SetIndex.GLOBAL, pipeline.descriptorSet); // Postprocess

    const builtinPostProcess = sceneData.postprocessMaterial;
    const pass = builtinPostProcess.passes[0];
    const shader = pass.getShaderVariant();

    if (pipeline.bloomEnabled) {
      pass.descriptorSet.bindTexture(0, renderData.bloom.combineTex);
    } else {
      pass.descriptorSet.bindTexture(0, renderData.outputRenderTargets[0]);
    }

    pass.descriptorSet.bindSampler(0, renderData.sampler);
    pass.descriptorSet.update();
    cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, pass.descriptorSet);
    const inputAssembler = camera.window.swapchain ? pipeline.quadIAOnscreen : pipeline.quadIAOffscreen;
    let pso = null;

    if (pass != null && shader != null && inputAssembler != null) {
      pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
    }

    const renderObjects = pipeline.pipelineSceneData.renderObjects;

    if (pso != null && renderObjects.length > 0) {
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindInputAssembler(inputAssembler);
      cmdBuff.draw(inputAssembler);
    }

    this._uiPhase.render(camera, renderPass);

    (0, _pipelineFuncs.renderProfiler)(device, renderPass, cmdBuff, pipeline.profiler, camera);
    cmdBuff.endRenderPass();
  }

}, _class3.initInfo = {
  name: 'PostProcessStage',
  priority: _enum.CommonStagePriority.POST_PROCESS,
  tag: 0
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_postProcessMaterial", [_dec2, _index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "renderQueues", [_dec4, _index.serializable, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.PostProcessStage = PostProcessStage;
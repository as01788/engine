"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultPipeline = createDefaultPipeline;
Object.defineProperty(exports, "PipelineEventProcessor", {
  enumerable: true,
  get: function () {
    return _pipelineEvent.PipelineEventProcessor;
  }
});
Object.defineProperty(exports, "PipelineEventType", {
  enumerable: true,
  get: function () {
    return _pipelineEvent.PipelineEventType;
  }
});
exports.PostProcessStage = exports.BloomStage = exports.LightingStage = exports.GbufferStage = exports.MainFlow = exports.DeferredPipeline = exports.RenderQueueDesc = exports.ShadowStage = exports.ForwardStage = exports.ShadowFlow = exports.ForwardFlow = exports.ForwardPipeline = exports.PipelineStateManager = exports.InstancedBuffer = exports.RenderStage = exports.RenderFlow = exports.RenderPipeline = void 0;

var _passPhase = require("./pass-phase.js");

var _js = require("../utils/js.js");

var _deferredPipelineSceneData = require("./deferred/deferred-pipeline-scene-data.js");

var _globalExports = require("../global-exports.js");

var _asset = require("../assets/asset.js");

var _pipelineSceneData = require("./pipeline-scene-data.js");

var _pipelineEvent = require("./pipeline-event.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
nr.getPhaseID = _passPhase.getPhaseID;
const RenderPipeline = nr.RenderPipeline;
exports.RenderPipeline = RenderPipeline;
const RenderFlow = nr.RenderFlow;
exports.RenderFlow = RenderFlow;
const RenderStage = nr.RenderStage;
exports.RenderStage = RenderStage;
const InstancedBuffer = nr.InstancedBuffer;
exports.InstancedBuffer = InstancedBuffer;
const PipelineStateManager = nr.PipelineStateManager;
exports.PipelineStateManager = PipelineStateManager;
let instancedBufferProto = nr.InstancedBuffer;
let oldGetFunc = instancedBufferProto.get;
let getOrCreatePipelineState = nr.PipelineStateManager.getOrCreatePipelineState;

nr.PipelineStateManager.getOrCreatePipelineState = function (device, pass, shader, renderPass, ia) {
  return getOrCreatePipelineState.call(device, pass.native, shader, renderPass, ia);
};

function createDefaultPipeline() {
  const pipeline = new ForwardPipeline();
  pipeline.init();
  return pipeline;
} // ForwardPipeline


class ForwardPipeline extends nr.ForwardPipeline {
  constructor() {
    super();
    this.pipelineSceneData = new _pipelineSceneData.PipelineSceneData();
    this._tag = 0;
    this._flows = [];
    this.renderTextures = [];
    this.materials = [];
  }

  on(type, callback, target, once) {}

  once(type, callback, target) {}

  off(type, callback, target) {}

  emit(type, arg0, arg1, arg2, arg3, arg4) {}

  targetOff(typeOrTarget) {}

  removeAll(typeOrTarget) {}

  hasEventListener(type, callback, target) {
    return false;
  }

  init() {
    this.setPipelineSharedSceneData(this.pipelineSceneData.native);

    for (let i = 0; i < this._flows.length; i++) {
      this._flows[i].init(this);
    }

    const info = new nr.RenderPipelineInfo(this._tag, this._flows);
    this.initialize(info);
  }

  activate(swapchain) {
    return super.activate(swapchain) && this.pipelineSceneData.activate(_globalExports.legacyCC.director.root.device, this);
  }

  render(cameras) {
    let nativeObjs = [];

    for (let i = 0, len = cameras.length; i < len; ++i) {
      nativeObjs.push(cameras[i].native);
    }

    super.render(nativeObjs);
  }

  set profiler(value) {
    this.setProfiler(value && value.native);
  }

  destroy() {
    this.pipelineSceneData.destroy();
    super.destroy();
  }

}

exports.ForwardPipeline = ForwardPipeline;
(0, _js.addon)(ForwardPipeline.prototype, _asset.Asset.prototype);
const ForwardOnLoaded = ForwardPipeline.prototype.onLoaded; // hook to invoke init after deserialization

ForwardPipeline.prototype.onLoaded = function () {
  if (ForwardOnLoaded) ForwardOnLoaded.call(this);
  this.init();
};

class ForwardFlow extends nr.ForwardFlow {
  constructor() {
    super();
    this._name = 0;
    this._priority = 0;
    this._tag = 0;
    this._stages = [];
  }

  init(pipeline) {
    for (let i = 0; i < this._stages.length; i++) {
      this._stages[i].init(pipeline);
    }

    const info = new nr.RenderFlowInfo(this._name, this._priority, this._tag, this._stages);
    this.initialize(info);
  }

}

exports.ForwardFlow = ForwardFlow;

class ShadowFlow extends nr.ShadowFlow {
  constructor() {
    super();
    this._name = 0;
    this._priority = 0;
    this._tag = 0;
    this._stages = [];
  }

  init(pipeline) {
    for (let i = 0; i < this._stages.length; i++) {
      this._stages[i].init(pipeline);
    }

    const info = new nr.RenderFlowInfo(this._name, this._priority, this._tag, this._stages);
    this.initialize(info);
  }

}

exports.ShadowFlow = ShadowFlow;

class ForwardStage extends nr.ForwardStage {
  constructor() {
    super();
    this._name = 0;
    this._priority = 0;
    this._tag = 0;
    this.renderQueues = [];
  }

  init(pipeline) {
    const queues = [];

    for (let i = 0; i < this.renderQueues.length; i++) {
      queues.push(this.renderQueues[i].init());
    }

    const info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
    this.initialize(info);
  }

}

exports.ForwardStage = ForwardStage;

class ShadowStage extends nr.ShadowStage {
  constructor() {
    super();
    this._name = 0;
    this._priority = 0;
    this._tag = 0;
  }

  init(pipeline) {
    const info = new nr.RenderStageInfo(this._name, this._priority, this._tag, []);
    this.initialize(info);
  }

}

exports.ShadowStage = ShadowStage;

class RenderQueueDesc {
  constructor() {
    this.isTransparent = false;
    this.sortMode = 0;
    this.stages = [];
    this.isTransparent = false;
    this.sortMode = 0;
    this.stages = [];
  }

  init() {
    return new nr.RenderQueueDesc(this.isTransparent, this.sortMode, this.stages);
  }

}

exports.RenderQueueDesc = RenderQueueDesc;

class DeferredPipeline extends nr.DeferredPipeline {
  constructor() {
    super();
    this.pipelineSceneData = new _deferredPipelineSceneData.DeferredPipelineSceneData();
    this._tag = 0;
    this._flows = [];
    this.renderTextures = [];
    this.materials = [];
  }

  on(type, callback, target, once) {}

  once(type, callback, target) {}

  off(type, callback, target) {}

  emit(type, arg0, arg1, arg2, arg3, arg4) {}

  targetOff(typeOrTarget) {}

  removeAll(typeOrTarget) {}

  hasEventListener(type, callback, target) {
    return false;
  }

  init() {
    this.setPipelineSharedSceneData(this.pipelineSceneData.native);

    for (let i = 0; i < this._flows.length; i++) {
      this._flows[i].init(this);
    }

    let info = new nr.RenderPipelineInfo(this._tag, this._flows);
    this.initialize(info);
  }

  activate(swapchain) {
    return super.activate(swapchain) && this.pipelineSceneData.activate(_globalExports.legacyCC.director.root.device, this);
  }

  render(cameras) {
    let nativeObjs = [];

    for (let i = 0, len = cameras.length; i < len; ++i) {
      nativeObjs.push(cameras[i].native);
    }

    super.render(nativeObjs);
  }

  set profiler(value) {
    this.setProfiler(value && value.native);
  }

  destroy() {
    this.fog.destroy();
    this.ambient.destroy();
    this.skybox.destroy();
    this.shadows.destroy();
    this.pipelineSceneData.destroy();
    super.destroy();
  }

}

exports.DeferredPipeline = DeferredPipeline;
(0, _js.addon)(DeferredPipeline.prototype, _asset.Asset.prototype);
const DeferredOnLoaded = DeferredPipeline.prototype.onLoaded; // hook to invoke init after deserialization

DeferredPipeline.prototype.onLoaded = function () {
  if (DeferredOnLoaded) DeferredOnLoaded.call(this);
  this.init();
};

class MainFlow extends nr.MainFlow {
  constructor() {
    super();
    this._name = 0;
    this._priority = 0;
    this._tag = 0;
    this._stages = [];
  }

  init(pipeline) {
    for (let i = 0; i < this._stages.length; i++) {
      this._stages[i].init(pipeline);
    }

    let info = new nr.RenderFlowInfo(this._name, this._priority, this._tag, this._stages);
    this.initialize(info);
  }

}

exports.MainFlow = MainFlow;

class GbufferStage extends nr.GbufferStage {
  constructor() {
    super();
    this._name = 0;
    this._priority = 0;
    this._tag = 0;
    this.renderQueues = [];
  }

  init(pipeline) {
    const queues = [];

    for (let i = 0; i < this.renderQueues.length; i++) {
      queues.push(this.renderQueues[i].init());
    }

    let info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
    this.initialize(info);
  }

}

exports.GbufferStage = GbufferStage;

class LightingStage extends nr.LightingStage {
  constructor() {
    super();
    this._name = 0;
    this._priority = 0;
    this._tag = 0;
    this.renderQueues = [];
    this._deferredMaterial = null;
  }

  init(pipeline) {
    const queues = [];

    for (let i = 0; i < this.renderQueues.length; i++) {
      queues.push(this.renderQueues[i].init());
    }

    pipeline.pipelineSceneData.deferredLightingMaterial = this._deferredMaterial;
    let info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
    this.initialize(info);
  }

}

exports.LightingStage = LightingStage;

class BloomStage extends nr.BloomStage {
  constructor() {
    super();
    this._name = 0;
    this._priority = 0;
    this._tag = 0;
    this.renderQueues = [];
    this._bloomMaterial = null;
  }

  init(pipeline) {
    const queues = [];

    for (let i = 0; i < this.renderQueues.length; i++) {
      queues.push(this.renderQueues[i].init());
    }

    pipeline.pipelineSceneData.bloomMaterial = this._bloomMaterial;
    let info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
    this.initialize(info);
  }

}

exports.BloomStage = BloomStage;

class PostProcessStage extends nr.PostProcessStage {
  constructor() {
    super();
    this._name = 0;
    this._priority = 0;
    this._tag = 0;
    this.renderQueues = [];
    this._postProcessMaterial = null;
  }

  init(pipeline) {
    const queues = [];

    for (let i = 0; i < this.renderQueues.length; i++) {
      queues.push(this.renderQueues[i].init());
    }

    pipeline.pipelineSceneData.postprocessMaterial = this._postProcessMaterial;
    let info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
    this.initialize(info);
  }

}

exports.PostProcessStage = PostProcessStage;
(0, _js.setClassName)('DeferredPipeline', DeferredPipeline);
(0, _js.setClassName)('MainFlow', MainFlow);
(0, _js.setClassName)('GbufferStage', GbufferStage);
(0, _js.setClassName)('LightingStage', LightingStage);
(0, _js.setClassName)('BloomStage', BloomStage);
(0, _js.setClassName)('PostProcessStage', PostProcessStage);
(0, _js.setClassName)('ForwardPipeline', ForwardPipeline);
(0, _js.setClassName)('ForwardFlow', ForwardFlow);
(0, _js.setClassName)('ShadowFlow', ShadowFlow);
(0, _js.setClassName)('ForwardStage', ForwardStage);
(0, _js.setClassName)('ShadowStage', ShadowStage);
(0, _js.setClassName)('RenderQueueDesc', RenderQueueDesc);
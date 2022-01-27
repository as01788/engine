"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForwardPipeline = void 0;

var _index = require("../../data/decorators/index.js");

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _renderPipeline = require("../render-pipeline.js");

var _forwardFlow = require("./forward-flow.js");

var _pipelineSerialization = require("../pipeline-serialization.js");

var _shadowFlow = require("../shadow/shadow-flow.js");

var _define = require("../define.js");

var _index2 = require("../../builtin/index.js");

var _debug = require("../../platform/debug.js");

var _pipelineSceneData = require("../pipeline-scene-data.js");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const PIPELINE_TYPE = 0;
/**
 * @en The forward render pipeline
 * @zh 前向渲染管线。
 */

let ForwardPipeline = (_dec = (0, _index.ccclass)('ForwardPipeline'), _dec2 = (0, _index.type)([_pipelineSerialization.RenderTextureConfig]), _dec3 = (0, _index.displayOrder)(2), _dec(_class = (_class2 = (_temp = class ForwardPipeline extends _renderPipeline.RenderPipeline {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "renderTextures", _descriptor, this);

    this._postRenderPass = null;
  }

  get postRenderPass() {
    return this._postRenderPass;
  }

  initialize(info) {
    super.initialize(info);

    if (this._flows.length === 0) {
      const shadowFlow = new _shadowFlow.ShadowFlow();
      shadowFlow.initialize(_shadowFlow.ShadowFlow.initInfo);

      this._flows.push(shadowFlow);

      const forwardFlow = new _forwardFlow.ForwardFlow();
      forwardFlow.initialize(_forwardFlow.ForwardFlow.initInfo);

      this._flows.push(forwardFlow);
    }

    return true;
  }

  activate(swapchain) {
    if (_internal253Aconstants.EDITOR) {
      console.info('Forward render pipeline initialized.');
    }

    this._macros = {
      CC_PIPELINE_TYPE: PIPELINE_TYPE
    };
    this._pipelineSceneData = new _pipelineSceneData.PipelineSceneData();

    if (!super.activate(swapchain)) {
      return false;
    }

    if (!this._activeRenderer(swapchain)) {
      (0, _debug.errorID)(2402);
      return false;
    }

    return true;
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
    }
  }

  destroy() {
    this._destroyUBOs();

    this._destroyQuadInputAssembler();

    const rpIter = this._renderPasses.values();

    let rpRes = rpIter.next();

    while (!rpRes.done) {
      rpRes.value.destroy();
      rpRes = rpIter.next();
    }

    this._commandBuffers.length = 0;
    return super.destroy();
  }

  _activeRenderer(swapchain) {
    const device = this.device;

    this._commandBuffers.push(device.commandBuffer);

    const shadowMapSampler = this.globalDSManager.pointSampler;

    this._descriptorSet.bindSampler(_define.UNIFORM_SHADOWMAP_BINDING, shadowMapSampler);

    this._descriptorSet.bindTexture(_define.UNIFORM_SHADOWMAP_BINDING, _index2.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.bindSampler(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, shadowMapSampler);

    this._descriptorSet.bindTexture(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, _index2.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.update();

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

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "renderTextures", [_dec2, _index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.ForwardPipeline = ForwardPipeline;
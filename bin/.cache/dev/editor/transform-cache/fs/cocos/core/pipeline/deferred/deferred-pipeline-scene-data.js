"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeferredPipelineSceneData = exports.BLOOM_COMBINEPASS_INDEX = exports.BLOOM_UPSAMPLEPASS_INDEX = exports.BLOOM_DOWNSAMPLEPASS_INDEX = exports.BLOOM_PREFILTERPASS_INDEX = exports.AntiAliasing = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _renderPipeline = require("../render-pipeline.js");

var _index = require("../../assets/index.js");

var _pipelineSceneData = require("../pipeline-scene-data.js");

var _macro = require("../../platform/macro.js");

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
// Anti-aliasing type, other types will be gradually added in the future
let AntiAliasing;
exports.AntiAliasing = AntiAliasing;

(function (AntiAliasing) {
  AntiAliasing[AntiAliasing["NONE"] = 0] = "NONE";
  AntiAliasing[AntiAliasing["FXAA"] = 1] = "FXAA";
})(AntiAliasing || (exports.AntiAliasing = AntiAliasing = {}));

const BLOOM_PREFILTERPASS_INDEX = 0;
exports.BLOOM_PREFILTERPASS_INDEX = BLOOM_PREFILTERPASS_INDEX;
const BLOOM_DOWNSAMPLEPASS_INDEX = 1;
exports.BLOOM_DOWNSAMPLEPASS_INDEX = BLOOM_DOWNSAMPLEPASS_INDEX;
const BLOOM_UPSAMPLEPASS_INDEX = BLOOM_DOWNSAMPLEPASS_INDEX + _renderPipeline.MAX_BLOOM_FILTER_PASS_NUM;
exports.BLOOM_UPSAMPLEPASS_INDEX = BLOOM_UPSAMPLEPASS_INDEX;
const BLOOM_COMBINEPASS_INDEX = BLOOM_UPSAMPLEPASS_INDEX + _renderPipeline.MAX_BLOOM_FILTER_PASS_NUM;
exports.BLOOM_COMBINEPASS_INDEX = BLOOM_COMBINEPASS_INDEX;

class DeferredPipelineSceneData extends _pipelineSceneData.PipelineSceneData {
  constructor(...args) {
    super(...args);
    this._antiAliasing = AntiAliasing.NONE;
  }

  set antiAliasing(value) {
    this._antiAliasing = value;

    if (this._postprocessMaterial) {
      const defines = this._postprocessMaterial.passes[0].defines;
      Object.assign(defines, {
        ANTIALIAS_TYPE: value
      });
      const renderMat = new _index.Material();
      renderMat.initialize({
        effectAsset: this._postprocessMaterial.effectAsset,
        defines
      });

      for (let i = 0; i < renderMat.passes.length; ++i) {
        renderMat.passes[i].tryCompile();
      }

      this._postprocessMaterial = renderMat;
    }
  }

  get antiAliasing() {
    return this._antiAliasing;
  }

  get bloomMaterial() {
    return this._bloomMaterial;
  }

  set bloomMaterial(mat) {
    if (this._bloomMaterial === mat || !mat) return;
    this._bloomMaterial = mat;
    this.updatePipelinePassInfo();
  }

  get postprocessMaterial() {
    return this._postprocessMaterial;
  }

  set postprocessMaterial(mat) {
    if (this._postprocessMaterial === mat || !mat) return;
    this._postprocessMaterial = mat;
    this.updatePipelinePassInfo();
  }

  onGlobalPipelineStateChanged() {
    this.updatePipelinePassInfo();
  }

  updateBloomPass() {
    if (!this._bloomMaterial) return;
    const prefilterPass = this._bloomMaterial.passes[BLOOM_PREFILTERPASS_INDEX];
    prefilterPass.beginChangeStatesSilently();
    prefilterPass.tryCompile();
    prefilterPass.endChangeStatesSilently();
    const downsamplePasses = [];
    const upsamplePasses = [];

    for (let i = 0; i < _renderPipeline.MAX_BLOOM_FILTER_PASS_NUM; ++i) {
      const downsamplePass = this._bloomMaterial.passes[BLOOM_DOWNSAMPLEPASS_INDEX + i];
      downsamplePass.beginChangeStatesSilently();
      downsamplePass.tryCompile();
      downsamplePass.endChangeStatesSilently();
      const upsamplePass = this._bloomMaterial.passes[BLOOM_UPSAMPLEPASS_INDEX + i];
      upsamplePass.beginChangeStatesSilently();
      upsamplePass.tryCompile();
      upsamplePass.endChangeStatesSilently();
      downsamplePasses.push(downsamplePass.native);
      upsamplePasses.push(upsamplePass.native);
    }

    const combinePass = this._bloomMaterial.passes[BLOOM_COMBINEPASS_INDEX];
    combinePass.beginChangeStatesSilently();
    combinePass.tryCompile();
    combinePass.endChangeStatesSilently();

    if (_internal253Aconstants.JSB) {
      this._nativeObj.bloomPrefilterPassShader = prefilterPass.getShaderVariant();
      this._nativeObj.bloomPrefilterPass = prefilterPass.native;
      this._nativeObj.bloomDownsamplePassShader = this._bloomMaterial.passes[BLOOM_DOWNSAMPLEPASS_INDEX].getShaderVariant();
      this._nativeObj.bloomDownsamplePass = downsamplePasses;
      this._nativeObj.bloomUpsamplePassShader = this._bloomMaterial.passes[BLOOM_UPSAMPLEPASS_INDEX].getShaderVariant();
      this._nativeObj.bloomUpsamplePass = upsamplePasses;
      this._nativeObj.bloomCombinePassShader = combinePass.getShaderVariant();
      this._nativeObj.bloomCombinePass = combinePass.native;
    }
  }

  updatePostProcessPass() {
    if (!this.postprocessMaterial) return;
    const passPost = this.postprocessMaterial.passes[0];
    passPost.beginChangeStatesSilently();
    passPost.tryCompile();
    passPost.endChangeStatesSilently();

    if (_internal253Aconstants.JSB) {
      this._nativeObj.pipelinePostPassShader = passPost.getShaderVariant();
      this._nativeObj.pipelinePostPass = passPost.native;
    }
  }

  initPipelinePassInfo() {
    // builtin deferred material
    const deferredMat = new _index.Material();
    deferredMat._uuid = 'builtin-deferred-material';
    deferredMat.initialize({
      effectName: 'deferred-lighting'
    });

    for (let i = 0; i < deferredMat.passes.length; ++i) {
      deferredMat.passes[i].tryCompile();
    }

    this._deferredLightingMaterial = deferredMat;
    const bloomMat = new _index.Material();
    bloomMat._uuid = 'builtin-bloom-material';
    bloomMat.initialize({
      effectName: 'bloom'
    });

    for (let i = 0; i < bloomMat.passes.length; ++i) {
      bloomMat.passes[i].tryCompile();
    }

    this._bloomMaterial = bloomMat;
    const postMat = new _index.Material();
    postMat._uuid = 'builtin-post-process-material';

    if (_macro.macro.ENABLE_ANTIALIAS_FXAA) {
      this._antiAliasing = AntiAliasing.FXAA;
    }

    postMat.initialize({
      effectName: 'post-process',
      defines: {
        // Anti-aliasing type, currently only fxaa, so 1 means fxaa
        ANTIALIAS_TYPE: this._antiAliasing
      }
    });

    for (let i = 0; i < postMat.passes.length; ++i) {
      postMat.passes[i].tryCompile();
    }

    this._postprocessMaterial = postMat;
    this.updatePipelinePassInfo();
  }

  get deferredLightingMaterial() {
    return this._deferredLightingMaterial;
  }

  set deferredLightingMaterial(mat) {
    if (this._deferredLightingMaterial === mat || !mat) return;
    this._deferredLightingMaterial = mat;
    this.updatePipelinePassInfo();
  }

  updatePipelinePassInfo() {
    this.updateBloomPass();
    this.updatePostProcessPass();
    this.updateDeferredPassInfo();
  }

  activate(device, pipeline) {
    super.activate(device, pipeline);
    this.initPipelinePassInfo();
    return true;
  }

  updateDeferredPassInfo() {
    this.updateDeferredLightPass();
  }

  updateDeferredLightPass() {
    if (!this._deferredLightingMaterial) return; // It's temporary solution for main light shadowmap

    if (this.shadows.enabled) {
      this._pipeline.macros.CC_RECEIVE_SHADOW = 1;
    }

    const passLit = this._deferredLightingMaterial.passes[0];
    passLit.beginChangeStatesSilently();
    passLit.tryCompile();
    passLit.endChangeStatesSilently();

    if (_internal253Aconstants.JSB) {
      this._nativeObj.deferredLightPassShader = passLit.getShaderVariant();
      this._nativeObj.deferredLightPass = passLit.native;
    }
  }

}

exports.DeferredPipelineSceneData = DeferredPipelineSceneData;
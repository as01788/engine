"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubModel = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _define = require("../../pipeline/define.js");

var _pass2 = require("../core/pass.js");

var _index = require("../../gfx/index.js");

var _globalExports = require("../../global-exports.js");

var _debug = require("../../platform/debug.js");

var _nativeScene = require("./native-scene.js");

var _passPhase = require("../../pipeline/pass-phase.js");

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
const _dsInfo = new _index.DescriptorSetInfo(null);

const MAX_PASS_COUNT = 8;

class SubModel {
  constructor() {
    this._device = null;
    this._passes = null;
    this._shaders = null;
    this._subMesh = null;
    this._patches = null;
    this._priority = _define.RenderPriority.DEFAULT;
    this._inputAssembler = null;
    this._descriptorSet = null;
    this._worldBoundDescriptorSet = null;
    this._planarInstanceShader = null;
    this._planarShader = null;
    this._reflectionTex = null;
    this._reflectionSampler = null;
  }

  _destroyDescriptorSet() {
    this._descriptorSet.destroy();

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setDescriptorSet(null);
    }

    this._descriptorSet = null;
  }

  _destroyWorldBoundDescriptorSet() {
    this._worldBoundDescriptorSet.destroy();

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setWorldBoundDescriptorSet(null);
    }

    this._worldBoundDescriptorSet = null;
  }

  _destroyInputAssembler() {
    this._inputAssembler.destroy();

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setInputAssembler(null);
    }

    this._inputAssembler = null;
  }

  _createDescriptorSet(descInfo) {
    this._descriptorSet = this._device.createDescriptorSet(descInfo);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setDescriptorSet(this._descriptorSet);
    }
  }

  _createWorldBoundDescriptorSet(descInfo) {
    this._worldBoundDescriptorSet = this._device.createDescriptorSet(descInfo);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setWorldBoundDescriptorSet(this._worldBoundDescriptorSet);
    }
  }

  set passes(passes) {
    const passLengh = passes.length;

    if (passLengh > MAX_PASS_COUNT) {
      (0, _debug.errorID)(12004, MAX_PASS_COUNT);
      return;
    }

    this._passes = passes;

    this._flushPassInfo();

    if (this._passes[0].batchingScheme === _pass2.BatchingSchemes.VB_MERGING) {
      this.subMesh.genFlatBuffers();

      this._setSubMesh(this.subMesh);
    } // DS layout might change too


    if (this._descriptorSet) {
      this._destroyDescriptorSet();

      _dsInfo.layout = passes[0].localSetLayout;

      this._createDescriptorSet(_dsInfo);
    }
  }

  get passes() {
    return this._passes;
  }

  get shaders() {
    return this._shaders;
  }

  set subMesh(subMesh) {
    this._inputAssembler.destroy();

    this._inputAssembler.initialize(subMesh.iaInfo);

    if (this._passes[0].batchingScheme === _pass2.BatchingSchemes.VB_MERGING) {
      this.subMesh.genFlatBuffers();
    }

    this._setSubMesh(subMesh);
  }

  get subMesh() {
    return this._subMesh;
  }

  set priority(val) {
    this._priority = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setPriority(val);
    }
  }

  get priority() {
    return this._priority;
  }

  get inputAssembler() {
    return this._inputAssembler;
  }

  get descriptorSet() {
    return this._descriptorSet;
  }

  get worldBoundDescriptorSet() {
    return this._worldBoundDescriptorSet;
  }

  get patches() {
    return this._patches;
  }

  get planarInstanceShader() {
    return this._planarInstanceShader;
  }

  get planarShader() {
    return this._planarShader;
  }

  _setInputAssembler(iaInfo) {
    this._inputAssembler = this._device.createInputAssembler(iaInfo);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setInputAssembler(this._inputAssembler);
    }
  }

  _setSubMesh(subMesh) {
    this._subMesh = subMesh;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setSubMeshBuffers(subMesh.flatBuffers);
    }
  }

  get native() {
    return this._nativeObj;
  }

  _init() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = new _nativeScene.NativeSubModel();
    }
  }

  initialize(subMesh, passes, patches = null) {
    const root = _globalExports.legacyCC.director.root;
    this._device = root.device;
    _dsInfo.layout = passes[0].localSetLayout;

    this._init();

    this._setInputAssembler(subMesh.iaInfo);

    this._createDescriptorSet(_dsInfo);

    const pipeline = _globalExports.legacyCC.director.root.pipeline;
    const occlusionPass = pipeline.pipelineSceneData.getOcclusionQueryPass();
    const occlusionDSInfo = new _index.DescriptorSetInfo(null);
    occlusionDSInfo.layout = occlusionPass.localSetLayout;

    this._createWorldBoundDescriptorSet(occlusionDSInfo);

    this._setSubMesh(subMesh);

    this._patches = patches;
    this._passes = passes;

    this._flushPassInfo();

    if (passes[0].batchingScheme === _pass2.BatchingSchemes.VB_MERGING) {
      this.subMesh.genFlatBuffers();

      this._setSubMesh(this.subMesh);
    }

    this.priority = _define.RenderPriority.DEFAULT; // initialize resources for reflection material

    if (passes[0].phase === (0, _passPhase.getPhaseID)('reflection')) {
      let texWidth = root.mainWindow.width;
      let texHeight = root.mainWindow.height;
      const minSize = 512;

      if (texHeight < texWidth) {
        texWidth = minSize * texWidth / texHeight;
        texHeight = minSize;
      } else {
        texWidth = minSize;
        texHeight = minSize * texHeight / texWidth;
      }

      this._reflectionTex = this._device.createTexture(new _index.TextureInfo(_index.TextureType.TEX2D, _index.TextureUsageBit.STORAGE | _index.TextureUsageBit.TRANSFER_SRC | _index.TextureUsageBit.SAMPLED, _index.Format.RGBA8, texWidth, texHeight));
      this.descriptorSet.bindTexture(_define.UNIFORM_REFLECTION_TEXTURE_BINDING, this._reflectionTex);
      this._reflectionSampler = this._device.getSampler(new _index.SamplerInfo(_index.Filter.LINEAR, _index.Filter.LINEAR, _index.Filter.NONE, _index.Address.CLAMP, _index.Address.CLAMP, _index.Address.CLAMP));
      this.descriptorSet.bindSampler(_define.UNIFORM_REFLECTION_TEXTURE_BINDING, this._reflectionSampler);
      this.descriptorSet.bindTexture(_define.UNIFORM_REFLECTION_STORAGE_BINDING, this._reflectionTex);
    }
  }

  _initNativePlanarShadowShader(shadowInfo) {
    this._planarShader = shadowInfo.getPlanarShader(this._patches);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setPlanarShader(this._planarShader);
    }
  } // This is a temporary solution
  // It should not be written in a fixed way, or modified by the user


  initPlanarShadowShader() {
    const pipeline = _globalExports.legacyCC.director.root.pipeline;
    const shadowInfo = pipeline.pipelineSceneData.shadows;

    this._initNativePlanarShadowShader(shadowInfo);
  }

  _initNativePlanarShadowInstanceShader(shadowInfo) {
    this._planarInstanceShader = shadowInfo.getPlanarInstanceShader(this._patches);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setPlanarInstanceShader(this._planarInstanceShader);
    }
  } // This is a temporary solution
  // It should not be written in a fixed way, or modified by the user


  initPlanarShadowInstanceShader() {
    const pipeline = _globalExports.legacyCC.director.root.pipeline;
    const shadowInfo = pipeline.pipelineSceneData.shadows;

    this._initNativePlanarShadowInstanceShader(shadowInfo);
  }

  _destroy() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = null;
    }
  }

  destroy() {
    this._destroyDescriptorSet();

    this._destroyWorldBoundDescriptorSet();

    this._destroyInputAssembler();

    this.priority = _define.RenderPriority.DEFAULT;
    this._patches = null;
    this._subMesh = null;
    this._passes = null;
    this._shaders = null;
    if (this._reflectionTex) this._reflectionTex.destroy();
    this._reflectionTex = null;
    this._reflectionSampler = null;

    this._destroy();
  }

  update() {
    for (let i = 0; i < this._passes.length; ++i) {
      const pass = this._passes[i];
      pass.update();
    }

    this._descriptorSet.update();

    this._worldBoundDescriptorSet.update();
  }

  onPipelineStateChanged() {
    const passes = this._passes;

    if (!passes) {
      return;
    }

    for (let i = 0; i < passes.length; i++) {
      const pass = passes[i];
      pass.beginChangeStatesSilently();
      pass.tryCompile(); // force update shaders

      pass.endChangeStatesSilently();
    }

    this._flushPassInfo();
  }

  onMacroPatchesStateChanged(patches) {
    this._patches = patches;
    const passes = this._passes;

    if (!passes) {
      return;
    }

    for (let i = 0; i < passes.length; i++) {
      const pass = passes[i];
      pass.beginChangeStatesSilently();
      pass.tryCompile(); // force update shaders

      pass.endChangeStatesSilently();
    }

    this._flushPassInfo();
  }

  _flushPassInfo() {
    const passes = this._passes;

    if (!passes) {
      return;
    }

    if (!this._shaders) {
      this._shaders = [];
    }

    this._shaders.length = passes.length;

    for (let i = 0, len = passes.length; i < len; i++) {
      this._shaders[i] = passes[i].getShaderVariant(this.patches);
    }

    if (_internal253Aconstants.JSB) {
      const passesNative = passes.map(_pass => _pass.native);

      this._nativeObj.setPasses(passesNative);

      this._nativeObj.setShaders(this._shaders);
    }
  }

}

exports.SubModel = SubModel;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawBatch2D = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _layers = require("../../core/scene-graph/layers.js");

var _globalExports = require("../../core/global-exports.js");

var _pass = require("../../core/renderer/core/pass.js");

var _index = require("../../core/renderer/scene/index.js");

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

/**
 * @packageDocumentation
 * @hidden
 */
const UI_VIS_FLAG = _layers.Layers.Enum.NONE | _layers.Layers.Enum.UI_3D;

class DrawBatch2D {
  get native() {
    return this._nativeObj;
  }

  get inputAssembler() {
    return this._inputAssember;
  }

  set inputAssembler(ia) {
    this._inputAssember = ia;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.inputAssembler = ia;
    }
  }

  get descriptorSet() {
    return this._descriptorSet;
  }

  set descriptorSet(ds) {
    this._descriptorSet = ds;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.descriptorSet = ds;
    }
  }

  get visFlags() {
    return this._visFlags;
  }

  set visFlags(vis) {
    this._visFlags = vis;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.visFlags = vis;
    }
  }

  get passes() {
    return this._passes;
  }

  get shaders() {
    return this._shaders;
  }

  constructor() {
    this.bufferBatch = null;
    this.camera = null;
    this.renderScene = null;
    this.model = null;
    this.texture = null;
    this.sampler = null;
    this.useLocalData = null;
    this.isStatic = false;
    this.textureHash = 0;
    this.samplerHash = 0;
    this._passes = [];
    this._shaders = [];
    this._visFlags = UI_VIS_FLAG;
    this._inputAssember = null;
    this._descriptorSet = null;

    if (_internal253Aconstants.JSB) {
      this._nativeObj = new _index.NativeDrawBatch2D();
      this._nativeObj.visFlags = this._visFlags;
    }
  }

  destroy(ui) {
    this._passes = [];

    if (_internal253Aconstants.JSB) {
      this._nativeObj = null;
    }
  }

  clear() {
    this.bufferBatch = null;
    this.inputAssembler = null;
    this.descriptorSet = null;
    this.camera = null;
    this.texture = null;
    this.sampler = null;
    this.model = null;
    this.isStatic = false;
    this.useLocalData = null;
    this.visFlags = UI_VIS_FLAG;
    this.renderScene = null;
  } // object version


  fillPasses(mat, dss, dssHash, bs, bsHash, patches, batcher) {
    if (mat) {
      const passes = mat.passes;

      if (!passes) {
        return;
      }

      let hashFactor = 0;
      let dirty = false;
      this._shaders.length = passes.length;

      for (let i = 0; i < passes.length; i++) {
        if (!this._passes[i]) {
          this._passes[i] = new _pass.Pass(_globalExports.legacyCC.director.root);
        }

        const mtlPass = passes[i];
        const passInUse = this._passes[i];
        mtlPass.update(); // Hack: Cause pass.hash can not check all pass value

        if (!dss) {
          dss = mtlPass.depthStencilState;
          dssHash = 0;
        }

        if (!bs) {
          bs = mtlPass.blendState;
          bsHash = 0;
        }

        if (bsHash === -1) {
          bsHash = 0;
        }

        hashFactor = dssHash << 16 | bsHash; // @ts-expect-error hack for UI use pass object

        passInUse._initPassFromTarget(mtlPass, dss, bs, hashFactor);

        this._shaders[i] = passInUse.getShaderVariant(patches);
        dirty = true;
      }

      if (_internal253Aconstants.JSB) {
        if (dirty) {
          const nativePasses = [];
          const passes = this._passes;

          for (let i = 0; i < passes.length; i++) {
            nativePasses.push(passes[i].native);
          }

          this._nativeObj.passes = nativePasses;
          this._nativeObj.shaders = this._shaders;
        }
      }
    }
  }

}

exports.DrawBatch2D = DrawBatch2D;
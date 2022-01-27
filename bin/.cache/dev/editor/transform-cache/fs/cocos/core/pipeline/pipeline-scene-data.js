"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PipelineSceneData = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _fog = require("../renderer/scene/fog.js");

var _ambient = require("../renderer/scene/ambient.js");

var _skybox = require("../renderer/scene/skybox.js");

var _shadows = require("../renderer/scene/shadows.js");

var _octree = require("../renderer/scene/octree.js");

var _index = require("../gfx/index.js");

var _index2 = require("../assets/index.js");

var _index3 = require("../renderer/scene/index.js");

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
class PipelineSceneData {
  _init() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = new _index3.NativePipelineSharedSceneData();
      this._nativeObj.fog = this.fog.native;
      this._nativeObj.ambient = this.ambient.native;
      this._nativeObj.skybox = this.skybox.native;
      this._nativeObj.shadow = this.shadows.native;
      this._nativeObj.octree = this.octree.native;
    }
  }

  get native() {
    return this._nativeObj;
  }
  /**
    * @en Is open HDR.
    * @zh 是否开启 HDR。
    * @readonly
    */


  get isHDR() {
    return this._isHDR;
  }

  set isHDR(val) {
    this._isHDR = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.isHDR = val;
    }
  }

  get shadingScale() {
    return this._shadingScale;
  }

  set shadingScale(val) {
    if (this._shadingScale !== val) {
      this._shadingScale = val;

      if (_internal253Aconstants.JSB) {
        this._nativeObj.shadingScale = val;
      }

      this._pipeline.emit(_pipelineEvent.PipelineEventType.ATTACHMENT_SCALE_CAHNGED, val);
    }
  }

  constructor() {
    this.fog = new _fog.Fog();
    this.ambient = new _ambient.Ambient();
    this.skybox = new _skybox.Skybox();
    this.shadows = new _shadows.Shadows();
    this.octree = new _octree.Octree();
    this.validPunctualLights = [];
    this.renderObjects = [];
    this.castShadowObjects = [];
    this.dirShadowObjects = [];
    this.shadowFrameBufferMap = new Map();
    this._occlusionQueryVertexBuffer = null;
    this._occlusionQueryIndicesBuffer = null;
    this._occlusionQueryInputAssembler = null;
    this._occlusionQueryMaterial = null;
    this._occlusionQueryShader = null;
    this._isHDR = true;
    this._shadingScale = 1.0;

    this._init();

    this.shadingScale = 1.0;
  }

  activate(device, pipeline) {
    this._device = device;
    this._pipeline = pipeline;
    this.initOcclusionQuery();
    return true;
  }

  initOcclusionQuery() {
    if (!this._occlusionQueryInputAssembler) {
      this._occlusionQueryInputAssembler = this._createOcclusionQueryIA();

      if (_internal253Aconstants.JSB) {
        this._nativeObj.occlusionQueryInputAssembler = this._occlusionQueryInputAssembler;
      }
    }

    if (!this._occlusionQueryMaterial) {
      const mat = new _index2.Material();
      mat._uuid = 'default-occlusion-query-material';
      mat.initialize({
        effectName: 'occlusion-query'
      });
      this._occlusionQueryMaterial = mat;
      this._occlusionQueryShader = mat.passes[0].getShaderVariant();

      if (_internal253Aconstants.JSB) {
        this._nativeObj.occlusionQueryPass = this._occlusionQueryMaterial.passes[0].native;
        this._nativeObj.occlusionQueryShader = this._occlusionQueryShader;
      }
    }
  }

  getOcclusionQueryPass() {
    return this._occlusionQueryMaterial.passes[0];
  }

  onGlobalPipelineStateChanged() {}

  destroy() {
    var _this$_occlusionQuery, _this$_occlusionQuery2, _this$_occlusionQuery3;

    this.ambient.destroy();
    this.skybox.destroy();
    this.fog.destroy();
    this.shadows.destroy();
    this.octree.destroy();
    this.validPunctualLights.length = 0;
    (_this$_occlusionQuery = this._occlusionQueryInputAssembler) === null || _this$_occlusionQuery === void 0 ? void 0 : _this$_occlusionQuery.destroy();
    this._occlusionQueryInputAssembler = null;
    (_this$_occlusionQuery2 = this._occlusionQueryVertexBuffer) === null || _this$_occlusionQuery2 === void 0 ? void 0 : _this$_occlusionQuery2.destroy();
    this._occlusionQueryVertexBuffer = null;
    (_this$_occlusionQuery3 = this._occlusionQueryIndicesBuffer) === null || _this$_occlusionQuery3 === void 0 ? void 0 : _this$_occlusionQuery3.destroy();
    this._occlusionQueryIndicesBuffer = null;

    if (_internal253Aconstants.JSB) {
      this._nativeObj = null;
    }
  }

  _createOcclusionQueryIA() {
    // create vertex buffer
    const device = this._device;
    const vertices = new Float32Array([-1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1]);
    const vbStride = Float32Array.BYTES_PER_ELEMENT * 3;
    const vbSize = vbStride * 8;
    this._occlusionQueryVertexBuffer = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.VERTEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.DEVICE, vbSize, vbStride));

    this._occlusionQueryVertexBuffer.update(vertices); // create index buffer


    const indices = new Uint16Array([0, 2, 1, 1, 2, 3, 4, 5, 6, 5, 7, 6, 1, 3, 7, 1, 7, 5, 0, 4, 6, 0, 6, 2, 0, 1, 5, 0, 5, 4, 2, 6, 7, 2, 7, 3]);
    const ibStride = Uint16Array.BYTES_PER_ELEMENT;
    const ibSize = ibStride * 36;
    this._occlusionQueryIndicesBuffer = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.INDEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.DEVICE, ibSize, ibStride));

    this._occlusionQueryIndicesBuffer.update(indices);

    const attributes = [new _index.Attribute('a_position', _index.Format.RGB32F)]; // create cube input assembler

    const info = new _index.InputAssemblerInfo(attributes, [this._occlusionQueryVertexBuffer], this._occlusionQueryIndicesBuffer);
    const inputAssembler = device.createInputAssembler(info);
    return inputAssembler;
  }

}

exports.PipelineSceneData = PipelineSceneData;
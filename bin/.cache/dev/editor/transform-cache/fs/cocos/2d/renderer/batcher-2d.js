"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Batcher2D = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _material = require("../../core/assets/material.js");

var _index = require("../../core/gfx/index.js");

var _index2 = require("../../core/memop/index.js");

var _cachedArray = require("../../core/memop/cached-array.js");

var _meshBuffer = require("./mesh-buffer.js");

var _stencilManager = require("./stencil-manager.js");

var _drawBatch = require("./draw-batch.js");

var VertexFormat = _interopRequireWildcard(require("./vertex-format.js"));

var _globalExports = require("../../core/global-exports.js");

var _define = require("../../core/pipeline/define.js");

var _sys = require("../../core/platform/sys.js");

var _index3 = require("../../core/math/index.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.

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
const _dsInfo = new _index.DescriptorSetInfo(null);

const m4_1 = new _index3.Mat4();
/**
 * @zh
 * UI 渲染流程
 */

class Batcher2D {
  get currBufferBatch() {
    if (this._currMeshBuffer) return this._currMeshBuffer; // create if not set

    this._currMeshBuffer = this.acquireBufferBatch();
    return this._currMeshBuffer;
  }

  set currBufferBatch(buffer) {
    if (buffer) {
      this._currMeshBuffer = buffer;
    }
  }

  get batches() {
    return this._batches;
  }
  /**
   * Acquire a new mesh buffer if the vertex layout differs from the current one.
   * @param attributes
   */


  acquireBufferBatch(attributes = VertexFormat.vfmtPosUvColor) {
    const strideBytes = attributes === VertexFormat.vfmtPosUvColor ? 36
    /* 9x4 */
    : VertexFormat.getAttributeStride(attributes);

    if (!this._currMeshBuffer || this._currMeshBuffer.vertexFormatBytes !== strideBytes) {
      this._requireBufferBatch(attributes);

      return this._currMeshBuffer;
    }

    return this._currMeshBuffer;
  }

  registerCustomBuffer(attributes, callback) {
    let batch;

    if (attributes instanceof _meshBuffer.MeshBuffer) {
      batch = attributes;
    } else {
      batch = this._bufferBatchPool.add();
      batch.initialize(attributes, callback || this._recreateMeshBuffer.bind(this, attributes));
    }

    const strideBytes = batch.vertexFormatBytes;

    let buffers = this._customMeshBuffers.get(strideBytes);

    if (!buffers) {
      buffers = [];

      this._customMeshBuffers.set(strideBytes, buffers);
    }

    buffers.push(batch);
    return batch;
  }

  unRegisterCustomBuffer(buffer) {
    const buffers = this._customMeshBuffers.get(buffer.vertexFormatBytes);

    if (buffers) {
      for (let i = 0; i < buffers.length; i++) {
        if (buffers[i] === buffer) {
          buffers.splice(i, 1);
          break;
        }
      }
    } // release the buffer to recycle pool --


    const idx = this._bufferBatchPool.data.indexOf(buffer);

    if (idx !== -1) {
      buffer.reset();

      this._bufferBatchPool.removeAt(idx);
    } // ---

  }

  set currStaticRoot(value) {
    this._currStaticRoot = value;
  }

  set currIsStatic(value) {
    this._currIsStatic = value;
  }

  constructor(_root) {
    this.device = void 0;
    this._screens = [];
    this._bufferBatchPool = new _index2.RecyclePool(() => new _meshBuffer.MeshBuffer(this), 128, obj => obj.destroy());
    this._drawBatchPool = void 0;
    this._meshBuffers = new Map();
    this._customMeshBuffers = new Map();
    this._meshBufferUseCount = new Map();
    this._batches = void 0;
    this._emptyMaterial = new _material.Material();
    this._currScene = null;
    this._currMaterial = this._emptyMaterial;
    this._currTexture = null;
    this._currSampler = null;
    this._currMeshBuffer = null;
    this._currStaticRoot = null;
    this._currComponent = null;
    this._currTransform = null;
    this._currTextureHash = 0;
    this._currSamplerHash = 0;
    this._currBlendTargetHash = 0;
    this._currLayer = 0;
    this._currDepthStencilStateStage = null;
    this._currIsStatic = false;
    this._currHash = 0;
    this._descriptorSetCache = new DescriptorSetCache();
    this._root = _root;
    this.device = _root.device;
    this._batches = new _cachedArray.CachedArray(64);
    this._drawBatchPool = new _index2.Pool(() => new _drawBatch.DrawBatch2D(), 128, obj => obj.destroy(this));
  }

  initialize() {
    return true;
  }

  destroy() {
    for (let i = 0; i < this._batches.length; i++) {
      if (this._batches.array[i]) {
        this._batches.array[i].destroy(this);
      }
    }

    this._batches.destroy();

    for (const size of this._meshBuffers.keys()) {
      const buffers = this._meshBuffers.get(size);

      if (buffers) {
        buffers.forEach(buffer => buffer.destroy());
      }
    }

    if (this._drawBatchPool) {
      this._drawBatchPool.destroy();
    }

    this._descriptorSetCache.destroy();

    this._meshBuffers.clear();

    _stencilManager.StencilManager.sharedManager.destroy();
  }
  /**
   * @en
   * Add the managed Canvas.
   *
   * @zh
   * 添加屏幕组件管理。
   *
   * @param comp - 屏幕组件。
   */


  addScreen(comp) {
    this._screens.push(comp);

    this._screens.sort(this._screenSort);
  }

  getFirstRenderCamera(node) {
    if (node.scene && node.scene.renderScene) {
      const cameras = node.scene.renderScene.cameras;

      for (let i = 0; i < cameras.length; i++) {
        const camera = cameras[i];

        if (camera.visibility & node.layer) {
          return camera;
        }
      }
    }

    return null;
  }
  /**
   * @zh
   * Removes the Canvas from the list.
   *
   * @param comp - 被移除的屏幕。
   */


  removeScreen(comp) {
    const idx = this._screens.indexOf(comp);

    if (idx === -1) {
      return;
    }

    this._screens.splice(idx, 1);
  }

  sortScreens() {
    this._screens.sort(this._screenSort);
  }

  update() {
    const screens = this._screens;

    for (let i = 0; i < screens.length; ++i) {
      const screen = screens[i];

      if (!screen.enabledInHierarchy) {
        continue;
      }

      this._recursiveScreenNode(screen.node);
    }

    let batchPriority = 0;

    if (this._batches.length) {
      for (let i = 0; i < this._batches.length; ++i) {
        const batch = this._batches.array[i];
        if (!batch.renderScene) continue;

        if (batch.model) {
          const subModels = batch.model.subModels;

          for (let j = 0; j < subModels.length; j++) {
            subModels[j].priority = batchPriority++;
          }
        } else {
          batch.descriptorSet = this._descriptorSetCache.getDescriptorSet(batch);
        }

        batch.renderScene.addBatch(batch);
      }
    }
  }

  uploadBuffers() {
    if (this._batches.length > 0) {
      const buffers = this._meshBuffers;
      buffers.forEach((value, key) => {
        value.forEach(bb => {
          bb.uploadBuffers();
          bb.reset();
        });
      });
      const customs = this._customMeshBuffers;
      customs.forEach((value, key) => {
        value.forEach(bb => {
          bb.uploadBuffers();
          bb.reset();
        });
      });

      this._descriptorSetCache.update();
    }
  }

  reset() {
    for (let i = 0; i < this._batches.length; ++i) {
      const batch = this._batches.array[i];

      if (batch.isStatic) {
        continue;
      }

      batch.clear();

      this._drawBatchPool.free(batch);
    }

    this._currHash = 0;
    this._currLayer = 0;
    this._currMaterial = this._emptyMaterial;
    this._currTexture = null;
    this._currSampler = null;
    this._currComponent = null;
    this._currTransform = null;
    this._currScene = null;
    this._currMeshBuffer = null;

    this._meshBufferUseCount.clear();

    this._batches.clear();

    _stencilManager.StencilManager.sharedManager.reset();

    this._descriptorSetCache.reset();
  }
  /**
   * @en
   * Render component data submission process of UI.
   * The submitted vertex data is the UI for world coordinates.
   * For example: The UI components except Graphics and UIModel.
   *
   * @zh
   * UI 渲染组件数据提交流程（针对提交的顶点数据是世界坐标的提交流程，例如：除 Graphics 和 UIModel 的大部分 ui 组件）。
   * 此处的数据最终会生成需要提交渲染的 model 数据。
   *
   * @param comp - 当前执行组件。
   * @param frame - 当前执行组件贴图。
   * @param assembler - 当前组件渲染数据组装器。
   */


  commitComp(comp, frame, assembler, transform) {
    const renderComp = comp;
    const renderData = comp.renderData;
    let dataHash = 0;
    let mat;

    if (renderData) {
      dataHash = renderData.dataHash;
      mat = renderData.material;
    }

    renderComp.stencilStage = _stencilManager.StencilManager.sharedManager.stage;
    const depthStencilStateStage = renderComp.stencilStage;

    if (this._currHash !== dataHash || dataHash === 0 || this._currMaterial !== mat || this._currDepthStencilStateStage !== depthStencilStateStage) {
      this.autoMergeBatches(this._currComponent);

      if (renderData) {
        this._currHash = renderData.dataHash;
        this._currScene = renderData.renderScene;
        this._currComponent = renderComp;
        this._currTransform = transform;
        this._currMaterial = renderData.material;
        this._currBlendTargetHash = renderData.blendHash;
        this._currDepthStencilStateStage = depthStencilStateStage;
        this._currLayer = renderData.layer;
        const frame = renderData.frame;

        if (frame) {
          this._currTexture = frame.getGFXTexture();
          this._currSampler = frame.getGFXSampler();
          this._currTextureHash = renderData.textureHash;
          this._currSamplerHash = this._currSampler.hash;
        } else {
          this._currTexture = null;
          this._currSampler = null;
          this._currTextureHash = 0;
          this._currSamplerHash = 0;
        }
      } else {
        // for Mask & spine
        this._currHash = dataHash;
        this._currScene = renderComp._getRenderScene();
        this._currComponent = renderComp;
        this._currTransform = transform;
        this._currMaterial = renderComp.getRenderMaterial(0);
        this._currBlendTargetHash = renderComp.blendHash;
        this._currDepthStencilStateStage = depthStencilStateStage;
        this._currLayer = renderComp.node.layer;

        if (frame) {
          this._currTexture = frame.getGFXTexture();
          this._currSampler = frame.getGFXSampler();
          this._currTextureHash = frame.getHash();
          this._currSamplerHash = this._currSampler.hash;
        } else {
          this._currTexture = null;
          this._currSampler = null;
          this._currTextureHash = 0;
          this._currSamplerHash = 0;
        }
      }
    }

    if (assembler) {
      assembler.fillBuffers(renderComp, this);
    }
  }
  /**
   * @en
   * Render component data submission process of UI.
   * The submitted vertex data is the UI for local coordinates.
   * For example: The UI components of Graphics and UIModel.
   *
   * @zh
   * UI 渲染组件数据提交流程（针对例如： Graphics 和 UIModel 等数据量较为庞大的 ui 组件）。
   *
   * @param comp - 当前执行组件。
   * @param model - 提交渲染的 model 数据。
   * @param mat - 提交渲染的材质。
   */


  commitModel(comp, model, mat) {
    // if the last comp is spriteComp, previous comps should be batched.
    if (this._currMaterial !== this._emptyMaterial) {
      this.autoMergeBatches(this._currComponent);
    }

    let depthStencil;
    let dssHash = 0;

    if (mat) {
      // Notice: A little hack, if not this two stage, not need update here, while control by stencilManger
      if (comp.stencilStage === _stencilManager.Stage.ENABLED || comp.stencilStage === _stencilManager.Stage.DISABLED) {
        comp.stencilStage = _stencilManager.StencilManager.sharedManager.stage;
      }

      depthStencil = _stencilManager.StencilManager.sharedManager.getStencilStage(comp.stencilStage, mat);
      dssHash = _stencilManager.StencilManager.sharedManager.getStencilHash(comp.stencilStage);
    }

    const stamp = _globalExports.legacyCC.director.getTotalFrames();

    if (model) {
      model.updateTransform(stamp);
      model.updateUBOs(stamp);
    }

    for (let i = 0; i < model.subModels.length; i++) {
      const curDrawBatch = this._drawBatchPool.alloc();

      const subModel = model.subModels[i];
      curDrawBatch.renderScene = comp._getRenderScene();
      curDrawBatch.visFlags = comp.node.layer;
      curDrawBatch.model = model;
      curDrawBatch.bufferBatch = null;
      curDrawBatch.texture = null;
      curDrawBatch.sampler = null;
      curDrawBatch.useLocalData = null;

      if (!depthStencil) {
        depthStencil = null;
      }

      curDrawBatch.fillPasses(mat, depthStencil, dssHash, null, 0, subModel.patches, this);
      curDrawBatch.inputAssembler = subModel.inputAssembler;
      curDrawBatch.model.visFlags = curDrawBatch.visFlags;
      curDrawBatch.descriptorSet = subModel.descriptorSet;

      this._batches.push(curDrawBatch);
    } // reset current render state to null


    this._currMaterial = this._emptyMaterial;
    this._currScene = null;
    this._currComponent = null;
    this._currTransform = null;
    this._currTexture = null;
    this._currSampler = null;
    this._currTextureHash = 0;
    this._currLayer = 0;
  }
  /**
   * @en
   * Submit separate render data.
   * This data does not participate in the batch.
   *
   * @zh
   * 提交独立渲染数据.
   * @param comp 静态组件
   */


  commitStaticBatch(comp) {
    this._batches.concat(comp.drawBatchList);

    this.finishMergeBatches();
  }
  /**
   * @en
   * End a section of render data and submit according to the batch condition.
   *
   * @zh
   * 根据合批条件，结束一段渲染数据并提交。
   */


  autoMergeBatches(renderComp) {
    const buffer = this.currBufferBatch;
    const ia = buffer === null || buffer === void 0 ? void 0 : buffer.recordBatch();
    const mat = this._currMaterial;

    if (!ia || !mat || !buffer) {
      return;
    }

    let blendState;
    let depthStencil;
    let dssHash = 0;
    let bsHash = 0;

    if (renderComp) {
      blendState = renderComp.blendHash === -1 ? null : renderComp.getBlendState();
      bsHash = renderComp.blendHash;

      if (renderComp.customMaterial !== null) {
        depthStencil = _stencilManager.StencilManager.sharedManager.getStencilStage(renderComp.stencilStage, mat);
      } else {
        depthStencil = _stencilManager.StencilManager.sharedManager.getStencilStage(renderComp.stencilStage);
      }

      dssHash = _stencilManager.StencilManager.sharedManager.getStencilHash(renderComp.stencilStage);
    }

    const curDrawBatch = this._currStaticRoot ? this._currStaticRoot._requireDrawBatch() : this._drawBatchPool.alloc();
    curDrawBatch.renderScene = this._currScene;
    curDrawBatch.visFlags = this._currLayer;
    curDrawBatch.bufferBatch = buffer;
    curDrawBatch.texture = this._currTexture;
    curDrawBatch.sampler = this._currSampler;
    curDrawBatch.inputAssembler = ia;
    curDrawBatch.useLocalData = this._currTransform;
    curDrawBatch.textureHash = this._currTextureHash;
    curDrawBatch.samplerHash = this._currSamplerHash;
    curDrawBatch.fillPasses(this._currMaterial, depthStencil, dssHash, blendState, bsHash, null, this);

    this._batches.push(curDrawBatch);

    buffer.vertexStart = buffer.vertexOffset;
    buffer.indicesStart = buffer.indicesOffset;
    buffer.byteStart = buffer.byteOffset; // HACK: After sharing buffer between drawcalls, the performance degradation a lots on iOS 14 or iPad OS 14 device
    // TODO: Maybe it can be removed after Apple fixes it?
    // @ts-expect-error Property '__isWebIOS14OrIPadOS14Env' does not exist on 'sys'

    if (_sys.sys.__isWebIOS14OrIPadOS14Env && !this._currIsStatic) {
      this._currMeshBuffer = null;
    }
  }
  /**
   * @en
   * Force changes to current batch data and merge
   *
   * @zh
   * 强行修改当前批次数据并合并。
   *
   * @param material - 当前批次的材质。
   * @param sprite - 当前批次的精灵帧。
   */


  forceMergeBatches(material, frame, renderComp) {
    this._currMaterial = material;

    if (frame) {
      this._currTexture = frame.getGFXTexture();
      this._currSampler = frame.getGFXSampler();
      this._currTextureHash = frame.getHash();
      this._currSamplerHash = this._currSampler.hash;
    } else {
      this._currTexture = this._currSampler = null;
      this._currTextureHash = this._currSamplerHash = 0;
    }

    this._currLayer = renderComp.node.layer;
    this._currScene = renderComp._getRenderScene();
    this.autoMergeBatches(renderComp);
  }
  /**
   * @en
   * Forced to merge the data of the previous batch to start a new batch.
   *
   * @zh
   * 强制合并上一个批次的数据，开启新一轮合批。
   */


  finishMergeBatches() {
    this.autoMergeBatches();
    this._currMaterial = this._emptyMaterial;
    this._currTexture = null;
    this._currComponent = null;
    this._currTransform = null;
    this._currTextureHash = 0;
    this._currSamplerHash = 0;
    this._currLayer = 0;
  }
  /**
   * @en
   * Force to change the current material.
   *
   * @zh
   * 强制刷新材质。
   */


  flushMaterial(mat) {
    this._currMaterial = mat;
  }

  walk(node, level = 0) {
    const len = node.children.length;

    this._preProcess(node);

    if (len > 0 && !node._static) {
      const children = node.children;

      for (let i = 0; i < children.length; ++i) {
        const child = children[i];
        this.walk(child, level);
      }
    }

    this._postProcess(node);

    level += 1;
  }

  _preProcess(node) {
    // update opacity
    if (node._uiProps.opacityDirty) {
      var _node$parent;

      let opacity = 1.0;

      if ((_node$parent = node.parent) === null || _node$parent === void 0 ? void 0 : _node$parent._uiProps) {
        opacity = node.parent._uiProps.opacity;
        const render = node._uiProps.uiComp;

        if (render && render.markColorDirty) {
          opacity *= render.color.a / 255;
          render.markColorDirty();
        }
      }

      node._uiProps.opacityDirty = false;

      node._uiProps.applyOpacity(opacity);
    }

    const render = node._uiProps.uiComp;

    if (!node._uiProps.uiTransformComp) {
      return;
    }

    if (render && render.enabledInHierarchy) {
      render.updateAssembler(this);
    }
  }

  _postProcess(node) {
    const render = node._uiProps.uiComp;

    if (render && render.enabledInHierarchy) {
      render.postUpdateAssembler(this);
    }
  }

  _recursiveScreenNode(screen) {
    this.walk(screen);
    this.autoMergeBatches(this._currComponent);
  }

  _createMeshBuffer(attributes) {
    const batch = this._bufferBatchPool.add();

    batch.initialize(attributes, this._recreateMeshBuffer.bind(this, attributes));
    const strideBytes = VertexFormat.getAttributeStride(attributes);

    let buffers = this._meshBuffers.get(strideBytes);

    if (!buffers) {
      buffers = [];

      this._meshBuffers.set(strideBytes, buffers);
    }

    buffers.push(batch);
    return batch;
  }

  _recreateMeshBuffer(attributes, vertexCount, indexCount) {
    this.autoMergeBatches();

    this._requireBufferBatch(attributes, vertexCount, indexCount);
  }

  _requireBufferBatch(attributes, vertexCount, indexCount) {
    const strideBytes = VertexFormat.getAttributeStride(attributes);

    let buffers = this._meshBuffers.get(strideBytes);

    if (!buffers) {
      buffers = [];

      this._meshBuffers.set(strideBytes, buffers);
    }

    let meshBufferUseCount = this._meshBufferUseCount.get(strideBytes) || 0; // @ts-expect-error Property '__isWebIOS14OrIPadOS14Env' does not exist on 'sys'

    if (vertexCount && indexCount || _sys.sys.__isWebIOS14OrIPadOS14Env) {
      // useCount++ when _recreateMeshBuffer
      meshBufferUseCount++;
    }

    this._currMeshBuffer = buffers[meshBufferUseCount];

    if (!this._currMeshBuffer) {
      this._currMeshBuffer = this._createMeshBuffer(attributes);
    }

    this._meshBufferUseCount.set(strideBytes, meshBufferUseCount);

    if (vertexCount && indexCount) {
      this._currMeshBuffer.request(vertexCount, indexCount);
    }
  }

  _screenSort(a, b) {
    return a.node.getSiblingIndex() - b.node.getSiblingIndex();
  }

  _releaseDescriptorSetCache(textureHash) {
    this._descriptorSetCache.releaseDescriptorSetCache(textureHash);
  }

}

exports.Batcher2D = Batcher2D;

class LocalDescriptorSet {
  get descriptorSet() {
    return this._descriptorSet;
  }

  constructor() {
    this._descriptorSet = null;
    this._transform = null;
    this._textureHash = 0;
    this._samplerHash = 0;
    this._localBuffer = null;
    this._transformUpdate = true;
    const device = _globalExports.legacyCC.director.root.device;
    this._localData = new Float32Array(_define.UBOLocal.COUNT);
    this._localBuffer = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _define.UBOLocal.SIZE, _define.UBOLocal.SIZE));
  }

  initialize(batch) {
    const device = _globalExports.legacyCC.director.root.device;
    this._transform = batch.useLocalData;
    this._textureHash = batch.textureHash;
    this._samplerHash = batch.samplerHash;
    _dsInfo.layout = batch.passes[0].localSetLayout;
    this._descriptorSet = device.createDescriptorSet(_dsInfo);

    this._descriptorSet.bindBuffer(_define.UBOLocal.BINDING, this._localBuffer);

    const binding = _define.ModelLocalBindings.SAMPLER_SPRITE;

    this._descriptorSet.bindTexture(binding, batch.texture);

    this._descriptorSet.bindSampler(binding, batch.sampler);

    this._descriptorSet.update();

    this._transformUpdate = true;
  }

  updateTransform(transform) {
    if (transform === this._transform) return;
    this._transform = transform;
    this._transformUpdate = true;
    this.uploadLocalData();
  }

  updateLocal() {
    if (!this._transform) return;
    this.uploadLocalData();
  }

  equals(transform, textureHash, samplerHash) {
    return this._transform === transform && this._textureHash === textureHash && this._samplerHash === samplerHash;
  }

  reset() {
    this._transform = null;
    this._textureHash = 0;
    this._samplerHash = 0;
  }

  destroy() {
    if (this._localBuffer) {
      this._localBuffer.destroy();

      this._localBuffer = null;
    }

    if (this._descriptorSet) {
      this._descriptorSet.destroy();

      this._descriptorSet = null;
    }

    this._localData = null;
  }

  uploadLocalData() {
    const node = this._transform; // @ts-expect-error TS2445

    if (node.hasChangedFlags || node._dirtyFlags) {
      node.updateWorldTransform();
    }

    if (this._transformUpdate) {
      // @ts-expect-error TS2445
      const worldMatrix = node._mat;

      _index3.Mat4.toArray(this._localData, worldMatrix, _define.UBOLocal.MAT_WORLD_OFFSET);

      _index3.Mat4.inverseTranspose(m4_1, worldMatrix);

      if (!_internal253Aconstants.JSB) {
        // fix precision lost of webGL on android device
        // scale worldIT mat to around 1.0 by product its sqrt of determinant.
        const det = _index3.Mat4.determinant(m4_1);

        const factor = 1.0 / Math.sqrt(det);

        _index3.Mat4.multiplyScalar(m4_1, m4_1, factor);
      }

      _index3.Mat4.toArray(this._localData, m4_1, _define.UBOLocal.MAT_WORLD_IT_OFFSET);

      this._localBuffer.update(this._localData);

      this._transformUpdate = false;
    }
  }

}

class DescriptorSetCache {
  constructor() {
    this._descriptorSetCache = new Map();
    this._dsCacheHashByTexture = new Map();
    this._localDescriptorSetCache = [];
    this._localCachePool = void 0;
    this._localCachePool = new _index2.Pool(() => new LocalDescriptorSet(), 16, obj => obj.destroy());
  }

  getDescriptorSet(batch) {
    const root = _globalExports.legacyCC.director.root;
    let hash;

    if (batch.useLocalData) {
      const caches = this._localDescriptorSetCache;

      for (let i = 0, len = caches.length; i < len; i++) {
        const cache = caches[i];

        if (cache.equals(batch.useLocalData, batch.textureHash, batch.samplerHash)) {
          return cache.descriptorSet;
        }
      }

      const localDs = this._localCachePool.alloc();

      localDs.initialize(batch);

      this._localDescriptorSetCache.push(localDs);

      return localDs.descriptorSet;
    } else {
      hash = batch.textureHash ^ batch.samplerHash;

      if (this._descriptorSetCache.has(hash)) {
        return this._descriptorSetCache.get(hash);
      } else {
        _dsInfo.layout = batch.passes[0].localSetLayout;
        const descriptorSet = root.device.createDescriptorSet(_dsInfo);
        const binding = _define.ModelLocalBindings.SAMPLER_SPRITE;
        descriptorSet.bindTexture(binding, batch.texture);
        descriptorSet.bindSampler(binding, batch.sampler);
        descriptorSet.update();

        this._descriptorSetCache.set(hash, descriptorSet);

        this._dsCacheHashByTexture.set(batch.textureHash, hash);

        return descriptorSet;
      }
    }
  }

  update() {
    const caches = this._localDescriptorSetCache;
    caches.forEach(value => {
      value.updateLocal();
    });
  }

  reset() {
    const caches = this._localDescriptorSetCache;
    caches.forEach(value => {
      this._localCachePool.free(value);
    });
    this._localDescriptorSetCache.length = 0;
  }

  releaseDescriptorSetCache(textureHash) {
    const key = this._dsCacheHashByTexture.get(textureHash);

    if (key && this._descriptorSetCache.has(key)) {
      this._descriptorSetCache.get(key).destroy();

      this._descriptorSetCache.delete(key);

      this._dsCacheHashByTexture.delete(textureHash);
    }
  }

  destroy() {
    this._descriptorSetCache.forEach((value, key, map) => {
      value.destroy();
    });

    this._descriptorSetCache.clear();

    this._dsCacheHashByTexture.clear();

    this._localDescriptorSetCache.length = 0;

    this._localCachePool.destroy();
  }

}

_globalExports.legacyCC.internal.Batcher2D = Batcher2D;
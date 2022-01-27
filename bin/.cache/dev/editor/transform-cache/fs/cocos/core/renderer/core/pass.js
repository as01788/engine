"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pass = exports.BatchingSchemes = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _builtinResMgr = require("../../builtin/builtin-res-mgr.js");

var _passPhase = require("../../pipeline/pass-phase.js");

var _murmurhash2_gc = require("../../utils/murmurhash2_gc.js");

var _index = require("../../gfx/index.js");

var _programLib = require("./program-lib.js");

var _passUtils = require("./pass-utils.js");

var _define = require("../../pipeline/define.js");

var _nativeScene = require("../scene/native-scene.js");

var _debug = require("../../platform/debug.js");

var _memoryPools = require("./memory-pools.js");

var _instancedBuffer = require("../../pipeline/instanced-buffer.js");

var _batchedBuffer = require("../../pipeline/batched-buffer.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
 * @module material
 */
const _bufferInfo = new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.DEVICE);

const _bufferViewInfo = new _index.BufferViewInfo(null);

const _dsInfo = new _index.DescriptorSetInfo(null);

let BatchingSchemes;
exports.BatchingSchemes = BatchingSchemes;

(function (BatchingSchemes) {
  BatchingSchemes[BatchingSchemes["NONE"] = 0] = "NONE";
  BatchingSchemes[BatchingSchemes["INSTANCING"] = 1] = "INSTANCING";
  BatchingSchemes[BatchingSchemes["VB_MERGING"] = 2] = "VB_MERGING";
})(BatchingSchemes || (exports.BatchingSchemes = BatchingSchemes = {}));

/**
 * @en Render pass, store actual resources for the rendering process
 * @zh 渲染 pass，储存实际描述绘制过程的各项资源。
 */
class Pass {
  /**
   * @en Get the type of member in uniform buffer object with the handle
   * @zh 根据 handle 获取 uniform 的具体类型。
   */

  /**
   * @en Get the binding with handle
   * @zh 根据 handle 获取 binding。
   */

  /**
   * @en Get the array length with handle
   * @zh 根据 handle 获取数组长度。
   */

  /**
   * @en Fill a pass represented by the given pass handle with the given override info
   * @param hPass The pass handle point to the pass
   * @param info The pass override info
   */
  static fillPipelineInfo(pass, info) {
    if (info.priority !== undefined) {
      pass._setPriority(info.priority);
    }

    if (info.primitive !== undefined) {
      pass._setPrimitive(info.primitive);
    }

    if (info.stage !== undefined) {
      pass._setStage(info.stage);
    }

    if (info.dynamicStates !== undefined) {
      pass._setDynamicState(info.dynamicStates);
    }

    if (info.phase !== undefined) {
      pass._setPhase((0, _passPhase.getPhaseID)(info.phase));
    }

    const bs = pass._bs;

    if (info.blendState) {
      const bsInfo = info.blendState;
      const {
        targets
      } = bsInfo;

      if (targets) {
        targets.forEach((t, i) => {
          bs.setTarget(i, t);
        });
      }

      if (bsInfo.isA2C !== undefined) {
        bs.isA2C = bsInfo.isA2C;
      }

      if (bsInfo.isIndepend !== undefined) {
        bs.isIndepend = bsInfo.isIndepend;
      }

      if (bsInfo.blendColor !== undefined) {
        bs.blendColor = bsInfo.blendColor;
      }
    }

    pass._rs.assign(info.rasterizerState);

    pass._dss.assign(info.depthStencilState);
  }
  /**
   * @en Get pass hash value by [[Pass]] hash information.
   * @zh 根据 [[Pass]] 的哈希信息获取哈希值。
   *
   * @param hPass Handle of the pass info used to compute hash value.
   */


  static getPassHash(pass) {
    const shaderKey = _programLib.programLib.getKey(pass.program, pass.defines);

    let res = `${shaderKey},${pass._primitive},${pass._dynamicStates}`;
    res += serializeBlendState(pass._bs);
    res += serializeDepthStencilState(pass._dss);
    res += serializeRasterizerState(pass._rs);
    return (0, _murmurhash2_gc.murmurhash2_32_gc)(res, 666);
  } // internal resources


  get native() {
    return this._nativeObj;
  }

  constructor(root) {
    this._rootBuffer = null;
    this._buffers = [];
    this._descriptorSet = null;
    this._pipelineLayout = null;
    this._passIndex = 0;
    this._propertyIndex = 0;
    this._programName = '';
    this._dynamics = {};
    this._propertyHandleMap = {};
    this._rootBlock = null;
    this._blocksInt = [];
    this._blocks = [];
    this._shaderInfo = null;
    this._defines = {};
    this._properties = {};
    this._shader = null;
    this._bs = new _index.BlendState();
    this._dss = new _index.DepthStencilState();
    this._rs = new _index.RasterizerState();
    this._priority = _define.RenderPriority.DEFAULT;
    this._stage = _define.RenderPassStage.DEFAULT;
    this._phase = (0, _passPhase.getPhaseID)('default');
    this._primitive = _index.PrimitiveMode.TRIANGLE_LIST;
    this._batchingScheme = BatchingSchemes.NONE;
    this._dynamicStates = _index.DynamicStateFlagBit.NONE;
    this._instancedBuffers = {};
    this._batchedBuffers = {};
    this._hash = 0;
    this._root = void 0;
    this._device = void 0;
    this._passHandle = _memoryPools.NULL_HANDLE;
    this._rootBufferDirty = false;
    this._root = root;
    this._device = root.device;
  }
  /**
   * @en Initialize the pass with given pass info, shader will be compiled in the init process
   * @zh 根据指定参数初始化当前 pass，shader 会在这一阶段就尝试编译。
   */


  initialize(info) {
    this._doInit(info);

    this.resetUBOs();
    this.resetTextures();
    this.tryCompile();
  }
  /**
   * @en Get the handle of a UBO member, or specific channels of it.
   * @zh 获取指定 UBO 成员，或其更具体分量的读写句柄。默认以成员自身的类型为目标读写类型（即读写时必须传入与成员类型相同的变量）。
   * @param name Name of the target UBO member.
   * @param offset Channel offset into the member.
   * @param targetType Target type of the handle, i.e. the type of data when read/write to it.
   * @example
   * ```
   * import { Vec3, gfx } from 'cc';
   * // say 'pbrParams' is a uniform vec4
   * const hParams = pass.getHandle('pbrParams'); // get the default handle
   * pass.setUniform(hAlbedo, new Vec3(1, 0, 0)); // wrong! pbrParams.w is NaN now
   *
   * // say 'albedoScale' is a uniform vec4, and we only want to modify the w component in the form of a single float
   * const hThreshold = pass.getHandle('albedoScale', 3, gfx.Type.FLOAT);
   * pass.setUniform(hThreshold, 0.5); // now, albedoScale.w = 0.5
   * ```
   */


  getHandle(name, offset = 0, targetType = _index.Type.UNKNOWN) {
    let handle = this._propertyHandleMap[name];

    if (!handle) {
      return 0;
    }

    if (targetType) {
      handle = (0, _passUtils.customizeType)(handle, targetType);
    } else if (offset) {
      handle = (0, _passUtils.customizeType)(handle, (0, _passUtils.getTypeFromHandle)(handle) - offset);
    }

    return handle + offset;
  }
  /**
   * @en Gets the uniform binding with its name
   * @zh 获取指定 uniform 的 binding。
   * @param name The name of target uniform
   */


  getBinding(name) {
    const handle = this.getHandle(name);

    if (!handle) {
      return -1;
    }

    return Pass.getBindingFromHandle(handle);
  }
  /**
   * @en Sets a vector type uniform value, if a uniform requires frequent update, please use this method.
   * @zh 设置指定普通向量类 uniform 的值，如果需要频繁更新请尽量使用此接口。
   * @param handle The handle for the target uniform
   * @param value New value
   */


  setUniform(handle, value) {
    const binding = Pass.getBindingFromHandle(handle);
    const type = Pass.getTypeFromHandle(handle);
    const ofs = Pass.getOffsetFromHandle(handle);

    const block = this._getBlockView(type, binding);

    _passUtils.type2writer[type](block, value, ofs);

    this._setRootBufferDirty(true);
  }
  /**
   * @en Gets a uniform's value.
   * @zh 获取指定普通向量类 uniform 的值。
   * @param handle The handle for the target uniform
   * @param out The output property to store the result
   */


  getUniform(handle, out) {
    const binding = Pass.getBindingFromHandle(handle);
    const type = Pass.getTypeFromHandle(handle);
    const ofs = Pass.getOffsetFromHandle(handle);

    const block = this._getBlockView(type, binding);

    return _passUtils.type2reader[type](block, out, ofs);
  }
  /**
   * @en Sets an array type uniform value, if a uniform requires frequent update, please use this method.
   * @zh 设置指定数组类 uniform 的值，如果需要频繁更新请尽量使用此接口。
   * @param handle The handle for the target uniform
   * @param value New value
   */


  setUniformArray(handle, value) {
    const binding = Pass.getBindingFromHandle(handle);
    const type = Pass.getTypeFromHandle(handle);
    const stride = (0, _index.GetTypeSize)(type) >> 2;

    const block = this._getBlockView(type, binding);

    let ofs = Pass.getOffsetFromHandle(handle);

    for (let i = 0; i < value.length; i++, ofs += stride) {
      if (value[i] === null) {
        continue;
      }

      _passUtils.type2writer[type](block, value[i], ofs);
    }

    this._setRootBufferDirty(true);
  }
  /**
   * @en Bind a GFX [[Texture]] the the given uniform binding
   * @zh 绑定实际 GFX [[Texture]] 到指定 binding。
   * @param binding The binding for target uniform of texture type
   * @param value Target texture
   */


  bindTexture(binding, value, index) {
    this._descriptorSet.bindTexture(binding, value, index || 0);
  }
  /**
   * @en Bind a GFX [[Sampler]] the the given uniform binding
   * @zh 绑定实际 GFX [[Sampler]] 到指定 binding。
   * @param binding The binding for target uniform of sampler type
   * @param value Target sampler
   */


  bindSampler(binding, value, index) {
    this._descriptorSet.bindSampler(binding, value, index || 0);
  }
  /**
   * @en Sets the dynamic pipeline state property at runtime
   * @zh 设置运行时 pass 内可动态更新的管线状态属性。
   * @param state Target dynamic state
   * @param value Target value
   */


  setDynamicState(state, value) {
    const ds = this._dynamics[state];

    if (ds && ds.value === value) {
      return;
    }

    ds.value = value;
    ds.dirty = true;
  }
  /**
   * @en Override all pipeline states with the given pass override info.
   * @zh 重载当前所有管线状态。
   * @param original The original pass info
   * @param value The override pipeline state info
   */


  overridePipelineStates(original, overrides) {
    console.warn('base pass cannot override states, please use pass instance instead.');
  }

  _setRootBufferDirty(val) {
    this._rootBufferDirty = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setRootBufferDirty(val);
    }
  }
  /**
   * @en Update the current uniforms data.
   * @zh 更新当前 Uniform 数据。
   */


  update() {
    if (!this._descriptorSet) {
      (0, _debug.errorID)(12006);
      return;
    }

    if (this._rootBuffer && this._rootBufferDirty) {
      this._rootBuffer.update(this._rootBlock);

      this._setRootBufferDirty(false);
    }

    this._descriptorSet.update();

    if (_internal253Aconstants.JSB) {
      this._nativeObj.update();
    }
  }

  getInstancedBuffer(extraKey = 0) {
    return this._instancedBuffers[extraKey] || (this._instancedBuffers[extraKey] = new _instancedBuffer.InstancedBuffer(this));
  }

  getBatchedBuffer(extraKey = 0) {
    return this._batchedBuffers[extraKey] || (this._batchedBuffers[extraKey] = new _batchedBuffer.BatchedBuffer(this));
  }

  _initNative() {
    if (_internal253Aconstants.JSB && !this._nativeObj) {
      this._nativeObj = new _nativeScene.NativePass();
      this._passHandle = _memoryPools.PassPool.alloc();
      this._nativePriority = _memoryPools.PassPool.getTypedArray(this._passHandle, _memoryPools.PassView.PRIORITY);
      this._nativeStage = _memoryPools.PassPool.getTypedArray(this._passHandle, _memoryPools.PassView.STAGE);
      this._nativePhase = _memoryPools.PassPool.getTypedArray(this._passHandle, _memoryPools.PassView.PHASE);
      this._nativePrimitive = _memoryPools.PassPool.getTypedArray(this._passHandle, _memoryPools.PassView.PRIMITIVE);
      this._nativeBatchingScheme = _memoryPools.PassPool.getTypedArray(this._passHandle, _memoryPools.PassView.BATCHING_SCHEME);
      this._nativeDynamicStates = _memoryPools.PassPool.getTypedArray(this._passHandle, _memoryPools.PassView.DYNAMIC_STATE);
      this._nativeHash = _memoryPools.PassPool.getTypedArray(this._passHandle, _memoryPools.PassView.HASH);

      this._nativeObj.initWithData(_memoryPools.PassPool.getBuffer(this._passHandle));
    }
  }

  _destroy() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = null;

      if (this._passHandle) {
        _memoryPools.PassPool.free(this._passHandle);
      }
    }
  }
  /**
   * @en Destroy the current pass.
   * @zh 销毁当前 pass。
   */


  destroy() {
    for (let i = 0; i < this._shaderInfo.blocks.length; i++) {
      const u = this._shaderInfo.blocks[i];

      this._buffers[u.binding].destroy();
    }

    this._buffers = [];

    if (this._rootBuffer) {
      this._rootBuffer.destroy();

      this._rootBuffer = null;
    }

    for (const ib in this._instancedBuffers) {
      this._instancedBuffers[ib].destroy();
    }

    for (const bb in this._batchedBuffers) {
      this._batchedBuffers[bb].destroy();
    }

    this._descriptorSet.destroy();

    this._rs.destroy();

    this._dss.destroy();

    this._bs.destroy();

    this._destroy();
  }
  /**
   * @en Resets the value of the given uniform by name to the default value in [[EffectAsset]].
   * This method does not support array type uniform.
   * @zh 重置指定（非数组） Uniform 为 [[EffectAsset]] 默认值。
   */


  resetUniform(name) {
    const handle = this.getHandle(name);

    if (!handle) {
      return;
    }

    const type = Pass.getTypeFromHandle(handle);
    const binding = Pass.getBindingFromHandle(handle);
    const ofs = Pass.getOffsetFromHandle(handle);
    const count = Pass.getCountFromHandle(handle);

    const block = this._getBlockView(type, binding);

    const info = this._properties[name];
    const givenDefault = info && info.value;
    const value = givenDefault || (0, _passUtils.getDefaultFromType)(type);
    const size = ((0, _index.GetTypeSize)(type) >> 2) * count;

    for (let k = 0; k + value.length <= size; k += value.length) {
      block.set(value, ofs + k);
    }

    this._setRootBufferDirty(true);
  }
  /**
   * @en Resets the value of the given texture by name to the default value in [[EffectAsset]].
   * @zh 重置指定贴图为 [[EffectAsset]] 默认值。
   */


  resetTexture(name, index) {
    const handle = this.getHandle(name);

    if (!handle) {
      return;
    }

    const type = Pass.getTypeFromHandle(handle);
    const binding = Pass.getBindingFromHandle(handle);
    const info = this._properties[name];
    const value = info && info.value;
    const texName = value ? `${value}-texture` : (0, _passUtils.getDefaultFromType)(type);

    const textureBase = _builtinResMgr.builtinResMgr.get(texName);

    const texture = textureBase && textureBase.getGFXTexture();
    const samplerInfo = info && info.samplerHash !== undefined ? _index.Sampler.unpackFromHash(info.samplerHash) : textureBase && textureBase.getSamplerInfo();

    const sampler = this._device.getSampler(samplerInfo);

    this._descriptorSet.bindSampler(binding, sampler, index);

    this._descriptorSet.bindTexture(binding, texture, index);
  }
  /**
   * @en Resets all uniform buffer objects to the default values in [[EffectAsset]]
   * @zh 重置所有 UBO 为默认值。
   */


  resetUBOs() {
    for (let i = 0; i < this._shaderInfo.blocks.length; i++) {
      const u = this._shaderInfo.blocks[i];
      let ofs = 0;

      for (let j = 0; j < u.members.length; j++) {
        const cur = u.members[j];

        const block = this._getBlockView(cur.type, u.binding);

        const info = this._properties[cur.name];
        const givenDefault = info && info.value;
        const value = givenDefault || (0, _passUtils.getDefaultFromType)(cur.type);
        const size = ((0, _index.GetTypeSize)(cur.type) >> 2) * cur.count;

        for (let k = 0; k + value.length <= size; k += value.length) {
          block.set(value, ofs + k);
        }

        ofs += size;
      }
    }

    this._setRootBufferDirty(true);
  }
  /**
   * @en Resets all textures and samplers to the default values in [[EffectAsset]]
   * @zh 重置所有 texture 和 sampler 为初始默认值。
   */


  resetTextures() {
    for (let i = 0; i < this._shaderInfo.samplerTextures.length; i++) {
      const u = this._shaderInfo.samplerTextures[i];

      for (let j = 0; j < u.count; j++) {
        this.resetTexture(u.name, j);
      }
    }
  }
  /**
   * @en Try to compile the shader and retrieve related resources references.
   * @zh 尝试编译 shader 并获取相关资源引用。
   */


  tryCompile() {
    const {
      pipeline
    } = this._root;

    if (!pipeline) {
      return false;
    }

    this._syncBatchingScheme();

    const shader = _programLib.programLib.getGFXShader(this._device, this._programName, this._defines, pipeline);

    if (!shader) {
      console.warn(`create shader ${this._programName} failed`);
      return false;
    }

    this._shader = shader;

    this._setPipelineLayout(_programLib.programLib.getTemplateInfo(this._programName).pipelineLayout);

    this._setHash(Pass.getPassHash(this));

    return true;
  }
  /**
   * @en Gets the shader variant of the current pass and given macro patches
   * @zh 结合指定的编译宏组合获取当前 Pass 的 Shader Variant
   * @param patches The macro patches
   */


  getShaderVariant(patches = null) {
    if (!this._shader && !this.tryCompile()) {
      console.warn('pass resources incomplete');
      return null;
    }

    if (!patches) {
      return this._shader;
    }

    if (_internal253Aconstants.EDITOR) {
      for (let i = 0; i < patches.length; i++) {
        if (!patches[i].name.startsWith('CC_')) {
          console.warn('cannot patch non-builtin macros');
          return null;
        }
      }
    }

    const {
      pipeline
    } = this._root;

    for (let i = 0; i < patches.length; i++) {
      const patch = patches[i];
      this._defines[patch.name] = patch.value;
    }

    const shader = _programLib.programLib.getGFXShader(this._device, this._programName, this._defines, pipeline);

    for (let i = 0; i < patches.length; i++) {
      const patch = patches[i];
      delete this._defines[patch.name];
    }

    return shader;
  } // internal use

  /**
   * @private
   */


  beginChangeStatesSilently() {}
  /**
   * @private
   */


  endChangeStatesSilently() {}

  _setPriority(val) {
    this._priority = val;

    if (_internal253Aconstants.JSB) {
      this._nativePriority[0] = val;
    }
  }

  _setStage(val) {
    this._stage = val;

    if (_internal253Aconstants.JSB) {
      this._nativeStage[0] = val;
    }
  }

  _setPhase(val) {
    this._phase = val;

    if (_internal253Aconstants.JSB) {
      this._nativePhase[0] = val;
    }
  }

  _setPrimitive(val) {
    this._primitive = val;

    if (_internal253Aconstants.JSB) {
      this._nativePrimitive[0] = val;
    }
  }

  _setState(bs, dss, rs, ds) {
    this._bs = bs;
    this._dss = dss;
    this._rs = rs;
    this._descriptorSet = ds;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.blendState = bs.native;
      this._nativeObj.depthStencilState = dss.native;
      this._nativeObj.rasterizerState = rs.native;
      this._nativeObj.descriptorSet = ds;
    }
  }

  _doInit(info, copyDefines = false) {
    this._initNative();

    this._setPriority(_define.RenderPriority.DEFAULT);

    this._setStage(_define.RenderPassStage.DEFAULT);

    this._setPhase((0, _passPhase.getPhaseID)('default'));

    this._setPrimitive(_index.PrimitiveMode.TRIANGLE_LIST);

    this._passIndex = info.passIndex;
    this._propertyIndex = info.propertyIndex !== undefined ? info.propertyIndex : info.passIndex;
    this._programName = info.program;
    this._defines = copyDefines ? { ...info.defines
    } : info.defines;
    this._shaderInfo = _programLib.programLib.getTemplate(info.program);
    this._properties = info.properties || this._properties;
    const device = this._device;
    Pass.fillPipelineInfo(this, info);

    if (info.stateOverrides) {
      Pass.fillPipelineInfo(this, info.stateOverrides);
    } // init descriptor set


    _dsInfo.layout = _programLib.programLib.getDescriptorSetLayout(this._device, info.program);
    this._descriptorSet = this._device.createDescriptorSet(_dsInfo); // pipeline state

    this._setState(this._bs, this._dss, this._rs, this._descriptorSet); // calculate total size required


    const blocks = this._shaderInfo.blocks;

    const tmplInfo = _programLib.programLib.getTemplateInfo(info.program);

    const {
      blockSizes,
      handleMap
    } = tmplInfo;
    const alignment = device.capabilities.uboOffsetAlignment;
    const startOffsets = [];
    let lastSize = 0;
    let lastOffset = 0;

    for (let i = 0; i < blocks.length; i++) {
      const size = blockSizes[i];
      startOffsets.push(lastOffset);
      lastOffset += Math.ceil(size / alignment) * alignment;
      lastSize = size;
    } // create gfx buffer resource


    const totalSize = startOffsets[startOffsets.length - 1] + lastSize;

    if (totalSize) {
      // https://bugs.chromium.org/p/chromium/issues/detail?id=988988
      _bufferInfo.size = Math.ceil(totalSize / 16) * 16;
      this._rootBuffer = device.createBuffer(_bufferInfo);
      this._rootBlock = new ArrayBuffer(totalSize);

      if (_internal253Aconstants.JSB) {
        this._nativeObj.setRootBufferAndBlock(this._rootBuffer, this._rootBlock);
      }
    } // create buffer views


    for (let i = 0, count = 0; i < blocks.length; i++) {
      const {
        binding
      } = blocks[i];
      const size = blockSizes[i];
      _bufferViewInfo.buffer = this._rootBuffer;
      _bufferViewInfo.offset = startOffsets[count++];
      _bufferViewInfo.range = Math.ceil(size / 16) * 16;
      const bufferView = this._buffers[binding] = device.createBuffer(_bufferViewInfo); // non-builtin UBO data pools, note that the effect compiler
      // guarantees these bindings to be consecutive, starting from 0 and non-array-typed

      this._blocks[binding] = new Float32Array(this._rootBlock, _bufferViewInfo.offset, size / Float32Array.BYTES_PER_ELEMENT);
      this._blocksInt[binding] = new Int32Array(this._blocks[binding].buffer, this._blocks[binding].byteOffset, this._blocks[binding].length);

      this._descriptorSet.bindBuffer(binding, bufferView);
    } // store handles


    const directHandleMap = this._propertyHandleMap = handleMap;
    const indirectHandleMap = {};

    for (const name in this._properties) {
      const prop = this._properties[name];

      if (!prop.handleInfo) {
        continue;
      }

      indirectHandleMap[name] = this.getHandle.apply(this, prop.handleInfo);
    }

    Object.assign(directHandleMap, indirectHandleMap);
  }

  _syncBatchingScheme() {
    if (this._defines.USE_INSTANCING) {
      if (this._device.hasFeature(_index.Feature.INSTANCED_ARRAYS)) {
        this._setBatchingScheme(BatchingSchemes.INSTANCING);
      } else {
        this._defines.USE_INSTANCING = false;

        this._setBatchingScheme(BatchingSchemes.NONE);
      }
    } else if (this._defines.USE_BATCHING) {
      this._setBatchingScheme(BatchingSchemes.VB_MERGING);
    } else {
      this._setBatchingScheme(BatchingSchemes.NONE);
    }
  } // Only for UI


  _setBatchingScheme(val) {
    this._batchingScheme = val;

    if (_internal253Aconstants.JSB) {
      this._nativeBatchingScheme[0] = val;
    }
  }

  _setDynamicState(val) {
    this._dynamicStates = val;

    if (_internal253Aconstants.JSB) {
      this._nativeDynamicStates[0] = val;
    }
  }

  _setHash(val) {
    this._hash = val;

    if (_internal253Aconstants.JSB) {
      this._nativeHash[0] = val;
    }
  }

  _getBlockView(type, binding) {
    return type < _index.Type.FLOAT ? this._blocksInt[binding] : this._blocks[binding];
  }

  _setPipelineLayout(pipelineLayout) {
    this._pipelineLayout = pipelineLayout;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setPipelineLayout(pipelineLayout);
    }
  } // Only for UI


  _initPassFromTarget(target, dss, bs, hashFactor) {
    this._initNative();

    this._setPriority(target.priority);

    this._setStage(target.stage);

    this._setPhase(target.phase);

    this._setBatchingScheme(target.batchingScheme);

    this._setPrimitive(target.primitive);

    this._setDynamicState(target.dynamicStates);

    this._setState(bs, dss, target.rasterizerState, target.descriptorSet);

    this._passIndex = target.passIndex;
    this._propertyIndex = target.propertyIndex;
    this._programName = target.program;
    this._defines = target.defines;
    this._shaderInfo = target._shaderInfo;
    this._properties = target._properties;
    this._blocks = target._blocks;
    this._blocksInt = target._blocksInt;
    this._dynamics = target._dynamics;
    this._shader = target._shader;

    this._setPipelineLayout(_programLib.programLib.getTemplateInfo(this._programName).pipelineLayout);

    this._setHash(target._hash ^ hashFactor);
  } // infos


  get root() {
    return this._root;
  }

  get device() {
    return this._device;
  }

  get shaderInfo() {
    return this._shaderInfo;
  }

  get localSetLayout() {
    return _programLib.programLib.getDescriptorSetLayout(this._device, this._programName, true);
  }

  get program() {
    return this._programName;
  }

  get properties() {
    return this._properties;
  }

  get defines() {
    return this._defines;
  }

  get passIndex() {
    return this._passIndex;
  }

  get propertyIndex() {
    return this._propertyIndex;
  } // data


  get dynamics() {
    return this._dynamics;
  }

  get blocks() {
    return this._blocks;
  }

  get blocksInt() {
    return this._blocksInt;
  }

  get rootBufferDirty() {
    return this._rootBufferDirty;
  } // states


  get priority() {
    return this._priority;
  }

  get primitive() {
    return this._primitive;
  }

  get stage() {
    return this._stage;
  }

  get phase() {
    return this._phase;
  }

  get rasterizerState() {
    return this._rs;
  }

  get depthStencilState() {
    return this._dss;
  }

  get blendState() {
    return this._bs;
  }

  get dynamicStates() {
    return this._dynamicStates;
  }

  get batchingScheme() {
    return this._batchingScheme;
  }

  get descriptorSet() {
    return this._descriptorSet;
  }

  get hash() {
    return this._hash;
  }

  get pipelineLayout() {
    return this._pipelineLayout;
  }

}

exports.Pass = Pass;
Pass.getTypeFromHandle = _passUtils.getTypeFromHandle;
Pass.getBindingFromHandle = _passUtils.getBindingFromHandle;
Pass.getCountFromHandle = _passUtils.getCountFromHandle;
Pass.getOffsetFromHandle = _passUtils.getOffsetFromHandle;

function serializeBlendState(bs) {
  let res = `,bs,${bs.isA2C}`;

  for (const t of bs.targets) {
    res += `,bt,${t.blend},${t.blendEq},${t.blendAlphaEq},${t.blendColorMask}`;
    res += `,${t.blendSrc},${t.blendDst},${t.blendSrcAlpha},${t.blendDstAlpha}`;
  }

  return res;
}

function serializeRasterizerState(rs) {
  return `,rs,${rs.cullMode},${rs.depthBias},${rs.isFrontFaceCCW}`;
}

function serializeDepthStencilState(dss) {
  let res = `,dss,${dss.depthTest},${dss.depthWrite},${dss.depthFunc}`;
  res += `,${dss.stencilTestFront},${dss.stencilFuncFront},${dss.stencilRefFront},${dss.stencilReadMaskFront}`;
  res += `,${dss.stencilFailOpFront},${dss.stencilZFailOpFront},${dss.stencilPassOpFront},${dss.stencilWriteMaskFront}`;
  res += `,${dss.stencilTestBack},${dss.stencilFuncBack},${dss.stencilRefBack},${dss.stencilReadMaskBack}`;
  res += `,${dss.stencilFailOpBack},${dss.stencilZFailOpBack},${dss.stencilPassOpBack},${dss.stencilWriteMaskBack}`;
  return res;
}
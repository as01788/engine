"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLDevice = void 0;

var _device = require("../base/device.js");

var _sampler = require("../base/states/sampler.js");

var _webglDescriptorSet = require("./webgl-descriptor-set.js");

var _webglBuffer = require("./webgl-buffer.js");

var _webglCommandBuffer = require("./webgl-command-buffer.js");

var _webglFramebuffer = require("./webgl-framebuffer.js");

var _webglInputAssembler = require("./webgl-input-assembler.js");

var _webglDescriptorSetLayout = require("./webgl-descriptor-set-layout.js");

var _webglPipelineLayout = require("./webgl-pipeline-layout.js");

var _webglPipelineState = require("./webgl-pipeline-state.js");

var _webglPrimaryCommandBuffer = require("./webgl-primary-command-buffer.js");

var _webglQueue = require("./webgl-queue.js");

var _webglRenderPass = require("./webgl-render-pass.js");

var _webglSampler = require("./states/webgl-sampler.js");

var _webglShader = require("./webgl-shader.js");

var _webglSwapchain = require("./webgl-swapchain.js");

var _webglTexture = require("./webgl-texture.js");

var _define = require("../base/define.js");

var _webglCommands = require("./webgl-commands.js");

var _globalBarrier = require("../base/states/global-barrier.js");

var _textureBarrier = require("../base/states/texture-barrier.js");

var _debug = require("../../platform/debug.js");

var _webglDefine = require("./webgl-define.js");

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
class WebGLDevice extends _device.Device {
  constructor(...args) {
    super(...args);
    this._swapchain = null;
    this._context = null;
  }

  get gl() {
    return this._context;
  }

  get extensions() {
    return this._swapchain.extensions;
  }

  get stateCache() {
    return this._swapchain.stateCache;
  }

  get nullTex2D() {
    return this._swapchain.nullTex2D;
  }

  get nullTexCube() {
    return this._swapchain.nullTexCube;
  }

  initialize(info) {
    _webglDefine.WebGLDeviceManager.setInstance(this);

    this._gfxAPI = _define.API.WEBGL;
    this._bindingMappingInfo = info.bindingMappingInfo;
    if (!this._bindingMappingInfo.bufferOffsets.length) this._bindingMappingInfo.bufferOffsets.push(0);
    if (!this._bindingMappingInfo.samplerOffsets.length) this._bindingMappingInfo.samplerOffsets.push(0);
    const gl = this._context = (0, _webglSwapchain.getContext)(_device.Device.canvas);

    if (!gl) {
      console.error('This device does not support WebGL.');
      return false;
    } // create queue


    this._queue = this.createQueue(new _define.QueueInfo(_define.QueueType.GRAPHICS));
    this._cmdBuff = this.createCommandBuffer(new _define.CommandBufferInfo(this._queue));
    this._caps.maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    this._caps.maxVertexUniformVectors = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    this._caps.maxFragmentUniformVectors = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    this._caps.maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this._caps.maxVertexTextureUnits = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    this._caps.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    this._caps.maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
    const extensions = gl.getSupportedExtensions();
    let extStr = '';

    if (extensions) {
      for (const ext of extensions) {
        extStr += `${ext} `;
      }
    }

    const exts = (0, _webglSwapchain.getExtensions)(gl);

    if (exts.WEBGL_debug_renderer_info) {
      this._renderer = gl.getParameter(exts.WEBGL_debug_renderer_info.UNMASKED_RENDERER_WEBGL);
      this._vendor = gl.getParameter(exts.WEBGL_debug_renderer_info.UNMASKED_VENDOR_WEBGL);
    } else {
      this._renderer = gl.getParameter(gl.RENDERER);
      this._vendor = gl.getParameter(gl.VENDOR);
    }

    const version = gl.getParameter(gl.VERSION);

    this._features.fill(false);

    if (exts.EXT_sRGB) {
      this._features[_define.Feature.FORMAT_SRGB] = true;
    }

    if (exts.EXT_blend_minmax) {
      this._features[_define.Feature.BLEND_MINMAX] = true;
    }

    if (exts.WEBGL_color_buffer_float) {
      this._features[_define.Feature.COLOR_FLOAT] = true;
    }

    if (exts.EXT_color_buffer_half_float) {
      this._features[_define.Feature.COLOR_HALF_FLOAT] = true;
    }

    if (exts.OES_texture_float) {
      this._features[_define.Feature.TEXTURE_FLOAT] = true;
    }

    if (exts.OES_texture_half_float) {
      this._features[_define.Feature.TEXTURE_HALF_FLOAT] = true;
    }

    if (exts.OES_texture_float_linear) {
      this._features[_define.Feature.TEXTURE_FLOAT_LINEAR] = true;
    }

    if (exts.OES_texture_half_float_linear) {
      this._features[_define.Feature.TEXTURE_HALF_FLOAT_LINEAR] = true;
    }

    this._features[_define.Feature.FORMAT_RGB8] = true;

    if (exts.OES_element_index_uint) {
      this._features[_define.Feature.ELEMENT_INDEX_UINT] = true;
    }

    if (exts.ANGLE_instanced_arrays) {
      this._features[_define.Feature.INSTANCED_ARRAYS] = true;
    }

    if (exts.WEBGL_draw_buffers) {
      this._features[_define.Feature.MULTIPLE_RENDER_TARGETS] = true;
    }

    let compressedFormat = '';

    if (exts.WEBGL_compressed_texture_etc1) {
      this._features[_define.Feature.FORMAT_ETC1] = true;
      compressedFormat += 'etc1 ';
    }

    if (exts.WEBGL_compressed_texture_etc) {
      this._features[_define.Feature.FORMAT_ETC2] = true;
      compressedFormat += 'etc2 ';
    }

    if (exts.WEBGL_compressed_texture_s3tc) {
      this._features[_define.Feature.FORMAT_DXT] = true;
      compressedFormat += 'dxt ';
    }

    if (exts.WEBGL_compressed_texture_pvrtc) {
      this._features[_define.Feature.FORMAT_PVRTC] = true;
      compressedFormat += 'pvrtc ';
    }

    if (exts.WEBGL_compressed_texture_astc) {
      this._features[_define.Feature.FORMAT_ASTC] = true;
      compressedFormat += 'astc ';
    }

    (0, _debug.debug)('WebGL device initialized.');
    (0, _debug.debug)(`RENDERER: ${this._renderer}`);
    (0, _debug.debug)(`VENDOR: ${this._vendor}`);
    (0, _debug.debug)(`VERSION: ${version}`);
    (0, _debug.debug)(`COMPRESSED_FORMAT: ${compressedFormat}`);
    (0, _debug.debug)(`EXTENSIONS: ${extStr}`);
    return true;
  }

  destroy() {
    if (this._queue) {
      this._queue.destroy();

      this._queue = null;
    }

    if (this._cmdBuff) {
      this._cmdBuff.destroy();

      this._cmdBuff = null;
    }
  }

  flushCommands(cmdBuffs) {}

  acquire(swapchains) {}

  present() {
    const queue = this._queue;
    this._numDrawCalls = queue.numDrawCalls;
    this._numInstances = queue.numInstances;
    this._numTris = queue.numTris;
    queue.clear();
  }

  createCommandBuffer(info) {
    // const Ctor = WebGLCommandBuffer; // opt to instant invocation
    const Ctor = info.type === _define.CommandBufferType.PRIMARY ? _webglPrimaryCommandBuffer.WebGLPrimaryCommandBuffer : _webglCommandBuffer.WebGLCommandBuffer;
    const cmdBuff = new Ctor();
    cmdBuff.initialize(info);
    return cmdBuff;
  }

  createSwapchain(info) {
    const swapchain = new _webglSwapchain.WebGLSwapchain();
    this._swapchain = swapchain;
    swapchain.initialize(info);
    return swapchain;
  }

  createBuffer(info) {
    const buffer = new _webglBuffer.WebGLBuffer();
    buffer.initialize(info);
    return buffer;
  }

  createTexture(info) {
    const texture = new _webglTexture.WebGLTexture();
    texture.initialize(info);
    return texture;
  }

  createDescriptorSet(info) {
    const descriptorSet = new _webglDescriptorSet.WebGLDescriptorSet();
    descriptorSet.initialize(info);
    return descriptorSet;
  }

  createShader(info) {
    const shader = new _webglShader.WebGLShader();
    shader.initialize(info);
    return shader;
  }

  createInputAssembler(info) {
    const inputAssembler = new _webglInputAssembler.WebGLInputAssembler();
    inputAssembler.initialize(info);
    return inputAssembler;
  }

  createRenderPass(info) {
    const renderPass = new _webglRenderPass.WebGLRenderPass();
    renderPass.initialize(info);
    return renderPass;
  }

  createFramebuffer(info) {
    const framebuffer = new _webglFramebuffer.WebGLFramebuffer();
    framebuffer.initialize(info);
    return framebuffer;
  }

  createDescriptorSetLayout(info) {
    const descriptorSetLayout = new _webglDescriptorSetLayout.WebGLDescriptorSetLayout();
    descriptorSetLayout.initialize(info);
    return descriptorSetLayout;
  }

  createPipelineLayout(info) {
    const pipelineLayout = new _webglPipelineLayout.WebGLPipelineLayout();
    pipelineLayout.initialize(info);
    return pipelineLayout;
  }

  createPipelineState(info) {
    const pipelineState = new _webglPipelineState.WebGLPipelineState();
    pipelineState.initialize(info);
    return pipelineState;
  }

  createQueue(info) {
    const queue = new _webglQueue.WebGLQueue();
    queue.initialize(info);
    return queue;
  }

  getSampler(info) {
    const hash = _sampler.Sampler.computeHash(info);

    if (!this._samplers.has(hash)) {
      this._samplers.set(hash, new _webglSampler.WebGLSampler(info, hash));
    }

    return this._samplers.get(hash);
  }

  getGlobalBarrier(info) {
    const hash = _globalBarrier.GlobalBarrier.computeHash(info);

    if (!this._globalBarriers.has(hash)) {
      this._globalBarriers.set(hash, new _globalBarrier.GlobalBarrier(info, hash));
    }

    return this._globalBarriers.get(hash);
  }

  getTextureBarrier(info) {
    const hash = _textureBarrier.TextureBarrier.computeHash(info);

    if (!this._textureBarriers.has(hash)) {
      this._textureBarriers.set(hash, new _textureBarrier.TextureBarrier(info, hash));
    }

    return this._textureBarriers.get(hash);
  }

  copyBuffersToTexture(buffers, texture, regions) {
    (0, _webglCommands.WebGLCmdFuncCopyBuffersToTexture)(this, buffers, texture.gpuTexture, regions);
  }

  copyTextureToBuffers(texture, buffers, regions) {
    (0, _webglCommands.WebGLCmdFuncCopyTextureToBuffers)(this, texture.gpuTexture, buffers, regions);
  }

  copyTexImagesToTexture(texImages, texture, regions) {
    (0, _webglCommands.WebGLCmdFuncCopyTexImagesToTexture)(this, texImages, texture.gpuTexture, regions);
  }

}

exports.WebGLDevice = WebGLDevice;
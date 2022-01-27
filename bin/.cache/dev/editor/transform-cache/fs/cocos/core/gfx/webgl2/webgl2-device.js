"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGL2Device = void 0;

var _device = require("../base/device.js");

var _sampler = require("../base/states/sampler.js");

var _webgl2DescriptorSet = require("./webgl2-descriptor-set.js");

var _webgl2Buffer = require("./webgl2-buffer.js");

var _webgl2CommandBuffer = require("./webgl2-command-buffer.js");

var _webgl2Framebuffer = require("./webgl2-framebuffer.js");

var _webgl2InputAssembler = require("./webgl2-input-assembler.js");

var _webgl2DescriptorSetLayout = require("./webgl2-descriptor-set-layout.js");

var _webgl2PipelineLayout = require("./webgl2-pipeline-layout.js");

var _webgl2PipelineState = require("./webgl2-pipeline-state.js");

var _webgl2PrimaryCommandBuffer = require("./webgl2-primary-command-buffer.js");

var _webgl2Queue = require("./webgl2-queue.js");

var _webgl2RenderPass = require("./webgl2-render-pass.js");

var _webgl2Sampler = require("./states/webgl2-sampler.js");

var _webgl2Shader = require("./webgl2-shader.js");

var _webgl2Swapchain = require("./webgl2-swapchain.js");

var _webgl2Texture = require("./webgl2-texture.js");

var _define = require("../base/define.js");

var _webgl2Commands = require("./webgl2-commands.js");

var _globalBarrier = require("../base/states/global-barrier.js");

var _textureBarrier = require("../base/states/texture-barrier.js");

var _debug = require("../../platform/debug.js");

var _webgl2Define = require("./webgl2-define.js");

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
class WebGL2Device extends _device.Device {
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
    _webgl2Define.WebGL2DeviceManager.setInstance(this);

    this._gfxAPI = _define.API.WEBGL2;
    this._bindingMappingInfo = info.bindingMappingInfo;
    if (!this._bindingMappingInfo.bufferOffsets.length) this._bindingMappingInfo.bufferOffsets.push(0);
    if (!this._bindingMappingInfo.samplerOffsets.length) this._bindingMappingInfo.samplerOffsets.push(0);
    const gl = this._context = (0, _webgl2Swapchain.getContext)(_device.Device.canvas);

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
    this._caps.maxUniformBufferBindings = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);
    this._caps.maxUniformBlockSize = gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE);
    this._caps.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    this._caps.maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
    this._caps.uboOffsetAlignment = gl.getParameter(gl.UNIFORM_BUFFER_OFFSET_ALIGNMENT);
    const extensions = gl.getSupportedExtensions();
    let extStr = '';

    if (extensions) {
      for (const ext of extensions) {
        extStr += `${ext} `;
      }
    }

    const exts = (0, _webgl2Swapchain.getExtensions)(gl);

    if (exts.WEBGL_debug_renderer_info) {
      this._renderer = gl.getParameter(exts.WEBGL_debug_renderer_info.UNMASKED_RENDERER_WEBGL);
      this._vendor = gl.getParameter(exts.WEBGL_debug_renderer_info.UNMASKED_VENDOR_WEBGL);
    } else {
      this._renderer = gl.getParameter(gl.RENDERER);
      this._vendor = gl.getParameter(gl.VENDOR);
    }

    const version = gl.getParameter(gl.VERSION);

    this._features.fill(false);

    this._features[_define.Feature.TEXTURE_FLOAT] = true;
    this._features[_define.Feature.TEXTURE_HALF_FLOAT] = true;
    this._features[_define.Feature.FORMAT_R11G11B10F] = true;
    this._features[_define.Feature.FORMAT_SRGB] = true;
    this._features[_define.Feature.FORMAT_RGB8] = true;
    this._features[_define.Feature.ELEMENT_INDEX_UINT] = true;
    this._features[_define.Feature.INSTANCED_ARRAYS] = true;
    this._features[_define.Feature.MULTIPLE_RENDER_TARGETS] = true;
    this._features[_define.Feature.BLEND_MINMAX] = true;

    if (exts.EXT_color_buffer_float) {
      this._features[_define.Feature.COLOR_FLOAT] = true;
      this._features[_define.Feature.COLOR_HALF_FLOAT] = true;
    }

    if (exts.OES_texture_float_linear) {
      this._features[_define.Feature.TEXTURE_FLOAT_LINEAR] = true;
    }

    if (exts.OES_texture_half_float_linear) {
      this._features[_define.Feature.TEXTURE_HALF_FLOAT_LINEAR] = true;
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

    (0, _debug.debug)('WebGL2 device initialized.');
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

    const it = this._samplers.values();

    let res = it.next();

    while (!res.done) {
      res.value.destroy();
      res = it.next();
    }

    this._swapchain = null;
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
    const Ctor = info.type === _define.CommandBufferType.PRIMARY ? _webgl2PrimaryCommandBuffer.WebGL2PrimaryCommandBuffer : _webgl2CommandBuffer.WebGL2CommandBuffer;
    const cmdBuff = new Ctor();
    cmdBuff.initialize(info);
    return cmdBuff;
  }

  createSwapchain(info) {
    const swapchain = new _webgl2Swapchain.WebGL2Swapchain();
    this._swapchain = swapchain;
    swapchain.initialize(info);
    return swapchain;
  }

  createBuffer(info) {
    const buffer = new _webgl2Buffer.WebGL2Buffer();
    buffer.initialize(info);
    return buffer;
  }

  createTexture(info) {
    const texture = new _webgl2Texture.WebGL2Texture();
    texture.initialize(info);
    return texture;
  }

  createDescriptorSet(info) {
    const descriptorSet = new _webgl2DescriptorSet.WebGL2DescriptorSet();
    descriptorSet.initialize(info);
    return descriptorSet;
  }

  createShader(info) {
    const shader = new _webgl2Shader.WebGL2Shader();
    shader.initialize(info);
    return shader;
  }

  createInputAssembler(info) {
    const inputAssembler = new _webgl2InputAssembler.WebGL2InputAssembler();
    inputAssembler.initialize(info);
    return inputAssembler;
  }

  createRenderPass(info) {
    const renderPass = new _webgl2RenderPass.WebGL2RenderPass();
    renderPass.initialize(info);
    return renderPass;
  }

  createFramebuffer(info) {
    const framebuffer = new _webgl2Framebuffer.WebGL2Framebuffer();
    framebuffer.initialize(info);
    return framebuffer;
  }

  createDescriptorSetLayout(info) {
    const descriptorSetLayout = new _webgl2DescriptorSetLayout.WebGL2DescriptorSetLayout();
    descriptorSetLayout.initialize(info);
    return descriptorSetLayout;
  }

  createPipelineLayout(info) {
    const pipelineLayout = new _webgl2PipelineLayout.WebGL2PipelineLayout();
    pipelineLayout.initialize(info);
    return pipelineLayout;
  }

  createPipelineState(info) {
    const pipelineState = new _webgl2PipelineState.WebGL2PipelineState();
    pipelineState.initialize(info);
    return pipelineState;
  }

  createQueue(info) {
    const queue = new _webgl2Queue.WebGL2Queue();
    queue.initialize(info);
    return queue;
  }

  getSampler(info) {
    const hash = _sampler.Sampler.computeHash(info);

    if (!this._samplers.has(hash)) {
      this._samplers.set(hash, new _webgl2Sampler.WebGL2Sampler(info, hash));
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
    (0, _webgl2Commands.WebGL2CmdFuncCopyBuffersToTexture)(this, buffers, texture.gpuTexture, regions);
  }

  copyTextureToBuffers(texture, buffers, regions) {
    (0, _webgl2Commands.WebGL2CmdFuncCopyTextureToBuffers)(this, texture.gpuTexture, buffers, regions);
  }

  copyTexImagesToTexture(texImages, texture, regions) {
    (0, _webgl2Commands.WebGL2CmdFuncCopyTexImagesToTexture)(this, texImages, texture.gpuTexture, regions);
  }

}

exports.WebGL2Device = WebGL2Device;
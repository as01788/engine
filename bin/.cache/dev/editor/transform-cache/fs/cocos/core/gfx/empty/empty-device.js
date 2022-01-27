"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyDevice = void 0;

var _debug = require("../../platform/debug.js");

var _device = require("../base/device.js");

var _sampler = require("../base/states/sampler.js");

var _define = require("../base/define.js");

var _globalBarrier = require("../base/states/global-barrier.js");

var _textureBarrier = require("../base/states/texture-barrier.js");

var _emptyDescriptorSet = require("./empty-descriptor-set.js");

var _emptyBuffer = require("./empty-buffer.js");

var _emptyCommandBuffer = require("./empty-command-buffer.js");

var _emptyFramebuffer = require("./empty-framebuffer.js");

var _emptyInputAssembler = require("./empty-input-assembler.js");

var _emptyDescriptorSetLayout = require("./empty-descriptor-set-layout.js");

var _emptyPipelineLayout = require("./empty-pipeline-layout.js");

var _emptyPipelineState = require("./empty-pipeline-state.js");

var _emptyQueue = require("./empty-queue.js");

var _emptyRenderPass = require("./empty-render-pass.js");

var _emptyShader = require("./empty-shader.js");

var _emptySwapchain = require("./empty-swapchain.js");

var _emptyTexture = require("./empty-texture.js");

var _globalExports = require("../../global-exports.js");

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
class EmptyDevice extends _device.Device {
  initialize(info) {
    this._gfxAPI = _define.API.UNKNOWN;
    this._bindingMappingInfo = info.bindingMappingInfo;
    if (!this._bindingMappingInfo.bufferOffsets.length) this._bindingMappingInfo.bufferOffsets.push(0);
    if (!this._bindingMappingInfo.samplerOffsets.length) this._bindingMappingInfo.samplerOffsets.push(0);
    this._queue = this.createQueue(new _define.QueueInfo(_define.QueueType.GRAPHICS));
    this._cmdBuff = this.createCommandBuffer(new _define.CommandBufferInfo(this._queue));
    (0, _debug.debug)('Empty device initialized.');
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

  present() {}

  createCommandBuffer(info) {
    const cmdBuff = new _emptyCommandBuffer.EmptyCommandBuffer();
    cmdBuff.initialize(info);
    return cmdBuff;
  }

  createSwapchain(info) {
    const swapchain = new _emptySwapchain.EmptySwapchain();
    swapchain.initialize(info);
    return swapchain;
  }

  createBuffer(info) {
    const buffer = new _emptyBuffer.EmptyBuffer();
    buffer.initialize(info);
    return buffer;
  }

  createTexture(info) {
    const texture = new _emptyTexture.EmptyTexture();
    texture.initialize(info);
    return texture;
  }

  createDescriptorSet(info) {
    const descriptorSet = new _emptyDescriptorSet.EmptyDescriptorSet();
    descriptorSet.initialize(info);
    return descriptorSet;
  }

  createShader(info) {
    const shader = new _emptyShader.EmptyShader();
    shader.initialize(info);
    return shader;
  }

  createInputAssembler(info) {
    const inputAssembler = new _emptyInputAssembler.EmptyInputAssembler();
    inputAssembler.initialize(info);
    return inputAssembler;
  }

  createRenderPass(info) {
    const renderPass = new _emptyRenderPass.EmptyRenderPass();
    renderPass.initialize(info);
    return renderPass;
  }

  createFramebuffer(info) {
    const framebuffer = new _emptyFramebuffer.EmptyFramebuffer();
    framebuffer.initialize(info);
    return framebuffer;
  }

  createDescriptorSetLayout(info) {
    const descriptorSetLayout = new _emptyDescriptorSetLayout.EmptyDescriptorSetLayout();
    descriptorSetLayout.initialize(info);
    return descriptorSetLayout;
  }

  createPipelineLayout(info) {
    const pipelineLayout = new _emptyPipelineLayout.EmptyPipelineLayout();
    pipelineLayout.initialize(info);
    return pipelineLayout;
  }

  createPipelineState(info) {
    const pipelineState = new _emptyPipelineState.EmptyPipelineState();
    pipelineState.initialize(info);
    return pipelineState;
  }

  createQueue(info) {
    const queue = new _emptyQueue.EmptyQueue();
    queue.initialize(info);
    return queue;
  }

  getSampler(info) {
    const hash = _sampler.Sampler.computeHash(info);

    if (!this._samplers.has(hash)) {
      this._samplers.set(hash, new _sampler.Sampler(info, hash));
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

  copyBuffersToTexture(buffers, texture, regions) {}

  copyTextureToBuffers(texture, buffers, regions) {}

  copyTexImagesToTexture(texImages, texture, regions) {}

}

exports.EmptyDevice = EmptyDevice;
_globalExports.legacyCC.EmptyDevice = EmptyDevice;
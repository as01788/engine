"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLPrimaryCommandBuffer = void 0;

var _define = require("../base/define.js");

var _webglCommandBuffer = require("./webgl-command-buffer.js");

var _webglCommands = require("./webgl-commands.js");

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
class WebGLPrimaryCommandBuffer extends _webglCommandBuffer.WebGLCommandBuffer {
  beginRenderPass(renderPass, framebuffer, renderArea, clearColors, clearDepth, clearStencil) {
    (0, _webglCommands.WebGLCmdFuncBeginRenderPass)(_webglDefine.WebGLDeviceManager.instance, renderPass.gpuRenderPass, framebuffer.gpuFramebuffer, renderArea, clearColors, clearDepth, clearStencil);
    this._isInRenderPass = true;
  }

  draw(infoOrAssembler) {
    if (this._isInRenderPass) {
      if (this._isStateInvalied) {
        this.bindStates();
      }

      const info = 'drawInfo' in infoOrAssembler ? infoOrAssembler.drawInfo : infoOrAssembler;
      (0, _webglCommands.WebGLCmdFuncDraw)(_webglDefine.WebGLDeviceManager.instance, info);
      ++this._numDrawCalls;
      this._numInstances += info.instanceCount;
      const indexCount = info.indexCount || info.vertexCount;

      if (this._curGPUPipelineState) {
        const glPrimitive = this._curGPUPipelineState.glPrimitive;

        switch (glPrimitive) {
          case 0x0004:
            {
              // WebGLRenderingContext.TRIANGLES
              this._numTris += indexCount / 3 * Math.max(info.instanceCount, 1);
              break;
            }

          case 0x0005: // WebGLRenderingContext.TRIANGLE_STRIP

          case 0x0006:
            {
              // WebGLRenderingContext.TRIANGLE_FAN
              this._numTris += (indexCount - 2) * Math.max(info.instanceCount, 1);
              break;
            }

          default:
        }
      }
    } else {
      console.error('Command \'draw\' must be recorded inside a render pass.');
    }
  }

  setViewport(viewport) {
    const {
      stateCache: cache,
      gl
    } = _webglDefine.WebGLDeviceManager.instance;

    if (cache.viewport.left !== viewport.left || cache.viewport.top !== viewport.top || cache.viewport.width !== viewport.width || cache.viewport.height !== viewport.height) {
      gl.viewport(viewport.left, viewport.top, viewport.width, viewport.height);
      cache.viewport.left = viewport.left;
      cache.viewport.top = viewport.top;
      cache.viewport.width = viewport.width;
      cache.viewport.height = viewport.height;
    }
  }

  setScissor(scissor) {
    const {
      stateCache: cache,
      gl
    } = _webglDefine.WebGLDeviceManager.instance;

    if (cache.scissorRect.x !== scissor.x || cache.scissorRect.y !== scissor.y || cache.scissorRect.width !== scissor.width || cache.scissorRect.height !== scissor.height) {
      gl.scissor(scissor.x, scissor.y, scissor.width, scissor.height);
      cache.scissorRect.x = scissor.x;
      cache.scissorRect.y = scissor.y;
      cache.scissorRect.width = scissor.width;
      cache.scissorRect.height = scissor.height;
    }
  }

  updateBuffer(buffer, data, size) {
    if (!this._isInRenderPass) {
      const gpuBuffer = buffer.gpuBuffer;

      if (gpuBuffer) {
        let buffSize;

        if (size !== undefined) {
          buffSize = size;
        } else if (buffer.usage & _define.BufferUsageBit.INDIRECT) {
          buffSize = 0;
        } else {
          buffSize = data.byteLength;
        }

        (0, _webglCommands.WebGLCmdFuncUpdateBuffer)(_webglDefine.WebGLDeviceManager.instance, gpuBuffer, data, 0, buffSize);
      }
    } else {
      console.error('Command \'updateBuffer\' must be recorded outside a render pass.');
    }
  }

  copyBuffersToTexture(buffers, texture, regions) {
    if (!this._isInRenderPass) {
      const gpuTexture = texture.gpuTexture;

      if (gpuTexture) {
        (0, _webglCommands.WebGLCmdFuncCopyBuffersToTexture)(_webglDefine.WebGLDeviceManager.instance, buffers, gpuTexture, regions);
      }
    } else {
      console.error('Command \'copyBufferToTexture\' must be recorded outside a render pass.');
    }
  }

  execute(cmdBuffs, count) {
    for (let i = 0; i < count; ++i) {
      // actually they are secondary buffers, the cast here is only for type checking
      const webGLCmdBuff = cmdBuffs[i];
      (0, _webglCommands.WebGLCmdFuncExecuteCmds)(_webglDefine.WebGLDeviceManager.instance, webGLCmdBuff.cmdPackage);
      this._numDrawCalls += webGLCmdBuff._numDrawCalls;
      this._numInstances += webGLCmdBuff._numInstances;
      this._numTris += webGLCmdBuff._numTris;
    }
  }

  bindStates() {
    (0, _webglCommands.WebGLCmdFuncBindStates)(_webglDefine.WebGLDeviceManager.instance, this._curGPUPipelineState, this._curGPUInputAssembler, this._curGPUDescriptorSets, this._curDynamicOffsets, this._curDynamicStates);
    this._isStateInvalied = false;
  }

}

exports.WebGLPrimaryCommandBuffer = WebGLPrimaryCommandBuffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGL2Buffer = void 0;

var _buffer = require("../base/buffer.js");

var _define = require("../base/define.js");

var _webgl2Commands = require("./webgl2-commands.js");

var _webgl2Define = require("./webgl2-define.js");

var _webgl2GpuObjects = require("./webgl2-gpu-objects.js");

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
class WebGL2Buffer extends _buffer.Buffer {
  constructor(...args) {
    super(...args);
    this._gpuBuffer = null;
  }

  get gpuBuffer() {
    return this._gpuBuffer;
  }

  initialize(info) {
    if ('buffer' in info) {
      // buffer view
      this._isBufferView = true;
      const buffer = info.buffer;
      this._usage = buffer.usage;
      this._memUsage = buffer.memUsage;
      this._size = this._stride = info.range;
      this._count = 1;
      this._flags = buffer.flags;
      this._gpuBuffer = {
        usage: this._usage,
        memUsage: this._memUsage,
        size: this._size,
        stride: this._stride,
        buffer: null,
        indirects: buffer.gpuBuffer.indirects,
        glTarget: buffer.gpuBuffer.glTarget,
        glBuffer: buffer.gpuBuffer.glBuffer,
        glOffset: info.offset
      };
    } else {
      // native buffer
      this._usage = info.usage;
      this._memUsage = info.memUsage;
      this._size = info.size;
      this._stride = Math.max(info.stride || this._size, 1);
      this._count = this._size / this._stride;
      this._flags = info.flags;
      this._gpuBuffer = {
        usage: this._usage,
        memUsage: this._memUsage,
        size: this._size,
        stride: this._stride,
        buffer: null,
        indirects: new _webgl2GpuObjects.WebGL2IndirectDrawInfos(),
        glTarget: 0,
        glBuffer: null,
        glOffset: 0
      };
      (0, _webgl2Commands.WebGL2CmdFuncCreateBuffer)(_webgl2Define.WebGL2DeviceManager.instance, this._gpuBuffer);
      _webgl2Define.WebGL2DeviceManager.instance.memoryStatus.bufferSize += this._size;
    }
  }

  destroy() {
    if (this._gpuBuffer) {
      if (!this._isBufferView) {
        (0, _webgl2Commands.WebGL2CmdFuncDestroyBuffer)(_webgl2Define.WebGL2DeviceManager.instance, this._gpuBuffer);
        _webgl2Define.WebGL2DeviceManager.instance.memoryStatus.bufferSize -= this._size;
      }

      this._gpuBuffer = null;
    }
  }

  resize(size) {
    if (this._isBufferView) {
      console.warn('cannot resize buffer views!');
      return;
    }

    const oldSize = this._size;

    if (oldSize === size) {
      return;
    }

    this._size = size;
    this._count = this._size / this._stride;

    if (this._gpuBuffer) {
      this._gpuBuffer.size = size;

      if (size > 0) {
        (0, _webgl2Commands.WebGL2CmdFuncResizeBuffer)(_webgl2Define.WebGL2DeviceManager.instance, this._gpuBuffer);
        _webgl2Define.WebGL2DeviceManager.instance.memoryStatus.bufferSize -= oldSize;
        _webgl2Define.WebGL2DeviceManager.instance.memoryStatus.bufferSize += size;
      }
    }
  }

  update(buffer, size) {
    if (this._isBufferView) {
      console.warn('cannot update through buffer views!');
      return;
    }

    let buffSize;

    if (size !== undefined) {
      buffSize = size;
    } else if (this._usage & _define.BufferUsageBit.INDIRECT) {
      buffSize = 0;
    } else {
      buffSize = buffer.byteLength;
    }

    (0, _webgl2Commands.WebGL2CmdFuncUpdateBuffer)(_webgl2Define.WebGL2DeviceManager.instance, this._gpuBuffer, buffer, 0, buffSize);
  }

}

exports.WebGL2Buffer = WebGL2Buffer;
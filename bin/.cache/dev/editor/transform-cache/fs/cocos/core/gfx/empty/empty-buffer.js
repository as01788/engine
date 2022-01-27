"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyBuffer = void 0;

var _buffer = require("../base/buffer.js");

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
class EmptyBuffer extends _buffer.Buffer {
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
    } else {
      // native buffer
      this._usage = info.usage;
      this._memUsage = info.memUsage;
      this._size = info.size;
      this._stride = Math.max(info.stride || this._size, 1);
      this._count = this._size / this._stride;
      this._flags = info.flags;
    }
  }

  destroy() {}

  resize(size) {}

  update(buffer, size) {}

}

exports.EmptyBuffer = EmptyBuffer;
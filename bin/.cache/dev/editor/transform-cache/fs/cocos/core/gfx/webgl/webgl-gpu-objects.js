"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLIndirectDrawInfos = void 0;

var _bits = require("../../math/bits.js");

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
class WebGLIndirectDrawInfos {
  // staging buffer
  constructor() {
    this.counts = void 0;
    this.offsets = void 0;
    this.instances = void 0;
    this.drawCount = 0;
    this.drawByIndex = false;
    this.instancedDraw = false;
    this.byteOffsets = void 0;
    this._capacity = 4;
    this.counts = new Int32Array(this._capacity);
    this.offsets = new Int32Array(this._capacity);
    this.instances = new Int32Array(this._capacity);
    this.byteOffsets = new Int32Array(this._capacity);
  }

  clearDraws() {
    this.drawCount = 0;
    this.drawByIndex = false;
    this.instancedDraw = false;
  }

  setDrawInfo(idx, info) {
    this._ensureCapacity(idx);

    this.drawByIndex = info.indexCount > 0;
    this.instancedDraw = !!info.instanceCount;
    this.drawCount = Math.max(idx + 1, this.drawCount);

    if (this.drawByIndex) {
      this.counts[idx] = info.indexCount;
      this.offsets[idx] = info.firstIndex;
    } else {
      this.counts[idx] = info.vertexCount;
      this.offsets[idx] = info.firstVertex;
    }

    this.instances[idx] = Math.max(1, info.instanceCount);
  }

  _ensureCapacity(target) {
    if (this._capacity > target) return;
    this._capacity = (0, _bits.nextPow2)(target);
    const counts = new Int32Array(this._capacity);
    const offsets = new Int32Array(this._capacity);
    const instances = new Int32Array(this._capacity);
    this.byteOffsets = new Int32Array(this._capacity);
    counts.set(this.counts);
    offsets.set(this.offsets);
    instances.set(this.instances);
    this.counts = counts;
    this.offsets = offsets;
    this.instances = instances;
  }

}

exports.WebGLIndirectDrawInfos = WebGLIndirectDrawInfos;
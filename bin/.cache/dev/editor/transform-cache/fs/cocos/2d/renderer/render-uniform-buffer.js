"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UILocalUBOManger = exports.UILocalBuffer = void 0;

var _index = require("../../core/index.js");

var _define = require("../../core/gfx/base/define.js");

class UILocalBuffer {
  // index = instanceID + uboIndex * _UIPerUBO
  get prevUBOIndex() {
    return this._prevUBOIndex;
  }

  get uniformBufferStride() {
    return this._uniformBufferStride;
  }

  get prevInstanceID() {
    return this._prevInstanceID;
  }

  constructor(device, hash, UIPerUBO, vec4PerUI, poolIndex) {
    this._device = void 0;
    this._vec4PerUI = void 0;
    this._UIPerUBO = void 0;
    this._uniformBufferStride = void 0;
    this._uniformBufferElementCount = void 0;
    this._uniformBuffer = void 0;
    this._firstUniformBufferView = void 0;
    this._uniformBufferData = void 0;
    this._prevUBOIndex = 0;
    this._prevInstanceID = -1;
    this.hash = void 0;
    this.poolIndex = void 0;
    this._vec4PerUI = vec4PerUI;
    this._UIPerUBO = UIPerUBO;
    this._device = device;
    this.hash = hash;
    this.poolIndex = poolIndex;
    const alignment = this._device.capabilities.uboOffsetAlignment;
    const unalignedStride = Float32Array.BYTES_PER_ELEMENT * 4 * vec4PerUI * UIPerUBO;
    this._uniformBufferStride = Math.ceil(unalignedStride / alignment) * alignment; // memory alignment

    this._uniformBufferElementCount = this._uniformBufferStride / Float32Array.BYTES_PER_ELEMENT;
    this._uniformBuffer = this._device.createBuffer(new _define.BufferInfo(_define.BufferUsageBit.UNIFORM | _define.BufferUsageBit.TRANSFER_DST, _define.MemoryUsageBit.DEVICE, this._uniformBufferStride * UILocalBuffer.UBO_COUNT, this._uniformBufferStride));
    this._firstUniformBufferView = this._device.createBuffer(new _define.BufferViewInfo(this._uniformBuffer, 0, unalignedStride));
    this._uniformBufferData = new Float32Array(this._uniformBufferElementCount * UILocalBuffer.UBO_COUNT);
  }

  checkFull() {
    return this._prevUBOIndex >= UILocalBuffer.UBO_COUNT - 1 && this._prevInstanceID + 1 >= this._UIPerUBO;
  }

  updateIndex() {
    if (this._prevInstanceID + 1 >= this._UIPerUBO) {
      ++this._prevUBOIndex;
      this._prevInstanceID = 0;
    } else {
      ++this._prevInstanceID;
    }
  }

  destroy() {}

  upload(t, r, s, to, c, mode, uvExtra, fillType) {
    this.updateIndex();
    const data = this._uniformBufferData;
    let offset = this._prevInstanceID * this._vec4PerUI * 4 + this._uniformBufferElementCount * this._prevUBOIndex;
    data[offset + 0] = t.x;
    data[offset + 1] = t.y;
    data[offset + 2] = t.z;
    data[offset + 3] = c.r + Math.min(c.y, 0.999); // rotation

    offset += 4;
    data[offset + 0] = r.x;
    data[offset + 1] = r.y;
    data[offset + 2] = r.z;
    data[offset + 3] = r.w; // scale & BA & Mode.progress

    offset += 4;
    data[offset + 0] = s.x;
    data[offset + 1] = s.y;
    data[offset + 2] = c.b + Math.min(c.w, 0.999);
    data[offset + 3] = mode + Math.min(fillType, 0.999); // tilling offset

    offset += 4;
    data[offset + 0] = to[0];
    data[offset + 1] = to[1];
    data[offset + 2] = to[2];
    data[offset + 3] = to[3];
    offset += 4; // uvExtra

    if (mode > 0) {
      data[offset + 0] = uvExtra.x;
      data[offset + 1] = uvExtra.y;
      data[offset + 2] = uvExtra.z;
      data[offset + 3] = uvExtra.w;
    }
  }

  getBufferView() {
    return this._firstUniformBufferView;
  }

  updateBuffer() {
    this._uniformBuffer.update(this._uniformBufferData);
  }

  reset() {
    this._prevUBOIndex = 0;
    this._prevInstanceID = -1;
  }

  updateDataTRSByDirty(instanceID, UBOIndex, t, r, s) {
    let offset = instanceID * this._vec4PerUI * 4 + this._uniformBufferElementCount * UBOIndex;
    const data = this._uniformBufferData;
    data[offset + 0] = t.x;
    data[offset + 1] = t.y;
    data[offset + 2] = t.z;

    if (r) {
      offset += 4;
      data[offset + 0] = r.x;
      data[offset + 1] = r.y;
      data[offset + 2] = r.z;
      data[offset + 3] = r.w;
    }

    if (s) {
      offset += 4;
      data[offset + 0] = s.x;
      data[offset + 1] = s.y;
    }
  }

  updateDataByDirty(instanceID, UBOIndex, c, mode, to, uvExtra, fillType) {
    let offset = instanceID * this._vec4PerUI * 4 + this._uniformBufferElementCount * UBOIndex;
    const data = this._uniformBufferData;
    data[offset + 3] = c.r + Math.min(c.y, 0.999);
    offset += 8;
    data[offset + 2] = c.b + Math.min(c.w, 0.999);
    data[offset + 3] = mode + Math.min(fillType, 0.999);
    offset += 4;
    data[offset + 0] = to[0];
    data[offset + 1] = to[1];
    data[offset + 2] = to[2];
    data[offset + 3] = to[3];
    offset += 4;

    if (mode > 0) {
      data[offset + 0] = uvExtra.x;
      data[offset + 1] = uvExtra.y;
      data[offset + 2] = uvExtra.z;
      data[offset + 3] = uvExtra.w;
    }
  }

}

exports.UILocalBuffer = UILocalBuffer;
UILocalBuffer.UBO_COUNT = 10;

class UILocalUBOManger {
  // UIPerUBO -> buffer[]
  constructor(device) {
    this._localBuffers = [];
    this._device = void 0;
    this._element = null;
    this._device = device;
  } // each quad once


  upload(t, r, s, to, c, mode, UIPerUBO, vec4PerUI, uvExtra, fillType) {
    // find/creat UILocalBuffer with UIPerUBO
    for (let i = 0; i < this._localBuffers.length; i++) {
      if (this._localBuffers[i].key === UIPerUBO) {
        this._element = this._localBuffers[i];
      }
    }

    if (this._element === null) {
      this._localBuffers.push({
        key: UIPerUBO,
        value: {
          pool: [this._createLocalBuffer(UIPerUBO, vec4PerUI, 0)],
          currentIdx: 0
        }
      });

      this._element = this._localBuffers[this._localBuffers.length - 1];
    }

    const localBufferPool = this._element.value;

    while (localBufferPool.pool[localBufferPool.currentIdx].checkFull()) {
      if (++localBufferPool.currentIdx >= localBufferPool.pool.length) {
        // create with hash
        localBufferPool.pool.push(this._createLocalBuffer(UIPerUBO, vec4PerUI, localBufferPool.currentIdx));
      }
    }

    const localBuffer = localBufferPool.pool[localBufferPool.currentIdx];
    localBuffer.upload(t, r, s, to, c, mode, uvExtra, fillType);
    return localBuffer;
  }

  updateBuffer() {
    const length = this._localBuffers.length;
    let res;

    for (let i = 0; i < length; ++i) {
      res = this._localBuffers[i].value;

      for (let j = 0; j <= res.currentIdx; ++j) {
        res.pool[j].updateBuffer();
      }
    }
  }

  reset() {
    this._element = null;
    const length = this._localBuffers.length;
    let res;

    for (let i = 0; i < length; ++i) {
      res = this._localBuffers[i].value;

      for (let j = 0; j <= res.currentIdx; ++j) {
        res.pool[j].reset();
      }

      res.currentIdx = 0;
    }
  }

  _createLocalBuffer(capacity, vec4PerUI, idx) {
    const hash = (0, _index.murmurhash2_32_gc)(`UIUBO-${capacity}-${idx}`, 666);
    return new UILocalBuffer(this._device, hash, capacity, vec4PerUI, idx);
  }

}

exports.UILocalUBOManger = UILocalUBOManger;
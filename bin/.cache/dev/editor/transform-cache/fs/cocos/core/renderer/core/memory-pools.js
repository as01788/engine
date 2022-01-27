"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AABBPool = exports.AABBView = exports.PassPool = exports.PassView = exports.NodePool = exports.NodeView = exports.NULL_HANDLE = exports.PoolType = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _nativePools = require("./native-pools.js");

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
 * @hidden
 */
const contains = (a, t) => {
  for (let i = 0; i < a.length; ++i) {
    if (a[i] === t) return true;
  }

  return false;
};

var BufferDataType;

(function (BufferDataType) {
  BufferDataType[BufferDataType["UINT32"] = 0] = "UINT32";
  BufferDataType[BufferDataType["FLOAT32"] = 1] = "FLOAT32";
  BufferDataType[BufferDataType["NEVER"] = 2] = "NEVER";
})(BufferDataType || (BufferDataType = {}));

class BufferPool {
  // naming convension:
  // this._bufferViews[chunk][entry][element]
  constructor(poolType, dataType, dataMembers, enumType, entryBits = 8) {
    this._dataType = void 0;
    this._dataMembers = void 0;
    this._elementCount = void 0;
    this._entryBits = void 0;
    this._stride = void 0;
    this._entriesPerChunk = void 0;
    this._entryMask = void 0;
    this._chunkMask = void 0;
    this._poolFlag = void 0;
    this._arrayBuffers = [];
    this._freeLists = [];
    this._uint32BufferViews = [];
    this._float32BufferViews = [];
    this._hasUint32 = false;
    this._hasFloat32 = false;
    this._nativePool = void 0;
    this._elementCount = enumType.COUNT;
    this._entryBits = entryBits;
    this._dataType = dataType;
    this._dataMembers = dataMembers;
    const bytesPerElement = 4;
    this._stride = bytesPerElement * this._elementCount;
    this._entriesPerChunk = 1 << entryBits;
    this._entryMask = this._entriesPerChunk - 1;
    this._poolFlag = 1 << 30;
    this._chunkMask = ~(this._entryMask | this._poolFlag);
    this._nativePool = new _nativePools.NativeBufferPool(poolType, entryBits, this._stride);
    let type = BufferDataType.NEVER;
    let hasFloat32 = false;
    let hasUint32 = false;

    for (const e in dataType) {
      hasFloat32 = this._hasFloat32;
      hasUint32 = this._hasUint32;

      if (hasUint32 && hasFloat32) {
        break;
      }

      type = dataType[e];

      if (!hasFloat32 && type === BufferDataType.FLOAT32) {
        this._hasFloat32 = true;
      } else if (!hasUint32 && type === BufferDataType.UINT32) {
        this._hasUint32 = true;
      }
    }
  }

  alloc() {
    let i = 0;

    for (; i < this._freeLists.length; i++) {
      const list = this._freeLists[i];

      if (list.length) {
        const j = list[list.length - 1];
        list.length--;
        return (i << this._entryBits) + j + this._poolFlag;
      }
    } // add a new chunk


    const buffer = this._nativePool.allocateNewChunk();

    const float32BufferViews = [];
    const uint32BufferViews = [];
    const freeList = [];
    const hasFloat32 = this._hasFloat32;
    const hasUint32 = this._hasUint32;

    for (let j = 0; j < this._entriesPerChunk; j++) {
      if (hasFloat32) {
        float32BufferViews.push(new Float32Array(buffer, this._stride * j, this._elementCount));
      }

      if (hasUint32) {
        uint32BufferViews.push(new Uint32Array(buffer, this._stride * j, this._elementCount));
      }

      if (j) {
        freeList.push(j);
      }
    }

    if (hasUint32) {
      this._uint32BufferViews.push(uint32BufferViews);
    }

    if (hasFloat32) {
      this._float32BufferViews.push(float32BufferViews);
    }

    this._freeLists.push(freeList);

    this._arrayBuffers.push(buffer);

    const handle = (i << this._entryBits) + this._poolFlag;
    return handle; // guarantees the handle is always not zero
  }

  getBuffer(handle) {
    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;
    const bufferViews = this._hasFloat32 ? this._float32BufferViews : this._uint32BufferViews;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freeLists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return [];
    }

    return bufferViews[chunk][entry];
  }

  getTypedArray(handle, element) {
    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;
    const bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freeLists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return [];
    }

    const index = element;
    const view = bufferViews[chunk][entry];
    const count = this._dataMembers[element];
    return view.subarray(index, index + count);
  }

  free(handle) {
    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= this._freeLists.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freeLists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return;
    }

    const bufferViews = this._hasUint32 ? this._uint32BufferViews : this._float32BufferViews;
    bufferViews[chunk][entry].fill(0);

    this._freeLists[chunk].push(entry);
  }

}

let PoolType;
exports.PoolType = PoolType;

(function (PoolType) {
  PoolType[PoolType["NODE"] = 0] = "NODE";
  PoolType[PoolType["PASS"] = 1] = "PASS";
  PoolType[PoolType["AABB"] = 2] = "AABB";
})(PoolType || (exports.PoolType = PoolType = {}));

const NULL_HANDLE = 0;
exports.NULL_HANDLE = NULL_HANDLE;
let NodeView;
exports.NodeView = NodeView;

(function (NodeView) {
  NodeView[NodeView["DIRTY_FLAG"] = 0] = "DIRTY_FLAG";
  NodeView[NodeView["LAYER"] = 1] = "LAYER";
  NodeView[NodeView["WORLD_SCALE"] = 2] = "WORLD_SCALE";
  NodeView[NodeView["WORLD_POSITION"] = 5] = "WORLD_POSITION";
  NodeView[NodeView["WORLD_ROTATION"] = 8] = "WORLD_ROTATION";
  NodeView[NodeView["WORLD_MATRIX"] = 12] = "WORLD_MATRIX";
  NodeView[NodeView["LOCAL_SCALE"] = 28] = "LOCAL_SCALE";
  NodeView[NodeView["LOCAL_POSITION"] = 31] = "LOCAL_POSITION";
  NodeView[NodeView["LOCAL_ROTATION"] = 34] = "LOCAL_ROTATION";
  NodeView[NodeView["COUNT"] = 38] = "COUNT";
})(NodeView || (exports.NodeView = NodeView = {}));

const NodeViewDataType = {
  [NodeView.DIRTY_FLAG]: BufferDataType.UINT32,
  [NodeView.LAYER]: BufferDataType.UINT32,
  [NodeView.WORLD_SCALE]: BufferDataType.FLOAT32,
  [NodeView.WORLD_POSITION]: BufferDataType.FLOAT32,
  [NodeView.WORLD_ROTATION]: BufferDataType.FLOAT32,
  [NodeView.WORLD_MATRIX]: BufferDataType.FLOAT32,
  [NodeView.LOCAL_SCALE]: BufferDataType.FLOAT32,
  [NodeView.LOCAL_POSITION]: BufferDataType.FLOAT32,
  [NodeView.LOCAL_ROTATION]: BufferDataType.FLOAT32,
  [NodeView.COUNT]: BufferDataType.NEVER
};
const NodeViewDataMembers = {
  [NodeView.DIRTY_FLAG]: NodeView.LAYER - NodeView.DIRTY_FLAG,
  [NodeView.LAYER]: NodeView.WORLD_SCALE - NodeView.LAYER,
  [NodeView.WORLD_SCALE]: NodeView.WORLD_POSITION - NodeView.WORLD_SCALE,
  [NodeView.WORLD_POSITION]: NodeView.WORLD_ROTATION - NodeView.WORLD_POSITION,
  [NodeView.WORLD_ROTATION]: NodeView.WORLD_MATRIX - NodeView.WORLD_ROTATION,
  [NodeView.WORLD_MATRIX]: NodeView.LOCAL_SCALE - NodeView.WORLD_MATRIX,
  [NodeView.LOCAL_SCALE]: NodeView.LOCAL_POSITION - NodeView.LOCAL_SCALE,
  [NodeView.LOCAL_POSITION]: NodeView.LOCAL_ROTATION - NodeView.LOCAL_POSITION,
  [NodeView.LOCAL_ROTATION]: NodeView.COUNT - NodeView.LOCAL_ROTATION,
  [NodeView.COUNT]: 1
};
const NodePool = new BufferPool(PoolType.NODE, NodeViewDataType, NodeViewDataMembers, NodeView);
exports.NodePool = NodePool;
let PassView;
exports.PassView = PassView;

(function (PassView) {
  PassView[PassView["PRIORITY"] = 0] = "PRIORITY";
  PassView[PassView["STAGE"] = 1] = "STAGE";
  PassView[PassView["PHASE"] = 2] = "PHASE";
  PassView[PassView["PRIMITIVE"] = 3] = "PRIMITIVE";
  PassView[PassView["BATCHING_SCHEME"] = 4] = "BATCHING_SCHEME";
  PassView[PassView["DYNAMIC_STATE"] = 5] = "DYNAMIC_STATE";
  PassView[PassView["HASH"] = 6] = "HASH";
  PassView[PassView["COUNT"] = 7] = "COUNT";
})(PassView || (exports.PassView = PassView = {}));

const PassViewDataType = {
  [PassView.PRIORITY]: BufferDataType.UINT32,
  [PassView.STAGE]: BufferDataType.UINT32,
  [PassView.PHASE]: BufferDataType.UINT32,
  [PassView.PRIMITIVE]: BufferDataType.UINT32,
  [PassView.BATCHING_SCHEME]: BufferDataType.UINT32,
  [PassView.DYNAMIC_STATE]: BufferDataType.UINT32,
  [PassView.HASH]: BufferDataType.UINT32,
  [PassView.COUNT]: BufferDataType.NEVER
};
const PassViewDataMembers = {
  [PassView.PRIORITY]: PassView.STAGE - PassView.PRIORITY,
  [PassView.STAGE]: PassView.PHASE - PassView.STAGE,
  [PassView.PHASE]: PassView.PRIMITIVE - PassView.PHASE,
  [PassView.PRIMITIVE]: PassView.BATCHING_SCHEME - PassView.PRIMITIVE,
  [PassView.BATCHING_SCHEME]: PassView.DYNAMIC_STATE - PassView.BATCHING_SCHEME,
  [PassView.DYNAMIC_STATE]: PassView.HASH - PassView.DYNAMIC_STATE,
  [PassView.HASH]: PassView.COUNT - PassView.HASH,
  [PassView.COUNT]: 1
};
const PassPool = new BufferPool(PoolType.PASS, PassViewDataType, PassViewDataMembers, PassView);
exports.PassPool = PassPool;
let AABBView;
exports.AABBView = AABBView;

(function (AABBView) {
  AABBView[AABBView["CENTER"] = 0] = "CENTER";
  AABBView[AABBView["HALFEXTENTS"] = 3] = "HALFEXTENTS";
  AABBView[AABBView["COUNT"] = 6] = "COUNT";
})(AABBView || (exports.AABBView = AABBView = {}));

const AABBViewDataType = {
  [AABBView.CENTER]: BufferDataType.FLOAT32,
  [AABBView.HALFEXTENTS]: BufferDataType.FLOAT32,
  [AABBView.COUNT]: BufferDataType.NEVER
};
const AABBViewDataMembers = {
  [AABBView.CENTER]: AABBView.HALFEXTENTS - AABBView.CENTER,
  [AABBView.HALFEXTENTS]: AABBView.COUNT - AABBView.HALFEXTENTS,
  [AABBView.COUNT]: 1
};
const AABBPool = new BufferPool(PoolType.AABB, AABBViewDataType, AABBViewDataMembers, AABBView);
exports.AABBPool = AABBPool;
System.register("q-bundled:///fs/cocos/core/renderer/core/native-pools.js", [], function (_export, _context) {
  "use strict";

  var NativeBufferPool, NativeObjectPool, NativeBufferAllocator;
  return {
    setters: [],
    execute: function () {
      /*
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
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

      /**
       * @packageDocumentation
       * @hidden
       */
      _export("NativeBufferPool", NativeBufferPool = /*#__PURE__*/function () {
        function NativeBufferPool(dataType, entryBits, stride) {
          this._arrayBuffers = [];
          this._chunkSize = void 0;
          this._chunkSize = stride * (1 << entryBits);
        }

        var _proto = NativeBufferPool.prototype;

        _proto.allocateNewChunk = function allocateNewChunk() {
          return new ArrayBuffer(this._chunkSize);
        };

        return NativeBufferPool;
      }());

      _export("NativeObjectPool", NativeObjectPool = /*#__PURE__*/function () {
        function NativeObjectPool(dataType, array) {}

        var _proto2 = NativeObjectPool.prototype;

        _proto2.bind = function bind(index, obj) {};

        return NativeObjectPool;
      }());

      _export("NativeBufferAllocator", NativeBufferAllocator = /*#__PURE__*/function () {
        function NativeBufferAllocator(poolType) {}

        var _proto3 = NativeBufferAllocator.prototype;

        _proto3.alloc = function alloc(index, bytes) {
          return new ArrayBuffer(bytes);
        };

        _proto3.free = function free(index) {};

        return NativeBufferAllocator;
      }());
    }
  };
});
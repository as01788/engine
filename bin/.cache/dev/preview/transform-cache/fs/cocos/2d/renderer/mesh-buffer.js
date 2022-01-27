System.register("q-bundled:///fs/cocos/2d/renderer/mesh-buffer.js", ["../../core/gfx/index.js", "../../core/memop/scalable-container.js", "./vertex-format.js"], function (_export, _context) {
  "use strict";

  var BufferUsageBit, MemoryUsageBit, InputAssemblerInfo, BufferInfo, ScalableContainer, getComponentPerVertex, MeshBuffer;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreGfxIndexJs) {
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
      InputAssemblerInfo = _coreGfxIndexJs.InputAssemblerInfo;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
    }, function (_coreMemopScalableContainerJs) {
      ScalableContainer = _coreMemopScalableContainerJs.ScalableContainer;
    }, function (_vertexFormatJs) {
      getComponentPerVertex = _vertexFormatJs.getComponentPerVertex;
    }],
    execute: function () {
      _export("MeshBuffer", MeshBuffer = /*#__PURE__*/function (_ScalableContainer) {
        _inheritsLoose(MeshBuffer, _ScalableContainer);

        function MeshBuffer(batcher) {
          var _this;

          _this = _ScalableContainer.call(this) || this;
          _this.vData = null;
          _this.iData = null;
          _this.byteStart = 0;
          _this.byteOffset = 0;
          _this.indicesStart = 0;
          _this.indicesOffset = 0;
          _this.vertexStart = 0;
          _this.vertexOffset = 0;
          _this.lastByteOffset = 1;
          _this._attributes = null;
          _this._vertexBuffers = [];
          _this._indexBuffer = null;
          _this._iaInfo = null;
          _this._batcher = void 0;
          _this._dirty = false;
          _this._vertexFormatBytes = 0;
          _this._initVDataCount = 0;
          _this._initIDataCount = 256 * 6;
          _this._outOfCallback = null;
          _this._hInputAssemblers = [];
          _this._nextFreeIAHandle = 0;
          _this._lastUsedVDataSize = 0;
          _this._lastUsedIDataSize = 0;
          _this._batcher = batcher;
          return _this;
        }

        var _proto = MeshBuffer.prototype;

        _proto.initialize = function initialize(attrs, outOfCallback) {
          this._outOfCallback = outOfCallback;
          var formatBytes = getComponentPerVertex(attrs);
          this._vertexFormatBytes = formatBytes * Float32Array.BYTES_PER_ELEMENT;
          this._initVDataCount = 256 * this._vertexFormatBytes;
          var vbStride = Float32Array.BYTES_PER_ELEMENT * formatBytes;

          if (!this.vertexBuffers.length) {
            this.vertexBuffers.push(this._batcher.device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, vbStride, vbStride)));
          }

          var ibStride = Uint16Array.BYTES_PER_ELEMENT;

          if (!this.indexBuffer) {
            this._indexBuffer = this._batcher.device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, ibStride, ibStride));
          }

          this._attributes = attrs;
          this._iaInfo = new InputAssemblerInfo(this.attributes, this.vertexBuffers, this.indexBuffer); // for recycle pool using purpose --

          if (!this.vData || !this.iData) {
            this._reallocBuffer();
          } // ----------

        };

        _proto.request = function request(vertexCount, indicesCount) {
          if (vertexCount === void 0) {
            vertexCount = 4;
          }

          if (indicesCount === void 0) {
            indicesCount = 6;
          }

          this.lastByteOffset = this.byteOffset;
          var byteOffset = this.byteOffset + vertexCount * this._vertexFormatBytes;
          var indicesOffset = this.indicesOffset + indicesCount;

          if (vertexCount + this.vertexOffset > 65535) {
            if (this._outOfCallback) {
              this._outOfCallback.call(this._batcher, vertexCount, indicesCount);
            }

            return false;
          }

          var byteLength = this.vData.byteLength;
          var indicesLength = this.iData.length;

          if (byteOffset > byteLength || indicesOffset > indicesLength) {
            while (byteLength < byteOffset || indicesLength < indicesOffset) {
              this._initVDataCount *= 2;
              this._initIDataCount *= 2;
              byteLength = this._initVDataCount * 4;
              indicesLength = this._initIDataCount;
            }

            this._reallocBuffer();
          }

          this.vertexOffset += vertexCount;
          this.indicesOffset += indicesCount;
          this.byteOffset = byteOffset;
          this._dirty = true;
          return true;
        };

        _proto.reset = function reset() {
          this.byteStart = 0;
          this.byteOffset = 0;
          this.indicesStart = 0;
          this.indicesOffset = 0;
          this.vertexStart = 0;
          this.vertexOffset = 0;
          this.lastByteOffset = 0;
          this._nextFreeIAHandle = 0;
          this._dirty = false;
        };

        _proto.tryShrink = function tryShrink() {
          if (this._dirty || !this.vData || !this.iData) return;

          if (this.vData.byteLength >> 2 > this._lastUsedVDataSize && this.iData.length >> 2 > this._lastUsedIDataSize) {
            var vDataCount = Math.max(256 * this._vertexFormatBytes, this._initVDataCount >> 1);
            var iDataCount = Math.max(256 * 6, this._initIDataCount >> 1);

            if (vDataCount !== this._initVDataCount || iDataCount !== this._initIDataCount) {
              this._initIDataCount = iDataCount;
              this._initVDataCount = vDataCount;

              this._reallocBuffer();
            }
          }
        };

        _proto.destroy = function destroy() {
          this._attributes = null;
          this.vertexBuffers[0].destroy();
          this.vertexBuffers.length = 0;
          this.indexBuffer.destroy();
          this._indexBuffer = null;

          for (var i = 0; i < this._hInputAssemblers.length; i++) {
            this._hInputAssemblers[i].destroy();
          }

          this._hInputAssemblers.length = 0;

          _ScalableContainer.prototype.destroy.call(this);
        };

        _proto.recordBatch = function recordBatch() {
          var vCount = this.indicesOffset - this.indicesStart;

          if (!vCount) {
            return null;
          }

          if (this._hInputAssemblers.length <= this._nextFreeIAHandle) {
            this._hInputAssemblers.push(this._batcher.device.createInputAssembler(this._iaInfo));
          }

          var ia = this._hInputAssemblers[this._nextFreeIAHandle++];
          ia.firstIndex = this.indicesStart;
          ia.indexCount = vCount;
          return ia;
        };

        _proto.uploadBuffers = function uploadBuffers() {
          if (this.byteOffset === 0 || !this._dirty) {
            return;
          }

          var verticesData = new Float32Array(this.vData.buffer, 0, this.byteOffset >> 2);
          var indicesData = new Uint16Array(this.iData.buffer, 0, this.indicesOffset);

          if (this.byteOffset > this.vertexBuffers[0].size) {
            this.vertexBuffers[0].resize(this.byteOffset);
          }

          this.vertexBuffers[0].update(verticesData);

          if (this.indicesOffset * 2 > this.indexBuffer.size) {
            this.indexBuffer.resize(this.indicesOffset * 2);
          }

          this.indexBuffer.update(indicesData);
          this._lastUsedVDataSize = this.byteOffset;
          this._lastUsedIDataSize = this.indicesOffset;
          this._dirty = false;
        };

        _proto._reallocBuffer = function _reallocBuffer() {
          this._reallocVData(true);

          this._reallocIData(true);
        };

        _proto._reallocVData = function _reallocVData(copyOldData) {
          var oldVData;

          if (this.vData) {
            oldVData = new Uint8Array(this.vData.buffer);
          }

          this.vData = new Float32Array(this._initVDataCount);

          if (oldVData && copyOldData) {
            var newData = new Uint8Array(this.vData.buffer);

            for (var i = 0, l = oldVData.length; i < l; i++) {
              newData[i] = oldVData[i];
            }
          }
        };

        _proto._reallocIData = function _reallocIData(copyOldData) {
          var oldIData = this.iData;
          this.iData = new Uint16Array(this._initIDataCount);

          if (oldIData && copyOldData) {
            var iData = this.iData;

            for (var i = 0, l = oldIData.length; i < l; i++) {
              iData[i] = oldIData[i];
            }
          }
        };

        _createClass(MeshBuffer, [{
          key: "attributes",
          get: function get() {
            return this._attributes;
          }
        }, {
          key: "vertexBuffers",
          get: function get() {
            return this._vertexBuffers;
          }
        }, {
          key: "indexBuffer",
          get: function get() {
            return this._indexBuffer;
          }
        }, {
          key: "vertexFormatBytes",
          get: function get() {
            return this._vertexFormatBytes;
          }
        }]);

        return MeshBuffer;
      }(ScalableContainer));

      MeshBuffer.OPACITY_OFFSET = 8;
    }
  };
});
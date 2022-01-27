System.register("q-bundled:///fs/cocos/2d/renderer/render-uniform-buffer.js", ["../../core/index.js", "../../core/gfx/base/define.js"], function (_export, _context) {
  "use strict";

  var murmurhash2_32_gc, BufferInfo, BufferUsageBit, BufferViewInfo, MemoryUsageBit, UILocalBuffer, UILocalUBOManger;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      murmurhash2_32_gc = _coreIndexJs.murmurhash2_32_gc;
    }, function (_coreGfxBaseDefineJs) {
      BufferInfo = _coreGfxBaseDefineJs.BufferInfo;
      BufferUsageBit = _coreGfxBaseDefineJs.BufferUsageBit;
      BufferViewInfo = _coreGfxBaseDefineJs.BufferViewInfo;
      MemoryUsageBit = _coreGfxBaseDefineJs.MemoryUsageBit;
    }],
    execute: function () {
      _export("UILocalBuffer", UILocalBuffer = /*#__PURE__*/function () {
        function UILocalBuffer(device, hash, UIPerUBO, vec4PerUI, poolIndex) {
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
          var alignment = this._device.capabilities.uboOffsetAlignment;
          var unalignedStride = Float32Array.BYTES_PER_ELEMENT * 4 * vec4PerUI * UIPerUBO;
          this._uniformBufferStride = Math.ceil(unalignedStride / alignment) * alignment; // memory alignment

          this._uniformBufferElementCount = this._uniformBufferStride / Float32Array.BYTES_PER_ELEMENT;
          this._uniformBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, this._uniformBufferStride * UILocalBuffer.UBO_COUNT, this._uniformBufferStride));
          this._firstUniformBufferView = this._device.createBuffer(new BufferViewInfo(this._uniformBuffer, 0, unalignedStride));
          this._uniformBufferData = new Float32Array(this._uniformBufferElementCount * UILocalBuffer.UBO_COUNT);
        }

        var _proto = UILocalBuffer.prototype;

        _proto.checkFull = function checkFull() {
          return this._prevUBOIndex >= UILocalBuffer.UBO_COUNT - 1 && this._prevInstanceID + 1 >= this._UIPerUBO;
        };

        _proto.updateIndex = function updateIndex() {
          if (this._prevInstanceID + 1 >= this._UIPerUBO) {
            ++this._prevUBOIndex;
            this._prevInstanceID = 0;
          } else {
            ++this._prevInstanceID;
          }
        };

        _proto.destroy = function destroy() {};

        _proto.upload = function upload(t, r, s, to, c, mode, uvExtra, fillType) {
          this.updateIndex();
          var data = this._uniformBufferData;
          var offset = this._prevInstanceID * this._vec4PerUI * 4 + this._uniformBufferElementCount * this._prevUBOIndex;
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
        };

        _proto.getBufferView = function getBufferView() {
          return this._firstUniformBufferView;
        };

        _proto.updateBuffer = function updateBuffer() {
          this._uniformBuffer.update(this._uniformBufferData);
        };

        _proto.reset = function reset() {
          this._prevUBOIndex = 0;
          this._prevInstanceID = -1;
        };

        _proto.updateDataTRSByDirty = function updateDataTRSByDirty(instanceID, UBOIndex, t, r, s) {
          var offset = instanceID * this._vec4PerUI * 4 + this._uniformBufferElementCount * UBOIndex;
          var data = this._uniformBufferData;
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
        };

        _proto.updateDataByDirty = function updateDataByDirty(instanceID, UBOIndex, c, mode, to, uvExtra, fillType) {
          var offset = instanceID * this._vec4PerUI * 4 + this._uniformBufferElementCount * UBOIndex;
          var data = this._uniformBufferData;
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
        };

        _createClass(UILocalBuffer, [{
          key: "prevUBOIndex",
          get: // index = instanceID + uboIndex * _UIPerUBO
          function get() {
            return this._prevUBOIndex;
          }
        }, {
          key: "uniformBufferStride",
          get: function get() {
            return this._uniformBufferStride;
          }
        }, {
          key: "prevInstanceID",
          get: function get() {
            return this._prevInstanceID;
          }
        }]);

        return UILocalBuffer;
      }());

      UILocalBuffer.UBO_COUNT = 10;

      _export("UILocalUBOManger", UILocalUBOManger = /*#__PURE__*/function () {
        // UIPerUBO -> buffer[]
        function UILocalUBOManger(device) {
          this._localBuffers = [];
          this._device = void 0;
          this._element = null;
          this._device = device;
        } // each quad once


        var _proto2 = UILocalUBOManger.prototype;

        _proto2.upload = function upload(t, r, s, to, c, mode, UIPerUBO, vec4PerUI, uvExtra, fillType) {
          // find/creat UILocalBuffer with UIPerUBO
          for (var i = 0; i < this._localBuffers.length; i++) {
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

          var localBufferPool = this._element.value;

          while (localBufferPool.pool[localBufferPool.currentIdx].checkFull()) {
            if (++localBufferPool.currentIdx >= localBufferPool.pool.length) {
              // create with hash
              localBufferPool.pool.push(this._createLocalBuffer(UIPerUBO, vec4PerUI, localBufferPool.currentIdx));
            }
          }

          var localBuffer = localBufferPool.pool[localBufferPool.currentIdx];
          localBuffer.upload(t, r, s, to, c, mode, uvExtra, fillType);
          return localBuffer;
        };

        _proto2.updateBuffer = function updateBuffer() {
          var length = this._localBuffers.length;
          var res;

          for (var i = 0; i < length; ++i) {
            res = this._localBuffers[i].value;

            for (var j = 0; j <= res.currentIdx; ++j) {
              res.pool[j].updateBuffer();
            }
          }
        };

        _proto2.reset = function reset() {
          this._element = null;
          var length = this._localBuffers.length;
          var res;

          for (var i = 0; i < length; ++i) {
            res = this._localBuffers[i].value;

            for (var j = 0; j <= res.currentIdx; ++j) {
              res.pool[j].reset();
            }

            res.currentIdx = 0;
          }
        };

        _proto2._createLocalBuffer = function _createLocalBuffer(capacity, vec4PerUI, idx) {
          var hash = murmurhash2_32_gc("UIUBO-" + capacity + "-" + idx, 666);
          return new UILocalBuffer(this._device, hash, capacity, vec4PerUI, idx);
        };

        return UILocalUBOManger;
      }());
    }
  };
});
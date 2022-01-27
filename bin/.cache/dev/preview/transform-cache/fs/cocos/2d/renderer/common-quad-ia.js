System.register("q-bundled:///fs/cocos/2d/renderer/common-quad-ia.js", ["../../core/gfx/index.js"], function (_export, _context) {
  "use strict";

  var Attribute, AttributeName, BufferInfo, BufferUsageBit, Format, InputAssemblerInfo, MemoryUsageBit, CommonQuadIA;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreGfxIndexJs) {
      Attribute = _coreGfxIndexJs.Attribute;
      AttributeName = _coreGfxIndexJs.AttributeName;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      Format = _coreGfxIndexJs.Format;
      InputAssemblerInfo = _coreGfxIndexJs.InputAssemblerInfo;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
    }],
    execute: function () {
      _export("CommonQuadIA", CommonQuadIA = /*#__PURE__*/function () {
        function CommonQuadIA(device) {
          this._vertexBuffer = void 0;
          this._indexBuffer = void 0;
          this._ia = void 0;
          var elementPerVertex =
          /* position */
          3 +
          /* texCoord */
          2 +
          /* instanceID */
          1;
          var vertexPerQuad = 4;
          var elementsPerQuad = elementPerVertex * vertexPerQuad;
          var stride = elementPerVertex * Float32Array.BYTES_PER_ELEMENT;
          var maxQuadPerDrawcall = Math.floor(device.capabilities.maxVertexUniformVectors / 5);
          console.log("MaxNum:  " + maxQuadPerDrawcall);
          this._vertexBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX, MemoryUsageBit.DEVICE, stride * vertexPerQuad * maxQuadPerDrawcall, stride));
          var indexPerQuad = 6;
          this._indexBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.INDEX, MemoryUsageBit.DEVICE, Uint16Array.BYTES_PER_ELEMENT * indexPerQuad * maxQuadPerDrawcall, Uint16Array.BYTES_PER_ELEMENT));
          var vertexData = new Float32Array(elementsPerQuad * maxQuadPerDrawcall);
          var indexData = new Uint16Array(indexPerQuad * maxQuadPerDrawcall);

          for (var i = 0; i < maxQuadPerDrawcall; ++i) {
            vertexData[i * elementsPerQuad + 0] = -0.5;
            vertexData[i * elementsPerQuad + 1] = -0.5;
            vertexData[i * elementsPerQuad + 2] = 0;
            vertexData[i * elementsPerQuad + 3] = 0;
            vertexData[i * elementsPerQuad + 4] = 1;
            vertexData[i * elementsPerQuad + 5] = i;
            vertexData[i * elementsPerQuad + 6] = 0.5;
            vertexData[i * elementsPerQuad + 7] = -0.5;
            vertexData[i * elementsPerQuad + 8] = 0;
            vertexData[i * elementsPerQuad + 9] = 1;
            vertexData[i * elementsPerQuad + 10] = 1;
            vertexData[i * elementsPerQuad + 11] = i;
            vertexData[i * elementsPerQuad + 12] = -0.5;
            vertexData[i * elementsPerQuad + 13] = 0.5;
            vertexData[i * elementsPerQuad + 14] = 0;
            vertexData[i * elementsPerQuad + 15] = 0;
            vertexData[i * elementsPerQuad + 16] = 0;
            vertexData[i * elementsPerQuad + 17] = i;
            vertexData[i * elementsPerQuad + 18] = 0.5;
            vertexData[i * elementsPerQuad + 19] = 0.5;
            vertexData[i * elementsPerQuad + 20] = 0;
            vertexData[i * elementsPerQuad + 21] = 1;
            vertexData[i * elementsPerQuad + 22] = 0;
            vertexData[i * elementsPerQuad + 23] = i;
            indexData[i * indexPerQuad + 0] = 0 + i * 4;
            indexData[i * indexPerQuad + 1] = 1 + i * 4;
            indexData[i * indexPerQuad + 2] = 2 + i * 4;
            indexData[i * indexPerQuad + 3] = 2 + i * 4;
            indexData[i * indexPerQuad + 4] = 1 + i * 4;
            indexData[i * indexPerQuad + 5] = 3 + i * 4;
          }

          this._vertexBuffer.update(vertexData);

          this._indexBuffer.update(indexData);

          this._ia = device.createInputAssembler(new InputAssemblerInfo([new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F, false, 0, false, 0), new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F, false, 0, false, 1), new Attribute(AttributeName.ATTR_BATCH_ID, Format.R32F, false, 0, false, 2)], [this._vertexBuffer], this._indexBuffer));
        }

        var _proto = CommonQuadIA.prototype;

        _proto.destroy = function destroy() {
          if (this._ia) {
            this._ia.destroy();

            this._ia = null;
          }

          if (this._vertexBuffer) {
            this._vertexBuffer.destroy();

            this._vertexBuffer = null;
          }

          if (this._indexBuffer) {
            this._indexBuffer.destroy();

            this._indexBuffer = null;
          }
        };

        _createClass(CommonQuadIA, [{
          key: "ia",
          get: function get() {
            return this._ia;
          }
        }]);

        return CommonQuadIA;
      }());
    }
  };
});
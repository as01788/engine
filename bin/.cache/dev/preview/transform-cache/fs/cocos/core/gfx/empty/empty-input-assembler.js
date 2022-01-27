System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-input-assembler.js", ["../base/input-assembler.js"], function (_export, _context) {
  "use strict";

  var InputAssembler, EmptyInputAssembler;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseInputAssemblerJs) {
      InputAssembler = _baseInputAssemblerJs.InputAssembler;
    }],
    execute: function () {
      _export("EmptyInputAssembler", EmptyInputAssembler = /*#__PURE__*/function (_InputAssembler) {
        _inheritsLoose(EmptyInputAssembler, _InputAssembler);

        function EmptyInputAssembler() {
          return _InputAssembler.apply(this, arguments) || this;
        }

        var _proto = EmptyInputAssembler.prototype;

        _proto.initialize = function initialize(info) {
          this._attributes = info.attributes;
          this._attributesHash = this.computeAttributesHash();
          this._vertexBuffers = info.vertexBuffers;

          if (info.indexBuffer) {
            this._indexBuffer = info.indexBuffer;
            this._drawInfo.indexCount = this._indexBuffer.size / this._indexBuffer.stride;
            this._drawInfo.firstIndex = 0;
          } else {
            var vertBuff = this._vertexBuffers[0];
            this._drawInfo.vertexCount = vertBuff.size / vertBuff.stride;
            this._drawInfo.firstVertex = 0;
            this._drawInfo.vertexOffset = 0;
          }
        };

        _proto.destroy = function destroy() {};

        return EmptyInputAssembler;
      }(InputAssembler));
    }
  };
});
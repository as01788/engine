System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-buffer.js", ["../base/buffer.js"], function (_export, _context) {
  "use strict";

  var Buffer, EmptyBuffer;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseBufferJs) {
      Buffer = _baseBufferJs.Buffer;
    }],
    execute: function () {
      _export("EmptyBuffer", EmptyBuffer = /*#__PURE__*/function (_Buffer) {
        _inheritsLoose(EmptyBuffer, _Buffer);

        function EmptyBuffer() {
          return _Buffer.apply(this, arguments) || this;
        }

        var _proto = EmptyBuffer.prototype;

        _proto.initialize = function initialize(info) {
          if ('buffer' in info) {
            // buffer view
            this._isBufferView = true;
            var buffer = info.buffer;
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
        };

        _proto.destroy = function destroy() {};

        _proto.resize = function resize(size) {};

        _proto.update = function update(buffer, size) {};

        return EmptyBuffer;
      }(Buffer));
    }
  };
});
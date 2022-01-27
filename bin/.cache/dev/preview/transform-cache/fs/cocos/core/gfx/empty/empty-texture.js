System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-texture.js", ["../base/define.js", "../base/texture.js"], function (_export, _context) {
  "use strict";

  var FormatSurfaceSize, IsPowerOf2, Texture, EmptyTexture;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseDefineJs) {
      FormatSurfaceSize = _baseDefineJs.FormatSurfaceSize;
      IsPowerOf2 = _baseDefineJs.IsPowerOf2;
    }, function (_baseTextureJs) {
      Texture = _baseTextureJs.Texture;
    }],
    execute: function () {
      _export("EmptyTexture", EmptyTexture = /*#__PURE__*/function (_Texture) {
        _inheritsLoose(EmptyTexture, _Texture);

        function EmptyTexture() {
          return _Texture.apply(this, arguments) || this;
        }

        var _proto = EmptyTexture.prototype;

        _proto.initialize = function initialize(info, isSwapchainTexture) {
          if ('texture' in info) {
            this._type = info.type;
            this._format = info.format;
            this._layerCount = info.layerCount;
            this._levelCount = info.levelCount;
            this._usage = info.texture.usage;
            this._width = info.texture.width;
            this._height = info.texture.height;
            this._depth = info.texture.depth;
            this._samples = info.texture.samples;
            this._flags = info.texture.flags;
          } else {
            this._type = info.type;
            this._usage = info.usage;
            this._format = info.format;
            this._width = info.width;
            this._height = info.height;
            this._depth = info.depth;
            this._layerCount = info.layerCount;
            this._levelCount = info.levelCount;
            this._samples = info.samples;
            this._flags = info.flags;
            this._isPowerOf2 = IsPowerOf2(this._width) && IsPowerOf2(this._height);
            this._size = FormatSurfaceSize(this._format, this.width, this.height, this.depth, this._levelCount) * this._layerCount;
          }
        };

        _proto.destroy = function destroy() {};

        _proto.resize = function resize(width, height) {
          this._width = width;
          this._height = height;
        };

        _proto.initAsSwapchainTexture = function initAsSwapchainTexture(info) {};

        return EmptyTexture;
      }(Texture));
    }
  };
});
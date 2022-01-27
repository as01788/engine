System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-swapchain.js", ["../base/define.js", "../base/swapchain.js", "./empty-texture.js"], function (_export, _context) {
  "use strict";

  var Format, Swapchain, EmptyTexture, EmptySwapchain;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseDefineJs) {
      Format = _baseDefineJs.Format;
    }, function (_baseSwapchainJs) {
      Swapchain = _baseSwapchainJs.Swapchain;
    }, function (_emptyTextureJs) {
      EmptyTexture = _emptyTextureJs.EmptyTexture;
    }],
    execute: function () {
      _export("EmptySwapchain", EmptySwapchain = /*#__PURE__*/function (_Swapchain) {
        _inheritsLoose(EmptySwapchain, _Swapchain);

        function EmptySwapchain() {
          return _Swapchain.apply(this, arguments) || this;
        }

        var _proto = EmptySwapchain.prototype;

        _proto.initialize = function initialize(info) {
          this._colorTexture = new EmptyTexture(); // @ts-expect-error(2445) private initializer

          this._colorTexture.initAsSwapchainTexture({
            swapchain: this,
            format: Format.RGBA8,
            width: info.width,
            height: info.height
          });

          this._depthStencilTexture = new EmptyTexture(); // @ts-expect-error(2445) private initializer

          this._depthStencilTexture.initAsSwapchainTexture({
            swapchain: this,
            format: Format.DEPTH_STENCIL,
            width: info.width,
            height: info.height
          });
        };

        _proto.destroy = function destroy() {};

        _proto.resize = function resize(width, height, surfaceTransform) {};

        return EmptySwapchain;
      }(Swapchain));
    }
  };
});
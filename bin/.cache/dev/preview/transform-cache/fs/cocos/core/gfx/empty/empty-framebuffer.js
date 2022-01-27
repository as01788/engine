System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-framebuffer.js", ["../base/framebuffer.js"], function (_export, _context) {
  "use strict";

  var Framebuffer, EmptyFramebuffer;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseFramebufferJs) {
      Framebuffer = _baseFramebufferJs.Framebuffer;
    }],
    execute: function () {
      _export("EmptyFramebuffer", EmptyFramebuffer = /*#__PURE__*/function (_Framebuffer) {
        _inheritsLoose(EmptyFramebuffer, _Framebuffer);

        function EmptyFramebuffer() {
          return _Framebuffer.apply(this, arguments) || this;
        }

        var _proto = EmptyFramebuffer.prototype;

        _proto.initialize = function initialize(info) {
          this._renderPass = info.renderPass;
          this._colorTextures = info.colorTextures || [];
          this._depthStencilTexture = info.depthStencilTexture || null;
        };

        _proto.destroy = function destroy() {};

        return EmptyFramebuffer;
      }(Framebuffer));
    }
  };
});
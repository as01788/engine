System.register("q-bundled:///fs/cocos/core/gfx/webgl2/webgl2-framebuffer.js", ["../base/framebuffer.js", "./webgl2-commands.js", "./webgl2-define.js"], function (_export, _context) {
  "use strict";

  var Framebuffer, WebGL2CmdFuncCreateFramebuffer, WebGL2CmdFuncDestroyFramebuffer, WebGL2DeviceManager, WebGL2Framebuffer;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseFramebufferJs) {
      Framebuffer = _baseFramebufferJs.Framebuffer;
    }, function (_webgl2CommandsJs) {
      WebGL2CmdFuncCreateFramebuffer = _webgl2CommandsJs.WebGL2CmdFuncCreateFramebuffer;
      WebGL2CmdFuncDestroyFramebuffer = _webgl2CommandsJs.WebGL2CmdFuncDestroyFramebuffer;
    }, function (_webgl2DefineJs) {
      WebGL2DeviceManager = _webgl2DefineJs.WebGL2DeviceManager;
    }],
    execute: function () {
      _export("WebGL2Framebuffer", WebGL2Framebuffer = /*#__PURE__*/function (_Framebuffer) {
        _inheritsLoose(WebGL2Framebuffer, _Framebuffer);

        function WebGL2Framebuffer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Framebuffer.call.apply(_Framebuffer, [this].concat(args)) || this;
          _this._gpuFramebuffer = null;
          return _this;
        }

        var _proto = WebGL2Framebuffer.prototype;

        _proto.initialize = function initialize(info) {
          this._renderPass = info.renderPass;
          this._colorTextures = info.colorTextures || [];
          this._depthStencilTexture = info.depthStencilTexture || null;
          var gpuColorTextures = [];

          for (var i = 0; i < info.colorTextures.length; i++) {
            var colorTexture = info.colorTextures[i];

            if (colorTexture) {
              gpuColorTextures.push(colorTexture.gpuTexture);
            }
          }

          var gpuDepthStencilTexture = null;

          if (info.depthStencilTexture) {
            gpuDepthStencilTexture = info.depthStencilTexture.gpuTexture;
          }

          var width = Number.MAX_SAFE_INTEGER;
          var height = Number.MAX_SAFE_INTEGER;
          this._gpuFramebuffer = {
            gpuRenderPass: info.renderPass.gpuRenderPass,
            gpuColorTextures: gpuColorTextures,
            gpuDepthStencilTexture: gpuDepthStencilTexture,
            glFramebuffer: null,
            isOffscreen: true,

            get width() {
              return this.isOffscreen ? width : this.gpuColorTextures[0].width;
            },

            set width(val) {
              width = val;
            },

            get height() {
              return this.isOffscreen ? height : this.gpuColorTextures[0].height;
            },

            set height(val) {
              height = val;
            }

          };
          WebGL2CmdFuncCreateFramebuffer(WebGL2DeviceManager.instance, this._gpuFramebuffer);
        };

        _proto.destroy = function destroy() {
          if (this._gpuFramebuffer) {
            WebGL2CmdFuncDestroyFramebuffer(WebGL2DeviceManager.instance, this._gpuFramebuffer);
            this._gpuFramebuffer = null;
          }
        };

        _createClass(WebGL2Framebuffer, [{
          key: "gpuFramebuffer",
          get: function get() {
            return this._gpuFramebuffer;
          }
        }]);

        return WebGL2Framebuffer;
      }(Framebuffer));
    }
  };
});
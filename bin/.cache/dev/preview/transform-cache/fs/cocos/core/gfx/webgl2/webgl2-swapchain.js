System.register("q-bundled:///fs/cocos/core/gfx/webgl2/webgl2-swapchain.js", ["../../../../../virtual/internal%253Aconstants.js", "../../platform/index.js", "./webgl2-state-cache.js", "./webgl2-texture.js", "../base/define.js", "../base/swapchain.js", "./webgl2-define.js"], function (_export, _context) {
  "use strict";

  var EDITOR, macro, warnID, warn, debug, WebGL2StateCache, WebGL2Texture, Format, TextureInfo, TextureFlagBit, TextureType, TextureUsageBit, BufferTextureCopy, Swapchain, WebGL2DeviceManager, eventWebGLContextLost, WebGL2Swapchain;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function initStates(gl) {
    gl.activeTexture(gl.TEXTURE0);
    gl.pixelStorei(gl.PACK_ALIGNMENT, 1);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); // rasterizer state

    gl.enable(gl.SCISSOR_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.polygonOffset(0.0, 0.0); // depth stencil state

    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);
    gl.depthFunc(gl.LESS);
    gl.stencilFuncSeparate(gl.FRONT, gl.ALWAYS, 1, 0xffff);
    gl.stencilOpSeparate(gl.FRONT, gl.KEEP, gl.KEEP, gl.KEEP);
    gl.stencilMaskSeparate(gl.FRONT, 0xffff);
    gl.stencilFuncSeparate(gl.BACK, gl.ALWAYS, 1, 0xffff);
    gl.stencilOpSeparate(gl.BACK, gl.KEEP, gl.KEEP, gl.KEEP);
    gl.stencilMaskSeparate(gl.BACK, 0xffff);
    gl.disable(gl.STENCIL_TEST); // blend state

    gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
    gl.disable(gl.BLEND);
    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ZERO);
    gl.colorMask(true, true, true, true);
    gl.blendColor(0.0, 0.0, 0.0, 0.0);
  }

  function getExtension(gl, ext) {
    var prefixes = ['', 'WEBKIT_', 'MOZ_'];

    for (var i = 0; i < prefixes.length; ++i) {
      var _ext = gl.getExtension(prefixes[i] + ext);

      if (_ext) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return _ext;
      }
    }

    return null;
  }

  function getExtensions(gl) {
    var res = {
      EXT_texture_filter_anisotropic: getExtension(gl, 'EXT_texture_filter_anisotropic'),
      EXT_color_buffer_half_float: getExtension(gl, 'EXT_color_buffer_half_float'),
      EXT_color_buffer_float: getExtension(gl, 'EXT_color_buffer_float'),
      WEBGL_multi_draw: getExtension(gl, 'WEBGL_multi_draw'),
      WEBGL_compressed_texture_etc1: getExtension(gl, 'WEBGL_compressed_texture_etc1'),
      WEBGL_compressed_texture_etc: getExtension(gl, 'WEBGL_compressed_texture_etc'),
      WEBGL_compressed_texture_pvrtc: getExtension(gl, 'WEBGL_compressed_texture_pvrtc'),
      WEBGL_compressed_texture_astc: getExtension(gl, 'WEBGL_compressed_texture_astc'),
      WEBGL_compressed_texture_s3tc: getExtension(gl, 'WEBGL_compressed_texture_s3tc'),
      WEBGL_compressed_texture_s3tc_srgb: getExtension(gl, 'WEBGL_compressed_texture_s3tc_srgb'),
      WEBGL_debug_shaders: getExtension(gl, 'WEBGL_debug_shaders'),
      WEBGL_lose_context: getExtension(gl, 'WEBGL_lose_context'),
      WEBGL_debug_renderer_info: getExtension(gl, 'WEBGL_debug_renderer_info'),
      OES_texture_half_float_linear: getExtension(gl, 'OES_texture_half_float_linear'),
      OES_texture_float_linear: getExtension(gl, 'OES_texture_float_linear'),
      useVAO: true
    };
    return res;
  }

  function getContext(canvas) {
    var context = null;

    try {
      var webGLCtxAttribs = {
        alpha: macro.ENABLE_TRANSPARENT_CANVAS,
        antialias: EDITOR || macro.ENABLE_WEBGL_ANTIALIAS,
        depth: true,
        stencil: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false
      };
      context = canvas.getContext('webgl2', webGLCtxAttribs);
    } catch (err) {
      return null;
    }

    return context;
  }

  _export({
    getExtensions: getExtensions,
    getContext: getContext
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_platformIndexJs) {
      macro = _platformIndexJs.macro;
      warnID = _platformIndexJs.warnID;
      warn = _platformIndexJs.warn;
      debug = _platformIndexJs.debug;
    }, function (_webgl2StateCacheJs) {
      WebGL2StateCache = _webgl2StateCacheJs.WebGL2StateCache;
    }, function (_webgl2TextureJs) {
      WebGL2Texture = _webgl2TextureJs.WebGL2Texture;
    }, function (_baseDefineJs) {
      Format = _baseDefineJs.Format;
      TextureInfo = _baseDefineJs.TextureInfo;
      TextureFlagBit = _baseDefineJs.TextureFlagBit;
      TextureType = _baseDefineJs.TextureType;
      TextureUsageBit = _baseDefineJs.TextureUsageBit;
      BufferTextureCopy = _baseDefineJs.BufferTextureCopy;
    }, function (_baseSwapchainJs) {
      Swapchain = _baseSwapchainJs.Swapchain;
    }, function (_webgl2DefineJs) {
      WebGL2DeviceManager = _webgl2DefineJs.WebGL2DeviceManager;
    }],
    execute: function () {
      eventWebGLContextLost = 'webglcontextlost';

      _export("WebGL2Swapchain", WebGL2Swapchain = /*#__PURE__*/function (_Swapchain) {
        _inheritsLoose(WebGL2Swapchain, _Swapchain);

        function WebGL2Swapchain() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Swapchain.call.apply(_Swapchain, [this].concat(args)) || this;
          _this.stateCache = new WebGL2StateCache();
          _this.nullTex2D = null;
          _this.nullTexCube = null;
          _this._canvas = null;
          _this._webGL2ContextLostHandler = null;
          _this._extensions = null;
          return _this;
        }

        var _proto = WebGL2Swapchain.prototype;

        _proto.initialize = function initialize(info) {
          this._canvas = info.windowHandle;
          this._webGL2ContextLostHandler = this._onWebGLContextLost.bind(this);

          this._canvas.addEventListener(eventWebGLContextLost, this._onWebGLContextLost);

          var gl = WebGL2DeviceManager.instance.gl;
          this.stateCache.initialize(WebGL2DeviceManager.instance.capabilities.maxTextureUnits, WebGL2DeviceManager.instance.capabilities.maxUniformBufferBindings, WebGL2DeviceManager.instance.capabilities.maxVertexAttributes);
          this._extensions = getExtensions(gl); // init states

          initStates(gl);
          var colorFmt = Format.RGBA8;
          var depthStencilFmt = Format.DEPTH_STENCIL;
          var depthBits = gl.getParameter(gl.DEPTH_BITS);
          var stencilBits = gl.getParameter(gl.STENCIL_BITS);
          if (depthBits && stencilBits) depthStencilFmt = Format.DEPTH_STENCIL;else if (depthBits) depthStencilFmt = Format.DEPTH;
          this._colorTexture = new WebGL2Texture(); // @ts-expect-error(2445) private initializer

          this._colorTexture.initAsSwapchainTexture({
            swapchain: this,
            format: colorFmt,
            width: info.width,
            height: info.height
          });

          this._depthStencilTexture = new WebGL2Texture(); // @ts-expect-error(2445) private initializer

          this._depthStencilTexture.initAsSwapchainTexture({
            swapchain: this,
            format: depthStencilFmt,
            width: info.width,
            height: info.height
          }); // create default null texture


          this.nullTex2D = WebGL2DeviceManager.instance.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED, Format.RGBA8, 2, 2, TextureFlagBit.NONE));
          this.nullTexCube = WebGL2DeviceManager.instance.createTexture(new TextureInfo(TextureType.CUBE, TextureUsageBit.SAMPLED, Format.RGBA8, 2, 2, TextureFlagBit.NONE, 6));
          var nullTexRegion = new BufferTextureCopy();
          nullTexRegion.texExtent.width = 2;
          nullTexRegion.texExtent.height = 2;
          var nullTexBuff = new Uint8Array(this.nullTex2D.size);
          nullTexBuff.fill(0);
          WebGL2DeviceManager.instance.copyBuffersToTexture([nullTexBuff], this.nullTex2D, [nullTexRegion]);
          nullTexRegion.texSubres.layerCount = 6;
          WebGL2DeviceManager.instance.copyBuffersToTexture([nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff], this.nullTexCube, [nullTexRegion]);
        };

        _proto.destroy = function destroy() {
          if (this._canvas && this._webGL2ContextLostHandler) {
            this._canvas.removeEventListener(eventWebGLContextLost, this._webGL2ContextLostHandler);

            this._webGL2ContextLostHandler = null;
          }

          if (this.nullTex2D) {
            this.nullTex2D.destroy();
            this.nullTex2D = null;
          }

          if (this.nullTexCube) {
            this.nullTexCube.destroy();
            this.nullTexCube = null;
          }

          this._extensions = null;
          this._canvas = null;
        };

        _proto.resize = function resize(width, height, surfaceTransform) {
          if (this._colorTexture.width !== width || this._colorTexture.height !== height) {
            debug("Resizing swapchain: " + width + "x" + height);
            this._canvas.width = width;
            this._canvas.height = height;

            this._colorTexture.resize(width, height);

            this._depthStencilTexture.resize(width, height);
          }
        };

        _proto._onWebGLContextLost = function _onWebGLContextLost(event) {
          warnID(11000);
          warn(event); // 2020.9.3: `preventDefault` is not available on some platforms
          // event.preventDefault();
        };

        _createClass(WebGL2Swapchain, [{
          key: "extensions",
          get: function get() {
            return this._extensions;
          }
        }]);

        return WebGL2Swapchain;
      }(Swapchain));
    }
  };
});
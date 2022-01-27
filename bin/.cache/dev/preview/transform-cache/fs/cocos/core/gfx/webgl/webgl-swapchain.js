System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-swapchain.js", ["../../../../../virtual/internal%253Aconstants.js", "../../platform/index.js", "../../platform/sys.js", "./webgl-command-allocator.js", "./webgl-state-cache.js", "./webgl-texture.js", "../base/define.js", "../../../../pal/system-info/enum-type/index.js", "../base/swapchain.js", "./webgl-define.js"], function (_export, _context) {
  "use strict";

  var ALIPAY, RUNTIME_BASED, BYTEDANCE, WECHAT, LINKSURE, QTT, COCOSPLAY, HUAWEI, EDITOR, macro, warnID, warn, debug, sys, WebGLCommandAllocator, WebGLStateCache, WebGLTexture, Format, TextureInfo, TextureFlagBit, TextureType, TextureUsageBit, BufferTextureCopy, BrowserType, OS, Swapchain, WebGLDeviceManager, eventWebGLContextLost, WebGLSwapchain;

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
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(0.0, 0.0); // depth stencil state

    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);
    gl.depthFunc(gl.LESS);
    gl.depthRange(0.0, 1.0);
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
      EXT_blend_minmax: getExtension(gl, 'EXT_blend_minmax'),
      EXT_frag_depth: getExtension(gl, 'EXT_frag_depth'),
      EXT_shader_texture_lod: getExtension(gl, 'EXT_shader_texture_lod'),
      EXT_sRGB: getExtension(gl, 'EXT_sRGB'),
      OES_vertex_array_object: getExtension(gl, 'OES_vertex_array_object'),
      EXT_color_buffer_half_float: getExtension(gl, 'EXT_color_buffer_half_float'),
      WEBGL_multi_draw: getExtension(gl, 'WEBGL_multi_draw'),
      WEBGL_color_buffer_float: getExtension(gl, 'WEBGL_color_buffer_float'),
      WEBGL_compressed_texture_etc1: getExtension(gl, 'WEBGL_compressed_texture_etc1'),
      WEBGL_compressed_texture_etc: getExtension(gl, 'WEBGL_compressed_texture_etc'),
      WEBGL_compressed_texture_pvrtc: getExtension(gl, 'WEBGL_compressed_texture_pvrtc'),
      WEBGL_compressed_texture_s3tc: getExtension(gl, 'WEBGL_compressed_texture_s3tc'),
      WEBGL_compressed_texture_s3tc_srgb: getExtension(gl, 'WEBGL_compressed_texture_s3tc_srgb'),
      WEBGL_debug_shaders: getExtension(gl, 'WEBGL_debug_shaders'),
      WEBGL_draw_buffers: getExtension(gl, 'WEBGL_draw_buffers'),
      WEBGL_lose_context: getExtension(gl, 'WEBGL_lose_context'),
      WEBGL_depth_texture: getExtension(gl, 'WEBGL_depth_texture'),
      OES_texture_half_float: getExtension(gl, 'OES_texture_half_float'),
      OES_texture_half_float_linear: getExtension(gl, 'OES_texture_half_float_linear'),
      OES_texture_float: getExtension(gl, 'OES_texture_float'),
      OES_texture_float_linear: getExtension(gl, 'OES_texture_float_linear'),
      OES_standard_derivatives: getExtension(gl, 'OES_standard_derivatives'),
      OES_element_index_uint: getExtension(gl, 'OES_element_index_uint'),
      ANGLE_instanced_arrays: getExtension(gl, 'ANGLE_instanced_arrays'),
      WEBGL_debug_renderer_info: getExtension(gl, 'WEBGL_debug_renderer_info'),
      WEBGL_compressed_texture_astc: null,
      destroyShadersImmediately: true,
      noCompressedTexSubImage2D: false,
      isLocationActive: function isLocationActive(glLoc) {
        return !!glLoc;
      },
      useVAO: false
    }; // platform-specific extension hacks
    // eslint-disable-next-line no-lone-blocks

    {
      // iOS 14 browsers crash on getExtension('WEBGL_compressed_texture_astc')
      if (sys.os !== OS.IOS || sys.osMainVersion !== 14 || !sys.isBrowser) {
        res.WEBGL_compressed_texture_astc = getExtension(gl, 'WEBGL_compressed_texture_astc');
      } // UC browser instancing implementation doesn't work


      if (sys.browserType === BrowserType.UC) {
        res.ANGLE_instanced_arrays = null;
      } // bytedance ios depth texture implementation doesn't work


      if (BYTEDANCE && sys.os === OS.IOS) {
        res.WEBGL_depth_texture = null;
      }

      if (RUNTIME_BASED) {
        // VAO implementations doesn't work well on some runtime platforms
        if (LINKSURE || QTT || COCOSPLAY || HUAWEI) {
          res.OES_vertex_array_object = null;
        }
      } // some earlier version of iOS and android wechat implement gl.detachShader incorrectly


      if (sys.os === OS.IOS && sys.osMainVersion <= 10 || WECHAT && sys.os === OS.ANDROID) {
        res.destroyShadersImmediately = false;
      } // getUniformLocation has always been problematic because the
      // paradigm differs from GLES, and many platforms get it wrong [eyerolling]


      if (WECHAT) {
        // wEcHaT just returns { id: -1 } for inactive names
        res.isLocationActive = function (glLoc) {
          return !!glLoc && glLoc.id !== -1;
        };
      }

      if (ALIPAY) {
        // aLiPaY just returns the location number directly on actual devices, and WebGLUniformLocation objects in simulators
        res.isLocationActive = function (glLoc) {
          return !!glLoc && glLoc !== -1 || glLoc === 0;
        };
      } // compressedTexSubImage2D too


      if (WECHAT) {
        res.noCompressedTexSubImage2D = true;
      }
    }

    if (res.OES_vertex_array_object) {
      res.useVAO = true;
    }

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
      context = canvas.getContext('webgl', webGLCtxAttribs);
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
      ALIPAY = _virtualInternal253AconstantsJs.ALIPAY;
      RUNTIME_BASED = _virtualInternal253AconstantsJs.RUNTIME_BASED;
      BYTEDANCE = _virtualInternal253AconstantsJs.BYTEDANCE;
      WECHAT = _virtualInternal253AconstantsJs.WECHAT;
      LINKSURE = _virtualInternal253AconstantsJs.LINKSURE;
      QTT = _virtualInternal253AconstantsJs.QTT;
      COCOSPLAY = _virtualInternal253AconstantsJs.COCOSPLAY;
      HUAWEI = _virtualInternal253AconstantsJs.HUAWEI;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_platformIndexJs) {
      macro = _platformIndexJs.macro;
      warnID = _platformIndexJs.warnID;
      warn = _platformIndexJs.warn;
      debug = _platformIndexJs.debug;
    }, function (_platformSysJs) {
      sys = _platformSysJs.sys;
    }, function (_webglCommandAllocatorJs) {
      WebGLCommandAllocator = _webglCommandAllocatorJs.WebGLCommandAllocator;
    }, function (_webglStateCacheJs) {
      WebGLStateCache = _webglStateCacheJs.WebGLStateCache;
    }, function (_webglTextureJs) {
      WebGLTexture = _webglTextureJs.WebGLTexture;
    }, function (_baseDefineJs) {
      Format = _baseDefineJs.Format;
      TextureInfo = _baseDefineJs.TextureInfo;
      TextureFlagBit = _baseDefineJs.TextureFlagBit;
      TextureType = _baseDefineJs.TextureType;
      TextureUsageBit = _baseDefineJs.TextureUsageBit;
      BufferTextureCopy = _baseDefineJs.BufferTextureCopy;
    }, function (_palSystemInfoEnumTypeIndexJs) {
      BrowserType = _palSystemInfoEnumTypeIndexJs.BrowserType;
      OS = _palSystemInfoEnumTypeIndexJs.OS;
    }, function (_baseSwapchainJs) {
      Swapchain = _baseSwapchainJs.Swapchain;
    }, function (_webglDefineJs) {
      WebGLDeviceManager = _webglDefineJs.WebGLDeviceManager;
    }],
    execute: function () {
      eventWebGLContextLost = 'webglcontextlost';

      _export("WebGLSwapchain", WebGLSwapchain = /*#__PURE__*/function (_Swapchain) {
        _inheritsLoose(WebGLSwapchain, _Swapchain);

        function WebGLSwapchain() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Swapchain.call.apply(_Swapchain, [this].concat(args)) || this;
          _this.stateCache = new WebGLStateCache();
          _this.cmdAllocator = new WebGLCommandAllocator();
          _this.nullTex2D = null;
          _this.nullTexCube = null;
          _this._canvas = null;
          _this._webGLContextLostHandler = null;
          _this._extensions = null;
          return _this;
        }

        var _proto = WebGLSwapchain.prototype;

        _proto.initialize = function initialize(info) {
          this._canvas = info.windowHandle;
          this._webGLContextLostHandler = this._onWebGLContextLost.bind(this);

          this._canvas.addEventListener(eventWebGLContextLost, this._onWebGLContextLost);

          var gl = WebGLDeviceManager.instance.gl;
          this.stateCache.initialize(WebGLDeviceManager.instance.capabilities.maxTextureUnits, WebGLDeviceManager.instance.capabilities.maxVertexAttributes);
          this._extensions = getExtensions(gl); // init states

          initStates(gl);
          var colorFmt = Format.RGBA8;
          var depthStencilFmt = Format.DEPTH_STENCIL;
          var depthBits = gl.getParameter(gl.DEPTH_BITS);
          var stencilBits = gl.getParameter(gl.STENCIL_BITS);

          if (ALIPAY) {
            depthBits = 24;
          }

          if (depthBits && stencilBits) depthStencilFmt = Format.DEPTH_STENCIL;else if (depthBits) depthStencilFmt = Format.DEPTH;
          this._colorTexture = new WebGLTexture(); // @ts-expect-error(2445) private initializer

          this._colorTexture.initAsSwapchainTexture({
            swapchain: this,
            format: colorFmt,
            width: info.width,
            height: info.height
          });

          this._depthStencilTexture = new WebGLTexture(); // @ts-expect-error(2445) private initializer

          this._depthStencilTexture.initAsSwapchainTexture({
            swapchain: this,
            format: depthStencilFmt,
            width: info.width,
            height: info.height
          }); // create default null texture


          this.nullTex2D = WebGLDeviceManager.instance.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED, Format.RGBA8, 2, 2, TextureFlagBit.GEN_MIPMAP));
          this.nullTexCube = WebGLDeviceManager.instance.createTexture(new TextureInfo(TextureType.CUBE, TextureUsageBit.SAMPLED, Format.RGBA8, 2, 2, TextureFlagBit.GEN_MIPMAP, 6));
          var nullTexRegion = new BufferTextureCopy();
          nullTexRegion.texExtent.width = 2;
          nullTexRegion.texExtent.height = 2;
          var nullTexBuff = new Uint8Array(this.nullTex2D.size);
          nullTexBuff.fill(0);
          WebGLDeviceManager.instance.copyBuffersToTexture([nullTexBuff], this.nullTex2D, [nullTexRegion]);
          nullTexRegion.texSubres.layerCount = 6;
          WebGLDeviceManager.instance.copyBuffersToTexture([nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff], this.nullTexCube, [nullTexRegion]);
        };

        _proto.destroy = function destroy() {
          if (this._canvas && this._webGLContextLostHandler) {
            this._canvas.removeEventListener(eventWebGLContextLost, this._webGLContextLostHandler);

            this._webGLContextLostHandler = null;
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

        _createClass(WebGLSwapchain, [{
          key: "extensions",
          get: function get() {
            return this._extensions;
          }
        }]);

        return WebGLSwapchain;
      }(Swapchain));
    }
  };
});
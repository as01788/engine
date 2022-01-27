"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtensions = getExtensions;
exports.getContext = getContext;
exports.WebGL2Swapchain = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../platform/index.js");

var _webgl2StateCache = require("./webgl2-state-cache.js");

var _webgl2Texture = require("./webgl2-texture.js");

var _define = require("../base/define.js");

var _swapchain = require("../base/swapchain.js");

var _webgl2Define = require("./webgl2-define.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
const eventWebGLContextLost = 'webglcontextlost';

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
  const prefixes = ['', 'WEBKIT_', 'MOZ_'];

  for (let i = 0; i < prefixes.length; ++i) {
    const _ext = gl.getExtension(prefixes[i] + ext);

    if (_ext) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return _ext;
    }
  }

  return null;
}

function getExtensions(gl) {
  const res = {
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
  let context = null;

  try {
    const webGLCtxAttribs = {
      alpha: _index.macro.ENABLE_TRANSPARENT_CANVAS,
      antialias: _internal253Aconstants.EDITOR || _index.macro.ENABLE_WEBGL_ANTIALIAS,
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

class WebGL2Swapchain extends _swapchain.Swapchain {
  constructor(...args) {
    super(...args);
    this.stateCache = new _webgl2StateCache.WebGL2StateCache();
    this.nullTex2D = null;
    this.nullTexCube = null;
    this._canvas = null;
    this._webGL2ContextLostHandler = null;
    this._extensions = null;
  }

  get extensions() {
    return this._extensions;
  }

  initialize(info) {
    this._canvas = info.windowHandle;
    this._webGL2ContextLostHandler = this._onWebGLContextLost.bind(this);

    this._canvas.addEventListener(eventWebGLContextLost, this._onWebGLContextLost);

    const gl = _webgl2Define.WebGL2DeviceManager.instance.gl;
    this.stateCache.initialize(_webgl2Define.WebGL2DeviceManager.instance.capabilities.maxTextureUnits, _webgl2Define.WebGL2DeviceManager.instance.capabilities.maxUniformBufferBindings, _webgl2Define.WebGL2DeviceManager.instance.capabilities.maxVertexAttributes);
    this._extensions = getExtensions(gl); // init states

    initStates(gl);
    const colorFmt = _define.Format.RGBA8;
    let depthStencilFmt = _define.Format.DEPTH_STENCIL;
    const depthBits = gl.getParameter(gl.DEPTH_BITS);
    const stencilBits = gl.getParameter(gl.STENCIL_BITS);
    if (depthBits && stencilBits) depthStencilFmt = _define.Format.DEPTH_STENCIL;else if (depthBits) depthStencilFmt = _define.Format.DEPTH;
    this._colorTexture = new _webgl2Texture.WebGL2Texture(); // @ts-expect-error(2445) private initializer

    this._colorTexture.initAsSwapchainTexture({
      swapchain: this,
      format: colorFmt,
      width: info.width,
      height: info.height
    });

    this._depthStencilTexture = new _webgl2Texture.WebGL2Texture(); // @ts-expect-error(2445) private initializer

    this._depthStencilTexture.initAsSwapchainTexture({
      swapchain: this,
      format: depthStencilFmt,
      width: info.width,
      height: info.height
    }); // create default null texture


    this.nullTex2D = _webgl2Define.WebGL2DeviceManager.instance.createTexture(new _define.TextureInfo(_define.TextureType.TEX2D, _define.TextureUsageBit.SAMPLED, _define.Format.RGBA8, 2, 2, _define.TextureFlagBit.NONE));
    this.nullTexCube = _webgl2Define.WebGL2DeviceManager.instance.createTexture(new _define.TextureInfo(_define.TextureType.CUBE, _define.TextureUsageBit.SAMPLED, _define.Format.RGBA8, 2, 2, _define.TextureFlagBit.NONE, 6));
    const nullTexRegion = new _define.BufferTextureCopy();
    nullTexRegion.texExtent.width = 2;
    nullTexRegion.texExtent.height = 2;
    const nullTexBuff = new Uint8Array(this.nullTex2D.size);
    nullTexBuff.fill(0);

    _webgl2Define.WebGL2DeviceManager.instance.copyBuffersToTexture([nullTexBuff], this.nullTex2D, [nullTexRegion]);

    nullTexRegion.texSubres.layerCount = 6;

    _webgl2Define.WebGL2DeviceManager.instance.copyBuffersToTexture([nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff, nullTexBuff], this.nullTexCube, [nullTexRegion]);
  }

  destroy() {
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
  }

  resize(width, height, surfaceTransform) {
    if (this._colorTexture.width !== width || this._colorTexture.height !== height) {
      (0, _index.debug)(`Resizing swapchain: ${width}x${height}`);
      this._canvas.width = width;
      this._canvas.height = height;

      this._colorTexture.resize(width, height);

      this._depthStencilTexture.resize(width, height);
    }
  }

  _onWebGLContextLost(event) {
    (0, _index.warnID)(11000);
    (0, _index.warn)(event); // 2020.9.3: `preventDefault` is not available on some platforms
    // event.preventDefault();
  }

}

exports.WebGL2Swapchain = WebGL2Swapchain;
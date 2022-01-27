"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderTexture = void 0;

var _index = require("../data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _utils = require("../math/utils.js");

var _index2 = require("../gfx/index.js");

var _globalExports = require("../global-exports.js");

var _textureBase = require("./texture-base.js");

var _define = require("../gfx/base/define.js");

var _dec, _class, _temp;

const _colorAttachment = new _index2.ColorAttachment();

_colorAttachment.format = _index2.Format.RGBA8;
_colorAttachment.beginAccesses = [_index2.AccessType.FRAGMENT_SHADER_READ_TEXTURE];
_colorAttachment.endAccesses = [_index2.AccessType.FRAGMENT_SHADER_READ_TEXTURE];

const _depthStencilAttachment = new _index2.DepthStencilAttachment();

_depthStencilAttachment.format = _index2.Format.DEPTH_STENCIL;
const passInfo = new _index2.RenderPassInfo([_colorAttachment], _depthStencilAttachment);
const _windowInfo = {
  width: 1,
  height: 1,
  renderPassInfo: passInfo
};
/**
 * @en Render texture is a render target for [[Camera]] or [[Canvas]] component,
 * the render pipeline will use its [[RenderWindow]] as the target of the rendering process.
 * @zh 渲染贴图是 [[Camera]] 或 [[Canvas]] 组件的渲染目标对象，渲染管线会使用它的 [[RenderWindow]] 作为渲染的目标窗口。
 */

let RenderTexture = (_dec = (0, _index.ccclass)('cc.RenderTexture'), _dec(_class = (_temp = class RenderTexture extends _textureBase.TextureBase {
  constructor(...args) {
    super(...args);
    this._window = null;
  }

  /**
   * @en The render window for the render pipeline, it's created internally and cannot be modified.
   * @zh 渲染管线所使用的渲染窗口，内部逻辑创建，无法被修改。
   */
  get window() {
    return this._window;
  }

  initialize(info) {
    this._name = info.name || '';
    this._width = info.width;
    this._height = info.height;

    this._initWindow(info);
  }

  reset(info) {
    // to be consistent with other assets
    this.initialize(info);
  }

  destroy() {
    if (this._window) {
      const root = _globalExports.legacyCC.director.root;
      root === null || root === void 0 ? void 0 : root.destroyWindow(this._window);
      this._window = null;
    }

    return super.destroy();
  }
  /**
   * @en Resize the render texture
   * @zh 修改渲染贴图的尺寸
   * @param width The pixel width, the range is from 1 to 2048
   * @param height The pixel height, the range is from 1 to 2048
   */


  resize(width, height) {
    this._width = Math.floor((0, _utils.clamp)(width, 1, 2048));
    this._height = Math.floor((0, _utils.clamp)(height, 1, 2048));

    if (this._window) {
      this._window.resize(this._width, this._height);
    }

    this.emit('resize', this._window);
  }

  _serialize(ctxForExporting) {
    if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
      return {
        base: super._serialize(ctxForExporting),
        w: this._width,
        h: this._height,
        n: this._name
      };
    }

    return {};
  }

  _deserialize(serializedData, handle) {
    const data = serializedData;
    this._width = data.w;
    this._height = data.h;
    this._name = data.n;

    super._deserialize(data.base, handle);
  } // To be compatible with material property interface

  /**
   * @en Gets the related [[Texture]] resource, it's also the color attachment for the render window
   * @zh 获取渲染贴图的 GFX 资源，同时也是渲染窗口所指向的颜色缓冲贴图资源
   */


  getGFXTexture() {
    return this._window && this._window.framebuffer.colorTextures[0];
  }

  onLoaded() {
    this._initWindow();
  }

  _initWindow(info) {
    const root = _globalExports.legacyCC.director.root;
    _windowInfo.title = this._name;
    _windowInfo.width = this._width;
    _windowInfo.height = this._height;
    _windowInfo.renderPassInfo = info && info.passInfo ? info.passInfo : passInfo;

    if (this._window) {
      this._window.destroy();

      this._window.initialize(root.device, _windowInfo);
    } else {
      this._window = root.createWindow(_windowInfo);
    }
  }

  initDefault(uuid) {
    super.initDefault(uuid);
    this._width = this._height = 1;

    this._initWindow();
  }

  validate() {
    return this.width >= 1 && this.width <= 2048 && this.height >= 1 && this.height <= 2048;
  }
  /**
   * @en Read pixel buffer from render texture
   * @param x The location on x axis
   * @param y The location on y axis
   * @param width The pixel width
   * @param height The pixel height
   * @zh 从 render texture 读取像素数据
   * @param x 起始位置X轴坐标
   * @param y 起始位置Y轴坐标
   * @param width 像素宽度
   * @param height 像素高度
   */


  readPixels(x = 0, y = 0, width, height) {
    width = width || this.width;
    height = width || this.height;
    const gfxTexture = this.getGFXTexture();

    if (!gfxTexture) {
      return null;
    }

    const gfxDevice = this._getGFXDevice();

    const bufferViews = [];
    const regions = [];
    const region0 = new _define.BufferTextureCopy();
    region0.texOffset.x = x;
    region0.texOffset.y = y;
    region0.texExtent.width = width;
    region0.texExtent.height = height;
    regions.push(region0);
    const buffer = new Uint8Array(width * height * 4);
    bufferViews.push(buffer);
    gfxDevice === null || gfxDevice === void 0 ? void 0 : gfxDevice.copyTextureToBuffers(gfxTexture, bufferViews, regions);
    return buffer;
  }

}, _temp)) || _class);
exports.RenderTexture = RenderTexture;
_globalExports.legacyCC.RenderTexture = RenderTexture;
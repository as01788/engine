"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderWindow = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _screenAdapter = require("pal/screen-adapter");

var _index = require("../../../../pal/screen-adapter/enum-type/index.js");

var _index2 = require("../../gfx/index.js");

var _index3 = require("../scene/index.js");

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
const orientationMap = {
  [_index.Orientation.PORTRAIT]: _index2.SurfaceTransform.IDENTITY,
  [_index.Orientation.LANDSCAPE_RIGHT]: _index2.SurfaceTransform.ROTATE_90,
  [_index.Orientation.PORTRAIT_UPSIDE_DOWN]: _index2.SurfaceTransform.ROTATE_180,
  [_index.Orientation.LANDSCAPE_LEFT]: _index2.SurfaceTransform.ROTATE_270
};
/**
 * @en The render window represents the render target, it could be an off screen frame buffer or the on screen buffer.
 * @zh 渲染窗口代表了一个渲染目标，可以是离屏的帧缓冲，也可以是屏幕缓冲
 */

class RenderWindow {
  /**
   * @en Get window width. Pre-rotated (i.e. rotationally invariant, always in identity/portrait mode) if possible.
   * If you want to get oriented size instead, you should use [[Camera.width]] which corresponds to the current screen rotation.
   * @zh 获取窗口宽度。如果支持交换链预变换，返回值将始终处于单位旋转（竖屏）坐标系下。如果需要获取旋转后的尺寸，请使用 [[Camera.width]]。
   */
  get width() {
    return this._width;
  }
  /**
   * @en Get window height. Pre-rotated (i.e. rotationally invariant, always in identity/portrait mode) if possible.
   * If you want to get oriented size instead, you should use [[Camera.width]] which corresponds to the current screen rotation.
   * @zh 获取窗口高度。如果支持交换链预变换，返回值将始终处于单位旋转（竖屏）坐标系下。如果需要获取旋转后的尺寸，请使用 [[Camera.height]]。
   */


  get height() {
    return this._height;
  }
  /**
   * @en Get the swapchain for this window, if there is one
   * @zh 如果存在的话，获取此窗口的交换链
   */


  get swapchain() {
    return this._swapchain;
  }
  /**
   * @en Get window frame buffer.
   * @zh 帧缓冲对象。
   */


  get framebuffer() {
    return this._framebuffer;
  }

  get cameras() {
    return this._cameras;
  }
  /**
   * @private
   */


  static registerCreateFunc(root) {
    root._createWindowFun = _root => new RenderWindow(_root);
  }

  get native() {
    return this._nativeObj;
  }

  constructor(root) {
    this._title = '';
    this._width = 1;
    this._height = 1;
    this._swapchain = null;
    this._renderPass = null;
    this._colorTextures = [];
    this._depthStencilTexture = null;
    this._cameras = [];
    this._hasOnScreenAttachments = false;
    this._hasOffScreenAttachments = false;
    this._framebuffer = null;
  }

  initialize(device, info) {
    this._init();

    if (info.title !== undefined) {
      this._title = info.title;
    }

    if (info.swapchain !== undefined) {
      this._swapchain = info.swapchain;
    }

    this._width = info.width;
    this._height = info.height;
    this._renderPass = device.createRenderPass(info.renderPassInfo);

    if (info.swapchain) {
      this._setSwapchain(info.swapchain);

      this._colorTextures.push(info.swapchain.colorTexture);

      this._depthStencilTexture = info.swapchain.depthStencilTexture;
    } else {
      for (let i = 0; i < info.renderPassInfo.colorAttachments.length; i++) {
        this._colorTextures.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED | _index2.TextureUsageBit.TRANSFER_SRC, info.renderPassInfo.colorAttachments[i].format, this._width, this._height)));
      }

      if (info.renderPassInfo.depthStencilAttachment.format !== _index2.Format.UNKNOWN) {
        this._depthStencilTexture = device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.DEPTH_STENCIL_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, info.renderPassInfo.depthStencilAttachment.format, this._width, this._height));
      }
    }

    this._setFrameBuffer(device.createFramebuffer(new _index2.FramebufferInfo(this._renderPass, this._colorTextures, this._depthStencilTexture)));

    return true;
  }

  destroy() {
    this.clearCameras();

    if (this._framebuffer) {
      this._framebuffer.destroy();

      this._framebuffer = null;
    }

    if (this._depthStencilTexture) {
      this._depthStencilTexture.destroy();

      this._depthStencilTexture = null;
    }

    for (let i = 0; i < this._colorTextures.length; i++) {
      const colorTexture = this._colorTextures[i];

      if (colorTexture) {
        colorTexture.destroy();
      }
    }

    this._colorTextures.length = 0;

    this._destroy();
  }
  /**
   * @en Resize window.
   * @zh 重置窗口大小。
   * @param width The new width.
   * @param height The new height.
   */


  resize(width, height) {
    if (this._swapchain) {
      this._swapchain.resize(width, height, orientationMap[_screenAdapter.screenAdapter.orientation]);

      this._width = this._swapchain.width;
      this._height = this._swapchain.height;
    } else {
      for (let i = 0; i < this._colorTextures.length; i++) {
        this._colorTextures[i].resize(width, height);
      }

      if (this._depthStencilTexture) {
        this._depthStencilTexture.resize(width, height);
      }

      this._width = width;
      this._height = height;
    }

    if (this.framebuffer) {
      this.framebuffer.destroy();
      this.framebuffer.initialize(new _index2.FramebufferInfo(this._renderPass, this._colorTextures, this._depthStencilTexture));
    }

    for (const camera of this._cameras) {
      camera.resize(width, height);
    }
  }

  extractRenderCameras(cameras) {
    for (let j = 0; j < this._cameras.length; j++) {
      const camera = this._cameras[j];

      if (camera.enabled) {
        camera.update();
        cameras.push(camera);
      }
    }
  }
  /**
   * @zh
   * 添加渲染相机
   * @param camera 渲染相机
   */


  attachCamera(camera) {
    for (let i = 0; i < this._cameras.length; i++) {
      if (this._cameras[i] === camera) {
        return;
      }
    }

    this._cameras.push(camera);

    this.sortCameras();
  }
  /**
   * @zh
   * 移除渲染相机
   * @param camera 相机
   */


  detachCamera(camera) {
    for (let i = 0; i < this._cameras.length; ++i) {
      if (this._cameras[i] === camera) {
        this._cameras.splice(i, 1);

        return;
      }
    }
  }
  /**
   * @zh
   * 销毁全部渲染相机
   */


  clearCameras() {
    this._cameras.length = 0;
  }

  sortCameras() {
    this._cameras.sort((a, b) => a.priority - b.priority);
  } // ====================== Native Specific ====================== //


  _init() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = new _index3.NativeRenderWindow();
    }
  }

  _destroy() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = null;
    }
  }

  _setSwapchain(val) {
    this._swapchain = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.swapchain = val;
    }
  }

  _setFrameBuffer(val) {
    this._framebuffer = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.frameBuffer = val;
    }
  }

}

exports.RenderWindow = RenderWindow;
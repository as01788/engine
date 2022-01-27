"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptySwapchain = void 0;

var _define = require("../base/define.js");

var _swapchain = require("../base/swapchain.js");

var _emptyTexture = require("./empty-texture.js");

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
class EmptySwapchain extends _swapchain.Swapchain {
  initialize(info) {
    this._colorTexture = new _emptyTexture.EmptyTexture(); // @ts-expect-error(2445) private initializer

    this._colorTexture.initAsSwapchainTexture({
      swapchain: this,
      format: _define.Format.RGBA8,
      width: info.width,
      height: info.height
    });

    this._depthStencilTexture = new _emptyTexture.EmptyTexture(); // @ts-expect-error(2445) private initializer

    this._depthStencilTexture.initAsSwapchainTexture({
      swapchain: this,
      format: _define.Format.DEPTH_STENCIL,
      width: info.width,
      height: info.height
    });
  }

  destroy() {}

  resize(width, height, surfaceTransform) {}

}

exports.EmptySwapchain = EmptySwapchain;
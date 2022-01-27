"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLRenderPass = void 0;

var _renderPass = require("../base/render-pass.js");

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
class WebGLRenderPass extends _renderPass.RenderPass {
  constructor(...args) {
    super(...args);
    this._gpuRenderPass = null;
  }

  get gpuRenderPass() {
    return this._gpuRenderPass;
  }

  initialize(info) {
    this._colorInfos = info.colorAttachments;
    this._depthStencilInfo = info.depthStencilAttachment;
    this._subpasses = info.subpasses;
    this._gpuRenderPass = {
      colorAttachments: this._colorInfos,
      depthStencilAttachment: this._depthStencilInfo
    };
    this._hash = this.computeHash();
  }

  destroy() {
    this._gpuRenderPass = null;
  }

}

exports.WebGLRenderPass = WebGLRenderPass;
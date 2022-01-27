"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLSampler = void 0;

var _define = require("../../base/define.js");

var _sampler = require("../../base/states/sampler.js");

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
const WebGLWraps = [0x2901, // WebGLRenderingContext.REPEAT,
0x8370, // WebGLRenderingContext.MIRRORED_REPEAT,
0x812F, // WebGLRenderingContext.CLAMP_TO_EDGE,
0x812F // WebGLRenderingContext.CLAMP_TO_EDGE,
];

class WebGLSampler extends _sampler.Sampler {
  get gpuSampler() {
    return this._gpuSampler;
  }

  constructor(info, hash) {
    super(info, hash);
    this._gpuSampler = null;
    let glMinFilter = 0;
    let glMagFilter = 0;
    const minFilter = this._info.minFilter;
    const magFilter = this._info.magFilter;
    const mipFilter = this._info.mipFilter;

    if (minFilter === _define.Filter.LINEAR || minFilter === _define.Filter.ANISOTROPIC) {
      if (mipFilter === _define.Filter.LINEAR || mipFilter === _define.Filter.ANISOTROPIC) {
        glMinFilter = 0x2703; // WebGLRenderingContext.LINEAR_MIPMAP_LINEAR;
      } else if (mipFilter === _define.Filter.POINT) {
        glMinFilter = 0x2701; // WebGLRenderingContext.LINEAR_MIPMAP_NEAREST;
      } else {
        glMinFilter = 0x2601; // WebGLRenderingContext.LINEAR;
      }
    } else if (mipFilter === _define.Filter.LINEAR || mipFilter === _define.Filter.ANISOTROPIC) {
      glMinFilter = 0x2702; // WebGLRenderingContext.NEAREST_MIPMAP_LINEAR;
    } else if (mipFilter === _define.Filter.POINT) {
      glMinFilter = 0x2700; // WebGLRenderingContext.NEAREST_MIPMAP_NEAREST;
    } else {
      glMinFilter = 0x2600; // WebGLRenderingContext.NEAREST;
    }

    if (magFilter === _define.Filter.LINEAR || magFilter === _define.Filter.ANISOTROPIC) {
      glMagFilter = 0x2601; // WebGLRenderingContext.LINEAR;
    } else {
      glMagFilter = 0x2600; // WebGLRenderingContext.NEAREST;
    }

    const glWrapS = WebGLWraps[this._info.addressU];
    const glWrapT = WebGLWraps[this._info.addressV];
    const glWrapR = WebGLWraps[this._info.addressW];
    this._gpuSampler = {
      glMinFilter,
      glMagFilter,
      glWrapS,
      glWrapT,
      glWrapR
    };
  }

}

exports.WebGLSampler = WebGLSampler;
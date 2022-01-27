"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderPass = void 0;

var _murmurhash2_gc = require("../../utils/murmurhash2_gc.js");

var _define = require("./define.js");

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

/**
 * @packageDocumentation
 * @module gfx
 */

/**
 * @en GFX render pass.
 * @zh GFX 渲染过程。
 */
class RenderPass extends _define.GFXObject {
  get colorAttachments() {
    return this._colorInfos;
  }

  get depthStencilAttachment() {
    return this._depthStencilInfo;
  }

  get subPasses() {
    return this._subpasses;
  }

  get hash() {
    return this._hash;
  }

  constructor() {
    super(_define.ObjectType.RENDER_PASS);
    this._colorInfos = [];
    this._depthStencilInfo = null;
    this._subpasses = [];
    this._hash = 0;
  } // Based on render pass compatibility


  computeHash() {
    let res = '';

    if (this._subpasses.length) {
      for (let i = 0; i < this._subpasses.length; ++i) {
        const subpass = this._subpasses[i];

        if (subpass.inputs.length) {
          res += 'ia';

          for (let j = 0; j < subpass.inputs.length; ++j) {
            const ia = this._colorInfos[subpass.inputs[j]];
            res += `,${ia.format},${ia.sampleCount}`;
          }
        }

        if (subpass.colors.length) {
          res += 'ca';

          for (let j = 0; j < subpass.inputs.length; ++j) {
            const ca = this._colorInfos[subpass.inputs[j]];
            res += `,${ca.format},${ca.sampleCount}`;
          }
        }

        if (subpass.depthStencil >= 0) {
          const ds = this._colorInfos[subpass.depthStencil];
          res += `ds,${ds.format},${ds.sampleCount}`;
        }
      }
    } else {
      res += 'ca';

      for (let i = 0; i < this._colorInfos.length; ++i) {
        const ca = this._colorInfos[i];
        res += `,${ca.format},${ca.sampleCount}`;
      }

      const ds = this._depthStencilInfo;

      if (ds) {
        res += `ds,${ds.format},${ds.sampleCount}`;
      }
    }

    return (0, _murmurhash2_gc.murmurhash2_32_gc)(res, 666);
  }

}

exports.RenderPass = RenderPass;
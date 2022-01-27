"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyTexture = void 0;

var _define = require("../base/define.js");

var _texture = require("../base/texture.js");

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
class EmptyTexture extends _texture.Texture {
  initialize(info, isSwapchainTexture) {
    if ('texture' in info) {
      this._type = info.type;
      this._format = info.format;
      this._layerCount = info.layerCount;
      this._levelCount = info.levelCount;
      this._usage = info.texture.usage;
      this._width = info.texture.width;
      this._height = info.texture.height;
      this._depth = info.texture.depth;
      this._samples = info.texture.samples;
      this._flags = info.texture.flags;
    } else {
      this._type = info.type;
      this._usage = info.usage;
      this._format = info.format;
      this._width = info.width;
      this._height = info.height;
      this._depth = info.depth;
      this._layerCount = info.layerCount;
      this._levelCount = info.levelCount;
      this._samples = info.samples;
      this._flags = info.flags;
      this._isPowerOf2 = (0, _define.IsPowerOf2)(this._width) && (0, _define.IsPowerOf2)(this._height);
      this._size = (0, _define.FormatSurfaceSize)(this._format, this.width, this.height, this.depth, this._levelCount) * this._layerCount;
    }
  }

  destroy() {}

  resize(width, height) {
    this._width = width;
    this._height = height;
  }

  initAsSwapchainTexture(info) {}

}

exports.EmptyTexture = EmptyTexture;
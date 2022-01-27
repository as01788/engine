"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importFunc = exports.memorySize = exports.pageCount = exports.pageSize = void 0;

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
 * @hidden
 */
// Wasm Memory Page Size is 65536
const pageSize = 65536; // 64KiB
// How many pages of the wasm memory
// TODO: let this can be canfiguable by user.

exports.pageSize = pageSize;
const pageCount = 250; // How mush memory size of the wasm memory

exports.pageCount = pageCount;
const memorySize = pageSize * pageCount; // 16 MiB
// The import function used in c++ code, same as DLL Import

exports.memorySize = memorySize;
const importFunc = {
  syncPhysicsToGraphics(id) {
    const bt = globalThis.Bullet;
    const body = bt.CACHE.getWrapper(id, bt.BODY_CACHE_NAME);
    body.syncPhysicsToGraphics();
  }

};
exports.importFunc = importFunc;
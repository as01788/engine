"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForAmmoInstantiation = waitForAmmoInstantiation;
exports.bt = void 0;

var _bullet = _interopRequireWildcard(require("@cocos/bullet"));

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _physicsFramework = require("../../../exports/physics-framework.js");

var _bulletEnv = require("./bullet-env.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
// eslint-disable-next-line import/no-extraneous-dependencies
let bulletLibs = _bullet.default;

if (globalThis.BULLET) {
  console.log('[Physics][Bullet]: Using the external Bullet libs.');
  bulletLibs = globalThis.BULLET;
}

if (!_physicsFramework.physics.selector.runInEditor) bulletLibs = () => ({});
const bt = {};
exports.bt = bt;
globalThis.Bullet = bt;
bt.BODY_CACHE_NAME = 'body';

function waitForAmmoInstantiation(dirRoot) {
  // refer https://stackoverflow.com/questions/47879864/how-can-i-check-if-a-browser-supports-webassembly
  const supported = (() => {
    try {
      if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
        const module = new WebAssembly.Module(new Uint8Array([0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]));

        if (module instanceof WebAssembly.Module) {
          return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
      }
    } catch (e) {
      return false;
    }

    return false;
  })();

  return Promise.resolve().then(() => {
    if (_bullet.bulletType === 'fallback') {
      return (0, _bullet.default)(supported);
    }

    return bulletLibs;
  }).then(module => {
    if (typeof module === 'string') {
      console.info('[Physics][Bullet]: Using wasm Bullet libs.');

      const infoReport = msg => {
        console.info(msg);
      };

      const errorReport = msg => {
        console.error(msg);
      };

      const memory = new WebAssembly.Memory({
        initial: _bulletEnv.pageCount
      });
      const importObject = {
        cc: _bulletEnv.importFunc,
        wasi_snapshot_preview1: {
          fd_close: infoReport,
          fd_seek: infoReport,
          fd_write: infoReport
        },
        env: {
          memory
        }
      };
      return new Promise((resolve, reject) => {
        function instantiateWasm(buff) {
          WebAssembly.instantiate(buff, importObject).then(results => {
            const btInstance = results.instance.exports;
            Object.assign(bt, btInstance);
            resolve();
          }, errorReport);
        }

        if (_internal253Aconstants.WECHAT) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          const wasmFilePath = `${dirRoot}${module}`;
          instantiateWasm(wasmFilePath);
        } else {
          fetch(module).then(response => {
            response.arrayBuffer().then(buff => {
              instantiateWasm(buff);
            }, errorReport);
          }, errorReport);
        }
      });
    } else {
      console.info('[Physics][Bullet]: Using asmjs Bullet libs.');
      const env = _bulletEnv.importFunc;
      const wasmMemory = {};
      wasmMemory.buffer = new ArrayBuffer(_bulletEnv.pageSize * _bulletEnv.pageCount);
      env.memory = wasmMemory;
      const btInstance = module(env, wasmMemory);
      Object.assign(bt, btInstance);
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  });
}
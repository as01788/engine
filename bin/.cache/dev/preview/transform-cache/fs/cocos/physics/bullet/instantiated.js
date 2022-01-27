System.register("q-bundled:///fs/cocos/physics/bullet/instantiated.js", ["@cocos/bullet", "../../../../virtual/internal%253Aconstants.js", "../../../exports/physics-framework.js", "./bullet-env.js"], function (_export, _context) {
  "use strict";

  var bulletModule, bulletType, WECHAT, physics, pageSize, pageCount, importFunc, bulletLibs, bt;

  function waitForAmmoInstantiation(dirRoot) {
    // refer https://stackoverflow.com/questions/47879864/how-can-i-check-if-a-browser-supports-webassembly
    var supported = function () {
      try {
        if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
          var module = new WebAssembly.Module(new Uint8Array([0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]));

          if (module instanceof WebAssembly.Module) {
            return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
          }
        }
      } catch (e) {
        return false;
      }

      return false;
    }();

    return Promise.resolve().then(function () {
      if (bulletType === 'fallback') {
        return bulletModule(supported);
      }

      return bulletLibs;
    }).then(function (module) {
      if (typeof module === 'string') {
        console.info('[Physics][Bullet]: Using wasm Bullet libs.');

        var infoReport = function infoReport(msg) {
          console.info(msg);
        };

        var errorReport = function errorReport(msg) {
          console.error(msg);
        };

        var memory = new WebAssembly.Memory({
          initial: pageCount
        });
        var importObject = {
          cc: importFunc,
          wasi_snapshot_preview1: {
            fd_close: infoReport,
            fd_seek: infoReport,
            fd_write: infoReport
          },
          env: {
            memory: memory
          }
        };
        return new Promise(function (resolve, reject) {
          function instantiateWasm(buff) {
            WebAssembly.instantiate(buff, importObject).then(function (results) {
              var btInstance = results.instance.exports;
              Object.assign(bt, btInstance);
              resolve();
            }, errorReport);
          }

          if (WECHAT) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            var wasmFilePath = "" + dirRoot + module;
            instantiateWasm(wasmFilePath);
          } else {
            fetch(module).then(function (response) {
              response.arrayBuffer().then(function (buff) {
                instantiateWasm(buff);
              }, errorReport);
            }, errorReport);
          }
        });
      } else {
        console.info('[Physics][Bullet]: Using asmjs Bullet libs.');
        var env = importFunc;
        var wasmMemory = {};
        wasmMemory.buffer = new ArrayBuffer(pageSize * pageCount);
        env.memory = wasmMemory;
        var btInstance = module(env, wasmMemory);
        Object.assign(bt, btInstance);
        return new Promise(function (resolve, reject) {
          resolve();
        });
      }
    });
  }

  _export("waitForAmmoInstantiation", waitForAmmoInstantiation);

  return {
    setters: [function (_cocosBullet) {
      bulletModule = _cocosBullet.default;
      bulletType = _cocosBullet.bulletType;
    }, function (_virtualInternal253AconstantsJs) {
      WECHAT = _virtualInternal253AconstantsJs.WECHAT;
    }, function (_exportsPhysicsFrameworkJs) {
      physics = _exportsPhysicsFrameworkJs.physics;
    }, function (_bulletEnvJs) {
      pageSize = _bulletEnvJs.pageSize;
      pageCount = _bulletEnvJs.pageCount;
      importFunc = _bulletEnvJs.importFunc;
    }],
    execute: function () {
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
      bulletLibs = bulletModule;

      if (globalThis.BULLET) {
        console.log('[Physics][Bullet]: Using the external Bullet libs.');
        bulletLibs = globalThis.BULLET;
      }

      if (!physics.selector.runInEditor) bulletLibs = function bulletLibs() {
        return {};
      };

      _export("bt", bt = {});

      globalThis.Bullet = bt;
      bt.BODY_CACHE_NAME = 'body';
    }
  };
});
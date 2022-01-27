System.register("q-bundled:///fs/cocos/core/memop/container-manager.js", ["../utils/js.js"], function (_export, _context) {
  "use strict";

  var js, ContainerManager, containerManager;
  return {
    setters: [function (_utilsJsJs) {
      js = _utilsJsJs.js;
    }],
    execute: function () {
      /*
       Copyright (c) 2021 Xiamen Yaji Software Co., Ltd.
      
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
      ContainerManager = /*#__PURE__*/function () {
        function ContainerManager() {
          this._pools = [];
          this._lastShrinkPassed = 0;
          this.shrinkTimeSpan = 5;
        }

        var _proto = ContainerManager.prototype;

        _proto.addContainer = function addContainer(pool) {
          if (pool._poolHandle !== -1) return;
          pool._poolHandle = this._pools.length;

          this._pools.push(pool);
        };

        _proto.removeContainer = function removeContainer(pool) {
          if (pool._poolHandle === -1) return;
          this._pools[this._pools.length - 1]._poolHandle = pool._poolHandle;
          js.array.fastRemoveAt(this._pools, pool._poolHandle);
          pool._poolHandle = -1;
        };

        _proto.tryShrink = function tryShrink() {
          for (var i = 0; i < this._pools.length; i++) {
            this._pools[i].tryShrink();
          }
        };

        _proto.update = function update(dt) {
          this._lastShrinkPassed += dt;

          if (this._lastShrinkPassed > this.shrinkTimeSpan) {
            this.tryShrink();
            this._lastShrinkPassed -= this.shrinkTimeSpan;
          }
        };

        return ContainerManager;
      }();

      _export("containerManager", containerManager = new ContainerManager());
    }
  };
});
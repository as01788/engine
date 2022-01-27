System.register("q-bundled:///fs/cocos/3d/skeletal-animation/skeletal-animation-data-hub.js", ["../../core/global-exports.js", "../../core/animation/internal-symbols.js"], function (_export, _context) {
  "use strict";

  var legacyCC, BAKE_SKELETON_CURVE_SYMBOL, SkelAnimDataHub;
  return {
    setters: [function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreAnimationInternalSymbolsJs) {
      BAKE_SKELETON_CURVE_SYMBOL = _coreAnimationInternalSymbolsJs.BAKE_SKELETON_CURVE_SYMBOL;
    }],
    execute: function () {
      /*
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
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
       * @module animation
       */

      /**
       * 骨骼动画数据转换中心。
       */
      _export("SkelAnimDataHub", SkelAnimDataHub = /*#__PURE__*/function () {
        function SkelAnimDataHub() {}

        SkelAnimDataHub.getOrExtract = function getOrExtract(clip) {
          var data = SkelAnimDataHub.pool.get(clip);

          if (!data || data.samples !== clip.sample) {
            // release outdated render data
            if (data) {
              legacyCC.director.root.dataPoolManager.releaseAnimationClip(clip);
            }

            var frames = Math.ceil(clip.sample * clip.duration) + 1;
            var step = clip.sample;
            data = clip[BAKE_SKELETON_CURVE_SYMBOL](0, step, frames);
            SkelAnimDataHub.pool.set(clip, data);
          }

          return data;
        };

        SkelAnimDataHub.destroy = function destroy(clip) {
          SkelAnimDataHub.pool["delete"](clip);
        };

        return SkelAnimDataHub;
      }());

      SkelAnimDataHub.pool = new Map();
    }
  };
});
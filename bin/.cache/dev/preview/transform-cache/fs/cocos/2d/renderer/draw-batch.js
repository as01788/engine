System.register("q-bundled:///fs/cocos/2d/renderer/draw-batch.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/scene-graph/layers.js", "../../core/global-exports.js", "../../core/renderer/core/pass.js", "../../core/renderer/scene/index.js"], function (_export, _context) {
  "use strict";

  var JSB, Layers, legacyCC, Pass, NativeDrawBatch2D, UI_VIS_FLAG, DrawBatch2D;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_coreSceneGraphLayersJs) {
      Layers = _coreSceneGraphLayersJs.Layers;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreRendererCorePassJs) {
      Pass = _coreRendererCorePassJs.Pass;
    }, function (_coreRendererSceneIndexJs) {
      NativeDrawBatch2D = _coreRendererSceneIndexJs.NativeDrawBatch2D;
    }],
    execute: function () {
      UI_VIS_FLAG = Layers.Enum.NONE | Layers.Enum.UI_3D;

      _export("DrawBatch2D", DrawBatch2D = /*#__PURE__*/function () {
        function DrawBatch2D() {
          this.bufferBatch = null;
          this.camera = null;
          this.renderScene = null;
          this.model = null;
          this.texture = null;
          this.sampler = null;
          this.useLocalData = null;
          this.isStatic = false;
          this.textureHash = 0;
          this.samplerHash = 0;
          this._passes = [];
          this._shaders = [];
          this._visFlags = UI_VIS_FLAG;
          this._inputAssember = null;
          this._descriptorSet = null;

          if (JSB) {
            this._nativeObj = new NativeDrawBatch2D();
            this._nativeObj.visFlags = this._visFlags;
          }
        }

        var _proto = DrawBatch2D.prototype;

        _proto.destroy = function destroy(ui) {
          this._passes = [];

          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto.clear = function clear() {
          this.bufferBatch = null;
          this.inputAssembler = null;
          this.descriptorSet = null;
          this.camera = null;
          this.texture = null;
          this.sampler = null;
          this.model = null;
          this.isStatic = false;
          this.useLocalData = null;
          this.visFlags = UI_VIS_FLAG;
          this.renderScene = null;
        } // object version
        ;

        _proto.fillPasses = function fillPasses(mat, dss, dssHash, bs, bsHash, patches, batcher) {
          if (mat) {
            var passes = mat.passes;

            if (!passes) {
              return;
            }

            var hashFactor = 0;
            var dirty = false;
            this._shaders.length = passes.length;

            for (var i = 0; i < passes.length; i++) {
              if (!this._passes[i]) {
                this._passes[i] = new Pass(legacyCC.director.root);
              }

              var mtlPass = passes[i];
              var passInUse = this._passes[i];
              mtlPass.update(); // Hack: Cause pass.hash can not check all pass value

              if (!dss) {
                dss = mtlPass.depthStencilState;
                dssHash = 0;
              }

              if (!bs) {
                bs = mtlPass.blendState;
                bsHash = 0;
              }

              if (bsHash === -1) {
                bsHash = 0;
              }

              hashFactor = dssHash << 16 | bsHash; // @ts-expect-error hack for UI use pass object

              passInUse._initPassFromTarget(mtlPass, dss, bs, hashFactor);

              this._shaders[i] = passInUse.getShaderVariant(patches);
              dirty = true;
            }

            if (JSB) {
              if (dirty) {
                var nativePasses = [];
                var _passes = this._passes;

                for (var _i = 0; _i < _passes.length; _i++) {
                  nativePasses.push(_passes[_i]["native"]);
                }

                this._nativeObj.passes = nativePasses;
                this._nativeObj.shaders = this._shaders;
              }
            }
          }
        };

        _createClass(DrawBatch2D, [{
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }, {
          key: "inputAssembler",
          get: function get() {
            return this._inputAssember;
          },
          set: function set(ia) {
            this._inputAssember = ia;

            if (JSB) {
              this._nativeObj.inputAssembler = ia;
            }
          }
        }, {
          key: "descriptorSet",
          get: function get() {
            return this._descriptorSet;
          },
          set: function set(ds) {
            this._descriptorSet = ds;

            if (JSB) {
              this._nativeObj.descriptorSet = ds;
            }
          }
        }, {
          key: "visFlags",
          get: function get() {
            return this._visFlags;
          },
          set: function set(vis) {
            this._visFlags = vis;

            if (JSB) {
              this._nativeObj.visFlags = vis;
            }
          }
        }, {
          key: "passes",
          get: function get() {
            return this._passes;
          }
        }, {
          key: "shaders",
          get: function get() {
            return this._shaders;
          }
        }]);

        return DrawBatch2D;
      }());
    }
  };
});
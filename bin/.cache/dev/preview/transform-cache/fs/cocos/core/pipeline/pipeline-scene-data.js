System.register("q-bundled:///fs/cocos/core/pipeline/pipeline-scene-data.js", ["../../../../virtual/internal%253Aconstants.js", "../renderer/scene/fog.js", "../renderer/scene/ambient.js", "../renderer/scene/skybox.js", "../renderer/scene/shadows.js", "../renderer/scene/octree.js", "../gfx/index.js", "../assets/index.js", "../renderer/scene/index.js", "./pipeline-event.js"], function (_export, _context) {
  "use strict";

  var JSB, Fog, Ambient, Skybox, Shadows, Octree, InputAssemblerInfo, BufferInfo, BufferUsageBit, MemoryUsageBit, Attribute, Format, Material, NativePipelineSharedSceneData, PipelineEventType, PipelineSceneData;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_rendererSceneFogJs) {
      Fog = _rendererSceneFogJs.Fog;
    }, function (_rendererSceneAmbientJs) {
      Ambient = _rendererSceneAmbientJs.Ambient;
    }, function (_rendererSceneSkyboxJs) {
      Skybox = _rendererSceneSkyboxJs.Skybox;
    }, function (_rendererSceneShadowsJs) {
      Shadows = _rendererSceneShadowsJs.Shadows;
    }, function (_rendererSceneOctreeJs) {
      Octree = _rendererSceneOctreeJs.Octree;
    }, function (_gfxIndexJs) {
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      BufferInfo = _gfxIndexJs.BufferInfo;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      Attribute = _gfxIndexJs.Attribute;
      Format = _gfxIndexJs.Format;
    }, function (_assetsIndexJs) {
      Material = _assetsIndexJs.Material;
    }, function (_rendererSceneIndexJs) {
      NativePipelineSharedSceneData = _rendererSceneIndexJs.NativePipelineSharedSceneData;
    }, function (_pipelineEventJs) {
      PipelineEventType = _pipelineEventJs.PipelineEventType;
    }],
    execute: function () {
      _export("PipelineSceneData", PipelineSceneData = /*#__PURE__*/function () {
        var _proto = PipelineSceneData.prototype;

        _proto._init = function _init() {
          if (JSB) {
            this._nativeObj = new NativePipelineSharedSceneData();
            this._nativeObj.fog = this.fog["native"];
            this._nativeObj.ambient = this.ambient["native"];
            this._nativeObj.skybox = this.skybox["native"];
            this._nativeObj.shadow = this.shadows["native"];
            this._nativeObj.octree = this.octree["native"];
          }
        };

        function PipelineSceneData() {
          this.fog = new Fog();
          this.ambient = new Ambient();
          this.skybox = new Skybox();
          this.shadows = new Shadows();
          this.octree = new Octree();
          this.validPunctualLights = [];
          this.renderObjects = [];
          this.castShadowObjects = [];
          this.dirShadowObjects = [];
          this.shadowFrameBufferMap = new Map();
          this._occlusionQueryVertexBuffer = null;
          this._occlusionQueryIndicesBuffer = null;
          this._occlusionQueryInputAssembler = null;
          this._occlusionQueryMaterial = null;
          this._occlusionQueryShader = null;
          this._isHDR = true;
          this._shadingScale = 1.0;

          this._init();

          this.shadingScale = 1.0;
        }

        _proto.activate = function activate(device, pipeline) {
          this._device = device;
          this._pipeline = pipeline;
          this.initOcclusionQuery();
          return true;
        };

        _proto.initOcclusionQuery = function initOcclusionQuery() {
          if (!this._occlusionQueryInputAssembler) {
            this._occlusionQueryInputAssembler = this._createOcclusionQueryIA();

            if (JSB) {
              this._nativeObj.occlusionQueryInputAssembler = this._occlusionQueryInputAssembler;
            }
          }

          if (!this._occlusionQueryMaterial) {
            var mat = new Material();
            mat._uuid = 'default-occlusion-query-material';
            mat.initialize({
              effectName: 'occlusion-query'
            });
            this._occlusionQueryMaterial = mat;
            this._occlusionQueryShader = mat.passes[0].getShaderVariant();

            if (JSB) {
              this._nativeObj.occlusionQueryPass = this._occlusionQueryMaterial.passes[0]["native"];
              this._nativeObj.occlusionQueryShader = this._occlusionQueryShader;
            }
          }
        };

        _proto.getOcclusionQueryPass = function getOcclusionQueryPass() {
          return this._occlusionQueryMaterial.passes[0];
        };

        _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {};

        _proto.destroy = function destroy() {
          var _this$_occlusionQuery, _this$_occlusionQuery2, _this$_occlusionQuery3;

          this.ambient.destroy();
          this.skybox.destroy();
          this.fog.destroy();
          this.shadows.destroy();
          this.octree.destroy();
          this.validPunctualLights.length = 0;
          (_this$_occlusionQuery = this._occlusionQueryInputAssembler) === null || _this$_occlusionQuery === void 0 ? void 0 : _this$_occlusionQuery.destroy();
          this._occlusionQueryInputAssembler = null;
          (_this$_occlusionQuery2 = this._occlusionQueryVertexBuffer) === null || _this$_occlusionQuery2 === void 0 ? void 0 : _this$_occlusionQuery2.destroy();
          this._occlusionQueryVertexBuffer = null;
          (_this$_occlusionQuery3 = this._occlusionQueryIndicesBuffer) === null || _this$_occlusionQuery3 === void 0 ? void 0 : _this$_occlusionQuery3.destroy();
          this._occlusionQueryIndicesBuffer = null;

          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto._createOcclusionQueryIA = function _createOcclusionQueryIA() {
          // create vertex buffer
          var device = this._device;
          var vertices = new Float32Array([-1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1]);
          var vbStride = Float32Array.BYTES_PER_ELEMENT * 3;
          var vbSize = vbStride * 8;
          this._occlusionQueryVertexBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, vbSize, vbStride));

          this._occlusionQueryVertexBuffer.update(vertices); // create index buffer


          var indices = new Uint16Array([0, 2, 1, 1, 2, 3, 4, 5, 6, 5, 7, 6, 1, 3, 7, 1, 7, 5, 0, 4, 6, 0, 6, 2, 0, 1, 5, 0, 5, 4, 2, 6, 7, 2, 7, 3]);
          var ibStride = Uint16Array.BYTES_PER_ELEMENT;
          var ibSize = ibStride * 36;
          this._occlusionQueryIndicesBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, ibSize, ibStride));

          this._occlusionQueryIndicesBuffer.update(indices);

          var attributes = [new Attribute('a_position', Format.RGB32F)]; // create cube input assembler

          var info = new InputAssemblerInfo(attributes, [this._occlusionQueryVertexBuffer], this._occlusionQueryIndicesBuffer);
          var inputAssembler = device.createInputAssembler(info);
          return inputAssembler;
        };

        _createClass(PipelineSceneData, [{
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
          /**
            * @en Is open HDR.
            * @zh 是否开启 HDR。
            * @readonly
            */

        }, {
          key: "isHDR",
          get: function get() {
            return this._isHDR;
          },
          set: function set(val) {
            this._isHDR = val;

            if (JSB) {
              this._nativeObj.isHDR = val;
            }
          }
        }, {
          key: "shadingScale",
          get: function get() {
            return this._shadingScale;
          },
          set: function set(val) {
            if (this._shadingScale !== val) {
              this._shadingScale = val;

              if (JSB) {
                this._nativeObj.shadingScale = val;
              }

              this._pipeline.emit(PipelineEventType.ATTACHMENT_SCALE_CAHNGED, val);
            }
          }
        }]);

        return PipelineSceneData;
      }());
    }
  };
});
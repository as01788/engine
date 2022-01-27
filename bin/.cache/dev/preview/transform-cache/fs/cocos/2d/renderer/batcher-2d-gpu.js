System.register("q-bundled:///fs/cocos/2d/renderer/batcher-2d-gpu.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/assets/material.js", "../../core/gfx/index.js", "../../core/memop/index.js", "../../core/memop/cached-array.js", "./mesh-buffer.js", "./stencil-manager.js", "./draw-batch-gpu.js", "./vertex-format.js", "../../core/global-exports.js", "../../core/pipeline/define.js", "../../core/math/index.js", "./render-uniform-buffer.js", "./common-quad-ia.js", "../../core/platform/sys.js", "./draw-batch.js"], function (_export, _context) {
  "use strict";

  var JSB, Material, DescriptorSetInfo, BufferInfo, BufferUsageBit, MemoryUsageBit, Pool, RecyclePool, CachedArray, MeshBuffer, Stage, StencilManager, DrawBatch2DGPU, VertexFormat, legacyCC, ModelLocalBindings, UBOLocal, Mat4, UILocalUBOManger, CommonQuadIA, sys, DrawBatch2D, _dsInfo, m4_1, Batcher2D, LocalDescriptorSet, DescriptorSetCache;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_coreAssetsMaterialJs) {
      Material = _coreAssetsMaterialJs.Material;
    }, function (_coreGfxIndexJs) {
      DescriptorSetInfo = _coreGfxIndexJs.DescriptorSetInfo;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
    }, function (_coreMemopIndexJs) {
      Pool = _coreMemopIndexJs.Pool;
      RecyclePool = _coreMemopIndexJs.RecyclePool;
    }, function (_coreMemopCachedArrayJs) {
      CachedArray = _coreMemopCachedArrayJs.CachedArray;
    }, function (_meshBufferJs) {
      MeshBuffer = _meshBufferJs.MeshBuffer;
    }, function (_stencilManagerJs) {
      Stage = _stencilManagerJs.Stage;
      StencilManager = _stencilManagerJs.StencilManager;
    }, function (_drawBatchGpuJs) {
      DrawBatch2DGPU = _drawBatchGpuJs.DrawBatch2DGPU;
    }, function (_vertexFormatJs) {
      VertexFormat = _vertexFormatJs;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_corePipelineDefineJs) {
      ModelLocalBindings = _corePipelineDefineJs.ModelLocalBindings;
      UBOLocal = _corePipelineDefineJs.UBOLocal;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
    }, function (_renderUniformBufferJs) {
      UILocalUBOManger = _renderUniformBufferJs.UILocalUBOManger;
    }, function (_commonQuadIaJs) {
      CommonQuadIA = _commonQuadIaJs.CommonQuadIA;
    }, function (_corePlatformSysJs) {
      sys = _corePlatformSysJs.sys;
    }, function (_drawBatchJs) {
      DrawBatch2D = _drawBatchJs.DrawBatch2D;
    }],
    execute: function () {
      _dsInfo = new DescriptorSetInfo(null);
      m4_1 = new Mat4();
      /**
       * @zh
       * UI 渲染流程
       */

      _export("Batcher2D", Batcher2D = /*#__PURE__*/function () {
        var _proto = Batcher2D.prototype;

        /**
         * Acquire a new mesh buffer if the vertex layout differs from the current one.
         * @param attributes
         */
        _proto.acquireBufferBatch = function acquireBufferBatch(attributes) {
          if (attributes === void 0) {
            attributes = VertexFormat.vfmtPosUvColor;
          }

          var strideBytes = attributes === VertexFormat.vfmtPosUvColor ? 36
          /* 9x4 */
          : VertexFormat.getAttributeStride(attributes);

          if (!this._currMeshBuffer || this._currMeshBuffer.vertexFormatBytes !== strideBytes) {
            this._requireBufferBatch(attributes);

            return this._currMeshBuffer;
          }

          return this._currMeshBuffer;
        };

        _proto.registerCustomBuffer = function registerCustomBuffer(attributes, callback) {
          var batch;

          if (attributes instanceof MeshBuffer) {
            batch = attributes;
          } else {
            batch = this._bufferBatchPool.add();
            batch.initialize(attributes, callback || this._recreateMeshBuffer.bind(this, attributes));
          }

          var strideBytes = batch.vertexFormatBytes;

          var buffers = this._customMeshBuffers.get(strideBytes);

          if (!buffers) {
            buffers = [];

            this._customMeshBuffers.set(strideBytes, buffers);
          }

          buffers.push(batch);
          return batch;
        };

        _proto.unRegisterCustomBuffer = function unRegisterCustomBuffer(buffer) {
          var buffers = this._customMeshBuffers.get(buffer.vertexFormatBytes);

          if (buffers) {
            for (var i = 0; i < buffers.length; i++) {
              if (buffers[i] === buffer) {
                buffers.splice(i, 1);
                break;
              }
            }
          } // release the buffer to recycle pool --


          var idx = this._bufferBatchPool.data.indexOf(buffer);

          if (idx !== -1) {
            buffer.reset();

            this._bufferBatchPool.removeAt(idx);
          } // ---

        };

        // -------------------------------------
        function Batcher2D(_root) {
          var _this = this;

          this.device = void 0;
          this._screens = [];
          this._drawBatchPool = void 0;
          this._bufferBatchPool = new RecyclePool(function () {
            return new MeshBuffer(_this);
          }, 128);
          this._meshBuffers = new Map();
          this._customMeshBuffers = new Map();
          this._meshBufferUseCount = new Map();
          this._batches = void 0;
          this._emptyMaterial = new Material();
          this._currScene = null;
          this._currMaterial = this._emptyMaterial;
          this._currTexture = null;
          this._currSampler = null;
          this._currMeshBuffer = null;
          this._currStaticRoot = null;
          this._currComponent = null;
          this._currTransform = null;
          this._currTextureHash = 0;
          this._currSamplerHash = 0;
          this._currBlendTargetHash = 0;
          this._currLayer = 0;
          this._currDepthStencilStateStage = null;
          this._currIsStatic = false;
          this._descriptorSetCache = new DescriptorSetCache();
          this._dummyIA = void 0;
          this._localUBOManager = void 0;
          this._currTypeIsGPU = false;
          this._reloadBatchDirty = void 0;
          this._root = _root;
          this.device = _root.device;
          this._batches = new CachedArray(64);
          this._drawBatchPool = new Pool(function () {
            return new DrawBatch2DGPU();
          }, 128); // macro.UI_GPU_DRIVEN

          this._dummyIA = new CommonQuadIA(this.device);
          this._localUBOManager = new UILocalUBOManger(this.device);
          this._reloadBatchDirty = true;
          this._currBatch = this._drawBatchPool.alloc();
        }

        _proto.initialize = function initialize() {
          var _this2 = this;

          // macro.UI_GPU_DRIVEN
          legacyCC.director.on(legacyCC.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            _this2._reloadBatchDirty = true;
          });
          return true;
        };

        _proto.destroy = function destroy() {
          var _this3 = this;

          for (var i = 0; i < this._batches.length; i++) {
            if (this._batches.array[i]) {
              this._batches.array[i].destroy(this);
            }
          }

          this._batches.destroy();

          for (var _iterator = _createForOfIteratorHelperLoose(this._meshBuffers.keys()), _step; !(_step = _iterator()).done;) {
            var size = _step.value;

            var buffers = this._meshBuffers.get(size);

            if (buffers) {
              buffers.forEach(function (buffer) {
                return buffer.destroy();
              });
            }
          }

          if (this._drawBatchPool) {
            this._drawBatchPool.destroy(function (obj) {
              obj.destroy(_this3);
            });
          }

          this._descriptorSetCache.destroy();

          this._meshBuffers.clear();

          StencilManager.sharedManager.destroy();
        }
        /**
         * @en
         * Add the managed Canvas.
         *
         * @zh
         * 添加屏幕组件管理。
         *
         * @param comp - 屏幕组件。
         */
        ;

        _proto.addScreen = function addScreen(comp) {
          this._screens.push(comp);

          this._screens.sort(this._screenSort);
        };

        _proto.getFirstRenderCamera = function getFirstRenderCamera(node) {
          if (node.scene && node.scene.renderScene) {
            var cameras = node.scene.renderScene.cameras;

            for (var i = 0; i < cameras.length; i++) {
              var camera = cameras[i];

              if (camera.visibility & node.layer) {
                return camera;
              }
            }
          }

          return null;
        }
        /**
         * @zh
         * Removes the Canvas from the list.
         *
         * @param comp - 被移除的屏幕。
         */
        ;

        _proto.removeScreen = function removeScreen(comp) {
          var idx = this._screens.indexOf(comp);

          if (idx === -1) {
            return;
          }

          this._screens.splice(idx, 1);
        };

        _proto.sortScreens = function sortScreens() {
          this._screens.sort(this._screenSort);
        };

        _proto.update = function update() {
          // macro.UI_GPU_DRIVEN
          this._localUBOManager.reset();

          if (this._reloadBatchDirty) {
            // release localDS
            this._descriptorSetCache.releaseAllByBuffer();
          }

          var screens = this._screens;

          for (var i = 0; i < screens.length; ++i) {
            var screen = screens[i];

            if (!screen.enabledInHierarchy) {
              continue;
            }

            this._recursiveScreenNode(screen.node); // macro.UI_GPU_DRIVEN


            this._currTypeIsGPU = false;
          }

          var batchPriority = 0;

          if (this._batches.length) {
            for (var _i = 0; _i < this._batches.length; ++_i) {
              var batch = this._batches.array[_i];
              if (!batch.renderScene) continue;

              if (batch.model) {
                var subModels = batch.model.subModels;

                for (var j = 0; j < subModels.length; j++) {
                  subModels[j].priority = batchPriority++;
                }
              } else {
                // macro.UI_GPU_DRIVEN
                for (var _i2 = 0; _i2 < batch.drawCalls.length; _i2++) {
                  batch.drawCalls[_i2].descriptorSet = this._descriptorSetCache.getDescriptorSet(batch, batch.drawCalls[_i2]);
                }
              }

              batch.renderScene.addBatch(batch);
            }
          }
        };

        _proto.uploadBuffers = function uploadBuffers() {
          if (this._batches.length > 0) {
            var buffers = this._meshBuffers;
            buffers.forEach(function (value, key) {
              value.forEach(function (bb) {
                bb.uploadBuffers();
                bb.reset();
              });
            });
            var customs = this._customMeshBuffers;
            customs.forEach(function (value, key) {
              value.forEach(function (bb) {
                bb.uploadBuffers();
                bb.reset();
              });
            });

            this._descriptorSetCache.update(); // macro.UI_GPU_DRIVEN


            this._localUBOManager.updateBuffer();

            this._reloadBatchDirty = false;
          }
        };

        _proto.reset = function reset() {
          for (var i = 0; i < this._batches.length; ++i) {
            var batch = this._batches.array[i];

            if (batch.isStatic) {
              continue;
            }

            DrawBatch2D.drawcallPool.freeArray(batch.drawCalls);
            batch.clear();

            this._drawBatchPool.free(batch);
          }

          this._currLayer = 0;
          this._currMaterial = this._emptyMaterial;
          this._currTexture = null;
          this._currSampler = null;
          this._currComponent = null;
          this._currTransform = null;
          this._currScene = null;
          this._currMeshBuffer = null;

          this._meshBufferUseCount.clear(); // macro.UI_GPU_DRIVEN


          this._batches.clear();

          StencilManager.sharedManager.reset();

          this._descriptorSetCache.reset();
        } // macro.UI_GPU_DRIVEN
        ;

        _proto._commitCompByGPU = function _commitCompByGPU(comp, frame, assembler, transform) {
          var renderComp = comp;
          var texture;
          var samp;
          var textureHash = 0;
          var samplerHash = 0;

          if (frame) {
            texture = frame.getGFXTexture();
            samp = frame.getGFXSampler();
            textureHash = frame.getHash();
            samplerHash = samp.hash;
          } else {
            texture = null;
            samp = null;
          }

          var renderScene = renderComp._getRenderScene();

          var mat = renderComp.getRenderMaterial(0);
          renderComp.stencilStage = StencilManager.sharedManager.stage;
          var blendTargetHash = renderComp.blendHash;
          var depthStencilStateStage = renderComp.stencilStage;

          if (this._currScene !== renderScene || this._currLayer !== comp.node.layer || this._currMaterial !== mat || this._currBlendTargetHash !== blendTargetHash || this._currDepthStencilStateStage !== depthStencilStateStage || this._currTextureHash !== textureHash || this._currSamplerHash !== samplerHash || this._currTransform !== transform || this._currTypeIsGPU !== true) {
            if (this._currTypeIsGPU) {
              // G -> G
              this.autoMergeBatchesByGPU(this._currComponent);
              this._currBatch = this._drawBatchPool.alloc();
              this._currBatch.capacityDirty = true;
            } else {
              // A -> G
              this.autoMergeBatches(this._currComponent);
              this._currBatch = this._drawBatchPool.alloc();
            }

            this._currScene = renderScene;
            this._currComponent = renderComp;
            this._currTransform = transform;
            this._currMaterial = mat;
            this._currTexture = texture;
            this._currSampler = samp;
            this._currTextureHash = textureHash;
            this._currSamplerHash = samplerHash;
            this._currBlendTargetHash = blendTargetHash;
            this._currDepthStencilStateStage = depthStencilStateStage;
            this._currLayer = comp.node.layer;
          }

          this._currTypeIsGPU = true;
          var uiPros = comp.node._uiProps;

          if (comp.node.hasChangedFlags) {
            uiPros.uiTransformComp.setRectDirty(comp.node.hasChangedFlags);
          }

          var localBuffer = this._currBatch.fillBuffers(comp, this._localUBOManager, mat, this);

          this._resetRenderDirty(comp);

          this._currBatch.fillDrawCall(localBuffer);
        };

        _proto._commitComp = function _commitComp(comp, frame, assembler, transform) {
          var renderComp = comp;
          var texture;
          var samp;
          var textureHash = 0;
          var samplerHash = 0;

          if (frame) {
            texture = frame.getGFXTexture();
            samp = frame.getGFXSampler();
            textureHash = frame.getHash();
            samplerHash = samp.hash;
          } else {
            texture = null;
            samp = null;
          }

          var renderScene = renderComp._getRenderScene();

          var mat = renderComp.getRenderMaterial(0);
          renderComp.stencilStage = StencilManager.sharedManager.stage;
          var blendTargetHash = renderComp.blendHash;
          var depthStencilStateStage = renderComp.stencilStage;

          if (this._currScene !== renderScene || this._currLayer !== comp.node.layer || this._currMaterial !== mat || this._currBlendTargetHash !== blendTargetHash || this._currDepthStencilStateStage !== depthStencilStateStage || this._currTextureHash !== textureHash || this._currSamplerHash !== samplerHash || this._currTransform !== transform || this._currTypeIsGPU !== false) {
            // macro.UI_GPU_DRIVEN
            if (this._currTypeIsGPU) {
              // G -> A
              this.autoMergeBatchesByGPU(this._currComponent);
              this._currBatch = this._drawBatchPool.alloc();
              this._currBatch.capacityDirty = true;
            } else {
              // A -> A
              this.autoMergeBatches(this._currComponent);
              this._currBatch = this._drawBatchPool.alloc();
            }

            this._currScene = renderScene;
            this._currComponent = renderComp;
            this._currTransform = transform;
            this._currMaterial = mat;
            this._currTexture = texture;
            this._currSampler = samp;
            this._currTextureHash = textureHash;
            this._currSamplerHash = samplerHash;
            this._currBlendTargetHash = blendTargetHash;
            this._currDepthStencilStateStage = depthStencilStateStage;
            this._currLayer = comp.node.layer;
            this._currBatch.capacityDirty = true;
          }

          this._currTypeIsGPU = false;

          if (assembler) {
            assembler.fillBuffers(renderComp, this);
          }
        }
        /**
         * @en
         * Render component data submission process of UI.
         * The submitted vertex data is the UI for world coordinates.
         * For example: The UI components except Graphics and UIModel.
         *
         * @zh
         * UI 渲染组件数据提交流程（针对提交的顶点数据是世界坐标的提交流程，例如：除 Graphics 和 UIModel 的大部分 ui 组件）。
         * 此处的数据最终会生成需要提交渲染的 model 数据。
         *
         * @param comp - 当前执行组件。
         * @param frame - 当前执行组件贴图。
         * @param assembler - 当前组件渲染数据组装器。
         */
        ;

        _proto.commitComp = function commitComp(comp, frame, assembler, transform) {
          // @ts-expect-error hack
          if (comp._canDrawByFourVertex) {
            this._commitCompByGPU(comp, frame, assembler, transform);
          } else {
            this._commitComp(comp, frame, assembler, transform);
          }
        }
        /**
         * @en
         * Render component data submission process of UI.
         * The submitted vertex data is the UI for local coordinates.
         * For example: The UI components of Graphics and UIModel.
         *
         * @zh
         * UI 渲染组件数据提交流程（针对例如： Graphics 和 UIModel 等数据量较为庞大的 ui 组件）。
         *
         * @param comp - 当前执行组件。
         * @param model - 提交渲染的 model 数据。
         * @param mat - 提交渲染的材质。
         */
        ;

        _proto.commitModel = function commitModel(comp, model, mat) {
          // if the last comp is spriteComp, previous comps should be batched.
          // macro.UI_GPU_DRIVEN
          if (this._currMaterial !== this._emptyMaterial) {
            if (this._currTypeIsGPU) {
              this.autoMergeBatchesByGPU(this._currComponent);
            } else {
              this.autoMergeBatches(this._currComponent);
            }
          }

          var depthStencil;
          var dssHash = 0;

          if (mat) {
            // Notice: A little hack, if not this two stage, not need update here, while control by stencilManger
            if (comp.stencilStage === Stage.ENABLED || comp.stencilStage === Stage.DISABLED) {
              comp.stencilStage = StencilManager.sharedManager.stage;
            }

            depthStencil = StencilManager.sharedManager.getStencilStage(comp.stencilStage, mat);
            dssHash = StencilManager.sharedManager.getStencilHash(comp.stencilStage);
          }

          var stamp = legacyCC.director.getTotalFrames();

          if (model) {
            model.updateTransform(stamp);
            model.updateUBOs(stamp);
          }

          for (var i = 0; i < model.subModels.length; i++) {
            var curDrawBatch = this._drawBatchPool.alloc();

            var subModel = model.subModels[i];
            curDrawBatch.renderScene = comp._getRenderScene();
            curDrawBatch.visFlags = comp.node.layer;
            curDrawBatch.model = model;
            curDrawBatch.bufferBatch = null;
            curDrawBatch.texture = null;
            curDrawBatch.sampler = null;
            curDrawBatch.useLocalData = null;

            if (!depthStencil) {
              depthStencil = null;
            }

            curDrawBatch.fillPasses(mat, depthStencil, dssHash, null, 0, subModel.patches, this);
            curDrawBatch.inputAssembler = subModel.inputAssembler;
            curDrawBatch.model.visFlags = curDrawBatch.visFlags;
            curDrawBatch.fillDrawCallAssembler();
            curDrawBatch.drawCalls[0].descriptorSet = subModel.descriptorSet;

            this._batches.push(curDrawBatch);
          } // reset current render state to null


          this._currMaterial = this._emptyMaterial;
          this._currScene = null;
          this._currComponent = null;
          this._currTransform = null;
          this._currTexture = null;
          this._currSampler = null;
          this._currTextureHash = 0;
          this._currSamplerHash = 0;
          this._currLayer = 0; // macro.UI_GPU_DRIVEN

          this._currTypeIsGPU = false;
        }
        /**
         * @en
         * Submit separate render data.
         * This data does not participate in the batch.
         *
         * @zh
         * 提交独立渲染数据.
         * @param comp 静态组件
         */
        ;

        _proto.commitStaticBatch = function commitStaticBatch(comp) {
          this._batches.concat(comp.drawBatchList);

          this.finishMergeBatches();
        } // macro.UI_GPU_DRIVEN
        ;

        _proto.autoMergeBatchesByGPU = function autoMergeBatchesByGPU(renderComp) {
          if (!this._currScene) return;
          var blendState;
          var depthStencil;
          var dssHash = 0;
          var bsHash = 0;

          if (renderComp) {
            blendState = renderComp.blendHash === -1 ? null : renderComp.getBlendState();
            bsHash = renderComp.blendHash;

            if (renderComp.customMaterial !== null) {
              depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage, this._currMaterial);
            } else {
              depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage);
            }

            dssHash = StencilManager.sharedManager.getStencilHash(renderComp.stencilStage);
          }

          var curDrawBatch = this._currStaticRoot ? this._currStaticRoot._requireDrawBatch() : this._currBatch;
          curDrawBatch.renderScene = this._currScene;
          curDrawBatch.visFlags = this._currLayer;
          curDrawBatch.texture = this._currTexture;
          curDrawBatch.sampler = this._currSampler;
          curDrawBatch.inputAssembler = this._dummyIA.ia;
          curDrawBatch.useLocalData = this._currTransform;
          curDrawBatch.textureHash = this._currTextureHash;
          curDrawBatch.samplerHash = this._currSamplerHash;
          curDrawBatch.fillPasses(this._currMaterial, depthStencil, dssHash, blendState, bsHash, null, this);

          this._batches.push(curDrawBatch);
        }
        /**
         * @en
         * End a section of render data and submit according to the batch condition.
         *
         * @zh
         * 根据合批条件，结束一段渲染数据并提交。
         */
        ;

        _proto.autoMergeBatches = function autoMergeBatches(renderComp) {
          var buffer = this.currBufferBatch;
          var ia = buffer === null || buffer === void 0 ? void 0 : buffer.recordBatch();
          var mat = this._currMaterial;

          if (!ia || !mat || !buffer) {
            return;
          }

          var blendState;
          var depthStencil;
          var dssHash = 0;
          var bsHash = 0;

          if (renderComp) {
            blendState = renderComp.blendHash === -1 ? null : renderComp.getBlendState();
            bsHash = renderComp.blendHash;

            if (renderComp.customMaterial !== null) {
              depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage, mat);
            } else {
              depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage);
            }

            dssHash = StencilManager.sharedManager.getStencilHash(renderComp.stencilStage);
          }

          var curDrawBatch = this._currStaticRoot ? this._currStaticRoot._requireDrawBatch() : this._currBatch;
          curDrawBatch.renderScene = this._currScene;
          curDrawBatch.visFlags = this._currLayer;
          curDrawBatch.bufferBatch = buffer;
          curDrawBatch.texture = this._currTexture;
          curDrawBatch.sampler = this._currSampler;
          curDrawBatch.inputAssembler = ia;
          curDrawBatch.useLocalData = this._currTransform;
          curDrawBatch.textureHash = this._currTextureHash;
          curDrawBatch.samplerHash = this._currSamplerHash;
          curDrawBatch.fillPasses(this._currMaterial, depthStencil, dssHash, blendState, bsHash, null, this);
          curDrawBatch.fillDrawCallAssembler();

          this._batches.push(curDrawBatch);

          buffer.vertexStart = buffer.vertexOffset;
          buffer.indicesStart = buffer.indicesOffset;
          buffer.byteStart = buffer.byteOffset; // HACK: After sharing buffer between drawcalls, the performance degradation a lots on iOS 14 or iPad OS 14 device
          // TODO: Maybe it can be removed after Apple fixes it?
          // @ts-expect-error Property '__isWebIOS14OrIPadOS14Env' does not exist on 'sys'

          if (sys.__isWebIOS14OrIPadOS14Env && !this._currIsStatic) {
            this._currMeshBuffer = null;
          }
        }
        /**
         * @en
         * Force changes to current batch data and merge
         *
         * @zh
         * 强行修改当前批次数据并合并。
         *
         * @param material - 当前批次的材质。
         * @param sprite - 当前批次的精灵帧。
         */
        ;

        _proto.forceMergeBatches = function forceMergeBatches(material, frame, renderComp) {
          this._currMaterial = material;

          if (frame) {
            this._currTexture = frame.getGFXTexture();
            this._currSampler = frame.getGFXSampler();
            this._currTextureHash = frame.getHash();
            this._currSamplerHash = this._currSampler.hash;
          } else {
            this._currTexture = this._currSampler = null;
            this._currTextureHash = this._currSamplerHash = 0;
          }

          this._currLayer = renderComp.node.layer;
          this._currScene = renderComp._getRenderScene();
          this.autoMergeBatches(renderComp);
        }
        /**
         * @en
         * Forced to merge the data of the previous batch to start a new batch.
         *
         * @zh
         * 强制合并上一个批次的数据，开启新一轮合批。
         */
        ;

        _proto.finishMergeBatches = function finishMergeBatches() {
          this.autoMergeBatches();
          this._currMaterial = this._emptyMaterial;
          this._currTexture = null;
          this._currComponent = null;
          this._currTransform = null;
          this._currTextureHash = 0;
          this._currSamplerHash = 0;
          this._currLayer = 0;
        }
        /**
         * @en
         * Force to change the current material.
         *
         * @zh
         * 强制刷新材质。
         */
        ;

        _proto.flushMaterial = function flushMaterial(mat) {
          this._currMaterial = mat;
        };

        _proto.walk = function walk(node, level) {
          if (level === void 0) {
            level = 0;
          }

          var len = node.children.length;

          this._preProcess(node);

          if (len > 0 && !node._static) {
            var children = node.children;

            for (var i = 0; i < children.length; ++i) {
              var child = children[i];
              this.walk(child, level);
            }
          }

          this._postProcess(node);

          level += 1;
        };

        _proto._preProcess = function _preProcess(node) {
          // update opacity
          if (node._uiProps.opacityDirty) {
            var _node$parent;

            var opacity = 1.0;

            if ((_node$parent = node.parent) === null || _node$parent === void 0 ? void 0 : _node$parent._uiProps) {
              opacity = node.parent._uiProps.opacity;
              var _render = node._uiProps.uiComp;

              if (_render.markColorDirty) {
                opacity *= _render.color.a / 255;

                _render.markColorDirty();
              }
            }

            node._uiProps.opacityDirty = false;

            node._uiProps.applyOpacity(opacity);
          }

          var render = node._uiProps.uiComp;

          if (!node._uiProps.uiTransformComp) {
            return;
          }

          if (render && render.enabledInHierarchy) {
            render.updateAssembler(this);
          }
        };

        _proto._postProcess = function _postProcess(node) {
          var render = node._uiProps.uiComp;

          if (render && render.enabledInHierarchy) {
            render.postUpdateAssembler(this);
          }
        };

        _proto._recursiveScreenNode = function _recursiveScreenNode(screen) {
          this.walk(screen); // macro.UI_GPU_DRIVEN

          if (this._currTypeIsGPU) {
            this.autoMergeBatchesByGPU(this._currComponent);
          } else {
            this.autoMergeBatches(this._currComponent);
          }
        };

        _proto._createMeshBuffer = function _createMeshBuffer(attributes) {
          var batch = this._bufferBatchPool.add();

          batch.initialize(attributes, this._recreateMeshBuffer.bind(this, attributes));
          var strideBytes = VertexFormat.getAttributeStride(attributes);

          var buffers = this._meshBuffers.get(strideBytes);

          if (!buffers) {
            buffers = [];

            this._meshBuffers.set(strideBytes, buffers);
          }

          buffers.push(batch);
          return batch;
        };

        _proto._recreateMeshBuffer = function _recreateMeshBuffer(attributes, vertexCount, indexCount) {
          this.autoMergeBatches();

          this._requireBufferBatch(attributes, vertexCount, indexCount);
        };

        _proto._requireBufferBatch = function _requireBufferBatch(attributes, vertexCount, indexCount) {
          var strideBytes = VertexFormat.getAttributeStride(attributes);

          var buffers = this._meshBuffers.get(strideBytes);

          if (!buffers) {
            buffers = [];

            this._meshBuffers.set(strideBytes, buffers);
          }

          var meshBufferUseCount = this._meshBufferUseCount.get(strideBytes) || 0;

          if (vertexCount && indexCount) {
            // useCount++ when _recreateMeshBuffer
            meshBufferUseCount++;
          }

          this._currMeshBuffer = buffers[meshBufferUseCount];

          if (!this._currMeshBuffer) {
            this._currMeshBuffer = this._createMeshBuffer(attributes);
          }

          this._meshBufferUseCount.set(strideBytes, meshBufferUseCount);

          if (vertexCount && indexCount) {
            this._currMeshBuffer.request(vertexCount, indexCount);
          }
        };

        _proto._screenSort = function _screenSort(a, b) {
          return a.node.getSiblingIndex() - b.node.getSiblingIndex();
        };

        _proto._releaseDescriptorSetCache = function _releaseDescriptorSetCache(textureHash) {
          this._descriptorSetCache.releaseDescriptorSetCache(textureHash);
        } // macro.UI_GPU_DRIVEN
        ;

        _proto._resetRenderDirty = function _resetRenderDirty(comp) {
          comp.node._uiProps.uiTransformComp._rectDirty = false;
        };

        _createClass(Batcher2D, [{
          key: "currBufferBatch",
          get: function get() {
            if (this._currMeshBuffer) return this._currMeshBuffer; // create if not set

            this._currMeshBuffer = this.acquireBufferBatch();
            return this._currMeshBuffer;
          },
          set: function set(buffer) {
            if (buffer) {
              this._currMeshBuffer = buffer;
            }
          }
        }, {
          key: "batches",
          get: function get() {
            return this._batches;
          }
        }, {
          key: "currStaticRoot",
          set: function set(value) {
            this._currStaticRoot = value;
          }
        }, {
          key: "currIsStatic",
          set: function set(value) {
            this._currIsStatic = value;
          }
        }]);

        return Batcher2D;
      }());

      LocalDescriptorSet = /*#__PURE__*/function () {
        function LocalDescriptorSet() {
          this._descriptorSet = null;
          this._transform = null;
          this._textureHash = 0;
          this._samplerHash = 0;
          this._localBuffer = null;
          this._transformUpdate = true;
          var device = legacyCC.director.root.device;
          this._localData = new Float32Array(UBOLocal.COUNT);
          this._localBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOLocal.SIZE, UBOLocal.SIZE));
        }

        var _proto2 = LocalDescriptorSet.prototype;

        _proto2.initialize = function initialize(batch) {
          var device = legacyCC.director.root.device;
          this._transform = batch.useLocalData;
          this._textureHash = batch.textureHash;
          this._samplerHash = batch.samplerHash;
          _dsInfo.layout = batch.passes[0].localSetLayout;
          this._descriptorSet = device.createDescriptorSet(_dsInfo);

          this._descriptorSet.bindBuffer(UBOLocal.BINDING, this._localBuffer);

          var binding = ModelLocalBindings.SAMPLER_SPRITE;

          this._descriptorSet.bindTexture(binding, batch.texture);

          this._descriptorSet.bindSampler(binding, batch.sampler);

          this._descriptorSet.update();

          this._transformUpdate = true;
        };

        _proto2.updateTransform = function updateTransform(transform) {
          if (transform === this._transform) return;
          this._transform = transform;
          this._transformUpdate = true;
          this.uploadLocalData();
        };

        _proto2.updateLocal = function updateLocal() {
          if (!this._transform) return;
          this.uploadLocalData();
        };

        _proto2.equals = function equals(transform, textureHash, samplerHash) {
          return this._transform === transform && this._textureHash === textureHash && this._samplerHash === samplerHash;
        };

        _proto2.reset = function reset() {
          this._transform = null;
          this._textureHash = 0;
          this._samplerHash = 0;
        };

        _proto2.destroy = function destroy() {
          if (this._localBuffer) {
            this._localBuffer.destroy();

            this._localBuffer = null;
          }

          if (this._descriptorSet) {
            this._descriptorSet.destroy();

            this._descriptorSet = null;
          }

          this._localData = null;
        };

        _proto2.uploadLocalData = function uploadLocalData() {
          var node = this._transform; // @ts-expect-error TS2445

          if (node.hasChangedFlags || node._dirtyFlags) {
            node.updateWorldTransform();
          }

          if (this._transformUpdate) {
            // @ts-expect-error TS2445
            var worldMatrix = node._mat;
            Mat4.toArray(this._localData, worldMatrix, UBOLocal.MAT_WORLD_OFFSET);
            Mat4.inverseTranspose(m4_1, worldMatrix);

            if (!JSB) {
              // fix precision lost of webGL on android device
              // scale worldIT mat to around 1.0 by product its sqrt of determinant.
              var det = Mat4.determinant(m4_1);
              var factor = 1.0 / Math.sqrt(det);
              Mat4.multiplyScalar(m4_1, m4_1, factor);
            }

            Mat4.toArray(this._localData, m4_1, UBOLocal.MAT_WORLD_IT_OFFSET);

            this._localBuffer.update(this._localData);

            this._transformUpdate = false;
          }
        };

        _createClass(LocalDescriptorSet, [{
          key: "descriptorSet",
          get: function get() {
            return this._descriptorSet;
          }
        }]);

        return LocalDescriptorSet;
      }();

      DescriptorSetCache = /*#__PURE__*/function () {
        function DescriptorSetCache() {
          this._descriptorSetCache = new Map();
          this._dsCacheHashByTexture = new Map();
          this._dsCacheHashByBuffer = [];
          this._localDescriptorSetCache = [];
          this._localCachePool = void 0;
          this._localCachePool = new Pool(function () {
            return new LocalDescriptorSet();
          }, 16);
        }

        var _proto3 = DescriptorSetCache.prototype;

        _proto3.getDescriptorSet = function getDescriptorSet(batch, drawCall) {
          var root = legacyCC.director.root;
          var hash;

          if (batch.useLocalData) {
            var caches = this._localDescriptorSetCache;

            for (var i = 0, len = caches.length; i < len; i++) {
              var cache = caches[i];

              if (cache.equals(batch.useLocalData, batch.textureHash, batch.samplerHash)) {
                return cache.descriptorSet;
              }
            }

            var localDs = this._localCachePool.alloc();

            localDs.initialize(batch);

            this._localDescriptorSetCache.push(localDs);

            return localDs.descriptorSet;
          } else {
            hash = batch.textureHash ^ batch.samplerHash ^ drawCall.bufferHash;

            if (this._descriptorSetCache.has(hash)) {
              return this._descriptorSetCache.get(hash);
            } else {
              var device = legacyCC.director.root.device;
              _dsInfo.layout = batch.passes[0].localSetLayout;
              var descriptorSet = root.device.createDescriptorSet(_dsInfo);
              var binding = ModelLocalBindings.SAMPLER_SPRITE;
              descriptorSet.bindTexture(binding, batch.texture);
              descriptorSet.bindSampler(binding, batch.sampler);

              if (!batch.bufferBatch) {
                var localBufferView = drawCall.bufferView;
                descriptorSet.bindBuffer(ModelLocalBindings.UBO_UI_LOCAL, localBufferView);
              }

              descriptorSet.update();

              this._descriptorSetCache.set(hash, descriptorSet);

              this._dsCacheHashByTexture.set(batch.textureHash, hash);

              this._dsCacheHashByBuffer.push(hash);

              return descriptorSet;
            }
          }
        };

        _proto3.update = function update() {
          var caches = this._localDescriptorSetCache;
          caches.forEach(function (value) {
            value.updateLocal();
          });
        };

        _proto3.reset = function reset() {
          var _this4 = this;

          var caches = this._localDescriptorSetCache;
          caches.forEach(function (value) {
            _this4._localCachePool.free(value);
          });
          this._localDescriptorSetCache.length = 0;
        };

        _proto3.releaseDescriptorSetCache = function releaseDescriptorSetCache(textureHash) {
          var key = this._dsCacheHashByTexture.get(textureHash);

          if (key && this._descriptorSetCache.has(key)) {
            this._descriptorSetCache.get(key).destroy();

            this._descriptorSetCache["delete"](key);

            this._dsCacheHashByTexture["delete"](textureHash);
          }
        };

        _proto3.releaseAllByBuffer = function releaseAllByBuffer() {
          var length = this._dsCacheHashByBuffer.length;
          var hash = 0;

          for (var i = 0; i < length; i++) {
            hash = this._dsCacheHashByBuffer[i];

            if (this._descriptorSetCache.has(hash)) {
              this._descriptorSetCache.get(hash).destroy();

              this._descriptorSetCache["delete"](hash);
            }
          }

          this._dsCacheHashByBuffer.length = 0;
        };

        _proto3.destroy = function destroy() {
          this._descriptorSetCache.forEach(function (value, key, map) {
            value.destroy();
          });

          this._descriptorSetCache.clear();

          this._dsCacheHashByTexture.clear();

          this._dsCacheHashByBuffer.length = 0;
          this._localDescriptorSetCache.length = 0;

          this._localCachePool.destroy(function (obj) {
            obj.destroy();
          });
        };

        return DescriptorSetCache;
      }();

      legacyCC.internal.Batcher2D = Batcher2D;
    }
  };
});
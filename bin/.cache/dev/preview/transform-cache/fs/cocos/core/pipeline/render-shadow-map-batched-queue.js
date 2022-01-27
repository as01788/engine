System.register("q-bundled:///fs/cocos/core/pipeline/render-shadow-map-batched-queue.js", ["./define.js", "./pass-phase.js", "./pipeline-state-manager.js", "../renderer/core/pass.js", "./render-instanced-queue.js", "./render-batched-queue.js", "../renderer/scene/shadows.js", "../renderer/scene/light.js", "../geometry/index.js", "../math/index.js"], function (_export, _context) {
  "use strict";

  var SetIndex, getPhaseID, PipelineStateManager, BatchingSchemes, RenderInstancedQueue, RenderBatchedQueue, ShadowType, LightType, AABB, intersect, Mat4, _matShadowView, _matShadowProj, _matShadowViewProj, _ab, _phaseID, _shadowPassIndices, RenderShadowMapBatchedQueue;

  function getShadowPassIndex(subModels, shadowPassIndices) {
    shadowPassIndices.length = 0;
    var hasShadowPass = false;

    for (var j = 0; j < subModels.length; j++) {
      var passes = subModels[j].passes;
      var shadowPassIndex = -1;

      for (var k = 0; k < passes.length; k++) {
        if (passes[k].phase === _phaseID) {
          shadowPassIndex = k;
          hasShadowPass = true;
          break;
        }
      }

      shadowPassIndices.push(shadowPassIndex);
    }

    return hasShadowPass;
  }
  /**
   * @zh
   * 阴影渲染队列
   */


  return {
    setters: [function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }, function (_passPhaseJs) {
      getPhaseID = _passPhaseJs.getPhaseID;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_rendererCorePassJs) {
      BatchingSchemes = _rendererCorePassJs.BatchingSchemes;
    }, function (_renderInstancedQueueJs) {
      RenderInstancedQueue = _renderInstancedQueueJs.RenderInstancedQueue;
    }, function (_renderBatchedQueueJs) {
      RenderBatchedQueue = _renderBatchedQueueJs.RenderBatchedQueue;
    }, function (_rendererSceneShadowsJs) {
      ShadowType = _rendererSceneShadowsJs.ShadowType;
    }, function (_rendererSceneLightJs) {
      LightType = _rendererSceneLightJs.LightType;
    }, function (_geometryIndexJs) {
      AABB = _geometryIndexJs.AABB;
      intersect = _geometryIndexJs.intersect;
    }, function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
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
       * @module pipeline
       */
      _matShadowView = new Mat4();
      _matShadowProj = new Mat4();
      _matShadowViewProj = new Mat4();
      _ab = new AABB();
      _phaseID = getPhaseID('shadow-caster');
      _shadowPassIndices = [];

      _export("RenderShadowMapBatchedQueue", RenderShadowMapBatchedQueue = /*#__PURE__*/function () {
        function RenderShadowMapBatchedQueue(pipeline) {
          this._pipeline = void 0;
          this._subModelsArray = [];
          this._passArray = [];
          this._shaderArray = [];
          this._instancedQueue = void 0;
          this._batchedQueue = void 0;
          this._pipeline = pipeline;
          this._instancedQueue = new RenderInstancedQueue();
          this._batchedQueue = new RenderBatchedQueue();
        }

        var _proto = RenderShadowMapBatchedQueue.prototype;

        _proto.gatherLightPasses = function gatherLightPasses(globalDS, camera, light, cmdBuff) {
          this.clear();
          var pipelineSceneData = this._pipeline.pipelineSceneData;
          var shadowInfo = pipelineSceneData.shadows;
          var dirShadowObjects = pipelineSceneData.dirShadowObjects;
          var castShadowObjects = pipelineSceneData.castShadowObjects;

          if (light && shadowInfo.enabled && shadowInfo.type === ShadowType.ShadowMap) {
            switch (light.type) {
              case LightType.DIRECTIONAL:
                for (var i = 0; i < dirShadowObjects.length; i++) {
                  var ro = dirShadowObjects[i];
                  var model = ro.model;

                  if (!getShadowPassIndex(model.subModels, _shadowPassIndices)) {
                    continue;
                  }

                  this.add(model, cmdBuff, _shadowPassIndices);
                }

                break;

              case LightType.SPOT:
                Mat4.invert(_matShadowView, light.node.getWorldMatrix());
                Mat4.perspective(_matShadowProj, light.angle, light.aspect, 0.001, light.range);
                Mat4.multiply(_matShadowViewProj, _matShadowProj, _matShadowView);

                for (var _i = 0; _i < castShadowObjects.length; _i++) {
                  var _ro = castShadowObjects[_i];
                  var _model = _ro.model;

                  if (!getShadowPassIndex(_model.subModels, _shadowPassIndices)) {
                    continue;
                  }

                  if (_model.worldBounds) {
                    AABB.transform(_ab, _model.worldBounds, _matShadowViewProj);

                    if (!intersect.aabbFrustum(_ab, camera.frustum)) {
                      continue;
                    }
                  }

                  this.add(_model, cmdBuff, _shadowPassIndices);
                }

                break;

              default:
            }
          }
        }
        /**
         * @zh
         * clear light-Batched-Queue
         */
        ;

        _proto.clear = function clear() {
          this._subModelsArray.length = 0;
          this._shaderArray.length = 0;
          this._passArray.length = 0;

          this._instancedQueue.clear();

          this._batchedQueue.clear();
        };

        _proto.add = function add(model, cmdBuff, _shadowPassIndices) {
          var subModels = model.subModels;

          for (var j = 0; j < subModels.length; j++) {
            var subModel = subModels[j];
            var shadowPassIdx = _shadowPassIndices[j];
            var pass = subModel.passes[shadowPassIdx];
            var batchingScheme = pass.batchingScheme;

            if (batchingScheme === BatchingSchemes.INSTANCING) {
              // instancing
              var buffer = pass.getInstancedBuffer();
              buffer.merge(subModel, model.instancedAttributes, shadowPassIdx);

              this._instancedQueue.queue.add(buffer);
            } else if (pass.batchingScheme === BatchingSchemes.VB_MERGING) {
              // vb-merging
              var _buffer = pass.getBatchedBuffer();

              _buffer.merge(subModel, shadowPassIdx, model);

              this._batchedQueue.queue.add(_buffer);
            } else {
              var shader = subModel.shaders[shadowPassIdx];

              this._subModelsArray.push(subModel);

              if (shader) this._shaderArray.push(shader);

              this._passArray.push(pass);
            }
          }

          this._instancedQueue.uploadBuffers(cmdBuff);

          this._batchedQueue.uploadBuffers(cmdBuff);
        }
        /**
         * @zh
         * record CommandBuffer
         */
        ;

        _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
          this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          for (var i = 0; i < this._subModelsArray.length; ++i) {
            var subModel = this._subModelsArray[i];
            var shader = this._shaderArray[i];
            var pass = this._passArray[i];
            var ia = subModel.inputAssembler;
            var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);
            var descriptorSet = pass.descriptorSet;
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, descriptorSet);
            cmdBuff.bindDescriptorSet(SetIndex.LOCAL, subModel.descriptorSet);
            cmdBuff.bindInputAssembler(ia);
            cmdBuff.draw(ia);
          }
        };

        return RenderShadowMapBatchedQueue;
      }());
    }
  };
});
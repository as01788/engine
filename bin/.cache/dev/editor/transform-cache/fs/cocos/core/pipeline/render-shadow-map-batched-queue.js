"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderShadowMapBatchedQueue = void 0;

var _define = require("./define.js");

var _passPhase = require("./pass-phase.js");

var _pipelineStateManager = require("./pipeline-state-manager.js");

var _pass = require("../renderer/core/pass.js");

var _renderInstancedQueue = require("./render-instanced-queue.js");

var _renderBatchedQueue = require("./render-batched-queue.js");

var _shadows = require("../renderer/scene/shadows.js");

var _light = require("../renderer/scene/light.js");

var _index = require("../geometry/index.js");

var _index2 = require("../math/index.js");

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
const _matShadowView = new _index2.Mat4();

const _matShadowProj = new _index2.Mat4();

const _matShadowViewProj = new _index2.Mat4();

const _ab = new _index.AABB();

const _phaseID = (0, _passPhase.getPhaseID)('shadow-caster');

const _shadowPassIndices = [];

function getShadowPassIndex(subModels, shadowPassIndices) {
  shadowPassIndices.length = 0;
  let hasShadowPass = false;

  for (let j = 0; j < subModels.length; j++) {
    const {
      passes
    } = subModels[j];
    let shadowPassIndex = -1;

    for (let k = 0; k < passes.length; k++) {
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


class RenderShadowMapBatchedQueue {
  constructor(pipeline) {
    this._pipeline = void 0;
    this._subModelsArray = [];
    this._passArray = [];
    this._shaderArray = [];
    this._instancedQueue = void 0;
    this._batchedQueue = void 0;
    this._pipeline = pipeline;
    this._instancedQueue = new _renderInstancedQueue.RenderInstancedQueue();
    this._batchedQueue = new _renderBatchedQueue.RenderBatchedQueue();
  }

  gatherLightPasses(globalDS, camera, light, cmdBuff) {
    this.clear();
    const pipelineSceneData = this._pipeline.pipelineSceneData;
    const shadowInfo = pipelineSceneData.shadows;
    const dirShadowObjects = pipelineSceneData.dirShadowObjects;
    const castShadowObjects = pipelineSceneData.castShadowObjects;

    if (light && shadowInfo.enabled && shadowInfo.type === _shadows.ShadowType.ShadowMap) {
      switch (light.type) {
        case _light.LightType.DIRECTIONAL:
          for (let i = 0; i < dirShadowObjects.length; i++) {
            const ro = dirShadowObjects[i];
            const model = ro.model;

            if (!getShadowPassIndex(model.subModels, _shadowPassIndices)) {
              continue;
            }

            this.add(model, cmdBuff, _shadowPassIndices);
          }

          break;

        case _light.LightType.SPOT:
          _index2.Mat4.invert(_matShadowView, light.node.getWorldMatrix());

          _index2.Mat4.perspective(_matShadowProj, light.angle, light.aspect, 0.001, light.range);

          _index2.Mat4.multiply(_matShadowViewProj, _matShadowProj, _matShadowView);

          for (let i = 0; i < castShadowObjects.length; i++) {
            const ro = castShadowObjects[i];
            const model = ro.model;

            if (!getShadowPassIndex(model.subModels, _shadowPassIndices)) {
              continue;
            }

            if (model.worldBounds) {
              _index.AABB.transform(_ab, model.worldBounds, _matShadowViewProj);

              if (!_index.intersect.aabbFrustum(_ab, camera.frustum)) {
                continue;
              }
            }

            this.add(model, cmdBuff, _shadowPassIndices);
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


  clear() {
    this._subModelsArray.length = 0;
    this._shaderArray.length = 0;
    this._passArray.length = 0;

    this._instancedQueue.clear();

    this._batchedQueue.clear();
  }

  add(model, cmdBuff, _shadowPassIndices) {
    const subModels = model.subModels;

    for (let j = 0; j < subModels.length; j++) {
      const subModel = subModels[j];
      const shadowPassIdx = _shadowPassIndices[j];
      const pass = subModel.passes[shadowPassIdx];
      const batchingScheme = pass.batchingScheme;

      if (batchingScheme === _pass.BatchingSchemes.INSTANCING) {
        // instancing
        const buffer = pass.getInstancedBuffer();
        buffer.merge(subModel, model.instancedAttributes, shadowPassIdx);

        this._instancedQueue.queue.add(buffer);
      } else if (pass.batchingScheme === _pass.BatchingSchemes.VB_MERGING) {
        // vb-merging
        const buffer = pass.getBatchedBuffer();
        buffer.merge(subModel, shadowPassIdx, model);

        this._batchedQueue.queue.add(buffer);
      } else {
        const shader = subModel.shaders[shadowPassIdx];

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


  recordCommandBuffer(device, renderPass, cmdBuff) {
    this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    for (let i = 0; i < this._subModelsArray.length; ++i) {
      const subModel = this._subModelsArray[i];
      const shader = this._shaderArray[i];
      const pass = this._passArray[i];
      const ia = subModel.inputAssembler;

      const pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);

      const descriptorSet = pass.descriptorSet;
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, descriptorSet);
      cmdBuff.bindDescriptorSet(_define.SetIndex.LOCAL, subModel.descriptorSet);
      cmdBuff.bindInputAssembler(ia);
      cmdBuff.draw(ia);
    }
  }

}

exports.RenderShadowMapBatchedQueue = RenderShadowMapBatchedQueue;
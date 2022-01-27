System.register("q-bundled:///fs/cocos/core/pipeline/deferred/bloom-stage.js", ["../../data/decorators/index.js", "../define.js", "../../assets/material.js", "../../gfx/index.js", "../pipeline-state-manager.js", "../render-stage.js", "../enum.js", "../render-pipeline.js", "./deferred-pipeline-scene-data.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, serializable, type, SetIndex, Material, BufferInfo, BufferUsageBit, ClearFlagBit, Color, MemoryUsageBit, Rect, PipelineStateManager, RenderStage, CommonStagePriority, MAX_BLOOM_FILTER_PASS_NUM, BLOOM_COMBINEPASS_INDEX, BLOOM_DOWNSAMPLEPASS_INDEX, BLOOM_PREFILTERPASS_INDEX, BLOOM_UPSAMPLEPASS_INDEX, _dec, _dec2, _dec3, _class, _class2, _descriptor, _class3, _temp, colors, UBOBloom, BloomStage;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      serializable = _dataDecoratorsIndexJs.serializable;
      type = _dataDecoratorsIndexJs.type;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }, function (_assetsMaterialJs) {
      Material = _assetsMaterialJs.Material;
    }, function (_gfxIndexJs) {
      BufferInfo = _gfxIndexJs.BufferInfo;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      Color = _gfxIndexJs.Color;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      Rect = _gfxIndexJs.Rect;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_renderStageJs) {
      RenderStage = _renderStageJs.RenderStage;
    }, function (_enumJs) {
      CommonStagePriority = _enumJs.CommonStagePriority;
    }, function (_renderPipelineJs) {
      MAX_BLOOM_FILTER_PASS_NUM = _renderPipelineJs.MAX_BLOOM_FILTER_PASS_NUM;
    }, function (_deferredPipelineSceneDataJs) {
      BLOOM_COMBINEPASS_INDEX = _deferredPipelineSceneDataJs.BLOOM_COMBINEPASS_INDEX;
      BLOOM_DOWNSAMPLEPASS_INDEX = _deferredPipelineSceneDataJs.BLOOM_DOWNSAMPLEPASS_INDEX;
      BLOOM_PREFILTERPASS_INDEX = _deferredPipelineSceneDataJs.BLOOM_PREFILTERPASS_INDEX;
      BLOOM_UPSAMPLEPASS_INDEX = _deferredPipelineSceneDataJs.BLOOM_UPSAMPLEPASS_INDEX;
    }],
    execute: function () {
      colors = [new Color(0, 0, 0, 1)];
      /**
       * @en The uniform buffer object for bloom
       * @zh Bloom UBO。
       */

      UBOBloom = function UBOBloom() {};
      /**
       * @en The bloom post-process stage
       * @zh Bloom 后处理阶段。
       */


      UBOBloom.TEXTURE_SIZE_OFFSET = 0;
      UBOBloom.COUNT = UBOBloom.TEXTURE_SIZE_OFFSET + 4;
      UBOBloom.SIZE = UBOBloom.COUNT * 4;

      _export("BloomStage", BloomStage = (_dec = ccclass('BloomStage'), _dec2 = type(Material), _dec3 = displayOrder(3), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_RenderStage) {
        _inheritsLoose(BloomStage, _RenderStage);

        function BloomStage() {
          var _this;

          _this = _RenderStage.call(this) || this;
          _this.threshold = 1.0;
          _this.intensity = 0.8;
          _this.iterations = 2;

          _initializerDefineProperty(_this, "_bloomMaterial", _descriptor, _assertThisInitialized(_this));

          _this._renderArea = new Rect();
          _this._bloomUBO = [];
          return _this;
        }

        var _proto = BloomStage.prototype;

        _proto.initialize = function initialize(info) {
          _RenderStage.prototype.initialize.call(this, info);

          return true;
        };

        _proto.activate = function activate(pipeline, flow) {
          _RenderStage.prototype.activate.call(this, pipeline, flow);

          if (this._bloomMaterial) {
            pipeline.pipelineSceneData.bloomMaterial = this._bloomMaterial;
          }
        };

        _proto.destroy = function destroy() {};

        _proto.render = function render(camera) {
          var _camera$window;

          var pipeline = this._pipeline;
          pipeline.generateBloomRenderData();

          if (!((_camera$window = camera.window) === null || _camera$window === void 0 ? void 0 : _camera$window.swapchain) && !pipeline.macros.CC_PIPELINE_TYPE) {
            return;
          }

          if (!pipeline.bloomEnabled || pipeline.pipelineSceneData.renderObjects.length === 0) return;

          if (this._bloomUBO.length === 0) {
            var passNumber = MAX_BLOOM_FILTER_PASS_NUM * 2 + 2;

            for (var i = 0; i < passNumber; ++i) {
              this._bloomUBO[i] = pipeline.device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOBloom.SIZE, UBOBloom.SIZE));
            }
          }

          if (camera.clearFlag & ClearFlagBit.COLOR) {
            colors[0].x = camera.clearColor.x;
            colors[0].y = camera.clearColor.y;
            colors[0].z = camera.clearColor.z;
          }

          colors[0].w = camera.clearColor.w;

          this._prefilterPass(camera, pipeline);

          this._downsamplePass(camera, pipeline);

          this._upsamplePass(camera, pipeline);

          this._combinePass(camera, pipeline);
        };

        _proto._prefilterPass = function _prefilterPass(camera, pipeline) {
          pipeline.generateRenderArea(camera, this._renderArea);
          this._renderArea.width >>= 1;
          this._renderArea.height >>= 1;
          var cmdBuff = pipeline.commandBuffers[0];
          var sceneData = pipeline.pipelineSceneData;
          var builtinBloomProcess = sceneData.bloomMaterial;
          var pass = builtinBloomProcess.passes[BLOOM_PREFILTERPASS_INDEX];
          var renderData = pipeline.getPipelineRenderData();
          var bloomData = renderData.bloom;
          var textureSize = new Float32Array(UBOBloom.COUNT);
          textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 2] = this.threshold;
          cmdBuff.updateBuffer(this._bloomUBO[0], textureSize);
          cmdBuff.beginRenderPass(bloomData.renderPass, bloomData.prefilterFramebuffer, this._renderArea, colors, 0, 0);
          cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, pipeline.descriptorSet);
          pass.descriptorSet.bindBuffer(0, this._bloomUBO[0]);
          pass.descriptorSet.bindTexture(1, renderData.outputRenderTargets[0]);
          pass.descriptorSet.bindSampler(1, bloomData.sampler);
          pass.descriptorSet.update();
          cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
          var inputAssembler = camera.window.swapchain ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
          var pso = null;
          var shader = pass.getShaderVariant();

          if (pass != null && shader != null && inputAssembler != null) {
            pso = PipelineStateManager.getOrCreatePipelineState(pipeline.device, pass, shader, bloomData.renderPass, inputAssembler);
          }

          if (pso != null) {
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindInputAssembler(inputAssembler);
            cmdBuff.draw(inputAssembler);
          }

          cmdBuff.endRenderPass();
        };

        _proto._downsamplePass = function _downsamplePass(camera, pipeline) {
          pipeline.generateRenderArea(camera, this._renderArea);
          this._renderArea.width >>= 1;
          this._renderArea.height >>= 1;
          var cmdBuff = pipeline.commandBuffers[0];
          var sceneData = pipeline.pipelineSceneData;
          var builtinBloomProcess = sceneData.bloomMaterial;
          var bloomData = pipeline.getPipelineRenderData().bloom;
          var textureSize = new Float32Array(UBOBloom.COUNT);

          for (var i = 0; i < this.iterations; ++i) {
            textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 0] = this._renderArea.width;
            textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 1] = this._renderArea.height;
            cmdBuff.updateBuffer(this._bloomUBO[i + 1], textureSize);
            this._renderArea.width >>= 1;
            this._renderArea.height >>= 1;
            cmdBuff.beginRenderPass(bloomData.renderPass, bloomData.downsampleFramebuffers[i], this._renderArea, colors, 0, 0);
            var pass = builtinBloomProcess.passes[BLOOM_DOWNSAMPLEPASS_INDEX + i];
            var shader = pass.getShaderVariant();
            pass.descriptorSet.bindBuffer(0, this._bloomUBO[i + 1]);

            if (i === 0) {
              pass.descriptorSet.bindTexture(1, bloomData.prefiterTex);
            } else {
              pass.descriptorSet.bindTexture(1, bloomData.downsampleTexs[i - 1]);
            }

            pass.descriptorSet.bindSampler(1, bloomData.sampler);
            pass.descriptorSet.update();
            cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
            var inputAssembler = camera.window.swapchain ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
            var pso = null;

            if (pass != null && shader != null && inputAssembler != null) {
              pso = PipelineStateManager.getOrCreatePipelineState(pipeline.device, pass, shader, bloomData.renderPass, inputAssembler);
            }

            if (pso != null) {
              cmdBuff.bindPipelineState(pso);
              cmdBuff.bindInputAssembler(inputAssembler);
              cmdBuff.draw(inputAssembler);
            }

            cmdBuff.endRenderPass();
          }
        };

        _proto._upsamplePass = function _upsamplePass(camera, pipeline) {
          var bloomData = pipeline.getPipelineRenderData().bloom;
          pipeline.generateRenderArea(camera, this._renderArea);
          this._renderArea.width >>= this.iterations + 1;
          this._renderArea.height >>= this.iterations + 1;
          var cmdBuff = pipeline.commandBuffers[0];
          var sceneData = pipeline.pipelineSceneData;
          var builtinBloomProcess = sceneData.bloomMaterial;
          var textureSize = new Float32Array(UBOBloom.COUNT);

          for (var i = 0; i < this.iterations; ++i) {
            var index = i + MAX_BLOOM_FILTER_PASS_NUM + 1;
            textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 0] = this._renderArea.width;
            textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 1] = this._renderArea.height;
            cmdBuff.updateBuffer(this._bloomUBO[index], textureSize);
            this._renderArea.width <<= 1;
            this._renderArea.height <<= 1;
            cmdBuff.beginRenderPass(bloomData.renderPass, bloomData.upsampleFramebuffers[this.iterations - 1 - i], this._renderArea, colors, 0, 0);
            var pass = builtinBloomProcess.passes[BLOOM_UPSAMPLEPASS_INDEX + i];
            var shader = pass.getShaderVariant();
            pass.descriptorSet.bindBuffer(0, this._bloomUBO[index]);

            if (i === 0) {
              pass.descriptorSet.bindTexture(1, bloomData.downsampleTexs[this.iterations - 1]);
            } else {
              pass.descriptorSet.bindTexture(1, bloomData.upsampleTexs[this.iterations - i]);
            }

            pass.descriptorSet.bindSampler(1, bloomData.sampler);
            pass.descriptorSet.update();
            cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
            var inputAssembler = camera.window.swapchain ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
            var pso = null;

            if (pass != null && shader != null && inputAssembler != null) {
              pso = PipelineStateManager.getOrCreatePipelineState(pipeline.device, pass, shader, bloomData.renderPass, inputAssembler);
            }

            if (pso != null) {
              cmdBuff.bindPipelineState(pso);
              cmdBuff.bindInputAssembler(inputAssembler);
              cmdBuff.draw(inputAssembler);
            }

            cmdBuff.endRenderPass();
          }
        };

        _proto._combinePass = function _combinePass(camera, pipeline) {
          pipeline.generateRenderArea(camera, this._renderArea);
          var cmdBuff = pipeline.commandBuffers[0];
          var sceneData = pipeline.pipelineSceneData;
          var builtinBloomProcess = sceneData.bloomMaterial;
          var deferredData = pipeline.getPipelineRenderData();
          var bloomData = deferredData.bloom;
          var uboIndex = MAX_BLOOM_FILTER_PASS_NUM * 2 + 1;
          var textureSize = new Float32Array(UBOBloom.COUNT);
          textureSize[UBOBloom.TEXTURE_SIZE_OFFSET + 3] = this.intensity;
          cmdBuff.updateBuffer(this._bloomUBO[uboIndex], textureSize);
          cmdBuff.beginRenderPass(bloomData.renderPass, bloomData.combineFramebuffer, this._renderArea, colors, 0, 0);
          cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, pipeline.descriptorSet);
          var pass = builtinBloomProcess.passes[BLOOM_COMBINEPASS_INDEX];
          pass.descriptorSet.bindBuffer(0, this._bloomUBO[uboIndex]);
          pass.descriptorSet.bindTexture(1, deferredData.outputRenderTargets[0]);
          pass.descriptorSet.bindTexture(2, bloomData.upsampleTexs[0]);
          pass.descriptorSet.bindSampler(1, bloomData.sampler);
          pass.descriptorSet.bindSampler(2, bloomData.sampler);
          pass.descriptorSet.update();
          cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
          var inputAssembler = camera.window.swapchain ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
          var pso = null;
          var shader = pass.getShaderVariant();

          if (pass != null && shader != null && inputAssembler != null) {
            pso = PipelineStateManager.getOrCreatePipelineState(pipeline.device, pass, shader, bloomData.renderPass, inputAssembler);
          }

          if (pso != null) {
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindInputAssembler(inputAssembler);
            cmdBuff.draw(inputAssembler);
          }

          cmdBuff.endRenderPass();
        };

        return BloomStage;
      }(RenderStage), _class3.initInfo = {
        name: 'BloomStage',
        priority: CommonStagePriority.BLOOM,
        tag: 0
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_bloomMaterial", [_dec2, serializable, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
    }
  };
});
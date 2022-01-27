System.register("q-bundled:///fs/cocos/core/pipeline/deferred/postprocess-stage.js", ["../../data/decorators/index.js", "../define.js", "../../gfx/index.js", "../render-stage.js", "../enum.js", "../../assets/material.js", "../pipeline-state-manager.js", "../pipeline-serialization.js", "../pipeline-funcs.js", "../ui-phase.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, type, serializable, SetIndex, Color, Rect, ClearFlagBit, RenderStage, CommonStagePriority, Material, PipelineStateManager, RenderQueueDesc, renderProfiler, UIPhase, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _class3, _temp, colors, PostProcessStage;

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
      type = _dataDecoratorsIndexJs.type;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }, function (_gfxIndexJs) {
      Color = _gfxIndexJs.Color;
      Rect = _gfxIndexJs.Rect;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
    }, function (_renderStageJs) {
      RenderStage = _renderStageJs.RenderStage;
    }, function (_enumJs) {
      CommonStagePriority = _enumJs.CommonStagePriority;
    }, function (_assetsMaterialJs) {
      Material = _assetsMaterialJs.Material;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_pipelineSerializationJs) {
      RenderQueueDesc = _pipelineSerializationJs.RenderQueueDesc;
    }, function (_pipelineFuncsJs) {
      renderProfiler = _pipelineFuncsJs.renderProfiler;
    }, function (_uiPhaseJs) {
      UIPhase = _uiPhaseJs.UIPhase;
    }],
    execute: function () {
      colors = [new Color(0, 0, 0, 1)];
      /**
        * @en The postprocess render stage
        * @zh 后处理渲染阶段。
        */

      _export("PostProcessStage", PostProcessStage = (_dec = ccclass('PostProcessStage'), _dec2 = type(Material), _dec3 = displayOrder(3), _dec4 = type([RenderQueueDesc]), _dec5 = displayOrder(2), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_RenderStage) {
        _inheritsLoose(PostProcessStage, _RenderStage);

        function PostProcessStage() {
          var _this;

          _this = _RenderStage.call(this) || this;

          _initializerDefineProperty(_this, "_postProcessMaterial", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "renderQueues", _descriptor2, _assertThisInitialized(_this));

          _this._renderArea = new Rect();
          _this._uiPhase = new UIPhase();
          return _this;
        }

        var _proto = PostProcessStage.prototype;

        _proto.initialize = function initialize(info) {
          _RenderStage.prototype.initialize.call(this, info);

          return true;
        };

        _proto.activate = function activate(pipeline, flow) {
          _RenderStage.prototype.activate.call(this, pipeline, flow);

          if (this._postProcessMaterial) {
            pipeline.pipelineSceneData.postprocessMaterial = this._postProcessMaterial;
          }

          this._uiPhase.activate(pipeline);
        };

        _proto.destroy = function destroy() {};

        _proto.render = function render(camera) {
          var pipeline = this._pipeline;
          var device = pipeline.device;
          var sceneData = pipeline.pipelineSceneData;
          var cmdBuff = pipeline.commandBuffers[0];
          pipeline.pipelineUBO.updateCameraUBO(camera);
          var vp = camera.viewport;
          this._renderArea.x = vp.x * camera.window.width;
          this._renderArea.y = vp.y * camera.window.height;
          this._renderArea.width = vp.width * camera.window.width;
          this._renderArea.height = vp.height * camera.window.height;
          var renderData = pipeline.getPipelineRenderData();
          var framebuffer = camera.window.framebuffer;
          var swapchain = camera.window.swapchain;
          var renderPass = swapchain ? pipeline.getRenderPass(camera.clearFlag, swapchain) : framebuffer.renderPass;

          if (camera.clearFlag & ClearFlagBit.COLOR) {
            colors[0].x = camera.clearColor.x;
            colors[0].y = camera.clearColor.y;
            colors[0].z = camera.clearColor.z;
          }

          colors[0].w = camera.clearColor.w;
          cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
          cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, pipeline.descriptorSet); // Postprocess

          var builtinPostProcess = sceneData.postprocessMaterial;
          var pass = builtinPostProcess.passes[0];
          var shader = pass.getShaderVariant();

          if (pipeline.bloomEnabled) {
            pass.descriptorSet.bindTexture(0, renderData.bloom.combineTex);
          } else {
            pass.descriptorSet.bindTexture(0, renderData.outputRenderTargets[0]);
          }

          pass.descriptorSet.bindSampler(0, renderData.sampler);
          pass.descriptorSet.update();
          cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
          var inputAssembler = camera.window.swapchain ? pipeline.quadIAOnscreen : pipeline.quadIAOffscreen;
          var pso = null;

          if (pass != null && shader != null && inputAssembler != null) {
            pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
          }

          var renderObjects = pipeline.pipelineSceneData.renderObjects;

          if (pso != null && renderObjects.length > 0) {
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindInputAssembler(inputAssembler);
            cmdBuff.draw(inputAssembler);
          }

          this._uiPhase.render(camera, renderPass);

          renderProfiler(device, renderPass, cmdBuff, pipeline.profiler, camera);
          cmdBuff.endRenderPass();
        };

        return PostProcessStage;
      }(RenderStage), _class3.initInfo = {
        name: 'PostProcessStage',
        priority: CommonStagePriority.POST_PROCESS,
        tag: 0
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_postProcessMaterial", [_dec2, serializable, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "renderQueues", [_dec4, serializable, _dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
    }
  };
});
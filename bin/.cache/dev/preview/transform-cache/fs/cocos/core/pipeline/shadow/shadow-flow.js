System.register("q-bundled:///fs/cocos/core/pipeline/shadow/shadow-flow.js", ["../../data/decorators/index.js", "../define.js", "../render-flow.js", "../enum.js", "./shadow-stage.js", "../../gfx/index.js", "../pipeline-serialization.js", "../../renderer/scene/shadows.js", "../../renderer/scene/light.js"], function (_export, _context) {
  "use strict";

  var ccclass, PIPELINE_FLOW_SHADOW, supportsFloatTexture, RenderFlow, ForwardFlowPriority, ShadowStage, LoadOp, StoreOp, Format, TextureType, TextureUsageBit, ColorAttachment, DepthStencilAttachment, RenderPassInfo, TextureInfo, FramebufferInfo, RenderFlowTag, ShadowType, LightType, _dec, _class, _class2, _temp, _validLights, ShadowFlow;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_defineJs) {
      PIPELINE_FLOW_SHADOW = _defineJs.PIPELINE_FLOW_SHADOW;
      supportsFloatTexture = _defineJs.supportsFloatTexture;
    }, function (_renderFlowJs) {
      RenderFlow = _renderFlowJs.RenderFlow;
    }, function (_enumJs) {
      ForwardFlowPriority = _enumJs.ForwardFlowPriority;
    }, function (_shadowStageJs) {
      ShadowStage = _shadowStageJs.ShadowStage;
    }, function (_gfxIndexJs) {
      LoadOp = _gfxIndexJs.LoadOp;
      StoreOp = _gfxIndexJs.StoreOp;
      Format = _gfxIndexJs.Format;
      TextureType = _gfxIndexJs.TextureType;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      ColorAttachment = _gfxIndexJs.ColorAttachment;
      DepthStencilAttachment = _gfxIndexJs.DepthStencilAttachment;
      RenderPassInfo = _gfxIndexJs.RenderPassInfo;
      TextureInfo = _gfxIndexJs.TextureInfo;
      FramebufferInfo = _gfxIndexJs.FramebufferInfo;
    }, function (_pipelineSerializationJs) {
      RenderFlowTag = _pipelineSerializationJs.RenderFlowTag;
    }, function (_rendererSceneShadowsJs) {
      ShadowType = _rendererSceneShadowsJs.ShadowType;
    }, function (_rendererSceneLightJs) {
      LightType = _rendererSceneLightJs.LightType;
    }],
    execute: function () {
      _validLights = [];
      /**
       * @en Shadow map render flow
       * @zh 阴影贴图绘制流程
       */

      _export("ShadowFlow", ShadowFlow = (_dec = ccclass('ShadowFlow'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_RenderFlow) {
        _inheritsLoose(ShadowFlow, _RenderFlow);

        function ShadowFlow() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _RenderFlow.call.apply(_RenderFlow, [this].concat(args)) || this;
          _this._shadowRenderPass = null;
          return _this;
        }

        var _proto = ShadowFlow.prototype;

        _proto.initialize = function initialize(info) {
          _RenderFlow.prototype.initialize.call(this, info);

          if (this._stages.length === 0) {
            // add shadowMap-stages
            var shadowMapStage = new ShadowStage();
            shadowMapStage.initialize(ShadowStage.initInfo);

            this._stages.push(shadowMapStage);
          }

          return true;
        };

        _proto.render = function render(camera) {
          var pipeline = this._pipeline;
          var shadowInfo = pipeline.pipelineSceneData.shadows;
          var shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
          var castShadowObjects = pipeline.pipelineSceneData.castShadowObjects;
          var validPunctualLights = this._pipeline.pipelineSceneData.validPunctualLights;

          if (!shadowInfo.enabled || shadowInfo.type !== ShadowType.ShadowMap) {
            return;
          }

          var n = 0;
          var m = 0;

          for (; n < shadowInfo.maxReceived && m < validPunctualLights.length;) {
            var light = validPunctualLights[m];

            if (light.type === LightType.SPOT) {
              _validLights.push(light);

              n++;
            }

            m++;
          }

          if (castShadowObjects.length === 0) {
            this.clearShadowMap(_validLights, camera);
            return;
          }

          if (shadowInfo.shadowMapDirty) {
            this.resizeShadowMap();
          }

          var _ref = camera.scene,
              mainLight = _ref.mainLight;

          if (mainLight) {
            var globalDS = pipeline.descriptorSet;

            if (!shadowFrameBufferMap.has(mainLight)) {
              this._initShadowFrameBuffer(pipeline, mainLight, camera.window.swapchain);
            }

            var shadowFrameBuffer = shadowFrameBufferMap.get(mainLight);

            for (var i = 0; i < this._stages.length; i++) {
              var shadowStage = this._stages[i];
              shadowStage.setUsage(globalDS, mainLight, shadowFrameBuffer);
              shadowStage.render(camera);
            }
          }

          for (var l = 0; l < _validLights.length; l++) {
            var _light = _validLights[l];

            var _globalDS = pipeline.globalDSManager.getOrCreateDescriptorSet(l);

            if (!shadowFrameBufferMap.has(_light)) {
              this._initShadowFrameBuffer(pipeline, _light, camera.window.swapchain);
            }

            var _shadowFrameBuffer = shadowFrameBufferMap.get(_light);

            for (var _i = 0; _i < this._stages.length; _i++) {
              var _shadowStage = this._stages[_i];

              _shadowStage.setUsage(_globalDS, _light, _shadowFrameBuffer);

              _shadowStage.render(camera);
            }
          }

          _validLights.length = 0;
        };

        _proto.destroy = function destroy() {
          _RenderFlow.prototype.destroy.call(this);

          if (this._pipeline) {
            var shadowFrameBufferMap = this._pipeline.pipelineSceneData.shadowFrameBufferMap;
            var shadowFrameBuffers = Array.from(shadowFrameBufferMap.values());

            for (var i = 0; i < shadowFrameBuffers.length; i++) {
              var frameBuffer = shadowFrameBuffers[i];

              if (!frameBuffer) {
                continue;
              }

              var renderTargets = frameBuffer.colorTextures;

              for (var j = 0; j < renderTargets.length; j++) {
                var renderTarget = renderTargets[i];

                if (renderTarget) {
                  renderTarget.destroy();
                }
              }

              renderTargets.length = 0;
              var depth = frameBuffer.depthStencilTexture;

              if (depth) {
                depth.destroy();
              }

              frameBuffer.destroy();
            }

            shadowFrameBufferMap.clear();
          }

          if (this._shadowRenderPass) {
            this._shadowRenderPass.destroy();
          }
        };

        _proto._initShadowFrameBuffer = function _initShadowFrameBuffer(pipeline, light, swapchain) {
          var device = pipeline.device;
          var shadows = pipeline.pipelineSceneData.shadows;
          var shadowMapSize = shadows.size;
          var shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
          var format = supportsFloatTexture(device) ? Format.R32F : Format.RGBA8;

          if (!this._shadowRenderPass) {
            var colorAttachment = new ColorAttachment();
            colorAttachment.format = format;
            colorAttachment.loadOp = LoadOp.CLEAR; // should clear color attachment

            colorAttachment.storeOp = StoreOp.STORE;
            colorAttachment.sampleCount = 1;
            var depthStencilAttachment = new DepthStencilAttachment();
            depthStencilAttachment.format = Format.DEPTH_STENCIL;
            depthStencilAttachment.depthLoadOp = LoadOp.CLEAR;
            depthStencilAttachment.depthStoreOp = StoreOp.DISCARD;
            depthStencilAttachment.stencilLoadOp = LoadOp.CLEAR;
            depthStencilAttachment.stencilStoreOp = StoreOp.DISCARD;
            depthStencilAttachment.sampleCount = 1;
            var renderPassInfo = new RenderPassInfo([colorAttachment], depthStencilAttachment);
            this._shadowRenderPass = device.createRenderPass(renderPassInfo);
          }

          var shadowRenderTargets = [];
          shadowRenderTargets.push(device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, format, shadowMapSize.x, shadowMapSize.y)));
          var depth = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, Format.DEPTH_STENCIL, shadowMapSize.x, shadowMapSize.y));
          var shadowFrameBuffer = device.createFramebuffer(new FramebufferInfo(this._shadowRenderPass, shadowRenderTargets, depth)); // Cache frameBuffer

          shadowFrameBufferMap.set(light, shadowFrameBuffer);
        };

        _proto.clearShadowMap = function clearShadowMap(validLights, camera) {
          var pipeline = this._pipeline;
          var scene = pipeline.pipelineSceneData;
          var _ref2 = camera.scene,
              mainLight = _ref2.mainLight;

          if (mainLight) {
            var globalDS = this._pipeline.descriptorSet;

            if (!scene.shadowFrameBufferMap.has(mainLight)) {
              this._initShadowFrameBuffer(this._pipeline, mainLight, camera.window.swapchain);
            }

            var shadowFrameBuffer = scene.shadowFrameBufferMap.get(mainLight);

            for (var i = 0; i < this._stages.length; i++) {
              var shadowStage = this._stages[i];
              shadowStage.setUsage(globalDS, mainLight, shadowFrameBuffer);
              shadowStage.render(camera);
            }
          }

          for (var l = 0; l < validLights.length; l++) {
            var light = validLights[l];

            var _shadowFrameBuffer2 = scene.shadowFrameBufferMap.get(light);

            var _globalDS2 = pipeline.globalDSManager.getOrCreateDescriptorSet(l);

            if (!scene.shadowFrameBufferMap.has(light)) {
              continue;
            }

            for (var _i2 = 0; _i2 < this._stages.length; _i2++) {
              var _shadowStage2 = this._stages[_i2];

              _shadowStage2.setUsage(_globalDS2, light, _shadowFrameBuffer2);

              _shadowStage2.clearFramebuffer(camera);
            }
          }
        };

        _proto.resizeShadowMap = function resizeShadowMap() {
          var shadows = this._pipeline.pipelineSceneData.shadows;
          var shadowMapSize = shadows.size;
          var pipeline = this._pipeline;
          var device = pipeline.device;
          var shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
          var format = supportsFloatTexture(device) ? Format.R32F : Format.RGBA8;
          var it = shadowFrameBufferMap.values();
          var res = it.next();

          while (!res.done) {
            var frameBuffer = res.value;

            if (!frameBuffer) {
              res = it.next();
              continue;
            }

            var renderTargets = [];
            renderTargets.push(pipeline.device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED, format, shadowMapSize.x, shadowMapSize.y)));
            var depth = frameBuffer.depthStencilTexture;

            if (depth) {
              depth.resize(shadowMapSize.x, shadowMapSize.y);
            }

            var shadowRenderPass = frameBuffer.renderPass;
            frameBuffer.destroy();
            frameBuffer.initialize(new FramebufferInfo(shadowRenderPass, renderTargets, depth));
            res = it.next();
          }

          shadows.shadowMapDirty = false;
        };

        return ShadowFlow;
      }(RenderFlow), _class2.initInfo = {
        name: PIPELINE_FLOW_SHADOW,
        priority: ForwardFlowPriority.SHADOW,
        tag: RenderFlowTag.SCENE,
        stages: []
      }, _temp)) || _class));
    }
  };
});
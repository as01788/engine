System.register("q-bundled:///fs/cocos/core/pipeline/forward/forward-pipeline.js", ["../../data/decorators/index.js", "../../../../../virtual/internal%253Aconstants.js", "../render-pipeline.js", "./forward-flow.js", "../pipeline-serialization.js", "../shadow/shadow-flow.js", "../define.js", "../../builtin/index.js", "../../platform/debug.js", "../pipeline-scene-data.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, type, serializable, EDITOR, RenderPipeline, ForwardFlow, RenderTextureConfig, ShadowFlow, UBOGlobal, UBOShadow, UBOCamera, UNIFORM_SHADOWMAP_BINDING, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, builtinResMgr, errorID, PipelineSceneData, _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp, PIPELINE_TYPE, ForwardPipeline;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_renderPipelineJs) {
      RenderPipeline = _renderPipelineJs.RenderPipeline;
    }, function (_forwardFlowJs) {
      ForwardFlow = _forwardFlowJs.ForwardFlow;
    }, function (_pipelineSerializationJs) {
      RenderTextureConfig = _pipelineSerializationJs.RenderTextureConfig;
    }, function (_shadowShadowFlowJs) {
      ShadowFlow = _shadowShadowFlowJs.ShadowFlow;
    }, function (_defineJs) {
      UBOGlobal = _defineJs.UBOGlobal;
      UBOShadow = _defineJs.UBOShadow;
      UBOCamera = _defineJs.UBOCamera;
      UNIFORM_SHADOWMAP_BINDING = _defineJs.UNIFORM_SHADOWMAP_BINDING;
      UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING = _defineJs.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING;
    }, function (_builtinIndexJs) {
      builtinResMgr = _builtinIndexJs.builtinResMgr;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }, function (_pipelineSceneDataJs) {
      PipelineSceneData = _pipelineSceneDataJs.PipelineSceneData;
    }],
    execute: function () {
      PIPELINE_TYPE = 0;
      /**
       * @en The forward render pipeline
       * @zh 前向渲染管线。
       */

      _export("ForwardPipeline", ForwardPipeline = (_dec = ccclass('ForwardPipeline'), _dec2 = type([RenderTextureConfig]), _dec3 = displayOrder(2), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RenderPipeline) {
        _inheritsLoose(ForwardPipeline, _RenderPipeline);

        function ForwardPipeline() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _RenderPipeline.call.apply(_RenderPipeline, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "renderTextures", _descriptor, _assertThisInitialized(_this));

          _this._postRenderPass = null;
          return _this;
        }

        var _proto = ForwardPipeline.prototype;

        _proto.initialize = function initialize(info) {
          _RenderPipeline.prototype.initialize.call(this, info);

          if (this._flows.length === 0) {
            var shadowFlow = new ShadowFlow();
            shadowFlow.initialize(ShadowFlow.initInfo);

            this._flows.push(shadowFlow);

            var forwardFlow = new ForwardFlow();
            forwardFlow.initialize(ForwardFlow.initInfo);

            this._flows.push(forwardFlow);
          }

          return true;
        };

        _proto.activate = function activate(swapchain) {
          if (EDITOR) {
            console.info('Forward render pipeline initialized.');
          }

          this._macros = {
            CC_PIPELINE_TYPE: PIPELINE_TYPE
          };
          this._pipelineSceneData = new PipelineSceneData();

          if (!_RenderPipeline.prototype.activate.call(this, swapchain)) {
            return false;
          }

          if (!this._activeRenderer(swapchain)) {
            errorID(2402);
            return false;
          }

          return true;
        };

        _proto._ensureEnoughSize = function _ensureEnoughSize(cameras) {
          var newWidth = this._width;
          var newHeight = this._height;

          for (var i = 0; i < cameras.length; ++i) {
            var window = cameras[i].window;
            newWidth = Math.max(window.width, newWidth);
            newHeight = Math.max(window.height, newHeight);
          }

          if (newWidth !== this._width || newHeight !== this._height) {
            this._width = newWidth;
            this._height = newHeight;
          }
        };

        _proto.destroy = function destroy() {
          this._destroyUBOs();

          this._destroyQuadInputAssembler();

          var rpIter = this._renderPasses.values();

          var rpRes = rpIter.next();

          while (!rpRes.done) {
            rpRes.value.destroy();
            rpRes = rpIter.next();
          }

          this._commandBuffers.length = 0;
          return _RenderPipeline.prototype.destroy.call(this);
        };

        _proto._activeRenderer = function _activeRenderer(swapchain) {
          var device = this.device;

          this._commandBuffers.push(device.commandBuffer);

          var shadowMapSampler = this.globalDSManager.pointSampler;

          this._descriptorSet.bindSampler(UNIFORM_SHADOWMAP_BINDING, shadowMapSampler);

          this._descriptorSet.bindTexture(UNIFORM_SHADOWMAP_BINDING, builtinResMgr.get('default-texture').getGFXTexture());

          this._descriptorSet.bindSampler(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, shadowMapSampler);

          this._descriptorSet.bindTexture(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, builtinResMgr.get('default-texture').getGFXTexture());

          this._descriptorSet.update();

          return true;
        };

        _proto._destroyUBOs = function _destroyUBOs() {
          if (this._descriptorSet) {
            this._descriptorSet.getBuffer(UBOGlobal.BINDING).destroy();

            this._descriptorSet.getBuffer(UBOShadow.BINDING).destroy();

            this._descriptorSet.getBuffer(UBOCamera.BINDING).destroy();

            this._descriptorSet.getTexture(UNIFORM_SHADOWMAP_BINDING).destroy();

            this._descriptorSet.getTexture(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
          }
        };

        _createClass(ForwardPipeline, [{
          key: "postRenderPass",
          get: function get() {
            return this._postRenderPass;
          }
        }]);

        return ForwardPipeline;
      }(RenderPipeline), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "renderTextures", [_dec2, serializable, _dec3], {
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
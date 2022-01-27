System.register("q-bundled:///fs/cocos/core/pipeline/index.jsb.js", ["./pass-phase.js", "../utils/js.js", "./deferred/deferred-pipeline-scene-data.js", "../global-exports.js", "../assets/asset.js", "./pipeline-scene-data.js", "./pipeline-event.js"], function (_export, _context) {
  "use strict";

  var getPhaseID, setClassName, addon, DeferredPipelineSceneData, legacyCC, Asset, PipelineSceneData, RenderPipeline, RenderFlow, RenderStage, InstancedBuffer, PipelineStateManager, instancedBufferProto, oldGetFunc, getOrCreatePipelineState, ForwardPipeline, ForwardOnLoaded, ForwardFlow, ShadowFlow, ForwardStage, ShadowStage, RenderQueueDesc, DeferredPipeline, DeferredOnLoaded, MainFlow, GbufferStage, LightingStage, BloomStage, PostProcessStage;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function createDefaultPipeline() {
    var pipeline = new ForwardPipeline();
    pipeline.init();
    return pipeline;
  } // ForwardPipeline


  _export("createDefaultPipeline", createDefaultPipeline);

  return {
    setters: [function (_passPhaseJs) {
      getPhaseID = _passPhaseJs.getPhaseID;
    }, function (_utilsJsJs) {
      setClassName = _utilsJsJs.setClassName;
      addon = _utilsJsJs.addon;
    }, function (_deferredDeferredPipelineSceneDataJs) {
      DeferredPipelineSceneData = _deferredDeferredPipelineSceneDataJs.DeferredPipelineSceneData;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_assetsAssetJs) {
      Asset = _assetsAssetJs.Asset;
    }, function (_pipelineSceneDataJs) {
      PipelineSceneData = _pipelineSceneDataJs.PipelineSceneData;
    }, function (_pipelineEventJs) {
      _export({
        PipelineEventProcessor: _pipelineEventJs.PipelineEventProcessor,
        PipelineEventType: _pipelineEventJs.PipelineEventType
      });
    }],
    execute: function () {
      nr.getPhaseID = getPhaseID;

      _export("RenderPipeline", RenderPipeline = nr.RenderPipeline);

      _export("RenderFlow", RenderFlow = nr.RenderFlow);

      _export("RenderStage", RenderStage = nr.RenderStage);

      _export("InstancedBuffer", InstancedBuffer = nr.InstancedBuffer);

      _export("PipelineStateManager", PipelineStateManager = nr.PipelineStateManager);

      instancedBufferProto = nr.InstancedBuffer;
      oldGetFunc = instancedBufferProto.get;
      getOrCreatePipelineState = nr.PipelineStateManager.getOrCreatePipelineState;

      nr.PipelineStateManager.getOrCreatePipelineState = function (device, pass, shader, renderPass, ia) {
        return getOrCreatePipelineState.call(device, pass["native"], shader, renderPass, ia);
      };

      _export("ForwardPipeline", ForwardPipeline = /*#__PURE__*/function (_nr$ForwardPipeline) {
        _inheritsLoose(ForwardPipeline, _nr$ForwardPipeline);

        function ForwardPipeline() {
          var _this;

          _this = _nr$ForwardPipeline.call(this) || this;
          _this.pipelineSceneData = new PipelineSceneData();
          _this._tag = 0;
          _this._flows = [];
          _this.renderTextures = [];
          _this.materials = [];
          return _this;
        }

        var _proto = ForwardPipeline.prototype;

        _proto.on = function on(type, callback, target, once) {};

        _proto.once = function once(type, callback, target) {};

        _proto.off = function off(type, callback, target) {};

        _proto.emit = function emit(type, arg0, arg1, arg2, arg3, arg4) {};

        _proto.targetOff = function targetOff(typeOrTarget) {};

        _proto.removeAll = function removeAll(typeOrTarget) {};

        _proto.hasEventListener = function hasEventListener(type, callback, target) {
          return false;
        };

        _proto.init = function init() {
          this.setPipelineSharedSceneData(this.pipelineSceneData["native"]);

          for (var i = 0; i < this._flows.length; i++) {
            this._flows[i].init(this);
          }

          var info = new nr.RenderPipelineInfo(this._tag, this._flows);
          this.initialize(info);
        };

        _proto.activate = function activate(swapchain) {
          return _nr$ForwardPipeline.prototype.activate.call(this, swapchain) && this.pipelineSceneData.activate(legacyCC.director.root.device, this);
        };

        _proto.render = function render(cameras) {
          var nativeObjs = [];

          for (var i = 0, len = cameras.length; i < len; ++i) {
            nativeObjs.push(cameras[i]["native"]);
          }

          _nr$ForwardPipeline.prototype.render.call(this, nativeObjs);
        };

        _proto.destroy = function destroy() {
          this.pipelineSceneData.destroy();

          _nr$ForwardPipeline.prototype.destroy.call(this);
        };

        _createClass(ForwardPipeline, [{
          key: "profiler",
          set: function set(value) {
            this.setProfiler(value && value["native"]);
          }
        }]);

        return ForwardPipeline;
      }(nr.ForwardPipeline));

      addon(ForwardPipeline.prototype, Asset.prototype);
      ForwardOnLoaded = ForwardPipeline.prototype.onLoaded; // hook to invoke init after deserialization

      ForwardPipeline.prototype.onLoaded = function () {
        if (ForwardOnLoaded) ForwardOnLoaded.call(this);
        this.init();
      };

      _export("ForwardFlow", ForwardFlow = /*#__PURE__*/function (_nr$ForwardFlow) {
        _inheritsLoose(ForwardFlow, _nr$ForwardFlow);

        function ForwardFlow() {
          var _this2;

          _this2 = _nr$ForwardFlow.call(this) || this;
          _this2._name = 0;
          _this2._priority = 0;
          _this2._tag = 0;
          _this2._stages = [];
          return _this2;
        }

        var _proto2 = ForwardFlow.prototype;

        _proto2.init = function init(pipeline) {
          for (var i = 0; i < this._stages.length; i++) {
            this._stages[i].init(pipeline);
          }

          var info = new nr.RenderFlowInfo(this._name, this._priority, this._tag, this._stages);
          this.initialize(info);
        };

        return ForwardFlow;
      }(nr.ForwardFlow));

      _export("ShadowFlow", ShadowFlow = /*#__PURE__*/function (_nr$ShadowFlow) {
        _inheritsLoose(ShadowFlow, _nr$ShadowFlow);

        function ShadowFlow() {
          var _this3;

          _this3 = _nr$ShadowFlow.call(this) || this;
          _this3._name = 0;
          _this3._priority = 0;
          _this3._tag = 0;
          _this3._stages = [];
          return _this3;
        }

        var _proto3 = ShadowFlow.prototype;

        _proto3.init = function init(pipeline) {
          for (var i = 0; i < this._stages.length; i++) {
            this._stages[i].init(pipeline);
          }

          var info = new nr.RenderFlowInfo(this._name, this._priority, this._tag, this._stages);
          this.initialize(info);
        };

        return ShadowFlow;
      }(nr.ShadowFlow));

      _export("ForwardStage", ForwardStage = /*#__PURE__*/function (_nr$ForwardStage) {
        _inheritsLoose(ForwardStage, _nr$ForwardStage);

        function ForwardStage() {
          var _this4;

          _this4 = _nr$ForwardStage.call(this) || this;
          _this4._name = 0;
          _this4._priority = 0;
          _this4._tag = 0;
          _this4.renderQueues = [];
          return _this4;
        }

        var _proto4 = ForwardStage.prototype;

        _proto4.init = function init(pipeline) {
          var queues = [];

          for (var i = 0; i < this.renderQueues.length; i++) {
            queues.push(this.renderQueues[i].init());
          }

          var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
          this.initialize(info);
        };

        return ForwardStage;
      }(nr.ForwardStage));

      _export("ShadowStage", ShadowStage = /*#__PURE__*/function (_nr$ShadowStage) {
        _inheritsLoose(ShadowStage, _nr$ShadowStage);

        function ShadowStage() {
          var _this5;

          _this5 = _nr$ShadowStage.call(this) || this;
          _this5._name = 0;
          _this5._priority = 0;
          _this5._tag = 0;
          return _this5;
        }

        var _proto5 = ShadowStage.prototype;

        _proto5.init = function init(pipeline) {
          var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, []);
          this.initialize(info);
        };

        return ShadowStage;
      }(nr.ShadowStage));

      _export("RenderQueueDesc", RenderQueueDesc = /*#__PURE__*/function () {
        function RenderQueueDesc() {
          this.isTransparent = false;
          this.sortMode = 0;
          this.stages = [];
          this.isTransparent = false;
          this.sortMode = 0;
          this.stages = [];
        }

        var _proto6 = RenderQueueDesc.prototype;

        _proto6.init = function init() {
          return new nr.RenderQueueDesc(this.isTransparent, this.sortMode, this.stages);
        };

        return RenderQueueDesc;
      }());

      _export("DeferredPipeline", DeferredPipeline = /*#__PURE__*/function (_nr$DeferredPipeline) {
        _inheritsLoose(DeferredPipeline, _nr$DeferredPipeline);

        function DeferredPipeline() {
          var _this6;

          _this6 = _nr$DeferredPipeline.call(this) || this;
          _this6.pipelineSceneData = new DeferredPipelineSceneData();
          _this6._tag = 0;
          _this6._flows = [];
          _this6.renderTextures = [];
          _this6.materials = [];
          return _this6;
        }

        var _proto7 = DeferredPipeline.prototype;

        _proto7.on = function on(type, callback, target, once) {};

        _proto7.once = function once(type, callback, target) {};

        _proto7.off = function off(type, callback, target) {};

        _proto7.emit = function emit(type, arg0, arg1, arg2, arg3, arg4) {};

        _proto7.targetOff = function targetOff(typeOrTarget) {};

        _proto7.removeAll = function removeAll(typeOrTarget) {};

        _proto7.hasEventListener = function hasEventListener(type, callback, target) {
          return false;
        };

        _proto7.init = function init() {
          this.setPipelineSharedSceneData(this.pipelineSceneData["native"]);

          for (var i = 0; i < this._flows.length; i++) {
            this._flows[i].init(this);
          }

          var info = new nr.RenderPipelineInfo(this._tag, this._flows);
          this.initialize(info);
        };

        _proto7.activate = function activate(swapchain) {
          return _nr$DeferredPipeline.prototype.activate.call(this, swapchain) && this.pipelineSceneData.activate(legacyCC.director.root.device, this);
        };

        _proto7.render = function render(cameras) {
          var nativeObjs = [];

          for (var i = 0, len = cameras.length; i < len; ++i) {
            nativeObjs.push(cameras[i]["native"]);
          }

          _nr$DeferredPipeline.prototype.render.call(this, nativeObjs);
        };

        _proto7.destroy = function destroy() {
          this.fog.destroy();
          this.ambient.destroy();
          this.skybox.destroy();
          this.shadows.destroy();
          this.pipelineSceneData.destroy();

          _nr$DeferredPipeline.prototype.destroy.call(this);
        };

        _createClass(DeferredPipeline, [{
          key: "profiler",
          set: function set(value) {
            this.setProfiler(value && value["native"]);
          }
        }]);

        return DeferredPipeline;
      }(nr.DeferredPipeline));

      addon(DeferredPipeline.prototype, Asset.prototype);
      DeferredOnLoaded = DeferredPipeline.prototype.onLoaded; // hook to invoke init after deserialization

      DeferredPipeline.prototype.onLoaded = function () {
        if (DeferredOnLoaded) DeferredOnLoaded.call(this);
        this.init();
      };

      _export("MainFlow", MainFlow = /*#__PURE__*/function (_nr$MainFlow) {
        _inheritsLoose(MainFlow, _nr$MainFlow);

        function MainFlow() {
          var _this7;

          _this7 = _nr$MainFlow.call(this) || this;
          _this7._name = 0;
          _this7._priority = 0;
          _this7._tag = 0;
          _this7._stages = [];
          return _this7;
        }

        var _proto8 = MainFlow.prototype;

        _proto8.init = function init(pipeline) {
          for (var i = 0; i < this._stages.length; i++) {
            this._stages[i].init(pipeline);
          }

          var info = new nr.RenderFlowInfo(this._name, this._priority, this._tag, this._stages);
          this.initialize(info);
        };

        return MainFlow;
      }(nr.MainFlow));

      _export("GbufferStage", GbufferStage = /*#__PURE__*/function (_nr$GbufferStage) {
        _inheritsLoose(GbufferStage, _nr$GbufferStage);

        function GbufferStage() {
          var _this8;

          _this8 = _nr$GbufferStage.call(this) || this;
          _this8._name = 0;
          _this8._priority = 0;
          _this8._tag = 0;
          _this8.renderQueues = [];
          return _this8;
        }

        var _proto9 = GbufferStage.prototype;

        _proto9.init = function init(pipeline) {
          var queues = [];

          for (var i = 0; i < this.renderQueues.length; i++) {
            queues.push(this.renderQueues[i].init());
          }

          var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
          this.initialize(info);
        };

        return GbufferStage;
      }(nr.GbufferStage));

      _export("LightingStage", LightingStage = /*#__PURE__*/function (_nr$LightingStage) {
        _inheritsLoose(LightingStage, _nr$LightingStage);

        function LightingStage() {
          var _this9;

          _this9 = _nr$LightingStage.call(this) || this;
          _this9._name = 0;
          _this9._priority = 0;
          _this9._tag = 0;
          _this9.renderQueues = [];
          _this9._deferredMaterial = null;
          return _this9;
        }

        var _proto10 = LightingStage.prototype;

        _proto10.init = function init(pipeline) {
          var queues = [];

          for (var i = 0; i < this.renderQueues.length; i++) {
            queues.push(this.renderQueues[i].init());
          }

          pipeline.pipelineSceneData.deferredLightingMaterial = this._deferredMaterial;
          var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
          this.initialize(info);
        };

        return LightingStage;
      }(nr.LightingStage));

      _export("BloomStage", BloomStage = /*#__PURE__*/function (_nr$BloomStage) {
        _inheritsLoose(BloomStage, _nr$BloomStage);

        function BloomStage() {
          var _this10;

          _this10 = _nr$BloomStage.call(this) || this;
          _this10._name = 0;
          _this10._priority = 0;
          _this10._tag = 0;
          _this10.renderQueues = [];
          _this10._bloomMaterial = null;
          return _this10;
        }

        var _proto11 = BloomStage.prototype;

        _proto11.init = function init(pipeline) {
          var queues = [];

          for (var i = 0; i < this.renderQueues.length; i++) {
            queues.push(this.renderQueues[i].init());
          }

          pipeline.pipelineSceneData.bloomMaterial = this._bloomMaterial;
          var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
          this.initialize(info);
        };

        return BloomStage;
      }(nr.BloomStage));

      _export("PostProcessStage", PostProcessStage = /*#__PURE__*/function (_nr$PostProcessStage) {
        _inheritsLoose(PostProcessStage, _nr$PostProcessStage);

        function PostProcessStage() {
          var _this11;

          _this11 = _nr$PostProcessStage.call(this) || this;
          _this11._name = 0;
          _this11._priority = 0;
          _this11._tag = 0;
          _this11.renderQueues = [];
          _this11._postProcessMaterial = null;
          return _this11;
        }

        var _proto12 = PostProcessStage.prototype;

        _proto12.init = function init(pipeline) {
          var queues = [];

          for (var i = 0; i < this.renderQueues.length; i++) {
            queues.push(this.renderQueues[i].init());
          }

          pipeline.pipelineSceneData.postprocessMaterial = this._postProcessMaterial;
          var info = new nr.RenderStageInfo(this._name, this._priority, this._tag, queues);
          this.initialize(info);
        };

        return PostProcessStage;
      }(nr.PostProcessStage));

      setClassName('DeferredPipeline', DeferredPipeline);
      setClassName('MainFlow', MainFlow);
      setClassName('GbufferStage', GbufferStage);
      setClassName('LightingStage', LightingStage);
      setClassName('BloomStage', BloomStage);
      setClassName('PostProcessStage', PostProcessStage);
      setClassName('ForwardPipeline', ForwardPipeline);
      setClassName('ForwardFlow', ForwardFlow);
      setClassName('ShadowFlow', ShadowFlow);
      setClassName('ForwardStage', ForwardStage);
      setClassName('ShadowStage', ShadowStage);
      setClassName('RenderQueueDesc', RenderQueueDesc);
    }
  };
});
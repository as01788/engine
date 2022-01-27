"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainFlow = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _renderFlow = require("../render-flow.js");

var _enum = require("../enum.js");

var _gbufferStage = require("./gbuffer-stage.js");

var _lightingStage = require("./lighting-stage.js");

var _postprocessStage = require("./postprocess-stage.js");

var _bloomStage = require("./bloom-stage.js");

var _dec, _class, _class2, _temp;

/**
 * @en The main flow in deferred render pipeline
 * @zh 延迟渲染流程。
 */
let MainFlow = (_dec = (0, _index.ccclass)('MainFlow'), _dec(_class = (_temp = _class2 = class MainFlow extends _renderFlow.RenderFlow {
  /**
   * @en The shared initialization information of main render flow
   * @zh 共享的延迟渲染流程初始化参数
   */
  initialize(info) {
    super.initialize(info);

    if (this._stages.length === 0) {
      const gbufferStage = new _gbufferStage.GbufferStage();
      gbufferStage.initialize(_gbufferStage.GbufferStage.initInfo);

      this._stages.push(gbufferStage);

      const lightingStage = new _lightingStage.LightingStage();
      lightingStage.initialize(_lightingStage.LightingStage.initInfo);

      this._stages.push(lightingStage);

      const bloomStage = new _bloomStage.BloomStage();
      bloomStage.initialize(_bloomStage.BloomStage.initInfo);

      this._stages.push(bloomStage);

      const postProcessStage = new _postprocessStage.PostProcessStage();
      postProcessStage.initialize(_postprocessStage.PostProcessStage.initInfo);

      this._stages.push(postProcessStage);
    }

    return true;
  }

  activate(pipeline) {
    super.activate(pipeline);
  }

  render(camera) {
    super.render(camera);
  }

  destroy() {
    super.destroy();
  }

}, _class2.initInfo = {
  name: _define.PIPELINE_FLOW_MAIN,
  priority: _enum.DeferredFlowPriority.MAIN,
  stages: []
}, _temp)) || _class);
exports.MainFlow = MainFlow;
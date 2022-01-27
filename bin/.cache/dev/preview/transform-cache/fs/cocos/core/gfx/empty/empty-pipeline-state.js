System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-pipeline-state.js", ["../base/pipeline-state.js"], function (_export, _context) {
  "use strict";

  var PipelineState, EmptyPipelineState;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_basePipelineStateJs) {
      PipelineState = _basePipelineStateJs.PipelineState;
    }],
    execute: function () {
      _export("EmptyPipelineState", EmptyPipelineState = /*#__PURE__*/function (_PipelineState) {
        _inheritsLoose(EmptyPipelineState, _PipelineState);

        function EmptyPipelineState() {
          return _PipelineState.apply(this, arguments) || this;
        }

        var _proto = EmptyPipelineState.prototype;

        _proto.initialize = function initialize(info) {
          this._primitive = info.primitive;
          this._shader = info.shader;
          this._pipelineLayout = info.pipelineLayout;
          var bs = this._bs;

          if (info.blendState) {
            var bsInfo = info.blendState;
            var targets = bsInfo.targets;

            if (targets) {
              targets.forEach(function (t, i) {
                bs.setTarget(i, t);
              });
            }

            if (bsInfo.isA2C !== undefined) {
              bs.isA2C = bsInfo.isA2C;
            }

            if (bsInfo.isIndepend !== undefined) {
              bs.isIndepend = bsInfo.isIndepend;
            }

            if (bsInfo.blendColor !== undefined) {
              bs.blendColor = bsInfo.blendColor;
            }
          }

          Object.assign(this._rs, info.rasterizerState);
          Object.assign(this._dss, info.depthStencilState);
          this._is = info.inputState;
          this._renderPass = info.renderPass;
          this._dynamicStates = info.dynamicStates;
        };

        _proto.destroy = function destroy() {};

        return EmptyPipelineState;
      }(PipelineState));
    }
  };
});
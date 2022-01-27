System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-pipeline-layout.js", ["../base/pipeline-layout.js"], function (_export, _context) {
  "use strict";

  var PipelineLayout, EmptyPipelineLayout;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_basePipelineLayoutJs) {
      PipelineLayout = _basePipelineLayoutJs.PipelineLayout;
    }],
    execute: function () {
      _export("EmptyPipelineLayout", EmptyPipelineLayout = /*#__PURE__*/function (_PipelineLayout) {
        _inheritsLoose(EmptyPipelineLayout, _PipelineLayout);

        function EmptyPipelineLayout() {
          return _PipelineLayout.apply(this, arguments) || this;
        }

        var _proto = EmptyPipelineLayout.prototype;

        _proto.initialize = function initialize(info) {
          Array.prototype.push.apply(this._setLayouts, info.setLayouts);
        };

        _proto.destroy = function destroy() {};

        return EmptyPipelineLayout;
      }(PipelineLayout));
    }
  };
});
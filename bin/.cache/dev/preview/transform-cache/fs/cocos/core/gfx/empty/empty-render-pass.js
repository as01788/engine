System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-render-pass.js", ["../base/render-pass.js"], function (_export, _context) {
  "use strict";

  var RenderPass, EmptyRenderPass;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseRenderPassJs) {
      RenderPass = _baseRenderPassJs.RenderPass;
    }],
    execute: function () {
      _export("EmptyRenderPass", EmptyRenderPass = /*#__PURE__*/function (_RenderPass) {
        _inheritsLoose(EmptyRenderPass, _RenderPass);

        function EmptyRenderPass() {
          return _RenderPass.apply(this, arguments) || this;
        }

        var _proto = EmptyRenderPass.prototype;

        _proto.initialize = function initialize(info) {
          this._colorInfos = info.colorAttachments;
          this._depthStencilInfo = info.depthStencilAttachment;
          this._subpasses = info.subpasses;
          this._hash = this.computeHash();
        };

        _proto.destroy = function destroy() {};

        return EmptyRenderPass;
      }(RenderPass));
    }
  };
});
System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-descriptor-set-layout.js", ["../base/descriptor-set-layout.js"], function (_export, _context) {
  "use strict";

  var DescriptorSetLayout, EmptyDescriptorSetLayout;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseDescriptorSetLayoutJs) {
      DescriptorSetLayout = _baseDescriptorSetLayoutJs.DescriptorSetLayout;
    }],
    execute: function () {
      _export("EmptyDescriptorSetLayout", EmptyDescriptorSetLayout = /*#__PURE__*/function (_DescriptorSetLayout) {
        _inheritsLoose(EmptyDescriptorSetLayout, _DescriptorSetLayout);

        function EmptyDescriptorSetLayout() {
          return _DescriptorSetLayout.apply(this, arguments) || this;
        }

        var _proto = EmptyDescriptorSetLayout.prototype;

        _proto.initialize = function initialize(info) {
          Array.prototype.push.apply(this._bindings, info.bindings);
        };

        _proto.destroy = function destroy() {};

        return EmptyDescriptorSetLayout;
      }(DescriptorSetLayout));
    }
  };
});
System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-descriptor-set.js", ["../base/descriptor-set.js"], function (_export, _context) {
  "use strict";

  var DescriptorSet, EmptyDescriptorSet;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseDescriptorSetJs) {
      DescriptorSet = _baseDescriptorSetJs.DescriptorSet;
    }],
    execute: function () {
      _export("EmptyDescriptorSet", EmptyDescriptorSet = /*#__PURE__*/function (_DescriptorSet) {
        _inheritsLoose(EmptyDescriptorSet, _DescriptorSet);

        function EmptyDescriptorSet() {
          return _DescriptorSet.apply(this, arguments) || this;
        }

        var _proto = EmptyDescriptorSet.prototype;

        _proto.initialize = function initialize(info) {
          this._layout = info.layout;
        };

        _proto.destroy = function destroy() {};

        _proto.update = function update() {};

        return EmptyDescriptorSet;
      }(DescriptorSet));
    }
  };
});
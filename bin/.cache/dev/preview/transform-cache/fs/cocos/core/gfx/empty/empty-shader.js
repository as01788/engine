System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-shader.js", ["../../platform/index.js", "../base/shader.js"], function (_export, _context) {
  "use strict";

  var debug, Shader, EmptyShader;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_platformIndexJs) {
      debug = _platformIndexJs.debug;
    }, function (_baseShaderJs) {
      Shader = _baseShaderJs.Shader;
    }],
    execute: function () {
      _export("EmptyShader", EmptyShader = /*#__PURE__*/function (_Shader) {
        _inheritsLoose(EmptyShader, _Shader);

        function EmptyShader() {
          return _Shader.apply(this, arguments) || this;
        }

        var _proto = EmptyShader.prototype;

        _proto.initialize = function initialize(info) {
          debug("Shader '" + info.name + "' compilation succeeded.");
        };

        _proto.destroy = function destroy() {};

        return EmptyShader;
      }(Shader));
    }
  };
});
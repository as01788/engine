System.register("q-bundled:///fs/cocos/core/gfx/base/shader.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var GFXObject, ObjectType, Shader;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_defineJs) {
      GFXObject = _defineJs.GFXObject;
      ObjectType = _defineJs.ObjectType;
    }],
    execute: function () {
      /**
       * @en GFX shader.
       * @zh GFX 着色器。
       */
      _export("Shader", Shader = /*#__PURE__*/function (_GFXObject) {
        _inheritsLoose(Shader, _GFXObject);

        function Shader() {
          var _this;

          _this = _GFXObject.call(this, ObjectType.SHADER) || this;
          _this._name = '';
          _this._stages = [];
          _this._attributes = [];
          _this._blocks = [];
          _this._samplers = [];
          return _this;
        }

        _createClass(Shader, [{
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "attributes",
          get: function get() {
            return this._attributes;
          }
        }, {
          key: "blocks",
          get: function get() {
            return this._blocks;
          }
        }, {
          key: "samplers",
          get: function get() {
            return this._samplers;
          }
        }]);

        return Shader;
      }(GFXObject));
    }
  };
});
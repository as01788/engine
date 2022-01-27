System.register("q-bundled:///fs/cocos/core/gfx/base/pipeline-layout.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var GFXObject, ObjectType, PipelineLayout;

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
       * @en GFX pipeline layout.
       * @zh GFX 管线布局。
       */
      _export("PipelineLayout", PipelineLayout = /*#__PURE__*/function (_GFXObject) {
        _inheritsLoose(PipelineLayout, _GFXObject);

        function PipelineLayout() {
          var _this;

          _this = _GFXObject.call(this, ObjectType.PIPELINE_LAYOUT) || this;
          _this._setLayouts = [];
          return _this;
        }

        _createClass(PipelineLayout, [{
          key: "setLayouts",
          get: function get() {
            return this._setLayouts;
          }
        }]);

        return PipelineLayout;
      }(GFXObject));
    }
  };
});
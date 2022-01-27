System.register("q-bundled:///fs/cocos/core/gfx/base/swapchain.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var GFXObject, ObjectType, SurfaceTransform, Swapchain;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_defineJs) {
      GFXObject = _defineJs.GFXObject;
      ObjectType = _defineJs.ObjectType;
      SurfaceTransform = _defineJs.SurfaceTransform;
    }],
    execute: function () {
      /**
       * @en GFX Swapchain.
       * @zh GFX 交换链。
       */
      _export("Swapchain", Swapchain = /*#__PURE__*/function (_GFXObject) {
        _inheritsLoose(Swapchain, _GFXObject);

        function Swapchain() {
          var _this;

          _this = _GFXObject.call(this, ObjectType.SWAPCHAIN) || this;
          _this._transform = SurfaceTransform.IDENTITY;
          _this._colorTexture = null;
          _this._depthStencilTexture = null;
          return _this;
        }

        _createClass(Swapchain, [{
          key: "colorTexture",
          get:
          /**
           * @en The color texture of this swapchain.
           * @zh 当前交换链的颜色缓冲。
           */
          function get() {
            return this._colorTexture;
          }
          /**
           * @en The depth stencil texture of this swapchain.
           * @zh 当前交换链的深度模板缓冲。
           */

        }, {
          key: "depthStencilTexture",
          get: function get() {
            return this._depthStencilTexture;
          }
          /**
           * @en The surface transform to be applied in projection matrices.
           * @zh 需要在投影矩阵中应用的表面变换。
           */

        }, {
          key: "surfaceTransform",
          get: function get() {
            return this._transform;
          }
        }, {
          key: "width",
          get: function get() {
            return this._colorTexture.width;
          }
        }, {
          key: "height",
          get: function get() {
            return this._colorTexture.height;
          }
        }]);

        return Swapchain;
      }(GFXObject));
    }
  };
});
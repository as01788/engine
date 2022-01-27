System.register("q-bundled:///fs/cocos/core/gfx/webgl2/states/webgl2-sampler.js", ["../../base/states/sampler.js", "../webgl2-commands.js", "../webgl2-define.js"], function (_export, _context) {
  "use strict";

  var Sampler, WebGL2CmdFuncCreateSampler, WebGL2CmdFuncDestroySampler, WebGL2DeviceManager, WebGL2Sampler;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseStatesSamplerJs) {
      Sampler = _baseStatesSamplerJs.Sampler;
    }, function (_webgl2CommandsJs) {
      WebGL2CmdFuncCreateSampler = _webgl2CommandsJs.WebGL2CmdFuncCreateSampler;
      WebGL2CmdFuncDestroySampler = _webgl2CommandsJs.WebGL2CmdFuncDestroySampler;
    }, function (_webgl2DefineJs) {
      WebGL2DeviceManager = _webgl2DefineJs.WebGL2DeviceManager;
    }],
    execute: function () {
      _export("WebGL2Sampler", WebGL2Sampler = /*#__PURE__*/function (_Sampler) {
        _inheritsLoose(WebGL2Sampler, _Sampler);

        function WebGL2Sampler(info, hash) {
          var _this;

          _this = _Sampler.call(this, info, hash) || this;
          _this._gpuSampler = null;
          _this._gpuSampler = {
            glSampler: null,
            minFilter: _this._info.minFilter,
            magFilter: _this._info.magFilter,
            mipFilter: _this._info.mipFilter,
            addressU: _this._info.addressU,
            addressV: _this._info.addressV,
            addressW: _this._info.addressW,
            glMinFilter: 0,
            glMagFilter: 0,
            glWrapS: 0,
            glWrapT: 0,
            glWrapR: 0
          };
          WebGL2CmdFuncCreateSampler(WebGL2DeviceManager.instance, _this._gpuSampler);
          return _this;
        }

        var _proto = WebGL2Sampler.prototype;

        _proto.destroy = function destroy() {
          if (this._gpuSampler) {
            WebGL2CmdFuncDestroySampler(WebGL2DeviceManager.instance, this._gpuSampler);
            this._gpuSampler = null;
          }
        };

        _createClass(WebGL2Sampler, [{
          key: "gpuSampler",
          get: function get() {
            return this._gpuSampler;
          }
        }]);

        return WebGL2Sampler;
      }(Sampler));
    }
  };
});
System.register("q-bundled:///fs/cocos/core/gfx/base/states/sampler.js", ["../define.js"], function (_export, _context) {
  "use strict";

  var GFXObject, ObjectType, SamplerInfo, Sampler;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_defineJs) {
      GFXObject = _defineJs.GFXObject;
      ObjectType = _defineJs.ObjectType;
      SamplerInfo = _defineJs.SamplerInfo;
    }],
    execute: function () {
      /**
       * @en GFX sampler.
       * @zh GFX 采样器。
       */
      _export("Sampler", Sampler = /*#__PURE__*/function (_GFXObject) {
        _inheritsLoose(Sampler, _GFXObject);

        function Sampler(info, hash) {
          var _this;

          _this = _GFXObject.call(this, ObjectType.SAMPLER) || this;
          _this._info = new SamplerInfo();
          _this._hash = 0;

          _this._info.copy(info);

          _this._hash = hash;
          return _this;
        }

        Sampler.computeHash = function computeHash(info) {
          var hash = info.minFilter;
          hash |= info.magFilter << 2;
          hash |= info.mipFilter << 4;
          hash |= info.addressU << 6;
          hash |= info.addressV << 8;
          hash |= info.addressW << 10;
          hash |= info.maxAnisotropy << 12;
          hash |= info.cmpFunc << 16;
          return hash;
        };

        Sampler.unpackFromHash = function unpackFromHash(hash) {
          var info = new SamplerInfo();
          info.minFilter = (hash & (1 << 2) - 1) >> 0;
          info.magFilter = (hash & (1 << 2) - 1) >> 2;
          info.mipFilter = (hash & (1 << 2) - 1) >> 4;
          info.addressU = (hash & (1 << 2) - 1) >> 6;
          info.addressV = (hash & (1 << 2) - 1) >> 8;
          info.addressW = (hash & (1 << 2) - 1) >> 10;
          info.maxAnisotropy = (hash & (1 << 4) - 1) >> 12;
          info.cmpFunc = (hash & (1 << 3) - 1) >> 16;
          return info;
        };

        _createClass(Sampler, [{
          key: "info",
          get: function get() {
            return this._info;
          }
        }, {
          key: "hash",
          get: function get() {
            return this._hash;
          }
        }]);

        return Sampler;
      }(GFXObject));
    }
  };
});
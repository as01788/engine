System.register("q-bundled:///fs/cocos/core/gfx/base/states/texture-barrier.js", ["../../../utils/murmurhash2_gc.js", "../define.js"], function (_export, _context) {
  "use strict";

  var murmurhash2_32_gc, GFXObject, ObjectType, TextureBarrierInfo, TextureBarrier;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_utilsMurmurhash2_gcJs) {
      murmurhash2_32_gc = _utilsMurmurhash2_gcJs.murmurhash2_32_gc;
    }, function (_defineJs) {
      GFXObject = _defineJs.GFXObject;
      ObjectType = _defineJs.ObjectType;
      TextureBarrierInfo = _defineJs.TextureBarrierInfo;
    }],
    execute: function () {
      /**
       * @en GFX texture barrier.
       * @zh GFX 贴图内存屏障。
       */
      _export("TextureBarrier", TextureBarrier = /*#__PURE__*/function (_GFXObject) {
        _inheritsLoose(TextureBarrier, _GFXObject);

        function TextureBarrier(info, hash) {
          var _this;

          _this = _GFXObject.call(this, ObjectType.TEXTURE_BARRIER) || this;
          _this._info = new TextureBarrierInfo();
          _this._hash = 0;

          _this._info.copy(info);

          _this._hash = hash;
          return _this;
        }

        TextureBarrier.computeHash = function computeHash(info) {
          var res = 'prev:';

          for (var i = 0; i < info.prevAccesses.length; ++i) {
            res += " " + info.prevAccesses[i];
          }

          res += 'next:';

          for (var _i = 0; _i < info.nextAccesses.length; ++_i) {
            res += " " + info.nextAccesses[_i];
          }

          res += info.discardContents;
          res += info.srcQueue ? info.srcQueue.type : 0;
          res += info.dstQueue ? info.dstQueue.type : 0;
          return murmurhash2_32_gc(res, 666);
        };

        _createClass(TextureBarrier, [{
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

        return TextureBarrier;
      }(GFXObject));
    }
  };
});
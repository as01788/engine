System.register("q-bundled:///fs/cocos/core/renderer/scene/sphere-light.js", ["../../../../../virtual/internal%253Aconstants.js", "../../geometry/index.js", "../../global-exports.js", "../../math/index.js", "./light.js"], function (_export, _context) {
  "use strict";

  var JSB, AABB, legacyCC, Vec3, Light, LightType, nt2lm, SphereLight;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_geometryIndexJs) {
      AABB = _geometryIndexJs.AABB;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_lightJs) {
      Light = _lightJs.Light;
      LightType = _lightJs.LightType;
      nt2lm = _lightJs.nt2lm;
    }],
    execute: function () {
      _export("SphereLight", SphereLight = /*#__PURE__*/function (_Light) {
        _inheritsLoose(SphereLight, _Light);

        var _proto = SphereLight.prototype;

        _proto._init = function _init() {
          _Light.prototype._init.call(this);

          if (JSB) {
            this._nativeObj.setPosition(this._pos);

            this._nativeObj.setAABB(this._aabb["native"]);
          }
        };

        _proto._destroy = function _destroy() {
          _Light.prototype._destroy.call(this);
        };

        function SphereLight() {
          var _this;

          _this = _Light.call(this) || this;
          _this._needUpdate = false;
          _this._size = 0.15;
          _this._range = 1.0;
          _this._luminanceHDR = 0;
          _this._luminanceLDR = 0;
          _this._pos = void 0;
          _this._aabb = void 0;
          _this._aabb = AABB.create();
          _this._pos = new Vec3();
          _this._type = LightType.SPHERE;
          return _this;
        }

        _proto.initialize = function initialize() {
          _Light.prototype.initialize.call(this);

          var size = 0.15;
          this.size = size;
          this.range = 1.0;
          this.luminance = 1700 / nt2lm(size);
          this.luminanceLDR = 1.0;
        };

        _proto.update = function update() {
          if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
            this._node.getWorldPosition(this._pos);

            var range = this._range;
            AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, range, range, range);
            this._needUpdate = false;
          }
        };

        _createClass(SphereLight, [{
          key: "position",
          get: function get() {
            return this._pos;
          }
        }, {
          key: "size",
          get: function get() {
            return this._size;
          },
          set: function set(size) {
            this._size = size;

            if (JSB) {
              this._nativeObj.setSize(size);
            }
          }
        }, {
          key: "range",
          get: function get() {
            return this._range;
          },
          set: function set(range) {
            this._range = range;

            if (JSB) {
              this._nativeObj.setRange(range);
            }

            this._needUpdate = true;
          }
        }, {
          key: "luminance",
          get: function get() {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._luminanceHDR;
            } else {
              return this._luminanceLDR;
            }
          },
          set: function set(value) {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this.luminanceHDR = value;
            } else {
              this.luminanceLDR = value;
            }
          }
        }, {
          key: "luminanceHDR",
          get: function get() {
            return this._luminanceHDR;
          },
          set: function set(value) {
            this._luminanceHDR = value;

            if (JSB) {
              this._nativeObj.setLuminanceHDR(value);
            }
          }
        }, {
          key: "luminanceLDR",
          set: function set(value) {
            this._luminanceLDR = value;

            if (JSB) {
              this._nativeObj.setLuminanceLDR(value);
            }
          }
        }, {
          key: "aabb",
          get: function get() {
            return this._aabb;
          }
        }]);

        return SphereLight;
      }(Light));
    }
  };
});
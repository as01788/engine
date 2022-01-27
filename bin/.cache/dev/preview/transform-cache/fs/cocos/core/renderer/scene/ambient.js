System.register("q-bundled:///fs/cocos/core/renderer/scene/ambient.js", ["../../../../../virtual/internal%253Aconstants.js", "../../math/index.js", "../../global-exports.js", "./native-scene.js"], function (_export, _context) {
  "use strict";

  var JSB, Vec4, legacyCC, NativeAmbient, Ambient;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_mathIndexJs) {
      Vec4 = _mathIndexJs.Vec4;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_nativeSceneJs) {
      NativeAmbient = _nativeSceneJs.NativeAmbient;
    }],
    execute: function () {
      _export("Ambient", Ambient = /*#__PURE__*/function () {
        function Ambient() {
          this._groundAlbedoHDR = new Vec4(0.2, 0.2, 0.2, 1.0);
          this._skyColorHDR = new Vec4(0.2, 0.5, 0.8, 1.0);
          this._skyIllumHDR = 0;
          this._groundAlbedoLDR = new Vec4(0.2, 0.2, 0.2, 1.0);
          this._skyColorLDR = new Vec4(0.2, 0.5, 0.8, 1.0);
          this._skyIllumLDR = 0;
          this._enabled = false;

          if (JSB) {
            this._nativeObj = new NativeAmbient();
          }
        }

        var _proto = Ambient.prototype;

        _proto.initialize = function initialize(ambientInfo) {
          // Init HDR/LDR from serialized data on load
          this._skyColorHDR = ambientInfo.skyColorHDR;
          this._groundAlbedoHDR.x = ambientInfo.groundAlbedoHDR.x;
          this._groundAlbedoHDR.y = ambientInfo.groundAlbedoHDR.y;
          this._groundAlbedoHDR.z = ambientInfo.groundAlbedoHDR.z;
          this._skyIllumHDR = ambientInfo.skyIllumHDR;
          this._skyColorLDR = ambientInfo.skyColorLDR;
          this._groundAlbedoLDR.x = ambientInfo.groundAlbedoLDR.x;
          this._groundAlbedoLDR.y = ambientInfo.groundAlbedoLDR.y;
          this._groundAlbedoLDR.z = ambientInfo.groundAlbedoLDR.z;
          this._skyIllumLDR = ambientInfo.skyIllumLDR;

          if (JSB) {
            this._nativeObj.skyIllum = this.skyIllum;
            this._nativeObj.skyColor = this.skyColor;
            this._nativeObj.groundAlbedo = this.groundAlbedo;
          }
        };

        _proto._destroy = function _destroy() {
          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto.destroy = function destroy() {
          this._destroy();
        };

        _createClass(Ambient, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          }
          /**
           * @en Sky color
           * @zh 天空颜色
           */
          ,
          set:
          /**
           * @en Enable ambient
           * @zh 是否开启环境光
           */
          function set(val) {
            this._enabled = val;

            if (JSB) {
              this._nativeObj.enabled = val;
            }
          }
        }, {
          key: "skyColor",
          get: function get() {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._skyColorHDR;
            } else {
              return this._skyColorLDR;
            }
          },
          set: function set(color) {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this._skyColorHDR.x = color.x;
              this._skyColorHDR.y = color.y;
              this._skyColorHDR.z = color.z;
            } else {
              this._skyColorLDR.x = color.x;
              this._skyColorLDR.y = color.y;
              this._skyColorLDR.z = color.z;
            }

            if (JSB) {
              this._nativeObj.skyColor = isHDR ? this._skyColorHDR : this._skyColorLDR;
            }
          }
          /**
           * @en Sky illuminance
           * @zh 天空亮度
           */

        }, {
          key: "skyIllum",
          get: function get() {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._skyIllumHDR;
            } else {
              return this._skyIllumLDR;
            }
          },
          set: function set(illum) {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this._skyIllumHDR = illum;
            } else {
              this._skyIllumLDR = illum;
            }

            if (JSB) {
              this._nativeObj.skyIllum = isHDR ? this._skyIllumHDR : this._skyIllumLDR;
            }
          }
          /**
           * @en Ground color
           * @zh 地面颜色
           */

        }, {
          key: "groundAlbedo",
          get: function get() {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._groundAlbedoHDR;
            } else {
              return this._groundAlbedoLDR;
            }
          },
          set: function set(color) {
            var isHDR = legacyCC.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this._groundAlbedoHDR.x = color.x;
              this._groundAlbedoHDR.y = color.y;
              this._groundAlbedoHDR.z = color.z;
            } else {
              this._groundAlbedoLDR.x = color.x;
              this._groundAlbedoLDR.y = color.y;
              this._groundAlbedoLDR.z = color.z;
            }

            if (JSB) {
              this._nativeObj.groundAlbedo = isHDR ? this._groundAlbedoHDR : this._groundAlbedoLDR;
            }
          }
        }, {
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }]);

        return Ambient;
      }());

      Ambient.SUN_ILLUM = 65000.0;
      Ambient.SKY_ILLUM = 20000.0;
      legacyCC.Ambient = Ambient;
    }
  };
});
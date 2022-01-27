System.register("q-bundled:///fs/cocos/core/renderer/scene/fog.js", ["../../../../../virtual/internal%253Aconstants.js", "../../value-types/index.js", "../../math/index.js", "../../global-exports.js", "./native-scene.js", "../../pipeline/pipeline-funcs.js"], function (_export, _context) {
  "use strict";

  var JSB, Enum, Color, Vec4, legacyCC, NativeFog, SRGBToLinear, _v4, FogType, FOG_TYPE_NONE, Fog;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_valueTypesIndexJs) {
      Enum = _valueTypesIndexJs.Enum;
    }, function (_mathIndexJs) {
      Color = _mathIndexJs.Color;
      Vec4 = _mathIndexJs.Vec4;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_nativeSceneJs) {
      NativeFog = _nativeSceneJs.NativeFog;
    }, function (_pipelinePipelineFuncsJs) {
      SRGBToLinear = _pipelinePipelineFuncsJs.SRGBToLinear;
    }],
    execute: function () {
      _v4 = new Vec4();
      /**
       * @zh
       * 全局雾类型。
       * @en
       * The global fog type
       * @static
       * @enum FogInfo.FogType
       */

      _export("FogType", FogType = Enum({
        /**
         * @zh
         * 线性雾。
         * @en
         * Linear fog
         * @readonly
         */
        LINEAR: 0,

        /**
         * @zh
         * 指数雾。
         * @en
         * Exponential fog
         * @readonly
         */
        EXP: 1,

        /**
         * @zh
         * 指数平方雾。
         * @en
         * Exponential square fog
         * @readonly
         */
        EXP_SQUARED: 2,

        /**
         * @zh
         * 层叠雾。
         * @en
         * Layered fog
         * @readonly
         */
        LAYERED: 3
      }));

      FOG_TYPE_NONE = FogType.LAYERED + 1;

      _export("Fog", Fog = /*#__PURE__*/function () {
        function Fog() {
          this._fogColor = new Color('#C8C8C8');
          this._colorArray = new Vec4(0.2, 0.2, 0.2, 1.0);
          this._enabled = false;
          this._accurate = false;
          this._type = 0;
          this._fogDensity = 0.3;
          this._fogStart = 0.5;
          this._fogEnd = 300;
          this._fogAtten = 5;
          this._fogTop = 1.5;
          this._fogRange = 1.2;

          if (JSB) {
            this._nativeObj = new NativeFog();
          }
        }

        var _proto = Fog.prototype;

        _proto._setType = function _setType(val) {
          this._type = this.enabled ? val : FOG_TYPE_NONE;

          if (JSB) {
            this._nativeObj.type = this._type;
          }
        };

        _proto._setEnable = function _setEnable(val) {
          this._enabled = val;

          if (JSB) {
            this._nativeObj.enabled = val;
          }
        };

        _proto._setAccurate = function _setAccurate(val) {
          this._accurate = val;

          if (JSB) {
            this._nativeObj.accurate = val;
          }
        };

        _proto.initialize = function initialize(fogInfo) {
          this.fogColor = fogInfo.fogColor;

          this._setEnable(fogInfo.enabled);

          this._setAccurate(fogInfo.accurate);

          this._setType(fogInfo.type);

          this.fogDensity = fogInfo.fogDensity;
          this.fogStart = fogInfo.fogStart;
          this.fogEnd = fogInfo.fogEnd;
          this.fogAtten = fogInfo.fogAtten;
          this.fogTop = fogInfo.fogTop;
          this.fogRange = fogInfo.fogRange;
        };

        _proto.activate = function activate() {
          this._updatePipeline();
        };

        _proto._updatePipeline = function _updatePipeline() {
          var root = legacyCC.director.root;
          var value = this.enabled ? this.type : FOG_TYPE_NONE;
          var accurateValue = this.accurate ? 1 : 0;
          var pipeline = root.pipeline;

          if (pipeline.macros.CC_USE_FOG === value && pipeline.macros.CC_USE_ACCURATE_FOG === accurateValue) {
            return;
          }

          pipeline.macros.CC_USE_FOG = value;
          pipeline.macros.CC_USE_ACCURATE_FOG = accurateValue;
          root.onGlobalPipelineStateChanged();
        };

        _proto._destroy = function _destroy() {
          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto.destroy = function destroy() {
          this._destroy();
        };

        _createClass(Fog, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          }
          /**
           * @zh 是否启用精确雾效(像素雾)计算
           * @en Enable accurate fog (pixel fog)
           */
          ,
          set:
          /**
           * @zh 是否启用全局雾效
           * @en Enable global fog
           */
          function set(val) {
            this._setEnable(val);

            if (!val) {
              this._type = FOG_TYPE_NONE;

              this._updatePipeline();
            } else {
              this.activate();
            }
          }
        }, {
          key: "accurate",
          get: function get() {
            return this._accurate;
          }
          /**
           * @zh 全局雾颜色
           * @en Global fog color
           */
          ,
          set: function set(val) {
            this._setAccurate(val);

            this._updatePipeline();
          }
        }, {
          key: "fogColor",
          get: function get() {
            return this._fogColor;
          }
          /**
           * @zh 当前雾化类型。
           * @en The current global fog type.
           * @returns {FogType}
           * Returns the current global fog type
           * - -1:Disable global Fog
           * - 0:Linear fog
           * - 1:Exponential fog
           * - 2:Exponential square fog
           * - 3:Layered fog
           */
          ,
          set: function set(val) {
            this._fogColor.set(val);

            _v4.set(val.x, val.y, val.z, val.w);

            SRGBToLinear(this._colorArray, _v4);

            if (JSB) {
              this._nativeObj.color = this._fogColor;
            }
          }
        }, {
          key: "type",
          get: function get() {
            return this._type;
          },
          set: function set(val) {
            this._setType(val);

            if (this.enabled) this._updatePipeline();
          }
          /**
           * @zh 全局雾浓度
           * @en Global fog density
           */

        }, {
          key: "fogDensity",
          get: function get() {
            return this._fogDensity;
          },
          set: function set(val) {
            this._fogDensity = val;

            if (JSB) {
              this._nativeObj.density = val;
            }
          }
          /**
           * @zh 雾效起始位置，只适用于线性雾
           * @en Global fog start position, only for linear fog
           */

        }, {
          key: "fogStart",
          get: function get() {
            return this._fogStart;
          },
          set: function set(val) {
            this._fogStart = val;

            if (JSB) {
              this._nativeObj.start = val;
            }
          }
          /**
           * @zh 雾效结束位置，只适用于线性雾
           * @en Global fog end position, only for linear fog
           */

        }, {
          key: "fogEnd",
          get: function get() {
            return this._fogEnd;
          },
          set: function set(val) {
            this._fogEnd = val;

            if (JSB) {
              this._nativeObj.end = val;
            }
          }
          /**
           * @zh 雾效衰减
           * @en Global fog attenuation
           */

        }, {
          key: "fogAtten",
          get: function get() {
            return this._fogAtten;
          },
          set: function set(val) {
            this._fogAtten = val;

            if (JSB) {
              this._nativeObj.atten = val;
            }
          }
          /**
           * @zh 雾效顶部范围，只适用于层级雾
           * @en Global fog top range, only for layered fog
           */

        }, {
          key: "fogTop",
          get: function get() {
            return this._fogTop;
          },
          set: function set(val) {
            this._fogTop = val;

            if (JSB) {
              this._nativeObj.top = val;
            }
          }
          /**
           * @zh 雾效范围，只适用于层级雾
           * @en Global fog range, only for layered fog
           */

        }, {
          key: "fogRange",
          get: function get() {
            return this._fogRange;
          },
          set: function set(val) {
            this._fogRange = val;

            if (JSB) {
              this._nativeObj.range = val;
            }
          }
        }, {
          key: "colorArray",
          get: function get() {
            return this._colorArray;
          }
        }, {
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }]);

        return Fog;
      }());

      legacyCC.Fog = Fog;
    }
  };
});
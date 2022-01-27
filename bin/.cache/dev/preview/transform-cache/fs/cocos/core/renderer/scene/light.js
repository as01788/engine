System.register("q-bundled:///fs/cocos/core/renderer/scene/light.js", ["../../../../../virtual/internal%253Aconstants.js", "../../math/index.js", "../../scene-graph/node-enum.js", "./native-scene.js"], function (_export, _context) {
  "use strict";

  var JSB, Vec3, TransformBit, NativeDirectionalLight, NativeSphereLight, NativeSpotLight, LightType, nt2lm, Light;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  // Color temperature (in Kelvin) to RGB
  function ColorTemperatureToRGB(rgb, kelvin) {
    if (kelvin < 1000.0) {
      kelvin = 1000.0;
    } else if (kelvin > 15000.0) {
      kelvin = 15000.0;
    } // Approximate Planckian locus in CIE 1960 UCS


    var kSqr = kelvin * kelvin;
    var u = (0.860117757 + 1.54118254e-4 * kelvin + 1.28641212e-7 * kSqr) / (1.0 + 8.42420235e-4 * kelvin + 7.08145163e-7 * kSqr);
    var v = (0.317398726 + 4.22806245e-5 * kelvin + 4.20481691e-8 * kSqr) / (1.0 - 2.89741816e-5 * kelvin + 1.61456053e-7 * kSqr);
    var d = 2.0 * u - 8.0 * v + 4.0;
    var x = 3.0 * u / d;
    var y = 2.0 * v / d;
    var z = 1.0 - x - y;
    var X = 1.0 / y * x;
    var Z = 1.0 / y * z; // XYZ to RGB with BT.709 primaries

    rgb.x = 3.2404542 * X + -1.5371385 + -0.4985314 * Z;
    rgb.y = -0.9692660 * X + 1.8760108 + 0.0415560 * Z;
    rgb.z = 0.0556434 * X + -0.2040259 + 1.0572252 * Z;
  }

  _export({
    ColorTemperatureToRGB: ColorTemperatureToRGB,
    LightType: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_sceneGraphNodeEnumJs) {
      TransformBit = _sceneGraphNodeEnumJs.TransformBit;
    }, function (_nativeSceneJs) {
      NativeDirectionalLight = _nativeSceneJs.NativeDirectionalLight;
      NativeSphereLight = _nativeSceneJs.NativeSphereLight;
      NativeSpotLight = _nativeSceneJs.NativeSpotLight;
    }],
    execute: function () {
      (function (LightType) {
        LightType[LightType["DIRECTIONAL"] = 0] = "DIRECTIONAL";
        LightType[LightType["SPHERE"] = 1] = "SPHERE";
        LightType[LightType["SPOT"] = 2] = "SPOT";
        LightType[LightType["UNKNOWN"] = 3] = "UNKNOWN";
      })(LightType || _export("LightType", LightType = {}));

      _export("nt2lm", nt2lm = function nt2lm(size) {
        return 4 * Math.PI * Math.PI * size * size;
      });

      _export("Light", Light = /*#__PURE__*/function () {
        function Light() {
          this._baked = false;
          this._color = new Vec3(1, 1, 1);
          this._colorTemp = 6550.0;
          this._colorTempRGB = new Vec3(1, 1, 1);
          this._scene = null;
          this._node = null;
          this._name = null;
          this._useColorTemperature = false;
          this._type = LightType.UNKNOWN;
        }

        var _proto = Light.prototype;

        _proto._init = function _init() {
          if (JSB) {
            switch (this._type) {
              case LightType.DIRECTIONAL:
                this._nativeObj = new NativeDirectionalLight();
                break;

              case LightType.SPHERE:
                this._nativeObj = new NativeSphereLight();
                break;

              case LightType.SPOT:
                this._nativeObj = new NativeSpotLight();
                break;

              default:
                break;
            }

            this._nativeObj.setType(this._type);
          }
        };

        _proto._destroy = function _destroy() {
          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto.initialize = function initialize() {
          this._init();

          this.color = new Vec3(1, 1, 1);
          this.colorTemperature = 6550.0;
        };

        _proto.attachToScene = function attachToScene(scene) {
          this._scene = scene;
        };

        _proto.detachFromScene = function detachFromScene() {
          this._scene = null;
        };

        _proto.destroy = function destroy() {
          this._name = null;
          this._node = null;

          this._destroy();
        };

        _proto.update = function update() {};

        _createClass(Light, [{
          key: "baked",
          get: function get() {
            return this._baked;
          },
          set: function set(val) {
            this._baked = val;

            if (JSB) {
              this._nativeObj.setBaked(val);
            }
          }
        }, {
          key: "color",
          get: function get() {
            return this._color;
          },
          set: function set(color) {
            this._color.set(color);

            if (JSB) {
              this._nativeObj.setColor(color);
            }
          }
        }, {
          key: "useColorTemperature",
          get: function get() {
            return this._useColorTemperature;
          },
          set: function set(enable) {
            this._useColorTemperature = enable;

            if (JSB) {
              this._nativeObj.setUseColorTemperature(enable);
            }
          }
        }, {
          key: "colorTemperature",
          get: function get() {
            return this._colorTemp;
          },
          set: function set(val) {
            this._colorTemp = val;
            ColorTemperatureToRGB(this._colorTempRGB, this._colorTemp);

            if (JSB) {
              this._nativeObj.setColorTemperatureRGB(this._colorTempRGB);
            }
          }
        }, {
          key: "colorTemperatureRGB",
          get: function get() {
            return this._colorTempRGB;
          }
        }, {
          key: "node",
          get: function get() {
            return this._node;
          },
          set: function set(n) {
            this._node = n;

            if (this._node) {
              this._node.hasChangedFlags |= TransformBit.ROTATION;

              if (JSB) {
                this._nativeObj.setNode(n ? n["native"] : null);
              }
            }
          }
        }, {
          key: "type",
          get: function get() {
            return this._type;
          }
        }, {
          key: "name",
          get: function get() {
            return this._name;
          },
          set: function set(n) {
            this._name = n;
          }
        }, {
          key: "scene",
          get: function get() {
            return this._scene;
          }
        }, {
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }]);

        return Light;
      }());
    }
  };
});
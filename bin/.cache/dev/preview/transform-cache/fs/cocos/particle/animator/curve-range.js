System.register("q-bundled:///fs/cocos/particle/animator/curve-range.js", ["../../core/data/decorators/index.js", "../../core/math/index.js", "../../core/value-types/index.js", "../../core/geometry/curve.js", "../../core/index.js", "../../core/assets/asset-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, type, serializable, editable, lerp, Enum, AnimationCurve, constructLegacyCurveAndConvert, Texture2D, ImageAsset, RealCurve, PixelFormat, Filter, WrapMode, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3, _temp, SerializableTable, Mode, CurveRange;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function evaluateCurve(cr, time, index) {
    switch (cr.mode) {
      case Mode.Constant:
        return cr.constant;

      case Mode.Curve:
        return cr.spline.evaluate(time) * cr.multiplier;

      case Mode.TwoCurves:
        return index === 0 ? cr.splineMin.evaluate(time) * cr.multiplier : cr.splineMax.evaluate(time) * cr.multiplier;

      case Mode.TwoConstants:
        return index === 0 ? cr.constantMin : cr.constantMax;

      default:
        return 0;
    }
  }

  function evaluateHeight(cr) {
    switch (cr.mode) {
      case Mode.TwoConstants:
        return 2;

      case Mode.TwoCurves:
        return 2;

      default:
        return 1;
    }
  }

  function packTexture(data, width, height) {
    var image = new ImageAsset({
      width: width,
      height: height,
      _data: data,
      _compressed: false,
      format: PixelFormat.RGBA32F
    });
    var texture = new Texture2D();
    texture.setFilters(Filter.NEAREST, Filter.NEAREST);
    texture.setMipFilter(Filter.NONE);
    texture.setWrapMode(WrapMode.CLAMP_TO_EDGE, WrapMode.CLAMP_TO_EDGE, WrapMode.CLAMP_TO_EDGE);
    texture.image = image;
    return texture;
  }

  function packCurveRangeZ(samples, cr, discrete) {
    var height = evaluateHeight(cr);
    var data = new Float32Array(samples * height * 4);
    var interval = 1.0 / (samples - 1);
    var sum = 0;
    var average = 0;
    var offset = 0;

    for (var h = 0; h < height; h++) {
      sum = 0;

      for (var j = 0; j < samples; j++) {
        var value = evaluateCurve(cr, interval * j, h);

        if (discrete) {
          average = value;
        } else {
          sum += value;
          average = sum / (j + 1);
        }

        data[offset + 2] = value;
        offset += 4;
      }
    }

    return packTexture(data, samples, height);
  }

  function packCurveRangeN(samples, cr, discrete) {
    var height = evaluateHeight(cr);
    var data = new Float32Array(samples * height * 4);
    var interval = 1.0 / (samples - 1);
    var sum = 0;
    var average = 0;
    var offset = 0;

    for (var h = 0; h < height; h++) {
      sum = 0;

      for (var j = 0; j < samples; j++) {
        var value = evaluateCurve(cr, interval * j, h);

        if (discrete) {
          average = value;
        } else {
          sum += value;
          average = sum / (j + 1);
        }

        data[offset] = average;
        data[offset + 1] = average;
        data[offset + 2] = average;
        offset += 4;
      }
    }

    return packTexture(data, samples, height);
  }

  function packCurveRangeXY(samples, x, y, discrete) {
    var height = Math.max(evaluateHeight(x), evaluateHeight(y));
    var data = new Float32Array(samples * height * 4);
    var curves = [x, y];
    var interval = 1.0 / (samples - 1);

    for (var h = 0; h < height; h++) {
      for (var i = 0; i < 2; i++) {
        var cr = curves[i];
        var sum = 0;
        var average = 0;

        for (var j = 0; j < samples; j++) {
          var value = evaluateCurve(cr, interval * j, h);

          if (discrete) {
            average = value;
          } else {
            sum += value;
            average = sum / (j + 1);
          }

          data[j * 4 + i] = average;
        }
      }
    }

    return packTexture(data, samples, height);
  }

  function packCurveRangeXYZ(samples, x, y, z, discrete) {
    var height = Math.max(evaluateHeight(x), evaluateHeight(y), evaluateHeight(z));
    var data = new Float32Array(samples * height * 4);
    var curves = [x, y, z];
    var interval = 1.0 / (samples - 1);

    for (var h = 0; h < height; h++) {
      for (var i = 0; i < 3; i++) {
        var cr = curves[i];
        var sum = 0;
        var average = 0;

        for (var j = 0; j < samples; j++) {
          var value = evaluateCurve(cr, interval * j, h);

          if (discrete) {
            average = value;
          } else {
            sum += value;
            average = sum / (j + 1);
          }

          data[j * 4 + i] = average;
        }
      }
    }

    return packTexture(data, samples, height);
  }

  function packCurveRangeXYZW(samples, x, y, z, w, discrete) {
    var height = Math.max(evaluateHeight(x), evaluateHeight(y), evaluateHeight(z), evaluateHeight(w));
    var data = new Float32Array(samples * height * 4);
    var curves = [x, y, z, w];
    var interval = 1.0 / (samples - 1);

    for (var h = 0; h < height; h++) {
      for (var i = 0; i < 4; i++) {
        var cr = curves[i];
        var sum = 0;
        var average = 0;

        for (var j = 0; j < samples; j++) {
          var value = evaluateCurve(cr, interval * j, h);

          if (discrete) {
            average = value;
          } else {
            sum += value;
            average = sum / (j + 1);
          }

          data[j * 4 + i] = average;
        }
      }
    }

    return packTexture(data, samples, height);
  }

  _export({
    packCurveRangeZ: packCurveRangeZ,
    packCurveRangeN: packCurveRangeN,
    packCurveRangeXY: packCurveRangeXY,
    packCurveRangeXYZ: packCurveRangeXYZ,
    packCurveRangeXYZW: packCurveRangeXYZW
  });

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_coreMathIndexJs) {
      lerp = _coreMathIndexJs.lerp;
    }, function (_coreValueTypesIndexJs) {
      Enum = _coreValueTypesIndexJs.Enum;
    }, function (_coreGeometryCurveJs) {
      AnimationCurve = _coreGeometryCurveJs.AnimationCurve;
      constructLegacyCurveAndConvert = _coreGeometryCurveJs.constructLegacyCurveAndConvert;
    }, function (_coreIndexJs) {
      Texture2D = _coreIndexJs.Texture2D;
      ImageAsset = _coreIndexJs.ImageAsset;
      RealCurve = _coreIndexJs.RealCurve;
    }, function (_coreAssetsAssetEnumJs) {
      PixelFormat = _coreAssetsAssetEnumJs.PixelFormat;
      Filter = _coreAssetsAssetEnumJs.Filter;
      WrapMode = _coreAssetsAssetEnumJs.WrapMode;
    }],
    execute: function () {
      SerializableTable = [['mode', 'constant', 'multiplier'], ['mode', 'spline', 'multiplier'], ['mode', 'splineMin', 'splineMax', 'multiplier'], ['mode', 'constantMin', 'constantMax', 'multiplier']];

      _export("Mode", Mode = Enum({
        Constant: 0,
        Curve: 1,
        TwoCurves: 2,
        TwoConstants: 3
      }));

      _export("default", CurveRange = (_dec = ccclass('cc.CurveRange'), _dec2 = type(Mode), _dec3 = type(RealCurve), _dec4 = type(RealCurve), _dec5 = type(RealCurve), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
        function CurveRange() {
          _initializerDefineProperty(this, "mode", _descriptor, this);

          _initializerDefineProperty(this, "spline", _descriptor2, this);

          _initializerDefineProperty(this, "splineMin", _descriptor3, this);

          _initializerDefineProperty(this, "splineMax", _descriptor4, this);

          _initializerDefineProperty(this, "constant", _descriptor5, this);

          _initializerDefineProperty(this, "constantMin", _descriptor6, this);

          _initializerDefineProperty(this, "constantMax", _descriptor7, this);

          _initializerDefineProperty(this, "multiplier", _descriptor8, this);

          this._curve = new AnimationCurve(this.spline);
          this._curveMin = new AnimationCurve(this.splineMin);
          this._curveMax = new AnimationCurve(this.splineMax);
        }

        var _proto = CurveRange.prototype;

        _proto.evaluate = function evaluate(time, rndRatio) {
          switch (this.mode) {
            default:
            case Mode.Constant:
              return this.constant;

            case Mode.Curve:
              return this.spline.evaluate(time) * this.multiplier;

            case Mode.TwoCurves:
              return lerp(this.splineMin.evaluate(time), this.splineMax.evaluate(time), rndRatio) * this.multiplier;

            case Mode.TwoConstants:
              return lerp(this.constantMin, this.constantMax, rndRatio);
          }
        };

        _proto.getMax = function getMax() {
          switch (this.mode) {
            default:
            case Mode.Constant:
              return this.constant;

            case Mode.Curve:
              return this.multiplier;

            case Mode.TwoConstants:
              return this.constantMax;

            case Mode.TwoCurves:
              return this.multiplier;
          }
        };

        _proto._onBeforeSerialize = function _onBeforeSerialize(props) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return SerializableTable[this.mode];
        };

        _createClass(CurveRange, [{
          key: "curve",
          get:
          /**
           * @zh 曲线类型[[Mode]]。
           */

          /**
           * @zh 当mode为Curve时，使用的曲线。
           */

          /**
           * @zh 当mode为TwoCurves时，使用的曲线下限。
           */

          /**
           * @zh 当mode为TwoCurves时，使用的曲线上限。
           */

          /**
           * @zh 当mode为Curve时，使用的曲线。
           * @deprecated Since V3.3. Use `spline` instead.
           */
          function get() {
            return this._curve;
          },
          set: function set(value) {
            this._curve = value;
            this.spline = value._internalCurve;
          }
          /**
           * @zh 当mode为TwoCurves时，使用的曲线下限。
           * @deprecated Since V3.3. Use `splineMin` instead.
           */

        }, {
          key: "curveMin",
          get: function get() {
            return this._curveMin;
          },
          set: function set(value) {
            this._curveMin = value;
            this.splineMin = value._internalCurve;
          }
          /**
           * @zh 当mode为TwoCurves时，使用的曲线上限。
           * @deprecated Since V3.3. Use `splineMax` instead.
           */

        }, {
          key: "curveMax",
          get: function get() {
            return this._curveMax;
          },
          set: function set(value) {
            this._curveMax = value;
            this.splineMax = value._internalCurve;
          }
          /**
           * @zh 当mode为Constant时，曲线的值。
           */

        }]);

        return CurveRange;
      }(), _class3.Mode = Mode, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Mode.Constant;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spline", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return constructLegacyCurveAndConvert();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "splineMin", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return constructLegacyCurveAndConvert();
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "splineMax", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return constructLegacyCurveAndConvert();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "constant", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "constantMin", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "constantMax", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "multiplier", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));
    }
  };
});
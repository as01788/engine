System.register("q-bundled:///fs/cocos/core/animation/tracks/vector-track.js", ["../../data/decorators/index.js", "../../curves/index.js", "../../math/index.js", "../define.js", "./track.js", "./utils.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, RealCurve, Vec2, Vec3, Vec4, CLASS_NAME_PREFIX_ANIM, createEvalSymbol, Channel, Track, maskIfEmpty, _dec, _class, _class2, _descriptor, _descriptor2, _temp, CHANNEL_NAMES, VectorTrack, Vec2TrackEval, Vec3TrackEval, Vec4TrackEval;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_curvesIndexJs) {
      RealCurve = _curvesIndexJs.RealCurve;
    }, function (_mathIndexJs) {
      Vec2 = _mathIndexJs.Vec2;
      Vec3 = _mathIndexJs.Vec3;
      Vec4 = _mathIndexJs.Vec4;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
      createEvalSymbol = _defineJs.createEvalSymbol;
    }, function (_trackJs) {
      Channel = _trackJs.Channel;
      Track = _trackJs.Track;
    }, function (_utilsJs) {
      maskIfEmpty = _utilsJs.maskIfEmpty;
    }],
    execute: function () {
      CHANNEL_NAMES = ['X', 'Y', 'Z', 'W'];

      _export("VectorTrack", VectorTrack = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "VectorTrack"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Track) {
        _inheritsLoose(VectorTrack, _Track);

        function VectorTrack() {
          var _this;

          _this = _Track.call(this) || this;

          _initializerDefineProperty(_this, "_channels", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_nComponents", _descriptor2, _assertThisInitialized(_this));

          _this._channels = new Array(4);

          for (var i = 0; i < _this._channels.length; ++i) {
            var channel = new Channel(new RealCurve());
            channel.name = CHANNEL_NAMES[i];
            _this._channels[i] = channel;
          }

          return _this;
        }

        var _proto = VectorTrack.prototype;

        _proto.channels = function channels() {
          return this._channels;
        };

        _proto[createEvalSymbol] = function () {
          switch (this._nComponents) {
            default:
            case 2:
              return new Vec2TrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve));

            case 3:
              return new Vec3TrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve), maskIfEmpty(this._channels[2].curve));

            case 4:
              return new Vec4TrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve), maskIfEmpty(this._channels[2].curve), maskIfEmpty(this._channels[3].curve));
          }
        };

        _createClass(VectorTrack, [{
          key: "componentsCount",
          get: function get() {
            return this._nComponents;
          },
          set: function set(value) {
            this._nComponents = value;
          }
        }]);

        return VectorTrack;
      }(Track), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_channels", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_nComponents", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      })), _class2)) || _class));

      _export("Vec2TrackEval", Vec2TrackEval = /*#__PURE__*/function () {
        function Vec2TrackEval(_x, _y) {
          this._result = new Vec2();
          this._x = _x;
          this._y = _y;
        }

        var _proto2 = Vec2TrackEval.prototype;

        _proto2.evaluate = function evaluate(time, runtimeBinding) {
          if ((!this._x || !this._y) && runtimeBinding.getValue) {
            Vec2.copy(this._result, runtimeBinding.getValue());
          }

          if (this._x) {
            this._result.x = this._x.evaluate(time);
          }

          if (this._y) {
            this._result.y = this._y.evaluate(time);
          }

          return this._result;
        };

        return Vec2TrackEval;
      }());

      _export("Vec3TrackEval", Vec3TrackEval = /*#__PURE__*/function () {
        function Vec3TrackEval(_x, _y, _z) {
          this._result = new Vec3();
          this._x = _x;
          this._y = _y;
          this._z = _z;
        }

        var _proto3 = Vec3TrackEval.prototype;

        _proto3.evaluate = function evaluate(time, runtimeBinding) {
          if ((!this._x || !this._y || !this._z) && runtimeBinding.getValue) {
            Vec3.copy(this._result, runtimeBinding.getValue());
          }

          if (this._x) {
            this._result.x = this._x.evaluate(time);
          }

          if (this._y) {
            this._result.y = this._y.evaluate(time);
          }

          if (this._z) {
            this._result.z = this._z.evaluate(time);
          }

          return this._result;
        };

        return Vec3TrackEval;
      }());

      _export("Vec4TrackEval", Vec4TrackEval = /*#__PURE__*/function () {
        function Vec4TrackEval(_x, _y, _z, _w) {
          this._result = new Vec4();
          this._x = _x;
          this._y = _y;
          this._z = _z;
          this._w = _w;
        }

        var _proto4 = Vec4TrackEval.prototype;

        _proto4.evaluate = function evaluate(time, runtimeBinding) {
          if ((!this._x || !this._y || !this._z || !this._w) && runtimeBinding.getValue) {
            Vec4.copy(this._result, runtimeBinding.getValue());
          }

          if (this._x) {
            this._result.x = this._x.evaluate(time);
          }

          if (this._y) {
            this._result.y = this._y.evaluate(time);
          }

          if (this._z) {
            this._result.z = this._z.evaluate(time);
          }

          if (this._w) {
            this._result.w = this._w.evaluate(time);
          }

          return this._result;
        };

        return Vec4TrackEval;
      }());
    }
  };
});
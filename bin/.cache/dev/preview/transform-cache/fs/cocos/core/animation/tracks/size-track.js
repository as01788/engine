System.register("q-bundled:///fs/cocos/core/animation/tracks/size-track.js", ["../../data/decorators/index.js", "../../curves/index.js", "../../math/index.js", "../define.js", "./track.js", "./utils.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, RealCurve, Size, CLASS_NAME_PREFIX_ANIM, createEvalSymbol, Channel, Track, maskIfEmpty, _dec, _class, _class2, _descriptor, _temp, CHANNEL_NAMES, SizeTrack, SizeTrackEval;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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
      Size = _mathIndexJs.Size;
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
      CHANNEL_NAMES = ['Width', 'Height'];

      _export("SizeTrack", SizeTrack = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "SizeTrack"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Track) {
        _inheritsLoose(SizeTrack, _Track);

        function SizeTrack() {
          var _this;

          _this = _Track.call(this) || this;

          _initializerDefineProperty(_this, "_channels", _descriptor, _assertThisInitialized(_this));

          _this._channels = new Array(2);

          for (var i = 0; i < _this._channels.length; ++i) {
            var channel = new Channel(new RealCurve());
            channel.name = CHANNEL_NAMES[i];
            _this._channels[i] = channel;
          }

          return _this;
        }

        var _proto = SizeTrack.prototype;

        _proto.channels = function channels() {
          return this._channels;
        };

        _proto[createEvalSymbol] = function () {
          return new SizeTrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve));
        };

        return SizeTrack;
      }(Track), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_channels", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _export("SizeTrackEval", SizeTrackEval = /*#__PURE__*/function () {
        function SizeTrackEval(_width, _height) {
          this._result = new Size();
          this._width = _width;
          this._height = _height;
        }

        var _proto2 = SizeTrackEval.prototype;

        _proto2.evaluate = function evaluate(time, runtimeBinding) {
          if ((!this._width || !this._height) && runtimeBinding.getValue) {
            var size = runtimeBinding.getValue();
            this._result.x = size.x;
            this._result.y = size.y;
          }

          if (this._width) {
            this._result.width = this._width.evaluate(time);
          }

          if (this._height) {
            this._result.height = this._height.evaluate(time);
          }

          return this._result;
        };

        return SizeTrackEval;
      }());
    }
  };
});
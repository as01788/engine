System.register("q-bundled:///fs/cocos/core/animation/tracks/untyped-track.js", ["../../data/decorators/index.js", "../../curves/index.js", "../../math/index.js", "../../platform/index.js", "../define.js", "./color-track.js", "./size-track.js", "./track.js", "./vector-track.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, RealCurve, Color, Size, Vec2, Vec3, Vec4, getError, CLASS_NAME_PREFIX_ANIM, createEvalSymbol, ColorTrack, ColorTrackEval, SizeTrackEval, Channel, Track, Vec2TrackEval, Vec3TrackEval, Vec4TrackEval, VectorTrack, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _temp2, UntypedTrackChannel, UntypedTrack;

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
      Color = _mathIndexJs.Color;
      Size = _mathIndexJs.Size;
      Vec2 = _mathIndexJs.Vec2;
      Vec3 = _mathIndexJs.Vec3;
      Vec4 = _mathIndexJs.Vec4;
    }, function (_platformIndexJs) {
      getError = _platformIndexJs.getError;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
      createEvalSymbol = _defineJs.createEvalSymbol;
    }, function (_colorTrackJs) {
      ColorTrack = _colorTrackJs.ColorTrack;
      ColorTrackEval = _colorTrackJs.ColorTrackEval;
    }, function (_sizeTrackJs) {
      SizeTrackEval = _sizeTrackJs.SizeTrackEval;
    }, function (_trackJs) {
      Channel = _trackJs.Channel;
      Track = _trackJs.Track;
    }, function (_vectorTrackJs) {
      Vec2TrackEval = _vectorTrackJs.Vec2TrackEval;
      Vec3TrackEval = _vectorTrackJs.Vec3TrackEval;
      Vec4TrackEval = _vectorTrackJs.Vec4TrackEval;
      VectorTrack = _vectorTrackJs.VectorTrack;
    }],
    execute: function () {
      UntypedTrackChannel = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "UntypedTrackChannel"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Channel) {
        _inheritsLoose(UntypedTrackChannel, _Channel);

        function UntypedTrackChannel() {
          var _this;

          _this = _Channel.call(this, new RealCurve()) || this;

          _initializerDefineProperty(_this, "property", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        return UntypedTrackChannel;
      }(Channel), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "property", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class);

      _export("UntypedTrack", UntypedTrack = (_dec2 = ccclass(CLASS_NAME_PREFIX_ANIM + "UntypedTrack"), _dec2(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function (_Track) {
        _inheritsLoose(UntypedTrack, _Track);

        function UntypedTrack() {
          var _this2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this2 = _Track.call.apply(_Track, [this].concat(args)) || this;

          _initializerDefineProperty(_this2, "_channels", _descriptor2, _assertThisInitialized(_this2));

          return _this2;
        }

        var _proto = UntypedTrack.prototype;

        _proto.channels = function channels() {
          return this._channels;
        };

        _proto[createEvalSymbol] = function (runtimeBinding) {
          var _this3 = this;

          if (!runtimeBinding.getValue) {
            throw new Error(getError(3930));
          }

          var trySearchCurve = function trySearchCurve(property) {
            var _this3$_channels$find;

            return (_this3$_channels$find = _this3._channels.find(function (channel) {
              return channel.property === property;
            })) === null || _this3$_channels$find === void 0 ? void 0 : _this3$_channels$find.curve;
          };

          var value = runtimeBinding.getValue();

          switch (true) {
            default:
              throw new Error(getError(3931));

            case value instanceof Vec2:
              return new Vec2TrackEval(trySearchCurve('x'), trySearchCurve('y'));

            case value instanceof Vec3:
              return new Vec3TrackEval(trySearchCurve('x'), trySearchCurve('y'), trySearchCurve('z'));

            case value instanceof Vec4:
              return new Vec4TrackEval(trySearchCurve('x'), trySearchCurve('y'), trySearchCurve('z'), trySearchCurve('w'));

            case value instanceof Color:
              // TODO: what if x, y, z, w?
              return new ColorTrackEval(trySearchCurve('r'), trySearchCurve('g'), trySearchCurve('b'), trySearchCurve('a'));

            case value instanceof Size:
              return new SizeTrackEval(trySearchCurve('width'), trySearchCurve('height'));
          }
        };

        _proto.addChannel = function addChannel(property) {
          var channel = new UntypedTrackChannel();
          channel.property = property;

          this._channels.push(channel);

          return channel;
        };

        _proto.upgrade = function upgrade(refine) {
          var _this4 = this;

          var trySearchChannel = function trySearchChannel(property, outChannel) {
            var untypedChannel = _this4.channels().find(function (channel) {
              return channel.property === property;
            });

            if (untypedChannel) {
              outChannel.name = untypedChannel.name;
              outChannel.curve.assignSorted(Array.from(untypedChannel.curve.times()), Array.from(untypedChannel.curve.values()));
            }
          };

          var kind = refine(this.path, this.proxy);

          switch (kind) {
            default:
              break;

            case 'vec2':
            case 'vec3':
            case 'vec4':
              {
                var track = new VectorTrack();
                track.path = this.path;
                track.proxy = this.proxy;
                track.componentsCount = kind === 'vec2' ? 2 : kind === 'vec3' ? 3 : 4;

                var _track$channels = track.channels(),
                    x = _track$channels[0],
                    y = _track$channels[1],
                    z = _track$channels[2],
                    w = _track$channels[3];

                switch (kind) {
                  case 'vec4':
                    trySearchChannel('w', w);
                  // fall through

                  case 'vec3':
                    trySearchChannel('z', z);
                  // fall through

                  default:
                  case 'vec2':
                    trySearchChannel('x', x);
                    trySearchChannel('y', y);
                }

                return track;
              }

            case 'color':
              {
                var _track = new ColorTrack();

                var _track$channels2 = _track.channels(),
                    r = _track$channels2[0],
                    g = _track$channels2[1],
                    b = _track$channels2[2],
                    a = _track$channels2[3];

                trySearchChannel('r', r);
                trySearchChannel('g', g);
                trySearchChannel('b', b);
                trySearchChannel('a', a); // TODO: we need float-int conversion if xyzw

                trySearchChannel('x', r);
                trySearchChannel('y', g);
                trySearchChannel('z', b);
                trySearchChannel('w', a);
                return _track;
              }

            case 'size':
              break;
          }

          return null;
        };

        return UntypedTrack;
      }(Track), _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "_channels", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class5)) || _class4));
    }
  };
});
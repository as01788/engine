System.register("q-bundled:///fs/cocos/core/animation/tracks/track.js", ["../../data/decorators/index.js", "../../data/utils/asserts.js", "../../platform/index.js", "../../scene-graph/index.js", "../../utils/js.js", "../define.js", "../target-path.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, uniquelyReferenced, assertIsTrue, errorID, warnID, Node, js, CLASS_NAME_PREFIX_ANIM, createEvalSymbol, ComponentPath, HierarchyPath, isPropertyPath, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _descriptor3, _temp2, _dec3, _class7, _class8, _descriptor4, _temp3, _dec4, _class10, _class11, _descriptor5, _temp4, _dec5, _class13, _class14, _descriptor6, _temp5, normalizedFollowTag, parseTrsPathTag, trackBindingTag, TrackPath, TrackBinding, Track, Channel, SingleChannelTrack, SingleChannelTrackEval;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function isTrsPropertyName(name) {
    return name === 'position' || name === 'rotation' || name === 'scale' || name === 'eulerAngles';
  }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
      uniquelyReferenced = _dataDecoratorsIndexJs.uniquelyReferenced;
    }, function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }, function (_platformIndexJs) {
      errorID = _platformIndexJs.errorID;
      warnID = _platformIndexJs.warnID;
    }, function (_sceneGraphIndexJs) {
      Node = _sceneGraphIndexJs.Node;
    }, function (_utilsJsJs) {
      js = _utilsJsJs.js;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
      createEvalSymbol = _defineJs.createEvalSymbol;
    }, function (_targetPathJs) {
      ComponentPath = _targetPathJs.ComponentPath;
      HierarchyPath = _targetPathJs.HierarchyPath;
      isPropertyPath = _targetPathJs.isPropertyPath;
    }],
    execute: function () {
      normalizedFollowTag = Symbol('NormalizedFollow');
      parseTrsPathTag = Symbol('ConvertAsTrsPath');

      _export("trackBindingTag", trackBindingTag = Symbol('TrackBinding'));

      _export("TrackPath", TrackPath = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "TrackPath"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function TrackPath() {
          _initializerDefineProperty(this, "_paths", _descriptor, this);
        }

        var _proto = TrackPath.prototype;

        _proto.toProperty = function toProperty(name) {
          this._paths.push(name);

          return this;
        };

        _proto.toElement = function toElement(index) {
          this._paths.push(index);

          return this;
        };

        _proto.toHierarchy = function toHierarchy(nodePath) {
          this._paths.push(new HierarchyPath(nodePath));

          return this;
        };

        _proto.toComponent = function toComponent(constructor) {
          var path = new ComponentPath(typeof constructor === 'string' ? constructor : js.getClassName(constructor));

          this._paths.push(path);

          return this;
        }
        /**
         * @internal Reserved for backward compatibility. DO NOT USE IT IN YOUR CODE.
         */
        ;

        _proto.toCustomized = function toCustomized(resolver) {
          this._paths.push(resolver);

          return this;
        };

        _proto.append = function append() {
          var _this$_paths;

          for (var _len = arguments.length, trackPaths = new Array(_len), _key = 0; _key < _len; _key++) {
            trackPaths[_key] = arguments[_key];
          }

          var paths = (_this$_paths = this._paths).concat.apply(_this$_paths, trackPaths.map(function (trackPath) {
            return trackPath._paths;
          }));

          this._paths = paths;
          return this;
        };

        _proto.isPropertyAt = function isPropertyAt(index) {
          return typeof this._paths[index] === 'string';
        };

        _proto.parsePropertyAt = function parsePropertyAt(index) {
          return this._paths[index];
        };

        _proto.isElementAt = function isElementAt(index) {
          return typeof this._paths[index] === 'number';
        };

        _proto.parseElementAt = function parseElementAt(index) {
          return this._paths[index];
        };

        _proto.isHierarchyAt = function isHierarchyAt(index) {
          return this._paths[index] instanceof HierarchyPath;
        };

        _proto.parseHierarchyAt = function parseHierarchyAt(index) {
          assertIsTrue(this.isHierarchyAt(index));
          return this._paths[index].path;
        };

        _proto.isComponentAt = function isComponentAt(index) {
          return this._paths[index] instanceof ComponentPath;
        };

        _proto.parseComponentAt = function parseComponentAt(index) {
          assertIsTrue(this.isComponentAt(index));
          return this._paths[index].component;
        };

        _proto.slice = function slice(beginIndex, endIndex) {
          var trackPath = new TrackPath();
          trackPath._paths = this._paths.slice(beginIndex, endIndex);
          return trackPath;
        };

        _proto.trace = function trace(object, beginIndex, endIndex) {
          var _beginIndex, _endIndex;

          (_beginIndex = beginIndex) !== null && _beginIndex !== void 0 ? _beginIndex : beginIndex = 0;
          (_endIndex = endIndex) !== null && _endIndex !== void 0 ? _endIndex : endIndex = this._paths.length;
          return this[normalizedFollowTag](object, beginIndex, endIndex);
        };

        _proto[parseTrsPathTag] = function () {
          var paths = this._paths;
          var nPaths = paths.length;
          var iPath = 0;
          var nodePath = '';

          for (; iPath < nPaths; ++iPath) {
            var path = paths[iPath];

            if (!(path instanceof HierarchyPath)) {
              break;
            } else if (!path.path) {
              continue;
            } else if (nodePath) {
              nodePath += "/" + path.path;
            } else {
              nodePath = path.path;
            }
          }

          if (iPath === nPaths) {
            return null;
          }

          var prs;

          if (iPath !== nPaths - 1) {
            return null;
          }

          switch (paths[iPath]) {
            case 'position':
            case 'scale':
            case 'rotation':
            case 'eulerAngles':
              prs = paths[iPath];
              break;

            default:
              return null;
          }

          return {
            node: nodePath,
            property: prs
          };
        };

        _proto[normalizedFollowTag] = function (root, beginIndex, endIndex) {
          var paths = this._paths;
          var result = root;

          for (var iPath = beginIndex; iPath < endIndex; ++iPath) {
            var path = paths[iPath];

            if (isPropertyPath(path)) {
              if (!(path in result)) {
                warnID(3929, path);
                return null;
              } else {
                result = result[path];
              }
            } else {
              result = path.get(result);
            }

            if (result === null) {
              break;
            }
          }

          return result;
        };

        _createClass(TrackPath, [{
          key: "length",
          get: function get() {
            return this._paths.length;
          }
        }]);

        return TrackPath;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_paths", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      /**
       * Composite of track path and value proxy.
       * Not exposed to external. If there is any reason it should be exposed,
       * please redesign the public interfaces.
       */


      _export("TrackBinding", TrackBinding = (_dec2 = ccclass(CLASS_NAME_PREFIX_ANIM + "TrackBinding"), _dec2(_class4 = uniquelyReferenced(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function () {
        function TrackBinding() {
          _initializerDefineProperty(this, "path", _descriptor2, this);

          _initializerDefineProperty(this, "proxy", _descriptor3, this);
        }

        var _proto2 = TrackBinding.prototype;

        _proto2.parseTrsPath = function parseTrsPath() {
          if (this.proxy) {
            return null;
          } else {
            return this.path[parseTrsPathTag]();
          }
        };

        _proto2.createRuntimeBinding = function createRuntimeBinding(target, poseOutput, isConstant) {
          var path = this.path,
              proxy = this.proxy;
          var nPaths = path.length;
          var iLastPath = nPaths - 1;

          if (nPaths !== 0 && (path.isPropertyAt(iLastPath) || path.isElementAt(iLastPath)) && !proxy) {
            var lastPropertyKey = path.isPropertyAt(iLastPath) ? path.parsePropertyAt(iLastPath) : path.parseElementAt(iLastPath);
            var resultTarget = path[normalizedFollowTag](target, 0, nPaths - 1);

            if (resultTarget === null) {
              return null;
            }

            if (poseOutput && resultTarget instanceof Node && isTrsPropertyName(lastPropertyKey)) {
              var blendStateWriter = poseOutput.createPoseWriter(resultTarget, lastPropertyKey, isConstant);
              return blendStateWriter;
            }

            return {
              setValue: function setValue(value) {
                resultTarget[lastPropertyKey] = value;
              },
              // eslint-disable-next-line arrow-body-style
              getValue: function getValue() {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return resultTarget[lastPropertyKey];
              }
            };
          } else if (!proxy) {
            errorID(3921);
            return null;
          } else {
            var _resultTarget = path[normalizedFollowTag](target, 0, nPaths);

            if (_resultTarget === null) {
              return null;
            }

            var runtimeProxy = proxy.forTarget(_resultTarget);
            var _binding = {
              setValue: function setValue(value) {
                runtimeProxy.set(value);
              }
            };
            var proxyGet = runtimeProxy.get;

            if (proxyGet) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              _binding.getValue = function () {
                return proxyGet.call(runtimeProxy);
              };
            }

            return _binding;
          }
        };

        return TrackBinding;
      }(), _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "path", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new TrackPath();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "proxy", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class5)) || _class4) || _class4));

      /**
       * A track describes the path of animate a target.
       * It's the basic unit of animation clip.
       */
      _export("Track", Track = (_dec3 = ccclass(CLASS_NAME_PREFIX_ANIM + "Track"), _dec3(_class7 = (_class8 = (_temp3 = /*#__PURE__*/function () {
        function Track() {
          _initializerDefineProperty(this, "_binding", _descriptor4, this);
        }

        var _proto3 = Track.prototype;

        _proto3.channels = function channels() {
          return [];
        };

        _proto3.range = function range() {
          var range = {
            min: Infinity,
            max: -Infinity
          };

          for (var _iterator = _createForOfIteratorHelperLoose(this.channels()), _step; !(_step = _iterator()).done;) {
            var channel = _step.value;
            range.min = Math.min(range.min, channel.curve.rangeMin);
            range.max = Math.max(range.max, channel.curve.rangeMax);
          }

          return range;
        };

        _createClass(Track, [{
          key: "path",
          get: function get() {
            return this._binding.path;
          },
          set: function set(value) {
            this._binding.path = value;
          }
        }, {
          key: "proxy",
          get: function get() {
            return this._binding.proxy;
          },
          set: function set(value) {
            this._binding.proxy = value;
          }
        }, {
          key: trackBindingTag,
          get: function get() {
            return this._binding;
          }
        }]);

        return Track;
      }(), _temp3), (_descriptor4 = _applyDecoratedDescriptor(_class8.prototype, "_binding", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new TrackBinding();
        }
      })), _class8)) || _class7));

      _export("Channel", Channel = (_dec4 = ccclass(CLASS_NAME_PREFIX_ANIM + "Channel"), _dec4(_class10 = (_class11 = (_temp4 = /*#__PURE__*/function () {
        function Channel(curve) {
          this.name = '';

          _initializerDefineProperty(this, "_curve", _descriptor5, this);

          this._curve = curve;
        }
        /**
         * Not used for now.
         */


        _createClass(Channel, [{
          key: "curve",
          get: function get() {
            return this._curve;
          }
        }]);

        return Channel;
      }(), _temp4), (_descriptor5 = _applyDecoratedDescriptor(_class11.prototype, "_curve", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class11)) || _class10));

      _export("SingleChannelTrack", SingleChannelTrack = (_dec5 = ccclass(CLASS_NAME_PREFIX_ANIM + "SingleChannelTrack"), _dec5(_class13 = (_class14 = (_temp5 = /*#__PURE__*/function (_Track) {
        _inheritsLoose(SingleChannelTrack, _Track);

        function SingleChannelTrack() {
          var _this;

          _this = _Track.call(this) || this;

          _initializerDefineProperty(_this, "_channel", _descriptor6, _assertThisInitialized(_this));

          _this._channel = new Channel(_this.createCurve());
          return _this;
        }

        var _proto4 = SingleChannelTrack.prototype;

        _proto4.channels = function channels() {
          return [this._channel];
        };

        _proto4.createCurve = function createCurve() {
          throw new Error("Not impl");
        };

        _proto4[createEvalSymbol] = function (_runtimeBinding) {
          var curve = this._channel.curve;
          return new SingleChannelTrackEval(curve);
        };

        _createClass(SingleChannelTrack, [{
          key: "channel",
          get: function get() {
            return this._channel;
          }
        }]);

        return SingleChannelTrack;
      }(Track), _temp5), (_descriptor6 = _applyDecoratedDescriptor(_class14.prototype, "_channel", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class14)) || _class13));

      SingleChannelTrackEval = /*#__PURE__*/function () {
        function SingleChannelTrackEval(_curve) {
          this._curve = _curve;
        }

        var _proto5 = SingleChannelTrackEval.prototype;

        _proto5.evaluate = function evaluate(time) {
          return this._curve.evaluate(time);
        };

        return SingleChannelTrackEval;
      }();
    }
  };
});
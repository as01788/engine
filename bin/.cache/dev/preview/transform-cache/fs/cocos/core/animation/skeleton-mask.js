System.register("q-bundled:///fs/cocos/core/animation/skeleton-mask.js", ["../data/decorators/index.js", "../assets/asset.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, Asset, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _descriptor3, _temp2, SkeletonMask, JointMask;

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
    }, function (_assetsAssetJs) {
      Asset = _assetsAssetJs.Asset;
    }],
    execute: function () {
      _export("SkeletonMask", SkeletonMask = (_dec = ccclass('cc.SkeletonMask'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(SkeletonMask, _Asset);

        function SkeletonMask() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_jointMasks", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        _createClass(SkeletonMask, [{
          key: "joints",
          get: function get() {
            return this._jointMasks;
          },
          set: function set(value) {
            this._jointMasks = Array.from(value, function (_ref) {
              var path = _ref.path,
                  enabled = _ref.enabled;
              var jointMask = new JointMask();
              jointMask.path = path;
              jointMask.enabled = enabled;
              return jointMask;
            });
          }
        }]);

        return SkeletonMask;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_jointMasks", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      JointMask = (_dec2 = ccclass('cc.JointMask'), _dec2(_class4 = (_class5 = (_temp2 = function JointMask() {
        _initializerDefineProperty(this, "path", _descriptor2, this);

        _initializerDefineProperty(this, "enabled", _descriptor3, this);
      }, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "path", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "enabled", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class5)) || _class4);
    }
  };
});
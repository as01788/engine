System.register("q-bundled:///fs/cocos/particle/animator/size-overtime.js", ["../../core/data/decorators/index.js", "../../core/math/index.js", "../particle.js", "./curve-range.js", "../enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, tooltip, displayOrder, type, serializable, range, pseudoRandom, Vec3, ParticleModuleBase, PARTICLE_MODULE_NAME, CurveRange, ModuleRandSeed, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, SIZE_OVERTIME_RAND_OFFSET, SizeOvertimeModule;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      range = _coreDataDecoratorsIndexJs.range;
    }, function (_coreMathIndexJs) {
      pseudoRandom = _coreMathIndexJs.pseudoRandom;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_particleJs) {
      ParticleModuleBase = _particleJs.ParticleModuleBase;
      PARTICLE_MODULE_NAME = _particleJs.PARTICLE_MODULE_NAME;
    }, function (_curveRangeJs) {
      CurveRange = _curveRangeJs.default;
    }, function (_enumJs) {
      ModuleRandSeed = _enumJs.ModuleRandSeed;
    }],
    execute: function () {
      SIZE_OVERTIME_RAND_OFFSET = ModuleRandSeed.SIZE;

      _export("default", SizeOvertimeModule = (_dec = ccclass('cc.SizeOvertimeModule'), _dec2 = displayOrder(0), _dec3 = displayOrder(1), _dec4 = tooltip('i18n:sizeOvertimeModule.separateAxes'), _dec5 = type(CurveRange), _dec6 = range([0, 1]), _dec7 = displayOrder(2), _dec8 = tooltip('i18n:sizeOvertimeModule.size'), _dec9 = type(CurveRange), _dec10 = range([0, 1]), _dec11 = displayOrder(3), _dec12 = tooltip('i18n:sizeOvertimeModule.x'), _dec13 = type(CurveRange), _dec14 = range([0, 1]), _dec15 = displayOrder(4), _dec16 = tooltip('i18n:sizeOvertimeModule.y'), _dec17 = type(CurveRange), _dec18 = range([0, 1]), _dec19 = displayOrder(5), _dec20 = tooltip('i18n:sizeOvertimeModule.z'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_ParticleModuleBase) {
        _inheritsLoose(SizeOvertimeModule, _ParticleModuleBase);

        function SizeOvertimeModule() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ParticleModuleBase.call.apply(_ParticleModuleBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_enable", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "separateAxes", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "size", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "x", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "y", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "z", _descriptor6, _assertThisInitialized(_this));

          _this.name = PARTICLE_MODULE_NAME.SIZE;
          return _this;
        }

        var _proto = SizeOvertimeModule.prototype;

        _proto.animate = function animate(particle, dt) {
          if (!this.separateAxes) {
            Vec3.multiplyScalar(particle.size, particle.startSize, this.size.evaluate(1 - particle.remainingLifetime / particle.startLifetime, pseudoRandom(particle.randomSeed + SIZE_OVERTIME_RAND_OFFSET)));
          } else {
            var currLifetime = 1 - particle.remainingLifetime / particle.startLifetime;
            var sizeRand = pseudoRandom(particle.randomSeed + SIZE_OVERTIME_RAND_OFFSET);
            particle.size.x = particle.startSize.x * this.x.evaluate(currLifetime, sizeRand);
            particle.size.y = particle.startSize.y * this.y.evaluate(currLifetime, sizeRand);
            particle.size.z = particle.startSize.z * this.z.evaluate(currLifetime, sizeRand);
          }
        };

        _createClass(SizeOvertimeModule, [{
          key: "enable",
          get:
          /**
           * @zh 是否启用。
           */
          function get() {
            return this._enable;
          },
          set: function set(val) {
            if (this._enable === val) return;
            this._enable = val;
            if (!this.target) return;
            this.target.enableModule(this.name, val, this);
          }
          /**
           * @zh 决定是否在每个轴上独立控制粒子大小。
           */

        }]);

        return SizeOvertimeModule;
      }(ParticleModuleBase), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "separateAxes", [serializable, _dec3, _dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec5, serializable, _dec6, _dec7, _dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec9, serializable, _dec10, _dec11, _dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec13, serializable, _dec14, _dec15, _dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "z", [_dec17, serializable, _dec18, _dec19, _dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      })), _class2)) || _class));
    }
  };
});
System.register("q-bundled:///fs/cocos/particle/particle-system.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../core/components/renderable-component.js", "../core/assets/material.js", "../core/math/index.js", "../core/math/bits.js", "./animator/color-overtime.js", "./animator/curve-range.js", "./animator/force-overtime.js", "./animator/gradient-range.js", "./animator/limit-velocity-overtime.js", "./animator/rotation-overtime.js", "./animator/size-overtime.js", "./animator/texture-animation.js", "./animator/velocity-overtime.js", "./burst.js", "./emitter/shape-module.js", "./enum.js", "./particle-general-function.js", "./renderer/particle-system-renderer-data.js", "./renderer/trail.js", "./particle.js", "../core/global-exports.js", "../core/scene-graph/node-enum.js", "../core/geometry/index.js", "./particle-culler.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, executionOrder, menu, tooltip, displayOrder, type, range, displayName, formerlySerializedAs, override, radian, serializable, visible, EDITOR, RenderableComponent, Material, Mat4, pseudoRandom, Quat, randomRangeInt, Vec2, Vec3, INT_MAX, ColorOverLifetimeModule, CurveRange, Mode, ForceOvertimeModule, GradientRange, LimitVelocityOvertimeModule, RotationOvertimeModule, SizeOvertimeModule, TextureAnimationModule, VelocityOvertimeModule, Burst, ShapeModule, CullingMode, Space, particleEmitZAxis, ParticleSystemRenderer, TrailModule, PARTICLE_MODULE_PROPERTY, legacyCC, TransformBit, AABB, intersect, ParticleCuller, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _dec115, _dec116, _dec117, _dec118, _dec119, _dec120, _dec121, _dec122, _dec123, _dec124, _dec125, _dec126, _dec127, _dec128, _dec129, _dec130, _dec131, _dec132, _dec133, _dec134, _dec135, _dec136, _dec137, _dec138, _dec139, _dec140, _dec141, _dec142, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _descriptor39, _descriptor40, _class3, _temp, _world_mat, _world_rol, superMaterials, ParticleSystem;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      range = _coreDataDecoratorsIndexJs.range;
      displayName = _coreDataDecoratorsIndexJs.displayName;
      formerlySerializedAs = _coreDataDecoratorsIndexJs.formerlySerializedAs;
      override = _coreDataDecoratorsIndexJs.override;
      radian = _coreDataDecoratorsIndexJs.radian;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      visible = _coreDataDecoratorsIndexJs.visible;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreComponentsRenderableComponentJs) {
      RenderableComponent = _coreComponentsRenderableComponentJs.RenderableComponent;
    }, function (_coreAssetsMaterialJs) {
      Material = _coreAssetsMaterialJs.Material;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      pseudoRandom = _coreMathIndexJs.pseudoRandom;
      Quat = _coreMathIndexJs.Quat;
      randomRangeInt = _coreMathIndexJs.randomRangeInt;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreMathBitsJs) {
      INT_MAX = _coreMathBitsJs.INT_MAX;
    }, function (_animatorColorOvertimeJs) {
      ColorOverLifetimeModule = _animatorColorOvertimeJs.default;
    }, function (_animatorCurveRangeJs) {
      CurveRange = _animatorCurveRangeJs.default;
      Mode = _animatorCurveRangeJs.Mode;
    }, function (_animatorForceOvertimeJs) {
      ForceOvertimeModule = _animatorForceOvertimeJs.default;
    }, function (_animatorGradientRangeJs) {
      GradientRange = _animatorGradientRangeJs.default;
    }, function (_animatorLimitVelocityOvertimeJs) {
      LimitVelocityOvertimeModule = _animatorLimitVelocityOvertimeJs.default;
    }, function (_animatorRotationOvertimeJs) {
      RotationOvertimeModule = _animatorRotationOvertimeJs.default;
    }, function (_animatorSizeOvertimeJs) {
      SizeOvertimeModule = _animatorSizeOvertimeJs.default;
    }, function (_animatorTextureAnimationJs) {
      TextureAnimationModule = _animatorTextureAnimationJs.default;
    }, function (_animatorVelocityOvertimeJs) {
      VelocityOvertimeModule = _animatorVelocityOvertimeJs.default;
    }, function (_burstJs) {
      Burst = _burstJs.default;
    }, function (_emitterShapeModuleJs) {
      ShapeModule = _emitterShapeModuleJs.default;
    }, function (_enumJs) {
      CullingMode = _enumJs.CullingMode;
      Space = _enumJs.Space;
    }, function (_particleGeneralFunctionJs) {
      particleEmitZAxis = _particleGeneralFunctionJs.particleEmitZAxis;
    }, function (_rendererParticleSystemRendererDataJs) {
      ParticleSystemRenderer = _rendererParticleSystemRendererDataJs.default;
    }, function (_rendererTrailJs) {
      TrailModule = _rendererTrailJs.default;
    }, function (_particleJs) {
      PARTICLE_MODULE_PROPERTY = _particleJs.PARTICLE_MODULE_PROPERTY;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreSceneGraphNodeEnumJs) {
      TransformBit = _coreSceneGraphNodeEnumJs.TransformBit;
    }, function (_coreGeometryIndexJs) {
      AABB = _coreGeometryIndexJs.AABB;
      intersect = _coreGeometryIndexJs.intersect;
    }, function (_particleCullerJs) {
      ParticleCuller = _particleCullerJs.ParticleCuller;
    }],
    execute: function () {
      _world_mat = new Mat4();
      _world_rol = new Quat();
      superMaterials = Object.getOwnPropertyDescriptor(RenderableComponent.prototype, 'sharedMaterials');

      _export("ParticleSystem", ParticleSystem = (_dec = ccclass('cc.ParticleSystem'), _dec2 = help('i18n:cc.ParticleSystem'), _dec3 = menu('Effects/ParticleSystem'), _dec4 = executionOrder(99), _dec5 = displayOrder(1), _dec6 = tooltip('i18n:particle_system.capacity'), _dec7 = type(GradientRange), _dec8 = displayOrder(8), _dec9 = tooltip('i18n:particle_system.startColor'), _dec10 = type(Space), _dec11 = displayOrder(9), _dec12 = tooltip('i18n:particle_system.scaleSpace'), _dec13 = displayOrder(10), _dec14 = tooltip('i18n:particle_system.startSize3D'), _dec15 = formerlySerializedAs('startSize'), _dec16 = range([0, 1]), _dec17 = type(CurveRange), _dec18 = displayOrder(10), _dec19 = tooltip('i18n:particle_system.startSizeX'), _dec20 = type(CurveRange), _dec21 = range([0, 1]), _dec22 = displayOrder(10), _dec23 = tooltip('i18n:particle_system.startSizeY'), _dec24 = type(CurveRange), _dec25 = range([0, 1]), _dec26 = displayOrder(10), _dec27 = tooltip('i18n:particle_system.startSizeZ'), _dec28 = type(CurveRange), _dec29 = range([-1, 1]), _dec30 = displayOrder(11), _dec31 = tooltip('i18n:particle_system.startSpeed'), _dec32 = displayOrder(12), _dec33 = tooltip('i18n:particle_system.startRotation3D'), _dec34 = type(CurveRange), _dec35 = range([-1, 1]), _dec36 = displayOrder(12), _dec37 = tooltip('i18n:particle_system.startRotationX'), _dec38 = type(CurveRange), _dec39 = range([-1, 1]), _dec40 = displayOrder(12), _dec41 = tooltip('i18n:particle_system.startRotationY'), _dec42 = type(CurveRange), _dec43 = formerlySerializedAs('startRotation'), _dec44 = range([-1, 1]), _dec45 = displayOrder(12), _dec46 = tooltip('i18n:particle_system.startRotationZ'), _dec47 = type(CurveRange), _dec48 = range([0, 1]), _dec49 = displayOrder(6), _dec50 = tooltip('i18n:particle_system.startDelay'), _dec51 = type(CurveRange), _dec52 = range([0, 1]), _dec53 = displayOrder(7), _dec54 = tooltip('i18n:particle_system.startLifetime'), _dec55 = displayOrder(0), _dec56 = tooltip('i18n:particle_system.duration'), _dec57 = displayOrder(2), _dec58 = tooltip('i18n:particle_system.loop'), _dec59 = displayOrder(3), _dec60 = tooltip('i18n:particle_system.prewarm'), _dec61 = type(Space), _dec62 = displayOrder(4), _dec63 = tooltip('i18n:particle_system.simulationSpace'), _dec64 = displayOrder(5), _dec65 = tooltip('i18n:particle_system.simulationSpeed'), _dec66 = displayOrder(2), _dec67 = tooltip('i18n:particle_system.playOnAwake'), _dec68 = type(CurveRange), _dec69 = range([-1, 1]), _dec70 = displayOrder(13), _dec71 = tooltip('i18n:particle_system.gravityModifier'), _dec72 = type(CurveRange), _dec73 = range([0, 1]), _dec74 = displayOrder(14), _dec75 = tooltip('i18n:particle_system.rateOverTime'), _dec76 = type(CurveRange), _dec77 = range([0, 1]), _dec78 = displayOrder(15), _dec79 = tooltip('i18n:particle_system.rateOverDistance'), _dec80 = type([Burst]), _dec81 = displayOrder(16), _dec82 = tooltip('i18n:particle_system.bursts'), _dec83 = type(Boolean), _dec84 = displayOrder(27), _dec85 = tooltip('i18n:particle_system.renderCulling'), _dec86 = type(CullingMode), _dec87 = displayOrder(17), _dec88 = tooltip('i18n:particle_system.cullingMode'), _dec89 = type(Number), _dec90 = displayOrder(17), _dec91 = tooltip('i18n:particle_system.aabbHalfX'), _dec92 = type(Number), _dec93 = displayOrder(17), _dec94 = tooltip('i18n:particle_system.aabbHalfY'), _dec95 = type(Number), _dec96 = displayOrder(17), _dec97 = tooltip('i18n:particle_system.aabbHalfZ'), _dec98 = displayOrder(28), _dec99 = tooltip('i18n:particle_system.dataCulling'), _dec100 = formerlySerializedAs('enableCulling'), _dec101 = visible(false), _dec102 = type(Material), _dec103 = displayName('Materials'), _dec104 = type(ColorOverLifetimeModule), _dec105 = type(ColorOverLifetimeModule), _dec106 = displayOrder(23), _dec107 = tooltip('i18n:particle_system.colorOverLifetimeModule'), _dec108 = type(ShapeModule), _dec109 = type(ShapeModule), _dec110 = displayOrder(17), _dec111 = tooltip('i18n:particle_system.shapeModule'), _dec112 = type(SizeOvertimeModule), _dec113 = type(SizeOvertimeModule), _dec114 = displayOrder(21), _dec115 = tooltip('i18n:particle_system.sizeOvertimeModule'), _dec116 = type(VelocityOvertimeModule), _dec117 = type(VelocityOvertimeModule), _dec118 = displayOrder(18), _dec119 = tooltip('i18n:particle_system.velocityOvertimeModule'), _dec120 = type(ForceOvertimeModule), _dec121 = type(ForceOvertimeModule), _dec122 = displayOrder(19), _dec123 = tooltip('i18n:particle_system.forceOvertimeModule'), _dec124 = type(LimitVelocityOvertimeModule), _dec125 = type(LimitVelocityOvertimeModule), _dec126 = displayOrder(20), _dec127 = tooltip('i18n:particle_system.limitVelocityOvertimeModule'), _dec128 = type(RotationOvertimeModule), _dec129 = type(RotationOvertimeModule), _dec130 = displayOrder(22), _dec131 = tooltip('i18n:particle_system.rotationOvertimeModule'), _dec132 = type(TextureAnimationModule), _dec133 = type(TextureAnimationModule), _dec134 = displayOrder(24), _dec135 = tooltip('i18n:particle_system.textureAnimationModule'), _dec136 = type(TrailModule), _dec137 = type(TrailModule), _dec138 = displayOrder(25), _dec139 = tooltip('i18n:particle_system.trailModule'), _dec140 = type(ParticleSystemRenderer), _dec141 = displayOrder(26), _dec142 = tooltip('i18n:particle_system.renderer'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_RenderableComponent) {
        _inheritsLoose(ParticleSystem, _RenderableComponent);

        function ParticleSystem() {
          var _this;

          _this = _RenderableComponent.call(this) || this;

          _initializerDefineProperty(_this, "startColor", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scaleSpace", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSize3D", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSizeX", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSizeY", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSizeZ", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startSpeed", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startRotation3D", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startRotationX", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startRotationY", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startRotationZ", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startDelay", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "startLifetime", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "duration", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "loop", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "simulationSpeed", _descriptor16, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playOnAwake", _descriptor17, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gravityModifier", _descriptor18, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rateOverTime", _descriptor19, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rateOverDistance", _descriptor20, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bursts", _descriptor21, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_renderCulling", _descriptor22, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_cullingMode", _descriptor23, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_aabbHalfX", _descriptor24, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_aabbHalfY", _descriptor25, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_aabbHalfZ", _descriptor26, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_dataCulling", _descriptor27, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_colorOverLifetimeModule", _descriptor28, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_shapeModule", _descriptor29, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_sizeOvertimeModule", _descriptor30, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_velocityOvertimeModule", _descriptor31, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_forceOvertimeModule", _descriptor32, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_limitVelocityOvertimeModule", _descriptor33, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_rotationOvertimeModule", _descriptor34, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_textureAnimationModule", _descriptor35, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_trailModule", _descriptor36, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "renderer", _descriptor37, _assertThisInitialized(_this));

          _this._isPlaying = void 0;
          _this._isPaused = void 0;
          _this._isStopped = void 0;
          _this._isEmitting = void 0;
          _this._needRefresh = void 0;
          _this._time = void 0;
          _this._emitRateTimeCounter = void 0;
          _this._emitRateDistanceCounter = void 0;
          _this._oldWPos = void 0;
          _this._curWPos = void 0;
          _this._boundingBox = void 0;
          _this._culler = void 0;
          _this._oldPos = void 0;
          _this._curPos = void 0;
          _this._isCulled = void 0;
          _this._customData1 = void 0;
          _this._customData2 = void 0;
          _this._subEmitters = void 0;

          _initializerDefineProperty(_this, "_prewarm", _descriptor38, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_capacity", _descriptor39, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_simulationSpace", _descriptor40, _assertThisInitialized(_this));

          _this.processor = null;
          _this.rateOverTime.constant = 10;
          _this.startLifetime.constant = 5;
          _this.startSizeX.constant = 1;
          _this.startSpeed.constant = 5; // internal status

          _this._isPlaying = false;
          _this._isPaused = false;
          _this._isStopped = true;
          _this._isEmitting = false;
          _this._needRefresh = true;
          _this._time = 0.0; // playback position in seconds.

          _this._emitRateTimeCounter = 0.0;
          _this._emitRateDistanceCounter = 0.0;
          _this._oldWPos = new Vec3();
          _this._curWPos = new Vec3();
          _this._boundingBox = null;
          _this._culler = null;
          _this._oldPos = null;
          _this._curPos = null;
          _this._isCulled = false;
          _this._customData1 = new Vec2();
          _this._customData2 = new Vec2();
          _this._subEmitters = []; // array of { emitter: ParticleSystem, type: 'birth', 'collision' or 'death'}

          return _this;
        }

        var _proto = ParticleSystem.prototype;

        _proto.onFocusInEditor = function onFocusInEditor() {
          this.renderer.create(this);
        };

        _proto.onLoad = function onLoad() {
          // HACK, TODO
          this.renderer.onInit(this);
          if (this._shapeModule) this._shapeModule.onInit(this);
          if (this._trailModule) this._trailModule.onInit(this);
          this.bindModule();

          this._resetPosition(); // this._system.add(this);

        };

        _proto._onMaterialModified = function _onMaterialModified(index, material) {
          if (this.processor !== null) {
            this.processor.onMaterialModified(index, material);
          }
        };

        _proto._onRebuildPSO = function _onRebuildPSO(index, material) {
          this.processor.onRebuildPSO(index, material);
        };

        _proto._collectModels = function _collectModels() {
          this._models.length = 0;

          this._models.push(this.processor._model);

          if (this._trailModule && this._trailModule.enable && this._trailModule._trailModel) {
            this._models.push(this._trailModule._trailModel);
          }

          return this._models;
        };

        _proto._attachToScene = function _attachToScene() {
          this.processor.attachToScene();

          if (this._trailModule && this._trailModule.enable) {
            this._trailModule._attachToScene();
          }
        };

        _proto._detachFromScene = function _detachFromScene() {
          this.processor.detachFromScene();

          if (this._trailModule && this._trailModule.enable) {
            this._trailModule._detachFromScene();
          }

          if (this._boundingBox) {
            this._boundingBox = null;
          }

          if (this._culler) {
            this._culler.clear();

            this._culler.destroy();

            this._culler = null;
          }
        };

        _proto.bindModule = function bindModule() {
          if (this._colorOverLifetimeModule) this._colorOverLifetimeModule.bindTarget(this.processor);
          if (this._sizeOvertimeModule) this._sizeOvertimeModule.bindTarget(this.processor);
          if (this._rotationOvertimeModule) this._rotationOvertimeModule.bindTarget(this.processor);
          if (this._forceOvertimeModule) this._forceOvertimeModule.bindTarget(this.processor);
          if (this._limitVelocityOvertimeModule) this._limitVelocityOvertimeModule.bindTarget(this.processor);
          if (this._velocityOvertimeModule) this._velocityOvertimeModule.bindTarget(this.processor);
          if (this._textureAnimationModule) this._textureAnimationModule.bindTarget(this.processor);
        } // TODO: Fast forward current particle system by simulating particles over given period of time, then pause it.
        // simulate(time, withChildren, restart, fixedTimeStep) {
        // }

        /**
         * 播放粒子效果。
         */
        ;

        _proto.play = function play() {
          if (this._isPaused) {
            this._isPaused = false;
          }

          if (this._isStopped) {
            this._isStopped = false;
          }

          this._isPlaying = true;
          this._isEmitting = true;

          this._resetPosition(); // prewarm


          if (this._prewarm) {
            this._prewarmSystem();
          }

          if (this._trailModule) {
            this._trailModule.play();
          }
        }
        /**
         * 暂停播放粒子效果。
         */
        ;

        _proto.pause = function pause() {
          if (this._isStopped) {
            console.warn('pause(): particle system is already stopped.');
            return;
          }

          if (this._isPlaying) {
            this._isPlaying = false;
          }

          this._isPaused = true;
        }
        /**
         * 停止播放粒子。
         */
        ;

        _proto.stop = function stop() {
          if (this._isPlaying || this._isPaused) {
            this.clear();
          }

          if (this._isPlaying) {
            this._isPlaying = false;
          }

          if (this._isPaused) {
            this._isPaused = false;
          }

          this._time = 0.0;
          this._emitRateTimeCounter = 0.0;
          this._emitRateDistanceCounter = 0.0;
          this._isStopped = true; // if stop emit modify the refresh flag to true

          this._needRefresh = true;
        } // remove all particles from current particle system.

        /**
         * 将所有粒子从粒子系统中清除。
         */
        ;

        _proto.clear = function clear() {
          if (this.enabledInHierarchy) {
            this.processor.clear();
            if (this._trailModule) this._trailModule.clear();
          }

          this._calculateBounding(true);
        }
        /**
         * @zh 获取当前粒子数量
         */
        ;

        _proto.getParticleCount = function getParticleCount() {
          return this.processor.getParticleCount();
        }
        /**
         * @ignore
         */
        ;

        _proto.setCustomData1 = function setCustomData1(x, y) {
          Vec2.set(this._customData1, x, y);
        };

        _proto.setCustomData2 = function setCustomData2(x, y) {
          Vec2.set(this._customData2, x, y);
        };

        _proto.onDestroy = function onDestroy() {
          legacyCC.director.off(legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this); // this._system.remove(this);

          this.processor.onDestroy();
          if (this._trailModule) this._trailModule.destroy();

          if (this._culler) {
            this._culler.clear();

            this._culler.destroy();

            this._culler = null;
          }
        };

        _proto.onEnable = function onEnable() {
          legacyCC.director.on(legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this);

          if (this.playOnAwake) {
            this.play();
          }

          this.processor.onEnable();
          if (this._trailModule) this._trailModule.onEnable();
        };

        _proto.onDisable = function onDisable() {
          legacyCC.director.off(legacyCC.Director.EVENT_BEFORE_COMMIT, this.beforeRender, this);
          this.processor.onDisable();
          if (this._trailModule) this._trailModule.onDisable();

          if (this._boundingBox) {
            this._boundingBox = null;
          }

          if (this._culler) {
            this._culler.clear();

            this._culler.destroy();

            this._culler = null;
          }
        };

        _proto._calculateBounding = function _calculateBounding(forceRefresh) {
          if (this._boundingBox) {
            if (!this._culler) {
              this._culler = new ParticleCuller(this);
            }

            this._culler.calculatePositions();

            AABB.fromPoints(this._boundingBox, this._culler.minPos, this._culler.maxPos);

            if (forceRefresh) {
              this.aabbHalfX = this._boundingBox.halfExtents.x;
              this.aabbHalfY = this._boundingBox.halfExtents.y;
              this.aabbHalfZ = this._boundingBox.halfExtents.z;
            } else {
              if (this.aabbHalfX) {
                this.setBoundingX(this.aabbHalfX);
              } else {
                this.aabbHalfX = this._boundingBox.halfExtents.x;
              }

              if (this.aabbHalfY) {
                this.setBoundingY(this.aabbHalfY);
              } else {
                this.aabbHalfY = this._boundingBox.halfExtents.y;
              }

              if (this.aabbHalfZ) {
                this.setBoundingZ(this.aabbHalfZ);
              } else {
                this.aabbHalfZ = this._boundingBox.halfExtents.z;
              }
            }

            this._culler.clear();
          }
        };

        _proto.update = function update(dt) {
          var scaledDeltaTime = dt * this.simulationSpeed;

          if (this.renderCulling) {
            var _this$node$scene$rend;

            if (!this._boundingBox) {
              this._boundingBox = new AABB();

              this._calculateBounding(false);
            }

            if (!this._curPos) {
              this._curPos = new Vec3();
            }

            this.node.getWorldPosition(this._curPos);

            if (!this._oldPos) {
              this._oldPos = new Vec3();

              this._oldPos.set(this._curPos);
            }

            if (!this._curPos.equals(this._oldPos) && this._boundingBox && this._culler) {
              var dx = this._curPos.x - this._oldPos.x;
              var dy = this._curPos.y - this._oldPos.y;
              var dz = this._curPos.z - this._oldPos.z;
              var center = this._boundingBox.center;
              center.x += dx;
              center.y += dy;
              center.z += dz;

              this._culler.setBoundingBoxCenter(center.x, center.y, center.z);

              this._oldPos.set(this._curPos);
            }

            var cameraLst = (_this$node$scene$rend = this.node.scene.renderScene) === null || _this$node$scene$rend === void 0 ? void 0 : _this$node$scene$rend.cameras;
            var culled = true;

            if (cameraLst !== undefined && this._boundingBox) {
              for (var i = 0; i < cameraLst.length; ++i) {
                var camera = cameraLst[i];
                var visibility = camera.visibility;

                if ((visibility & this.node.layer) === this.node.layer) {
                  if (EDITOR) {
                    if (camera.name === 'Editor Camera' && intersect.aabbFrustum(this._boundingBox, camera.frustum)) {
                      culled = false;
                      break;
                    }
                  } else if (intersect.aabbFrustum(this._boundingBox, camera.frustum)) {
                    culled = false;
                    break;
                  }
                }
              }
            }

            if (culled) {
              if (this._cullingMode !== CullingMode.AlwaysSimulate) {
                this.pause();
              }

              if (!this._isCulled) {
                this.processor.detachFromScene();
                this._isCulled = true;
              }

              if (this._trailModule && this._trailModule.enable) {
                this._trailModule._detachFromScene();
              }

              if (this._cullingMode === CullingMode.PauseAndCatchup) {
                this._time += scaledDeltaTime;
              }

              if (this._cullingMode !== CullingMode.AlwaysSimulate) {
                return;
              }
            } else {
              if (this._isCulled) {
                this._attachToScene();

                this._isCulled = false;
              }

              if (!this._isPlaying) {
                this.play();
              }
            }
          } else {
            if (this._boundingBox) {
              this._boundingBox = null;
            }

            if (this._culler) {
              this._culler.clear();

              this._culler.destroy();

              this._culler = null;
            }
          }

          if (this._isPlaying) {
            this._time += scaledDeltaTime; // Execute emission

            this._emit(scaledDeltaTime); // simulation, update particles.


            if (this.processor.updateParticles(scaledDeltaTime) === 0 && !this._isEmitting) {
              this.stop();
            }
          } else {
            this.processor.updateRotation();
            this.processor.updateScale();
          } // update render data


          this.processor.updateRenderData(); // update trail

          if (this._trailModule && this._trailModule.enable) {
            this._trailModule.updateRenderData();
          }
        };

        _proto.beforeRender = function beforeRender() {
          if (!this._isPlaying) return;
          this.processor.beforeRender();

          if (this._trailModule && this._trailModule.enable) {
            this._trailModule.beforeRender();
          }
        };

        _proto._onVisibilityChange = function _onVisibilityChange(val) {
          // @ts-expect-error private property access
          if (this.processor._model) {
            // @ts-expect-error private property access
            this.processor._model.visFlags = val;
          }
        };

        _proto.emit = function emit(count, dt) {
          var loopDelta = this._time % this.duration / this.duration; // loop delta value
          // refresh particle node position to update emit position

          if (this._needRefresh) {
            // this.node.setPosition(this.node.getPosition());
            this.node.invalidateChildren(TransformBit.POSITION);
            this._needRefresh = false;
          }

          if (this._simulationSpace === Space.World) {
            this.node.getWorldMatrix(_world_mat);
            this.node.getWorldRotation(_world_rol);
          }

          for (var i = 0; i < count; ++i) {
            var particle = this.processor.getFreeParticle();

            if (particle === null) {
              return;
            }

            particle.particleSystem = this;
            particle.reset();
            var rand = pseudoRandom(randomRangeInt(0, INT_MAX));

            if (this._shapeModule && this._shapeModule.enable) {
              this._shapeModule.emit(particle);
            } else {
              Vec3.set(particle.position, 0, 0, 0);
              Vec3.copy(particle.velocity, particleEmitZAxis);
            }

            if (this._textureAnimationModule && this._textureAnimationModule.enable) {
              this._textureAnimationModule.init(particle);
            }

            var curveStartSpeed = this.startSpeed.evaluate(loopDelta, rand);
            Vec3.multiplyScalar(particle.velocity, particle.velocity, curveStartSpeed);

            if (this._simulationSpace === Space.World) {
              Vec3.transformMat4(particle.position, particle.position, _world_mat);
              Vec3.transformQuat(particle.velocity, particle.velocity, _world_rol);
            }

            Vec3.copy(particle.ultimateVelocity, particle.velocity); // apply startRotation.

            if (this.startRotation3D) {
              // eslint-disable-next-line max-len
              particle.startEuler.set(this.startRotationX.evaluate(loopDelta, rand), this.startRotationY.evaluate(loopDelta, rand), this.startRotationZ.evaluate(loopDelta, rand));
            } else {
              particle.startEuler.set(0, 0, this.startRotationZ.evaluate(loopDelta, rand));
            }

            Vec3.set(particle.rotation, particle.startEuler.x, particle.startEuler.y, particle.startEuler.z); // apply startSize.

            if (this.startSize3D) {
              Vec3.set(particle.startSize, this.startSizeX.evaluate(loopDelta, rand), this.startSizeY.evaluate(loopDelta, rand), this.startSizeZ.evaluate(loopDelta, rand));
            } else {
              Vec3.set(particle.startSize, this.startSizeX.evaluate(loopDelta, rand), 1, 1);
              particle.startSize.y = particle.startSize.x;
            }

            Vec3.copy(particle.size, particle.startSize); // apply startColor.

            particle.startColor.set(this.startColor.evaluate(loopDelta, rand));
            particle.color.set(particle.startColor); // apply startLifetime.

            particle.startLifetime = this.startLifetime.evaluate(loopDelta, rand) + dt;
            particle.remainingLifetime = particle.startLifetime;
            particle.randomSeed = randomRangeInt(0, 233280);
            particle.loopCount++;
            this.processor.setNewParticle(particle);
          } // end of particles forLoop.

        } // initialize particle system as though it had already completed a full cycle.
        ;

        _proto._prewarmSystem = function _prewarmSystem() {
          this.startDelay.mode = Mode.Constant; // clear startDelay.

          this.startDelay.constant = 0;
          var dt = 1.0; // should use varying value?

          var cnt = this.duration / dt;

          for (var i = 0; i < cnt; ++i) {
            this._time += dt;

            this._emit(dt);

            this.processor.updateParticles(dt);
          }
        } // internal function
        ;

        _proto._emit = function _emit(dt) {
          // emit particles.
          var startDelay = this.startDelay.evaluate(0, 1);

          if (this._time > startDelay) {
            if (this._time > this.duration + startDelay) {
              // this._time = startDelay; // delay will not be applied from the second loop.(Unity)
              // this._emitRateTimeCounter = 0.0;
              // this._emitRateDistanceCounter = 0.0;
              if (!this.loop) {
                this._isEmitting = false;
                return;
              }
            } // emit by rateOverTime


            this._emitRateTimeCounter += this.rateOverTime.evaluate(this._time / this.duration, 1) * dt;

            if (this._emitRateTimeCounter > 1 && this._isEmitting) {
              var emitNum = Math.floor(this._emitRateTimeCounter);
              this._emitRateTimeCounter -= emitNum;
              this.emit(emitNum, dt);
            } // emit by rateOverDistance


            this.node.getWorldPosition(this._curWPos);
            var distance = Vec3.distance(this._curWPos, this._oldWPos);
            Vec3.copy(this._oldWPos, this._curWPos);
            this._emitRateDistanceCounter += distance * this.rateOverDistance.evaluate(this._time / this.duration, 1);

            if (this._emitRateDistanceCounter > 1 && this._isEmitting) {
              var _emitNum = Math.floor(this._emitRateDistanceCounter);

              this._emitRateDistanceCounter -= _emitNum;
              this.emit(_emitNum, dt);
            } // bursts


            for (var _iterator = _createForOfIteratorHelperLoose(this.bursts), _step; !(_step = _iterator()).done;) {
              var burst = _step.value;
              burst.update(this, dt);
            }
          }
        };

        _proto._resetPosition = function _resetPosition() {
          this.node.getWorldPosition(this._oldWPos);
          Vec3.copy(this._curWPos, this._oldWPos);
        };

        _proto.addSubEmitter = function addSubEmitter(subEmitter) {
          this._subEmitters.push(subEmitter);
        };

        _proto.removeSubEmitter = function removeSubEmitter(idx) {
          this._subEmitters.splice(this._subEmitters.indexOf(idx), 1);
        };

        _proto.addBurst = function addBurst(burst) {
          this.bursts.push(burst);
        };

        _proto.removeBurst = function removeBurst(idx) {
          this.bursts.splice(this.bursts.indexOf(idx), 1);
        };

        _proto.getBoundingX = function getBoundingX() {
          return this._aabbHalfX;
        };

        _proto.getBoundingY = function getBoundingY() {
          return this._aabbHalfY;
        };

        _proto.getBoundingZ = function getBoundingZ() {
          return this._aabbHalfZ;
        };

        _proto.setBoundingX = function setBoundingX(value) {
          if (this._boundingBox && this._culler) {
            this._boundingBox.halfExtents.x = value;

            this._culler.setBoundingBoxSize(this._boundingBox.halfExtents);

            this._aabbHalfX = value;
          }
        };

        _proto.setBoundingY = function setBoundingY(value) {
          if (this._boundingBox && this._culler) {
            this._boundingBox.halfExtents.y = value;

            this._culler.setBoundingBoxSize(this._boundingBox.halfExtents);

            this._aabbHalfY = value;
          }
        };

        _proto.setBoundingZ = function setBoundingZ(value) {
          if (this._boundingBox && this._culler) {
            this._boundingBox.halfExtents.z = value;

            this._culler.setBoundingBoxSize(this._boundingBox.halfExtents);

            this._aabbHalfZ = value;
          }
        }
        /**
         * @ignore
         */
        ;

        _proto._onBeforeSerialize = function _onBeforeSerialize(props) {
          var _this2 = this;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return this.dataCulling ? props.filter(function (p) {
            return !PARTICLE_MODULE_PROPERTY.includes(p) || _this2[p] && _this2[p].enable;
          }) : props;
        };

        _createClass(ParticleSystem, [{
          key: "capacity",
          get:
          /**
           * @zh 粒子系统能生成的最大粒子数量。
           */
          function get() {
            return this._capacity;
          },
          set: function set(val) {
            this._capacity = Math.floor(val); // @ts-expect-error private property access

            if (this.processor && this.processor._model) {
              // @ts-expect-error private property access
              this.processor._model.setCapacity(this._capacity);
            }
          }
          /**
           * @zh 粒子初始颜色。
           */

        }, {
          key: "prewarm",
          get:
          /**
           * @zh 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效）。
           */
          function get() {
            return this._prewarm;
          },
          set: function set(val) {
            if (val === true && this.loop === false) {// console.warn('prewarm only works if loop is also enabled.');
            }

            this._prewarm = val;
          }
          /**
           * @zh 选择粒子系统所在的坐标系[[Space]]。<br>
           */

        }, {
          key: "simulationSpace",
          get: function get() {
            return this._simulationSpace;
          },
          set: function set(val) {
            if (val !== this._simulationSpace) {
              this._simulationSpace = val;

              if (this.processor) {
                this.processor.updateMaterialParams();
                this.processor.updateTrailMaterial();
              }
            }
          }
          /**
           * @zh 控制整个粒子系统的更新速度。
           */

        }, {
          key: "renderCulling",
          get: function get() {
            return this._renderCulling;
          },
          set:
          /**
           * @en Enable particle culling switch. Open it to enable particle culling. If enabled will generate emitter bounding box and emitters outside the frustum will be culled.
           * @zh 粒子剔除开关，如果打开将会生成一个发射器包围盒，包围盒在相机外发射器将被剔除。
           */
          function set(value) {
            this._renderCulling = value;

            if (value) {
              if (!this._boundingBox) {
                this._boundingBox = new AABB();

                this._calculateBounding(false);
              }
            }
          }
        }, {
          key: "cullingMode",
          get:
          /**
           * @en Particle culling mode option. Includes pause, pause and catchup, always simulate.
           * @zh 粒子剔除模式选择。包括暂停模拟，暂停以后快进继续以及不间断模拟。
           */
          function get() {
            return this._cullingMode;
          },
          set: function set(value) {
            this._cullingMode = value;
          }
        }, {
          key: "aabbHalfX",
          get:
          /**
           * @en Particle bounding box half width.
           * @zh 粒子包围盒半宽。
           */
          function get() {
            var res = this.getBoundingX();

            if (res) {
              return res;
            } else {
              return 0;
            }
          },
          set: function set(value) {
            this.setBoundingX(value);
          }
        }, {
          key: "aabbHalfY",
          get:
          /**
           * @en Particle bounding box half height.
           * @zh 粒子包围盒半高。
           */
          function get() {
            var res = this.getBoundingY();

            if (res) {
              return res;
            } else {
              return 0;
            }
          },
          set: function set(value) {
            this.setBoundingY(value);
          }
        }, {
          key: "aabbHalfZ",
          get:
          /**
           * @en Particle bounding box half depth.
           * @zh 粒子包围盒半深。
           */
          function get() {
            var res = this.getBoundingZ();

            if (res) {
              return res;
            } else {
              return 0;
            }
          },
          set: function set(value) {
            this.setBoundingZ(value);
          }
        }, {
          key: "dataCulling",
          get:
          /**
           * @en Culling module data before serialize.
           * @zh 序列化之前剔除不需要的模块数据。
           */
          function get() {
            return this._dataCulling;
          },
          set: function set(value) {
            this._dataCulling = value;
          }
        }, {
          key: "sharedMaterials",
          get: function get() {
            // if we don't create an array copy, the editor will modify the original array directly.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return superMaterials.get.call(this);
          },
          set: function set(val) {
            // @ts-expect-error private property access
            superMaterials.set.call(this, val);
          } // color over lifetime module

        }, {
          key: "colorOverLifetimeModule",
          get:
          /**
           * @zh 颜色控制模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._colorOverLifetimeModule) {
                this._colorOverLifetimeModule = new ColorOverLifetimeModule();

                this._colorOverLifetimeModule.bindTarget(this.processor);
              }
            }

            return this._colorOverLifetimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._colorOverLifetimeModule = val;
          } // shape module

        }, {
          key: "shapeModule",
          get:
          /**
           * @zh 粒子发射器模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._shapeModule) {
                this._shapeModule = new ShapeModule();

                this._shapeModule.onInit(this);
              }
            }

            return this._shapeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._shapeModule = val;
          } // size over lifetime module

        }, {
          key: "sizeOvertimeModule",
          get:
          /**
           * @zh 粒子大小模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._sizeOvertimeModule) {
                this._sizeOvertimeModule = new SizeOvertimeModule();

                this._sizeOvertimeModule.bindTarget(this.processor);
              }
            }

            return this._sizeOvertimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._sizeOvertimeModule = val;
          } // velocity overtime module

        }, {
          key: "velocityOvertimeModule",
          get:
          /**
           * @zh 粒子速度模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._velocityOvertimeModule) {
                this._velocityOvertimeModule = new VelocityOvertimeModule();

                this._velocityOvertimeModule.bindTarget(this.processor);
              }
            }

            return this._velocityOvertimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._velocityOvertimeModule = val;
          } // force overTime module

        }, {
          key: "forceOvertimeModule",
          get:
          /**
           * @zh 粒子加速度模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._forceOvertimeModule) {
                this._forceOvertimeModule = new ForceOvertimeModule();

                this._forceOvertimeModule.bindTarget(this.processor);
              }
            }

            return this._forceOvertimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._forceOvertimeModule = val;
          } // limit velocity overtime module

        }, {
          key: "limitVelocityOvertimeModule",
          get:
          /**
           * @zh 粒子限制速度模块（只支持 CPU 粒子）。
           */
          function get() {
            if (EDITOR) {
              if (!this._limitVelocityOvertimeModule) {
                this._limitVelocityOvertimeModule = new LimitVelocityOvertimeModule();

                this._limitVelocityOvertimeModule.bindTarget(this.processor);
              }
            }

            return this._limitVelocityOvertimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._limitVelocityOvertimeModule = val;
          } // rotation overtime module

        }, {
          key: "rotationOvertimeModule",
          get:
          /**
           * @zh 粒子旋转模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._rotationOvertimeModule) {
                this._rotationOvertimeModule = new RotationOvertimeModule();

                this._rotationOvertimeModule.bindTarget(this.processor);
              }
            }

            return this._rotationOvertimeModule;
          },
          set: function set(val) {
            if (!val) return;
            this._rotationOvertimeModule = val;
          } // texture animation module

        }, {
          key: "textureAnimationModule",
          get:
          /**
           * @zh 贴图动画模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._textureAnimationModule) {
                this._textureAnimationModule = new TextureAnimationModule();

                this._textureAnimationModule.bindTarget(this.processor);
              }
            }

            return this._textureAnimationModule;
          },
          set: function set(val) {
            if (!val) return;
            this._textureAnimationModule = val;
          } // trail module

        }, {
          key: "trailModule",
          get:
          /**
           * @zh 粒子轨迹模块。
           */
          function get() {
            if (EDITOR) {
              if (!this._trailModule) {
                this._trailModule = new TrailModule();

                this._trailModule.onInit(this);

                this._trailModule.onEnable();
              }
            }

            return this._trailModule;
          },
          set: function set(val) {
            if (!val) return;
            this._trailModule = val;
          } // particle system renderer

        }, {
          key: "isPlaying",
          get: function get() {
            return this._isPlaying;
          }
        }, {
          key: "isPaused",
          get: function get() {
            return this._isPaused;
          }
        }, {
          key: "isStopped",
          get: function get() {
            return this._isStopped;
          }
        }, {
          key: "isEmitting",
          get: function get() {
            return this._isEmitting;
          }
        }, {
          key: "time",
          get: function get() {
            return this._time;
          }
        }]);

        return ParticleSystem;
      }(RenderableComponent), _class3.CullingMode = CullingMode, _temp), (_applyDecoratedDescriptor(_class2.prototype, "capacity", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "capacity"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "startColor", [_dec7, serializable, _dec8, _dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new GradientRange();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scaleSpace", [_dec10, serializable, _dec11, _dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Space.Local;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "startSize3D", [serializable, _dec13, _dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "startSizeX", [_dec15, _dec16, _dec17, _dec18, _dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "startSizeY", [_dec20, serializable, _dec21, _dec22, _dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "startSizeZ", [_dec24, serializable, _dec25, _dec26, _dec27], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "startSpeed", [_dec28, serializable, _dec29, _dec30, _dec31], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "startRotation3D", [serializable, _dec32, _dec33], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "startRotationX", [_dec34, serializable, _dec35, radian, _dec36, _dec37], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "startRotationY", [_dec38, serializable, _dec39, radian, _dec40, _dec41], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "startRotationZ", [_dec42, _dec43, _dec44, radian, _dec45, _dec46], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "startDelay", [_dec47, serializable, _dec48, _dec49, _dec50], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "startLifetime", [_dec51, serializable, _dec52, _dec53, _dec54], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "duration", [serializable, _dec55, _dec56], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5.0;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "loop", [serializable, _dec57, _dec58], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "prewarm", [_dec59, _dec60], Object.getOwnPropertyDescriptor(_class2.prototype, "prewarm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "simulationSpace", [_dec61, serializable, _dec62, _dec63], Object.getOwnPropertyDescriptor(_class2.prototype, "simulationSpace"), _class2.prototype), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "simulationSpeed", [serializable, _dec64, _dec65], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "playOnAwake", [serializable, _dec66, _dec67], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "gravityModifier", [_dec68, serializable, _dec69, _dec70, _dec71], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "rateOverTime", [_dec72, serializable, _dec73, _dec74, _dec75], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "rateOverDistance", [_dec76, serializable, _dec77, _dec78, _dec79], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "bursts", [_dec80, serializable, _dec81, _dec82], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "renderCulling", [_dec83, _dec84, _dec85], Object.getOwnPropertyDescriptor(_class2.prototype, "renderCulling"), _class2.prototype), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "_renderCulling", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "cullingMode", [_dec86, _dec87, _dec88], Object.getOwnPropertyDescriptor(_class2.prototype, "cullingMode"), _class2.prototype), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "_cullingMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return CullingMode.Pause;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "aabbHalfX", [_dec89, _dec90, _dec91], Object.getOwnPropertyDescriptor(_class2.prototype, "aabbHalfX"), _class2.prototype), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "_aabbHalfX", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "aabbHalfY", [_dec92, _dec93, _dec94], Object.getOwnPropertyDescriptor(_class2.prototype, "aabbHalfY"), _class2.prototype), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "_aabbHalfY", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "aabbHalfZ", [_dec95, _dec96, _dec97], Object.getOwnPropertyDescriptor(_class2.prototype, "aabbHalfZ"), _class2.prototype), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "_aabbHalfZ", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "dataCulling", [_dec98, _dec99], Object.getOwnPropertyDescriptor(_class2.prototype, "dataCulling"), _class2.prototype), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "_dataCulling", [serializable, _dec100], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [override, _dec101, _dec102, serializable, _dec103], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "_colorOverLifetimeModule", [_dec104], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "colorOverLifetimeModule", [_dec105, _dec106, _dec107], Object.getOwnPropertyDescriptor(_class2.prototype, "colorOverLifetimeModule"), _class2.prototype), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "_shapeModule", [_dec108], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "shapeModule", [_dec109, _dec110, _dec111], Object.getOwnPropertyDescriptor(_class2.prototype, "shapeModule"), _class2.prototype), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "_sizeOvertimeModule", [_dec112], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "sizeOvertimeModule", [_dec113, _dec114, _dec115], Object.getOwnPropertyDescriptor(_class2.prototype, "sizeOvertimeModule"), _class2.prototype), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "_velocityOvertimeModule", [_dec116], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "velocityOvertimeModule", [_dec117, _dec118, _dec119], Object.getOwnPropertyDescriptor(_class2.prototype, "velocityOvertimeModule"), _class2.prototype), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "_forceOvertimeModule", [_dec120], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "forceOvertimeModule", [_dec121, _dec122, _dec123], Object.getOwnPropertyDescriptor(_class2.prototype, "forceOvertimeModule"), _class2.prototype), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "_limitVelocityOvertimeModule", [_dec124], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "limitVelocityOvertimeModule", [_dec125, _dec126, _dec127], Object.getOwnPropertyDescriptor(_class2.prototype, "limitVelocityOvertimeModule"), _class2.prototype), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "_rotationOvertimeModule", [_dec128], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "rotationOvertimeModule", [_dec129, _dec130, _dec131], Object.getOwnPropertyDescriptor(_class2.prototype, "rotationOvertimeModule"), _class2.prototype), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "_textureAnimationModule", [_dec132], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "textureAnimationModule", [_dec133, _dec134, _dec135], Object.getOwnPropertyDescriptor(_class2.prototype, "textureAnimationModule"), _class2.prototype), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, "_trailModule", [_dec136], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "trailModule", [_dec137, _dec138, _dec139], Object.getOwnPropertyDescriptor(_class2.prototype, "trailModule"), _class2.prototype), _descriptor37 = _applyDecoratedDescriptor(_class2.prototype, "renderer", [_dec140, serializable, _dec141, _dec142], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new ParticleSystemRenderer();
        }
      }), _descriptor38 = _applyDecoratedDescriptor(_class2.prototype, "_prewarm", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor39 = _applyDecoratedDescriptor(_class2.prototype, "_capacity", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor40 = _applyDecoratedDescriptor(_class2.prototype, "_simulationSpace", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Space.Local;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class));
    }
  };
});
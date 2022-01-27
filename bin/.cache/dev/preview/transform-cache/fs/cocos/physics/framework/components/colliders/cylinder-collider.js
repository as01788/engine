System.register("q-bundled:///fs/cocos/physics/framework/components/colliders/cylinder-collider.js", ["../../../../core/data/decorators/index.js", "./collider.js", "../../physics-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, menu, tooltip, type, serializable, Collider, EAxisDirection, EColliderType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, CylinderCollider;

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
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_colliderJs) {
      Collider = _colliderJs.Collider;
    }, function (_physicsEnumJs) {
      EAxisDirection = _physicsEnumJs.EAxisDirection;
      EColliderType = _physicsEnumJs.EColliderType;
    }],
    execute: function () {
      /**
       * @en
       * Cylinder collider component.
       * @zh
       * 圆柱体碰撞器。
       */
      _export("CylinderCollider", CylinderCollider = (_dec = ccclass('cc.CylinderCollider'), _dec2 = help('i18n:cc.CylinderCollider'), _dec3 = menu('Physics/CylinderCollider'), _dec4 = tooltip('i18n:physics3d.collider.cylinder_radius'), _dec5 = tooltip('i18n:physics3d.collider.cylinder_height'), _dec6 = type(EAxisDirection), _dec7 = tooltip('i18n:physics3d.collider.cylinder_direction'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Collider) {
        _inheritsLoose(CylinderCollider, _Collider);

        function CylinderCollider() {
          var _this;

          _this = _Collider.call(this, EColliderType.CYLINDER) || this;

          _initializerDefineProperty(_this, "_radius", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_height", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_direction", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        _createClass(CylinderCollider, [{
          key: "radius",
          get: /// PUBLIC PROPERTY GETTER\SETTER ///

          /**
           * @en
           * Gets or sets the radius of the circle on the cylinder body, in local space.
           * @zh
           * 获取或设置圆柱体上圆面半径。
           */
          function get() {
            return this._radius;
          },
          set: function set(value) {
            if (this._radius === value) return;
            this._radius = Math.abs(value);

            if (this._shape) {
              this.shape.setRadius(value);
            }
          }
          /**
           * @en
           * Gets or sets the cylinder body is at the corresponding axial height, in local space.
           * @zh
           * 获取或设置圆柱体在相应轴向的高度。
           */

        }, {
          key: "height",
          get: function get() {
            return this._height;
          },
          set: function set(value) {
            if (this._height === value) return;
            this._height = Math.abs(value);

            if (this._shape) {
              this.shape.setHeight(value);
            }
          }
          /**
           * @en
           * Gets or sets the cylinder direction, in local space.
           * @zh
           * 获取或设置在圆柱体本地空间上的方向。
           */

        }, {
          key: "direction",
          get: function get() {
            return this._direction;
          },
          set: function set(value) {
            if (this._direction === value) return;
            if (value < EAxisDirection.X_AXIS || value > EAxisDirection.Z_AXIS) return;
            this._direction = value;

            if (this._shape) {
              this.shape.setDirection(value);
            }
          }
        }, {
          key: "shape",
          get: function get() {
            return this._shape;
          } /// PRIVATE PROPERTY ///

        }]);

        return CylinderCollider;
      }(Collider), _temp), (_applyDecoratedDescriptor(_class2.prototype, "radius", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "radius"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "height", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "height"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "direction"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_radius", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_height", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_direction", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EAxisDirection.Y_AXIS;
        }
      })), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});
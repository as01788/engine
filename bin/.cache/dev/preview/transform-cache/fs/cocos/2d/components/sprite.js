System.register("q-bundled:///fs/cocos/2d/components/sprite.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../assets/sprite-atlas.js", "../assets/sprite-frame.js", "../../core/math/index.js", "../../core/value-types/enum.js", "../../core/math/utils.js", "../framework/renderable-2d.js", "../../core/assets/asset-enum.js", "../../core/assets/texture-base.js", "../../core/index.js", "../../core/scene-graph/node-event.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, tooltip, displayOrder, type, range, editable, serializable, visible, override, displayName, EDITOR, UI_GPU_DRIVEN, SpriteAtlas, SpriteFrame, Vec2, ccenum, clamp, Renderable2D, InstanceMaterialType, PixelFormat, TextureBase, Material, RenderTexture, NodeEventType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _class3, _temp, SpriteType, FillType, SizeMode, EventType, Sprite;

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  _export("SpriteType", void 0);

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      range = _coreDataDecoratorsIndexJs.range;
      editable = _coreDataDecoratorsIndexJs.editable;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      visible = _coreDataDecoratorsIndexJs.visible;
      override = _coreDataDecoratorsIndexJs.override;
      displayName = _coreDataDecoratorsIndexJs.displayName;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      UI_GPU_DRIVEN = _virtualInternal253AconstantsJs.UI_GPU_DRIVEN;
    }, function (_assetsSpriteAtlasJs) {
      SpriteAtlas = _assetsSpriteAtlasJs.SpriteAtlas;
    }, function (_assetsSpriteFrameJs) {
      SpriteFrame = _assetsSpriteFrameJs.SpriteFrame;
    }, function (_coreMathIndexJs) {
      Vec2 = _coreMathIndexJs.Vec2;
    }, function (_coreValueTypesEnumJs) {
      ccenum = _coreValueTypesEnumJs.ccenum;
    }, function (_coreMathUtilsJs) {
      clamp = _coreMathUtilsJs.clamp;
    }, function (_frameworkRenderable2dJs) {
      Renderable2D = _frameworkRenderable2dJs.Renderable2D;
      InstanceMaterialType = _frameworkRenderable2dJs.InstanceMaterialType;
    }, function (_coreAssetsAssetEnumJs) {
      PixelFormat = _coreAssetsAssetEnumJs.PixelFormat;
    }, function (_coreAssetsTextureBaseJs) {
      TextureBase = _coreAssetsTextureBaseJs.TextureBase;
    }, function (_coreIndexJs) {
      Material = _coreIndexJs.Material;
      RenderTexture = _coreIndexJs.RenderTexture;
    }, function (_coreSceneGraphNodeEventJs) {
      NodeEventType = _coreSceneGraphNodeEventJs.NodeEventType;
    }],
    execute: function () {
      (function (SpriteType) {
        SpriteType[SpriteType["SIMPLE"] = 0] = "SIMPLE";
        SpriteType[SpriteType["SLICED"] = 1] = "SLICED";
        SpriteType[SpriteType["TILED"] = 2] = "TILED";
        SpriteType[SpriteType["FILLED"] = 3] = "FILLED";
      })(SpriteType || _export("SpriteType", SpriteType = {}));

      ccenum(SpriteType);
      /**
       * @en
       * Enum for fill type.
       *
       * @zh
       * 填充类型。
       */

      (function (FillType) {
        FillType[FillType["HORIZONTAL"] = 0] = "HORIZONTAL";
        FillType[FillType["VERTICAL"] = 1] = "VERTICAL";
        FillType[FillType["RADIAL"] = 2] = "RADIAL";
      })(FillType || (FillType = {}));

      ccenum(FillType);
      /**
       * @en
       * Sprite Size can track trimmed size, raw size or none.
       *
       * @zh
       * 精灵尺寸调整模式。
       */

      (function (SizeMode) {
        SizeMode[SizeMode["CUSTOM"] = 0] = "CUSTOM";
        SizeMode[SizeMode["TRIMMED"] = 1] = "TRIMMED";
        SizeMode[SizeMode["RAW"] = 2] = "RAW";
      })(SizeMode || (SizeMode = {}));

      ccenum(SizeMode);

      (function (EventType) {
        EventType["SPRITE_FRAME_CHANGED"] = "spriteframe-changed";
      })(EventType || (EventType = {}));

      /**
       * @en
       * Renders a sprite in the scene.
       *
       * @zh
       * 渲染精灵组件。
       */
      _export("Sprite", Sprite = (_dec = ccclass('cc.Sprite'), _dec2 = help('i18n:cc.Sprite'), _dec3 = executionOrder(110), _dec4 = menu('2D/Sprite'), _dec5 = type(Material), _dec6 = displayOrder(0), _dec7 = displayName('CustomMaterial'), _dec8 = type(SpriteAtlas), _dec9 = displayOrder(4), _dec10 = tooltip('i18n:sprite.atlas'), _dec11 = type(SpriteFrame), _dec12 = displayOrder(5), _dec13 = tooltip('i18n:sprite.sprite_frame'), _dec14 = type(SpriteType), _dec15 = displayOrder(6), _dec16 = tooltip('i18n:sprite.type'), _dec17 = type(FillType), _dec18 = tooltip('i18n:sprite.fill_type'), _dec19 = tooltip('i18n:sprite.fill_center'), _dec20 = range([0, 1, 0.1]), _dec21 = tooltip('i18n:sprite.fill_start'), _dec22 = range([-1, 1, 0.1]), _dec23 = tooltip('i18n:sprite.fill_range'), _dec24 = visible(function () {
        return this._type === SpriteType.SIMPLE;
      }), _dec25 = displayOrder(8), _dec26 = tooltip('i18n:sprite.trim'), _dec27 = tooltip('i18n:sprite.gray_scale'), _dec28 = type(SizeMode), _dec29 = displayOrder(7), _dec30 = tooltip('i18n:sprite.size_mode'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Renderable2D) {
        _inheritsLoose(Sprite, _Renderable2D);

        function Sprite() {
          var _this;

          _this = _Renderable2D.call(this) || this;

          _initializerDefineProperty(_this, "_spriteFrame", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_type", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fillType", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_sizeMode", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fillCenter", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fillStart", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fillRange", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isTrimmedMode", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_useGrayscale", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_atlas", _descriptor10, _assertThisInitialized(_this));

          if (UI_GPU_DRIVEN) {
            _this._canDrawByFourVertex = true;
          }

          return _this;
        }

        var _proto = Sprite.prototype;

        _proto.__preload = function __preload() {
          this.changeMaterialForDefine();

          _Renderable2D.prototype.__preload.call(this);

          if (EDITOR) {
            this._resized();

            this.node.on(NodeEventType.SIZE_CHANGED, this._resized, this);
          }
        } // /**
        //  * Change the state of sprite.
        //  * @method setState
        //  * @see `Sprite.State`
        //  * @param state {Sprite.State} NORMAL or GRAY State.
        //  */
        // getState() {
        //     return this._state;
        // }
        // setState(state) {
        //     if (this._state === state) return;
        //     this._state = state;
        //     this._activateMaterial();
        // }
        // onLoad() {}
        ;

        _proto.onEnable = function onEnable() {
          _Renderable2D.prototype.onEnable.call(this); // this._flushAssembler();


          this._activateMaterial();

          this._markForUpdateUvDirty();

          if (UI_GPU_DRIVEN) {
            this.tillingOffsetWithTrim = [];
          }
        };

        _proto.onDestroy = function onDestroy() {
          this.destroyRenderData();

          if (EDITOR) {
            this.node.off(NodeEventType.SIZE_CHANGED, this._resized, this);
          }

          _Renderable2D.prototype.onDestroy.call(this);
        }
        /**
         * @en
         * Quickly switch to other sprite frame in the sprite atlas.
         * If there is no atlas, the switch fails.
         *
         * @zh
         * 精灵图集内的精灵替换
         *
         * @returns
         */
        ;

        _proto.changeSpriteFrameFromAtlas = function changeSpriteFrameFromAtlas(name) {
          if (!this._atlas) {
            console.warn('SpriteAtlas is null.');
            return;
          }

          var sprite = this._atlas.getSpriteFrame(name);

          this.spriteFrame = sprite;
        };

        _proto.changeMaterialForDefine = function changeMaterialForDefine() {
          var texture;
          var lastInstanceMaterialType = this._instanceMaterialType;

          if (this._spriteFrame) {
            texture = this._spriteFrame.texture;
          }

          var value = false;

          if (texture instanceof TextureBase) {
            var format = texture.getPixelFormat();
            value = format === PixelFormat.RGBA_ETC1 || format === PixelFormat.RGB_A_PVRTC_4BPPV1 || format === PixelFormat.RGB_A_PVRTC_2BPPV1;
          }

          if (value && this.grayscale) {
            this._instanceMaterialType = InstanceMaterialType.USE_ALPHA_SEPARATED_AND_GRAY;
          } else if (value) {
            this._instanceMaterialType = InstanceMaterialType.USE_ALPHA_SEPARATED;
          } else if (this.grayscale) {
            this._instanceMaterialType = InstanceMaterialType.GRAYSCALE;
          } else {
            this._instanceMaterialType = InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
          }

          if (lastInstanceMaterialType !== this._instanceMaterialType) {
            this.updateMaterial();
          }
        };

        _proto._updateBuiltinMaterial = function _updateBuiltinMaterial() {
          var mat = _Renderable2D.prototype._updateBuiltinMaterial.call(this);

          if (this.spriteFrame && this.spriteFrame.texture instanceof RenderTexture) {
            var defines = _extends({
              SAMPLE_FROM_RT: true
            }, mat.passes[0].defines);

            var renderMat = new Material();
            renderMat.initialize({
              effectAsset: mat.effectAsset,
              defines: defines
            });
            mat = renderMat;
          }

          return mat;
        };

        _proto._render = function _render(render) {
          render.commitComp(this, this._spriteFrame, this._assembler, null);
        };

        _proto._canRender = function _canRender() {
          if (!_Renderable2D.prototype._canRender.call(this)) {
            return false;
          }

          var spriteFrame = this._spriteFrame;

          if (!spriteFrame || !spriteFrame.texture) {
            return false;
          }

          return true;
        };

        _proto._flushAssembler = function _flushAssembler() {
          // macro.UI_GPU_DRIVEN
          var assembler = Sprite.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this.destroyRenderData();
            this._assembler = assembler;
          }

          if (!this._renderData) {
            if (this._assembler && this._assembler.createData) {
              this._renderData = this._assembler.createData(this);
              this._renderData.material = this.getRenderMaterial(0);
              this.markForUpdateRenderData();
              this._colorDirty = true;

              this._updateColor();
            }
          }
        };

        _proto._applySpriteSize = function _applySpriteSize() {
          if (this._spriteFrame) {
            if (!this._spriteFrame.isDefault) {
              if (SizeMode.RAW === this._sizeMode) {
                var size = this._spriteFrame.originalSize;

                this.node._uiProps.uiTransformComp.setContentSize(size);
              } else if (SizeMode.TRIMMED === this._sizeMode) {
                var rect = this._spriteFrame.getRect();

                this.node._uiProps.uiTransformComp.setContentSize(rect.width, rect.height);
              }
            }

            this._activateMaterial();
          }
        };

        _proto._resized = function _resized() {
          if (!EDITOR) {
            return;
          }

          if (this._spriteFrame) {
            var actualSize = this.node._uiProps.uiTransformComp.contentSize;
            var expectedW = actualSize.width;
            var expectedH = actualSize.height;

            if (this._sizeMode === SizeMode.RAW) {
              var size = this._spriteFrame.getOriginalSize();

              expectedW = size.width;
              expectedH = size.height;
            } else if (this._sizeMode === SizeMode.TRIMMED) {
              var rect = this._spriteFrame.getRect();

              expectedW = rect.width;
              expectedH = rect.height;
            }

            if (expectedW !== actualSize.width || expectedH !== actualSize.height) {
              this._sizeMode = SizeMode.CUSTOM;
            }
          }
        };

        _proto._activateMaterial = function _activateMaterial() {
          var spriteFrame = this._spriteFrame;
          var material = this.getRenderMaterial(0);

          if (spriteFrame) {
            if (material) {
              this.markForUpdateRenderData();
            }
          }

          if (this._renderData) {
            this._renderData.material = material;
          }
        };

        _proto._applySpriteFrame = function _applySpriteFrame(oldFrame) {
          var spriteFrame = this._spriteFrame;

          if (this._renderData) {
            if (!this._renderData.uvDirty) {
              if (oldFrame && spriteFrame) {
                this._renderData.uvDirty = oldFrame.uvHash !== spriteFrame.uvHash;
              } else {
                this._renderData.uvDirty = true;
              }
            }

            this._renderDataFlag = this._renderData.uvDirty;
          }

          var textureChanged = false;

          if (spriteFrame) {
            if (!oldFrame || oldFrame.texture !== spriteFrame.texture) {
              textureChanged = true;
            }

            if (textureChanged) {
              if (this._renderData) this._renderData.textureDirty = true;
              this.changeMaterialForDefine();
            }

            this._applySpriteSize();
          }
          /*
          if (EDITOR) {
              // Set atlas
              this._applyAtlas(spriteFrame);
          }
          */

        }
        /**
         * 强制刷新 uv。
         */
        ;

        _proto._markForUpdateUvDirty = function _markForUpdateUvDirty() {
          if (this._renderData) {
            this._renderData.uvDirty = true;
            this._renderDataFlag = true;
          }
        } // macro.UI_GPU_DRIVEN
        ;

        _proto._calculateSlicedData = function _calculateSlicedData(out) {
          var content = this.node._uiProps.uiTransformComp.contentSize;
          var spriteWidth = content.width;
          var spriteHeight = content.height;
          var leftWidth = this.spriteFrame.insetLeft;
          var rightWidth = this.spriteFrame.insetRight;
          var centerWidth = spriteWidth - leftWidth - rightWidth;
          var topHeight = this.spriteFrame.insetTop;
          var bottomHeight = this.spriteFrame.insetBottom;
          var centerHeight = spriteHeight - topHeight - bottomHeight;
          out.length = 0;
          out[0] = leftWidth / spriteWidth;
          out[1] = topHeight / spriteHeight;
          out[2] = (leftWidth + centerWidth) / spriteWidth;
          out[3] = (topHeight + centerHeight) / spriteHeight;
          return out;
        } // macro.UI_GPU_DRIVEN
        ;

        _proto.calculateTiledData = function calculateTiledData(out) {
          var content = this.node._uiProps.uiTransformComp.contentSize;
          var rect = this.spriteFrame.rect;
          out.x = content.width / rect.width;
          out.y = content.height / rect.height;
        } // macro.UI_GPU_DRIVEN
        ;

        _proto._updateUVWithTrim = function _updateUVWithTrim() {
          this.tillingOffsetWithTrim.length = 0;
          var frame = this.spriteFrame;
          var originSize = frame.originalSize;
          var rect = frame.rect;
          var tex = frame.texture;
          var texw = tex.width;
          var texh = tex.height;
          var x = 0;
          var y = 0;

          if (frame.original) {
            x = rect.x - frame.original._x;
            y = rect.y - frame.original._y;
          }

          var l = texw === 0 ? 0 : x / texw;
          var r = texw === 0 ? 1 : (x + originSize.width) / texw;
          var b = texh === 0 ? 1 : (y + originSize.height) / texh;
          var t = texh === 0 ? 0 : y / texh;

          if (frame.rotated) {
            l = texw === 0 ? 0 : x / texw;
            r = texw === 0 ? 1 : (x + originSize.height) / texw;
            t = texh === 0 ? 0 : y / texh;
            b = texh === 0 ? 1 : (y + originSize.width) / texh;
          }

          this.tillingOffsetWithTrim[0] = r - l; //r-l

          this.tillingOffsetWithTrim[1] = b - t; //b-t

          this.tillingOffsetWithTrim[2] = l; //l

          this.tillingOffsetWithTrim[3] = t; //t

          if (frame.rotated) {
            this.tillingOffsetWithTrim[0] = -this.tillingOffsetWithTrim[0];
          }
        };

        _createClass(Sprite, [{
          key: "customMaterial",
          get:
          /**
           * @en The customMaterial
           * @zh 用户自定材质
           */
          function get() {
            return this._customMaterial;
          },
          set: function set(val) {
            this._customMaterial = val;
            this.updateMaterial();

            if (UI_GPU_DRIVEN && !val) {
              this._canDrawByFourVertex = true;
            }
          }
          /**
           * @en
           * The sprite atlas where the sprite is.
           *
           * @zh
           * 精灵的图集。
           */

        }, {
          key: "spriteAtlas",
          get: function get() {
            return this._atlas;
          },
          set: function set(value) {
            if (this._atlas === value) {
              return;
            }

            this._atlas = value; //        this.spriteFrame = null;
          }
          /**
           * @en
           * The sprite frame of the sprite.
           *
           * @zh
           * 精灵的精灵帧。
           */

        }, {
          key: "spriteFrame",
          get: function get() {
            return this._spriteFrame;
          },
          set: function set(value) {
            if (this._spriteFrame === value) {
              return;
            }

            var lastSprite = this._spriteFrame;
            this._spriteFrame = value; // render & update render data flag will be triggered while applying new sprite frame

            this.markForUpdateRenderData(false);

            this._applySpriteFrame(lastSprite);

            if (EDITOR) {
              this.node.emit(EventType.SPRITE_FRAME_CHANGED, this);
            }
          }
          /**
           * @en
           * The sprite render type.
           *
           * @zh
           * 精灵渲染类型。
           *
           * @example
           * ```ts
           * import { Sprite } from 'cc';
           * sprite.type = Sprite.Type.SIMPLE;
           * ```
           */

        }, {
          key: "type",
          get: function get() {
            return this._type;
          },
          set: function set(value) {
            if (this._type !== value) {
              this._type = value;

              this._flushAssembler();
            }
          }
          /**
           * @en
           * The fill type, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
           *
           * @zh
           * 精灵填充类型，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
           *
           * @example
           * ```ts
           * import { Sprite } from 'cc';
           * sprite.fillType = Sprite.FillType.HORIZONTAL;
           * ```
           */

        }, {
          key: "fillType",
          get: function get() {
            return this._fillType;
          },
          set: function set(value) {
            if (this._fillType !== value) {
              if (value === FillType.RADIAL || this._fillType === FillType.RADIAL) {
                this.destroyRenderData();
                this._renderData = null;
              } else if (this._renderData) {
                this.markForUpdateRenderData(true);
              }
            }

            this._fillType = value;

            this._flushAssembler();
          }
          /**
           * @en
           * The fill Center, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
           *
           * @zh
           * 填充中心点，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
           *
           * @example
           * ```ts
           * import { Vec2 } from 'cc';
           * sprite.fillCenter = new Vec2(0, 0);
           * ```
           */

        }, {
          key: "fillCenter",
          get: function get() {
            return this._fillCenter;
          },
          set: function set(value) {
            this._fillCenter.x = value.x;
            this._fillCenter.y = value.y;

            if (this._type === SpriteType.FILLED && this._renderData) {
              this.markForUpdateRenderData();
            }
          }
          /**
           * @en
           * The fill Start, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
           *
           * @zh
           * 填充起始点，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
           *
           * @example
           * ```ts
           * // -1 To 1 between the numbers
           * sprite.fillStart = 0.5;
           * ```
           */

        }, {
          key: "fillStart",
          get: function get() {
            return this._fillStart;
          },
          set: function set(value) {
            this._fillStart = clamp(value, 0, 1);

            if (this._type === SpriteType.FILLED && this._renderData) {
              this.markForUpdateRenderData();
              this._renderData.uvDirty = true;
            }
          }
          /**
           * @en
           * The fill Range, This will only have any effect if the "type" is set to “Sprite.Type.FILLED”.
           *
           * @zh
           * 填充范围，仅渲染类型设置为 Sprite.Type.FILLED 时有效。
           *
           * @example
           * ```ts
           * // -1 To 1 between the numbers
           * sprite.fillRange = 1;
           * ```
           */

        }, {
          key: "fillRange",
          get: function get() {
            return this._fillRange;
          },
          set: function set(value) {
            // positive: counterclockwise, negative: clockwise
            this._fillRange = clamp(value, -1, 1);

            if (this._type === SpriteType.FILLED && this._renderData) {
              this.markForUpdateRenderData();
              this._renderData.uvDirty = true;
            }
          }
          /**
           * @en
           * specify the frame is trimmed or not.
           *
           * @zh
           * 是否使用裁剪模式。
           *
           * @example
           * ```ts
           * sprite.trim = true;
           * ```
           */

        }, {
          key: "trim",
          get: function get() {
            return this._isTrimmedMode;
          },
          set: function set(value) {
            if (this._isTrimmedMode === value) {
              return;
            }

            this._isTrimmedMode = value;

            if (this._type === SpriteType.SIMPLE
            /* || this._type === SpriteType.MESH */
            && this._renderData) {
              this.markForUpdateRenderData(true);
            }

            if (UI_GPU_DRIVEN && this._canDrawByFourVertex) {
              this._updateUVWithTrim();
            }
          }
        }, {
          key: "grayscale",
          get: function get() {
            return this._useGrayscale;
          },
          set: function set(value) {
            if (this._useGrayscale === value) {
              return;
            }

            this._useGrayscale = value;

            if (value === true) {
              this._instanceMaterialType = InstanceMaterialType.GRAYSCALE;
            } else {
              this._instanceMaterialType = InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
            }

            this.updateMaterial();
          }
          /**
           * @en
           * Specify the size tracing mode.
           *
           * @zh
           * 精灵尺寸调整模式。
           *
           * @example
           * ```ts
           * import { Sprite } from 'cc';
           * sprite.sizeMode = Sprite.SizeMode.CUSTOM;
           * ```
           */

        }, {
          key: "sizeMode",
          get: function get() {
            return this._sizeMode;
          },
          set: function set(value) {
            if (this._sizeMode === value) {
              return;
            }

            this._sizeMode = value;

            if (value !== SizeMode.CUSTOM) {
              this._applySpriteSize();
            }
          }
        }]);

        return Sprite;
      }(Renderable2D), _class3.FillType = FillType, _class3.Type = SpriteType, _class3.SizeMode = SizeMode, _class3.EventType = EventType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "customMaterial", [_dec5, _dec6, _dec7, override], Object.getOwnPropertyDescriptor(_class2.prototype, "customMaterial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spriteAtlas", [_dec8, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteAtlas"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteFrame"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillType", [_dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "fillType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillCenter", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "fillCenter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillStart", [_dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "fillStart"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fillRange", [_dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "fillRange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trim", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "trim"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "grayscale", [editable, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "grayscale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sizeMode", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "sizeMode"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_spriteFrame", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_type", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return SpriteType.SIMPLE;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_fillType", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return FillType.HORIZONTAL;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_sizeMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return SizeMode.TRIMMED;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_fillCenter", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(0, 0);
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_fillStart", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_fillRange", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_isTrimmedMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_useGrayscale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_atlas", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});
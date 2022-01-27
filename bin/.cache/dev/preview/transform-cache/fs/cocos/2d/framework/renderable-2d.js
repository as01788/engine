System.register("q-bundled:///fs/cocos/2d/framework/renderable-2d.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/data/decorators/index.js", "../../core/math/index.js", "../../core/value-types/enum.js", "../../core/builtin/index.js", "../../core/assets/index.js", "../../core/gfx/index.js", "../renderer/render-data.js", "./ui-transform.js", "../../core/components/renderable-component.js", "../renderer/stencil-manager.js", "../../core/platform/debug.js", "../../core/global-exports.js", "../../core/scene-graph/node-event.js", "../../core/scene-graph/node-ui-properties.js"], function (_export, _context) {
  "use strict";

  var EDITOR, UI_GPU_DRIVEN, ccclass, executeInEditMode, requireComponent, disallowMultiple, tooltip, type, displayOrder, serializable, override, visible, displayName, Color, ccenum, builtinResMgr, Material, BlendFactor, BlendState, BlendTarget, RenderData, UITransform, RenderableComponent, Stage, warnID, legacyCC, NodeEventType, NodeUIProperties, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp, InstanceMaterialType, Renderable2D;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  _export("InstanceMaterialType", void 0);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      UI_GPU_DRIVEN = _virtualInternal253AconstantsJs.UI_GPU_DRIVEN;
    }, function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      disallowMultiple = _coreDataDecoratorsIndexJs.disallowMultiple;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      override = _coreDataDecoratorsIndexJs.override;
      visible = _coreDataDecoratorsIndexJs.visible;
      displayName = _coreDataDecoratorsIndexJs.displayName;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
    }, function (_coreValueTypesEnumJs) {
      ccenum = _coreValueTypesEnumJs.ccenum;
    }, function (_coreBuiltinIndexJs) {
      builtinResMgr = _coreBuiltinIndexJs.builtinResMgr;
    }, function (_coreAssetsIndexJs) {
      Material = _coreAssetsIndexJs.Material;
    }, function (_coreGfxIndexJs) {
      BlendFactor = _coreGfxIndexJs.BlendFactor;
      BlendState = _coreGfxIndexJs.BlendState;
      BlendTarget = _coreGfxIndexJs.BlendTarget;
    }, function (_rendererRenderDataJs) {
      RenderData = _rendererRenderDataJs.RenderData;
    }, function (_uiTransformJs) {
      UITransform = _uiTransformJs.UITransform;
    }, function (_coreComponentsRenderableComponentJs) {
      RenderableComponent = _coreComponentsRenderableComponentJs.RenderableComponent;
    }, function (_rendererStencilManagerJs) {
      Stage = _rendererStencilManagerJs.Stage;
    }, function (_corePlatformDebugJs) {
      warnID = _corePlatformDebugJs.warnID;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreSceneGraphNodeEventJs) {
      NodeEventType = _coreSceneGraphNodeEventJs.NodeEventType;
    }, function (_coreSceneGraphNodeUiPropertiesJs) {
      NodeUIProperties = _coreSceneGraphNodeUiPropertiesJs.NodeUIProperties;
    }],
    execute: function () {
      // hack
      ccenum(BlendFactor);
      /**
       * @en
       * The shader property type of the material after instantiation.
       *
       * @zh
       * 实例后的材质的着色器属性类型。
       */

      (function (InstanceMaterialType) {
        InstanceMaterialType[InstanceMaterialType["ADD_COLOR"] = 0] = "ADD_COLOR";
        InstanceMaterialType[InstanceMaterialType["ADD_COLOR_AND_TEXTURE"] = 1] = "ADD_COLOR_AND_TEXTURE";
        InstanceMaterialType[InstanceMaterialType["GRAYSCALE"] = 2] = "GRAYSCALE";
        InstanceMaterialType[InstanceMaterialType["USE_ALPHA_SEPARATED"] = 3] = "USE_ALPHA_SEPARATED";
        InstanceMaterialType[InstanceMaterialType["USE_ALPHA_SEPARATED_AND_GRAY"] = 4] = "USE_ALPHA_SEPARATED_AND_GRAY";
      })(InstanceMaterialType || _export("InstanceMaterialType", InstanceMaterialType = {}));

      /**
       * @en Base class for 2D components which supports rendering features.
       * This component will setup [[NodeUIProperties.uiComp]] in its owner [[Node]]
       *
       * @zh 所有支持渲染的 2D 组件的基类。
       * 这个组件会设置 [[Node]] 上的 [[NodeUIProperties.uiComp]]。
       */
      _export("Renderable2D", Renderable2D = (_dec = ccclass('cc.Renderable2D'), _dec2 = requireComponent(UITransform), _dec3 = visible(false), _dec4 = type(Material), _dec5 = type(Material), _dec6 = displayOrder(0), _dec7 = tooltip('i18n:renderable2D.customMaterial'), _dec8 = displayName('CustomMaterial'), _dec9 = displayOrder(2), _dec10 = tooltip('i18n:renderable2D.color'), _dec(_class = _dec2(_class = disallowMultiple(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_RenderableComponent) {
        _inheritsLoose(Renderable2D, _RenderableComponent);

        var _proto = Renderable2D.prototype;

        // macro.UI_GPU_DRIVEN
        _proto.updateMaterial = function updateMaterial() {
          if (this._customMaterial) {
            this.setMaterial(this._customMaterial, 0);

            if (this._renderData) {
              this._renderData.material = this._customMaterial;
              this.markForUpdateRenderData();
              this._renderData.passDirty = true;
            }

            this._blendHash = -1; // a flag to check merge

            if (UI_GPU_DRIVEN) {
              this._canDrawByFourVertex = false;
            }

            return;
          }

          var mat = this._updateBuiltinMaterial();

          this.setMaterial(mat, 0);

          if (this._renderData) {
            this._renderData.material = mat;
            this.markForUpdateRenderData();
          }

          this._updateBlendFunc();
        }
        /**
         * @en Specifies the source blend mode, it will clone a new material object.
         * @zh 指定源的混合模式，这会克隆一个新的材质对象，注意这带来的性能和内存损耗。
         * @example
         * ```ts
         * sprite.srcBlendFactor = BlendFactor.ONE;
         * ```
         * @deprecated
         */
        ;

        function Renderable2D() {
          var _this;

          _this = _RenderableComponent.call(this) || this;

          _initializerDefineProperty(_this, "_materials", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_customMaterial", _descriptor2, _assertThisInitialized(_this));

          _this.stencilStage = Stage.DISABLED;

          _initializerDefineProperty(_this, "_srcBlendFactor", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_dstBlendFactor", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_color", _descriptor5, _assertThisInitialized(_this));

          _this._assembler = null;
          _this._postAssembler = null;
          _this._renderData = null;
          _this._renderDataFlag = true;
          _this._renderFlag = true;
          _this._delegateSrc = null;
          _this._instanceMaterialType = -1;
          _this._blendState = new BlendState();
          _this._blendHash = 0;
          _this._colorDirty = true;
          _this._lastParent = null;

          if (UI_GPU_DRIVEN) {
            _this._canDrawByFourVertex = false;
          }

          return _this;
        }

        _proto.updateBlendHash = function updateBlendHash() {
          var dst = this._blendState.targets[0].blendDst << 4;
          this._blendHash = dst | this._blendState.targets[0].blendSrc;
        };

        _proto.__preload = function __preload() {
          this.node._uiProps.uiComp = this;

          if (this._flushAssembler) {
            this._flushAssembler();
          }

          NodeUIProperties.markOpacityTree(this.node);
        };

        _proto.onEnable = function onEnable() {
          this.node.on(NodeEventType.ANCHOR_CHANGED, this._nodeStateChange, this);
          this.node.on(NodeEventType.SIZE_CHANGED, this._nodeStateChange, this);
          this.updateMaterial();
          this._renderFlag = this._canRender();
        } // For Redo, Undo
        ;

        _proto.onRestore = function onRestore() {
          this.updateMaterial();
          this._renderFlag = this._canRender();
        };

        _proto.onDisable = function onDisable() {
          this.node.off(NodeEventType.ANCHOR_CHANGED, this._nodeStateChange, this);
          this.node.off(NodeEventType.SIZE_CHANGED, this._nodeStateChange, this);
          this._renderFlag = false;
        };

        _proto.onDestroy = function onDestroy() {
          if (this.node._uiProps.uiComp === this) {
            this.node._uiProps.uiComp = null;
          }

          this.destroyRenderData();

          if (this._materialInstances) {
            for (var i = 0; i < this._materialInstances.length; i++) {
              this._materialInstances[i] && this._materialInstances[i].destroy();
            }
          }

          this._renderData = null;

          if (this._blendState) {
            this._blendState.destroy();
          }
        }
        /**
         * @en Marks the render data of the current component as modified so that the render data is recalculated.
         * @zh 标记当前组件的渲染数据为已修改状态，这样渲染数据才会重新计算。
         * @param enable Marked necessary to update or not
         */
        ;

        _proto.markForUpdateRenderData = function markForUpdateRenderData(enable) {
          if (enable === void 0) {
            enable = true;
          }

          this._renderFlag = this._canRender();

          if (enable && this._renderFlag) {
            var renderData = this._renderData;

            if (renderData) {
              renderData.vertDirty = true;
            }

            this._renderDataFlag = enable;
          } else if (!enable) {
            this._renderDataFlag = enable;
          }
        }
        /**
         * @en Request new render data object.
         * @zh 请求新的渲染数据对象。
         * @return The new render data
         */
        ;

        _proto.requestRenderData = function requestRenderData() {
          var data = RenderData.add();
          this._renderData = data;
          return data;
        }
        /**
         * @en Destroy current render data.
         * @zh 销毁当前渲染数据。
         */
        ;

        _proto.destroyRenderData = function destroyRenderData() {
          if (!this._renderData) {
            return;
          }

          RenderData.remove(this._renderData);
          this._renderData = null;
        }
        /**
         * @en Render data submission procedure, it update and assemble the render data to 2D data buffers before all children submission process.
         * Usually called each frame when the ui flow assemble all render data to geometry buffers.
         * Don't call it unless you know what you are doing.
         * @zh 渲染数据组装程序，这个方法会在所有子节点数据组装之前更新并组装当前组件的渲染数据到 UI 的顶点数据缓冲区中。
         * 一般在 UI 渲染流程中调用，用于组装所有的渲染数据到顶点数据缓冲区。
         * 注意：不要手动调用该函数，除非你理解整个流程。
         */
        ;

        _proto.updateAssembler = function updateAssembler(render) {
          this._updateColor();

          if (this._renderFlag) {
            this._checkAndUpdateRenderData();

            this._render(render);
          }
        }
        /**
         * @en Post render data submission procedure, it's executed after assembler updated for all children.
         * It may assemble some extra render data to the geometry buffers, or it may only change some render states.
         * Don't call it unless you know what you are doing.
         * @zh 后置渲染数据组装程序，它会在所有子节点的渲染数据组装完成后被调用。
         * 它可能会组装额外的渲染数据到顶点数据缓冲区，也可能只是重置一些渲染状态。
         * 注意：不要手动调用该函数，除非你理解整个流程。
         */
        ;

        _proto.postUpdateAssembler = function postUpdateAssembler(render) {
          if (this._renderFlag) {
            this._postRender(render);
          }
        };

        _proto._render = function _render(render) {};

        _proto._postRender = function _postRender(render) {};

        _proto._checkAndUpdateRenderData = function _checkAndUpdateRenderData() {
          if (this._renderDataFlag) {
            this._assembler.updateRenderData(this);

            this._renderDataFlag = false;
          }
        };

        _proto._canRender = function _canRender() {
          return this.isValid && this.getMaterial(0) !== null && this.enabled && (this._delegateSrc ? this._delegateSrc.activeInHierarchy : this.enabledInHierarchy) && this.node._uiProps.opacity > 0;
        };

        _proto._postCanRender = function _postCanRender() {};

        _proto._updateColor = function _updateColor() {
          if (UI_GPU_DRIVEN && this._canDrawByFourVertex) {
            if (this._colorDirty) {
              this._renderFlag = this._canRender();
              this._colorDirty = false;
            }

            return;
          } // Need update rendFlag when opacity changes from 0 to !0


          if (this._colorDirty && this._assembler && this._assembler.updateColor) {
            this._assembler.updateColor(this); // Need update rendFlag when opacity changes from 0 to !0 or 0 to !0


            this._renderFlag = this._canRender();
            this._colorDirty = false;
          }
        };

        _proto.markColorDirty = function markColorDirty() {
          this._colorDirty = true;
        };

        _proto._updateBlendFunc = function _updateBlendFunc() {
          // todo: Not only Pass[0].target[0]
          var target = this._blendState.targets[0];

          if (!target) {
            target = new BlendTarget();

            this._blendState.setTarget(0, target);
          }

          if (target.blendDst !== this._dstBlendFactor || target.blendSrc !== this._srcBlendFactor) {
            target.blend = true;
            target.blendDstAlpha = BlendFactor.ONE_MINUS_SRC_ALPHA;
            target.blendDst = this._dstBlendFactor;
            target.blendSrc = this._srcBlendFactor;

            if (this.renderData) {
              this.renderData.passDirty = true;
            }
          }

          this.updateBlendHash();
        };

        _proto.getBlendState = function getBlendState() {
          return this._blendState;
        } // pos, rot, scale changed
        ;

        _proto._nodeStateChange = function _nodeStateChange(transformType) {
          if (this._renderData) {
            this.markForUpdateRenderData();
          }

          for (var i = 0; i < this.node.children.length; ++i) {
            var child = this.node.children[i];
            var renderComp = child.getComponent(Renderable2D);

            if (renderComp) {
              renderComp.markForUpdateRenderData();
            }
          }
        };

        _proto._onMaterialModified = function _onMaterialModified(idx, material) {
          if (this._renderData) {
            this.markForUpdateRenderData();
            this._renderData.passDirty = true;
          }

          _RenderableComponent.prototype._onMaterialModified.call(this, idx, material);
        } // macro.UI_GPU_DRIVEN
        ;

        _proto._updateBuiltinMaterial = function _updateBuiltinMaterial() {
          var gpuMat = '';

          if (UI_GPU_DRIVEN) {
            if (this._canDrawByFourVertex) {
              gpuMat = '-gpu';
            }
          }

          var mat;

          switch (this._instanceMaterialType) {
            case InstanceMaterialType.ADD_COLOR:
              mat = builtinResMgr.get("ui-base" + gpuMat + "-material");
              break;

            case InstanceMaterialType.GRAYSCALE:
              mat = builtinResMgr.get("ui-sprite-gray" + gpuMat + "-material");
              break;

            case InstanceMaterialType.USE_ALPHA_SEPARATED:
              mat = builtinResMgr.get("ui-sprite-alpha-sep" + gpuMat + "-material");
              break;

            case InstanceMaterialType.USE_ALPHA_SEPARATED_AND_GRAY:
              mat = builtinResMgr.get("ui-sprite-gray-alpha-sep" + gpuMat + "-material");
              break;

            default:
              mat = builtinResMgr.get("ui-sprite" + gpuMat + "-material");
              break;
          }

          return mat;
        };

        _proto.setNodeDirty = function setNodeDirty() {
          if (this.renderData) {
            this.renderData.nodeDirty = true;
          }
        };

        _proto.setTextureDirty = function setTextureDirty() {
          if (this.renderData) {
            this.renderData.textureDirty = true;
          }
        };

        _createClass(Renderable2D, [{
          key: "sharedMaterials",
          get: function get() {
            // if we don't create an array copy, the editor will modify the original array directly.
            return EDITOR && this._materials.slice() || this._materials;
          },
          set: function set(val) {
            for (var i = 0; i < val.length; i++) {
              if (val[i] !== this._materials[i]) {
                this.setMaterial(val[i], i);
              }
            }

            if (val.length < this._materials.length) {
              for (var _i = val.length; _i < this._materials.length; _i++) {
                this.setMaterial(null, _i);
              }

              this._materials.splice(val.length);
            }
          }
        }, {
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
          }
        }, {
          key: "srcBlendFactor",
          get: function get() {
            if (!EDITOR && this._customMaterial) {
              warnID(12001);
            }

            return this._srcBlendFactor;
          },
          set: function set(value) {
            if (this._customMaterial) {
              warnID(12001);
              return;
            }

            if (this._srcBlendFactor === value) {
              return;
            }

            this._srcBlendFactor = value;

            this._updateBlendFunc();
          }
          /**
           * @en Specifies the destination blend mode.
           * @zh 指定目标的混合模式，这会克隆一个新的材质对象，注意这带来的性能和内存损耗。
           * @example
           * ```ts
           * sprite.dstBlendFactor = BlendFactor.ONE_MINUS_SRC_ALPHA;
           * ```
           * @deprecated
           */

        }, {
          key: "dstBlendFactor",
          get: function get() {
            if (!EDITOR && this._customMaterial) {
              warnID(12001);
            }

            return this._dstBlendFactor;
          },
          set: function set(value) {
            if (this._customMaterial) {
              warnID(12001);
              return;
            }

            if (this._dstBlendFactor === value) {
              return;
            }

            this._dstBlendFactor = value;

            this._updateBlendFunc();
          }
          /**
           * @en Main color for rendering, it normally multiplies with texture color.
           * @zh 渲染颜色，一般情况下会和贴图颜色相乘。
           */

        }, {
          key: "color",
          get: function get() {
            return this._color;
          },
          set: function set(value) {
            if (this._color.equals(value)) {
              return;
            }

            var oldAlpha = this._color.a;

            this._color.set(value);

            if (oldAlpha !== this.color.a) {
              NodeUIProperties.markOpacityTree(this.node);
            }

            this._colorDirty = true;

            if (EDITOR) {
              var clone = value.clone();
              this.node.emit(NodeEventType.COLOR_CHANGED, clone);
            }
          }
        }, {
          key: "renderData",
          get: function get() {
            return this._renderData;
          } // Render data can be submitted even if it is not on the node tree

        }, {
          key: "delegateSrc",
          set: function set(value) {
            this._delegateSrc = value;
          }
          /**
           * @en The component stencil stage (please do not any modification directly on this object)
           * @zh 组件模板缓冲状态 (注意：请不要直接修改它的值)
           */

        }, {
          key: "blendHash",
          get: function get() {
            return this._blendHash;
          }
        }]);

        return Renderable2D;
      }(RenderableComponent), _class3.BlendState = BlendFactor, _class3.Assembler = null, _class3.PostAssembler = null, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_materials", [override], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [override, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_customMaterial", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "customMaterial", [_dec5, _dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "customMaterial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "color", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_srcBlendFactor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return BlendFactor.SRC_ALPHA;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_dstBlendFactor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return BlendFactor.ONE_MINUS_SRC_ALPHA;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_color", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE.clone();
        }
      })), _class2)) || _class) || _class) || _class) || _class));

      legacyCC.internal.Renderable2D = Renderable2D;
    }
  };
});
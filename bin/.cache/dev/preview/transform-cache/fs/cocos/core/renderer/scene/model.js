System.register("q-bundled:///fs/cocos/core/renderer/scene/model.js", ["../../../../../virtual/internal%253Aconstants.js", "../../builtin/builtin-res-mgr.js", "../../geometry/aabb.js", "../../scene-graph/layers.js", "./submodel.js", "../core/pass.js", "../../global-exports.js", "../../math/index.js", "../../gfx/index.js", "../../pipeline/define.js", "./native-scene.js"], function (_export, _context) {
  "use strict";

  var JSB, builtinResMgr, AABB, Layers, SubModel, BatchingSchemes, legacyCC, Mat4, Vec4, Attribute, BufferInfo, getTypedArrayConstructor, BufferUsageBit, FormatInfos, MemoryUsageBit, Filter, Address, Feature, SamplerInfo, INST_MAT_WORLD, UBOLocal, UBOWorldBound, UNIFORM_LIGHTMAP_TEXTURE_BINDING, NativeModel, m4_1, shadowMapPatches, ModelType, lightmapSamplerHash, lightmapSamplerWithMipHash, Model;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function uploadMat4AsVec4x3(mat, v1, v2, v3) {
    v1[0] = mat.m00;
    v1[1] = mat.m01;
    v1[2] = mat.m02;
    v1[3] = mat.m12;
    v2[0] = mat.m04;
    v2[1] = mat.m05;
    v2[2] = mat.m06;
    v2[3] = mat.m13;
    v3[0] = mat.m08;
    v3[1] = mat.m09;
    v3[2] = mat.m10;
    v3[3] = mat.m14;
  }

  _export("ModelType", void 0);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_builtinBuiltinResMgrJs) {
      builtinResMgr = _builtinBuiltinResMgrJs.builtinResMgr;
    }, function (_geometryAabbJs) {
      AABB = _geometryAabbJs.AABB;
    }, function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }, function (_submodelJs) {
      SubModel = _submodelJs.SubModel;
    }, function (_corePassJs) {
      BatchingSchemes = _corePassJs.BatchingSchemes;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
      Vec4 = _mathIndexJs.Vec4;
    }, function (_gfxIndexJs) {
      Attribute = _gfxIndexJs.Attribute;
      BufferInfo = _gfxIndexJs.BufferInfo;
      getTypedArrayConstructor = _gfxIndexJs.getTypedArrayConstructor;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      FormatInfos = _gfxIndexJs.FormatInfos;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      Filter = _gfxIndexJs.Filter;
      Address = _gfxIndexJs.Address;
      Feature = _gfxIndexJs.Feature;
      SamplerInfo = _gfxIndexJs.SamplerInfo;
    }, function (_pipelineDefineJs) {
      INST_MAT_WORLD = _pipelineDefineJs.INST_MAT_WORLD;
      UBOLocal = _pipelineDefineJs.UBOLocal;
      UBOWorldBound = _pipelineDefineJs.UBOWorldBound;
      UNIFORM_LIGHTMAP_TEXTURE_BINDING = _pipelineDefineJs.UNIFORM_LIGHTMAP_TEXTURE_BINDING;
    }, function (_nativeSceneJs) {
      NativeModel = _nativeSceneJs.NativeModel;
    }],
    execute: function () {
      m4_1 = new Mat4();
      shadowMapPatches = [{
        name: 'CC_ENABLE_DIR_SHADOW',
        value: true
      }, {
        name: 'CC_RECEIVE_SHADOW',
        value: true
      }];

      (function (ModelType) {
        ModelType[ModelType["DEFAULT"] = 0] = "DEFAULT";
        ModelType[ModelType["SKINNING"] = 1] = "SKINNING";
        ModelType[ModelType["BAKED_SKINNING"] = 2] = "BAKED_SKINNING";
        ModelType[ModelType["BATCH_2D"] = 3] = "BATCH_2D";
        ModelType[ModelType["PARTICLE_BATCH"] = 4] = "PARTICLE_BATCH";
        ModelType[ModelType["LINE"] = 5] = "LINE";
      })(ModelType || _export("ModelType", ModelType = {}));

      lightmapSamplerHash = new SamplerInfo(Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP);
      lightmapSamplerWithMipHash = new SamplerInfo(Filter.LINEAR, Filter.LINEAR, Filter.LINEAR, Address.CLAMP, Address.CLAMP, Address.CLAMP);
      /**
       * A representation of a model
       */

      _export("Model", Model = /*#__PURE__*/function () {
        /**
         * Setup a default empty model
         */
        function Model() {
          this.type = ModelType.DEFAULT;
          this.scene = null;
          this.isDynamicBatching = false;
          this.instancedAttributes = {
            buffer: null,
            views: [],
            attributes: []
          };
          this._worldBounds = null;
          this._modelBounds = null;
          this._subModels = [];
          this._node = null;
          this._transform = null;
          this._device = void 0;
          this._inited = false;
          this._descriptorSetCount = 1;
          this._updateStamp = -1;
          this._localDataUpdated = true;
          this._localData = new Float32Array(UBOLocal.COUNT);
          this._localBuffer = null;
          this._instMatWorldIdx = -1;
          this._lightmap = null;
          this._lightmapUVParam = new Vec4();
          this._worldBoundBuffer = null;
          this._receiveShadow = false;
          this._castShadow = false;
          this._enabled = true;
          this._visFlags = Layers.Enum.NONE;
          this._device = legacyCC.director.root.device;
        }

        var _proto = Model.prototype;

        _proto._setReceiveShadow = function _setReceiveShadow(val) {
          this._receiveShadow = val;

          if (JSB) {
            this._nativeObj.setReceiveShadow(val);
          }
        };

        _proto._init = function _init() {
          if (JSB) {
            this._nativeObj = new NativeModel();
          }
        };

        _proto.initialize = function initialize() {
          if (this._inited) {
            return;
          }

          this._init();

          this._setReceiveShadow(true);

          this.castShadow = false;
          this.enabled = true;
          this.visFlags = Layers.Enum.NONE;
          this._inited = true;
        };

        _proto._destroySubmodel = function _destroySubmodel(subModel) {
          subModel.destroy();
        };

        _proto._destroy = function _destroy() {
          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto.destroy = function destroy() {
          var subModels = this._subModels;

          for (var i = 0; i < subModels.length; i++) {
            var subModel = this._subModels[i];

            this._destroySubmodel(subModel);
          }

          if (this._localBuffer) {
            this._localBuffer.destroy();

            this._localBuffer = null;
          }

          if (this._worldBoundBuffer) {
            this._worldBoundBuffer.destroy();

            this._worldBoundBuffer = null;
          }

          this._worldBounds = null;
          this._modelBounds = null;
          this._subModels.length = 0;
          this._inited = false;
          this._localDataUpdated = true;
          this._transform = null;
          this._node = null;
          this.isDynamicBatching = false;

          this._destroy();
        };

        _proto.attachToScene = function attachToScene(scene) {
          this.scene = scene;
          this._localDataUpdated = true;
        };

        _proto.detachFromScene = function detachFromScene() {
          this.scene = null;
        };

        _proto.updateTransform = function updateTransform(stamp) {
          var node = this.transform; // @ts-expect-error TS2445

          if (node.hasChangedFlags || node._dirtyFlags) {
            node.updateWorldTransform();
            this._localDataUpdated = true;
            var worldBounds = this._worldBounds;

            if (this._modelBounds && worldBounds) {
              // @ts-expect-error TS2445
              this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);
            }
          }
        };

        _proto.updateWorldBound = function updateWorldBound() {
          var node = this.transform;

          if (node !== null) {
            node.updateWorldTransform();
            this._localDataUpdated = true;
            var worldBounds = this._worldBounds;

            if (this._modelBounds && worldBounds) {
              // @ts-expect-error TS2445
              this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);
            }
          }
        };

        _proto._applyLocalData = function _applyLocalData() {
          if (JSB) {// this._nativeObj!.setLocalData(this._localData);
          }
        };

        _proto._applyLocalBuffer = function _applyLocalBuffer() {
          if (JSB) {
            this._nativeObj.setLocalBuffer(this._localBuffer);
          }
        };

        _proto._applyWorldBoundBuffer = function _applyWorldBoundBuffer() {
          if (JSB) {
            this._nativeObj.setWorldBoundBuffer(this._worldBoundBuffer);
          }
        };

        _proto.updateUBOs = function updateUBOs(stamp) {
          var subModels = this._subModels;

          for (var i = 0; i < subModels.length; i++) {
            subModels[i].update();
          }

          this._updateStamp = stamp;

          if (!this._localDataUpdated) {
            return;
          }

          this._localDataUpdated = false; // @ts-expect-error using private members here for efficiency

          var worldMatrix = this.transform._mat;
          var idx = this._instMatWorldIdx;

          if (idx >= 0) {
            var attrs = this.instancedAttributes.views;
            uploadMat4AsVec4x3(worldMatrix, attrs[idx], attrs[idx + 1], attrs[idx + 2]);
          } else if (this._localBuffer) {
            Mat4.toArray(this._localData, worldMatrix, UBOLocal.MAT_WORLD_OFFSET);
            Mat4.inverseTranspose(m4_1, worldMatrix);

            if (!JSB) {
              // fix precision lost of webGL on android device
              // scale worldIT mat to around 1.0 by product its sqrt of determinant.
              var det = Math.abs(Mat4.determinant(m4_1));
              var factor = 1.0 / Math.sqrt(det);
              Mat4.multiplyScalar(m4_1, m4_1, factor);
            }

            Mat4.toArray(this._localData, m4_1, UBOLocal.MAT_WORLD_IT_OFFSET);

            this._localBuffer.update(this._localData);

            this._applyLocalData();

            this._applyLocalBuffer();
          }
        };

        _proto._updateNativeBounds = function _updateNativeBounds() {
          if (JSB) {
            this._nativeObj.setBounds(this._worldBounds["native"]);
          }
        }
        /**
         * Create the bounding shape of this model
         * @param minPos the min position of the model
         * @param maxPos the max position of the model
         */
        ;

        _proto.createBoundingShape = function createBoundingShape(minPos, maxPos) {
          if (!minPos || !maxPos) {
            return;
          }

          this._modelBounds = AABB.fromPoints(AABB.create(), minPos, maxPos);
          this._worldBounds = AABB.clone(this._modelBounds);

          this._updateNativeBounds();
        };

        _proto._createSubModel = function _createSubModel() {
          return new SubModel();
        };

        _proto.initSubModel = function initSubModel(idx, subMeshData, mat) {
          this.initialize();
          var isNewSubModel = false;

          if (this._subModels[idx] == null) {
            this._subModels[idx] = this._createSubModel();
            isNewSubModel = true;
          } else {
            this._subModels[idx].destroy();
          }

          this._subModels[idx].initialize(subMeshData, mat.passes, this.getMacroPatches(idx)); // This is a temporary solution
          // It should not be written in a fixed way, or modified by the user


          this._subModels[idx].initPlanarShadowShader();

          this._subModels[idx].initPlanarShadowInstanceShader();

          this._updateAttributesAndBinding(idx);

          if (JSB) {
            this._nativeObj.setSubModel(idx, this._subModels[idx]["native"]);
          }
        };

        _proto.setSubModelMesh = function setSubModelMesh(idx, subMesh) {
          if (!this._subModels[idx]) {
            return;
          }

          this._subModels[idx].subMesh = subMesh;
        };

        _proto.setSubModelMaterial = function setSubModelMaterial(idx, mat) {
          if (!this._subModels[idx]) {
            return;
          }

          this._subModels[idx].passes = mat.passes;

          this._updateAttributesAndBinding(idx);
        };

        _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {
          var subModels = this._subModels;

          for (var i = 0; i < subModels.length; i++) {
            subModels[i].onPipelineStateChanged();
          }
        };

        _proto.onMacroPatchesStateChanged = function onMacroPatchesStateChanged() {
          var subModels = this._subModels;

          for (var i = 0; i < subModels.length; i++) {
            subModels[i].onMacroPatchesStateChanged(this.getMacroPatches(i));
          }
        };

        _proto.updateLightingmap = function updateLightingmap(texture, uvParam) {
          Vec4.toArray(this._localData, uvParam, UBOLocal.LIGHTINGMAP_UVPARAM);
          this._localDataUpdated = true;
          this._lightmap = texture;
          this._lightmapUVParam = uvParam;

          if (texture === null) {
            texture = builtinResMgr.get('empty-texture');
          }

          var gfxTexture = texture.getGFXTexture();

          if (gfxTexture) {
            var sampler = this._device.getSampler(texture.mipmaps.length > 1 ? lightmapSamplerWithMipHash : lightmapSamplerHash);

            var subModels = this._subModels;

            for (var i = 0; i < subModels.length; i++) {
              var descriptorSet = subModels[i].descriptorSet; // TODO: should manage lightmap macro switches automatically
              // USE_LIGHTMAP -> CC_USE_LIGHTMAP

              descriptorSet.bindTexture(UNIFORM_LIGHTMAP_TEXTURE_BINDING, gfxTexture);
              descriptorSet.bindSampler(UNIFORM_LIGHTMAP_TEXTURE_BINDING, sampler);
              descriptorSet.update();
            }
          }
        };

        _proto.getMacroPatches = function getMacroPatches(subModelIndex) {
          return this.receiveShadow ? shadowMapPatches : null;
        };

        _proto._updateAttributesAndBinding = function _updateAttributesAndBinding(subModelIndex) {
          var subModel = this._subModels[subModelIndex];

          if (!subModel) {
            return;
          }

          this._initLocalDescriptors(subModelIndex);

          this._updateLocalDescriptors(subModelIndex, subModel.descriptorSet);

          this._initWorldBoundDescriptors(subModelIndex);

          this._updateWorldBoundDescriptors(subModelIndex, subModel.worldBoundDescriptorSet);

          var shader = subModel.passes[0].getShaderVariant(subModel.patches);

          this._updateInstancedAttributes(shader.attributes, subModel.passes[0]);
        };

        _proto._getInstancedAttributeIndex = function _getInstancedAttributeIndex(name) {
          var attributes = this.instancedAttributes.attributes;

          for (var i = 0; i < attributes.length; i++) {
            if (attributes[i].name === name) {
              return i;
            }
          }

          return -1;
        };

        _proto._setInstMatWorldIdx = function _setInstMatWorldIdx(idx) {
          this._instMatWorldIdx = idx;

          if (JSB) {
            this._nativeObj.setInstMatWorldIdx(idx);
          }
        } // sub-classes can override the following functions if needed
        // for now no submodel level instancing attributes
        ;

        _proto._updateInstancedAttributes = function _updateInstancedAttributes(attributes, pass) {
          if (!pass.device.hasFeature(Feature.INSTANCED_ARRAYS)) {
            return;
          } // free old data


          var size = 0;

          for (var j = 0; j < attributes.length; j++) {
            var attribute = attributes[j];

            if (!attribute.isInstanced) {
              continue;
            }

            size += FormatInfos[attribute.format].size;
          }

          var attrs = this.instancedAttributes;
          attrs.buffer = new Uint8Array(size);
          attrs.views.length = attrs.attributes.length = 0;
          var offset = 0;

          for (var _j = 0; _j < attributes.length; _j++) {
            var _attribute = attributes[_j];

            if (!_attribute.isInstanced) {
              continue;
            }

            var attr = new Attribute();
            attr.format = _attribute.format;
            attr.name = _attribute.name;
            attr.isNormalized = _attribute.isNormalized;
            attr.location = _attribute.location;
            attrs.attributes.push(attr);
            var info = FormatInfos[_attribute.format];
            var typeViewArray = new (getTypedArrayConstructor(info))(attrs.buffer.buffer, offset, info.count);
            attrs.views.push(typeViewArray);
            offset += info.size;
          }

          if (pass.batchingScheme === BatchingSchemes.INSTANCING) {
            pass.getInstancedBuffer().destroy();
          } // instancing IA changed


          this._setInstMatWorldIdx(this._getInstancedAttributeIndex(INST_MAT_WORLD));

          this._localDataUpdated = true;

          if (JSB) {
            this._nativeObj.setInstancedAttrBlock(attrs.buffer.buffer, attrs.views, attrs.attributes);
          }
        };

        _proto._initLocalDescriptors = function _initLocalDescriptors(subModelIndex) {
          if (!this._localBuffer) {
            this._localBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, UBOLocal.SIZE, UBOLocal.SIZE));

            this._applyLocalBuffer();
          }
        };

        _proto._initWorldBoundDescriptors = function _initWorldBoundDescriptors(subModelIndex) {
          if (!this._worldBoundBuffer) {
            this._worldBoundBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, UBOWorldBound.SIZE, UBOWorldBound.SIZE));

            this._applyWorldBoundBuffer();
          }
        };

        _proto._updateLocalDescriptors = function _updateLocalDescriptors(subModelIndex, descriptorSet) {
          if (this._localBuffer) descriptorSet.bindBuffer(UBOLocal.BINDING, this._localBuffer);
        };

        _proto._updateWorldBoundDescriptors = function _updateWorldBoundDescriptors(subModelIndex, descriptorSet) {
          if (this._worldBoundBuffer) descriptorSet.bindBuffer(UBOWorldBound.BINDING, this._worldBoundBuffer);
        };

        _createClass(Model, [{
          key: "subModels",
          get: function get() {
            return this._subModels;
          }
        }, {
          key: "inited",
          get: function get() {
            return this._inited;
          }
        }, {
          key: "worldBounds",
          get: function get() {
            return this._worldBounds;
          }
        }, {
          key: "modelBounds",
          get: function get() {
            return this._modelBounds;
          }
        }, {
          key: "localBuffer",
          get: function get() {
            return this._localBuffer;
          }
        }, {
          key: "worldBoundBuffer",
          get: function get() {
            return this._worldBoundBuffer;
          }
        }, {
          key: "updateStamp",
          get: function get() {
            return this._updateStamp;
          }
        }, {
          key: "isInstancingEnabled",
          get: function get() {
            return this._instMatWorldIdx >= 0;
          }
        }, {
          key: "receiveShadow",
          get: function get() {
            return this._receiveShadow;
          },
          set: function set(val) {
            this._setReceiveShadow(val);

            this.onMacroPatchesStateChanged();
          }
        }, {
          key: "castShadow",
          get: function get() {
            return this._castShadow;
          },
          set: function set(val) {
            this._castShadow = val;

            if (JSB) {
              this._nativeObj.setCastShadow(val);
            }
          }
        }, {
          key: "node",
          get: function get() {
            return this._node;
          },
          set: function set(n) {
            this._node = n;

            if (JSB) {
              this._nativeObj.setNode(n["native"]);
            }
          }
        }, {
          key: "transform",
          get: function get() {
            return this._transform;
          },
          set: function set(n) {
            this._transform = n;

            if (JSB) {
              this._nativeObj.setTransform(n["native"]);
            }
          }
        }, {
          key: "visFlags",
          get: function get() {
            return this._visFlags;
          },
          set: function set(val) {
            this._visFlags = val;

            if (JSB) {
              this._nativeObj.seVisFlag(val);
            }
          }
        }, {
          key: "enabled",
          get: function get() {
            return this._enabled;
          },
          set: function set(val) {
            this._enabled = val;

            if (JSB) {
              this._nativeObj.setEnabled(val);
            }
          }
        }, {
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }]);

        return Model;
      }());
    }
  };
});
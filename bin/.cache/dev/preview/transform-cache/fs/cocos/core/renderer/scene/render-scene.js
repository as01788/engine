System.register("q-bundled:///fs/cocos/core/renderer/scene/render-scene.js", ["../../../../../virtual/internal%253Aconstants.js", "./model.js", "../../scene-graph/node-enum.js", "./native-scene.js"], function (_export, _context) {
  "use strict";

  var JSB, ModelType, TransformBit, NativeRenderScene, RenderScene;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_modelJs) {
      ModelType = _modelJs.ModelType;
    }, function (_sceneGraphNodeEnumJs) {
      TransformBit = _sceneGraphNodeEnumJs.TransformBit;
    }, function (_nativeSceneJs) {
      NativeRenderScene = _nativeSceneJs.NativeRenderScene;
    }],
    execute: function () {
      _export("RenderScene", RenderScene = /*#__PURE__*/function () {
        RenderScene.registerCreateFunc = function registerCreateFunc(root) {
          root._createSceneFun = function (_root) {
            return new RenderScene(_root);
          };
        };

        function RenderScene(root) {
          this._root = void 0;
          this._name = '';
          this._cameras = [];
          this._models = [];
          this._batches = [];
          this._directionalLights = [];
          this._sphereLights = [];
          this._spotLights = [];
          this._mainLight = null;
          this._modelId = 0;
          this._root = root;

          this._createNativeObject();
        }

        var _proto = RenderScene.prototype;

        _proto.initialize = function initialize(info) {
          this._name = info.name;
          return true;
        };

        _proto.activate = function activate() {
          if (JSB) {
            this._nativeObj.activate();
          }
        };

        _proto.update = function update(stamp) {
          if (JSB) {
            var nativeBatches = [];

            for (var i = 0, len = this._batches.length; i < len; ++i) {
              nativeBatches.push(this._batches[i]["native"]);
            }

            this._nativeObj.updateBatches(nativeBatches);

            this._nativeObj.update(stamp);

            return;
          }

          var mainLight = this._mainLight;

          if (mainLight) {
            mainLight.update();
          }

          var sphereLights = this._sphereLights;

          for (var _i = 0; _i < sphereLights.length; _i++) {
            var light = sphereLights[_i];
            light.update();
          }

          var spotLights = this._spotLights;

          for (var _i2 = 0; _i2 < spotLights.length; _i2++) {
            var _light = spotLights[_i2];

            _light.update();
          }

          var models = this._models;

          for (var _i3 = 0; _i3 < models.length; _i3++) {
            var model = models[_i3];

            if (model.enabled) {
              model.updateTransform(stamp);
              model.updateUBOs(stamp);
            }
          }
        };

        _proto._destroy = function _destroy() {
          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto.destroy = function destroy() {
          this.removeCameras();
          this.removeSphereLights();
          this.removeSpotLights();
          this.removeModels();

          this._destroy();
        };

        _proto.addCamera = function addCamera(cam) {
          cam.attachToScene(this);

          this._cameras.push(cam);
        };

        _proto.removeCamera = function removeCamera(camera) {
          for (var i = 0; i < this._cameras.length; ++i) {
            if (this._cameras[i] === camera) {
              this._cameras.splice(i, 1);

              camera.detachFromScene();
              return;
            }
          }
        };

        _proto.removeCameras = function removeCameras() {
          for (var _iterator = _createForOfIteratorHelperLoose(this._cameras), _step; !(_step = _iterator()).done;) {
            var camera = _step.value;
            camera.detachFromScene();
          }

          this._cameras.splice(0);
        };

        _proto.setMainLight = function setMainLight(dl) {
          this._mainLight = dl;

          if (JSB) {
            this._nativeObj.setMainLight(dl ? dl["native"] : null);
          }
        };

        _proto.unsetMainLight = function unsetMainLight(dl) {
          if (this._mainLight === dl) {
            var dlList = this._directionalLights;

            if (dlList.length) {
              this.setMainLight(dlList[dlList.length - 1]);

              if (this._mainLight.node) {
                // trigger update
                this._mainLight.node.hasChangedFlags |= TransformBit.ROTATION;
              }

              return;
            }

            this.setMainLight(null);
          }
        };

        _proto.addDirectionalLight = function addDirectionalLight(dl) {
          dl.attachToScene(this);

          this._directionalLights.push(dl);
        };

        _proto.removeDirectionalLight = function removeDirectionalLight(dl) {
          for (var i = 0; i < this._directionalLights.length; ++i) {
            if (this._directionalLights[i] === dl) {
              dl.detachFromScene();

              this._directionalLights.splice(i, 1);

              return;
            }
          }
        };

        _proto.addSphereLight = function addSphereLight(pl) {
          pl.attachToScene(this);

          this._sphereLights.push(pl);

          if (JSB) {
            this._nativeObj.addSphereLight(pl["native"]);
          }
        };

        _proto.removeSphereLight = function removeSphereLight(pl) {
          for (var i = 0; i < this._sphereLights.length; ++i) {
            if (this._sphereLights[i] === pl) {
              pl.detachFromScene();

              this._sphereLights.splice(i, 1);

              if (JSB) {
                this._nativeObj.removeSphereLight(pl["native"]);
              }

              return;
            }
          }
        };

        _proto.addSpotLight = function addSpotLight(sl) {
          sl.attachToScene(this);

          this._spotLights.push(sl);

          if (JSB) {
            this._nativeObj.addSpotLight(sl["native"]);
          }
        };

        _proto.removeSpotLight = function removeSpotLight(sl) {
          for (var i = 0; i < this._spotLights.length; ++i) {
            if (this._spotLights[i] === sl) {
              sl.detachFromScene();

              this._spotLights.splice(i, 1);

              if (JSB) {
                this._nativeObj.removeSpotLight(sl["native"]);
              }

              return;
            }
          }
        };

        _proto.removeSphereLights = function removeSphereLights() {
          for (var i = 0; i < this._sphereLights.length; ++i) {
            this._sphereLights[i].detachFromScene();
          }

          this._sphereLights.length = 0;

          if (JSB) {
            this._nativeObj.removeSphereLights();
          }
        };

        _proto.removeSpotLights = function removeSpotLights() {
          for (var i = 0; i < this._spotLights.length; ++i) {
            this._spotLights[i].detachFromScene();
          }

          this._spotLights = [];

          if (JSB) {
            this._nativeObj.removeSpotLights();
          }
        };

        _proto.addModel = function addModel(m) {
          m.attachToScene(this);

          this._models.push(m);

          if (JSB) {
            switch (m.type) {
              case ModelType.SKINNING:
                this._nativeObj.addSkinningModel(m["native"]);

                break;

              case ModelType.BAKED_SKINNING:
                this._nativeObj.addBakedSkinningModel(m["native"]);

                break;

              case ModelType.DEFAULT:
              default:
                this._nativeObj.addModel(m["native"]);

            }
          }
        };

        _proto.removeModel = function removeModel(model) {
          for (var i = 0; i < this._models.length; ++i) {
            if (this._models[i] === model) {
              model.detachFromScene();

              this._models.splice(i, 1);

              if (JSB) {
                this._nativeObj.removeModel(i);
              }

              return;
            }
          }
        };

        _proto.removeModels = function removeModels() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this._models), _step2; !(_step2 = _iterator2()).done;) {
            var m = _step2.value;
            m.detachFromScene();
            m.destroy();
          }

          this._models.length = 0;

          if (JSB) {
            this._nativeObj.removeModels();
          }
        };

        _proto.addBatch = function addBatch(batch) {
          this._batches.push(batch);
        };

        _proto.removeBatch = function removeBatch(batch) {
          for (var i = 0; i < this._batches.length; ++i) {
            if (this._batches[i] === batch) {
              this._batches.splice(i, 1);

              if (JSB) {
                this._nativeObj.removeBatch(i);
              }

              return;
            }
          }
        };

        _proto.removeBatches = function removeBatches() {
          this._batches.length = 0;

          if (JSB) {
            this._nativeObj.removeBatches();
          }
        };

        _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this._models), _step3; !(_step3 = _iterator3()).done;) {
            var m = _step3.value;
            m.onGlobalPipelineStateChanged();
          }
        };

        _proto.generateModelId = function generateModelId() {
          return this._modelId++;
        };

        _proto._createNativeObject = function _createNativeObject() {
          if (JSB && !this._nativeObj) {
            this._nativeObj = new NativeRenderScene();
          }
        };

        _createClass(RenderScene, [{
          key: "root",
          get: function get() {
            return this._root;
          }
        }, {
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "cameras",
          get: function get() {
            return this._cameras;
          }
        }, {
          key: "mainLight",
          get: function get() {
            return this._mainLight;
          }
        }, {
          key: "sphereLights",
          get: function get() {
            return this._sphereLights;
          }
        }, {
          key: "spotLights",
          get: function get() {
            return this._spotLights;
          }
        }, {
          key: "models",
          get: function get() {
            return this._models;
          }
        }, {
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }, {
          key: "batches",
          get: function get() {
            return this._batches;
          }
        }]);

        return RenderScene;
      }());
    }
  };
});
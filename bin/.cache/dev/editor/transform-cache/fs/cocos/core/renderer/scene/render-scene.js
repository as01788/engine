"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderScene = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _model = require("./model.js");

var _nodeEnum = require("../../scene-graph/node-enum.js");

var _nativeScene = require("./native-scene.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
class RenderScene {
  get root() {
    return this._root;
  }

  get name() {
    return this._name;
  }

  get cameras() {
    return this._cameras;
  }

  get mainLight() {
    return this._mainLight;
  }

  get sphereLights() {
    return this._sphereLights;
  }

  get spotLights() {
    return this._spotLights;
  }

  get models() {
    return this._models;
  }

  get native() {
    return this._nativeObj;
  }

  get batches() {
    return this._batches;
  }

  static registerCreateFunc(root) {
    root._createSceneFun = _root => new RenderScene(_root);
  }

  constructor(root) {
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

  initialize(info) {
    this._name = info.name;
    return true;
  }

  activate() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj.activate();
    }
  }

  update(stamp) {
    if (_internal253Aconstants.JSB) {
      const nativeBatches = [];

      for (let i = 0, len = this._batches.length; i < len; ++i) {
        nativeBatches.push(this._batches[i].native);
      }

      this._nativeObj.updateBatches(nativeBatches);

      this._nativeObj.update(stamp);

      return;
    }

    const mainLight = this._mainLight;

    if (mainLight) {
      mainLight.update();
    }

    const sphereLights = this._sphereLights;

    for (let i = 0; i < sphereLights.length; i++) {
      const light = sphereLights[i];
      light.update();
    }

    const spotLights = this._spotLights;

    for (let i = 0; i < spotLights.length; i++) {
      const light = spotLights[i];
      light.update();
    }

    const models = this._models;

    for (let i = 0; i < models.length; i++) {
      const model = models[i];

      if (model.enabled) {
        model.updateTransform(stamp);
        model.updateUBOs(stamp);
      }
    }
  }

  _destroy() {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = null;
    }
  }

  destroy() {
    this.removeCameras();
    this.removeSphereLights();
    this.removeSpotLights();
    this.removeModels();

    this._destroy();
  }

  addCamera(cam) {
    cam.attachToScene(this);

    this._cameras.push(cam);
  }

  removeCamera(camera) {
    for (let i = 0; i < this._cameras.length; ++i) {
      if (this._cameras[i] === camera) {
        this._cameras.splice(i, 1);

        camera.detachFromScene();
        return;
      }
    }
  }

  removeCameras() {
    for (const camera of this._cameras) {
      camera.detachFromScene();
    }

    this._cameras.splice(0);
  }

  setMainLight(dl) {
    this._mainLight = dl;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.setMainLight(dl ? dl.native : null);
    }
  }

  unsetMainLight(dl) {
    if (this._mainLight === dl) {
      const dlList = this._directionalLights;

      if (dlList.length) {
        this.setMainLight(dlList[dlList.length - 1]);

        if (this._mainLight.node) {
          // trigger update
          this._mainLight.node.hasChangedFlags |= _nodeEnum.TransformBit.ROTATION;
        }

        return;
      }

      this.setMainLight(null);
    }
  }

  addDirectionalLight(dl) {
    dl.attachToScene(this);

    this._directionalLights.push(dl);
  }

  removeDirectionalLight(dl) {
    for (let i = 0; i < this._directionalLights.length; ++i) {
      if (this._directionalLights[i] === dl) {
        dl.detachFromScene();

        this._directionalLights.splice(i, 1);

        return;
      }
    }
  }

  addSphereLight(pl) {
    pl.attachToScene(this);

    this._sphereLights.push(pl);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.addSphereLight(pl.native);
    }
  }

  removeSphereLight(pl) {
    for (let i = 0; i < this._sphereLights.length; ++i) {
      if (this._sphereLights[i] === pl) {
        pl.detachFromScene();

        this._sphereLights.splice(i, 1);

        if (_internal253Aconstants.JSB) {
          this._nativeObj.removeSphereLight(pl.native);
        }

        return;
      }
    }
  }

  addSpotLight(sl) {
    sl.attachToScene(this);

    this._spotLights.push(sl);

    if (_internal253Aconstants.JSB) {
      this._nativeObj.addSpotLight(sl.native);
    }
  }

  removeSpotLight(sl) {
    for (let i = 0; i < this._spotLights.length; ++i) {
      if (this._spotLights[i] === sl) {
        sl.detachFromScene();

        this._spotLights.splice(i, 1);

        if (_internal253Aconstants.JSB) {
          this._nativeObj.removeSpotLight(sl.native);
        }

        return;
      }
    }
  }

  removeSphereLights() {
    for (let i = 0; i < this._sphereLights.length; ++i) {
      this._sphereLights[i].detachFromScene();
    }

    this._sphereLights.length = 0;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.removeSphereLights();
    }
  }

  removeSpotLights() {
    for (let i = 0; i < this._spotLights.length; ++i) {
      this._spotLights[i].detachFromScene();
    }

    this._spotLights = [];

    if (_internal253Aconstants.JSB) {
      this._nativeObj.removeSpotLights();
    }
  }

  addModel(m) {
    m.attachToScene(this);

    this._models.push(m);

    if (_internal253Aconstants.JSB) {
      switch (m.type) {
        case _model.ModelType.SKINNING:
          this._nativeObj.addSkinningModel(m.native);

          break;

        case _model.ModelType.BAKED_SKINNING:
          this._nativeObj.addBakedSkinningModel(m.native);

          break;

        case _model.ModelType.DEFAULT:
        default:
          this._nativeObj.addModel(m.native);

      }
    }
  }

  removeModel(model) {
    for (let i = 0; i < this._models.length; ++i) {
      if (this._models[i] === model) {
        model.detachFromScene();

        this._models.splice(i, 1);

        if (_internal253Aconstants.JSB) {
          this._nativeObj.removeModel(i);
        }

        return;
      }
    }
  }

  removeModels() {
    for (const m of this._models) {
      m.detachFromScene();
      m.destroy();
    }

    this._models.length = 0;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.removeModels();
    }
  }

  addBatch(batch) {
    this._batches.push(batch);
  }

  removeBatch(batch) {
    for (let i = 0; i < this._batches.length; ++i) {
      if (this._batches[i] === batch) {
        this._batches.splice(i, 1);

        if (_internal253Aconstants.JSB) {
          this._nativeObj.removeBatch(i);
        }

        return;
      }
    }
  }

  removeBatches() {
    this._batches.length = 0;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.removeBatches();
    }
  }

  onGlobalPipelineStateChanged() {
    for (const m of this._models) {
      m.onGlobalPipelineStateChanged();
    }
  }

  generateModelId() {
    return this._modelId++;
  }

  _createNativeObject() {
    if (_internal253Aconstants.JSB && !this._nativeObj) {
      this._nativeObj = new _nativeScene.NativeRenderScene();
    }
  }

}

exports.RenderScene = RenderScene;
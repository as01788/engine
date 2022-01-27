"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = exports.SKYBOX_FLAG = exports.CameraShutter = exports.CameraISO = exports.CameraAperture = exports.CameraProjection = exports.CameraFOVAxis = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _index = require("../../geometry/index.js");

var _index2 = require("../../gfx/index.js");

var _index3 = require("../../math/index.js");

var _define = require("../../pipeline/define.js");

var _globalExports = require("../../global-exports.js");

var _mat = require("../../math/mat4.js");

var _nativeScene = require("./native-scene.js");

var _debug = require("../../platform/debug.js");

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
let CameraFOVAxis;
exports.CameraFOVAxis = CameraFOVAxis;

(function (CameraFOVAxis) {
  CameraFOVAxis[CameraFOVAxis["VERTICAL"] = 0] = "VERTICAL";
  CameraFOVAxis[CameraFOVAxis["HORIZONTAL"] = 1] = "HORIZONTAL";
})(CameraFOVAxis || (exports.CameraFOVAxis = CameraFOVAxis = {}));

let CameraProjection;
exports.CameraProjection = CameraProjection;

(function (CameraProjection) {
  CameraProjection[CameraProjection["ORTHO"] = 0] = "ORTHO";
  CameraProjection[CameraProjection["PERSPECTIVE"] = 1] = "PERSPECTIVE";
})(CameraProjection || (exports.CameraProjection = CameraProjection = {}));

let CameraAperture;
exports.CameraAperture = CameraAperture;

(function (CameraAperture) {
  CameraAperture[CameraAperture["F1_8"] = 0] = "F1_8";
  CameraAperture[CameraAperture["F2_0"] = 1] = "F2_0";
  CameraAperture[CameraAperture["F2_2"] = 2] = "F2_2";
  CameraAperture[CameraAperture["F2_5"] = 3] = "F2_5";
  CameraAperture[CameraAperture["F2_8"] = 4] = "F2_8";
  CameraAperture[CameraAperture["F3_2"] = 5] = "F3_2";
  CameraAperture[CameraAperture["F3_5"] = 6] = "F3_5";
  CameraAperture[CameraAperture["F4_0"] = 7] = "F4_0";
  CameraAperture[CameraAperture["F4_5"] = 8] = "F4_5";
  CameraAperture[CameraAperture["F5_0"] = 9] = "F5_0";
  CameraAperture[CameraAperture["F5_6"] = 10] = "F5_6";
  CameraAperture[CameraAperture["F6_3"] = 11] = "F6_3";
  CameraAperture[CameraAperture["F7_1"] = 12] = "F7_1";
  CameraAperture[CameraAperture["F8_0"] = 13] = "F8_0";
  CameraAperture[CameraAperture["F9_0"] = 14] = "F9_0";
  CameraAperture[CameraAperture["F10_0"] = 15] = "F10_0";
  CameraAperture[CameraAperture["F11_0"] = 16] = "F11_0";
  CameraAperture[CameraAperture["F13_0"] = 17] = "F13_0";
  CameraAperture[CameraAperture["F14_0"] = 18] = "F14_0";
  CameraAperture[CameraAperture["F16_0"] = 19] = "F16_0";
  CameraAperture[CameraAperture["F18_0"] = 20] = "F18_0";
  CameraAperture[CameraAperture["F20_0"] = 21] = "F20_0";
  CameraAperture[CameraAperture["F22_0"] = 22] = "F22_0";
})(CameraAperture || (exports.CameraAperture = CameraAperture = {}));

let CameraISO;
exports.CameraISO = CameraISO;

(function (CameraISO) {
  CameraISO[CameraISO["ISO100"] = 0] = "ISO100";
  CameraISO[CameraISO["ISO200"] = 1] = "ISO200";
  CameraISO[CameraISO["ISO400"] = 2] = "ISO400";
  CameraISO[CameraISO["ISO800"] = 3] = "ISO800";
})(CameraISO || (exports.CameraISO = CameraISO = {}));

let CameraShutter;
exports.CameraShutter = CameraShutter;

(function (CameraShutter) {
  CameraShutter[CameraShutter["D1"] = 0] = "D1";
  CameraShutter[CameraShutter["D2"] = 1] = "D2";
  CameraShutter[CameraShutter["D4"] = 2] = "D4";
  CameraShutter[CameraShutter["D8"] = 3] = "D8";
  CameraShutter[CameraShutter["D15"] = 4] = "D15";
  CameraShutter[CameraShutter["D30"] = 5] = "D30";
  CameraShutter[CameraShutter["D60"] = 6] = "D60";
  CameraShutter[CameraShutter["D125"] = 7] = "D125";
  CameraShutter[CameraShutter["D250"] = 8] = "D250";
  CameraShutter[CameraShutter["D500"] = 9] = "D500";
  CameraShutter[CameraShutter["D1000"] = 10] = "D1000";
  CameraShutter[CameraShutter["D2000"] = 11] = "D2000";
  CameraShutter[CameraShutter["D4000"] = 12] = "D4000";
})(CameraShutter || (exports.CameraShutter = CameraShutter = {}));

const FSTOPS = [1.8, 2.0, 2.2, 2.5, 2.8, 3.2, 3.5, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0, 10.0, 11.0, 13.0, 14.0, 16.0, 18.0, 20.0, 22.0];
const SHUTTERS = [1.0, 1.0 / 2.0, 1.0 / 4.0, 1.0 / 8.0, 1.0 / 15.0, 1.0 / 30.0, 1.0 / 60.0, 1.0 / 125.0, 1.0 / 250.0, 1.0 / 500.0, 1.0 / 1000.0, 1.0 / 2000.0, 1.0 / 4000.0];
const ISOS = [100.0, 200.0, 400.0, 800.0];
const v_a = new _index3.Vec3();
const v_b = new _index3.Vec3();

const _tempMat1 = new _index3.Mat4();

const SKYBOX_FLAG = _index2.ClearFlagBit.STENCIL << 1;
exports.SKYBOX_FLAG = SKYBOX_FLAG;
const correctionMatrices = [];

class Camera {
  constructor(device) {
    this.isWindowSize = true;
    this.screenScale = void 0;
    this._device = void 0;
    this._scene = null;
    this._node = null;
    this._name = null;
    this._enabled = false;
    this._proj = -1;
    this._aspect = void 0;
    this._orthoHeight = 10.0;
    this._fovAxis = CameraFOVAxis.VERTICAL;
    this._fov = (0, _index3.toRadian)(45);
    this._nearClip = 1.0;
    this._farClip = 1000.0;
    this._clearColor = new _index2.Color(0.2, 0.2, 0.2, 1);
    this._viewport = new _index3.Rect(0, 0, 1, 1);
    this._orientedViewport = new _index3.Rect(0, 0, 1, 1);
    this._curTransform = _index2.SurfaceTransform.IDENTITY;
    this._isProjDirty = true;
    this._matView = new _index3.Mat4();
    this._matProj = new _index3.Mat4();
    this._matProjInv = new _index3.Mat4();
    this._matViewProj = new _index3.Mat4();
    this._matViewProjInv = new _index3.Mat4();
    this._frustum = new _index.Frustum();
    this._forward = new _index3.Vec3();
    this._position = new _index3.Vec3();
    this._priority = 0;
    this._aperture = CameraAperture.F16_0;
    this._apertureValue = void 0;
    this._shutter = CameraShutter.D125;
    this._shutterValue = 0.0;
    this._iso = CameraISO.ISO100;
    this._isoValue = 0.0;
    this._ec = 0.0;
    this._window = null;
    this._width = 1;
    this._height = 1;
    this._clearFlag = _index2.ClearFlagBit.NONE;
    this._clearDepth = 1.0;
    this._visibility = _define.CAMERA_DEFAULT_MASK;
    this._exposure = 0;
    this._clearStencil = 0;
    this._device = device;
    this._apertureValue = FSTOPS[this._aperture];
    this._shutterValue = SHUTTERS[this._shutter];
    this._isoValue = ISOS[this._iso];
    this._aspect = this.screenScale = 1;
    this._frustum.accurate = true;

    if (!correctionMatrices.length) {
      const ySign = device.capabilities.clipSpaceSignY;
      correctionMatrices[_index2.SurfaceTransform.IDENTITY] = new _index3.Mat4(1, 0, 0, 0, 0, ySign);
      correctionMatrices[_index2.SurfaceTransform.ROTATE_90] = new _index3.Mat4(0, 1, 0, 0, -ySign, 0);
      correctionMatrices[_index2.SurfaceTransform.ROTATE_180] = new _index3.Mat4(-1, 0, 0, 0, 0, -ySign);
      correctionMatrices[_index2.SurfaceTransform.ROTATE_270] = new _index3.Mat4(0, -1, 0, 0, ySign, 0);
    }
  }

  _setWidth(val) {
    this._width = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.width = val;
    }
  }

  _setHeight(val) {
    this._height = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.height = val;
    }
  }

  _setScene(scene) {
    this._scene = scene;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.scene = scene ? scene.native : null;
    }
  }

  _updateAspect(oriented = true) {
    this._aspect = this.window.width * this._viewport.width / (this.window.height * this._viewport.height); // window size/viewport is pre-rotated, but aspect should be oriented to acquire the correct projection

    if (oriented) {
      const swapchain = this.window.swapchain;
      const orientation = swapchain && swapchain.surfaceTransform || _index2.SurfaceTransform.IDENTITY;
      if (orientation % 2) this._aspect = 1 / this._aspect;
    }

    this._isProjDirty = true;
    if (_internal253Aconstants.JSB) this._nativeObj.aspect = this._aspect;
  }

  _init(info) {
    if (_internal253Aconstants.JSB) {
      this._nativeObj = new _nativeScene.NativeCamera();
      if (this._scene) this._nativeObj.scene = this._scene.native;
      this._nativeObj.frustum = this._frustum;
    }
  }
  /**
   * this exposure value corresponding to default standard camera exposure parameters
   */


  static get standardExposureValue() {
    return 1.0 / 38400.0;
  }
  /**
   * luminance unit scale used by area lights
   */


  static get standardLightMeterScale() {
    return 10000.0;
  }

  initialize(info) {
    this._init(info);

    this.node = info.node;

    this._setWidth(1);

    this._setHeight(1);

    this.clearFlag = _index2.ClearFlagBit.NONE;
    this.clearDepth = 1.0;
    this.visibility = _define.CAMERA_DEFAULT_MASK;
    this._name = info.name;
    this._proj = info.projection;
    this._priority = info.priority || 0;
    this._aspect = this.screenScale = 1;
    this.updateExposure();
    this.changeTargetWindow(info.window);
  }

  _destroy() {
    if (_internal253Aconstants.JSB) this._nativeObj = null;
  }

  destroy() {
    if (this._window) {
      this._window.detachCamera(this);

      this.window = null;
    }

    this._name = null;

    this._destroy();
  }

  attachToScene(scene) {
    this._enabled = true;

    this._setScene(scene);
  }

  detachFromScene() {
    this._enabled = false;

    this._setScene(null);
  }

  resize(width, height) {
    if (!this._window) return;

    this._setWidth(width);

    this._setHeight(height);

    this._updateAspect();
  }

  setFixedSize(width, height) {
    this._setWidth(width);

    this._setHeight(height);

    this._updateAspect(false);

    this.isWindowSize = false;
  } // Editor specific gizmo camera logic


  syncCameraEditor(camera) {
    if (_internal253Aconstants.EDITOR) {
      this.position = camera.position;
      this.forward = camera.forward;
      this._matView = camera.matView;
      this._matProj = camera.matProj;
      this._matProjInv = camera.matProjInv;
      this._matViewProj = camera.matViewProj;
    }
  }

  update(forceUpdate = false) {
    var _this$window;

    // for lazy eval situations like the in-editor preview
    if (!this._node) return;
    let viewProjDirty = false; // view matrix

    if (this._node.hasChangedFlags || forceUpdate) {
      _index3.Mat4.invert(this._matView, this._node.worldMatrix);

      if (_internal253Aconstants.JSB) {
        this._nativeObj.matView = this._matView;
      }

      this._forward.x = -this._matView.m02;
      this._forward.y = -this._matView.m06;
      this._forward.z = -this._matView.m10;

      this._node.getWorldPosition(this._position);

      if (_internal253Aconstants.JSB) {
        this._nativeObj.position = this._position;
        this._nativeObj.forward = this._forward;
      }

      viewProjDirty = true;
    } // projection matrix


    const swapchain = (_this$window = this.window) === null || _this$window === void 0 ? void 0 : _this$window.swapchain;
    const orientation = swapchain && swapchain.surfaceTransform || _index2.SurfaceTransform.IDENTITY;

    if (this._isProjDirty || this._curTransform !== orientation) {
      this._curTransform = orientation;
      const projectionSignY = this._device.capabilities.clipSpaceSignY; // Only for rendertexture processing

      if (this._proj === CameraProjection.PERSPECTIVE) {
        _index3.Mat4.perspective(this._matProj, this._fov, this._aspect, this._nearClip, this._farClip, this._fovAxis === CameraFOVAxis.VERTICAL, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
      } else {
        const x = this._orthoHeight * this._aspect;
        const y = this._orthoHeight;

        _index3.Mat4.ortho(this._matProj, -x, x, -y, y, this._nearClip, this._farClip, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
      }

      if (_internal253Aconstants.JSB) {
        this._nativeObj.aspect = this._aspect;
      }

      _index3.Mat4.invert(this._matProjInv, this._matProj);

      if (_internal253Aconstants.JSB) {
        this._nativeObj.matProj = this._matProj;
        this._nativeObj.matProjInv = this._matProjInv;
      }

      viewProjDirty = true;
      this._isProjDirty = false;
    } // view-projection


    if (viewProjDirty) {
      _index3.Mat4.multiply(this._matViewProj, this._matProj, this._matView);

      _index3.Mat4.invert(this._matViewProjInv, this._matViewProj);

      this._frustum.update(this._matViewProj, this._matViewProjInv);

      if (_internal253Aconstants.JSB) {
        this._nativeObj.matViewProj = this._matViewProj;
        this._nativeObj.matViewProjInv = this._matViewProjInv;
        this._nativeObj.frustum = this._frustum;
      }
    }
  }

  set node(val) {
    this._node = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.node = this._node.native;
    }
  }

  get node() {
    return this._node;
  }

  set enabled(val) {
    this._enabled = val;
  }

  get enabled() {
    return this._enabled;
  }

  set orthoHeight(val) {
    this._orthoHeight = val;
    this._isProjDirty = true;
  }

  get orthoHeight() {
    return this._orthoHeight;
  }

  set projectionType(val) {
    this._proj = val;
    this._isProjDirty = true;
  }

  get projectionType() {
    return this._proj;
  }

  set fovAxis(axis) {
    this._fovAxis = axis;
    this._isProjDirty = true;
  }

  get fovAxis() {
    return this._fovAxis;
  }

  set fov(fov) {
    this._fov = fov;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.fov = fov;
    }

    this._isProjDirty = true;
  }

  get fov() {
    return this._fov;
  }

  set nearClip(nearClip) {
    this._nearClip = nearClip;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.nearClip = this._nearClip;
    }

    this._isProjDirty = true;
  }

  get nearClip() {
    return this._nearClip;
  }

  set farClip(farClip) {
    this._farClip = farClip;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.farClip = this._farClip;
    }

    this._isProjDirty = true;
  }

  get farClip() {
    return this._farClip;
  }

  set clearColor(val) {
    this._clearColor.x = val.x;
    this._clearColor.y = val.y;
    this._clearColor.z = val.z;
    this._clearColor.w = val.w;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.clearColor = this._clearColor;
    }
  }

  get clearColor() {
    return this._clearColor;
  }
  /**
   * Pre-rotated (i.e. always in identity/portrait mode) if possible.
   */


  get viewport() {
    return this._viewport;
  }

  set viewport(val) {
    (0, _debug.warnID)(8302);
    this.setViewportInOrientedSpace(val);
  }
  /**
   * Set the viewport in oriented space (local to screen rotations)
   */


  setViewportInOrientedSpace(val) {
    var _this$window2;

    const {
      x,
      width,
      height
    } = val;
    const y = this._device.capabilities.screenSpaceSignY < 0 ? 1 - val.y - height : val.y;
    const swapchain = (_this$window2 = this.window) === null || _this$window2 === void 0 ? void 0 : _this$window2.swapchain;
    const orientation = swapchain && swapchain.surfaceTransform || _index2.SurfaceTransform.IDENTITY;

    switch (orientation) {
      case _index2.SurfaceTransform.ROTATE_90:
        this._viewport.x = 1 - y - height;
        this._viewport.y = x;
        this._viewport.width = height;
        this._viewport.height = width;
        break;

      case _index2.SurfaceTransform.ROTATE_180:
        this._viewport.x = 1 - x - width;
        this._viewport.y = 1 - y - height;
        this._viewport.width = width;
        this._viewport.height = height;
        break;

      case _index2.SurfaceTransform.ROTATE_270:
        this._viewport.x = y;
        this._viewport.y = 1 - x - width;
        this._viewport.width = height;
        this._viewport.height = width;
        break;

      case _index2.SurfaceTransform.IDENTITY:
        this._viewport.x = x;
        this._viewport.y = y;
        this._viewport.width = width;
        this._viewport.height = height;
        break;

      default:
    }

    this._orientedViewport.x = x;
    this._orientedViewport.y = y;
    this._orientedViewport.width = width;
    this._orientedViewport.height = height;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.viewPort = this._viewport;
    }

    this.resize(this.width, this.height);
  }

  get scene() {
    return this._scene;
  }

  get name() {
    return this._name;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get aspect() {
    return this._aspect;
  }

  get matView() {
    return this._matView;
  }

  get matProj() {
    return this._matProj;
  }

  get matProjInv() {
    return this._matProjInv;
  }

  get matViewProj() {
    return this._matViewProj;
  }

  get matViewProjInv() {
    return this._matViewProjInv;
  }

  set frustum(val) {
    this._frustum = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.frustum = this._frustum;
    }
  }

  get frustum() {
    return this._frustum;
  }

  set window(val) {
    this._window = val;

    if (_internal253Aconstants.JSB && val) {
      this._nativeObj.window = this._window.native;
    }
  }

  get window() {
    return this._window;
  }

  set forward(val) {
    this._forward = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.forward = this._forward;
    }
  }

  get forward() {
    return this._forward;
  }

  set position(val) {
    this._position = val;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.position = this._position;
    }
  }

  get position() {
    return this._position;
  }

  set visibility(vis) {
    this._visibility = vis;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.visibility = this._visibility;
    }
  }

  get visibility() {
    return this._visibility;
  }

  get priority() {
    return this._priority;
  }

  set priority(val) {
    this._priority = val;
  }

  set aperture(val) {
    this._aperture = val;
    this._apertureValue = FSTOPS[this._aperture];
    this.updateExposure();
  }

  get aperture() {
    return this._aperture;
  }

  get apertureValue() {
    return this._apertureValue;
  }

  set shutter(val) {
    this._shutter = val;
    this._shutterValue = SHUTTERS[this._shutter];
    this.updateExposure();
  }

  get shutter() {
    return this._shutter;
  }

  get shutterValue() {
    return this._shutterValue;
  }

  set iso(val) {
    this._iso = val;
    this._isoValue = ISOS[this._iso];
    this.updateExposure();
  }

  get iso() {
    return this._iso;
  }

  get isoValue() {
    return this._isoValue;
  }

  set ec(val) {
    this._ec = val;
  }

  get ec() {
    return this._ec;
  }

  get exposure() {
    return this._exposure;
  }

  get clearFlag() {
    return this._clearFlag;
  }

  set clearFlag(flag) {
    this._clearFlag = flag;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.clearFlag = flag;
    }
  }

  get clearDepth() {
    return this._clearDepth;
  }

  set clearDepth(depth) {
    this._clearDepth = depth;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.clearDepth = depth;
    }
  }

  get clearStencil() {
    return this._clearStencil;
  }

  set clearStencil(stencil) {
    this._clearStencil = stencil;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.clearStencil = stencil;
    }
  }

  get native() {
    return this._nativeObj;
  }

  changeTargetWindow(window = null) {
    if (this._window) {
      this._window.detachCamera(this);
    }

    const win = window || _globalExports.legacyCC.director.root.mainWindow;

    if (win) {
      win.attachCamera(this);
      this.window = win; // window size is pre-rotated

      const swapchain = win.swapchain;
      const orientation = swapchain && swapchain.surfaceTransform || _index2.SurfaceTransform.IDENTITY;
      if (orientation % 2) this.resize(win.height, win.width);else this.resize(win.width, win.height);
    }
  }

  detachCamera() {
    if (this._window) {
      this._window.detachCamera(this);
    }
  }
  /**
   * transform a screen position (in oriented space) to a world space ray
   */


  screenPointToRay(out, x, y) {
    if (!this._node) return null;
    const width = this.width;
    const height = this.height;
    const cx = this._orientedViewport.x * width;
    const cy = this._orientedViewport.y * height;
    const cw = this._orientedViewport.width * width;
    const ch = this._orientedViewport.height * height;
    const isProj = this._proj === CameraProjection.PERSPECTIVE;
    const ySign = this._device.capabilities.clipSpaceSignY;
    const preTransform = _mat.preTransforms[this._curTransform];

    _index3.Vec3.set(v_a, (x - cx) / cw * 2 - 1, (y - cy) / ch * 2 - 1, isProj ? 1 : -1);

    const {
      x: ox,
      y: oy
    } = v_a;
    v_a.x = ox * preTransform[0] + oy * preTransform[2] * ySign;
    v_a.y = ox * preTransform[1] + oy * preTransform[3] * ySign;

    _index3.Vec3.transformMat4(isProj ? v_a : out.o, v_a, this._matViewProjInv);

    if (isProj) {
      // camera origin
      this._node.getWorldPosition(v_b);

      _index.Ray.fromPoints(out, v_b, v_a);
    } else {
      _index3.Vec3.transformQuat(out.d, _index3.Vec3.FORWARD, this._node.worldRotation);
    }

    return out;
  }
  /**
   * transform a screen position (in oriented space) to world space
   */


  screenToWorld(out, screenPos) {
    const width = this.width;
    const height = this.height;
    const cx = this._orientedViewport.x * width;
    const cy = this._orientedViewport.y * height;
    const cw = this._orientedViewport.width * width;
    const ch = this._orientedViewport.height * height;
    const ySign = this._device.capabilities.clipSpaceSignY;
    const preTransform = _mat.preTransforms[this._curTransform];

    if (this._proj === CameraProjection.PERSPECTIVE) {
      // calculate screen pos in far clip plane
      _index3.Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, 1.0); // transform to world


      const {
        x,
        y
      } = out;
      out.x = x * preTransform[0] + y * preTransform[2] * ySign;
      out.y = x * preTransform[1] + y * preTransform[3] * ySign;

      _index3.Vec3.transformMat4(out, out, this._matViewProjInv); // lerp to depth z


      if (this._node) {
        this._node.getWorldPosition(v_a);
      }

      _index3.Vec3.lerp(out, v_a, out, (0, _index3.lerp)(this._nearClip / this._farClip, 1, screenPos.z));
    } else {
      _index3.Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, screenPos.z * 2 - 1); // transform to world


      const {
        x,
        y
      } = out;
      out.x = x * preTransform[0] + y * preTransform[2] * ySign;
      out.y = x * preTransform[1] + y * preTransform[3] * ySign;

      _index3.Vec3.transformMat4(out, out, this._matViewProjInv);
    }

    return out;
  }
  /**
   * transform a world space position to screen space
   */


  worldToScreen(out, worldPos) {
    const ySign = this._device.capabilities.clipSpaceSignY;
    const preTransform = _mat.preTransforms[this._curTransform];

    _index3.Vec3.transformMat4(out, worldPos, this._matViewProj);

    const {
      x,
      y
    } = out;
    out.x = x * preTransform[0] + y * preTransform[2] * ySign;
    out.y = x * preTransform[1] + y * preTransform[3] * ySign;
    const width = this.width;
    const height = this.height;
    const cx = this._orientedViewport.x * width;
    const cy = this._orientedViewport.y * height;
    const cw = this._orientedViewport.width * width;
    const ch = this._orientedViewport.height * height;
    out.x = cx + (out.x + 1) * 0.5 * cw;
    out.y = cy + (out.y + 1) * 0.5 * ch;
    out.z = out.z * 0.5 + 0.5;
    return out;
  }
  /**
   * transform a world space matrix to screen space
   * @param {Mat4} out the resulting vector
   * @param {Mat4} worldMatrix the world space matrix to be transformed
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   * @returns {Mat4} the resulting vector
   */


  worldMatrixToScreen(out, worldMatrix, width, height) {
    _index3.Mat4.multiply(out, this._matViewProj, worldMatrix);

    _index3.Mat4.multiply(out, correctionMatrices[this._curTransform], out);

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    _index3.Mat4.identity(_tempMat1);

    _index3.Mat4.transform(_tempMat1, _tempMat1, _index3.Vec3.set(v_a, halfWidth, halfHeight, 0));

    _index3.Mat4.scale(_tempMat1, _tempMat1, _index3.Vec3.set(v_a, halfWidth, halfHeight, 1));

    _index3.Mat4.multiply(out, _tempMat1, out);

    return out;
  }

  setExposure(ev100) {
    this._exposure = 0.833333 / 2.0 ** ev100;

    if (_internal253Aconstants.JSB) {
      this._nativeObj.exposure = this._exposure;
    }
  }

  updateExposure() {
    const ev100 = Math.log2(this._apertureValue * this._apertureValue / this._shutterValue * 100.0 / this._isoValue);
    this.setExposure(ev100);
  }

}

exports.Camera = Camera;
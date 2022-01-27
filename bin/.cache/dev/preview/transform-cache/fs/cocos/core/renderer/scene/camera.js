System.register("q-bundled:///fs/cocos/core/renderer/scene/camera.js", ["../../../../../virtual/internal%253Aconstants.js", "../../geometry/index.js", "../../gfx/index.js", "../../math/index.js", "../../pipeline/define.js", "../../global-exports.js", "../../math/mat4.js", "./native-scene.js", "../../platform/debug.js"], function (_export, _context) {
  "use strict";

  var EDITOR, JSB, Frustum, Ray, SurfaceTransform, ClearFlagBit, Color, lerp, Mat4, Rect, toRadian, Vec3, CAMERA_DEFAULT_MASK, legacyCC, preTransforms, NativeCamera, warnID, CameraFOVAxis, CameraProjection, CameraAperture, CameraISO, CameraShutter, FSTOPS, SHUTTERS, ISOS, v_a, v_b, _tempMat1, SKYBOX_FLAG, correctionMatrices, Camera;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  _export({
    CameraFOVAxis: void 0,
    CameraProjection: void 0,
    CameraAperture: void 0,
    CameraISO: void 0,
    CameraShutter: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_geometryIndexJs) {
      Frustum = _geometryIndexJs.Frustum;
      Ray = _geometryIndexJs.Ray;
    }, function (_gfxIndexJs) {
      SurfaceTransform = _gfxIndexJs.SurfaceTransform;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      Color = _gfxIndexJs.Color;
    }, function (_mathIndexJs) {
      lerp = _mathIndexJs.lerp;
      Mat4 = _mathIndexJs.Mat4;
      Rect = _mathIndexJs.Rect;
      toRadian = _mathIndexJs.toRadian;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_pipelineDefineJs) {
      CAMERA_DEFAULT_MASK = _pipelineDefineJs.CAMERA_DEFAULT_MASK;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_mathMat4Js) {
      preTransforms = _mathMat4Js.preTransforms;
    }, function (_nativeSceneJs) {
      NativeCamera = _nativeSceneJs.NativeCamera;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }],
    execute: function () {
      (function (CameraFOVAxis) {
        CameraFOVAxis[CameraFOVAxis["VERTICAL"] = 0] = "VERTICAL";
        CameraFOVAxis[CameraFOVAxis["HORIZONTAL"] = 1] = "HORIZONTAL";
      })(CameraFOVAxis || _export("CameraFOVAxis", CameraFOVAxis = {}));

      (function (CameraProjection) {
        CameraProjection[CameraProjection["ORTHO"] = 0] = "ORTHO";
        CameraProjection[CameraProjection["PERSPECTIVE"] = 1] = "PERSPECTIVE";
      })(CameraProjection || _export("CameraProjection", CameraProjection = {}));

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
      })(CameraAperture || _export("CameraAperture", CameraAperture = {}));

      (function (CameraISO) {
        CameraISO[CameraISO["ISO100"] = 0] = "ISO100";
        CameraISO[CameraISO["ISO200"] = 1] = "ISO200";
        CameraISO[CameraISO["ISO400"] = 2] = "ISO400";
        CameraISO[CameraISO["ISO800"] = 3] = "ISO800";
      })(CameraISO || _export("CameraISO", CameraISO = {}));

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
      })(CameraShutter || _export("CameraShutter", CameraShutter = {}));

      FSTOPS = [1.8, 2.0, 2.2, 2.5, 2.8, 3.2, 3.5, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0, 10.0, 11.0, 13.0, 14.0, 16.0, 18.0, 20.0, 22.0];
      SHUTTERS = [1.0, 1.0 / 2.0, 1.0 / 4.0, 1.0 / 8.0, 1.0 / 15.0, 1.0 / 30.0, 1.0 / 60.0, 1.0 / 125.0, 1.0 / 250.0, 1.0 / 500.0, 1.0 / 1000.0, 1.0 / 2000.0, 1.0 / 4000.0];
      ISOS = [100.0, 200.0, 400.0, 800.0];
      v_a = new Vec3();
      v_b = new Vec3();
      _tempMat1 = new Mat4();

      _export("SKYBOX_FLAG", SKYBOX_FLAG = ClearFlagBit.STENCIL << 1);

      correctionMatrices = [];

      _export("Camera", Camera = /*#__PURE__*/function () {
        function Camera(device) {
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
          this._fov = toRadian(45);
          this._nearClip = 1.0;
          this._farClip = 1000.0;
          this._clearColor = new Color(0.2, 0.2, 0.2, 1);
          this._viewport = new Rect(0, 0, 1, 1);
          this._orientedViewport = new Rect(0, 0, 1, 1);
          this._curTransform = SurfaceTransform.IDENTITY;
          this._isProjDirty = true;
          this._matView = new Mat4();
          this._matProj = new Mat4();
          this._matProjInv = new Mat4();
          this._matViewProj = new Mat4();
          this._matViewProjInv = new Mat4();
          this._frustum = new Frustum();
          this._forward = new Vec3();
          this._position = new Vec3();
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
          this._clearFlag = ClearFlagBit.NONE;
          this._clearDepth = 1.0;
          this._visibility = CAMERA_DEFAULT_MASK;
          this._exposure = 0;
          this._clearStencil = 0;
          this._device = device;
          this._apertureValue = FSTOPS[this._aperture];
          this._shutterValue = SHUTTERS[this._shutter];
          this._isoValue = ISOS[this._iso];
          this._aspect = this.screenScale = 1;
          this._frustum.accurate = true;

          if (!correctionMatrices.length) {
            var ySign = device.capabilities.clipSpaceSignY;
            correctionMatrices[SurfaceTransform.IDENTITY] = new Mat4(1, 0, 0, 0, 0, ySign);
            correctionMatrices[SurfaceTransform.ROTATE_90] = new Mat4(0, 1, 0, 0, -ySign, 0);
            correctionMatrices[SurfaceTransform.ROTATE_180] = new Mat4(-1, 0, 0, 0, 0, -ySign);
            correctionMatrices[SurfaceTransform.ROTATE_270] = new Mat4(0, -1, 0, 0, ySign, 0);
          }
        }

        var _proto = Camera.prototype;

        _proto._setWidth = function _setWidth(val) {
          this._width = val;

          if (JSB) {
            this._nativeObj.width = val;
          }
        };

        _proto._setHeight = function _setHeight(val) {
          this._height = val;

          if (JSB) {
            this._nativeObj.height = val;
          }
        };

        _proto._setScene = function _setScene(scene) {
          this._scene = scene;

          if (JSB) {
            this._nativeObj.scene = scene ? scene["native"] : null;
          }
        };

        _proto._updateAspect = function _updateAspect(oriented) {
          if (oriented === void 0) {
            oriented = true;
          }

          this._aspect = this.window.width * this._viewport.width / (this.window.height * this._viewport.height); // window size/viewport is pre-rotated, but aspect should be oriented to acquire the correct projection

          if (oriented) {
            var swapchain = this.window.swapchain;
            var orientation = swapchain && swapchain.surfaceTransform || SurfaceTransform.IDENTITY;
            if (orientation % 2) this._aspect = 1 / this._aspect;
          }

          this._isProjDirty = true;
          if (JSB) this._nativeObj.aspect = this._aspect;
        };

        _proto._init = function _init(info) {
          if (JSB) {
            this._nativeObj = new NativeCamera();
            if (this._scene) this._nativeObj.scene = this._scene["native"];
            this._nativeObj.frustum = this._frustum;
          }
        }
        /**
         * this exposure value corresponding to default standard camera exposure parameters
         */
        ;

        _proto.initialize = function initialize(info) {
          this._init(info);

          this.node = info.node;

          this._setWidth(1);

          this._setHeight(1);

          this.clearFlag = ClearFlagBit.NONE;
          this.clearDepth = 1.0;
          this.visibility = CAMERA_DEFAULT_MASK;
          this._name = info.name;
          this._proj = info.projection;
          this._priority = info.priority || 0;
          this._aspect = this.screenScale = 1;
          this.updateExposure();
          this.changeTargetWindow(info.window);
        };

        _proto._destroy = function _destroy() {
          if (JSB) this._nativeObj = null;
        };

        _proto.destroy = function destroy() {
          if (this._window) {
            this._window.detachCamera(this);

            this.window = null;
          }

          this._name = null;

          this._destroy();
        };

        _proto.attachToScene = function attachToScene(scene) {
          this._enabled = true;

          this._setScene(scene);
        };

        _proto.detachFromScene = function detachFromScene() {
          this._enabled = false;

          this._setScene(null);
        };

        _proto.resize = function resize(width, height) {
          if (!this._window) return;

          this._setWidth(width);

          this._setHeight(height);

          this._updateAspect();
        };

        _proto.setFixedSize = function setFixedSize(width, height) {
          this._setWidth(width);

          this._setHeight(height);

          this._updateAspect(false);

          this.isWindowSize = false;
        } // Editor specific gizmo camera logic
        ;

        _proto.syncCameraEditor = function syncCameraEditor(camera) {
          if (EDITOR) {
            this.position = camera.position;
            this.forward = camera.forward;
            this._matView = camera.matView;
            this._matProj = camera.matProj;
            this._matProjInv = camera.matProjInv;
            this._matViewProj = camera.matViewProj;
          }
        };

        _proto.update = function update(forceUpdate) {
          var _this$window;

          if (forceUpdate === void 0) {
            forceUpdate = false;
          }

          // for lazy eval situations like the in-editor preview
          if (!this._node) return;
          var viewProjDirty = false; // view matrix

          if (this._node.hasChangedFlags || forceUpdate) {
            Mat4.invert(this._matView, this._node.worldMatrix);

            if (JSB) {
              this._nativeObj.matView = this._matView;
            }

            this._forward.x = -this._matView.m02;
            this._forward.y = -this._matView.m06;
            this._forward.z = -this._matView.m10;

            this._node.getWorldPosition(this._position);

            if (JSB) {
              this._nativeObj.position = this._position;
              this._nativeObj.forward = this._forward;
            }

            viewProjDirty = true;
          } // projection matrix


          var swapchain = (_this$window = this.window) === null || _this$window === void 0 ? void 0 : _this$window.swapchain;
          var orientation = swapchain && swapchain.surfaceTransform || SurfaceTransform.IDENTITY;

          if (this._isProjDirty || this._curTransform !== orientation) {
            this._curTransform = orientation;
            var projectionSignY = this._device.capabilities.clipSpaceSignY; // Only for rendertexture processing

            if (this._proj === CameraProjection.PERSPECTIVE) {
              Mat4.perspective(this._matProj, this._fov, this._aspect, this._nearClip, this._farClip, this._fovAxis === CameraFOVAxis.VERTICAL, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
            } else {
              var x = this._orthoHeight * this._aspect;
              var y = this._orthoHeight;
              Mat4.ortho(this._matProj, -x, x, -y, y, this._nearClip, this._farClip, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
            }

            if (JSB) {
              this._nativeObj.aspect = this._aspect;
            }

            Mat4.invert(this._matProjInv, this._matProj);

            if (JSB) {
              this._nativeObj.matProj = this._matProj;
              this._nativeObj.matProjInv = this._matProjInv;
            }

            viewProjDirty = true;
            this._isProjDirty = false;
          } // view-projection


          if (viewProjDirty) {
            Mat4.multiply(this._matViewProj, this._matProj, this._matView);
            Mat4.invert(this._matViewProjInv, this._matViewProj);

            this._frustum.update(this._matViewProj, this._matViewProjInv);

            if (JSB) {
              this._nativeObj.matViewProj = this._matViewProj;
              this._nativeObj.matViewProjInv = this._matViewProjInv;
              this._nativeObj.frustum = this._frustum;
            }
          }
        };

        /**
         * Set the viewport in oriented space (local to screen rotations)
         */
        _proto.setViewportInOrientedSpace = function setViewportInOrientedSpace(val) {
          var _this$window2;

          var x = val.x,
              width = val.width,
              height = val.height;
          var y = this._device.capabilities.screenSpaceSignY < 0 ? 1 - val.y - height : val.y;
          var swapchain = (_this$window2 = this.window) === null || _this$window2 === void 0 ? void 0 : _this$window2.swapchain;
          var orientation = swapchain && swapchain.surfaceTransform || SurfaceTransform.IDENTITY;

          switch (orientation) {
            case SurfaceTransform.ROTATE_90:
              this._viewport.x = 1 - y - height;
              this._viewport.y = x;
              this._viewport.width = height;
              this._viewport.height = width;
              break;

            case SurfaceTransform.ROTATE_180:
              this._viewport.x = 1 - x - width;
              this._viewport.y = 1 - y - height;
              this._viewport.width = width;
              this._viewport.height = height;
              break;

            case SurfaceTransform.ROTATE_270:
              this._viewport.x = y;
              this._viewport.y = 1 - x - width;
              this._viewport.width = height;
              this._viewport.height = width;
              break;

            case SurfaceTransform.IDENTITY:
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

          if (JSB) {
            this._nativeObj.viewPort = this._viewport;
          }

          this.resize(this.width, this.height);
        };

        _proto.changeTargetWindow = function changeTargetWindow(window) {
          if (window === void 0) {
            window = null;
          }

          if (this._window) {
            this._window.detachCamera(this);
          }

          var win = window || legacyCC.director.root.mainWindow;

          if (win) {
            win.attachCamera(this);
            this.window = win; // window size is pre-rotated

            var swapchain = win.swapchain;
            var orientation = swapchain && swapchain.surfaceTransform || SurfaceTransform.IDENTITY;
            if (orientation % 2) this.resize(win.height, win.width);else this.resize(win.width, win.height);
          }
        };

        _proto.detachCamera = function detachCamera() {
          if (this._window) {
            this._window.detachCamera(this);
          }
        }
        /**
         * transform a screen position (in oriented space) to a world space ray
         */
        ;

        _proto.screenPointToRay = function screenPointToRay(out, x, y) {
          if (!this._node) return null;
          var width = this.width;
          var height = this.height;
          var cx = this._orientedViewport.x * width;
          var cy = this._orientedViewport.y * height;
          var cw = this._orientedViewport.width * width;
          var ch = this._orientedViewport.height * height;
          var isProj = this._proj === CameraProjection.PERSPECTIVE;
          var ySign = this._device.capabilities.clipSpaceSignY;
          var preTransform = preTransforms[this._curTransform];
          Vec3.set(v_a, (x - cx) / cw * 2 - 1, (y - cy) / ch * 2 - 1, isProj ? 1 : -1);
          var ox = v_a.x,
              oy = v_a.y;
          v_a.x = ox * preTransform[0] + oy * preTransform[2] * ySign;
          v_a.y = ox * preTransform[1] + oy * preTransform[3] * ySign;
          Vec3.transformMat4(isProj ? v_a : out.o, v_a, this._matViewProjInv);

          if (isProj) {
            // camera origin
            this._node.getWorldPosition(v_b);

            Ray.fromPoints(out, v_b, v_a);
          } else {
            Vec3.transformQuat(out.d, Vec3.FORWARD, this._node.worldRotation);
          }

          return out;
        }
        /**
         * transform a screen position (in oriented space) to world space
         */
        ;

        _proto.screenToWorld = function screenToWorld(out, screenPos) {
          var width = this.width;
          var height = this.height;
          var cx = this._orientedViewport.x * width;
          var cy = this._orientedViewport.y * height;
          var cw = this._orientedViewport.width * width;
          var ch = this._orientedViewport.height * height;
          var ySign = this._device.capabilities.clipSpaceSignY;
          var preTransform = preTransforms[this._curTransform];

          if (this._proj === CameraProjection.PERSPECTIVE) {
            // calculate screen pos in far clip plane
            Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, 1.0); // transform to world

            var x = out.x,
                y = out.y;
            out.x = x * preTransform[0] + y * preTransform[2] * ySign;
            out.y = x * preTransform[1] + y * preTransform[3] * ySign;
            Vec3.transformMat4(out, out, this._matViewProjInv); // lerp to depth z

            if (this._node) {
              this._node.getWorldPosition(v_a);
            }

            Vec3.lerp(out, v_a, out, lerp(this._nearClip / this._farClip, 1, screenPos.z));
          } else {
            Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, screenPos.z * 2 - 1); // transform to world

            var _x = out.x,
                _y = out.y;
            out.x = _x * preTransform[0] + _y * preTransform[2] * ySign;
            out.y = _x * preTransform[1] + _y * preTransform[3] * ySign;
            Vec3.transformMat4(out, out, this._matViewProjInv);
          }

          return out;
        }
        /**
         * transform a world space position to screen space
         */
        ;

        _proto.worldToScreen = function worldToScreen(out, worldPos) {
          var ySign = this._device.capabilities.clipSpaceSignY;
          var preTransform = preTransforms[this._curTransform];
          Vec3.transformMat4(out, worldPos, this._matViewProj);
          var x = out.x,
              y = out.y;
          out.x = x * preTransform[0] + y * preTransform[2] * ySign;
          out.y = x * preTransform[1] + y * preTransform[3] * ySign;
          var width = this.width;
          var height = this.height;
          var cx = this._orientedViewport.x * width;
          var cy = this._orientedViewport.y * height;
          var cw = this._orientedViewport.width * width;
          var ch = this._orientedViewport.height * height;
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
        ;

        _proto.worldMatrixToScreen = function worldMatrixToScreen(out, worldMatrix, width, height) {
          Mat4.multiply(out, this._matViewProj, worldMatrix);
          Mat4.multiply(out, correctionMatrices[this._curTransform], out);
          var halfWidth = width / 2;
          var halfHeight = height / 2;
          Mat4.identity(_tempMat1);
          Mat4.transform(_tempMat1, _tempMat1, Vec3.set(v_a, halfWidth, halfHeight, 0));
          Mat4.scale(_tempMat1, _tempMat1, Vec3.set(v_a, halfWidth, halfHeight, 1));
          Mat4.multiply(out, _tempMat1, out);
          return out;
        };

        _proto.setExposure = function setExposure(ev100) {
          this._exposure = 0.833333 / Math.pow(2.0, ev100);

          if (JSB) {
            this._nativeObj.exposure = this._exposure;
          }
        };

        _proto.updateExposure = function updateExposure() {
          var ev100 = Math.log2(this._apertureValue * this._apertureValue / this._shutterValue * 100.0 / this._isoValue);
          this.setExposure(ev100);
        };

        _createClass(Camera, [{
          key: "node",
          get: function get() {
            return this._node;
          },
          set: function set(val) {
            this._node = val;

            if (JSB) {
              this._nativeObj.node = this._node["native"];
            }
          }
        }, {
          key: "enabled",
          get: function get() {
            return this._enabled;
          },
          set: function set(val) {
            this._enabled = val;
          }
        }, {
          key: "orthoHeight",
          get: function get() {
            return this._orthoHeight;
          },
          set: function set(val) {
            this._orthoHeight = val;
            this._isProjDirty = true;
          }
        }, {
          key: "projectionType",
          get: function get() {
            return this._proj;
          },
          set: function set(val) {
            this._proj = val;
            this._isProjDirty = true;
          }
        }, {
          key: "fovAxis",
          get: function get() {
            return this._fovAxis;
          },
          set: function set(axis) {
            this._fovAxis = axis;
            this._isProjDirty = true;
          }
        }, {
          key: "fov",
          get: function get() {
            return this._fov;
          },
          set: function set(fov) {
            this._fov = fov;

            if (JSB) {
              this._nativeObj.fov = fov;
            }

            this._isProjDirty = true;
          }
        }, {
          key: "nearClip",
          get: function get() {
            return this._nearClip;
          },
          set: function set(nearClip) {
            this._nearClip = nearClip;

            if (JSB) {
              this._nativeObj.nearClip = this._nearClip;
            }

            this._isProjDirty = true;
          }
        }, {
          key: "farClip",
          get: function get() {
            return this._farClip;
          },
          set: function set(farClip) {
            this._farClip = farClip;

            if (JSB) {
              this._nativeObj.farClip = this._farClip;
            }

            this._isProjDirty = true;
          }
        }, {
          key: "clearColor",
          get: function get() {
            return this._clearColor;
          }
          /**
           * Pre-rotated (i.e. always in identity/portrait mode) if possible.
           */
          ,
          set: function set(val) {
            this._clearColor.x = val.x;
            this._clearColor.y = val.y;
            this._clearColor.z = val.z;
            this._clearColor.w = val.w;

            if (JSB) {
              this._nativeObj.clearColor = this._clearColor;
            }
          }
        }, {
          key: "viewport",
          get: function get() {
            return this._viewport;
          },
          set: function set(val) {
            warnID(8302);
            this.setViewportInOrientedSpace(val);
          }
        }, {
          key: "scene",
          get: function get() {
            return this._scene;
          }
        }, {
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "width",
          get: function get() {
            return this._width;
          }
        }, {
          key: "height",
          get: function get() {
            return this._height;
          }
        }, {
          key: "aspect",
          get: function get() {
            return this._aspect;
          }
        }, {
          key: "matView",
          get: function get() {
            return this._matView;
          }
        }, {
          key: "matProj",
          get: function get() {
            return this._matProj;
          }
        }, {
          key: "matProjInv",
          get: function get() {
            return this._matProjInv;
          }
        }, {
          key: "matViewProj",
          get: function get() {
            return this._matViewProj;
          }
        }, {
          key: "matViewProjInv",
          get: function get() {
            return this._matViewProjInv;
          }
        }, {
          key: "frustum",
          get: function get() {
            return this._frustum;
          },
          set: function set(val) {
            this._frustum = val;

            if (JSB) {
              this._nativeObj.frustum = this._frustum;
            }
          }
        }, {
          key: "window",
          get: function get() {
            return this._window;
          },
          set: function set(val) {
            this._window = val;

            if (JSB && val) {
              this._nativeObj.window = this._window["native"];
            }
          }
        }, {
          key: "forward",
          get: function get() {
            return this._forward;
          },
          set: function set(val) {
            this._forward = val;

            if (JSB) {
              this._nativeObj.forward = this._forward;
            }
          }
        }, {
          key: "position",
          get: function get() {
            return this._position;
          },
          set: function set(val) {
            this._position = val;

            if (JSB) {
              this._nativeObj.position = this._position;
            }
          }
        }, {
          key: "visibility",
          get: function get() {
            return this._visibility;
          },
          set: function set(vis) {
            this._visibility = vis;

            if (JSB) {
              this._nativeObj.visibility = this._visibility;
            }
          }
        }, {
          key: "priority",
          get: function get() {
            return this._priority;
          },
          set: function set(val) {
            this._priority = val;
          }
        }, {
          key: "aperture",
          get: function get() {
            return this._aperture;
          },
          set: function set(val) {
            this._aperture = val;
            this._apertureValue = FSTOPS[this._aperture];
            this.updateExposure();
          }
        }, {
          key: "apertureValue",
          get: function get() {
            return this._apertureValue;
          }
        }, {
          key: "shutter",
          get: function get() {
            return this._shutter;
          },
          set: function set(val) {
            this._shutter = val;
            this._shutterValue = SHUTTERS[this._shutter];
            this.updateExposure();
          }
        }, {
          key: "shutterValue",
          get: function get() {
            return this._shutterValue;
          }
        }, {
          key: "iso",
          get: function get() {
            return this._iso;
          },
          set: function set(val) {
            this._iso = val;
            this._isoValue = ISOS[this._iso];
            this.updateExposure();
          }
        }, {
          key: "isoValue",
          get: function get() {
            return this._isoValue;
          }
        }, {
          key: "ec",
          get: function get() {
            return this._ec;
          },
          set: function set(val) {
            this._ec = val;
          }
        }, {
          key: "exposure",
          get: function get() {
            return this._exposure;
          }
        }, {
          key: "clearFlag",
          get: function get() {
            return this._clearFlag;
          },
          set: function set(flag) {
            this._clearFlag = flag;

            if (JSB) {
              this._nativeObj.clearFlag = flag;
            }
          }
        }, {
          key: "clearDepth",
          get: function get() {
            return this._clearDepth;
          },
          set: function set(depth) {
            this._clearDepth = depth;

            if (JSB) {
              this._nativeObj.clearDepth = depth;
            }
          }
        }, {
          key: "clearStencil",
          get: function get() {
            return this._clearStencil;
          },
          set: function set(stencil) {
            this._clearStencil = stencil;

            if (JSB) {
              this._nativeObj.clearStencil = stencil;
            }
          }
        }, {
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }], [{
          key: "standardExposureValue",
          get: function get() {
            return 1.0 / 38400.0;
          }
          /**
           * luminance unit scale used by area lights
           */

        }, {
          key: "standardLightMeterScale",
          get: function get() {
            return 10000.0;
          }
        }]);

        return Camera;
      }());
    }
  };
});
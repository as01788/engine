System.register("q-bundled:///fs/cocos/core/renderer/scene/octree.js", ["../../../../../virtual/internal%253Aconstants.js", "../../math/vec3.js", "./native-scene.js"], function (_export, _context) {
  "use strict";

  var JSB, Vec3, NativeOctree, Octree;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_mathVec3Js) {
      Vec3 = _mathVec3Js.Vec3;
    }, function (_nativeSceneJs) {
      NativeOctree = _nativeSceneJs.NativeOctree;
    }],
    execute: function () {
      _export("Octree", Octree = /*#__PURE__*/function () {
        function Octree() {
          this._enabled = false;
          this._minPos = new Vec3(0, 0, 0);
          this._maxPos = new Vec3(0, 0, 0);
          this._depth = 0;

          if (JSB) {
            this._nativeObj = new NativeOctree();
          }
        }

        var _proto = Octree.prototype;

        _proto.initialize = function initialize(octreeInfo) {
          this._enabled = octreeInfo.enabled;
          this._minPos = octreeInfo.minPos;
          this._maxPos = octreeInfo.maxPos;
          this._depth = octreeInfo.depth;

          if (JSB) {
            this._nativeObj.enabled = this._enabled;
            this._nativeObj.minPos = this._minPos;
            this._nativeObj.maxPos = this._maxPos;
            this._nativeObj.depth = this._depth;
          }
        };

        _proto._destroy = function _destroy() {
          if (JSB) {
            this._nativeObj = null;
          }
        };

        _proto.destroy = function destroy() {
          this._destroy();
        };

        _createClass(Octree, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          }
          /**
           * @en min pos of scene bounding box
           * @zh 场景包围盒最小值
           */
          ,
          set:
          /**
           * @en enable octree
           * @zh 是否开启八叉树加速剔除
           */
          function set(val) {
            this._enabled = val;

            if (JSB) {
              this._nativeObj.enabled = val;
            }
          }
        }, {
          key: "minPos",
          get: function get() {
            return this._minPos;
          },
          set: function set(val) {
            this._minPos = val;

            if (JSB) {
              this._nativeObj.minPos = val;
            }
          }
          /**
           * @en max pos of scene bounding box
           * @zh 场景包围盒最大值
           */

        }, {
          key: "maxPos",
          get: function get() {
            return this._maxPos;
          },
          set: function set(val) {
            this._maxPos = val;

            if (JSB) {
              this._nativeObj.maxPos = val;
            }
          }
          /**
           * @en depth of octree
           * @zh 八叉树深度
           */

        }, {
          key: "depth",
          get: function get() {
            return this._depth;
          },
          set: function set(val) {
            this._depth = val;

            if (JSB) {
              this._nativeObj.depth = val;
            }
          }
        }, {
          key: "native",
          get: function get() {
            return this._nativeObj;
          }
        }]);

        return Octree;
      }());
    }
  };
});
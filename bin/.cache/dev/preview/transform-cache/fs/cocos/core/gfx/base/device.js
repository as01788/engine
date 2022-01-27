System.register("q-bundled:///fs/cocos/core/gfx/base/device.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var API, Feature, MemoryStatus, DeviceCaps, BindingMappingInfo, Device;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_defineJs) {
      API = _defineJs.API;
      Feature = _defineJs.Feature;
      MemoryStatus = _defineJs.MemoryStatus;
      DeviceCaps = _defineJs.DeviceCaps;
      BindingMappingInfo = _defineJs.BindingMappingInfo;
    }],
    execute: function () {
      /**
       * @en GFX Device.
       * @zh GFX 设备。
       */
      _export("Device", Device = /*#__PURE__*/function () {
        function Device() {
          this._gfxAPI = API.UNKNOWN;
          this._renderer = '';
          this._vendor = '';
          this._features = new Array(Feature.COUNT);
          this._queue = null;
          this._cmdBuff = null;
          this._numDrawCalls = 0;
          this._numInstances = 0;
          this._numTris = 0;
          this._memoryStatus = new MemoryStatus();
          this._caps = new DeviceCaps();
          this._bindingMappingInfo = new BindingMappingInfo();
          this._samplers = new Map();
          this._globalBarriers = new Map();
          this._textureBarriers = new Map();
        }

        var _proto = Device.prototype;

        /**
         * @en Whether the device has specific feature.
         * @zh 是否具备特性。
         * @param feature The GFX feature to be queried.
         */
        _proto.hasFeature = function hasFeature(feature) {
          return this._features[feature];
        };

        _createClass(Device, [{
          key: "gfxAPI",
          get:
          /**
           * @en Current rendering API.
           * @zh 当前 GFX 使用的渲染 API。
           */
          function get() {
            return this._gfxAPI;
          }
          /**
           * @en GFX default queue.
           * @zh GFX 默认队列。
           */

        }, {
          key: "queue",
          get: function get() {
            return this._queue;
          }
          /**
           * @en GFX default command buffer.
           * @zh GFX 默认命令缓冲。
           */

        }, {
          key: "commandBuffer",
          get: function get() {
            return this._cmdBuff;
          }
          /**
           * @en Renderer description.
           * @zh 渲染器描述。
           */

        }, {
          key: "renderer",
          get: function get() {
            return this._renderer;
          }
          /**
           * @en Vendor description.
           * @zh 厂商描述。
           */

        }, {
          key: "vendor",
          get: function get() {
            return this._vendor;
          }
          /**
           * @en Number of draw calls currently recorded.
           * @zh 绘制调用次数。
           */

        }, {
          key: "numDrawCalls",
          get: function get() {
            return this._numDrawCalls;
          }
          /**
           * @en Number of instances currently recorded.
           * @zh 绘制 Instance 数量。
           */

        }, {
          key: "numInstances",
          get: function get() {
            return this._numInstances;
          }
          /**
           * @en Number of triangles currently recorded.
           * @zh 渲染三角形数量。
           */

        }, {
          key: "numTris",
          get: function get() {
            return this._numTris;
          }
          /**
           * @en Total memory size currently allocated.
           * @zh 内存状态。
           */

        }, {
          key: "memoryStatus",
          get: function get() {
            return this._memoryStatus;
          }
          /**
           * @en Current device capabilities.
           * @zh 当前设备能力数据。
           */

        }, {
          key: "capabilities",
          get: function get() {
            return this._caps;
          }
          /**
           * @en Current device binding mappings.
           * @zh 当前设备的绑定槽位映射关系。
           */

        }, {
          key: "bindingMappingInfo",
          get: function get() {
            return this._bindingMappingInfo;
          }
        }]);

        return Device;
      }());

      Device.canvas = void 0;
    }
  };
});
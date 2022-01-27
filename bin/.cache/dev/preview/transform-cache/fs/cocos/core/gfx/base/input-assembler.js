System.register("q-bundled:///fs/cocos/core/gfx/base/input-assembler.js", ["../../utils/murmurhash2_gc.js", "./define.js"], function (_export, _context) {
  "use strict";

  var murmurhash2_32_gc, GFXObject, ObjectType, DrawInfo, InputAssembler;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_utilsMurmurhash2_gcJs) {
      murmurhash2_32_gc = _utilsMurmurhash2_gcJs.murmurhash2_32_gc;
    }, function (_defineJs) {
      GFXObject = _defineJs.GFXObject;
      ObjectType = _defineJs.ObjectType;
      DrawInfo = _defineJs.DrawInfo;
    }],
    execute: function () {
      /**
       * @en GFX input assembler.
       * @zh GFX 输入汇集器。
       */
      _export("InputAssembler", InputAssembler = /*#__PURE__*/function (_GFXObject) {
        _inheritsLoose(InputAssembler, _GFXObject);

        function InputAssembler() {
          var _this;

          _this = _GFXObject.call(this, ObjectType.INPUT_ASSEMBLER) || this;
          _this._attributes = [];
          _this._attributesHash = 0;
          _this._vertexBuffers = [];
          _this._indexBuffer = null;
          _this._indirectBuffer = null;
          _this._drawInfo = new DrawInfo();
          return _this;
        }
        /**
         * @en Get the specified vertex buffer.
         * @zh 获取顶点缓冲。
         * @param stream The stream index of the vertex buffer.
         */


        var _proto = InputAssembler.prototype;

        _proto.getVertexBuffer = function getVertexBuffer(stream) {
          if (stream === void 0) {
            stream = 0;
          }

          if (stream < this._vertexBuffers.length) {
            return this._vertexBuffers[stream];
          } else {
            return null;
          }
        };

        _proto.computeAttributesHash = function computeAttributesHash() {
          var res = 'attrs';

          for (var i = 0; i < this.attributes.length; ++i) {
            var at = this.attributes[i];
            res += "," + at.name + "," + at.format + "," + at.isNormalized + "," + at.stream + "," + at.isInstanced;
          }

          return murmurhash2_32_gc(res, 666);
        };

        _createClass(InputAssembler, [{
          key: "attributes",
          get:
          /**
           * @en Get current attributes.
           * @zh 顶点属性数组。
           */
          function get() {
            return this._attributes;
          }
          /**
           * @en Get current vertex buffers.
           * @zh 顶点缓冲数组。
           */

        }, {
          key: "vertexBuffers",
          get: function get() {
            return this._vertexBuffers;
          }
          /**
           * @en Get current index buffer.
           * @zh 索引缓冲。
           */

        }, {
          key: "indexBuffer",
          get: function get() {
            return this._indexBuffer;
          }
          /**
           * @en Get the indirect buffer, if present.
           * @zh 间接绘制缓冲。
           */

        }, {
          key: "indirectBuffer",
          get: function get() {
            return this._indirectBuffer;
          }
          /**
           * @en Get hash of current attributes.
           * @zh 获取顶点属性数组的哈希值。
           */

        }, {
          key: "attributesHash",
          get: function get() {
            return this._attributesHash;
          }
          /**
           * @en Get current vertex count.
           * @zh 顶点数量。
           */

        }, {
          key: "vertexCount",
          get: function get() {
            return this._drawInfo.vertexCount;
          }
          /**
           * @en Get starting vertex.
           * @zh 起始顶点。
           */
          ,
          set: function set(count) {
            this._drawInfo.vertexCount = count;
          }
        }, {
          key: "firstVertex",
          get: function get() {
            return this._drawInfo.firstVertex;
          }
          /**
           * @en Get current index count.
           * @zh 索引数量。
           */
          ,
          set: function set(first) {
            this._drawInfo.firstVertex = first;
          }
        }, {
          key: "indexCount",
          get: function get() {
            return this._drawInfo.indexCount;
          }
          /**
           * @en Get starting index.
           * @zh 起始索引。
           */
          ,
          set: function set(count) {
            this._drawInfo.indexCount = count;
          }
        }, {
          key: "firstIndex",
          get: function get() {
            return this._drawInfo.firstIndex;
          }
          /**
           * @en Get current vertex offset.
           * @zh 顶点偏移量。
           */
          ,
          set: function set(first) {
            this._drawInfo.firstIndex = first;
          }
        }, {
          key: "vertexOffset",
          get: function get() {
            return this._drawInfo.vertexOffset;
          }
          /**
           * @en Get current instance count.
           * @zh 实例数量。
           */
          ,
          set: function set(offset) {
            this._drawInfo.vertexOffset = offset;
          }
        }, {
          key: "instanceCount",
          get: function get() {
            return this._drawInfo.instanceCount;
          }
          /**
           * @en Get starting instance.
           * @zh 起始实例。
           */
          ,
          set: function set(count) {
            this._drawInfo.instanceCount = count;
          }
        }, {
          key: "firstInstance",
          get: function get() {
            return this._drawInfo.firstInstance;
          },
          set: function set(first) {
            this._drawInfo.firstInstance = first;
          }
        }, {
          key: "drawInfo",
          get: function get() {
            return this._drawInfo;
          }
        }]);

        return InputAssembler;
      }(GFXObject));
    }
  };
});
System.register("q-bundled:///fs/cocos/core/scene-graph/node-ui-properties.js", ["../platform/debug.js"], function (_export, _context) {
  "use strict";

  var warnID, NodeUIProperties;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }],
    execute: function () {
      /**
       * @en Node's UI properties abstraction
       * @zh 节点上 UI 相关的属性抽象类
       */
      _export("NodeUIProperties", NodeUIProperties = /*#__PURE__*/function () {
        function NodeUIProperties(node) {
          this._uiComp = null;
          this._opacity = 1;
          this._localOpacity = 1;
          this.opacityDirty = true;
          this._uiTransformComp = null;
          this._node = void 0;
          this._node = node;
        }

        var _proto = NodeUIProperties.prototype;

        _proto.applyOpacity = function applyOpacity(effectOpacity) {
          this._opacity = this._localOpacity * effectOpacity;
        }
        /**
         * @en Make the opacity state of node tree is dirty
         * @zh 为结点树的透明度状态设置脏标签
         */
        ;

        NodeUIProperties.markOpacityTree = function markOpacityTree(node, isDirty) {
          if (isDirty === void 0) {
            isDirty = true;
          }

          node._uiProps.opacityDirty = isDirty;

          for (var i = 0, l = node.children.length; i < l; i++) {
            var c = node.children[i];
            NodeUIProperties.markOpacityTree(c, isDirty);
          }
        };

        _createClass(NodeUIProperties, [{
          key: "uiTransformComp",
          get:
          /**
           * @en The UI transform component
           * @zh UI 变换组件
           */
          function get() {
            if (!this._uiTransformComp) {
              this._uiTransformComp = this._node.getComponent('cc.UITransform');
            }

            return this._uiTransformComp;
          },
          set: function set(value) {
            this._uiTransformComp = value;
          }
          /**
           * @en The base UI component
           * @zh UI 基类组件
           */

        }, {
          key: "uiComp",
          get: function get() {
            return this._uiComp;
          },
          set: function set(comp) {
            if (this._uiComp && comp) {
              warnID(12002);
              return;
            }

            this._uiComp = comp;
          }
        }, {
          key: "opacity",
          get: function get() {
            return this._opacity;
          }
          /**
           * @en The opacity of the UI node itself
           * @zh 本节点的 UI 透明度
           */

        }, {
          key: "localOpacity",
          get: function get() {
            return this._localOpacity;
          },
          set: function set(val) {
            this._localOpacity = val;
            NodeUIProperties.markOpacityTree(this._node);
          }
        }]);

        return NodeUIProperties;
      }());
    }
  };
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockInputEvents = void 0;

var _index = require("../core/data/decorators/index.js");

var _component = require("../core/components/component.js");

var _nodeEvent = require("../core/scene-graph/node-event.js");

var _dec, _dec2, _dec3, _class;

const BlockEvents = [_nodeEvent.NodeEventType.TOUCH_START, _nodeEvent.NodeEventType.TOUCH_END, _nodeEvent.NodeEventType.TOUCH_MOVE, _nodeEvent.NodeEventType.MOUSE_DOWN, _nodeEvent.NodeEventType.MOUSE_MOVE, _nodeEvent.NodeEventType.MOUSE_UP, _nodeEvent.NodeEventType.MOUSE_ENTER, _nodeEvent.NodeEventType.MOUSE_LEAVE, _nodeEvent.NodeEventType.MOUSE_WHEEL];

function stopPropagation(event) {
  event.propagationStopped = true;
}
/**
 * @en
 * This component will block all input events (mouse and touch) within the size of the node,
 * preventing the input from penetrating into the underlying node, typically for the background of the top UI.<br>
 * This component does not have any API interface and can be added directly to the scene to take effect.
 * @zh
 * 该组件将拦截所属节点尺寸内的所有输入事件（鼠标和触摸），防止输入穿透到下层节点，一般用于上层 UI 的背景。<br>
 * 该组件没有任何 API 接口，直接添加到场景即可生效。
 */


let BlockInputEvents = (_dec = (0, _index.ccclass)('cc.BlockInputEvents'), _dec2 = (0, _index.help)('i18n:cc.BlockInputEvents'), _dec3 = (0, _index.menu)('Event/BlockInputEvents'), _dec(_class = _dec2(_class = _dec3(_class = class BlockInputEvents extends _component.Component {
  onEnable() {
    for (let i = 0; i < BlockEvents.length; i++) {
      // supply the 'this' parameter so that the callback could be added and removed correctly,
      // even if the same component is added more than once to a Node.
      this.node.on(BlockEvents[i], stopPropagation, this);
    }
  }

  onDisable() {
    for (let i = 0; i < BlockEvents.length; i++) {
      this.node.off(BlockEvents[i], stopPropagation, this);
    }
  }

}) || _class) || _class) || _class);
exports.BlockInputEvents = BlockInputEvents;
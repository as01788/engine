"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PipelineEventProcessor = exports.PipelineEventType = void 0;

var _eventTarget = require("../event/event-target.js");

let PipelineEventType;
exports.PipelineEventType = PipelineEventType;

(function (PipelineEventType) {
  PipelineEventType["RENDER_FRAME_BEGIN"] = "render-frame-begin";
  PipelineEventType["RENDER_FRAME_END"] = "render-frame-end";
  PipelineEventType["RENDER_CAMERA_BEGIN"] = "render-camera-begin";
  PipelineEventType["RENDER_CAMERA_END"] = "render-camera-end";
  PipelineEventType["ATTACHMENT_SCALE_CAHNGED"] = "attachment-scale-changed";
})(PipelineEventType || (exports.PipelineEventType = PipelineEventType = {}));

class PipelineEventProcessor extends _eventTarget.EventTarget {
  constructor(...args) {
    super(...args);
    this.eventTargetOn = super.on;
    this.eventTargetOnce = super.once;
  }

  on(type, callback, target, once) {
    return this.eventTargetOn(type, callback, target, once);
  }

  once(type, callback, target) {
    return this.eventTargetOnce(type, callback, target);
  }

}

exports.PipelineEventProcessor = PipelineEventProcessor;
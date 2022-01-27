"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PoseOutput = void 0;

class PoseOutput {
  constructor(pose) {
    this.weight = 0.0;
    this._pose = void 0;
    this._blendStateWriters = [];
    this._pose = pose;
  }

  destroy() {
    for (let iBlendStateWriter = 0; iBlendStateWriter < this._blendStateWriters.length; ++iBlendStateWriter) {
      this._pose.destroyWriter(this._blendStateWriters[iBlendStateWriter]);
    }

    this._blendStateWriters.length = 0;
  }

  createPoseWriter(node, property, constants) {
    const writer = this._pose.createWriter(node, property, this, constants);

    this._blendStateWriters.push(writer);

    return writer;
  }

}

exports.PoseOutput = PoseOutput;
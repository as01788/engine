System.register("q-bundled:///fs/cocos/core/animation/pose-output.js", [], function (_export, _context) {
  "use strict";

  var PoseOutput;
  return {
    setters: [],
    execute: function () {
      _export("PoseOutput", PoseOutput = /*#__PURE__*/function () {
        function PoseOutput(pose) {
          this.weight = 0.0;
          this._pose = void 0;
          this._blendStateWriters = [];
          this._pose = pose;
        }

        var _proto = PoseOutput.prototype;

        _proto.destroy = function destroy() {
          for (var iBlendStateWriter = 0; iBlendStateWriter < this._blendStateWriters.length; ++iBlendStateWriter) {
            this._pose.destroyWriter(this._blendStateWriters[iBlendStateWriter]);
          }

          this._blendStateWriters.length = 0;
        };

        _proto.createPoseWriter = function createPoseWriter(node, property, constants) {
          var writer = this._pose.createWriter(node, property, this, constants);

          this._blendStateWriters.push(writer);

          return writer;
        };

        return PoseOutput;
      }());
    }
  };
});
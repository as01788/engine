System.register("q-bundled:///fs/cocos/core/gfx/empty/empty-command-buffer.js", ["../base/command-buffer.js"], function (_export, _context) {
  "use strict";

  var CommandBuffer, EmptyCommandBuffer;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseCommandBufferJs) {
      CommandBuffer = _baseCommandBufferJs.CommandBuffer;
    }],
    execute: function () {
      _export("EmptyCommandBuffer", EmptyCommandBuffer = /*#__PURE__*/function (_CommandBuffer) {
        _inheritsLoose(EmptyCommandBuffer, _CommandBuffer);

        function EmptyCommandBuffer() {
          return _CommandBuffer.apply(this, arguments) || this;
        }

        var _proto = EmptyCommandBuffer.prototype;

        _proto.initialize = function initialize(info) {
          this._type = info.type;
          this._queue = info.queue;
        };

        _proto.destroy = function destroy() {};

        _proto.begin = function begin(renderPass, subpass, frameBuffer) {
          if (subpass === void 0) {
            subpass = 0;
          }
        };

        _proto.end = function end() {};

        _proto.beginRenderPass = function beginRenderPass(renderPass, framebuffer, renderArea, clearColors, clearDepth, clearStencil) {};

        _proto.endRenderPass = function endRenderPass() {};

        _proto.bindPipelineState = function bindPipelineState(pipelineState) {};

        _proto.bindDescriptorSet = function bindDescriptorSet(set, descriptorSet, dynamicOffsets) {};

        _proto.bindInputAssembler = function bindInputAssembler(inputAssembler) {};

        _proto.setViewport = function setViewport(viewport) {};

        _proto.setScissor = function setScissor(scissor) {};

        _proto.setLineWidth = function setLineWidth(lineWidth) {};

        _proto.setDepthBias = function setDepthBias(depthBiasConstantFactor, depthBiasClamp, depthBiasSlopeFactor) {};

        _proto.setBlendConstants = function setBlendConstants(blendConstants) {};

        _proto.setDepthBound = function setDepthBound(minDepthBounds, maxDepthBounds) {};

        _proto.setStencilWriteMask = function setStencilWriteMask(face, writeMask) {};

        _proto.setStencilCompareMask = function setStencilCompareMask(face, reference, compareMask) {};

        _proto.draw = function draw(infoOrAssembler) {};

        _proto.updateBuffer = function updateBuffer(buffer, data, size) {};

        _proto.copyBuffersToTexture = function copyBuffersToTexture(buffers, texture, regions) {};

        _proto.execute = function execute(cmdBuffs, count) {};

        _proto.pipelineBarrier = function pipelineBarrier(globalBarrier, textureBarriers) {};

        return EmptyCommandBuffer;
      }(CommandBuffer));
    }
  };
});
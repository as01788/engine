System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-primary-command-buffer.js", ["../base/define.js", "./webgl-command-buffer.js", "./webgl-commands.js", "./webgl-define.js"], function (_export, _context) {
  "use strict";

  var BufferUsageBit, WebGLCommandBuffer, WebGLCmdFuncBeginRenderPass, WebGLCmdFuncBindStates, WebGLCmdFuncCopyBuffersToTexture, WebGLCmdFuncDraw, WebGLCmdFuncExecuteCmds, WebGLCmdFuncUpdateBuffer, WebGLDeviceManager, WebGLPrimaryCommandBuffer;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseDefineJs) {
      BufferUsageBit = _baseDefineJs.BufferUsageBit;
    }, function (_webglCommandBufferJs) {
      WebGLCommandBuffer = _webglCommandBufferJs.WebGLCommandBuffer;
    }, function (_webglCommandsJs) {
      WebGLCmdFuncBeginRenderPass = _webglCommandsJs.WebGLCmdFuncBeginRenderPass;
      WebGLCmdFuncBindStates = _webglCommandsJs.WebGLCmdFuncBindStates;
      WebGLCmdFuncCopyBuffersToTexture = _webglCommandsJs.WebGLCmdFuncCopyBuffersToTexture;
      WebGLCmdFuncDraw = _webglCommandsJs.WebGLCmdFuncDraw;
      WebGLCmdFuncExecuteCmds = _webglCommandsJs.WebGLCmdFuncExecuteCmds;
      WebGLCmdFuncUpdateBuffer = _webglCommandsJs.WebGLCmdFuncUpdateBuffer;
    }, function (_webglDefineJs) {
      WebGLDeviceManager = _webglDefineJs.WebGLDeviceManager;
    }],
    execute: function () {
      _export("WebGLPrimaryCommandBuffer", WebGLPrimaryCommandBuffer = /*#__PURE__*/function (_WebGLCommandBuffer) {
        _inheritsLoose(WebGLPrimaryCommandBuffer, _WebGLCommandBuffer);

        function WebGLPrimaryCommandBuffer() {
          return _WebGLCommandBuffer.apply(this, arguments) || this;
        }

        var _proto = WebGLPrimaryCommandBuffer.prototype;

        _proto.beginRenderPass = function beginRenderPass(renderPass, framebuffer, renderArea, clearColors, clearDepth, clearStencil) {
          WebGLCmdFuncBeginRenderPass(WebGLDeviceManager.instance, renderPass.gpuRenderPass, framebuffer.gpuFramebuffer, renderArea, clearColors, clearDepth, clearStencil);
          this._isInRenderPass = true;
        };

        _proto.draw = function draw(infoOrAssembler) {
          if (this._isInRenderPass) {
            if (this._isStateInvalied) {
              this.bindStates();
            }

            var info = 'drawInfo' in infoOrAssembler ? infoOrAssembler.drawInfo : infoOrAssembler;
            WebGLCmdFuncDraw(WebGLDeviceManager.instance, info);
            ++this._numDrawCalls;
            this._numInstances += info.instanceCount;
            var indexCount = info.indexCount || info.vertexCount;

            if (this._curGPUPipelineState) {
              var glPrimitive = this._curGPUPipelineState.glPrimitive;

              switch (glPrimitive) {
                case 0x0004:
                  {
                    // WebGLRenderingContext.TRIANGLES
                    this._numTris += indexCount / 3 * Math.max(info.instanceCount, 1);
                    break;
                  }

                case 0x0005: // WebGLRenderingContext.TRIANGLE_STRIP

                case 0x0006:
                  {
                    // WebGLRenderingContext.TRIANGLE_FAN
                    this._numTris += (indexCount - 2) * Math.max(info.instanceCount, 1);
                    break;
                  }

                default:
              }
            }
          } else {
            console.error('Command \'draw\' must be recorded inside a render pass.');
          }
        };

        _proto.setViewport = function setViewport(viewport) {
          var _WebGLDeviceManager$i = WebGLDeviceManager.instance,
              cache = _WebGLDeviceManager$i.stateCache,
              gl = _WebGLDeviceManager$i.gl;

          if (cache.viewport.left !== viewport.left || cache.viewport.top !== viewport.top || cache.viewport.width !== viewport.width || cache.viewport.height !== viewport.height) {
            gl.viewport(viewport.left, viewport.top, viewport.width, viewport.height);
            cache.viewport.left = viewport.left;
            cache.viewport.top = viewport.top;
            cache.viewport.width = viewport.width;
            cache.viewport.height = viewport.height;
          }
        };

        _proto.setScissor = function setScissor(scissor) {
          var _WebGLDeviceManager$i2 = WebGLDeviceManager.instance,
              cache = _WebGLDeviceManager$i2.stateCache,
              gl = _WebGLDeviceManager$i2.gl;

          if (cache.scissorRect.x !== scissor.x || cache.scissorRect.y !== scissor.y || cache.scissorRect.width !== scissor.width || cache.scissorRect.height !== scissor.height) {
            gl.scissor(scissor.x, scissor.y, scissor.width, scissor.height);
            cache.scissorRect.x = scissor.x;
            cache.scissorRect.y = scissor.y;
            cache.scissorRect.width = scissor.width;
            cache.scissorRect.height = scissor.height;
          }
        };

        _proto.updateBuffer = function updateBuffer(buffer, data, size) {
          if (!this._isInRenderPass) {
            var gpuBuffer = buffer.gpuBuffer;

            if (gpuBuffer) {
              var buffSize;

              if (size !== undefined) {
                buffSize = size;
              } else if (buffer.usage & BufferUsageBit.INDIRECT) {
                buffSize = 0;
              } else {
                buffSize = data.byteLength;
              }

              WebGLCmdFuncUpdateBuffer(WebGLDeviceManager.instance, gpuBuffer, data, 0, buffSize);
            }
          } else {
            console.error('Command \'updateBuffer\' must be recorded outside a render pass.');
          }
        };

        _proto.copyBuffersToTexture = function copyBuffersToTexture(buffers, texture, regions) {
          if (!this._isInRenderPass) {
            var gpuTexture = texture.gpuTexture;

            if (gpuTexture) {
              WebGLCmdFuncCopyBuffersToTexture(WebGLDeviceManager.instance, buffers, gpuTexture, regions);
            }
          } else {
            console.error('Command \'copyBufferToTexture\' must be recorded outside a render pass.');
          }
        };

        _proto.execute = function execute(cmdBuffs, count) {
          for (var i = 0; i < count; ++i) {
            // actually they are secondary buffers, the cast here is only for type checking
            var webGLCmdBuff = cmdBuffs[i];
            WebGLCmdFuncExecuteCmds(WebGLDeviceManager.instance, webGLCmdBuff.cmdPackage);
            this._numDrawCalls += webGLCmdBuff._numDrawCalls;
            this._numInstances += webGLCmdBuff._numInstances;
            this._numTris += webGLCmdBuff._numTris;
          }
        };

        _proto.bindStates = function bindStates() {
          WebGLCmdFuncBindStates(WebGLDeviceManager.instance, this._curGPUPipelineState, this._curGPUInputAssembler, this._curGPUDescriptorSets, this._curDynamicOffsets, this._curDynamicStates);
          this._isStateInvalied = false;
        };

        return WebGLPrimaryCommandBuffer;
      }(WebGLCommandBuffer));
    }
  };
});
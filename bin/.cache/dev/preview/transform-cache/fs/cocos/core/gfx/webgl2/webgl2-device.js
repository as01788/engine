System.register("q-bundled:///fs/cocos/core/gfx/webgl2/webgl2-device.js", ["../base/device.js", "../base/states/sampler.js", "./webgl2-descriptor-set.js", "./webgl2-buffer.js", "./webgl2-command-buffer.js", "./webgl2-framebuffer.js", "./webgl2-input-assembler.js", "./webgl2-descriptor-set-layout.js", "./webgl2-pipeline-layout.js", "./webgl2-pipeline-state.js", "./webgl2-primary-command-buffer.js", "./webgl2-queue.js", "./webgl2-render-pass.js", "./states/webgl2-sampler.js", "./webgl2-shader.js", "./webgl2-swapchain.js", "./webgl2-texture.js", "../base/define.js", "./webgl2-commands.js", "../base/states/global-barrier.js", "../base/states/texture-barrier.js", "../../platform/debug.js", "./webgl2-define.js"], function (_export, _context) {
  "use strict";

  var Device, Sampler, WebGL2DescriptorSet, WebGL2Buffer, WebGL2CommandBuffer, WebGL2Framebuffer, WebGL2InputAssembler, WebGL2DescriptorSetLayout, WebGL2PipelineLayout, WebGL2PipelineState, WebGL2PrimaryCommandBuffer, WebGL2Queue, WebGL2RenderPass, WebGL2Sampler, WebGL2Shader, WebGL2Swapchain, getExtensions, getContext, WebGL2Texture, CommandBufferType, CommandBufferInfo, QueueInfo, QueueType, API, Feature, WebGL2CmdFuncCopyTextureToBuffers, WebGL2CmdFuncCopyBuffersToTexture, WebGL2CmdFuncCopyTexImagesToTexture, GlobalBarrier, TextureBarrier, debug, WebGL2DeviceManager, WebGL2Device;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseDeviceJs) {
      Device = _baseDeviceJs.Device;
    }, function (_baseStatesSamplerJs) {
      Sampler = _baseStatesSamplerJs.Sampler;
    }, function (_webgl2DescriptorSetJs) {
      WebGL2DescriptorSet = _webgl2DescriptorSetJs.WebGL2DescriptorSet;
    }, function (_webgl2BufferJs) {
      WebGL2Buffer = _webgl2BufferJs.WebGL2Buffer;
    }, function (_webgl2CommandBufferJs) {
      WebGL2CommandBuffer = _webgl2CommandBufferJs.WebGL2CommandBuffer;
    }, function (_webgl2FramebufferJs) {
      WebGL2Framebuffer = _webgl2FramebufferJs.WebGL2Framebuffer;
    }, function (_webgl2InputAssemblerJs) {
      WebGL2InputAssembler = _webgl2InputAssemblerJs.WebGL2InputAssembler;
    }, function (_webgl2DescriptorSetLayoutJs) {
      WebGL2DescriptorSetLayout = _webgl2DescriptorSetLayoutJs.WebGL2DescriptorSetLayout;
    }, function (_webgl2PipelineLayoutJs) {
      WebGL2PipelineLayout = _webgl2PipelineLayoutJs.WebGL2PipelineLayout;
    }, function (_webgl2PipelineStateJs) {
      WebGL2PipelineState = _webgl2PipelineStateJs.WebGL2PipelineState;
    }, function (_webgl2PrimaryCommandBufferJs) {
      WebGL2PrimaryCommandBuffer = _webgl2PrimaryCommandBufferJs.WebGL2PrimaryCommandBuffer;
    }, function (_webgl2QueueJs) {
      WebGL2Queue = _webgl2QueueJs.WebGL2Queue;
    }, function (_webgl2RenderPassJs) {
      WebGL2RenderPass = _webgl2RenderPassJs.WebGL2RenderPass;
    }, function (_statesWebgl2SamplerJs) {
      WebGL2Sampler = _statesWebgl2SamplerJs.WebGL2Sampler;
    }, function (_webgl2ShaderJs) {
      WebGL2Shader = _webgl2ShaderJs.WebGL2Shader;
    }, function (_webgl2SwapchainJs) {
      WebGL2Swapchain = _webgl2SwapchainJs.WebGL2Swapchain;
      getExtensions = _webgl2SwapchainJs.getExtensions;
      getContext = _webgl2SwapchainJs.getContext;
    }, function (_webgl2TextureJs) {
      WebGL2Texture = _webgl2TextureJs.WebGL2Texture;
    }, function (_baseDefineJs) {
      CommandBufferType = _baseDefineJs.CommandBufferType;
      CommandBufferInfo = _baseDefineJs.CommandBufferInfo;
      QueueInfo = _baseDefineJs.QueueInfo;
      QueueType = _baseDefineJs.QueueType;
      API = _baseDefineJs.API;
      Feature = _baseDefineJs.Feature;
    }, function (_webgl2CommandsJs) {
      WebGL2CmdFuncCopyTextureToBuffers = _webgl2CommandsJs.WebGL2CmdFuncCopyTextureToBuffers;
      WebGL2CmdFuncCopyBuffersToTexture = _webgl2CommandsJs.WebGL2CmdFuncCopyBuffersToTexture;
      WebGL2CmdFuncCopyTexImagesToTexture = _webgl2CommandsJs.WebGL2CmdFuncCopyTexImagesToTexture;
    }, function (_baseStatesGlobalBarrierJs) {
      GlobalBarrier = _baseStatesGlobalBarrierJs.GlobalBarrier;
    }, function (_baseStatesTextureBarrierJs) {
      TextureBarrier = _baseStatesTextureBarrierJs.TextureBarrier;
    }, function (_platformDebugJs) {
      debug = _platformDebugJs.debug;
    }, function (_webgl2DefineJs) {
      WebGL2DeviceManager = _webgl2DefineJs.WebGL2DeviceManager;
    }],
    execute: function () {
      _export("WebGL2Device", WebGL2Device = /*#__PURE__*/function (_Device) {
        _inheritsLoose(WebGL2Device, _Device);

        function WebGL2Device() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Device.call.apply(_Device, [this].concat(args)) || this;
          _this._swapchain = null;
          _this._context = null;
          return _this;
        }

        var _proto = WebGL2Device.prototype;

        _proto.initialize = function initialize(info) {
          WebGL2DeviceManager.setInstance(this);
          this._gfxAPI = API.WEBGL2;
          this._bindingMappingInfo = info.bindingMappingInfo;
          if (!this._bindingMappingInfo.bufferOffsets.length) this._bindingMappingInfo.bufferOffsets.push(0);
          if (!this._bindingMappingInfo.samplerOffsets.length) this._bindingMappingInfo.samplerOffsets.push(0);
          var gl = this._context = getContext(Device.canvas);

          if (!gl) {
            console.error('This device does not support WebGL.');
            return false;
          } // create queue


          this._queue = this.createQueue(new QueueInfo(QueueType.GRAPHICS));
          this._cmdBuff = this.createCommandBuffer(new CommandBufferInfo(this._queue));
          this._caps.maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
          this._caps.maxVertexUniformVectors = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
          this._caps.maxFragmentUniformVectors = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
          this._caps.maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
          this._caps.maxVertexTextureUnits = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
          this._caps.maxUniformBufferBindings = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);
          this._caps.maxUniformBlockSize = gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE);
          this._caps.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
          this._caps.maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
          this._caps.uboOffsetAlignment = gl.getParameter(gl.UNIFORM_BUFFER_OFFSET_ALIGNMENT);
          var extensions = gl.getSupportedExtensions();
          var extStr = '';

          if (extensions) {
            for (var _iterator = _createForOfIteratorHelperLoose(extensions), _step; !(_step = _iterator()).done;) {
              var ext = _step.value;
              extStr += ext + " ";
            }
          }

          var exts = getExtensions(gl);

          if (exts.WEBGL_debug_renderer_info) {
            this._renderer = gl.getParameter(exts.WEBGL_debug_renderer_info.UNMASKED_RENDERER_WEBGL);
            this._vendor = gl.getParameter(exts.WEBGL_debug_renderer_info.UNMASKED_VENDOR_WEBGL);
          } else {
            this._renderer = gl.getParameter(gl.RENDERER);
            this._vendor = gl.getParameter(gl.VENDOR);
          }

          var version = gl.getParameter(gl.VERSION);

          this._features.fill(false);

          this._features[Feature.TEXTURE_FLOAT] = true;
          this._features[Feature.TEXTURE_HALF_FLOAT] = true;
          this._features[Feature.FORMAT_R11G11B10F] = true;
          this._features[Feature.FORMAT_SRGB] = true;
          this._features[Feature.FORMAT_RGB8] = true;
          this._features[Feature.ELEMENT_INDEX_UINT] = true;
          this._features[Feature.INSTANCED_ARRAYS] = true;
          this._features[Feature.MULTIPLE_RENDER_TARGETS] = true;
          this._features[Feature.BLEND_MINMAX] = true;

          if (exts.EXT_color_buffer_float) {
            this._features[Feature.COLOR_FLOAT] = true;
            this._features[Feature.COLOR_HALF_FLOAT] = true;
          }

          if (exts.OES_texture_float_linear) {
            this._features[Feature.TEXTURE_FLOAT_LINEAR] = true;
          }

          if (exts.OES_texture_half_float_linear) {
            this._features[Feature.TEXTURE_HALF_FLOAT_LINEAR] = true;
          }

          var compressedFormat = '';

          if (exts.WEBGL_compressed_texture_etc1) {
            this._features[Feature.FORMAT_ETC1] = true;
            compressedFormat += 'etc1 ';
          }

          if (exts.WEBGL_compressed_texture_etc) {
            this._features[Feature.FORMAT_ETC2] = true;
            compressedFormat += 'etc2 ';
          }

          if (exts.WEBGL_compressed_texture_s3tc) {
            this._features[Feature.FORMAT_DXT] = true;
            compressedFormat += 'dxt ';
          }

          if (exts.WEBGL_compressed_texture_pvrtc) {
            this._features[Feature.FORMAT_PVRTC] = true;
            compressedFormat += 'pvrtc ';
          }

          if (exts.WEBGL_compressed_texture_astc) {
            this._features[Feature.FORMAT_ASTC] = true;
            compressedFormat += 'astc ';
          }

          debug('WebGL2 device initialized.');
          debug("RENDERER: " + this._renderer);
          debug("VENDOR: " + this._vendor);
          debug("VERSION: " + version);
          debug("COMPRESSED_FORMAT: " + compressedFormat);
          debug("EXTENSIONS: " + extStr);
          return true;
        };

        _proto.destroy = function destroy() {
          if (this._queue) {
            this._queue.destroy();

            this._queue = null;
          }

          if (this._cmdBuff) {
            this._cmdBuff.destroy();

            this._cmdBuff = null;
          }

          var it = this._samplers.values();

          var res = it.next();

          while (!res.done) {
            res.value.destroy();
            res = it.next();
          }

          this._swapchain = null;
        };

        _proto.flushCommands = function flushCommands(cmdBuffs) {};

        _proto.acquire = function acquire(swapchains) {};

        _proto.present = function present() {
          var queue = this._queue;
          this._numDrawCalls = queue.numDrawCalls;
          this._numInstances = queue.numInstances;
          this._numTris = queue.numTris;
          queue.clear();
        };

        _proto.createCommandBuffer = function createCommandBuffer(info) {
          // const Ctor = WebGLCommandBuffer; // opt to instant invocation
          var Ctor = info.type === CommandBufferType.PRIMARY ? WebGL2PrimaryCommandBuffer : WebGL2CommandBuffer;
          var cmdBuff = new Ctor();
          cmdBuff.initialize(info);
          return cmdBuff;
        };

        _proto.createSwapchain = function createSwapchain(info) {
          var swapchain = new WebGL2Swapchain();
          this._swapchain = swapchain;
          swapchain.initialize(info);
          return swapchain;
        };

        _proto.createBuffer = function createBuffer(info) {
          var buffer = new WebGL2Buffer();
          buffer.initialize(info);
          return buffer;
        };

        _proto.createTexture = function createTexture(info) {
          var texture = new WebGL2Texture();
          texture.initialize(info);
          return texture;
        };

        _proto.createDescriptorSet = function createDescriptorSet(info) {
          var descriptorSet = new WebGL2DescriptorSet();
          descriptorSet.initialize(info);
          return descriptorSet;
        };

        _proto.createShader = function createShader(info) {
          var shader = new WebGL2Shader();
          shader.initialize(info);
          return shader;
        };

        _proto.createInputAssembler = function createInputAssembler(info) {
          var inputAssembler = new WebGL2InputAssembler();
          inputAssembler.initialize(info);
          return inputAssembler;
        };

        _proto.createRenderPass = function createRenderPass(info) {
          var renderPass = new WebGL2RenderPass();
          renderPass.initialize(info);
          return renderPass;
        };

        _proto.createFramebuffer = function createFramebuffer(info) {
          var framebuffer = new WebGL2Framebuffer();
          framebuffer.initialize(info);
          return framebuffer;
        };

        _proto.createDescriptorSetLayout = function createDescriptorSetLayout(info) {
          var descriptorSetLayout = new WebGL2DescriptorSetLayout();
          descriptorSetLayout.initialize(info);
          return descriptorSetLayout;
        };

        _proto.createPipelineLayout = function createPipelineLayout(info) {
          var pipelineLayout = new WebGL2PipelineLayout();
          pipelineLayout.initialize(info);
          return pipelineLayout;
        };

        _proto.createPipelineState = function createPipelineState(info) {
          var pipelineState = new WebGL2PipelineState();
          pipelineState.initialize(info);
          return pipelineState;
        };

        _proto.createQueue = function createQueue(info) {
          var queue = new WebGL2Queue();
          queue.initialize(info);
          return queue;
        };

        _proto.getSampler = function getSampler(info) {
          var hash = Sampler.computeHash(info);

          if (!this._samplers.has(hash)) {
            this._samplers.set(hash, new WebGL2Sampler(info, hash));
          }

          return this._samplers.get(hash);
        };

        _proto.getGlobalBarrier = function getGlobalBarrier(info) {
          var hash = GlobalBarrier.computeHash(info);

          if (!this._globalBarriers.has(hash)) {
            this._globalBarriers.set(hash, new GlobalBarrier(info, hash));
          }

          return this._globalBarriers.get(hash);
        };

        _proto.getTextureBarrier = function getTextureBarrier(info) {
          var hash = TextureBarrier.computeHash(info);

          if (!this._textureBarriers.has(hash)) {
            this._textureBarriers.set(hash, new TextureBarrier(info, hash));
          }

          return this._textureBarriers.get(hash);
        };

        _proto.copyBuffersToTexture = function copyBuffersToTexture(buffers, texture, regions) {
          WebGL2CmdFuncCopyBuffersToTexture(this, buffers, texture.gpuTexture, regions);
        };

        _proto.copyTextureToBuffers = function copyTextureToBuffers(texture, buffers, regions) {
          WebGL2CmdFuncCopyTextureToBuffers(this, texture.gpuTexture, buffers, regions);
        };

        _proto.copyTexImagesToTexture = function copyTexImagesToTexture(texImages, texture, regions) {
          WebGL2CmdFuncCopyTexImagesToTexture(this, texImages, texture.gpuTexture, regions);
        };

        _createClass(WebGL2Device, [{
          key: "gl",
          get: function get() {
            return this._context;
          }
        }, {
          key: "extensions",
          get: function get() {
            return this._swapchain.extensions;
          }
        }, {
          key: "stateCache",
          get: function get() {
            return this._swapchain.stateCache;
          }
        }, {
          key: "nullTex2D",
          get: function get() {
            return this._swapchain.nullTex2D;
          }
        }, {
          key: "nullTexCube",
          get: function get() {
            return this._swapchain.nullTexCube;
          }
        }]);

        return WebGL2Device;
      }(Device));
    }
  };
});
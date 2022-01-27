System.register("q-bundled:///fs/cocos/core/gfx/webgl/webgl-device.js", ["../base/device.js", "../base/states/sampler.js", "./webgl-descriptor-set.js", "./webgl-buffer.js", "./webgl-command-buffer.js", "./webgl-framebuffer.js", "./webgl-input-assembler.js", "./webgl-descriptor-set-layout.js", "./webgl-pipeline-layout.js", "./webgl-pipeline-state.js", "./webgl-primary-command-buffer.js", "./webgl-queue.js", "./webgl-render-pass.js", "./states/webgl-sampler.js", "./webgl-shader.js", "./webgl-swapchain.js", "./webgl-texture.js", "../base/define.js", "./webgl-commands.js", "../base/states/global-barrier.js", "../base/states/texture-barrier.js", "../../platform/debug.js", "./webgl-define.js"], function (_export, _context) {
  "use strict";

  var Device, Sampler, WebGLDescriptorSet, WebGLBuffer, WebGLCommandBuffer, WebGLFramebuffer, WebGLInputAssembler, WebGLDescriptorSetLayout, WebGLPipelineLayout, WebGLPipelineState, WebGLPrimaryCommandBuffer, WebGLQueue, WebGLRenderPass, WebGLSampler, WebGLShader, getContext, getExtensions, WebGLSwapchain, WebGLTexture, CommandBufferType, QueueInfo, CommandBufferInfo, QueueType, API, Feature, WebGLCmdFuncCopyBuffersToTexture, WebGLCmdFuncCopyTextureToBuffers, WebGLCmdFuncCopyTexImagesToTexture, GlobalBarrier, TextureBarrier, debug, WebGLDeviceManager, WebGLDevice;

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
    }, function (_webglDescriptorSetJs) {
      WebGLDescriptorSet = _webglDescriptorSetJs.WebGLDescriptorSet;
    }, function (_webglBufferJs) {
      WebGLBuffer = _webglBufferJs.WebGLBuffer;
    }, function (_webglCommandBufferJs) {
      WebGLCommandBuffer = _webglCommandBufferJs.WebGLCommandBuffer;
    }, function (_webglFramebufferJs) {
      WebGLFramebuffer = _webglFramebufferJs.WebGLFramebuffer;
    }, function (_webglInputAssemblerJs) {
      WebGLInputAssembler = _webglInputAssemblerJs.WebGLInputAssembler;
    }, function (_webglDescriptorSetLayoutJs) {
      WebGLDescriptorSetLayout = _webglDescriptorSetLayoutJs.WebGLDescriptorSetLayout;
    }, function (_webglPipelineLayoutJs) {
      WebGLPipelineLayout = _webglPipelineLayoutJs.WebGLPipelineLayout;
    }, function (_webglPipelineStateJs) {
      WebGLPipelineState = _webglPipelineStateJs.WebGLPipelineState;
    }, function (_webglPrimaryCommandBufferJs) {
      WebGLPrimaryCommandBuffer = _webglPrimaryCommandBufferJs.WebGLPrimaryCommandBuffer;
    }, function (_webglQueueJs) {
      WebGLQueue = _webglQueueJs.WebGLQueue;
    }, function (_webglRenderPassJs) {
      WebGLRenderPass = _webglRenderPassJs.WebGLRenderPass;
    }, function (_statesWebglSamplerJs) {
      WebGLSampler = _statesWebglSamplerJs.WebGLSampler;
    }, function (_webglShaderJs) {
      WebGLShader = _webglShaderJs.WebGLShader;
    }, function (_webglSwapchainJs) {
      getContext = _webglSwapchainJs.getContext;
      getExtensions = _webglSwapchainJs.getExtensions;
      WebGLSwapchain = _webglSwapchainJs.WebGLSwapchain;
    }, function (_webglTextureJs) {
      WebGLTexture = _webglTextureJs.WebGLTexture;
    }, function (_baseDefineJs) {
      CommandBufferType = _baseDefineJs.CommandBufferType;
      QueueInfo = _baseDefineJs.QueueInfo;
      CommandBufferInfo = _baseDefineJs.CommandBufferInfo;
      QueueType = _baseDefineJs.QueueType;
      API = _baseDefineJs.API;
      Feature = _baseDefineJs.Feature;
    }, function (_webglCommandsJs) {
      WebGLCmdFuncCopyBuffersToTexture = _webglCommandsJs.WebGLCmdFuncCopyBuffersToTexture;
      WebGLCmdFuncCopyTextureToBuffers = _webglCommandsJs.WebGLCmdFuncCopyTextureToBuffers;
      WebGLCmdFuncCopyTexImagesToTexture = _webglCommandsJs.WebGLCmdFuncCopyTexImagesToTexture;
    }, function (_baseStatesGlobalBarrierJs) {
      GlobalBarrier = _baseStatesGlobalBarrierJs.GlobalBarrier;
    }, function (_baseStatesTextureBarrierJs) {
      TextureBarrier = _baseStatesTextureBarrierJs.TextureBarrier;
    }, function (_platformDebugJs) {
      debug = _platformDebugJs.debug;
    }, function (_webglDefineJs) {
      WebGLDeviceManager = _webglDefineJs.WebGLDeviceManager;
    }],
    execute: function () {
      _export("WebGLDevice", WebGLDevice = /*#__PURE__*/function (_Device) {
        _inheritsLoose(WebGLDevice, _Device);

        function WebGLDevice() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Device.call.apply(_Device, [this].concat(args)) || this;
          _this._swapchain = null;
          _this._context = null;
          return _this;
        }

        var _proto = WebGLDevice.prototype;

        _proto.initialize = function initialize(info) {
          WebGLDeviceManager.setInstance(this);
          this._gfxAPI = API.WEBGL;
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
          this._caps.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
          this._caps.maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
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

          if (exts.EXT_sRGB) {
            this._features[Feature.FORMAT_SRGB] = true;
          }

          if (exts.EXT_blend_minmax) {
            this._features[Feature.BLEND_MINMAX] = true;
          }

          if (exts.WEBGL_color_buffer_float) {
            this._features[Feature.COLOR_FLOAT] = true;
          }

          if (exts.EXT_color_buffer_half_float) {
            this._features[Feature.COLOR_HALF_FLOAT] = true;
          }

          if (exts.OES_texture_float) {
            this._features[Feature.TEXTURE_FLOAT] = true;
          }

          if (exts.OES_texture_half_float) {
            this._features[Feature.TEXTURE_HALF_FLOAT] = true;
          }

          if (exts.OES_texture_float_linear) {
            this._features[Feature.TEXTURE_FLOAT_LINEAR] = true;
          }

          if (exts.OES_texture_half_float_linear) {
            this._features[Feature.TEXTURE_HALF_FLOAT_LINEAR] = true;
          }

          this._features[Feature.FORMAT_RGB8] = true;

          if (exts.OES_element_index_uint) {
            this._features[Feature.ELEMENT_INDEX_UINT] = true;
          }

          if (exts.ANGLE_instanced_arrays) {
            this._features[Feature.INSTANCED_ARRAYS] = true;
          }

          if (exts.WEBGL_draw_buffers) {
            this._features[Feature.MULTIPLE_RENDER_TARGETS] = true;
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

          debug('WebGL device initialized.');
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
          var Ctor = info.type === CommandBufferType.PRIMARY ? WebGLPrimaryCommandBuffer : WebGLCommandBuffer;
          var cmdBuff = new Ctor();
          cmdBuff.initialize(info);
          return cmdBuff;
        };

        _proto.createSwapchain = function createSwapchain(info) {
          var swapchain = new WebGLSwapchain();
          this._swapchain = swapchain;
          swapchain.initialize(info);
          return swapchain;
        };

        _proto.createBuffer = function createBuffer(info) {
          var buffer = new WebGLBuffer();
          buffer.initialize(info);
          return buffer;
        };

        _proto.createTexture = function createTexture(info) {
          var texture = new WebGLTexture();
          texture.initialize(info);
          return texture;
        };

        _proto.createDescriptorSet = function createDescriptorSet(info) {
          var descriptorSet = new WebGLDescriptorSet();
          descriptorSet.initialize(info);
          return descriptorSet;
        };

        _proto.createShader = function createShader(info) {
          var shader = new WebGLShader();
          shader.initialize(info);
          return shader;
        };

        _proto.createInputAssembler = function createInputAssembler(info) {
          var inputAssembler = new WebGLInputAssembler();
          inputAssembler.initialize(info);
          return inputAssembler;
        };

        _proto.createRenderPass = function createRenderPass(info) {
          var renderPass = new WebGLRenderPass();
          renderPass.initialize(info);
          return renderPass;
        };

        _proto.createFramebuffer = function createFramebuffer(info) {
          var framebuffer = new WebGLFramebuffer();
          framebuffer.initialize(info);
          return framebuffer;
        };

        _proto.createDescriptorSetLayout = function createDescriptorSetLayout(info) {
          var descriptorSetLayout = new WebGLDescriptorSetLayout();
          descriptorSetLayout.initialize(info);
          return descriptorSetLayout;
        };

        _proto.createPipelineLayout = function createPipelineLayout(info) {
          var pipelineLayout = new WebGLPipelineLayout();
          pipelineLayout.initialize(info);
          return pipelineLayout;
        };

        _proto.createPipelineState = function createPipelineState(info) {
          var pipelineState = new WebGLPipelineState();
          pipelineState.initialize(info);
          return pipelineState;
        };

        _proto.createQueue = function createQueue(info) {
          var queue = new WebGLQueue();
          queue.initialize(info);
          return queue;
        };

        _proto.getSampler = function getSampler(info) {
          var hash = Sampler.computeHash(info);

          if (!this._samplers.has(hash)) {
            this._samplers.set(hash, new WebGLSampler(info, hash));
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
          WebGLCmdFuncCopyBuffersToTexture(this, buffers, texture.gpuTexture, regions);
        };

        _proto.copyTextureToBuffers = function copyTextureToBuffers(texture, buffers, regions) {
          WebGLCmdFuncCopyTextureToBuffers(this, texture.gpuTexture, buffers, regions);
        };

        _proto.copyTexImagesToTexture = function copyTexImagesToTexture(texImages, texture, regions) {
          WebGLCmdFuncCopyTexImagesToTexture(this, texImages, texture.gpuTexture, regions);
        };

        _createClass(WebGLDevice, [{
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

        return WebGLDevice;
      }(Device));
    }
  };
});
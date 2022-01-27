"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  BlendTarget: true,
  BlendState: true,
  RasterizerState: true,
  DepthStencilState: true,
  PipelineState: true,
  PipelineStateInfo: true
};
exports.PipelineStateInfo = exports.PipelineState = exports.DepthStencilState = exports.RasterizerState = exports.BlendState = exports.BlendTarget = void 0;

var _globalExports = require("../global-exports.js");

var defines = _interopRequireWildcard(require("./base/define.js"));

Object.keys(defines).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === defines[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return defines[key];
    }
  });
});

var pso = _interopRequireWildcard(require("./pipeline-state.jsb.js"));

var _descriptorSet = require("./base/descriptor-set.js");

Object.keys(_descriptorSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _descriptorSet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _descriptorSet[key];
    }
  });
});

var _buffer = require("./base/buffer.js");

Object.keys(_buffer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _buffer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _buffer[key];
    }
  });
});

var _commandBuffer = require("./base/command-buffer.js");

Object.keys(_commandBuffer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _commandBuffer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _commandBuffer[key];
    }
  });
});

var _device = require("./base/device.js");

Object.keys(_device).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _device[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _device[key];
    }
  });
});

var _swapchain = require("./base/swapchain.js");

Object.keys(_swapchain).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _swapchain[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swapchain[key];
    }
  });
});

var _framebuffer = require("./base/framebuffer.js");

Object.keys(_framebuffer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _framebuffer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _framebuffer[key];
    }
  });
});

var _inputAssembler = require("./base/input-assembler.js");

Object.keys(_inputAssembler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _inputAssembler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inputAssembler[key];
    }
  });
});

var _descriptorSetLayout = require("./base/descriptor-set-layout.js");

Object.keys(_descriptorSetLayout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _descriptorSetLayout[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _descriptorSetLayout[key];
    }
  });
});

var _pipelineLayout = require("./base/pipeline-layout.js");

Object.keys(_pipelineLayout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _pipelineLayout[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pipelineLayout[key];
    }
  });
});

var _queue = require("./base/queue.js");

Object.keys(_queue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _queue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queue[key];
    }
  });
});

var _renderPass = require("./base/render-pass.js");

Object.keys(_renderPass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _renderPass[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renderPass[key];
    }
  });
});

var _shader = require("./base/shader.js");

Object.keys(_shader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _shader[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _shader[key];
    }
  });
});

var _texture = require("./base/texture.js");

Object.keys(_texture).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _texture[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _texture[key];
    }
  });
});

var _sampler = require("./base/states/sampler.js");

Object.keys(_sampler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _sampler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sampler[key];
    }
  });
});

var _globalBarrier = require("./base/states/global-barrier.js");

Object.keys(_globalBarrier).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _globalBarrier[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _globalBarrier[key];
    }
  });
});

var _textureBarrier = require("./base/states/texture-barrier.js");

Object.keys(_textureBarrier).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _textureBarrier[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _textureBarrier[key];
    }
  });
});

require("./deprecated-3.0.0.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @module gfx
 */
const polyfillCC = Object.assign({}, defines);
polyfillCC.Device = gfx.Device;
polyfillCC.Swapchain = gfx.Swapchain;
polyfillCC.Buffer = gfx.Buffer;
polyfillCC.Texture = gfx.Texture;
polyfillCC.Sampler = gfx.Sampler;
polyfillCC.Shader = gfx.Shader;
polyfillCC.InputAssembler = gfx.InputAssembler;
polyfillCC.RenderPass = gfx.RenderPass;
polyfillCC.Framebuffer = gfx.Framebuffer;
polyfillCC.DescriptorSet = gfx.DescriptorSet;
polyfillCC.DescriptorSetLayout = gfx.DescriptorSetLayout;
polyfillCC.PipelineLayout = gfx.PipelineLayout;
polyfillCC.PipelineState = gfx.PipelineState;
polyfillCC.CommandBuffer = gfx.CommandBuffer;
polyfillCC.Queue = gfx.Queue;
_globalExports.legacyCC.gfx = polyfillCC; // TODO: remove these after state info refactor

const BlendTarget = pso.BlendTarget;
exports.BlendTarget = BlendTarget;
const BlendState = pso.BlendState;
exports.BlendState = BlendState;
const RasterizerState = pso.RasterizerState;
exports.RasterizerState = RasterizerState;
const DepthStencilState = pso.DepthStencilState;
exports.DepthStencilState = DepthStencilState;
const PipelineState = pso.PipelineState;
exports.PipelineState = PipelineState;
const PipelineStateInfo = pso.PipelineStateInfo;
exports.PipelineStateInfo = PipelineStateInfo;
polyfillCC.BlendTarget = pso.BlendTarget;
polyfillCC.BlendState = pso.BlendState;
polyfillCC.RasterizerState = pso.RasterizerState;
polyfillCC.DepthStencilState = pso.DepthStencilState;
polyfillCC.PipelineStateInfo = pso.PipelineStateInfo;
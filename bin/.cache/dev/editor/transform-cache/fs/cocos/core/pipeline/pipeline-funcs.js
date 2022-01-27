"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SRGBToLinear = SRGBToLinear;
exports.LinearToSRGB = LinearToSRGB;
exports.decideProfilerCamera = decideProfilerCamera;
exports.renderProfiler = renderProfiler;

var _index = require("../gfx/index.js");

var _pipelineStateManager = require("./pipeline-state-manager.js");

var _define = require("./define.js");

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
 * @module pipeline
 */
const profilerViewport = new _index.Viewport();
const profilerScissor = new _index.Rect();
/**
 * @en Convert color in SRGB space to linear space
 * @zh SRGB 颜色空间转换为线性空间。
 * @param out Output color object
 * @param gamma Gamma value in SRGB space
 */

function SRGBToLinear(out, gamma) {
  // out.x = Math.pow(gamma.x, 2.2);
  // out.y = Math.pow(gamma.y, 2.2);
  // out.z = Math.pow(gamma.z, 2.2);
  out.x = gamma.x * gamma.x;
  out.y = gamma.y * gamma.y;
  out.z = gamma.z * gamma.z;
}
/**
 * @en Convert color in linear space to SRGB space
 * @zh 线性空间转换为 SRGB 颜色空间。
 * @param out Output color object
 * @param linear Color value in linear space
 */


function LinearToSRGB(out, linear) {
  // out.x = Math.pow(linear.x, 0.454545);
  // out.y = Math.pow(linear.y, 0.454545);
  // out.z = Math.pow(linear.z, 0.454545);
  out.x = Math.sqrt(linear.x);
  out.y = Math.sqrt(linear.y);
  out.z = Math.sqrt(linear.z);
}

let profilerCamera = null;

function decideProfilerCamera(cameras) {
  for (let i = cameras.length - 1; i >= 0; --i) {
    const camera = cameras[i];

    if (camera.window.swapchain) {
      profilerCamera = camera;
      return;
    }
  }

  profilerCamera = null;
}

function renderProfiler(device, renderPass, cmdBuff, profiler, camera) {
  if (profiler && profiler.enabled && camera === profilerCamera) {
    const {
      inputAssembler,
      passes,
      shaders,
      descriptorSet
    } = profiler.subModels[0];
    profilerViewport.width = profilerScissor.width = camera.window.width;
    profilerViewport.height = profilerScissor.height = camera.window.height;

    const pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(device, passes[0], shaders[0], renderPass, inputAssembler);

    cmdBuff.setViewport(profilerViewport);
    cmdBuff.setScissor(profilerScissor);
    cmdBuff.bindPipelineState(pso);
    cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, passes[0].descriptorSet);
    cmdBuff.bindDescriptorSet(_define.SetIndex.LOCAL, descriptorSet);
    cmdBuff.bindInputAssembler(inputAssembler);
    cmdBuff.draw(inputAssembler);
  }
}
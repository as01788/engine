"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticleModuleBase = exports.PARTICLE_MODULE_PROPERTY = exports.PARTICLE_MODULE_ORDER = exports.PARTICLE_MODULE_NAME = exports.Particle = void 0;

var _index = require("../core/math/index.js");

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
 * @hidden
 */
class Particle {
  // uint
  constructor(particleSystem) {
    this.particleSystem = void 0;
    this.position = void 0;
    this.velocity = void 0;
    this.animatedVelocity = void 0;
    this.ultimateVelocity = void 0;
    this.angularVelocity = void 0;
    this.axisOfRotation = void 0;
    this.rotation = void 0;
    this.startEuler = void 0;
    this.startRotation = void 0;
    this.startRotated = void 0;
    this.deltaQuat = void 0;
    this.deltaMat = void 0;
    this.localMat = void 0;
    this.startSize = void 0;
    this.size = void 0;
    this.startColor = void 0;
    this.color = void 0;
    this.randomSeed = void 0;
    this.remainingLifetime = void 0;
    this.loopCount = void 0;
    this.lastLoop = void 0;
    this.trailDelay = void 0;
    this.startLifetime = void 0;
    this.emitAccumulator0 = void 0;
    this.emitAccumulator1 = void 0;
    this.frameIndex = void 0;
    this.startRow = void 0;
    this.particleSystem = particleSystem;
    this.position = new _index.Vec3(0, 0, 0);
    this.velocity = new _index.Vec3(0, 0, 0);
    this.animatedVelocity = new _index.Vec3(0, 0, 0);
    this.ultimateVelocity = new _index.Vec3(0, 0, 0);
    this.angularVelocity = new _index.Vec3(0, 0, 0);
    this.axisOfRotation = new _index.Vec3(0, 0, 0);
    this.rotation = new _index.Vec3(0, 0, 0);
    this.startEuler = new _index.Vec3(0, 0, 0);
    this.startRotation = new _index.Quat();
    this.startRotated = false;
    this.deltaQuat = new _index.Quat();
    this.deltaMat = new _index.Mat4();
    this.localMat = new _index.Mat4();
    this.startSize = new _index.Vec3(0, 0, 0);
    this.size = new _index.Vec3(0, 0, 0);
    this.startColor = _index.Color.WHITE.clone();
    this.color = _index.Color.WHITE.clone();
    this.randomSeed = 0; // uint

    this.remainingLifetime = 0.0;
    this.loopCount = 0;
    this.lastLoop = 0;
    this.trailDelay = 0;
    this.startLifetime = 0.0;
    this.emitAccumulator0 = 0.0;
    this.emitAccumulator1 = 0.0;
    this.frameIndex = 0.0;
    this.startRow = 0;
  }

  reset() {
    this.rotation.set(0, 0, 0);
    this.startEuler.set(0, 0, 0);
    this.startRotation.set(0, 0, 0, 1);
    this.startRotated = false;
    this.deltaQuat.set(0, 0, 0, 1);
    this.deltaMat.identity();
    this.localMat.identity();
  }

}

exports.Particle = Particle;
Particle.INDENTIFY_NEG_QUAT = 10;
Particle.R2D = 180.0 / Math.PI;
const PARTICLE_MODULE_NAME = {
  COLOR: 'colorModule',
  FORCE: 'forceModule',
  LIMIT: 'limitModule',
  ROTATION: 'rotationModule',
  SIZE: 'sizeModule',
  VELOCITY: 'velocityModule',
  TEXTURE: 'textureModule'
};
exports.PARTICLE_MODULE_NAME = PARTICLE_MODULE_NAME;
const PARTICLE_MODULE_ORDER = ['sizeModule', 'colorModule', 'forceModule', 'velocityModule', 'limitModule', 'rotationModule', 'textureModule'];
exports.PARTICLE_MODULE_ORDER = PARTICLE_MODULE_ORDER;
const PARTICLE_MODULE_PROPERTY = ['_colorOverLifetimeModule', '_shapeModule', '_sizeOvertimeModule', '_velocityOvertimeModule', '_forceOvertimeModule', '_limitVelocityOvertimeModule', '_rotationOvertimeModule', '_textureAnimationModule', '_trailModule'];
exports.PARTICLE_MODULE_PROPERTY = PARTICLE_MODULE_PROPERTY;

class ParticleModuleBase {
  constructor() {
    this.target = null;
    this.needUpdate = false;
    this.needAnimate = true;
    this.name = void 0;
  }

  bindTarget(target) {
    this.target = target;
  }

  update(space, trans) {}

}

exports.ParticleModuleBase = ParticleModuleBase;
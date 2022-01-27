"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticleCuller = void 0;

var _particle = require("./particle.js");

var _nodeEnum = require("../core/scene-graph/node-enum.js");

var _enum = require("./enum.js");

var _index = require("../core/index.js");

var _bits = require("../core/math/bits.js");

var _particleGeneralFunction = require("./particle-general-function.js");

var _index2 = require("../core/geometry/index.js");

/* eslint-disable @typescript-eslint/restrict-plus-operands */

/* eslint-disable max-len */

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
const _node_mat = new _index.Mat4();

const _node_rol = new _index.Quat();

const _node_scale = new _index.Vec3();

const _anim_module = ['_colorOverLifetimeModule', '_sizeOvertimeModule', '_velocityOvertimeModule', '_forceOvertimeModule', '_limitVelocityOvertimeModule', '_rotationOvertimeModule', '_textureAnimationModule'];

class ParticleCuller {
  constructor(ps) {
    this._particleSystem = void 0;
    this._processor = void 0;
    this._node = void 0;
    this._particlesAll = void 0;
    this._updateList = new Map();
    this._animateList = new Map();
    this._runAnimateList = new Array();
    this._localMat = new _index.Mat4();
    this._gravity = new _index.Vec4();
    this.minPos = new _index.Vec3();
    this.maxPos = new _index.Vec3();
    this._nodePos = new _index.Vec3();
    this._nodeSize = new _index.Vec3();
    this._particleSystem = ps;
    this._processor = this._particleSystem.processor;
    this._node = ps.node;
    this._particlesAll = [];

    this._initModuleList();
  }

  _updateBoundingNode() {
    this._nodeSize.set(this.maxPos.x - this.minPos.x, this.maxPos.y - this.minPos.y, this.maxPos.z - this.minPos.z);

    this._nodePos.set(this.minPos.x + this._nodeSize.x * 0.5, this.minPos.y + this._nodeSize.y * 0.5, this.minPos.z + this._nodeSize.z * 0.5);
  }

  setBoundingBoxSize(halfExt) {
    this.maxPos.x = this._nodePos.x + halfExt.x;
    this.maxPos.y = this._nodePos.y + halfExt.y;
    this.maxPos.z = this._nodePos.z + halfExt.z;
    this.minPos.x = this._nodePos.x - halfExt.x;
    this.minPos.y = this._nodePos.y - halfExt.y;
    this.minPos.z = this._nodePos.z - halfExt.z;

    this._updateBoundingNode();
  }

  setBoundingBoxCenter(px, py, pz) {
    this.maxPos.x = px + this._nodeSize.x * 0.5;
    this.maxPos.y = py + this._nodeSize.y * 0.5;
    this.maxPos.z = pz + this._nodeSize.z * 0.5;
    this.minPos.x = px - this._nodeSize.x * 0.5;
    this.minPos.y = py - this._nodeSize.y * 0.5;
    this.minPos.z = pz - this._nodeSize.z * 0.5;

    this._updateBoundingNode();
  }

  _initModuleList() {
    _anim_module.forEach(val => {
      const pm = this._particleSystem[val];

      if (pm && pm.enable) {
        if (pm.needUpdate) {
          this._updateList[pm.name] = pm;
        }

        if (pm.needAnimate) {
          this._animateList[pm.name] = pm;
        }
      }
    }); // reorder


    this._runAnimateList.length = 0;

    for (let i = 0, len = _particle.PARTICLE_MODULE_ORDER.length; i < len; i++) {
      const p = this._animateList[_particle.PARTICLE_MODULE_ORDER[i]];

      if (p) {
        this._runAnimateList.push(p);
      }
    }
  }

  _emit(count, dt, particleLst) {
    const ps = this._particleSystem;
    const node = this._node;
    const loopDelta = ps.time % ps.duration / ps.duration; // loop delta value

    node.invalidateChildren(_nodeEnum.TransformBit.POSITION);

    if (ps.simulationSpace === _enum.Space.World) {
      node.getWorldMatrix(_node_mat);
      node.getWorldRotation(_node_rol);
    }

    for (let i = 0; i < count; ++i) {
      const particle = new _particle.Particle(ps);
      particle.particleSystem = ps;
      particle.reset();
      const rand = (0, _index.pseudoRandom)((0, _index.randomRangeInt)(0, _bits.INT_MAX));

      if (ps._shapeModule && ps._shapeModule.enable) {
        ps._shapeModule.emit(particle);
      } else {
        _index.Vec3.set(particle.position, 0, 0, 0);

        _index.Vec3.copy(particle.velocity, _particleGeneralFunction.particleEmitZAxis);
      }

      if (ps._textureAnimationModule && ps._textureAnimationModule.enable) {
        ps._textureAnimationModule.init(particle);
      }

      const curveStartSpeed = ps.startSpeed.evaluate(loopDelta, rand);

      _index.Vec3.multiplyScalar(particle.velocity, particle.velocity, curveStartSpeed);

      if (ps.simulationSpace === _enum.Space.World) {
        _index.Vec3.transformMat4(particle.position, particle.position, _node_mat);

        _index.Vec3.transformQuat(particle.velocity, particle.velocity, _node_rol);
      }

      _index.Vec3.copy(particle.ultimateVelocity, particle.velocity); // apply startRotation.


      _index.Vec3.set(particle.rotation, 0, 0, 0); // apply startSize.


      if (ps.startSize3D) {
        _index.Vec3.set(particle.startSize, ps.startSizeX.evaluate(loopDelta, rand), ps.startSizeY.evaluate(loopDelta, rand), ps.startSizeZ.evaluate(loopDelta, rand));
      } else {
        _index.Vec3.set(particle.startSize, ps.startSizeX.evaluate(loopDelta, rand), 1, 1);

        particle.startSize.y = particle.startSize.x;
      }

      _index.Vec3.copy(particle.size, particle.startSize); // apply startLifetime.


      particle.startLifetime = ps.startLifetime.evaluate(loopDelta, rand) + dt;
      particle.remainingLifetime = particle.startLifetime;
      particleLst.push(particle);
    }
  }

  _updateParticles(dt, particleLst) {
    const ps = this._particleSystem;
    ps.node.getWorldMatrix(_node_mat);

    switch (ps.scaleSpace) {
      case _enum.Space.Local:
        ps.node.getScale(_node_scale);
        break;

      case _enum.Space.World:
        ps.node.getWorldScale(_node_scale);
        break;

      default:
        break;
    }

    this._updateList.forEach((value, key) => {
      value.update(ps.simulationSpace, _node_mat);
    });

    if (ps.simulationSpace === _enum.Space.Local) {
      const r = ps.node.getRotation();

      _index.Mat4.fromQuat(this._localMat, r);

      this._localMat.transpose(); // just consider rotation, use transpose as invert

    }

    for (let i = 0; i < particleLst.length; ++i) {
      const p = particleLst[i];
      p.remainingLifetime -= dt;

      _index.Vec3.set(p.animatedVelocity, 0, 0, 0);

      if (ps.simulationSpace === _enum.Space.Local) {
        const gravityFactor = -ps.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, (0, _index.pseudoRandom)(p.randomSeed)) * 9.8 * dt;
        this._gravity.x = 0.0;
        this._gravity.y = gravityFactor;
        this._gravity.z = 0.0;
        this._gravity.w = 1.0;
        this._gravity = this._gravity.transformMat4(this._localMat);
        p.velocity.x += this._gravity.x;
        p.velocity.y += this._gravity.y;
        p.velocity.z += this._gravity.z;
      } else {
        // apply gravity.
        p.velocity.y -= ps.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, (0, _index.pseudoRandom)(p.randomSeed)) * 9.8 * dt;
      }

      _index.Vec3.copy(p.ultimateVelocity, p.velocity);

      this._runAnimateList.forEach(value => {
        value.animate(p, dt);
      });

      _index.Vec3.scaleAndAdd(p.position, p.position, p.ultimateVelocity, dt); // apply velocity.

    }
  }

  _calculateBounding(isInit) {
    const size = new _index.Vec3();
    const position = new _index.Vec3();
    const subPos = new _index.Vec3();
    const addPos = new _index.Vec3();
    const meshSize = new _index.Vec3(1.0, 1.0, 1.0);

    if (this._processor.getInfo().renderMode === _enum.RenderMode.Mesh) {
      const mesh = this._processor.getInfo().mesh;

      if (mesh && mesh.struct.minPosition && mesh.struct.maxPosition) {
        const meshAABB = new _index2.AABB();

        _index2.AABB.fromPoints(meshAABB, mesh.struct.minPosition, mesh.struct.maxPosition);

        const meshMax = Math.max(meshAABB.halfExtents.x, meshAABB.halfExtents.y, meshAABB.halfExtents.z);
        meshSize.set(meshMax, meshMax, meshMax);
      }
    }

    for (let i = 0; i < this._particlesAll.length; ++i) {
      const p = this._particlesAll[i];

      _index.Vec3.multiply(size, _node_scale, p.size);

      _index.Vec3.multiply(size, size, meshSize);

      position.set(p.position);

      if (this._particleSystem.simulationSpace !== _enum.Space.World) {
        _index.Vec3.transformMat4(position, position, this._particleSystem.node._mat);
      }

      if (isInit && i === 0) {
        _index.Vec3.subtract(this.minPos, position, size);

        _index.Vec3.add(this.maxPos, position, size);
      } else {
        _index.Vec3.subtract(subPos, position, size);

        _index.Vec3.add(addPos, position, size);

        _index.Vec3.min(this.minPos, this.minPos, subPos);

        _index.Vec3.max(this.maxPos, this.maxPos, addPos);
      }
    }
  }

  calculatePositions() {
    this._emit(this._particleSystem.capacity, 0, this._particlesAll);

    const rand = (0, _index.pseudoRandom)((0, _index.randomRangeInt)(0, _bits.INT_MAX));

    this._updateParticles(0, this._particlesAll);

    this._calculateBounding(true);

    this._updateParticles(this._particleSystem.startLifetime.evaluate(0, rand), this._particlesAll);

    this._calculateBounding(false);

    this._updateBoundingNode();
  }

  clear() {
    this._particlesAll.length = 0;
  }

  destroy() {}

}

exports.ParticleCuller = ParticleCuller;
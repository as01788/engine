"use strict";

var _index = require("../../core/index.js");

var _physicsSelector = require("../framework/physics-selector.js");

var _bulletRigidBody = require("./bullet-rigid-body.js");

var _bulletWorld = require("./bullet-world.js");

var _bulletBoxShape = require("./shapes/bullet-box-shape.js");

var _bulletSphereShape = require("./shapes/bullet-sphere-shape.js");

var _bulletCapsuleShape = require("./shapes/bullet-capsule-shape.js");

var _bulletTrimeshShape = require("./shapes/bullet-trimesh-shape.js");

var _bulletCylinderShape = require("./shapes/bullet-cylinder-shape.js");

var _bulletConeShape = require("./shapes/bullet-cone-shape.js");

var _bulletTerrainShape = require("./shapes/bullet-terrain-shape.js");

var _bulletSimplexShape = require("./shapes/bullet-simplex-shape.js");

var _bulletPlaneShape = require("./shapes/bullet-plane-shape.js");

var _bulletP2pConstraint = require("./constraints/bullet-p2p-constraint.js");

var _bulletHingeConstraint = require("./constraints/bullet-hinge-constraint.js");

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
_index.game.once(_index.Game.EVENT_ENGINE_INITED, () => {
  _physicsSelector.selector.register('bullet', {
    PhysicsWorld: _bulletWorld.BulletWorld,
    RigidBody: _bulletRigidBody.BulletRigidBody,
    BoxShape: _bulletBoxShape.BulletBoxShape,
    SphereShape: _bulletSphereShape.BulletSphereShape,
    CapsuleShape: _bulletCapsuleShape.BulletCapsuleShape,
    TrimeshShape: _bulletTrimeshShape.BulletTrimeshShape,
    CylinderShape: _bulletCylinderShape.BulletCylinderShape,
    ConeShape: _bulletConeShape.BulletConeShape,
    TerrainShape: _bulletTerrainShape.BulletTerrainShape,
    SimplexShape: _bulletSimplexShape.BulletSimplexShape,
    PlaneShape: _bulletPlaneShape.BulletPlaneShape,
    PointToPointConstraint: _bulletP2pConstraint.BulletP2PConstraint,
    HingeConstraint: _bulletHingeConstraint.BulletHingeConstraint
  });
});
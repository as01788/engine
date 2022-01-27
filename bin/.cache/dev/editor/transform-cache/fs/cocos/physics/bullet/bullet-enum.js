"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.btRigidBodyFlags = exports.btCollisionObjectStates = exports.btCollisionObjectTypes = exports.btCollisionFlags = exports.EBtSharedBodyDirty = void 0;

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
let EBtSharedBodyDirty;
exports.EBtSharedBodyDirty = EBtSharedBodyDirty;

(function (EBtSharedBodyDirty) {
  EBtSharedBodyDirty[EBtSharedBodyDirty["BODY_RE_ADD"] = 1] = "BODY_RE_ADD";
  EBtSharedBodyDirty[EBtSharedBodyDirty["GHOST_RE_ADD"] = 2] = "GHOST_RE_ADD";
})(EBtSharedBodyDirty || (exports.EBtSharedBodyDirty = EBtSharedBodyDirty = {}));

let btCollisionFlags;
exports.btCollisionFlags = btCollisionFlags;

(function (btCollisionFlags) {
  btCollisionFlags[btCollisionFlags["CF_STATIC_OBJECT"] = 1] = "CF_STATIC_OBJECT";
  btCollisionFlags[btCollisionFlags["CF_KINEMATIC_OBJECT"] = 2] = "CF_KINEMATIC_OBJECT";
  btCollisionFlags[btCollisionFlags["CF_NO_CONTACT_RESPONSE"] = 4] = "CF_NO_CONTACT_RESPONSE";
  btCollisionFlags[btCollisionFlags["CF_CUSTOM_MATERIAL_CALLBACK"] = 8] = "CF_CUSTOM_MATERIAL_CALLBACK";
  btCollisionFlags[btCollisionFlags["CF_CHARACTER_OBJECT"] = 16] = "CF_CHARACTER_OBJECT";
  btCollisionFlags[btCollisionFlags["CF_DISABLE_VISUALIZE_OBJECT"] = 32] = "CF_DISABLE_VISUALIZE_OBJECT";
  btCollisionFlags[btCollisionFlags["CF_DISABLE_SPU_COLLISION_PROCESSING"] = 64] = "CF_DISABLE_SPU_COLLISION_PROCESSING";
})(btCollisionFlags || (exports.btCollisionFlags = btCollisionFlags = {}));

let btCollisionObjectTypes;
exports.btCollisionObjectTypes = btCollisionObjectTypes;

(function (btCollisionObjectTypes) {
  btCollisionObjectTypes[btCollisionObjectTypes["CO_COLLISION_OBJECT"] = 1] = "CO_COLLISION_OBJECT";
  btCollisionObjectTypes[btCollisionObjectTypes["CO_RIGID_BODY"] = 2] = "CO_RIGID_BODY";
  btCollisionObjectTypes[btCollisionObjectTypes["CO_GHOST_OBJECT"] = 4] = "CO_GHOST_OBJECT";
  btCollisionObjectTypes[btCollisionObjectTypes["CO_SOFT_BODY"] = 8] = "CO_SOFT_BODY";
  btCollisionObjectTypes[btCollisionObjectTypes["CO_HF_FLUID"] = 16] = "CO_HF_FLUID";
  btCollisionObjectTypes[btCollisionObjectTypes["CO_USER_TYPE"] = 32] = "CO_USER_TYPE";
  btCollisionObjectTypes[btCollisionObjectTypes["CO_FEATHERSTONE_LINK"] = 64] = "CO_FEATHERSTONE_LINK";
})(btCollisionObjectTypes || (exports.btCollisionObjectTypes = btCollisionObjectTypes = {}));

let btCollisionObjectStates;
exports.btCollisionObjectStates = btCollisionObjectStates;

(function (btCollisionObjectStates) {
  btCollisionObjectStates[btCollisionObjectStates["ACTIVE_TAG"] = 1] = "ACTIVE_TAG";
  btCollisionObjectStates[btCollisionObjectStates["ISLAND_SLEEPING"] = 2] = "ISLAND_SLEEPING";
  btCollisionObjectStates[btCollisionObjectStates["WANTS_DEACTIVATION"] = 3] = "WANTS_DEACTIVATION";
  btCollisionObjectStates[btCollisionObjectStates["DISABLE_DEACTIVATION"] = 4] = "DISABLE_DEACTIVATION";
  btCollisionObjectStates[btCollisionObjectStates["DISABLE_SIMULATION"] = 5] = "DISABLE_SIMULATION";
})(btCollisionObjectStates || (exports.btCollisionObjectStates = btCollisionObjectStates = {}));

let btRigidBodyFlags;
exports.btRigidBodyFlags = btRigidBodyFlags;

(function (btRigidBodyFlags) {
  btRigidBodyFlags[btRigidBodyFlags["BT_DISABLE_WORLD_GRAVITY"] = 1] = "BT_DISABLE_WORLD_GRAVITY";
  btRigidBodyFlags[btRigidBodyFlags["BT_ENABLE_GYROPSCOPIC_FORCE"] = 2] = "BT_ENABLE_GYROPSCOPIC_FORCE";
})(btRigidBodyFlags || (exports.btRigidBodyFlags = btRigidBodyFlags = {}));
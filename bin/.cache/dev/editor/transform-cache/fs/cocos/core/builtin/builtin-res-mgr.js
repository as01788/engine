"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builtinResMgr = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _imageAsset = require("../assets/image-asset.js");

var _texture2d = require("../assets/texture-2d.js");

var _textureCube = require("../assets/texture-cube.js");

var _effects = require("./effects.js");

var _globalExports = require("../global-exports.js");

var _programLib = require("../renderer/core/program-lib.js");

var _shaderSourceAssembly = _interopRequireDefault(require("./shader-source-assembly.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
class BuiltinResMgr {
  constructor() {
    this._device = null;
    this._resources = {};
  }

  // this should be called after renderer initialized
  initBuiltinRes(device) {
    if (_internal253Aconstants.TEST) return Promise.resolve();
    this._device = device;
    const resources = this._resources;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const imgAsset = new _imageAsset.ImageAsset(canvas);
    const l = canvas.width = canvas.height = 2; // ============================
    // builtin textures
    // ============================
    // black texture

    context.fillStyle = '#000';
    context.fillRect(0, 0, l, l);
    const blackTexture = new _texture2d.Texture2D();
    blackTexture._uuid = 'black-texture';
    blackTexture.image = imgAsset;
    resources[blackTexture._uuid] = blackTexture; // empty texture

    context.fillStyle = 'rgba(0,0,0,0)';
    context.fillRect(0, 0, l, l);
    const emptyTexture = new _texture2d.Texture2D();
    emptyTexture._uuid = 'empty-texture';
    emptyTexture.image = imgAsset;
    resources[emptyTexture._uuid] = emptyTexture; // black texture

    const blackCubeTexture = new _textureCube.TextureCube();
    blackCubeTexture._uuid = 'black-cube-texture';
    blackCubeTexture.setMipFilter(_textureCube.TextureCube.Filter.NEAREST);
    blackCubeTexture.image = {
      front: new _imageAsset.ImageAsset(canvas),
      back: new _imageAsset.ImageAsset(canvas),
      left: new _imageAsset.ImageAsset(canvas),
      right: new _imageAsset.ImageAsset(canvas),
      top: new _imageAsset.ImageAsset(canvas),
      bottom: new _imageAsset.ImageAsset(canvas)
    };
    resources[blackCubeTexture._uuid] = blackCubeTexture; // grey texture

    context.fillStyle = '#777';
    context.fillRect(0, 0, l, l);
    const greyTexture = new _texture2d.Texture2D();
    greyTexture._uuid = 'grey-texture';
    greyTexture.image = imgAsset;
    resources[greyTexture._uuid] = greyTexture; // white texture

    context.fillStyle = '#fff';
    context.fillRect(0, 0, l, l);
    const whiteTexture = new _texture2d.Texture2D();
    whiteTexture._uuid = 'white-texture';
    whiteTexture.image = imgAsset;
    resources[whiteTexture._uuid] = whiteTexture; // white cube texture

    const whiteCubeTexture = new _textureCube.TextureCube();
    whiteCubeTexture._uuid = 'white-cube-texture';
    whiteCubeTexture.setMipFilter(_textureCube.TextureCube.Filter.NEAREST);
    whiteCubeTexture.image = {
      front: new _imageAsset.ImageAsset(canvas),
      back: new _imageAsset.ImageAsset(canvas),
      left: new _imageAsset.ImageAsset(canvas),
      right: new _imageAsset.ImageAsset(canvas),
      top: new _imageAsset.ImageAsset(canvas),
      bottom: new _imageAsset.ImageAsset(canvas)
    };
    resources[whiteCubeTexture._uuid] = whiteCubeTexture; // normal texture

    context.fillStyle = '#7f7fff';
    context.fillRect(0, 0, l, l);
    const normalTexture = new _texture2d.Texture2D();
    normalTexture._uuid = 'normal-texture';
    normalTexture.image = imgAsset;
    resources[normalTexture._uuid] = normalTexture; // default texture

    canvas.width = canvas.height = 16;
    context.fillStyle = '#ddd';
    context.fillRect(0, 0, 16, 16);
    context.fillStyle = '#555';
    context.fillRect(0, 0, 8, 8);
    context.fillStyle = '#555';
    context.fillRect(8, 8, 8, 8);
    const defaultTexture = new _texture2d.Texture2D();
    defaultTexture._uuid = 'default-texture';
    defaultTexture.image = imgAsset;
    resources[defaultTexture._uuid] = defaultTexture; // default cube texture

    const defaultCubeTexture = new _textureCube.TextureCube();
    defaultCubeTexture.setMipFilter(_textureCube.TextureCube.Filter.NEAREST);
    defaultCubeTexture._uuid = 'default-cube-texture';
    defaultCubeTexture.image = {
      front: new _imageAsset.ImageAsset(canvas),
      back: new _imageAsset.ImageAsset(canvas),
      left: new _imageAsset.ImageAsset(canvas),
      right: new _imageAsset.ImageAsset(canvas),
      top: new _imageAsset.ImageAsset(canvas),
      bottom: new _imageAsset.ImageAsset(canvas)
    };
    resources[defaultCubeTexture._uuid] = defaultCubeTexture;

    if (_globalExports.legacyCC.SpriteFrame) {
      const spriteFrame = new _globalExports.legacyCC.SpriteFrame();
      const image = imgAsset;
      const texture = new _texture2d.Texture2D();
      texture.image = image;
      spriteFrame.texture = texture;
      spriteFrame._uuid = 'default-spriteframe';
      resources[spriteFrame._uuid] = spriteFrame;
    }

    const shaderVersionKey = (0, _programLib.getDeviceShaderVersion)(device);

    if (!shaderVersionKey) {
      return Promise.reject(Error('Failed to initialize builtin shaders: unknown device.'));
    }

    const shaderSources = _shaderSourceAssembly.default[shaderVersionKey];

    if (!shaderSources) {
      return Promise.reject(Error(`Current device is requiring builtin shaders of version ${shaderVersionKey} ` + `but shaders of that version are not assembled in this build.`));
    }

    return Promise.resolve().then(() => {
      _effects.effects.forEach((e, effectIndex) => {
        const effect = Object.assign(new _globalExports.legacyCC.EffectAsset(), e);
        effect.shaders.forEach((shaderInfo, shaderIndex) => {
          const shaderSource = shaderSources[effectIndex][shaderIndex];

          if (shaderSource) {
            shaderInfo[shaderVersionKey] = shaderSource;
          }
        });
        effect.hideInEditor = true;
        effect.onLoaded();
      });

      this._initMaterials();
    });
  }

  get(uuid) {
    return this._resources[uuid];
  }

  _initMaterials() {
    const resources = this._resources;
    const materialsToBeCompiled = []; // standard material

    const standardMtl = new _globalExports.legacyCC.Material();
    standardMtl._uuid = 'standard-material';
    standardMtl.initialize({
      effectName: 'standard'
    });
    resources[standardMtl._uuid] = standardMtl;
    materialsToBeCompiled.push(standardMtl); // material indicating missing effect (yellow)

    const missingEfxMtl = new _globalExports.legacyCC.Material();
    missingEfxMtl._uuid = 'missing-effect-material';
    missingEfxMtl.initialize({
      effectName: 'unlit',
      defines: {
        USE_COLOR: true
      }
    });
    missingEfxMtl.setProperty('mainColor', _globalExports.legacyCC.color('#ffff00'));
    resources[missingEfxMtl._uuid] = missingEfxMtl;
    materialsToBeCompiled.push(missingEfxMtl); // material indicating missing material (purple)

    const missingMtl = new _globalExports.legacyCC.Material();
    missingMtl._uuid = 'missing-material';
    missingMtl.initialize({
      effectName: 'unlit',
      defines: {
        USE_COLOR: true
      }
    });
    missingMtl.setProperty('mainColor', _globalExports.legacyCC.color('#ff00ff'));
    resources[missingMtl._uuid] = missingMtl;
    materialsToBeCompiled.push(missingMtl);
    const clearStencilMtl = new _globalExports.legacyCC.Material();
    clearStencilMtl._uuid = 'default-clear-stencil';
    clearStencilMtl.initialize({
      defines: {
        USE_TEXTURE: false
      },
      effectName: 'clear-stencil'
    });
    resources[clearStencilMtl._uuid] = clearStencilMtl;
    materialsToBeCompiled.push(clearStencilMtl); // sprite material

    const spriteMtl = new _globalExports.legacyCC.Material();
    spriteMtl._uuid = 'ui-base-material';
    spriteMtl.initialize({
      defines: {
        USE_TEXTURE: false
      },
      effectName: 'sprite'
    });
    resources[spriteMtl._uuid] = spriteMtl;
    materialsToBeCompiled.push(spriteMtl); // sprite material

    const spriteColorMtl = new _globalExports.legacyCC.Material();
    spriteColorMtl._uuid = 'ui-sprite-material';
    spriteColorMtl.initialize({
      defines: {
        USE_TEXTURE: true,
        CC_USE_EMBEDDED_ALPHA: false,
        IS_GRAY: false
      },
      effectName: 'sprite'
    });
    resources[spriteColorMtl._uuid] = spriteColorMtl;
    materialsToBeCompiled.push(spriteColorMtl); // sprite alpha test material

    const alphaTestMaskMtl = new _globalExports.legacyCC.Material();
    alphaTestMaskMtl._uuid = 'ui-alpha-test-material';
    alphaTestMaskMtl.initialize({
      defines: {
        USE_TEXTURE: true,
        USE_ALPHA_TEST: true,
        CC_USE_EMBEDDED_ALPHA: false,
        IS_GRAY: false
      },
      effectName: 'sprite'
    });
    resources[alphaTestMaskMtl._uuid] = alphaTestMaskMtl;
    materialsToBeCompiled.push(alphaTestMaskMtl); // sprite gray material

    const spriteGrayMtl = new _globalExports.legacyCC.Material();
    spriteGrayMtl._uuid = 'ui-sprite-gray-material';
    spriteGrayMtl.initialize({
      defines: {
        USE_TEXTURE: true,
        CC_USE_EMBEDDED_ALPHA: false,
        IS_GRAY: true
      },
      effectName: 'sprite'
    });
    resources[spriteGrayMtl._uuid] = spriteGrayMtl;
    materialsToBeCompiled.push(spriteGrayMtl); // sprite alpha material

    const spriteAlphaMtl = new _globalExports.legacyCC.Material();
    spriteAlphaMtl._uuid = 'ui-sprite-alpha-sep-material';
    spriteAlphaMtl.initialize({
      defines: {
        USE_TEXTURE: true,
        CC_USE_EMBEDDED_ALPHA: true,
        IS_GRAY: false
      },
      effectName: 'sprite'
    });
    resources[spriteAlphaMtl._uuid] = spriteAlphaMtl;
    materialsToBeCompiled.push(spriteAlphaMtl); // sprite alpha & gray material

    const spriteAlphaGrayMtl = new _globalExports.legacyCC.Material();
    spriteAlphaGrayMtl._uuid = 'ui-sprite-gray-alpha-sep-material';
    spriteAlphaGrayMtl.initialize({
      defines: {
        USE_TEXTURE: true,
        CC_USE_EMBEDDED_ALPHA: true,
        IS_GRAY: true
      },
      effectName: 'sprite'
    });
    resources[spriteAlphaGrayMtl._uuid] = spriteAlphaGrayMtl;
    materialsToBeCompiled.push(spriteAlphaGrayMtl); // ui graphics material

    const defaultGraphicsMtl = new _globalExports.legacyCC.Material();
    defaultGraphicsMtl._uuid = 'ui-graphics-material';
    defaultGraphicsMtl.initialize({
      effectName: 'graphics'
    });
    resources[defaultGraphicsMtl._uuid] = defaultGraphicsMtl;
    materialsToBeCompiled.push(defaultGraphicsMtl);

    if (_internal253Aconstants.UI_GPU_DRIVEN) {
      // sprite material
      const spriteGPUMtl = new _globalExports.legacyCC.Material();
      spriteGPUMtl._uuid = 'ui-base-gpu-material';
      spriteGPUMtl.initialize({
        defines: {
          USE_TEXTURE: false
        },
        effectName: 'sprite-gpu'
      });
      resources[spriteGPUMtl._uuid] = spriteGPUMtl;
      materialsToBeCompiled.push(spriteGPUMtl); // sprite material

      const spriteColorGPUMtl = new _globalExports.legacyCC.Material();
      spriteColorGPUMtl._uuid = 'ui-sprite-gpu-material';
      spriteColorGPUMtl.initialize({
        defines: {
          USE_TEXTURE: true,
          CC_USE_EMBEDDED_ALPHA: false,
          IS_GRAY: false
        },
        effectName: 'sprite-gpu'
      });
      resources[spriteColorGPUMtl._uuid] = spriteColorGPUMtl;
      materialsToBeCompiled.push(spriteColorGPUMtl); // sprite gray material

      const spriteGrayGPUMtl = new _globalExports.legacyCC.Material();
      spriteGrayGPUMtl._uuid = 'ui-sprite-gray-gpu-material';
      spriteGrayGPUMtl.initialize({
        defines: {
          USE_TEXTURE: true,
          CC_USE_EMBEDDED_ALPHA: false,
          IS_GRAY: true
        },
        effectName: 'sprite-gpu'
      });
      resources[spriteGrayGPUMtl._uuid] = spriteGrayGPUMtl;
      materialsToBeCompiled.push(spriteGrayGPUMtl); // sprite alpha material

      const spriteAlphaGPUMtl = new _globalExports.legacyCC.Material();
      spriteAlphaGPUMtl._uuid = 'ui-sprite-alpha-sep-gpu-material';
      spriteAlphaGPUMtl.initialize({
        defines: {
          USE_TEXTURE: true,
          CC_USE_EMBEDDED_ALPHA: true,
          IS_GRAY: false
        },
        effectName: 'sprite-gpu'
      });
      resources[spriteAlphaGPUMtl._uuid] = spriteAlphaGPUMtl;
      materialsToBeCompiled.push(spriteAlphaGPUMtl); // sprite alpha & gray material

      const spriteAlphaGrayGPUMtl = new _globalExports.legacyCC.Material();
      spriteAlphaGrayGPUMtl._uuid = 'ui-sprite-gray-alpha-sep-gpu-material';
      spriteAlphaGrayGPUMtl.initialize({
        defines: {
          USE_TEXTURE: true,
          CC_USE_EMBEDDED_ALPHA: true,
          IS_GRAY: true
        },
        effectName: 'sprite-gpu'
      });
      resources[spriteAlphaGrayGPUMtl._uuid] = spriteAlphaGrayGPUMtl;
      materialsToBeCompiled.push(spriteAlphaGrayGPUMtl);
    } // default particle material


    const defaultParticleMtl = new _globalExports.legacyCC.Material();
    defaultParticleMtl._uuid = 'default-particle-material';
    defaultParticleMtl.initialize({
      effectName: 'particle'
    });
    resources[defaultParticleMtl._uuid] = defaultParticleMtl;
    materialsToBeCompiled.push(defaultParticleMtl); // default particle gpu material

    const defaultParticleGPUMtl = new _globalExports.legacyCC.Material();
    defaultParticleGPUMtl._uuid = 'default-particle-gpu-material';
    defaultParticleGPUMtl.initialize({
      effectName: 'particle-gpu'
    });
    resources[defaultParticleGPUMtl._uuid] = defaultParticleGPUMtl;
    materialsToBeCompiled.push(defaultParticleGPUMtl); // default particle material

    const defaultTrailMtl = new _globalExports.legacyCC.Material();
    defaultTrailMtl._uuid = 'default-trail-material';
    defaultTrailMtl.initialize({
      effectName: 'particle-trail'
    });
    resources[defaultTrailMtl._uuid] = defaultTrailMtl;
    materialsToBeCompiled.push(defaultTrailMtl); // default particle material

    const defaultBillboardMtl = new _globalExports.legacyCC.Material();
    defaultBillboardMtl._uuid = 'default-billboard-material';
    defaultBillboardMtl.initialize({
      effectName: 'billboard'
    });
    resources[defaultBillboardMtl._uuid] = defaultBillboardMtl;
    materialsToBeCompiled.push(defaultBillboardMtl); // ui spine two color material

    const spineTwoColorMtl = new _globalExports.legacyCC.Material();
    spineTwoColorMtl._uuid = 'default-spine-material';
    spineTwoColorMtl.initialize({
      defines: {
        USE_TEXTURE: true,
        CC_USE_EMBEDDED_ALPHA: false,
        IS_GRAY: false
      },
      effectName: 'spine'
    });
    resources[spineTwoColorMtl._uuid] = spineTwoColorMtl;
    materialsToBeCompiled.push(spineTwoColorMtl);

    _globalExports.legacyCC.game.on(_globalExports.legacyCC.Game.EVENT_GAME_INITED, () => {
      for (let i = 0; i < materialsToBeCompiled.length; ++i) {
        const mat = materialsToBeCompiled[i];

        for (let j = 0; j < mat.passes.length; ++j) {
          mat.passes[j].tryCompile();
        }
      }
    });
  }

}

const builtinResMgr = _globalExports.legacyCC.builtinResMgr = new BuiltinResMgr();
exports.builtinResMgr = builtinResMgr;
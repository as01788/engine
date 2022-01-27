System.register("q-bundled:///fs/editor/exports/new-gen-anim.js", ["../../cocos/core/animation/marionette/blend-1d.js", "../../cocos/core/animation/marionette/blend-2d.js", "../../cocos/core/animation/marionette/asset-creation.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_cocosCoreAnimationMarionetteBlend1dJs) {
      _export("blend1D", _cocosCoreAnimationMarionetteBlend1dJs.blend1D);
    }, function (_cocosCoreAnimationMarionetteBlend2dJs) {
      _export({
        blendSimpleDirectional: _cocosCoreAnimationMarionetteBlend2dJs.blendSimpleDirectional,
        validateSimpleDirectionalSamples: _cocosCoreAnimationMarionetteBlend2dJs.validateSimpleDirectionalSamples,
        SimpleDirectionalIssueSameDirection: _cocosCoreAnimationMarionetteBlend2dJs.SimpleDirectionalIssueSameDirection
      });
    }, function (_cocosCoreAnimationMarionetteAssetCreationJs) {
      var _exportObj = {};

      for (var _key in _cocosCoreAnimationMarionetteAssetCreationJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _cocosCoreAnimationMarionetteAssetCreationJs[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
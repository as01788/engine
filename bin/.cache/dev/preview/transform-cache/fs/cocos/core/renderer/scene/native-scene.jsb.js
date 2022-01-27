System.register("q-bundled:///fs/cocos/core/renderer/scene/native-scene.jsb.js", [], function (_export, _context) {
  "use strict";

  var NativeNode, NativeScene, NativeModel, NativeSkinningModel, NativeBakedSkinningModel, NativeLight, NativeDirectionalLight, NativeSpotLight, NativeSphereLight, NaitveSkybox, NativeFog, NativeAmbient, NativeShadow, NativeOctree, NativeCamera, NativeRenderWindow, NativeRenderScene, NativeDrawBatch2D, NativePass, NativeSubModel, NativeRoot, NativePipelineSharedSceneData, NativeAABB;
  return {
    setters: [],
    execute: function () {
      // scene
      _export("NativeNode", NativeNode = ns.Node);

      _export("NativeScene", NativeScene = ns.Scene);

      _export("NativeModel", NativeModel = ns.Model);

      _export("NativeSkinningModel", NativeSkinningModel = ns.SkinningModel);

      _export("NativeBakedSkinningModel", NativeBakedSkinningModel = ns.BakedSkinningModel);

      _export("NativeLight", NativeLight = ns.light);

      _export("NativeDirectionalLight", NativeDirectionalLight = ns.DirectionalLight);

      _export("NativeSpotLight", NativeSpotLight = ns.SpotLight);

      _export("NativeSphereLight", NativeSphereLight = ns.SphereLight);

      _export("NaitveSkybox", NaitveSkybox = ns.Skybox);

      _export("NativeFog", NativeFog = ns.Fog);

      _export("NativeAmbient", NativeAmbient = ns.Ambient);

      _export("NativeShadow", NativeShadow = ns.Shadow);

      _export("NativeOctree", NativeOctree = ns.OctreeInfo);

      _export("NativeCamera", NativeCamera = ns.Camera);

      _export("NativeRenderWindow", NativeRenderWindow = ns.RenderWindow);

      _export("NativeRenderScene", NativeRenderScene = ns.RenderScene);

      _export("NativeDrawBatch2D", NativeDrawBatch2D = ns.DrawBatch2D);

      _export("NativePass", NativePass = ns.Pass);

      _export("NativeSubModel", NativeSubModel = ns.SubModel);

      _export("NativeRoot", NativeRoot = ns.Root);

      _export("NativePipelineSharedSceneData", NativePipelineSharedSceneData = ns.PipelineSharedSceneData);

      _export("NativeAABB", NativeAABB = ns.AABB);
    }
  };
});
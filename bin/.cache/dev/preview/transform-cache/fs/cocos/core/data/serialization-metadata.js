System.register("q-bundled:///fs/cocos/core/data/serialization-metadata.js", [], function (_export, _context) {
  "use strict";

  var sMetadataTag;

  /**
   * For internal usage only. DO NOT USE IT IN YOUR CODES.
   * @param constructor
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  function getSerializationMetadata(constructor) {
    return constructor[sMetadataTag];
  } // eslint-disable-next-line @typescript-eslint/ban-types


  function getOrCreateSerializationMetadata(constructor) {
    var _ref, _ref$sMetadataTag;

    return (_ref$sMetadataTag = (_ref = constructor)[sMetadataTag]) !== null && _ref$sMetadataTag !== void 0 ? _ref$sMetadataTag : _ref[sMetadataTag] = {};
  }
  /**
   * For internal usage only. DO NOT USE IT IN YOUR CODES.
   */


  _export({
    getSerializationMetadata: getSerializationMetadata,
    getOrCreateSerializationMetadata: getOrCreateSerializationMetadata
  });

  return {
    setters: [],
    execute: function () {
      sMetadataTag = Symbol('cc:SerializationMetadata');
    }
  };
});
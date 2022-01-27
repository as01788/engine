System.register("q-bundled:///fs/editor/exports/serialization.js", ["../../cocos/core/data/ccon.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_cocosCoreDataCconJs) {
      _export({
        CCON: _cocosCoreDataCconJs.CCON,
        encodeCCONJson: _cocosCoreDataCconJs.encodeCCONJson,
        encodeCCONBinary: _cocosCoreDataCconJs.encodeCCONBinary,
        BufferBuilder: _cocosCoreDataCconJs.BufferBuilder,
        decodeCCONBinary: _cocosCoreDataCconJs.decodeCCONBinary,
        parseCCONJson: _cocosCoreDataCconJs.parseCCONJson
      });
    }],
    execute: function () {}
  };
});
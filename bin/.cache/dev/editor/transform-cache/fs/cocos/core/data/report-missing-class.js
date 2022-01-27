"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportMissingClass = reportMissingClass;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _debug = require("../platform/debug.js");

function reportMissingClass(id) {
  if (_internal253Aconstants.EDITOR && EditorExtends.UuidUtils.isUuid(id)) {
    id = EditorExtends.UuidUtils.decompressUuid(id);
    (0, _debug.errorID)(5301, id);
  } else {
    (0, _debug.errorID)(5302, id);
  }
}
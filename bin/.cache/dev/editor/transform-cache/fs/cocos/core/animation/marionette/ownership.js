"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertsOwnedBy = assertsOwnedBy;
exports.own = own;
exports.markAsDangling = markAsDangling;
exports.ownerSymbol = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _asserts = require("../../data/utils/asserts.js");

const ownerSymbol = Symbol('[[Owner]]');
exports.ownerSymbol = ownerSymbol;

function assertsOwnedBy(mastered, owner) {
  (0, _asserts.assertIsTrue)(mastered[ownerSymbol] === owner);
}

function own(mastered, owner) {
  if (_internal253Aconstants.DEBUG) {
    mastered[ownerSymbol] = owner;
  }
}

function markAsDangling(mastered) {
  if (_internal253Aconstants.DEBUG) {
    mastered[ownerSymbol] = undefined;
  }
}
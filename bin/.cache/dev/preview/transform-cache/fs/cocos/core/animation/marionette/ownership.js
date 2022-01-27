System.register("q-bundled:///fs/cocos/core/animation/marionette/ownership.js", ["../../../../../virtual/internal%253Aconstants.js", "../../data/utils/asserts.js"], function (_export, _context) {
  "use strict";

  var DEBUG, assertIsTrue, ownerSymbol;

  function assertsOwnedBy(mastered, owner) {
    assertIsTrue(mastered[ownerSymbol] === owner);
  }

  function own(mastered, owner) {
    if (DEBUG) {
      mastered[ownerSymbol] = owner;
    }
  }

  function markAsDangling(mastered) {
    if (DEBUG) {
      mastered[ownerSymbol] = undefined;
    }
  }

  _export({
    assertsOwnedBy: assertsOwnedBy,
    own: own,
    markAsDangling: markAsDangling
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
    }, function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }],
    execute: function () {
      _export("ownerSymbol", ownerSymbol = Symbol('[[Owner]]'));
    }
  };
});
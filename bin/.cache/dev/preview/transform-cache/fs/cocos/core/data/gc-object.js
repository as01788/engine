System.register("q-bundled:///fs/cocos/core/data/gc-object.js", ["../../../../virtual/internal%253Aconstants.js", "./decorators/index.js", "./garbage-collection.js", "./object.js"], function (_export, _context) {
  "use strict";

  var EDITOR, ccclass, garbageCollectionManager, CCObject, _dec, _class, GCObject;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_decoratorsIndexJs) {
      ccclass = _decoratorsIndexJs.ccclass;
    }, function (_garbageCollectionJs) {
      garbageCollectionManager = _garbageCollectionJs.garbageCollectionManager;
    }, function (_objectJs) {
      CCObject = _objectJs.CCObject;
    }],
    execute: function () {
      _export("GCObject", GCObject = (_dec = ccclass('cc.GCObject'), _dec(_class = /*#__PURE__*/function (_CCObject) {
        _inheritsLoose(GCObject, _CCObject);

        function GCObject() {
          var _this;

          for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
            arg[_key] = arguments[_key];
          }

          _this = _CCObject.call.apply(_CCObject, [this].concat(arg)) || this;
          return garbageCollectionManager.registerGCObject(_assertThisInitialized(_this)) || _assertThisInitialized(_this);
        }

        var _proto = GCObject.prototype;

        _proto.equals = function equals(gcObject) {
          if (!gcObject) {
            return false;
          }

          if (EDITOR) {
            return gcObject._finalizationToken === this._finalizationToken;
          } else {
            return gcObject === this;
          }
        };

        _proto.destroy = function destroy() {
          garbageCollectionManager.unregisterGCObject(this);
          return _CCObject.prototype.destroy.call(this);
        };

        return GCObject;
      }(CCObject)) || _class));
    }
  };
});
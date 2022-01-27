System.register("q-bundled:///fs/cocos/core/data/editor-extendable.js", ["../../../../virtual/internal%253Aconstants.js", "./decorators/index.js", "../utils/js.js", "./editor-extras-tag.js", "./utils/asserts.js"], function (_export, _context) {
  "use strict";

  var EDITOR, ccclass, editorOnly, js, editorExtrasTag, assertIsTrue, Empty, EditorExtendable;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  // Functions and classes exposed from this module are useful to
  // make a class to be `EditorExtendableObject`.
  //
  // These helpers are used internally, don't expose them to user.

  /**
   * Creates a mixin class which inherits from specific base class and implements the `EditorExtendableObject` interface.
   * @param Base The base class.
   * @param className Assign an optional cc class name. If the base class is not cc class, this param is required.
   * @returns The mixin class.
   */
  function EditorExtendableMixin(Base, className) {
    return editorExtendableInternal(Base);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  function editorExtendableInternal(Base, className) {
    if (!EDITOR) {
      return Base !== null && Base !== void 0 ? Base : Empty;
    }

    var name;

    if (className) {
      name = className;
    } else if (!Base) {
      name = "cc.EditorExtendable";
    } else {
      var baseName = js.getClassName(Base);

      if (baseName) {
        name = "cc.EditorExtendable/" + baseName;
      } else {
        throw new Error("You should supply a class name to EditorExtendable when mixin with " + Base.name + ".");
      }
    }

    var EditorExtendable;

    if (Base) {
      var _dec, _class, _class2, _descriptor, _temp;

      var C = (_dec = ccclass(name), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_ref) {
        _inheritsLoose(C, _ref);

        function C() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ref.call.apply(_ref, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "__editorExtras__", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        return C;
      }(Base), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "__editorExtras__", [editorOnly], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class);
      EditorExtendable = C;
    } else {
      var _dec2, _class4, _class5, _descriptor2, _temp2;

      var _C = (_dec2 = ccclass(name), _dec2(_class4 = (_class5 = (_temp2 = function _C() {
        _initializerDefineProperty(this, "__editorExtras__", _descriptor2, this);
      }, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "__editorExtras__", [editorOnly], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class5)) || _class4);

      EditorExtendable = _C;
    }

    return EditorExtendable;
  }

  _export("EditorExtendableMixin", EditorExtendableMixin);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_decoratorsIndexJs) {
      ccclass = _decoratorsIndexJs.ccclass;
      editorOnly = _decoratorsIndexJs.editorOnly;
    }, function (_utilsJsJs) {
      js = _utilsJsJs.js;
    }, function (_editorExtrasTagJs) {
      editorExtrasTag = _editorExtrasTagJs.editorExtrasTag;
    }, function (_utilsAssertsJs) {
      assertIsTrue = _utilsAssertsJs.assertIsTrue;
    }],
    execute: function () {
      Empty = function Empty() {};
      /**
       * Class which implements the `EditorExtendableObject` interface.
       */


      _export("EditorExtendable", EditorExtendable = editorExtendableInternal());

      // Note: Babel does not support decorators on computed property currently.
      // So we have to use its literal value below.
      assertIsTrue(editorExtrasTag === '__editorExtras__', 'editorExtrasTag needs to be updated.');
    }
  };
});
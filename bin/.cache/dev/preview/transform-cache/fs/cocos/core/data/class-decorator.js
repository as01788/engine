System.register("q-bundled:///fs/cocos/core/data/class-decorator.js", ["./decorators/serializable.js", "./decorators/ccclass.js", "./decorators/property.js", "./decorators/component.js", "./decorators/editable.js", "./decorators/type.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_decoratorsSerializableJs) {
      _export("uniquelyReferenced", _decoratorsSerializableJs.uniquelyReferenced);
    }, function (_decoratorsCcclassJs) {
      _export("ccclass", _decoratorsCcclassJs.ccclass);
    }, function (_decoratorsPropertyJs) {
      _export("property", _decoratorsPropertyJs.property);
    }, function (_decoratorsComponentJs) {
      _export({
        requireComponent: _decoratorsComponentJs.requireComponent,
        executionOrder: _decoratorsComponentJs.executionOrder,
        disallowMultiple: _decoratorsComponentJs.disallowMultiple,
        allowReplicated: _decoratorsComponentJs.allowReplicated
      });
    }, function (_decoratorsEditableJs) {
      _export({
        executeInEditMode: _decoratorsEditableJs.executeInEditMode,
        menu: _decoratorsEditableJs.menu,
        playOnFocus: _decoratorsEditableJs.playOnFocus,
        inspector: _decoratorsEditableJs.inspector,
        icon: _decoratorsEditableJs.icon,
        help: _decoratorsEditableJs.help
      });
    }, function (_decoratorsTypeJs) {
      _export({
        type: _decoratorsTypeJs.type,
        integer: _decoratorsTypeJs.integer,
        float: _decoratorsTypeJs.float,
        boolean: _decoratorsTypeJs.boolean,
        string: _decoratorsTypeJs.string
      });
    }],
    execute: function () {}
  };
});
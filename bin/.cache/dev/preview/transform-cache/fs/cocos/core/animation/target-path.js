System.register("q-bundled:///fs/cocos/core/animation/target-path.js", ["../data/decorators/index.js", "../scene-graph/node.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, Node, warnID, _dec, _class, _class2, _descriptor, _temp, _dec2, _class4, _class5, _descriptor2, _temp2, HierarchyPath, ComponentPath;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function isPropertyPath(path) {
    return typeof path === 'string' || typeof path === 'number';
  }

  function isCustomPath(path, constructor) {
    return path instanceof constructor;
  }

  _export({
    isPropertyPath: isPropertyPath,
    isCustomPath: isCustomPath
  });

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_sceneGraphNodeJs) {
      Node = _sceneGraphNodeJs.Node;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }],
    execute: function () {
      _export("HierarchyPath", HierarchyPath = (_dec = ccclass('cc.animation.HierarchyPath'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function HierarchyPath(path) {
          _initializerDefineProperty(this, "path", _descriptor, this);

          this.path = path || '';
        }

        var _proto = HierarchyPath.prototype;

        _proto.get = function get(target) {
          if (!(target instanceof Node)) {
            warnID(3925);
            return null;
          }

          var result = target.getChildByPath(this.path);

          if (!result) {
            warnID(3926, target.name, this.path);
            return null;
          }

          return result;
        };

        return HierarchyPath;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "path", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class));

      _export("ComponentPath", ComponentPath = (_dec2 = ccclass('cc.animation.ComponentPath'), _dec2(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function () {
        function ComponentPath(component) {
          _initializerDefineProperty(this, "component", _descriptor2, this);

          this.component = component || '';
        }

        var _proto2 = ComponentPath.prototype;

        _proto2.get = function get(target) {
          if (!(target instanceof Node)) {
            warnID(3927);
            return null;
          }

          var result = target.getComponent(this.component);

          if (!result) {
            warnID(3928, target.name, this.component);
            return null;
          }

          return result;
        };

        return ComponentPath;
      }(), _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class5.prototype, "component", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class5)) || _class4));
    }
  };
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserializeDynamic = deserializeDynamic;
exports.parseUuidDependenciesDynamic = parseUuidDependenciesDynamic;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _globalExports = require("../global-exports.js");

var js = _interopRequireWildcard(require("../utils/js.js"));

var misc = _interopRequireWildcard(require("../utils/misc.js"));

var _class = require("./class.js");

var Attr = _interopRequireWildcard(require("./utils/attribute.js"));

var _missingScript = _interopRequireDefault(require("../components/missing-script.js"));

var _index = require("../../../pal/system-info/enum-type/index.js");

var _sys = require("../platform/sys.js");

var _debug = require("../platform/debug.js");

var _customSerializable = require("./custom-serializable.js");

var _ccon = require("./ccon.js");

var _asserts = require("./utils/asserts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @hidden
 */
function compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, assumeHavePropIfIsValue) {
  if (defaultValue instanceof _globalExports.legacyCC.ValueType) {
    // fast case
    if (!assumeHavePropIfIsValue) {
      sources.push('if(prop){');
    } // @ts-expect-error Typing


    const ctorCode = js.getClassName(defaultValue);
    sources.push(`s._deserializeFastDefinedObject(o${accessorToSet},prop,${ctorCode});`);

    if (!assumeHavePropIfIsValue) {
      sources.push(`}else o${accessorToSet}=null;`);
    }
  } else {
    sources.push(`
if (prop) {
    s._deserializeAndAssignField(o, prop, ${propNameLiteralToSet});
} else {
    o${accessorToSet}=null;
}
`);
  }
}

const compileDeserialize = _internal253Aconstants.SUPPORT_JIT ? compileDeserializeJIT : compileDeserializeNative;
const DELIMITER = Attr.DELIMETER;
const POSTFIX_TYPE = `${DELIMITER}type`;
const POSTFIX_EDITOR_ONLY = `${DELIMITER}editorOnly`;
const POSTFIX_DEFAULT = `${DELIMITER}default`;
const POSTFIX_FORMERLY_SERIALIZED_AS = `${DELIMITER}formerlySerializedAs`;

function compileDeserializeJIT(self, klass) {
  const attrs = Attr.getClassAttrs(klass);
  const props = klass.__values__; // self, obj, serializedData, klass

  const sources = ['var prop;'];
  const fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass)); // sources.push('var vb,vn,vs,vo,vu,vf;');    // boolean, number, string, object, undefined, function

  for (let p = 0; p < props.length; p++) {
    const propName = props[p]; // @ts-expect-error 2341

    if ((_internal253Aconstants.PREVIEW || _internal253Aconstants.EDITOR && self._ignoreEditorOnly) && attrs[propName + POSTFIX_EDITOR_ONLY]) {
      continue; // skip editor only if in preview
    }

    let accessorToSet;
    let propNameLiteralToSet;

    if (_class.CCClass.IDENTIFIER_RE.test(propName)) {
      propNameLiteralToSet = `"${propName}"`;
      accessorToSet = `.${propName}`;
    } else {
      propNameLiteralToSet = _class.CCClass.escapeForJS(propName);
      accessorToSet = `[${propNameLiteralToSet}]`;
    }

    let accessorToGet = accessorToSet;

    if (attrs[propName + POSTFIX_FORMERLY_SERIALIZED_AS]) {
      const propNameToRead = attrs[propName + POSTFIX_FORMERLY_SERIALIZED_AS];

      if (_class.CCClass.IDENTIFIER_RE.test(propNameToRead)) {
        accessorToGet = `.${propNameToRead}`;
      } else {
        accessorToGet = `[${_class.CCClass.escapeForJS(propNameToRead)}]`;
      }
    }

    sources.push(`prop=d${accessorToGet};`);
    sources.push(`if(typeof ${_internal253Aconstants.JSB ? '(prop)' : 'prop'}!=="undefined"){`); // function undefined object(null) string boolean number

    const defaultValue = _class.CCClass.getDefault(attrs[propName + POSTFIX_DEFAULT]);

    if (fastMode) {
      let isPrimitiveType;
      const userType = attrs[propName + POSTFIX_TYPE];

      if (defaultValue === undefined && userType) {
        isPrimitiveType = userType instanceof Attr.PrimitiveType;
      } else {
        const defaultType = typeof defaultValue;
        isPrimitiveType = defaultType === 'string' || defaultType === 'number' || defaultType === 'boolean';
      }

      if (isPrimitiveType) {
        sources.push(`o${accessorToSet}=prop;`);
      } else {
        compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, true);
      }
    } else {
      sources.push(`${`if(typeof ${_internal253Aconstants.JSB ? '(prop)' : 'prop'}!=="object"){` + 'o'}${accessorToSet}=prop;` + `}else{`);
      compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, false);
      sources.push('}');
    }

    sources.push('}');
  }

  if (_globalExports.legacyCC.js.isChildClassOf(klass, _globalExports.legacyCC._BaseNode) || _globalExports.legacyCC.js.isChildClassOf(klass, _globalExports.legacyCC.Component)) {
    // @ts-expect-error 2341
    if (_internal253Aconstants.PREVIEW || _internal253Aconstants.EDITOR && self._ignoreEditorOnly) {
      const mayUsedInPersistRoot = js.isChildClassOf(klass, _globalExports.legacyCC.Node);

      if (mayUsedInPersistRoot) {
        sources.push('d._id&&(o._id=d._id);');
      }
    } else {
      sources.push('d._id&&(o._id=d._id);');
    }
  }

  if (props[props.length - 1] === '_$erialized') {
    // deep copy original serialized data
    sources.push('o._$erialized=JSON.parse(JSON.stringify(d));'); // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced

    sources.push('s._fillPlainObject(o._$erialized,d);');
  } // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func


  return Function('s', 'o', 'd', 'k', sources.join(''));
}

function compileDeserializeNative(_self, klass) {
  const fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass));
  const shouldCopyId = js.isChildClassOf(klass, _globalExports.legacyCC._BaseNode) || js.isChildClassOf(klass, _globalExports.legacyCC.Component);
  let shouldCopyRawData = false;
  const simpleProps = [];
  let simplePropsToRead = simpleProps;
  const advancedProps = [];
  let advancedPropsToRead = advancedProps;
  const advancedPropsValueType = [];

  (() => {
    const props = klass.__values__;
    shouldCopyRawData = props[props.length - 1] === '_$erialized';
    const attrs = Attr.getClassAttrs(klass);

    for (let p = 0; p < props.length; p++) {
      const propName = props[p];
      let propNameToRead = propName;

      if (attrs[propName + POSTFIX_FORMERLY_SERIALIZED_AS]) {
        propNameToRead = attrs[propName + POSTFIX_FORMERLY_SERIALIZED_AS];
      } // function undefined object(null) string boolean number


      const defaultValue = _class.CCClass.getDefault(attrs[propName + POSTFIX_DEFAULT]);

      let isPrimitiveType = false;

      if (fastMode) {
        const userType = attrs[propName + POSTFIX_TYPE];

        if (defaultValue === undefined && userType) {
          isPrimitiveType = userType instanceof Attr.PrimitiveType;
        } else {
          const defaultType = typeof defaultValue;
          isPrimitiveType = defaultType === 'string' || defaultType === 'number' || defaultType === 'boolean';
        }
      }

      if (fastMode && isPrimitiveType) {
        if (propNameToRead !== propName && simplePropsToRead === simpleProps) {
          simplePropsToRead = simpleProps.slice();
        }

        simpleProps.push(propName);

        if (simplePropsToRead !== simpleProps) {
          simplePropsToRead.push(propNameToRead);
        }
      } else {
        if (propNameToRead !== propName && advancedPropsToRead === advancedProps) {
          advancedPropsToRead = advancedProps.slice();
        }

        advancedProps.push(propName);

        if (advancedPropsToRead !== advancedProps) {
          advancedPropsToRead.push(propNameToRead);
        }

        advancedPropsValueType.push(defaultValue instanceof _globalExports.legacyCC.ValueType && defaultValue.constructor);
      }
    }
  })();

  return (s, o, d, k) => {
    for (let i = 0; i < simpleProps.length; ++i) {
      const prop = d[simplePropsToRead[i]];

      if (prop !== undefined) {
        o[simpleProps[i]] = prop;
      }
    }

    for (let i = 0; i < advancedProps.length; ++i) {
      const propName = advancedProps[i];
      const prop = d[advancedPropsToRead[i]];

      if (prop === undefined) {
        continue;
      }

      if (!fastMode && typeof prop !== 'object') {
        o[propName] = prop;
      } else {
        // fastMode (so will not simpleProp) or object
        const valueTypeCtor = advancedPropsValueType[i];

        if (valueTypeCtor) {
          if (fastMode || prop) {
            // @ts-expect-error 2341
            s._deserializeFastDefinedObject(o[propName], prop, valueTypeCtor);
          } else {
            o[propName] = null;
          }
        } else if (prop) {
          // @ts-expect-error 2341
          s._deserializeAndAssignField(o, prop, propName);
        } else {
          o[propName] = null;
        }
      }
    }

    if (shouldCopyId && d._id) {
      o._id = d._id;
    }

    if (shouldCopyRawData) {
      // deep copy original serialized data
      o._$erialized = JSON.parse(JSON.stringify(d)); // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced
      // @ts-expect-error 2341

      s._fillPlainObject(o._$erialized, d);
    }
  };
}

class DeserializerPool extends js.Pool {
  constructor() {
    super(deserializer => {
      deserializer.clear();
    }, 1);
  } // @ts-expect-error We only use this signature.


  get(details, classFinder, reportMissingClass, customEnv, ignoreEditorOnly) {
    const cache = this._get();

    if (cache) {
      cache.reset(details, classFinder, reportMissingClass, customEnv, ignoreEditorOnly);
      return cache;
    } else {
      return new _Deserializer(details, classFinder, reportMissingClass, customEnv, ignoreEditorOnly);
    }
  }

}

class _Deserializer {
  constructor(result, classFinder, reportMissingClass, customEnv, ignoreEditorOnly) {
    this.deserializedList = void 0;
    this.deserializedData = void 0;
    this._ignoreEditorOnly = void 0;
    this.result = result;
    this.customEnv = customEnv;
    this.deserializedList = [];
    this.deserializedData = null;
    this._classFinder = classFinder;
    this._reportMissingClass = reportMissingClass;
    this._onDereferenced = classFinder === null || classFinder === void 0 ? void 0 : classFinder.onDereferenced;

    if (_internal253Aconstants.DEV) {
      this._ignoreEditorOnly = ignoreEditorOnly;
    }
  }

  reset(result, classFinder, reportMissingClass, customEnv, ignoreEditorOnly) {
    this.result = result;
    this.customEnv = customEnv;
    this._classFinder = classFinder;
    this._reportMissingClass = reportMissingClass;
    this._onDereferenced = classFinder === null || classFinder === void 0 ? void 0 : classFinder.onDereferenced;

    if (_internal253Aconstants.DEV) {
      this._ignoreEditorOnly = ignoreEditorOnly;
    }
  }

  clear() {
    this.result = null;
    this.customEnv = null;
    this.deserializedList.length = 0;
    this.deserializedData = null;
    this._classFinder = null;
    this._reportMissingClass = null;
    this._onDereferenced = null;
  }

  deserialize(serializedData) {
    let fromCCON = false;
    let jsonObj;

    if (serializedData instanceof _ccon.CCON) {
      fromCCON = true;
      jsonObj = serializedData.document;

      if (serializedData.chunks.length > 0) {
        (0, _asserts.assertIsTrue)(serializedData.chunks.length === 1);
        this._mainBinChunk = serializedData.chunks[0];
      }
    } else {
      jsonObj = serializedData;
    }

    this._serializedData = jsonObj;
    this._context = {
      fromCCON
    };
    const serializedRootObject = Array.isArray(jsonObj) ? jsonObj[0] : jsonObj;

    if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
      this.deserializedData = this._deserializeObject(serializedRootObject, 0, this.deserializedList, `${0}`);
    } else {
      this.deserializedData = this._deserializeObject(serializedRootObject, 0);
    }

    this._serializedData = undefined;
    this._mainBinChunk = undefined;
    this._context = undefined; // eslint-disable-next-line @typescript-eslint/no-unsafe-return

    return this.deserializedData;
  }
  /**
   * @param serialized - The object to deserialize, must be non-nil.
   * @param globalIndex - If the object is deserialized from "root objects" array.
   * @param owner - Tracing purpose.
   * @param propName - Tracing purpose.
   */


  _deserializeObject(serialized, globalIndex, owner, propName) {
    switch (serialized.__type__) {
      case 'TypedArray':
        return this._deserializeTypedArrayView(serialized);

      case 'TypedArrayRef':
        return this._deserializeTypedArrayViewRef(serialized);

      default:
        if (serialized.__type__) {
          // Typed object (including CCClass)
          return this._deserializeTypeTaggedObject(serialized, globalIndex, owner, propName);
        } else if (!Array.isArray(serialized)) {
          // Embedded primitive javascript object
          return this._deserializePlainObject(serialized);
        } else {
          // Array
          return this._deserializeArray(serialized);
        }

    }
  }

  _deserializeTypedArrayView(value) {
    return globalThis[value.ctor].from(value.array);
  }

  _deserializeTypedArrayViewRef(value) {
    const {
      offset,
      length,
      ctor: constructorName
    } = value;
    const obj = new globalThis[constructorName](this._mainBinChunk.buffer, this._mainBinChunk.byteOffset + offset, length);
    return obj;
  }

  _deserializeArray(value) {
    const obj = new Array(value.length);
    let prop;

    for (let i = 0; i < value.length; i++) {
      prop = value[i];

      if (typeof prop === 'object' && prop) {
        const isAssetType = this._deserializeAndAssignField(obj, prop, `${i}`);

        if (isAssetType) {
          // fill default value for primitive objects (no constructor)
          obj[i] = null;
        }
      } else {
        obj[i] = prop;
      }
    }

    return obj;
  }

  _deserializePlainObject(value) {
    const obj = {};

    this._fillPlainObject(obj, value);

    return obj;
  }

  _deserializeTypeTaggedObject(value, globalIndex, owner, propName) {
    const type = value.__type__;

    const klass = this._classFinder(type, value, owner, propName);

    if (!klass) {
      const notReported = this._classFinder === js._getClassById;

      if (notReported) {
        this._reportMissingClass(type);
      }

      return null;
    }

    const createObject = constructor => {
      // eslint-disable-next-line new-cap
      const obj = new constructor();

      if (globalIndex >= 0) {
        this.deserializedList[globalIndex] = obj;
      }

      return obj;
    };

    if (!(_internal253Aconstants.EDITOR && _globalExports.legacyCC.js.isChildClassOf(klass, _globalExports.legacyCC.Component))) {
      const obj = createObject(klass);

      this._deserializeInto(value, obj, klass);

      return obj;
    } else {
      try {
        const obj = createObject(klass);

        this._deserializeInto(value, obj, klass);

        return obj;
      } catch (e) {
        if (_internal253Aconstants.DEBUG) {
          (0, _debug.error)(`Deserialize ${klass.name} failed, ${e.stack}`);
        }

        this._reportMissingClass(type);

        const obj = createObject(_missingScript.default);

        this._deserializeInto(value, obj, _missingScript.default);

        return obj;
      }
    }
  }

  _deserializeInto(value, object, constructor, skipCustomized = false) {
    if (!skipCustomized && object[_customSerializable.deserializeTag]) {
      this._runCustomizedDeserialize(value, object, constructor);

      return;
    } // cSpell:words Deserializable


    if (object._deserialize) {
      // TODO: content check?
      object._deserialize(value.content, this);

      return;
    }

    if (_globalExports.legacyCC.Class._isCCClass(constructor)) {
      this._deserializeFireClass(object, value, constructor);
    } else {
      this._deserializeFastDefinedObject(object, value, constructor);
    }
  }

  _runCustomizedDeserialize(value, object, constructor) {
    const serializationInput = {
      readProperty: name => {
        const serializedField = value[name];

        if (typeof serializedField !== 'object' || !serializedField) {
          return serializedField;
        } else {
          return this._deserializeObjectField(serializedField);
        }
      },
      readThis: () => {
        this._deserializeInto(value, object, constructor, true);
      },
      readSuper: () => {
        const superConstructor = js.getSuper(constructor);

        if (superConstructor) {
          this._deserializeInto(value, object, superConstructor);
        }
      }
    };

    object[_customSerializable.deserializeTag](serializationInput, this._context);
  }

  _deserializeFireClass(obj, serialized, klass) {
    let deserialize; // eslint-disable-next-line no-prototype-builtins

    if (klass.hasOwnProperty('__deserialize__')) {
      deserialize = klass.__deserialize__;
    } else {
      deserialize = compileDeserialize(this, klass); // DEBUG: Check MissingScript data for issue 9878

      try {
        if (klass === _missingScript.default) {
          const props = klass.__values__;

          if (props.length === 0 || props[props.length - 1] !== '_$erialized') {
            (0, _debug.error)(`The '_$erialized' prop of MissingScript is missing. Will force the raw data to be save.`);
            (0, _debug.error)(`    Error props: ['${props}']. Please contact jare.`); // props.push('_$erialized');
          }

          const rawDeserialize = deserialize;

          deserialize = function (deserializer, object, deserialized, constructor) {
            try {
              if (!JSON.parse(JSON.stringify(deserialized._$erialized))) {
                (0, _debug.error)(`Unable to load previously serialized data. ${JSON.stringify(deserialized)}`);
              }
            } catch (e) {
              (0, _debug.error)(`Error when checking MissingScript 7, ${e}`);
            }

            rawDeserialize(deserializer, object, deserialized, constructor);
          };
        }
      } catch (e) {
        (0, _debug.error)(`Error when checking MissingScript 6, ${e}`);
      }

      js.value(klass, '__deserialize__', deserialize, true);
    }

    deserialize(this, obj, serialized, klass);
  }

  _deserializeAndAssignField(obj, serializedField, propName) {
    const id = serializedField.__id__;

    if (typeof id === 'number') {
      const field = this.deserializedList[id];

      if (field) {
        obj[propName] = field;
      } else {
        var _this$_onDereferenced;

        // TODO: assertion
        const source = this._serializedData[id];

        if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
          obj[propName] = this._deserializeObject(source, id, obj, propName);
        } else {
          obj[propName] = this._deserializeObject(source, id, undefined, propName);
        }

        (_this$_onDereferenced = this._onDereferenced) === null || _this$_onDereferenced === void 0 ? void 0 : _this$_onDereferenced.call(this, this.deserializedList, id, obj, propName);
      }
    } else {
      const uuid = serializedField.__uuid__;

      if (uuid) {
        const expectedType = serializedField.__expectedType__;
        this.result.push(obj, propName, uuid, expectedType);
      } else if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
        obj[propName] = this._deserializeObject(serializedField, -1, obj, propName);
      } else {
        obj[propName] = this._deserializeObject(serializedField, -1);
      }
    }

    return false;
  }

  _deserializeObjectField(serializedField) {
    const id = serializedField.__id__;

    if (typeof id === 'number') {
      const field = this.deserializedList[id];

      if (field) {
        return field;
      } else {
        // TODO: assertion
        const source = this._serializedData[id];

        const field = this._deserializeObject(source, id, undefined, undefined);

        return field;
      }
    } else {
      const uuid = serializedField.__uuid__;

      if (uuid) {
        const _expectedType = serializedField.__expectedType__;
        throw new Error(`Asset reference field serialization is currently not supported in custom serialization.`);
      } else {
        return this._deserializeObject(serializedField, -1);
      }
    }
  }

  _fillPlainObject(instance, serialized) {
    for (const propName in serialized) {
      // eslint-disable-next-line no-prototype-builtins
      if (!serialized.hasOwnProperty(propName)) {
        continue;
      }

      const prop = serialized[propName];

      if (typeof prop !== 'object') {
        if (propName !== '__type__'
        /* && k != '__id__' */
        ) {
            instance[propName] = prop;
          }
      } else if (prop) {
        const isAssetType = this._deserializeAndAssignField(instance, prop, propName);

        if (isAssetType) {
          // fill default value for primitive objects (no constructor)
          instance[propName] = null;
        }
      } else {
        instance[propName] = null;
      }
    }
  }

  _deserializeFastDefinedObject(instance, serialized, klass) {
    if (klass === _globalExports.legacyCC.Vec2) {
      instance.x = serialized.x || 0;
      instance.y = serialized.y || 0;
      return;
    } else if (klass === _globalExports.legacyCC.Vec3) {
      instance.x = serialized.x || 0;
      instance.y = serialized.y || 0;
      instance.z = serialized.z || 0;
      return;
    } else if (klass === _globalExports.legacyCC.Color) {
      instance.r = serialized.r || 0;
      instance.g = serialized.g || 0;
      instance.b = serialized.b || 0;
      const a = serialized.a;
      instance.a = a === undefined ? 255 : a;
      return;
    } else if (klass === _globalExports.legacyCC.Size) {
      instance.width = serialized.width || 0;
      instance.height = serialized.height || 0;
      return;
    }

    const attrs = Attr.getClassAttrs(klass); // @ts-expect-error 2339

    const props = klass.__values__;

    if (_internal253Aconstants.DEBUG && !props) {
      (0, _debug.error)(`Unable to deserialize ${js.getClassName(klass)}. ` + 'For non-CCClass types, they can only be marked as serializable by `CCClass.fastDefine`.');
    }

    for (let i = 0; i < props.length; i++) {
      const propName = props[i];
      let value = serialized[propName]; // eslint-disable-next-line no-prototype-builtins

      const exists = value !== undefined || serialized.hasOwnProperty(propName);

      if (!exists) {
        // not serialized,
        // recover to default value in ValueType, because eliminated properties equals to
        // its default value in ValueType, not default value in user class
        value = _class.CCClass.getDefault(attrs[propName + POSTFIX_DEFAULT]);
      }

      if (typeof value !== 'object') {
        instance[propName] = value;
      } else if (value) {
        this._deserializeAndAssignField(instance, value, propName);
      } else {
        instance[propName] = null;
      }
    }
  }

}

_Deserializer.pool = new DeserializerPool();

function deserializeDynamic(data, details, options) {
  var _options$reportMissin;

  options = options || {};
  const classFinder = options.classFinder || js._getClassById;
  const createAssetRefs = options.createAssetRefs || _sys.sys.platform === _index.Platform.EDITOR_CORE;
  const customEnv = options.customEnv;
  const ignoreEditorOnly = options.ignoreEditorOnly;
  const reportMissingClass = (_options$reportMissin = options.reportMissingClass) !== null && _options$reportMissin !== void 0 ? _options$reportMissin : _globalExports.legacyCC.deserialize.reportMissingClass; // var oldJson = JSON.stringify(data, null, 2);

  details.init();

  const deserializer = _Deserializer.pool.get(details, classFinder, reportMissingClass, customEnv, ignoreEditorOnly);

  _globalExports.legacyCC.game._isCloning = true;
  const res = deserializer.deserialize(data);
  _globalExports.legacyCC.game._isCloning = false;

  _Deserializer.pool.put(deserializer);

  if (createAssetRefs) {
    details.assignAssetsBy(EditorExtends.serialize.asAsset);
  } // var afterJson = JSON.stringify(data, null, 2);
  // if (oldJson !== afterJson) {
  //     throw new Error('JSON SHOULD not changed');
  // }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return


  return res;
}

function parseUuidDependenciesDynamic(serialized) {
  const depends = [];

  const parseDependRecursively = (data, out) => {
    if (!data || typeof data !== 'object' || typeof data.__id__ === 'number') {
      return;
    }

    const uuid = data.__uuid__;

    if (Array.isArray(data)) {
      for (let i = 0, l = data.length; i < l; i++) {
        parseDependRecursively(data[i], out);
      }
    } else if (uuid) {
      out.push(uuid);
    } else {
      for (const prop in data) {
        parseDependRecursively(data[prop], out);
      }
    }
  };

  parseDependRecursively(serialized, depends);
  return depends;
}
System.register("q-bundled:///fs/cocos/core/data/deserialize-dynamic.js", ["../../../../virtual/internal%253Aconstants.js", "../global-exports.js", "../utils/js.js", "../utils/misc.js", "./class.js", "./utils/attribute.js", "../components/missing-script.js", "../../../pal/system-info/enum-type/index.js", "../platform/sys.js", "../platform/debug.js", "./custom-serializable.js", "./ccon.js", "./utils/asserts.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, DEV, DEBUG, JSB, PREVIEW, SUPPORT_JIT, legacyCC, js, misc, CCClass, Attr, MissingScript, Platform, sys, error, deserializeTag, CCON, assertIsTrue, compileDeserialize, DELIMITER, POSTFIX_TYPE, POSTFIX_EDITOR_ONLY, POSTFIX_DEFAULT, POSTFIX_FORMERLY_SERIALIZED_AS, DeserializerPool, _Deserializer;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, assumeHavePropIfIsValue) {
    if (defaultValue instanceof legacyCC.ValueType) {
      // fast case
      if (!assumeHavePropIfIsValue) {
        sources.push('if(prop){');
      } // @ts-expect-error Typing


      var ctorCode = js.getClassName(defaultValue);
      sources.push("s._deserializeFastDefinedObject(o" + accessorToSet + ",prop," + ctorCode + ");");

      if (!assumeHavePropIfIsValue) {
        sources.push("}else o" + accessorToSet + "=null;");
      }
    } else {
      sources.push("\nif (prop) {\n    s._deserializeAndAssignField(o, prop, " + propNameLiteralToSet + ");\n} else {\n    o" + accessorToSet + "=null;\n}\n");
    }
  }

  function compileDeserializeJIT(self, klass) {
    var attrs = Attr.getClassAttrs(klass);
    var props = klass.__values__; // self, obj, serializedData, klass

    var sources = ['var prop;'];
    var fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass)); // sources.push('var vb,vn,vs,vo,vu,vf;');    // boolean, number, string, object, undefined, function

    for (var p = 0; p < props.length; p++) {
      var propName = props[p]; // @ts-expect-error 2341

      if ((PREVIEW || EDITOR && self._ignoreEditorOnly) && attrs[propName + POSTFIX_EDITOR_ONLY]) {
        continue; // skip editor only if in preview
      }

      var accessorToSet = void 0;
      var propNameLiteralToSet = void 0;

      if (CCClass.IDENTIFIER_RE.test(propName)) {
        propNameLiteralToSet = "\"" + propName + "\"";
        accessorToSet = "." + propName;
      } else {
        propNameLiteralToSet = CCClass.escapeForJS(propName);
        accessorToSet = "[" + propNameLiteralToSet + "]";
      }

      var accessorToGet = accessorToSet;

      if (attrs[propName + POSTFIX_FORMERLY_SERIALIZED_AS]) {
        var propNameToRead = attrs[propName + POSTFIX_FORMERLY_SERIALIZED_AS];

        if (CCClass.IDENTIFIER_RE.test(propNameToRead)) {
          accessorToGet = "." + propNameToRead;
        } else {
          accessorToGet = "[" + CCClass.escapeForJS(propNameToRead) + "]";
        }
      }

      sources.push("prop=d" + accessorToGet + ";");
      sources.push("if(typeof " + (JSB ? '(prop)' : 'prop') + "!==\"undefined\"){"); // function undefined object(null) string boolean number

      var defaultValue = CCClass.getDefault(attrs[propName + POSTFIX_DEFAULT]);

      if (fastMode) {
        var isPrimitiveType = void 0;
        var userType = attrs[propName + POSTFIX_TYPE];

        if (defaultValue === undefined && userType) {
          isPrimitiveType = userType instanceof Attr.PrimitiveType;
        } else {
          var defaultType = typeof defaultValue;
          isPrimitiveType = defaultType === 'string' || defaultType === 'number' || defaultType === 'boolean';
        }

        if (isPrimitiveType) {
          sources.push("o" + accessorToSet + "=prop;");
        } else {
          compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, true);
        }
      } else {
        sources.push("" + ("if(typeof " + (JSB ? '(prop)' : 'prop') + "!==\"object\"){" + 'o') + accessorToSet + "=prop;" + "}else{");
        compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, false);
        sources.push('}');
      }

      sources.push('}');
    }

    if (legacyCC.js.isChildClassOf(klass, legacyCC._BaseNode) || legacyCC.js.isChildClassOf(klass, legacyCC.Component)) {
      // @ts-expect-error 2341
      if (PREVIEW || EDITOR && self._ignoreEditorOnly) {
        var mayUsedInPersistRoot = js.isChildClassOf(klass, legacyCC.Node);

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
    var fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass));
    var shouldCopyId = js.isChildClassOf(klass, legacyCC._BaseNode) || js.isChildClassOf(klass, legacyCC.Component);
    var shouldCopyRawData = false;
    var simpleProps = [];
    var simplePropsToRead = simpleProps;
    var advancedProps = [];
    var advancedPropsToRead = advancedProps;
    var advancedPropsValueType = [];

    (function () {
      var props = klass.__values__;
      shouldCopyRawData = props[props.length - 1] === '_$erialized';
      var attrs = Attr.getClassAttrs(klass);

      for (var p = 0; p < props.length; p++) {
        var propName = props[p];
        var propNameToRead = propName;

        if (attrs[propName + POSTFIX_FORMERLY_SERIALIZED_AS]) {
          propNameToRead = attrs[propName + POSTFIX_FORMERLY_SERIALIZED_AS];
        } // function undefined object(null) string boolean number


        var defaultValue = CCClass.getDefault(attrs[propName + POSTFIX_DEFAULT]);
        var isPrimitiveType = false;

        if (fastMode) {
          var userType = attrs[propName + POSTFIX_TYPE];

          if (defaultValue === undefined && userType) {
            isPrimitiveType = userType instanceof Attr.PrimitiveType;
          } else {
            var defaultType = typeof defaultValue;
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

          advancedPropsValueType.push(defaultValue instanceof legacyCC.ValueType && defaultValue.constructor);
        }
      }
    })();

    return function (s, o, d, k) {
      for (var i = 0; i < simpleProps.length; ++i) {
        var prop = d[simplePropsToRead[i]];

        if (prop !== undefined) {
          o[simpleProps[i]] = prop;
        }
      }

      for (var _i = 0; _i < advancedProps.length; ++_i) {
        var propName = advancedProps[_i];
        var _prop = d[advancedPropsToRead[_i]];

        if (_prop === undefined) {
          continue;
        }

        if (!fastMode && typeof _prop !== 'object') {
          o[propName] = _prop;
        } else {
          // fastMode (so will not simpleProp) or object
          var valueTypeCtor = advancedPropsValueType[_i];

          if (valueTypeCtor) {
            if (fastMode || _prop) {
              // @ts-expect-error 2341
              s._deserializeFastDefinedObject(o[propName], _prop, valueTypeCtor);
            } else {
              o[propName] = null;
            }
          } else if (_prop) {
            // @ts-expect-error 2341
            s._deserializeAndAssignField(o, _prop, propName);
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

  function deserializeDynamic(data, details, options) {
    var _options$reportMissin;

    options = options || {};
    var classFinder = options.classFinder || js._getClassById;
    var createAssetRefs = options.createAssetRefs || sys.platform === Platform.EDITOR_CORE;
    var customEnv = options.customEnv;
    var ignoreEditorOnly = options.ignoreEditorOnly;
    var reportMissingClass = (_options$reportMissin = options.reportMissingClass) !== null && _options$reportMissin !== void 0 ? _options$reportMissin : legacyCC.deserialize.reportMissingClass; // var oldJson = JSON.stringify(data, null, 2);

    details.init();

    var deserializer = _Deserializer.pool.get(details, classFinder, reportMissingClass, customEnv, ignoreEditorOnly);

    legacyCC.game._isCloning = true;
    var res = deserializer.deserialize(data);
    legacyCC.game._isCloning = false;

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
    var depends = [];

    var parseDependRecursively = function parseDependRecursively(data, out) {
      if (!data || typeof data !== 'object' || typeof data.__id__ === 'number') {
        return;
      }

      var uuid = data.__uuid__;

      if (Array.isArray(data)) {
        for (var i = 0, l = data.length; i < l; i++) {
          parseDependRecursively(data[i], out);
        }
      } else if (uuid) {
        out.push(uuid);
      } else {
        for (var prop in data) {
          parseDependRecursively(data[prop], out);
        }
      }
    };

    parseDependRecursively(serialized, depends);
    return depends;
  }

  _export({
    deserializeDynamic: deserializeDynamic,
    parseUuidDependenciesDynamic: parseUuidDependenciesDynamic
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
      DEV = _virtualInternal253AconstantsJs.DEV;
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
      JSB = _virtualInternal253AconstantsJs.JSB;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
      SUPPORT_JIT = _virtualInternal253AconstantsJs.SUPPORT_JIT;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_utilsJsJs) {
      js = _utilsJsJs;
    }, function (_utilsMiscJs) {
      misc = _utilsMiscJs;
    }, function (_classJs) {
      CCClass = _classJs.CCClass;
    }, function (_utilsAttributeJs) {
      Attr = _utilsAttributeJs;
    }, function (_componentsMissingScriptJs) {
      MissingScript = _componentsMissingScriptJs.default;
    }, function (_palSystemInfoEnumTypeIndexJs) {
      Platform = _palSystemInfoEnumTypeIndexJs.Platform;
    }, function (_platformSysJs) {
      sys = _platformSysJs.sys;
    }, function (_platformDebugJs) {
      error = _platformDebugJs.error;
    }, function (_customSerializableJs) {
      deserializeTag = _customSerializableJs.deserializeTag;
    }, function (_cconJs) {
      CCON = _cconJs.CCON;
    }, function (_utilsAssertsJs) {
      assertIsTrue = _utilsAssertsJs.assertIsTrue;
    }],
    execute: function () {
      compileDeserialize = SUPPORT_JIT ? compileDeserializeJIT : compileDeserializeNative;
      DELIMITER = Attr.DELIMETER;
      POSTFIX_TYPE = DELIMITER + "type";
      POSTFIX_EDITOR_ONLY = DELIMITER + "editorOnly";
      POSTFIX_DEFAULT = DELIMITER + "default";
      POSTFIX_FORMERLY_SERIALIZED_AS = DELIMITER + "formerlySerializedAs";

      DeserializerPool = /*#__PURE__*/function (_js$Pool) {
        _inheritsLoose(DeserializerPool, _js$Pool);

        function DeserializerPool() {
          return _js$Pool.call(this, function (deserializer) {
            deserializer.clear();
          }, 1) || this;
        } // @ts-expect-error We only use this signature.


        var _proto = DeserializerPool.prototype;

        _proto.get = function get(details, classFinder, reportMissingClass, customEnv, ignoreEditorOnly) {
          var cache = this._get();

          if (cache) {
            cache.reset(details, classFinder, reportMissingClass, customEnv, ignoreEditorOnly);
            return cache;
          } else {
            return new _Deserializer(details, classFinder, reportMissingClass, customEnv, ignoreEditorOnly);
          }
        };

        return DeserializerPool;
      }(js.Pool);

      _Deserializer = /*#__PURE__*/function () {
        function _Deserializer(result, classFinder, reportMissingClass, customEnv, ignoreEditorOnly) {
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

          if (DEV) {
            this._ignoreEditorOnly = ignoreEditorOnly;
          }
        }

        var _proto2 = _Deserializer.prototype;

        _proto2.reset = function reset(result, classFinder, reportMissingClass, customEnv, ignoreEditorOnly) {
          this.result = result;
          this.customEnv = customEnv;
          this._classFinder = classFinder;
          this._reportMissingClass = reportMissingClass;
          this._onDereferenced = classFinder === null || classFinder === void 0 ? void 0 : classFinder.onDereferenced;

          if (DEV) {
            this._ignoreEditorOnly = ignoreEditorOnly;
          }
        };

        _proto2.clear = function clear() {
          this.result = null;
          this.customEnv = null;
          this.deserializedList.length = 0;
          this.deserializedData = null;
          this._classFinder = null;
          this._reportMissingClass = null;
          this._onDereferenced = null;
        };

        _proto2.deserialize = function deserialize(serializedData) {
          var fromCCON = false;
          var jsonObj;

          if (serializedData instanceof CCON) {
            fromCCON = true;
            jsonObj = serializedData.document;

            if (serializedData.chunks.length > 0) {
              assertIsTrue(serializedData.chunks.length === 1);
              this._mainBinChunk = serializedData.chunks[0];
            }
          } else {
            jsonObj = serializedData;
          }

          this._serializedData = jsonObj;
          this._context = {
            fromCCON: fromCCON
          };
          var serializedRootObject = Array.isArray(jsonObj) ? jsonObj[0] : jsonObj;

          if (EDITOR || TEST) {
            this.deserializedData = this._deserializeObject(serializedRootObject, 0, this.deserializedList, "" + 0);
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
        ;

        _proto2._deserializeObject = function _deserializeObject(serialized, globalIndex, owner, propName) {
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
        };

        _proto2._deserializeTypedArrayView = function _deserializeTypedArrayView(value) {
          return globalThis[value.ctor].from(value.array);
        };

        _proto2._deserializeTypedArrayViewRef = function _deserializeTypedArrayViewRef(value) {
          var offset = value.offset,
              length = value.length,
              constructorName = value.ctor;
          var obj = new globalThis[constructorName](this._mainBinChunk.buffer, this._mainBinChunk.byteOffset + offset, length);
          return obj;
        };

        _proto2._deserializeArray = function _deserializeArray(value) {
          var obj = new Array(value.length);
          var prop;

          for (var i = 0; i < value.length; i++) {
            prop = value[i];

            if (typeof prop === 'object' && prop) {
              var isAssetType = this._deserializeAndAssignField(obj, prop, "" + i);

              if (isAssetType) {
                // fill default value for primitive objects (no constructor)
                obj[i] = null;
              }
            } else {
              obj[i] = prop;
            }
          }

          return obj;
        };

        _proto2._deserializePlainObject = function _deserializePlainObject(value) {
          var obj = {};

          this._fillPlainObject(obj, value);

          return obj;
        };

        _proto2._deserializeTypeTaggedObject = function _deserializeTypeTaggedObject(value, globalIndex, owner, propName) {
          var _this = this;

          var type = value.__type__;

          var klass = this._classFinder(type, value, owner, propName);

          if (!klass) {
            var notReported = this._classFinder === js._getClassById;

            if (notReported) {
              this._reportMissingClass(type);
            }

            return null;
          }

          var createObject = function createObject(constructor) {
            // eslint-disable-next-line new-cap
            var obj = new constructor();

            if (globalIndex >= 0) {
              _this.deserializedList[globalIndex] = obj;
            }

            return obj;
          };

          if (!(EDITOR && legacyCC.js.isChildClassOf(klass, legacyCC.Component))) {
            var obj = createObject(klass);

            this._deserializeInto(value, obj, klass);

            return obj;
          } else {
            try {
              var _obj = createObject(klass);

              this._deserializeInto(value, _obj, klass);

              return _obj;
            } catch (e) {
              if (DEBUG) {
                error("Deserialize " + klass.name + " failed, " + e.stack);
              }

              this._reportMissingClass(type);

              var _obj2 = createObject(MissingScript);

              this._deserializeInto(value, _obj2, MissingScript);

              return _obj2;
            }
          }
        };

        _proto2._deserializeInto = function _deserializeInto(value, object, constructor, skipCustomized) {
          if (skipCustomized === void 0) {
            skipCustomized = false;
          }

          if (!skipCustomized && object[deserializeTag]) {
            this._runCustomizedDeserialize(value, object, constructor);

            return;
          } // cSpell:words Deserializable


          if (object._deserialize) {
            // TODO: content check?
            object._deserialize(value.content, this);

            return;
          }

          if (legacyCC.Class._isCCClass(constructor)) {
            this._deserializeFireClass(object, value, constructor);
          } else {
            this._deserializeFastDefinedObject(object, value, constructor);
          }
        };

        _proto2._runCustomizedDeserialize = function _runCustomizedDeserialize(value, object, constructor) {
          var _this2 = this;

          var serializationInput = {
            readProperty: function readProperty(name) {
              var serializedField = value[name];

              if (typeof serializedField !== 'object' || !serializedField) {
                return serializedField;
              } else {
                return _this2._deserializeObjectField(serializedField);
              }
            },
            readThis: function readThis() {
              _this2._deserializeInto(value, object, constructor, true);
            },
            readSuper: function readSuper() {
              var superConstructor = js.getSuper(constructor);

              if (superConstructor) {
                _this2._deserializeInto(value, object, superConstructor);
              }
            }
          };
          object[deserializeTag](serializationInput, this._context);
        };

        _proto2._deserializeFireClass = function _deserializeFireClass(obj, serialized, klass) {
          var deserialize; // eslint-disable-next-line no-prototype-builtins

          if (klass.hasOwnProperty('__deserialize__')) {
            deserialize = klass.__deserialize__;
          } else {
            deserialize = compileDeserialize(this, klass); // DEBUG: Check MissingScript data for issue 9878

            try {
              if (klass === MissingScript) {
                var props = klass.__values__;

                if (props.length === 0 || props[props.length - 1] !== '_$erialized') {
                  error("The '_$erialized' prop of MissingScript is missing. Will force the raw data to be save.");
                  error("    Error props: ['" + props + "']. Please contact jare."); // props.push('_$erialized');
                }

                var rawDeserialize = deserialize;

                deserialize = function deserialize(deserializer, object, deserialized, constructor) {
                  try {
                    if (!JSON.parse(JSON.stringify(deserialized._$erialized))) {
                      error("Unable to load previously serialized data. " + JSON.stringify(deserialized));
                    }
                  } catch (e) {
                    error("Error when checking MissingScript 7, " + e);
                  }

                  rawDeserialize(deserializer, object, deserialized, constructor);
                };
              }
            } catch (e) {
              error("Error when checking MissingScript 6, " + e);
            }

            js.value(klass, '__deserialize__', deserialize, true);
          }

          deserialize(this, obj, serialized, klass);
        };

        _proto2._deserializeAndAssignField = function _deserializeAndAssignField(obj, serializedField, propName) {
          var id = serializedField.__id__;

          if (typeof id === 'number') {
            var field = this.deserializedList[id];

            if (field) {
              obj[propName] = field;
            } else {
              var _this$_onDereferenced;

              // TODO: assertion
              var source = this._serializedData[id];

              if (EDITOR || TEST) {
                obj[propName] = this._deserializeObject(source, id, obj, propName);
              } else {
                obj[propName] = this._deserializeObject(source, id, undefined, propName);
              }

              (_this$_onDereferenced = this._onDereferenced) === null || _this$_onDereferenced === void 0 ? void 0 : _this$_onDereferenced.call(this, this.deserializedList, id, obj, propName);
            }
          } else {
            var uuid = serializedField.__uuid__;

            if (uuid) {
              var expectedType = serializedField.__expectedType__;
              this.result.push(obj, propName, uuid, expectedType);
            } else if (EDITOR || TEST) {
              obj[propName] = this._deserializeObject(serializedField, -1, obj, propName);
            } else {
              obj[propName] = this._deserializeObject(serializedField, -1);
            }
          }

          return false;
        };

        _proto2._deserializeObjectField = function _deserializeObjectField(serializedField) {
          var id = serializedField.__id__;

          if (typeof id === 'number') {
            var field = this.deserializedList[id];

            if (field) {
              return field;
            } else {
              // TODO: assertion
              var source = this._serializedData[id];

              var _field = this._deserializeObject(source, id, undefined, undefined);

              return _field;
            }
          } else {
            var uuid = serializedField.__uuid__;

            if (uuid) {
              var _expectedType = serializedField.__expectedType__;
              throw new Error("Asset reference field serialization is currently not supported in custom serialization.");
            } else {
              return this._deserializeObject(serializedField, -1);
            }
          }
        };

        _proto2._fillPlainObject = function _fillPlainObject(instance, serialized) {
          for (var propName in serialized) {
            // eslint-disable-next-line no-prototype-builtins
            if (!serialized.hasOwnProperty(propName)) {
              continue;
            }

            var prop = serialized[propName];

            if (typeof prop !== 'object') {
              if (propName !== '__type__'
              /* && k != '__id__' */
              ) {
                  instance[propName] = prop;
                }
            } else if (prop) {
              var isAssetType = this._deserializeAndAssignField(instance, prop, propName);

              if (isAssetType) {
                // fill default value for primitive objects (no constructor)
                instance[propName] = null;
              }
            } else {
              instance[propName] = null;
            }
          }
        };

        _proto2._deserializeFastDefinedObject = function _deserializeFastDefinedObject(instance, serialized, klass) {
          if (klass === legacyCC.Vec2) {
            instance.x = serialized.x || 0;
            instance.y = serialized.y || 0;
            return;
          } else if (klass === legacyCC.Vec3) {
            instance.x = serialized.x || 0;
            instance.y = serialized.y || 0;
            instance.z = serialized.z || 0;
            return;
          } else if (klass === legacyCC.Color) {
            instance.r = serialized.r || 0;
            instance.g = serialized.g || 0;
            instance.b = serialized.b || 0;
            var a = serialized.a;
            instance.a = a === undefined ? 255 : a;
            return;
          } else if (klass === legacyCC.Size) {
            instance.width = serialized.width || 0;
            instance.height = serialized.height || 0;
            return;
          }

          var attrs = Attr.getClassAttrs(klass); // @ts-expect-error 2339

          var props = klass.__values__;

          if (DEBUG && !props) {
            error("Unable to deserialize " + js.getClassName(klass) + ". " + 'For non-CCClass types, they can only be marked as serializable by `CCClass.fastDefine`.');
          }

          for (var i = 0; i < props.length; i++) {
            var propName = props[i];
            var value = serialized[propName]; // eslint-disable-next-line no-prototype-builtins

            var exists = value !== undefined || serialized.hasOwnProperty(propName);

            if (!exists) {
              // not serialized,
              // recover to default value in ValueType, because eliminated properties equals to
              // its default value in ValueType, not default value in user class
              value = CCClass.getDefault(attrs[propName + POSTFIX_DEFAULT]);
            }

            if (typeof value !== 'object') {
              instance[propName] = value;
            } else if (value) {
              this._deserializeAndAssignField(instance, value, propName);
            } else {
              instance[propName] = null;
            }
          }
        };

        return _Deserializer;
      }();

      _Deserializer.pool = new DeserializerPool();
    }
  };
});
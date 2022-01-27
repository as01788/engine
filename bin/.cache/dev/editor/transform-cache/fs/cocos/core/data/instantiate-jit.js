"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equalsToDefault = equalsToDefault;
exports.compile = compile;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var js = _interopRequireWildcard(require("../utils/js.js"));

var _class = require("./class.js");

var _object = require("./object.js");

var Attr = _interopRequireWildcard(require("./utils/attribute.js"));

var _compiler = require("./utils/compiler.js");

var _globalExports = require("../global-exports.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
 * @packageDocumentation
 * @hidden
 */
// Some helper methods for compile instantiation code
const Destroyed = _object.CCObject.Flags.Destroyed;
const PersistentMask = _object.CCObject.Flags.PersistentMask;
const DEFAULT = `${Attr.DELIMETER}default`;
const IDENTIFIER_RE = _class.CCClass.IDENTIFIER_RE;
const VAR = 'var ';
const LOCAL_OBJ = 'o';
const LOCAL_TEMP_OBJ = 't';
const LOCAL_ARRAY = 'a';
const LINE_INDEX_OF_NEW_OBJ = 0;
const DEFAULT_MODULE_CACHE = {
  'cc.ClickEvent': false,
  'cc.PrefabInfo': false
};
const escapeForJS = _class.CCClass.escapeForJS; // HELPER CLASSES
// ('foo', 'bar')
// -> 'var foo = bar;'

class Declaration {
  constructor(varName, expression) {
    this.varName = void 0;
    this.expression = void 0;
    this.varName = varName;
    this.expression = expression;
  }

  toString() {
    return `${VAR + this.varName}=${this.expression};`;
  }

} // ('a =', 'var b = x')
// -> 'var b = a = x';
// ('a =', 'x')
// -> 'a = x';


function mergeDeclaration(statement, expression) {
  if (expression instanceof Declaration) {
    return new Declaration(expression.varName, statement + expression.expression);
  } else {
    return statement + expression;
  }
} // ('a', ['var b = x', 'b.foo = bar'])
// -> 'var b = a = x;'
// -> 'b.foo = bar;'
// ('a', 'var b = x')
// -> 'var b = a = x;'
// ('a', 'x')
// -> 'a = x;'


function writeAssignment(codeArray, statement, expression) {
  if (Array.isArray(expression)) {
    expression[0] = mergeDeclaration(statement, expression[0]);
    codeArray.push(expression);
  } else {
    codeArray.push(`${mergeDeclaration(statement, expression)};`);
  }
} // ('foo', 'bar')
// -> 'targetExpression.foo = bar'
// ('foo1', 'bar1')
// ('foo2', 'bar2')
// -> 't = targetExpression;'
// -> 't.foo1 = bar1;'
// -> 't.foo2 = bar2;'


class Assignments {
  constructor(targetExpression) {
    this._exps = void 0;
    this._targetExp = void 0;
    this._exps = [];
    this._targetExp = targetExpression;
  }

  append(key, expression) {
    this._exps.push([key, expression]);
  }

  writeCode(codeArray) {
    let targetVar;

    if (this._exps.length > 1) {
      codeArray.push(`${LOCAL_TEMP_OBJ}=${this._targetExp};`);
      targetVar = LOCAL_TEMP_OBJ;
    } else if (this._exps.length === 1) {
      targetVar = this._targetExp;
    } else {
      return;
    }

    for (let i = 0; i < this._exps.length; i++) {
      const pair = this._exps[i];
      writeAssignment(codeArray, `${targetVar + getPropAccessor(pair[0])}=`, pair[1]);
    }
  }

}

Assignments.pool = void 0;
Assignments.pool = new js.Pool(obj => {
  obj._exps.length = 0;
  obj._targetExp = null;
}, 1); // @ts-expect-error

Assignments.pool.get = function (targetExpression) {
  const cache = this._get() || new Assignments();
  cache._targetExp = targetExpression;
  return cache;
}; // HELPER FUNCTIONS


function getPropAccessor(key) {
  return IDENTIFIER_RE.test(key) ? `.${key}` : `[${escapeForJS(key)}]`;
} //

/*
 * Variables:
 * {Object[]} O - objs list
 * {Function[]} F - constructor list
 * {Node} [R] - specify an instantiated prefabRoot that all references to prefabRoot in prefab will redirect to
 * {Object} o - current creating object
 */


class Parser {
  /*
  * @method constructor
  * @param {Object} obj - the object to parse
  * @param {Node} [parent]
  */
  constructor(obj, parent) {
    this.parent = void 0;
    this.objsToClear_iN$t = void 0;
    this.codeArray = void 0;
    this.objs = void 0;
    this.funcs = void 0;
    this.funcModuleCache = void 0;
    this.globalVariables = void 0;
    this.globalVariableId = void 0;
    this.localVariableId = void 0;
    this.result = void 0;
    this.parent = parent;
    this.objsToClear_iN$t = []; // used to reset _iN$t variable

    this.codeArray = []; // datas for generated code

    this.objs = [];
    this.funcs = [];
    this.funcModuleCache = js.createMap();
    js.mixin(this.funcModuleCache, DEFAULT_MODULE_CACHE); // {String[]} - variable names for circular references,
    //              not really global, just local variables shared between sub functions

    this.globalVariables = []; // incremental id for new global variables

    this.globalVariableId = 0; // incremental id for new local variables

    this.localVariableId = 0; // generate codeArray
    // if (Array.isArray(obj)) {
    //    this.codeArray.push(this.instantiateArray(obj));
    // }
    // else {

    this.codeArray.push(`${VAR + LOCAL_OBJ},${LOCAL_TEMP_OBJ};`, 'if(R){', `${LOCAL_OBJ}=R;`, '}else{', `${LOCAL_OBJ}=R=new ${this.getFuncModule(obj.constructor, true)}();`, '}');
    obj._iN$t = {
      globalVar: 'R'
    };
    this.objsToClear_iN$t.push(obj);
    this.enumerateObject(this.codeArray, obj); // }
    // generate code

    let globalVariablesDeclaration;

    if (this.globalVariables.length > 0) {
      globalVariablesDeclaration = `${VAR + this.globalVariables.join(',')};`;
    }

    const code = (0, _compiler.flattenCodeArray)(['return (function(R){', globalVariablesDeclaration || [], this.codeArray, 'return o;', '})']); // generate method and bind with objs

    this.result = Function('O', 'F', code)(this.objs, this.funcs); // if (TEST && !isPhantomJS) {
    //     console.log(code);
    // }
    // cleanup

    for (let i = 0, len = this.objsToClear_iN$t.length; i < len; ++i) {
      this.objsToClear_iN$t[i]._iN$t = null;
    }

    this.objsToClear_iN$t.length = 0;
  }

  getFuncModule(func, usedInNew) {
    const clsName = js.getClassName(func);

    if (clsName) {
      const cache = this.funcModuleCache[clsName];

      if (cache) {
        return cache;
      } else if (cache === undefined) {
        let clsNameIsModule = clsName.indexOf('.') !== -1;

        if (clsNameIsModule) {
          try {
            // ensure is module
            clsNameIsModule = func === Function(`return ${clsName}`)();

            if (clsNameIsModule) {
              this.funcModuleCache[clsName] = clsName;
              return clsName;
            }
          } catch (e) {}
        }
      }
    }

    let index = this.funcs.indexOf(func);

    if (index < 0) {
      index = this.funcs.length;
      this.funcs.push(func);
    }

    let res = `F[${index}]`;

    if (usedInNew) {
      res = `(${res})`;
    }

    this.funcModuleCache[clsName] = res;
    return res;
  }

  getObjRef(obj) {
    let index = this.objs.indexOf(obj);

    if (index < 0) {
      index = this.objs.length;
      this.objs.push(obj);
    }

    return `O[${index}]`;
  }

  setValueType(codeArray, defaultValue, srcValue, targetExpression) {
    // @ts-expect-error
    const assignments = Assignments.pool.get(targetExpression);
    let fastDefinedProps = defaultValue.constructor.__props__;

    if (!fastDefinedProps) {
      fastDefinedProps = Object.keys(defaultValue);
    }

    for (let i = 0; i < fastDefinedProps.length; i++) {
      const propName = fastDefinedProps[i];
      const prop = srcValue[propName];

      if (defaultValue[propName] === prop) {
        continue;
      }

      const expression = this.enumerateField(srcValue, propName, prop);
      assignments.append(propName, expression);
    }

    assignments.writeCode(codeArray);
    Assignments.pool.put(assignments);
  }

  enumerateCCClass(codeArray, obj, klass) {
    const props = klass.__values__;
    const attrs = Attr.getClassAttrs(klass);

    for (let p = 0; p < props.length; p++) {
      const key = props[p];
      const val = obj[key];
      let defaultValue = attrs[key + DEFAULT];

      if (equalsToDefault(defaultValue, val)) {
        continue;
      }

      if (typeof val === 'object' && val instanceof _globalExports.legacyCC.ValueType) {
        defaultValue = _class.CCClass.getDefault(defaultValue);

        if (defaultValue && defaultValue.constructor === val.constructor) {
          // fast case
          const targetExpression = LOCAL_OBJ + getPropAccessor(key);
          this.setValueType(codeArray, defaultValue, val, targetExpression);
          continue;
        }
      }

      this.setObjProp(codeArray, obj, key, val);
    }
  }

  instantiateArray(value) {
    if (value.length === 0) {
      return '[]';
    }

    const arrayVar = LOCAL_ARRAY + ++this.localVariableId;
    const declaration = new Declaration(arrayVar, `new Array(${value.length})`);
    const codeArray = [declaration]; // assign a _iN$t flag to indicate that this object has been parsed.

    value._iN$t = {
      globalVar: '',
      // the name of declared global variable used to access this object
      source: codeArray // the source code array for this object

    };
    this.objsToClear_iN$t.push(value);

    for (let i = 0; i < value.length; ++i) {
      const statement = `${arrayVar}[${i}]=`;
      const expression = this.enumerateField(value, i, value[i]);
      writeAssignment(codeArray, statement, expression);
    }

    return codeArray;
  }

  instantiateTypedArray(value) {
    const type = value.constructor.name;

    if (value.length === 0) {
      return `new ${type}`;
    }

    const arrayVar = LOCAL_ARRAY + ++this.localVariableId;
    const declaration = new Declaration(arrayVar, `new ${type}(${value.length})`);
    const codeArray = [declaration]; // assign a _iN$t flag to indicate that this object has been parsed.

    value._iN$t = {
      globalVar: '',
      // the name of declared global variable used to access this object
      source: codeArray // the source code array for this object

    };
    this.objsToClear_iN$t.push(value);

    for (let i = 0; i < value.length; ++i) {
      if (value[i] !== 0) {
        const statement = `${arrayVar}[${i}]=`;
        writeAssignment(codeArray, statement, value[i]);
      }
    }

    return codeArray;
  }

  enumerateField(obj, key, value) {
    if (typeof value === 'object' && value) {
      const _iN$t = value._iN$t;

      if (_iN$t) {
        // parsed
        let globalVar = _iN$t.globalVar;

        if (!globalVar) {
          // declare a global var
          globalVar = _iN$t.globalVar = `v${++this.globalVariableId}`;
          this.globalVariables.push(globalVar); // insert assignment statement to assign to global var

          const line = _iN$t.source[LINE_INDEX_OF_NEW_OBJ];
          _iN$t.source[LINE_INDEX_OF_NEW_OBJ] = mergeDeclaration(`${globalVar}=`, line); // if (typeof line ==='string' && line.startsWith(VAR)) {
          //     // var o=xxx -> var o=global=xxx
          //     var LEN_OF_VAR_O = 5;
          //     _iN$t.source[LINE_INDEX_OF_NEW_OBJ] = line.slice(0, LEN_OF_VAR_O) + '=' + globalVar + line.slice(LEN_OF_VAR_O);
          // }
        }

        return globalVar;
      } else if (ArrayBuffer.isView(value)) {
        return this.instantiateTypedArray(value);
      } else if (Array.isArray(value)) {
        return this.instantiateArray(value);
      } else {
        return this.instantiateObj(value);
      }
    } else if (typeof value === 'function') {
      return this.getFuncModule(value);
    } else if (typeof value === 'string') {
      return escapeForJS(value);
    } else {
      if (key === '_objFlags' && obj instanceof _object.CCObject) {
        value &= PersistentMask;
      }

      return value;
    }
  }

  setObjProp(codeArray, obj, key, value) {
    const statement = `${LOCAL_OBJ + getPropAccessor(key)}=`;
    const expression = this.enumerateField(obj, key, value);
    writeAssignment(codeArray, statement, expression);
  } // codeArray - the source code array for this object


  enumerateObject(codeArray, obj) {
    const klass = obj.constructor;

    if (_globalExports.legacyCC.Class._isCCClass(klass)) {
      this.enumerateCCClass(codeArray, obj, klass);
    } else {
      // primitive javascript object
      for (const key in obj) {
        if (!obj.hasOwnProperty(key) || key.charCodeAt(0) === 95 && key.charCodeAt(1) === 95 // starts with "__"
        && key !== '__type__') {
          continue;
        }

        const value = obj[key];

        if (typeof value === 'object' && value && value === obj._iN$t) {
          continue;
        }

        this.setObjProp(codeArray, obj, key, value);
      }
    }
  }

  instantiateObj(obj) {
    if (obj instanceof _globalExports.legacyCC.ValueType) {
      return _class.CCClass.getNewValueTypeCode(obj);
    }

    if (obj instanceof _globalExports.legacyCC.Asset) {
      // register to asset list and just return the reference.
      return this.getObjRef(obj);
    }

    if (obj._objFlags & Destroyed) {
      // the same as cc.isValid(obj)
      return null;
    }

    let createCode;
    const ctor = obj.constructor;

    if (_globalExports.legacyCC.Class._isCCClass(ctor)) {
      if (this.parent) {
        if (this.parent instanceof _globalExports.legacyCC.Component) {
          if (obj instanceof _globalExports.legacyCC._BaseNode || obj instanceof _globalExports.legacyCC.Component) {
            return this.getObjRef(obj);
          }
        } else if (this.parent instanceof _globalExports.legacyCC._BaseNode) {
          if (obj instanceof _globalExports.legacyCC._BaseNode) {
            if (!obj.isChildOf(this.parent)) {
              // should not clone other nodes if not descendant
              return this.getObjRef(obj);
            }
          } else if (obj instanceof _globalExports.legacyCC.Component) {
            if (!obj.node.isChildOf(this.parent)) {
              // should not clone other component if not descendant
              return this.getObjRef(obj);
            }
          }
        }
      }

      createCode = new Declaration(LOCAL_OBJ, `new ${this.getFuncModule(ctor, true)}()`);
    } else if (ctor === Object) {
      createCode = new Declaration(LOCAL_OBJ, '{}');
    } else if (!ctor) {
      createCode = new Declaration(LOCAL_OBJ, 'Object.create(null)');
    } else {
      // do not clone unknown type
      return this.getObjRef(obj);
    }

    const codeArray = [createCode]; // assign a _iN$t flag to indicate that this object has been parsed.

    obj._iN$t = {
      globalVar: '',
      // the name of declared global variable used to access this object
      source: codeArray // the source code array for this object
      // propName: '',     // the propName this object defined in its source code,
      //                  // if defined, use LOCAL_OBJ.propName to access the obj, else just use o

    };
    this.objsToClear_iN$t.push(obj);
    this.enumerateObject(codeArray, obj);
    return ['(function(){', codeArray, 'return o;})();'];
  }

}

function equalsToDefault(def, value) {
  if (typeof def === 'function') {
    try {
      def = def();
    } catch (e) {
      return false;
    }
  }

  if (def === value) {
    return true;
  }

  if (def && value && typeof def === 'object' && typeof value === 'object' && def.constructor === value.constructor) {
    if (def instanceof _globalExports.legacyCC.ValueType) {
      if (def.equals(value)) {
        return true;
      }
    } else if (Array.isArray(def)) {
      return def.length === 0 && value.length === 0;
    } else if (def.constructor === Object) {
      return js.isEmptyObject(def) && js.isEmptyObject(value);
    }
  }

  return false;
}

function compile(node) {
  const root = node instanceof _globalExports.legacyCC._BaseNode && node;
  const parser = new Parser(node, root);
  return parser.result;
}

if (_internal253Aconstants.TEST) {
  _globalExports.legacyCC._Test.IntantiateJit = {
    equalsToDefault,
    compile
  };
}
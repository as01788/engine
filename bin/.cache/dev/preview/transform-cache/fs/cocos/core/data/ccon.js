System.register("q-bundled:///fs/cocos/core/data/ccon.js", ["../../../predefine.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var legacyCC, getError, VERSION, MAGIC, CHUNK_ALIGN_AS, CCON, InvalidCCONError, BufferBuilder;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

  function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function encodeCCONJson(ccon, chunkURLs) {
    return {
      version: VERSION,
      document: ccon.document,
      chunks: chunkURLs
    };
  }

  function parseCCONJson(json) {
    var cconPreface = json;
    return {
      chunks: cconPreface.chunks,
      document: cconPreface.document
    };
  }

  function encodeCCONBinary(ccon) {
    var document = ccon.document,
        chunks = ccon.chunks;
    var jsonString = JSON.stringify(document);
    var jsonBytes = encodeJson(jsonString);
    var ccobBuilder = new BufferBuilder();
    var header = new ArrayBuffer(12);
    var headerView = new DataView(header);
    headerView.setUint32(0, MAGIC, true); // Magic

    headerView.setUint32(4, VERSION, true); // Version

    ccobBuilder.append(headerView);
    ccobBuilder.append(uint32Bytes(jsonBytes.byteLength));
    ccobBuilder.append(jsonBytes);

    for (var _iterator = _createForOfIteratorHelperLoose(chunks), _step; !(_step = _iterator()).done;) {
      var chunk = _step.value;
      ccobBuilder.alignAs(CHUNK_ALIGN_AS);
      ccobBuilder.append(uint32Bytes(chunk.byteLength));
      ccobBuilder.append(chunk);
    }

    headerView.setUint32(8, ccobBuilder.byteLength, true);
    return ccobBuilder.get();

    function uint32Bytes(value) {
      var bytes = new ArrayBuffer(4);
      var view = new DataView(bytes);
      view.setUint32(0, value, true);
      return view;
    }
  }

  function decodeCCONBinary(bytes) {
    if (bytes.length < 16) {
      throw new InvalidCCONError(getError(13102));
    }

    var dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var magic = dataView.getUint32(0, true);

    if (magic !== MAGIC) {
      throw new InvalidCCONError(getError(13100));
    }

    var version = dataView.getUint32(4, true);

    if (version !== VERSION) {
      throw new InvalidCCONError(getError(13101, version));
    }

    var dataByteLength = dataView.getUint32(8, true);

    if (dataByteLength !== dataView.byteLength) {
      throw new InvalidCCONError(getError(13102));
    }

    var chunksStart = 12;
    var jsonDataLength = dataView.getUint32(chunksStart, true);
    chunksStart += 4;
    var jsonData = new Uint8Array(dataView.buffer, chunksStart + dataView.byteOffset, jsonDataLength);
    chunksStart += jsonDataLength;
    var jsonString = decodeJson(jsonData);
    var json;

    try {
      json = JSON.parse(jsonString);
    } catch (err) {
      throw new InvalidCCONError(err);
    }

    var chunks = [];

    while (chunksStart < dataView.byteLength) {
      if (chunksStart % CHUNK_ALIGN_AS !== 0) {
        var padding = CHUNK_ALIGN_AS - chunksStart % CHUNK_ALIGN_AS;
        chunksStart += padding;
      }

      var chunkDataLength = dataView.getUint32(chunksStart, true);
      chunksStart += 4;
      chunks.push(new Uint8Array(dataView.buffer, chunksStart + dataView.byteOffset, chunkDataLength));
      chunksStart += chunkDataLength;
    }

    if (chunksStart !== dataView.byteLength) {
      throw new InvalidCCONError(getError(13102));
    }

    return new CCON(json, chunks);
  }
  /**
   * Partial signature of Node.js `Buffer`: https://nodejs.org/api/buffer.html
   */


  function encodeJson(input) {
    if (typeof TextEncoder !== 'undefined') {
      return new TextEncoder().encode(input);
    } else if ('Buffer' in globalThis) {
      var _ref = globalThis,
          _Buffer = _ref.Buffer;

      var _buffer = _Buffer.from(input, 'utf8');

      return new Uint8Array(_buffer.buffer, _buffer.byteOffset, _buffer.length);
    } else {
      throw new Error(getError(13103));
    }
  }

  function decodeJson(data) {
    if (typeof TextDecoder !== 'undefined') {
      return new TextDecoder().decode(data);
    } else if ('Buffer' in globalThis) {
      var _ref2 = globalThis,
          _Buffer2 = _ref2.Buffer; // eslint-disable-next-line no-buffer-constructor

      return _Buffer2.from(data.buffer, data.byteOffset, data.byteLength).toString();
    } else {
      throw new Error(getError(13104));
    }
  }

  _export({
    encodeCCONJson: encodeCCONJson,
    parseCCONJson: parseCCONJson,
    encodeCCONBinary: encodeCCONBinary,
    decodeCCONBinary: decodeCCONBinary
  });

  return {
    setters: [function (_predefineJs) {
      legacyCC = _predefineJs.default;
    }, function (_platformDebugJs) {
      getError = _platformDebugJs.getError;
    }],
    execute: function () {
      VERSION = 1;
      MAGIC = 0x4E4F4343;
      CHUNK_ALIGN_AS = 8;

      _export("CCON", CCON = /*#__PURE__*/function () {
        function CCON(document, chunks) {
          this._document = void 0;
          this._chunks = void 0;
          this._document = document;
          this._chunks = chunks;
        }

        _createClass(CCON, [{
          key: "document",
          get: function get() {
            return this._document;
          }
        }, {
          key: "chunks",
          get: function get() {
            return this._chunks;
          }
        }]);

        return CCON;
      }());

      _export("InvalidCCONError", InvalidCCONError = /*#__PURE__*/function (_Error) {
        _inheritsLoose(InvalidCCONError, _Error);

        function InvalidCCONError() {
          return _Error.apply(this, arguments) || this;
        }

        return InvalidCCONError;
      }( /*#__PURE__*/_wrapNativeSuper(Error)));

      _export("BufferBuilder", BufferBuilder = /*#__PURE__*/function () {
        function BufferBuilder() {
          this._viewOrPaddings = [];
          this._length = 0;
        }

        var _proto = BufferBuilder.prototype;

        _proto.alignAs = function alignAs(align) {
          if (align !== 0) {
            var remainder = this._length % align;

            if (remainder !== 0) {
              var padding = align - remainder;

              this._viewOrPaddings.push(padding);

              this._length += padding;
              return padding;
            }
          }

          return 0;
        };

        _proto.append = function append(view) {
          var result = this._length;

          this._viewOrPaddings.push(view);

          this._length += view.byteLength;
          return result;
        };

        _proto.get = function get() {
          var result = new Uint8Array(this._length);
          var counter = 0;

          this._viewOrPaddings.forEach(function (viewOrPadding) {
            if (typeof viewOrPadding === 'number') {
              counter += viewOrPadding;
            } else {
              result.set(new Uint8Array(viewOrPadding.buffer, viewOrPadding.byteOffset, viewOrPadding.byteLength), counter);
              counter += viewOrPadding.byteLength;
            }
          });

          return result;
        };

        _createClass(BufferBuilder, [{
          key: "byteLength",
          get: function get() {
            return this._length;
          }
        }]);

        return BufferBuilder;
      }());

      legacyCC.internal.parseCCONJson = parseCCONJson;
      legacyCC.internal.decodeCCONBinary = decodeCCONBinary;
      legacyCC.internal.CCON = CCON;
    }
  };
});
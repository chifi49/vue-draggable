module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "349b");
/******/ })
/************************************************************************/
/******/ ({

/***/ "017d":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var getOwnPropertyDescriptor = __webpack_require__("d266").f;
var createNonEnumerableProperty = __webpack_require__("a1fa");
var redefine = __webpack_require__("49e1");
var setGlobal = __webpack_require__("8668");
var copyConstructorProperties = __webpack_require__("da6b");
var isForced = __webpack_require__("87b1");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "01e3":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "0d63":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "0e65":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("017d");
var IndexedObject = __webpack_require__("3ac0");
var toIndexedObject = __webpack_require__("243a");
var arrayMethodIsStrict = __webpack_require__("ab38");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "128e":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("eb90");
var uid = __webpack_require__("b198");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "15a3":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");
var isArray = __webpack_require__("3bae");
var wellKnownSymbol = __webpack_require__("1730");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "16c3":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1730":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var shared = __webpack_require__("eb90");
var has = __webpack_require__("aa74");
var uid = __webpack_require__("b198");
var NATIVE_SYMBOL = __webpack_require__("a971");
var USE_SYMBOL_AS_UID = __webpack_require__("5117");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "2195":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("017d");
var parseIntImplementation = __webpack_require__("360b");

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});


/***/ }),

/***/ "2227":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "243a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("3ac0");
var requireObjectCoercible = __webpack_require__("e527");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "26a7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("7d35").forEach;
var arrayMethodIsStrict = __webpack_require__("ab38");
var arrayMethodUsesToLength = __webpack_require__("2eb8");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "2901":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2bfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var definePropertyModule = __webpack_require__("866c");
var anObject = __webpack_require__("58af");
var objectKeys = __webpack_require__("d753");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "2d87":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("017d");
var $indexOf = __webpack_require__("458f").indexOf;
var arrayMethodIsStrict = __webpack_require__("ab38");
var arrayMethodUsesToLength = __webpack_require__("2eb8");

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "2eb8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var fails = __webpack_require__("dd4c");
var has = __webpack_require__("aa74");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "2fd0":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4323");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "349b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("2227")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"941e22d0-vue-loader-template"}!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./vue-draggable.vue?vue&type=template&id=2df196ab&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",class:_vm.component_classes,on:{"click":_vm.clicked}},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./vue-draggable.vue?vue&type=template&id=2df196ab&

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("6efa");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("2d87");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("0e65");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.date.to-string.js
var es_date_to_string = __webpack_require__("5f5d");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("3685");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.parse-int.js
var es_parse_int = __webpack_require__("2195");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__("a11f");

// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/thread-loader/dist/cjs.js!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/babel-loader/lib??ref--12-1!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./vue-draggable.vue?vue&type=script&lang=js&








//
//
//
//
//

/* harmony default export */ var lib_vue_loader_options_vue_draggablevue_type_script_lang_js_ = ({
  name: 'vue-draggable',
  props: {
    is_droparea: {
      required: false,
      type: Boolean,
      "default": false
    },
    custom_data: {
      required: false,
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    classes: {
      required: false,
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    tag: {
      required: false,
      type: String,
      "default": 'span',
      validator: function validator(value) {
        return ['br', 'script', 'noscript', 'dfn', 'object'].indexOf(value) == -1;
      }
    },
    zindex: {
      required: false,
      type: Number,
      "default": 100 //what z-index to set while dragging

    },
    axis: {
      required: false,
      type: String,
      "default": 'xy'
    },
    offset: {
      //how many pixels to move to count it as dragging
      required: false,
      type: Number,
      "default": 10
    },
    draghandle: {
      required: false,
      type: String,
      "default": '' //a selector from the slot or the target

    },
    clone: {
      required: false,
      type: Boolean,
      "default": false
    },
    clone_element: {
      required: false,
      type: Function,
      "default": null
    },
    clone_opacity: {
      required: false,
      type: Number,
      "default": 0.5
    },
    dropareas: {
      required: false,
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    dropping_element: {
      required: false,
      type: Function,
      "default": function _default() {
        var div = document.createElement('div');
        div.style.cssText = 'height:20px;border:dashed 2px #afafaf';
        div.classList.add('vue-dropping-ghost');
        return div;
      }
    },
    drop_ghost: {
      //drag but after you drop, return to its first position
      required: false,
      type: Boolean,
      "default": false
    },
    containment: {
      required: false,
      type: String,
      "default": 'body'
    },
    sortable: {
      required: false,
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      domElement: null,
      //which one to drag
      dragElement: null,
      cloneElement: null,
      domHandle: null,
      //from where to drag
      droppingElement: null,
      containmentElement: null,
      containmentRect: null,
      original_target: null,
      orginal_handle: null,
      isDragging: false,
      isDropping: false,
      dragStartX: -1,
      dragStartY: -1,
      elementX: -1,
      elemnentY: -1,
      elementDiffX: 0,
      elementDiffY: 0,
      isDroppable: false,
      // if we have dropareas than it is a droppable
      dropped_area: null,
      //the about to drop area
      drop_areas: [],
      cssPosition: '',
      sortDroppingElement_timeout: 0,
      zIndex: 0
    };
  },
  computed: {
    component_classes: function component_classes() {
      var _classes = {
        'vue-draggable': true,
        'vue-dragging': this.is_dragging
      };

      for (var i = 0; i < this.classes.length; i++) {
        _classes[this.classes[i]] = true;
      }

      return _classes;
    },
    is_dragging: function is_dragging() {
      return this.isDragging;
    },
    is_dropping: function is_dropping() {
      return this.isDropping;
    }
  },
  methods: {
    clicked: function clicked(event) {
      this.$emit('clicked', {
        instance: this,
        customData: this.custom_data,
        nativeEvent: event
      });
    },
    dragStarted: function dragStarted(event) {
      event.stopPropagation();
      event.preventDefault();

      if (event.which && event.which == 3 || event.button && event.button == 2) {
        //should not detect right clicks as mousedown for dragging
        return;
      }

      this.isDroppable = false;
      this.dropped_area = null;
      this.dragStartX = event.touches && event.touches.length > 0 ? event.touches[0].pageX : event.pageX;
      this.dragStartY = event.touches && event.touches.length > 0 ? event.touches[0].pageY : event.pageY;
      this.$vdraggable.current = this;
      var dim = this.dsDom.getBoundingClientRect();
      this.elementX = dim.left;
      this.elementY = dim.top;
      this.elementDiffX = event.pageX - dim.left;
      this.elementDiffY = event.pageY - dim.top;

      if (this.containment == 'body') {
        var rect = this.containmentElement.getBoundingClientRect();
        var wrect = this.viewportSize();

        if (rect.height < wrect.height) {
          this.containmentRect = wrect;
        } else {
          this.containmentRect = rect;
        }
      } else {
        this.containmentRect = this.containmentElement.getBoundingClientRect();
      }

      document.addEventListener('mousemove', this.dragMove);
      document.addEventListener('touchmove', this.dragMove);
      document.addEventListener('mouseup', this.dragEnd);
      document.addEventListener('touchend', this.dragEnd);
      return false;
    },
    viewportSize: function viewportSize() {
      var view = document.createElement("div");
      view.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index:-1,";
      document.documentElement.insertBefore(view, document.documentElement.firstChild);
      var dims = {
        width: view.offsetWidth,
        height: view.offsetHeight,
        x: 0,
        y: 0,
        left: 0,
        top: 0
      };
      document.documentElement.removeChild(view);
      return dims;
    },
    dragMove: function dragMove(event) {
      event.stopPropagation();
      event.preventDefault();
      this.dropped_area = null;
      var pageX = event.touches && event.touches.length > 0 ? event.touches[0].pageX : event.pageX;
      var pageY = event.touches && event.touches.length > 0 ? event.touches[0].pageY : event.pageY;
      var diffX = pageX - this.dragStartX;
      var diffY = pageY - this.dragStartY;

      if (this.axis == 'xy' && (Math.abs(diffX) > this.offset || Math.abs(diffY) > this.offset)) {
        this.isDragging = true;
      } else if (this.axis == 'x' && Math.abs(diffX) > this.offset) {
        this.isDragging = true;
      } else if (this.axis == 'y' && Math.abs(diffY) > this.offset) {
        this.isDragging = true;
      }

      if (this.isDragging) {
        if (this.dragElement == null) {
          //first time we enter here when isDragging became true for first time
          this.getDropAreas();
        }

        if (this.clone && this.dragElement == null) {
          if (this.clone_element != null) {
            this.dragElement = this.clone_element({
              instance: this,
              el: this.dsDom
            });
          } else {
            var dim = this.dsDom.getBoundingClientRect();
            this.dragElement = this.dsDom.cloneNode(true);
            this.dragElement.style.opacity = this.clone_opacity;
            this.dragElement.style.position = 'absolute';
            this.dragElement.style.left = dim.left + 'px';
            this.dragElement.style.top = dim.top + 'px';
          }

          document.body.appendChild(this.dragElement);
          this.$emit('drag_started', {
            instance: this,
            dragElement: this.dragElement,
            clone: this.clone,
            customData: this.custom_data
          });
        } else if (this.dragElement == null) {
          this.dragElement = this.dsDom;
          this.$emit('drag_started', {
            instance: this,
            dragElement: this.dragElement,
            clone: this.clone,
            customData: this.custom_data
          });
        }

        this.dragElement.style.position = 'absolute';
        this.dragElement.style.zIndex = this.zindex;
        var finalX = pageX - this.elementDiffX;
        var finalY = pageY - this.elementDiffY; //check the containment, if we are inside the bounds of permitted dragging area

        if (finalX < this.containmentRect.left || finalX + this.dragElement.offsetWidth > this.containmentRect.left + this.containmentRect.width || finalY < this.containmentRect.top || finalY + this.dragElement.offsetHeight > this.containmentRect.top + this.containmentRect.height) {
          return; //do not drag outside containment
        } //console.log(diffY);


        if (this.axis == 'xy' || this.axis == 'x') {
          this.dragElement.style.left = finalX + 'px';
        }

        if (this.axis == 'xy' || this.axis == 'y') {
          this.dragElement.style.top = finalY + 'px';
        }

        this.$emit('dragging', {
          instance: this,
          dragElement: this.dragElement,
          clone: this.clone,
          coords: {
            x: finalX,
            y: finalY
          },
          nativeEvent: event,
          customData: this.custom_data
        });

        if (this.isDroppable) {
          //find in which droppable we are contained
          //var is_contained = false;
          for (var d = 0; d < this.drop_areas.length; d++) {
            var drop_area = this.drop_areas[d];
            var draggable = {
              left: finalX,
              top: finalY,
              width: this.dragElement.offsetWidth,
              height: this.dragElement.offsetHeight
            };

            if (this.contains(drop_area, draggable)) {
              //is_contained = true;
              drop_area.el.classList.add('vue-dropping');
              this.dropped_area = drop_area; //if we have not marked as active drop area, mark it (so we do not send none stop drop enter event)
              //also we do not need to recreate the ghost dropping_element again and again, one time is enought

              if (!drop_area.active) {
                drop_area.active = true;
                drop_area.createDroppingElement({
                  left: finalX,
                  top: finalY
                });

                if (this.sortable) {
                  //get all first depth children of drop_area
                  drop_area.sortDroppingElement({
                    left: finalX,
                    top: finalY,
                    moveX: diffX,
                    //minus going left, plus going down
                    movedY: diffY //minus is going up, plus going down

                  });
                }

                this.$emit('drop_enter', {
                  instance: this,
                  dragElement: this.dragElement,
                  clone: this.clone,
                  areaElement: drop_area.el,
                  customData: this.custom_data
                });
                this.drop_areas[d] = drop_area;
              } else {
                drop_area.sortDroppingElement({
                  left: finalX,
                  top: finalY,
                  moveX: diffX,
                  //minus going left, plus going down
                  movedY: diffY //minus is going up, plus going down

                });
                this.$emit('dropping', {
                  instance: this,
                  dragElement: this.dragElement,
                  clone: this.clone,
                  areaElement: drop_area.el,
                  customData: this.custom_data
                });
              }
            } else {//is_contained = false;

              /**
              if(drop_area.active){
                  if(drop_area.dropping_element!=null){
                      drop_area.el.removeChild(drop_area.dropping_element);
                      drop_area.dropping_element = null;
                  }
                  this.$emit('drop_exit',{instance:this, dragElement:this.dragElement, clone:this.clone, areaElement: drop_area.el});
                  drop_area.active= false;
                  this.drop_areas[d] = drop_area;
              }
              drop_area.el.classList.remove('vue-dropping')
              **/
            }
          } //for
          //loop through all the drop_areas and any drop_area that is not currently active
          //remove its active state and remove also any ghost dropping element


          for (var dd = 0; dd < this.drop_areas.length; dd++) {
            if (this.drop_areas[dd] != this.dropped_area && this.drop_areas[dd].active) {
              this.drop_areas[dd].el.classList.remove('vue-dropping');
              this.drop_areas[dd].active = false;
              this.drop_areas[dd].removeDroppingElement();
            }
          }
        } //if(this.isDroppable)

      } //if(this.isDragging)

    },
    dragEnd: function dragEnd(event) {
      event.preventDefault();
      /** CHECK IF WE WERE DRAGGING vis isDragging, because might never started */
      //console.log(event);

      if (this.isDragging) {
        var drag_element = this.dragElement;

        if (this.clone && this.isDragging) {
          //be sure to remove clone element if we indeed dragged
          document.body.removeChild(this.dragElement);
        }

        this.dragElement = null;
        this.dsDom.style.position = 'absolute';
        var pageX = event.touches && event.touches.length > 0 ? event.touches[0].pageX : event.pageX;
        var pageY = event.touches && event.touches.length > 0 ? event.touches[0].pageY : event.pageY;

        if (this.axis == 'xy' || this.axis == 'x') {
          this.dsDom.style.left = pageX - this.elementDiffX + 'px';
        }

        if (this.axis == 'xy' || this.axis == 'y') {
          this.dsDom.style.top = pageY - this.elementDiffY + 'px';
        }

        if (this.isDroppable && this.dropped_area != null) {
          var index = -1;

          if (this.sortable) {
            index = this.dropped_area.dropping_element_index;
          }

          this.$emit('dropped', {
            instance: this,
            areaElement: this.dropped_area.el,
            dragElement: drag_element,
            clone: this.clone,
            sortable: this.sortable,
            newIndex: index,
            customData: this.custom_data
          }); //this.dropped_area.el.classList.remove('vue-dropping');
          //remove the dropping_element
          //this.dropped_area.el.removeChild(this.dropped_area.dropping_element);
          //if we are acting as a ghost then do not append the element in the droppable area and return it
          //to its previous position, we are responsible to create the element we want in the dropped area

          if (!this.drop_ghost) {
            // alert('done');
            if (this.sortable) {
              var dropping_index = this.dropped_area.dropping_element_index;

              if (dropping_index >= 0 && dropping_index <= this.dropped_area.children.length) {
                this.dropped_area.el.insertBefore(this.dsDom, this.dropped_area.children[dropping_index]);
              } else {
                this.dropped_area.el.appendChild(this.dsDom);
              }
            } else {
              this.dropped_area.el.appendChild(this.dsDom);
            }

            this.dsDom.style.position = this.cssPosition;
            this.dsDom.style.zIndex = this.zIndex;
          } else if (this.drop_ghost) {
            this.dsDom.style.position = this.cssPosition;
            this.dsDom.style.zIndex = this.zIndex;
          }
        } else if (this.isDroppable) {
          //return to previous position
          this.dsDom.style.position = this.cssPosition;
          this.dsDom.style.zIndex = this.zIndex;
        }
      }

      this.isDragging = false;
      this.isDroppable = false; //this.isDragging = false;

      this.dropped_area = null;
      this.$emit('drag_ended', {
        instance: this,
        customData: this.custom_data
      });
      this.resetDropAreas();
      document.removeEventListener('mousemove', this.dragMove);
      document.removeEventListener('mouseup', this.dragEnd);
    },
    setupEventHandlers: function setupEventHandlers() {
      this.domHandle.addEventListener('mousedown', this.dragStarted);
      this.domHandle.addEventListener('touchstart', this.dragStarted);
      this.domHandle.addEventListener('dragstart', function (event) {
        event.preventDefault();
      });
    },
    getId: function getId() {
      var d = new Date();
      return 'vdraggable-' + d.getMilliseonds();
    },
    resetDropAreas: function resetDropAreas() {
      for (var d = 0; d < this.drop_areas.length; d++) {
        this.drop_areas[d].el.classList.remove('vue-dropping');
        this.drop_areas[d].active = false; //ean exo dropping element dimiourgimeno, katestrepse to

        if (this.drop_areas[d].dropping_element != null) {
          this.drop_areas[d].removeDroppingElement();
        }
      }

      this.drop_areas = [];
    },
    getDropAreas: function getDropAreas() {
      this.isDroppable = false;

      if (this.dropareas.length == 0) {
        return;
      }

      var areas = document.querySelectorAll(this.dropareas.join(','));
      var my_areas = []; //find if me or my child have drop areas and do not include them in sorting
      //this.is_droparea = true;
      //if(this.is_droparea){

      var myareas = this.$el.querySelectorAll(this.dropareas.join(','));
      [].forEach.call(myareas, function (myel) {
        my_areas.push(myel);
      }); //}

      var me = this;
      [].forEach.call(areas, function (el) {
        if (my_areas.indexOf(el) != -1) {
          //console.log('found my descendants');
          return;
        }

        var drop = {
          el: el,
          dim: el.getBoundingClientRect(),
          active: false,
          children: [],
          dropping_element_index: -1,
          dropping_element: null,
          //holds a reference to dropping element in order to remove it
          removeDroppingElement: function removeDroppingElement() {
            if (this.dropping_element != null) {
              //console.log(this.el);
              this.el.removeChild(this.dropping_element);
              this.dropping_element = null;
            }
          },
          createDroppingElement: function createDroppingElement(params) {
            this.dropping_element = me.dropping_element();
            this.dropping_element.classList.add('vue-dropping-placeholder');

            if (!me.sortable) {
              this.el.appendChild(this.dropping_element);
            }

            var new_index = this.findDroppingElement_index(params);
            var that = this;
            that.dropping_element_index = new_index;

            if (new_index == -1) {
              //console.log('first');
              that.el.appendChild(that.dropping_element);
            } else if (new_index == that.children.length) {
              //console.log('last');
              that.el.appendChild(that.dropping_element);
            } else {
              //console.log('before')
              that.el.insertBefore(that.dropping_element, that.children[new_index]);
            }
          },
          findDroppingElement_index: function findDroppingElement_index(params) {
            var index = 0;
            var top = params.top;
            var new_index = 0;

            var _iterator = _createForOfIteratorHelper(this.el.children),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var child = _step.value;
                //var child = this.children[index];
                var placeholder_dim = {
                  width: 0,
                  height: 0
                };

                if (child.classList.contains('vue-dropping-placeholder')) {
                  //found_placeholder = true;
                  placeholder_dim = child.getBoundingClientRect();
                  placeholder_dim.width; //continue;
                  //console.log('found',found_placeholder, found_placeholder_before);
                } //var dim = child.dim;//getBoundingClientRect();


                var dim = child.getBoundingClientRect();

                if (top > dim.top + dim.height / 2) {
                  new_index = index;
                }

                index++;
              }
              /**
              if(false && found_placeholder_before){
                  new_index = parseInt(new_index);
              }else{
                  **/

            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            new_index = parseInt(new_index);
            return new_index;
          },
          sortDroppingElement: function sortDroppingElement(params) {
            //var left = params.left;
            var top = params.top;
            var new_index = 0;
            var diffY = params.movedY;
            var direction = 'down';

            if (diffY < 0) {
              direction = 'up';
            }

            var placehold_dim = this.dropping_element.getBoundingClientRect();
            var appendTop = 0;

            if (direction == 'up') {
              appendTop = parseInt(placehold_dim.height);
            } //console.log('appendtop',appendTop);


            var index = 0;

            var _iterator2 = _createForOfIteratorHelper(this.el.children),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var child = _step2.value;
                //var child = this.children[index];
                var placeholder_dim = {
                  width: 0,
                  height: 0
                };

                if (child.classList.contains('vue-dropping-placeholder')) {
                  //found_placeholder = true;
                  placeholder_dim = child.getBoundingClientRect();
                  placeholder_dim.width; //continue;
                  //console.log('found',found_placeholder, found_placeholder_before);
                } //var dim = child.dim;//getBoundingClientRect();


                var dim = child.getBoundingClientRect();

                if (top + appendTop / 2 > dim.top + dim.height / 2) {
                  new_index = index;
                }

                index++;
              }
              /**
              if(false && found_placeholder_before){
                  new_index = parseInt(new_index);
              }else{
                  **/

            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            new_index = parseInt(new_index); //}

            if (new_index != this.dropping_element_index) {
              clearTimeout(me.sortDroppingElement_timeout);
              var that = this;
              me.sortDroppingElement_timeout = setTimeout(function () {
                if (that.dropping_element == null) {
                  return;
                }

                that.dropping_element_index = new_index;

                if (new_index == -1) {
                  //console.log('first');
                  that.el.appendChild(that.dropping_element);
                } else if (new_index == that.children.length) {
                  //console.log('last');
                  that.el.appendChild(that.dropping_element);
                } else {
                  //console.log('before')
                  that.el.insertBefore(that.dropping_element, that.children[new_index]);
                }
              }, 12);
            }
          }
        };

        if (me.sortable) {
          var counter = 0;

          var _iterator3 = _createForOfIteratorHelper(el.children),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var child = _step3.value;
              child.dim = child.getBoundingClientRect();

              if (child !== me.$el) {
                drop.children.push(child); //should we push our self?
              } else {
                drop.dropping_element_index = counter;
              }

              counter++;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }

        me.drop_areas.push(drop);
      });

      if (this.drop_areas.length > 0) {
        this.isDroppable = true;
      }
    },
    contains: function contains(droppable, draggable) {
      var dim = droppable.dim;

      if (dim.left < draggable.left + draggable.width / 1.5 && dim.left + dim.width > draggable.left + draggable.width / 1.5 && dim.top < draggable.top + draggable.height / 1.5 && dim.top + dim.height > draggable.top + draggable.height / 1.5) {
        return true;
      }

      return false;
    }
  },
  created: function created() {
    if (typeof this.$vdraggable == 'undefined') {
      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$vdraggable = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.observable({
        creations: 0,
        instances: 0,
        isDragging: false,
        current: null
      });
    }

    this.$vdraggable.creations++;
    this.$vdraggable.instances++;
  },
  destroy: function destroy() {
    this.$vdraggable.instances--;
    this.removeEventHandlers();
  },
  mounted: function mounted() {
    //console.log(this.$slots.default);
    if (typeof this.$slots["default"] !== 'undefined' && this.$slots["default"].length > 0) {
      //console.log(this.$slots.default);
      this.dsDom = this.$el; //this.$slots.default[0].elm;
    }

    if (this.draghandle != '' && this.dsDom != null) {
      this.domHandle = this.dsDom.querySelector(this.draghandle);
    } else if (this.dsDom != null && this.draghandle == '') {
      this.domHandle = this.dsDom;
    }

    if (this.dropareas.length > 0) {
      this.isDroppable = true;
    }

    this.containmentElement = document.querySelector(this.containment);
    this.cssPosition = this.dsDom.style.position;
    this.zIndex = this.dsDom.style.zIndex;
    this.setupEventHandlers();
  }
});
// CONCATENATED MODULE: ./vue-draggable.vue?vue&type=script&lang=js&
 /* harmony default export */ var vue_draggablevue_type_script_lang_js_ = (lib_vue_loader_options_vue_draggablevue_type_script_lang_js_); 
// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./vue-draggable.vue





/* normalize component */

var component = normalizeComponent(
  vue_draggablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_draggable = (component.exports);
// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (vue_draggable);



/***/ }),

/***/ "35f2":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "360b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var trim = __webpack_require__("4079").trim;
var whitespaces = __webpack_require__("b808");

var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "3685":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("9267");
var global = __webpack_require__("55f2");
var isForced = __webpack_require__("87b1");
var redefine = __webpack_require__("49e1");
var has = __webpack_require__("aa74");
var classof = __webpack_require__("2901");
var inheritIfRequired = __webpack_require__("da1b");
var toPrimitive = __webpack_require__("16c3");
var fails = __webpack_require__("dd4c");
var create = __webpack_require__("edbc");
var getOwnPropertyNames = __webpack_require__("a162").f;
var getOwnPropertyDescriptor = __webpack_require__("d266").f;
var defineProperty = __webpack_require__("866c").f;
var trim = __webpack_require__("4079").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "3964":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("985e");
var global = __webpack_require__("55f2");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "3ac0":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");
var classof = __webpack_require__("2901");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "3bae":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("2901");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "4079":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("e527");
var whitespaces = __webpack_require__("b808");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "4323":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "443e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var isObject = __webpack_require__("e556");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "458f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("243a");
var toLength = __webpack_require__("2fd0");
var toAbsoluteIndex = __webpack_require__("ed09");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "49e1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var createNonEnumerableProperty = __webpack_require__("a1fa");
var has = __webpack_require__("aa74");
var setGlobal = __webpack_require__("8668");
var inspectSource = __webpack_require__("8999");
var InternalStateModule = __webpack_require__("58c7");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "4af3":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("3964");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "5117":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("a971");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "55f2":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("01e3")))

/***/ }),

/***/ "58af":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "58c7":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("dd12");
var global = __webpack_require__("55f2");
var isObject = __webpack_require__("e556");
var createNonEnumerableProperty = __webpack_require__("a1fa");
var objectHas = __webpack_require__("aa74");
var sharedKey = __webpack_require__("128e");
var hiddenKeys = __webpack_require__("8065");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "5f5d":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("49e1");

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "6611":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var setGlobal = __webpack_require__("8668");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "6c26":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "6efa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("017d");
var forEach = __webpack_require__("26a7");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "7d35":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("ca18");
var IndexedObject = __webpack_require__("3ac0");
var toObject = __webpack_require__("cb70");
var toLength = __webpack_require__("2fd0");
var arraySpeciesCreate = __webpack_require__("15a3");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "7ff3":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("3964");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "8065":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "8668":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var createNonEnumerableProperty = __webpack_require__("a1fa");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "866c":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var IE8_DOM_DEFINE = __webpack_require__("e650");
var anObject = __webpack_require__("58af");
var toPrimitive = __webpack_require__("16c3");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "87b1":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "8999":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("6611");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "9267":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "985e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");

module.exports = global;


/***/ }),

/***/ "a11f":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("017d");
var global = __webpack_require__("55f2");
var userAgent = __webpack_require__("7ff3");

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});


/***/ }),

/***/ "a162":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("b7f5");
var enumBugKeys = __webpack_require__("6c26");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "a1fa":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var definePropertyModule = __webpack_require__("866c");
var createPropertyDescriptor = __webpack_require__("a7ed");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "a7ed":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "a971":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "aa74":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "aaa6":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "ab38":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("dd4c");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "b148":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "b198":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "b7f5":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("aa74");
var toIndexedObject = __webpack_require__("243a");
var indexOf = __webpack_require__("458f").indexOf;
var hiddenKeys = __webpack_require__("8065");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "b808":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "c78a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "ca18":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("b148");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "cb70":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("e527");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "d266":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var propertyIsEnumerableModule = __webpack_require__("c78a");
var createPropertyDescriptor = __webpack_require__("a7ed");
var toIndexedObject = __webpack_require__("243a");
var toPrimitive = __webpack_require__("16c3");
var has = __webpack_require__("aa74");
var IE8_DOM_DEFINE = __webpack_require__("e650");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "d753":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("b7f5");
var enumBugKeys = __webpack_require__("6c26");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "da1b":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");
var setPrototypeOf = __webpack_require__("f6c0");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "da6b":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("aa74");
var ownKeys = __webpack_require__("fad0");
var getOwnPropertyDescriptorModule = __webpack_require__("d266");
var definePropertyModule = __webpack_require__("866c");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "dd12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var inspectSource = __webpack_require__("8999");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "dd4c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "e527":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "e556":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "e650":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var fails = __webpack_require__("dd4c");
var createElement = __webpack_require__("443e");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "eb90":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("35f2");
var store = __webpack_require__("6611");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "ed09":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4323");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "edbc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("58af");
var defineProperties = __webpack_require__("2bfb");
var enumBugKeys = __webpack_require__("6c26");
var hiddenKeys = __webpack_require__("8065");
var html = __webpack_require__("4af3");
var documentCreateElement = __webpack_require__("443e");
var sharedKey = __webpack_require__("128e");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "f6c0":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("58af");
var aPossiblePrototype = __webpack_require__("aaa6");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "fad0":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("3964");
var getOwnPropertyNamesModule = __webpack_require__("a162");
var getOwnPropertySymbolsModule = __webpack_require__("0d63");
var anObject = __webpack_require__("58af");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ })

/******/ })["default"];
//# sourceMappingURL=vue-draggable.common.js.map
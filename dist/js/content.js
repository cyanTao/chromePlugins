/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/index.less":
/*!********************************!*\
  !*** ./src/content/index.less ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeScript: () => (/* binding */ executeScript),
/* harmony export */   getCurrentTab: () => (/* binding */ getCurrentTab),
/* harmony export */   getStorage: () => (/* binding */ getStorage),
/* harmony export */   jumpJenkis: () => (/* binding */ jumpJenkis),
/* harmony export */   promisify: () => (/* binding */ promisify),
/* harmony export */   sendMessage: () => (/* binding */ sendMessage),
/* harmony export */   sendMessageToTabs: () => (/* binding */ sendMessageToTabs),
/* harmony export */   setStorage: () => (/* binding */ setStorage),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   tabCreate: () => (/* binding */ tabCreate)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 设置浏览器后台缓存
 * @param key 缓存健
 * @param value 缓存值
 */
function setStorage(key, value) {
    var _a;
    chrome.storage.sync.set((_a = {},
        _a[key] = value,
        _a));
}
/**
 * 获取浏览器后台缓存
 * @param key 缓存key
 * @returns
 */
function getStorage(key) {
    return new Promise(function (resolve) {
        chrome.storage.sync.get(key, function (data) {
            return resolve(chrome.runtime.lastError ? null : data[key] || null);
        });
    });
}
/**
 * 执行script方法片段的方法
 * @param script 代码片段
 */
function executeScript(script) {
    if (script === void 0) { script = 'alert(123)'; }
    chrome.tabs.executeScript({
        code: script,
    });
}
/**
 * 获取当前激活页面的tab信息
 * @param {function} callback 回调,返回当前页面的信息
 */
function getCurrentTab() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var queryInfo = {
                        active: true,
                        currentWindow: true,
                    };
                    chrome.tabs.query(queryInfo, function (tabs) {
                        var tab = tabs[0];
                        var url = tab.url;
                        console.assert(typeof url == 'string', 'tab.url should be a string');
                        resolve(tab);
                    });
                })];
        });
    });
}
/**
 * 新开一个标签页
 * @param param0 [active] 是否激活该标签页 [url] 要跳转的链接
 * @returns
 */
function tabCreate(_a) {
    var _b = _a.active, active = _b === void 0 ? true : _b, _c = _a.url, url = _c === void 0 ? '' : _c;
    return new Promise(function (resolve) {
        chrome.tabs.create({
            active: active,
            url: url,
        }, resolve);
    });
}
/**
 * 跳转到Jenkins页面，并返回tabId
 */
function jumpJenkis() {
    var _this = this;
    return new Promise(function (resolve) {
        var url = 'http://192.168.32.19:8080/jenkins/job/middle_platform_deploy/build?delay=0sec';
        getCurrentTab().then(function (tab) {
            if (tab.url === url) {
                resolve(tab.id);
            }
            else {
                chrome.tabs.update(tab.id, {
                    url: url,
                }, function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sleep(3000)];
                            case 1:
                                _a.sent();
                                resolve(tab.id);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
        });
    });
}
/**
 * 谷歌插件向浏览器发送消息
 * @param tabId tab页id
 * @param message 发送的消息
 * @returns Promise
 */
function sendMessage(tabId, message) {
    if (message === void 0) { message = {
        greeting: '',
        value: '',
    }; }
    return new Promise(function (resolve) {
        chrome.tabs.sendMessage(tabId, message, function (res) { return resolve(res); });
    });
}
/**
 * 浏览器向谷歌插件回发消息
 * @param message 消息内容
 * @returns Promise
 */
function sendMessageToTabs(message) {
    return new Promise(function (resolve) {
        chrome.runtime.sendMessage(message);
    });
}
/**
 * 延时器
 * @param time 延迟的时间,默认0毫秒
 * @returns Promise
 */
function sleep(time) {
    if (time === void 0) { time = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
/**
 * 将回调函数转为 promise 的辅助函数
 * @param {function} fn 要转的回调函数
 */
function promisify(fn) {
    return (function () {
        var args = Array.prototype.slice.call(arguments);
        return new Promise(function (resolve) {
            args.push(function (result) {
                resolve(result);
            });
            fn.apply(null, args);
        });
    })();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/content/index.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.less */ "./src/content/index.less");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ "./src/utils/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


document.addEventListener('DOMContentLoaded', function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.sendMessageToTabs)({ greeting: 'setDefaultColor' });
});
var contentScript = {
    catchElement: function (req, callback) {
        if (callback === void 0) { callback = function () { }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                callback();
                return [2 /*return*/];
            });
        });
    },
    unCatchElement: function (req, callback) {
        if (callback === void 0) { callback = function () { }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                callback();
                return [2 /*return*/];
            });
        });
    },
    default: function (callback) {
        callback('not set');
    },
};
chrome.runtime.onMessage.addListener(function (req, sender, callback) {
    var fn = contentScript[req.greeting || 'default'] || contentScript.default;
    fn(req, callback);
});

})();

/******/ })()
;
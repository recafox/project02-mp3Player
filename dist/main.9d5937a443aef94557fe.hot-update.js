/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateproject02_mp3Player"]("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component_MusicPlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/MusicPlayer.js */ \"./src/component/MusicPlayer.js\");\n// import Button from './component/Button/button.js';\n// import Heading from './component/Heading/heading.js'\n\n\n__webpack_require__(/*! ../../src/style/style.scss */ \"./src/style/style.scss\");\n\nvar getChildNode = function getChildNode(node, className) {\n  return Array.from(node.children).filter(function (child) {\n    return child.className.includes(className);\n  })[0];\n};\n\nvar actionBtns = document.querySelectorAll('.js-action');\n\nvar actionEffect = function actionEffect(node) {\n  var img = getChildNode(node, 'js-action-img');\n  img.src = \"./assets/icon/\".concat(node.getAttribute('data-actionImg'), \".png\");\n};\n\nvar resetActionEffect = function resetActionEffect(node) {\n  var img = getChildNode(node, 'js-action-img');\n  img.src = \"./assets/icon/\".concat(node.getAttribute('data-actionImg'), \".png\");\n};\n\nactionBtns.forEach(function (item) {\n  item.addEventListener('click', function (e) {\n    actionEffect(this);\n  });\n});\n\nvar initialize = function initialize() {\n  var fetchData = fetch(\"./assets/songs.json\");\n  var playlist = null;\n  fetchData.then(function (response) {\n    return response.json();\n  }).then(function (jsonData) {\n    playlist = jsonData;\n    console.log(playlist); // do something ...\n\n    var player = new _component_MusicPlayer_js__WEBPACK_IMPORTED_MODULE_0__.default(playlist);\n    player.initialize();\n  });\n};\n\ninitialize();\n\n//# sourceURL=webpack://project02-mp3Player/./src/index.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "22fd6121531c773ddb26"
/******/ 	})();
/******/ 	
/******/ }
);
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateproject02_mp3Player"]("main",{

/***/ "./src/component/Teleprompter.js":
/*!***************************************!*\
  !*** ./src/component/Teleprompter.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Teleprompter = /*#__PURE__*/function () {\n  function Teleprompter(lyrics, songName, container) {\n    _classCallCheck(this, Teleprompter);\n\n    this.container = container;\n    this.lyricMap = this.parseLyric(lyrics);\n    this.lyricsWrapper = Array.from(container.children).filter(function (child) {\n      return child.className.includes('js-lyrics-wrapper');\n    })[0];\n    this.lyricsList = Array.from(this.lyricsWrapper.children).filter(function (child) {\n      return child.className.includes('js-lyrics-list');\n    })[0];\n    this.titleNode = Array.from(container.children).filter(function (child) {\n      return child.className.includes('js-lyrics-title');\n    })[0];\n    this.intervalId = undefined;\n    this.currentTime = 0;\n    this.isCounting = false;\n    this.currentPlaying = \"\";\n    this.activeClassName = 'is--current';\n    this.offset = 30;\n    this.reset();\n    this.setTitle(songName);\n    this.render(); // this.convertToMilliSec(\"02:25.49\");\n  }\n\n  _createClass(Teleprompter, [{\n    key: \"parseLyric\",\n    value: function parseLyric(lyrics) {\n      var that = this;\n      var raw = lyrics.split(\"\");\n      var i = 0;\n      var max = raw.length;\n      var key = undefined;\n      var value = \"\";\n      var map = {};\n      var insideBrackets = true;\n\n      while (i <= max) {\n        if (raw[i - 1] === '[') {\n          insideBrackets = true;\n          key = \"\";\n        } else if (raw[i] === ']') {\n          insideBrackets = false;\n          key = Math.floor(that.convertToMilliSec(key));\n          map[key] = {\n            value: \"\"\n          };\n        }\n\n        if (insideBrackets === true) {\n          key += \"\".concat(raw[i]);\n        }\n\n        if (insideBrackets === false && raw[i] !== '[' && raw[i] !== ']' && raw[i]) {\n          var content = \"\".concat(raw[i]);\n          map[key].value += content;\n        }\n\n        i++;\n      }\n\n      return map;\n    } // 02:25.49 => 100 * 60 * 20 + 100 * 25 + 49\n\n  }, {\n    key: \"convertToMilliSec\",\n    value: function convertToMilliSec(timeStr) {\n      var min = parseInt(timeStr.split(\":\")[0], 10);\n      var sec = parseFloat(timeStr.split(\":\")[1]);\n      return min * 100 * 60 + sec * 100;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var that = this;\n      var tmplString = \"\";\n\n      for (var key in that.lyricMap) {\n        tmplString += that.createLyricTmpl(that.lyricMap[key].value, key);\n      }\n\n      that.lyricsList.innerHTML = tmplString;\n    }\n  }, {\n    key: \"createLyricTmpl\",\n    value: function createLyricTmpl(lyric, time) {\n      return \"<p data-time=\\\"\".concat(time, \"\\\">\").concat(lyric, \"</p>\");\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      var that = this;\n      that.isCounting = true;\n      console.log('prompter starts');\n      that.intervalId = window.setInterval(function () {\n        that.currentTime++;\n\n        for (var key in that.lyricMap) {\n          if (Math.ceil(key) === that.currentTime) {\n            that.clear();\n            that.updateCurrent();\n          }\n        }\n      }, 10);\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      var that = this;\n      console.log('prompter stops');\n      that.isCounting = false;\n      window.clearInterval(that.intervalId);\n    }\n  }, {\n    key: \"updateCurrent\",\n    value: function updateCurrent(lyric) {\n      var that = this;\n      var allSentences = Array.from(that.container.querySelectorAll('p'));\n      var current = allSentences.find(function (sentence) {\n        return parseInt(sentence.dataset.time) === that.currentTime;\n      });\n\n      if (current) {\n        current.classList.add(that.activeClassName);\n        var pos = current.getBoundingClientRect().top;\n        var windowHeight = window.innerHeight;\n\n        if (pos > windowHeight / 5) {\n          var prevPos = isNaN(parseInt(that.lyricsList.style.top.replace(\"px\", \"\").trim(), 10)) ? 0 : parseInt(that.lyricsList.style.top.replace(\"px\", \"\").trim(), 10);\n          that.lyricsList.style.top = \"\".concat(prevPos - that.offset, \"px\");\n        } else {\n          that.lyricsList.style.top = '0px';\n        }\n      }\n    }\n  }, {\n    key: \"clear\",\n    value: function clear() {\n      var that = this;\n      var allLyrics = Array.from(that.container.querySelectorAll('p'));\n      var prev = allLyrics.find(function (lyric) {\n        return lyric.classList.contains(that.activeClassName);\n      });\n\n      if (prev) {\n        prev.classList.remove(that.activeClassName);\n      }\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      var that = this;\n      that.titleNode.innerText = \"\";\n      that.lyricsList.innerHTML = \"\";\n    }\n  }, {\n    key: \"setTitle\",\n    value: function setTitle(title) {\n      var that = this;\n      that.titleNode.innerText = title;\n    }\n  }]);\n\n  return Teleprompter;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Teleprompter);\n\n//# sourceURL=webpack://project02-mp3Player/./src/component/Teleprompter.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "20dd02c1011784833276"
/******/ 	})();
/******/ 	
/******/ }
);
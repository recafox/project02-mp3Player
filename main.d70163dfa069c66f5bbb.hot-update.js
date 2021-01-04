/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateproject02_mp3Player"]("main",{

/***/ "./src/component/MusicPlayer.js":
/*!**************************************!*\
  !*** ./src/component/MusicPlayer.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ \"./src/util.js\");\n/* harmony import */ var _Teleprompter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Teleprompter.js */ \"./src/component/Teleprompter.js\");\n/* harmony import */ var _Teleprompter_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Teleprompter_js__WEBPACK_IMPORTED_MODULE_1__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar MusicPlayer = /*#__PURE__*/function () {\n  function MusicPlayer(playlist) {\n    _classCallCheck(this, MusicPlayer);\n\n    this.isPlaying = false;\n    this.playlist = playlist;\n    this.currentPlaylist = playlist;\n    this.currentTrack = null;\n    this.audioEl = new Audio();\n    this.progressTimer = null; // control panel\n\n    this.playBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-start-btn');\n    this.prevBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-prev-btn');\n    this.nextBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-next-btn');\n    this.loopBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-loop-btn');\n    this.repeatBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-repeat-btn');\n    this.randomBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-random-btn');\n    this.progressBar = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-progress-bar');\n    this.playerBg = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-player-bg');\n    this.cover = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-cover');\n    this.trackTitle = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-song-title');\n    this.artistName = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-artist-name'); // track list\n\n    this.listPage = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-track-list'); // playlist\n\n    this.randomList = this.shuffleArray(this.playlist);\n    this.repeatOneList = [this.currentTrack];\n    this.loopList = this.playlist; // default mode\n\n    this.playMode = 'loop'; // single loop, loop, random\n  }\n\n  _createClass(MusicPlayer, [{\n    key: \"playTrack\",\n    value: function playTrack() {\n      var that = this;\n      that.isPlaying = true;\n      that.audioEl.play();\n      var img = Array.from(that.playBtn.childNodes).filter(function (child) {\n        return child.tagName === 'IMG';\n      })[0];\n      img.src = \"./assets/icon/ic_pause.png\";\n      that.updateProgressBar();\n    }\n  }, {\n    key: \"playNext\",\n    value: function playNext() {\n      var that = this;\n\n      function getNextSongId() {\n        for (var i = 0; i < that.currentPlaylist.length; i++) {\n          if (that.currentPlaylist[i].id === that.currentTrack.id) {\n            if (that.currentPlaylist[i + 1] !== undefined) {\n              return that.currentPlaylist[i + 1].id;\n            } else {\n              return that.currentPlaylist[0].id;\n            }\n          }\n        }\n      }\n\n      that.setTrack(getNextSongId());\n      that.playTrack();\n    }\n  }, {\n    key: \"playPrev\",\n    value: function playPrev() {\n      var that = this;\n\n      function getPrevSongId() {\n        for (var i = 0; i < that.currentPlaylist.length; i++) {\n          if (that.currentPlaylist[i].id === that.currentTrack.id) {\n            if (that.currentPlaylist[i - 1] !== undefined) {\n              return that.currentPlaylist[i - 1].id;\n            } else {\n              return that.currentPlaylist[that.currentPlaylist.length - 1].id;\n            }\n          }\n        }\n      }\n\n      that.setTrack(getPrevSongId());\n      that.playTrack();\n    }\n  }, {\n    key: \"setTrackCurrentTime\",\n    value: function setTrackCurrentTime(time) {\n      var that = this;\n      that.audioEl.currentTime = time;\n    }\n  }, {\n    key: \"updateProgressBar\",\n    value: function updateProgressBar() {\n      var that = this;\n      var bar = Array.from(that.progressBar.childNodes).filter(function (child) {\n        return child.classList !== undefined && child.classList.contains('js-bar');\n      })[0];\n      that.progressTimer = setInterval(function () {\n        bar.setAttribute('style', \"width:\".concat(that.calculateProgressBar(that.audioEl.currentTime, that.audioEl.duration), \"%\"));\n      }, 500);\n    }\n  }, {\n    key: \"calculateProgressBar\",\n    value: function calculateProgressBar(current, total) {\n      return current / total * 100;\n    }\n  }, {\n    key: \"stopProgressBar\",\n    value: function stopProgressBar() {\n      var that = this;\n      window.clearInterval(that.progressTimer);\n    }\n  }, {\n    key: \"stopTrack\",\n    value: function stopTrack() {\n      var that = this;\n      that.isPlaying = false;\n      var img = Array.from(that.playBtn.childNodes).filter(function (child) {\n        return child.tagName === 'IMG';\n      })[0];\n      img.src = \"./assets/icon/ic_play.png\";\n      that.audioEl.pause();\n      that.stopProgressBar();\n    }\n  }, {\n    key: \"getTrackCurrentTime\",\n    value: function getTrackCurrentTime() {\n      return this.audioEl.currentTime;\n    }\n  }, {\n    key: \"getTrackDuration\",\n    value: function getTrackDuration() {\n      return this.audioEl.duration;\n    }\n  }, {\n    key: \"setTrack\",\n    value: function setTrack(songID) {\n      console.log(songID);\n      this.currentTrack = this.getTrack(songID);\n      this.audioEl.src = this.currentTrack.path;\n      this.audioEl.currentTime = 0;\n      this.updateProgressBar();\n      this.stopTrack();\n      this.setCoverArt(this.currentTrack);\n      this.setTrackInfo(this.currentTrack);\n      this.setCurrentItem(songID);\n    }\n  }, {\n    key: \"getTrack\",\n    value: function getTrack(songID) {\n      return this.playlist.find(function (song) {\n        return parseInt(song.id) === parseInt(songID);\n      });\n    }\n  }, {\n    key: \"setCoverArt\",\n    value: function setCoverArt(song) {\n      this.cover.src = song.art;\n      this.playerBg.setAttribute('src', song.art);\n    }\n  }, {\n    key: \"setTrackInfo\",\n    value: function setTrackInfo(song) {\n      this.trackTitle.innerText = song.name;\n      this.artistName.innerText = song.artist;\n    }\n  }, {\n    key: \"createList\",\n    value: function createList() {\n      var that = this;\n      var str = \"\";\n      this.playlist.forEach(function (song) {\n        str += that.createListItem(song);\n      });\n      this.listPage.innerHTML = str;\n    }\n  }, {\n    key: \"createListItem\",\n    value: function createListItem(song) {\n      return \"<li class=\\\"list__item\\\" data-id=\\\"\".concat(song.id, \"\\\">\\n          <div class=\\\"item__content\\\">\\n            <h3>\").concat(song.name, \"</h3>\\n            <p>\").concat(song.artist, \"</p>\\n          </div>\\n        </li>\");\n    }\n  }, {\n    key: \"setCurrentItem\",\n    value: function setCurrentItem(songID) {\n      var that = this;\n      var items = Array.from(document.querySelectorAll('.list__item'));\n      items.forEach(function (item) {\n        item.classList.remove('is--current');\n      });\n      var current = items.find(function (item) {\n        return parseInt(item.dataset.id) === parseInt(songID);\n      });\n      current.classList.add('is--current');\n    }\n  }, {\n    key: \"setPlayMode\",\n    value: function setPlayMode(mode) {\n      var that = this;\n\n      switch (mode) {\n        case 'loop':\n          that.currentPlaylist = that.playlist;\n          break;\n\n        case 'random':\n          that.currentPlaylist = that.shuffleArray(that.playlist);\n          break;\n\n        case 'repeatOne':\n          that.currentPlaylist = [that.currentTrack];\n          break;\n\n        default:\n          break;\n      }\n    } // random playlist\n\n  }, {\n    key: \"shuffleArray\",\n    value: function shuffleArray(array) {\n      // 從最尾端開始, 向前隨機抽一個, 然後將該隨機抽到的數與尾端交換, 依次從尾端向前排\n      var m = array.length;\n      var t;\n      var i;\n\n      while (m) {\n        m--;\n        i = Math.floor(Math.random() * m);\n        var _t = array[m];\n        array[m] = array[i];\n        array[i] = _t;\n      }\n\n      return array;\n    }\n  }, {\n    key: \"initialize\",\n    value: function initialize() {\n      var that = this;\n      that.createList();\n      that.setPlayMode('loop');\n      that.setTrack(that.currentPlaylist[0].id);\n      that.audioEl.currentTime = 0;\n      that.updateProgressBar();\n      that.playBtn.addEventListener('click', function (e) {\n        if (!that.isPlaying) {\n          that.playTrack();\n        } else {\n          that.stopTrack();\n        }\n      }); // menu btn\n\n      that.menuToggle = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-menu-btn');\n      that.container = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-container');\n      that.container.addEventListener('click', function (e) {\n        var page = \"current--\".concat(e.target.dataset.to);\n        var container = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.default)('.js-container');\n\n        if (e.target.dataset.to !== undefined) {\n          var classList = ['player', 'lyric', 'list'];\n          classList.forEach(function (className) {\n            container.classList.remove(\"current--\".concat(className));\n          });\n          container.classList.add(page);\n        }\n      }); // set track from list\n\n      that.listPage.addEventListener('click', function (e) {\n        var songItem = e.target.closest('.list__item');\n        that.setTrack(songItem.dataset.id);\n      }); // progress bar\n\n      that.progressBar.addEventListener('mousedown', function (e) {\n        var totalLen = that.progressBar.offsetWidth;\n        var newCurrentTime = e.offsetX / totalLen * that.audioEl.duration;\n        that.setTrackCurrentTime(newCurrentTime);\n        that.updateProgressBar();\n      }); // set play mode\n\n      var modeBtns = Array.from(document.querySelectorAll('.js-mode-btn'));\n      modeBtns.forEach(function (btn) {\n        btn.addEventListener('click', function (e) {\n          modeBtns.forEach(function (btn) {\n            btn.classList.remove('is--current');\n          });\n          btn.classList.add('is--current');\n          that.setPlayMode(this.dataset.playmode);\n        });\n      }); // play next & play prev\n\n      that.nextBtn.addEventListener('click', function (e) {\n        that.playNext();\n      });\n      that.prevBtn.addEventListener('click', function (e) {\n        that.playPrev();\n      }); // song is over\n\n      that.audioEl.addEventListener('ended', function () {\n        that.playNext();\n      });\n    }\n  }]);\n\n  return MusicPlayer;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MusicPlayer);\n\n//# sourceURL=webpack://project02-mp3Player/./src/component/MusicPlayer.js?");

/***/ }),

/***/ "./src/component/Teleprompter.js":
/*!***************************************!*\
  !*** ./src/component/Teleprompter.js ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\src\\\\component\\\\Teleprompter.js: Unexpected token, expected \\\";\\\" (1:17)\\n\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 1 | \\u001b[39m\\u001b[36mnew\\u001b[39m \\u001b[33mTeleprompter\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m   | \\u001b[39m                 \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 2 | \\u001b[39m  constructor(lyrics\\u001b[33m,\\u001b[39m container) {\\u001b[0m\\n\\u001b[0m \\u001b[90m 3 | \\u001b[39m    \\u001b[0m\\n\\u001b[0m \\u001b[90m 4 | \\u001b[39m  }\\u001b[0m\\n    at Parser._raise (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:748:17)\\n    at Parser.raiseWithData (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:741:17)\\n    at Parser.raise (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:735:17)\\n    at Parser.unexpected (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9097:16)\\n    at Parser.semicolon (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9079:40)\\n    at Parser.parseExpressionStatement (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12190:10)\\n    at Parser.parseStatementContent (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11786:19)\\n    at Parser.parseStatement (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11650:17)\\n    at Parser.parseBlockOrModuleBlockBody (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12232:25)\\n    at Parser.parseBlockBody (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12218:10)\\n    at Parser.parseTopLevel (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11581:10)\\n    at Parser.parse (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13392:10)\\n    at parse (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13445:38)\\n    at parser (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\parser\\\\index.js:54:34)\\n    at parser.next (<anonymous>)\\n    at normalizeFile (C:\\\\Users\\\\recaf\\\\Desktop\\\\programming\\\\精神時光屋\\\\project02-mp3Player\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transformation\\\\normalize-file.js:99:38)\");\n\n//# sourceURL=webpack://project02-mp3Player/./src/component/Teleprompter.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "cec2df28e26c763a70e7"
/******/ 	})();
/******/ 	
/******/ }
);
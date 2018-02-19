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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var Container_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(Container_1.ListContainer, null, "TO DO"), document.getElementById('root'));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Items_1 = __webpack_require__(4);
var ListContainer = /** @class */ (function (_super) {
    __extends(ListContainer, _super);
    function ListContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.submitFunc = function (event) {
            event.preventDefault();
            _this.setState(function (prevState) { return ({
                things: prevState.things.concat(_this.state.text),
                text: '' //reset the value of the textbox
            }); }, function () {
                console.log(_this.state);
            });
        };
        _this.updateValue = function (event) {
            _this.setState({ text: event.target.value });
        };
        _this.state = {
            things: [],
            text: ''
        };
        return _this;
    }
    ListContainer.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, this.props.children),
            React.createElement(Items_1.ListItems, { items: this.state.things }),
            React.createElement("form", { onSubmit: this.submitFunc },
                React.createElement("input", { onChange: this.updateValue, value: this.state.text, type: "text" }),
                React.createElement("button", null, "click me"))));
    };
    return ListContainer;
}(React.Component));
exports.ListContainer = ListContainer;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ListItems = /** @class */ (function (_super) {
    __extends(ListItems, _super);
    function ListItems(props) {
        return _super.call(this, props) || this;
    }
    ListItems.prototype.render = function () {
        var _items = [];
        for (var _i = 0, _a = this.props.items; _i < _a.length; _i++) {
            var i = _a[_i];
            _items.push(React.createElement("li", { key: i }, i));
        }
        return React.createElement("ul", null, _items);
    };
    return ListItems;
}(React.Component));
exports.ListItems = ListItems;


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
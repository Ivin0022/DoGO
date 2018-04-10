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
var SocketIO = __webpack_require__(5);
var io = SocketIO('http://localhost:5000/');
io.on('connect', function () { return console.log('connected... '); });
var ListContainer = /** @class */ (function (_super) {
    __extends(ListContainer, _super);
    function ListContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.setData = function (data) {
            _this.setState(function (prevState) { return ({
                things: prevState.things.concat(data)
            }); });
        };
        _this.submitFunc = function (event) {
            event.preventDefault();
            if (_this.state.text !== '') {
                io.emit('add-list-item', _this.state.text);
                _this.setState({ text: '' });
            }
        };
        _this.deleteItem = function (dataFromChild) {
            console.log('parent callback (listcontainer)');
            io.emit('delete-list-item', dataFromChild);
        };
        _this.updateValue = function (event) {
            _this.setState({ text: event.target.value });
        };
        _this.state = {
            things: [],
            text: ''
        };
        io.once('init-list-items', _this.setData);
        io.on('add-list-item-client', _this.setData);
        io.on('delete-list-item-client', function (id) {
            _this.setState(function (prevState) { return ({
                things: prevState.things.filter(function (ele) { return ele.id !== id; })
            }); });
        });
        return _this;
    }
    ListContainer.prototype.render = function () {
        return (React.createElement("div", { className: "container-fluid" },
            React.createElement("div", { className: "card " },
                React.createElement("div", { className: "card-header bg-primary rounded-top" },
                    React.createElement("h3", { className: "text-center" }, this.props.children)),
                React.createElement(Items_1.ListItems, { onItemDelete: this.deleteItem }, this.state.things),
                React.createElement("form", { onSubmit: this.submitFunc },
                    React.createElement("div", { className: "form-group clearfix px-3" },
                        React.createElement("input", { className: "form-control form-control-lg", onChange: this.updateValue, value: this.state.text, type: "text" }),
                        React.createElement("small", { className: "form-text text-muted float-right mt-2 mr-2" },
                            React.createElement("i", null, "Press Enter to add items")))))));
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
        var _this = _super.call(this, props) || this;
        _this.btn = {};
        _this.label = {};
        return _this;
    }
    ListItems.prototype.render = function () {
        var _this = this;
        var _items = this.props.children.map(function (elt) {
            return (React.createElement("li", { key: elt.id, className: "list-group-item list-group-item-ac", onMouseOver: function (event) { return _this.btn[elt.id].className = "btn-show"; }, onMouseOut: function (event) { return _this.btn[elt.id].className = "btn-hide"; } },
                React.createElement("div", { className: "d-flex justify-content-between" },
                    React.createElement("div", null,
                        React.createElement("input", { className: "", type: "checkbox", id: "todo-item-checkbox" + elt.id, onChange: function (e) { return _this.label[elt.id].className = e.target.checked ? "m-0 py-2 strike" : "m-0 py-2"; } }),
                        React.createElement("label", { className: "m-0 py-2", style: { fontSize: 18 }, ref: function (r) { return _this.label[elt.id] = r; }, htmlFor: "todo-item-checkbox" + elt.id }, elt.value)),
                    React.createElement("div", { className: "btn-hide", ref: function (r) { return _this.btn[elt.id] = r; } },
                        React.createElement(OptionButton, { onDelete: function () { return _this.props.onItemDelete(elt.id); } })))));
        });
        return React.createElement("u", { className: "list-group list-group-flush" }, _items);
    };
    return ListItems;
}(React.Component));
exports.ListItems = ListItems;
var OptionButton = /** @class */ (function (_super) {
    __extends(OptionButton, _super);
    function OptionButton(props) {
        return _super.call(this, props) || this;
    }
    OptionButton.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className },
            React.createElement("button", { key: 'edit', onClick: this.props.onEdit, className: "btn btn-sm btn-outline-primary mr-1" },
                React.createElement("i", { className: "material-icons" }, "edit")),
            React.createElement("button", { key: 'delete', onClick: this.props.onDelete, className: "btn btn-sm btn-outline-danger mr-1" },
                React.createElement("i", { className: "material-icons" }, "delete"))));
    };
    return OptionButton;
}(React.Component));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = io;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
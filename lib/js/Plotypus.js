"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.calcInterval = calcInterval;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Axis = require("./Axis");

var _GridLayer = require("./GridLayer");

var _GridLayer2 = _interopRequireDefault(_GridLayer);

var _GroupedBarLayer = require("./GroupedBarLayer");

var _GroupedBarLayer2 = _interopRequireDefault(_GroupedBarLayer);

var _StackedBarLayer = require("./StackedBarLayer");

var _StackedBarLayer2 = _interopRequireDefault(_StackedBarLayer);

var _LineLayer = require("./LineLayer");

var _LineLayer2 = _interopRequireDefault(_LineLayer);

var _CircleLayer = require("./CircleLayer");

var _CircleLayer2 = _interopRequireDefault(_CircleLayer);

var _ScatterLayer = require("./ScatterLayer");

var _ScatterLayer2 = _interopRequireDefault(_ScatterLayer);

var _FuncLayer = require("./FuncLayer");

var _FuncLayer2 = _interopRequireDefault(_FuncLayer);

function calcInterval(min, max, limit) {
	var range = max - min;
	var minimum = range / limit;

	if (minimum >= 5) {
		return Math.ceil(minimum / 5) * 5;
	} else {
		var validIntervals = _lodash2["default"].range(1, 5, 0.5).reverse();
		var r = _lodash2["default"].find(validIntervals, function (i) {
			return minimum >= i;
		});
		return r || 0.5;
	}
}

var Plot = (function (_React$Component) {
	function Plot() {
		_classCallCheck(this, Plot);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}
	}

	_inherits(Plot, _React$Component);

	_createClass(Plot, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"svg",
				{ className: (0, _classnames2["default"])("Plot", this.props.className) },
				_react2["default"].createElement(
					"g",
					{ className: "render-area" },
					this.props.children
				)
			);
		}
	}]);

	return Plot;
})(_react2["default"].Component);

exports.Plot = Plot;

var PlotypusRow = (function (_React$Component2) {
	function PlotypusRow() {
		_classCallCheck(this, PlotypusRow);

		if (_React$Component2 != null) {
			_React$Component2.apply(this, arguments);
		}
	}

	_inherits(PlotypusRow, _React$Component2);

	_createClass(PlotypusRow, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: "PlotypusRow" },
				this.props.children
			);
		}
	}]);

	return PlotypusRow;
})(_react2["default"].Component);

exports.PlotypusRow = PlotypusRow;

var PlotypusComponent = (function (_React$Component3) {
	function PlotypusComponent() {
		_classCallCheck(this, PlotypusComponent);

		if (_React$Component3 != null) {
			_React$Component3.apply(this, arguments);
		}
	}

	_inherits(PlotypusComponent, _React$Component3);

	_createClass(PlotypusComponent, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: (0, _classnames2["default"])("PlotypusComponent", this.props.className) },
				this.props.children
			);
		}
	}]);

	return PlotypusComponent;
})(_react2["default"].Component);

exports.PlotypusComponent = PlotypusComponent;

var Plotypus = (function (_React$Component4) {
	function Plotypus() {
		_classCallCheck(this, Plotypus);

		if (_React$Component4 != null) {
			_React$Component4.apply(this, arguments);
		}
	}

	_inherits(Plotypus, _React$Component4);

	_createClass(Plotypus, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				_extends({}, this.props, { className: (0, _classnames2["default"])("Plotypus", this.props.className) }),
				this.props.children
			);
		}
	}]);

	return Plotypus;
})(_react2["default"].Component);

exports.Plotypus = Plotypus;

var Null = (function (_React$Component5) {
	function Null() {
		_classCallCheck(this, Null);

		if (_React$Component5 != null) {
			_React$Component5.apply(this, arguments);
		}
	}

	_inherits(Null, _React$Component5);

	_createClass(Null, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement("div", { className: "null" });
		}
	}]);

	return Null;
})(_react2["default"].Component);

exports.Null = Null;
exports.NumberAxis = _Axis.NumberAxis;
exports.CategoryAxis = _Axis.CategoryAxis;
exports.GridLayer = _GridLayer2["default"];
exports.GroupedBarLayer = _GroupedBarLayer2["default"];
exports.StackedBarLayer = _StackedBarLayer2["default"];
exports.LineLayer = _LineLayer2["default"];
exports.CircleLayer = _CircleLayer2["default"];
exports.ScatterLayer = _ScatterLayer2["default"];
exports.FuncLayer = _FuncLayer2["default"];
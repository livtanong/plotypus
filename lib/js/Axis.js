"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _ChartLayerMixin = require("./ChartLayerMixin");

var _ChartLayerMixin2 = _interopRequireDefault(_ChartLayerMixin);

var _AxisElements = require("./AxisElements");

var NumberAxis = (function (_React$Component) {
	function NumberAxis(props) {
		_classCallCheck(this, NumberAxis);

		_get(Object.getPrototypeOf(NumberAxis.prototype), "constructor", this).call(this, props);
		this._chartLayer = undefined;
		// this.updateChart = this.updateChart.bind(this);
		// this.render = this.render.bind(this);
	}

	_inherits(NumberAxis, _React$Component);

	_createClass(NumberAxis, [{
		key: "getInterval",
		value: function getInterval() {
			return this._chartLayer ? this._chartLayer.getInterval() : 1;
		}
	}, {
		key: "updateChart",
		value: function updateChart() {
			this._chartLayer && this.destroyChart();
			this._chartLayer = new _AxisElements.AxisNumbers(_react2["default"].findDOMNode(this), this.props.max, this.props.min, this.props.interval, this.props.align, this.props.orientation, this.props.onUpdate);
		}
	}, {
		key: "destroyChart",
		value: function destroyChart() {
			this._chartLayer && this._chartLayer.clear && this._chartLayer.clear();
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.updateChart();
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			this.updateChart();
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.destroyChart();
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement("svg", { className: (0, _classnames2["default"])("Axis", "NumberAxis", this.props.orientation) });
		}
	}]);

	return NumberAxis;
})(_react2["default"].Component);

exports.NumberAxis = NumberAxis;

NumberAxis.propTypes = {
	max: _react2["default"].PropTypes.number,
	min: _react2["default"].PropTypes.number,
	interval: _react2["default"].PropTypes.number,
	align: _react2["default"].PropTypes.oneOf(["start", "middle", "end"]),
	onUpdate: _react2["default"].PropTypes.func,
	orientation: _react2["default"].PropTypes.oneOf(["v", "h"])
};
NumberAxis.defaultProps = {
	min: 0,
	align: "start",
	orientation: "v"
};

var CategoryAxis = (function (_React$Component2) {
	function CategoryAxis(props) {
		_classCallCheck(this, CategoryAxis);

		_get(Object.getPrototypeOf(CategoryAxis.prototype), "constructor", this).call(this, props);
		this.majorAxis = {
			"v": "height",
			"h": "width"
		};
		this.minorAxis = {
			"v": "width",
			"h": "height"
		};
		this.state = {
			rotation: 0,
			categoryThickness: undefined,
			textAlign: "middle"
		};
		this._chartLayer = undefined;
		this.updateChart = this.updateChart.bind(this);
		this.refresh = _lodash2["default"].debounce(this.updateChart, 100);
		// this.render = this.render.bind(this);
	}

	_inherits(CategoryAxis, _React$Component2);

	_createClass(CategoryAxis, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			window.addEventListener("resize", this.refresh);
			this.updateChart();
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			this.updateChart();
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("resize", this.refresh);
			this.destroyChart();
		}
	}, {
		key: "updateChart",
		value: function updateChart() {
			this._chartLayer && this.destroyChart();

			this._chartLayer = new _AxisElements.AxisCategories(_react2["default"].findDOMNode(this), this.props.categories, this.props.align, this.props.orientation, this.props.onClickLabel, false, this.props.onUpdate);
		}
	}, {
		key: "destroyChart",
		value: function destroyChart() {
			this._chartLayer && this._chartLayer.clear && this._chartLayer.clear();
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement("svg", { className: (0, _classnames2["default"])("Axis", "CategoryAxis", this.props.orientation) });
		}
	}]);

	return CategoryAxis;
})(_react2["default"].Component);

exports.CategoryAxis = CategoryAxis;

CategoryAxis.propTypes = {
	categories: _react2["default"].PropTypes.array,
	align: _react2["default"].PropTypes.oneOf(["start", "middle", "end"]),
	orientation: _react2["default"].PropTypes.oneOf(["v", "h"]),
	onClickLabel: _react2["default"].PropTypes.func
};
CategoryAxis.defaultProps = {
	align: "start",
	orientation: "h"
};
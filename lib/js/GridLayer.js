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

var _Gridlines = require("./Gridlines");

var _Gridlines2 = _interopRequireDefault(_Gridlines);

var GridLayer = (function (_React$Component) {
	function GridLayer(props) {
		_classCallCheck(this, GridLayer);

		_get(Object.getPrototypeOf(GridLayer.prototype), "constructor", this).call(this, props);
		this._chartLayer = undefined;
	}

	_inherits(GridLayer, _React$Component);

	_createClass(GridLayer, [{
		key: "componentDidMount",
		value: function componentDidMount() {
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
			this.destroyChart();
		}
	}, {
		key: "destroyChart",
		value: function destroyChart() {
			if (this._chartLayer) {
				this._chartLayer.clear();
			}
		}
	}, {
		key: "updateChart",
		value: function updateChart() {
			this.destroyChart();
			this._chartLayer = new _Gridlines2["default"](_react2["default"].findDOMNode(this), this.props.min, this.props.max, _lodash2["default"].isFunction(this.props.interval) ? this.props.interval() : this.props.interval, this.props.orientation);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement("svg", { className: (0, _classnames2["default"])("GridLayer", this.props.className) });
		}
	}]);

	return GridLayer;
})(_react2["default"].Component);

exports["default"] = GridLayer;

GridLayer.defaultProps = {
	min: 0,
	interval: 1,
	orientation: "h"
};

GridLayer.propTypes = {
	orientation: _react2["default"].PropTypes.string,
	max: _react2["default"].PropTypes.number,
	min: _react2["default"].PropTypes.number,
	interval: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.number, _react2["default"].PropTypes.func])
};
module.exports = exports["default"];
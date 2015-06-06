"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");

var AxisElements = require("./AxisElements");
var AxisNumbers = AxisElements.AxisNumbers;
var AxisCategories = AxisElements.AxisCategories;
var ChartLayerMixin = require("./ChartLayerMixin");

var Axis = React.createClass({
	displayName: "Axis",

	propTypes: {
		max: React.PropTypes.number,
		min: React.PropTypes.number,
		interval: React.PropTypes.number,
		align: React.PropTypes.oneOf(["start", "middle", "end"]),
		onUpdate: React.PropTypes.func,
		orientation: React.PropTypes.oneOf(["v", "h"])
	},
	mixins: [ChartLayerMixin],
	getDefaultProps: function getDefaultProps() {
		return {
			min: 0,
			align: "start",
			orientation: "v"
		};
	},
	getInitialState: function getInitialState() {
		return {
			axisHeight: undefined
		};
	},
	getInterval: function getInterval() {
		if (this._chartLayer) {
			return this._chartLayer.getInterval();
		} else {
			return 1;
		}
	},
	_chartLayer: undefined,
	updateChart: function updateChart() {
		this.destroyChart();
		this._chartLayer = new AxisNumbers(React.findDOMNode(this), this.props.max, this.props.min, this.props.interval, this.props.align, this.props.orientation, this.props.onUpdate);
	},
	destroyChart: function destroyChart() {
		if (this._chartLayer && this._chartLayer.clear) {
			this._chartLayer.clear();
		}
	},
	render: function render() {
		return React.createElement("svg", { className: classnames("Axis", this.props.orientation) });
	}
});

var AxisLabel = React.createClass({
	displayName: "AxisLabel",

	render: function render() {
		return React.createElement(
			"text",
			_extends({ className: "AxisLabel" }, this.props),
			this.props.children
		);
	}
});

var Category = React.createClass({
	displayName: "Category",

	propTypes: {
		categories: React.PropTypes.array,
		align: React.PropTypes.oneOf(["start", "middle", "end"]),
		orientation: React.PropTypes.oneOf(["v", "h"]),
		onClickLabel: React.PropTypes.func
	},
	mixins: [ChartLayerMixin],
	getDefaultProps: function getDefaultProps() {
		return {
			align: "start",
			orientation: "h"
		};
	},
	majorAxis: {
		"v": "height",
		"h": "width"
	},
	minorAxis: {
		"v": "width",
		"h": "height"
	},
	getInitialState: function getInitialState() {
		return {
			rotation: 0,
			categoryThickness: undefined,
			textAlign: "middle"
		};
	},
	_chartLayer: undefined,
	updateChart: function updateChart() {
		this.destroyChart();

		this._chartLayer = new AxisCategories(React.findDOMNode(this), this.props.categories, this.props.align, this.props.orientation, this.props.onClickLabel, false, this.props.onUpdate);
	},
	destroyChart: function destroyChart() {
		if (this._chartLayer && this._chartLayer.clear) {
			this._chartLayer.clear();
		}
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener("resize", this.refresh);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener("resize", this.refresh);
	},
	refresh: _.debounce(function () {
		this.updateChart();
	}, 100),
	render: function render() {
		return React.createElement("svg", { className: classnames("Axis", this.props.orientation) });
	}
});

module.exports = {
	Axis: Axis,
	Category: Category,
	AxisLabel: AxisLabel
};
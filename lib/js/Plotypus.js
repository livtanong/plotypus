"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");

var A = require("./Axis");
var Axis = A.Axis;
var CategoryAxis = A.Category;
var AxisLabel = A.AxisLabel;

var GridLayer = require("./GridLayer");
var GroupedBarLayer = require("./GroupedBarLayer");
var StackedBarLayer = require("./StackedBarLayer");
var LineLayer = require("./LineLayer");
var CircleLayer = require("./CircleLayer");
var ScatterLayer = require("./ScatterLayer");
var FuncLayer = require("./FuncLayer");

var calcInterval = function calcInterval(min, max, limit) {
	var range = max - min;
	var minimum = range / limit;

	if (minimum >= 5) {
		return Math.ceil(minimum / 5) * 5;
	} else {
		var validIntervals = _.range(1, 5, 0.5).reverse();
		var r = _.find(validIntervals, function (i) {
			return minimum >= i;
		});
		return r || 0.5;
	}
};

var Plot = React.createClass({
	displayName: "Plot",

	render: function render() {
		// scale depending on the maximum value we get from children.
		return React.createElement(
			"svg",
			{ className: classnames("Plot", this.props.className) },
			React.createElement(
				"g",
				{ className: "render-area" },
				this.props.children
			)
		);
	}
});

var PlotypusRow = React.createClass({
	displayName: "PlotypusRow",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "PlotypusRow" },
			this.props.children
		);
	}
});

var PlotypusComponent = React.createClass({
	displayName: "PlotypusComponent",

	render: function render() {
		return React.createElement(
			"div",
			{ className: classnames("PlotypusComponent", this.props.className) },
			this.props.children
		);
	}
});

var Plotypus = React.createClass({
	displayName: "Plotypus",

	render: function render() {
		return React.createElement(
			"div",
			_extends({}, this.props, { className: classnames("Plotypus", this.props.className) }),
			this.props.children
		);
	}
});

var Null = React.createClass({
	displayName: "Null",

	render: function render() {
		return React.createElement("div", { className: "null" });
	}
});

module.exports = {
	Plotypus: Plotypus,
	PlotypusRow: PlotypusRow,
	PlotypusComponent: PlotypusComponent,
	Null: Null,
	Plot: Plot,
	GroupedBarLayer: GroupedBarLayer,
	StackedBarLayer: StackedBarLayer,
	LineLayer: LineLayer,
	CircleLayer: CircleLayer,
	ScatterLayer: ScatterLayer,
	Axis: Axis,
	AxisLabel: AxisLabel,
	CategoryAxis: CategoryAxis,
	GridLayer: GridLayer,
	FuncLayer: FuncLayer,
	calcInterval: calcInterval
};
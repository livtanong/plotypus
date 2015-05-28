require("../scss/Plotypus.scss");

var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");

var A = require("./Axis");
var Axis = A.Axis;
var CategoryAxis = A.Category;
var AxisLabel = A.AxisLabel;

var GridLayer = require("./GridLayer.jsx");
var GroupedBarLayer = require("./GroupedBarLayer.jsx");
var StackedBarLayer = require("./StackedBarLayer.jsx");
var LineLayer = require("./LineLayer.jsx");
var CircleLayer = require("./CircleLayer.jsx");
var ScatterLayer = require("./ScatterLayer.jsx");
var FuncLayer = require("./FuncLayer.jsx");

var calcInterval = function(min, max, limit){
	var range = max - min;
	var minimum = range / limit;

	if (minimum >= 5) {
		return Math.ceil(minimum / 5) * 5;
	} else {
		var validIntervals = _.range(1, 5, 0.5).reverse();
		var r = _.find(validIntervals, function(i){
			return minimum >= i;
		});
		return r || 0.5;
	}
}

var Chart = React.createClass({
	render: function() {
		// scale depending on the maximum value we get from children.
		return (
			<svg className="Chart">
				<g className="render-area">
					{ this.props.children }
				</g>
			</svg>
		);
	}
});

var CharttableRow = React.createClass({
	render: function() {
		return (
			<div className="CharttableRow">
				{ this.props.children }
			</div>
		);
	}
});

var Charttable = React.createClass({
	render: function() {
		return (
			<div {...this.props} className={ classnames("Plotypus", this.props.className) }>
				{ this.props.children }
			</div>
		);
	}
});

module.exports = {
	Charttable: Charttable,
	CharttableRow: CharttableRow,
	Chart: Chart,
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
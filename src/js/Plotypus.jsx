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

var Plot = React.createClass({
	render: function() {
		// scale depending on the maximum value we get from children.
		return (
			<svg className="Plot">
				<g className="render-area">
					{ this.props.children }
				</g>
			</svg>
		);
	}
});

var PlotypusRow = React.createClass({
	render: function() {
		return (
			<div className="PlotypusRow">
				{ this.props.children }
			</div>
		);
	}
});

var PlotypusComponent = React.createClass({
	render: function() {
		return (
			<div className="PlotypusComponent">
				{ this.props.children }
			</div>
		);
	}
});

var Plotypus = React.createClass({
	render: function() {
		return (
			<div {...this.props} className={ classnames("Plotypus", this.props.className) }>
				{ this.props.children }
			</div>
		);
	}
});

var Null = React.createClass({
	render: function(){
		return (
			<div className="null" />
		)
	}
})

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
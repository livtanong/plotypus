require("../scss/Plotypus.scss");

var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");

var AxisElements = require("./AxisElements");
var AxisNumbers = AxisElements.AxisNumbers;
var AxisCategories = AxisElements.AxisCategories;
var ChartLayerMixin = require("./ChartLayerMixin");

var Axis = React.createClass({
	propTypes: {
		max: React.PropTypes.number,
		min: React.PropTypes.number,
		interval: React.PropTypes.number,
		align: React.PropTypes.oneOf(["start", "middle", "end"]),
		onUpdate: React.PropTypes.func,
		orientation: React.PropTypes.oneOf(['v', 'h'])
	},
	mixins: [ChartLayerMixin],
	getDefaultProps: function() {
		return {
			min: 0,
			align: "start",
			orientation: "v"
		};
	},
	getInitialState: function() {
		return {
			axisHeight: undefined 
		};
	},
	getInterval: function(){
		if (this._chartLayer) {
			return this._chartLayer.getInterval();
		} else {
			return 1;
		}
	},
	_chartLayer: undefined,
	updateChart: function(){
		this.destroyChart();
		this._chartLayer = new AxisNumbers(
			React.findDOMNode(this),
			this.props.max,
			this.props.min,
			this.props.interval,
			this.props.align,
			this.props.orientation,
			this.props.onUpdate
		);
	},
	destroyChart: function(){
		if (this._chartLayer && this._chartLayer.clear) {
			this._chartLayer.clear();
		}
	},
	render: function() {
		return <svg className={ classnames("Axis", this.props.orientation)} />
	}
});

var AxisLabel = React.createClass({
	render: function() {
		return (
			<text className="AxisLabel" {...this.props}>
				{ this.props.children }
			</text>
		);
	}
});

var Category = React.createClass({
	propTypes: {
		categories: React.PropTypes.array,
		align: React.PropTypes.oneOf(["start", "middle", "end"]),
		orientation: React.PropTypes.oneOf(['v', 'h']),
		onClickLabel: React.PropTypes.func
	},
	mixins: [ChartLayerMixin],
	getDefaultProps: function() {
		return {
			align: "start",
			orientation: "h"
		};
	},
	majorAxis: {
		"v": "height",
		"h": "width"
	},
	minorAxis:{
		"v": "width",
		"h": "height"
	},
	getInitialState: function() {
		return {
			rotation: 0,
			categoryThickness: undefined,
			textAlign: "middle"
		};
	},
	_chartLayer: undefined,
	updateChart: function(){
		this.destroyChart();

		this._chartLayer = new AxisCategories(
			React.findDOMNode(this),
			this.props.categories,
			this.props.align,
			this.props.orientation,
			this.props.onClickLabel,
			false,
			this.props.onUpdate
		);
	},
	destroyChart: function(){
		if (this._chartLayer && this._chartLayer.clear) {
			this._chartLayer.clear();
		}
	},
	componentDidMount: function() {
		window.addEventListener("resize", this.refresh);
	},
	componentWillUnmount: function() {
		window.removeEventListener("resize", this.refresh);
	},
	refresh: _.debounce(function(){
		this.updateChart();
	}, 100),
	render: function() {
		return <svg className={ classnames("Axis", this.props.orientation)} />
	}
});

module.exports = {
	Axis: Axis,
	Category: Category,
	AxisLabel: AxisLabel
};
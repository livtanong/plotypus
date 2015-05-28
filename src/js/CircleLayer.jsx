require("../scss/Plotypus.scss");

var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");
var ChartLayerMixin = require("./ChartLayerMixin");

var Circles = require("./Circles");

var CircleLayer = React.createClass({
	propTypes: {
		max: React.PropTypes.number,
		min: React.PropTypes.number,
		data: React.PropTypes.array,
		xField: React.PropTypes.string,
		yField: React.PropTypes.string,
		valueField: React.PropTypes.string,
	},
	mixins: [ChartLayerMixin],
	getDefaultProps: function() {
		return {
			min: 0
		};
	},
	_chartLayer: undefined,
	updateChart: function(){
		this.destroyChart();

		var ns = "http://www.w3.org/2000/svg";
		var derp = document.createElementNS(ns, "g");
		this._chartLayer = new Circles(
			derp,
			this.props.data,
			this.props.min,
			this.props.max,
			this.props.xField,
			this.props.yField,
			this.props.valueField);

		React.findDOMNode(this).appendChild(this._chartLayer);
	},
	destroyChart: function(){
		if (this._chartLayer) {
			React.findDOMNode(this).removeChild(this._chartLayer);
		}
	},
	render: function() {
		return (
			<g className={ classnames("CircleLayer", this.props.className) } />
		);
	}
});

module.exports = CircleLayer;
var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");
var ChartLayerMixin = require("./ChartLayerMixin");

var Gridlines = require("./Gridlines");

var GridLayer = React.createClass({
	propTypes: {
		orientation: React.PropTypes.string,
		max: React.PropTypes.number,
		min: React.PropTypes.number,
		interval: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.func
		]),
	},
	mixins: [ChartLayerMixin],
	getDefaultProps: function() {
		return {
			min: 0,
			interval: 1,
			orientation: "h"
		};
	},
	_chartLayer: undefined,
	destroyChart: function() {
		if (this._chartLayer) {
			this._chartLayer.clear();
		}
	},
	updateChart: function() {
		this.destroyChart();
		this._chartLayer = new Gridlines(
			React.findDOMNode(this), 
			this.props.min, 
			this.props.max, 
			_.isFunction(this.props.interval) ? this.props.interval() : this.props.interval,
			this.props.orientation
		);
	},
	render: function() {
		return (
			<svg className={ classnames("GridLayer", this.props.className) } />
		)
	}
});

module.exports = GridLayer;
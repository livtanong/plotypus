var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");
var ChartLayerMixin = require("./ChartLayerMixin");
var Lines = require("./Lines");

var LineLayer = React.createClass({
	propTypes: {
		max: React.PropTypes.number,
		min: React.PropTypes.number,
		data: React.PropTypes.array
	},
	mixins: [ChartLayerMixin],
	_chartLayer: undefined,
	updateChart: function(){
		this.destroyChart();
		this._chartLayer = new Lines(
			React.findDOMNode(this),
			this.props.data,
			this.props.max,
			this.props.min
		);
	},
	destroyChart: function(){
		if (this._chartLayer && this._chartLayer.clear) {
			this._chartLayer.clear();
		}
	},
	render: function() {
		return <svg className={ classnames("LineLayer", this.props.className) } />
	}
});

module.exports = LineLayer;
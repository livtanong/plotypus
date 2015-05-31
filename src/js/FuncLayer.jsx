require("../scss/Plotypus.scss");

var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");
var Funcs = require("./Funcs");
var ChartLayerMixin = require("./ChartLayerMixin");

var FuncLayer = React.createClass({
	propTypes: {
		func: React.PropTypes.func, // takes x, returns y.
		samples: React.PropTypes.number,
		xMax: React.PropTypes.number,
		yMax: React.PropTypes.number,
		xMin: React.PropTypes.number,
		yMin: React.PropTypes.number
	},
	getDefaultProps: function() {
		return {
			xMin: 0,
			yMin: 0,
			samples: 64
		};
	},
	mixins: [ChartLayerMixin],
	_chartLayer: undefined,
	updateChart: function(){
		this.destroyChart();
		this._chartLayer = new Funcs(
			React.findDOMNode(this),
			this.props.func,
			this.props.xMin,
			this.props.xMax,
			this.props.yMin,
			this.props.yMax,
			this.props.samples
		);
	},
	destroyChart: function(){
		if (this._chartLayer && this._chartLayer.clear) {
			this._chartLayer.clear();
		}
	},
	render: function() {
		return (
			<svg className={ classnames("FuncLayer", this.props.className) } />
		);
	}
});

module.exports = FuncLayer;
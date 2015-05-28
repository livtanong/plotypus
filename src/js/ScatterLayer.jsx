require("../scss/Plotypus.scss");

var React = require("react/addons");
var _ = require("lodash");
var classnames = require("classnames");
var ChartLayerMixin = require("./ChartLayerMixin");
var ScatterPoints = require("./ScatterPoints");

var ScatterLayer = React.createClass({
	propTypes: {
		data: React.PropTypes.array,
		xField: React.PropTypes.string,
		yField: React.PropTypes.string,
		xMax: React.PropTypes.number,
		xMin: React.PropTypes.number,
		yMax: React.PropTypes.number,
		yMin: React.PropTypes.number,
		classFunc: React.PropTypes.func,
		onClickDot: React.PropTypes.func,
		onMouseoverDot: React.PropTypes.func,
		onMouseoutDot: React.PropTypes.func
	},
	mixins: [ChartLayerMixin],
	_chartLayer: undefined,
	shouldComponentUpdate: function(nextProps){
		return _.some(this.props, function(prop, key){
			return JSON.stringify(prop) != JSON.stringify(nextProps[key]);
		})
	},
	updateChart: function(){
		this.destroyChart();
		this._chartLayer = new ScatterPoints(
			React.findDOMNode(this),
			this.props.data,
			this.props.xField,
			this.props.yField,
			this.props.xMin,
			this.props.xMax,
			this.props.yMin,
			this.props.yMax,
			this.props.classFunc,
			this.props.onClickDot,
			this.props.onMouseoverDot,
			this.props.onMouseoutDot
		)
	},
	destroyChart: function(){
		if (this._chartLayer) {
			this._chartLayer.clear();
		}
	},
	render: function() {
		return (
			<svg className="ScatterLayer" />
		);
	}
});

module.exports = ScatterLayer;
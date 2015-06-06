"use strict";

var React = require("react/addons");
var _ = require("lodash");
var classnames = require("classnames");
var ChartLayerMixin = require("./ChartLayerMixin");
var ScatterPoints = require("./ScatterPoints");

var ScatterLayer = React.createClass({
	displayName: "ScatterLayer",

	propTypes: {
		data: React.PropTypes.array,
		xField: React.PropTypes.string,
		yField: React.PropTypes.string,
		xMax: React.PropTypes.number,
		xMin: React.PropTypes.number,
		yMax: React.PropTypes.number,
		yMin: React.PropTypes.number,
		classFunc: React.PropTypes.func,
		drawFunc: React.PropTypes.func,
		onClickDot: React.PropTypes.func,
		onMouseoverDot: React.PropTypes.func,
		onMouseoutDot: React.PropTypes.func
	},
	getDefaultProps: function getDefaultProps() {
		return {
			xField: "x",
			yField: "y",
			yMin: 0,
			xMin: 0,
			onMouseoutDot: _.noop,
			onMouseoverDot: _.noop
		};
	},
	mixins: [ChartLayerMixin],
	_chartLayer: undefined,
	shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		return _.some(this.props, function (prop, key) {
			return JSON.stringify(prop) != JSON.stringify(nextProps[key]);
		});
	},
	updateChart: function updateChart() {
		this.destroyChart();
		this._chartLayer = new ScatterPoints(React.findDOMNode(this), this.props.data, this.props.xField, this.props.yField, this.props.xMin, this.props.xMax, this.props.yMin, this.props.yMax, this.props.classFunc, this.props.drawFunc, this.props.onClickDot, this.props.onMouseoverDot, this.props.onMouseoutDot);
	},
	destroyChart: function destroyChart() {
		if (this._chartLayer) {
			this._chartLayer.clear();
		}
	},
	render: function render() {
		return React.createElement("svg", { className: "ScatterLayer" });
	}
});

module.exports = ScatterLayer;
"use strict";

var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");

var Gridlines = require("./Gridlines");

var GridLayer = React.createClass({
	displayName: "GridLayer",

	propTypes: {
		xMax: React.PropTypes.number,
		xMin: React.PropTypes.number,
		yMax: React.PropTypes.number,
		yMin: React.PropTypes.number,
		xInterval: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.func]),
		yInterval: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.func])
	},
	getDefaultProps: function getDefaultProps() {
		return {
			xMin: 0,
			yMin: 0,
			xInterval: 1,
			yInterval: 1
		};
	},
	_gridLayer: undefined,
	componentDidMount: function componentDidMount() {
		this.updateLines();
	},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		this.updateLines();
	},
	componentWillUnmount: function componentWillUnmount() {
		this.destroyLines();
	},
	destroyLines: function destroyLines() {
		if (this._gridLayer) {
			React.findDOMNode(this).removeChild(this._gridLayer);
		}
	},
	updateLines: function updateLines() {
		this.destroyLines();
		var ns = "http://www.w3.org/2000/svg";
		var container = document.createElementNS(ns, "svg");
		this._gridLayer = new Gridlines(container, this.props.xMax, this.props.xMin, this.props.yMax, this.props.yMin, _.isFunction(this.props.xInterval) ? this.props.xInterval() : this.props.xInterval, _.isFunction(this.props.yInterval) ? this.props.yInterval() : this.props.yInterval);

		React.findDOMNode(this).appendChild(this._gridLayer);
	},
	render: function render() {
		return React.createElement("g", { className: "GridLayer" });
	}
});

module.exports = GridLayer;
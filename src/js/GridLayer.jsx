var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");

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
	getDefaultProps: function() {
		return {
			min: 0,
			interval: 1,
			orientation: "h"
		};
	},
	_gridLayer: undefined,
	componentDidMount: function() {
		this.updateLines();
	},
	componentDidUpdate: function(prevProps, prevState) {
		this.updateLines();
	},
	componentWillUnmount: function() {
		this.destroyLines();
	},
	destroyLines: function(){
		if (this._gridLayer) {
			React.findDOMNode(this).removeChild(this._gridLayer);
		}
	},
	updateLines: function(){
		this.destroyLines();
		var ns = "http://www.w3.org/2000/svg";
		var container = document.createElementNS(ns, "svg");
		this._gridLayer = new Gridlines(
			container,
			this.props.min,
			this.props.max,
			_.isFunction(this.props.interval) ? this.props.interval() : this.props.interval,
			this.props.orientation);

		React.findDOMNode(this).appendChild(this._gridLayer);
	},
	render: function() {
		return (
			<g className="GridLayer" />
		)
	}
});

module.exports = GridLayer;
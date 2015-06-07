import React from "react";
import _ from "lodash";
import classnames from "classnames";

import ChartLayerMixin from "./ChartLayerMixin";
import {AxisNumbers, AxisCategories} from "./AxisElements";

export class NumberAxis extends React.Component {
	constructor(props) {
		super(props);
		this._chartLayer = undefined;
		this.updateChart = this.updateChart.bind(this);
	}
	getInterval() {
		return this._chartLayer
			? this._chartLayer.getInterval()
			: 1;
	}
	updateChart() {
		this._chartLayer && this.destroyChart();
		this._chartLayer = new AxisNumbers(
			React.findDOMNode(this),
			this.props.max,
			this.props.min,
			this.props.interval,
			this.props.align,
			this.props.orientation,
			this.props.onUpdate
		)
	}
	destroyChart() {
		this._chartLayer && this._chartLayer.clear && this._chartLayer.clear();
	}
	componentDidMount() {
		this.updateChart();
	}
	componentDidUpdate(prevProps, prevState) {
		this.updateChart();
	}
	componentWillUnmount() {
		this.destroyChart();
	}
	render() {
		return <svg className={ classnames("Axis", "NumberAxis", this.props.orientation)} />
	}
}
NumberAxis.propTypes = {
	max: React.PropTypes.number,
	min: React.PropTypes.number,
	interval: React.PropTypes.number,
	align: React.PropTypes.oneOf(["start", "middle", "end"]),
	onUpdate: React.PropTypes.func,
	orientation: React.PropTypes.oneOf(['v', 'h'])
}
NumberAxis.defaultProps = {
	min: 0,
	align: "start",
	orientation: "v"
}

// var NumberAxis = React.createClass({
// 	propTypes: {
// 		max: React.PropTypes.number,
// 		min: React.PropTypes.number,
// 		interval: React.PropTypes.number,
// 		align: React.PropTypes.oneOf(["start", "middle", "end"]),
// 		onUpdate: React.PropTypes.func,
// 		orientation: React.PropTypes.oneOf(['v', 'h'])
// 	},
// 	getDefaultProps: function() {
// 		return {
// 			min: 0,
// 			align: "start",
// 			orientation: "v"
// 		};
// 	},
// 	getInitialState: function() {
// 		return {
// 			axisHeight: undefined 
// 		};
// 	},
// 	getInterval: function(){
// 		if (this._chartLayer) {
// 			return this._chartLayer.getInterval();
// 		} else {
// 			return 1;
// 		}
// 	},
// 	_chartLayer: undefined,
// 	componentDidMount: function() {
// 		this.updateChart();
// 	},
// 	componentDidUpdate: function(){
// 		this.updateChart();
// 	},
// 	componentDidUnmount: function(){
// 		this.destroyChart();
// 	},
// 	updateChart: function(){
// 		this._chartLayer && this.destroyChart();
// 		this._chartLayer = new AxisNumbers(
// 			React.findDOMNode(this),
// 			this.props.max,
// 			this.props.min,
// 			this.props.interval,
// 			this.props.align,
// 			this.props.orientation,
// 			this.props.onUpdate
// 		);
// 	},
// 	destroyChart: function(){
// 		if (this._chartLayer && this._chartLayer.clear) {
// 			this._chartLayer.clear();
// 		}
// 	},
// 	render: function() {
// 		return <svg className={ classnames("Axis", "NumberAxis", this.props.orientation)} />
// 	}
// });

var CategoryAxis = React.createClass({
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
		return <svg className={ classnames("Axis", "CategoryAxis", this.props.orientation)} />
	}
});

module.exports = {
	NumberAxis: NumberAxis,
	CategoryAxis: CategoryAxis
};
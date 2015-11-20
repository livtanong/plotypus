import React from "react";
import _ from "lodash";
import classnames from "classnames";

import ChartLayerMixin from "./ChartLayerMixin";
import {AxisNumbers, AxisCategories} from "./AxisElements";

export class NumberAxis extends React.Component {
	constructor(props) {
		super(props);
		this._chartLayer = undefined;
		// this.updateChart = this.updateChart.bind(this);
		// this.render = this.render.bind(this);
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

export class CategoryAxis extends React.Component {
	constructor(props) {
		super(props);
		this.majorAxis = {
			"v": "height",
			"h": "width"
		};
		this.minorAxis = {
			"v": "width",
			"h": "height"
		};
		this.state = {
			rotation: 0,
			categoryThickness: undefined,
			textAlign: "middle"
		};
		this._chartLayer = undefined;
		this.updateChart = this.updateChart.bind(this);
		this.refresh = _.debounce(this.updateChart, 100);
		// this.render = this.render.bind(this);
	}
	componentDidMount() {
		window.addEventListener("resize", this.refresh);
		this.updateChart();
	}
	componentDidUpdate() {
		this.updateChart();
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.refresh);
		this.destroyChart();
	}
	updateChart(){
		this._chartLayer && this.destroyChart();

		this._chartLayer = new AxisCategories(
			React.findDOMNode(this),
			this.props.categories,
			this.props.align,
			this.props.orientation,
			this.props.onClickLabel,
			false,
			this.props.onUpdate
		);
	}
	destroyChart(){
		this._chartLayer && this._chartLayer.clear && this._chartLayer.clear();
	}
	render() {
		return <svg className={ classnames("Axis", "CategoryAxis", this.props.orientation)} />
	}
}

CategoryAxis.propTypes = {
	categories: React.PropTypes.array,
	align: React.PropTypes.oneOf(["start", "middle", "end"]),
	orientation: React.PropTypes.oneOf(['v', 'h']),
	onClickLabel: React.PropTypes.func
}
CategoryAxis.defaultProps = {
	align: "start",
	orientation: "h"
}

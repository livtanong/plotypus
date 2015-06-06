import React from "react";
import _ from "lodash";
import classnames from "classnames";
import Gridlines from "./Gridlines";

export default class GridLayer extends React.Component {
	constructor(props) {
		super(props);
		this._chartLayer = undefined;
	}
	componentDidMount() {
		this.updateChart();
	}
	componentDidUpdate() {
		this.updateChart();
	}
	componentWillUnmount() {
		this.destroyChart();
	}
	destroyChart() {
		if (this._chartLayer && _.isFunction(this._chartLayer.clear)) {
			this._chartLayer.clear();
		}
	}
	updateChart() {
		this.destroyChart();
		this._chartLayer = new Gridlines(
			React.findDOMNode(this), 
			this.props.min, 
			this.props.max, 
			_.isFunction(this.props.interval) ? this.props.interval() : this.props.interval,
			this.props.orientation
		);
	}
	render() {
		return <svg className={ classnames("GridLayer", this.props.className) } />
	}
}

GridLayer.defaultProps = {
	min: 0,
	interval: 1,
	orientation: "h"
}

GridLayer.propTypes = {
	orientation: React.PropTypes.string,
	max: React.PropTypes.number,
	min: React.PropTypes.number,
	interval: React.PropTypes.oneOfType([
		React.PropTypes.number,
		React.PropTypes.func
	])
}
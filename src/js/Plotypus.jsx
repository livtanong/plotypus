import React from "react";
import _ from "lodash";
import classnames from "classnames";

import {NumberAxis, CategoryAxis} from "./Axis";

import GridLayer from "./GridLayer";
import GroupedBarLayer from "./GroupedBarLayer";
import StackedBarLayer from "./StackedBarLayer";
import LineLayer from "./LineLayer";
import CircleLayer from "./CircleLayer";
import ScatterLayer from "./ScatterLayer";
import FuncLayer from "./FuncLayer";

export function calcInterval(min, max, limit){
	var range = max - min;
	var minimum = range / limit;

	if (minimum >= 5) {
		return Math.ceil(minimum / 5) * 5;
	} else {
		var validIntervals = _.range(1, 5, 0.5).reverse();
		var r = _.find(validIntervals, function(i){
			return minimum >= i;
		});
		return r || 0.5;
	}
}

export class Plot extends React.Component {
	render() {
		return (
			<svg className={ classnames("Plot", this.props.className) }>
				<g className="render-area">
					{ this.props.children }
				</g>
			</svg>
		);
	}
}

export class PlotypusRow extends React.Component {
	render() {
		return (
			<div className="PlotypusRow">
				{ this.props.children }
			</div>
		);
	}
}

export class PlotypusComponent extends React.Component {
	render() {
		return (
			<div className={ classnames("PlotypusComponent", this.props.className) }>
				{ this.props.children }
			</div>
		);
	}
}

export class Plotypus extends React.Component {
	render() {
		return (
			<div {...this.props} className={ classnames("Plotypus", this.props.className) }>
				{ this.props.children }
			</div>
		);
	}
}

export class Null extends React.Component {
	render() { return <div className="null" /> }
}

export {NumberAxis as NumberAxis};
export {CategoryAxis as CategoryAxis};
export {GridLayer as GridLayer};
export {GroupedBarLayer as GroupedBarLayer};
export {StackedBarLayer as StackedBarLayer};
export {LineLayer as LineLayer};
export {CircleLayer as CircleLayer};
export {ScatterLayer as ScatterLayer};
export {FuncLayer as FuncLayer};

import _ from "lodash";
import SVGLayer from "./SVGLayer";
import {CorePlot} from "./Core";

class Bars extends SVGLayer {
	constructor(domNode, data, seriesField, categoryField, valueField) {
		super(domNode);
		this.data = data;
		this.seriesField = seriesField || "series";
		this.categoryField = categoryField || "category";
		this.valueField = valueField || "value";

		var BarPlot = new CorePlot(
			[
				{name: categoryField, type: "DISCRETE", isPrincipal: true}, 
				{name: seriesField, type: "DISCRETE"}, 
				{name: valueField, type: "CONTINUOUS", isPrincipal: true}
			],
			data
		);
		this.indexMap = BarPlot.indexMap;
		this.presentationalData = BarPlot.presentationalData;
		this.seriesNames = this.pluckField(seriesField);
		this.catNames = this.pluckField(categoryField);
	}
	pluckField(fieldName) {
		return _.chain(this.data).pluck(fieldName).unique().sortBy().value();
	}
	getPosition(value, max, yOffset) {
		const origin = max - yOffset;
		return Math.min(origin - value, origin);
	}
}


/*
TODO: change structure so that you go from raw datapoints to presentational datapoints (if categorical, the locations of the points on the plot, given the category). THEN render based on presentational datapoints.
*/

export class GroupedBars extends Bars {
	constructor(domNode, data, seriesField, categoryField, valueField, groupOffsetFactor, barWidthFactor, min, max) {
		super(domNode, data, seriesField, categoryField, valueField);

		this.presentationalData.forEach(datapoint => {
			const seriesSize = this.seriesNames.length,
				catIndex = datapoint[categoryField],
				seriesIndex = datapoint[seriesField];

			const barOffset = groupOffsetFactor * barWidthFactor,
				groupWidth = (barOffset * seriesSize) - barOffset + barWidthFactor,
				catX = (catIndex + 0.5) * seriesSize - (groupWidth * 0.5),
				seriesX = barOffset * seriesIndex;

			const attrs = {
				width: barWidthFactor,
				height: Math.abs(datapoint[valueField]),
				x: catX + seriesX,
				y: this.getPosition(datapoint[valueField], max, 0),
				class: "Bar series-" + (seriesIndex + 1)
			}
			this.addSVGElement(this.content, "rect", attrs);
		});

		this.domNode.setAttribute("viewBox", "0 0 " + (this.seriesNames.length * this.catNames.length) + " " + (max - min));
		this.domNode.setAttribute("preserveAspectRatio", "none");
	}
}

// var stackedOffsets = function (){
//   return _.chain(data)
//   	.groupBy(data.col)
//   	.sortBy(function(d, i){
//   		return i;
//   	})
//     .map(function (values){ 
//     	return _.chain(values)
//     		.sortBy(function(v){
//     			return v[data.row]
//     		})
//     		.pluck("value")
//     		.map(function(value, index, list){
//     			return getOffset(list, value)
//     		})
//     		.value();
//     })
//     .flatten()
//     .value();
// }

export class StackedBars extends Bars {
	constructor(domNode, data, seriesField, categoryField, valueField, barWidthFactor, min, max) {
		super(domNode, data, seriesField, categoryField, valueField);

		_.chain(this.presentationalData)
			.groupBy(categoryField)
			.sortBy(function(c, i){ return i })
			.forEach(series => {
				_.sortBy(series, seriesField).forEach((datapoint, seriesIndex, seriesList) => {
					let catIndex = datapoint[categoryField];
					let values = _.pluck(seriesList, valueField);
					let yOffset = this.getOffset(_.take(values, seriesIndex), datapoint[valueField]);

					let attrs = {
						width: barWidthFactor,
						height: Math.abs(datapoint[valueField]),
						x: catIndex + 0.5 - (0.5 * barWidthFactor),
						y: this.getPosition(datapoint[valueField], max, yOffset),
						class: "Bar " + "series-" + (seriesIndex + 1)
					}

					this.addSVGElement(this.content, "rect", attrs);
				});
			})
			.value();

		this.domNode.setAttribute("viewBox", "0 0 " + this.catNames.length + " " + (max - min));
		this.domNode.setAttribute("preserveAspectRatio", "none");
	}
	getOffset(values, value) {
		return values
			.filter(d => value >= 0 ? d >= 0 : d < 0)
			.reduce(_.add, 0);
	}
}
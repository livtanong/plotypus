import _ from "lodash";
import SVGLayer from "./SVGLayer";
import {CorePlot} from "./Core";

function Bars (domNode, data, seriesField, categoryField, valueField) {
	SVGLayer.call(this, domNode);
	this.data = data;
	this.seriesField = seriesField || "series";
	this.categoryField = categoryField || "category";
	this.valueField = valueField || "value";

	this.pluckField = function(fieldName){

		return _.chain(this.data)
			.pluck(fieldName)
			.unique()
			.sortBy()
			.value();
	}.bind(this);

	this.getPosition = function(value, max, yOffset) {
		var origin = max - yOffset;
		return Math.min(origin - value, origin);
	}

	this.seriesNames = this.pluckField(seriesField);
	this.catNames = this.pluckField(categoryField);
}
Bars.prototype = new SVGLayer();


/*
TODO: change structure so that you go from raw datapoints to presentational datapoints (if categorical, the locations of the points on the plot, given the category). THEN render based on presentational datapoints.
*/

function GroupedBars (domNode, data, seriesField, categoryField, valueField, groupOffsetFactor, barWidthFactor, max, min){
	Bars.call(this, domNode, data, seriesField, categoryField, valueField);

	var BarPlot = new CorePlot(
		[{name: categoryField, type: "DISCRETE"}, {name: seriesField, type: "DISCRETE"}, {name: valueField, type: "CONTINUOUS"}], 
		[categoryField, valueField]
	);

	var indexMap = BarPlot.generateDiscreteIndexMap(data); // returns a map from categoryname to the sorted index of that categoryname.

	data.forEach(datapoint => {
		const seriesSize = _.size(indexMap[seriesField]),
			catIndex = indexMap[categoryField][datapoint[categoryField]],
			seriesIndex = indexMap[seriesField][datapoint[seriesField]];

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
GroupedBars.prototype = new Bars();


function StackedBars (domNode, data, seriesField, categoryField, valueField, barWidthFactor, min, max) {
	Bars.call(this, domNode, data, seriesField, categoryField, valueField);

	function getOffset (values, value) {
		return values.filter(function(d){
			// return the sign equal to the sign of value.
			return value >= 0 ? d >= 0 : d < 0;
		})
		.reduce(function(a, b){ return _.add(a, b) }, 0);
	};

	_.chain(data)
		.groupBy(categoryField)
		.sortBy(function(c, i){ return i })
		.forEach(function(series, catIndex, categoryObject){
			_.sortBy(series, seriesField).forEach(function(datapoint, seriesIndex, seriesList){

				var values = _.pluck(seriesList, valueField);
				var yOffset = getOffset(_.take(values, seriesIndex), datapoint.value);

				var attrs = {
					width: barWidthFactor,
					height: Math.abs(datapoint.value),
					x: catIndex + 0.5 - (0.5 * barWidthFactor),
					y: this.getPosition(datapoint.value, max, yOffset),
					class: "Bar " + "series-" + (seriesIndex + 1)
				}

				this.addSVGElement(this.content, "rect", attrs);
			}, this);
		}, this)
		.value();

	this.domNode.setAttribute("viewBox", "0 0 " + this.catNames.length + " " + (max - min));
	this.domNode.setAttribute("preserveAspectRatio", "none");
}
StackedBars.prototype = new Bars();

module.exports = {
	GroupedBars: GroupedBars,
	StackedBars: StackedBars
}
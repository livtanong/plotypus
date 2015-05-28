var _ = require("lodash");
var SVGLayer = require("./SVGLayer");

var Lines = function(domNode, data, max, min){
	SVGLayer.call(this, domNode);

	var getPosition = function(value, min, max){
		return value / (max - min);
	}.bind(this);

	var seriesCount, catCount;

	_.chain(data)
		.groupBy("series")
		.tap(function(seriesList){
			catCount = _.chain(seriesList)
				.values()
				.pluck("length")
				.max()
				.value();
		})
		.forEach(function(series, seriesName, seriesList){
			var path = series.map(function(dataPoint, index){
				var instruction = (index === 0) ? "M" : "L";
				return instruction + " " + (index + 0.5) + " " + (((max - min) - dataPoint.value) + min);
			});
			var attrs = {
				d: path.join(" "),
				stroke: "black",
				"stroke-width": "1",
				"fill": "none",
				"vector-effect": "non-scaling-stroke"
			};

			this.addSVGElement(this.content, "path", attrs);
		}, this)
		.value();

	// _.chain(data)
	// 	.groupBy("category")
	// 	.forEach(function(dataPoints, categoryName, categoryList){
	// 		dataPoints.forEach(function(dataPoint, seriesIndex, series){

	// 			var values = _.pluck(dataPoints, "value")
	// 				catIndex = _.keys(categoryList).indexOf(categoryName),
	// 				valueRange = max - min;

	// 			catCount = _.size(categoryList);

	// 			// seriesCount = series.length;
	// 			// barCount = data.length;

	// 			// if (isStacked) {			
	// 			// 	var barWidth = barWidthFactor,
	// 			// 		fieldX = catIndex,
	// 			// 		seriesX = (0.5) - (0.5 * barWidth),
	// 			// 		yOffset = getOffset(_.take(values, seriesIndex), bar.value),
	// 			// 		y = getPosition(bar.value, yOffset);
	// 			// } else {
	// 			// 	var barWidth = barWidthFactor,
	// 			// 		barOffset = groupOffsetFactor * barWidth,
	// 			// 		barMargin = barOffset - barWidth,
	// 			// 		groupWidth = (barOffset * seriesCount) - barMargin,
	// 			// 		fieldX = (catIndex + 0.5) * seriesCount - (groupWidth * 0.5),
	// 			// 		seriesX = barOffset * seriesIndex,
	// 			// 		y = getPosition(bar.value, 0);
	// 			// }

	// 			var attrs = {
	// 				cx: catIndex,
	// 				cy: dataPoint.value,
	// 				r: 1,
	// 				class: "Point " + "series-" + (seriesIndex + 1)
	// 			};

	// 			this.addSVGElement(this.content, "circle", attrs);

	// 		}, this)
	// 	}, this)
	// 	.value();

	this.domNode.setAttribute("viewBox", "0 0 " + catCount + " " + (max - min));
	this.domNode.setAttribute("preserveAspectRatio", "none");
}	
Lines.prototype = new SVGLayer();

module.exports = Lines;
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

	this.domNode.setAttribute("viewBox", "0 0 " + catCount + " " + (max - min));
	this.domNode.setAttribute("preserveAspectRatio", "none");
}	
Lines.prototype = new SVGLayer();

module.exports = Lines;
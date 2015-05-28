var _ = require("lodash");

var Circles = function(domNode, data, min, max, xField, yField, valueField){

	var formatPercent = function(fracPos) {
		return fracPos * 100 + "%";
	};

	var addElement = function(parent, tagName, attrs){
		var ns = "http://www.w3.org/2000/svg";
		var attrs = attrs || {};
		var elem = document.createElementNS(ns, tagName);
		_.forEach(attrs, function(attrVal, attrName){
			elem.setAttribute(attrName, attrVal);
		});
		parent.appendChild(elem);
	};

	_.chain(data)
		.groupBy(xField)
		.forEach(function(xAxisData, xCatName, grouping){
			var yIndex = _.keys(grouping).indexOf(xCatName);
			var circles = xAxisData.forEach(function(circle, xIndex, list){
				var x = xIndex / list.length;
				var y = yIndex / _.size(grouping);
				var smallestAxis = Math.min(1/list.length, 1/_.size(grouping)); // TODO: these actually don't return the right values. to get the right value, have to query DOM. future implementation.
				var A = circle[valueField] / (max - min);
				var r =  Math.sqrt(A / Math.PI) * smallestAxis / 2
				var attrs = {
					r: formatPercent(r),
					cx: formatPercent(x + (0.5 / list.length)),
					cy: formatPercent(y + (0.5 / _.size(grouping))),
					class: "Circle"
				};
				addElement(domNode, "circle", attrs);
			}, this)
		})
		.value();

	return domNode;
}

module.exports = Circles;
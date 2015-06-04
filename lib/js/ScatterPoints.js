"use strict";

var _ = require("lodash");
var Velocity = require("velocity-animate");
var SVGLayer = require("./SVGLayer");
var utils = require("./utils");

function ScatterPoints(domNode, data, xField, yField, xMin, xMax, yMin, yMax, classFunc, onClickDot, onMouseoverDot, onMouseoutDot) {
	SVGLayer.call(this, domNode);
	this.xMin = xMin;
	this.xMax = xMax;
	this.yMin = yMin;
	this.yMax = yMax;
	this.selectedPoint = undefined;

	this.fractionPosition = function (value, axis) {
		var numRange = this[axis + "Max"] - this[axis + "Min"];
		var fraction = axis === "y" ? 1 - value / numRange : value / numRange;
		return fraction;
	};

	var circles = data.map(function (datapoint, index) {
		var attr = {
			cx: utils.toPercent(this.fractionPosition(datapoint[xField], "x")),
			cy: utils.toPercent(this.fractionPosition(datapoint[yField], "y")),
			r: 4,
			"class": _.isFunc(classFunc) ? classFunc(datapoint, index) : ""
		};
		var circle = this.addSVGElement(this.content, "circle", attr);

		return {
			element: circle,
			datapoint: datapoint
		};
	}, this);

	this.onNearestPoint = (function (event) {
		var nearest = _.min(circles, function (circleWithData) {
			var circle = circleWithData.element;
			var bgr = this.domNode.parentNode.parentNode.getBoundingClientRect();
			var mouseX = event.clientX - bgr.left;
			var mouseY = event.clientY - bgr.top;
			var x = circle.getBBox().x - mouseX;
			var y = circle.getBBox().y - mouseY;

			return Math.sqrt(x * x + y * y);
		}, this);

		// if (this.selectedPoint != nearest) {
		// 	if (this.selectedPoint) {
		// 		Velocity(this.selectedPoint.element, {r: 4}, {duration: 100});
		// 	}

		// 	this.selectedPoint = nearest;

		// 	if (this.selectedPoint) {
		// 		onMouseoverDot && onMouseoverDot(nearest.datapoint, nearest.element);
		// 		Velocity(nearest.element, {r: 8}, {duration: 100});
		// 	}
		// }
	}).bind(this);

	document.addEventListener("mousemove", this.onNearestPoint);

	this.clear = (function () {
		document.removeEventListener("mousemove", this.onNearestPoint);
		this.constructor.prototype.clear.call(this);
	}).bind(this);
}
ScatterPoints.prototype = new SVGLayer();

module.exports = ScatterPoints;
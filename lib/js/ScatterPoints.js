"use strict";

var _ = require("lodash");
var SVGLayer = require("./SVGLayer");
var utils = require("./utils");

function ScatterPoints(domNode, data, xField, yField, xMin, xMax, yMin, yMax, classFunc, drawFunc, onClickDot, onMouseoverDot, onMouseoutDot) {
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
	this.selectPoint = function (point) {
		this.selectedPoint = point;
	};
	this.resetCircles = (function () {
		this.clear();
		this.content = this.addSVGElement(this.domNode, "g");
	}).bind(this);
	this.renderCircles = (function () {
		this.resetCircles();
		this.circles = data.map(function (datapoint, index) {
			var attr = {
				cx: utils.toPercent(this.fractionPosition(datapoint[xField], "x")),
				cy: utils.toPercent(this.fractionPosition(datapoint[yField], "y")),
				r: 4,
				"class": _.isFunction(classFunc) ? classFunc(datapoint, index) : ""
			};
			var circle = this.addSVGElement(this.content, "circle", attr);

			_.isFunction(drawFunc) && drawFunc(datapoint, circle);

			return {
				element: circle,
				datapoint: datapoint
			};
		}, this);
	}).bind(this);

	this.renderCircles();

	this.onNearestPoint = (function (event) {
		var bgr = this.domNode.parentNode.parentNode.getBoundingClientRect();
		var nearest = _.min(this.circles, function (circleWithData) {
			var circle = circleWithData.element;
			var mouseX = event.clientX - bgr.left;
			var mouseY = event.clientY - bgr.top;
			var x = circle.getBBox().x - mouseX;
			var y = circle.getBBox().y - mouseY;

			return Math.sqrt(x * x + y * y);
		}, this);

		var withinBounds = event.clientX >= bgr.left && event.clientX <= bgr.right && event.clientY >= bgr.top && event.clientY <= bgr.bottom;
		if (this.selectedPoint != nearest && withinBounds) {
			// deselect
			// if (this.selectedPoint) {
			// 	onMouseoutDot && onMouseoutDot(nearest.datapoint, nearest.element);
			// }
			this.selectPoint(nearest);

			// selected
			if (this.selectedPoint) {
				onMouseoverDot && onMouseoverDot(nearest.datapoint, nearest.element, this.circles);
			}
		}
	}).bind(this);

	document.addEventListener("mousemove", this.onNearestPoint);

	this.clear = (function () {
		document.removeEventListener("mousemove", this.onNearestPoint);
		this.constructor.prototype.clear.call(this);
	}).bind(this);
}
ScatterPoints.prototype = new SVGLayer();

module.exports = ScatterPoints;
var _ = require("lodash");
var SVGLayer = require("./SVGLayer");
var utils = require("./utils");

function AxisElements(domNode, ticks, align, orientation, onClickLabel){
	this.domNode = domNode;
	this.ticks = ticks;
	this.align = align;
	this.orientation = orientation;
	this.onClickLabel = onClickLabel;

	SVGLayer.call(this, this.domNode);

	var xAlign = {
		"start": 0,
		"middle": 0.5,
		"end": 1
	};

	this.fractionPosition = function(index){
		return (this.ticks.length - index) / this.ticks.length;
	}.bind(this);

	this.svgPos = function(index){
		return {
			h: {
				x: utils.toPercent(index / this.ticks.length),
				y: 0,
				height: 20,
				width: utils.toPercent(1.1 / this.ticks.length)
			},
			v: {
				x: 0,
				y: utils.toPercent(this.fractionPosition(index + 1)),
				height: utils.toPercent(1 / this.ticks.length),
				width: "100%"
			}
		}[this.orientation];
	};
	this.textPos = function(index){
		return {
			h: {
				x: 0,
				y: 0,
				"text-anchor": this.align,
				"alignment-baseline": "before-edge"
			},
			v: {
				x: utils.toPercent(xAlign[this.align]),
				y: "90%",
				"text-anchor": this.align
			}
		}[this.orientation];
	};

	this.renderTicks = function(){
		// this.domNode.appendChild(this.content);
		var axisWidth = this.domNode.offsetWidth;

		var svgTicks = this.ticks.map(function(n, index) {
			return {
				svg: this.addSVGElement(this.content, "svg", this.svgPos(index)),
				content: utils.sanify(n, 5)
				// content: n
			}
		}, this);

		var ticks = svgTicks.map(function(tick, index){
			var textContainer = tick.svg;
			var content = tick.content;
			var textAttrs = this.textPos(index);

			var text = this.addSVGElement(textContainer, "text", textAttrs);

			var textContent = document.createTextNode(content);
			text.appendChild(textContent);
			if (this.onClickLabel) {
				text.addEventListener("click", this.onClickLabel.bind(null, tick, index));
			}
			return text;
		}, this);

		var maxTickWidth = _.chain(svgTicks)
			.map(function(tick){
				return tick.svg.getBBox().width;
			})
			.max()
			.value();

		if ((this.orientation === "h") && (maxTickWidth > axisWidth / this.ticks.length)) {
			if (12 * 2 * 0.707106781 > axisWidth / this.ticks.length) {
				// 90deg
				ticks.forEach(function(tick, index){
					tick.setAttribute("transform", "translate(10, 0) rotate(90)");
					var textWidth = tick.getBBox().width;
					tick.parentNode.setAttribute("height", textWidth);
					tick.parentNode.setAttribute("width", 20);
				}, this);
			} else {			
				// 45 deg
				ticks.forEach(function(tick, index){
					tick.setAttribute("transform", "translate(10, 0) rotate(45)");
					var textWidth = tick.getBBox().width;
					tick.parentNode.setAttribute("height", textWidth);
					tick.parentNode.setAttribute("width", textWidth);
				}, this);
			}
		}

		var minorDimension = {
			h: "height",
			v: "width"
		}[this.orientation];

		this.domNode.setAttribute("style", minorDimension + ": " + this.content.getBBox()[minorDimension]);
	}
};
AxisElements.prototype = new SVGLayer();


function AxisNumbers(domNode, max, min, interval, align, orientation, onUpdate){
	this.getMinSizeFraction = function(){
		var axisSize = domNode[{"h": "offsetWidth", "v": "offsetHeight"}[orientation]];
		var minSize = {"h": 36, "v": 18}[orientation];
		// console.log(axisSize, minSize);
		return minSize / axisSize;
	};
	this.getInterval = function(){
		if (_.isFinite(max)) {
			var floatInterval = (max - min) * this.getMinSizeFraction();
			// console.log(max, min, this.getMinSizeFraction(), floatInterval);
			// if greater than or equal to 5, keep counting up to find the smallest integer divisible by 5 that is greater than or equal to floatInterval;
			// if between 1 and 5, use 2.5.
			// if less than 1, 1, 0.5, 0.1, 0.05, 0.01, etc...

			var fives = (guess=5) => {
				// find the smallest multiple of 5 greater than or equal to n
				return (guess >= floatInterval)
					? guess
					: fives(guess + 5);
			}
			let ones = (guess=1, divisor=2) => {
				// find the smallest member of the pattern (1, 0.5, 0.1, 0.05, 0.01...) greater than or equal to n
				return (guess / divisor < floatInterval) 
					? guess 
					: ones(guess / divisor, (divisor === 2) ? 5 : 2);
			}
			if (floatInterval > 2.5) {
				return fives();
			} else if (floatInterval > 1 && floatInterval <= 2.5) {
				return 2.5;
			} else {
				return ones();
			}
		} else {
			console.log("warning, max is undefined");
		}
	}.bind(this);

	this.interval = interval || this.getInterval();
	this.intervalledMax = utils.sanify(Math.ceil(max / this.interval) * this.interval, 5);
	this.intervalledMin = utils.sanify(Math.floor(min / this.interval) * this.interval, 5);
	onUpdate && onUpdate(this);
	AxisElements.call(this, domNode, _.range(this.intervalledMin, this.intervalledMax, this.interval), align, orientation);
	this.renderTicks();
};
AxisNumbers.prototype = new AxisElements();


var AxisCategories = function(domNode, categories, align, orientation, onClickLabel, rotateToFit, onUpdate){
	AxisElements.call(this, domNode, categories, align, orientation, onClickLabel);

	this.renderTicks();
};
AxisCategories.prototype = new AxisElements();


module.exports = {
	AxisNumbers: AxisNumbers,
	AxisCategories: AxisCategories
}
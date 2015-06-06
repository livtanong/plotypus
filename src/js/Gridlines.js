import _ from "lodash";

export default class Gridlines {
	constructor(domNode, min, max, interval, orientation) {
		let ticks = _.range(min, max, interval)
		ticks.forEach((n, index) => {
			switch(orientation) {
				case "h":
					let x = index;
					this.addElement(domNode, "line", {x1: x, x2: x, y1: 0, y2: 1});
					break;
				case "v":
					let y = ticks.length - index;
					this.addElement(domNode, "line", {x1: 0, x2: 1, y1: y, y2: y});
					break;
				default:
					console.log("illegal orientation");
			}
		})
		domNode.setAttribute("viewBox", `0 0 ${orientation === 'h' ? (ticks.length + " " + 1) : (1 + " " + ticks.length)}`);
		domNode.setAttribute("preserveAspectRatio", "none");
		return domNode
	}
	addElement(parent, tagName, attrs) {
		var ns = "http://www.w3.org/2000/svg";
		var attrs = attrs || {};
		var elem = document.createElementNS(ns, tagName);
		_.forEach(attrs, function(attrVal, attrName){
			elem.setAttribute(attrName, attrVal);
		});
		parent.appendChild(elem);
	}
}
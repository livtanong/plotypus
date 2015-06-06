import _ from "lodash";
import SVGLayer from "./SVGLayer";

export default class Gridlines extends SVGLayer {
	constructor(domNode, min, max, interval, orientation) {
		super(domNode);
		let ticks = _.range(min, max, interval)
		ticks.forEach((n, index) => {
			switch(orientation) {
				case "h":
					let x = index;
					this.addSVGElement(domNode, "line", {x1: x, x2: x, y1: 0, y2: 1});
					break;
				case "v":
					let y = ticks.length - index;
					this.addSVGElement(domNode, "line", {x1: 0, x2: 1, y1: y, y2: y});
					break;
				default:
					console.log("illegal orientation");
			}
		})
		domNode.setAttribute("viewBox", `0 0 ${orientation === 'h' ? (ticks.length + " " + 1) : (1 + " " + ticks.length)}`);
		domNode.setAttribute("preserveAspectRatio", "none");
		return domNode
	}
}
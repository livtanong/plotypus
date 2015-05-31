import _ from "lodash";
import SVGLayer from "./SVGLayer";

export default class Funcs extends SVGLayer {
	constructor(domNode, func, xMin, xMax, yMin, yMax, samples) {
		super(domNode);
		var interval = xMax / samples,
			xNumRange = xMax - xMin,
			yNumRange = yMax - yMin;

		var points = _.range(xMin, xMax + interval, interval).map((x, i) => `${i ? "L" : "M"} ${x} ${yMax - func(x)}`);

		var attrs = {
			d: points.join(" "),
		}

		this.addSVGElement(this.content, "path", attrs);
		this.domNode.setAttribute("viewBox", `0 0 ${xNumRange} ${yNumRange}`);
		this.domNode.setAttribute("preserveAspectRatio", "none");
	}

}
"use strict";

import _ from "lodash";

export default class SVGLayer {
	constructor(domNode) {
		this.domNode = domNode;
		this.content = this.addSVGElement(this.domNode, "g");
		this.nsDict = {
			"HTML" : "http://www.w3.org/1999/xhtml",
			"SVG" : "http://www.w3.org/2000/svg"
		}
	}
	addElementGeneral(ns, parent, tagName, attrs) {
		if (typeof document != "undefined") {
			let attrs = attrs || {};
			let elem = document.createElementNS(ns, tagName);

			_.forEach(attrs, (attrVal, attrName) => { elem.setAttribute(attrName, attrVal); });
			parent && parent.appendChild(elem);

			return elem;
		}
	}
	addElement(parent, tagName, attrs) {
		return this.addElementGeneral(this.nsDict.HTML, parent, tagName, attrs);
	}
	addSVGElement(parent, tagName, attrs) {
		return this.addElementGeneral(this.nsDict.SVG, parent, tagName, attrs);
	}
	clear() {
		this.domNode && this.domNode.removeChild(this.content);
	};
}
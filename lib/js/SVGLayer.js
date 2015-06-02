"use strict";

var _ = require("lodash");

function SVGLayer(domNode) {
	this.domNode = domNode;
	this.content = this.addSVGElement(this.domNode, "g");
}

SVGLayer.prototype.addElementGeneral = function (ns, parent, tagName, attrs) {
	var attrs = attrs || {};
	var elem = ns ? document.createElementNS(ns, tagName) : document.createElement(tagName);

	_.forEach(attrs, function (attrVal, attrName) {
		elem.setAttribute(attrName, attrVal);
	});

	if (parent) {
		parent.appendChild(elem);
	}

	return elem;
};

SVGLayer.prototype.addElement = function (parent, tagName, attrs) {
	return SVGLayer.prototype.addElementGeneral(null, parent, tagName, attrs);
};

SVGLayer.prototype.addElementNS = function (ns, parent, tagName, attrs) {
	return SVGLayer.prototype.addElementGeneral(ns, parent, tagName, attrs);
};

SVGLayer.prototype.addSVGElement = function (parent, tagName, attrs) {
	var ns = "http://www.w3.org/2000/svg";
	return SVGLayer.prototype.addElementGeneral(ns, parent, tagName, attrs);
};

SVGLayer.prototype.clear = function () {
	if (this.domNode) {
		this.domNode.removeChild(this.content);
	}
};

module.exports = SVGLayer;
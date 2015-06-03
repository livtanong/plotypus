"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _SVGLayer2 = require("./SVGLayer");

var _SVGLayer3 = _interopRequireDefault(_SVGLayer2);

var Funcs = (function (_SVGLayer) {
	function Funcs(domNode, func, xMin, xMax, yMin, yMax, samples) {
		_classCallCheck(this, Funcs);

		_get(Object.getPrototypeOf(Funcs.prototype), "constructor", this).call(this, domNode);
		var interval = xMax / samples,
		    xNumRange = xMax - xMin,
		    yNumRange = yMax - yMin;

		var points = _lodash2["default"].range(xMin, xMax + interval, interval).map(function (x, i) {
			return "" + (i ? "L" : "M") + " " + x + " " + (yMax - func(x));
		});

		var attrs = {
			d: points.join(" ") };

		this.addSVGElement(this.content, "path", attrs);
		this.domNode.setAttribute("viewBox", "0 0 " + xNumRange + " " + yNumRange);
		this.domNode.setAttribute("preserveAspectRatio", "none");
	}

	_inherits(Funcs, _SVGLayer);

	return Funcs;
})(_SVGLayer3["default"]);

exports["default"] = Funcs;
module.exports = exports["default"];
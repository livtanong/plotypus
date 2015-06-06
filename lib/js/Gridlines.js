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

var Gridlines = (function (_SVGLayer) {
	function Gridlines(domNode, min, max, interval, orientation) {
		var _this = this;

		_classCallCheck(this, Gridlines);

		_get(Object.getPrototypeOf(Gridlines.prototype), "constructor", this).call(this, domNode);
		var ticks = _lodash2["default"].range(min, max, interval);
		ticks.forEach(function (n, index) {
			switch (orientation) {
				case "h":
					var x = index;
					_this.addSVGElement(domNode, "line", { x1: x, x2: x, y1: 0, y2: 1 });
					break;
				case "v":
					var y = ticks.length - index;
					_this.addSVGElement(domNode, "line", { x1: 0, x2: 1, y1: y, y2: y });
					break;
				default:
					console.log("illegal orientation");
			}
		});
		domNode.setAttribute("viewBox", "0 0 " + (orientation === "h" ? ticks.length + " " + 1 : 1 + " " + ticks.length));
		domNode.setAttribute("preserveAspectRatio", "none");
		return domNode;
	}

	_inherits(Gridlines, _SVGLayer);

	return Gridlines;
})(_SVGLayer3["default"]);

exports["default"] = Gridlines;
module.exports = exports["default"];
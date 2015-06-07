"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _SVGLayer2 = require("./SVGLayer");

var _SVGLayer3 = _interopRequireDefault(_SVGLayer2);

var _Core = require("./Core");

var Bars = (function (_SVGLayer) {
	function Bars(domNode, data, seriesField, categoryField, valueField) {
		_classCallCheck(this, Bars);

		_get(Object.getPrototypeOf(Bars.prototype), "constructor", this).call(this, domNode);
		this.data = data;
		this.seriesField = seriesField || "series";
		this.categoryField = categoryField || "category";
		this.valueField = valueField || "value";

		var BarPlot = new _Core.CorePlot([{ name: categoryField, type: "DISCRETE", isPrincipal: true }, { name: seriesField, type: "DISCRETE" }, { name: valueField, type: "CONTINUOUS", isPrincipal: true }], data);
		this.indexMap = BarPlot.indexMap;
		this.presentationalData = BarPlot.presentationalData;
		this.seriesNames = this.pluckField(seriesField);
		this.catNames = this.pluckField(categoryField);
	}

	_inherits(Bars, _SVGLayer);

	_createClass(Bars, [{
		key: "pluckField",
		value: function pluckField(fieldName) {
			return _lodash2["default"].chain(this.data).pluck(fieldName).unique().sortBy().value();
		}
	}, {
		key: "getPosition",
		value: function getPosition(value, max, yOffset) {
			var origin = max - yOffset;
			return Math.min(origin - value, origin);
		}
	}]);

	return Bars;
})(_SVGLayer3["default"]);

/*
TODO: change structure so that you go from raw datapoints to presentational datapoints (if categorical, the locations of the points on the plot, given the category). THEN render based on presentational datapoints.
*/

var GroupedBars = (function (_Bars) {
	function GroupedBars(domNode, data, seriesField, categoryField, valueField, groupOffsetFactor, barWidthFactor, min, max) {
		var _this = this;

		_classCallCheck(this, GroupedBars);

		_get(Object.getPrototypeOf(GroupedBars.prototype), "constructor", this).call(this, domNode, data, seriesField, categoryField, valueField);

		this.presentationalData.forEach(function (datapoint) {
			var seriesSize = _this.seriesNames.length,
			    catIndex = datapoint[categoryField],
			    seriesIndex = datapoint[seriesField];

			var barOffset = groupOffsetFactor * barWidthFactor,
			    groupWidth = barOffset * seriesSize - barOffset + barWidthFactor,
			    catX = (catIndex + 0.5) * seriesSize - groupWidth * 0.5,
			    seriesX = barOffset * seriesIndex;

			var attrs = {
				width: barWidthFactor,
				height: Math.abs(datapoint[valueField]),
				x: catX + seriesX,
				y: _this.getPosition(datapoint[valueField], max, 0),
				"class": "Bar series-" + (seriesIndex + 1)
			};
			_this.addSVGElement(_this.content, "rect", attrs);
		});

		this.domNode.setAttribute("viewBox", "0 0 " + this.seriesNames.length * this.catNames.length + " " + (max - min));
		this.domNode.setAttribute("preserveAspectRatio", "none");
	}

	_inherits(GroupedBars, _Bars);

	return GroupedBars;
})(Bars);

exports.GroupedBars = GroupedBars;

// var stackedOffsets = function (){
//   return _.chain(data)
//   	.groupBy(data.col)
//   	.sortBy(function(d, i){
//   		return i;
//   	})
//     .map(function (values){
//     	return _.chain(values)
//     		.sortBy(function(v){
//     			return v[data.row]
//     		})
//     		.pluck("value")
//     		.map(function(value, index, list){
//     			return getOffset(list, value)
//     		})
//     		.value();
//     })
//     .flatten()
//     .value();
// }

var StackedBars = (function (_Bars2) {
	function StackedBars(domNode, data, seriesField, categoryField, valueField, barWidthFactor, min, max) {
		var _this2 = this;

		_classCallCheck(this, StackedBars);

		_get(Object.getPrototypeOf(StackedBars.prototype), "constructor", this).call(this, domNode, data, seriesField, categoryField, valueField);

		_lodash2["default"].chain(this.presentationalData).groupBy(categoryField).sortBy(function (c, i) {
			return i;
		}).forEach(function (series) {
			_lodash2["default"].sortBy(series, seriesField).forEach(function (datapoint, seriesIndex, seriesList) {
				var catIndex = datapoint[categoryField];
				var values = _lodash2["default"].pluck(seriesList, valueField);
				var yOffset = _this2.getOffset(_lodash2["default"].take(values, seriesIndex), datapoint[valueField]);

				var attrs = {
					width: barWidthFactor,
					height: Math.abs(datapoint[valueField]),
					x: catIndex + 0.5 - 0.5 * barWidthFactor,
					y: _this2.getPosition(datapoint[valueField], max, yOffset),
					"class": "Bar " + "series-" + (seriesIndex + 1)
				};

				_this2.addSVGElement(_this2.content, "rect", attrs);
			});
		}).value();

		this.domNode.setAttribute("viewBox", "0 0 " + this.catNames.length + " " + (max - min));
		this.domNode.setAttribute("preserveAspectRatio", "none");
	}

	_inherits(StackedBars, _Bars2);

	_createClass(StackedBars, [{
		key: "getOffset",
		value: function getOffset(values, value) {
			return values.filter(function (d) {
				return value >= 0 ? d >= 0 : d < 0;
			}).reduce(_lodash2["default"].add, 0);
		}
	}]);

	return StackedBars;
})(Bars);

exports.StackedBars = StackedBars;
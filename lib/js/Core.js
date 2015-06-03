"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var CorePlot = (function () {
	// either cartesian or polar.

	function CorePlot(axes, /* array of objects with name, type and isPrincipal */data) {
		_classCallCheck(this, CorePlot);

		this.axes = axes;
		this.data = data;
		var groupedAxes = _lodash2["default"].groupBy(this.axes, "type");
		// splits into DISCRETE and CONTINUOUS;
		this.discreteAxes = groupedAxes.DISCRETE;
		this.continuousAxes = groupedAxes.CONTINUOUS;
		this.indexMap = this.generateDiscreteIndexMap();
		this.presentationalData = this.generatePresentationalData();
	}

	_createClass(CorePlot, [{
		key: "generateDiscreteIndexMap",
		value: function generateDiscreteIndexMap() {
			var _this = this;

			/*
   	returns a map from axisName to a map from discrete value to index.
   */
			return _lodash2["default"].chain(this.discreteAxes).pluck("name").transform(function (result, axisName) {
				result[axisName] = _lodash2["default"].chain(_this.data).pluck(axisName).unique().sortBy().invert().mapValues(function (val) {
					return parseInt(val);
				}).value();
			}).value();
		}
	}, {
		key: "generatePresentationalData",
		value: function generatePresentationalData() {
			var _this2 = this;

			var data = this.data || [];
			return data.map(function (datapoint) {
				// look at all the axes available to us. reconstruct a new object based on this.
				var res = _lodash2["default"].transform(_this2.axes, function (result, axis) {
					if (axis.type === "DISCRETE") {
						result[axis.name] = _this2.indexMap[axis.name][datapoint[axis.name]]; // returns an appropriate numerical value, given a categorical value
					} else {
						result[axis.name] = datapoint[axis.name];
					}
				}, {});
				return res;
			});
		}
	}]);

	return CorePlot;
})();

exports.CorePlot = CorePlot;

var CartesianPlot = (function (_CorePlot) {
	function CartesianPlot(axes, principalAxisNames) {
		_classCallCheck(this, CartesianPlot);

		// ask for principal axes. what is the axis type for each of these axes? discrete or continuous?
		// where do we define the non-principal axes? maybe not in core.
		_get(Object.getPrototypeOf(CartesianPlot.prototype), "constructor", this).call(this, axes);
	}
	// generateIndexMap(data) {
	// 	return _.mapValues(this.principalAxes, (value, key) {
	// 		return {

	// 		}
	// 	})
	// }

	_inherits(CartesianPlot, _CorePlot);

	return CartesianPlot;
})(CorePlot);

exports.CartesianPlot = CartesianPlot;

var PolarPlot = (function (_CorePlot2) {
	function PolarPlot(thetaType, rType) {
		_classCallCheck(this, PolarPlot);

		var principalAxes = {
			theta: thetaType,
			r: rType
		};
		_get(Object.getPrototypeOf(PolarPlot.prototype), "constructor", this).call(this, principalAxes);
	}

	_inherits(PolarPlot, _CorePlot2);

	return PolarPlot;
})(CorePlot);

exports.PolarPlot = PolarPlot;
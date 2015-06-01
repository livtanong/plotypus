import _ from "lodash";

export class CorePlot {
	// either cartesian or polar.
	constructor(axes /* array of objects with name and type */ , principalAxisNames /* array of strings */) {
		this.axes = axes;
		let groupedAxes = _.groupBy(this.axes, "type");
		// splits into DISCRETE and CONTINUOUS;
		this.discreteAxes = groupedAxes.DISCRETE;
		this.continuousAxes = groupedAxes.CONTINUOUS;
	}
	generateDiscreteIndexMap(data /* an array of objects. */) {
		/*
			returns a map from axisName to a map from discrete value to index.
		*/

		return _.chain(this.discreteAxes)
			.pluck("name")
			.transform((result, axisName) => {
				result[axisName] = _.chain(data).pluck(axisName).unique().sortBy().invert().mapValues( val => parseInt(val) ).value() 
			})
			.value();
	}
}

export class CartesianPlot extends CorePlot {
	constructor(axes, principalAxisNames) {
		// ask for principal axes. what is the axis type for each of these axes? discrete or continuous?
		// where do we define the non-principal axes? maybe not in core.
		super(axes);
	}
	// generateIndexMap(data) {
	// 	return _.mapValues(this.principalAxes, (value, key) {
	// 		return {

	// 		}
	// 	})
	// }
}

export class PolarPlot extends CorePlot {
	constructor(thetaType, rType) {
		let principalAxes = {
			theta: thetaType,
			r: rType
		}
		super(principalAxes);
	}
}
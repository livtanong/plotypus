import _ from "lodash";

export class CorePlot {
	// either cartesian or polar.
	constructor(axes /* array of objects with name, type and isPrincipal */, data) {
		this.axes = axes;
		this.data = data;
		let groupedAxes = _.groupBy(this.axes, "type");
		// splits into DISCRETE and CONTINUOUS;
		this.discreteAxes = groupedAxes.DISCRETE;
		this.continuousAxes = groupedAxes.CONTINUOUS;
		this.indexMap = this.generateDiscreteIndexMap();
		this.presentationalData = this.generatePresentationalData();
	}
	generateDiscreteIndexMap() {
		/*
			returns a map from axisName to a map from discrete value to index.
		*/
		return _.chain(this.discreteAxes)
			.pluck("name")
			.transform((result, axisName) => {
				result[axisName] = _.chain(this.data).pluck(axisName).unique().sortBy().invert().mapValues( val => parseInt(val) ).value() 
			})
			.value();
	}
	generatePresentationalData() {
		let data = this.data || [];
		return data.map(datapoint => {
			// look at all the axes available to us. reconstruct a new object based on this.
			let res = _.transform(this.axes, (result, axis) => {
				if (axis.type === "DISCRETE") {
					result[axis.name] = this.indexMap[axis.name][datapoint[axis.name]]; // returns an appropriate numerical value, given a categorical value
				} else {
					result[axis.name] = datapoint[axis.name];
				}
			}, {});
			return res;
		});
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
"use strict";

var ChartLayerMixin = {
	componentDidMount: function componentDidMount() {
		this.updateChart();
	},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		// if (JSON.stringify(this.props) != JSON.stringify(prevProps)) {
		// 	// console.log("change!");
		// 	this.updateChart();
		// }

		// var propsChanged = _.some(this.props, function(value, key){
		// 	prevProps[key] != value;
		// });

		// var stateChanged = _.some(this.state, function(value, key){
		// 	prevState[key] != value;
		// })

		// console.log(propsChanged, stateChanged);

		// if (propsChanged || stateChanged) {
		this.updateChart();
		// }
	},
	componentWillUnmount: function componentWillUnmount() {
		this.destroyChart();
	}
};
module.exports = ChartLayerMixin;
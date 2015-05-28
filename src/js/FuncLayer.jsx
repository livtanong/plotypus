require("../scss/Plotypus.scss");

var React = require("react");
var _ = require("lodash");
var classnames = require("classnames");

var FuncLayer = React.createClass({
	propTypes: {
		func: React.PropTypes.func, // takes x, returns y.
		samples: React.PropTypes.number,
		xMax: React.PropTypes.number,
		yMax: React.PropTypes.number,
		xMin: React.PropTypes.number,
		yMin: React.PropTypes.number
	},
	getDefaultProps: function() {
		return {
			xMin: 0,
			yMin: 0
		};
	},
	render: function() {

		var interval = this.props.xMax / this.props.samples;
		var xNumRange = this.props.xMax - this.props.xMin;
		var yNumRange = this.props.yMax - this.props.yMin;

		var points = _.range(this.props.xMin, this.props.xMax + interval, interval).map(function(x, index){
			var y = this.props.yMax - this.props.func(x);
			var pX = (x / this.props.xMax) * 100 + "%"
			var pY = (y / (this.props.yMax - this.props.yMin)) * 100 + "%"
			// return (
			// 	<circle key={ index } cx={ pX } cy={ pY } r="1" />
			// )
			return {
				x: pX,
				y: pY,
				i: index
			}
		}, this);

		var path = _.rest(points).reduce(function(accPath, point){

			var prevPoint = accPath.prevPoint;

			var line = (
				<line key={ "p" + point.i } x1={prevPoint.x} y1={prevPoint.y} x2={point.x} y2={point.y} strokeWidth={ 1 } stroke="black" />
			)

			return {
				prevPoint: point,
				path: accPath.path.concat(line)
			}
		}, {
			prevPoint: _.head(points),
			path: []
		});
		
		return (
			<svg className={ classnames("FuncLayer", this.props.className) }>
				<g>
					{ path.path }
				</g>
			</svg>
		);
	}
});

module.exports = FuncLayer;
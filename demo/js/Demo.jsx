// var React = require("react");

// var Demo = React.createClass({
// 	render: function() {
// 		return (
// 			<div className="Demo">
// 				wat
// 			</div>
// 		);
// 	}
// });

// module.exports = Demo;

import React from "react";
import {Plotypus, PlotypusRow, Chart, GroupedBarLayer} from "../../src/js/Plotypus.jsx";
// console.log(Plotypus, PlotypusRow, Chart, GroupedBarLayer);

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {count: props.initialCount};
  }
  // tick() {
  //   this.setState({count: this.state.count + 1});
  // }
  render() {
    var data = [
      {val: 2, cat: "wat", series: "eh"}, 
      {val: 4, cat: "wat", series: "eh"},
      {val: 6, cat: "derp", series: "eh"},
      {val: 2, cat: "honk", series: "eh"}, 
      {val: 4, cat: "honk", series: "eh"},
      {val: 6, cat: "derp", series: "eh"}
    ]
    return (
      <div>
        <Plotypus>
          <PlotypusRow>
            <Chart>
              <GroupedBarLayer 
                groupOffset={ 1.2 } 
                barWidth={ 0.2 }
                max={ 10 }
                min={ 0 }
                categoryField="cat"
                seriesField="eh"
                valueField="val"
                data={ data } />
            </Chart>
          </PlotypusRow>
        </Plotypus>
      </div>
    );
  }
}
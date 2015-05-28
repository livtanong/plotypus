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

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {count: props.initialCount};
  }
  // tick() {
  //   this.setState({count: this.state.count + 1});
  // }
  render() {
    return (
      <div>
        derp this thing
      </div>
    );
  }
}
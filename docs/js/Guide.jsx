import React from "react";
import Highlight from "./Highlight";
import {ChartsAndLayers, BasicStructure, OtherComponents} from "./GuidePages";
import {Plotypus, PlotypusRow, PlotypusComponent, Plot, GroupedBarLayer, GridLayer, FuncLayer} from "../../src/js/Plotypus.jsx";

export default class Guide extends React.Component {
  genData(count, values, cats, series) {
    /*
      count (Number):           How many datapoints you want.
      values (Array(Number)):   Must be of length 2. Min and Max.
      cats (Array(String)):     Set of all possible categories.
      series (Array(String)):   Set of all possible series.
    */
    return _.times(count, function(n){
      return {
        value: (values[1] - values[0]) * Math.random(),
        category: _.sample(cats),
        series: _.sample(series)
      }
    })
  }
  render() {
    var data = this.genData(12, [0, 10], ["wat", "derp", "honk"], ["eh"]);
    return (
      <div className="Guide split-pane">
        <div className="sidebar">
          <div>
            <h4>Derp</h4>
            <ul>
              <li><a>Structure</a></li>
              <li><a>PlotypusRow</a></li>
            </ul>
          </div>
        </div>
        <div className="main">
          <section>
            <h2>Structure</h2>
            <p>There are two things you need to know about the structure of Plotypus charts. First, <code>Plot</code>s are layered, and second, they can be composed with other Plotypus components like <code>Axis</code> and <code>AxisLabel</code>, and even other <code>Plot</code>s, by way of a tabular layouting system.</p>
            <aside>Note: because we are using react, all comments that would have used the HTML comment, <code>{"<!-- -->"}</code>, will instead use the react comment, <code>{"{/* */}"}</code>.</aside>
            
            <ChartsAndLayers />
            <BasicStructure />
            <OtherComponents />
          </section>
        </div>
      </div>
    )
  }
}
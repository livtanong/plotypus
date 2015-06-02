import React from "react";
import Highlight from "./Highlight";
import {PlotsAndLayers, Composition, DataFormat, ArbitraryKeys} from "./GuidePages";
import {Plotypus, PlotypusRow, PlotypusComponent, Plot, GroupedBarLayer, StackedBarLayer, GridLayer, FuncLayer} from "../../src/js/Plotypus.jsx";

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
        <div className="sidebar table-of-contents">
          <div>
            <h4>
              <a href="#Structure">Structure</a>
            </h4>
            <ul>
              <li><a href="#PlotsAndLayers">Plots and Layers</a></li>
              <li><a href="#Composition">Composition</a></li>
            </ul>
          </div>
          <div>
            <h4>
              <a href="#Data">Data</a>
            </h4>
            <ul>
              <li><a href="#DataFormat">Format</a></li>
              <li><a href="#ArbitraryKeys">Arbitrary Keys</a></li>
            </ul>
          </div>
        </div>
        <div className="main">
          <article id="Structure">
            <section>
              <h1>Structure</h1>
              <p>There are two things you need to know about the structure of Plotypus charts. First, <code>Plot</code>s are layered, and second, they can be composed with other Plotypus components like <code>Axis</code> and <code>AxisLabel</code>, and even other <code>Plot</code>s, by way of a tabular layouting system.</p>
              <aside>Note: because we are using react, all comments that would have used the HTML comment, <code>{"<!-- -->"}</code>, will instead use the react comment, <code>{"{/* */}"}</code>.</aside>
            </section>
            <PlotsAndLayers />
            <Composition />
          </article>
          <article id="Data">
            <section>
              <h1>Data</h1>
              <p>There are a number of things to consider when supplying Plotypus <code>Plot</code> layers data.</p>
              <p>Plotypus likes thinking about data as a set of points in n-dimensional space. <em>Whoa, n-dimensional space? How did we get here?</em> Relax, young padawan. It isn't as complicated as it sounds.</p>
            </section>
            <DataFormat />
            <ArbitraryKeys />
          </article>
        </div>
      </div>
    )
  }
}
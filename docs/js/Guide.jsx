import React from "react";
import Highlight from "./Highlight.jsx";
import {Plotypus, PlotypusRow, Chart, GroupedBarLayer} from "../../src/js/Plotypus.jsx";

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
            <div>
              <p>
                Building out components in Plotypus is easy. Plotypus charts are laid out in a tabular manner. Think, way back then, when we still used tables to lay out websites—that's what we're doing now with the charts. It sounds atrocious, I know, but it helps amazingly with composing your charts. You can have just one axis, two, none, and even 4, if you're insane.
              </p>
              <Highlight className="solarized_dark">
                { 
                  `<Plotypus>
  <PlotypusRow>
    <Axis />
    <Chart />
  </PlotypusRow>
  <PlotypusRow>
    <Null /> <!-- We need a <null /> element here because we need to have the same number of columns in each row! -->
    <Axis />
  </PlotypusRow>
  <PlotypusRow>
    <Null /> <!-- We need a <null /> element here because we need to have the same number of columns in each row! -->
    <Legend /> <!-- We can include anything. A legend, a title, an axis, label, etc... -->
  </PlotypusRow>
</Plotypus>` }
              </Highlight>
            </div>
          </section>
          <Plotypus>
            <PlotypusRow>
              <Chart>
                <GroupedBarLayer 
                  groupOffset={ 1.2 } 
                  barWidth={ 0.1 }
                  max={ 10 }
                  min={ 0 }
                  categoryField="category"
                  seriesField="series"
                  valueField="value"
                  data={ data } />
              </Chart>
            </PlotypusRow>
          </Plotypus>
        </div>
      </div>
    )
  }
}
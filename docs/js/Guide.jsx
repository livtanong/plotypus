import React from "react";
import Highlight from "./Highlight.jsx";
import {Plotypus, PlotypusRow, PlotypusComponent, Chart, GroupedBarLayer, GridLayer, FuncLayer} from "../../src/js/Plotypus.jsx";

class ChartsAndLayers extends React.Component {
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
        category: n,
        series: null
      }
    })
  }
  render() {
    var data = this.genData(8, [0, 8]);

    var sineFunc = function(x, offset) {
      var offset = offset || 0
      return Math.sin(x + offset) * 4 + 4;
    }

    var sineData = _.times(8, function(n){
      return {
        value: sineFunc(n, 0.5) + (Math.random() - 0.5) * 2,
        category: n,
        series: null
      }
    })
    // console.log(data);
    return (
      <div>
        <h3>Charts and Layers</h3>
        <p>The chart component is obviously the most important of the components, and structurally, they are unique in that they have <strong>layers</strong>. Layers are graphical elements that stack on top of each other inside a Chart. Currently, only Charts have layers, but over time this may change.</p>
        <p>We'll use <code>GridLayer</code>, <code>GroupedBarLayer</code>, and <code>FuncLayer</code> to demonstrate the concept of layers. For now, we will simplify our layout to only include one Component: <code>Chart</code>, leaving only one <code>PlotypusRow</code> and one <code>PlotypusComponent</code> in our markup.</p>
        <Plotypus>
          <PlotypusRow>
            <PlotypusComponent>
              <Chart>
                <GridLayer 
                  xMax={ 8 }
                  yMax={ 8 }/>
                <GroupedBarLayer 
                  barWidth={ 0.3 }
                  max={ 8 }
                  min={ 0 }
                  categoryField="category"
                  seriesField="series"
                  valueField="value"
                  data={ sineData /* data I'm generating. */}/>
                <FuncLayer
                  xMax={ 8 }
                  yMax={ 8 }
                  func={ sineFunc /* the sine wave on which sineData is based */}
                  samples={ 32 }/>
              </Chart>
            </PlotypusComponent>
          </PlotypusRow>
        </Plotypus>
        <Highlight className="solarized_light">
{
`<Plotypus>
  <PlotypusRow>
    <PlotypusComponent>
      <Chart>
        <GridLayer 
          xMax={ 8 }
          yMax={ 8 }/>
        <GroupedBarLayer 
          barWidth={ 0.3 }
          max={ 8 }
          min={ 0 }
          categoryField="category"
          seriesField="series"
          valueField="value"
          data={ sineData /* data I'm generating. */}/>
        <FuncLayer
          xMax={ 8 }
          yMax={ 8 }
          func={ sineFunc /* the sine wave on which sineData is based */}
          samples={ 32 }/>
      </Chart>
    </PlotypusComponent>
  </PlotypusRow>
</Plotypus>`
}
        </Highlight>
      </div>
    )
  }
}

class OtherComponents extends React.Component {
  render() {
    return (
      <div>
        <h3>Other Components</h3>
        <p>Now that we've gotten the <code>Chart</code> out of the way, we can work on the other simpler components. These don't have layers, and therefore just stand alone.</p>
        <p>To keep </p>
      </div>
    )
  }
}

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
              <p>Building out components in Plotypus is easy. Plotypus charts are laid out in a tabular manner. Think, way back then, when we still used tables to lay out websites—that's what we're doing now with the charts.</p>
              <p>It sounds atrocious, I know, but it helps amazingly with composing your charts. You can have one axis, two, none, and even 4, if you're insane.</p>
              <Highlight className="solarized_light">
                { 
                  `<Plotypus>
  <PlotypusRow>
    <!-- PlotypusComponents are containers for components. Each one can contain anything from an Axis to a Chart, to a Legend. -->
    <PlotypusComponent />
    <PlotypusComponent />
  </PlotypusRow>
  <PlotypusRow>
    <PlotypusComponent />
    <PlotypusComponent />
  </PlotypusRow>
</Plotypus>` }
              </Highlight>

              <p>All <code>PlotypusComponent</code>s act like table cells.</p>
            </div>
            <ChartsAndLayers />
          </section>
          {/*<Plotypus>
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
                    </Plotypus>*/}
        </div>
      </div>
    )
  }
}
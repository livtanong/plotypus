import React from "react";
import Highlight from "./Highlight.jsx";
import {Plotypus, PlotypusRow, PlotypusComponent, Null, Plot, GroupedBarLayer, GridLayer, FuncLayer, Axis, CategoryAxis} from "../../src/js/Plotypus.jsx";

export class ChartsAndLayers extends React.Component {
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
        <h3>Plots and Layers</h3>
        <p>The <code>Plot</code> component is the most important of the components, and structurally, they are unique in that they have <strong>layers</strong>. Layers are graphical elements that stack on top of each other and take up the same area. Currently, only Plots have layers, but over time this may change.</p>
        <p>We'll use <code>GridLayer</code>, <code>GroupedBarLayer</code>, and <code>FuncLayer</code> to demonstrate the concept of layers.</p>
        <p>For now, you can ignore the properties I'm passing to each layer, as I will expound on them later on, but you can also study them now if you like.</p>
        <Plot>
          <GridLayer 
            xMax={ 8 }
            yMax={ 8 }/>
          <GroupedBarLayer 
            max={ 8 }
            data={ sineData /* data I'm generating. */}/>
          <FuncLayer
            xMax={ 8 }
            yMax={ 8 }
            func={ sineFunc /* the sine wave on which sineData is based */}
            samples={ 64 }/>
        </Plot>
        <Highlight className="solarized_light">
{
`<Plot>
  <GridLayer 
    xMax={ 8 }
    yMax={ 8 }/>
  <GroupedBarLayer 
    max={ 8 }
    data={ sineData /* data I'm generating. */}/>
  <FuncLayer
    xMax={ 8 }
    yMax={ 8 }
    func={ sineFunc /* the sine wave on which sineData is based */}
    samples={ 64 }/>
</Plot>`
}
        </Highlight>
      </div>
    )
  }
}


export class Composition extends React.Component {
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
    return (
      <div>
        <h3>Composition</h3>
        <p>Composition with Plotypus is easy. All Plotypus charts can be laid out in a tabular manner: that is, you define a table, then the rows, then the cells.</p>
        <p>The Plotypus components that correspond to this structure are as follows: <code>Plotypus</code>(table), <code>PlotypusRow</code>(row), <code>PlotypusComponent</code>(cell).</p>
        <Highlight className="solarized_light">
{ 
`<Plotypus>
  <PlotypusRow>
    {/* PlotypusComponents are containers for components. Each one can contain anything from an Axis to a Plot, to a Legend. */}
    <PlotypusComponent />
    <PlotypusComponent />
  </PlotypusRow>
  <PlotypusRow>
    <PlotypusComponent />
    <PlotypusComponent />
  </PlotypusRow>
</Plotypus>` 
}
        </Highlight>

        <p>This makes it easy to combine any of the Plotypus components and align them properly. You can have as many <code>Plot</code>, <code>Axis</code>, and other components aligned together as you like.</p>
        <p>Now let's take the Plot from the previous section, place it in the tabular structure and then add axes.</p>
        <Plotypus>
          <PlotypusRow>

            <PlotypusComponent>
              <Axis max={ 8 }/>
            </PlotypusComponent>

            <PlotypusComponent>
              <Plot>
                <GridLayer 
                  xMax={ 8 }
                  yMax={ 8 }/>
                <GroupedBarLayer 
                  max={ 8 }
                  data={ sineData /* data I'm generating. */}/>
                <FuncLayer
                  xMax={ 8 }
                  yMax={ 8 }
                  func={ sineFunc /* the sine wave on which sineData is based */}
                  samples={ 64 }/>
              </Plot>
            </PlotypusComponent>

          </PlotypusRow>
          <PlotypusRow>
            {/* The Null element simply occupies a space on the lower left corner of the tabular structure. 
            This makes sure that the axis element below is perfectly aligned with the Plot above. */}
            <Null /> 

            <PlotypusComponent>
              <CategoryAxis categories={["a", "b", "c", "d", "e", "f", "g", "h"]} orientation="h"/>
            </PlotypusComponent>

          </PlotypusRow>
        </Plotypus>
        <Highlight className="solarized_light">
{
`<Plotypus>
  <PlotypusRow>

    <PlotypusComponent>
      <Axis max={ 8 }/>
    </PlotypusComponent>

    <PlotypusComponent>
      <Plot>
        <GridLayer 
          xMax={ 8 }
          yMax={ 8 }/>
        <GroupedBarLayer 
          max={ 8 }
          data={ sineData /* data I'm generating. */}/>
        <FuncLayer
          xMax={ 8 }
          yMax={ 8 }
          func={ sineFunc /* the sine wave on which sineData is based */}
          samples={ 64 }/>
      </Plot>
    </PlotypusComponent>

  </PlotypusRow>
  <PlotypusRow>
    {/* The Null element simply occupies a space on the lower left corner of the tabular structure. 
    This makes sure that the axis element below is perfectly aligned with the Plot above. */}
    <Null /> 

    <PlotypusComponent>
      <Axis max={ 8 } orientation="h"/>
    </PlotypusComponent>

  </PlotypusRow>
</Plotypus>`
}
        </Highlight>

      </div>
    )
  }
}


export class OtherComponents extends React.Component {
  render() {
    return (
      <div>
        <h3>Other Components</h3>
        <p>Now that we've gotten the <code>Plot</code> out of the way, we can work on the other simpler components. These don't have layers, and therefore just stand alone.</p>
        <p>To keep </p>
      </div>
    )
  }
}
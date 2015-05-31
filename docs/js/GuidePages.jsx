import React from "react";
import Highlight from "./Highlight.jsx";
import {Plotypus, PlotypusRow, PlotypusComponent, Plot, GroupedBarLayer, GridLayer, FuncLayer} from "../../src/js/Plotypus.jsx";

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


export class BasicStructure extends React.Component {
  render() {
    return (
      <div>
        <h3>Basic Structure</h3>
        <p>Building out components in Plotypus is easy. Plotypus charts are laid out in a tabular manner. Think, way back then, when we still used tables to lay out websites—that's what we're doing now with the charts.</p>
        <p>It sounds atrocious, I know, but it helps amazingly with composing your charts. You can have one axis, two, none, and even 4, if you're insane.</p>
        <p>All <code>PlotypusRow</code>s act like table rows, while all <code>PlotypusComponent</code>s act like table cells.</p>
        <Highlight className="solarized_light">
{ 
`<Plotypus>
  <PlotypusRow>
    <!-- PlotypusComponents are containers for components. Each one can contain anything from an Axis to a Plot, to a Legend. -->
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
import React from "react";
import Highlight from "./Highlight.jsx";
import {
  Plotypus, 
  PlotypusRow, 
  PlotypusComponent, 
  Null, 
  Plot, 
  GroupedBarLayer, 
  StackedBarLayer, 
  ScatterLayer,
  GridLayer, 
  FuncLayer, 
  Axis, 
  CategoryAxis
} from "../../src/js/Plotypus.jsx";
import {sineFunc, data} from "./DataStore";

export class PlotsAndLayers extends React.Component {
  render() {
    var singleSeries = data.filter(d => d.series === "a");
    return (
      <section id="PlotsAndLayers">
        <h2>Plots and Layers</h2>
        <p>The <code>Plot</code> component is the most important of the components, and structurally, they are unique in that they have <strong>layers</strong>. Layers are graphical elements that stack on top of each other and take up the same area. Currently, only Plots have layers, but over time this may change.</p>
        <p>We'll use <code>GridLayer</code>, <code>GroupedBarLayer</code>, and <code>FuncLayer</code> to demonstrate the concept of layers.</p>
        <p>For now, you can ignore the properties I'm passing to each layer, as I will expound on them later on, but you can also study them now if you like.</p>
        <Plot>
          <GridLayer 
            xMax={ 8 }
            yMax={ 8 }/>
          <GroupedBarLayer 
            max={ 8 }
            data={ singleSeries /* data I'm generating. */}/>
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
      </section>
    )
  }
}


export class Composition extends React.Component {
  render() {
    var singleSeries = data.filter(d => d.series === "a");
    return (
      <section id="Composition">
        <h2>Composition</h2>
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
                  data={ singleSeries /* data I'm generating. */}/>
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

      </section>
    )
  }
}

export class DataFormat extends React.Component {
  render() { 
    return (
      <section id="DataFormat">
        <h2>Format</h2>
        <p>All plots require the data to be an array of objects (datapoints) with key-value pairs. The exact keys (or property names) and even the <em>number</em> of keys needed for the datapoints change depending on the plot. For now, let's look at <code>GroupedBarLayer</code></p>
        <p><code>GroupedBarLayer</code> requires the following keys: <code>series, category, value</code>. If you only have one series, you can leave it blank.</p>
        <Highlight>
{
`Everything
${JSON.stringify(data)}

Third series (colored yellow)
${JSON.stringify(data.filter(d => d.series === 'c'))}

Fourth Category (note zero indexed. so category is 3)
${JSON.stringify(data.filter(d => d.category === 3))}`
}
        </Highlight>
        <Plot>
          <GridLayer 
            xMax={ 8 }
            yMax={ 8 }/>
          <GroupedBarLayer 
            max={ 8 }
            groupOffset={ 1.3 /* basically the spacing between series */}
            data={ data /* data I'm generating. */}/>
        </Plot>
        <Highlight>
{`<Plot>
  <GridLayer 
    xMax={ 8 }
    yMax={ 8 }/>
  <GroupedBarLayer 
    max={ 8 }
    groupOffset={ 1.3 }
    data={ data /* data I'm generating. */}/>
</Plot>`}
        </Highlight>
      </section>
    )
  }
}

export class ArbitraryKeys extends React.Component {
  render() {
    return (
      <section id="ArbitraryKeys">
        <h2>Arbitrary Keys</h2>
        <p><em>But what if the data I have don't have the right property names?</em> We got you covered. All layers that accept data have a fieldnameField prop.</p>
        <p>For <code>GroupedBarLayer</code>, it's <code>seriesField</code>, <code>categoryField</code>, <code>valueField</code></p>
        <p>For this next example, we can do something crazy and switch the series and categories of our existing data with each other. To be more specific, what we're going to do is: <code>seriesField="category"</code> and <code>categoryField="series"</code>.</p>
        <Plot>
          <GridLayer 
            xMax={ 3 }
            yMax={ 8 }/>
          <GroupedBarLayer 
            max={ 8 }
            seriesField="category"
            categoryField="series"
            groupOffset={ 1.3 /* basically the spacing between series */}
            data={ data /* data I'm generating. */}/>
        </Plot>
        <Highlight>
{
`<Plot>
  <GridLayer 
    xMax={ 3 }
    yMax={ 8 }/>
  <GroupedBarLayer 
    max={ 8 }
    seriesField="category"
    categoryField="series"
    groupOffset={ 1.3 /* basically the spacing between series */}
    data={ data /* data I'm generating. */}/>
</Plot>`
}
        </Highlight>
        <p>The great thing about this system is you can share a single dataset with a large number of properties across multiple plots, and each plot can just define which of these properties to look at.</p>
      </section>
    )
  }
}

export class ScatterLayerSamples extends React.Component {
  render() {
    var data = _.times(8, n => ({
      x: Math.random() * 8,
      y: Math.random() * 8
    }));
    return (
      <section id="ScatterLayerSamples">
        <h2>Scatter Layer</h2>
        <Plot>
          <GridLayer
            xMax={ 8 }
            yMax={ 8 } />
          <ScatterLayer
            xMax={ 8 }
            yMax={ 8 }
            data={ data } />
        </Plot>
        <Highlight>
{
`<Plot>
  <GridLayer
    xMax={ 8 }
    yMax={ 8 } />
  <ScatterLayer
    xMax={ 8 }
    yMax={ 8 }
    data={ data } />
</Plot>`  
}
        </Highlight>
      </section>
    )
  }
}

export class MultiplePlots extends React.Component {
  constructor() {
    super();
    this.mouseoverDot = this.mouseoverDot.bind(this);
  }
  mouseoverDot(datapoint, element){
    let points = _.chain(["xy", "xz", "yz"])
      .map(p => this.refs[p]._chartLayer.circles)
      .flatten()
      .value();

    points.forEach(p => {
      if (p.datapoint === datapoint) {
        p.element.setAttribute("style", "fill: #d1603d");
        // p.element.setAttribute("r", 8);
      } else {
        p.element.setAttribute("style", "fill: #2D142C");
        // p.element.setAttribute("r", 4);
      }
    })
  }
  dotClassFunc(datapoint, indix) {
    if (datapoint.selected) {
      return "selected"
    } else {
      return ""
    }
  }
  drawFunc(depthAxis, datapoint, element) {
    element.setAttribute("r", 9 - datapoint[depthAxis]);
  }
  render() {
    var data = _.times(8, n => ({
      x: Math.random() * 8,
      y: Math.random() * 8,
      z: Math.random() * 8,
      selected: false
    }));
    return (
      <section id="MultiplePlots">
        <h2>Multiple Plots</h2>
        <Plotypus>
          <PlotypusRow>
            <PlotypusComponent>
              <Plot>
                <GridLayer xMax={ 8 } yMax={ 8 } />
                <ScatterLayer
                  ref="xy"
                  xMax={ 8 }
                  yMax={ 8 }
                  xField="x"
                  yField="y"
                  onMouseoverDot={ this.mouseoverDot }
                  classFunc={ this.dotClassFunc }
                  drawFunc={ this.drawFunc.bind(this, "z") }
                  data={ data } />
              </Plot>
            </PlotypusComponent>
            <PlotypusComponent><Axis max={ 8 }/></PlotypusComponent>
            <PlotypusComponent>
              <Plot>
                <GridLayer xMax={ 8 } yMax={ 8 } />
                <ScatterLayer
                  ref="yz"
                  xMax={ 8 }
                  yMax={ 8 }
                  xField="z"
                  yField="y"
                  onMouseoverDot={ this.mouseoverDot }
                  classFunc={ this.dotClassFunc }
                  drawFunc={ this.drawFunc.bind(this, "x") }
                  data={ data } />
              </Plot>
            </PlotypusComponent>
          </PlotypusRow>
          <PlotypusRow>
            <PlotypusComponent><Axis orientation="h" max={ 8 }/></PlotypusComponent>
            <Null />
            <PlotypusComponent>
              <Axis orientation="h" max={ 8 }/>
            </PlotypusComponent>
          </PlotypusRow>
          <PlotypusRow>
            <PlotypusComponent>
              <Plot>
                <GridLayer xMax={ 8 } yMax={ 8 } />
                <ScatterLayer
                  ref="xz"
                  xMax={ 8 }
                  yMax={ 8 }
                  xField="x"
                  yField="z"
                  onMouseoverDot={ this.mouseoverDot }
                  classFunc={ this.dotClassFunc }
                  drawFunc={ this.drawFunc.bind(this, "y") }
                  data={ data } />
              </Plot>
            </PlotypusComponent>
            <PlotypusComponent><Axis max={ 8 }/></PlotypusComponent>
            <Null />
          </PlotypusRow>
        </Plotypus>
        
        <Highlight>
{
`<Plot>
  <GridLayer
    xMax={ 8 }
    yMax={ 8 } />
  <ScatterLayer
    xMax={ 8 }
    yMax={ 8 }
    data={ data } />
</Plot>`  
}
        </Highlight>
      </section>
    )
  }
}
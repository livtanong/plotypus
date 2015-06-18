import React from "react";
import {PrismCode} from "react-prism";
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
  NumberAxis, 
  CategoryAxis
} from "../../../src/js/Plotypus.jsx";
import {sineFunc, data} from "../DataStore";

class ScatterLayerSamples extends React.Component {
  render() {
    var data = _.times(8, n => ({
      x: Math.random() * 8,
      y: Math.random() * 8
    }));
    return (
      <section id="ScatterLayerSamples">
        <h2>Scatter Layer</h2>
        <Plot>
          <GridLayer orientation="v" max={9} />
          <GridLayer orientation="h" max={8} />
          <ScatterLayer
            xMax={ 8 }
            yMax={ 9 }
            data={ data } />
        </Plot>
        <PrismCode className="code-block language-jsx">
{
`<Plot>
  <GridLayer orientation="v" max={9} />
  <GridLayer orientation="h" max={8} />
  <ScatterLayer
    xMax={ 8 }
    yMax={ 9 }
    data={ data } />
</Plot>`  
}
        </PrismCode>
      </section>
    )
  }
}

class MultiplePlots extends React.Component {
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
        p.element.setAttribute("r", 8);
      } else {
        p.element.setAttribute("style", "fill: #2D142C");
        p.element.setAttribute("r", 4);
      }
    })
  }
  drawFunc(depthAxis, datapoint, element) {
    // element.setAttribute("r", 4 + datapoint[depthAxis] * 0.5);
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
        <p>This will be one of the most complex charts you'll see on the Plotypus docs. Shown below are three plots showing three different planes of a three-dimensional plot. It will be as if you were looking at the top, front, and right sides of an aquarium, looking at fish, frozen in time.</p>
        <Plotypus>
          <PlotypusRow>
            <PlotypusComponent>
              <h4>XY Axis</h4>
            </PlotypusComponent>
            <Null />
            <PlotypusComponent>
              <h4>YZ Axis</h4>
            </PlotypusComponent>
          </PlotypusRow>
          <PlotypusRow>
            <PlotypusComponent>
              <Plot>
                <GridLayer orientation="h" max={8} />
                <GridLayer orientation="v" max={8} />
                <ScatterLayer
                  ref="xy"
                  xMax={ 8 }
                  yMax={ 8 }
                  xField="x"
                  yField="y"
                  onMouseoverDot={ this.mouseoverDot }
                  drawFunc={ this.drawFunc.bind(this, "z") }
                  data={ data } />
              </Plot>
            </PlotypusComponent>
            <PlotypusComponent><NumberAxis max={ 8 }/></PlotypusComponent>
            <PlotypusComponent>
              <Plot>
                <GridLayer orientation="h" max={8} />
                <GridLayer orientation="v" max={8} />
                <ScatterLayer
                  ref="yz"
                  xMax={ 8 }
                  yMax={ 8 }
                  xField="z"
                  yField="y"
                  onMouseoverDot={ this.mouseoverDot }
                  drawFunc={ this.drawFunc.bind(this, "x") }
                  data={ data } />
              </Plot>
            </PlotypusComponent>
          </PlotypusRow>
          <PlotypusRow>
            <PlotypusComponent><NumberAxis orientation="h" max={ 8 }/></PlotypusComponent>
            <Null />
            <PlotypusComponent>
              <NumberAxis orientation="h" max={ 8 }/>
            </PlotypusComponent>
          </PlotypusRow>
          <PlotypusRow>
            <PlotypusComponent>
              <h4>XZ Axis</h4>
            </PlotypusComponent>
            <Null />
            <Null />
          </PlotypusRow>
          <PlotypusRow>
            <PlotypusComponent>
              <Plot>
                <GridLayer orientation="h" max={8} />
                <GridLayer orientation="v" max={8} />
                <ScatterLayer
                  ref="xz"
                  xMax={ 8 }
                  yMax={ 8 }
                  xField="x"
                  yField="z"
                  onMouseoverDot={ this.mouseoverDot }
                  drawFunc={ this.drawFunc.bind(this, "y") }
                  data={ data } />
              </Plot>
            </PlotypusComponent>
            <PlotypusComponent><NumberAxis max={ 8 }/></PlotypusComponent>
            <Null />
          </PlotypusRow>
        </Plotypus>
        
        <PrismCode className="code-block language-jsx">
{
`<Plotypus>
  <PlotypusRow>
    <PlotypusComponent>
      <h4>XY Axis</h4>
    </PlotypusComponent>
    <Null />
    <PlotypusComponent>
      <h4>YZ Axis</h4>
    </PlotypusComponent>
  </PlotypusRow>
  <PlotypusRow>
    <PlotypusComponent>
      <Plot>
        <GridLayer orientation="h" max={8} />
        <GridLayer orientation="v" max={8} />
        <ScatterLayer
          ref="xy"
          xMax={ 8 }
          yMax={ 8 }
          xField="x"
          yField="y"
          onMouseoverDot={ this.mouseoverDot }
          drawFunc={ this.drawFunc.bind(this, "z") }
          data={ data } />
      </Plot>
    </PlotypusComponent>
    <PlotypusComponent><NumberAxis max={ 8 }/></PlotypusComponent>
    <PlotypusComponent>
      <Plot>
        <GridLayer orientation="h" max={8} />
        <GridLayer orientation="v" max={8} />
        <ScatterLayer
          ref="yz"
          xMax={ 8 }
          yMax={ 8 }
          xField="z"
          yField="y"
          onMouseoverDot={ this.mouseoverDot }
          drawFunc={ this.drawFunc.bind(this, "x") }
          data={ data } />
      </Plot>
    </PlotypusComponent>
  </PlotypusRow>
  <PlotypusRow>
    <PlotypusComponent><NumberAxis orientation="h" max={ 8 }/></PlotypusComponent>
    <Null />
    <PlotypusComponent>
      <NumberAxis orientation="h" max={ 8 }/>
    </PlotypusComponent>
  </PlotypusRow>
  <PlotypusRow>
    <PlotypusComponent>
      <h4>XZ Axis</h4>
    </PlotypusComponent>
    <Null />
    <Null />
  </PlotypusRow>
  <PlotypusRow>
    <PlotypusComponent>
      <Plot>
        <GridLayer orientation="h" max={8} />
        <GridLayer orientation="v" max={8} />
        <ScatterLayer
          ref="xz"
          xMax={ 8 }
          yMax={ 8 }
          xField="x"
          yField="z"
          onMouseoverDot={ this.mouseoverDot }
          drawFunc={ this.drawFunc.bind(this, "y") }
          data={ data } />
      </Plot>
    </PlotypusComponent>
    <PlotypusComponent><NumberAxis max={ 8 }/></PlotypusComponent>
    <Null />
  </PlotypusRow>
</Plotypus>`  
}
        </PrismCode>
      </section>
    )
  }
}

export default class SampleGuide extends React.Component {
  render() {
    return (
      <article id="Samples">
        <section>
          <h1>Samples</h1>
          <p>Here I'll be showing a few use cases—-some sensible, others absurdly extreme.</p>
        </section>
        <ScatterLayerSamples />
        <MultiplePlots />
      </article>
    )
  }
}
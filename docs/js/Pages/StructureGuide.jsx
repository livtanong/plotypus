import React from "react";
import Highlight from "../Highlight.jsx";
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

class PlotsAndLayers extends React.Component {
  render() {
    var singleSeries = data.filter(d => d.series === "a");
    return (
      <section id="PlotsAndLayers">
        <h2>Plots and Layers</h2>
        <p>The <code>Plot</code> component is the most important of the components, and structurally, they are unique in that they have <strong>layers</strong>. Layers are graphical elements that stack on top of each other and take up the same area. Currently, only Plots have layers, but over time this may change.</p>
        <p>We'll use <code>GridLayer</code>, <code>GroupedBarLayer</code>, and <code>FuncLayer</code> to demonstrate the concept of layers.</p>
        <p>For now, you can ignore the properties I'm passing to each layer, as I will expound on them later on, but you can also study them now if you like.</p>
        <Plot>
          <GridLayer orientation="v" max={9} />
          <GroupedBarLayer 
            max={ 9 }
            data={ singleSeries /* data I'm generating. */}/>
          <FuncLayer
            xMax={ 8 }
            yMax={ 9 }
            func={ sineFunc /* the sine wave on which sineData is based */}
            samples={ 64 }/>
        </Plot>
        <Highlight className="solarized_light">
{
`<Plot>
  <GridLayer orientation="v" max={9} />
  <GroupedBarLayer 
    max={ 9 }
    data={ singleSeries /* data I'm generating. */}/>
  <FuncLayer
    xMax={ 8 }
    yMax={ 9 }
    func={ sineFunc /* the sine wave on which sineData is based */}
    samples={ 64 }/>
</Plot>`
}
        </Highlight>
      </section>
    )
  }
}

class Composition extends React.Component {
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
              <NumberAxis orientation="v" max={ 0.008 }/>
            </PlotypusComponent>

            <PlotypusComponent>
              <Plot>
                <GridLayer orientation="v" max={9} />
                <GroupedBarLayer 
                  max={ 9 }
                  data={ singleSeries /* data I'm generating. */}/>
                <FuncLayer
                  xMax={ 8 }
                  yMax={ 9 }
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
      <NumberAxis orientation="v" max={ 0.008 }/>
    </PlotypusComponent>

    <PlotypusComponent>
      <Plot>
        <GridLayer orientation="v" max={9} />
        <GroupedBarLayer 
          max={ 9 }
          data={ singleSeries /* data I'm generating. */}/>
        <FuncLayer
          xMax={ 8 }
          yMax={ 9 }
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
</Plotypus>`
}
        </Highlight>

      </section>
    )
  }
}

export default class StructureGuide extends React.Component {
	render() {
		return (
			<article id="Structure">
			  <section>
			    <h1>Structure</h1>
			    <p>There are two things you need to know about the structure of Plotypus charts. First, <code>Plot</code>s are layered, and second, they can be composed with other Plotypus components like <code>Axis</code> and <code>AxisLabel</code>, and even other <code>Plot</code>s, by way of a tabular layouting system.</p>
			    <aside>Note: because we are using react, all comments that would have used the HTML comment, <code>{"<!-- -->"}</code>, will instead use the react comment, <code>{"{/* */}"}</code>.</aside>
			  </section>
			  <PlotsAndLayers />
			  <Composition />
			</article>
		)
	}
}
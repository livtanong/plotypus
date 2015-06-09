import React from "react";
import {Link} from "react-router";

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

class DataFormat extends React.Component {
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
          <GridLayer orientation="v" max={9} />
          <GroupedBarLayer 
            max={ 9 }
            groupOffset={ 1.3 /* basically the spacing between series */}
            data={ data /* data I'm generating. */}/>
        </Plot>
        <Highlight>
{`<Plot>
  <GridLayer orientation="v" max={9} />
  <GroupedBarLayer 
    max={ 9 }
    groupOffset={ 1.3 /* basically the spacing between series */}
    data={ data /* data I'm generating. */}/>
</Plot>`}
        </Highlight>
      </section>
    )
  }
}

class ArbitraryKeys extends React.Component {
  render() {
    return (
      <section id="ArbitraryKeys">
        <h2>Arbitrary Keys</h2>
        <p><em>But what if the data I have don't have the right property names?</em> We got you covered. All layers that accept data have a fieldnameField prop.</p>
        <p>For <code>GroupedBarLayer</code>, it's <code>seriesField</code>, <code>categoryField</code>, <code>valueField</code></p>
        <p>For this next example, we can do something crazy and switch the series and categories of our existing data with each other. To be more specific, what we're going to do is: <code>seriesField="category"</code> and <code>categoryField="series"</code>.</p>
        <Plot>
          <GridLayer orientation="v" max={9} />
          <GroupedBarLayer 
            max={ 9 }
            seriesField="category"
            categoryField="series"
            groupOffset={ 1.3 /* basically the spacing between series */}
            data={ data /* data I'm generating. */}/>
        </Plot>
        <Highlight>
{
`<Plot>
  <GridLayer orientation="v" max={9} />
  <GroupedBarLayer 
    max={ 9 }
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

export default class DataGuide extends React.Component {
  render() {
    return (
      <article id="Data">
        <section>
          <h1>Data</h1>
          <p>There are a number of things to consider when supplying Plotypus <code>Plot</code> layers data.</p>
          <p>Plotypus likes thinking about data as a set of points in n-dimensional space. <em>Whoa, n-dimensional space? How did we get here?</em> Relax, young padawan. It isn't as complicated as it sounds.</p>
        </section>
        <DataFormat />
        <ArbitraryKeys />
      </article>
    )
  }
}
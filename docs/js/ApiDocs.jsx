import React from "react";
import {Plotypus, PlotypusRow, Chart, GroupedBarLayer} from "../../src/js/Plotypus.jsx";

export default class ApiDocs extends React.Component {
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
			<div className="ApiDocs split-pane">
				<div className="sidebar">
					<div>
						<h4>Structure</h4>
						<ul>
							<li><a>Plotypus</a></li>
							<li><a>PlotypusRow</a></li>
						</ul>
					</div>
				</div>
				<div className="main">
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
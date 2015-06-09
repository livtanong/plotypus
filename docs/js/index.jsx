import DocStyles from "../scss/Docs.scss";
import Styles from "../scss/styles.scss";
import IconStyles from "../icons/style.css";
import HighlightStyles from "../scss/solarized_light.css"
import IAmSorry from "./IAmSorry";

import React from "react";
import Router, {DefaultRoute, Link, Route, RouteHandler} from "react-router";


import Home from "./Pages/Home";
import Guide from "./Pages/Guide";
import Toolbar from "./Toolbar";
import Plotypus from "../../src/js/Plotypus";

import StructureGuide from "./Pages/StructureGuide";
import DataGuide from "./Pages/DataGuide";
import SampleGuide from "./Pages/SampleGuide";


class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Docs">
      	<Toolbar />
        <RouteHandler />
      </div>
    );
  }
}

let routes = (
	<Route name="index" path="/" handler={ Index }>
		<Route name="guide" path="/guide" handler={ Guide }>
			<Route name="structureGuide" path="/guide/structure" handler={ StructureGuide } />
			<Route name="dataGuide" path="/guide/data" handler={ DataGuide } />
			<Route name="sampleGuide" path="/guide/sample" handler={ SampleGuide } />
			<DefaultRoute handler={ StructureGuide } />
		</Route>
		<DefaultRoute name="home" handler={ Home }/>
	</Route>
)

let Root = Router.create({
	routes: routes
});

Root.run(function(Handler) {
	if (typeof document != "undefined") {
		React.render(<Handler />, document.body);
	}
});

console.log(Root);

// let RootString = React.renderToStaticMarkup(<Root />);
export default Root;
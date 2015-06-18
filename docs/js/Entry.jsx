import React from "react";
import Router, {DefaultRoute, Link, Route, RouteHandler} from "react-router";

import Index from "./Index";
import Wrapper from "./Wrapper";
import Guide from "./Pages/Guide";

import StructureGuide from "./Pages/StructureGuide";
import DataGuide from "./Pages/DataGuide";
import SampleGuide from "./Pages/SampleGuide";

let Routes = (
	<Route name="index" path="/" handler={ Wrapper }>
		<Route name="guide" path="guide/" handler={ Guide }>
			<Route name="structureGuide" path="guide/structure/" handler={ StructureGuide } />
			<Route name="dataGuide" path="guide/data/" handler={ DataGuide } />
			<Route name="sampleGuide" path="guide/sample/" handler={ SampleGuide } />
			<DefaultRoute handler={ StructureGuide } />
		</Route>
		<DefaultRoute name="home" handler={ Index }/>
	</Route>
)

let PlotypusRouter = Router.create({
	routes: Routes
});

if (typeof document !== "undefined") {
	Router.run(Routes, Router.HistoryLocation, Handler => {
		React.render(<Handler />, document);
	})
}

export default function render (locals, callback) {
	Router.run(Routes, locals.path, Handler => {
		let html = React.renderToString(<Handler />);
    callback(null, "<!DOCTYPE html>" + html);
  });
}
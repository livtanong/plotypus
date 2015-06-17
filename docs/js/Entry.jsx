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
		<Route name="guide" path="/guide" handler={ Guide }>
			<Route name="structureGuide" path="/guide/structure" handler={ StructureGuide } />
			<Route name="dataGuide" path="/guide/data" handler={ DataGuide } />
			<Route name="sampleGuide" path="/guide/sample" handler={ SampleGuide } />
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

// <html>
// 	<head>
// 		<title>Plotypus Documentation</title>
// 		<link href='http://fonts.googleapis.com/css?family=Roboto:300,700,400' rel='stylesheet' type='text/css' />
// 		<link href="build/bundle.css" rel='stylesheet' type='text/css' />
// 	</head>
// 	<body>
// 		<Toolbar />
// 		<RouteHandler />
// 		<script src="build/docs.js" />
// 	</body>
// </html>

export default function render (locals, callback) {
	Router.run(Routes, locals.path, Handler => {
		// let eh = (
		// 	<html>
		// 		<head>
		// 			<title>Plotypus Documentation</title>
		// 			<link href='http://fonts.googleapis.com/css?family=Roboto:300,700,400' rel='stylesheet' type='text/css' />
		// 			<link href="build/bundle.css" rel='stylesheet' type='text/css' />
		// 		</head>
		// 		<body>
		// 			<Handler />
		// 			<script src="build/docs.js" />
		// 		</body>
		// 	</html>
		// )
		let html = React.renderToString(<Handler />);
    callback(null, "<!DOCTYPE html>" + html);
  });
}
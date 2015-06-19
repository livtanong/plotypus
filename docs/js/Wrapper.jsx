import DocStyles from "../scss/Docs.scss";
import Styles from "../scss/styles.scss";
import IconStyles from "../icons/style.css";
import HighlightStyles from "../scss/solarized_light.css"
import PrismStyles from "../scss/prism.css";
import IAmSorry from "./IAmSorry";

import React from "react";
import Router, {RouteHandler} from "react-router";
import Toolbar from "./Toolbar";

import Prism from "./prism";

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

/*<main>
				<Toolbar />
				<RouteHandler />
			</main>*/

class Wrapper extends React.Component {
	render() {
		return (
			<html>
				<head>
					<title>Plotypus Documentation</title>
					<meta charSet="utf-8" /> 
					<link href='http://fonts.googleapis.com/css?family=Roboto:300,700,400' rel='stylesheet' type='text/css' />
					<link href="/bundle.css" rel='stylesheet' type='text/css' />
				</head>
				<body>
					<main>
						<Toolbar />
						<RouteHandler />
					</main>
					<script src="/docs.js" />
				</body>
			</html>
			
		)
	}
}

export default Wrapper;
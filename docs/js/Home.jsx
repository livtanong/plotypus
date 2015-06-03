import React from "react";
import Isvg from "react-inlinesvg";

export default class Home extends React.Component {
	render() {
		return (
			<div className="Home">
				<div id="hero">
					<div id="logo">
						<Isvg src="/docs/svg-icons/SVG/plotypus.svg">
							Error: Logo did not load.
						</Isvg>
					</div>
					<div>
						<h1>Plotypus</h1>
						<h2>An out of the box way of thinking inside the box. Of charts.</h2>
					</div>
				</div>
			</div>
		)
	}
}
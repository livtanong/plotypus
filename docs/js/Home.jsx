import React from "react";
import PlotypusIcon from "../svg-icons/SVG/plotypus.svg";

export default class Home extends React.Component {
	render() {
		return (
			<div className="Home">
				<div id="hero">
					<div id="logo">
						<img src={PlotypusIcon} />
					</div>
					<div>
						<h1>Plotypus</h1>
						<h2>A charting library built for React</h2>
					</div>
				</div>
			</div>
		)
	}
}
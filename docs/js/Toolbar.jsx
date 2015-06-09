import React from "react";
import {Link} from "react-router";

export default class Toolbar extends React.Component {
	render() {
		return (
			<header className="toolbar">
				<Link id="brand" to="index">
				  <h1>Plotypus <small>v0.0.32</small></h1>
				</Link>
				<div className="spacer" />
				<div className="toolbar-group">
					<Link className="toolbar-item" to="home">Home</Link>
					<Link className="toolbar-item" to="guide">Guide</Link>
					<a className="toolbar-item" href="https://github.com/levitanong/plotypus">
            Github
        	</a>
				</div>
			</header>
		)
	}
}
import React from "react";
import Docs from "./Docs";
import Home from "./Home";
import Guide from "./Guide";
import Toolbar from "./Toolbar";
import Plotypus from "../../src/js/Plotypus";


import Router, {DefaultRoute, Link, Route, RouteHandler} from "react-router";

export class Index extends React.Component {
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
		<Route name="guide" path="/guide" handler={ Guide } />
		<DefaultRoute name="home" handler={ Home }/>
	</Route>
)

let Root = Router.create({routes :routes});

Root.run(function(Handler) {
	if (typeof document != "undefined") {
		React.render(<Handler />, document.body);
	}
})

export default Root;
import React from "react";
import Docs from "./Docs.jsx";
import Plotypus from "../../src/js/Plotypus.jsx";

if (typeof document != "undefined") {
	var app = React.render(
	  <Docs />,
	  document.getElementById('docs')
	);
}

export default app;
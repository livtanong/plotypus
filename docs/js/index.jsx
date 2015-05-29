import Styles from "../scss/styles.scss"

import React from "react";
import Docs from "./Docs.jsx";
import Plotypus from "../../src/js/Plotypus.jsx";

var app = React.render(
  <Docs />,
  document.getElementById('docs')
);
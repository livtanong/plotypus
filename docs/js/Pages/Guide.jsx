import React from "react";
import Router, {DefaultRoute, Link, Route, RouteHandler} from "react-router";
import Highlight from "../Highlight";

export default class Guide extends React.Component {
  render() {
    return (
      <div className="Guide split-pane">
        <div className="sidebar table-of-contents">
          <div>
            <h4>
              <Link to="structureGuide">Structure</Link>
            </h4>
            <ul>
              <li><a >Plots and Layers</a></li>
              <li><a >Composition</a></li>
            </ul>
          </div>
          <div>
            <h4>
              <Link to="dataGuide">Data</Link>
            </h4>
            <ul>
              <li><a >Format</a></li>
              <li><a >Arbitrary Keys</a></li>
            </ul>
          </div>
          <div>
            <h4>
              <Link to="sampleGuide">Samples</Link>
            </h4>
            <ul>
              <li><a >Scatter Layer Samples</a></li>
              <li><a >Multiple Plots</a></li>
            </ul>
          </div>
        </div>
        <div className="main">
          <RouteHandler />
        </div>
      </div>
    )
  }
}
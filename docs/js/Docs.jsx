import Style from "../scss/Docs.scss";

import React from "react";
import _ from "lodash";
import {Plotypus, PlotypusRow, Chart, GroupedBarLayer} from "../../src/js/Plotypus.jsx";

import ApiDocs from "./ApiDocs";
import Home from "./Home";
import Guide from "./Guide";

export default class Docs extends React.Component {
  constructor(props) {
    super(props);

    this.views = {
      "HOME": "HOME",
      "GUIDE": "GUIDE",
      "API": "API"
    }

    this.state = {
      currentView: this.views.HOME
    }
  }
  changeView(view) {
    this.setState({currentView: view});
  }
  render() {
    var views = function(){
      switch (this.state.currentView) {
        case this.views.HOME:
          return <Home />
          break;
        case this.views.GUIDE:
          return <Guide />
          break;
        case this.views.API:
          return <ApiDocs />
          break;
        default:
          console.log("illegal currentView");
      }
    }.bind(this);

    var nav = _.keys(this.views).map((view) => 
      (<a className="toolbar-item" key={ view } onClick={ this.changeView.bind(this, view) }>{ view.toLowerCase() }</a>)
    )
    // var nav = _.keys(this.views).map(function(view){
    //   return (<a onClick={ this.changeView(view) }>{ view.toLowerCase() }</a>)
    // }, this);

    return (
      <div className="Docs">
        <div className="toolbar">
          <h1>Plotypus</h1>
          <div className="spacer" />
          <div>
            { nav }
          </div>
        </div>
        { views() }
      </div>
    );
  }
}
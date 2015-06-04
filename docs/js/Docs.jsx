import DocStyles from "../scss/Docs.scss";
import Styles from "../scss/styles.scss";
import IconStyles from "../icons/style.css";
import HighlightStyles from "../scss/solarized_light.css"
import PlotypusStyles from "../../src/scss/Plotypus.scss";

import React from "react";
import _ from "lodash";
import classnames from "classnames";

import ApiDocs from "./ApiDocs";
import Home from "./Home";
import Guide from "./Guide";

export default class Docs extends React.Component {
  constructor(props) {
    super(props);

    this.views = {
      "HOME": "HOME",
      "GUIDE": "GUIDE",
      /*"API": "API"*/
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
      (
        <a className={ classnames("toolbar-item", {"active": view === this.state.currentView}) } 
          key={ view } 
          onClick={ this.changeView.bind(this, view) }>
          { view.toLowerCase() }
        </a>
      )
    );
    // var nav = _.keys(this.views).map(function(view){
    //   return (<a onClick={ this.changeView(view) }>{ view.toLowerCase() }</a>)
    // }, this);

    return (
      <div className="Docs">
        <div className="toolbar">
          <a id="brand" onClick={ this.changeView.bind(this, this.views.HOME) }>
            <h1>Plotypus <small>v0.0.0.0...0.1</small></h1>
          </a>
          <div className="spacer" />
          <div className="toolbar-group">
            { nav }
            <a className="toolbar-item" href="https://github.com/levitanong/plotypus">
              Github
            </a>
          </div>
        </div>
        { views() }
      </div>
    );
  }
}
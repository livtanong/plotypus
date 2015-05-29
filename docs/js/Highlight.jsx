import hljs from "highlight.js";
import React from "react";
import _ from "lodash";

export default class Highlight extends React.Component {
  constructor(props) {
    super(props);
    this.defaultProps = {
      innerHTML: false
    }
  }
  componentDidMount() {
    this.highlightCode();
  }
  componentDidUpdate() {
    this.highlightCode();
  }
  highlightCode() {
    var nodes = React.findDOMNode(this).querySelectorAll('pre code');
    _.forEach(nodes, node => hljs.highlightBlock(node));
  }
  render() {
    if (this.props.innerHTML) {
      return <div dangerouslySetInnerHTML={{__html: this.props.children}} className={this.props.className || null}></div>;
    } else {
      return <pre><code className={this.props.className}>{this.props.children}</code></pre>;
    }
  }
}
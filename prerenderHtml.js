var React = require('react');
var Docs = require('./docs/js/Docs');

var indexHtml = require('./docs/index.html');
var indexComponent = React.renderToString(React.createElement(Docs, {isPrerender: true}));

module.exports = indexHtml.replace('Loading', indexComponent);


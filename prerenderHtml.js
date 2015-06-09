var React = require('react');
var Index = require('./docs/js/index');
var IndexString = require('./docs/js/index');

var indexHtml = require('./docs/index.html');
// var IndexString = React.renderToStaticMarkup(<Index />);

module.exports = indexHtml.replace('Loading', IndexString);


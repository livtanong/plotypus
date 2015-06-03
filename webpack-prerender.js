var React = require('react');
var Docs = require('./docs/js/index');

var indexHtml = require('./index.html');
var indexComponent = React.renderToString(React.createElement(Docs, {isPrerender: true}));

module.exports = {
	'index': indexHtml.replace('CONTENT', indexComponent),
};


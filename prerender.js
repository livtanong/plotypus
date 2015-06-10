var _ = require("lodash");
var mkdirp = require("mkdirp");
var routes = require("./build/routes"); // this is built from webpack-preprerender.config.js
// console.log(routes.namedRoutes);

_.forEach(routes.namedRoutes, function(route, routeName) {
	console.log(routeName, route);
	// can mkdirp, but how to set paths without cluttering shit?
})



var global = this;
var prerendered = require('./build/prerenderHtml');
var fs = require('fs');

fs.writeFileSync('./index.html', prerendered);

// not a typo. this really should be run before the prerender config.

var config = require('./webpack-base.config.js')({
	docs: true,
	preprerender: true,
	prerender: false
});

module.exports = config;

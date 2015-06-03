var config = require('./webpack-base.config.js')({
    production: false,
    docs: true
});

config.externals = {
  'velocity-animate': 'fs',
  "react-inlinesvg": "fs",
  "react": "react"
};

config.entry = { 'webpack-prerender': './webpack-prerender' };
config.output.libraryTarget = 'commonjs2';

module.exports = config;

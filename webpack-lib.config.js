var config = require('./webpack-base.config.js')({
  docs: false,
  prerender: false,
  lib: true
});

module.exports = config;

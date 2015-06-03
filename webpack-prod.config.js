var config = require('./webpack-base.config.js')({
    production: true,
    docs: false
});

config.externals = {
  "react": "react"
};

module.exports = config;

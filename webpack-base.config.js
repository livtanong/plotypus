var _ = require("lodash");
var path = require("path");
var bourbon = require('node-bourbon').includePaths;
var webpack = require('webpack');
var mkdirp = require("mkdirp");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

var baseConfig = function(options) {

  var plugins = [
    new ExtractTextPlugin("bundle.css") // cssPlugin
  ];
  // var pageLoaders = [
  //   {
  //     test: path.resolve(__dirname, "docs/js/Pages"),
  //     // test: path.resolve(__dirname, "docs/js/Pages"),
  //     loader: "react-router-proxy!babel-loader"
  //   }
  // ]
  // var pageLoaders = [];
  var styleLoaders = [
    { test: /\.css$/, loader: "css" },
    { test: /\.s(a|c)ss$/, loader: "css!sass?includePaths[]="+bourbon }
  ];
  styleLoaders.forEach(function(item) {
    // if array normalize to string
    if(Array.isArray(item.loader)) {
      item.loader = item.loader.join("!");
    }

    item.loader = ExtractTextPlugin.extract('style-loader', item.loader);

    // if(options.docs || options.lib) {
    //   item.loader = ExtractTextPlugin.extract('style-loader', item.loader);
    // } else if (options.prerender) {
    //   item.loader = 'null';
    // } else {
    //   item.loader = 'style!'+item.loader;
    // }
  });

  // plugins.push(new webpack.DefinePlugin({
  //   "__production": options.production,
  // }));

  var entry = path.resolve(__dirname, "docs/js/entry.jsx");
  // var cache = true;
  var output = {
    path: path.resolve(__dirname, "build"),
    publicPath: '/', // formerly /build/
    filename: 'docs.js',
    libraryTarget: "umd"
  }

  if (options.lib) {
    entry = {PlotypusStyle: path.resolve(__dirname, "docs/js/IAmSorry.jsx")};
    output.path = "lib";
    output.publicPath = "./lib/";
    output.libraryTarget = "umd";
    cssPlugin = new ExtractTextPlugin("Plotypus.css");
  } else {
    var routePaths = [
      "/",
      "/guide/",
      "/guide/data/",
      "/guide/sample/",
      "/guide/structure/"
    ]

    plugins.push(
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false
      //   }
      // }),
      // new webpack.DefinePlugin({
      //   "process.env": {
      //     NODE_ENV: JSON.stringify("production")
      //   }
      // }),
      new StaticSiteGeneratorPlugin("docs.js", routePaths)
    );
  }

  return {
    entry: entry,
    output: output,
    resolve: {
      // alias: { lib: path.resolve(__dirname, '/js/lib') },
      extensions: ['', '.js', '.jsx']
    },
    plugins: plugins,
    externals: (options.lib 
      ? {"react": "react"} 
      : {}),
    module: {
      loaders: styleLoaders.concat([
        { test: /\.html$/, loader: 'html' },
        { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
        { test: /\.woff($|\?)/,   loader: "url?limit=10000&mimetype=application/font-woff" },
        { test: /\.woff2($|\?)/,  loader: "url?limit=10000&mimetype=application/font-woff2" },
        { test: /\.ttf($|\?)/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
        { test: /\.eot($|\?)/,    loader: "file" },
        { test: /\.svg($|\?)/,    loader: "url?limit=10000&mimetype=image/svg+xml" },
        { test: /\.png($|\?)/,    loader: "url?limit=10000&mimetype=image/png" },
        { test: /\.jpg($|\?)/,    loader: "url?limit=10000&mimetype=image/jpeg" },
        { test: /\.ico($|\?)/,    loader: "url?limit=10000&mimetype=image/x-icon" }
      ])//.concat(pageLoaders)
    }
  }

}

module.exports = baseConfig;
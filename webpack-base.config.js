var bourbon = require('node-bourbon').includePaths;
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");

var baseConfig = function(options) {
  var plugins = [];
  var pageLoaders = [
    {
      test: path.resolve(__dirname, "docs/js/Pages"),
      loader: "react-router-proxy!babel-loader"
    }
  ]
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

    if(options.docs || options.lib) {
      item.loader = ExtractTextPlugin.extract('style-loader', item.loader);
    } /*else if (options.prerender) {
      item.loader = 'null';
    }*/ else {
      item.loader = 'style!'+item.loader;
    }
  });

  // plugins.push(new webpack.DefinePlugin({
  //   "__production": options.production,
  // }));

  var cssPlugin = new ExtractTextPlugin("bundle.css");
  var entry = {docs: path.resolve(__dirname, "docs/js/index.jsx")};
  var externals = {};
  var cache = true;
  var output = {
    path: 'build',
    publicPath: '/build/',
    filename: '[name].js',
  }

  if (options.docs) {
    plugins.push(
      cssPlugin,
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      })
    );
  }

  if (options.preprerender) {
    entry = {"routes": path.resolve(__dirname, "docs/js/index.jsx")};
    pageLoaders = [];
    output.libraryTarget = "commonjs2";
  }

  if (options.prerender) {
    output.publicPath = "build/"
    entry = {"prerenderHtml": path.resolve(__dirname, "prerenderHtml")};
    pageLoaders = [];
    output.libraryTarget = "commonjs2";
  }

  if (options.lib) {
    entry = {PlotypusStyle: path.resolve(__dirname, "docs/js/IAmSorry.jsx")};
    output.path = "lib";
    output.publicPath = "./lib/";
    output.libraryTarget = "commonjs2";
    cache = false;
    externals = {
      "react": "react"
    }
    cssPlugin = new ExtractTextPlugin("Plotypus.css");
    plugins.push(cssPlugin);
  }

  return {
    __extra: {
      cssPlugin: cssPlugin
    },
    entry: entry,
    output: output,
    resolve: {
      alias: { lib: __dirname+'/js/lib' },
      extensions: ['', '.js', '.jsx']
    },
    plugins: plugins,
    externals: externals,
    cache: cache,
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
      ]).concat(pageLoaders)
    }
  }

}

module.exports = baseConfig;
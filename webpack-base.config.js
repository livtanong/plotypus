var _ = require("lodash");
var path = require("path");
var bourbon = require('node-bourbon').includePaths;
var webpack = require('webpack');
var mkdirp = require("mkdirp");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

var baseConfig = function(options) {

  // if (options.prerender) {
    
  //   console.log(routePaths);
  // }


  var plugins = [];
  var pageLoaders = [
    {
      include: [
        path.resolve(__dirname, "docs/js/Pages")
      ],
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
  var entry = {docs: "./docs/js/index.jsx"};
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
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      })
    );
  }

  if (options.preprerender) {
    entry = {"routes": "./docs/js/index.jsx"};
    pageLoaders = [];
    output.libraryTarget = "commonjs2";
  }

  if (options.prerender) {
     // this is built from webpack-preprerender.config.js
    // _.forEach(routes.namedRoutes, function(route, routeName) {
    //    mkdirp("." + route.path, function(err) {
    //      if (err) console.error(err);
    //      else {
    //        console.log("made path for", routeName);
    //        // create indices for each path.
           
    //      }
    //    })
    // });

    // console.log(routes);
    var routes = require("./build/routes");
    var routePaths = _.uniq(_.pluck(routes.namedRoutes, "path"));

    output.publicPath = "./build/"
    entry = {"prerenderHtml": "./prerenderHtml"};
    pageLoaders = [];
    output.libraryTarget = "commonjs2";

    var pathToIndex = path.resolve(__dirname, "build/routes.js");
    plugins.push(new StaticSiteGeneratorPlugin("routes.js", routePaths));
  }

  if (options.lib) {
    entry = {PlotypusStyle: "./docs/js/IAmSorry.jsx"};
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
var bourbon = require('node-bourbon').includePaths;

var styleLoaders = [
{ test: /\.css$/, loader: "css" },
{ test: /\.s(a|c)ss$/, loader: "css!sass?includePaths[]="+bourbon }
];
styleLoaders.forEach(function(item) {
  // if array normalize to string
  if(Array.isArray(item.loader)) {
    item.loader = item.loader.join("!");
  }

  // if(options.production) {
  //   item.loader = ExtractTextPlugin.extract('style-loader', item.loader);
  // } else {
    item.loader = 'style!'+item.loader;
  // }
});


module.exports = {
  entry: "./docs/js/index.jsx",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  resolve: {
    alias: { lib: __dirname+'/js/lib' },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: styleLoaders.concat([
      { test: /\.html$/, loader: 'html' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"}
    ])
  }
}
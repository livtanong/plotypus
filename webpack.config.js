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
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.woff($|\?)/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2($|\?)/,  loader: "url?limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf($|\?)/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot($|\?)/,    loader: "file" },
      { test: /\.svg($|\?)/,    loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.png($|\?)/,    loader: "url?limit=10000&mimetype=image/png" },
      { test: /\.jpg($|\?)/,    loader: "url?limit=10000&mimetype=image/jpeg" },
      { test: /\.ico($|\?)/,    loader: "url?limit=10000&mimetype=image/x-icon" }
    ])
  }
}
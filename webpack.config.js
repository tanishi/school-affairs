"use strict";

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + "/public/js",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }
};

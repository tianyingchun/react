'use strict';

var webpack = require('webpack');

module.exports = function () {
  var config = require('./webpack.base.config')();

  // Add source mapping for debuging.
  config.devtool = 'source-map';

  // Provider special entry point in development phase,
  // it will be able to get live reloads when doing changes to our source code.
  // config.entry.member.unshift('webpack/hot/only-dev-server');
  // config.entry.member.unshift('webpack-dev-server/client?http://localhost:3000');

  // plugins for development
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      // for isomophic server ignore import stylesheet.
      // if (process.env.BROWSER) {
      //   require("./style.css");
      // }
      'process.env.BROWSER': JSON.stringify(true),
    })
  ]);

  // loaders for development
  config.module.loaders.push({
    test: /\.js$/,
    loaders: ['react-hot', 'babel-loader'],
    exclude: /node_modules/
  });
  return config;
};

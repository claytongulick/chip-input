/*
 *   Copyright (c) 2021 Ratio Software, LLC 
 *   All rights reserved.
 *   @author Clayton Gulick <clay@ratiosoftware.com>
 */
let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

let config = {
  context: __dirname,
  entry: './app.js',
  output: {
    path: __dirname + '/dist'
  },
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    devMiddleware: {
      publicPath: '/',
    },
    client: {
      overlay: true,
      progress: true
    }
  },
  plugins: [
    /*new CleanWebpackPlugin(),*/
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'index.html'),
        to: path.resolve(__dirname, 'dist')
      },
    ]
    ),
  ]
};

module.exports = config;
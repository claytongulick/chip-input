let path = require('path');

let config = {
    entry: './app.js',
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        publicPath: '/',
        overlay: {
            warnings: true,
            errors: true
        }
  }
};

module.exports = config;
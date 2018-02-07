const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  output: {
    path: path.resolve('./dist'),
    filename: '[name]-[hash].js'
  },
  devServer: {
    port: 8080,
    inline: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../dist')
  }
})
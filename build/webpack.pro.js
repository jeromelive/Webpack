const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle-[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin('../dist/*.js', {
      root: __dirname, // 根目录
      verbose: true, // 开启在控制台输出信息
      dry: false // 启用删除文件
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
})
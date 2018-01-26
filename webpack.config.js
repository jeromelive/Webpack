const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = function buildCon(env) {
  console.log(env);
  // return require('./build/webpack.temp.conf.js');
  return {
    entry: path.resolve('./src/main.js'),
    output: {
      path: path.resolve('./dist'),
      filename: 'bundle-[hash].js'
    },
    devServer: {
      port: 8081,
      contentBase: './dist',
      historyApiFallback: true,
      inline: true
    },
    plugins: [
      new webpack.BannerPlugin('版权所有，翻版必究'),
      new htmlWebpackPlugin({
        template: __dirname + '/index.templ.html'
      }),
      new CleanWebpackPlugin('dist/*.*', {
        root: __dirname,
        verbose: true,
        dry: true
      })
    ]
  }
}
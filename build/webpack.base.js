const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },{
            loader: 'css-loader',
            options: {
              modules: true
            }
          }, {
            loader: 'postcss-loader'
          }, {
            loader: ExtractTextPlugin.extract('style', 'css')
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('看到备注？'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.template.html')
    }),
    new ExtractTextPlugin('[name].css')
  ]
}
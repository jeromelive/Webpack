const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.js'),
    vendor: ['react', 'react-dom']
  },
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
        // 分离 css 
        // extract-text-webpack-plugin 3.0 写法
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
        // 下面是不分离css打包
        // use: [
        //   {
        //     loader: 'style-loader'
        //   },{
        //     loader: 'css-loader',
        //     options: {
        //       modules: true
        //     }
        //   }, {
        //     loader: 'postcss-loader'
        //   }
        // ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('看到备注？'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.template.html')
    }),
    new ExtractTextPlugin('[name]-[hash].css')
  ]
}
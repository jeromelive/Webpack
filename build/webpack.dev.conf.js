"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf");
const config = require("./build.conf");
const utils = require("./utils");

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(name => {
  baseWebpackConfig.entry[name] = ["./build/dev-client"].concat(
    baseWebpackConfig.entry[name]
  );
});

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  // eval-source-map is faster for development
  devtool: "#source-map",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('master'),
      __DEV__: true
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js"
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      href: '/',
      title: "我来贷客服系统",
      filename: "index.html",
      template: "index.html",
      inject: true,
      favicon: "client/assets/logo.png"
    })
  ]
});

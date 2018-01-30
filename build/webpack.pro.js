const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// const cleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');

// 暂时替换清除工作
function cleanDir(dir) {
  let files = fs.readdirSync(dir);
  files.forEach((file) => {
    let stats = fs.statSync(dir + '/' + file);
    if (stats.isDirectory()) {
      cleanDir(dir + '/' + file);
    } else {
      fs.unlinkSync(dir + '/' + file);
      console.log("删除文件" + dir + '/' + file + "成功");
    }
  })
}
cleanDir('dist');

module.exports = merge(baseConfig, {
  output: {
    path: path.resolve('./dist'),
    filename: '[name]-[hash].js'
  },
  plugins: [
    // new cleanWebpackPlugin(['../dist'], {
    //   root: __dirname, // 根目录
    //   verbose: true, // 开启在控制台输出信息
    //   dry: false // 启用删除文件
    // }),
    new webpack.optimize.UglifyJsPlugin()
  ]
})
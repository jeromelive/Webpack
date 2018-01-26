const path = require('path');
module.exports = function buildCon(env) {
  console.log(env);
  // return require('./build/webpack.temp.conf.js');
  return {
    entry: path.resolve('./src/main.js'),
    output: {
      path: path.resolve('./dist'),
      filename: 'bundle.js'
    }
  }
}
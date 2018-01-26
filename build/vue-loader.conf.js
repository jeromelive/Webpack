"use strict";

const utils = require("./utils");
const config = require("./build.conf");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require("autoprefixer")({
      browsers: ["last 3 versions"]
    })
  ]
};

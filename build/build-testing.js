// https://github.com/shelljs/shelljs
"use strict";

require("./check-versions")();
require("shelljs/global");

env.NODE_ENV = "testing";

const ora = require("ora");
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const config = require("./build.conf");
const webpackConfig = require("./webpack.test.conf");

const spinner = ora("building for testing...");
spinner.start();

const assetsPath = path.join(
  config.test.assetsRoot,
  config.test.assetsSubDirectory
);
rm("-rf", assetsPath);
mkdir("-p", assetsPath);
cp("-R", "assets/*", assetsPath);

const compiler = webpack(webpackConfig);
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
compiler.apply(new ProgressPlugin());

compiler.run((err, stats) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + "\n\n"
  );

  console.log(chalk.cyan("  Build complete.\n"));
  console.log(
    chalk.yellow(
      "  Tip: built files are meant to be served over an HTTP server.\n" +
        "  Opening index.html over file:// won't work.\n"
    )
  );
});

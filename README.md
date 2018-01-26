
# 目录
* [package.json](#package.json)
* [什么是Webpack](#什么是Webpack)
  * [最简单的Webpack打包配置](#最简单的Webpack打包配置)
  * [devtool](#devtool)
  * [使用Webpack构建本地服务环境](#使用Webpack构建本地服务环境)
  * [Loader](#Loader)
  * [常见的loader配置](*常见的loader配置)
    * [Babel](#Babel)
  * [插件(Plugins)](#插件(Plugins))
  * [常用的插件](#常用的插件)
* [产品阶段的构建](#产品阶段的构建)
* [缓存](#缓存)
* [去除打包目录中的残余文件](#去除打包目录中的残余文件)

# package.json
> 首先了解 package.json 文件

**该 JSON 文件中通常包含了以下属性**
* name
* version
* ······
* engines  指定运行环境中的 node 版本，无指定则任意版本都能运行
* scripts
* dependencies 通过 npm install ** --save 安装的依赖，一般都是用在开发中 require or import 来使用
* devDependencies 通过 npm install ** --save-dev 安装，一般是在项目构建或打包的使用被依赖所调用

```
  "scripts": {
    "dev": "cross-env NODE_ENV=master node build/dev-server.js",
    "start": "npm run dev",
    "build": "rm -rf dist && webpack --progress --hide-modules --config build/webpack.prod.conf.js",
    "lint": "eslint --fix --ext .js,.vue client",
    "test": "npm run lint"
  }

  script 主要是为 node 运行代码提供快捷运行方式，通过 npm run * 运行，start 除外
```

# 什么是Webpack
Webpack 是一个静态模块打包器：主要负责分析项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss,TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

__包含四个核心概念：__

* 入口(entry)
* 输出(output)
* loader
* 插件(plugins)

## 最简单的Webpack打包配置

> dist      
>> index.html 

> src                  
>> Greeter.js     
>> main.js   

> webpack.config.js             

__webpack.config.js__
```
const path = require('path');
module.exports = function buildCon(env) {
  console.log(env);
  return {
    entry: path.resolve('./src/main.js'),
    output: {
      path: path.resolve('./dist'),
      filename: 'bundle.js'
    }
  }
}
```

__dist/index.html__
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src="./bundle.js"></script>
</body>
</html>
```

__src/Greeter.js__
```
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "Hi there and greetings!";
  return greet;
};
```

__src/main.js__
```
const greeter = require('./Greeter.js');
document.querySelector('#root').appendChild(greeter());

```
CMD 中运行 webpack --env=dev 会在 dist 目录下打包生成一个bundle.js，并且打印 env 参数
![alt](./images/20180126151111.png)

## devtool

开发环境中一般使用 __eval-source-map__ 

>使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；

__cheap-module-eval-source-map__ 方法构建速度更快，但是不利于调试，推荐在大型项目考虑时间成本时使用。

## 使用Webpack构建本地服务环境

__webpack-dev-server__  可以监听本地开发代码的变化重新打包

| __devserver的配置选项__ | __功能描述__ |
| -----------------  | ------- |
| contentBase | 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录 |
| port | 设置默认监听端口，如果省略，默认为”8080“ |
| inline | 设置为true，当源文件改变时会自动刷新页面 |
| historyApiFallback | 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html |

## Loader

loader 用于对模块的源代码进行转换。类似于其他构建工具中“task”，提供处理前端构建步骤的方法。要使用 loader 需要单独安装并且在配置中的 modules 关键字下进行配置，配置包括以下方面：

* test: 正则表达式用于匹配 loader 所处理的文件的拓展名(必须)
* loader: loader 的名称(必须)
* use: 
* include/exclude: 添加必须处理的文件（文件夹）或不需要处理的文件（文件夹）（可选）
* query: 为 loader 提供额外的设置选项（可选）


## 常见的loader配置

### Babel

Babel 主要编译 JavaScript 代码，能够编译最新的 JS 代码(ES6,ES7...)、React的JSX

__Babel__的安装

```
// npm一次性安装多个依赖模块，模块之间用空格隔开，babel-preset-react是解析 JSX 的包
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react
```

__Babel__配置

在 webpack.config.js 内
```
// webpack.config.js
....
module: {
  rules: [
    {
      test: /(\.jsx|\.js)$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "env", "react"
          ]
        }
      },
      exclude: /node_modules/
    }
  ]
}
...
```

babel具有非常多的配置选项，在单一的 wabpack.config.js 文件中进行配置往往比较复杂，可以再外部单独配置名为".babelrc"的配置文件
```
// webpack.config.js
...
module: {
  rules: [
    {
      test: /(\.jsx|\.js)$/,
      use: {
        loader: "babel-loader"
      },
      exclude: /node_modules/
    }
  ]
}
...

// .babelrc
{
  "presets": ["react", "env"]
}
```


__React__ 项目还需要安装一下包

```
npm install --save react react-dom
```

> 更多常见的模块配置参考https://www.jianshu.com/p/42e11515c10f

## 插件(Plugins)

> Loader 是在打包构建过程中用来开开处理源文件的(JSX,Scss,Less...), Plugins 并不是直接操作单个文件，而是对整个构建过程其作用。

要使用插件需要在Webpack 配置中的 plugins 关键字部分添加该插件的一个势力(plugins为体格数组)

## 常用的插件

__webpack.BannerPlugins__ 该插件为打包后的js代码添加备注
__HtmlWebpackPlugin__ 依据指定的index.html模板生产一个自动引用打包后的JS文件的新index.html,如果每次生成的js文件名称不同时非常有用
__hot-module-replacement__ 热加载

# 产品阶段的构建

在产品阶段可能要对打包的文件进行额外的处理，比如优化、压缩、缓存以及分离 CSS 和 JS

优化插件
* OccurenceOrderPlugin 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
* UglifyJsPlugin 压缩JS代码
* ExtractTextPlugin 分离CSS和JS文件

```
plugins: [
  new webpack.BannerPlugin('版权所有，翻版必究'),
  new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new ExtractTextPlugin("style.css")
]
```

# 缓存

webpack 可以把一个哈希值添加到打包的文件名中，一般添加特殊的字符混合体([name],[id]and[hash])到输出文件名前，webapck 会根据文件是否修改而打包出不同的文件名（文件内容和文件名匹配，即内容改变，名称相应改变）
```
···
output: {
    path: __dirname + "/build",
    filename: "bundle-[hash].js"
},
···
```

# 去除打包目录中的残余文件 

> clean-webpack-plugin 插件

添加了hash之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多，因此这里介绍另外一个很好用的插件clean-webpack-plugin。

```
···
plugins: [
  ...// 这里是之前配置的其它各种插件
  new CleanWebpackPlugin('build/*.*', {
    root: __dirname,
    verbose: true,
    dry: false
  })
···
```
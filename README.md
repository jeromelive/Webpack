# 解析Webpack打包
> 基于开发中的项目

## package.json
> 首先了解 package.json 文件

* 该 JSON 文件中通常包含了以下属性
* name
* version
* ······
* engines // 指定运行环境中的 node 版本，无指定则任意版本都能运行
* scripts
* dependencies // 通过 npm install ** --save 安装的依赖，一般都是用在开发中 require or import 来使用
* devDependencies // 通过 npm install ** --save-dev 安装，一般是在项目构建或打包的使用被依赖所调用

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
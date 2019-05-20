'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const AssetsPlugin = require('assets-webpack-plugin')
const assetsPluginInstance = new AssetsPlugin({
  // filename: 'build/webpack.assets.js',
  // processOutput: function (assets) {
  //   return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
  // }
})

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// 合并基本config
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 通过传入一些配置来获取rules配置，此处传入了sourceMap: false,表示不生成sourceMap
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    // stats: 'verbose',
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    disableHostCheck: true

  },
  // 插件配置
  plugins: [
    // 编译时配置全局变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env') // 当前环境为开发环境
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(), // 不触发错误,即编译后运行的包正常运行
    // https://github.com/ampedandwired/html-webpack-plugin
    // 自动生成html文件,比如编译后文件的引入
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ].concat(utils.htmlPlugin())
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          // messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
          messages: [`Your application is running here: http://127.0.0.1:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),

  /* 入口文件entry，改为多入口 */ 
  entry: utils.entries(),

  // 出口
  output: {
    path: config.build.assetsRoot, // 导出目录的绝对路径
    filename: '[name].js', // 导出文件名称
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath // prod或dev下 html、js等文件内部引用的公共路径
  },
  // 文件解析
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'], // 自动解析确定的扩展名，使得导入模块时不带扩展名
    // 创建import或require别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // vue文件后缀
        loader: 'vue-loader', // //使用vue-loader处理
        options: vueLoaderConfig // options是对vue-loader做的额外选项配置
      },
      {
        test: /\.js$/, // js文件后缀
        loader: 'babel-loader', // 使用babel-loader处理
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')] // 必须处理包含src和test文件夹
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 图片
        loader: 'url-loader', // url-loader
        // query是对loader做额外的选项配置
        options: {
          limit: 10000, // 图片小于10000字节时以base64的方式引用
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 文件名为name.7位hash值.拓展名
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体文件
        loader: 'url-loader', // 使用url-loader处理
        options: {
          limit: 10000, // 文件小于10000字节时处理方式
          name: utils.assetsPath('media/[name].[hash:7].[ext]') // 文件名为name.7位hash值.拓展名
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体文件
        loader: 'url-loader',
        options: {
          limit: 10000, // 文件小于10000字节时处理方式
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]') // 文件名为name.7位hash值.拓展名
        }
      },
      {
        test: /\.(sass|scss)$/, // sass/scss 后缀
        loaders: ['style', 'css', 'sass'] // 处理sass的loader
      },
      // ts 支持
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader', // typescript支持
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

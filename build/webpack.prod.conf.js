'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const assetsPluginInstance = new AssetsPlugin({
  // filename: 'build/webpack.assets.js',
  // processOutput: function (assets) {
  //   return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
  // }
})

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 同样调用styleLoaders
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  // 输出
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env // 配置全局环境为生产环境
    }),
    // js压缩
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // 分离公共js到vendor中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        // 声明公共的模块来自node_modules文件夹
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    // 复制静态资源,将static文件内的内容复制到指定文件夹
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static/css'),
        to: config.build.assetsSubDirectory + '/css',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static/js'),
        to: config.build.assetsSubDirectory + '/js',
        ignore: ['.*']
      },
      // {
      //   from: path.resolve(__dirname, '../static/favicon.ico'),
      //   to: config.build.assetsRoot,
      // }
    ]),
    // assetsPluginInstance
    // add .concat(utils.htmlPlugin())
  ].concat(utils.htmlPlugin())

})

// 开启gzip
if (config.build.productionGzip) {
  // 引入压缩文件的组件,该插件会对生成的文件进行压缩，生成一个.gz文件
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]', // 目标文件名
      algorithm: 'gzip', // gzip压缩
      test: new RegExp( // 满足正则表达式的文件会被压缩
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240, // 资源文件大于10240B=10kB时会被压缩
      minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

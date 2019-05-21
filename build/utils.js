'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')


// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob')
// 页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin-for-multihtml')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/pages')
// 用于做相应的merge处理
const merge = require('webpack-merge')

const buildingPage = process.argv[2];

exports.assetsPath = function (_path) {
  // 修改production assetsSubDirectory
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? `pages/${buildingPage}/${config.build.assetsSubDirectory}`
    // ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

// 处理各种类型的样式文件
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 75 // rem按75计算
    }
  }


  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader, px2remLoader]


    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        // 将loaderOptions和sourceMap组成对象
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // 分离js中引入的css文件
      return ExtractTextPlugin.extract({
        use: loaders,
        publicPath:'../../',
        fallback: 'vue-style-loader' // 没有被提取分离时使用的loader
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  //返回css类型对应的loader组成的对象 generateLoaders()来生成loader
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  // 定义返回的数组，数组中保存的是针对各类型的样式文件的处理方式
  const output = []
  const loaders = exports.cssLoaders(options) // 调用cssLoaders方法返回各类型的样式对象(css: loader)

  for (const extension in loaders) { // 遍历loaders
    const loader = loaders[extension] //根据遍历获得的key(extension)来得到value(loader)
    output.push({
      test: new RegExp('\\.' + extension + '$'), // 处理文件
      use: loader // 用loader来处理，loader来自loaders[extension]
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  let map = {}
  entryFiles.forEach((filePath) => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    if (process.env.NODE_ENV === 'production') {
      if (filename == buildingPage) {
        map[filename] = filePath;
      }
    }
    else {
      map[filename] = filePath;
    }
  })
  return map
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function () {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    // Production
    if (process.env.NODE_ENV === 'production') {
      if (filename == buildingPage) {
        let conf = {
          // 模板来源
          template: filePath,
          // production static path
          staticPath: '/static',
          // 文件名称
          filename: 'pages/'+ filename + '/' + filename + '.html',
          // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
          chunks: ['manifest', 'vendor', filename],
          inject: true
        }
        if (process.env.NODE_ENV === 'production') {
          conf = merge(conf, {
            minify: {
              removeComments: true,
              // collapseWhitespace: true,
              removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
          })
        }
        arr.push(new HtmlWebpackPlugin(conf))
      }
    }
    else {
      let conf = {
        // 模板来源
        template: filePath,
        // dev static path
        staticPath: '/static',
        // 文件名称
        filename: 'pages/'+ filename + '/' + filename + '.html',
        // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
        chunks: ['manifest', 'vendor', filename],
        inject: true
      }
      arr.push(new HtmlWebpackPlugin(conf))
    }
  })
  return arr
}

exports.showMars = function () {
  console.log('      ███▄ ▄███▓ ▄▄▄       ██▀███    ██████ ')
  console.log('     ▓██▒▀█▀ ██▒▒████▄    ▓██ ▒ ██▒▒██    ▒ ')
  console.log('     ▓██    ▓██░▒██  ▀█▄  ▓██ ░▄█ ▒░ ▓██▄   ')
  console.log('     ▒██    ▒██ ░██▄▄▄▄██ ▒██▀▀█▄    ▒   ██▒')
  console.log('     ▒██▒   ░██▒ ▓█   ▓██▒░██▓ ▒██▒▒██████▒▒')
  console.log('     ░ ▒░   ░  ░ ▒▒   ▓▒█░░ ▒▓ ░▒▓░▒ ▒▓▒ ▒ ░')
  console.log('     ░  ░      ░  ▒   ▒▒ ░  ░▒ ░ ▒░░ ░▒  ░ ░')
  console.log('     ░      ░     ░   ▒     ░░   ░ ░  ░  ░  ')
  console.log('            ░         ░  ░   ░           ░  ')
  console.log('   \n')
}

exports.showLogo = function () {
  console.log('                        .a                ')     
  console.log('                     .11aaa                     ')
  console.log('                  1111aaaaa   a                 ')
  console.log('                11111aaaaaaa111aa               ')
  console.log('             11111aaaaaaaaaaaaaaaan             ')
  console.log('     1     a1111z.....       .aaaaaa     a      ')
  console.log('    z11   1111...                aaaa  .aa      ')
  console.log('    11111111...                    aaaaaaao     ')
  console.log('    111111....                      aaaaaav     ')
  console.log('    11111^...  % %           % %     aaaaa-     ')
  console.log('     1111...   %%%           %%%      aaaa      ')
  console.log('     1111...   ;;;           ;;;      aaaa      ')
  console.log('     v11n...                          aaa       ')
  console.log('      111...................          aaa       ')
  console.log('      1111aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa       ')
  console.log('      ~1111aaaaaaaaaaaaaaaaaaaaaaaaaaaaa        ')
  console.log('       11111aaaaaaaaaaaaaaaaaaaaaaaaaaa^        ')
  console.log('        z11111aaaaaaaaaaaaaaaaaaaaaaaa          ')
  console.log('          1111111aaaaaaaaaaaaaaaaaa11           ')
  console.log('            1111111111uaaaaau111111             ')
  console.log('               11111111111111111                ')
  console.log('                     ^auz.          ')
  console.log('      ======================================    ')
  console.log('      ======================================    ')
}
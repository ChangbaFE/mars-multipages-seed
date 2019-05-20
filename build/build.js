'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production' // env prod

const ora = require('ora') // 终端显示的转轮loading
const rm = require('rimraf') // node环境下rm -rf的命令库
const path = require('path') // node文件路径处理
const chalk = require('chalk') // 粉笔 终端显示字体
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf') // 生产环境下的webpack配置
const utils = require('./utils')
const term = require( 'terminal-kit' ).terminal

let entries = utils.entries();
let pages = [];
// const buildingPage = process.argv[2];

// process.argv.splice(0, 2);
// console.log(process.argv);
const argv = process.argv.slice(2);

let buildingPage = '';

if (argv && argv.length != 0) {
  // with arguments
  if (argv.length > 1) {
    console.log(chalk.red('Only build one project once. Build failed with errors.\n'))
    process.exit(1);
  }
  else {
    buildingPage = argv[0];
    if (Object.keys(entries).lastIndexOf(buildingPage) < 0) {
      console.log(chalk.red('No such project. Build failed with errors.\n'))
      process.exit(1);
    }
  }
}
else {
  // no arguments webpack all
  // pages = Object.keys(entries);
  console.log(chalk.red('Please use "npm run build yourproject" to build.\n'))
  console.log(chalk.red('Ex. "npm run build marsdemo".\n'))
  console.log(chalk.red('Build failed with errors.\n'))
  process.exit(1);
}

console.log(chalk.green(`Mars ==== start building project ### ${buildingPage} ### ...\n`))

utils.showLogo()
utils.showMars()


const spinner = ora('Mars ==== building for production ...')
spinner.start()

// 删除已编译文件
rm(path.join(config.build.assetsRoot, buildingPage, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 在删除完成的回调函数中开始编译
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    spinner.succeed()
    if (err) throw err
    // 在编译完成的回调函数中,在终端输出编译的文件
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

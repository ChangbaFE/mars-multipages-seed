'use strict'

//create a new project
process.env.NODE_ENV = 'create'

const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
// const rm = require('rimraf')
const path = require('path')
// const minimist = require('minimist')
const config = require('../config')
const utils = require('./utils')
const es = require('event-stream')

const argv = process.argv.slice(2);
let projectName = '';
let projectPath = '';



// console.log(process.argv.slice(2));
// let params = minimist(argv, defaultOpt);


const splitPath = function () {
  if (argv.length == 0) {
    console.log(chalk.red('ERR! no params ! \n'));
    console.log(chalk.green('Use "npm run create yourproject" to create a project\n'));
    process.exit(1);
  }

  if (argv.length > 1) {
    console.log(chalk.red('ERR! not support more params now ! \n'));
    process.exit(1);
  }

  if (argv.length == 1) {
    if (argv[0].indexOf('/') > 0) {
      console.log(chalk.red('ERR! not support generating foler now ! \n'));
      process.exit(1);
    }
    else {
      projectName = argv[0]
    }
  }
}

// check file exists
const checkExists = function (project) {
  let isExists = false;
  return new Promise((res, rej) => {
    isExists = fs.existsSync(`${config.gen.destDirectory}${project}`);
    res(isExists);
  })
}

// mkdir of new project
const mkProject = function (project) {
  return new Promise((res, rej) => {
    fs.mkdir(`${config.gen.destDirectory}${project}`, (err) => {
      if (err) rej(err);
      projectPath = `${config.gen.destDirectory}${project}`
      res(projectPath);
    });
  })
}

// copy func
const copy = async function (src, dest) {
  // return new Promise(async (res, rej) => {
  if (fs.existsSync(src)) {
    try {
      const readRes = await readFiles(src); 
      if (readRes) {
        readRes.forEach( async (filename) => {
          let destname = filename;
          if (filename.split('.')[0] == 'template') {
            destname = destname.replace(/template/, `${projectName}`);
          }
          let url = path.join(src, filename), output = path.join(dest, destname);

          await writeFiles(url, output);

        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// read dir
const readFiles = function (src) {
  return new Promise((res, rej) => {
    fs.readdir(src, (err, files) => {
      if (err) {
        rej(err);
      }
      res(files);
    })
  })
}

// write dir
const writeFiles = function (src, dest) {
  const REGEX = /template/g;
  return new Promise((res, rej) => {
    fs.stat(src, (err, stats) => {
      if (err) {
        rej(err);
      }
      if (stats.isFile()) {
        let readStream = fs.createReadStream(src);
        let writeStream = fs.createWriteStream(dest, { encoding: "utf-8"});

        if (src.indexOf('template.js') > 0) {
          readStream.pipe(es.split())
          .pipe(es.map((data, cb) => {
            data = data.replace(REGEX, `${projectName}`);
            cb(null, `${data}\n`)
          }))
          .pipe(writeStream);
        }
        else {
          readStream.pipe(writeStream);
        }
        // readStream.pipe(es.split())
        // .pipe(es.map((data, cb) => {
        //   data = data.replace(REGEX, `${projectName}`);
        //   cb(null, data);
        // }))
        
        res('success');
      }
      else if (stats.isDirectory()) {
        cpDir(src, dest, copy);
      }
    })
  })
}

// copy dir recursively
const cpDir = function (url, dest, cb) {
  checkExists(dest).then((res) => {
    if (!res) {
      fs.mkdir(dest, (err)=> {
        if (err) {
          throw err;
        }
        cb && cb(url, dest);
      })
    }
    else {
      cb && cb(url, dest);
    }
  })
}

// replacement
const replaceTemplate = function (dest) {
  if (dest) {
    return new Promise((res, rej) => {
      fs.readFile(dest, (err, file) => {
        if (!err) {
          let data = file.toString();
          data.replace(/template/g, `${projectName}`);
          fs.writeFile(dest, data, (err) => {
            if(!err) {
              console.log('文件处理成功！');
              res('success')
            }
          })
        }
      })
    })
  }
}
// run
const run = async function () {
  splitPath();
  if (projectName) {
    try {
      const checkRes = await checkExists(projectName);
      if (!checkRes) {
        const mkRes = await mkProject(projectName);

        if (mkRes) {
          await copy(config.gen.baseDirectory, mkRes);
          setTimeout(() => {
            spinner.succeed();
            console.log(chalk.green(`Run 'npm run dev' and \n`));
            console.log(chalk.green(`Open browser to visit 'http://127.0.0.1:${config.dev.port}/pages/${projectName}/${projectName}.html#/' for coding !\n`));
          }, 1000);
        }
      }
      else {
        spinner.fail();
        console.log(chalk.red(`ERR! ${projectName} is already in Mars ! \n`));
        process.exit(1);
      }
    } catch (error) {
      spinner.fail();
      console.log(error);
    }
  }
 
}

const spinner = ora('create new project for Mars ...');
spinner.start();
run();

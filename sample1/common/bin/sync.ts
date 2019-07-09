import path from 'path'
// import _sync from 'sync-directory'
import _sync from 'sync-folders'

import { promisify } from 'util'
import { glob } from 'glob'
import rimraf from 'rimraf'
import * as fs from 'fs'

const globAsync = promisify(glob)
const rimrafAsync = promisify(rimraf)
const mkdirAsync = promisify(fs.mkdir)
import syncGlob from 'sync-glob'
// const copyFileAsync = promisify(fs.copyFile)

import copyfiles from 'copyfiles'
const copyfilesAsync = promisify(copyfiles)

var ncp = require('ncp').ncp
const ncpAsync = promisify(ncp)

const basePath = path.join(__dirname, '../../')
async function sync(target: string) {
  const src = basePath
  const dst = path.join(basePath, '../', target)
  console.log('syncing', src, dst)
  await syncDir(src, dst, 'common')
  await syncDir(src, dst, 'pages')

  await copyfilesAsync([src + '/*', dst], {
    exclude: 'node_modules',
    verbose: true,
    up: true,
    all: false,
  })

  //syncDir(src, dst, '/common')
  //syncDir(src, dst, '/server')
  //syncDir(src, dst, '/bin')

  //syncDir(src, dst, '/deploy', ['server'])
  // syncDir(src, dst, '/', [
  //   '.next',
  //   /common/,
  //   /dist/,
  //   /static/,
  //   /config/,
  //   /src-api/,
  //   /src-ui/,
  //   /node_modules/,
  // ])
}

async function syncDir(
  src: string,
  dst: string,
  subdir: string,
  exclude?: any[]
) {
  src = src + subdir
  dst = dst + subdir
  console.log('syncDir', src, dst)

  // syncGlob(src, dst, {}, (type, args) => {
  //   console.log(type, ...args)
  // })

  await rimrafAsync(dst)
  await mkdirAsync(dst)
  await ncp(src, dst)

  // let files = await globAsync(src + subdir + '/**/*')
  // for (let file of files) {
  //   if (file.indexOf('node_modules') !== -1) {
  //     continue
  //   }

  //   console.log('f', file)
  // }

  // _sync([src + subdir], dst + subdir, {
  //   verbose: true,
  //   quiet: false,
  //   bail: false,
  //   ignore: exclude,
  //   type: 'copy',
  //   onSync: ({ type, sourceDir, targetDir, relativePath }) => {
  //     console.log(`Synced`, type, sourceDir, targetDir, relativePath)
  //   },
  //   onUpdate: ({ type, sourceDir, targetDir, path }) => {
  //     console.log(`Updated`, type, sourceDir, targetDir, path)
  //   },
  //   // type: 'copy',
  //   // cb: ({ type, _path }) => {
  //   //   console.log('>', type, _path)
  //   // },
  //   // filter: (_path) => {
  //   //   console.log('>', _path)
  //   //   return true
  //   // },
  //   // exclude,
  //   // deleteOrphaned: true,
  // })
}

sync('/sample1/')
sync('/sample2/')

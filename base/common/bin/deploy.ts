import * as path from 'path'
import { promisify } from 'util'

const { spawn } = require('child_process')

const copyAsync = promisify(require('copy'))

import { config } from '../../src-config/config'

function log(msg: string, ...msgs: string[]) {
  console.log(msg, ...msgs)
}

async function copy(src: string, glob: string, dest: string) {
  if (!src.endsWith('/')) {
    src += '/'
  }
  let s = src + glob
  log('copy', s, dest)
  await copyAsync(s, dest)
}

async function runCommand(cmd: string, args: string[], options?: any) {
  const child = spawn(cmd, args, options)
  log(cmd, ...args, options || '')
  for await (const data of child.stdout) {
    process.stdout.write(data)
    //console.log(`> ${data}`)
    //console.lo
  }

  return new Promise((resolve, reject) => {
    child.on('exit', (code) => {
      console.log(`${cmd} | ${code}`)
      if (code !== 0) {
        process.exit(code)
      }
      resolve()
    })
  })
}

async function run() {
  const basePath = path.join(__dirname, '../../')
  const clientPath = path.join(basePath, './src-ui')
  const deployPath = path.join(basePath, './common/deploy')
  const distPath = path.join(basePath, './dist')
  const nextPath = path.join(basePath, './.next')
  const serverPath = path.join(basePath, './common/server')
  const distServerPath = path.join(distPath, './server')
  const distApiPath = path.join(distPath, './src-api')

  log('Deploying...', distPath)

  await runCommand('rm', ['-rf', nextPath], { cwd: clientPath })
  await runCommand('yarn', ['next', 'build'], { cwd: clientPath })

  await runCommand('rm', ['-rf', distPath])
  await runCommand('mkdir', [distPath])
  await runCommand('mv', [nextPath, distPath + '/.next'])

  await runCommand('mkdir', [distServerPath])

  await runCommand('rm', ['-rf', deployPath + '/server'])
  await runCommand('tsc', ['--project', 'common/server/tsconfig.server.json'])

  await copy(deployPath, '*', distPath)

  await copy(deployPath + '/server', '**/*.js', distServerPath)
  await copy(deployPath + '/src-api', '**/*.js', distApiPath)

  await copy(serverPath, '*.json', distServerPath)

  // AWS sync
  await runCommand('aws', [
    's3',
    'sync',
    distPath + '/.next',
    config.s3 + '/_next',
  ])
  await runCommand('aws', [
    's3',
    'sync',
    clientPath + '/static',
    config.s3 + '/static',
  ])

  // await runCommand('yarn', ['install'], { cwd: distPath })
  await runCommand('yarn', ['install'], { cwd: distPath })
  await runCommand('sls', ['deploy'], { cwd: distPath })

  // await runCommand('rm', ['-rf', distPath])

  log('Deployed!')
}
run()

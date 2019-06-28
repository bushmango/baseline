import * as path from 'path'
import { promisify } from 'util'

const { spawn } = require('child_process')

const copyAsync = promisify(require('copy'))

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
  log(cmd, ...args)
  for await (const data of child.stdout) {
    process.stdout.write(data)
    //console.log(`> ${data}`)
    //console.lo
  }

  return new Promise((resolve, reject) => {
    child.on('exit', (code) => {
      console.log(`${cmd} | ${code}`)
      resolve()
    })
  })
}

async function run() {
  const basePath = path.join(__dirname, '../')
  const deployPath = path.join(basePath, '../deploy')
  const distPath = path.join(basePath, '../dist')
  const nextPath = path.join(basePath, '.next')
  const serverPath = path.join(basePath, 'server')
  const distServerPath = path.join(distPath, 'server')

  log('Deploying...', distPath)

  await runCommand('rm', ['-rf', nextPath])
  await runCommand('yarn', ['next', 'build'])

  await runCommand('rm', ['-rf', distPath])
  await runCommand('mkdir', [distPath])
  await runCommand('mv', [nextPath, distPath + '/.next'])

  await runCommand('mkdir', [distServerPath])
  await copy(deployPath, '*', distPath)

  await runCommand('tsc', ['--project', 'server/tsconfig.server.json'])

  await copy(serverPath, '*.js', distServerPath)
  await copy(serverPath, '*.json', distServerPath)

  // await runCommand('yarn', ['install'], { cwd: distPath })
  await runCommand('yarn', ['install'], { cwd: distPath })
  await runCommand('sls', ['deploy'], { cwd: distPath })

  await runCommand('rm', ['-rf', distPath])

  log('Deployed!')
}
run()

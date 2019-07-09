// server.js
import express from 'express'
import cors from 'cors'
import path from 'path'
const dev = process.env.NODE_ENV !== 'production'
import next from 'next'

// const pathMatch = require('path-match')

// const { parse } = require('url')

import { installApi } from '../../src-api/installApi'

export function prepareServer(
  options: { includeUi: boolean; includeApi: boolean; isLambda: boolean },
  callback?: (a: any) => void
): any {
  if (options.includeUi) {
    const app = next({ dev })
    // const handle = app.getRequestHandler()

    if (!options.isLambda) {
      app.prepare().then(() => {
        callback(setupServer(app, options))
      })
    } else {
      return callback(setupServer(app, options))
    }
  } else {
    return callback(setupServer(null, options))
  }
}

function setupServer(
  nexApp: any,
  options: {
    includeUi: boolean
    includeApi: boolean
  }
) {
  const server = express()
  server.use(cors())
  // const route = pathMatch()

  if (options.includeApi) {
    installApi(server)
  }

  if (options.includeUi) {
    server.use('/_next', express.static(path.join(__dirname, '.next')))
    server.get('/', (req, res) => nexApp.render(req, res, '/AppIndex'))
    // server.get('/baseline-1', (req, res) => app.render(req, res, '/AppIndex'))
    server.get('*', (req, res) => nexApp.render(req, res, '/AppIndex'))
  } else {
    server.get('/', (req, res) => res.send('api server up'))
  }
  // } else {
  //   server.get('*', (req, res) => handle(req, res))
  // }
  // server.get('/dogs', (req, res) => app.render(req, res, '/dogs'))
  // server.get('/dogs/:breed', (req, res) => {
  //   const params = route('/dogs/:breed')(parse(req.url).pathname)
  //   return app.render(req, res, '/dogs/_breed', params)
  // })

  return server
}

// '

// export function prepareServer(
//   options: { includeUi: boolean; includeApi: boolean },
//   callback
// ) {
//   app.prepare().then(() => {
//     callback(setupServer(options))
//   })
// }

// export function setupServer(options: {
//   includeUi: boolean
//   includeApi: boolean
// }) {
//   const server = express()
//   // const route = pathMatch()

//   if (options.includeApi) {
//     installApi(server)
//   }

//   if (options.includeUi) {
//     server.use('/_next', express.static(path.join(__dirname, '.next')))
//     server.get('/', (req, res) => app.render(req, res, '/AppIndex'))
//     // server.get('/baseline-1', (req, res) => app.render(req, res, '/AppIndex'))
//     server.get('*', (req, res) => app.render(req, res, '/AppIndex'))
//   } else {
//     server.get('*', (req, res) => handle(req, res))
//   }
//   // server.get('/dogs', (req, res) => app.render(req, res, '/dogs'))
//   // server.get('/dogs/:breed', (req, res) => {
//   //   const params = route('/dogs/:breed')(parse(req.url).pathname)
//   //   return app.render(req, res, '/dogs/_breed', params)
//   // })

//   return server
// }

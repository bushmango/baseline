// server.js
import express from 'express'
import path from 'path'
const dev = process.env.NODE_ENV !== 'production'
import next from 'next'
import { apiMath, apiPing } from '../api'
// const pathMatch = require('path-match')
const app = next({ dev })
const handle = app.getRequestHandler()
// const { parse } = require('url')

export function prepareServer(
  options: { includeUi: boolean; includeApi: boolean },
  callback
) {
  app.prepare().then(() => {
    callback(setupServer(options))
  })
}

export function setupServer(options: {
  includeUi: boolean
  includeApi: boolean
}) {
  const server = express()
  // const route = pathMatch()

  if (options.includeApi) {
    apiPing.install(server)
    apiMath.install(server)
  }

  if (options.includeUi) {
    server.use('/_next', express.static(path.join(__dirname, '.next')))
    server.get('/', (req, res) => app.render(req, res, '/AppIndex'))
    // server.get('/baseline-1', (req, res) => app.render(req, res, '/AppIndex'))
    server.get('*', (req, res) => app.render(req, res, '/AppIndex'))
  } else {
    server.get('*', (req, res) => handle(req, res))
  }
  // server.get('/dogs', (req, res) => app.render(req, res, '/dogs'))
  // server.get('/dogs/:breed', (req, res) => {
  //   const params = route('/dogs/:breed')(parse(req.url).pathname)
  //   return app.render(req, res, '/dogs/_breed', params)
  // })

  return server
}

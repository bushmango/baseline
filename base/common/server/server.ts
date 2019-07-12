// server.js
import express from 'express'
// import cors from 'cors'
import path from 'path'
const dev = process.env.NODE_ENV !== 'production'
import next from 'next'

// const pathMatch = require('path-match')

// const { parse } = require('url')

import { installApi } from '../../src-api/installApi'

export function prepareServer(options: {
  includeUi: boolean
  includeApi: boolean
  isLambda: boolean
  port: number
}): any {
  if (options.includeUi) {
    const app = next({ dev })
    // const handle = app.getRequestHandler()

    if (!options.isLambda) {
      app.prepare().then(() => {
        let server = setupServer(app, options)
        console.log('> Listening...')
        server.listen(options.port, (err) => {
          if (err) {
            console.log('> Error listening on port ' + options.port)
            throw err
          }
          console.log(`> Ready on http://localhost:${options.port}`)
        })
      })
    } else {
      return setupServer(app, options)
    }
  } else {
    return setupServer(null, options)
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
  // server.use(cors())

  if (options.includeApi) {
    installApi(server)
  }

  if (options.includeUi) {
    server.use('/_next', express.static(path.join(__dirname, '.next')))
    server.get('/', (req, res) => nexApp.render(req, res, '/AppIndex'))
    server.get('*', (req, res) => nexApp.render(req, res, '/AppIndex'))
  } else {
    server.get('/', (req, res) => res.send('api server up'))
  }

  return server
}

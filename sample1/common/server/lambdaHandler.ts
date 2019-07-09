import sls from 'serverless-http'

import { setupServer } from './server'

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
]

const server = setupServer({ includeUi: true, includeApi: true })
module.exports.server = sls(server, {
  binary: binaryMimeTypes,
})

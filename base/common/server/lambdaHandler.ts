import sls from 'serverless-http'

import { prepareServer } from './server'

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

const server = prepareServer({
  includeUi: true,
  includeApi: true,
  isLambda: true,
})
module.exports.server = sls(server, {
  binary: binaryMimeTypes,
})

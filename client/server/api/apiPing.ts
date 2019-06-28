import express from 'express'

export function install(app: express.Express) {
  app.get('/api/ping', (req, res) => res.send('pong'))
}

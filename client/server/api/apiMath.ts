import express from 'express'

export function install(app: express.Express) {
  app.get('/api/add', (req, res) => res.send('2'))
}

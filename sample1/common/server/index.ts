const port = parseInt(process.env.PORT, 10) || 3007

console.log(`> Starting Port: ${port}`)
import { prepareServer } from './server'

prepareServer({ includeApi: true, includeUi: true }, (server) => {
  console.log('> Listening...')
  server.listen(port, (err) => {
    if (err) {
      console.log('> Error listening on port ' + port)
      throw err
    }
    console.log(`> Ready on http://localhost:${port}`)
  })
})

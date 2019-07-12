import { config } from '../../src-config/config'
const port = parseInt(process.env.PORT, 10) || config.port + 1

console.log(`> Starting Port: ${port}`)
import { prepareServer } from './server'

prepareServer({
  includeApi: true,
  includeUi: false,
  isLambda: false,
  port: port,
})

import { config } from '../../src-config/config'
const port = parseInt(process.env.PORT, 10) || config.port

console.log(`> Starting Port: ${port}`)
import { prepareServer } from './server'

prepareServer({
  includeApi: false,
  includeUi: true,
  isLambda: false,
  port: port,
})

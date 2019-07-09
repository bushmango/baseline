import { apiMath, apiPing } from '.'
import express from 'express'

export function installApi(server: express.Express) {
  apiPing.install(server)
  apiMath.install(server)
}

//system imports
import * as express from 'express'
let app = express()

//app-related imports & config
import configPassport from './config/configPassport'
configPassport()
import configExpress from './config/configExpress'
configExpress(app)
import configRoutes from './config/routes'
configRoutes(app)
import db from './_core/db'

let port = process.env.PORT || 3000
app.listen(port)
console.log(`Listening on port ${port} in ${process.env.ENV} mode...`)

//TODO: check whether this is working or not...
process.on('uncaughtException', (err) =>
{
  console.error(`Uncaught exception!\n${err}`)
})

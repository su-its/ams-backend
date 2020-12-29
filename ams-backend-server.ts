import express from 'express' // avoiding TS1259
import * as bodyParser from 'body-parser'
import accesslogRoutes from './app/routes/accesslogRoutes'
import memberRoutes from './app/routes/membersRoutes'
import { setupBeebotte } from './app/slack/in-beebotte'
import { config } from 'dotenv'

config()

const app: express.Express = express()
// app.set('query parser', 'extended') // default value: 'extended'

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'This is backend server.' })
})

// set middlewares
app.use('/v1', accesslogRoutes, memberRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

// subscribe the beebotte channel, and wait for message.
setupBeebotte()

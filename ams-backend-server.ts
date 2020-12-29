import express from 'express'
// import express = require('express') // avoiding TS1259
import accesslogRoutes from './app/routes/accesslogRoutes'
import memberRoutes from './app/routes/membersRoutes'
import { setupBeebotte } from './app/slack/in-beebotte'
import { config } from 'dotenv'

config()

const app: express.Express = express()

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'This is backend server.' })
})

// set middlewares
app.use('/v1', accesslogRoutes, memberRoutes)

// set port, listen for requests
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

// subscribe the beebotte channel, and wait for message.
setupBeebotte()

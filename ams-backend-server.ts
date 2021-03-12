import cors from 'cors'
import express from 'express'
import accesslogsRoutes from './app/routes/accessLogsRoutes'
import readerInputRoutes from './app/routes/readerInputRoutes'
import inRoomUsersRoutes from './app/routes/inRoomUsersRoutes'
import { amsOptions } from './config'

const app: express.Express = express()

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(cors())

// simple route
app.get('/', (_req, res) => {
  res.json({ message: 'This is backend server.' })
})

// set middlewares
app.use('/v1', accesslogsRoutes, readerInputRoutes, inRoomUsersRoutes)

// set port, listen for requests
const PORT = amsOptions.port
app.listen(PORT, () => {
  console.log(`[*] Server is running on port ${PORT}.`)
})

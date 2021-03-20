import cors from 'cors'
import express from 'express'
import { router as accesslogsRoutes } from './app/routes/accessLogsRoutes'
import { router as inRoomUsersRoutes } from './app/routes/inRoomUsersRoutes'
import { router as readerInputRoutes } from './app/routes/readerInputRoutes'
import { router as sseRoutes } from './app/routes/sseRoutes'
import { amsOptions } from './config'

const app: express.Express = express()

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// CORS
// TODO 今は全てのパスに対してCORSが有効だが将来的には特定のパス以下(/v1など)のみに限定したい
app.use(cors())

// simple route
app.get('/', (_req, res) => {
  res.json({ message: 'This is backend server.' })
})

// set middlewares
app.use('/v1', accesslogsRoutes, inRoomUsersRoutes, readerInputRoutes, sseRoutes)

// set port, listen for requests
const PORT = amsOptions.port
app.listen(PORT, () => {
  console.log(`[*] Server is running on port ${PORT}.`)
})

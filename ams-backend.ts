import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import * as accesslogsRoutes from './app/routes/accessLogsRoutes'
import * as inRoomUsersRoutes from './app/routes/inRoomUsersRoutes'
import * as readerInputRoutes from './app/routes/readerInputRoutes'
import * as sseRoutes from './app/routes/sseRoutes'
import { amsOptions } from './config'

const app: express.Express = express()

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(cors())

// logging
app.use(morgan(':remote-addr - :remote-user [:localdate] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))

// morganの:dateはUTCなので、日本時間のものを作る
morgan.token('localdate', () => dayjs().locale('ja').format())

// simple route
app.get('/', (_req, res) => {
  res.json({ message: 'This is backend server.' })
})

// set middlewares
app.use('/v1', accesslogsRoutes.router, inRoomUsersRoutes.router, readerInputRoutes.router, sseRoutes.router)

// set port, listen for requests
const PORT = amsOptions.port
app.listen(PORT, () => {
  console.log(`[*] Server is running on port ${PORT}.`)
})

import cors from 'cors'
import dayjs from 'dayjs'
import express from 'express'
import fs from 'fs'
import morgan from 'morgan'
import path from 'path'
import 'dayjs/locale/ja'
import * as accesslogsRoutes from './app/routes/accessLogsRoutes'
import * as inRoomUsersRoutes from './app/routes/inRoomUsersRoutes'
import * as readerInputRoutes from './app/routes/readerInputRoutes'
import * as sseRoutes from './app/routes/sseRoutes'
import { amsOptions } from './config'

function prepareMorgan () {
  // morganの:dateはUTCなので、日本時間を表示するものを作る
  morgan.token('localdate', () => dayjs().locale('ja').format())

  // ログを吐くフォルダを作る
  const logFolder = path.join(__dirname, '/logs')
  fs.mkdirSync(logFolder)

  // ログファイルのストリームを開く
  const wStream = fs.createWriteStream(
    path.join(logFolder, '/access.log'),
    {
      flags: 'a'
    }
  )

  const formatStr = ':remote-addr - :remote-user [:localdate] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'

  return morgan(formatStr, {
    stream: wStream
  })
}

const app: express.Express = express()

// logging
app.use(prepareMorgan())

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
app.use('/v1', accesslogsRoutes.router, inRoomUsersRoutes.router, readerInputRoutes.router, sseRoutes.router)

// set port, listen for requests
const PORT = amsOptions.port
app.listen(PORT, () => {
  console.log(`[*] Server is running on port ${PORT}.`)
})

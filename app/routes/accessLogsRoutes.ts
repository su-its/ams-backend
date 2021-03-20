import { Router } from 'express'
import { listAccessLogs } from '../controllers/accessLogsController'

const router = Router()

// Retrieve AccessLog
router.get('/access_logs', listAccessLogs)

export { router }

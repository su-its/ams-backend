import { Router } from 'express'
import { listAccessLogs, listAccessLogsBulk } from '../controllers/accessLogsController'

const router = Router()

// Retrieve AccessLog
router.get('/access_logs', listAccessLogs)

// Bulk retrieve
router.get('/access_logs/bulk', listAccessLogsBulk)

export { router }

import { Router } from 'express'
import { getAccessLogs } from '../controllers/accessLogsController'

const router = Router()

// Retrieve AccessLog
router.get('/access_logs', getAccessLogs)

export default router

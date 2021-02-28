import { Router } from 'express'
import { handleReaderInput } from '../controllers/readerInputController'

const router = Router()

// ===========
// どっちにする?
// ===========

// router.post('/reader_input', handleReaderInput)
router.post('/room', handleReaderInput)

export default router

import { Router } from 'express'
import { handleReaderInput } from '../controllers/readerInputControllers'

const router = Router()

// ===========
// どっちにする?
// ===========

// router.post('/reader_input', handleReaderInput)
router.post('/room', handleReaderInput)

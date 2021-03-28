import { Router } from 'express'
import { getVersion } from '../controllers/versionController'

const router = Router()

router.get('/version', getVersion)

export { router }

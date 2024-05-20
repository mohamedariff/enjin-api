import express from 'express'
const router = express.Router()

import cache from '../../middleware/cache.js'
import { tripController } from '../../controllers/gps/trip.js'

router.post('/', cache, tripController)

export default router

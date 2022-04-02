import { Router } from 'express'
import { getschedule } from '../Controllers/pbsetting.controller'
const router = Router()

//get planterboxsetting schedules
router.get('/:id/schedules', getschedule)

export default router

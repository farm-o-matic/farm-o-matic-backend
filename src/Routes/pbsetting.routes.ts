import { Router } from 'express'
import { getSchedule } from '../Controllers/pbsetting.controller'
const router = Router()

//get planterboxsetting schedules
router.get('/:id/schedules', getSchedule)

export default router

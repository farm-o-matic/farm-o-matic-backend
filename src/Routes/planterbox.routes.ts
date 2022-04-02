import { Router } from 'express'
import { getboxsettings } from '../Controllers/planterbox.controller'
const router = Router()

//get planterbox setting(not include schedule)
router.get('/:id/settings', getboxsettings)

export default router

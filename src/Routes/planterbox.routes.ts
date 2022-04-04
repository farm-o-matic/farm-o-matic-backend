import { Router } from 'express'
import {
    getboxsettings,
    viewPresets,
    createPreset,
    updateBoxSettings,
    addWateringSchedule,
    updateWateringSchedule,
    updateFertilizerSchedule,
    addPesticideSchedule,
    updatePesticideSchedule,
    addFertilizerSchedule
} from '../Controllers/planterbox.controller'
const router = Router()

//get planterbox setting(not include schedule)
router.get('/:id/settings', getboxsettings)

router.get('/viewPresets', viewPresets)

router.post('/createPreset', createPreset)

router.put('/settings/:id/updateBoxSettings/', updateBoxSettings)

router.post('/settings/:id/addWateringSchedule', addWateringSchedule)

router.put('settings/:sid/updateWateringSchedule', updateWateringSchedule)

router.post('/settings/:id/addPesticideSchedule',addPesticideSchedule)

router.put('/settings/:sid/updatePesticideSchedule',updatePesticideSchedule)

router.post('/settings/:id/addFertilizerSchedule',addFertilizerSchedule)

router.put('/settings/:sid/updateFertilizerSchedule', updateFertilizerSchedule)

export default router

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
router.post('/settings', getboxsettings)

router.get('/viewPresets', viewPresets)

router.post('/createPreset', createPreset)

router.put('/settings/updateBoxSettings', updateBoxSettings)

router.post('/settings/addWateringSchedule', addWateringSchedule)

router.put('/settings/updateWateringSchedule', updateWateringSchedule)

router.post('/settings/addPesticideSchedule',addPesticideSchedule)

router.put('/settings/updatePesticideSchedule',updatePesticideSchedule)

router.post('/settings/addFertilizerSchedule',addFertilizerSchedule)

router.put('/settings/updateFertilizerSchedule', updateFertilizerSchedule)

export default router

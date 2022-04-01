import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from "../helper/prisma.client"
const router = Router()

//get planterboxsetting schedules
router.get('/:id/schedules', async(req: Request, res: Response) =>{
    const { id } = req.params
    const schedules = await prisma.planterboxsettings.findUnique({
        where: {
            SettingsID: Number(id),
        },
        include: { 
            fertilizerschedule: true,
            wateringschedule: true,
            pesticideschedule: true
        },
    })
    return res.json(schedules)
})

export default router

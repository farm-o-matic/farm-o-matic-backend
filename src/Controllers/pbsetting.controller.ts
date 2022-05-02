import { Request, Response } from 'express'
import { prisma } from '../helper/prisma.client'
export const getSchedule = async(req: Request, res: Response) =>{
    const { id } = req.params
    const setting = await prisma.planterboxsettings.findUnique({
        where: {
            SettingsID: parseInt(id),
        },
        include: { 
            fertilizerschedule: true,
            wateringschedule: true,
            pesticideschedule: true
        },
    })
    if (setting){
        const schedules = {
            fertilizerschedule: setting['fertilizerschedule'][0],
            wateringschedule: setting['wateringschedule'][0],
            pesticideschedule: setting['pesticideschedule'][0]
        }
        return res.json(schedules)
    }
    return res.json({
        error: true,
        discription: 'The box is not avaliable.'
    })
}
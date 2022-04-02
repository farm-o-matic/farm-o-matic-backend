import { Request, Response } from 'express'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export const getSchedule = async(req: Request, res: Response) =>{
    const { id } = req.params
    const setting = await prisma.planterboxsettings.findUnique({
        where: {
            SettingsID: Number(id),
        },
        include: { 
            fertilizerschedule: true,
            wateringschedule: true,
            pesticideschedule: true
        },
    })
    const schedules = {
        fertilizerschedule: setting['fertilizerschedule'][0],
        wateringschedule: setting['wateringschedule'][0],
        pesticideschedule: setting['pesticideschedule'][0]
    }
    return res.json(schedules)
}
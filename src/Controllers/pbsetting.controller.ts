import { Request, Response } from 'express'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export const getschedule = async(req: Request, res: Response) =>{
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
}
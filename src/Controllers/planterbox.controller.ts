import { Request, Response } from 'express'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export const getboxsettings = async(req: Request, res: Response) =>{
    const { id } = req.params
    const settings = await prisma.planterbox.findUnique({
        where: {
            boxID: Number(id),
        },
        include: { 
            planterboxsettings: true,
        },
    })
    return res.json(settings)
}
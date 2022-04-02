import { Request, Response } from 'express'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export const patchid = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.user.update({
        where: {
            UserID: Number(id),
        },
        data: req.body
    })
    res.json(user)
}

//get all user planterboxes data
export const getuserboxes = async(req: Request, res: Response) =>{
    const { id } = req.params
    const planterboxes = await prisma.planterbox.findMany({
        where: {
            ownerID: Number(id),
        }
    })
    res.json(planterboxes)
}
import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from "../helper/prisma.client"
const router = Router()

//get planterbox setting(not include schedule)
router.get('/:id/settings', async(req: Request, res: Response) =>{
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
})

export default router

import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from "../helper/prisma.client"
const router = Router()

router.get('/:id/setting', async(req: Request, res: Response) =>{
    const { id } = req.params
    const settingID = await prisma.planterbox.findUnique({
        where: {
            boxID: Number(id),
        }
    })
    const setting = await prisma.planterboxsettings.findUnique({
        where: {
            SettingsID: setting
        }
    })
}), 

router.get('/me', async (req: Request, res: Response) => {
    return res.json({ "Status": "ok users" })
})

//edit user data
router.patch('/:id',async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.user.update({
        where: {
            UserID: Number(id),
        },
        data: req.body
    })
    res.json(user)
})

//get all user planterboxes data
router.get('/:id/planterboxes', async(req: Request, res: Response) =>{
    const { id } = req.params
    const planterboxes = await prisma.planterbox.findMany({
        where: {
            ownerID: Number(id),
        }
    })
    res.json(planterboxes)
})

export default router

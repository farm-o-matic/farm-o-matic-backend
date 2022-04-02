import { Router } from 'express'
import { Request, Response } from 'express'
import { getuserboxes } from '../Controllers/users.controller'
import { patchid } from '../Controllers/users.controller'
const router = Router()

router.get('/me', async (req: Request, res: Response) => {
    return res.json({ "Status": "ok users" })
})

//edit user data
router.get('/:id/planterboxes', getuserboxes)

router.patch('/:id', patchid)

export default router

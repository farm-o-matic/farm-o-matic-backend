import { Router } from 'express'
import { Request, Response } from 'express'
import { register } from '../Controllers/users.controller'
const router = Router()

router.get('/register', register)

router.get('/me', async (req: Request, res: Response) => {
    return res.json({ "Status": "ok users" })
})
export default router

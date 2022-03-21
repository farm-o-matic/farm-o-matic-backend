import { Router } from 'express'
import { Request, Response} from 'express'

const router = Router()

router.get('/register', async (req: Request, res: Response) => {
    return res.json({ "Status": "ok" })
})
router.get('/me', async (req: Request, res: Response) => {
    return res.json({ "Status": "ok users" })
})
export default router

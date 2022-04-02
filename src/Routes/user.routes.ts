import { Router } from 'express'
import { Request, Response } from 'express'
import { register } from '../Controllers/users.controller'
import { getuser } from '../Controllers/users.controller'
import { login } from '../Controllers/users.controller'
import { addbox } from '../Controllers/users.controller'
import { getuserboxes } from '../Controllers/users.controller'
import { patchid } from '../Controllers/users.controller'
const router = Router()

router.get('/me', async (req: Request, res: Response) => {
    return res.json({ "Status": "ok users" })
})

router.post('/register', register)

router.post('/login', login)

router.get('/getuser/:id', getuser)

router.post('/addbox/:id', addbox)

//edit user data
router.get('/:id/planterboxes', getuserboxes)

router.patch('/:id', patchid)

export default router

import { Router } from 'express'
import { searchWiki, listPost } from '../Controllers/wiki.controller'

const router = Router()

router.post('/search', searchWiki)

router.get('/listposts', listPost)

export default router
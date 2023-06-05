import { Router } from 'express'

import HomeRouter from './HomeRoutes'
import EmailRouter from './EmailRoutes'
import GithubRouter from './GithubRoutes'

const router = Router()

router.use(HomeRouter)
router.use(EmailRouter)
router.use(GithubRouter)

export default router

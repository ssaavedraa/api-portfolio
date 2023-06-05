import { Router } from 'express'

import HomeController from '../controllers/HomeController'

const HomeRouter = Router()

HomeRouter.get('/', HomeController.index)

export default HomeRouter

import { Router } from 'express'

import GithubController from '../controllers/Githubcontroller'

const GithubRouter = Router()

GithubRouter.get('/github/starred', GithubController.getStarredRepositories)

export default GithubRouter

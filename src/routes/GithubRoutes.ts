import { Router } from 'express'

import GithubController from '../controllers/Githubcontroller'

const GithubRouter = Router()

GithubRouter.get('/starred', GithubController.getStarredRepositories)
GithubRouter.get('/languages', GithubController.getAllLanguages)

export default GithubRouter

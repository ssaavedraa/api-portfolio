import express from 'express'
import * as githubService from '../services/githubService'

const router = express.Router()

router.get('/starred', (_, res) => {
  githubService.getStarredRepositories()
    .then(repository => res.json(repository))
    .catch(e => res.send(e))
})

router.get('/languages/:repositoryName', (req, res) => {
  const { repositoryName } = req.params
  githubService.getRepositoryLanguage(repositoryName)
    .then(languages => res.json(languages))
    .catch(e => res.send(e))
})

export default router

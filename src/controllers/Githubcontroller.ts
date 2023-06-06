import { Request, Response } from 'express'

import GithubServiceError from '../errors/GithubServiceError'
import GithubService from '../services/GithubService'

class GithubController {
  static async getStarredRepositories (_req: Request, res: Response) {
    try {
      const repositories = await GithubService.getRepositories()

      res.status(200).json(repositories)
    } catch (error) {
      console.error(error)

      if (error instanceof GithubServiceError) {
        res.status(error.status).json({
          status: error.status,
          message: error.message
        })
      }

      res.status(500).json({
        status: 500,
        message: 'There was an error retrieving data'
      })
    }
  }
}

export default GithubController

import { Request, Response } from 'express'

import GithubServiceError from '../errors/GithubServiceError'
import GithubService from '../services/GithubService'

class GithubController {
  static async getStarredRepositories (_req: Request, res: Response) {
    try {
      const repositories = await GithubService.getRepositories()

      return res.status(200).json(repositories)
    } catch (error) {
      console.error(error)

      if (error instanceof GithubServiceError) {
        return res.status(error.status).json({
          status: error.status,
          message: error.message
        })
      }

      return res.status(500).json({
        status: 500,
        message: 'There was an error retrieving respositories'
      })
    }
  }

  static async getAllLanguages (_req: Request, res: Response) {
    try {
      const languages = await GithubService.getAllLanguages()

      return res.status(200).json(languages)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        status: 500,
        message: 'There was an error retrieving languages'
      })
    }
  }
}

export default GithubController

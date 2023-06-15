import { Request, Response } from 'express'

import routesDirectory from '../utils/routesDirectory.json'

class HomeController {
  static index (_req: Request, res: Response) {
    return res.status(200).json(routesDirectory)
  }
}

export default HomeController

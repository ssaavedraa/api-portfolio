import { Request, Response } from 'express'

import EmailServiceError from '../errors/EmailServiceError'
import EmailService from '../services/EmailService'

class EmailController {
  static async send (req: Request, res: Response) {
    try {
      const { name, email, message } = req.body

      await EmailService.sendContactEmail({
        name,
        email,
        message
      })

      await EmailService.sendConfirmationEmail(email)

      res.status(200).json({ message: 'Thanks for getting in contact' })
    } catch (error) {
      console.error(error)

      if (error instanceof EmailServiceError) {
        res.status(error.status).json({
          status: error.status,
          message: error.message
        })
      }

      res.status(500).json({
        status: 500,
        message: 'There was an error sending the email'
      })
    }
  }
}

export default EmailController

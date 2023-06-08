import { Router } from 'express'

import EmailController from '../controllers/EmailController'
import { sendEmailValidationMiddleware } from '../middlewares/validation/emailValidationMiddleware'

const EmailRouter = Router()

EmailRouter.post('/send', sendEmailValidationMiddleware.validate, EmailController.send)

export default EmailRouter

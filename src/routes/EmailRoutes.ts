import { Router } from 'express'

import EmailController from '../controllers/EmailController'
import { sendEmailValidationMiddleware } from '../middlewares/validation/emailValidationMiddleware'

const EmailRouter = Router()

EmailRouter.post('/contact', sendEmailValidationMiddleware.validate, EmailController.send)

export default EmailRouter

import { sendEmailValidations } from '../../validations/emailValidations'
import ValidationMiddleware from './validationMiddleware'

export const sendEmailValidationMiddleware = new ValidationMiddleware(sendEmailValidations)

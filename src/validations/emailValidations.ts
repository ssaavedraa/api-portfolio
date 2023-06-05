import { body } from 'express-validator'

export const sendEmailValidations = [
  body('name').notEmpty().withMessage('Name is required'),
  body('name').isLength({ min: 3 }).withMessage('Invalid name'),
  body('email').notEmpty().withMessage('email is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('message').notEmpty().withMessage('message is required'),
  body('message').isLength({ min: 20 }).withMessage('Please send a longer message')
]

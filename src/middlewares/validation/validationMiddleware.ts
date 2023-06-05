import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'

class ValidationMiddleware {
  public validations: ValidationChain[]

  constructor (validations: ValidationChain[]) {
    this.validations = validations

    this.validate = this.validate.bind(this)
  }

  public async validate (req: Request, res: Response, next: NextFunction): Promise<void> {
    const validationPromises = this.validations.map(validation => validation.run(req))

    await Promise.all(validationPromises)

    const errors = validationResult(req)

    errors.isEmpty()
      ? next()
      : res.status(400).json({
        status: 400,
        message: errors.array().map(error => error.msg).join(', ')
      })
  }
}

export default ValidationMiddleware

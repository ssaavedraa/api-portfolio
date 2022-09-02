import { NextFunction, Request, Response } from 'express';
import { Error } from '../models/DTOs/Error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;

  res.status(status).send(message);
};

export default errorMiddleware;
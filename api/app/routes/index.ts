import { Request, Response, Router } from 'express';
import fs from 'fs';
import { Error } from '../models/DTOs/Error';

const router = Router();

const routerDir = __dirname;

const removeExtension = (filename: string): string => {
  return filename.split('.').shift() || '';
};

fs.readdirSync(routerDir).filter(file => {
  const fileWithoutExtension = removeExtension(file);
  const ignoreFile = ['index'].includes(fileWithoutExtension);
  if (!ignoreFile) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    router.use(`/${fileWithoutExtension}`, require(`./${fileWithoutExtension}`).default);
  }
});

router.get('*', (req: Request, res: Response) => {
  const error: Error = {
    status: 404,
    message: 'Route not found'
  };

  res.status(error.status).send(error.message);
});

export default router;
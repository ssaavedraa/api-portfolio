import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/errorMiddleware';
import * as dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();
const allowCors = process.env.CORS || 'http://localhost:3000';

app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowCors);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(errorMiddleware);
app.use('/api', router);

export default app;

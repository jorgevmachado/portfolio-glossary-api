import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pagination } from 'typeorm-pagination';
import {errors} from 'celebrate';
import { errorsMiddleware } from '@config/middlewares';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(errorsMiddleware);

app.listen(PORT, () => {
    console.log('---------------------------------');
    console.log(`🚀 API is running - PORT:${PORT} 🚀`);
    console.log('---------------------------------');
});

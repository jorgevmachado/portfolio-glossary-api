import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes';
import uploadConfig from './config/upload';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);


app.listen(PORT, () => {
    console.log('---------------------------------');
    console.log(`🚀 API is running - PORT:${PORT} 🚀`);
    console.log('---------------------------------');
});

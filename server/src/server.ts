import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.route';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json())
app.use(fileUpload());
app.use(morgan('dev'));
app.use('/api', router);


export default app
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.route';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use(router);


app.listen(PORT, () => {
    /* tslint:disable-next-line */
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
})
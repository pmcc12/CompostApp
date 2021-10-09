import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';
import dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config()
// require("dotenv").config();

app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use(router);

app.listen(PORT, () => {
    /* tslint:disable-next-line */
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
})
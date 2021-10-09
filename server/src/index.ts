import app from './server.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    /* tslint:disable-next-line */
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
})
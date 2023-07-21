import express from 'express';
import cors from 'cors';
import router from './routes/productRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

app.listen(5000, () => console.log('sever run and up...'))
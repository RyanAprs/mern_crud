import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import router from './routes/productRoute.js';

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(router);

app.listen(5000, () => console.log('server run and up...'));

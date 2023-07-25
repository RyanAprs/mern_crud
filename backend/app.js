import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import db from './config/Connect.js';

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(productRoute);
app.use(userRoute);

try {
    await db.authenticate();
    console.log("Database connected")
    } catch (error) {
    console.log(EvalError)
}

app.listen(process.env.PORT, () => console.log('server run and up...'));
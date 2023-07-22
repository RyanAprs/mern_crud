import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import session from 'express-session';
import dotenv from 'dotenv'
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(productRoute);
app.use(userRoute);

app.listen(process.env.PORT, () => console.log('server run and up...'));

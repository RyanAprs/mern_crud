import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import db from './config/Connect.js';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import dotenv from 'dotenv'
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db: db
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(productRoute);
app.use(userRoute);
app.use(authRoute);

// store.sync();

app.listen(process.env.PORT, () => console.log('server run and up...'));

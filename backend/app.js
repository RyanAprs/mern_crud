const express = require ('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser'); 
const dotenv = require ('dotenv');
const cookieParser = require ('cookie-parser');
const productRoute = require ('./routes/productRoute');
const userRoute = require ('./routes/userRoute');
// const db = require ('./config/Connect');

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api/products', productRoute);
app.use('/api/user', userRoute);

// mysql
// try {
//     await db.authenticate();
//     console.log("Database connected")
//     } catch (error) {
//     console.log(EvalError)
// }

// mongoDb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})
.then(() => {
    console.log("Mongoose connected")
})
.catch((e) => console.log(e))

require('./models/userModel')


app.listen(process.env.PORT, () => console.log('server run and up...'));
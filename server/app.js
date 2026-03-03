import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';

import errorMiddlware from './middlewares/error.middleware.js';
import courseRoutes from './routes/course.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import userRoutes from './routes/user.routes.js';


config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: [process.env.FRONTEND_URL],  
    credentials: true,
}));

// app.use(
//     cors({
//         origin: [process.env.FRONTEND_URL], 
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         preflightContinue: false,
//         optionsSuccessStatus: 204,
//         credentials: true,
//     })
// );

app.use(cookieParser());

app.use(morgan('dev'));

app.use('/ping',function(_req,res){
    res.send('Pong');
})
//routes of 3 modules

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/payments', paymentRoutes)
app.use('/api/v1', miscRoutes);
app.all('/',(_req,res)=>{
    res.status(404).send('OOPS!!  404 page not found ')
})
app.use(errorMiddlware);

export default app;
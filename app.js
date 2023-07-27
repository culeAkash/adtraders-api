const express = require('express');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express();


const productRouter = require('./routes/ProductRoutes')
const categoryRouter = require('./routes/CategoryRoutes')
const contactRouter = require('./routes/ContactRoutes')
const authRouter = require('./routes/AuthRoutes')
const logoutRouter = require('./routes/LogoutRoutes')



const globalErrorHandler = require('./controllers/ErrorController');
const AppError = require('./utils/AppError');


app.use(cookieParser());

app.use(morgan('dev'));

const corsOption = {
    origin: ['http://localhost:3000']
}

app.use(cors(corsOption))


app.use(express.json());




app.use('/api/v1/products', productRouter);


app.use('/api/v1/categories', categoryRouter);


app.use("/api/v1/contactus", contactRouter);


app.use("/api/v1/auth", authRouter)


app.use("/api/v1/logout", logoutRouter)





// handling no routes present error
app.use("*", (req, res, next) => {
    const err = new AppError(`Can't find route for ${req.originalUrl}`, 404);

    next(err);
})




// global error handling
app.use(globalErrorHandler);




module.exports = app;
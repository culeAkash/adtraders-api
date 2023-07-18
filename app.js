const express = require('express');
const morgan = require('morgan')


const app = express();


const productController = require('./controllers/ProductController')
const productRouter = require('./routes/ProductRoutes')
const globalErrorHandler = require('./controllers/ErrorController');
const AppError = require('./utils/AppError');

app.use(morgan('dev'));


app.use(express.json());




app.use('/api/v1/products', productRouter);










// handling no routes present error
app.use("*", (req, res, next) => {
    const err = new AppError(`Can't find route for ${req.originalUrl}`, 404);

    next(err);
})




// global error handling
app.use(globalErrorHandler);




module.exports = app;
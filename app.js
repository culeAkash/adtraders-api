const express = require('express');
const morgan = require('morgan')


const app = express();


const productController = require('./controllers/ProductController')
const productRouter = require('./routes/ProductRoutes')

app.use(morgan('dev'));


app.use(express.json());




app.use('/api/v1/products', productRouter);











app.use((req, res, next) => {
    res.send("<h1>Hello from server</h1>");
})




module.exports = app;
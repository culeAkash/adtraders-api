const Product = require('../models/ProductModel');
const catchAsync = require('../utils/CatchAsync')

exports.getAllProducts = catchAsync(async (req, res, next) => {

    const products = await Product.find();


    res.status(200).json({
        status: 'success',
        data: products
    })
})



exports.createProduct = catchAsync(async (req, res, next) => {

})
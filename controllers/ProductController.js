const Product = require('../models/ProductModel');
const catchAsync = require('../utils/CatchAsync')


const ApiFeatures = require('../utils/ApiFeatures');
const AppError = require('../utils/AppError');




exports.setCategoryId = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
}



exports.getAllProducts = catchAsync(async (req, res, next) => {


    console.log(req.query);
    // Add filtering here

    const features = new ApiFeatures(Product.find(), req.query)
        .filter()
        .paginate();


    const products = await features.mongoQuery;


    res.status(200).json({
        status: 'success',
        data: products
    })
})






exports.createProduct = catchAsync(async (req, res, next) => {
    console.log(req.body);

    const newProduct = await Product.create(req.body);

    console.log(newProduct);

    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct
        }
    })
})



exports.getProductById = catchAsync(async (req, res, next) => {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product)
        return next(new AppError(`No product found with productId : ${productId}`, 404));

    res.status(200).json({
        success: 'status',
        data: {
            product
        }
    })
})


exports.updateProduct = catchAsync(async (req, res, next) => {
    const productId = req.params.productId;

    const updatedProduct = await Product.findOneAndUpdate(productId, req.body, {
        runValidators: true,
        new: true
    })


    if (!updatedProduct) return next(new AppError(`No product found with productId : ${productId}`, 404));

    res.status(200).json({
        status: 'success',
        data: {
            product: updatedProduct
        }
    })
})


exports.deleteProduct = catchAsync(async (req, res, next) => {
    const productId = req.params.productId

    const product = await Product.findByIdAndDelete(productId)

    if (!product) return next(new AppError(`No product found with productId : ${productId}`, 404));

    res.status(204).json({
        status: 'success'
    })
})
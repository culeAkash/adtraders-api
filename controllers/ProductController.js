const Product = require('../models/ProductModel');


// const products = [
//     { id: 1, name: 'Product 1' },
//     { id: 2, name: 'Product 2' },
//     { id: 3, name: 'Product 3' },
//     { id: 4, name: 'Product 4' }
// ]


exports.getAllProducts = async (req, res, next) => {

    const products = await Product.find();


    res.status(200).json({
        status: 'success',
        data: products
    })
}
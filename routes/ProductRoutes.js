const express = require('express');



const productController = require('../controllers/ProductController')


const router = express.Router();






router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct);



module.exports = router;
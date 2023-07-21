const express = require('express');



const productController = require('../controllers/ProductController')
const authController = require('../controllers/AuthController')


const router = express.Router({
    mergeParams: true
});





router.route('/')
    .get(productController.getAllProducts)
    .post(authController.authenticate, productController.setCategoryId, productController.createProduct);


router.route('/:productId')
    .get(productController.getProductById)
    .patch(authController.authenticate, productController.updateProduct)
    .delete(authController.authenticate, productController.deleteProduct)

module.exports = router;
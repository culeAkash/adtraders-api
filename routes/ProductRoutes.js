const express = require('express');



const productController = require('../controllers/ProductController')


const router = express.Router({
    mergeParams: true
});





router.route('/')
    .get(productController.getAllProducts)
    .post(productController.setCategoryId, productController.createProduct);


router.route('/:productId')
    .get(productController.getProductById)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router;
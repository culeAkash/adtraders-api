const express = require('express');



const categoryController = require('../controllers/CategoryController')
const productRoutes = require('../routes/ProductRoutes')
const authController = require('../controllers/AuthController')


const router = express.Router();




router.use("/:categoryId/products", productRoutes);



router.route("/")
    .post(authController.authenticate, categoryController.createCategory)
    .get(categoryController.getAllCategories)


router.route("/:categoryId")
    .get(categoryController.getCategoryById)
    .patch(authController.authenticate, categoryController.updateCategory)
    .delete(authController.authenticate, categoryController.deleteCategory)


















module.exports = router
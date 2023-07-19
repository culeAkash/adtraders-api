const express = require('express');



const categoryController = require('../controllers/CategoryController')
const productRoutes = require('../routes/ProductRoutes')


const router = express.Router();




router.use("/:categoryId/products", productRoutes);



router.route("/")
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategories)


router.route("/:categoryId")
    .get(categoryController.getCategoryById)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)


















module.exports = router
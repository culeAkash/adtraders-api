const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync')
const Category = require('./../models/CategoryModel')





exports.createCategory = CatchAsync(async (req, res, next) => {

    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        category: newCategory
    })
})



exports.getAllCategories = CatchAsync(async (req, res, next) => {
    const categories = await Category.find();

    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: {
            categories
        }
    })
})



exports.getCategoryById = CatchAsync(async (req, res, next) => {

    const categoryId = req.params.categoryId;

    const category = await Category.find({ _id: categoryId });

    if (!category) return next(new AppError(`No category found with id : ${categoryId}`, 404))

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    })
})


exports.updateCategory = CatchAsync(async (req, res, next) => {
    const categoryId = req.params.categoryId;

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {
        new: true, // return the updated document instead of the original one
        runValidators: true  // validate before updating
    });

    if (!updatedCategory) return next(new AppError(`No category found with id : ${categoryId}`, 404))


    res.status(200).json({
        status: 'success',
        data: {
            category: updatedCategory
        }
    })
})


exports.deleteCategory = CatchAsync(async (req, res, next) => {
    const categoryId = req.params.categoryId;

    const category = await Category.findByIdAndDelete(categoryId)

    if (!category) return next(new AppError(`No category found with id : ${categoryId}`, 404))
    res.status(204).json({})
})
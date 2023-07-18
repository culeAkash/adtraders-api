const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product must have a name"],
        unique: [true, "A product with this name is already present"],
        trim: true
    },
    stockStatus: {
        type: Boolean,
        default: true // by defualt all products are in stock
    },
    imageCover: {
        type: String,
        default: 'product.png',
    },
    images: [String],
    description: {
        type: String,
        maxlength: [200, "Description should be less than 200 characters."],
        minlength: [30, "Description should not be less than 30 characters"],
        trim: true,
        required: [true, 'Please provide the Description of your product']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }
})


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
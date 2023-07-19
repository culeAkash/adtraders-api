const mongoose = require('mongoose');



const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: "",
        maxlength: [50, "Description should be less than 12 characters"],
        trim: true
    }
});


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
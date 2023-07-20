const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        trim: true,
        unique: [true, "Email already exists"],
        validate: [validator.isEmail, 'Please give valid email'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 8,
        select: false
    }
});


UserSchema.methods.comparePassword = async function (comparePassword, userPassword) {
    return await bcryptjs.compare(comparePassword, userPassword);
}


const User = mongoose.model('User', UserSchema);

module.exports = User;
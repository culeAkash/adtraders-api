const mongoose = require('mongoose');
const validator = require('validator')

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
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works when we create or save user to database and not on update
            validator: function (val) {
                return val === this.password;
            },
            message: 'Passwords do not match'
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
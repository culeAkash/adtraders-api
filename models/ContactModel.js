const mongoose = require('mongoose');

const validator = require('validator')

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A contact must have a name"],
        trim: true,
        maxlength: [50, "Name must be less than 50 characters"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please give a valid email"],
        trim: true,
        lowercase: true,
        required: [true, "A contact must have an email"]
    },
    subject: {
        type: String,
        maxLength: [200, "Subject can't be greater than 200 characters"],
        minLength: [3, "Subject should not be empty or too short."],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message is mandatory'],
        trim: true
    }
})



ContactSchema.pre('save', function (next) {
    // console.log(this);
    if (!this.subject)
        this.subject = `${this.name} is trying to contact you`
    console.log(this);
    next()
})


const ContactModel = mongoose.model("Contact", ContactSchema);

module.exports = ContactModel
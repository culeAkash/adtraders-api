
const Contact = require('../models/ContactModel');

const ApiFeatures = require('../utils/ApiFeatures');
const catchAsync = require('../utils/CatchAsync');


exports.createNewContact = catchAsync(async (req, res, next) => {

    console.log(req.body);


    const newContact = await Contact.create(req.body);


    res.status(201).json({
        success: true,
        data: {
            contact: newContact
        }
    })
})


exports.getAllContacts = catchAsync(async (req, res, next) => {


    const features = new ApiFeatures(Contact.find(), req.query).filter().paginate();


    const contacts = await features.mongoQuery;


    res.status(200).json({
        success: 'true',
        count: contacts.length,
        contacts
    })
})


exports.deleteContact = catchAsync(async (req, res, next) => {


    const contactId = req.params.contactId;

    console.log(contactId);


    await Contact.findByIdAndDelete(contactId);


    res.status(204).json({
        message: 'contact deleted successfully'
    })
})


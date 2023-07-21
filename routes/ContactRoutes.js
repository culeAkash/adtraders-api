const express = require('express');


const router = express.Router()



const contactCotroller = require('../controllers/ContactController')
const authController = require('../controllers/AuthController')



router.route("/")
    .post(contactCotroller.createNewContact)
    .get(authController.authenticate, contactCotroller.getAllContacts)


router.route('/:contactId')
    .delete(authController.authenticate, contactCotroller.deleteContact)





module.exports = router

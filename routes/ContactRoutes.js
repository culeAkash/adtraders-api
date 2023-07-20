const express = require('express');


const router = express.Router()



const contactCotroller = require('../controllers/ContactController')



router.route("/")
    .post(contactCotroller.createNewContact);






module.exports = router

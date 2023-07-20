const express = require('express')



const router = express.Router()



const authController = require('../controllers/AuthController')




router.route("/auth")
    .get(authController.authenticate)


router.route("/login")
    .post(authController.login)




module.exports = router
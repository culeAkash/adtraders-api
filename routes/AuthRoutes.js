const express = require('express')



const router = express.Router()



const authController = require('../controllers/AuthController')
const refreshController = require('../controllers/RefreshController')




// router.route("/auth")
//     .get(authController.authenticate)


router.route("/login")
    .post(authController.login)

router.route("/refresh").get(refreshController.handleRefreshToken)




module.exports = router
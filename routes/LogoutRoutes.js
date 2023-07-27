const express = require('express')
const { logoutHandler } = require('../controllers/LogoutController')





const router = express.Router()




router.get("/", logoutHandler)



module.exports = router
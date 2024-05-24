const express = require('express')
const {userLogin, userSignup} =require('../controllers/userControllers')

const router = express.Router()

//login route
router.post('/login', userLogin)

//sign up route
router.post('/signup', userSignup)

module.exports = router
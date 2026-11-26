// Auth routes - /api/auth
// Authentication (JWT) yahan banti hai: login pe token milta hai.
const express = require('express')
const router = express.Router()
const { signup, login, forgotPassword, changePassword } = require('../controllers/authController')
const { verifyToken } = require('../auth')

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/change-password', verifyToken, changePassword)

module.exports = router

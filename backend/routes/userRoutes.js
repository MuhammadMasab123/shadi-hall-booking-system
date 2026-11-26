// User routes - /api/users
// Authorization (JWT token role): Profile update koi bhi logged-in user kar sakta hai.
// Users dekhna / update / delete karna sirf Admin kar sakta hai.
const express = require('express')
const router = express.Router()
const { updateProfile, getUsers, updateUser, deleteUser } = require('../controllers/userController')
const { verifyToken, authorizeRole } = require('../auth')

router.post('/profile', verifyToken, updateProfile)
router.get('/', verifyToken, authorizeRole('Admin'), getUsers)
router.put('/:id', verifyToken, authorizeRole('Admin'), updateUser)
router.delete('/:id', verifyToken, authorizeRole('Admin'), deleteUser)

module.exports = router

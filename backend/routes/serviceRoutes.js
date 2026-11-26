// Service routes - /api/services
// Authorization (JWT token role): Add Service sirf Admin aur Hall Manager kar sakte hain.
const express = require('express')
const router = express.Router()
const { addService, getServices, deleteService } = require('../controllers/serviceController')
const { verifyToken, authorizeRole } = require('../auth')

router.post('/', verifyToken, authorizeRole('Admin', 'Hall Manager'), addService)
router.get('/', verifyToken, authorizeRole('Admin'), getServices)
router.delete('/:id', verifyToken, authorizeRole('Admin'), deleteService)

module.exports = router

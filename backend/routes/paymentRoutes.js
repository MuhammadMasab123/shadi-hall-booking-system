// Payment routes - /api/payments
// Authorization (JWT token role): Payment sirf Customer kar sakta hai.
// Payments dekhna / delete karna sirf Admin kar sakta hai.
const express = require('express')
const router = express.Router()
const { createPayment, getPayments, deletePayment } = require('../controllers/paymentController')
const { verifyToken, authorizeRole } = require('../auth')

router.post('/', verifyToken, authorizeRole('Customer'), createPayment)
router.get('/', verifyToken, authorizeRole('Admin'), getPayments)
router.delete('/:id', verifyToken, authorizeRole('Admin'), deletePayment)

module.exports = router

// Booking routes - /api/bookings
// Authorization (JWT token role): Booking sirf Customer kar sakta hai.
// Manage Data (read/update/delete) sirf Admin kar sakta hai.
const express = require('express')
const router = express.Router()
const { checkAvailability, createBooking, getBookings, updateBooking, deleteBooking } = require('../controllers/bookingController')
const { verifyToken, authorizeRole } = require('../auth')

router.post('/check-availability', checkAvailability)
router.post('/', verifyToken, authorizeRole('Customer'), createBooking)
router.get('/', verifyToken, authorizeRole('Admin', 'Hall Manager'), getBookings)
router.put('/:id', verifyToken, authorizeRole('Admin'), updateBooking)
router.delete('/:id', verifyToken, authorizeRole('Admin'), deleteBooking)

module.exports = router

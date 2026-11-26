// Booking controller - availability check, booking create, read, update, delete
const { Booking } = require('../models')

// POST /api/bookings/check-availability - us date pe booking hai ya nahi
async function checkAvailability(req, res) {
  try {
    const existing = await Booking.findOne({ hall: req.body.hall, date: req.body.date })
    if (existing) return res.json({ message: 'Hall is NOT available on this date', available: false })
    res.json({ message: 'Hall is available on this date', available: true })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// POST /api/bookings - booking save
async function createBooking(req, res) {
  try {
    const booking = await Booking.create(req.body)
    res.json({ message: 'Booking submitted', booking })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/bookings - saari bookings (Read)
async function getBookings(req, res) {
  const bookings = await Booking.find()
  res.json(bookings)
}

// PUT /api/bookings/:id - booking update by id
async function updateBooking(req, res) {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: 'Booking updated', booking })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE /api/bookings/:id - booking delete
async function deleteBooking(req, res) {
  await Booking.findByIdAndDelete(req.params.id)
  res.json({ message: 'Booking deleted' })
}

module.exports = { checkAvailability, createBooking, getBookings, updateBooking, deleteBooking }

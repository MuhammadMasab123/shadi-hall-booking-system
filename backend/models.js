// Simple Mongoose models - har form ka data ek collection mein save hota hai
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  userType: String,
  role: String,
  password: String,
}, { timestamps: true })

const hallSchema = new mongoose.Schema({
  hallName: String,
  location: String,
  capacity: Number,
  price: Number,
}, { timestamps: true })

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  hall: String,
  date: String,
  time: String,
  guests: Number,
  status: { type: String, default: 'Pending' },
}, { timestamps: true })

const paymentSchema = new mongoose.Schema({
  method: String,
  accountNumber: String,
  amount: Number,
}, { timestamps: true })

const serviceSchema = new mongoose.Schema({
  serviceType: String,
  packageName: String,
  price: Number,
  details: String,
}, { timestamps: true })

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}, { timestamps: true })

const feedbackSchema = new mongoose.Schema({
  hall: String,
  rating: String,
  review: String,
}, { timestamps: true })

module.exports = {
  User: mongoose.model('User', userSchema),
  Hall: mongoose.model('Hall', hallSchema),
  Booking: mongoose.model('Booking', bookingSchema),
  Payment: mongoose.model('Payment', paymentSchema),
  Service: mongoose.model('Service', serviceSchema),
  Contact: mongoose.model('Contact', contactSchema),
  Feedback: mongoose.model('Feedback', feedbackSchema),
}

// Backend server - Express + MongoDB Atlas (Mongoose)
// Flow: React -> Axios -> Express server -> Routes -> Controller -> Model (MongoDB)
// Run: npm install  (inside backend folder)
//      npm start    (server runs on http://localhost:5000)
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

// Connect to MongoDB Atlas - connection string backend/.env mein MONGODB_URI hai
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.log('MongoDB connection error:', err.message))

// Test route
app.get('/', (req, res) => res.json({ message: 'Shadi Hall API is running' }))

// Routes - har route apne controller ko call karta hai
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/halls', require('./routes/hallRoutes'))
app.use('/api/bookings', require('./routes/bookingRoutes'))
app.use('/api/payments', require('./routes/paymentRoutes'))
app.use('/api/services', require('./routes/serviceRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/contact', require('./routes/contactRoutes'))
app.use('/api/feedback', require('./routes/feedbackRoutes'))

const PORT = 5000
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT))

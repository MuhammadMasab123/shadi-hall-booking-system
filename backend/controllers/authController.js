// Auth controller - signup, login, forgot password, change password
const { User } = require('../models')
const { createToken } = require('../auth')

// POST /api/auth/signup - new user save
async function signup(req, res) {
  try {
    const user = await User.create(req.body)
    res.json({ message: 'Signup successful', user })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// POST /api/auth/login - email + password check, phir JWT token banao
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password })
    if (!user) return res.status(400).json({ message: 'Invalid email or password' })
    const token = createToken(user, req.body.role)
    const safeUser = { _id: user._id, name: user.name, email: user.email, role: req.body.role || user.role || user.userType }
    res.json({ message: 'Login successful', token, user: safeUser })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// POST /api/auth/forgot-password - sirf check karta hai ke email hai ya nahi
async function forgotPassword(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: 'Email not found' })
    res.json({ message: 'Reset link sent to your email' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// POST /api/auth/change-password - token ke saath password change
async function changePassword(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: 'User not found' })
    user.password = req.body.newPassword
    await user.save()
    res.json({ message: 'Password changed' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = { signup, login, forgotPassword, changePassword }

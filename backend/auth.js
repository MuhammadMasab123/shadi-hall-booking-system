// JWT auth - token banana aur check karna
// Login pe token banta hai, frontend usay localStorage mein save karta hai,
// aur har protected request pe Authorization header mein bhejta hai.
const jwt = require('jsonwebtoken')

// Secret .env se aata hai (JWT_SECRET). Agar .env mein na ho to ye simple
// secret use hota hai taake project local pe chal jaye - asal project mein
// .env mein apna strong secret likhna, aur secret kabhi chat mein share mat karna.
const JWT_SECRET = process.env.JWT_SECRET || 'shadi-hall-secret-change-me'

// Login ke baad token banao - 1 din ke liye valid
function createToken(user, role) {
  return jwt.sign(
    { id: user._id, email: user.email, role: role || user.role || user.userType || 'Customer' },
    JWT_SECRET,
    { expiresIn: '1d' }
  )
}

// Protected routes ke liye middleware - token sahi ho to aage jane do, warna roko
function verifyToken(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Please login first - token missing' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token - please login again' })
  }
}

// Authorization - JWT token ke role se check karo
// Use: verifyToken ke BAAD lagao, jaise authorizeRole('Admin', 'Hall Manager')
// Token mein role Login pe save hota hai (Admin / Customer / Hall Manager).
// Role galat ho to 403 - kaam nahi hone do.
function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Please login first - token missing' })
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not allowed - only ' + allowedRoles.join(' / ') + ' can do this' })
    }
    next()
  }
}

module.exports = { createToken, verifyToken, authorizeRole }

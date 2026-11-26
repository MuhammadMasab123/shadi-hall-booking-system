// User controller - profile update, users read, update, delete
const { User } = require('../models')

// POST /api/users/profile - email se user update
async function updateProfile(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { name: req.body.name, phone: req.body.phone, address: req.body.address },
      { new: true }
    )
    if (!user) return res.status(400).json({ message: 'User not found' })
    res.json({ message: 'Profile updated', user })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/users - saare users (Read)
async function getUsers(req, res) {
  const users = await User.find()
  res.json(users)
}

// PUT /api/users/:id - user update by id
async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: 'User updated', user })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE /api/users/:id - user delete
async function deleteUser(req, res) {
  await User.findByIdAndDelete(req.params.id)
  res.json({ message: 'User deleted' })
}

module.exports = { updateProfile, getUsers, updateUser, deleteUser }

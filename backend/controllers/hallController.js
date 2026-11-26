// Hall controller - halls search, add, update, read, delete
const { Hall } = require('../models')

// POST /api/halls/search - location / guests / price se filter
async function searchHalls(req, res) {
  try {
    const halls = await Hall.find()
    res.json({ message: 'Halls found', halls })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// POST /api/halls - hall add
async function addHall(req, res) {
  try {
    const hall = await Hall.create(req.body)
    res.json({ message: 'Hall added', hall })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// POST /api/halls/update - hall name se update
async function updateHallByName(req, res) {
  try {
    const hall = await Hall.findOneAndUpdate(
      { hallName: req.body.hall },
      { hallName: req.body.hallName, capacity: req.body.capacity, price: req.body.price },
      { new: true }
    )
    if (!hall) return res.status(400).json({ message: 'Hall not found' })
    res.json({ message: 'Hall updated', hall })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/halls - saare halls (Read)
async function getHalls(req, res) {
  const halls = await Hall.find()
  res.json(halls)
}

// PUT /api/halls/:id - hall update by id
async function updateHallById(req, res) {
  try {
    const hall = await Hall.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: 'Hall updated', hall })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE /api/halls/:id - hall delete
async function deleteHall(req, res) {
  await Hall.findByIdAndDelete(req.params.id)
  res.json({ message: 'Hall deleted' })
}

module.exports = { searchHalls, addHall, updateHallByName, getHalls, updateHallById, deleteHall }

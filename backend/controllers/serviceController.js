// Service controller - service/package create, read, delete
const { Service } = require('../models')

// POST /api/services - service add
async function addService(req, res) {
  try {
    const service = await Service.create(req.body)
    res.json({ message: 'Service added', service })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/services - saari services (Read)
async function getServices(req, res) {
  const services = await Service.find()
  res.json(services)
}

// DELETE /api/services/:id - service delete
async function deleteService(req, res) {
  await Service.findByIdAndDelete(req.params.id)
  res.json({ message: 'Service deleted' })
}

module.exports = { addService, getServices, deleteService }

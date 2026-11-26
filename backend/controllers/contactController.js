// Contact controller - contact message create, read, delete
const { Contact } = require('../models')

// POST /api/contact - message save
async function createContact(req, res) {
  try {
    const contact = await Contact.create(req.body)
    res.json({ message: 'Message sent', contact })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/contact - saare messages (Read)
async function getContacts(req, res) {
  const contacts = await Contact.find()
  res.json(contacts)
}

// DELETE /api/contact/:id - message delete
async function deleteContact(req, res) {
  await Contact.findByIdAndDelete(req.params.id)
  res.json({ message: 'Contact message deleted' })
}

module.exports = { createContact, getContacts, deleteContact }

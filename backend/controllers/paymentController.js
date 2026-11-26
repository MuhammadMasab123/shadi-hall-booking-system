// Payment controller - payment create, read, delete
const { Payment } = require('../models')

// POST /api/payments - payment save
async function createPayment(req, res) {
  try {
    const payment = await Payment.create(req.body)
    res.json({ message: 'Payment successful', payment })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/payments - saari payments (Read)
async function getPayments(req, res) {
  const payments = await Payment.find()
  res.json(payments)
}

// DELETE /api/payments/:id - payment delete
async function deletePayment(req, res) {
  await Payment.findByIdAndDelete(req.params.id)
  res.json({ message: 'Payment deleted' })
}

module.exports = { createPayment, getPayments, deletePayment }

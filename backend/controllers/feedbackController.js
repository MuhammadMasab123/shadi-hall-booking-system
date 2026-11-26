// Feedback controller - feedback create, read, delete
const { Feedback } = require('../models')

// POST /api/feedback - feedback save
async function createFeedback(req, res) {
  try {
    const feedback = await Feedback.create(req.body)
    res.json({ message: 'Feedback submitted', feedback })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/feedback - saara feedback (Read)
async function getFeedbacks(req, res) {
  const feedbacks = await Feedback.find()
  res.json(feedbacks)
}

// DELETE /api/feedback/:id - feedback delete
async function deleteFeedback(req, res) {
  await Feedback.findByIdAndDelete(req.params.id)
  res.json({ message: 'Feedback deleted' })
}

module.exports = { createFeedback, getFeedbacks, deleteFeedback }

// Feedback routes - /api/feedback
// Feedback koi bhi bhej sakta hai (public).
// Feedback dekhna / delete karna sirf Admin kar sakta hai.
const express = require('express')
const router = express.Router()
const { createFeedback, getFeedbacks, deleteFeedback } = require('../controllers/feedbackController')
const { verifyToken, authorizeRole } = require('../auth')

router.post('/', createFeedback)
router.get('/', verifyToken, authorizeRole('Admin'), getFeedbacks)
router.delete('/:id', verifyToken, authorizeRole('Admin'), deleteFeedback)

module.exports = router

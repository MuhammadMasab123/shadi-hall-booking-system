// Contact routes - /api/contact
// Contact message koi bhi bhej sakta hai (public).
// Messages dekhna / delete karna sirf Admin kar sakta hai.
const express = require('express')
const router = express.Router()
const { createContact, getContacts, deleteContact } = require('../controllers/contactController')
const { verifyToken, authorizeRole } = require('../auth')

router.post('/', createContact)
router.get('/', verifyToken, authorizeRole('Admin'), getContacts)
router.delete('/:id', verifyToken, authorizeRole('Admin'), deleteContact)

module.exports = router

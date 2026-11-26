// Hall routes - /api/halls
// Authorization (JWT token role): Add/Edit Hall sirf Admin aur Hall Manager kar sakte hain.
const express = require('express')
const router = express.Router()
const { searchHalls, addHall, updateHallByName, getHalls, updateHallById, deleteHall } = require('../controllers/hallController')
const { verifyToken, authorizeRole } = require('../auth')

router.post('/search', searchHalls)
router.post('/', verifyToken, authorizeRole('Admin', 'Hall Manager'), addHall)
router.post('/update', verifyToken, authorizeRole('Admin', 'Hall Manager'), updateHallByName)
router.get('/', verifyToken, authorizeRole('Admin', 'Hall Manager'), getHalls)
router.put('/:id', verifyToken, authorizeRole('Admin', 'Hall Manager'), updateHallById)
router.delete('/:id', verifyToken, authorizeRole('Admin', 'Hall Manager'), deleteHall)

module.exports = router

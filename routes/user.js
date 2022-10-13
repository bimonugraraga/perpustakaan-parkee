const express = require('express')
const router = express.Router()
const UserAuthProfileController = require('../controllers/user/authProfileController')
const UserBookController = require('../controllers/user/bookController')

router.post('/register', UserAuthProfileController.registerUser)
router.get('/profile', UserAuthProfileController.getProfileUser)

router.post('/book/:book_id/borrow', UserBookController.borrowBook)
router.put('/book/:book_id/return', UserBookController.returnBook)
module.exports = router
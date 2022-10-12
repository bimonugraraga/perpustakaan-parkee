const express = require('express')
const router = express.Router()
const UserAuthProfileController = require('../controllers/user/authProfileController')
const UserBookController = require('../controllers/user/bookController')

router.post('/register', UserAuthProfileController.registerUser)
router.get('/profile', UserAuthProfileController.getProfileUser)

router.post('/borrow-book/:book_id', UserBookController.borrowBook)
module.exports = router